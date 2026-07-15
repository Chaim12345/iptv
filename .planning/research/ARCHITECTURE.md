# Architecture Research

**Domain:** Torrent/WebTorrent VOD integration into an existing axum + Vite/TS/WASM live-IPTV app
**Researched:** 2026-07-15
**Confidence:** MEDIUM (cross-checked official docs: webtorrent.io, docs.rs/librqbit, archive.org/developers, Jackett/Prowlarr Torznab references — no vendor SDK behind Context7, so tier caps at MEDIUM even when verified)

## Decision 1 — Client-side WebTorrent vs. server-side torrent engine

### The two models

**A. Client-side (browser WebTorrent, WebRTC transport)**
- The browser tab runs the WebTorrent JS client directly. It joins the swarm over WebRTC data channels, found via WebSocket-Secure (WSS) trackers (e.g. `tracker.openwebtorrent.com`, `tracker.btorrent.xyz`) and/or BEP19 HTTP web-seeds.
- Streaming renders through the MediaSource Extensions API (`torrentFile.renderTo()` / streaming `Blob`-backed `<video>`), no server involved in the byte path.
- **Hard constraint the browser imposes:** browsers have no raw UDP/TCP sockets, so a browser peer **cannot join the general BitTorrent swarm** (normal desktop clients on TCP/UDP + DHT). It can only connect to (a) other WebRTC-capable "web peers," or (b) BEP19 HTTP web-seeds that send CORS headers. There is also no DHT in-browser — trackers are the only peer-discovery mechanism.
- Practical fallout: most magnet links pulled from a generic torrent indexer will **not work in-browser** — they have normal UDP trackers and no web-seed, so a browser client sees zero reachable peers. Only sources that explicitly ship WSS trackers or web-seeds are viable. Internet Archive is the standout case: every IA item auto-generates an `_archive.torrent` file whose web-seed points back at IA's own HTTP servers, so IA content streams via WebTorrent even with zero live P2P peers.
- **Who bears bandwidth/CPU:** the end user's browser and their own network connection. Zero server egress, zero server storage — matches the "stream-while-download, no persistent storage" target feature exactly.
- **NAT:** WebRTC's ICE/STUN handles NAT traversal for browser-to-browser; browser-to-web-seed is a plain HTTPS fetch (no NAT concern). No server-side port-forwarding or firewall work needed.
- **CORS:** must be satisfied by the *remote* web-seed/tracker, not by this app's backend — outside this project's control. This is exactly why the guardrail restricts the bundled default to Internet Archive (verified CORS + web-seed support).

**B. Server-side (e.g. `librqbit`, a Rust BitTorrent engine embedded in axum)**
- The backend joins the full BitTorrent swarm (TCP/UDP peers + DHT), same as a desktop client — no WebRTC-only limitation.
- `librqbit` (the library form of `ikatson/rqbit`) exposes an HTTP control/streaming API; notably `GET /torrents/{id_or_infohash}/stream/{file_idx}` accepts `Range` and blocks/prioritizes pieces near the read cursor — i.e. it already does exactly what `/api/proxy` does for HLS (range-relayed streaming), just for torrent-backed files instead of upstream HTTP.
- **Who bears bandwidth/CPU:** the self-hosted server. Every concurrent VOD viewer downloads through the server's swarm connection and re-streams over HTTP to the browser — the server both seeds and re-transmits, which is exactly double the bandwidth pattern the existing `/api/proxy` already accepts for live HLS relaying (this app already bears full relay bandwidth for live channels).
- **NAT:** the server needs a real inbound port (or NAT-PMP/UPnP) to be a good BitTorrent peer; in restrictive self-hosted environments (Docker/NAT without port-forward) throughput can be poor, though outbound-only peer connections still generally work.
- **CORS:** irrelevant — the browser only ever talks to same-origin `/api/*`, identical to the existing HLS proxy model.
- **Persistent storage tension:** a full torrent engine wants to write pieces to disk (or hold big in-memory buffers) to serve range requests efficiently, which conflicts with the "no persistent storage" target feature unless deliberately run as an ephemeral/ram-backed cache that's purged per-session.

