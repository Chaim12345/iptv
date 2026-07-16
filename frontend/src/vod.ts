/* SIGNAL — VOD (torrent streaming) for the Movies & TV overlay.
   Self-contained: injects its own "Movies" entry, overlay, and styles.
   Search hits SIGNAL's /api/vod/search (Internet Archive + configured indexers).
   Playback splits by TRANSPORT:
     • HTTP web-seed / .torrent sources (Internet Archive) → SIGNAL's own
       /api/vod/stream byte-range endpoint, in a same-origin <video> (no CORS,
       no peers — works on locked-down networks).
     • Magnets (indexarr etc.) → a TorrServer instance that connects to real
       BitTorrent peers server-side and streams the file over HTTP byte-range
       straight into <video>. Reliable (no WebRTC), arm64-native, no transcode. */

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

// TorrServer backend for magnet playback. Defaults to the OCI server (open
// egress → real BitTorrent peers); override per-browser via the footer field.
const TORR_BASE_KEY = 'signal.torrserver';
const DEFAULT_TORR_BASE = 'http://137.131.63.155:8090';
const getTorrBase = () =>
  (localStorage.getItem(TORR_BASE_KEY) || DEFAULT_TORR_BASE).replace(/\/+$/, '');
const setTorrBase = (v: string) => localStorage.setItem(TORR_BASE_KEY, v.trim());

const fmtSize = (n?: number) =>
  !n ? '' : n > 1e9 ? `${(n / 1e9).toFixed(1)} GB` : `${Math.max(1, Math.round(n / 1e6))} MB`;

const VIDEO_RE = /\.(mkv|mp4|m4v|webm|mov|avi|ts)$/i;

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
  .vod-mount{flex:1;min-height:360px;background:#000;border-radius:12px;overflow:hidden;display:flex}
  .vod-mount video{width:100%;height:100%;background:#000}
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
      <span class="vod-title">Movies &amp; TV <small>torrent streaming</small></span>
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
      <div class="vod-status" id="vodStatus">Search movies &amp; TV, then click a title to stream.</div>
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
      <span>torrent server:</span>
      <input id="vodBase" type="text" spellcheck="false">
      <button class="vod-btn" id="vodBaseSave">Save</button>
      <span class="vod-note">Magnets stream via TorrServer (real BitTorrent peers). Browser plays H.264/AAC natively.</span>
    </div>`;
  document.body.appendChild(overlay);

  resultsHost = overlay.querySelector('#vodGrid');
  playerWrap = overlay.querySelector('#vodPlayer');
  mount = overlay.querySelector('#vodMount');
  searchInput = overlay.querySelector('#vodQuery');
  statusEl = overlay.querySelector('#vodStatus');
  const baseInput = overlay.querySelector<HTMLInputElement>('#vodBase')!;
  baseInput.value = getTorrBase();

  overlay.querySelector('#vodClose')!.addEventListener('click', close);
  overlay.querySelector('#vodBack')!.addEventListener('click', showResults);
  overlay.querySelector('#vodForm')!.addEventListener('submit', (e) => {
    e.preventDefault();
    void search(searchInput!.value.trim());
  });
  overlay.querySelector('#vodBaseSave')!.addEventListener('click', () => {
    setTorrBase(baseInput.value);
    setStatus(`torrent server set to ${getTorrBase()}`);
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
  if (mount) mount.innerHTML = ''; // tear down the player so playback stops
}

async function search(q: string) {
  showResults();
  resultsHost!.innerHTML = '';
  setStatus(q ? `Searching “${q}”…` : 'Loading featured titles…');
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

  // Transport split: magnets go to TorrServer (real peers), HTTP web-seed /
  // .torrent sources stream through SIGNAL's own byte-range endpoint.
  if (r.url.startsWith('magnet:')) await playViaTorrServer(r);
  else await playViaDirect(r);
}

function mountVideo(src: string) {
  mount!.innerHTML = '';
  const video = document.createElement('video');
  video.controls = true;
  video.autoplay = true;
  video.setAttribute('playsinline', '');
  video.src = src;
  mount!.appendChild(video);
  video.addEventListener('error', () => {
    mount!.innerHTML =
      `<div class="vod-status" style="padding:20px">Playback error — the file's codec may not be ` +
      `browser-native (e.g. HEVC video or AC3/DDP audio). The stream is fine; it's a browser codec ` +
      `limit. Point a native player (or Jellyfin, which transcodes) at the same URL, or try another release.</div>`;
  });
}

// HTTP web-seed / direct (Internet Archive): resolve the file list, pick the
// largest browser-playable video, and stream it via SIGNAL's byte-range API.
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
  mountVideo(`/api/vod/stream?magnet=${encodeURIComponent(r.url)}&file=${fileIdx}`);
}

// Magnet: add to TorrServer, wait for metadata from peers, then stream the
// largest video file over HTTP byte-range into <video>.
async function playViaTorrServer(r: VodResult) {
  const base = getTorrBase();
  const post = (body: unknown) =>
    fetch(`${base}/torrents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

  mount!.innerHTML = '<div class="vod-status" style="padding:20px">Adding torrent…</div>';
  let hash = '';
  try {
    const addResp = await post({ action: 'add', link: r.url, title: r.title, save_to_db: false });
    if (!addResp.ok) throw new Error(`HTTP ${addResp.status}`);
    hash = (await addResp.json()).hash;
    if (!hash) throw new Error('no hash returned');
  } catch (e) {
    mount!.innerHTML =
      `<div class="vod-status" style="padding:20px">Couldn't reach the torrent server ` +
      `(<code>${escapeHtml(base)}</code>): ${escapeHtml((e as Error).message)}. ` +
      `Set the correct address in the field below.</div>`;
    return;
  }

  mount!.innerHTML = '<div class="vod-status" style="padding:20px">Connecting to peers &amp; fetching metadata…</div>';
  type TorrFile = { id: number; path: string; length: number };
  let file: TorrFile | null = null;
  const deadline = Date.now() + 45000;
  while (Date.now() < deadline) {
    try {
      const g = await post({ action: 'get', hash });
      const data = (await g.json()) as { file_stats?: TorrFile[] };
      const fs = data.file_stats || [];
      if (fs.length) {
        const vids = fs.filter((f) => VIDEO_RE.test(f.path)).sort((a, b) => b.length - a.length);
        file = vids[0] || fs.slice().sort((a, b) => b.length - a.length)[0];
        break;
      }
    } catch {
      /* keep polling */
    }
    await new Promise((res) => setTimeout(res, 2000));
  }

  if (!file) {
    mount!.innerHTML =
      `<div class="vod-status" style="padding:20px">No peers responded for this release (no metadata after 45s). ` +
      `It may be dead/low-seeded — try another result.</div>`;
    return;
  }

  const name = file.path.split('/').pop() || 'video';
  // TorrServer stream: /stream/<name>?link=<hash>&index=<1-based id>&play
  mountVideo(`${base}/stream/${encodeURIComponent(name)}?link=${encodeURIComponent(hash)}&index=${file.id}&play`);
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
  btn.title = 'Stream movies & TV from torrents';
  btn.addEventListener('click', open);
  host.insertBefore(btn, sourcesBtn);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectButton);
} else {
  injectButton();
}

export {};
