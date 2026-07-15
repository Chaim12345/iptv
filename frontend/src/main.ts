/* SIGNAL — IPTV console (TypeScript + Rust/WASM).
   The channel list is the server's curated working set (deduplicated and
   verified alive by the background pipeline). Grouping runs in Rust/WASM;
   all parsing + stream verification happens server-side. */

import './style.css';
import Hls from 'hls.js';
import init, { extract_groups } from 'iptv-wasm';
import { api, type Channel, type Programme, type PipelineStatus } from './api';
import './vod'; // "Movies" — torrent VOD via the self-hosted webtor embed player

await init(); // ready the WASM module before we touch the DOM

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

// ── DOM ──────────────────────────────────────────────────────────────────
const searchInput = $<HTMLInputElement>('search');
const groupSelect = $<HTMLSelectElement>('groupSelect');
const viewport = $('listViewport');
const spacer = $('listSpacer');
const rowsHost = $('listRows');
const listEmpty = $('listEmpty');
const listEmptyHint = $('listEmptyHint');
const railCount = $('railCount');
const serverStatus = $('serverStatus');
const rail = $('rail');
const railTools = $('railTools');
const filterControls = $('filterControls');
const hideDeadBtn = $('hideDeadBtn');
const pipelineStrip = $('pipelineStrip');
const pipelineText = $('pipelineText');
const pipelineBarFill = $('pipelineBarFill');
const player = $<HTMLVideoElement>('player');
const playerShell = $('playerShell');
const veilIdle = $('veilIdle');
const veilTuning = $('veilTuning');
const veilError = $('veilError');
const tuningName = $('tuningName');
const errorDetail = $('errorDetail');
const tally = $('tally');
const tallyLabel = $('tallyLabel');
const clock = $('clock');
const ltNumber = $('ltNumber');
const ltName = $('ltName');
const ltGroup = $('ltGroup');
const ltNow = $('ltNow');
const ltNext = $('ltNext');
const nowTitle = $('nowTitle');
const nowTime = $('nowTime');
const nowProgress = $('nowProgress');
const nextTitle = $('nextTitle');
const nextTime = $('nextTime');
const guideStatus = $('guideStatus');
const guideTimeline = $('guideTimeline');
const guideSplit = $('guideSplit');
const guideEmpty = $('guideEmpty');
const tlRuler = $('tlRuler');
const tlTrack = $('tlTrack');
const tlNow = $('tlNow');
const guideNow = $('guideNow');
const guideNext = $('guideNext');
const libraryTools = $('libraryTools');
const libViewport = $('libViewport');
const libSpacer = $('libSpacer');
const libRows = $('libRows');
const libEmpty = $('libEmpty');
const libEmptyHint = $('libEmptyHint');
const drawer = $('drawer');
const toasts = $('toasts');
const homeRails = $('homeRails');
const homeHero = $('homeHero');
const homeEmpty = $('homeEmpty');

// ── State ──────────────────────────────────────────────────────────────────
const ROW_H = 56;
const OVERSCAN = 6;
const CARD_W = 170, CARD_GAP = 14, CARD_H = 210, LIB_PAD = 20;

type Layout = 'home' | 'console' | 'library';
type Mode = 'all' | 'fav' | 'recent';

let channels: Channel[] = [];
let filtered: Channel[] = [];
let groups = new Map<string, number>();
let mode: Mode = 'all';
let hideDead = localStorage.getItem('signal.hideDead') === '1';
let layout: Layout = (localStorage.getItem('signal.layout') as Layout) || 'home';
let heroChannel: Channel | null = null;
let currentKey: string | null = null;
let keyedIndex = -1;
let hls: Hls | null = null;
let lastChannel: Channel | null = null;
let programmes: Programme[] = [];
let epgSeq = 0;
let renderedRange: [number, number] = [-1, -1];
let libCols = 1;
let libRenderedRange: [number, number] = [-1, -1];
let pipelineWasRunning = false;
let lastSnapshotBucket = -1;

const favs = new Set<string>(JSON.parse(localStorage.getItem('signal.favs') || '[]'));
const deadLocal = new Set<string>(JSON.parse(localStorage.getItem('signal.dead') || '[]'));
let recents: string[] = JSON.parse(localStorage.getItem('signal.recents') || '[]');
const RECENT_MAX = 20;

const chKey = (ch: Channel) => ch.tvg_id || `${ch.name}|${ch.url}`;
const favId = (ch: Channel) => ch.tvg_id || ch.name;
const isDead = (ch: Channel) => ch.status === 'dead' || deadLocal.has(chKey(ch));
const saveDead = () => localStorage.setItem('signal.dead', JSON.stringify([...deadLocal]));
const saveFavs = () => localStorage.setItem('signal.favs', JSON.stringify([...favs]));

// ── Toasts ───────────────────────────────────────────────────────────────
function toast(msg: string, kind: 'info' | 'ok' | 'err' = 'info', ms = 3200) {
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  el.textContent = msg;
  toasts.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 350); }, ms);
}

// ── Clock ────────────────────────────────────────────────────────────────
function tickClock() {
  const d = new Date();
  clock.textContent = d.toLocaleTimeString([], { hour12: false });
  clock.setAttribute('datetime', d.toISOString());
}
tickClock();
setInterval(tickClock, 1000);

// ── Channel data ─────────────────────────────────────────────────────────
async function loadChannels() {
  try {
    const data = await api.channels();
    channels = data.channels || [];
    // Grouping in Rust/WASM: returns [group, count] sorted by count desc.
    groups = new Map();
    try {
      const gs = extract_groups(channels) as [string, number][] | null;
      if (gs) for (const [g, n] of gs) groups.set(g || 'Uncategorized', n);
    } catch { /* fall back to JS below */ }
    if (groups.size === 0) {
      for (const ch of channels) {
        const g = ch.group || 'Uncategorized';
        groups.set(g, (groups.get(g) || 0) + 1);
      }
    }
    renderGroupSelect();
    applyFilters();
    if (layout === 'home') buildHome();
    serverStatus.dataset.ok = '1';
    if (data.pipeline) updatePipelineUI(data.pipeline);
  } catch {
    serverStatus.dataset.ok = '0';
    toast('Could not reach the server', 'err');
  }
}

