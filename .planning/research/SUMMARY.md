# Research Summary: SIGNAL v2.0 — Torrent VOD Streaming

**Project:** SIGNAL — IPTV & Streaming Console  
**Milestone:** v2.0 (Torrent/WebTorrent VOD + Pluggable Indexer)  
**Domain:** Self-hosted streaming platform with VOD catalog from torrent sources  
**Researched:** 2026-07-15  
**Confidence:** MEDIUM (stack/architecture verified; features cross-checked; pitfalls synthesized)

---

## Executive Summary

SIGNAL v2.0 extends the live-IPTV console into a full VOD streaming platform by adding in-browser WebTorrent playback, a pluggable indexer abstraction (Torznab + Internet Archive), and a VOD catalog UI. The critical architectural decision is **client-side WebTorrent (browser) for playback bytes, server-side torrent engine (librqbit) for metadata-only resolution and health probing** — this avoids doubling server bandwidth per viewer while keeping the system source-neutral and respecting the "no persistent storage" guardrail.

However, there is a hard protocol constraint that must shape the entire design: **browser WebTorrent can only connect to other WebRTC-capable peers or HTTP/HTTPS web-seeds; it cannot reach the general desktop-BitTorrent swarm.** This means the vast majority of public magnet links will silently fail (0 peers, infinite spinner) without a web-seed or WSS tracker explicitly in the metadata. Internet Archive is the bundled reference source *precisely* because it provides guaranteed web-seed URLs (`archive.org/download/{id}/{file}`) and is legally sound; any other source is opt-in operator configuration and must be validated before playback is offered to the user.

The recommended phasing is strict: data models → indexer client → metadata resolver → VOD pipeline → frontend UI → playback engine → Home integration. Reversing or parallelizing this order risks shipping an empty/dead catalog or a feature that silently fails at playback time. The architecture is entirely additive (new sibling `/api/vod/*` routes, backend services, frontend modules) with zero impact on the shipped v1 live-IPTV system.

---

## Key Findings

### Recommended Stack

**WebTorrent 3.0.16** (npm) is the only actively maintained in-browser BitTorrent client. The v3.x release is a major modernization (pure ESM, Uint8Array internals) that requires far less Node polyfill shimming than the 1.x/2.x tutorials still circulating. Use the built-in `file.streamTo(videoElement)` API; the old `renderTo()` is removed.

