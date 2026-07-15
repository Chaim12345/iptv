//! Generic Torznab client. Works against any Torznab endpoint — indexarr-rs
//! (run as a sidecar), Prowlarr, or Jackett — since they share the API.
//!
//! Torznab returns RSS-like XML: a `<channel>` of `<item>`s, each with a
//! `<title>`, `<size>`, an `<enclosure url>` or `<link>` (magnet / .torrent),
//! and `<torznab:attr name= value=>` extras (seeders, infohash).

use quick_xml::events::Event;
use quick_xml::Reader;

use super::types::{IndexerConfig, ResultKind, SearchQuery, SearchResult};

/// Query a Torznab endpoint and normalize the results.
pub async fn search(
    client: &reqwest::Client,
    cfg: &IndexerConfig,
    query: &SearchQuery,
) -> anyhow::Result<Vec<SearchResult>> {
    if cfg.base_url.is_empty() {
        return Ok(Vec::new());
    }
    // `base_url` is the FULL Torznab endpoint (varies by server: indexarr-rs
    // uses `/api/torznab`, Jackett `/api/v2.0/.../torznab/api`, Prowlarr
    // `/<id>/api`). We append the query directly rather than assuming a `/api`
    // suffix, so the operator provides whatever path their server exposes.
    let base = cfg.base_url.trim_end_matches('/');
    // t=search is the universal Torznab function; category is left to the
    // endpoint's own mapping (we pass the free-text query).
    let mut url = format!(
        "{}?t=search&q={}",
        base,
        urlencoding::encode(&query.text)
    );
    // Map our coarse category to Torznab's numeric categories (2000=movies,
    // 5000=tv). Left off when unspecified so the endpoint searches everything.
    match query.category.as_str() {
        "movies" => url.push_str("&cat=2000"),
        "tv" => url.push_str("&cat=5000"),
        _ => {}
    }
    // Request the Torznab max page size so we surface the indexer's full
    // catalog, not just its default page (indexarr defaults to 50, max 100).
    url.push_str("&limit=100");
    if !cfg.api_key.is_empty() {
        url.push_str(&format!("&apikey={}", urlencoding::encode(&cfg.api_key)));
    }

    let resp = client.get(&url).send().await?;
    if !resp.status().is_success() {
        anyhow::bail!("indexer '{}' returned HTTP {}", cfg.name, resp.status());
    }
    let body = resp.text().await?;
    Ok(parse_torznab(&body, &cfg.name))
}