function renderGroupSelect() {
  const selected = groupSelect.value;
  groupSelect.innerHTML = '';
  const all = document.createElement('option');
  all.value = '';
  all.textContent = `All groups (${channels.length.toLocaleString()})`;
  groupSelect.appendChild(all);
  [...groups.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([name, count]) => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = `${name} (${count})`;
      groupSelect.appendChild(opt);
    });
  if ([...groupSelect.options].some(o => o.value === selected)) groupSelect.value = selected;
}

// ── Pipeline status ────────────────────────────────────────────────────────
function updatePipelineUI(st: PipelineStatus) {
  const running = !!st.running;
  pipelineStrip.hidden = !running;

  if (running) {
    let text = st.phase || 'working…';
    let pct = 0;
    if (st.phase === 'fetching playlists' && st.playlists_total) {
      text = `Fetching playlists ${st.playlists_fetched}/${st.playlists_total}`;
      pct = (st.playlists_fetched / st.playlists_total) * 100;
    } else if (st.phase === 'checking streams' && st.unique_channels) {
      text = `Testing streams ${st.checked.toLocaleString()}/${st.unique_channels.toLocaleString()} · ${st.alive.toLocaleString()} live`;
      pct = (st.checked / st.unique_channels) * 100;
    } else if (st.phase === 'fetching EPG' && st.epg_total) {
      text = `Merging EPG ${st.epg_fetched}/${st.epg_total}`;
      pct = (st.epg_fetched / st.epg_total) * 100;
    } else if (st.phase === 'deduplicating') {
      text = 'Deduplicating channels…';
    }
    pipelineText.textContent = text;
    pipelineBarFill.style.width = `${Math.min(100, pct)}%`;

    const bucket = Math.floor((st.alive || 0) / 500);
    if (bucket !== lastSnapshotBucket) {
      lastSnapshotBucket = bucket;
      if (st.phase === 'checking streams') loadChannels();
    }
  }

  if (pipelineWasRunning && !running) {
    toast('Channel curation finished — list updated', 'ok');
    loadChannels();
    if (lastChannel) loadGuide(lastChannel);
  }
  pipelineWasRunning = running;

  const note = document.getElementById('pipelineNote');
  if (note) {
    if (running) note.textContent = `Running: ${pipelineText.textContent}`;
    else if (st.last_run) note.textContent = `Last rebuilt ${new Date(st.last_run).toLocaleString()}. Rebuild to re-test every stream.`;
  }
  const runBtn = document.getElementById('pipelineRunBtn') as HTMLButtonElement | null;
  if (runBtn) runBtn.disabled = running;
}

async function pollPipeline() {
  try {
    const st = await api.pipelineStatus();
    updatePipelineUI(st);
    serverStatus.dataset.ok = '1';
  } catch {
    serverStatus.dataset.ok = '0';
  }
}
setInterval(pollPipeline, 5000);

// ── Filtering ──────────────────────────────────────────────────────────────
function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  const group = groupSelect.value;

  let list = channels;
  if (mode === 'fav') list = list.filter(ch => favs.has(favId(ch)));
  if (mode === 'recent') {
    const order = new Map(recents.map((k, i) => [k, i]));
    list = list.filter(ch => order.has(chKey(ch))).sort((a, b) => order.get(chKey(a))! - order.get(chKey(b))!);
  }
  if (hideDead) list = list.filter(ch => !isDead(ch));
  if (group) list = list.filter(ch => (ch.group || 'Uncategorized') === group);
  if (q) {
    list = list.filter(ch =>
      (ch.name || '').toLowerCase().includes(q) ||
      (ch.tvg_id || '').toLowerCase().includes(q) ||
      (ch.group || '').toLowerCase().includes(q));
  }

  filtered = list;
  keyedIndex = -1;
  railCount.textContent = `${filtered.length.toLocaleString()} CH`;

  const empty = filtered.length === 0;
  const hint = channels.length === 0
    ? 'The server is still curating channels — give it a moment, or open Sources.'
    : 'Nothing matches this filter.';
  listEmpty.hidden = !empty;
  listEmptyHint.textContent = hint;
  libEmpty.hidden = !empty;
  libEmptyHint.textContent = hint;

  spacer.style.height = `${filtered.length * ROW_H}px`;
  renderedRange = [-1, -1];
  renderVisibleRows(true);
  if (layout === 'library') layoutLibrary();
}

// ── Virtualized rail list ────────────────────────────────────────────────
function renderVisibleRows(force = false) {
  const top = viewport.scrollTop;
  const height = viewport.clientHeight || 600;
  const start = Math.max(0, Math.floor(top / ROW_H) - OVERSCAN);
  const end = Math.min(filtered.length, Math.ceil((top + height) / ROW_H) + OVERSCAN);
  if (!force && start === renderedRange[0] && end === renderedRange[1]) return;
  renderedRange = [start, end];

  rowsHost.style.transform = `translateY(${start * ROW_H}px)`;
  rowsHost.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (let i = start; i < end; i++) frag.appendChild(buildRow(filtered[i], i));
  rowsHost.appendChild(frag);
}

function letterTile(name?: string) {
  const tile = document.createElement('span');
  tile.className = 'ch-tile';
  tile.textContent = (name || '?').trim().charAt(0).toUpperCase() || '?';
  return tile;
}

