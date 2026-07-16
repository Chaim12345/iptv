
import type { Channel } from './api';

/** Persistent client-side state */
export interface Store {
  favorites: Set<string>;       // URL → starred
  recent: Channel[];            // Last N watched
  hideDead: boolean;
  layout: 'console' | 'library';
  volume: number;
  muted: boolean;
}

const KEY = 'signal.store';
const MAX_RECENT = 20;

function load(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const obj = JSON.parse(raw);
      return {
        favorites: new Set(obj.favorites || []),
        recent: obj.recent || [],
        hideDead: obj.hideDead ?? false,
        layout: obj.layout ?? 'console',
        volume: obj.volume ?? 1,
        muted: obj.muted ?? false,
      };
    }
  } catch { /* ignore */ }
  return {
    favorites: new Set(),
    recent: [],
    hideDead: false,
    layout: 'console',
    volume: 1,
    muted: false,
  };
}

function save(s: Store): void {
  localStorage.setItem(KEY, JSON.stringify({
    favorites: [...s.favorites],
    recent: s.recent,
    hideDead: s.hideDead,
    layout: s.layout,
    volume: s.volume,
    muted: s.muted,
  }));
}

const state = load();

export const store = {
  get: () => state,

  toggleFavorite(url: string): boolean {
    const wasFav = state.favorites.has(url);
    if (wasFav) state.favorites.delete(url);
    else state.favorites.add(url);
    save(state);
    return !wasFav;
  },

  addRecent(ch: Channel): void {
    state.recent = state.recent.filter(c => c.url !== ch.url);
    state.recent.unshift({ ...ch });
    if (state.recent.length > MAX_RECENT) state.recent.length = MAX_RECENT;
    save(state);
  },

  setHideDead(v: boolean): void {
    state.hideDead = v;
    save(state);
  },

  setLayout(v: 'console' | 'library'): void {
    state.layout = v;
    save(state);
  },

  setVolume(v: number): void {
    state.volume = v;
    save(state);
  },

  setMuted(v: boolean): void {
    state.muted = v;
    save(state);
  },

  isFavorite(url: string): boolean {
    return state.favorites.has(url);
  },
};
