use std::collections::{HashMap, HashSet};
use std::sync::RwLock;

use serde::Serialize;
use tracing::{error, info};

use crate::config::AppConfig;
use crate::models::{EpgData, Playlist, Programme};

/// Progress of the background curation pipeline (fetch → dedupe → probe → EPG).
#[derive(Debug, Clone, Default, Serialize)]
pub struct PipelineStatus {
    pub running: bool,
    pub phase: String,
    pub playlists_total: usize,
    pub playlists_fetched: usize,
    pub epg_total: usize,
    pub epg_fetched: usize,
    pub unique_channels: usize,
    pub checked: usize,
    pub alive: usize,
    pub last_run: Option<String>,
}

/// Strip a trailing country/provider suffix from an EPG/tvg id:
/// "channel4.uk" → "channel4". Input is expected to be lowercase already.
fn strip_id_suffix(id: &str) -> &str {
    match id.rsplit_once('.') {
        Some((base, _)) if !base.is_empty() => base,
        _ => id,
    }
}

/// Normalize a channel display name for fuzzy comparison: lowercase,
/// alphanumerics only, common quality suffixes (HD/FHD/UHD/SD/4K) dropped.
pub fn normalize_channel_name(name: &str) -> String {
    let mut n: String = name
        .to_lowercase()
        .chars()
        .filter(|c| c.is_alphanumeric())
        .collect();
    for suffix in ["fhd", "uhd", "4k", "hd", "sd"] {
        if n.len() > suffix.len() + 2 && n.ends_with(suffix) {
            n.truncate(n.len() - suffix.len());
            break;
        }
    }
    n
}

/// Sanitize a playlist name into a safe filename. Characters like `:` are
/// invalid on Windows (a bare `:` even silently creates an NTFS alternate
/// data stream), so anything outside a conservative allowlist becomes `_`.
fn safe_filename(name: &str) -> String {
    name.chars()
        .map(|c| {
            if c.is_alphanumeric() || matches!(c, ' ' | '-' | '_' | '.' | '(' | ')') {
                c
            } else {
                '_'
            }
        })
        .collect()
}

/// The EPG guide plus an index from channel_id → programme positions, so
/// per-channel lookups are O(matching programmes) instead of a full scan of
/// every programme in the merged guide.
struct EpgState {
    data: EpgData,
    by_channel: HashMap<String, Vec<u32>>,
}

impl EpgState {
    fn build(data: EpgData) -> Self {
        let mut state = Self {
            data,
            by_channel: HashMap::new(),
        };
        state.reindex();
        state
    }

    fn reindex(&mut self) {
        let mut idx: HashMap<String, Vec<u32>> = HashMap::new();
        for (i, p) in self.data.programmes.iter().enumerate() {
            idx.entry(p.channel_id.clone()).or_default().push(i as u32);
        }
        self.by_channel = idx;
    }

    /// Merge another guide in place: channels deduped by id, programmes deduped
    /// by (channel_id, start). The index is updated incrementally.
    fn merge(&mut self, new: EpgData) {
        // Channels: append only ids we don't already have.
        let known: HashSet<&str> = self.data.channels.iter().map(|c| c.id.as_str()).collect();
        let add_channels: Vec<_> = new
            .channels
            .into_iter()
            .filter(|c| !known.contains(c.id.as_str()))
            .collect();
        drop(known);
        self.data.channels.extend(add_channels);

        // Programmes: dedupe against everything already present.
        let mut seen: HashSet<(String, String)> = self
            .data
            .programmes
            .iter()
            .map(|p| (p.channel_id.clone(), p.start.clone()))
            .collect();
        for p in new.programmes {
            if seen.insert((p.channel_id.clone(), p.start.clone())) {
                let i = self.data.programmes.len() as u32;
                self.by_channel
                    .entry(p.channel_id.clone())
                    .or_default()
                    .push(i);
                self.data.programmes.push(p);
            }
        }

        self.data.total_programmes = self.data.programmes.len();
        self.data.last_updated = chrono::Utc::now().to_rfc3339();
    }
}

/// Thread-safe in-memory store backed by JSON files on disk.
pub struct AppStore {
    config: AppConfig,
    /// playlist_name → Playlist
    playlists: RwLock<HashMap<String, Playlist>>,
    /// The currently loaded EPG guide + lookup index.
    epg: RwLock<Option<EpgState>>,
    /// The curated, deduplicated, verified-alive channel set.
    working: RwLock<Option<Playlist>>,
    /// Curation pipeline progress, exposed at /api/pipeline/status.
    pipeline: RwLock<PipelineStatus>,
}

impl AppStore {
    pub fn new(config: AppConfig) -> Self {
        Self {
            config,
            playlists: RwLock::new(HashMap::new()),
            epg: RwLock::new(None),
            working: RwLock::new(None),
            pipeline: RwLock::new(PipelineStatus::default()),
        }
    }

    pub fn config(&self) -> &AppConfig {
        &self.config
    }

    fn epg_file(&self) -> std::path::PathBuf {
        self.config.epg_folder.join("epg_data.json")
    }