function favButton(ch: Channel, cls: string) {
  const id = favId(ch);
  const btn = document.createElement('button');
  btn.className = cls + (favs.has(id) ? ' is-fav' : '');
  btn.textContent = favs.has(id) ? '★' : '☆';
  btn.title = favs.has(id) ? 'Remove from favorites' : 'Add to favorites';
  btn.addEventListener('click', e => {
    e.stopPropagation();
    favs.has(id) ? favs.delete(id) : favs.add(id);
    saveFavs();
    mode === 'fav' ? applyFilters() : rerenderActiveView();
  });
  return btn;
}

function rerenderActiveView() {
  renderVisibleRows(true);
  if (layout === 'library') renderLibraryRows(true);
  if (layout === 'home') buildHome();
}

function buildRow(ch: Channel, index: number) {
  const key = chKey(ch);
  const row = document.createElement('div');
  row.className = 'ch-row';
  if (key === currentKey) row.classList.add('is-current');
  if (index === keyedIndex) row.classList.add('is-keyed');
  if (isDead(ch)) row.classList.add('is-dead');

  const num = document.createElement('span');
  num.className = 'ch-num';
  num.textContent = String(index + 1).padStart(3, '0');
  row.appendChild(num);

  if (ch.logo) {
    const img = document.createElement('img');
    img.className = 'ch-logo';
    img.loading = 'lazy';
    img.src = ch.logo;
    img.alt = '';
    img.onerror = () => img.replaceWith(letterTile(ch.name));
    row.appendChild(img);
  } else {
    row.appendChild(letterTile(ch.name));
  }

  const meta = document.createElement('div');
  meta.className = 'ch-meta';
  const name = document.createElement('span');
  name.className = 'ch-name';
  name.textContent = ch.name || 'Unnamed channel';
  const grp = document.createElement('span');
  grp.className = 'ch-group';
  grp.textContent = ch.group || '';
  meta.append(name, grp);
  row.appendChild(meta);

  if (isDead(ch)) {
    const dot = document.createElement('span');
    dot.className = 'ch-health dead';
    dot.title = 'Stream failed recently';
    row.appendChild(dot);
  }

  row.appendChild(favButton(ch, 'ch-fav'));
  row.addEventListener('click', () => play(ch));
  return row;
}

let railScrollScheduled = false;
viewport.addEventListener('scroll', () => {
  if (railScrollScheduled) return;
  railScrollScheduled = true;
  requestAnimationFrame(() => { railScrollScheduled = false; renderVisibleRows(); });
});

// ── Library grid (Plex/Jellyfin-style) ─────────────────────────────────────
function layoutLibrary() {
  const width = (libViewport.clientWidth || 900) - LIB_PAD * 2;
  libCols = Math.max(1, Math.floor((width + CARD_GAP) / (CARD_W + CARD_GAP)));
  const rows = Math.ceil(filtered.length / libCols);
  libSpacer.style.height = `${rows * (CARD_H + CARD_GAP) + LIB_PAD * 2}px`;
  libRenderedRange = [-1, -1];
  renderLibraryRows(true);
}

function renderLibraryRows(force = false) {
  const rowH = CARD_H + CARD_GAP;
  const top = libViewport.scrollTop;
  const height = libViewport.clientHeight || 700;
  const totalRows = Math.ceil(filtered.length / libCols);
  const r0 = Math.max(0, Math.floor((top - LIB_PAD) / rowH) - 2);
  const r1 = Math.min(totalRows, Math.ceil((top + height) / rowH) + 2);
  if (!force && r0 === libRenderedRange[0] && r1 === libRenderedRange[1]) return;
  libRenderedRange = [r0, r1];

  libRows.style.transform = `translateY(${LIB_PAD + r0 * rowH}px)`;
  libRows.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (let r = r0; r < r1; r++) {
    const rowEl = document.createElement('div');
    rowEl.className = 'lib-row';
    for (let c = 0; c < libCols; c++) {
      const i = r * libCols + c;
      if (i >= filtered.length) break;
      rowEl.appendChild(buildCard(filtered[i]));
    }
    frag.appendChild(rowEl);
  }
  libRows.appendChild(frag);
}

function buildCard(ch: Channel) {
  const key = chKey(ch);
  const card = document.createElement('div');
  card.className = 'lib-card';
  if (key === currentKey) card.classList.add('is-current');
  if (isDead(ch)) card.classList.add('is-dead');

  const poster = document.createElement('div');
  poster.className = 'lib-poster';
  if (ch.logo) {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = ch.logo;
    img.alt = '';
    img.onerror = () => img.replaceWith(letterTile(ch.name));
    poster.appendChild(img);
  } else {
    poster.appendChild(letterTile(ch.name));
  }
  card.appendChild(poster);

  const meta = document.createElement('div');
  meta.className = 'lib-meta';
  const name = document.createElement('div');
  name.className = 'lib-name';
  name.textContent = ch.name || 'Unnamed channel';
  const grp = document.createElement('span');
  grp.className = 'lib-group';
  grp.textContent = ch.group || '';
  meta.append(name, grp);
  card.appendChild(meta);

  if (key === currentKey) {
    const tag = document.createElement('span');
    tag.className = 'lib-live-tag';
    tag.textContent = 'ON AIR';
    card.appendChild(tag);
  } else if (isDead(ch)) {
    const dot = document.createElement('span');
    dot.className = 'lib-dead-dot';
    dot.title = 'Stream failed recently';
    card.appendChild(dot);
  }

  card.appendChild(favButton(ch, 'lib-fav'));
  card.addEventListener('click', () => play(ch));
  return card;
}

let libScrollScheduled = false;
libViewport.addEventListener('scroll', () => {
  if (libScrollScheduled) return;
  libScrollScheduled = true;
  requestAnimationFrame(() => { libScrollScheduled = false; renderLibraryRows(); });
});

window.addEventListener('resize', () => {
  renderVisibleRows(true);
  if (layout === 'library') layoutLibrary();
});

