# Milestone v2.0 Requirements — Streaming Platform (Jellyfin-integrated)

**Direction:** Option B — SIGNAL contributes curated IPTV + live-torrent streaming + a sidecar
indexer; Jellyfin owns library, metadata, and native clients. See `research/EVALUATION.md`.

## v2.0 Requirements

### Indexer Integration (IDX)
- [ ] **IDX-01**: Backend has a generic Torznab client that queries a configured indexer endpoint over HTTP.
- [ ] **IDX-02**: `indexarr-rs` runs as a separate sidecar service (docker-compose), reached over HTTP — never linked into the Rust binary (AGPL isolation).
- [ ] **IDX-03**: Operator configures indexer endpoint(s) + API key in settings; no piracy indexers are bundled or defaulted.
- [ ] **IDX-04**: Search returns normalized results (title, year, seeders, size, magnet/infohash, source) the backend can act on.
- [ ] **IDX-05**: Internet Archive is available as a bundled legal reference source (Advanced Search → torrent/web-seed items).

### Live-Torrent Streaming Engine (STR)
- [ ] **STR-01**: Server resolves magnet/torrent metadata via librqbit `list_only` without a full download.
- [ ] **STR-02**: Streamability/health probe (seeders, WSS/web-seed presence) marks whether a source can actually play before it is exposed.
- [ ] **STR-03**: Server streams a selected file via sequential/prioritized pieces over HTTP byte-range (no persistent download; bounded on-disk cache; idle torrents evicted).
- [ ] **STR-04**: Internet Archive web-seed / direct sources stream through the existing `/api/proxy` path.
- [ ] **STR-05**: Resource bounds enforced — max concurrent torrents/connections, cache size cap, per-torrent idle timeout.

### Jellyfin Integration (JF)
- [ ] **JF-01**: Expose curated, verified live channels as an M3U tuner endpoint Jellyfin consumes as a Live TV tuner.
- [ ] **JF-02**: Expose the merged EPG as an XMLTV endpoint Jellyfin consumes as the guide provider.
- [ ] **JF-03**: Live-torrent bridge — resolved torrent items appear to Jellyfin as playable media without full download (Streamarrfs-style virtual filesystem OR STRM files pointing at the STR-03 streaming endpoint).
- [ ] **JF-04**: A maintained STRM library (Movies / TV folders) populated from operator-configured indexer searches, structured so Jellyfin scrapes metadata/artwork itself.
- [ ] **JF-05**: Setup docs + docker-compose so a user can point a Jellyfin server at SIGNAL (tuner URLs, XMLTV URL, library mount, indexer sidecar) in a documented flow.

### Operations & Guardrails (OPS)
- [ ] **OPS-01**: Source-neutral — a clean-checkout audit (CI gate) verifies no piracy indexers/trackers ship as defaults.
- [ ] **OPS-02**: Indexer/magnet resolution abuse surface documented and bounded, consistent with the existing accepted-risk proxy posture (private-range awareness, redirects).
- [ ] **OPS-03**: The v2.0 backend additions run alongside the existing curation pipeline without regressing live-IPTV verification or startup.

## Future Requirements (deferred)
- SIGNAL-native VOD catalog UI (Option A phases 5–7) — deferred; Jellyfin provides the library UI.
- In-browser WebTorrent player inside SIGNAL — deferred; primary playback is via Jellyfin clients.
- Metadata enrichment service (TMDB) beyond what Jellyfin scrapes — deferred.
- Recommendations across VOD + live — deferred.

## Out of Scope (explicit)
- Bundling or defaulting any piracy-oriented indexer, tracker, or copyrighted catalog. (Legal/ethical hard line.)
- Rebuilding Jellyfin's library management, transcoding, user management, or native client apps.
- Xtream Codes API support (Jellyfin doesn't support it; out of scope).
- The *arr download-to-disk automation (Sonarr/Radarr) — we stream live, not manage a download library.

## Traceability
_(filled by roadmap — REQ-ID → phase)_
