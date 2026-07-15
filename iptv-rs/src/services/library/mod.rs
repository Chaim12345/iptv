//! STRM library bridge (Phase 4). Turns operator-configured "collections"
//! (saved searches) into a Jellyfin-scrapeable folder tree of `.strm` files,
//! each pointing at `/api/vod/stream` — so torrents play in Jellyfin without a
//! persistent download. Source-neutral: no collections ship by default.

use std::path::Path;
use std::sync::Arc;

use serde::{Deserialize, Serialize};

use crate::services::indexer::{self, IndexerConfig, SearchQuery, SearchResult};
use crate::services::torrent::TorrentEngine;

/// An operator-defined saved search that becomes a library folder.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Collection {
    pub name: String,
    pub query: String,
    /// "movies" | "tv" (folder + Torznab category). Defaults to movies.
    #[serde(default)]
    pub category: String,
}

#[derive(Debug, Default, Serialize)]
pub struct RefreshStats {
    pub collections: usize,
    pub titles_written: usize,
    pub skipped: usize,
}

const VIDEO_EXTS: &[&str] = &["mp4", "mkv", "avi", "mov", "webm", "m4v", "ogv", "ts", "flv"];
const MAX_PER_COLLECTION: usize = 15;

/// Rebuild the STRM tree from the given collections. Each result is resolved
/// (unresolvable ones are skipped — the streamability gate); the largest video
/// file becomes a `.strm` pointing at the streaming endpoint.
pub async fn refresh(
    engine: Arc<TorrentEngine>,
    indexers: Vec<IndexerConfig>,
    client: reqwest::Client,
    library_dir: &Path,
    public_url: &str,
    collections: &[Collection],
) -> RefreshStats {
    let mut stats = RefreshStats::default();
    for c in collections {
        stats.collections += 1;
        let results = indexer::search_all(
            client.clone(),
            indexers.clone(),
            SearchQuery {
                text: c.query.clone(),
                category: c.category.clone(),
            },
        )
        .await;
        let subdir = if c.category == "tv" { "TV" } else { "Movies" };
        for r in results.into_iter().take(MAX_PER_COLLECTION) {
            match write_title(&engine, library_dir, subdir, public_url, &r).await {
                Ok(true) => stats.titles_written += 1,
                _ => stats.skipped += 1,
            }
        }
    }
    stats
}

async fn write_title(
    engine: &TorrentEngine,
    library_dir: &Path,
    subdir: &str,
    public_url: &str,
    r: &SearchResult,
) -> anyhow::Result<bool> {
    // Resolve gates streamability: unresolvable torrents are skipped.
    let resolved = engine.resolve(&r.url).await?;
    let best = resolved
        .files
        .iter()
        .filter(|f| is_video(&f.name))
        .max_by_key(|f| f.size);
    let Some(best) = best else {
        return Ok(false);
    };

    let title = title_dir(&r.title, r.year);
    if title.is_empty() {
        return Ok(false);
    }
    let dir = library_dir.join(subdir).join(&title);
    std::fs::create_dir_all(&dir)?;
    let url = format!(
        "{}/api/vod/stream?magnet={}&file={}",
        public_url.trim_end_matches('/'),
        urlencoding::encode(&r.url),
        best.index
    );
    std::fs::write(dir.join(format!("{}.strm", title)), url)?;
    Ok(true)
}

fn is_video(name: &str) -> bool {
    name.rsplit('.')
        .next()
        .map(|e| VIDEO_EXTS.contains(&e.to_lowercase().as_str()))
        .unwrap_or(false)
}

/// Jellyfin-friendly folder/file base name: "Title (Year)", filesystem-safe.
fn title_dir(title: &str, year: Option<u32>) -> String {
    let base: String = title
        .chars()
        .map(|c| {
            if c.is_alphanumeric() || matches!(c, ' ' | '-' | '_' | '.' | '&') {
                c
            } else {
                ' '
            }
        })
        .collect();
    let base = base.split_whitespace().collect::<Vec<_>>().join(" ");
    match year {
        Some(y) => format!("{} ({})", base, y),
        None => base,
    }
}

/// Count `.strm` files currently in the library tree.
pub fn count_strm(library_dir: &Path) -> usize {
    fn walk(dir: &Path, n: &mut usize) {
        if let Ok(rd) = std::fs::read_dir(dir) {
            for e in rd.flatten() {
                let p = e.path();
                if p.is_dir() {
                    walk(&p, n);
                } else if p.extension().map_or(false, |x| x == "strm") {
                    *n += 1;
                }
            }
        }
    }
    let mut n = 0;
    walk(library_dir, &mut n);
    n
}
