# Codebase Structure

**Analysis Date:** 2026-07-15

## Directory Layout

```
iptv/
├── iptv-rs/                    # Rust axum backend (the deployable binary)
│   ├── src/
│   │   ├── main.rs             # Bootstrap: config, pipeline spawn, router, serve
│   │   ├── config.rs           # AppConfig from env vars
│   │   ├── error.rs            # AppError enum + IntoResponse
│   │   ├── routes/mod.rs       # All /api/* handlers + /api/proxy relay
│   │   ├── store.rs            # AppStore, EpgState index, working set, persistence
│   │   ├── services/
│   │   │   ├── mod.rs
│   │   │   ├── pipeline.rs      # 4-stage curation: fetch→dedupe→probe→EPG
│   │   │   └── curated.rs       # Hardcoded curated M3U/EPG source registry
│   │   ├── parsers/
│   │   │   ├── mod.rs
│   │   │   ├── m3u.rs           # M3uParser (#EXTINF)
│   │   │   └── xmltv.rs         # XmltvParser (+ parse_window)
│   │   └── models/
│   │       ├── mod.rs
│   │       ├── channel.rs       # Channel
│   │       ├── playlist.rs      # Playlist
│   │       └── programme.rs     # Programme, EpgData, EpgChannel
│   ├── static/                 # Vite build output (SERVED, do not hand-edit)
│   │   ├── index.html
│   │   └── assets/             # hashed JS/CSS/WASM
│   ├── data/                   # Runtime JSON state (gitignored data)
│   │   ├── uploads/            # per-playlist *.json (+ .bak)
│   │   ├── epg/epg_data.json   # merged EPG guide
│   │   └── working_channels.json
│   ├── Cargo.toml
│   └── target/                 # Rust build artifacts
├── frontend/                   # Vite + TypeScript SPA (source of truth for UI)
│   ├── src/
│   │   ├── main.ts             # ~1200-line DOM controller (Home/Console/Library)
│   │   ├── api.ts              # Typed API client + types
│   │   ├── store.ts            # localStorage client store
│   │   └── style.css
│   ├── index.html              # SPA template (dev)
│   ├── public/
│   ├── vite.config.ts          # outDir → ../iptv-rs/static; /api proxy → :5000
│   ├── tsconfig.json
│   ├── package.json
│   └── dist/                   # (stray; real output goes to iptv-rs/static)
├── iptv-wasm/                  # Rust → WASM helper compiled into the frontend
│   ├── src/lib.rs              # extract_groups, filter_channels, parse_m3u, ...
│   ├── pkg/                    # wasm-pack output, consumed via file: dep
│   └── Cargo.toml
├── .planning/                  # GSD planning + codebase docs + graphs
│   ├── codebase/               # (this document set)
│   └── graphs/GRAPH_REPORT.md
├── .stitch_ref/                # UI reference mockups (design inspiration)
├── uploads/ · graphify-out/    # scratch / tooling artifacts
└── playlist.m3u                # sample playlist
```

## Directory Purposes

**`iptv-rs/`:**
- Purpose: the backend and the thing you actually deploy (also serves the SPA)
- Contains: axum server, curation pipeline, parsers, in-memory store
- Key files: `src/main.rs`, `src/routes/mod.rs`, `src/store.rs`, `src/services/pipeline.rs`

**`frontend/`:**
- Purpose: source of truth for all UI; built by Vite into `iptv-rs/static/`
- Contains: TS SPA (`main.ts`/`api.ts`/`store.ts`), styles, Vite config
- Key files: `src/main.ts`, `vite.config.ts`

**`iptv-wasm/`:**
- Purpose: Rust helper compiled to WASM, imported by the frontend as `iptv-wasm` (a `file:../iptv-wasm/pkg` dependency)
- Contains: channel grouping/filter/parse/export functions
- Key files: `src/lib.rs`, `pkg/`

**`iptv-rs/static/` and `iptv-rs/data/`:**
- `static/` is generated (Vite build) and committed for serving — never edit by hand.
- `data/` holds runtime JSON state produced by the pipeline/uploads.

