# Stack Research

**Domain:** In-browser WebTorrent VOD streaming + pluggable torrent indexer + Rust backend metadata resolution (added to an existing Rust/axum + Vite/TS/WASM live-IPTV app)
**Researched:** 2026-07-15
**Confidence:** HIGH (versions verified live against npm registry / crates.io; architecture claims cross-checked against WebTorrent's own docs/changelog and Internet Archive community reports)

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `webtorrent` (npm) | **3.0.16** (verified via npm registry, published within the last month) | Browser-side BitTorrent-over-WebRTC client; drives the swarm and streams into `<video>` | The only maintained browser torrent client. v3 is a major modernization: pure ESM (`"type":"module"`), Uint8Array-based internals (`uint8-util`, `bitfield`, `streamx`) instead of the old Buffer/Node-stream stack, and a `browser` field that already stubs out `bittorrent-dht`, `fs`, `net`, `http`, `os`, `@silentbot1/nat-api` for bundlers. This means it needs **far less Node-polyfill shimming in Vite** than the 1.x/2.x line most tutorials still reference — verify a clean build first, only add `vite-plugin-node-polyfills` if a transitive dep still throws on a Node builtin. |
| `librqbit` (Rust crate, embedded library — **not** a subprocess) | **8.1.1** stable (9.0.0-rc.0 in prerelease); actively maintained, published 2026-06-03 | Backend-side magnet resolution: DHT peer/metadata lookup (BEP5/BEP9), `.torrent` parsing, file list + size + piece count for catalog entries, source health checks | The only actively maintained pure-Rust BitTorrent engine usable as a library from async code. It exposes a `Session`/`add_torrent` API with a documented **`list_only`** mode (also exposed as `list_only=true` on the reference HTTP API) that resolves metadata over DHT **without downloading torrent data** — exactly the shape needed for catalog population without the backend ever holding or redistributing copyrighted payload. Tokio-based, so it drops directly into the existing `iptv-rs` async runtime instead of requiring a subprocess/RPC boundary. |
| Torznab-spec HTTP client (**custom**, built on existing `reqwest` + `quick-xml`) | spec v1.3-draft (`torznab.github.io/spec-1.3-draft`) | The "pluggable indexer" abstraction — generic client that talks to *any* user-configured Torznab-compatible endpoint (Jackett, Prowlarr, NZBHydra2, or a raw indexer implementation) | Torznab is a thin, stable XML/RSS-over-HTTP spec (`t=caps`, `t=search`, `t=movie`, `t=tvsearch`) layered on Newznab. Building a small internal client against the *spec* (not against Jackett's or Prowlarr's proprietary surface) is what makes the indexer truly pluggable and keeps the app source-neutral: the user supplies `baseUrl` + `apikey` for whatever legal indexer they run, the app never ships or favors one. No new XML dependency needed — `quick-xml` 0.31 is already in `iptv-rs/Cargo.toml`; reuse it. |
| Internet Archive Advanced Search API + Metadata API + `_archive.torrent`/download URLs | Stable, unversioned public API (`archive.org/developers/index-apis.html`, `archive.org/developers/metadata.html`) | The **only bundled default** indexer/source, per the milestone guardrail | Advanced Search (`archive.org/advancedsearch.php?q=...&output=json`) filters by `mediatype:(movies)` etc. and returns identifiers; the Metadata API (`archive.org/metadata/{identifier}`) returns the full file list including the item's `_archive.torrent`. That torrent's `url-list` (BEP19) points web-seed traffic at `archive.org/download/{identifier}/{file}` — real HTTP, not P2P-only, so a browser WebTorrent client gets data even with zero peers. This is precisely why IA is the correct sole default: legal, public-domain-curated, and technically compatible with browser-only WebTorrent (web-seed) without needing live seeders. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `parse-torrent` (npm) | **11.0.21** | Lightweight magnet-URI / `.torrent` parsing (name, infohash, trackers, size) without instantiating a full WebTorrent client | Use on the frontend to validate/preview a magnet link or indexer result (e.g., populate a "confirm before streaming" card) before committing to opening a swarm. Also usable in a Node build/test script if one is ever added. |
| `render-media` (npm) | **4.1.0** | Fallback renderer (MediaSource + `videostream`/`mp4box.js`, with Blob-URL fallback) for containers that `webtorrent`'s built-in `file.streamTo()` can't handle well | `file.streamTo(videoEl)` is now built directly into `webtorrent` core (replaced the old `renderTo()` in v2+, see Alternatives) and covers MP4/WebM/MSE-friendly files. Only reach for `render-media` directly if you need finer control over the Blob-URL fallback path for a format `streamTo()` mishandles — don't add it as a default dependency, it's a break-glass tool. |
| Public WSS trackers (protocol infra, **not indexers**) — `wss://tracker.openwebtorrent.com`, `wss://tracker.btorrent.xyz`, `wss://tracker.fastcast.nz` | n/a (service endpoints) | Peer-discovery announce list for the browser `webtorrent` client | **Important distinction for the guardrail:** these are BitTorrent/WebRTC *peer-coordination* trackers — content-neutral signaling servers, not content catalogs/indexers. Bundling them as the default `announce` list is not the same as bundling a piracy indexer; they carry no content, only peer IP/WebRTC signaling for whatever infohash the app already resolved via the user's chosen indexer or the IA default. Still make them user-overridable in config for operators who want to point at their own tracker. |
| `magnet-url` (Rust crate) | latest, updated 2025-05-09, actively maintained | Optional lightweight magnet-URI parsing in Rust if you need infohash/display-name/tracker-list extraction *without* spinning up a `librqbit::Session` (e.g., cheap validation on an indexer result before deciding to resolve full metadata) | Use only if profiling shows `librqbit`'s own magnet parsing + session bring-up is too heavy for a quick "is this a well-formed magnet" check in a hot path (e.g., validating pasted magnet links). Otherwise just use `librqbit` end-to-end — one less dependency. |
| `reqwest` 0.12 (already in stack) | existing | HTTP transport for Torznab requests and Internet Archive API calls | Reuse — no new HTTP client needed. |
| `quick-xml` 0.31 (already in stack) | existing | Parse Torznab's XML/RSS `t=search`/`t=caps` responses | Reuse — no new XML dependency needed. |
| `serde`/`serde_json` (already in stack) | existing | Deserialize Internet Archive's JSON search/metadata responses | Reuse. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| `vite-plugin-node-polyfills` (only if needed) | Shims residual Node builtins (`buffer`, `process`, `events`) that a `webtorrent` transitive dependency still imports under Vite's browser build | **Try a clean build first.** WebTorrent 3.x's `browser` field already strips `bittorrent-dht`/`fs`/`net`/`http`/`os`/`crypto`; the Uint8Array-based rewrite removed most Buffer dependence. Only add this plugin if the build actually errors — don't pre-install it speculatively. |
| Browser DevTools `chrome://webrtc-internals` (or Firefox `about:webrtc`) | Debug WebRTC peer connections during WebTorrent development | No install — built into the browser; essential for diagnosing "0 peers, stuck at 0%" issues which are common with browser-only WebTorrent swarms. |
| `librqbit`'s own HTTP API / CLI (`rqbit` binary) | Manual testing of magnet → metadata resolution outside the axum process | Useful during development to hand-verify `list_only=true` behavior against a real magnet before wiring the `librqbit` library calls into `iptv-rs`. |

## Installation

```bash
# Frontend (in frontend/)
npm install webtorrent@^3.0.16 parse-torrent@^11.0.21

# Only if the Vite build errors on a Node builtin after adding webtorrent:
npm install -D vite-plugin-node-polyfills

# Backend (in iptv-rs/Cargo.toml)
# librqbit as a library dependency — NOT the `rqbit` CLI crate
librqbit = "8.1.1"
# quick-xml, reqwest, serde/serde_json already present — no new deps for
# Torznab client or Internet Archive integration.
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|--------------------------|
| `webtorrent` 3.x built-in `file.streamTo()` | `render-media` + manual `videostream`/`mp4box.js` wiring | Only if you need to intercept/customize the MSE `SourceBuffer` pipeline yourself (e.g., custom transmux, non-fragmented MP4 handling) — otherwise `streamTo()` (built into core since v2) is strictly simpler and is what the current docs recommend; the old `renderTo()` API is removed, not deprecated. |
| `librqbit` embedded as a Rust library | Shelling out to `aria2c` (RPC) or `transmission-daemon` (RPC) for magnet metadata | Use a subprocess RPC approach only if the team wants to keep the Rust binary's dependency surface minimal at the cost of an extra managed process and IPC layer. For a single-binary axum app already built around in-process async state (`AppStore`, `RwLock`), an embedded Tokio-native crate is the better architectural fit and avoids operational complexity (process supervision, RPC auth, port management). |
| Generic Torznab-spec client (custom, thin) | Direct Jackett or Prowlarr SDK/API integration | Integrate directly with Jackett's non-Torznab admin API or Prowlarr's native REST API only if you need indexer *management* (add/remove/test indexers) from within the app itself, rather than just *querying* whatever the operator already has running. For "pluggable, user-configured endpoint" as specified, the spec-level Torznab client is the correct level of abstraction — it works against Jackett, Prowlarr, and any other Torznab-compliant service identically. |
| Internet Archive Advanced Search + Metadata API | Third-party IA wrapper libraries (e.g., `ropensci/internetarchive`, various npm/PyPI IA clients) | These are R/Python-focused and add no value in a Rust/TS stack — the raw HTTP+JSON API is simple enough (2 endpoints) that a wrapper library is unnecessary indirection. Call it directly via `reqwest`. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `cratetorrent` (Rust crate) | Abandoned: crates.io shows a single `0.1.0` release from **2020-12-22**, only 27 recent downloads, and it hard-requires Linux `pwritev`/`preadv` (`io_uring`-adjacent) file I/O — a portability trap for a Docker-deployed app. Explicitly a toy/research project per its own README. | `librqbit` (actively maintained, cross-platform, Tokio-native). |
| `webtorrent-hybrid` (npm) | It's for running a *Node.js* client that bridges to both classic BitTorrent peers and WebRTC browser peers via native modules (`utp-native`, etc.) — solves a "Node server as a super-peer" problem this milestone doesn't have. Native-module builds also complicate the existing pure-`cargo`/`npm`/multi-stage-Docker pipeline. | Keep the split clean: browser `webtorrent` (WebRTC-only, no native deps) for playback; `librqbit` (pure Rust) for backend metadata. No Node process needed on the server at all. |
| Legacy `webtorrent` 1.x/2.x code samples (still the majority of blog posts/StackOverflow answers) | Reference the old Buffer/Node-stream internals and the removed `file.renderTo()` API. Following them against a fresh `npm install webtorrent` (which resolves to 3.0.16) will produce API-mismatch errors (`renderTo is not a function`) and unnecessary polyfill installs. | Use `file.streamTo(videoEl)` and check the current `webtorrent.io/docs` / GitHub `docs/api.md` on `master`, not cached tutorial snippets. |
| Assuming Internet Archive's `download/{id}/{file}` URL is always browser-CORS-safe as a WebTorrent web-seed | IA's download endpoint redirects to one of many CDN nodes (`ia800xxx`/`ia600xxx`); **CORS behavior is inconsistent across nodes** — some send `Access-Control-Allow-Origin: *`, others send nothing, and `fetch()` follows the redirect transparently so failures are node-dependent and intermittent, not deterministic. This directly affects browser WebTorrent's ability to pull data from the web-seed. | Route the resolved IA web-seed URL through the app's **existing** `/api/proxy` relay (same pattern already used for HLS in `iptv-rs/src/routes/mod.rs`) before handing it to WebTorrent as an `opts.urlList` entry, so the browser always fetches same-origin with headers the app controls — consistent with the "Direct stream playback from the browser" anti-pattern already documented in `ARCHITECTURE.md`. |
| Bundling any tracker/indexer marketed as a torrent *search engine* (piracy-oriented indexer lists, "best public trackers" aggregator lists that mix in content search) by default | Violates the milestone's hard guardrail (no bundled piracy-oriented indexers/catalogs) and creates legal exposure the operator didn't opt into. | Ship only the generic Torznab client (empty by default) + Internet Archive as the sole bundled source; anything else is the operator's own configured endpoint. |
| Full BitTorrent client/session on the Rust backend that actually downloads and serves torrent *payload* | Turns the server into a redistribution point for whatever content a magnet points to — different (and worse) legal/operational posture than "metadata resolution only," and duplicates work the browser's own WebTorrent swarm already does. | Use `librqbit` strictly in `list_only` metadata-resolution mode; all payload transfer stays browser-to-peer/web-seed via WebRTC, never through the Rust process. |

## Stack Patterns by Variant

**If the indexer is Torznab-compatible (Jackett, Prowlarr, NZBHydra2, raw indexer):**
- Use the generic Torznab client: `GET {baseUrl}?apikey={key}&t=caps` once to discover supported search modes/categories, then `t=search`/`t=movie`/`t=tvsearch` with `q=`.
- Because caps vary per indexer, treat the caps response as authoritative per-endpoint config, not a fixed schema — cache it per configured indexer.

**If the source is Internet Archive (the only bundled default):**
- Use Advanced Search (`mediatype:(movies) AND collection:(...)`) → get identifiers → Metadata API per identifier → locate `_archive.torrent` and/or direct file URLs.
- Always route the resulting web-seed/file URL through `/api/proxy` before it reaches WebTorrent or a `<video>` tag, for the CORS reason above and for parity with the existing HLS relay pattern.

**If a magnet has zero web-seed and zero currently-connected browser (WebRTC) peers:**
- Playback will stall indefinitely — browser WebTorrent **cannot** reach classic TCP-only desktop peers, only other WebRTC-capable peers or HTTP web-seeds (BEP19). This is a hard browser constraint, not a bug to route around; the practical implication is: **only surface catalog entries that have a web-seed or a known-active WebRTC swarm**, which is another reason Internet Archive (guaranteed web-seed) is the safe bundled default and user-added Torznab indexers should be treated as "may or may not actually stream in-browser" until resolved.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|------------------|-------|
| `webtorrent@3.0.16` | Vite ^5.4 (existing) | Ships ESM + a `browser` field; Vite's default `resolve.mainFields` picks it up. Verify build cleanly before adding any polyfill plugin — do not pre-emptively add `vite-plugin-node-polyfills`. |
| `webtorrent@3.0.16` | `parse-torrent@11.0.21` | Both on the modern `uint8-util`/ESM lineage (no Buffer mismatch); safe to use together for preview-then-stream flows. |
| `librqbit@8.1.1` | `tokio` 1 (`full`, existing) | `librqbit` is Tokio-native; embeds cleanly alongside the existing `AppStore`/`pipeline.rs` async code with no separate runtime. |
| `librqbit@8.1.1` | `reqwest@0.12`, `quick-xml@0.31` (existing) | No conflicts — `librqbit` handles its own BitTorrent-protocol I/O independently of the app's HTTP client used for Torznab/IA calls. |
| Torznab spec v1.3-draft | Jackett (all recent releases), Prowlarr (all recent releases) | Both implement/proxy the same spec surface; a caps-driven client works against either without indexer-specific branching. |

## Sources

- [webtorrent - npm](https://www.npmjs.com/package/webtorrent) — version verified live via `registry.npmjs.org/webtorrent/latest` → 3.0.16, confirmed ESM (`type: module`) and `browser` field contents. HIGH confidence (primary registry).
- [GitHub - webtorrent/webtorrent](https://github.com/webtorrent/webtorrent) / `docs/api.md`, `docs/faq.md` — `file.streamTo()` API, WebRTC-only browser-peer constraint. HIGH confidence.
- [Migration Guide - WebTorrent (mintlify)](https://www.mintlify.com/webtorrent/webtorrent/resources/migration) — confirms `renderTo()` removed in favor of `streamTo()`, render-media no longer bundled. MEDIUM-HIGH (community mirror of official docs, cross-checked against GitHub api.md).
- `registry.npmjs.org/render-media/4.1.0`, `registry.npmjs.org/parse-torrent/latest` — dependency trees verified live. HIGH confidence (primary registry).
- [rqbit GitHub](https://github.com/ikatson/rqbit), `docs.rs/librqbit`, `crates.io/api/v1/crates/librqbit` and `.../rqbit` — version 8.1.1 stable / 9.0.0-rc.0, last updated 2026-06-03, `list_only` metadata-only mode confirmed via README/HTTP API docs. HIGH confidence (primary registry + official repo).
- `crates.io/api/v1/crates/cratetorrent` — confirmed abandoned (single 0.1.0 release, 2020-12-22, 27 recent downloads). HIGH confidence (primary registry).
- [Torznab Specification 1.3-alpha](https://torznab.github.io/spec-1.3-draft/torznab/Specification-v1.3.html), [Jackett Torznab reference (DeepWiki)](https://deepwiki.com/Jackett/Jackett/3-torznab-api-reference), [Prowlarr Indexers - Servarr Wiki](https://wiki.servarr.com/prowlarr/indexers) — `t=caps`/`t=search` shape, indexer-agnostic client design. MEDIUM-HIGH confidence (spec doc + two independent community wikis agree).
- [Internet Archive Developer Portal — Tools and APIs](https://archive.org/developers/index-apis.html), [Item Metadata API](https://archive.org/developers/metadata.html) — Advanced Search + Metadata API shape. HIGH confidence (official IA docs).
- [Archive BitTorrents - Internet Archive Help Center](https://help.archive.org/help/archive-bittorrents/), [bep_0019.rst (BitTorrent.org)](https://www.bittorrent.org/beps/bep_0019.html) — `_archive.torrent`, `url-list`/BEP19 web-seed mechanics, single-file webseed URL format (`archive.org/download/{id}/{file}`). HIGH confidence (official spec + official IA help center).
- [GitHub issue: `?url=` parameter fails when archive.org redirects to CDN node without CORS headers](https://github.com/lanceewing/joric/issues/2), [ArchiveLabs/archive.org CORS issue](https://github.com/ArchiveLabs/archive.org/issues/1) — confirms inconsistent CORS across IA CDN nodes (`ia800xxx` vs `ia600xxx`). MEDIUM confidence (community-reported bug reports, not an official IA statement, but consistent across two independent reports).
- [TMDB API Terms of Use](https://www.themoviedb.org/api-terms-of-use), [TMDB Getting Started](https://developer.themoviedb.org/docs/getting-started) — noted for future artwork/metadata lookups (out of scope for this milestone's torrent stack, but confirms free non-commercial tier requires attribution + 6-month cache TTL cap if adopted later). MEDIUM confidence (official docs, not yet a committed dependency).

---
*Stack research for: WebTorrent VOD streaming + pluggable indexer + Rust torrent metadata resolution*
*Researched: 2026-07-15*