fn parse_torznab(xml: &str, source: &str) -> Vec<SearchResult> {
    let mut reader = Reader::from_str(xml);
    reader.trim_text(true);

    let mut results = Vec::new();
    let mut buf = Vec::new();

    let mut in_item = false;
    let mut cur_text = String::new();
    let mut cur_elem = String::new();

    let mut title = String::new();
    let mut url = String::new();
    let mut size: Option<u64> = None;
    let mut seeders: Option<u32> = None;
    let mut infohash: Option<String> = None;

    let attr = |e: &quick_xml::events::BytesStart, key: &[u8]| -> Option<String> {
        e.attributes()
            .filter_map(|a| a.ok())
            .find(|a| a.key.as_ref() == key)
            .and_then(|a| String::from_utf8(a.value.to_vec()).ok())
    };

    loop {
        match reader.read_event_into(&mut buf) {
            Ok(Event::Start(ref e)) | Ok(Event::Empty(ref e)) => {
                let name = String::from_utf8_lossy(e.name().as_ref()).to_string();
                let local = name.rsplit(':').next().unwrap_or(&name).to_string();
                match local.as_str() {
                    "item" => {
                        in_item = true;
                        title.clear();
                        url.clear();
                        size = None;
                        seeders = None;
                        infohash = None;
                    }
                    "enclosure" if in_item => {
                        if let Some(u) = attr(e, b"url") {
                            if url.is_empty() {
                                url = u;
                            }
                        }
                    }
                    "attr" if in_item => {
                        // <torznab:attr name="seeders" value="10" />
                        if let (Some(n), Some(v)) = (attr(e, b"name"), attr(e, b"value")) {
                            match n.as_str() {
                                "seeders" => seeders = v.parse().ok(),
                                "size" => size = v.parse().ok().or(size),
                                "infohash" | "infoHash" => infohash = Some(v),
                                "magneturl" | "magnetUrl" => {
                                    if url.is_empty() || url.starts_with("http") {
                                        url = v;
                                    }
                                }
                                _ => {}
                            }
                        }
                    }
                    other if in_item => {
                        cur_elem = other.to_string();
                        cur_text.clear();
                    }
                    _ => {}
                }
            }
            Ok(Event::Text(ref e)) => {
                if let Ok(t) = e.unescape() {
                    cur_text.push_str(&t);
                }
            }
            Ok(Event::End(ref e)) => {
                let name = String::from_utf8_lossy(e.name().as_ref()).to_string();
                let local = name.rsplit(':').next().unwrap_or(&name).to_string();
                match local.as_str() {
                    "item" => {
                        if !title.is_empty() && !url.is_empty() {
                            if infohash.is_none() {
                                infohash = extract_infohash(&url);
                            }
                            results.push(SearchResult {
                                title: title.trim().to_string(),
                                year: extract_year(&title),
                                size,
                                seeders,
                                source: source.to_string(),
                                url: url.clone(),
                                infohash: infohash.clone(),
                                kind: ResultKind::Vod,
                            });
                        }
                        in_item = false;
                    }
                    "title" if in_item && cur_elem == "title" => title = cur_text.trim().to_string(),
                    "link" if in_item && cur_elem == "link" => {
                        let t = cur_text.trim();
                        if url.is_empty() || t.starts_with("magnet:") {
                            url = t.to_string();
                        }
                    }
                    "size" if in_item && cur_elem == "size" => {
                        size = cur_text.trim().parse().ok().or(size)
                    }
                    _ => {}
                }
                cur_elem.clear();
            }
            Ok(Event::Eof) => break,
            Err(_) => break,
            _ => {}
        }
        buf.clear();
    }

    results
}

/// Pull the btih infohash out of a magnet URI, if present.
fn extract_infohash(url: &str) -> Option<String> {
    let lower = url.to_lowercase();
    let idx = lower.find("btih:")?;
    let rest = &url[idx + 5..];
    let hash: String = rest
        .chars()
        .take_while(|c| c.is_ascii_alphanumeric())
        .collect();
    if hash.len() >= 32 {
        Some(hash)
    } else {
        None
    }
}

/// Best-effort 4-digit year from a release title, e.g. "Big Buck Bunny 2008".
fn extract_year(title: &str) -> Option<u32> {
    let bytes = title.as_bytes();
    let mut i = 0;
    while i + 4 <= bytes.len() {
        if bytes[i..i + 4].iter().all(|b| b.is_ascii_digit()) {
            if let Ok(y) = title[i..i + 4].parse::<u32>() {
                if (1900..=2099).contains(&y) {
                    return Some(y);
                }
            }
        }
        i += 1;
    }
    None
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_torznab_items() {
        let xml = r#"<?xml version="1.0"?>
<rss xmlns:torznab="http://torznab.com/schemas/2015/feed">
  <channel>
    <item>
      <title>Big Buck Bunny 2008 1080p</title>
      <size>355400000</size>
      <link>magnet:?xt=urn:btih:DD8255ECDC7CA55FB0BBF81323D87062DB1F6D1C&amp;dn=bbb</link>
      <torznab:attr name="seeders" value="42" />
    </item>
  </channel>
</rss>"#;
        let r = parse_torznab(xml, "test");
        assert_eq!(r.len(), 1);
        assert_eq!(r[0].seeders, Some(42));
        assert_eq!(r[0].year, Some(2008));
        assert_eq!(
            r[0].infohash.as_deref(),
            Some("DD8255ECDC7CA55FB0BBF81323D87062DB1F6D1C")
        );
    }
}
