use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

// ── Channel types ──────────────────────────────────────────────

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Channel {
    pub name: String,
    pub url: String,
    #[serde(default)]
    pub urls: Vec<String>,
    pub group: String,
    #[serde(default)]
    pub logo: String,
    #[serde(default)]
    pub tvg_id: String,
    #[serde(default)]
    pub tvg_name: String,
    #[serde(default)]
    pub language: String,
    #[serde(default)]
    pub country: String,
    #[serde(default)]
    pub status: String,
    #[serde(default)]
    pub response_time_ms: u32,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Programme {
    pub channel_id: String,
    pub title: String,
    #[serde(default)]
    pub description: String,
    pub start: String,
    pub stop: String,
    #[serde(default)]
    pub category: String,
    #[serde(default)]
    pub icon: String,
}

#[derive(Serialize, Deserialize)]
pub struct FilterOptions {
    #[serde(default)]
    pub search: String,
    #[serde(default)]
    pub group: String,
    #[serde(default)]
    pub status: String,
    #[serde(default)]
    pub sort_by: String,
    #[serde(default)]
    pub sort_desc: bool,
    #[serde(default)]
    pub favorites_only: bool,
    #[serde(default)]
    pub favorites: Vec<String>,
}

// ── M3U Parser ─────────────────────────────────────────────────

#[wasm_bindgen]
pub fn parse_m3u(input: &str) -> JsValue {
    let mut channels: Vec<Channel> = Vec::new();
    let mut lines = input.lines().peekable();

    // Skip #EXTM3U header
    if let Some(first) = lines.peek() {
        if first.starts_with("#EXTM3U") {
            lines.next();
        }
    }

    while let Some(line) = lines.next() {
        let line = line.trim();
        if !line.starts_with("#EXTINF") {
            continue;
        }

        // Parse EXTINF attributes
        let name = extract_name(line);
        let group = extract_attr(line, "group-title").unwrap_or_default();
        let logo = extract_attr(line, "tvg-logo").unwrap_or_default();
        let tvg_id = extract_attr(line, "tvg-id").unwrap_or_default();
        let tvg_name = extract_attr(line, "tvg-name").unwrap_or_default();
        let language = extract_attr(line, "tvg-language").unwrap_or_default();
        let country = extract_attr(line, "tvg-country").unwrap_or_default();

        // Next non-comment, non-empty line is the URL
        let url = lines
            .find(|l| !l.trim().is_empty() && !l.trim().starts_with('#'))
            .map(|l| l.trim().to_string())
            .unwrap_or_default();

        if !url.is_empty() {
            channels.push(Channel {
                name,
                urls: vec![url.clone()],
                url,
                group,
                logo,
                tvg_id,
                tvg_name,
                language,
                country,
                status: "unknown".into(),
                response_time_ms: 0,
            });
        }
    }

    serde_wasm_bindgen::to_value(&channels).unwrap_or(JsValue::NULL)
}

fn extract_attr(line: &str, attr: &str) -> Option<String> {
    let pattern = format!("{attr}=\"");
    let start = line.find(&pattern)? + pattern.len();
    let rest = &line[start..];
    let end = rest.find('"')?;
    Some(rest[..end].to_string())
}

fn extract_name(line: &str) -> String {
    // Name is after the last comma in the EXTINF line
    line.rsplit(',').next().unwrap_or("").trim().to_string()
}

// ── Filtering & Sorting ────────────────────────────────────────

#[wasm_bindgen]
pub fn filter_channels(channels_js: JsValue, opts_js: JsValue) -> JsValue {
    let channels: Vec<Channel> = match serde_wasm_bindgen::from_value(channels_js) {
        Ok(c) => c,
        Err(_) => return JsValue::NULL,
    };
    let opts: FilterOptions = match serde_wasm_bindgen::from_value(opts_js) {
        Ok(o) => o,
        Err(_) => return JsValue::NULL,
    };

    let search_lower = opts.search.to_lowercase();

    let mut filtered: Vec<Channel> = channels
        .into_iter()
        .filter(|ch| {
            if !opts.group.is_empty() && ch.group != opts.group {
                return false;
            }
            if !opts.status.is_empty() && ch.status != opts.status {
                return false;
            }
            if !search_lower.is_empty() {
                let haystack = format!("{} {} {} {}", ch.name, ch.group, ch.country, ch.language).to_lowercase();
                if !haystack.contains(&search_lower) {
                    return false;
                }
            }
            if opts.favorites_only && !opts.favorites.contains(&ch.url) {
                return false;
            }
            true
        })
        .collect();

    // Sort
    match opts.sort_by.as_str() {
        "name" => filtered.sort_by(|a, b| a.name.to_lowercase().cmp(&b.name.to_lowercase())),
        "group" => filtered.sort_by(|a, b| a.group.cmp(&b.group).then(a.name.cmp(&b.name))),
        "status" => filtered.sort_by(|a, b| a.status.cmp(&b.status).then(a.name.cmp(&b.name))),
        "response" => filtered.sort_by(|a, b| a.response_time_ms.cmp(&b.response_time_ms)),
        "country" => filtered.sort_by(|a, b| a.country.cmp(&b.country).then(a.name.cmp(&b.name))),
        _ => filtered.sort_by(|a, b| a.name.to_lowercase().cmp(&b.name.to_lowercase())),
    }

    if opts.sort_desc {
        filtered.reverse();
    }

    serde_wasm_bindgen::to_value(&filtered).unwrap_or(JsValue::NULL)
}

// ── EPG Matching ───────────────────────────────────────────────

#[wasm_bindgen]
pub fn match_epg(channel_id: &str, programmes_js: JsValue) -> JsValue {
    let programmes: Vec<Programme> = match serde_wasm_bindgen::from_value(programmes_js) {
        Ok(p) => p,
        Err(_) => return JsValue::NULL,
    };

    let matched: Vec<&Programme> = programmes
        .iter()
        .filter(|p| p.channel_id == channel_id)
        .collect();

    serde_wasm_bindgen::to_value(&matched).unwrap_or(JsValue::NULL)
}

// ── Fuzzy Search ───────────────────────────────────────────────

#[wasm_bindgen]
pub fn fuzzy_score(query: &str, target: &str) -> i32 {
    let q = query.to_lowercase();
    let t = target.to_lowercase();

    if t.contains(&q) {
        // Exact substring match — score based on position
        let pos = t.find(&q).unwrap_or(0);
        return 1000 - pos as i32;
    }

    // Character-by-character fuzzy match
    let mut score: i32 = 0;
    let mut qi = 0;
    let q_bytes: Vec<char> = q.chars().collect();
    let t_bytes: Vec<char> = t.chars().collect();

    for tc in &t_bytes {
        if qi < q_bytes.len() && *tc == q_bytes[qi] {
            score += 10;
            qi += 1;
        }
    }

    if qi == q_bytes.len() {
        score
    } else {
        0
    }
}

// ── Group extraction ───────────────────────────────────────────

#[wasm_bindgen]
pub fn extract_groups(channels_js: JsValue) -> JsValue {
    let channels: Vec<Channel> = match serde_wasm_bindgen::from_value(channels_js) {
        Ok(c) => c,
        Err(_) => return JsValue::NULL,
    };

    let mut seen = std::collections::HashMap::new();
    for ch in &channels {
        *seen.entry(ch.group.clone()).or_insert(0usize) += 1;
    }
    let mut sorted: Vec<_> = seen.into_iter().collect();
    sorted.sort_by(|a, b| b.1.cmp(&a.1));

    serde_wasm_bindgen::to_value(&sorted).unwrap_or(JsValue::NULL)
}

// ── M3U Export ─────────────────────────────────────────────────

#[wasm_bindgen]
pub fn export_m3u(channels_js: JsValue) -> String {
    let channels: Vec<Channel> = match serde_wasm_bindgen::from_value(channels_js) {
        Ok(c) => c,
        Err(_) => return String::from("#EXTM3U\n"),
    };

    let mut out = String::from("#EXTM3U\n");
    for ch in &channels {
        let mut attrs = String::new();
        if !ch.tvg_id.is_empty() {
            attrs.push_str(&format!(" tvg-id=\"{}\"", ch.tvg_id));
        }
        if !ch.tvg_name.is_empty() {
            attrs.push_str(&format!(" tvg-name=\"{}\"", ch.tvg_name));
        }
        if !ch.logo.is_empty() {
            attrs.push_str(&format!(" tvg-logo=\"{}\"", ch.logo));
        }
        if !ch.group.is_empty() {
            attrs.push_str(&format!(" group-title=\"{}\"", ch.group));
        }
        out.push_str(&format!("#EXTINF:-1{},{}\n{}\n", attrs, ch.name, ch.url));
    }
    out
}