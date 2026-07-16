# Phase 1: Jellyfin IPTV Feed - Context

**Gathered:** 2026-07-15
**Status:** Ready for planning
**Mode:** Smart discuss (autonomous) — defaults accepted by user

<domain>
## Phase Boundary

Expose SIGNAL's existing curated, verified live channels + merged EPG as endpoints a
Jellyfin server consumes natively as a Live TV tuner (M3U) + guide provider (XMLTV).
Additive to the existing `iptv-rs` backend — no regression to the curation pipeline or
existing `/api/*` routes. Requirements: JF-01, JF-02, OPS-03.
</domain>

<decisions>
## Implementation Decisions (accepted)

- **Channel set:** the verified "working set" (alive channels) only — not raw unverified sources.
- **Endpoints:** `GET /api/jellyfin/playlist.m3u` (M3U tuner) and `GET /api/jellyfin/epg.xml`
  (XMLTV guide). New, additive routes; existing routes untouched.
- **Channel identity:** reuse each channel's existing `tvg-id`; the M3U `tvg-id` MUST equal
  the XMLTV `<channel id>` so Jellyfin aligns guide data to the tuner channel. Fall back to a
  stable derived id when `tvg-id` is absent.
- **EPG scope:** serve the full merged guide; Jellyfin ingests and windows it itself.
- **Access:** no auth (LAN/self-host), consistent with the existing accepted-risk posture.
- **M3U format:** standard `#EXTM3U` with `#EXTINF` carrying `tvg-id`, `tvg-name`, `tvg-logo`,
  `group-title`, then the channel stream URL (proxied URL so Jellyfin playback matches SIGNAL).

## Claude's Discretion

Exact struct/handler layout, header details, and content-type specifics are at Claude's
discretion, guided by existing `routes/mod.rs` conventions and the codebase map.
</decisions>

<code_context>
## Existing Code Insights

- `iptv-rs/src/routes/mod.rs` — axum routes; add the two Jellyfin endpoints here.
- `iptv-rs/src/store.rs` — `AppStore` holds the verified working set (`get_working`) and the
  merged EPG (`EpgState`, channel→programme index). Reuse these; do not re-derive.
- `iptv-rs/src/parsers/xmltv.rs` — existing XMLTV parsing; mirror its element/date shape when
  emitting XMLTV.
- Channel model has `tvg_id`, `name`, `logo`, `group`, `url`; EPG has channels + programmes
  with RFC-3339 start/stop.
- Reuse `/api/proxy` for stream URLs so Jellyfin playback goes through the same relay.
</code_context>

<specifics>
## Specific Ideas

- M3U `tvg-id` ↔ XMLTV `channel id` alignment is the correctness crux — test that a channel
  with EPG shows guide data in Jellyfin.
- XMLTV must emit `<channel>` entries (id, display-name, icon) and `<programme>` entries
  (channel, start, stop in XMLTV `YYYYMMDDHHMMSS +0000` format, title, desc).
- Keep it streaming/allocation-conscious: the working set can be ~8k channels and the EPG
  large — build strings incrementally, don't clone the whole guide per request.
</specifics>

<deferred>
## Deferred Ideas

- Auth/tokenized access — deferred (LAN posture).
- Per-Jellyfin-user channel filtering — deferred.
- Xtream Codes API — out of scope (Jellyfin doesn't support it).
</deferred>
