/* SIGNAL — VOD (torrent streaming) via the self-hosted webtor player.
   Self-contained: injects its own "Movies" entry, overlay, styles, and lazy-
   loads the vendored webtor embed SDK (public/webtor-embed.js). Torrent video
   plays in the browser through a webtor instance (baseUrl) — no media-server
   changes, and librqbit is not involved. Search hits SIGNAL's /api/vod/search
   (Internet Archive by default); a result's torrent URL is handed to webtor,
   whose backend fetches it (incl. HTTP web seeds) and streams to the player. */

// WebTorrent browser bundle is loaded at runtime and attaches window.WebTorrent.
declare global {
  interface Window { WebTorrent?: new (opts?: unknown) => any }
}

interface VodResult {
  title: string;
  year?: number;
  size?: number;
  seeders?: number;
  source: string;
  url: string;
  infohash?: string;
  kind?: string;
}

const WEBTOR_BASE_KEY = 'signal.webtorBase';
// webtor backend for peer-swarm (magnet) playback. Defaults to the OCI server
// (open egress → real BitTorrent peers); override per-browser via the Movies
// footer field. Web-seed content does NOT use this — it streams via SIGNAL.
const DEFAULT_WEBTOR_BASE = 'http://137.131.63.155:8088';
const getWebtorBase = () =>
  (localStorage.getItem(WEBTOR_BASE_KEY) || DEFAULT_WEBTOR_BASE).replace(/\/+$/, '');
const setWebtorBase = (v: string) => localStorage.setItem(WEBTOR_BASE_KEY, v.trim());

// ── Lazy-load the vendored WebTorrent browser bundle once ────────────────────
let wtScriptPromise: Promise<void> | null = null;
function loadWebTorrent(): Promise<void> {
  if (window.WebTorrent) return Promise.resolve();
  if (wtScriptPromise) return wtScriptPromise;
  wtScriptPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = '/webtorrent.min.js';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load WebTorrent'));
    document.head.appendChild(s);
  });
  return wtScriptPromise;
}

const fmtSize = (n?: number) =>
  !n ? '' : n > 1e9 ? `${(n / 1e9).toFixed(1)} GB` : `${Math.max(1, Math.round(n / 1e6))} MB`;

