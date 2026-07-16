
/** Typed API client for iptv-rs backend */

export interface Channel {
  name: string;
  url: string;
  urls?: string[];
  logo?: string;
  group?: string;
  tvg_id?: string;
  status?: string;
  response_time_ms?: number;
}

export interface Programme {
  channel_id: string;
  start: string;
  stop: string;
  title: string;
  description?: string;
  duration_minutes?: number;
  category?: string;
  icon?: string;
  episode_num?: string;
}

export interface PipelineStatus {
  running: boolean;
  phase: string;
  playlists_total: number;
  playlists_fetched: number;
  epg_total: number;
  epg_fetched: number;
  unique_channels: number;
  checked: number;
  alive: number;
  last_run: string | null;
}

export interface CuratedSource {
  name: string;
  url: string;
  source_type: string;
  region: string;
  description: string;
  auto_fetch: boolean;
  language: string;
  category: string;
  update_frequency: string;
  reliability: string;
  channel_count: number;
  popularity: number;
  tags: string[];
  upstream_url: string;
  verified_date: string;
}

export interface Playlist {
  name: string;
  channels: Channel[];
  last_updated: string;
  total_channels: number;
}

const BASE = '';

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const resp = await fetch(`${BASE}${url}`, init);
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: resp.statusText }));
    throw new Error(err.error || resp.statusText);
  }
  return resp.json();
}

export const api = {
  health: () => fetchJson<{ status: string }>('/api/health'),

  channels: () =>
    fetchJson<{ channels: Channel[]; total: number; pipeline: PipelineStatus }>('/api/channels'),

  search: (q: string) =>
    fetchJson<{ channels: Channel[] }>(`/api/channels/search?q=${encodeURIComponent(q)}`),

  playlists: () =>
    fetchJson<{ playlists: Record<string, Playlist> }>('/api/playlists'),

  deletePlaylist: (name: string) =>
    fetchJson<{ status: string }>(`/api/playlists/${encodeURIComponent(name)}`, { method: 'DELETE' }),

  uploadFile: (endpoint: string, file: File) => {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return fetchJson<Record<string, unknown>>(endpoint, { method: 'POST', body: fd });
  },

  fetchSource: (url: string) =>
    fetchJson<Record<string, unknown>>('/api/sources/fetch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    }),

  sources: () =>
    fetchJson<{ sources: CuratedSource[] }>('/api/sources'),

  pipelineStatus: () =>
    fetchJson<PipelineStatus>('/api/pipeline/status'),

  pipelineRun: () =>
    fetchJson<Record<string, unknown>>('/api/pipeline/run', { method: 'POST' }),

  channelEpg: (id: string, name?: string) => {
    const params = name ? `?name=${encodeURIComponent(name)}` : '';
    return fetchJson<{ matched_id: string | null; programmes: Programme[] }>(
      `/api/epg/channel/${encodeURIComponent(id)}${params}`
    );
  },

  proxyUrl: (url: string) => `/api/proxy?url=${encodeURIComponent(url)}`,
};
