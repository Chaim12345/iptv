
/** SIGNAL — IPTV console (TypeScript + WASM) */
import init, {
  filter_channels,
  extract_groups,
  export_m3u,
} from 'iptv-wasm';
import { api, type Channel, type Programme, type PipelineStatus, type CuratedSource } from './api';
import { store } from './store';

const $ = (id: string) => document.getElementById(id)!;

// ── State ────────────────────────────────────────────────────
let allChannels: Channel[] = [];
let filtered: Channel[] = [];
let lastChannel: Channel | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let hls: any = null;
let currentKey = '';
let streamAttempt = 0;
let triedProxy = false;
let programmes: Programme[] = [];
let pipelineInterval: ReturnType<typeof setInterval> | null = null;

// ── Init WASM then boot ──────────────────────────────────────
async function boot() {
  await init();
  setupDOM();
  setShellState('idle');
  loadChannels();
  pollPipeline();
  startClock();
}

// ── DOM refs ─────────────────────────────────────────────────
function setupDOM() {
  const searchInput = $('search') as HTMLInputElement;
  const groupSelect = $('groupSelect') as HTMLSelectElement;
  const sortSelect = $('sortSelect') as HTMLSelectElement;
  const hideDeadBtn = $('hideDeadBtn') as HTMLButtonElement;
  const railToggle = $('railToggle') as HTMLButtonElement;
  const rail = $('rail') as HTMLElement;
  const viewport = $('listViewport') as HTMLElement;
  const player = $('player') as HTMLVideoElement;
  const retryBtn = $('retryBtn') as HTMLButtonElement;

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
      $('shortcutOverlay').hidden = !$('shortcutOverlay').hidden;
    }
    if (e.key === 'Escape') {
      $('shortcutOverlay').hidden = true;
      if (document.activeElement === searchInput) {
        searchInput.value = '';
        searchInput.blur();
        applyFilter();
      }
    }
    if (e.key === 'ArrowUp' && document.activeElement !== searchInput) {
      e.preventDefault();
      navigateChannel(-1);
    }
    if (e.key === 'ArrowDown' && document.activeElement !== searchInput) {
      e.preventDefault();
      navigateChannel(1);
    }
    if (e.key === 'f' && document.activeElement !== searchInput) {
      if (document.fullscreenElement) document.exitFullscreen();
      else player.requestFullscreen?.();
    }
    if (e.key === 'm' && document.activeElement !== searchInput) {
      player.muted = !player.muted;
      store.setMuted(player.muted);
    }
    if (e.key === ' ' && document.activeElement !== searchInput) {
      e.preventDefault();
      player.paused ? player.play() : player.pause();
    }
    if (e.key === 'r' && document.activeElement !== searchInput) {
      loadChannels();
    }
  });

  $('closeShortcuts').addEventListener('click', () => { $('shortcutOverlay').hidden = true; });

  // Search
  searchInput.addEventListener('input', () => applyFilter());

  // Group + sort
  groupSelect.addEventListener('change', () => applyFilter());
  sortSelect.addEventListener('change', () => applyFilter());

  // Hide dead toggle
  hideDeadBtn.addEventListener('click', () => {
    const s = store.get();
    store.setHideDead(!s.hideDead);
    hideDeadBtn.classList.toggle('is-active', !s.hideDead);
    applyFilter();
  });
  hideDeadBtn.classList.toggle('is-active', store.get().hideDead);

  // Rail toggle (mobile)
  railToggle.addEventListener('click', () => rail.classList.toggle('is-open'));

  // Virtual scroll
  viewport.addEventListener('scroll', () => renderVisibleRows());

  // Retry button
  retryBtn.addEventListener('click', () => {
    if (lastChannel) play(lastChannel);
  });

  // Library tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      document.querySelectorAll('.tab-body').forEach(b => (b as HTMLElement).hidden = true);
      const tab = (btn as HTMLElement).dataset.tab!;
      $(`tab${tab.charAt(0).toUpperCase() + tab.slice(1)}`).hidden = false;
    });
  });

  // Pipeline refresh
  $('refreshPipelineBtn').addEventListener('click', async () => {
    await api.pipelineRun();
    toast('Rebuild started…', 'info');
    pollPipeline();
  });

  // Upload buttons
  $('uploadM3u').addEventListener('click', () => uploadFile($('m3uFile') as HTMLInputElement, '/api/playlists/upload'));
  $('uploadEpg').addEventListener('click', () => uploadFile($('epgFile') as HTMLInputElement, '/api/epg/upload'));

  // Import URL
  $('importUrlBtn').addEventListener('click', async () => {
    const input = $('importUrl') as HTMLInputElement;
    const url = input.value.trim();
    if (!url) { toast('Enter a URL', 'err'); return; }
    const btn = $('importUrlBtn') as HTMLButtonElement;
    btn.disabled = true;
    btn.textContent = 'Fetching…';
    try {
      const data = await api.fetchSource(url);
      toast(`Fetched: ${(data as any).total_channels || (data as any).programs_count || '?'} items`, 'ok');
      loadChannels();
    } catch (e: any) {
      toast(`Fetch failed: ${e.message}`, 'err');
    }
    btn.disabled = false;
    btn.textContent = 'Fetch';
    input.value = '';
  });

  // Export M3U
  $('exportM3uBtn').addEventListener('click', () => {
    if (!allChannels.length) { toast('No channels to export', 'err'); return; }
    const m3u = export_m3u(allChannels as any);
    const blob = new Blob([m3u], { type: 'audio/x-mpegurl' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'signal-export.m3u';
    a.click();
    URL.revokeObjectURL(a.href);
    toast('Exported M3U', 'ok');
  });

  // Load sources
  loadSources();
}

// ── Channel loading ──────────────────────────────────────────
async function loadChannels() {
  try {
    const data = await api.channels();
    allChannels = data.channels || [];
    populateGroups();
    applyFilter();
    $('listEmpty').hidden = allChannels.length > 0;
    updateServerStatus(true);
  } catch (e: any) {
    toast(`Load failed: ${e.message}`, 'err');
    updateServerStatus(false);
  }
}

function populateGroups() {
  const groups = extract_groups(allChannels as any) as [string, number][];
  const select = $('groupSelect') as HTMLSelectElement;
  const current = select.value;
  select.innerHTML = '<option value="">All groups</option>';
  for (const [name, count] of groups) {
    if (!name) continue;
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = `${name} (${count})`;
    select.appendChild(opt);
  }
  select.value = current;
}

// ── Filtering (WASM-accelerated) ─────────────────────────────
function applyFilter() {
  const searchInput = $('search') as HTMLInputElement;
  const groupSelect = $('groupSelect') as HTMLSelectElement;
  const sortSelect = $('sortSelect') as HTMLSelectElement;
  const s = store.get();

  const opts = {
    search: searchInput.value,
    group: groupSelect.value,
    status: s.hideDead ? 'alive' : '',
    sort_by: sortSelect.value,
    sort_desc: false,
    favorites_only: false,
    favorites: [...s.favorites],
  };

  filtered = filter_channels(allChannels as any, opts as any) as Channel[];
  $('railCount').textContent = filtered.length.toLocaleString();
  renderVisibleRows(true);
}

// ── Virtual scroll rendering ─────────────────────────────────
const ROW_H = 52;

function renderVisibleRows(reset = false) {
  const viewport = $('listViewport');
  const spacer = $('listSpacer');
  const rowsHost = $('listRows');

  const totalH = filtered.length * ROW_H;
  spacer.style.height = `${totalH}px`;

  const scrollTop = reset ? 0 : viewport.scrollTop;
  if (reset) viewport.scrollTop = 0;

  const startIdx = Math.max(0, Math.floor(scrollTop / ROW_H) - 5);
  const endIdx = Math.min(filtered.length, Math.ceil((scrollTop + viewport.clientHeight) / ROW_H) + 5);

  rowsHost.style.transform = `translateY(${startIdx * ROW_H}px)`;
  rowsHost.innerHTML = '';

  for (let i = startIdx; i < endIdx; i++) {
    const ch = filtered[i];
    const row = document.createElement('div');
    row.className = 'channel-row';
    if (ch.url === currentKey) row.classList.add('is-playing');
    if (store.isFavorite(ch.url)) row.classList.add('is-fav');

    const logoHtml = ch.logo
      ? `<img class="ch-logo" src="${ch.logo}" alt="" loading="lazy" onerror="this.style.display='none'">`
      : `<span class="ch-logo-fallback">${(ch.name[0] || '?').toUpperCase()}</span>`;

    const statusDot = ch.status === 'alive' ? 'dot-ok' : ch.status === 'dead' ? 'dot-dead' : 'dot-unknown';

    row.innerHTML = `
      ${logoHtml}
      <div class="ch-info">
        <span class="ch-name">${esc(ch.name)}</span>
        <span class="ch-group">${esc(ch.group || '')}</span>
      </div>
      <span class="ch-status ${statusDot}"></span>
      <button class="ch-fav ${store.isFavorite(ch.url) ? 'is-fav' : ''}" title="Favorite">★</button>
    `;

    row.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('ch-fav')) {
        const nowFav = store.toggleFavorite(ch.url);
        (e.target as HTMLElement).classList.toggle('is-fav', nowFav);
        row.classList.toggle('is-fav', nowFav);
        toast(nowFav ? 'Added to favorites' : 'Removed from favorites', 'info', 1500);
        return;
      }
      play(ch);
    });

    rowsHost.appendChild(row);
  }
}

