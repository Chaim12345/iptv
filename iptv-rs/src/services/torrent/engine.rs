//! Server-side live-torrent streaming via librqbit. Resolves metadata without
//! a full download, probes streamability, and serves a file over byte-range.
//! Direction B: this feeds Jellyfin (Phase 4) — there is no in-browser player.

use std::path::PathBuf;
use std::sync::Arc;

use librqbit::{AddTorrent, AddTorrentOptions, AddTorrentResponse, Session};
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct FileEntry {
    pub index: usize,
    pub name: String,
    pub size: u64,
}

#[derive(Debug, Clone, Serialize)]
pub struct ResolvedTorrent {
    pub infohash: String,
    pub name: String,
    pub files: Vec<FileEntry>,
}

/// Wraps a single librqbit session in a scratch dir. Cheap to clone (Arc).
#[derive(Clone)]
pub struct TorrentEngine {
    session: Arc<Session>,
}

impl TorrentEngine {
    pub async fn new(cache_dir: PathBuf) -> anyhow::Result<Self> {
        std::fs::create_dir_all(&cache_dir).ok();
        let session = Session::new(cache_dir).await?;
        Ok(Self { session })
    }

    /// List a torrent's files from a magnet/URL without downloading it.
    pub async fn resolve(&self, magnet: &str) -> anyhow::Result<ResolvedTorrent> {
        let resp = self
            .session
            .add_torrent(
                AddTorrent::from_url(magnet),
                Some(AddTorrentOptions {
                    list_only: true,
                    ..Default::default()
                }),
            )
            .await?;

        match resp {
            AddTorrentResponse::ListOnly(l) => {
                let files = l
                    .info
                    .iter_file_details()?
                    .enumerate()
                    .map(|(index, fd)| FileEntry {
                        index,
                        name: fd
                            .filename
                            .to_vec()
                            .ok()
                            .map(|v| v.join("/"))
                            .unwrap_or_default(),
                        size: fd.len,
                    })
                    .collect();
                Ok(ResolvedTorrent {
                    infohash: l.info_hash.as_string(),
                    name: l.info.name.as_ref().map(|n| n.to_string()).unwrap_or_default(),
                    files,
                })
            }
            // With list_only=true the response is always ListOnly; anything
            // else means metadata couldn't be listed.
            _ => anyhow::bail!("torrent metadata could not be listed"),
        }
    }

    /// Best-effort streamability: metadata resolves and has at least one file.
    /// (Seeder/web-seed depth is a follow-up; probe currently gates on
    /// resolvable metadata + non-empty file list.)
    pub async fn probe(&self, magnet: &str) -> Probe {
        match self.resolve(magnet).await {
            Ok(r) if !r.files.is_empty() => Probe {
                streamable: true,
                files: r.files.len(),
                reason: "resolved".into(),
            },
            Ok(_) => Probe {
                streamable: false,
                files: 0,
                reason: "no files in torrent".into(),
            },
            Err(e) => Probe {
                streamable: false,
                files: 0,
                reason: format!("resolve failed: {}", e),
            },
        }
    }

    /// Add the torrent for streaming and return a seekable reader over one file.
    /// Sequential piece priority is librqbit's default for streamed reads.
    pub async fn open(
        &self,
        magnet: &str,
        file_index: usize,
    ) -> anyhow::Result<impl tokio::io::AsyncRead + tokio::io::AsyncSeek + Unpin + Send> {
        let handle = self
            .session
            .add_torrent(
                AddTorrent::from_url(magnet),
                Some(AddTorrentOptions {
                    // Reuse on-disk storage from a prior stream of the same torrent.
                    overwrite: true,
                    ..Default::default()
                }),
            )
            .await?
            .into_handle()
            .ok_or_else(|| anyhow::anyhow!("torrent could not be added for streaming"))?;
        // stream() requires metadata + storage to be ready; wait for that (not
        // for completion — pieces are then fetched on demand as we read).
        handle.wait_until_initialized().await?;
        let stream = handle.stream(file_index)?;
        Ok(stream)
    }
}

#[derive(Debug, Clone, Serialize)]
pub struct Probe {
    pub streamable: bool,
    pub files: usize,
    pub reason: String,
}