### Recommendation

**Primary streaming path: client-side WebTorrent in the browser** — this is what PROJECT.md's target features and guardrails already commit to, and the trade-off analysis above confirms it's the right call for a self-hosted, source-neutral app: zero added server bandwidth/storage burden, no new server attack surface for arbitrary torrent content, and it naturally enforces the "only web-seeded/WSS-tracked sources are playable" discipline that keeps the catalog legally sane (IA-first).

**But do not skip a server-side torrent component entirely.** The backend needs a narrow, non-streaming use of torrent-engine capability for **metadata resolution and health-checking only** (see Decision 3) — parsing a magnet URI or `.torrent` file into its info-hash/file-list/tracker-list/web-seed-list without downloading content, and probing whether the WSS-trackers/web-seeds a candidate source claims are actually reachable. `librqbit` (or an equivalent minimal BEP9 metadata-exchange crate) is the right tool for that narrow job — it never needs to persist downloaded media, only exchange a few KB of torrent metadata. This mirrors the existing curation pipeline's probe stage (`services/pipeline.rs`) almost exactly: "is this candidate source actually alive and usable" is the same question the live-TV probe already answers for HLS URLs.

**Do not build a full server-side streaming/relay path for torrent VOD** (no `/api/proxy`-equivalent that re-streams torrent bytes over HTTP). It would double bandwidth cost per concurrent viewer, reintroduce the storage-persistence tension, and duplicate work the browser's own WebTorrent client already does well.

### Trade-off summary