// Internet Archive item id from its download URL → the item's thumbnail, used
// as the player poster. e.g. https://archive.org/download/<id>/<id>_archive.torrent
function iaPoster(url: string): string | undefined {
  const m = url.match(/archive\.org\/download\/([^/]+)\//);
  return m ? `https://archive.org/services/img/${m[1]}` : undefined;
}

// ── DOM scaffold (built once, lazily) ────────────────────────────────────────
let overlay: HTMLElement | null = null;
let resultsHost: HTMLElement | null = null;
let playerWrap: HTMLElement | null = null;
let mount: HTMLElement | null = null;
let searchInput: HTMLInputElement | null = null;
let statusEl: HTMLElement | null = null;
let category: 'movies' | 'tv' = 'movies';

function injectStyles() {
  if (document.getElementById('vod-styles')) return;
  const css = `
  #vodOverlay{position:fixed;inset:0;z-index:60;display:none;background:rgba(6,8,11,.86);
    backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);color:#E8EDF2;
    font-family:'Hanken Grotesk',system-ui,sans-serif}
  #vodOverlay.is-open{display:flex;flex-direction:column}
  .vod-head{display:flex;align-items:center;gap:14px;padding:16px 22px;border-bottom:1px solid rgba(255,255,255,.08)}
  .vod-title{font-family:'Sora',sans-serif;font-weight:700;font-size:18px;letter-spacing:.02em}
  .vod-title small{font-weight:500;color:#8A94A6;margin-left:8px;font-size:12px}
  .vod-search{flex:1;display:flex;gap:8px;max-width:560px}
  .vod-search input{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);
    color:#E8EDF2;border-radius:10px;padding:10px 14px;font-size:14px;outline:none}
  .vod-search input:focus{border-color:#4FA9F5}
  .vod-btn{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);color:#E8EDF2;
    border-radius:10px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap}
  .vod-btn:hover{background:rgba(255,255,255,.14)}
  .vod-btn.solid{background:#4FA9F5;border-color:#4FA9F5;color:#06121f}
  .vod-cats{display:flex;gap:4px}
  .vod-cats button{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#8A94A6;border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;cursor:pointer}
  .vod-cats button.is-active{background:#4FA9F5;border-color:#4FA9F5;color:#06121f}
  .vod-close{margin-left:auto;font-size:20px;line-height:1;background:none;border:none;color:#8A94A6;cursor:pointer;padding:6px 10px}
  .vod-close:hover{color:#fff}
  .vod-body{flex:1;overflow:auto;padding:18px 22px;display:flex;flex-direction:column;min-height:0}
  .vod-status{color:#8A94A6;font-size:13px;padding:10px 2px}
  .vod-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px}
  .vod-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:14px;
    padding:14px;cursor:pointer;transition:transform .12s,border-color .12s}
  .vod-card:hover{transform:translateY(-2px);border-color:#4FA9F5}
  .vod-card h4{font-family:'Sora',sans-serif;font-size:14px;font-weight:600;margin:0 0 6px;line-height:1.3}
  .vod-meta{display:flex;flex-wrap:wrap;gap:6px;font-size:11px;color:#8A94A6}
  .vod-chip{background:rgba(255,255,255,.07);border-radius:6px;padding:2px 7px}
  .vod-src{color:#3DD68C}
  .vod-player{display:none;flex-direction:column;flex:1;min-height:0}
  .vod-player.is-open{display:flex}
  .vod-player-bar{display:flex;align-items:center;gap:12px;padding:0 0 12px}
  .vod-player-title{font-family:'Sora',sans-serif;font-weight:600}
  .vod-mount{flex:1;min-height:360px;background:#000;border-radius:12px;overflow:hidden}
  .vod-mount iframe{width:100%;height:100%;border:0;display:block}
  .vod-foot{display:flex;align-items:center;gap:8px;padding:12px 22px;border-top:1px solid rgba(255,255,255,.08);font-size:12px;color:#8A94A6}
  .vod-foot input{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#E8EDF2;
    border-radius:8px;padding:6px 10px;font-size:12px;min-width:260px;outline:none}
  .vod-note{color:#F5A524}
  `;
  const style = document.createElement('style');
  style.id = 'vod-styles';
  style.textContent = css;
  document.head.appendChild(style);
}

function build() {
  if (overlay) return;
  injectStyles();

  overlay = document.createElement('div');
  overlay.id = 'vodOverlay';
  overlay.innerHTML = `
    <div class="vod-head">
      <span class="vod-title">Movies &amp; TV <small>torrent streaming · webtor</small></span>
      <div class="vod-cats" id="vodCats">
        <button type="button" data-cat="movies" class="is-active">Movies</button>
        <button type="button" data-cat="tv">TV</button>
      </div>
      <form class="vod-search" id="vodForm">
        <input id="vodQuery" type="search" placeholder="Search title…" autocomplete="off">
        <button class="vod-btn solid" type="submit">Search</button>
      </form>
      <button class="vod-close" id="vodClose" aria-label="Close">✕</button>
    </div>
    <div class="vod-body">
      <div class="vod-status" id="vodStatus">Search public-domain films from the Internet Archive, then click to stream.</div>
      <div class="vod-grid" id="vodGrid"></div>
      <div class="vod-player" id="vodPlayer">
        <div class="vod-player-bar">
          <button class="vod-btn" id="vodBack">← Results</button>
          <span class="vod-player-title" id="vodPlayerTitle"></span>
        </div>
        <div class="vod-mount" id="vodMount"></div>
      </div>
    </div>
    <div class="vod-foot">
      <span>webtor server:</span>
      <input id="vodBase" type="text" spellcheck="false">
      <button class="vod-btn" id="vodBaseSave">Save</button>
      <span class="vod-note">Streaming needs the webtor backend running and open egress to torrent sources.</span>
    </div>`;
  document.body.appendChild(overlay);

  resultsHost = overlay.querySelector('#vodGrid');
  playerWrap = overlay.querySelector('#vodPlayer');
  mount = overlay.querySelector('#vodMount');
  searchInput = overlay.querySelector('#vodQuery');
  statusEl = overlay.querySelector('#vodStatus');
  const baseInput = overlay.querySelector<HTMLInputElement>('#vodBase')!;
  baseInput.value = getWebtorBase();

  overlay.querySelector('#vodClose')!.addEventListener('click', close);
  overlay.querySelector('#vodBack')!.addEventListener('click', showResults);
  overlay.querySelector('#vodForm')!.addEventListener('submit', (e) => {
    e.preventDefault();
    void search(searchInput!.value.trim());
  });
  overlay.querySelector('#vodBaseSave')!.addEventListener('click', () => {
    setWebtorBase(baseInput.value);
    setStatus(`webtor server set to ${getWebtorBase()}`);
  });
  overlay.querySelectorAll<HTMLButtonElement>('#vodCats button').forEach((b) => {
    b.addEventListener('click', () => {
      category = (b.dataset.cat as 'movies' | 'tv') || 'movies';
      overlay!.querySelectorAll('#vodCats button').forEach((x) => x.classList.remove('is-active'));
      b.classList.add('is-active');
      void search(searchInput!.value.trim());
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay!.classList.contains('is-open')) close();
  });
}

function setStatus(msg: string) { if (statusEl) statusEl.textContent = msg; }

function showResults() {
  playerWrap!.classList.remove('is-open');
  resultsHost!.style.display = '';
  statusEl!.style.display = '';
  if (mount) mount.innerHTML = ''; // tear down the iframe so playback stops
}

async function search(q: string) {
  showResults();
  resultsHost!.innerHTML = '';
  setStatus(q ? `Searching “${q}”…` : 'Loading featured films…');
  try {
    const url = `/api/vod/search?q=${encodeURIComponent(q)}&category=${category}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json() as { total: number; results: VodResult[] };
    const results = data.results || [];
    if (!results.length) { setStatus('No results. Try another title.'); return; }
    setStatus(`${data.total ?? results.length} result(s) — click to stream`);
    const frag = document.createDocumentFragment();
    for (const r of results) frag.appendChild(card(r));
    resultsHost!.appendChild(frag);
  } catch (e) {
    setStatus(`Search failed: ${(e as Error).message}`);
  }
}

function card(r: VodResult) {
  const el = document.createElement('div');
  el.className = 'vod-card';
  const meta: string[] = [];
  if (r.year) meta.push(`<span class="vod-chip">${r.year}</span>`);
  if (r.size) meta.push(`<span class="vod-chip">${fmtSize(r.size)}</span>`);
  if (typeof r.seeders === 'number') meta.push(`<span class="vod-chip">${r.seeders} seed</span>`);
  meta.push(`<span class="vod-chip vod-src">${escapeHtml(r.source)}</span>`);
  el.innerHTML = `<h4>${escapeHtml(r.title)}</h4><div class="vod-meta">${meta.join('')}</div>`;
  el.addEventListener('click', () => void play(r));
  return el;
}

async function play(r: VodResult) {
  resultsHost!.style.display = 'none';
  statusEl!.style.display = 'none';
  playerWrap!.classList.add('is-open');
  overlay!.querySelector('#vodPlayerTitle')!.textContent = r.title;
  mount!.innerHTML = '<div class="vod-status" style="padding:20px">Loading…</div>';

  // Split by TRANSPORT, not source. HTTP web-seeded content (Internet Archive
  // .torrent files, direct URLs) streams through SIGNAL's own byte-range
  // endpoint — same origin, no CORS, no peers — so it works even on networks
  // that block BitTorrent. Peer-only magnets go to the webtor backend, which
  // needs real peer/DHT connectivity (run it where peers are reachable).
  if (r.url.startsWith('magnet:')) await playViaWebtorrent(r);
  else await playViaDirect(r);
}

// HTTP web-seed / direct: play through SIGNAL's /api/vod/stream in a same-origin
// <video>. Resolve the torrent's files first and pick the largest browser-
// playable video so we target the right file index.
async function playViaDirect(r: VodResult) {
  let fileIdx = 0;
  try {
    const resp = await fetch(`/api/vod/resolve?magnet=${encodeURIComponent(r.url)}`);
    if (resp.ok) {
      const data = (await resp.json()) as { files?: { index: number; name: string; size: number }[] };
      const files = data.files || [];
      const playable = files
        .filter((f) => /\.(mp4|m4v|webm|mov)$/i.test(f.name))
        .sort((a, b) => b.size - a.size);
      const pick = playable[0] || files.slice().sort((a, b) => b.size - a.size)[0];
      if (pick) fileIdx = pick.index;
    }
  } catch {
    /* fall back to file 0 */
  }
  const src = `/api/vod/stream?magnet=${encodeURIComponent(r.url)}&file=${fileIdx}`;
  mount!.innerHTML =
    `<video controls autoplay playsinline style="width:100%;height:100%;background:#000" src="${src}"></video>`;
  const v = mount!.querySelector('video');
  v?.addEventListener('error', () => {
    mount!.innerHTML =
      `<div class="vod-status" style="padding:20px">Couldn't play this title directly ` +
      `(non-browser codec, or the source didn't respond). Try another release, or use the webtor path.</div>`;
  });
}

// Peer-swarm: stream the magnet client-side with WebTorrent (in-browser).
// NOTE: browser WebTorrent finds peers only over WebRTC (WSS trackers) or HTTP
// web seeds — it cannot reach plain TCP/uTP BitTorrent peers. Torrents without
// a WebRTC/web-seed source won't play here.
let wtClient: any = null;
async function playViaWebtorrent(r: VodResult) {
  try {
    await loadWebTorrent();
  } catch (e) {
    mount!.innerHTML = `<div class="vod-status" style="padding:20px">Could not load WebTorrent: ${escapeHtml((e as Error).message)}</div>`;
    return;
  }
  // One torrent at a time — tear down any previous client.
  if (wtClient) { try { wtClient.destroy(); } catch { /* ignore */ } wtClient = null; }
  wtClient = new window.WebTorrent!();
  wtClient.on('error', (err: unknown) => {
    mount!.innerHTML =
      `<div class="vod-status" style="padding:20px">WebTorrent error: ${escapeHtml(String((err as Error)?.message || err))}</div>`;
  });

  // Add WSS trackers so WebTorrent can discover WebRTC peers for this infohash.
  let magnet = r.url;
  const wss = [
    'wss://tracker.openwebtorrent.com',
    'wss://tracker.webtorrent.dev',
    'wss://tracker.files.fm:7073/announce',
  ];
  for (const t of wss) { if (magnet.indexOf(t) === -1) magnet += '&tr=' + encodeURIComponent(t); }

  mount!.innerHTML = '<div class="vod-status" style="padding:20px">Connecting to WebRTC peers…</div>';
  let started = false;
  const timer = setTimeout(() => {
    if (!started) {
      mount!.innerHTML =
        `<div class="vod-status" style="padding:20px">No WebRTC peers or web-seeds found for this torrent. ` +
        `Browser WebTorrent can't reach ordinary BitTorrent peers, so a release with no WebRTC/web-seed ` +
        `source won't stream here.</div>`;
    }
  }, 30000);

  try {
    wtClient.add(magnet, (torrent: any) => {
      started = true;
      clearTimeout(timer);
      const vids = torrent.files
        .filter((f: any) => /\.(mp4|m4v|webm|mkv|mov|avi)$/i.test(f.name))
        .sort((a: any, b: any) => b.length - a.length);
      const file = vids[0] || torrent.files[0];
      if (!file) {
        mount!.innerHTML = '<div class="vod-status" style="padding:20px">No playable file in this torrent.</div>';
        return;
      }
      mount!.innerHTML = '';
      const video = document.createElement('video');
      video.controls = true;
      video.autoplay = true;
      video.setAttribute('playsinline', '');
      video.style.cssText = 'width:100%;height:100%;background:#000';
      mount!.appendChild(video);
      if (typeof file.streamTo === 'function') file.streamTo(video);
      else if (typeof file.renderTo === 'function') file.renderTo(video);
      else { mount!.innerHTML = ''; file.appendTo(mount, { autoplay: true, controls: true }); }
    });
  } catch (e) {
    clearTimeout(timer);
    mount!.innerHTML = `<div class="vod-status" style="padding:20px">Couldn't add torrent: ${escapeHtml(String((e as Error).message))}</div>`;
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

function open() {
  build();
  overlay!.classList.add('is-open');
  searchInput!.focus();
  if (!resultsHost!.children.length) void search('');
}

function close() {
  if (!overlay) return;
  overlay.classList.remove('is-open');
  if (mount) mount.innerHTML = ''; // stop playback
}

// ── Entry point: a "Movies" button in the topbar ─────────────────────────────
function injectButton() {
  const host = document.querySelector('#topbar .topbar-right');
  const sourcesBtn = document.getElementById('sourcesBtn');
  if (!host || document.getElementById('vodOpenBtn')) return;
  const btn = document.createElement('button');
  btn.id = 'vodOpenBtn';
  btn.className = 'btn btn-outline';
  btn.textContent = 'Movies';
  btn.title = 'Stream films from torrents (webtor)';
  btn.addEventListener('click', open);
  host.insertBefore(btn, sourcesBtn);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectButton);
} else {
  injectButton();
}

export {};
