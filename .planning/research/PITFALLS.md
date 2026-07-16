# Pitfalls Research

**Domain:** In-browser WebTorrent VOD streaming + pluggable indexer/magnet resolver, added to an existing self-hosted axum + Vite/TS/WASM live-IPTV app
**Researched:** 2026-07-15
**Confidence:** MEDIUM-HIGH (protocol-level facts HIGH — sourced from WebTorrent/BitTorrent official docs and trackers; SSRF/resource-exhaustion guidance MEDIUM — synthesized from general security literature, not project-specific incident reports)

## Critical Pitfalls

### Pitfall 1: Browser WebTorrent can't stream most public torrents — no WSS peers, no web-seed (THE #1 GOTCHA)

**What goes wrong:**
The team builds an in-browser WebTorrent player, points it at a "real" public magnet link (the kind users will paste or the indexer will return), and it just spins forever with `numPeers: 0` or hangs at "connecting to peers." It works fine in the demo with a curated magnet (e.g. Internet Archive, Sintel/WebTorrent's own demo torrents) and then fails on almost everything else in production.

**Why it happens:**
A browser can only speak WebRTC — it cannot open raw TCP/UDP sockets to the swarm the way a desktop BitTorrent client does. WebTorrent's protocol changes make a "web peer" reachable only by (a) other WebRTC-capable peers signaling through a **WebSocket Secure (`wss://`) tracker**, or (b) **BEP19 HTTP/HTTPS web seeds** embedded in the torrent's metadata/magnet. The overwhelming majority of torrents distributed on public trackers were created for desktop clients (qBittorrent, Transmission, libtorrent) and list only `udp://`/`http://` trackers with zero WebRTC peers and zero web-seed `ws=` URLs. Unless the uploader explicitly seeded through a WebTorrent-capable client or explicitly added a web seed, there is no reachable peer for a browser tab at all — this isn't a bug, it's the ceiling of the protocol.

**How to avoid:**
- Treat "will this magnet actually stream in-browser" as a **hard filter**, not an assumption. Before ever handing a magnet to the frontend player, resolve its tracker list and check for `wss://` entries, and/or check the metadata for web-seed (`url-list`/`ws`) entries.
- Make Internet Archive (which serves content over HTTP web seeds and can be wrapped with a WSS-tracker magnet) the default/reference source precisely because it satisfies this constraint — this is already captured as a guardrail in PROJECT.md; treat it as a technical requirement, not just a legal one.
- For any indexer-sourced or user-pasted magnet that lacks WSS/web-seed support, do not silently attempt browser playback. Either (a) fall back to a backend-mediated path (desktop-side libtorrent/webtorrent engine downloads via real TCP/UDP peers, then serves bytes to the browser over HTTP range requests — no browser-native swarm required), or (b) clearly mark the item as "not browser-streamable" before the user ever clicks play.
- Never assume a demo torrent (WebTorrent's own Sintel/Big Buck Bunny magnets) is representative of what the indexer/catalog will actually return.

**Warning signs:**
- `numPeers` stays at 0 for >10-15s with no error surfaced to the UI.
- QA only ever tests with the 2-3 well-known WebTorrent demo magnets and never with indexer-sourced results.
- No code path inspects the tracker/web-seed list before attempting playback.

**Phase to address:**
Foundational — the phase that introduces the in-browser WebTorrent player itself. This must be designed in from day one (it dictates whether a "backend-assisted streaming" fallback path is even needed), not bolted on after the indexer phase ships.

---

### Pitfall 2: Mixed content and CORS silently kill tracker/web-seed connections

**What goes wrong:**
The app is served over HTTPS (or will be, once self-hosted behind a reverse proxy/TLS). The browser refuses to open a plain `ws://` WebSocket to a tracker, or refuses to fetch an `http://` web-seed URL, with no obvious error beyond a console warning — the swarm just never connects, and it looks identical to Pitfall 1 (0 peers) to anyone not checking devtools.

**Why it happens:**
Browsers block **mixed active content**: an HTTPS page cannot open `ws://` (only `wss://`) or fetch plain `http://` resources without an explicit relaxation, and CORS additionally blocks cross-origin `fetch`/XHR to web-seed hosts that don't send permissive `Access-Control-Allow-Origin` headers. Many public/legacy trackers and old web seeds only offer `ws://`/`http://`, and some web-seed hosts have restrictive CORS. This is invisible in local dev over `http://localhost` (mixed content rules don't apply there), which is why it's commonly missed until deployed behind HTTPS.
Also directly relevant to this project: it currently runs `/api/proxy` behind permissive CORS and binds `0.0.0.0` (see CONCERNS.md), so local dev may mask issues that reappear once a user fronts it with TLS.

**How to avoid:**
- Filter/prefer `wss://` trackers only; treat `ws://`-only magnets as non-browser-streamable in an HTTPS deployment (same fallback logic as Pitfall 1).
- For web seeds, verify CORS headers are present (Internet Archive's are) before relying on direct browser fetch; where CORS is missing, route through the existing same-origin `/api/proxy` pattern this app already uses for HLS, rather than fighting per-host CORS.
- Test the full streaming path with the app served over HTTPS (or a local TLS proxy) before considering browser-torrent playback "done" — do not validate only against `http://localhost`.

**Warning signs:**
- Devtools console shows "Mixed Content" or CORS blocked errors that never reach application-level error handling.
- Playback works in local `npm run dev` but fails once deployed behind a reverse-proxy with TLS.

**Phase to address:**
Same phase as Pitfall 1 (in-browser WebTorrent player) — add an explicit HTTPS-served test pass to that phase's verification criteria.

---

### Pitfall 3: Default rarest-first piece selection makes playback stall-prone; sequential/streaming mode must be explicit

**What goes wrong:**
Video "streams" but stutters constantly, or takes a very long time before the first frame renders, even when peers/web-seed bytes are available. Users perceive this as "torrent streaming is broken" when actually the wrong piece-picking strategy is running.

**Why it happens:**
BitTorrent's default piece-selection algorithm (rarest-first) optimizes for swarm health and fast overall completion, not for linear playback — it deliberately fetches pieces out of order. A media player needs pieces roughly in file order, with a look-ahead buffer, so streaming torrent clients (WebTorrent's `torrent-stream`/`createServer`/`renderTo` APIs) must be explicitly told to prioritize sequential pieces near the current playback position (and deprioritize/discard far-future pieces once the buffer is healthy) rather than left on default download-optimized behavior.

**How to avoid:**
- Use WebTorrent's built-in streaming APIs (`file.createReadStream({start, end})`, `file.renderTo`, or the service-worker `server` mode) rather than hand-rolling piece selection — these already bias toward sequential fetch near the requested byte range.
- Explicitly set higher priority for the currently-buffered range and re-prioritize on seek (scrubbing) events; don't let the engine fall back to rarest-first once video playback starts.
- Surface a loading/buffering state distinct from "no peers" (Pitfall 1) so users understand the difference between "nothing is streamable" and "it's fetching, please wait."

**Warning signs:**
- Frequent stalls despite a healthy peer/seed count in the swarm.
- Seeking forward causes long freezes because the engine re-downloads sequentially from the old position instead of re-prioritizing near the new one.

**Phase to address:**
In-browser WebTorrent player phase — this is a playback-quality requirement, not a follow-up polish item.

---

### Pitfall 4: Service-worker streaming has its own scope/lifecycle traps

**What goes wrong:**
The service-worker-backed streaming server (used to give the `<video>` tag a real HTTP URL backed by torrent data) intermittently fails to intercept requests, breaks after a service-worker update/reload, or accidentally intercepts unrelated requests (including the app's own WebSocket tracker connections), causing playback or app functionality to break unpredictably.

**Why it happens:**
A service worker only controls documents that were loaded *after* it activated and that fall within its registered `scope`; a page loaded before SW activation, or a page outside scope, silently falls back to network — meaning the "virtual URL" the video element points at 404s. Additionally, browsers do not let a service worker intercept WebSocket handshakes, but request/response mismatches in scope handling have been a known source of confusing bugs (documents outside a broadened scope that end up "controlled" unexpectedly). SW updates (`skipWaiting`/`clients.claim`) can also swap the controller mid-stream, orphaning an in-flight virtual server.

**How to avoid:**
- Register the service worker and explicitly wait for `navigator.serviceWorker.ready` (and confirm `controller` is set for the *current* page, reloading once if necessary) before creating the virtual streaming server — do not assume it's active on first load.
- Scope the service worker as narrowly as the streaming feature needs; don't let it default to `/` if it doesn't need to touch the rest of the app.
- Avoid `clients.claim()`/aggressive SW update strategies for this feature unless the in-flight-stream teardown path is tested; an update mid-playback should cleanly stop/restart the stream, not silently corrupt it.
- Have a non-SW fallback (e.g., backend-mediated HTTP range serving, same pattern already used for `/api/proxy`) for browsers/contexts where the SW path misbehaves, so torrent streaming degrades gracefully rather than hard-failing.

**Warning signs:**
- Playback works on a hard refresh but breaks on soft navigation (SPA route change) without a reload.
- Random 404s to the SW-served virtual URL that disappear after a manual page reload.

**Phase to address:**
In-browser WebTorrent player phase (streaming server sub-task).

---

### Pitfall 5: Torrent engine as an unbounded resource sink — disk, connections, and memory grow without limit

**What goes wrong:**
A backend torrent/webtorrent engine (used either for the fallback path in Pitfall 1 or for metadata resolution) is added without connection/bandwidth/disk caps. Over time: the data directory fills the disk with partial/completed downloads that are never cleaned up, the process opens hundreds-to-thousands of peer connections per active torrent (multiplied across concurrently-open items), and long-running or abandoned downloads pin memory and file descriptors indefinitely. This mirrors an existing pattern in this codebase — the EPG store already keeps an entire ~350MB JSON blob resident in memory with no bound (see CONCERNS.md) — so an unbounded torrent engine repeats a known anti-pattern rather than introducing a novel one.

**Why it happens:**
Popular torrent engines default to "get it as fast as possible" behavior: many simultaneous peer connections, no default disk quota, and no automatic cleanup of stale/orphaned swarms. In a "stream-while-download, no persistent storage" design (per PROJECT.md's stated intent), it's easy to forget that *some* bytes still land on disk/in memory as a buffer even if the intent is ephemeral — if that buffer isn't actively pruned per session, it accumulates exactly like a memory leak.

**How to avoid:**
- Cap concurrent torrents/swarms and per-torrent peer connections explicitly (WebTorrent/libtorrent both expose connection-limit and bandwidth-limit options — set them, don't rely on defaults).
- Treat the "no persistent storage" guardrail as an enforced invariant: use an actual temp/ephemeral store (OS tmpdir or an in-memory/ring buffer sized to a small multiple of the streaming window) with an explicit, tested teardown on stream stop/tab-close/timeout — not "delete on next boot."
- Add a hard idle timeout: if a torrent has no active viewer/consumer for N minutes, destroy it and free its resources.
- Add process-level resource ceilings (max total torrents in flight, max total disk usage for the temp store, max total peer connections) so one user/session can't exhaust the host — this is especially important because the app already binds `0.0.0.0` with no auth (CONCERNS.md), so anything resource-unbounded is reachable by anyone who can hit the box.

**Warning signs:**
- Disk usage in the torrent temp directory grows monotonically across a testing session and isn't reclaimed when playback stops.
- `netstat`/connection count for the backend process climbs unbounded when multiple items are opened/closed in sequence.
- No test exists for "close tab mid-download" or "leave torrent open and idle" cleanup behavior.

**Phase to address:**
Backend torrent engine phase (if a backend-mediated/fallback path is built) — bake resource limits into the initial engine integration, not as a later hardening pass.

---

### Pitfall 6: Blocking the async runtime with synchronous torrent/disk I/O

**What goes wrong:**
If the backend torrent engine (or its FFI/child-process bridge) does blocking file I/O, blocking hashing (piece verification is CPU-heavy SHA-1 work), or blocking network calls on a tokio worker thread, the whole axum server's request-handling stalls — live IPTV proxy requests, EPG queries, and other in-flight features degrade or hang while a torrent operation runs. This project's own codebase already had to reach for `spawn_blocking` once for a similar reason (EPG persist, per CONCERNS.md `pipeline.rs:416-419`), so the team has direct precedent for how easy this is to miss.

**Why it happens:**
Piece-hash verification and any synchronous crate/FFI call are inherently CPU/blocking work; naively calling them inline inside an `async fn` handler blocks the tokio reactor thread that's also servicing every other concurrent request, because tokio's default runtime assumes async code yields promptly.

**How to avoid:**
- Run torrent-engine operations (piece hashing, disk writes, any synchronous library calls) inside `tokio::task::spawn_blocking` or on a dedicated thread pool, exactly as already done for EPG persistence.
- If shelling out to a separate torrent daemon/process (common pattern — e.g., a sidecar libtorrent process controlled over a local API) instead of an in-process Rust crate, prefer that isolation specifically to keep torrent CPU/IO off the axum runtime entirely.
- Load-test with a live IPTV proxy request in flight *while* a torrent download is active, to confirm the two don't starve each other.

**Warning signs:**
- Live-TV proxy latency spikes noticeably whenever a torrent download/verify is running.
- Health-check or `/api/metrics` endpoints show request queueing correlated with torrent activity.

**Phase to address:**
Backend torrent engine phase — verification criteria should include a concurrent-load test against existing live-IPTV endpoints.

---

### Pitfall 7: User-configurable indexer + magnet resolver reopens (and widens) the accepted SSRF surface

**What goes wrong:**
The pluggable indexer feature lets an operator point the app at an arbitrary indexer URL, and the magnet/metadata resolver fetches whatever URLs that indexer (or a malicious/compromised one) returns — including HTTP redirects to internal hosts, cloud metadata endpoints (`169.254.169.254`), or loopback/LAN addresses. This is architecturally the same class of issue already accepted for `/api/proxy` and `/api/sources/fetch` in this codebase (per CONCERNS.md), but the indexer path is a *new* attack surface with a different trust boundary: the proxy fetches URLs the local user typed in; an indexer response is attacker-influenced content the operator didn't directly author, fetched automatically by the backend.

**Why it happens:**
"Pluggable" means the URL (indexer endpoint, and by extension whatever it returns — torrent metadata files, trackers, web-seed hosts) is attacker-influenceable if the configured indexer is untrustworthy or compromised, and the existing codebase pattern in this project is to fetch first, validate second (see `/api/sources/fetch`, which substring-checks the URL only *after* the request is already sent — CONCERNS.md). If the indexer resolver/metadata fetcher is built by copying that existing pattern, the new surface inherits the same weakness, but now triggered by remote, less-trusted input rather than local user input.

**How to avoid:**
- Do not silently reuse the existing accepted-risk proxy pattern for the indexer/resolver path without a decision — this is new attack surface, not the same one. At minimum, validate destination host *before* the request is dispatched (not after, as `fetch_source` currently does), and prefer resolving DNS once and checking the resolved IP against a private/loopback/link-local blocklist (`127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.0.0/16`, and IPv6 equivalents) before connecting.
- Disable automatic redirect-following on the indexer/resolver's HTTP client, or re-validate the destination host on every redirect hop (a same-looking public URL can 302 to an internal host).
- If the project's stance remains "accepted risk for local/self-host use" (as already documented for the proxy), state that explicitly for the indexer/resolver too, rather than leaving it implicit — future review of "is this exposed beyond localhost" should already have this on the list, per the existing CONCERNS.md guidance.
- Treat indexer-returned magnet/tracker/web-seed URLs as untrusted strings requiring the same scheme/host checks as any other proxy input — a malicious indexer could return a `file://`, `ws://internal-host`, or similar payload wrapped in what looks like a magnet link's tracker list.

**Warning signs:**
- The magnet resolver's HTTP client has `redirect(Policy::default())` (follow) with no host re-check, mirroring the existing `/api/proxy` behavior.
- No test exists for "indexer returns a magnet whose tracker/web-seed URL points at `127.0.0.1` or `169.254.169.254`."

**Phase to address:**
Indexer/magnet-resolver phase — this should get its own explicit SSRF review distinct from (and referencing) the existing accepted-risk note in CONCERNS.md, because it's a new trust boundary even though the underlying vulnerability class is already known in this codebase.

---

### Pitfall 8: Shipping with a bundled infringement-oriented default breaks the "source-neutral" guardrail and creates real legal exposure

**What goes wrong:**
Under time pressure to make the VOD catalog feel populated ("Movies/TV tabs look empty otherwise"), a well-known public torrent indexer or tracker gets hardcoded as a default, or the catalog seed data is populated by scraping a popular piracy-adjacent site "just for now." This directly contradicts the PROJECT.md guardrail ("No bundled or default piracy-oriented trackers/indexers... No bundled catalog of copyrighted titles") and is the single most consequential pitfall in this milestone — precedent from projects like Popcorn Time and various pre-configured indexer front-ends shows that bundling piracy-oriented defaults (rather than requiring user configuration) is what turns a general-purpose tool into a target for takedown/legal action, because it demonstrates intent and turns the operator (not just the end user) into a de facto distributor.

**Why it happens:**
Pressure to demo a "working, full-looking" catalog quickly, combined with the reality that legal/neutral sources (Internet Archive, public-domain feeds) are a small fraction of what a torrent indexer ecosystem offers, makes it tempting to reach for whatever "just works" and has the most content.

**How to avoid:**
- Keep Internet Archive (or equivalent public-domain/legally-cleared sources) as the *only* bundled default indexer/tracker, exactly as PROJECT.md states, and make this an enforced product requirement (tested/reviewed), not just a stated intention.
- Any additional indexer must be added by explicit operator configuration (user types in a URL/API key), never shipped pre-filled, pre-selected, or auto-discovered.
- Do not scrape or mirror any third-party catalog metadata (titles, posters, descriptions) from piracy-oriented sites for "seed data" even temporarily — use only sources whose licensing is clear (Internet Archive metadata, public-domain databases).
- Add attribution for any source actually used (Internet Archive requires/encourages this) and avoid implying the app itself hosts or endorses specific copyrighted content.
- Bake this into acceptance criteria for the catalog/indexer phases: "does the shipped default config, on a clean checkout, resolve to zero non-legal sources?" should be a literal pass/fail check, not a design aspiration.

**Warning signs:**
- Any commit that adds a tracker/indexer URL, torrent hash, or magnet link to default config, seed data, or fixtures without a documented legal basis.
- Catalog "looks empty" complaints during development leading to a shortcut default.

**Phase to address:**
Cross-cutting — enforce at every phase touching default config, seed data, or indexer defaults (indexer client phase, VOD catalog phase). Treat as a standing review gate, not a one-time check.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|-----------------|------------------|
| Skip checking tracker/web-seed list before playback, just try WebTorrent client on any magnet | Faster to ship a "play" button | Silent no-peer dead ends for nearly all real-world magnets (Pitfall 1) | Never — this is core correctness, not polish |
| Reuse `/api/proxy`'s fetch-then-validate pattern for the indexer/magnet resolver | Fast to build, matches existing code | Widens accepted SSRF risk to a less-trusted input source (Pitfall 7) | Only if explicitly re-documented as an accepted risk for this new surface too, with the same reasoning as the existing proxy note |
| Let the torrent engine use default (unbounded) connection/disk settings during prototyping | Simple integration, "just works" in a demo | Disk/connection/memory growth under any real usage (Pitfall 5) | Acceptable for a local dev spike only; must be capped before anything resembling a shared/long-running deployment |
| Hardcode a popular public indexer as a temporary default "to make the catalog look full" | Fast, impressive demo | Legal exposure + breaks the source-neutral guardrail (Pitfall 8) | Never |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|-------------------|
| WSS trackers | Assuming any magnet's tracker list will work in-browser because it "has a tracker" | Explicitly filter for `wss://` scheme trackers; treat `udp://`/`http://`-only tracker lists as non-browser-streamable |
| Web seeds (BEP19) | Assuming web seeds are common; not checking `url-list`/`ws=` fields before relying on them | Check for web-seed presence explicitly; prefer sources (like Internet Archive) known to provide them |
| Pluggable indexer APIs | Trusting indexer response fields (magnet, tracker URLs) as safe strings to fetch/embed | Validate/sanitize every URL an indexer returns before the backend or browser fetches it (same rigor as user-typed URLs) |
| Service worker (streaming server) | Creating the virtual streaming server before confirming `navigator.serviceWorker.controller` is set for the current page | Explicitly await `serviceWorker.ready` and confirm the controller before creating the server; reload once if uncontrolled |
| Existing `/api/proxy` | Assuming its accepted-risk SSRF posture automatically covers new torrent/indexer fetch paths | Treat each new outbound-fetch surface as its own review item; don't inherit the exception silently |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Default rarest-first piece selection during "streaming" playback | Frequent stalls/buffering despite healthy peer count | Use sequential/streaming APIs (`createReadStream`, `renderTo`) with priority re-set on seek | Immediately, on any non-trivial file size |
| Unbounded concurrent torrents/peer connections | Rising memory/FD/connection count over a session; other endpoints (live IPTV proxy) slow down | Cap concurrent torrents, peer connections per torrent, and idle-timeout unused swarms | Noticeable once 2-3 items are opened without closing the first; severe well before "many users" |
| Synchronous hashing/disk I/O on the tokio runtime | Live-proxy/API latency spikes correlated with torrent activity | `spawn_blocking` for all torrent CPU/IO work, mirroring the existing EPG-persist pattern | As soon as any torrent operation runs concurrently with other traffic |
| No disk quota/cleanup for the "no persistent storage" ephemeral buffer | Disk usage climbs monotonically across a test session | Enforce a small ring-buffer/tmp cap with tested teardown on stop/idle/tab-close | Any session lasting longer than a single stream without restart |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Fetching indexer-returned URLs (torrent metadata, tracker/web-seed hosts) without host validation | SSRF against internal services, cloud metadata endpoints, or LAN devices — worse than the existing accepted proxy risk because the input is remote/attacker-influenced, not just local-user-supplied | Validate resolved IP against a private/loopback/link-local blocklist before connecting; disable/re-check redirects |
| Following HTTP redirects blindly in the magnet/metadata resolver | A public-looking indexer URL can redirect to an internal address at request time (classic SSRF bypass) | Disable auto-redirect or re-validate destination host on every hop |
| Treating the indexer feature's trust boundary as identical to the existing accepted proxy risk | Silently expands what "the user accepted this risk" actually covers, without an explicit decision | Document and decide the indexer/resolver's SSRF posture explicitly, referencing but not assuming the existing CONCERNS.md note |
| No authentication/binding hardening added alongside the new torrent/indexer surface | Backend still binds `0.0.0.0` with permissive CORS and no auth (existing, accepted for proxy) — every new fetch/resource-heavy endpoint added inherits that same exposure | At minimum, re-confirm this posture is still intentional as new surface area is added; consider whether torrent/indexer endpoints specifically warrant tighter binding even if the rest of the app doesn't |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-------------------|
| No-seeders/no-WSS-peers dead end with no explanation | User clicks play, sees a spinner forever, assumes the whole feature is broken | Detect the no-browser-peer condition (Pitfall 1) up front and show a clear "not streamable in-browser" state with a reason, before the user commits to waiting |
| Slow start / long time-to-first-frame | Perceived as broken/slow app, users abandon before playback begins | Show explicit "connecting to peers / fetching first pieces" progress state distinct from a generic spinner; prioritize sequential fetch near playback position (Pitfall 3) |
| Buffering/stalling mid-playback with no feedback | Users think their connection or the app is unstable | Surface buffer health / peer count in the player UI so stalls read as "network condition," not "app is broken" |
| Stale indexer results (catalog shows items that are actually dead/unseeded by the time the user clicks) | Users repeatedly hit dead ends, lose trust in the catalog | Periodically re-check health of catalog entries (peer/seed count, web-seed reachability) similar to the existing live-channel "verified working set" pattern already used for IPTV; don't treat indexer results as permanently valid |
| Metadata mismatch (wrong poster/title/year attached to a torrent) | Users get a different movie/show than expected, erodes trust in the whole catalog | Cross-check indexer metadata against a secondary identifier (file size/hash, duration) where feasible; clearly label unverified matches rather than presenting them as confirmed |

## "Looks Done But Isn't" Checklist

- [ ] **In-browser WebTorrent playback:** Often only tested against WebTorrent's own demo magnets — verify it against actual indexer-sourced/public magnets and confirm the "no browser-peers available" case is detected and surfaced, not just the happy path.
- [ ] **HTTPS-served streaming:** Often only tested over `http://localhost` — verify the same flow works when the app is served over HTTPS (mixed-content/CORS issues are invisible in plain local dev).
- [ ] **Torrent resource cleanup:** Often missing teardown on tab-close/idle/stream-stop — verify disk usage and connection counts actually return to baseline after closing a stream, not just that playback "works."
- [ ] **Indexer/magnet SSRF handling:** Often copies the existing accepted-risk proxy pattern verbatim — verify host validation happens *before* the request is dispatched (not after, as the existing `/api/sources/fetch` does) and that redirects are checked.
- [ ] **Source-neutral defaults:** Often drifts during development ("just add this indexer for testing") — verify a clean checkout's default config resolves to zero non-legal bundled sources before considering any indexer-related phase complete.
- [ ] **Async runtime isolation:** Often missing until a load test is run — verify a concurrent live-IPTV-proxy request stays responsive while a torrent download/verify is active.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|-----------------|
| No-WSS-peer dead ends already shipped to users | LOW | Add a pre-flight tracker/web-seed check and a clear "not streamable" UI state; no data migration needed |
| Unbounded torrent resource growth discovered in production | MEDIUM | Add connection/disk caps and idle-timeout cleanup; may require a restart to reclaim already-accumulated disk/memory |
| SSRF surface found in the shipped indexer/resolver | MEDIUM-HIGH | Add host/IP validation and redirect re-checking before the next fetch is issued; audit logs for any exploitation attempts if the app was ever exposed beyond localhost |
| A default indexer/tracker or seed catalog entry is found to be piracy-oriented after shipping | HIGH | Remove immediately, audit all existing user configs/seed data for the same pattern, and add the "zero non-legal defaults on clean checkout" check as a permanent CI/review gate going forward |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|-------------------|---------------|
| No WSS peers / no web-seed for most public torrents | In-browser WebTorrent player phase | Test against real indexer-sourced magnets (not just demo torrents); confirm "not streamable" state triggers correctly |
| Mixed content / CORS blocking trackers or web seeds | In-browser WebTorrent player phase | Run the full streaming path with the app served over HTTPS, not just localhost |
| Rarest-first stalls, no sequential prioritization | In-browser WebTorrent player phase | Playback of a multi-hundred-MB file shows steady buffering and clean seek behavior, not repeated stalls |
| Service-worker scope/lifecycle bugs | In-browser WebTorrent player phase | Test SPA soft-navigation into the player (no hard reload) and a SW-update-mid-playback scenario |
| Unbounded torrent engine resource usage | Backend torrent engine phase | Open/close multiple torrents in sequence; confirm connections/disk/memory return to baseline; verify idle-timeout cleanup fires |
| Blocking the async runtime with torrent I/O/hashing | Backend torrent engine phase | Concurrent-load test: live IPTV proxy latency stays stable while a torrent download/verify runs |
| SSRF via indexer/magnet resolver | Indexer/magnet-resolver phase | Test that a magnet/indexer response pointing at a private IP or redirecting to one is rejected before the request completes |
| Non-source-neutral defaults / legal exposure | Cross-cutting: indexer client phase + VOD catalog phase | Clean-checkout audit: default config and seed data resolve to zero non-legal bundled sources |

## Sources

- [WebTorrent — GitHub](https://github.com/webtorrent/webtorrent) — HIGH (official project source)
- [WebTorrent FAQ](https://webtorrent.io/faq) — HIGH (official docs; browser/WebRTC peer constraints)
- [WebTorrent API Documentation](https://webtorrent.io/docs) — HIGH (official docs; connection/bandwidth options, streaming APIs)
- [Using Web Seeds — WebTorrent](https://mintlify.wiki/webtorrent/webtorrent/guides/web-seeds) — HIGH (BEP19 web-seed behavior)
- [Inner workings of WS · Issue #195 · webtorrent/bittorrent-tracker](https://github.com/webtorrent/bittorrent-tracker/issues/195) — MEDIUM (community/maintainer discussion of WS tracker internals)
- [1245906 - Scope is not honored by ServiceWorker — Mozilla Bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1245906) — MEDIUM (browser bug tracker; SW scope/interception edge cases)
- [jimmywarting/webtorrent-server-browser — GitHub](https://github.com/jimmywarting/webtorrent-server-browser) — MEDIUM (community reference implementation of SW-backed streaming server)
- [Server-Side Request Forgery — Wiz Academy](https://www.wiz.io/academy/application-security/server-side-request-forgery) — MEDIUM (general SSRF/DNS-rebinding/redirect-validation guidance)
- [SSRF Vulnerability: Bypassing Protection with DNS Rebinding Attack](https://aydinnyunus.github.io/2026/03/14/ssrf-dns-rebinding-vulnerability/) — MEDIUM (independent security writeup)
- `.planning/codebase/CONCERNS.md` (this repo) — HIGH (project-verified source for existing accepted-risk SSRF pattern, EPG blocking-runtime precedent, and resource-growth precedent)
- `.planning/PROJECT.md` (this repo) — HIGH (project source of truth for source-neutrality and WSS/web-seed guardrails)

---
*Pitfalls research for: In-browser WebTorrent VOD streaming + pluggable indexer, iptv-rs / frontend milestone v2.0*
*Researched: 2026-07-15*
