# Using SIGNAL with Jellyfin

SIGNAL feeds a Jellyfin server two things:

1. **Live TV** — your curated, verified channels as an M3U tuner + XMLTV guide (Phase 1).
2. **On-demand** — a STRM library of torrents that stream on demand, no download (Phase 4).

Jellyfin owns the library UI, metadata scraping, and the TV/mobile/web/cast clients; SIGNAL
owns curation, indexing, and live-torrent streaming.

> **Source-neutral / legal note.** SIGNAL ships **no** indexers except the Internet Archive
> (public-domain / Creative-Commons). Any Torznab indexer you add and any collection you
> define is your responsibility — configure only legal sources. SIGNAL does not download or
> host content; it streams what you point it at.

## Quick start (docker compose)

```bash
docker compose --profile jellyfin --profile indexer up -d --build
```

Brings up:
- `iptv` (SIGNAL) on http://localhost:5000
- `jellyfin` on http://localhost:8096 (reads SIGNAL's data volume read-only at `/signal`)
- `indexarr` (optional Torznab sidecar) on http://localhost:8191

## 1. Live TV in Jellyfin

Jellyfin → Dashboard → **Live TV** → Tuner Devices → **+** → **M3U Tuner**:
- File or URL: `http://iptv:5000/api/jellyfin/playlist.m3u`

Then TV Guide Data Providers → **+** → **XMLTV**:
- File or URL: `http://iptv:5000/api/jellyfin/epg.xml`

Refresh guide data. Channels appear under **Live TV**. (Guide binds to channels whose
`tvg-id` matches an XMLTV channel id.)

## 2. On-demand (STRM) library

**a. Add an indexer** (optional — Internet Archive is enabled by default):
```bash
curl -X POST http://localhost:5000/api/indexers -H 'Content-Type: application/json' \
  -d '{"name":"indexarr","kind":"torznab","base_url":"http://indexarr:8080","api_key":""}'
```

**b. Define a collection** (a saved search that becomes a Movies/TV folder):
```bash
curl -X POST http://localhost:5000/api/library/collections -H 'Content-Type: application/json' \
  -d '{"name":"Blender Open Movies","query":"sintel","category":"movies"}'
```

**c. Build the STRM library:**
```bash
curl -X POST http://localhost:5000/api/library/refresh
curl http://localhost:5000/api/library/status
```
This writes `.strm` files under the SIGNAL data volume at `data/library/Movies/…` — each a
single URL to `/api/vod/stream`. Only torrents that resolve/stream are written.

**d. Add the library in Jellyfin:** Dashboard → Libraries → **Add Media Library** →
Content type **Movies** (or Shows) → folder `/signal/library/Movies` (and `/signal/library/TV`).
Scan the library — Jellyfin scrapes metadata/artwork from the folder names and plays each
title by streaming from SIGNAL.

## Endpoints reference

| Endpoint | Purpose |
|---|---|
| `GET /api/jellyfin/playlist.m3u` | Live TV M3U tuner |
| `GET /api/jellyfin/epg.xml` | XMLTV guide |
| `GET/POST /api/indexers`, `DELETE /api/indexers/:name` | Manage indexers |
| `GET /api/vod/search?q=&category=` | Search indexers |
| `GET /api/vod/resolve|probe?magnet=` | Torrent metadata / streamability |
| `GET /api/vod/stream?magnet=&file=` | Byte-range stream (STRM target) |
| `GET/POST /api/library/collections`, `DELETE …/:name` | Manage collections |
| `POST /api/library/refresh`, `GET /api/library/status` | Build / inspect STRM library |

## Notes & limits
- First `docker compose build` compiles the frontend + Rust from source — several minutes.
- STR-05 (torrent resource caps) and OPS-02 (SSRF hardening on web-seeds) are partial — see
  `.planning/phases/03-live-torrent-streaming-engine/03-SUMMARY.md`. Run trusted sources only.