// ── Playback ─────────────────────────────────────────────────
function play(ch: Channel) {
  lastChannel = ch;
  currentKey = ch.url;
  streamAttempt++;
  triedProxy = false;

  setShellState('tuning');
  $('tuningName').textContent = ch.name || '';

  startStream(ch.url);
  store.addRecent(ch);
  loadGuide(ch);
  renderVisibleRows(); // highlight current
}

function startStream(url: string, viaProxy = false) {
  const attempt = streamAttempt;
  triedProxy = viaProxy;
  const player = $('player') as HTMLVideoElement;

  if (hls) { hls.destroy(); hls = null; }
  player.removeAttribute('src');

  const playUrl = viaProxy ? api.proxyUrl(url) : url;

  const fail = (msg: string) => {
    if (attempt !== streamAttempt) return;
    if (!triedProxy) {
      startStream(url, true);
    } else {
      showPlaybackError(msg);
    }
  };

  player.addEventListener('playing', onStreamPlaying, { once: true });

  const isHls = /\.m3u8($|\?)/i.test(url);
  if (isHls && (window as any).Hls && (window as any).Hls.isSupported()) {
    hls = new (window as any).Hls({ maxBufferLength: 30 });
    hls.loadSource(playUrl);
    hls.attachMedia(player);
    hls.on((window as any).Hls.Events.ERROR, (_: any, data: any) => {
      if (data.fatal) fail(data.details || 'HLS fatal error');
    });
  } else {
    player.src = playUrl;
  }
  player.play().catch(() => fail('Autoplay blocked'));
}