// ── Layout switching ───────────────────────────────────────────────────────
function setLayout(next: Layout) {
  layout = next;
  localStorage.setItem('signal.layout', next);
  document.body.dataset.layout = next;
  $('layoutHomeBtn').classList.toggle('is-active', next === 'home');
  $('layoutConsoleBtn').classList.toggle('is-active', next === 'console');
  $('layoutLibraryBtn').classList.toggle('is-active', next === 'library');
  if (next === 'library') {
    libraryTools.appendChild(filterControls);
    layoutLibrary();
  } else if (next === 'console') {
    railTools.appendChild(filterControls);
    renderVisibleRows(true);
  } else {
    buildHome();
  }
}
$('layoutHomeBtn').addEventListener('click', () => setLayout('home'));
$('layoutConsoleBtn').addEventListener('click', () => setLayout('console'));
$('layoutLibraryBtn').addEventListener('click', () => setLayout('library'));

// ── Playback ─────────────────────────────────────────────────────────────
function setShellState(state: 'idle' | 'tuning' | 'playing' | 'error') {
  playerShell.dataset.state = state;
  veilIdle.hidden = state !== 'idle';
  veilTuning.hidden = state !== 'tuning';
  veilError.hidden = state !== 'error';
  player.controls = state === 'playing';

  const tallyState = state === 'playing' ? 'live' : state === 'tuning' ? 'tuning' : 'standby';
  tally.dataset.state = tallyState;
  tallyLabel.textContent = tallyState === 'live' ? 'ON AIR' : tallyState === 'tuning' ? 'CUED' : 'STANDBY';
}

function play(ch: Channel) {
  lastChannel = ch;
  currentKey = chKey(ch);
  keyedIndex = -1;
  if (layout !== 'console') setLayout('console');
  rerenderActiveView();
  if (window.innerWidth <= 920) rail.classList.remove('is-open');

  setShellState('tuning');
  tuningName.textContent = ch.name || '';

  const idx = filtered.findIndex(c => chKey(c) === currentKey);
  ltNumber.textContent = idx >= 0 ? String(idx + 1).padStart(3, '0') : '···';
  ltName.textContent = ch.name || 'Unnamed channel';
  ltGroup.textContent = ch.group || '';
  ltNow.hidden = true;
  ltNext.hidden = true;

  startStream(ch.url);
  addRecent(ch);
  loadGuide(ch);
}

let streamAttempt = 0;

function startStream(url: string) {
  const attempt = ++streamAttempt;
  if (hls) { hls.destroy(); hls = null; }
  player.removeAttribute('src');

  // Everything plays through the server proxy: it dodges browser CORS and
  // reaches the stream from the same place the pipeline verified it.
  const playUrl = api.proxyUrl(url);
  const fail = (msg: string) => { if (attempt === streamAttempt) showPlaybackError(msg); };

  player.addEventListener('playing', onStreamPlaying, { once: true });

  const isHlsUrl = /\.m3u8($|\?)/i.test(url);
  if (isHlsUrl && Hls.isSupported()) {
    hls = new Hls({ maxBufferLength: 30, manifestLoadingTimeOut: 15000, levelLoadingTimeOut: 15000 });
    hls.loadSource(playUrl);
    hls.attachMedia(player);
    hls.on(Hls.Events.MANIFEST_PARSED, () => player.play().catch(() => {}));
    hls.on(Hls.Events.ERROR, (_e, data) => { if (data.fatal) fail(hlsErrorText(data)); });
  } else if (isHlsUrl && player.canPlayType('application/vnd.apple.mpegurl')) {
    player.src = playUrl;
    player.play().catch(() => {});
  } else {
    player.src = playUrl;
    player.play().catch(() => fail('The browser refused to start this stream.'));
  }

  player.onerror = () => {
    if (playerShell.dataset.state !== 'playing') {
      fail('The stream did not respond. It may be offline or geo-blocked.');
    }
  };
}

function onStreamPlaying() {
  setShellState('playing');
  if (currentKey && deadLocal.delete(currentKey)) {
    saveDead();
    rerenderActiveView();
  }
}

function hlsErrorText(data: { type: string }) {
  if (data.type === Hls.ErrorTypes.NETWORK_ERROR) return 'Network error — the stream may be offline or geo-blocked.';
  if (data.type === Hls.ErrorTypes.MEDIA_ERROR) return 'The stream sent media the browser could not decode.';
  return 'Playback failed.';
}

function showPlaybackError(msg: string) {
  if (hls) { hls.destroy(); hls = null; }
  errorDetail.textContent = msg;
  setShellState('error');
  if (currentKey && !deadLocal.has(currentKey)) {
    deadLocal.add(currentKey);
    saveDead();
    rerenderActiveView();
  }
}

$('retryBtn').addEventListener('click', () => { if (lastChannel) play(lastChannel); });

// ── Recents ────────────────────────────────────────────────────────────────
function addRecent(ch: Channel) {
  const key = chKey(ch);
  recents = [key, ...recents.filter(k => k !== key)].slice(0, RECENT_MAX);
  localStorage.setItem('signal.recents', JSON.stringify(recents));
  if (mode === 'recent') applyFilters();
}

// ── EPG guide ──────────────────────────────────────────────────────────────
const fmtTime = (iso: string | number) => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};

const TL_BACK = 30 * 60e3, TL_SPAN = 4.5 * 3600e3;
let guideWinStart = 0;

function showGuideState(state: 'ok' | 'loading' | 'empty') {
  guideTimeline.hidden = state !== 'ok';
  guideSplit.hidden = state !== 'ok';
  guideEmpty.hidden = state === 'ok';
}

