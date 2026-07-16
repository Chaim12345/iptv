use serde::{Deserialize, Serialize};

/// Kind of indexer source. `torznab` covers indexarr-rs / Prowlarr / Jackett
/// (all speak the Torznab API); `internet_archive` is the bundled legal source.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum IndexerKind {
    Torznab,
    InternetArchive,
}

/// An operator-configured indexer. Persisted to `data/indexers.json`.
/// Only Internet Archive ships as a default — no piracy indexers are bundled.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IndexerConfig {
    pub name: String,
    pub kind: IndexerKind,
    /// Base URL for a Torznab endpoint (ignored for Internet Archive).
    #[serde(default)]
    pub base_url: String,
    #[serde(default)]
    pub api_key: String,
    #[serde(default = "default_true")]
    pub enabled: bool,
}

fn default_true() -> bool {
    true
}

impl IndexerConfig {
    /// The single bundled legal default. No trackers or piracy indexers ship.
    pub fn internet_archive_default() -> Self {
        Self {
            name: "Internet Archive".to_string(),
            kind: IndexerKind::InternetArchive,
            base_url: String::new(),
            api_key: String::new(),
            enabled: true,
        }
    }

    /// Copy with the API key blanked, for API responses.
    pub fn redacted(&self) -> Self {
        Self {
            api_key: if self.api_key.is_empty() { String::new() } else { "***".into() },
            ..self.clone()
        }
    }
}

/// A normalized search across all indexer kinds.
#[derive(Debug, Clone, Default)]
pub struct SearchQuery {
    pub text: String,
    /// "movies" | "tv" | "" (any)
    pub category: String,
}

#[allow(dead_code)] // Live/Unknown reserved for later live-vs-vod classification
#[derive(Debug, Clone, Copy, PartialEq, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum ResultKind {
    Vod,
    Live,
    Unknown,
}

/// One normalized search result, source-agnostic. `url` is a magnet: URI or an
/// http(s) torrent/download URL that Phase 3 resolves and streams.
#[derive(Debug, Clone, Serialize)]
pub struct SearchResult {
    pub title: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub year: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub size: Option<u64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub seeders: Option<u32>,
    /// The configured indexer's name (provenance / attribution).
    pub source: String,
    pub url: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub infohash: Option<String>,
    pub kind: ResultKind,
}

impl SearchResult {
    /// Dedup key: infohash when known, else the URL.
    pub fn dedup_key(&self) -> String {
        self.infohash
            .as_ref()
            .map(|h| h.to_lowercase())
            .unwrap_or_else(|| self.url.clone())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    /// OPS-01: source-neutral guardrail. The only bundled default indexer is
    /// Internet Archive, and it points at no tracker/indexer URL or key.
    #[test]
    fn bundled_default_is_internet_archive_only() {
        let d = IndexerConfig::internet_archive_default();
        assert_eq!(d.kind, IndexerKind::InternetArchive);
        assert!(
            d.base_url.is_empty(),
            "a bundled default must not ship a tracker/indexer URL"
        );
        assert!(d.api_key.is_empty());
    }

    #[test]
    fn redacted_hides_api_key() {
        let mut c = IndexerConfig::internet_archive_default();
        c.api_key = "secret".into();
        assert_eq!(c.redacted().api_key, "***");
    }
}