| Concern | Client-side (browser WebTorrent) | Server-side (librqbit relay) |
|---|---|---|
| Server bandwidth | None (P2P + web-seed direct) | Full duplex per viewer (swarm-in, HTTP-out) |
| Server storage | None | Needs disk/RAM piece cache |
| Browser peer reachability | Only WebRTC peers + BEP19 web-seeds; no DHT | Full swarm (TCP/UDP + DHT) |
| NAT handling | WebRTC ICE/STUN (automatic) | Needs server-side inbound port/UPnP for good peering |
| CORS | Must be satisfied by remote web-seed (out of this app's control) | N/A — same-origin relay like today's proxy |
| Fits "no persistent storage" goal | Yes, natively | Only with deliberate ephemeral-cache discipline |
| Matches existing architecture pattern | New (adds a client-side engine) | Reuses `/api/proxy` relay pattern directly |
| Source legality gate | Forces web-seed/WSS-tracker discipline (good — keeps IA-first) | No such natural gate |

## Decision 2 — Where the indexer client lives

**Backend-owned, not browser-owned.** The frontend never talks to Torznab/IA endpoints directly. Reasons: (1) indexer base URLs/API keys are operator secrets that shouldn't ship to the browser; (2) Torznab responses are XML (RSS2.0 + `torznab:attr` extensions) and IA's `advancedsearch`/`metadata` APIs have their own JSON shapes — normalizing both into one internal JSON contract belongs server-side, exactly like `services/curated.rs` already normalizes heterogeneous M3U/EPG sources into one `CuratedSource` model; (3) it lets the backend apply the health/legality gating from Decision 1 before anything reaches the UI.

**New service module:** `iptv-rs/src/services/indexers.rs` (or `services/vod/indexers.rs`), following the existing `services/{pipeline,curated}.rs` split:
- A small `IndexerClient` trait with two implementations to start: `TorznabClient` (generic — works for any Torznab-compatible endpoint the operator configures, e.g. self-hosted Jackett/Prowlarr or a public Torznab-speaking indexer) and `InternetArchiveClient` (the one bundled default, using `advancedsearch.php` for query/facet search and `/metadata/{identifier}` for per-item detail + the auto-generated `_archive.torrent` web-seed URL).
- Each implementation returns a common normalized struct (see `Source`/`Title` in Decision 4) regardless of upstream shape — the same "adapter converges on one internal model" pattern `curated.rs` already uses for M3U vs XMLTV sources.
- Indexer configuration (base URL, optional API key, enabled flag, category mapping) is operator-supplied and persisted, not hardcoded — this is the one place the architecture diverges from `curated.rs` (which is a hardcoded registry): indexers need CRUD endpoints because the guardrail requires "no bundled piracy-oriented indexers," i.e. IA ships built-in, everything else is BYO-config.

## Decision 3 — New API endpoints

All under a new `/api/vod/*` namespace in `iptv-rs/src/routes/mod.rs` (or a new `routes/vod.rs` module merged into the router, following "specific routes before parameterized ones"):

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/vod/indexers` | GET/POST/DELETE | CRUD for operator-configured indexer endpoints (Torznab URL + key, or built-in IA toggle) |
| `/api/vod/search` | GET `?q=&category=` | Fan out to enabled indexers, normalize results into `Source` candidates, return JSON (no DB write) |
| `/api/vod/resolve` | POST `{magnet\|torrentUrl}` | Resolve a magnet/`.torrent` into metadata (name, files, size, trackers, web-seeds, infohash) via the narrow torrent-metadata-only resolver; runs the health probe (tracker/web-seed reachability); caches result keyed by infohash |
| `/api/vod/catalog` | GET `?tab=movies\|tv\|documentary` | Paged/curated Title list for Home/Discover rails and tab views |
| `/api/vod/title/:id` | GET | Title detail: full metadata + `Source[]` (movie) or `Episode[]` with per-episode `Source[]` (series) |
| `/api/vod/pipeline/status` | GET | Progress of the background VOD catalog/resolution job (mirrors `/api/pipeline/status` for live curation) |
| `/api/vod/pipeline/run` | POST | Manually trigger a catalog refresh (mirrors `POST /api/pipeline/run`) |

Note there is **no VOD equivalent of `/api/proxy`** — per Decision 1, playback bytes never transit the backend. The only "streaming-adjacent" backend work is metadata resolution + health probing, both of which are cheap, bounded, and short-lived.

## Decision 4 — New data models and relation to existing Channel/Programme/AppStore

### New models (`iptv-rs/src/models/vod/` or `models/{title,source,indexer}.rs`)

- **`Title`** — shared parent shape for a piece of on-demand content: `id`, `kind` (`movie` | `series` | `documentary`), `name`, `year`, `poster_url`, `backdrop_url`, `description`, `genres[]`, `runtime_minutes`, `rating`, `tab` (Movies/TV/Documentary).
- **`Movie`** — `Title` + a flat `sources: Vec<Source>` (one or more quality/provider variants of the same film).
- **`Series`** — `Title` + `episodes: Vec<Episode>`.
- **`Episode`** — `id`, `series_id`, `season`, `episode_number`, `name`, `sources: Vec<Source>`.
- **`Source`** — the torrent/HTTP resolution unit: `id`, `kind` (`magnet` | `http` | `ia_item`), `magnet_uri` / `infohash`, `trackers: Vec<String>`, `web_seeds: Vec<String>`, `size_bytes`, `quality_label`, `provider_id` (which indexer produced it), `health` (`unverified` | `verified_playable` | `dead`), `last_checked`.
- **`IndexerConfig`** — `id`, `name`, `kind` (`torznab` | `internet_archive` | `custom_json`), `base_url`, `api_key: Option<String>`, `enabled`, `category_map`.

### Relation to existing models

`Channel`/`Playlist`/`Programme`/`EpgData` are **not reused or subclassed** — they model a fundamentally different thing (a persistent linear stream identified by `tvg-id`, matched against a time-indexed guide). VOD's `Title`/`Source` model a discrete, on-demand asset resolved from an indexer, with no EPG concept at all. Keep them as sibling domains.

The one structural pattern worth reusing deliberately: **`Candidate` → `Source` is the same shape**. The existing pipeline already models "one logical channel, several candidate mirror URLs, first-alive-wins, dead ones dropped" (`services/pipeline.rs` `Candidate`). `Source[]` per `Movie`/`Episode` is the identical concept — several candidate torrent/HTTP variants of the same title, each independently health-checked, with `health: dead` sources hidden from the UI exactly like dead channel candidates are dropped today. The VOD resolution/probe stage should be architected as a near-copy of the existing probe stage, not a new mental model.

### AppStore integration

Do not cram VOD state into the existing `AppStore` struct's channel/EPG fields. Instead, extend `AppStore` with new sibling fields, each behind its own `RwLock`, following the exact existing pattern:

```
AppStore {
    // existing: playlists, epg, working_set, pipeline_status ...
    vod_indexers: RwLock<Vec<IndexerConfig>>,
    vod_catalog: RwLock<Vec<Title>>,       // or split Movies/Series
    vod_source_cache: RwLock<HashMap<Infohash, Source>>, // resolved+probed cache
    vod_pipeline_status: RwLock<PipelineStatus>,          // reuse the existing PipelineStatus shape
}
```

Persist to new sibling JSON files under `iptv-rs/data/vod/` (`indexers.json`, `catalog.json`, `source_cache.json`), loaded on startup and rewritten on change — same durability model as `data/uploads/`, `data/epg/epg_data.json`, `data/working_channels.json`, including `.bak` fallback on parse failure. No changes needed to the live-TV persistence files.

## Decision 5 — New frontend routes/views and reuse of Home rails/player

### New views

- **Catalog tabs (Movies / TV / Documentary):** a new content-type dimension alongside the existing `home | console | library` layouts — likely a `vod` layout mode with an internal tab switch, or a tab strip nested inside the existing Library layout. Reuses the existing virtualized-list/grid rendering machinery already built for channel lists.
- **Title detail page:** new view — poster/backdrop, description, season/episode picker for `Series`, source/quality picker, a Play action. This is genuinely new (no existing equivalent), but its card/row-building should reuse `buildCard()`/`buildRow()`/`letterTile()` (the cohesive card-rendering cluster the graph identifies at Community 65) by giving them a `Title`-shaped adapter instead of a `Channel`-shaped one.
- **Search UI:** a search box wired to `/api/vod/search`, reusing existing filter-control patterns (`filterControls`, `applyFilters()` per Community 0/52) rather than inventing a new filter paradigm.

### Player reuse

The existing player path (`hls.js` → `/api/proxy`) is **not reused for VOD bytes** — per Decision 1 there's no proxy relay to reuse for torrent playback. What *is* reused: the surrounding player chrome (progress overlay, now/next-style status UI patterns from `renderGuide()`/`positionNow()` cluster, toasts-on-error, favorites/recents wiring in `store.ts`). A new `WebTorrentPlayer` module wraps the `webtorrent` npm package, instantiated on the title-detail Play action with the resolved `Source`'s magnet URI (already validated by the backend's resolve step), and streams into the same `<video>` element type via MediaSource — sitting alongside the existing hls.js code path as a second, source-type-driven playback engine rather than replacing it.

### Home integration

Fold VOD into the existing discovery rails by introducing a thin union type in `api.ts` (e.g. `RailItem = { type: 'channel', ... } | { type: 'title', ... }`) so `buildHome()`/`buildRow()` can render mixed live+VOD rails without duplicating rail-rendering logic. `store.ts`'s favorites/recents (currently channel-id-keyed) extend to a generic item-id + item-type key so a Title can be favorited/resumed the same way a channel is today.

## Recommended Integration Structure

```
iptv-rs/src/
├── routes/
│   ├── mod.rs                # existing live-TV routes (unchanged)
│   └── vod.rs                # NEW: /api/vod/* handlers
├── services/
│   ├── pipeline.rs           # existing live curation (unchanged)
│   ├── curated.rs            # existing curated registry (unchanged)
│   ├── indexers.rs           # NEW: IndexerClient trait + Torznab/IA impls
│   ├── vod_resolve.rs        # NEW: magnet/.torrent metadata resolution + health probe (librqbit-backed, metadata-only)
│   └── vod_pipeline.rs       # NEW: background catalog refresh (search → resolve → probe → persist), mirrors pipeline.rs stages
├── models/
│   ├── channel.rs / playlist.rs / programme.rs   # existing (unchanged)
│   └── vod/
│       ├── title.rs           # Title, Movie, Series, Episode
│       ├── source.rs          # Source
│       └── indexer.rs         # IndexerConfig
└── store.rs                  # AppStore extended with vod_* RwLock fields + persistence

frontend/src/
├── main.ts                   # extended: new vod layout/tabs wiring, title-detail rendering, WebTorrentPlayer invocation
├── api.ts                    # extended: vodSearch(), vodResolve(), vodCatalog(), vodTitle(), indexer CRUD, RailItem union
├── store.ts                  # extended: generic favorites/recents keying (item-type + item-id)
├── webtorrent-player.ts       # NEW: WebTorrentPlayer module (webtorrent npm dep, MediaSource wiring)
└── style.css                 # extended: title-detail, catalog tabs
```

### Structure rationale

- New backend modules are additive siblings to `services/{pipeline,curated}.rs` and `models/{channel,playlist,programme}.rs` — zero modification to live-TV code paths, minimizing regression risk to the shipped v1 curation/proxy system.
- `vod_resolve.rs` is intentionally separated from `vod_pipeline.rs`: resolution/probing is also invoked synchronously from the `POST /api/vod/resolve` endpoint (user pastes a magnet directly) as well as from the background catalog pipeline — it's a reusable service, not pipeline-stage-only logic.
- Frontend changes are additive files (`webtorrent-player.ts`) plus extensions to the three existing hub files (`main.ts`/`api.ts`/`store.ts`), consistent with how the codebase already centralizes SPA logic in a small number of large files rather than a component-per-file structure.

## Architectural Patterns

### Pattern 1: Candidate-style source health gating

**What:** Every `Source` starts `unverified`, gets probed (tracker/web-seed reachability check) by `vod_resolve.rs`, and only `verified_playable` sources are exposed to the frontend as playable — dead ones are hidden, not shown-then-failing.
**When to use:** Any time a Title/Episode has multiple Source candidates from different indexers.
**Trade-offs:** Adds a probe round-trip before a freshly-indexed title is playable (same latency trade-off the live pipeline already accepts for HLS candidates); pays off by keeping the UI free of "click play, nothing happens" dead links.

### Pattern 2: Normalize-at-the-adapter-boundary

**What:** `TorznabClient` and `InternetArchiveClient` each parse their own upstream shape (XML/RSS vs. IA JSON) internally and emit one common `Source`/`Title` shape outward — callers (search endpoint, catalog pipeline) never see indexer-specific structures.
**When to use:** Any new indexer type added later (the trait-based `IndexerClient` design is what makes "pluggable" real).
**Trade-offs:** Slightly more upfront trait/interface design vs. hardcoding one indexer; pays for itself the moment a second indexer type is added.

### Pattern 3: Metadata-only server-side torrent use

**What:** The backend uses a torrent-capable library (librqbit or equivalent) strictly for magnet→metadata resolution and reachability probing — never for downloading/streaming actual media content.
**When to use:** `POST /api/vod/resolve` and the background catalog pipeline's resolution stage.
**Trade-offs:** Keeps server bandwidth/storage near-zero while still getting real (not guessed) file lists, sizes, and tracker/web-seed reachability — the alternative (trust indexer-reported metadata blindly) risks surfacing unplayable sources.

## Data Flow

### VOD catalog refresh (background job, mirrors curation pipeline)

```
Trigger (startup / POST /api/vod/pipeline/run)
    ↓
Stage 1: Search — query enabled IndexerConfigs (Torznab + IA) for catalog seed queries
    ↓
Stage 2: Normalize — adapter converts each indexer's raw hits into Source candidates keyed by infohash
    ↓
Stage 3: Resolve+probe — vod_resolve.rs fetches magnet metadata, probes tracker/web-seed reachability
    ↓
Stage 4: Assemble — group Sources into Title/Movie/Series/Episode, persist to data/vod/catalog.json
    ↓
vod_pipeline_status → done
```

### Title playback (client-side, no server byte relay)

```
User clicks Play on title-detail
    ↓
frontend api.ts: GET /api/vod/title/:id (already-resolved Source with magnet_uri/trackers/web_seeds)
    ↓
WebTorrentPlayer instantiates webtorrent client in-browser with that Source's magnet
    ↓
Browser joins swarm over WSS trackers / fetches BEP19 web-seed directly (CORS satisfied by remote host)
    ↓
MediaSource-backed <video> renders as pieces arrive — no backend involvement in the byte path
```

### Key data flows

1. **Search-to-catalog:** operator-configured indexers → normalized `Source`s → health-probed → assembled into browsable `Title`s, persisted independently of the live-TV data files.
2. **Direct resolve:** a user-pasted magnet bypasses the catalog pipeline entirely, hitting `POST /api/vod/resolve` directly for on-demand metadata+health-check, then flows into the same title-detail/play UI.
3. **Playback:** entirely client-side once a `Source` is resolved; the backend is out of the loop after handing over trackers/web-seeds.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Single self-host, few viewers | Current design as-is: in-memory `AppStore` extension + JSON persistence, no server byte relay to worry about |
| Larger catalog (thousands of titles) | `vod_catalog`/`vod_source_cache` may want the same "never serialize the whole thing" discipline the EPG guide already enforces — paginate `/api/vod/catalog`, never a single full-catalog dump |
| Many concurrent viewers | Because streaming is client-side P2P, concurrent-viewer scaling is inherently better than the live-TV proxy path — the backend's only added load per viewer is the one-time resolve/probe call, not a sustained relay |

## Anti-Patterns

### Anti-Pattern 1: Building a server-side torrent relay "for consistency" with `/api/proxy`

**What people do:** Reuse the HLS proxy mental model literally — route torrent bytes through the backend because "that's how streaming works here."
**Why it's wrong:** Doubles server bandwidth per viewer, reintroduces the persistent-storage problem the target features explicitly reject, and adds a large new server attack surface (arbitrary swarm content flowing through the backend process).
**Do this instead:** Client-side WebTorrent for bytes; backend only resolves/probes metadata (Decision 1/3).

### Anti-Pattern 2: Trusting indexer-reported metadata as playable without probing

**What people do:** Show every search hit from Torznab/IA directly as a playable Source.
**Why it's wrong:** Most magnet links have no WSS tracker or web-seed and will silently fail to find any browser-reachable peer — a "play" button that does nothing.
**Do this instead:** Gate on the health-probe result (Pattern 1) before exposing a Source as playable, exactly as the live pipeline already gates on stream-liveness before exposing a channel.

### Anti-Pattern 3: Merging VOD state into the existing `AppStore` channel/EPG fields

**What people do:** Bolt `Title`/`Source` onto the existing playlist/EPG structures to "avoid duplicating the store pattern."
**Why it's wrong:** Channel/EPG and Title/Source are different domains with different lifecycles (linear guide vs. discrete on-demand asset); conflating them risks lock contention between hot live-TV paths and slower VOD resolution, and complicates the existing JSON persistence files.
**Do this instead:** Sibling `RwLock` fields + sibling JSON files under `data/vod/`, following the existing per-field-lock pattern exactly.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Internet Archive (`advancedsearch.php`, `/metadata/{id}`) | Backend `InternetArchiveClient`, bundled default indexer | Provides both catalog metadata and a working BEP19 web-seed per item — the only source guaranteed to work in-browser with zero live peers |
| Operator-configured Torznab endpoint (self-hosted Jackett/Prowlarr or any Torznab-speaking indexer) | Backend `TorznabClient`, BYO base URL + API key, disabled by default | XML/RSS2.0 + `torznab:attr` response; normalize server-side before it ever reaches the frontend |
| WSS BitTorrent trackers (e.g. `tracker.openwebtorrent.com`) | Consumed directly by the browser's WebTorrent client, not proxied | Backend only needs to *validate* reachability during resolve/probe, never relay traffic through them |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Live-TV routes ↔ VOD routes | Separate route modules under one axum `Router`, no shared handler code | Keeps live-TV regression risk near zero while adding VOD |
| `AppStore` (existing) ↔ VOD state | New sibling `RwLock` fields on the same struct, same lock-scoping discipline (never hold a guard across `.await`) | Reuses the store's existing concurrency contract rather than inventing a second state container |
| `vod_pipeline.rs` ↔ `vod_resolve.rs` | Direct function calls, resolve logic shared with the synchronous `/api/vod/resolve` endpoint | Avoids duplicating probe/resolve logic between background job and on-demand user action |
| Frontend `main.ts` ↔ `webtorrent-player.ts` | New module import, invoked only from title-detail Play action | Existing hls.js path in `main.ts` untouched; two playback engines coexist, selected by source kind |

## Suggested Build Order (phases, dependency-ordered)

1. **VOD data models + AppStore/persistence extension** — `Title`/`Movie`/`Series`/`Episode`/`Source`/`IndexerConfig`, new sibling `RwLock` fields + `data/vod/*.json` persistence. No UI, no external calls yet; establishes the foundation everything else writes into.
2. **Indexer client (Torznab + Internet Archive)** — `IndexerClient` trait, both implementations, indexer CRUD endpoints, raw `/api/vod/search` returning normalized JSON. Testable end-to-end via curl before any catalog/UI work depends on it.
3. **Magnet/torrent metadata resolution + health probe** — `vod_resolve.rs` (librqbit-backed, metadata-only), `POST /api/vod/resolve` endpoint. Depends on Phase 2 only for supplying magnet URIs to resolve; also independently testable with a hand-pasted magnet.
4. **VOD catalog background pipeline** — `vod_pipeline.rs` assembling Title/Movie/Series/Episode from indexer search + resolve/probe results; `/api/vod/catalog`, `/api/vod/title/:id`, `/api/vod/pipeline/{status,run}`. Depends on Phases 2 and 3.
5. **Frontend catalog browsing** — Movies/TV/Documentary tabs, title cards (reusing `buildCard()`/`buildRow()`), title-detail page, search UI. Depends on Phase 4's endpoints; Play button can be stubbed (no playback yet) so this phase ships independently reviewable UI.
6. **Client-side WebTorrent playback** — `webtorrent-player.ts`, MediaSource wiring, wired into title-detail's Play action using the already-resolved Source's magnet/trackers/web-seeds. The riskiest new tech, deliberately last, once the catalog/metadata foundation is proven solid.
7. **Home rail integration** — `RailItem` union in `api.ts`, mixed live+VOD rails in `buildHome()`, generalized favorites/recents keying in `store.ts`. Last because it's cosmetic/integrative, not blocking any other phase, and benefits from both live-TV and VOD paths already being stable.

## Sources

- [WebTorrent API Documentation](https://webtorrent.io/docs) — MEDIUM confidence, official docs
- [WebTorrent FAQ](https://webtorrent.io/faq) — MEDIUM confidence, official docs
- [webtorrent/webtorrent — GitHub](https://github.com/webtorrent/webtorrent) — MEDIUM confidence, official source
- [Implement Web (HTTP) Seeding (BEP17+BEP19) · Issue #67 · webtorrent/webtorrent](https://github.com/webtorrent/webtorrent/issues/67) — MEDIUM confidence
- [librqbit — docs.rs](https://docs.rs/librqbit/latest/librqbit/) — MEDIUM confidence, official crate docs
- [ikatson/rqbit — GitHub](https://github.com/ikatson/rqbit) — MEDIUM confidence, official source
- [Torznab API Reference — Jackett DeepWiki](https://deepwiki.com/Jackett/Jackett/3-torznab-api-reference) — MEDIUM confidence
- [Torznab WebAPI — SearXNG Documentation](https://docs.searxng.org/dev/engines/online/torznab.html) — MEDIUM confidence
- [Tools and APIs — Internet Archive Developer Portal](https://archive.org/developers/index-apis.html) — MEDIUM confidence, official docs
- [Item Metadata API — Internet Archive Developer Portal](https://archive.org/developers/metadata.html) — MEDIUM confidence, official docs
- Internal: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`, `.planning/graphs/GRAPH_REPORT.md`, `.planning/PROJECT.md` — HIGH confidence, first-party project sources

---
*Architecture research for: torrent/WebTorrent VOD integration (SIGNAL v2.0)*
*Researched: 2026-07-15*