async function loadGuide(ch: Channel) {
  const seq = ++epgSeq;
  programmes = [];
  guideStatus.textContent = `Loading schedule for ${ch.name}…`;
  showGuideState('loading');
  guideEmpty.textContent = '';
  ltNow.hidden = true;
  ltNext.hidden = true;

  const id = ch.tvg_id || ch.name;
  try {
    const data = await api.channelEpg(id, ch.name || '');
    if (seq !== epgSeq) return;
    programmes = (data.programmes || []).filter(p => !isNaN(Date.parse(p.start)) && !isNaN(Date.parse(p.stop)));
    if (!programmes.length) {
      guideStatus.textContent = ch.name;
      showGuideState('empty');
      guideEmpty.textContent = 'No programme data for this channel yet. Load a matching guide from Sources → Library.';
      return;
    }
    guideStatus.textContent = `${ch.name} — ${programmes.length} programmes`;
    showGuideState('ok');
    renderGuide();
  } catch {
    if (seq !== epgSeq) return;
    guideStatus.textContent = ch.name;
    showGuideState('empty');
    guideEmpty.textContent = 'Could not load the schedule from the server.';
  }
}

function renderGuide() {
  const now = Date.now();
  guideWinStart = now - TL_BACK;
  const winEnd = guideWinStart + TL_SPAN;
  const pct = (t: number) => ((t - guideWinStart) / TL_SPAN) * 100;

  tlRuler.innerHTML = '';
  const firstTick = Math.ceil(guideWinStart / 3600e3) * 3600e3;
  for (let t = firstTick; t <= winEnd; t += 3600e3) {
    const tick = document.createElement('span');
    tick.className = 'tl-tick';
    tick.style.left = `${pct(t)}%`;
    tick.textContent = fmtTime(t);
    tlRuler.appendChild(tick);
  }

  tlTrack.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (const p of programmes) {
    const start = Date.parse(p.start), stop = Date.parse(p.stop);
    if (stop <= guideWinStart || start >= winEnd) continue;
    const left = Math.max(0, pct(start));
    const right = Math.min(100, pct(stop));
    const width = right - left;
    if (width <= 0.4) continue;

    const block = document.createElement('div');
    block.className = 'tl-block';
    block.dataset.start = String(start);
    block.dataset.stop = String(stop);
    block.style.left = `${left}%`;
    block.style.width = `${width}%`;
    const title = document.createElement('div');
    title.className = 'b-title';
    title.textContent = p.title || 'Untitled programme';
    const time = document.createElement('div');
    time.className = 'b-time';
    time.textContent = `${fmtTime(p.start)}–${fmtTime(p.stop)}`;
    block.title = `${p.title}\n${fmtTime(p.start)}–${fmtTime(p.stop)}`;
    block.append(title, time);
    frag.appendChild(block);
  }
  tlTrack.appendChild(frag);

  renderSplit();
  positionNow();
}

function renderSplit() {
  const now = Date.now();
  const current = programmes.find(p => Date.parse(p.start) <= now && now < Date.parse(p.stop));
  const upcoming = programmes.filter(p => Date.parse(p.start) > now).slice(0, 5);

  guideNow.innerHTML = '';
  if (current) {
    const title = document.createElement('div');
    title.className = 'gc-now-title';
    title.textContent = current.title || 'Untitled programme';
    const time = document.createElement('div');
    time.className = 'gc-now-time';
    time.textContent = `${fmtTime(current.start)} – ${fmtTime(current.stop)}`;
    guideNow.append(title, time);
    if (current.description) {
      const desc = document.createElement('div');
      desc.className = 'gc-now-desc';
      desc.textContent = current.description;
      guideNow.appendChild(desc);
    }
    const prog = document.createElement('div');
    prog.className = 'gc-progress';
    const bar = document.createElement('div');
    bar.className = 'gc-progress-bar';
    bar.id = 'gcProgBar';
    prog.appendChild(bar);
    guideNow.appendChild(prog);
  } else {
    const d = document.createElement('div');
    d.className = 'gc-now-desc';
    d.textContent = 'Nothing scheduled right now.';
    guideNow.appendChild(d);
  }

  guideNext.innerHTML = '';
  if (upcoming.length) {
    const fr = document.createDocumentFragment();
    for (const p of upcoming) {
      const item = document.createElement('div');
      item.className = 'gc-next-item';
      const t = document.createElement('span');
      t.className = 'gc-next-time';
      t.textContent = fmtTime(p.start);
      const ti = document.createElement('span');
      ti.className = 'gc-next-title';
      ti.textContent = p.title || 'Untitled programme';
      item.append(t, ti);
      fr.appendChild(item);
    }
    guideNext.appendChild(fr);
  } else {
    const d = document.createElement('div');
    d.className = 'gc-now-desc';
    d.textContent = 'No upcoming programmes in the guide.';
    guideNext.appendChild(d);
  }
}

function positionNow() {
  const now = Date.now();
  if (programmes.length && !guideTimeline.hidden) {
    const left = ((now - guideWinStart) / TL_SPAN) * 100;
    tlNow.style.left = `${Math.max(0, Math.min(100, left))}%`;
    tlNow.style.display = left < 0 || left > 100 ? 'none' : 'block';
    tlTrack.querySelectorAll<HTMLElement>('.tl-block').forEach(b => {
      const s = Number(b.dataset.start), e = Number(b.dataset.stop);
      b.classList.toggle('is-live', s <= now && now < e);
      b.classList.toggle('is-past', e <= now);
    });
    const cur = programmes.find(p => Date.parse(p.start) <= now && now < Date.parse(p.stop));
    const bar = document.getElementById('gcProgBar');
    if (cur && bar) {
      const s = Date.parse(cur.start), e = Date.parse(cur.stop);
      bar.style.width = `${Math.min(100, Math.max(0, ((now - s) / (e - s)) * 100))}%`;
    }
  }
  updateNowNext();
}

