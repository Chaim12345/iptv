use std::path::PathBuf;

/// Application configuration, read from environment variables with sensible defaults.
#[derive(Clone, Debug)]
pub struct AppConfig {
    pub upload_folder: PathBuf,
    pub epg_folder: PathBuf,
    pub working_file: PathBuf,
    pub indexers_file: PathBuf,
    pub torrent_cache: PathBuf,
    /// STRM library root Jellyfin scans, and the collections config file.
    pub library_dir: PathBuf,
    pub library_file: PathBuf,
    /// Public base URL SIGNAL is reachable at (used inside STRM files so
    /// Jellyfin can reach /api/vod/stream). In docker set to http://iptv:5000.
    pub public_url: String,
    pub max_upload_bytes: usize,
    pub port: u16,
    /// Concurrent stream probes during the curation pipeline.
    pub check_concurrency: usize,
    /// Only keep EPG programmes within [now - 6h, now + this many hours].
    pub epg_window_hours: i64,
    /// Skip the startup pipeline when the working set is younger than this.
    pub refresh_hours: i64,
}

impl AppConfig {
    pub fn from_env() -> Self {
        let data_dir = std::env::var("IPTV_DATA_DIR")
            .map(PathBuf::from)
            .unwrap_or_else(|_| PathBuf::from("data"));

        Self {
            upload_folder: data_dir.join("uploads"),
            epg_folder: data_dir.join("epg"),
            working_file: data_dir.join("working_channels.json"),
            indexers_file: data_dir.join("indexers.json"),
            torrent_cache: data_dir.join("torrent-cache"),
            library_dir: data_dir.join("library"),
            library_file: data_dir.join("library.json"),
            public_url: std::env::var("IPTV_PUBLIC_URL")
                .unwrap_or_else(|_| "http://localhost:5000".to_string()),
            check_concurrency: std::env::var("IPTV_CHECK_CONCURRENCY")
                .ok()
                .and_then(|v| v.parse().ok())
                .unwrap_or(64),
            epg_window_hours: std::env::var("IPTV_EPG_WINDOW_HOURS")
                .ok()
                .and_then(|v| v.parse().ok())
                .unwrap_or(48),
            refresh_hours: std::env::var("IPTV_REFRESH_HOURS")
                .ok()
                .and_then(|v| v.parse().ok())
                .unwrap_or(6),
            max_upload_bytes: std::env::var("IPTV_MAX_UPLOAD_BYTES")
                .ok()
                .and_then(|v| v.parse().ok())
                .unwrap_or(100 * 1024 * 1024), // 100 MB
            port: std::env::var("IPTV_PORT")
                .ok()
                .and_then(|v| v.parse().ok())
                .unwrap_or(5000),
        }
    }

    pub fn ensure_dirs(&self) -> std::io::Result<()> {
        std::fs::create_dir_all(&self.upload_folder)?;
        std::fs::create_dir_all(&self.epg_folder)?;
        std::fs::create_dir_all(&self.library_dir)?;
        Ok(())
    }

}