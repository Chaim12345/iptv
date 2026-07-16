# Coding Conventions

**Analysis Date:** 2026-07-15

This is a polyglot repo: a Rust/axum backend (`iptv-rs/`), a Rust→WASM
grouping/parsing module (`iptv-wasm/`), and a vanilla TypeScript + Vite frontend
(`frontend/`). Conventions differ per language; both Rust and TS conventions are
observed below with file references.

## Naming Patterns

**Rust files/modules (`iptv-rs/src`, `iptv-wasm/src`):**
- Modules are `snake_case` directories with a `mod.rs` re-export barrel:
  `models/mod.rs`, `parsers/mod.rs`, `routes/mod.rs`, `services/mod.rs`.
- Barrel modules re-export public types with `pub use`
  (`iptv-rs/src/models/mod.rs`: `pub use channel::Channel;`).
- Types: `PascalCase` (`AppError`, `M3uParser`, `XmltvParser`, `AppStore`,
  `PipelineStatus`, `ExtinfAttrs`, `EpgData`).
- Functions/methods/vars: `snake_case`
  (`parse_extinf`, `parse_xmltv_date`, `normalize_channel_name`,
  `strip_id_suffix`, `safe_filename`).
- Parsers are unit structs used as namespaces with associated functions
  (`M3uParser::parse`, `XmltvParser::parse_window`) rather than free functions.
- WASM entry points are free functions annotated `#[wasm_bindgen]`
  (`iptv-wasm/src/lib.rs`: `parse_m3u`).

**TypeScript files (`frontend/src`):**
- Files: lowercase single-word (`api.ts`, `store.ts`, `main.ts`, `style.css`).
- Interfaces/types: `PascalCase` (`Channel`, `Programme`, `PipelineStatus`,
  `CuratedSource`, `Playlist`, `Store` in `frontend/src/api.ts` and
  `frontend/src/store.ts`).
- Functions/vars: `camelCase` (`fetchJson`, `toggleFavorite`, `addRecent`,
  `setHideDead`).
- Object fields that mirror backend JSON keep the backend's `snake_case`
  (`tvg_id`, `response_time_ms`, `duration_minutes`, `channel_id`) so payloads
  deserialize without transformation. Do NOT camelCase these — they must match
  the Rust `serde` field names.
- A single-char DOM helper `$` is the standard element accessor
  (`frontend/src/main.ts:13`):
  `const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(...)`.

## Code Style

**Formatting:**
- No `rustfmt.toml` / `.rustfmt.toml` present — default `rustfmt` style applies
  (4-space indent, standard `cargo fmt`).
- No `.prettierrc`, `.eslintrc`, or `eslint.config.*` present. TS is formatted
  by hand: 2-space indent, single quotes, semicolons, trailing commas in
  multiline literals (see `frontend/src/api.ts`, `store.ts`).
- Keep existing per-language style; there is no automated formatter gate in CI.

**Linting:**
- No linter configured for either language. `cargo check` / `cargo build` are
  the only static gates (see `iptv-rs/AGENTS.md`).

**TypeScript strictness (`frontend/tsconfig.json`):**
- `"strict": true`, `"noImplicitReturns": true`,
  `"forceConsistentCasingInFileNames": true`.
- `"noUnusedLocals": false` and `"noUnusedParameters": false` — unused
  bindings are tolerated.
- Target `ES2022`, module `ESNext`, `moduleResolution: "bundler"`,
  `declaration` + `sourceMap` on. Build runs `tsc && vite build`
  (`frontend/package.json`), so type errors fail the build.

## Import Organization

**Rust:**
1. `crate::` internal imports first
   (`use crate::models::Channel;` in `parsers/m3u.rs`).
2. External crates next
   (`use tracing::{debug, warn};`, `use chrono::{...};`,
   `use quick_xml::...;`).
- `std` grouped with the others as needed (`use std::collections::{...};`,
  `use std::sync::RwLock;` in `store.rs`).
- `#[allow(unused_imports)]` used deliberately on re-exports that aren't yet
  consumed (`models/mod.rs`).

**TypeScript:**
- `import type { ... }` for type-only imports
  (`frontend/src/store.ts`: `import type { Channel } from './api';`).
- Relative `./` paths; the WASM package is imported as a normal dependency
  (`iptv-wasm` mapped via `file:../iptv-wasm/pkg` in `frontend/package.json`).
- No path aliases configured.

## Error Handling

**Rust — unified `AppError` (`iptv-rs/src/error.rs`):**
- Single crate-wide error enum derived with `thiserror::Error`; each variant
  has an `#[error("...")]` message.