function onStreamPlaying() {
  setShellState('playing');
  const idx = filtered.findIndex(c => c.url === currentKey);
  $('ltNumber').textContent = idx >= 0 ? String(idx + 1).padStart(3, '0') : '···';
  $('ltName').textContent = lastChannel?.name || 'Unnamed';
  $('ltGroup').textContent = lastChannel?.group || '';
}

function showPlaybackError(msg: string) {
  setShellState('error');
  $('errorDetail').textContent = msg || 'Stream unavailable';
}

function setShellState(state: 'idle' | 'tuning' | 'playing' | 'error') {
  const shell = $('playerShell');
  shell.dataset.state = state;
  $('veilIdle').hidden = state !== 'idle';
  $('veilTuning').hidden = state !== 'tuning';
  $('veilError').hidden = state !== 'error';
  ($('player') as HTMLVideoElement).controls = state === 'playing';

  const tally = $('tally');
  const tallyState = state === 'playing' ? 'live' : state === 'tuning' ? 'tuning' : 'standby';
  tally.dataset.state = tallyState;
  $('tallyLabel').textContent = tallyState === 'live' ? 'ON AIR' : tallyState === 'tuning' ? 'CUED' : 'STANDBY';
}

function navigateChannel(dir: number) {
  if (!filtered.length) return;
  let idx = filtered.findIndex(c => c.url === currentKey);
  idx = Math.max(0, Math.min(filtered.length - 1, idx + dir));
  play(filtered[idx]);
}

