# Phase 2 Summary: Indexer Integration

**Status:** Complete — verified
**Requirements:** IDX-01 ✓, IDX-02 ✓, IDX-03 ✓, IDX-04 ✓, IDX-05 ✓, OPS-01 ✓

## What shipped
A source-neutral indexer subsystem the VOD pipeline (Phase 3/4) searches.

- `services/indexer/` — `IndexerConfig`/`SearchQuery`/`SearchResult` types; a generic
  **Torznab client** (works with indexarr-rs / Prowlarr / Jackett; parses the RSS/`torznab:attr`
  shape, extracts seeders/size/infohash, maps category→cat 2000/5000); a bundled
  **Internet Archive** source (Advanced Search → `_archive.torrent` web-seeded URLs);
  `search_all` fan-out (concurrent, merge, dedupe by infohash/URL, seeders-desc).
- `AppStore` — `indexers` list persisted to `data/indexers.json`; CRUD
  (`get`/`add`/`remove`, key-redaction). **Loads Internet Archive as the only default** when
  the file is absent — no piracy indexers ever bundled.
- Routes — `GET/POST /api/indexers`, `DELETE /api/indexers/:name`, `GET /api/vod/search`.
- `docker-compose.yml` — optional `indexarr` sidecar under the `indexer` profile, reached over
  HTTP (AGPL-isolated; never linked into the binary).

## Verification
- Build clean (0 errors, 0 warnings). `cargo test` → 11 passed, incl. Torznab XML parsing +
  two OPS-01 audit tests (bundled default is IA-only, no tracker URL/key; key redaction).
- Live: `/api/indexers` returns IA-only by default; `/api/vod/search?q=sintel&category=movies`
  → 41 IA results (public-domain "Sintel"), each a web-seeded `_archive.torrent`.

## Notes / follow-ups
- Torznab path is fixture-tested, not live-tested (no live Torznab endpoint in this env) —
  the operator points it at indexarr-rs/Prowlarr and results merge into search.
- IA results carry no infohash yet (resolved in Phase 3 via librqbit).
- `SearchResult.kind` currently always `Vod`; live-vs-vod classification is reserved.
