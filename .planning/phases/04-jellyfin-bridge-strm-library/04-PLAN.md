# Phase 4 Plan: Jellyfin Live-Torrent Bridge & STRM Library

**Requirements:** JF-03, JF-04, JF-05
**Depends on:** Phase 2 (search) + Phase 3 (resolve/probe/stream). Highest-risk phase.
**Direction B:** Jellyfin owns library/metadata/clients. We expose resolved torrents to it as
playable media without a full download, and give the user a documented setup.

## Goal
Operator-configured searches become a Jellyfin-scrapeable STRM library where each title plays
by streaming from Phase 3's `/api/vod/stream` — no persistent download — with a documented
docker-compose bring-up.

## Approach

### Bridge strategy — STRM first (simplest, robust), virtual-FS optional later
- **STRM library (JF-03/JF-04):** the backend maintains a folder tree Jellyfin points at as a
  media library:
  ```
  data/library/Movies/{Title (Year)}/{Title (Year)}.strm
  data/library/TV/{Series}/Season {n}/{Series} SxxEyy.strm
  ```
  Each `.strm` file contains a single URL → `http://{signal}/api/vod/stream?infohash=..&file=..`.
  Jellyfin reads the STRM, hits our streaming endpoint (Phase 3), and its own scanner scrapes
  metadata/artwork from the folder/file names. Naming follows Jellyfin's movie/series conventions.
- **Why STRM over virtual-FS/FUSE:** language-agnostic, no mount/privileges, works with stock
  Jellyfin; Streamarrfs-style FUSE is a later enhancement (deferred) if seek/scan needs it.

### New module: `iptv-rs/src/services/library/`
- `strm.rs` — given normalized search results (Phase 2) + resolved file (Phase 3), write/refresh
  STRM files with Jellyfin-correct names; prune stale entries. Idempotent, path-safe
  (reuse `safe_filename`).
- A background/on-demand job: for each operator-saved "collection" (a saved search + category),
  search → probe (drop non-streamable) → resolve → write STRM. Manual trigger + optional schedule.

### Config + API
- `LibraryConfig`: saved collections `{ name, query, category: movies|tv, indexer? }`, persisted
  `data/library.json`. **No collections ship by default** (source-neutral — the operator defines them).
- `POST /api/library/collections` (add), `GET /api/library/collections`, `DELETE /.../:name`.
- `POST /api/library/refresh` → rebuild STRM tree from collections (probe-gated).
- `GET /api/library/status` → counts, last refresh, dropped-unstreamable count.

### JF-05 — setup + docker-compose
- Extend `docker-compose.yml`: `signal`, `indexarr-rs` (Phase 2 sidecar), and an optional
  `jellyfin` service with a shared volume mounting `data/library` into Jellyfin's media path.
- `docs/JELLYFIN.md`: point Jellyfin Live TV at `/api/jellyfin/playlist.m3u` + `epg.xml`
  (Phase 1), add `data/library` as Movies/TV libraries, configure the indexer sidecar, and the
  source-neutral disclaimer (operator supplies legal indexers).

## Tasks
1. `services/library/strm.rs` — STRM writer with Jellyfin naming + safe paths + pruning.
2. `LibraryConfig` collections model + `AppStore` CRUD + `data/library.json` (empty by default).
3. Refresh job: search → probe-gate → resolve → write STRM; `/api/library/*` endpoints.
4. docker-compose services (signal + indexarr-rs + optional jellyfin, shared library volume).
5. `docs/JELLYFIN.md` end-to-end setup + source-neutral disclaimer.
6. Build + test (a collection over IA public-domain films produces valid, playable STRM entries).

## Success criteria
- A saved collection over Internet Archive produces a `data/library/Movies/...strm` tree Jellyfin
  scans, scrapes, and plays — streaming via `/api/vod/stream`, no full download.
- Non-streamable sources are probe-dropped, so the library contains only playable titles.
- Documented docker-compose brings up SIGNAL + indexarr-rs (+ optional Jellyfin) and the Live TV
  tuner + library work end to end.
- No default collections or piracy sources ship; the operator configures everything.

## Risks
- **Highest-risk phase.** STRM playback depends on Phase 3 range-serving being solid under
  Jellyfin's probing/seeking; test with real Jellyfin against IA content.
- Jellyfin metadata scraping needs clean, convention-correct names — mismatches → no artwork.
- Refresh cost (search+probe+resolve per item) — bound concurrency, cache, make it incremental.
- Candidate for `/gsd-plan-phase 4 --research-phase 4` before execution (Jellyfin STRM + probe
  behavior under real conditions).