// ── EPG Guide ────────────────────────────────────────────────
async function loadGuide(ch: Channel) {
  const guideList = $('guideList');
  guideList.innerHTML = '<p class="guide-empty">Loading guide…</p>';
  $('ltNow').hidden = true;
  $('ltNext').hidden = true;
  $('guideMatch').textContent = '';

  try {
    const data = await api.channelEpg(ch.tvg_id || ch.name, ch.name);
    programmes = data.programmes || [];

    if (data.matched_id) {
      $('guideMatch').textContent = `matched: ${data.matched_id}`;
    }

    if (!programmes.length) {
      guideList.innerHTML = '<p class="guide-empty">No guide data for this channel</p>';
      return;
    }

    const now = new Date();
    let nowIdx = -1;
    guideList.innerHTML = '';

    for (let i = 0; i < Math.min(programmes.length, 20); i++) {
      const p = programmes[i];
      const start = new Date(p.start);
      const stop = new Date(p.stop);
      const isNow = start <= now && now < stop;
      if (isNow) nowIdx = i;

      const row = document.createElement('div');
      row.className = `guide-row${isNow ? ' is-now' : ''}`;

      const iconHtml = p.icon ? `<img class="guide-icon" src="${p.icon}" alt="" loading="lazy" onerror="this.style.display='none'">` : '';

      row.innerHTML = `
        <span class="guide-time mono">${fmtTime(start)}–${fmtTime(stop)}</span>
        ${iconHtml}
        <div class="guide-info">
          <span class="guide-title">${esc(p.title)}</span>
          ${p.description ? `<span class="guide-desc">${esc(p.description.slice(0, 120))}</span>` : ''}
          ${p.category ? `<span class="guide-cat">${esc(p.category)}</span>` : ''}
        </div>
      `;
      guideList.appendChild(row);
    }

    // Lower-third now/next
    if (nowIdx >= 0) {
      $('ltNowTitle').textContent = programmes[nowIdx].title;
      $('ltNowTime').textContent = `${fmtTime(new Date(programmes[nowIdx].start))}–${fmtTime(new Date(programmes[nowIdx].stop))}`;
      $('ltNow').hidden = false;
    }
    if (nowIdx >= 0 && nowIdx + 1 < programmes.length) {
      $('ltNextTitle').textContent = programmes[nowIdx + 1].title;
      $('ltNextTime').textContent = `${fmtTime(new Date(programmes[nowIdx + 1].start))}`;
      $('ltNext').hidden = false;
    }
  } catch {
    guideList.innerHTML = '<p class="guide-empty">Guide unavailable</p>';
  }
}

// ── Pipeline polling ─────────────────────────────────────────
async function pollPipeline() {
  try {
    const status = await api.pipelineStatus();
    updatePipelineUI(status);
    if (status.running) {
      if (!pipelineInterval) {
        pipelineInterval = setInterval(async () => {
          const s = await api.pipelineStatus();
          updatePipelineUI(s);
          if (!s.running && pipelineInterval) {
            clearInterval(pipelineInterval);
            pipelineInterval = null;
            loadChannels();
          }
        }, 2000);
      }
    }
  } catch { /* server down */ }
}

function updatePipelineUI(s: PipelineStatus) {
  const strip = $('pipelineStrip');
  if (!s.running && !s.last_run) { strip.hidden = true; return; }
  strip.hidden = false;

  if (s.running) {
    const total = s.playlists_total + s.epg_total + s.unique_channels;
    const done = s.playlists_fetched + s.epg_fetched + s.checked;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    $('pipelineText').textContent = `${s.phase} (${s.alive}/${s.unique_channels} alive)`;
    $('pipelineBarFill').style.width = `${pct}%`;
  } else {
    $('pipelineText').textContent = `Last run: ${s.last_run ? new Date(s.last_run).toLocaleTimeString() : 'never'}`;
    $('pipelineBarFill').style.width = '100%';
  }
}

