# Phase 2 Plan: Indexer Integration

**Requirements:** IDX-01, IDX-02, IDX-03, IDX-04, IDX-05, OPS-01
**Depends on:** none (parallel to Phase 1). Feeds Phase 3/4.
**Guardrail:** source-neutral — no bundled/default piracy indexers; Internet Archive is the
only bundled source; `indexarr-rs` runs as a separate sidecar over HTTP (AGPL isolation).

## Goal
The backend can search operator-configured Torznab indexers (incl. an `indexarr-rs` sidecar)
plus a built-in Internet Archive source, returning normalized results — with zero piracy
defaults shipped.

## Approach

### New module: `iptv-rs/src/services/indexer/`
- `mod.rs` — `IndexerSource` trait: `async fn search(&self, q: &SearchQuery) -> Result<Vec<SearchResult>>`.
- `torznab.rs` — generic Torznab client (reqwest). Torznab is Newznab-XML over HTTP:
  `GET {base}/api?t=search&q={query}&apikey={key}` → parse `<item>`s (title, size,
  `torznab:attr name="seeders"`, `enclosure url` = magnet/.torrent, `guid`/infohash).
  Works against `indexarr-rs`, Prowlarr, or Jackett — all speak Torznab.
- `internet_archive.rs` — built-in legal source. IA Advanced Search API
  (`advancedsearch.php?q=mediatype:(movies)&fl=identifier,title,year&output=json`) →
  per-item metadata (`/metadata/{id}`) → torrent + web-seed file URLs.
- `types.rs` — `SearchQuery { text, category }`, `SearchResult { title, year, size,
  seeders, source, magnet_or_url, infohash, kind: Live|Vod }`.

### Config + models
- Extend `AppConfig` / a persisted `IndexerConfig` list: `{ name, kind: torznab|ia, base_url,
  api_key, enabled }`. Persist to `data/indexers.json`. **No entries ship by default except
  Internet Archive (kind=ia, no key).**
- `AppStore`: `indexers: RwLock<Vec<IndexerConfig>>` + CRUD (`list/add/update/remove_indexer`,
  persisted like playlists).

### API (routes/mod.rs)
- `GET  /api/indexers` — list configured indexers (keys redacted).
- `POST /api/indexers` — add; `DELETE /api/indexers/:name` — remove.
- `GET  /api/vod/search?q=&category=` — fan-out across enabled indexers concurrently
  (bounded JoinSet), merge + dedupe by infohash, return normalized results.

### OPS-01 — source-neutral CI audit
- `scripts/audit-sources.sh` (or a `#[test]`) asserts the shipped default indexer set contains
  only Internet Archive and no tracker/indexer hostnames from a denylist; wire into the
  existing test/build so a clean checkout can't ship piracy defaults.

## Tasks
1. `services/indexer/` module + `IndexerSource` trait + `types.rs`.
2. Torznab client + XML parsing (unit test against a captured Torznab response fixture).
3. Internet Archive source (advancedsearch → metadata → file URLs).
4. `IndexerConfig` model + `AppStore` CRUD + `data/indexers.json` persistence (IA default only).
5. `/api/indexers` CRUD + `/api/vod/search` fan-out/merge/dedupe endpoints.
6. OPS-01 clean-checkout audit test + docker-compose `indexarr-rs` sidecar service (documented, not started by default).
7. Build + tests green.

## Success criteria
- `GET /api/vod/search?q=sintel` returns normalized IA results (public-domain) out of the box.
- Adding a Torznab endpoint via `/api/indexers` makes its results appear in search, merged/deduped.
- No piracy indexer/tracker ships as a default; the OPS-01 audit test passes on a clean checkout.
- `indexarr-rs` reachable as a sidecar over HTTP; never linked into the binary.

## Risks
- Torznab response shape varies (Prowlarr vs Jackett vs indexarr-rs) → parse defensively, test with fixtures.
- IA API rate limits / CORS (server-side, so CORS n/a) → cache results briefly.
- AGPL: keep indexarr-rs a separate process; we only call its HTTP API.
