# Technology Stack

**Analysis Date:** 2026-07-15

## Languages

**Primary:**
- Rust (edition 2021) — Backend HTTP server (`iptv-rs/`) and browser-side parsing crate (`iptv-wasm/`)
- TypeScript ~5.5 — Frontend SPA (`frontend/src/*.ts`); `tsc` runs before every production build

**Secondary:**
- HTML/CSS — Single `frontend/index.html` entry + `frontend/src/style.css` (~34 KB hand-written styles)
- WASM (compiled from Rust) — `iptv-wasm` compiled with `crate-type = ["cdylib", "rlib"]`

## Runtime

**Environment:**
- Backend: native binary `iptv-rs`, async runtime is Tokio (`tokio = { version = "1", features = ["full"] }`)
- Frontend: browser (ES modules, `target: esnext`), served as static files by the Rust backend
- Build toolchain: Node.js 20 (Dockerfile installs via nodesource), Rust 1.77 (Dockerfile base `rust:1.77-bookworm`)

**Package Managers:**
- Cargo (Rust) — `iptv-rs/Cargo.toml`, `iptv-wasm/Cargo.toml`
- npm (frontend) — `frontend/package.json`; Dockerfile uses `npm ci` (lockfile expected)

## Frameworks

**Core (backend — `iptv-rs/Cargo.toml`):**
- axum 0.7 (features `multipart`) — HTTP router / handlers (`iptv-rs/src/routes/mod.rs`)
- tower 0.4 + tower-http 0.5 (features `fs`, `cors`, `trace`) — static file serving (`ServeDir`), CORS, request tracing (`iptv-rs/src/main.rs`)
- tokio 1 (`full`) — async runtime, task spawning, graceful shutdown

**Frontend framework:**
- No UI framework — vanilla TypeScript SPA. Entry `frontend/src/main.ts` (~46 KB) drives all DOM/state; helper modules `frontend/src/api.ts` (typed backend client) and `frontend/src/store.ts`
- hls.js ^1.5.13 — HLS playback in the browser (`frontend/src/main.ts`)
- iptv-wasm (`file:../iptv-wasm/pkg`) — local WASM package consumed via `import init, { extract_groups } from 'iptv-wasm'`

**Testing:**
- Backend dev-dependency: axum-test 15 (`iptv-rs/Cargo.toml` `[dev-dependencies]`)
- Root-level JS test files exist (`epg-parser-tests.js`, `m3u-parser-tests.js`, `test-runner.html`) — legacy/standalone, not wired into the Vite frontend
- No frontend test runner configured in `frontend/package.json`

**Build/Dev:**
- Vite ^5.4 — frontend dev server + bundler (`frontend/vite.config.ts`)
- vite-plugin-wasm ^3.3 + vite-plugin-top-level-await ^1.4 — enable WASM ESM imports and top-level `await init()`
- wasm-pack — builds `iptv-wasm` with `--target web --release` (Dockerfile)
- TypeScript compiler — `tsc && vite build` in the `build` script

## Key Dependencies

**Backend HTTP / networking:**
- reqwest 0.12 (features `json`, `stream`, `gzip`, `brotli`) — all outbound fetches: source playlists, EPG downloads, stream proxying (`iptv-rs/src/services/pipeline.rs`, `iptv-rs/src/routes/mod.rs`)
- futures-util 0.3 — stream combinators for concurrent probing

**Parsing / data:**
- quick-xml 0.31 (feature `serialize`) — XMLTV EPG parsing (`iptv-rs/src/parsers/xmltv.rs`)
- flate2 1 — gzip decompression of `.xml.gz` EPG payloads (`iptv-rs/src/routes/mod.rs`, pipeline)
- serde 1 + serde_json 1 — JSON (de)serialization across models, store, API responses
- chrono 0.4 (feature `serde`) — EPG programme time windows
- Custom M3U parser (`iptv-rs/src/parsers/m3u.rs`) — no external M3U crate

**WASM crate (`iptv-wasm/Cargo.toml`):**
- wasm-bindgen 0.2, serde-wasm-bindgen 0.6, js-sys 0.3, web-sys 0.3 (feature `console`)
- Release profile tuned for size: `opt-level = "s"`, `lto = true`

**Utility / infra:**
- tracing 0.1 + tracing-subscriber 0.3 (feature `env-filter`) — structured logging, level via `RUST_LOG` env filter (`iptv-rs/src/main.rs`)
- uuid 1 (`v4`), tempfile 3, mime_guess 2, urlencoding 2, async-trait 0.1
- thiserror 1 + anyhow 1 — error types (`iptv-rs/src/error.rs`) and `main` result

## Configuration

**Environment (all read in `iptv-rs/src/config.rs` via `AppConfig::from_env`):**
- `IPTV_DATA_DIR` — base data dir (default `data`); derives `uploads/`, `epg/`, `working_channels.json`
- `IPTV_PORT` — listen port (default `5000`)
- `IPTV_CHECK_CONCURRENCY` — concurrent stream probes (default `64`)
- `IPTV_EPG_WINDOW_HOURS` — EPG retention window (default `48`)
- `IPTV_REFRESH_HOURS` — skip startup pipeline if working set younger than this (default `6`)
- `IPTV_MAX_UPLOAD_BYTES` — upload body limit (default `100 MB`)
- `RUST_LOG` — tracing filter (defaults to `iptv_rs=debug,tower_http=debug`)
- No `.env` file in repo; configuration is pure environment variables

**Build:**
- `frontend/vite.config.ts` — dev server port 3000, `/api` proxied to `http://localhost:5000`, build `outDir: '../iptv-rs/static'` with `emptyOutDir: true`
- Backend serves that same `static/` dir at runtime via `ServeDir::new(concat!(env!("CARGO_MANIFEST_DIR"), "/static"))` with SPA fallback

## Platform Requirements

**Development:**
- Rust 1.77+ with wasm-pack and the `wasm32-unknown-unknown` target
- Node.js 20 + npm
- Workflow: build WASM (`wasm-pack build --target web --release` in `iptv-wasm/`) → build frontend (`npm run build` in `frontend/`, emits to `iptv-rs/static`) → run backend (`cargo run` in `iptv-rs/`)

**Production:**
- Multi-stage Docker build (`Dockerfile`): stage 1 `rust:1.77-bookworm` builds WASM + frontend + release binary; stage 2 `debian:bookworm-slim` with `ca-certificates` + `libssl3`
- Runtime image copies the `iptv-rs` binary and `static/` (+ `templates/`), exposes port 5000, `CMD ["./iptv-rs"]`
- `docker-compose.yml` maps `5000:5000`, mounts named volume `iptv-data` at `/app/data`, `restart: unless-stopped`

---

*Stack analysis: 2026-07-15*
