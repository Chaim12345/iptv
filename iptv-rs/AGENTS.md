# IPTV Web Player — Rust Rewrite

## Build

- `cargo build` — Build the Rust binary
- `cargo test` — Run unit tests (platform-independent)
- `cargo check` — Fast compile check without producing a binary

## Run

```bash
cd iptv-rs
cargo run
# Opens on http://localhost:3000 (or IPTV_PORT env var)
```

Environment variables:
- `IPTV_PORT` — Server port (default: 3000)
- `IPTV_DATA_DIR` — Data directory (default: `data/`)
- `IPTV_MAX_UPLOAD_BYTES` — Max upload size (default: 100MB)
- `IPTV_CACHE_DURATION_SECS` — Health check cache TTL (default: 3600)

## Project structure

```
iptv-rs/
├── Cargo.toml
└── src/
    ├── main.rs          — Axum web server entrypoint
    ├── config.rs        — Environment-based configuration
    ├── error.rs         — Unified error type with Axum IntoResponse
    ├── store.rs         — Thread-safe in-memory store with JSON persistence
    ├── models/          — Data types
    │   ├── mod.rs
    │   ├── channel.rs   — Channel struct (name, url, logo, group, tvg_id, status)
    │   ├── playlist.rs  — Playlist struct (name, channels, last_updated)
    │   └── programme.rs — EPG types: Programme, EpgChannel, EpgData
    ├── parsers/         — File format parsers
    │   ├── mod.rs
    │   ├── m3u.rs       — M3U/M3U8 playlist parser (with tests)
    │   └── xmltv.rs     — XMLTV EPG parser with gzip support (with tests)
    ├── routes/          — HTTP API routes
    │   └── mod.rs       — All API handlers
    └── services/        — Business logic
        ├── mod.rs
        └── curated.rs   — Free public IPTV/EPG source definitions
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Serve index.html |
| GET | `/api/health` | Server health check |
| GET | `/api/playlists` | List all playlists |
| GET | `/api/playlists/{name}` | Get a playlist by name |
| POST | `/api/playlists/upload` | Upload an M3U file (multipart) |
| DELETE | `/api/playlists/{name}` | Delete a playlist |
| GET | `/api/channels` | List all channels across playlists |
| GET | `/api/channels/search?q=` | Search channels by name/tvg_id/group |
| GET | `/api/epg` | Get EPG data (channel → programmes map) |
| GET | `/api/epg/full` | Get full EPG data (channels + programmes arrays) |
| POST | `/api/epg/upload` | Upload an XMLTV EPG file (multipart) |
| POST | `/api/check-links` | Check stream health for a playlist |
| POST | `/api/remove-dead-links` | Remove dead channels from a playlist |
| GET | `/api/sources` | List curated public IPTV/EPG sources |
| POST | `/api/sources/fetch` | Fetch and parse a curated source by URL |

## Testing

- `cargo test` runs all unit tests (8 tests: 4 M3U, 4 XMLTV/EPG date parsing)
- The parsers are pure Rust with no UI dependencies — testable on any platform
- The `channel.rs` test in `config.rs` verifies default config construction

## Notes

- Static files are served from `../static/` (relative to the binary)
- Templates are served from `../templates/` via embed (index.html)
- Data persistence: playlists and EPG data saved as JSON files under `data/`
- Health check cache avoids hammering dead streams repeatedly
