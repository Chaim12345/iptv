# Phase 3 Summary: Live-Torrent Streaming Engine

**Status:** Core complete + verified; STR-05 / OPS-02 partial (documented follow-ups)
**Requirements:** STR-01 ✓, STR-02 ✓, STR-03 ✓, STR-04 ✓, STR-05 ◐, OPS-02 ◐

## What shipped
A server-side live-torrent streaming engine on **librqbit 8.1** (Direction B: feeds Jellyfin,
no in-browser player).

- `services/torrent/engine.rs` — `TorrentEngine` wrapping a librqbit `Session` in a scratch
  dir (`data/torrent-cache/`):
  - `resolve(magnet)` → file list (index/name/size) + infohash via `list_only` (no download).
  - `probe(magnet)` → streamable? (resolvable metadata + non-empty file list).
  - `open(magnet, file)` → `wait_until_initialized()` then `handle.stream(idx)` → a seekable
    `AsyncRead + AsyncSeek` reader; `overwrite: true` reuses on-disk storage across re-streams.
- Wiring: engine built async at startup (non-fatal), held in `AppStore`
  (`set/get_torrent_engine`); `data/torrent-cache` config path.
- Routes: `GET /api/vod/resolve`, `/api/vod/probe`, and `/api/vod/stream` — the last does
  HTTP **byte-range** serving (`206`, `Content-Range`, `Accept-Ranges`, `Content-Length`),
  seeking the reader and streaming `take(len)` via `tokio_util::io::ReaderStream`. This is the
  URL Phase 4's STRM files point Jellyfin at.

## Verification (live, against the public-domain "Sintel" IA torrent)
- `resolve` → 12 files with names/sizes, metadata-only (no full download). STR-01.
- `probe` → `{ streamable: true, files: 12 }`. STR-02.
- `stream file=8 Range: bytes=0-262143` → `206`, `Content-Range: bytes 0-262143/77410288`,
  262 144 bytes of real MP4 (`ftyp isom`). STR-03 + STR-04 (IA web-seed).
- Build clean (0 warnings); 11 tests pass.

## Partial / follow-ups (honest)
- **STR-05 (resource bounds):** scratch dir is fixed + librqbit manages the session, but there
  is **no explicit concurrent-torrent cap, idle eviction, or cache-size ceiling** yet. Needed
  before untrusted/high-load use. (Design: OwnedSemaphorePermit carried by the stream + an
  idle-timer that forgets torrents + LRU cache pruning.)
- **OPS-02 (abuse surface):** inputs are validated (magnet required) but there are **no
  private-range/SSRF checks** on torrent web-seed fetches — consistent with, and inheriting,
  the existing accepted-risk `/api/proxy` posture. Should be tightened with STR-05.

## Notes
- Torznab-sourced magnets stream the same way once resolved; only IA was live-tested here.
- librqbit added ~1 large dependency; first build is slow, incrementals fast.
