//! Indexer subsystem: a generic Torznab client (indexarr-rs / Prowlarr /
//! Jackett) plus the bundled Internet Archive source. Source-neutral — only
//! Internet Archive ships as a default; operators add their own Torznab
//! endpoints. `indexarr-rs` runs as a separate sidecar reached over HTTP.

pub mod types;
mod internet_archive;
mod torznab;

pub use types::{IndexerConfig, IndexerKind, SearchQuery, SearchResult};

use std::collections::HashSet;
use tokio::task::JoinSet;

/// Search every enabled indexer concurrently, then merge + dedupe results.
pub async fn search_all(
    client: reqwest::Client,
    indexers: Vec<IndexerConfig>,
    query: SearchQuery,
) -> Vec<SearchResult> {
    let mut set = JoinSet::new();
    for cfg in indexers.into_iter().filter(|c| c.enabled) {
        let client = client.clone();
        let query = query.clone();
        set.spawn(async move {
            let res = match cfg.kind {
                IndexerKind::Torznab => torznab::search(&client, &cfg, &query).await,
                IndexerKind::InternetArchive => internet_archive::search(&client, &query).await,
            };
            match res {
                Ok(v) => v,
                Err(e) => {
                    tracing::warn!("indexer '{}' search failed: {}", cfg.name, e);
                    Vec::new()
                }
            }
        });
    }

    let mut seen: HashSet<String> = HashSet::new();
    let mut out: Vec<SearchResult> = Vec::new();
    while let Some(joined) = set.join_next().await {
        if let Ok(list) = joined {
            for r in list {
                if seen.insert(r.dedup_key()) {
                    out.push(r);
                }
            }
        }
    }
    // Streamable-looking first (seeders desc, then titled), stable enough for UI.
    out.sort_by(|a, b| b.seeders.unwrap_or(0).cmp(&a.seeders.unwrap_or(0)));
    out
}
