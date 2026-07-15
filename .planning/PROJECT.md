# SIGNAL — IPTV & Streaming Console

## What This Is

A self-hosted streaming console. A Rust (axum) backend curates and verifies free live-TV
sources and EPG data; a Vite + TypeScript frontend (backed by a Rust→WASM module) presents
a TV-style experience — Home/Discover rails, virtualized channel lists, a Plex-style grid,
and a glassmorphism UI. Playback flows through a same-origin `/api/proxy` (HLS relay).

## Core Value

Turn scattered free/public streaming sources into one polished, reliable, TV-grade
experience — only surfacing content that actually plays.

## Context

- **Backend:** `iptv-rs/` (axum + tokio). Curation pipeline (fetch → dedupe → probe →
  verified working set), EPG merge + index, `/api/proxy` HLS relay. Serves the built
  frontend from `iptv-rs/static`.
- **Frontend:** `frontend/` (Vite + TypeScript), source of truth; `iptv-wasm/` (Rust→WASM)
  for parse/group/filter.
- Detailed maps in `.planning/codebase/` and `.planning/graphs/GRAPH_REPORT.md`.

## Shipped (v1 — live IPTV)

- Curation pipeline: ~15.5k unique channels → ~8.2k verified-alive.
- 40+ curated free playlists + 18 EPG guides; fuzzy EPG matching; timeline + now/next guide.
- WASM/TS frontend migration; Home/Discover, Console, Library layouts; glassmorphism UI.
- Public-domain VOD seed (Internet Archive). Shipped via PRs #1–#4.

## Current Milestone: v2.0 Streaming Platform — Torrent VOD + Catalog

**Goal:** Extend from live IPTV into a full on-demand experience — in-browser WebTorrent
streaming plus a pluggable, user-configured indexer, populating Movies / TV / Documentary
tabs from legal torrent + HTTP sources.

**Direction (decided):** Option B — integrate into Jellyfin/Emby rather than rebuild a media
server. SIGNAL contributes curated IPTV + live-torrent streaming + a sidecar indexer;
Jellyfin owns the library, metadata, and native TV/Roku/mobile clients. (Supersedes the
research's standalone VOD-UI phases 5–7. See `.planning/research/EVALUATION.md`.)

**Target features:**
- **Jellyfin IPTV feed** — expose curated, verified channels + merged EPG as
  M3U tuner + XMLTV endpoints Jellyfin consumes natively.
- **Live-torrent streaming engine (shared Rust backend)** — librqbit metadata/health
  resolution + sequential byte-range streaming (no persistent download; bounded cache);
  Internet Archive web-seed sources via the existing proxy.
- **Jellyfin live-torrent bridge** — expose resolved torrent items to Jellyfin as playable
  media without full download (Streamarrfs-style virtual filesystem or STRM library).
- **Indexer integration** — Torznab client querying an `indexarr-rs` sidecar over HTTP
  (separate service; AGPL-isolated); operator-configured endpoints.
- Setup/docs for pointing a Jellyfin server at SIGNAL.

**Guardrails (hard constraints):**
- **Source-neutral.** No bundled or default piracy-oriented trackers/indexers. Source
  legality is the operator's configuration responsibility. No bundled catalog of
  copyrighted titles.
- Browser WebTorrent requires WSS trackers / web-seeds (browser peers ≠ desktop TCP
  peers) — Internet Archive provides web-seeds and is the legal reference source.

## Key Decisions

- Frontend is the Vite+TS app backed by iptv-wasm; legacy Python/vanilla removed (a68df0e, 7b86fc1).
- Playback is proxy-always for CORS/egress consistency.
- SSRF on `/api/proxy` is a known, user-accepted risk for LAN/self-host use (see `.planning/codebase/CONCERNS.md`).
- **v2.0 = Option B (integrate into Jellyfin), not standalone.** We don't rebuild library/
  metadata/clients; we feed Jellyfin (IPTV M3U+XMLTV) and bridge live-torrent streaming into it.
- **Indexer = `indexarr-rs` as a sidecar HTTP service** (Torznab), never linked into our
  binary — it is AGPL-3.0 (network copyleft) and early-stage (v0.3.0).
- **Source-neutral, hard rule:** no bundled/default piracy indexers or trackers; Internet
  Archive is the only bundled legal reference source; source legality is the operator's
  configuration responsibility.

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
_Last updated: 2026-07-15 — Milestone v2.0 started._