// ── Sources ──────────────────────────────────────────────────
async function loadSources() {
  try {
    const { sources } = await api.sources();
    const list = $('sourcesList');
    list.innerHTML = '';

    const grouped: Record<string, CuratedSource[]> = {};
    for (const s of sources) {
      const key = `${s.source_type.toUpperCase()} · ${s.region}`;
      (grouped[key] ||= []).push(s);
    }

    for (const [group, items] of Object.entries(grouped)) {
      const section = document.createElement('div');
      section.className = 'source-group';
      section.innerHTML = `<h4 class="source-group-title">${group}</h4>`;

      for (const src of items) {
        const row = document.createElement('div');
        row.className = 'source-row';
        const badges = [
          src.reliability !== 'high' ? `<span class="badge badge-${src.reliability}">${src.reliability}</span>` : '',
          src.auto_fetch ? '<span class="badge badge-auto">auto</span>' : '',
          src.language ? `<span class="badge badge-lang">${src.language}</span>` : '',
        ].join('');

        row.innerHTML = `
          <div class="source-info">
            <span class="source-name">${esc(src.name)}</span>
            <span class="source-desc">${esc(src.description)}</span>
            <div class="source-badges">${badges}</div>
          </div>
          <button class="btn btn-outline source-fetch-btn">Fetch</button>
        `;

        row.querySelector('.source-fetch-btn')!.addEventListener('click', async () => {
          const btn = row.querySelector('.source-fetch-btn') as HTMLButtonElement;
          btn.disabled = true;
          btn.textContent = '…';
          try {
            await api.fetchSource(src.url);
            toast(`Fetched ${src.name}`, 'ok');
            loadChannels();
          } catch (e: any) {
            toast(`Failed: ${e.message}`, 'err');
          }
          btn.disabled = false;
          btn.textContent = 'Fetch';
        });

        section.appendChild(row);
      }
      list.appendChild(section);
    }
  } catch { /* sources not critical */ }
}

// ── File upload ──────────────────────────────────────────────
async function uploadFile(input: HTMLInputElement, endpoint: string) {
  const file = input.files?.[0];
  if (!file) { toast('Select a file first', 'err'); return; }
  try {
    const data = await api.uploadFile(endpoint, file);
    toast(`Uploaded: ${(data as any).total_channels || (data as any).programs_count || 'ok'}`, 'ok');
    loadChannels();
    input.value = '';
  } catch (e: any) {
    toast(`Upload failed: ${e.message}`, 'err');
  }
}

// ── Helpers ──────────────────────────────────────────────────
function esc(s: string) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function fmtTime(d: Date) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function updateServerStatus(ok: boolean) {
  const el = $('serverStatus');
  el.dataset.ok = ok ? '1' : '0';
  el.querySelector('.server-label')!.textContent = ok ? 'ONLINE' : 'OFFLINE';
}

function toast(msg: string, type: 'ok' | 'err' | 'info' = 'info', duration = 3000) {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  $('toasts').appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, duration);
}

function startClock() {
  const tick = () => {
    $('clock').textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  tick();
  setInterval(tick, 1000);
}

// ── Connection Banner ─────────────────────────────────────────
function setupConnectionBanner() {
  const banner = document.createElement('div');
  banner.className = 'conn-banner';
  banner.textContent = 'Connection lost — reconnecting…';
  document.body.prepend(banner);

  let online = navigator.onLine;

  function updateBanner() {
    banner.classList.toggle('visible', !online);
  }

  window.addEventListener('online', () => { online = true; updateBanner(); });
  window.addEventListener('offline', () => { online = false; updateBanner(); });

  // Ping /api/health every 30s as a secondary check
  setInterval(async () => {
    try {
      const resp = await fetch('/api/health', { method: 'GET' });
      online = resp.ok;
    } catch {
      online = false;
    }
    updateBanner();
  }, 30_000);

  updateBanner();
}

// ── Go ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupConnectionBanner();
  boot();
});