function updateNowNext() {
  if (!programmes.length) { ltNow.hidden = true; ltNext.hidden = true; return; }
  const now = Date.now();
  let current: Programme | null = null, next: Programme | null = null;
  for (const p of programmes) {
    const start = Date.parse(p.start), stop = Date.parse(p.stop);
    if (start <= now && now < stop) current = p;
    else if (start > now) { next = p; break; }
  }

  if (current) {
    ltNow.hidden = false;
    nowTitle.textContent = current.title || 'Untitled programme';
    nowTime.textContent = `${fmtTime(current.start)}–${fmtTime(current.stop)}`;
    const start = Date.parse(current.start), stop = Date.parse(current.stop);
    nowProgress.style.width = `${Math.min(100, Math.max(0, ((now - start) / (stop - start)) * 100))}%`;
  } else {
    ltNow.hidden = true;
  }

  if (next) {
    ltNext.hidden = false;
    nextTitle.textContent = next.title || 'Untitled programme';
    nextTime.textContent = fmtTime(next.start);
  } else {
    ltNext.hidden = true;
  }
}
setInterval(() => { if (programmes.length && !guideTimeline.hidden) renderGuide(); else updateNowNext(); }, 60_000);

// ── Filters wiring ───────────────────────────────────────────────────────
let searchDebounce: ReturnType<typeof setTimeout> | null = null;
searchInput.addEventListener('input', () => {
  if (searchDebounce) clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    if (layout === 'home' && searchInput.value.trim()) setLayout('library');
    applyFilters();
  }, 120);
});
groupSelect.addEventListener('change', applyFilters);
document.querySelectorAll<HTMLElement>('.chip[data-mode]').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip[data-mode]').forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    mode = chip.dataset.mode as Mode;
    applyFilters();
  });
});

function syncHideDeadBtn() { hideDeadBtn.setAttribute('aria-pressed', hideDead ? 'true' : 'false'); }
hideDeadBtn.addEventListener('click', () => {
  hideDead = !hideDead;
  localStorage.setItem('signal.hideDead', hideDead ? '1' : '0');
  syncHideDeadBtn();
  applyFilters();
});
syncHideDeadBtn();

// ── Keyboard ───────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName);
  if (e.key === '/' && !typing) {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
    return;
  }
  if (e.key === 'Escape') {
    if (!drawer.hidden) closeDrawer();
    else if (e.target === searchInput) searchInput.blur();
    return;
  }
  if (typing || !drawer.hidden) return;
  if (layout === 'home') { handleHomeKey(e); return; }
  if (layout !== 'console') return;

  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    if (!filtered.length) return;
    const dir = e.key === 'ArrowDown' ? 1 : -1;
    if (keyedIndex < 0) keyedIndex = Math.max(0, filtered.findIndex(c => chKey(c) === currentKey));
    else keyedIndex = Math.min(filtered.length - 1, Math.max(0, keyedIndex + dir));
    const rowTop = keyedIndex * ROW_H;
    if (rowTop < viewport.scrollTop) viewport.scrollTop = rowTop;
    else if (rowTop + ROW_H > viewport.scrollTop + viewport.clientHeight) viewport.scrollTop = rowTop + ROW_H - viewport.clientHeight;
    renderVisibleRows(true);
  } else if (e.key === 'Enter' && keyedIndex >= 0 && filtered[keyedIndex]) {
    play(filtered[keyedIndex]);
  } else if (e.key.toLowerCase() === 'f' && keyedIndex >= 0 && filtered[keyedIndex]) {
    const ch = filtered[keyedIndex];
    const id = favId(ch);
    favs.has(id) ? favs.delete(id) : favs.add(id);
    saveFavs();
    mode === 'fav' ? applyFilters() : renderVisibleRows(true);
  }
});

$('railToggle').addEventListener('click', () => rail.classList.toggle('is-open'));

// ── Sources drawer ─────────────────────────────────────────────────────────
function openDrawer() {
  drawer.hidden = false;
  renderSourceLibrary();
  renderMyPlaylists();
  pollPipeline();
}
function closeDrawer() { drawer.hidden = true; }

$('sourcesBtn').addEventListener('click', openDrawer);
drawer.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeDrawer));

drawer.querySelectorAll<HTMLElement>('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    drawer.querySelectorAll('.tab').forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    ['library', 'playlists', 'import'].forEach(name => {
      $(`tab-${name}`).hidden = name !== tab.dataset.tab;
    });
  });
});

async function renderSourceLibrary() {
  const libM3u = $('libM3u');
  const libEpg = $('libEpg');
  try {
    const data = await api.sources();
    libM3u.innerHTML = '';
    libEpg.innerHTML = '';
    for (const src of data.sources || []) {
      const li = document.createElement('li');
      li.className = 'source-item';
      const info = document.createElement('div');
      info.className = 'source-info';
      const name = document.createElement('div');
      name.className = 'source-name';
      name.textContent = src.name;
      const desc = document.createElement('div');
      desc.className = 'source-desc';
      desc.textContent = src.description;
      info.append(name, desc);
      const region = document.createElement('span');
      region.className = 'region-chip';
      region.textContent = src.region;
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline btn-sm';
      btn.textContent = 'Load';
      btn.addEventListener('click', () => fetchSource(src.url, btn));
      li.append(info, region, btn);
      (src.source_type === 'm3u' ? libM3u : libEpg).appendChild(li);
    }
  } catch {
    libM3u.innerHTML = '<li class="source-item"><span class="source-desc">Could not load the library.</span></li>';
  }
}

async function fetchSource(url: string, btn: HTMLButtonElement) {
  btn.disabled = true;
  btn.textContent = 'Loading…';
  try {
    const data = await api.fetchSource(url);
    if (data.type === 'playlist') {
      toast(`Loaded ${String(data.name ?? 'playlist')}: ${((data.total_channels as number) || 0).toLocaleString()} channels. Rebuild the working set to include them.`, 'ok', 5000);
      renderMyPlaylists();
    } else {
      toast(`EPG loaded: ${((data.programs_count as number) || 0).toLocaleString()} programmes`, 'ok');
      if (lastChannel) loadGuide(lastChannel);
    }
    btn.textContent = 'Loaded';
  } catch (e) {
    toast(`Fetch failed: ${(e as Error).message}`, 'err', 5000);
    btn.textContent = 'Load';
    btn.disabled = false;
  }
}

