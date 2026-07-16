# External Integrations

**Analysis Date:** 2026-07-15

This app integrates only with **public/free IPTV playlist and EPG data sources over HTTP** and proxies **arbitrary upstream HLS streams** for the browser player. There is **no authentication provider, no database, and no third-party SaaS API** — all external contact is anonymous outbound HTTP fetches.

## APIs & External Services

**Curated data sources (`iptv-rs/src/services/curated.rs`):**
58 pre-configured free sources defined via a `SourceBuilder` (`get_curated_sources()`), each typed as `m3u` (channel playlist) or `epg` (XMLTV guide), with region/language/category metadata. `auto_fetch` sources are pulled on server startup by the curation pipeline. All verified alive as of 2026-07-14.

Source domains observed:

- `iptv-org.github.io` (34 URLs) — M3U playlists, the primary channel corpus (global index, per-country, per-category: news, sports, movies, entertainment, kids, music, documentary, education, comedy, culture, ...). Upstream project: `github.com/iptv-org/iptv`
- `epg.pw` (10 URLs) — gzipped XMLTV EPG per country: `epg_US/GB/DE/FR/CA/ES/IT/AU/BR/IN.xml.gz`
- `raw.githubusercontent.com` (7 URLs) — additional M3U/EPG including `dp247/Freeview-EPG/master/epg.xml` and `acidjesuz/EPGTalk/master/guide.xml`
- `i.mjh.nz` (6 URLs) — FAST-provider EPG (Pluto TV, Samsung TV Plus, Plex, Roku, PBS) as `.xml.gz`

**Access pattern:**
- Outbound only, no API keys. Client built in `iptv-rs/src/services/pipeline.rs` (`http_client(timeout_secs)`): reqwest with configurable timeout and `user_agent("iptv-rs/1.0")`. `fetch_capped` bounds response size.
- Manual on-demand fetch: `POST /api/sources/fetch`; list of sources: `GET /api/sources` (`iptv-rs/src/routes/mod.rs`).

## Data Storage

**Databases:** None. No SQL/NoSQL client, no ORM.

**File Storage (local filesystem only):**
- Base dir from `IPTV_DATA_DIR` (default `data/`), created at startup (`iptv-rs/src/config.rs`)
- `uploads/` — user-uploaded M3U playlists
- `epg/` — EPG files
- `working_channels.json` — persisted curated/probed working channel set (loaded on boot, `AppStore::load_all` in `iptv-rs/src/store.rs`)
- In production a Docker named volume `iptv-data` persists `/app/data` (`docker-compose.yml`)

**Caching:** In-memory application state via `AppStore` (`iptv-rs/src/store.rs`), shared as `Arc<AppStore>`. No external cache (no Redis/Memcached).

## Authentication & Identity

None. No login, no user accounts, no auth provider, no session/token handling. CORS is fully open (`CorsLayer` with `allow_origin(Any)`, `allow_methods(Any)`, `allow_headers(Any)` in `iptv-rs/src/main.rs`).

## Monitoring & Observability

**Error tracking:** None (no Sentry/etc.). Errors flow through `AppError` (`iptv-rs/src/error.rs`).

**Logs:** `tracing` + `tracing-subscriber` to stdout; `tower_http::trace::TraceLayer` logs HTTP requests. Level via `RUST_LOG`. A `GET /api/metrics` endpoint exposes in-process counts (`iptv-rs/src/routes/mod.rs`).

**Health:** `GET /api/health`.

## CI/CD & Deployment

**Hosting:** Self-hosted container. Multi-stage `Dockerfile` + `docker-compose.yml`. No cloud-provider-specific integration.

**CI Pipeline:** None detected (no `.github/workflows`, no CI config in repo).

## Environment Configuration

**Config vars (all optional, defaulted — see `iptv-rs/src/config.rs`):**
`IPTV_DATA_DIR`, `IPTV_PORT`, `IPTV_CHECK_CONCURRENCY`, `IPTV_EPG_WINDOW_HOURS`, `IPTV_REFRESH_HOURS`, `IPTV_MAX_UPLOAD_BYTES`, `RUST_LOG`.

**Secrets:** None required — every external source is public and unauthenticated. No `.env`, no secret store.

## Webhooks & Callbacks

**Incoming:** None.

**Outgoing HTTP (all via reqwest):**
- Source fetch — pipeline downloads curated M3U/EPG URLs (`iptv-rs/src/services/pipeline.rs`)
- Stream probing — `hls_playable` / `fetch_capped` verify master manifests resolve to playable HLS during curation
- **Stream proxy** — `GET /api/proxy?url=<encoded>` (`proxy_stream` in `iptv-rs/src/routes/mod.rs`): server-side fetches an arbitrary upstream URL to bypass browser CORS/mixed-content. Dedicated `proxy_client()` (reqwest `OnceLock` singleton, connect-timeout only, no total timeout to allow long live streams). For `.m3u`/`.m3u8` responses it rewrites every URI in the HLS manifest back through `/api/proxy?url=...` (`rewrite_manifest`); `.xml`/`.xml.gz` handled for EPG. **Target space is unbounded** — any URL passed by the client is fetched (open-proxy / SSRF surface; noted for CONCERNS).

## Browser-Side Integrations

- **hls.js ^1.5.13** (`frontend/src/main.ts`) — adaptive HLS playback; instantiated when a URL matches `/\.m3u8($|\?)/i` and `Hls.isSupported()`, with tuned buffer/timeout options. Streams are loaded through the backend `/api/proxy` to avoid CORS.
- **iptv-wasm (WASM)** (`iptv-wasm/src/lib.rs`) — Rust compiled to WASM, imported in `frontend/src/main.ts` via `import init, { extract_groups } from 'iptv-wasm'` and initialized with top-level `await init()`. Exports: `parse_m3u`, `filter_channels`, `match_epg`, `fuzzy_score`, `extract_groups`. Offloads parsing/filtering/fuzzy-search to client-side WASM.
- **Backend REST API** consumed by `frontend/src/api.ts` (typed client). Endpoints (`iptv-rs/src/routes/mod.rs`): `/api/playlists` (+ `:name`, `/upload`), `/api/epg/upload`, `/api/epg/channel/:id`, `/api/channels`, `/api/channels/search`, `/api/sources` (+ `/fetch`), `/api/pipeline/status`, `/api/pipeline/run`, `/api/proxy`, `/api/export/:name`, `/api/metrics`, `/api/health`.

---

*Integration audit: 2026-07-15*
