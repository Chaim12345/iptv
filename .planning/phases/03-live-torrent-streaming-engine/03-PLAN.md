# Phase 3 Plan: Live-Torrent Streaming Engine

**Requirements:** STR-01, STR-02, STR-03, STR-04, STR-05, OPS-02
**Depends on:** Phase 2 (search results yield magnets/infohashes to resolve & stream).
**Direction B note:** streaming is SERVER-SIDE (librqbit) exposed as HTTP byte-range — Jellyfin
(Phase 4) is the player. No in-browser WebTorrent player (deferred). Internet Archive
web-seed/direct sources reuse the existing `/api/proxy`.

## Goal
Given a magnet/infohash, the backend resolves metadata without a full download, reports
whether it is actually streamable, and serves a chosen file over HTTP byte-range on demand —
sequential piece priority, bounded cache, idle eviction, hard resource caps.

## Approach

### Dependency
- Add `librqbit` (embed as a library) to `iptv-rs/Cargo.toml`. Use its session API:
  `Session::new(tmp_dir)`, `add_torrent(..., list_only)` for metadata, and a streaming read
  over a file's pieces with sequential priority.

### New module: `iptv-rs/src/services/torrent/`
- `engine.rs` — a `TorrentEngine` wrapping a single librqbit `Session` in a scratch dir
  (`data/torrent-cache/`, gitignored). Held in `AppStore` as `Arc<TorrentEngine>` (init in main).
  - `resolve(magnet) -> TorrentInfo { infohash, files: [{index,name,size}], has_web_seeds }`
    via `list_only` — metadata only, **STR-01**.
  - `probe(magnet) -> Streamable { ok, seeders, web_seed, reason }` — add torrent briefly,
    check peer/seeder count + web-seed presence, then drop — **STR-02**.
  - `open_stream(infohash, file_index, byte_range) -> impl AsyncRead` — sequential-priority
    piece streaming; serve requested range — **STR-03**.
  - Bounds: `Semaphore` on concurrent active torrents; per-torrent idle timer evicts after
    `IPTV_TORRENT_IDLE_SECS`; cache dir size cap with LRU eviction — **STR-05**.

### API (routes/mod.rs)
- `GET /api/vod/resolve?magnet=` → `TorrentInfo` (files list) — STR-01.
- `GET /api/vod/probe?magnet=`   → `Streamable` — STR-02.
- `GET /api/vod/stream?infohash=&file=` → `206 Partial Content`, `Accept-Ranges: bytes`,
  streams the file body; honors the `Range` header — STR-03. (This is the URL Phase 4's STRM
  files point at.)
- Internet Archive direct/web-seed items → route through existing `/api/proxy` — STR-04.

### OPS-02 — abuse surface
- Validate magnet/infohash inputs; the resolver only accepts magnet/http(s) torrent URLs.
- Document the widened SSRF/resource surface in CONCERNS.md, consistent with the accepted-risk
  proxy posture; apply the same private-range awareness the proxy has where a torrent points at
  an HTTP web-seed. Enforce STR-05 caps so a malicious/huge torrent can't exhaust disk/conns.

## Tasks
1. Add `librqbit`; scaffold `services/torrent/engine.rs` + `TorrentEngine` in `AppStore`/main.
2. `resolve` (list_only metadata) + `/api/vod/resolve`.
3. `probe` (seeders/web-seed streamability) + `/api/vod/probe`.
4. `open_stream` sequential byte-range streaming + `/api/vod/stream` (206/Range).
5. Resource bounds: concurrency semaphore, idle eviction, cache-size cap (STR-05).
6. OPS-02: input validation + CONCERNS.md update + private-range checks on web-seed fetches.
7. Build + tests (resolve/probe against a known IA web-seeded torrent; range-serve a small file).

## Success criteria
- `resolve` returns a file list for a magnet without downloading the whole torrent.
- `probe` correctly reports a web-seeded IA torrent as streamable and a dead/no-peer magnet as not.
- `stream` serves `206` with correct `Content-Range` and seek works (range requests honored).
- Idle torrents are evicted and the cache dir stays under the configured cap.

## Risks
- **Browser-peer reality is moot here** (server-side librqbit reaches TCP/uDP peers), so the
  research's #1 WebTorrent constraint does not bind — but most public magnets still have poor
  seeders; `probe` must gate playback so Phase 4 never surfaces dead sources.
- librqbit streaming API surface — verify the exact list_only + streaming calls against its docs
  during execution (flag for `--research-phase 3` if the API is unclear).
- Disk growth — enforce caps from the start, not as an afterthought.