- `#[from]` conversions for `std::io::Error`, `serde_json::Error`,
  `reqwest::Error`, and axum `MultipartError` — lets handlers use `?`.
- Implements axum `IntoResponse`, mapping each variant to a `StatusCode` and a
  JSON body `{ "error": message }`. Add new failure modes as `AppError`
  variants, not ad-hoc responses.
- `anyhow` is available as a dependency for internal/service-level errors.
- Parsers return `Result<T, String>` (plain string errors), not `AppError`
  (`M3uParser::parse`, `XmltvParser::parse` → `Result<_, String>`); callers map
  these into `AppError::Parse` at the boundary.
- Recoverable/tolerant parsing: bad lines are logged with `warn!` and skipped
  rather than aborting the whole parse (`parsers/m3u.rs:26`, `:43`, `:51`).

**TypeScript (`frontend/src/api.ts`):**
- Centralized `fetchJson<T>` helper throws `Error` on non-OK responses, reading
  the backend `{ error }` body when present, falling back to `resp.statusText`.
- `localStorage` reads wrapped in `try { ... } catch { /* ignore */ }` with a
  default fallback (`frontend/src/store.ts:17-40`).

## Logging

**Rust:** `tracing` crate with `tracing-subscriber` (`env-filter`).
- Levels used: `debug!` for parse summaries, `warn!` for recoverable issues,
  `error!`/`info!` in `store.rs`. Structured messages, not `println!`.

**TypeScript:** No logging framework; `console` only where needed.

## Comments

**Rust:**
- Doc-comments (`///`) on public parsers and non-obvious helpers
  (`parsers/m3u.rs:4`, `parsers/xmltv.rs:17`, `store.rs:23` explaining
  `strip_id_suffix`, `store.rs:10` on `PipelineStatus`).
- Inline `//` comments explain intent of tricky steps (splitting on the LAST
  comma in EXTINF, streaming-window filtering to avoid materializing a 300MB
  guide).
- `_ => { /* ignore unknown attributes */ }` style for intentional no-ops.

**TypeScript:**
- `/** ... */` block doc-comments at file/section top
  (`api.ts:2` "Typed API client", `store.ts:4` "Persistent client-side state").
- Inline `//` trailing comments annotate struct fields
  (`store.ts:6` `favorites: Set<string>;  // URL → starred`).

## Function Design

**Rust:**
- Associated functions on namespace structs; helpers kept `fn` (private) unless
  part of the API. `parse` delegates to smaller privates (`parse_extinf`,
  `parse_attributes`, `attr`).
- Manual `Default` impls where field defaults are non-trivial
  (`xmltv.rs:210` `EpgChannel`, `:220` `Programme` with `title: "No Title"`).
- `Option<String>` for optional attributes; `.take()` used to move-out and
  reset accumulator state during streaming parse.

**TypeScript:**
- Small single-purpose functions; the `store` and `api` are plain object
  literals of methods (no classes).
- Generics for typed fetches (`fetchJson<T>`) and DOM lookups (`$<T>`).

## Module Design

**Rust:** Layered — `models` (data) → `parsers` (pure, testable) → `services`
(business logic: `curated.rs`, `pipeline.rs`) → `routes` (HTTP) → `main.rs`
(wiring). `store.rs` is a thread-safe `RwLock`-guarded in-memory store with JSON
persistence. Barrel `mod.rs` files re-export the public surface.

**TypeScript:** `api.ts` (types + HTTP client), `store.ts` (localStorage-backed
state singleton), `main.ts` (single ~1200-line UI controller/entry). No barrel
files.

**WASM (`iptv-wasm/src/lib.rs`):** serde-derived structs with `#[serde(default)]`
on every optional field so backend payloads missing keys still deserialize;
`#[wasm_bindgen]` free functions return `JsValue`. Release profile tuned for
size (`opt-level = "s"`, `lto = true`).

## Commit Message Style

From `git log --oneline -15`:
- Conventional Commits prefixes: `feat:`, `chore:` (and a GitHub merge commit).
- Subject is lowercase, imperative, often with an em-dash scope note
  (`feat: TV-style IPTV app — Rust backend, curation pipeline, Home/Discover UI`).
- Bodies use bulleted sections grouped by area (Backend / Frontend), explaining
  what and why.
- Claude-authored commits end with a trailer:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>` (also seen:
  `Claude Fable 5 <noreply@anthropic.com>`). Match this trailer format on
  agent-generated commits.

---

*Convention analysis: 2026-07-15*
