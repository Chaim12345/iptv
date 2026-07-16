# Testing Patterns

**Analysis Date:** 2026-07-15

**Honest summary:** Testing is minimal. The only automated tests are **8 Rust
unit tests** covering the two parsers in `iptv-rs`. There are **no frontend
tests**, **no WASM tests**, and **no integration/E2E tests**. `axum-test` is
declared as a dev-dependency but is not used anywhere in the codebase.

## Test Framework

**Rust (`iptv-rs`):**
- Built-in Rust test harness (`#[test]` + `cargo test`). No external assertion
  or test-runner crate is used in the actual tests.
- `axum-test = "15"` is listed under `[dev-dependencies]` in
  `iptv-rs/Cargo.toml` but has **zero usages** (`grep TestServer` → none).
  It is aspirational, not active.

**WASM (`iptv-wasm`):** No `wasm-bindgen-test`, no tests.

**Frontend (`frontend`):** No test runner in `package.json`
(scripts are only `dev`, `build`, `preview`). No `vitest`/`jest` config,
no `*.test.ts` / `*.spec.ts` files.

**Run Commands:**
```bash
cd iptv-rs
cargo test          # Run all 8 unit tests
cargo test m3u      # Run only the M3U parser tests
cargo test xmltv    # Run only the XMLTV parser tests (module path is parsers::xmltv)
cargo check         # Fast type/compile check (no tests)
```

## Test File Organization

**Location:** Co-located inline `#[cfg(test)] mod tests { ... }` at the bottom
of the source file under test. No separate `tests/` integration directory.

**Files containing tests:**
- `iptv-rs/src/parsers/m3u.rs:166-204` — 4 tests
- `iptv-rs/src/parsers/xmltv.rs:236-285` — 4 tests

**Naming:** `test_<behavior>` snake_case (`test_basic_parse`,
`test_missing_header`, `test_multiple_channels`, `test_unquoted_attributes`,
`test_basic_epg`, `test_date_parsing_utc`, `test_date_parsing_offset`,
`test_date_no_timezone`).

> Note: `iptv-rs/AGENTS.md` claims a 9th test in `config.rs` ("verifies default
> config construction"). This is **stale** — `config.rs` contains no tests
> (`grep #[test] src/config.rs` → none). Actual count is 8.

## Test Structure

Standard inline module with `use super::*;`:
```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_parse() {
        let content = "#EXTM3U\n#EXTINF:-1 tvg-id=\"ch1\" ...,Channel One\nhttp://example.com/stream1";
        let channels = M3uParser::parse(content).unwrap();
        assert_eq!(channels.len(), 1);
        assert_eq!(channels[0].name, "Channel One");
        assert_eq!(channels[0].tvg_id, Some("ch1".to_string()));
    }
}
```

**Patterns observed:**
- Inputs are inline string/`&[u8]` literals (raw strings `r#"..."#` for XML in
  `xmltv.rs`), no fixture files.
- Assertions use `assert_eq!` and `assert!(... .is_err())` / `.is_some()`.
- Happy path parsed via `.unwrap()`; error path checked via `.is_err()`.
- `xmltv.rs` imports `chrono::Timelike` in the test module to assert `.hour()`
  on parsed timezone-adjusted dates.

## What The Tests Cover

**M3U parser (`parsers/m3u.rs`):**
- Basic single-channel parse with quoted attributes (name, url, tvg_id, group).
- Rejection when `#EXTM3U` header is missing.
- Multiple channels in one playlist.
- Unquoted attribute values (`tvg-id=ch2`).

**XMLTV parser (`parsers/xmltv.rs`):**
- Basic EPG parse (channels + programmes + computed `duration_minutes`).
- Date parsing: UTC (`+0000`), offset (`+0200` → UTC), and no-timezone
  (assumed UTC).

## Mocking / Fixtures

- No mocking framework. No fixtures or factories — all test data is inline
  literals.
- No HTTP mocking; network-touching code (`reqwest` in `services/`) is untested.

## Coverage

- No coverage tooling configured; no enforced target.
- Effective coverage is limited to the two pure parsers. Everything else —
  `store.rs` (dedup, EPG merge, fuzzy matching, persistence), `services/`
  (curation pipeline, source fetching), `routes/` (HTTP handlers, proxy),
  `config.rs`, the entire frontend, and the WASM module — is **untested**.

## Coverage Gaps & Recommended Additions

High-value, currently untested logic (recommend adding tests, roughly in
priority order):

1. **`store.rs` EPG merge dedup** — `EpgState::merge`/`reindex` atomic merge and
   channel→programme indexing. Pure-ish logic, high regression risk.
2. **Fuzzy EPG matcher** — `normalize_channel_name` and `strip_id_suffix`
   (`store.rs:23`, `:34`) normalize ids/names for matching; ideal for
   table-driven unit tests (e.g. `"channel4.uk" → "channel4"`).
3. **Manifest rewriting / proxy** — the HLS manifest rewrite + range passthrough
   in `routes/` (`/api/proxy`) has no tests; extract the rewrite into a pure fn
   and unit-test master→variant→segment URL rewriting.
4. **Route/handler integration tests** — activate the already-declared
   `axum-test` dev-dependency: build the router and assert on `/api/health`,
   `/api/channels`, `/api/sources`, upload endpoints.
5. **WASM `parse_m3u`** — add `wasm-bindgen-test` coverage (or share a pure Rust
   parse fn with `iptv-rs` and test once).
6. **Frontend** — no runner exists. Add `vitest` and cover `fetchJson` error
   handling (`api.ts`), `store` favorite/recent/localStorage round-trips
   (`store.ts`), and later the `main.ts` UI logic.
7. **XMLTV edge cases** — malformed dates (`warn!` + `None` path), missing
   channel/programme ids, and the windowed-filter path (`parse_window`) are
   currently unexercised.

## Test Types

- **Unit tests:** Yes — 8, parsers only.
- **Integration tests:** None (despite `axum-test` being available).
- **E2E tests:** None.

## Common Patterns

**Async testing:** None present. No `#[tokio::test]` anywhere, even though the
backend is fully async (tokio). Async service/route code is currently untested.

**Error testing:**
```rust
let content = "#EXTINF:-1,Channel 1\nhttp://stream1"; // no #EXTM3U header
assert!(M3uParser::parse(content).is_err());
```

---

*Testing analysis: 2026-07-15*
