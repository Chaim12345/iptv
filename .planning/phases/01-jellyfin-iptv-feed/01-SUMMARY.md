# Phase 1 Summary: Jellyfin IPTV Feed

**Status:** Complete — verified
**Requirements:** JF-01 ✓, JF-02 ✓, OPS-03 ✓

## What shipped
Two additive endpoints on the `iptv-rs` backend that let a Jellyfin server consume SIGNAL's
existing curated live-TV as a native Live TV tuner + guide provider.

- `GET /api/jellyfin/playlist.m3u` — the verified working set as M3U (`#EXTINF` with
  `tvg-id`/`tvg-name`/`tvg-logo`/`group-title`), stream URLs absolute + routed through
  `/api/proxy` so Jellyfin plays via the same egress SIGNAL verified.
- `GET /api/jellyfin/epg.xml` — the merged EPG as XMLTV (`<channel>` + `<programme>`,
  RFC-3339 → `YYYYMMDDHHMMSS +0000`).

## Implementation
- `store.rs`: `render_m3u(base)` and `render_xmltv()` build the payloads under the read lock
  (no clone of the 8k-channel set or the ~1.6M-programme guide); M3U/XML escaping + XMLTV
  time helpers.
- `routes/mod.rs`: two handlers + `origin_from_headers` (Host/X-Forwarded-Proto → absolute
  base for proxied URLs). Existing routes unchanged.

## Verification (live smoke test)
- `playlist.m3u` → 8,215 `#EXTINF` entries; sample channels carry correct tvg-id/logo/group.
- `epg.xml` → 25,726 `<channel>`, 1,615,282 `<programme>`; well-formed XMLTV header.
- `/api/health` 200; existing endpoints unaffected (OPS-03).

## Known limitations / follow-ups
- **tvg-id alignment:** channels lacking a `tvg-id` won't bind to guide data. Conventional
  IPTV+XMLTV behavior; fuzzy alignment (reuse the store's matcher to backfill M3U tvg-ids from
  resolved EPG ids) is a future enhancement.
- **XMLTV size:** the guide (~1.6M programmes) is rendered to a single in-memory string per
  request. Fine for infrequent Jellyfin guide refreshes; consider streaming/caching if it
  becomes hot.

## Env note
Build target redirected to native WSL fs (`iptv-rs/.cargo/config.toml` →
`/root/.cache/iptv-rs-target`) to escape `/mnt/c` slowness + cross-toolchain `target/`
corruption. Binary: `/root/.cache/iptv-rs-target/debug/iptv-rs`.
