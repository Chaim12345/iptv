//! Internet Archive source — the bundled *legal* reference indexer.
//!
//! Uses IA's public Advanced Search API to find public-domain / CC items, and
//! points each result at the item's `_archive.torrent` (which carries HTTP
//! web-seeds, so it is actually streamable by librqbit and browsers alike).
//! No API key; ships enabled by default. This is the ONLY bundled source.

use serde_json::Value;

use super::types::{ResultKind, SearchQuery, SearchResult};

const IA_SEARCH: &str = "https://archive.org/advancedsearch.php";

pub async fn search(
    client: &reqwest::Client,
    query: &SearchQuery,
) -> anyhow::Result<Vec<SearchResult>> {
    // Constrain to video mediatypes so results are films/shows, not audio/text.
    let q = if query.text.trim().is_empty() {
        "mediatype:(movies)".to_string()
    } else {
        format!("({}) AND mediatype:(movies)", query.text)
    };

    let url = format!(
        "{}?q={}&fl[]=identifier&fl[]=title&fl[]=year&fl[]=downloads&rows=50&page=1&output=json",
        IA_SEARCH,
        urlencoding::encode(&q)
    );

    let resp = client.get(&url).send().await?;
    if !resp.status().is_success() {
        anyhow::bail!("Internet Archive returned HTTP {}", resp.status());
    }
    let json: Value = resp.json().await?;

    let docs = json
        .get("response")
        .and_then(|r| r.get("docs"))
        .and_then(|d| d.as_array())
        .cloned()
        .unwrap_or_default();

    let mut results = Vec::with_capacity(docs.len());
    for d in &docs {
        let identifier = match d.get("identifier").and_then(|v| v.as_str()) {
            Some(id) if !id.is_empty() => id.to_string(),
            _ => continue,
        };
        let title = string_field(d.get("title")).unwrap_or_else(|| identifier.clone());
        let year = string_field(d.get("year")).and_then(|y| y.get(..4)?.parse().ok());

        results.push(SearchResult {
            title,
            year,
            size: None,
            seeders: None, // IA is web-seed backed, not swarm-seeded
            source: "Internet Archive".to_string(),
            // The item's torrent carries web-seeds → streamable without a swarm.
            url: format!(
                "https://archive.org/download/{id}/{id}_archive.torrent",
                id = identifier
            ),
            infohash: None,
            kind: ResultKind::Vod,
        });
    }
    Ok(results)
}

/// IA fields come back as either a string or a single-element array — normalize.
fn string_field(v: Option<&Value>) -> Option<String> {
    match v {
        Some(Value::String(s)) => Some(s.clone()),
        Some(Value::Array(a)) => a.first().and_then(|x| x.as_str()).map(|s| s.to_string()),
        Some(Value::Number(n)) => Some(n.to_string()),
        _ => None,
    }
}
