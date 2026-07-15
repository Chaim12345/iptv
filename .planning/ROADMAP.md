# Roadmap: SIGNAL v2.0 — Streaming Platform (Jellyfin-integrated)

## Overview

v2.0 extends SIGNAL from live IPTV into an on-demand experience **without rebuilding a media
server** (Option B — see `research/EVALUATION.md`). Jellyfin owns the library, metadata, and
native TV/mobile/web clients. SIGNAL contributes four backend capabilities, delivered in
dependency order: first the low-risk, high-value **Jellyfin IPTV feed** (reusing the already
verified channel set + merged EPG), then a **pluggable indexer** (Torznab + `indexarr-rs`
sidecar + Internet Archive), then a **live-torrent streaming engine** (librqbit metadata/health
+ bounded byte-range streaming, no persistent download), and finally the highest-risk
**Jellyfin live-torrent bridge + STRM library** that exposes resolved torrent items to Jellyfin
as playable media. All additions are additive siblings to the shipped v1 pipeline.

## Cross-Cutting Constraints

These apply to every phase and are verified continuously, not owned by a single phase:

- **Source-neutral (hard rule).** No bundled or default piracy-oriented indexers/trackers, and
  no bundled catalog of copyrighted titles. Internet Archive is the only bundled legal reference
  source. Source legality is the operator's configuration responsibility. (Formally gated by
  OPS-01 in Phase 2, but binding on every phase that touches defaults, seed data, or config.)
- **AGPL isolation.** `indexarr-rs` is reached only as a separate HTTP sidecar — never linked
  into the Rust binary.
- **No live-IPTV regression.** v2.0 backend additions run alongside the existing curation
  pipeline without regressing verification or startup (formally gated by OPS-03 in Phase 1).
- **Superseded scope.** The research SUMMARY's standalone phases 5–7 (bespoke VOD catalog UI,
  in-browser WebTorrent player, Home VOD rails) are out of scope for v2.0. Jellyfin provides
  the library UI and clients.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Jellyfin IPTV Feed** - Expose curated channels + merged EPG as M3U tuner + XMLTV endpoints Jellyfin consumes natively (low-risk first win).
- [ ] **Phase 2: Indexer Integration** - Torznab client + `indexarr-rs` sidecar + bundled Internet Archive source, returning normalized results with no piracy defaults.
- [ ] **Phase 3: Live-Torrent Streaming Engine** - librqbit metadata/health resolution + bounded sequential byte-range streaming with no persistent download.
- [ ] **Phase 4: Jellyfin Live-Torrent Bridge & STRM Library** - Expose resolved torrents to Jellyfin as playable media via STRM/virtual-FS, with setup docs + docker-compose.

## Phase Details

### Phase 1: Jellyfin IPTV Feed
**Goal**: An operator can add SIGNAL to a Jellyfin server as a native Live TV tuner + guide,
streaming the already-curated verified channels — with zero regression to the v1 pipeline.
**Depends on**: Nothing (first phase; reuses the existing verified working set + merged EPG)
**Requirements**: JF-01, JF-02, OPS-03
**Success Criteria** (what must be TRUE):
  1. Operator enters SIGNAL's M3U tuner URL in Jellyfin's Live TV setup and the curated, verified channels appear as tunable Jellyfin channels.
  2. Operator sets SIGNAL's XMLTV URL as the guide provider and now/next programme data populates the Jellyfin guide, matched to the tuner channels.
  3. A channel selected in a Jellyfin client plays through SIGNAL's existing stream path.
  4. On startup the existing v1 live-IPTV curation pipeline still fetches, probes, and verifies channels with no regression — the new feed endpoints are purely additive.
**Plans**: TBD

### Phase 2: Indexer Integration
**Goal**: The backend can search operator-configured Torznab indexers and the bundled Internet
Archive source, returning normalized, actionable results — with no piracy indexers bundled or
defaulted.
**Depends on**: Phase 1 (established additive-backend pattern; otherwise independent)
**Requirements**: IDX-01, IDX-02, IDX-03, IDX-04, IDX-05, OPS-01
**Success Criteria** (what must be TRUE):
  1. Operator configures a Torznab indexer endpoint + API key and a search returns results from it over HTTP.
  2. `indexarr-rs` runs as a separate docker-compose sidecar reached over HTTP and is never linked into the Rust binary (AGPL isolation).
  3. Internet Archive works out of the box as the bundled legal reference source, returning torrent/web-seed items via Advanced Search.
  4. Every search result is normalized to a common shape (title, year, seeders, size, magnet/infohash, source) regardless of upstream indexer.
  5. A clean-checkout CI audit passes, proving no piracy indexers/trackers ship as defaults.
**Plans**: TBD

### Phase 3: Live-Torrent Streaming Engine
**Goal**: The backend can resolve, health-check, and stream a selected torrent file on demand
over HTTP byte-range — without any persistent download and within enforced resource bounds.
**Depends on**: Phase 2 (supplies magnets/infohashes and the IA source to resolve and stream)
**Requirements**: STR-01, STR-02, STR-03, STR-04, STR-05, OPS-02
**Success Criteria** (what must be TRUE):
  1. The server resolves a magnet/torrent's metadata (file list, size, infohash, trackers, web-seeds) via librqbit `list_only` without downloading the payload.
  2. A streamability/health probe (seeders, WSS/web-seed presence) marks whether a source can actually play before it is exposed.
  3. A selected file streams over HTTP byte-range with sequential/prioritized pieces; on-disk cache stays bounded and idle torrents are evicted.
  4. Internet Archive web-seed / direct sources stream through the existing `/api/proxy` path.
  5. Resource bounds are enforced (max concurrent torrents/connections, cache-size cap, per-torrent idle timeout) and the magnet-resolution abuse surface (private-range awareness, redirects) is documented and bounded.
**Plans**: TBD

### Phase 4: Jellyfin Live-Torrent Bridge & STRM Library
**Goal**: An operator can point Jellyfin at SIGNAL's resolved torrent items as playable media
(no full download), populated into a maintained STRM library, following a documented setup flow.
**Depends on**: Phase 2 (indexer searches populate the library) and Phase 3 (streaming engine backs playback)
**Requirements**: JF-03, JF-04, JF-05
**Success Criteria** (what must be TRUE):
  1. Resolved torrent items appear in Jellyfin as playable media — via a Streamarrfs-style virtual filesystem or STRM files pointing at the STR-03 streaming endpoint — and play without a full download.
  2. A maintained STRM library (Movies / TV folders) is populated from operator-configured indexer searches and structured so Jellyfin scrapes its own metadata/artwork.
  3. Following the setup docs + docker-compose, an operator can wire a Jellyfin server to SIGNAL end to end (tuner URLs, XMLTV URL, library mount, indexer sidecar) in one documented flow.
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Jellyfin IPTV Feed | 0/TBD | Not started | - |
| 2. Indexer Integration | 0/TBD | Not started | - |
| 3. Live-Torrent Streaming Engine | 0/TBD | Not started | - |
| 4. Jellyfin Live-Torrent Bridge & STRM Library | 0/TBD | Not started | - |
