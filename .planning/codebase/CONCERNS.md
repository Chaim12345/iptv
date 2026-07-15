# Codebase Concerns

**Analysis Date:** 2026-07-15

Scope: `iptv-rs/` (axum backend), `frontend/` (Vite+TS SPA), `iptv-wasm/` (Rust→WASM). Each concern below was verified against source before listing. Concerns are labelled **[ACCEPTED RISK]** where the user has explicitly deferred them, versus **[OPEN]** for issues still to triage.

## Security Considerations

### SSRF via `/api/proxy` and `/api/sources/fetch` — [ACCEPTED RISK, per user]

- Risk: Both endpoints accept arbitrary user-supplied http(s) URLs and fetch them server-side with no host allowlist, no private-IP/loopback/link-local blocking, and following redirects.
  - `/api/sources/fetch`: `fetch_source` reads `body.url` and passes it straight into `client.get(&url)` — `iptv-rs/src/routes/mod.rs:351-371`. The only validation is a substring check for `.m3u`/`.xml` in the URL (`:382-463`), applied *after* the request is sent.
  - `/api/proxy`: `proxy_stream` accepts `?url=`, validates only the `http://`/`https://` scheme prefix (`iptv-rs/src/routes/mod.rs:540-542`), then fetches it (`:544-552`). HLS manifest rewriting (`rewrite_manifest`, `:489-529`) re-points every segment back through the same open proxy, so a single request can pivot to further internal hosts.
- Amplifying factors (all verified):
  - Server binds `0.0.0.0` (all interfaces) — `iptv-rs/src/main.rs:74`.
  - Fully permissive CORS: `allow_origin(Any).allow_methods(Any).allow_headers(Any)` — `iptv-rs/src/main.rs:66-71`.
  - No authentication or authorization layer anywhere in the router — `iptv-rs/src/routes/mod.rs:41-68`.
  - TLS verification disabled on every outbound client (`danger_accept_invalid_certs(true)`) — `iptv-rs/src/routes/mod.rs:363`, `:480`; `iptv-rs/src/services/pipeline.rs:34`.
- Current mitigation: Scheme restricted to http(s) on `/api/proxy` only; no mitigation on `/api/sources/fetch`.
- Status: **Explicitly deferred by the user.** Documented as a known accepted risk of running this as a local/single-user tool, not a bug to fix now. If the service is ever exposed beyond localhost, this becomes a critical SSRF and must be revisited (host allowlist, private-range blocking, disable redirects, add auth, bind `127.0.0.1`).

### Disabled TLS certificate validation — [OPEN, low]

- Risk: `danger_accept_invalid_certs(true)` on all three HTTP clients (`iptv-rs/src/routes/mod.rs:363`, `:480`; `iptv-rs/src/services/pipeline.rs:34`) means MITM of upstream playlist/EPG/stream fetches is undetectable.
- Cause: Many free IPTV sources ship broken/self-signed certs, so this was likely pragmatic.
- Mitigation path: Prefer a per-source opt-out over a global one; log when an invalid cert is accepted.

## Reliability Concerns — [OPEN]

### Stream verification cannot guarantee playability

- Problem: `check_stream` / `hls_playable` only confirm a manifest is reachable and resolves one level to segments (`iptv-rs/src/services/pipeline.rs:76-122`). It cannot detect geo-blocking, auth-gated streams, or a stream that dies between probe and play. A channel marked `status = "alive"` (`:292`) may still fail in the player.
- Impact: Users see channels that don't play; perceived quality gap between reported and actual availability.
- Mitigation: Fallback mirror URLs are stored (`ch.urls`, `iptv-rs/src/services/pipeline.rs:287-291`) so the client can retry alternates — partial mitigation only.

### Channel-count drift between probe and use

- Problem: The working set is snapshotted progressively every 2000 checks during probing (`SNAPSHOT_EVERY`, `iptv-rs/src/services/pipeline.rs:29`, `:316-323`), and `list_channels` serves whatever snapshot exists (`iptv-rs/src/routes/mod.rs:246-271`). Counts reported by `/api/metrics` and `/api/pipeline/status` drift while a run is in progress, and a stream alive at probe time may be dead by view time.
- Impact: Inconsistent totals shown in UI mid-run; not a data-loss bug.

## Performance Concerns — [OPEN]

### Large merged EPG held fully in memory and re-serialized

- Problem: The entire merged EPG guide (reported ~350MB JSON / high RSS) lives in memory as `EpgState` (`iptv-rs/src/store.rs:69-126`) plus a `by_channel` index. `persist_epg` serializes the whole guide to a single JSON string before writing (`iptv-rs/src/store.rs:391-401`) — the code comment itself flags it as "heavy" and hundreds of MB (`:388-390`, `iptv-rs/src/services/pipeline.rs:413-419`).
- Impact: High steady-state RSS; large allocation spikes on each persist; slow startup load (`load_all` parses the full JSON blob, `iptv-rs/src/store.rs:219-243`).
- Mitigation in place: Persist is moved off the async runtime via `spawn_blocking` (`iptv-rs/src/services/pipeline.rs:416-419`); time-windowing bounds guide size (`epg_window_hours`, `iptv-rs/src/services/pipeline.rs:347-350`). Improvement path: streaming serialization or an on-disk/embedded store instead of one JSON document.

### Full clones on read paths