async function renderMyPlaylists() {
  const host = $('myPlaylists');
  try {
    const data = await api.playlists();
    const entries = Object.values(data.playlists || {});
    host.innerHTML = '';
    if (!entries.length) {
      host.innerHTML = '<li class="source-item"><span class="source-desc">No playlists on the server yet — grab one from the Library tab.</span></li>';
      return;
    }
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const pl of entries) {
      const li = document.createElement('li');
      li.className = 'playlist-item';
      const name = document.createElement('span');
      name.className = 'playlist-name';
      name.textContent = pl.name;
      const count = document.createElement('span');
      count.className = 'playlist-count';
      count.textContent = `${(pl.total_channels || 0).toLocaleString()} CH`;
      const actions = document.createElement('div');
      actions.className = 'playlist-actions';
      const delBtn = document.createElement('button');
      delBtn.className = 'btn btn-danger btn-sm';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', async () => {
        if (delBtn.dataset.armed !== '1') {
          delBtn.dataset.armed = '1';
          delBtn.textContent = 'Confirm delete';
          setTimeout(() => { delBtn.dataset.armed = ''; delBtn.textContent = 'Delete'; }, 3000);
          return;
        }
        try {
          await api.deletePlaylist(pl.name);
          toast(`Deleted ${pl.name}`, 'ok');
          renderMyPlaylists();
        } catch (e) {
          toast(`Delete failed: ${(e as Error).message}`, 'err');
        }
      });
      actions.append(delBtn);
      li.append(name, count, actions);
      host.appendChild(li);
    }
  } catch {
    host.innerHTML = '<li class="source-item"><span class="source-desc">Could not load playlists.</span></li>';
  }
}

const pipelineRunBtn = document.getElementById('pipelineRunBtn');
if (pipelineRunBtn) pipelineRunBtn.addEventListener('click', async () => {
  try {
    await api.pipelineRun();
    toast('Rebuilding the working set — streams are being re-tested', 'info');
    pollPipeline();
  } catch (e) {
    toast(`Could not start rebuild: ${(e as Error).message}`, 'err');
  }
});

async function uploadFile(input: HTMLInputElement, endpoint: string, label: string) {
  const file = input.files?.[0];
  if (!file) { toast(`Choose a ${label} file first`, 'err'); return; }
  try {
    const data = await api.uploadFile(endpoint, file);
    if (data.type === 'playlist') {
      toast(`Uploaded ${file.name}: ${((data.total_channels as number) || 0).toLocaleString()} channels. Rebuild the working set to include them.`, 'ok', 5000);
      renderMyPlaylists();
    } else {
      toast(`EPG uploaded: ${((data.programs_count as number) || 0).toLocaleString()} programmes`, 'ok');
      if (lastChannel) loadGuide(lastChannel);
    }
    input.value = '';
  } catch (e) {
    toast(`Upload failed: ${(e as Error).message}`, 'err', 5000);
  }
}

$('uploadM3u').addEventListener('click', () => uploadFile($<HTMLInputElement>('m3uFile'), '/api/playlists/upload', 'playlist'));
$('uploadEpg').addEventListener('click', () => uploadFile($<HTMLInputElement>('epgFile'), '/api/epg/upload', 'EPG'));
$('importUrlBtn').addEventListener('click', async () => {
  const input = $<HTMLInputElement>('importUrl');
  const url = input.value.trim();
  if (!url) { toast('Enter a URL first', 'err'); return; }
  const btn = $<HTMLButtonElement>('importUrlBtn');
  await fetchSource(url, btn);
  btn.textContent = 'Fetch';
  btn.disabled = false;
  input.value = '';
});

// ── Home / Discover ────────────────────────────────────────────────────────
const HOME_CATS: { title: string; re: RegExp }[] = [
  { title: 'News', re: /\bnews\b|cnn|bbc|msnbc|al ?jazeera|sky news|euronews|fox news/i },
  { title: 'Sports', re: /sport|espn|football|soccer|\bnba\b|\bnfl\b|\bmlb\b|\bnhl\b|golf|tennis|racing|dazn/i },
  { title: 'Movies & Series', re: /movie|cinema|\bfilm|drama|series|comedy|hollywood/i },
  { title: 'Kids', re: /kids|cartoon|children|junior|nick|disney|boomerang|baby/i },
  { title: 'Music', re: /music|mtv|vevo|\bhits\b|\bradio\b|\bfm\b|vibe/i },
  { title: 'Documentary & Knowledge', re: /document|discovery|history|nat ?geo|science|animal|nature|travel/i },
  { title: 'Lifestyle', re: /lifestyle|food|cook|home|fashion|travel|health/i },
];

const channelByKey = (k: string) => channels.find(c => chKey(c) === k);

function recommend(limit: number): Channel[] {
  const weight = new Map<string, number>();
  const bump = (g: string | undefined, w: number) => { if (g) weight.set(g, (weight.get(g) || 0) + w); };
  for (const c of channels) if (favs.has(favId(c))) bump(c.group, 3);
  recents.slice(0, 10).forEach((k, i) => { const c = channelByKey(k); if (c) bump(c.group, 2 - i * 0.1); });
  if (weight.size === 0) return [];

  const seen = new Set(recents);
  const scored: [number, Channel][] = [];
  for (const c of channels) {
    if (isDead(c) || favs.has(favId(c)) || seen.has(chKey(c))) continue;
    const s = weight.get(c.group || '') || 0;
    if (s > 0) scored.push([s, c]);
  }
  scored.sort((a, b) => b[0] - a[0]);
  return scored.slice(0, limit).map(x => x[1]);
}

