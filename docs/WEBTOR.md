# Torrent VOD in SIGNAL via the webtor player

SIGNAL streams on-demand torrent video **in the browser** using the
[webtor.io embed SDK](https://github.com/webtor-io/embed-sdk-js), backed by a
**self-hosted webtor instance**. This is the reliable path for torrent VOD:
librqbit (the Rust engine) does **not** fetch HTTP web seeds, so peerless
sources like the Internet Archive can't stream through it — webtor's backend
(built on `anacrolix/torrent`) does, and it exposes an HTTP player we embed.

Nothing here touches Jellyfin. Live TV + the STRM library still feed Jellyfin as
before (see [JELLYFIN.md](./JELLYFIN.md)); torrent VOD lives in the SIGNAL UI.

## How it fits together

```
SIGNAL UI (browser)                 SIGNAL backend            webtor (self-hosted)
──────────────────                  ──────────────            ────────────────────
Movies overlay
  ├─ search ───────────────────────▶ /api/vod/search ──▶ Internet Archive
  └─ click a title
        └─ webtor embed SDK ───────────────────────────▶ <baseUrl>/show  (iframe)
              (magnet / torrentUrl)                          torrent-web-seeder
                                                             content-transcoder
                                                             → streams to the player
```

- The embed SDK (`frontend/public/webtor-embed.js`, vendored from
  `iptv-rs/embed-sdk-js/dist`) renders an `<iframe>` from the webtor instance and
  hands it the torrent. **webtor's backend** fetches the torrent (including its
  HTTP web seed) and streams it to the in-browser player.
- Source-neutral: search uses SIGNAL's configured indexers (Internet Archive by
  default). Configure only legal sources.

## Run the webtor backend

Prebuilt all-in-one image (torrent-web-seeder, content-transcoder,
magnet2torrent, rest-api, web-ui, postgres, redis via s6):

```bash
docker compose --profile streaming up -d webtor
# UI/API on http://localhost:8080
```

Set the public URL webtor builds its links from (must be reachable by the
browser — `localhost` for same machine, else the host LAN IP/domain):

```bash
WEBTOR_DOMAIN=http://192.168.1.10:8080 docker compose --profile streaming up -d webtor
```

> The image is published on **ghcr.io** only. Pulling it needs egress to
> `ghcr.io` + `pkg-containers.githubusercontent.com`. Behind a corporate VPN
> that blocks GitHub, pull it on an unrestricted network. Actual streaming also
> needs the webtor backend to reach torrent peers / web seeds.

## Point the SIGNAL UI at your webtor instance

In the SIGNAL UI: **Movies** → the footer field **"webtor server"** → set the URL
(default `http://localhost:8080`). It's saved in `localStorage` under
`signal.webtorBase`, so each browser can target the right instance.

## Files

| Path | Role |
|---|---|
| `frontend/src/vod.ts` | Movies overlay: IA search, results grid, webtor embed player |
| `frontend/public/webtor-embed.js` | Vendored embed SDK (served at `/webtor-embed.js`) |
| `iptv-rs/embed-sdk-js/` | Upstream SDK checkout (source of the vendored dist) |
| `iptv-rs/self-hosted/` | Upstream self-hosted webtor (reference; image is prebuilt) |
| `docker-compose.yml` (`webtor`, profile `streaming`) | Runs the backend |

To update the SDK: rebuild it in `iptv-rs/embed-sdk-js` (or take a new
`dist/index.min.js`) and copy it to `frontend/public/webtor-embed.js`, then
`npm run build` in `frontend/`.

## Notes & limits

- The embed player is browser-side; there is no Jellyfin plugin. VOD-in-Jellyfin
  would need the STRM path with a byte-serving backend (separate track).
- IA search results carry no infohash, so the SDK is handed the item's
  `_archive.torrent` URL (which includes the web seed). If the webtor `/show`
  page can't fetch that cross-origin (CORS), front it through a proxy that adds
  `Access-Control-Allow-Origin: *`.
- Behind WSL + corporate VPN, the vpnkit tunnel's MTU must be lowered (gvproxy
  `-mtu 1280` / TAP MTU 1280 / TCP MSS clamp) or bulk transfers black-hole. See
  `wsl-net-mtu-fix.service`.