**librqbit 8.1.1** (Rust crate, embedded library) is the reference server-side torrent engine. Critically, it exposes a `list_only` metadata-resolution mode that fetches magnet metadata (infohash, file list, trackers, web-seeds) over DHT **without downloading any media payload** — exactly what this design needs. Do not use it for downloading or streaming relay (that would duplicate the browser's own swarm work and balloon server bandwidth).

**Torznab-spec HTTP client** (custom, thin, built on existing `reqwest` + `quick-xml`) provides pluggable indexer support. Torznab (`t=caps`, `t=search`, `t=movie`, `t=tvsearch`) is a stable XML/RSS spec layered on Newznab; building a spec-compliant client (not an SDK-based one) keeps the indexer truly pluggable — the operator configures any Torznab-compatible endpoint (Jackett, Prowlarr, NZBHydra2) without the app favoring one.

**Internet Archive Advanced Search + Metadata APIs** (public, unversioned) is the sole bundled default source. Advanced Search returns identifiers; the Metadata API provides file lists and auto-generated `_archive.torrent` files with BEP19 web-seed URLs. This guarantees playability in-browser even with zero live P2P peers, and is legally sound.

**Critical caveat:** IA's download CDN has inconsistent CORS headers across nodes. Route IA web-seed URLs through `/api/proxy` relay before handing to WebTorrent.

### Expected Features

**Table stakes (users expect these):**
- Catalog tabs: Movies / TV Shows / Documentary with genre/type rows
- Poster grid + detail pages with title/year/synopsis/runtime
- TV Shows: season → episode navigation with per-episode source selection
- Search across configured indexers + local catalog
- Flat source/quality picker showing resolution, file size, seeder count, source origin
- Source health display: only show sources verified-playable
- Backend torrent/magnet metadata resolution + caching
- WebTorrent in-browser playback (stream-while-download, no persistent storage)
- "Add source" / indexer settings UI (must ship with or before catalog tabs)
- Basic genre/type filter chips

**Differentiators (competitive advantage):**
- Grouped/visual quality picker with badges and "Best Pick" button
- VOD folded into Home discovery rails + mixed live/VOD recommendations
- Documentary tab as a first-class category
- Unified continue-watching across live channels + VOD resume position
- Per-source attribution badges in the UI

**Anti-features (explicitly deferred):**
- Bundled or pre-selected piracy-oriented indexers (violates source-neutral guardrail)
- Pre-populated catalog of copyrighted titles (same guardrail)
- Persistent offline downloads / local storage (conflicts with "stream-while-download")
- Real-time seeder polling per catalog card (expensive; cache at resolve time only)
- TMDB/IMDb metadata enrichment (separate scope)
- Multi-user profiles or authentication (out of scope for this milestone)

### Architecture Approach

The design is **browser-centric for playback (no server relay), backend-centric for discovery and validation**. The backend never handles media payload; it only resolves magnet metadata and probes tracker/web-seed reachability, caching results to avoid re-probing.

**Major components:**

1. **Frontend WebTorrent player** (`webtorrent-player.ts`): Wraps the `webtorrent` npm package. Invoked when a user clicks Play on a resolved Source. Streams into the same `<video>` element already used for live HLS. **No server relay, no `/api/proxy` equivalent.** If the source has no WSS trackers and no web-seed, playback will stall; this is detected by the backend's resolve/probe step and the source is marked `dead` before the UI shows it as playable.

2. **Indexer client** (`iptv-rs/src/services/indexers.rs`): Trait-based abstraction with `TorznabClient` (operator-configured) and `InternetArchiveClient` (bundled default). Both normalize upstream responses into a common `Source` struct. Makes adding a third indexer type later straightforward.

3. **Metadata resolver** (`iptv-rs/src/services/vod_resolve.rs`): Uses librqbit's `list_only` mode to fetch magnet metadata and probes whether web-seeds/trackers are reachable (without downloading data). Caches results by infohash. Marks sources `verified_playable` or `dead`.

4. **VOD pipeline** (`iptv-rs/src/services/vod_pipeline.rs`): Background job (mirrors the existing live-TV curation pipeline) that queries configured indexers, normalizes results, resolves/probes each candidate, assembles them into `Title`/`Movie`/`Series`/`Episode` objects, and persists to `data/vod/catalog.json`.

5. **New `/api/vod/*` routes**: `GET /api/vod/indexers` (CRUD), `GET /api/vod/search?q=` (search), `POST /api/vod/resolve` (resolve magnet), `GET /api/vod/catalog` (paginated list), `GET /api/vod/title/:id` (detail), `/api/vod/pipeline/*` (pipeline control).

6. **Frontend catalog views**: Reuse `buildCard()`, `buildRow()`, grid rendering, and filter-control components. New title-detail page shows poster, description, seasons/episodes, and source/quality picker. Play button wires into `WebTorrentPlayer`.

### Critical Pitfalls and Mitigations

1. **Browser WebTorrent cannot stream most public torrents — no WSS trackers or web-seeds.** This is THE #1 gotcha. Most magnet links in the wild list only `udp://`/`http://` trackers and have zero web-seed URLs. Browser tabs will see 0 peers forever because they cannot open raw UDP/TCP sockets. **Mitigation:** Resolve magnet metadata server-side and check for `wss://` trackers or BEP19 web-seed URLs before offering playback. Mark sources without these as "not browser-streamable" in the UI before the user clicks play. Make Internet Archive (guaranteed web-seeds) the reference bundled source.

2. **Mixed content (HTTPS page + ws:// tracker) and CORS silently kill playback.** This is invisible in local dev but appears immediately in production behind TLS. **Mitigation:** Test the full streaming path over HTTPS; prefer `wss://`-only trackers in production; route web-seeds without CORS through `/api/proxy`; add HTTPS-served test to playback phase verification criteria.

3. **Default rarest-first piece selection causes constant stalling.** Video playback needs pieces in rough order with sequential read-ahead, not scattered rarest-first. **Mitigation:** Use WebTorrent's built-in streaming APIs which bias toward sequential fetch. Explicitly re-prioritize pieces on seek events. Distinguish "buffering because pieces are fetching" from "no peers available" in the UI.

4. **Torrent engine as unbounded resource sink (disk, connections, memory grow without limit).** Mirrors an existing pattern in this codebase (EPG store in memory, no bound). **Mitigation:** Cap concurrent torrents/swarms and per-torrent peer connections explicitly. Use actual ephemeral/temp store with tested teardown on stream stop/tab-close/idle timeout. Enforce process-level resource ceilings.

5. **Pluggable indexer + metadata resolver reopen and widen the accepted SSRF surface.** This is new attack surface (remote/attacker-influenced input) vs. the existing proxy's local-user input. **Mitigation:** Validate destination host/IP *before* the request is dispatched (not after, as the existing `/api/sources/fetch` does). Check resolved IPs against private/loopback/link-local blocklists. Disable auto-redirect or re-validate destination on every hop. Treat this as its own review gate distinct from the existing proxy's accepted-risk note.

6. **Shipping bundled or default piracy-oriented indexers breaks the "source-neutral" guardrail and creates legal exposure.** Precedent from Popcorn Time shows bundling piracy defaults (not requiring user config) is what triggers takedown. **Mitigation:** Enforce Internet Archive as the *only* bundled default via product review, tested on clean checkout. Any additional indexer must be operator-configured (user types URL + API key), never shipped pre-filled. Treat this as a standing gate on every phase touching defaults, seed data, or indexer configuration.

---

## Implications for Roadmap

Based on dependencies and architecture, the recommended phase structure is strict:

### Phase 1: VOD Data Models + AppStore Extension
**Rationale:** Foundation for everything downstream. Establishes the schema and persistence layer before any indexer/resolver/UI work depends on it.

**Delivers:** `Title`, `Movie`, `Series`, `Episode`, `Source`, `IndexerConfig` models; new sibling `RwLock` fields on `AppStore`; new JSON persistence under `data/vod/`.

**Features addressed:** Foundation for all VOD features.

**Pitfalls avoided:** Merging VOD into live-TV models would lock contention and complicate existing persistence.

### Phase 2: Indexer Client + CRUD Endpoints
**Rationale:** Unlocks the ability to query sources and populate the catalog. The catalog is empty by design (no bundled copyrighted content). This is where the "pluggable indexer" model is actually implemented.

**Delivers:** `IndexerClient` trait + `TorznabClient` + `InternetArchiveClient`; `/api/vod/indexers` CRUD endpoints; `/api/vod/search?q=` (normalizes results into `Source` candidates); Internet Archive pre-configured as default.

**Features addressed:** Indexer settings UI (table stakes), source-neutral architecture.

**Pitfalls avoided:** Piracy-oriented defaults (IA only), implicit trust in indexer responses (resolver phase validates next).

### Phase 3: Metadata Resolver + Health Probe
**Rationale:** Validates that a source can actually stream in-browser before ever surfacing it. This is the gate that separates "found a magnet" from "can play this magnet."

**Delivers:** `vod_resolve.rs` service (librqbit-backed magnet → metadata); reachability probe (check WSS tracker endpoints and web-seed URLs); cache by infohash; `/api/vod/resolve` POST endpoint.

**Features addressed:** Source health display, flat quality picker.

**Pitfalls avoided:** Pitfall 1 (no WSS detection), Pitfall 7 (SSRF via indexer URLs).

### Phase 4: VOD Catalog Background Pipeline
**Rationale:** Assembles individual Sources into browsable Titles/Movies/Series. Mirrors the live-TV pipeline stages exactly. Must have Phases 2 and 3 before the full loop works.

**Delivers:** `vod_pipeline.rs` service (search → resolve → probe → persist); `/api/vod/catalog` (paginated Title list); `/api/vod/title/:id` (full detail); pipeline control endpoints.

**Features addressed:** Catalog tabs, title detail, seasons/episodes navigation, source/quality picker, source health caching.

**Pitfalls avoided:** Pitfall 5 (resource growth — pipe sources as they're validated, don't buffer whole catalog in memory).

### Phase 5: Frontend Catalog UI + Title Detail
**Rationale:** Exposes the catalog to the user. Reuses existing rail/grid components heavily. Play button can be stubbed, so this phase ships independently reviewable UI before the risky WebTorrent integration.

**Delivers:** Movies / TV / Documentary tabs; poster rows + grid; title detail page; search box; genre/type filter chips; watchlist + continue-watching buttons (client-side); stubbed Play button.

**Features addressed:** All table-stakes catalog/browsing features except WebTorrent playback.

**Pitfalls avoided:** None yet (playback is next phase); this phase is low-risk UI composition.

### Phase 6: Client-side WebTorrent Playback
**Rationale:** The highest-risk integration (new protocol, CORS/mixed-content gotchas, piece-selection behavior). Deliberately placed after the catalog is solid so the discovery/catalog system isn't blocked by playback complexity.

**Delivers:** `webtorrent-player.ts` module; instantiation on Play action; streams into existing `<video>` element via MediaSource API; piece prioritization; player UI; error handling.

**Features addressed:** WebTorrent in-browser playback (core v2.0 feature).

**Pitfalls addressed:** Pitfalls 1, 2, 3, 4 (WSS/web-seed detection already done in Phase 3; mixed content avoided by phase gate; piece selection + service-worker issues handled here).

**Verification criteria:** (a) Playback works over HTTPS; (b) sources without WSS/web-seed are filtered before Play button is shown; (c) seek doesn't cause long stall; (d) tab close or idle timeout cleanly stops swarm.

### Phase 7: Home Rail Integration + Recommendations
**Rationale:** Cosmetic/integrative feature that requires both live and VOD systems stable. Delivers competitive polish (unified discovery) but blocks nothing else.

**Delivers:** `RailItem` union type; mixed live+VOD rails; generalized favorites/recents keying; recommendation engine extended.

**Features addressed:** VOD in Home rails, unified continue-watching.

### Phase Ordering Rationale

This sequence respects three key dependencies:

1. **Data models before any queries** (Phase 1 before Phases 2–4): Persistence must exist before any service writes to it.
2. **Indexer client before metadata resolver** (Phase 2 before Phase 3): The resolver needs Sources to validate; the indexer client produces those.
3. **Resolver before pipeline** (Phase 3 before Phase 4): The pipeline depends on the resolver to probe sources; can't assemble Titles without health status.
4. **Pipeline before UI** (Phase 4 before Phase 5): UI renders Titles; pipeline produces them.
5. **Catalog before playback** (Phase 5 before Phase 6): Users need to find content before playing it; decoupling discovery from playback lets each be tested independently.
6. **Playback before Home integration** (Phase 6 before Phase 7): Home recommends Titles; Titles must be playable before they're recommended.

Reversing or parallelizing any of these creates implicit dependencies, incomplete testing, or shipped-broken features.

### Research Flags

**Phase 6 (WebTorrent Playback) is the highest-risk:**
- Recommend a `/gsd-plan-phase --research-phase 6` to deep-dive on HTTPS/CORS/mixed-content behavior, piece-selection tuning, and service-worker scope gotchas.
- This phase's verification criteria are explicit and hardware-specific (HTTPS test environment, multiple torrent sizes, real Torznab indexers).
- Contingency: if WebTorrent HTTPS integration proves intractable, a backend-mediated streaming relay (librqbit serving bytes over HTTP range requests) is a fallback, but would double server bandwidth and is architecturally regressive — flag this trade-off explicitly to the team before Phase 6 planning.

**Phases 3–4 (Metadata Resolver and Pipeline):**
- Recommend testing against real Torznab endpoints (Prowlarr, Jackett) to verify response shapes and query performance.
- IA's CORS inconsistency is known and has a clear mitigation (route through `/api/proxy`); not a blocker.

**Phases 1–2, 5, 7:**
- Standard patterns, well-documented, low research risk.
- Reuse of existing components (models, services, UI) lowers risk further.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| **Stack** | HIGH | Versions verified live. WebTorrent 3.x ESM and `browser` field confirmed. librqbit's `list_only` metadata mode documented. Torznab spec stable. IA API endpoints verified. |
| **Features** | MEDIUM | Table-stakes and differentiators cross-checked across Stremio, Plex, Jellyfin, Kodi models. No single vendor SDK behind the stack, so feature surface is inferred from competitor analysis + project guardrails. |
| **Architecture** | MEDIUM | Official docs verified. No vendor SDK provides authoritative architecture guidance; design is synthesized from protocol specs + existing app patterns. |
| **Pitfalls** | MEDIUM-HIGH | Protocol-level facts sourced from official WebTorrent and BitTorrent documentation — HIGH confidence. SSRF, resource exhaustion, and async-runtime blocking guidance synthesized from general security/systems literature and this codebase's own precedents — MEDIUM confidence. |

**Overall confidence: MEDIUM**

### Gaps to Address During Execution

1. **Real-world Torznab indexer testing:** Research verifies the spec but not actual indexer edge cases. Recommend testing Phase 2 against live Prowlarr and Jackett early.

2. **HTTPS/CORS/mixed-content behavior:** Research cites the problem (IA CDN CORS inconsistency, mixed-content blocking) but the mitigation (route via `/api/proxy`) was not tested in a full HTTPS deployment. Phase 6 must include explicit HTTPS-served testing.

3. **Resource scaling under concurrent load:** Caps are recommended but not empirically validated. Recommend load-test in Phase 3 or early Phase 6 with concurrent playback sessions + simultaneous live-proxy traffic.

4. **Service-worker streaming server edge cases:** Mitigation (explicit `serviceWorker.ready`, avoid `clients.claim()`) is from community reports. Recommend explicit test suite for SW initialization + mid-playback-update behavior.

5. **IA CORS workaround effectiveness:** Routing IA web-seed URLs through `/api/proxy` is sound but untested. Early Phase 6 testing should confirm this works reliably.

6. **Source-neutral defaults enforcement:** The guardrail is clear in PROJECT.md but lacks a concrete CI gate. Recommend adding a clean-checkout audit to Phase 2 / Phase 4 acceptance criteria.

---

## Sources

### Primary (HIGH confidence)
- **WebTorrent npm registry** — version 3.0.16 verified live; ESM and `browser` field contents confirmed
- **docs.rs/librqbit** — `list_only` metadata-only mode documented; version 8.1.1 stable verified
- **WebTorrent official docs** (webtorrent.io) — `file.streamTo()` API, WebRTC-only peer constraint, web-seed (BEP19) behavior
- **Internet Archive Developer Portal** — Advanced Search and Metadata API shapes verified
- **Torznab Specification** (torznab.github.io) — XML/RSS shape, `t=caps`, `t=search` documented
- **Project codebase** (PROJECT.md, ARCHITECTURE.md, CONCERNS.md) — project guardrails, existing patterns

### Secondary (MEDIUM confidence)
- **GitHub: webtorrent/webtorrent** — official repo
- **GitHub: ikatson/rqbit** — librqbit's upstream
- **Jackett DeepWiki** — Torznab reference implementation details
- **Prowlarr Servarr Wiki** — Torznab-compliant indexer reference
- **Competitor analysis** — Stremio, Plex, Jellyfin, Kodi patterns

### Tertiary (MEDIUM-LOW confidence)
- **Webtorrent-tracker GitHub issues** — WSS tracker internals, CORS/mixed-content issues
- **Mozilla Bugzilla** — service-worker scope bugs
- **Security literature** — SSRF / DNS rebinding / redirect validation guidance

---

## Readiness

**This research is complete and ready for roadmap creation.** All four research documents are detailed and cross-referenced; phasing is dependency-ordered; pitfalls are mapped to specific phases; and major decision points (client vs. server playback, indexer pluggability, source-neutral defaults) are explicitly justified.

**Recommendation to roadmapper:** Follow the suggested 7-phase structure strictly. Phases 1–5 are low-risk foundation work; Phase 6 (WebTorrent playback) is the complexity peak and is deliberately sequenced last. Phase 7 is polish. If Phase 6 research during planning surfaces unforeseen SSRF or CORS coupling, the team has a fallback (Phase 6b: backend-mediated relay), but should be explicit about the bandwidth/storage cost trade-off before choosing it.

---

*Research completed: 2026-07-15*  
*Ready for roadmap: yes*