function railBlock(title: string, sub: string | null, list: Channel[]) {
  if (!list.length) return null;
  const block = document.createElement('div');
  block.className = 'rail-block';
  const head = document.createElement('div');
  head.className = 'rail-head';
  const h = document.createElement('span');
  h.className = 'rail-title';
  h.textContent = title;
  head.appendChild(h);
  if (sub) {
    const s = document.createElement('span');
    s.className = 'rail-sub';
    s.textContent = sub;
    head.appendChild(s);
  }
  const track = document.createElement('div');
  track.className = 'rail-track';
  const frag = document.createDocumentFragment();
  for (const ch of list) frag.appendChild(buildCard(ch));
  track.appendChild(frag);
  block.append(head, track);
  return block;
}

function setHero(alive: Channel[]) {
  const favList = alive.filter(c => favs.has(favId(c)));
  const rec = recents.map(channelByKey).filter((c): c is Channel => !!c).filter(c => !isDead(c));
  const ch = favList[0] || rec[0] || alive[0];
  if (!ch) { homeHero.hidden = true; return; }
  heroChannel = ch;
  homeHero.hidden = false;

  const logo = $<HTMLImageElement>('heroLogo');
  if (ch.logo) { logo.src = ch.logo; logo.style.display = ''; }
  else { logo.removeAttribute('src'); logo.style.display = 'none'; }
  $('heroName').textContent = ch.name || 'Featured channel';
  $('heroEyebrow').textContent = favList[0] ? 'From your favorites' : rec[0] ? 'Jump back in' : 'Featured';
  $('heroProg').textContent = ch.group || '';
  $('heroFav').textContent = favs.has(favId(ch)) ? '★ Favorited' : '☆ Favorite';

  const id = ch.tvg_id || ch.name;
  api.channelEpg(id, ch.name || '').then(d => {
    if (heroChannel !== ch) return;
    const now = Date.now();
    const cur = (d.programmes || []).find(p => Date.parse(p.start) <= now && now < Date.parse(p.stop));
    if (cur) $('heroProg').textContent = `Now: ${cur.title}`;
  }).catch(() => {});
}

function buildHome() {
  const alive = channels.filter(c => !isDead(c));
  homeEmpty.hidden = alive.length > 0;
  homeRails.innerHTML = '';
  if (!alive.length) { homeHero.hidden = true; return; }

  setHero(alive);

  const MAX = 24;
  const add = (block: HTMLElement | null) => { if (block) homeRails.appendChild(block); };

  const rec = recents.map(channelByKey).filter((c): c is Channel => !!c).filter(c => !isDead(c));
  add(railBlock('Continue watching', null, rec.slice(0, MAX)));

  const favList = alive.filter(c => favs.has(favId(c)));
  add(railBlock('Your favorites', null, favList.slice(0, MAX)));

  add(railBlock('Recommended for you', 'Based on what you watch', recommend(MAX)));

  for (const cat of HOME_CATS) {
    const list = alive.filter(c => cat.re.test(c.group || '') || cat.re.test(c.name || ''));
    if (list.length >= 4) add(railBlock(cat.title, `${list.length.toLocaleString()} channels`, list.slice(0, MAX)));
  }

  // Largest groups (from the WASM-computed group counts, already sorted desc).
  [...groups.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 14)
    .forEach(([g]) => {
      const list = alive.filter(c => (c.group || 'Uncategorized') === g);
      add(railBlock(g, `${list.length.toLocaleString()} channels`, list.slice(0, MAX)));
    });
}

let homeFocus = { r: 0, c: 0 };
function homeCardAt(r: number, c: number) {
  const railEl = homeRails.querySelectorAll('.rail-track')[r];
  if (!railEl) return null;
  return (railEl.querySelectorAll<HTMLElement>('.lib-card')[c]) || null;
}
function focusHomeCard(r: number, c: number) {
  const rails = homeRails.querySelectorAll('.rail-track');
  if (!rails.length) return;
  r = Math.max(0, Math.min(rails.length - 1, r));
  const count = rails[r].querySelectorAll('.lib-card').length;
  if (!count) return;
  c = Math.max(0, Math.min(count - 1, c));
  homeRails.querySelectorAll('.lib-card.is-focused').forEach(el => el.classList.remove('is-focused'));
  const card = homeCardAt(r, c);
  if (!card) return;
  card.classList.add('is-focused');
  homeFocus = { r, c };
  card.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
}
function handleHomeKey(e: KeyboardEvent) {
  const map: Record<string, [number, number]> = {
    ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0],
  };
  if (e.key in map) {
    e.preventDefault();
    const focused = homeRails.querySelector('.lib-card.is-focused');
    if (!focused) { focusHomeCard(0, 0); return; }
    const [dr, dc] = map[e.key];
    focusHomeCard(homeFocus.r + dr, homeFocus.c + dc);
  } else if (e.key === 'Enter') {
    const focused = homeRails.querySelector<HTMLElement>('.lib-card.is-focused');
    if (focused) { e.preventDefault(); focused.click(); }
  }
}

$('heroPlay').addEventListener('click', () => { if (heroChannel) play(heroChannel); });
$('heroFav').addEventListener('click', () => {
  if (!heroChannel) return;
  const id = favId(heroChannel);
  favs.has(id) ? favs.delete(id) : favs.add(id);
  saveFavs();
  $('heroFav').textContent = favs.has(id) ? '★ Favorited' : '☆ Favorite';
  buildHome();
});

// ── Boot ─────────────────────────────────────────────────────────────────
setShellState('idle');
if (!['home', 'console', 'library'].includes(layout)) layout = 'home';
setLayout(layout);
loadChannels();
pollPipeline();