    /// Load all playlists and EPG data from disk on startup.
    pub async fn load_all(&self) -> anyhow::Result<()> {
        // Load playlists from upload folder
        if let Ok(mut dir) = tokio::fs::read_dir(&self.config.upload_folder).await {
            while let Ok(Some(entry)) = dir.next_entry().await {
                let path = entry.path();
                if path.extension().map_or(false, |e| e == "json") {
                    if let Ok(content) = tokio::fs::read_to_string(&path).await {
                        match serde_json::from_str::<Playlist>(&content) {
                            Ok(playlist) => {
                                let name = playlist.name.clone();
                                info!("Loaded playlist '{}': {} channels", name, playlist.total_channels);
                                self.playlists.write().unwrap().insert(name, playlist);
                            }
                            Err(e) => {
                                error!("Failed to parse playlist {:?}: {}", path, e);
                                // Try loading from backup
                                let bak_path = path.with_extension("json.bak");
                                if bak_path.exists() {
                                    if let Ok(bak_content) = tokio::fs::read_to_string(&bak_path).await {
                                        if let Ok(playlist) = serde_json::from_str::<Playlist>(&bak_content) {
                                            let name = playlist.name.clone();
                                            info!("Loaded playlist '{}' from backup: {} channels", name, playlist.total_channels);
                                            self.playlists.write().unwrap().insert(name, playlist);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // Load the verified working set
        if self.config.working_file.exists() {
            if let Ok(content) = tokio::fs::read_to_string(&self.config.working_file).await {
                match serde_json::from_str::<Playlist>(&content) {
                    Ok(w) => {
                        info!("Loaded working set: {} verified channels", w.total_channels);
                        *self.working.write().unwrap() = Some(w);
                    }
                    Err(e) => {
                        error!("Failed to parse working set: {}", e);
                        // Try loading from backup
                        let bak_path = self.config.working_file.with_extension("bak");
                        if bak_path.exists() {
                            if let Ok(bak_content) = tokio::fs::read_to_string(&bak_path).await {
                                if let Ok(w) = serde_json::from_str::<Playlist>(&bak_content) {
                                    info!("Loaded working set from backup: {} verified channels", w.total_channels);
                                    *self.working.write().unwrap() = Some(w);
                                }
                            }
                        }
                    }
                }
            }
        }

        // Load EPG data from epg folder
        let epg_json = self.epg_file();
        if epg_json.exists() {
            if let Ok(content) = tokio::fs::read_to_string(&epg_json).await {
                match serde_json::from_str::<EpgData>(&content) {
                    Ok(epg) => {
                        info!("Loaded EPG data: {} programmes", epg.total_programmes);
                        *self.epg.write().unwrap() = Some(EpgState::build(epg));
                    }
                    Err(e) => {
                        error!("Failed to parse EPG data: {}", e);
                        // Try loading from backup
                        let bak_path = epg_json.with_extension("bak");
                        if bak_path.exists() {
                            if let Ok(bak_content) = tokio::fs::read_to_string(&bak_path).await {
                                if let Ok(epg) = serde_json::from_str::<EpgData>(&bak_content) {
                                    info!("Loaded EPG data from backup: {} programmes", epg.total_programmes);
                                    *self.epg.write().unwrap() = Some(EpgState::build(epg));
                                }
                            }
                        }
                    }
                }
            }
        }

        Ok(())
    }

    // ── Playlist operations ──

    pub fn get_playlists(&self) -> HashMap<String, Playlist> {
        self.playlists.read().unwrap().clone()
    }

    pub fn get_playlist(&self, name: &str) -> Option<Playlist> {
        self.playlists.read().unwrap().get(name).cloned()
    }

    fn playlist_path(&self, name: &str) -> std::path::PathBuf {
        self.config
            .upload_folder
            .join(format!("{}.json", safe_filename(name)))
    }

    pub fn save_playlist(&self, playlist: Playlist) -> anyhow::Result<()> {
        let json_path = self.playlist_path(&playlist.name);
        let json_str = serde_json::to_string_pretty(&playlist)?;
        
        // Backup existing file before writing
        if json_path.exists() {
            let bak_path = json_path.with_extension("json.bak");
            std::fs::rename(&json_path, &bak_path)?;
        }
        
        std::fs::write(&json_path, json_str)?;

        let name = playlist.name.clone();
        self.playlists.write().unwrap().insert(name, playlist);
        Ok(())
    }

    pub fn delete_playlist(&self, name: &str) -> anyhow::Result<bool> {
        let removed = self.playlists.write().unwrap().remove(name).is_some();
        if removed {
            let json_path = self.playlist_path(name);
            if json_path.exists() {
                std::fs::remove_file(&json_path)?;
            }
            info!("Deleted playlist '{}'", name);
        }
        Ok(removed)
    }

    // ── EPG operations ──

    /// (channel_count, programme_count) without cloning the guide.
    pub fn epg_stats(&self) -> Option<(usize, usize)> {
        self.epg
            .read()
            .unwrap()
            .as_ref()
            .map(|s| (s.data.channels.len(), s.data.total_programmes))
    }

    /// Look up programmes for one channel. Playlist tvg-ids rarely match EPG
    /// ids exactly, so matching is fuzzy: exact id → case-insensitive id → id
    /// without country suffix ("Channel4.uk" ≈ "channel4.fr") → normalized
    /// display name. The channel_id → programme index makes the second step
    /// O(matching programmes) rather than a scan of the whole guide.
    /// Returns (matched_channel_id, programmes sorted by start, capped at 250).
    pub fn get_channel_programmes(
        &self,
        id: &str,
        name: Option<&str>,
    ) -> Option<(Option<String>, Vec<Programme>)> {
        let guard = self.epg.read().unwrap();
        let state = guard.as_ref()?;
        let epg = &state.data;

        let id_lower = id.to_lowercase();
        let id_base = strip_id_suffix(&id_lower);
        let wanted_name = normalize_channel_name(name.unwrap_or(id));

        let mut resolved: Option<String> = None;
        // Single pass over channels (thousands), keeping the best match tier.
        let mut best_tier = u8::MAX;
        for c in &epg.channels {
            let cid_lower = c.id.to_lowercase();
            let tier = if c.id == id {
                0
            } else if cid_lower == id_lower {
                1
            } else if !id_base.is_empty() && strip_id_suffix(&cid_lower) == id_base {
                2
            } else if !wanted_name.is_empty() && normalize_channel_name(&c.name) == wanted_name {
                3
            } else {
                continue;
            };
            if tier < best_tier {
                best_tier = tier;
                resolved = Some(c.id.clone());
                if tier == 0 {
                    break;
                }
            }
        }

        let target = resolved.unwrap_or_else(|| id.to_string());

        let mut programmes: Vec<Programme> = match state.by_channel.get(&target) {
            Some(indices) => indices
                .iter()
                .filter_map(|&i| epg.programmes.get(i as usize))
                .cloned()
                .collect(),
            None => Vec::new(),
        };

        if programmes.is_empty() {
            return Some((None, programmes));
        }

        // start/stop are RFC 3339 UTC strings, so lexical order == chronological
        programmes.sort_by(|a, b| a.start.cmp(&b.start));
        programmes.truncate(250);

        Some((Some(target), programmes))
    }

    /// Replace the EPG guide entirely (used by single-file upload / fetch),
    /// then persist to disk.
    pub fn save_epg(&self, epg: EpgData) -> anyhow::Result<()> {
        *self.epg.write().unwrap() = Some(EpgState::build(epg));
        self.persist_epg()
    }

    /// Merge a guide into the current EPG in memory only, atomically under the
    /// write lock (concurrent mergers can't lose each other's data). Call
    /// [`persist_epg`] once afterwards to write the result to disk.
    pub fn merge_epg(&self, new: EpgData) {
        let mut guard = self.epg.write().unwrap();
        match guard.as_mut() {
            Some(state) => state.merge(new),
            None => *guard = Some(EpgState::build(new)),
        }
    }

    /// Serialize the current EPG guide and write it to disk. Heavy for large
    /// merged guides — call from `spawn_blocking`, not directly on an async
    /// worker.
    pub fn persist_epg(&self) -> anyhow::Result<()> {
        let json_str = {
            let guard = self.epg.read().unwrap();
            match guard.as_ref() {
                Some(state) => serde_json::to_string(&state.data)?,
                None => return Ok(()),
            }
        };
        std::fs::write(self.epg_file(), json_str)?;
        Ok(())
    }

    // ── Working set (deduplicated, verified-alive channels) ──

    pub fn get_working(&self) -> Option<Playlist> {
        self.working.read().unwrap().clone()
    }

    /// Replace the in-memory working set (no disk write).
    pub fn set_working(&self, playlist: Playlist) {
        *self.working.write().unwrap() = Some(playlist);
    }

    /// Write the current working set to disk (small — a few MB).
    pub fn persist_working(&self) -> anyhow::Result<()> {
        let json_str = {
            let guard = self.working.read().unwrap();
            match guard.as_ref() {
                Some(w) => serde_json::to_string(w)?,
                None => return Ok(()),
            }
        };
        
        // Backup existing file before writing
        if self.config.working_file.exists() {
            let bak_path = self.config.working_file.with_extension("bak");
            std::fs::rename(&self.config.working_file, &bak_path)?;
        }
        
        std::fs::write(&self.config.working_file, json_str)?;
        Ok(())
    }

    // ── Pipeline status ──

    pub fn get_pipeline(&self) -> PipelineStatus {
        self.pipeline.read().unwrap().clone()
    }

    pub fn update_pipeline(&self, f: impl FnOnce(&mut PipelineStatus)) {
        f(&mut self.pipeline.write().unwrap());
    }

    /// Atomically flip the pipeline to running. Returns false if already running.
    pub fn try_begin_pipeline(&self) -> bool {
        let mut p = self.pipeline.write().unwrap();
        if p.running {
            return false;
        }
        *p = PipelineStatus {
            running: true,
            phase: "starting".into(),
            last_run: p.last_run.clone(),
            ..Default::default()
        };
        true
    }
}
