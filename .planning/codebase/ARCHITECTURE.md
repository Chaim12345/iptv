<!-- refreshed: 2026-07-15 -->
# Architecture

**Analysis Date:** 2026-07-15

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    Browser (SPA, Vite + TS)                  │
├──────────────────┬──────────────────┬───────────────────────┤
│   UI / layouts   │   API client     │   Rust→WASM helper     │
│ `frontend/src/`  │ `frontend/src/`  │  `iptv-wasm/src/`      │
│ `main.ts`,       │ `api.ts`         │  `lib.rs`              │
│ `style.css`      │                  │ (extract_groups, etc.) │
└────────┬─────────┴────────┬─────────┴──────────┬────────────┘
         │ fetch /api/*      │ hls.js via         │ WASM calls
         │                   │ /api/proxy         │ (in-browser)
         ▼                   ▼                    │
┌─────────────────────────────────────────────────────────────┐
│                   axum HTTP server (Rust)                    │
│  router + handlers   `iptv-rs/src/routes/mod.rs`             │
│  serves built SPA    `iptv-rs/static/` (ServeDir fallback)   │
├─────────────────────────────────────────────────────────────┤
│  In-memory AppStore (RwLock)   `iptv-rs/src/store.rs`        │
│   • playlists  • EpgState(+index)  • working set  • pipeline │
├─────────────────────────────────────────────────────────────┤
│  Background curation pipeline  `services/pipeline.rs`        │
│   fetch → dedupe → probe → EPG merge                         │
│  curated source registry       `services/curated.rs`        │
│  parsers                        `parsers/{m3u,xmltv}.rs`     │
└────────────────────────┬────────────────────────────────────┘
                         │ JSON persistence
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  Disk (JSON, crate-relative)   `iptv-rs/data/`               │
│   uploads/*.json · epg/epg_data.json · working_channels.json │
│   (+ .bak backups)                                           │
└─────────────────────────────────────────────────────────────┘
                         ▲
                         │ upstream fetch (HTTP)
                External curated M3U + XMLTV sources / live CDNs
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Server bootstrap | tracing init, config, load disk state, spawn pipeline, build router, serve | `iptv-rs/src/main.rs` |
| Router + handlers | All `/api/*` endpoints, HLS proxy relay, SPA fallback | `iptv-rs/src/routes/mod.rs` |
| AppStore | Thread-safe in-memory state (playlists, EPG, working set, pipeline status) + JSON persistence | `iptv-rs/src/store.rs` |
| Curation pipeline | 4-stage background job: fetch → dedupe → probe → EPG merge | `iptv-rs/src/services/pipeline.rs` |
| Curated registry | Hardcoded list of vetted M3U/EPG sources + metadata | `iptv-rs/src/services/curated.rs` |
| M3U parser | Parse `#EXTINF` playlists into `Channel`s | `iptv-rs/src/parsers/m3u.rs` |
| XMLTV parser | Parse EPG guides, optional time-window filtering | `iptv-rs/src/parsers/xmltv.rs` |
| Config | Env-driven `AppConfig` with defaults | `iptv-rs/src/config.rs` |
| Domain models | `Channel`, `Playlist`, `EpgData`, `Programme` | `iptv-rs/src/models/*` |
| SPA controller | Layouts (Home/Console/Library), playback, EPG rendering, virtual lists | `frontend/src/main.ts` |
| API client | Typed fetch wrappers + proxy URL builder | `frontend/src/api.ts` |
| Client store | localStorage-backed favorites/recents/prefs | `frontend/src/store.ts` |
| WASM helper | Client-side grouping/filter/parse offload | `iptv-wasm/src/lib.rs` |

## Pattern Overview

**Overall:** Three-tier single-binary web app — Rust/axum API + static-served TS SPA, with a Rust→WASM helper module compiled into the frontend bundle.

**Key Characteristics:**
- **Server-authoritative data.** All fetching, parsing, deduplication, and stream verification happen server-side; the browser consumes a pre-curated "working set".
- **In-memory-first store.** State lives in `RwLock`-guarded structures; JSON files are the durability layer, loaded on startup and rewritten on change.
- **Background curation.** A long-running pipeline populates state asynchronously; the UI polls progress and fills in progressively.
- **Proxy-always playback.** Every stream (manifest + segments + keys) is relayed through `/api/proxy` to defeat CORS and mixed-content.

## Layers

**Presentation (SPA):**
- Purpose: render layouts, drive playback, poll pipeline
- Location: `frontend/src/`
- Contains: DOM controller (`main.ts`), API client (`api.ts`), client store (`store.ts`), styles (`style.css`)
- Depends on: backend `/api/*`, `hls.js`, `iptv-wasm`
- Used by: end user in browser

**Client compute (WASM):**
- Purpose: offload CPU-ish list operations from the JS main thread
- Location: `iptv-wasm/src/lib.rs`, compiled to `iptv-wasm/pkg/`
- Contains: `extract_groups`, `filter_channels`, `parse_m3u`, `match_epg`, `fuzzy_score`, `export_m3u`
- Note: `main.ts` currently imports only `extract_groups`; other exports are available but unused

**API / HTTP (axum):**
- Purpose: expose state + proxy, serve SPA
- Location: `iptv-rs/src/routes/mod.rs`, `iptv-rs/src/main.rs`
- Depends on: `AppStore`, parsers, curated registry

**Domain / State:**
- Purpose: hold and persist playlists, EPG (indexed), working set, pipeline status
- Location: `iptv-rs/src/store.rs`, `iptv-rs/src/models/*`
- Used by: handlers and the pipeline

**Services:**
- Purpose: curation workflow + source catalog
- Location: `iptv-rs/src/services/{pipeline,curated}.rs`

## Data Flow

### Curation pipeline (background, startup + POST /api/pipeline/run)

1. Startup spawns `pipeline::run(store, false)` (`iptv-rs/src/main.rs:50`). Skips if working set is younger than `refresh_hours` (`pipeline.rs:126`).
2. `try_begin_pipeline` atomically flips status to running (`store.rs:445`).
3. **Stage 1 fetch** — download every `m3u` curated source, parse, save as playlist; concurrency capped at 4 (`pipeline.rs:163`).
4. **Stage 2 dedupe** — collapse all playlists to unique `Candidate`s keyed by tvg-id else normalized name; up to 6 mirror URLs each (`pipeline.rs:211`).
5. **Stage 3 probe** — probe each candidate concurrently (`check_concurrency`, default 64). HLS is verified deep: `.m3u8` must start `#EXTM3U` and resolve master→variant→segments (`#EXTINF`); other URLs need a 2xx/206 Range answer. First alive URL wins; dead candidates dropped. Snapshots persisted every 2000 (`pipeline.rs:265`).
6. **Stage 4 EPG** — download every `epg` source (gz-decompress if needed), parse in `spawn_blocking` within a `[now-6h, now+epg_window_hours]` window, merge deduped into `EpgState`; persist once at the end (`pipeline.rs:331`).
7. Status set to `done` with `last_run` timestamp (`pipeline.rs:152`).

### Channel list request (`GET /api/channels`)

1. Handler reads pipeline status (`routes/mod.rs:246`).
2. Returns working set (`source: "working"`) if present; else falls back to the raw union of all playlists (`source: "playlists"`) so the UI has data during the first run.
3. Response includes `pipeline` block so the SPA can render progress.

### EPG lookup (`GET /api/epg/channel/:id`)

1. `get_channel_programmes` acquires read lock on `EpgState` (`store.rs:310`).
2. Fuzzy tiered match: exact id → case-insensitive id → id sans country suffix → normalized display name.
3. `by_channel` index maps channel_id → programme indices (O(matches), not full scan).
4. Programmes sorted by RFC3339 start (lexical == chronological), truncated to 250. Always 200, empty list when no match.

### Stream proxy relay (`GET /api/proxy?url=`)

1. Validates http(s) scheme, forwards client `Range` (`routes/mod.rs:533`).
2. Uses a `OnceLock` static client with connect-timeout only (no total timeout — would cut live streams).
3. If body is a real HLS manifest (`#EXTM3U`, mpegurl/.m3u8, <5MB), rewrites every URI + `URI="..."` tag attribute back through `/api/proxy` so segments/keys stay same-origin.
4. Otherwise streams the body through, relaying `Content-Length`/`Content-Range`/`Accept-Ranges` for VOD seeking.

**State Management:**
- Server: `AppStore` fields each behind their own `RwLock`; clone-on-read for playlists/working set; EPG accessed under lock without cloning the guide.
- Client: module-level mutable vars in `main.ts` + localStorage via `store.ts` (`signal.*` keys) for favorites, recents, dead-marks, layout, hideDead.

## Key Abstractions

**AppStore:**
- Purpose: single owned state container shared as `Arc<AppStore>`
- Location: `iptv-rs/src/store.rs`
- Pattern: interior mutability via per-field `RwLock`; methods encapsulate lock scope

**EpgState:**
- Purpose: merged guide + `by_channel` index for fast per-channel lookup
- Location: `iptv-rs/src/store.rs:69`
- Pattern: incremental reindex on merge; dedupe by (channel_id, start)

**Candidate:**
- Purpose: a deduplicated channel carrying every distinct mirror URL
- Location: `iptv-rs/src/services/pipeline.rs:23`

**PipelineStatus:**
- Purpose: serializable progress object exposed at `/api/pipeline/status`
- Location: `iptv-rs/src/store.rs:11`

## Entry Points

**Backend binary:**
- Location: `iptv-rs/src/main.rs`
- Triggers: `cargo run` / built binary
- Responsibilities: config, load disk, spawn pipeline, build router (API + CORS + body limit + trace + `ServeDir` fallback), bind `0.0.0.0:port`, graceful shutdown

**Frontend entry:**
- Location: `frontend/src/main.ts` (referenced by `iptv-rs/static/index.html` at build output)
- Triggers: browser load; top-level `await init()` readies WASM before DOM work

## Architectural Constraints

- **Threading:** Tokio multi-threaded runtime. State locks are `std::sync::RwLock` (not tokio) — lock guards must never be held across `.await`. Heavy serialization/IO (`persist_epg`, `persist_working`) is dispatched to `spawn_blocking` to avoid stalling async workers.
- **Global state:** `AppStore` is the single shared singleton (`Arc`); the proxy HTTP client is a process-wide `OnceLock` static (`routes/mod.rs:475`).
- **Memory footprint:** the merged EPG guide is held fully in memory and can reach hundreds of MB (~350MB observed); the full guide is deliberately never served — only per-channel slices.
- **Circular imports:** none detected (graph report confirms no import cycles).
- **Static path:** SPA served from a crate-relative `static/` dir (`CARGO_MANIFEST_DIR`) so launch directory doesn't matter.
- **Insecure TLS:** all outbound clients use `danger_accept_invalid_certs(true)` to tolerate sloppy IPTV CDNs.

## Anti-Patterns

### Serving the full EPG guide
**What happens:** A naive endpoint could return the entire merged guide.
**Why it's wrong:** The guide is hundreds of MB in memory; serializing/sending it would stall the server and the client.
**Do this instead:** Use per-channel lookup `GET /api/epg/channel/:id` backed by the `by_channel` index (`store.rs:310`).

### Holding a lock across await
**What happens:** Grabbing a `RwLock` guard then `.await`ing while holding it.
**Why it's wrong:** `std::sync::RwLock` guards are not async-aware; this risks deadlocks/blocking the runtime.
**Do this instead:** Scope the guard, extract/clone what you need, drop the guard, then await — see `persist_epg` cloning the JSON string inside a narrow block (`store.rs:391`).

### Direct stream playback from the browser
**What happens:** Pointing hls.js/`<video>` straight at an upstream URL.
**Why it's wrong:** CORS and mixed-content block most public IPTV streams.
**Do this instead:** Route through `api.proxyUrl(url)` → `/api/proxy`, which also rewrites nested manifest URIs (`routes/mod.rs:489`).

## Error Handling

**Strategy:** Backend uses a central `AppError` enum (`iptv-rs/src/error.rs`) implementing `IntoResponse`; handlers return `Result<Json<Value>, AppError>`.

**Patterns:**
- Pipeline stages log-and-continue (`warn!`) rather than aborting the whole run on a single bad source.
- Disk loads fall back to `.bak` backups on parse failure (`store.rs:176`).
- EPG channel lookup returns 200 + empty list instead of an error, so "no guide" is a normal UI state.
- Frontend `fetchJson` throws on non-ok, surfaced via toasts.

## Cross-Cutting Concerns

**Logging:** `tracing` + `tracing-subscriber` with `EnvFilter` (default `iptv_rs=debug,tower_http=debug`); `TraceLayer` for HTTP. Frontend uses toasts + console.
**Validation:** Proxy scheme check; upload content presence checks; source-type inference from URL extension.
**Authentication:** None — open API, permissive CORS (`Any` origin/method/header).

---

*Architecture analysis: 2026-07-15*