- Problem: `get_playlists()` clones the entire playlist map on every call (`iptv-rs/src/store.rs:250-252`), `get_playlist`/`get_working` clone whole playlists (`:254-256`, `:405-407`). `list_channels`, `search_channels`, and `metrics` each trigger these clones per request (`iptv-rs/src/routes/mod.rs:76`, `:259`, `:303`, `:685`).
- Impact: Per-request memory churn proportional to catalog size; fine at current scale, grows linearly with channel count.
- Mitigation path: Return `Arc`-wrapped snapshots or serialize under the read lock without cloning.

## Operational Concerns — [OPEN]

### No scheduled pipeline re-run despite `refresh_hours` config

- Problem: `refresh_hours` (`iptv-rs/src/config.rs:37-40`) is only consulted once, at startup, to *skip* the pipeline when the working set is fresh (`iptv-rs/src/services/pipeline.rs:126-140`). There is no timer/interval task that re-runs curation on a schedule — the pipeline runs exactly once at boot (`iptv-rs/src/main.rs:48-53`) and otherwise only on manual `POST /api/pipeline/run` (`iptv-rs/src/routes/mod.rs:281-291`).
- Impact: A long-running server serves an increasingly stale working set until manually refreshed or restarted. The config name implies automatic refresh that does not exist.
- Mitigation path: Add a `tokio` interval task that calls `pipeline::run(store, false)` every `refresh_hours`.

### Runtime data is gitignored and regenerated

- Problem: `iptv-rs/data/` (fetched playlists, merged EPG, working set) is gitignored as "regenerable" (`.gitignore`). First boot after a clean checkout has no working set and must run the full pipeline (fetch → dedupe → probe → EPG) before channels appear.
- Impact: Cold-start latency; behaviour depends on external source availability at boot. Disk-backed `.bak` recovery exists (`iptv-rs/src/store.rs:176-186`, `:204-214`, `:230-239`) but only helps across restarts, not clean checkouts.

## Dependencies at Risk — [OPEN]

### GitHub Dependabot: ~47 vulnerabilities (4 high) reported

- Risk: Dependabot reported approximately 47 vulnerabilities (4 high severity) on the repository. Not yet triaged against the two dependency trees:
  - Rust crates — `iptv-rs/Cargo.toml` (axum 0.7, reqwest 0.12, tokio 1, quick-xml 0.31, flate2 1, etc.).
  - Frontend npm packages — `frontend/` (Vite + TS).
- Impact: Unknown until triaged; likely dominated by transitive npm advisories.
- Mitigation path: Run `cargo audit` and `npm audit` to split Rust vs JS findings, then bump/patch. Confirm which advisories are reachable vs dev-only (e.g. build tooling).

## Technical Debt — [OPEN, low]

### Duplicated fetch-and-parse logic

- Issue: The M3U/EPG fetch-decompress-parse flow is implemented twice: once for on-demand fetch (`fetch_source`, `iptv-rs/src/routes/mod.rs:382-463`) and once for the pipeline (`fetch_playlists`/`fetch_epg`, `iptv-rs/src/services/pipeline.rs:162-207`, `:331-420`), including duplicated gzip handling (`iptv-rs/src/routes/mod.rs:186-195`, `:429-438`; `iptv-rs/src/services/pipeline.rs:383-393`).
- Impact: Fixes/format-detection changes must be made in multiple places.
- Fix approach: Extract a shared `fetch_and_parse(url)` helper.

### `.unwrap()` on lock guards

- Issue: Every `RwLock` access uses `.read().unwrap()` / `.write().unwrap()` (`iptv-rs/src/store.rs:172`, `:251`, `:277`, `:315`, `:381`, and throughout). A panic while a lock is held poisons it and crashes all subsequent handlers.
- Impact: Low — current code holds locks over short, panic-free critical sections, but it is a latent fragility.
- Fix approach: Consider `parking_lot` locks (no poisoning) or explicit poison recovery.

### Note on `unwrap()` audit

- The broad `unwrap()` grep (80 matches) is dominated by safe `unwrap_or`/`unwrap_or_else`/`unwrap_or_default` and test-only `.unwrap()` in `#[cfg(test)]` blocks (`iptv-rs/src/parsers/m3u.rs:173-199`, `iptv-rs/src/parsers/xmltv.rs:255-283`). No unguarded panicking `unwrap()` was found on request hot paths beyond the lock guards noted above.

### No TODO/FIXME/HACK markers

- No `TODO`, `FIXME`, `HACK`, or `XXX` comments exist in `iptv-rs/src`, `frontend/src`, or `iptv-wasm/src` (verified by grep). No dead-code stubs found.

## Test Coverage Gaps — [OPEN]

- What's tested: Parser unit tests only — `iptv-rs/src/parsers/m3u.rs` and `iptv-rs/src/parsers/xmltv.rs` (`#[cfg(test)]` blocks), plus root-level JS parser tests (`m3u-parser-tests.js`, `epg-parser-tests.js`).
- What's not tested: Route handlers (`iptv-rs/src/routes/mod.rs`), the curation pipeline (`iptv-rs/src/services/pipeline.rs`), the store (`iptv-rs/src/store.rs`), and the proxy/manifest-rewrite logic — despite `axum-test` being a declared dev-dependency (`iptv-rs/Cargo.toml`).
- Risk: The highest-risk code (SSRF-adjacent proxy, dedupe, probe, EPG merge) has no automated coverage; regressions in manifest rewriting or dedupe keying would surface only in the UI.
- Priority: Medium.

---

*Concerns audit: 2026-07-15*
