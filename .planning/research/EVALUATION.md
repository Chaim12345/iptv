# v2.0 Architecture Evaluation — Standalone vs. Media-Server Integration

_Decision gate before requirements/roadmap. Prompted by: use `indexarr-rs` as the Rust
indexer + integrate the *arr ecosystem; evaluate keeping SIGNAL standalone vs. integrating
into Jellyfin/Emby and contributing just live-torrent streaming + IPTV._

## Load-bearing facts

1. **Jellyfin/Emby already do IPTV natively** — M3U tuner + XMLTV EPG (no Xtream Codes).
   Our curated, verified channel set can be exported as M3U+XMLTV and consumed directly.
2. **The *arr model is download-to-disk, not live streaming.** Prowlarr (indexer aggregator)
   → Sonarr/Radarr (automated downloads via qBittorrent etc.) → files on disk → Jellyfin
   serves. `indexarr-rs`/Prowlarr are the **search/index layer only**; they do not provide
   "no-download" streaming.
3. **Live torrent streaming = SIGNAL's real differentiator.** Not native to Jellyfin/Emby.
   Community bridges exist: **Streamarrfs** (WebTorrent-backed FUSE filesystem — torrents
   appear as files the server reads on demand) and **Gelato** (Stremio→STRM bridge).
4. **`indexarr-rs`**: Rust+Vue, AGPL-3.0, v0.3.0 / 7 stars / 70 commits — early. Best used as
   a **separate sidecar service over HTTP** (avoids AGPL network-copyleft entanglement from
   linking, and isolates us from immature internals).
5. **Jellyfin plugins are C#/.NET.** We are Rust+TS. Integration is cleanest at the
   **data layer** (M3U/XMLTV feeds, STRM files, a virtual filesystem) — language-agnostic,
   which is exactly how Streamarrfs/Gelato integrate.
6. Guardrail unchanged: source-neutral, no bundled piracy indexers, Internet Archive as the
   legal reference source; source legality is the operator's configuration responsibility.

## Options

### Option A — Standalone SIGNAL builds its own VOD (the research's 7-phase plan)
Own the entire stack + UX: VOD data models, indexer client, metadata/health resolver,
WebTorrent playback, catalog UI, Home integration.
- **Pros:** full control; one cohesive glassmorphism UX; no external server dependency;
  keeps the existing Rust/TS/WASM stack.
- **Cons:** rebuilds what Jellyfin already nails — library management, metadata scraping,
  transcoding, and mature TV/mobile/web/cast **client apps**. Large surface (phases 5–7 are
  a whole media-library UI). Slowest path to a "full" experience.

### Option B — Integrate into Jellyfin/Emby; SIGNAL contributes IPTV + live-torrent only
Jellyfin is the media server, library, metadata, and clients. SIGNAL provides:
(1) curated IPTV as an M3U+XMLTV tuner feed; (2) live torrent streaming via a
Streamarrfs-style WebTorrent/librqbit **virtual filesystem or STRM bridge**;
`indexarr-rs`/Prowlarr as the sidecar indexer.
- **Pros:** stop rebuilding a media server; inherit Jellyfin's mature clients (Android TV,
  Roku, iOS, web, Chromecast) — the "10-foot TV experience" for free; smallest new-UI
  surface; leverages the exact integration points that already exist.
- **Cons:** dependency on Jellyfin + its plugin/data conventions; live-torrent bridge is the
  hard part (FUSE/virtual-FS, .NET plugin, or STRM), and community bridges are niche/
  variably maintained; our polished glassmorphism UI becomes secondary to Jellyfin's UI.

### Option C — Hybrid (recommended)
SIGNAL stays the **live front-end** (IPTV zapper + instant live-torrent play — the
differentiator, already built and polished). Add `indexarr-rs`/Prowlarr as a **sidecar
indexer**. For the heavy VOD **library/clients**, **interoperate with Jellyfin instead of
rebuilding it**: export our curated channels as M3U+XMLTV for Jellyfin's Live TV, and expose
live-torrent items to Jellyfin via a Streamarrfs-style virtual FS / STRM bridge. Users who
want a full library + native TV apps use Jellyfin; users who want instant zap/stream use
SIGNAL. One shared Rust backend (indexer client, librqbit resolver, health, streaming)
serves both surfaces.
- **Pros:** keeps SIGNAL's differentiator and existing UI; avoids duplicating Jellyfin's
  library/clients; the shared streaming/indexer backend is reused by both; incremental —
  ship SIGNAL-native VOD first, add the Jellyfin bridge as a later phase.
- **Cons:** two surfaces to reason about; the bridge is still real work; scope must be
  policed so it doesn't drift back into "rebuild everything."

## Recommendation

**Option C (hybrid), biased toward "don't rebuild the media server."** Concretely for v2.0:
1. Shared Rust backend: **indexer integration** (indexarr-rs/Prowlarr Torznab as a sidecar
   over HTTP), **librqbit metadata/health resolver**, and the **live-streaming engine**
   (client WebTorrent for web-seeded sources + server librqbit sequential streaming).
2. SIGNAL-native minimal VOD surface reusing existing Home/Library/player (fast win, our UX).
3. **Jellyfin interop** as an explicit phase: M3U+XMLTV export for curated channels, and a
   Streamarrfs-style live-torrent bridge (virtual FS / STRM) — so the "full high-quality
   experience with real TV-app clients" comes from Jellyfin, not from us re-implementing it.

This reframes the research's phases 5–7 (a full bespoke VOD UI) into a smaller SIGNAL VOD
surface + a Jellyfin bridge — less duplication, faster to a genuinely complete experience.

## Open questions for the user
- Primary daily driver: SIGNAL's own UI, or Jellyfin's native clients (Android TV/Roku/etc.)?
- Is a Jellyfin/Emby server assumed present, or must the product stand alone?
- indexer: adopt `indexarr-rs` (early, AGPL, Rust — aligns with our stack) or Prowlarr
  (mature, C#, huge indexer coverage) as the sidecar? Both speak Torznab.
