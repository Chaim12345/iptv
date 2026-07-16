# Feature Research

**Domain:** VOD/on-demand streaming catalog (Movies / TV Shows / Documentaries) added to an existing live-IPTV console
**Researched:** 2026-07-15
**Confidence:** MEDIUM (patterns cross-checked across Stremio, Plex, Jellyfin, Kodi, WebTorrent sources; no single-source claims treated as authoritative)

## Feature Landscape

This milestone is scoped narrowly: it is not "build a media server," it is "add a catalog + source-resolution + playback layer on top of the existing Home rails, player, and proxy." The models below (Stremio's addon protocol, Plex/Jellyfin's library UX, Kodi's source pickers) are used to decide *what a VOD tab must do*, not to justify building a general media-server clone.

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete or broken next to any Plex/Jellyfin/Stremio user's mental model.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Catalog tabs (Movies / TV Shows / Documentaries) with genre/type rows | Every VOD app (Netflix, Plex, Jellyfin, Stremio Board) organizes by type first, then genre/collection rows | LOW | **Reuse existing Home rail component** — same horizontal-scroll poster-row primitive already built for live Discover; just feed it VOD items instead of channels. |
| Poster grid / browse view per tab | Users expect a dense grid fallback (esp. Library/Console layout) in addition to rails, for scanning a whole catalog | LOW | **Reuse existing Library/Console grid layout** — same virtualized grid already used for channels. |
| Title detail page: synopsis, cast, runtime, year, rating | Baseline info users check before committing to watch; Plex/Jellyfin/Stremio all show this above the fold | MEDIUM | Requires a metadata source (indexer response + optional TMDB/OMDb enrichment) — new data shape, not present in live-channel model. Keep MVP to fields the indexer/IA actually returns; treat richer metadata (cast photos, external ratings) as enhancement. |
| TV Shows: seasons → episodes navigation | Non-negotiable for any "TV Shows" tab; users expect season picker then an episode list/grid, each with its own thumbnail + synopsis | MEDIUM | New UI surface — live IPTV has no concept of seasons/episodes. Needs its own metadata shape (season count, episode list, per-episode magnet/source). |
| Search across the VOD catalog | Users expect an omnibox that finds titles by name; standard in every competitor | LOW–MEDIUM | Should reuse the existing search/filter UI shell; underlying query fans out to configured indexers + local catalog cache, so backend work (indexer query + merge) dominates cost. |
| Basic genre/type filters | Users expect to narrow by genre at minimum (Action, Comedy, Documentary sub-genres, etc.) | LOW | Same filter chip pattern already used for live-channel groups; reuse `extract_groups`/`filter_channels`-style WASM helpers if the shape fits. |
| Continue-watching / resume position | Universally expected for anything longer than a few minutes; users hate re-seeking from zero | MEDIUM | New capability — live streams have no "position" concept. Needs client-side progress tracking (localStorage, extending `store.ts`) at minimum; can defer server-side sync. |
| Watchlist / "save for later" | Standard on Plex, Jellyfin (via plugin), Netflix-style apps; low cost, high perceived value | LOW | Client-side only for v1 — extend existing localStorage favorites/recents pattern (`store.ts`) to VOD titles; no new backend needed. |
| Subtitle track selection | Expected wherever content isn't in the viewer's language; WebTorrent/torrent releases frequently ship or reference external subs | MEDIUM | HTML5 `<track>` / hls.js text-track support if subs are sideloaded (.srt/.vtt) alongside the torrent, or via an optional subtitle-addon-style source (OpenSubtitles-like). Treat as P1 if source packages provide subs already; treat external subtitle-fetching services as a differentiator, not table stakes, given "no bundled trackers" guardrail. |
| Source/quality selection when multiple torrents exist per title | Any torrent-backed VOD app (Stremio, Kodi addons) surfaces resolution + file size + seeder count so the user can pick a playable option, not just "best guess" | MEDIUM | Directly required by the "pluggable indexer, multiple sources per title" model. Must show enough info (resolution, size, seeders, source name) for the user to judge playability *before* clicking play — see Differentiators for the enhanced version. |
| Source health / seeder count display | Stremio/Torrentio convention: label each stream with seeders so users avoid dead torrents; without this, users hit "spinner forever" with no explanation | MEDIUM | Needs backend torrent-metadata resolution (already planned: "backend torrent/magnet metadata resolution, source health, caching" per PROJECT.md). Minimum viable: seeder count + resolution + size, refreshed periodically/cached, not real-time per-click. |
| "Add source" / indexer settings UI | This is the direct UX expression of the "source-neutral, user-configures-indexers" guardrail — without a settings surface, the feature literally cannot be used the way the project mandates | MEDIUM | New settings surface: list configured indexer endpoints, add/remove/test-connection, per-source enable toggle. This is P1 — not optional — because Internet Archive being the *only bundled default* means the product is empty without it. |
| Per-source attribution in the UI | Users (and the project's legal posture) need to know which configured source a given stream/result came from — mirrors Stremio's addon-name tags on stream rows | LOW | Small UI addition: badge/label per catalog result and per stream option showing origin (e.g., "Internet Archive", or a user-named indexer). Reinforces "operator's configuration responsibility" framing from PROJECT.md guardrails. |

### Differentiators (Competitive Advantage)

Features that set the product apart from a generic Jellyfin/Plex clone or a bare Stremio install. Not required for launch, but align with Core Value ("polished, reliable, TV-grade experience — only surfacing content that actually plays").

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Grouped/visual quality picker (badges + seeder-strength bars + "Best Pick" button) | Raw stream lists (Stremio default) are intimidating; a curated, visual picker matches this project's "verified working set" philosophy already proven on the live side (probe → only alive channels surface) | MEDIUM | Mirrors the existing curation-pipeline mindset: apply the same "don't show dead things" principle to torrent sources — auto-rank/pre-filter by seeders + resolution, default to a single "Best Pick" play button, with "more sources" as a secondary disclosure. This is the most natural differentiator: it's the live-IPTV curation philosophy applied to VOD sources. |
| VOD folded into existing Home discovery rails + recommendations | Already an explicit v2.0 target in PROJECT.md; most competitors (Stremio) don't unify live TV + VOD in one home feed the way this project can | MEDIUM | **Direct reuse** of the Home rail/recommendation engine already built for live channels — extend the recommendation input set to include VOD items, not a new system. |
| Unified continue-watching across live "recently watched" and VOD resume position | Existing favorites/recents (`store.ts`) already tracks recent live channels; extending the same mental model to VOD resume state is a coherent, low-cost differentiator vs. treating VOD as a bolted-on separate app | LOW–MEDIUM | Natural extension of existing client store, not a new subsystem. |
| Backend source-health caching (avoid re-probing dead/slow torrents on every view) | Directly mirrors the existing curation pipeline's "probe once, cache verified working set" pattern already proven for live streams | MEDIUM | Reuse the pipeline's stage/cache/persist pattern (`services/pipeline.rs`, `AppStore` JSON persistence) for torrent metadata resolution instead of inventing a new caching approach. |
| Documentary tab as a first-class category (not buried under "Movies") | Differentiates from Netflix-style apps that bury documentaries; Internet Archive's strength is exactly in documentary/public-domain content, so this plays to the bundled default source's actual strength | LOW | Cheap to build (it's just a third catalog tab with the same rail/grid components) and directly leverages the one bundled source's real content mix. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but conflict with the project's guardrails, complexity budget, or "source-neutral" positioning.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|------------------|-------------|
| Bundled/default piracy-oriented indexers (Torrentio-style public trackers) | Users want it "to just work" out of the box like Stremio does with community addons | Directly violates the explicit guardrail: "No bundled or default piracy-oriented trackers/indexers... source legality is the operator's configuration responsibility" | Ship only Internet Archive as the bundled default; make adding third-party indexers a clearly-labeled, user-initiated settings action with an explicit legal-responsibility notice. |
| Bundled catalog of copyrighted titles / pre-populated movie database | Feels more "complete" on first run (empty catalog looks broken) | Explicitly forbidden by PROJECT.md guardrails ("No bundled catalog of copyrighted titles") | Populate the catalog entirely from what configured sources actually return + Internet Archive's public-domain seed; treat an empty/small catalog on first run as expected, and make the "add a source" CTA prominent when the catalog is sparse. |
| Persistent local downloads / offline library management | Common "nice to have" once torrents are involved — users want to keep files | Explicit PROJECT.md constraint: "stream-while-download, no persistent storage." Persistent storage adds disk-management, quota, and legal-retention complexity way outside this milestone's scope | Stream-while-download only; discard/garbage-collect torrent data after playback session ends (standard WebTorrent client behavior when the client object is destroyed). |
| Desktop-style torrent client (queue management, ratio tracking, DHT-only peer discovery) | Feels natural if the mental model is "we added torrents" | Browser WebTorrent peers are WebRTC-based, not compatible with plain DHT/TCP swarms; most real-world torrents have zero browser-reachable peers without web-seed or WSS-tracker support (a fact already captured in PROJECT.md's guardrails) | Constrain the source-quality picker to sources known to have WSS trackers / web-seeds (Internet Archive, or user-added sources that meet this bar); surface "not browser-playable" clearly rather than pretending the picker works uniformly across all torrent sources. |
| Real-time seeder/peer count polling per catalog card | Feels "live" and impressive, mirrors Kodi/Stremio addon behavior superficially | Expensive: probing every catalog card's swarm health on every render would hammer trackers/DHT and slow the browse experience; live IPTV's own architecture deliberately avoids this kind of per-render heavy work | Cache torrent-metadata/health at the source-resolution layer (mirrors the existing curation pipeline's periodic-probe-then-cache pattern); only resolve a title's live health when the user opens its detail/stream-picker view, not while scrolling a grid. |
| Building a general-purpose metadata/enrichment service (full TMDB/IMDb sync, cast photos, trailers) | Looks like "parity" with Plex/Jellyfin's rich detail pages | High complexity (API keys, rate limits, image caching, licensing) for a milestone that's about catalog+streaming, not a metadata platform | MVP detail page uses only what the source/indexer + Internet Archive actually provide (title, synopsis if present, runtime if present); treat rich third-party metadata enrichment as an explicit future consideration, not part of this milestone. |
| Full addon/plugin marketplace (Stremio-style community catalog-addon ecosystem) | Stremio's addon ecosystem is the most visible reference UX and is tempting to copy wholesale | Massively out of scope: building a plugin runtime, addon manifest protocol, and community distribution is a multi-milestone project on its own, and conflicts with "user-configured endpoints" being a simple settings list, not an app store | Keep the indexer model to a flat, user-managed list of endpoints (URL + optional auth) configured in settings — no manifest protocol, no third-party code execution, no marketplace discovery UI. |
| Multi-user profiles / per-user watch history and permissions | Plex/Jellyfin both support multi-user households | Existing architecture has zero authentication ("None — open API, permissive CORS") and is explicitly self-hosted single-console; multi-user adds an entire auth/authorization subsystem | Single shared client-side state (as today's favorites/recents already work) is sufficient for this milestone; multi-user is a candidate for a much later milestone if ever. |

## Feature Dependencies

```
Catalog tabs (Movies/TV/Documentary rows + grid)
    └──requires──> Indexer settings UI (add-source)
                       └──requires──> Backend indexer client (query configured endpoints)
                                          └──requires──> Backend torrent/magnet metadata resolution + caching

Title detail page
    └──requires──> Catalog tabs (need an item to click into)
    └──requires──> Backend metadata resolution (synopsis/runtime/cast if available)

TV Shows seasons→episodes navigation
    └──requires──> Title detail page (season picker lives inside detail page)
    └──requires──> Per-episode source resolution (same backend path as movie streams, keyed per-episode)

Source/quality selection UI
    └──requires──> Backend torrent/magnet metadata resolution (seeders, size, resolution)
    └──requires──> Source health/seeder display (same data, presented per-stream)

Grouped/visual quality picker (differentiator)
    └──enhances──> Source/quality selection UI (adds ranking/badges on top of the raw list)

WebTorrent playback
    └──requires──> Source/quality selection UI (user has picked a magnet/stream)
    └──requires──> Existing player + proxy infrastructure (for HTTP/direct VOD fallback; WebTorrent itself streams client-side via WebRTC, bypassing /api/proxy)

Subtitle track selection
    └──requires──> WebTorrent playback OR HTTP direct playback (subs attach to whichever stream is active)

Continue-watching / resume position
    └──requires──> WebTorrent playback OR HTTP direct playback (needs a playback session to track progress against)
    └──enhances──> Existing client store (store.ts) — extends favorites/recents pattern, doesn't replace it

Watchlist
    └──enhances──> Catalog tabs / detail page (adds a save action)
    └──reuses──> Existing localStorage favorites pattern (store.ts)

VOD in Home rails + recommendations
    └──requires──> Catalog tabs (need VOD items to exist before they can be recommended)
    └──reuses──> Existing Home rail component + recommendation logic

Per-source attribution badges
    └──requires──> Indexer settings UI (need named sources to attribute to)
```

### Dependency Notes

- **Catalog tabs require the indexer settings UI first, or the catalog is empty by design.** Because PROJECT.md forbids a bundled catalog of copyrighted titles, the tabs literally have nothing but Internet Archive content until a user adds a source — so add-source UX must ship in the same phase as (or before) the catalog tabs, not as a later polish item.
- **Source/quality selection requires backend torrent-metadata resolution before it can render anything meaningful.** Seeder counts, resolution, and size all come from resolving magnet/torrent metadata server-side; the frontend picker is a thin presentation layer over that backend capability.
- **The grouped/visual quality picker (differentiator) enhances but does not replace** the plain source/quality selection UI — build the flat list first (table stakes), then layer ranking/badges once the underlying data is flowing.
- **WebTorrent playback bypasses the existing `/api/proxy` HLS relay** — it's a different code path (WebRTC swarm in-browser) from the live-IPTV proxy-always model. HTTP/direct VOD sources, however, should still route through `/api/proxy` for CORS consistency, matching the existing anti-pattern warning ("Direct stream playback from the browser" in ARCHITECTURE.md).
- **Continue-watching and watchlist both extend `store.ts`, not replace it** — same localStorage-backed pattern already handling favorites/recents/dead-marks for live channels; VOD just adds new key namespaces (e.g., `signal.vodResume.*`, `signal.vodWatchlist.*`).
- **VOD-in-Home-rails conflicts with nothing** but is only meaningful once catalog tabs exist and have populated a reasonable well of VOD items — sequence it after catalog tabs are live, not in parallel.

## MVP Definition

### Launch With (v1 of this milestone)

Minimum viable product for the VOD milestone — what's needed to validate "pluggable indexer + WebTorrent VOD catalog" works end-to-end.

- [ ] Indexer settings UI (add/remove/test-connection endpoints; Internet Archive pre-configured) — the guardrail-mandated entry point; without it, nothing else has content
- [ ] Movies / TV Shows / Documentary catalog tabs with genre rows (reusing Home rail component) + grid view (reusing Library/Console grid) — table-stakes browsing
- [ ] Title detail page with whatever metadata the source actually returns (synopsis/runtime when present, graceful omission when absent)
- [ ] Seasons → episodes navigation for TV Shows
- [ ] Search across configured indexers + local catalog
- [ ] Flat source/quality picker per title: resolution, size, seeder count, source-name badge
- [ ] WebTorrent in-browser playback (stream-while-download, no persistent storage) for magnet sources; existing `/api/proxy` path reused for HTTP/direct VOD sources
- [ ] Backend torrent/magnet metadata resolution + caching (mirrors curation-pipeline probe/cache pattern)
- [ ] Basic genre/type filter chips

### Add After Validation (v1.x)

Features to add once the core catalog+streaming loop is proven to work reliably.

- [ ] Continue-watching / resume position (client-side, extends `store.ts`) — trigger: once playback sessions are stable enough that resume state is trustworthy
- [ ] Watchlist (client-side, extends `store.ts`) — trigger: once catalog has enough real content that "save for later" is meaningful
- [ ] Subtitle track selection (sideloaded .srt/.vtt if provided by source) — trigger: once a real user reports needing subs for a specific title
- [ ] Grouped/visual quality picker (badges, seeder-strength bars, "Best Pick" button) — trigger: once the flat picker is validated and users are actually comparing multiple sources per title
- [ ] VOD folded into Home discovery rails + recommendations — trigger: once catalog tabs have a non-trivial content volume worth recommending
- [ ] Per-source attribution badges beyond the settings page (e.g., on catalog cards, not just stream rows) — trigger: once multiple third-party indexers are commonly configured side-by-side

### Future Consideration (v2+, beyond this milestone)

Features to defer well beyond this milestone — not because they're bad ideas, but because they're separate scopes.

- [ ] Rich metadata enrichment (TMDB/IMDb sync, cast photos, trailers) — defer: requires external API integration, licensing, and image caching outside this milestone's "catalog + streaming" scope
- [ ] External subtitle-fetching service integration (OpenSubtitles-style aggregation) — defer: adds a whole new pluggable-source category; validate sideloaded subs first
- [ ] Multi-user profiles/permissions — defer: no auth subsystem exists at all today; large scope on its own
- [ ] Community addon/plugin marketplace — defer: explicitly rejected as an anti-feature for this project's simpler "flat indexer list" model

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|----------------------|----------|
| Indexer settings UI (add-source) | HIGH | MEDIUM | P1 |
| Catalog tabs (rows + grid, reused components) | HIGH | LOW | P1 |
| Title detail page (basic metadata) | HIGH | MEDIUM | P1 |
| Seasons → episodes navigation | HIGH | MEDIUM | P1 |
| Search across catalog | HIGH | LOW–MEDIUM | P1 |
| Flat source/quality picker (seeders, size, resolution) | HIGH | MEDIUM | P1 |
| Backend torrent metadata resolution + caching | HIGH | MEDIUM–HIGH | P1 |
| WebTorrent in-browser playback | HIGH | HIGH | P1 |
| Genre/type filter chips | MEDIUM | LOW | P1 |
| Continue-watching / resume position | HIGH | MEDIUM | P2 |
| Watchlist | MEDIUM | LOW | P2 |
| Subtitle track selection | MEDIUM | MEDIUM | P2 |
| Grouped/visual quality picker (differentiator) | MEDIUM | MEDIUM | P2 |
| VOD in Home rails + recommendations | MEDIUM | MEDIUM | P2 |
| Per-source attribution on catalog cards | LOW–MEDIUM | LOW | P2 |
| Rich metadata enrichment (TMDB/IMDb) | LOW–MEDIUM | HIGH | P3 |
| External subtitle-fetching service | LOW | MEDIUM | P3 |
| Multi-user profiles | LOW (for this project's use case) | HIGH | P3 |
| Addon/plugin marketplace | N/A — anti-feature | N/A | Rejected |

**Priority key:**
- P1: Must have for this milestone's launch
- P2: Should have, add once P1 is validated
- P3: Nice to have, future milestone consideration

## Competitor Feature Analysis

| Feature | Stremio | Plex/Jellyfin | Our Approach |
|---------|---------|----------------|--------------|
| Catalog population model | Addon-based catalogs (community-run addon servers) | Server scans a local media library the operator owns | User-configured indexer endpoints (flat list) + bundled Internet Archive default — no addon marketplace, no local library scan |
| Source/stream resolution | Separate stream addons return torrent/debrid links per title, chosen at play time | N/A (direct file playback — the "source" is already the file on disk) | Backend resolves torrent/magnet metadata per title/episode, exposes resolution+size+seeders to a flat picker, cached like the existing curation pipeline |
| Continue watching / Up Next | Basic — addon-dependent | Plex merges Continue Watching + Next Up into one queue; Jellyfin keeps them split (widely criticized) | Client-side resume position via extended `store.ts`; keep it a single merged surface from day one (avoid Jellyfin's known UX complaint) |
| Quality/source picker | Raw stream list by default; community "Stremio Enhanced" plugin adds grouped visual badges + seeder-strength bars + Best Pick button | N/A | Ship the flat picker first (table stakes), then layer a "Best Pick"-style grouped picker as a differentiator once data quality is proven — mirrors the existing curation philosophy of "only show what's verified" |
| Playback transport | Torrent client (desktop) or debrid HTTP stream | Direct file stream from local server | WebTorrent (WebRTC, browser-only, no persistent storage) for magnet sources; existing `/api/proxy` HTTP relay reused for direct VOD sources |
| Multi-user support | Account-based, cloud-synced | Full multi-user households with permissions | Explicitly out of scope — no auth subsystem exists; anti-feature for this milestone |

## Sources

- [Stremio Addon Protocol (stremio-addon-sdk docs)](https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/protocol.md) — MEDIUM confidence, cross-checked against Stremio Addon SDK API README
- [Stremio Addon SDK API README](https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/README.md) — MEDIUM confidence
- [Torrentio guide — Viren070's Guides](https://guides.viren070.me/stremio/addons/torrentio) — MEDIUM confidence
- [AIOStreams Setup Guide](https://guides.viren070.me/stremio/addons/aiostreams/setup) — MEDIUM confidence
- [stream-quality-picker plugin (GitHub)](https://github.com/JZOnTheGit/stream-quality-picker) — MEDIUM confidence, cross-checked against Torrentio guide's seeder-filter description
- [Jellyfin Feature Requests — Watchlist](https://features.jellyfin.org/posts/576/watchlist-like-netflix) — MEDIUM confidence
- [Jellyfin Feature Requests — combine Next Up / Continue Watching](https://features.jellyfin.org/posts/1055/give-the-option-to-combine-next-up-and-continue-watching) — MEDIUM confidence, cross-checked against Firecore community thread on the same complaint
- [Firecore community — Jellyfin merge Continue Watching / Up Next](https://community.firecore.com/t/jellyfin-merge-continue-watching-and-up-next/39898) — MEDIUM confidence
- [WebTorrent official site](https://webtorrent.io/) and [WebTorrent FAQ](https://webtorrent.io/faq) — MEDIUM confidence, cross-checked against the webtorrent/webtorrent GitHub docs
- [webtorrent/webtorrent FAQ (GitHub)](https://github.com/webtorrent/webtorrent/blob/master/docs/faq.md) — MEDIUM confidence
- Project-internal: `.planning/PROJECT.md` and `.planning/codebase/ARCHITECTURE.md` — HIGH confidence (primary source of truth for existing reusable components and hard guardrails)

---
*Feature research for: VOD/streaming catalog addition to existing live-IPTV console*
*Researched: 2026-07-15*