## Key File Locations

**Entry Points:**
- `iptv-rs/src/main.rs`: backend process entry
- `frontend/src/main.ts`: SPA entry (bundled into `static/`)

**Configuration:**
- `iptv-rs/src/config.rs`: env vars (`IPTV_DATA_DIR`, `IPTV_PORT` default 5000, `IPTV_CHECK_CONCURRENCY` 64, `IPTV_EPG_WINDOW_HOURS` 48, `IPTV_REFRESH_HOURS` 6, `IPTV_MAX_UPLOAD_BYTES` 100MB)
- `frontend/vite.config.ts`, `frontend/tsconfig.json`, `iptv-rs/Cargo.toml`, `iptv-wasm/Cargo.toml`

**Core Logic:**
- API surface: `iptv-rs/src/routes/mod.rs`
- State + persistence: `iptv-rs/src/store.rs`
- Curation: `iptv-rs/src/services/pipeline.rs`, `iptv-rs/src/services/curated.rs`

**Testing:**
- Loose HTML/JS test harnesses at repo root: `test-runner.html`, `m3u-parser-tests.js`, `epg-parser-tests.js` (legacy, not wired into the Rust/TS toolchain). Rust `#[cfg(test)]` modules live inside parser files.

## Build → Serve Wiring

1. Build WASM: `wasm-pack build iptv-wasm` → outputs `iptv-wasm/pkg/`.
2. Frontend depends on it via `"iptv-wasm": "file:../iptv-wasm/pkg"` (`frontend/package.json`).
3. `npm run build` in `frontend/` runs `tsc && vite build`; Vite (`vite-plugin-wasm` + `vite-plugin-top-level-await`) emits to `outDir: ../iptv-rs/static` with `emptyOutDir: true`.
4. `iptv-rs` serves that directory via `ServeDir` as the router fallback (`main.rs:58`), so `/` → `index.html`, hashed `/assets/*`, and WASM; `/api/*` routes match first.
5. Dev mode: `npm run dev` serves the SPA on `:3000` and proxies `/api` → `http://localhost:5000` (the running `iptv-rs`).

## Naming Conventions

**Files:**
- Rust: snake_case modules (`pipeline.rs`, `xmltv.rs`)
- TS: lowercase single-word (`main.ts`, `api.ts`, `store.ts`)

**Directories:**
- Crates hyphenated (`iptv-rs`, `iptv-wasm`); source subdirs by role (`routes`, `services`, `parsers`, `models`)

## Where to Add New Code

**New API endpoint:**
- Add handler fn in `iptv-rs/src/routes/mod.rs` and register the route in `build()` (`routes/mod.rs:41`). Specific routes before parameterized ones.

**New pipeline stage / curation logic:**
- Extend `iptv-rs/src/services/pipeline.rs`; add sources to `iptv-rs/src/services/curated.rs`.

**New domain model:**
- Add a file under `iptv-rs/src/models/` and re-export from `models/mod.rs`. Keep the TS mirror in `frontend/src/api.ts` in sync.

**New UI feature / layout:**
- Implement in `frontend/src/main.ts`; styles in `frontend/src/style.css`. Layouts are `home | console | library`.

**New client-side compute helper:**
- Add a `#[wasm_bindgen]` fn in `iptv-wasm/src/lib.rs`, rebuild the pkg, import in `main.ts`.

**Config knob:**
- Add a field to `AppConfig` and read it in `AppConfig::from_env` (`iptv-rs/src/config.rs`).

## Special Directories

**`iptv-rs/static/`:** Generated by Vite build. Committed. Do NOT hand-edit.
**`iptv-rs/data/`:** Runtime state (playlists, EPG, working set + `.bak`). Generated by the app.
**`iptv-wasm/pkg/`:** Generated by wasm-pack; consumed as a local file dependency.
**`frontend/dist/`:** Stray/default Vite dir — the real build target is `iptv-rs/static`.
**`.stitch_ref/`:** UI mockups for design reference only, not shipped.

---

*Structure analysis: 2026-07-15*
