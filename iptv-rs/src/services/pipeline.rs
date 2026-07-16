//! Curation pipeline: fetch every curated playlist, deduplicate channels,
//! probe every stream, keep only the ones that answer, then fetch and merge
//! every curated EPG (deduplicated, time-windowed).
//!
//! Runs in a background task; progress is exposed via /api/pipeline/status
//! and the result is persisted as the "working set".

use std::collections::HashMap;
use std::sync::Arc;

use chrono::{Duration, Utc};
use tokio::sync::Semaphore;
use tokio::task::JoinSet;
use tracing::{info, warn};

use crate::models::{Channel, Playlist};
use crate::parsers::m3u::M3uParser;
use crate::parsers::xmltv::XmltvParser;
use crate::services::curated::get_curated_sources;
use crate::store::{normalize_channel_name, AppStore};

/// A deduplicated channel with every distinct URL seen for it across sources.
struct Candidate {
    channel: Channel,
    urls: Vec<String>,
}

const MAX_URLS_PER_CHANNEL: usize = 6;
const SNAPSHOT_EVERY: usize = 2000;

pub fn http_client(timeout_secs: u64) -> Option<reqwest::Client> {
    reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(timeout_secs))
        .danger_accept_invalid_certs(true)
        .user_agent("iptv-rs/1.0")
        .build()
        .ok()
}

/// Fetch up to `cap` bytes of a URL as text, or None if unreachable / non-2xx.
/// Caps the read so a server that ignores Range can't stream the whole file.
async fn fetch_capped(client: &reqwest::Client, url: &str, cap: usize) -> Option<String> {
    let resp = client
        .get(url)
        .header("Range", format!("bytes=0-{}", cap))
        .send()
        .await
        .ok()?;
    let status = resp.status();
    if !(status.is_success() || status.as_u16() == 206) {
        return None;
    }
    let mut resp = resp;
    let mut body: Vec<u8> = Vec::with_capacity(cap.min(8192));
    while let Ok(Some(chunk)) = resp.chunk().await {
        body.extend_from_slice(&chunk);
        if body.len() >= cap {
            break;
        }
    }
    Some(String::from_utf8_lossy(&body).into_owned())
}

/// First non-comment, non-empty line of a manifest — a variant playlist URI
/// (master) or the first segment (media playlist).
fn first_uri_line(manifest: &str) -> Option<&str> {
    manifest
        .lines()
        .map(str::trim)
        .find(|l| !l.is_empty() && !l.starts_with('#'))
}

/// Given a fetched master manifest, confirm it actually leads to playable
/// media: a media playlist has segments (#EXTINF); a master must have at least
/// one variant that itself resolves to a playlist with segments.
async fn hls_playable(client: &reqwest::Client, master_url: &str, master_text: &str) -> bool {
    // Media playlist with segments — good.
    if master_text.contains("#EXTINF") {
        return true;
    }
    let base = match reqwest::Url::parse(master_url) {
        Ok(u) => u,
        Err(_) => return true, // can't verify deeper; don't punish
    };
    let variant = match first_uri_line(master_text) {
        Some(v) => v,
        None => return false, // master with no variants = dead
    };
    let abs = match base.join(variant) {
        Ok(u) => u.to_string(),
        Err(_) => return true,
    };
    // One level deeper: the variant playlist must list segments.
    match fetch_capped(client, &abs, 65_536).await {
        Some(t) => t.contains("#EXTINF") || first_uri_line(&t).is_some(),
        None => false,
    }
}

/// Probe a stream URL. For HLS we confirm the manifest resolves to a variant
/// with actual segments (not just a reachable master); for anything else a
/// 2xx/206 answer counts.
pub async fn check_stream(client: &reqwest::Client, url: &str) -> bool {
    if url.is_empty() {
        return false;
    }
    if url.contains(".m3u8") {
        let text = match fetch_capped(client, url, 65_536).await {
            Some(t) => t,
            None => return false,
        };
        if !text.trim_start().starts_with("#EXTM3U") {
            return false;
        }
        hls_playable(client, url, &text).await
    } else {
        match client.get(url).header("Range", "bytes=0-1").send().await {
            Ok(r) => r.status().is_success() || r.status().as_u16() == 206,
            Err(_) => false,
        }
    }
}

/// Entry point. `force` re-runs even when the working set is still fresh.
pub async fn run(store: Arc<AppStore>, force: bool) {
    if !force {
        if let Some(w) = store.get_working() {
            if let Ok(ts) = chrono::DateTime::parse_from_rfc3339(&w.last_updated) {
                let age = Utc::now().signed_duration_since(ts.with_timezone(&Utc));
                if age < Duration::hours(store.config().refresh_hours) {
                    info!(
                        "Working set is {}m old (< {}h) — skipping pipeline; POST /api/pipeline/run to force",
                        age.num_minutes(),
                        store.config().refresh_hours
                    );
                    return;
                }
            }
        }
    }

    if !store.try_begin_pipeline() {
        info!("Pipeline already running — skipping");
        return;
    }

    fetch_playlists(&store).await;
    let candidates = deduplicate(&store);
    probe_streams(&store, candidates).await;
    fetch_epg(&store).await;

    store.update_pipeline(|p| {
        p.running = false;
        p.phase = "done".into();
        p.last_run = Some(Utc::now().to_rfc3339());
    });
    let working = store.get_working().map(|w| w.total_channels).unwrap_or(0);
    let epg = store.epg_stats().map(|(_, p)| p).unwrap_or(0);
    info!("Pipeline done: {} verified channels, {} programmes", working, epg);
}

/// Stage 1 — fetch and store every curated M3U source.
async fn fetch_playlists(store: &Arc<AppStore>) {
    let sources: Vec<_> = get_curated_sources()
        .into_iter()
        .filter(|s| s.source_type == "m3u")
        .collect();

    store.update_pipeline(|p| {
        p.phase = "fetching playlists".into();
        p.playlists_total = sources.len();
    });

    let client = match http_client(120) {
        Some(c) => c,
        None => return,
    };

    let semaphore = Arc::new(Semaphore::new(4));
    let mut set = JoinSet::new();
    for source in sources {
        let store = Arc::clone(store);
        let client = client.clone();
        let semaphore = Arc::clone(&semaphore);
        set.spawn(async move {
            let _permit = semaphore.acquire_owned().await;
            match client.get(&source.url).send().await {
                Ok(resp) if resp.status().is_success() => match resp.text().await {
                    Ok(text) => match M3uParser::parse(&text) {
                        Ok(channels) => {
                            let playlist = Playlist::new(source.name.clone(), channels);
                            if let Err(e) = store.save_playlist(playlist) {
                                warn!("Failed to save '{}': {}", source.name, e);
                            }
                        }
                        Err(e) => warn!("Failed to parse '{}': {}", source.name, e),
                    },
                    Err(e) => warn!("Failed to read '{}': {}", source.name, e),
                },
                Ok(resp) => warn!("HTTP {} fetching '{}'", resp.status(), source.name),
                Err(e) => warn!("Failed to fetch '{}': {}", source.name, e),
            }
            store.update_pipeline(|p| p.playlists_fetched += 1);
        });
    }
    while set.join_next().await.is_some() {}
}

/// Stage 2 — collapse all playlists into unique channels.
/// Key: tvg-id when present, else the normalized display name.
fn deduplicate(store: &Arc<AppStore>) -> Vec<Candidate> {
    store.update_pipeline(|p| p.phase = "deduplicating".into());

    let playlists = store.get_playlists();
    let mut names: Vec<_> = playlists.keys().cloned().collect();
    names.sort();

    let mut index: HashMap<String, usize> = HashMap::new();
    let mut candidates: Vec<Candidate> = Vec::new();

    for name in names {
        let Some(playlist) = playlists.get(&name) else { continue };
        for ch in &playlist.channels {
            if ch.url.is_empty() {
                continue;
            }
            let key = match ch.tvg_id.as_deref().filter(|s| !s.is_empty()) {
                Some(id) => format!("id:{}", id.to_lowercase()),
                None => format!("name:{}", normalize_channel_name(&ch.name)),
            };
            match index.get(&key) {
                Some(&i) => {
                    let cand = &mut candidates[i];
                    if cand.urls.len() < MAX_URLS_PER_CHANNEL
                        && !cand.urls.contains(&ch.url)
                    {
                        cand.urls.push(ch.url.clone());
                    }
                    if cand.channel.logo.is_none() && ch.logo.is_some() {
                        cand.channel.logo = ch.logo.clone();
                    }
                    if cand.channel.group.is_none() && ch.group.is_some() {
                        cand.channel.group = ch.group.clone();
                    }
                }
                None => {
                    index.insert(key, candidates.len());
                    candidates.push(Candidate {
                        channel: ch.clone(),
                        urls: vec![ch.url.clone()],
                    });
                }
            }
        }
    }

    store.update_pipeline(|p| p.unique_channels = candidates.len());
    info!("Deduplicated to {} unique channels", candidates.len());
    candidates
}

/// Stage 3 — probe every candidate; the first URL that answers wins.
/// Channels with no working URL are dropped. Snapshots are saved as we go so
/// the UI fills in progressively.
async fn probe_streams(store: &Arc<AppStore>, candidates: Vec<Candidate>) {
    store.update_pipeline(|p| p.phase = "checking streams".into());

    let client = match http_client(8) {
        Some(c) => c,
        None => return,
    };

    let semaphore = Arc::new(Semaphore::new(store.config().check_concurrency));
    let mut set = JoinSet::new();
    let total = candidates.len();

    for (idx, cand) in candidates.into_iter().enumerate() {
        let client = client.clone();
        let semaphore = Arc::clone(&semaphore);
        set.spawn(async move {
            let _permit = semaphore.acquire_owned().await;
            for url in &cand.urls {
                if check_stream(&client, url).await {
                    let mut ch = cand.channel.clone();
                    ch.url = url.clone();
                    // Store all URLs as fallback mirrors (primary first)
                    ch.urls = {
                        let mut u = vec![url.clone()];
                        u.extend(cand.urls.iter().filter(|u2| *u2 != url).cloned());
                        u
                    };
                    ch.status = Some("alive".into());
                    return (idx, Some(ch));
                }
            }
            (idx, None)
        });
    }

    let mut results: Vec<Option<Channel>> = (0..total).map(|_| None).collect();
    let mut done = 0usize;
    let mut alive = 0usize;

    while let Some(joined) = set.join_next().await {
        if let Ok((idx, result)) = joined {
            if result.is_some() {
                alive += 1;
            }
            results[idx] = result;
        }
        done += 1;
        store.update_pipeline(|p| {
            p.checked = done;
            p.alive = alive;
        });
        if done % SNAPSHOT_EVERY == 0 || done == total {
            let snapshot: Vec<Channel> = results.iter().flatten().cloned().collect();
            store.set_working(Playlist::new("Working Channels".into(), snapshot));
            // Persist off the async runtime so serialization/IO never stalls
            // request handling.
            let store = Arc::clone(store);
            let _ = tokio::task::spawn_blocking(move || store.persist_working()).await;
        }
    }

    info!("Stream check: {}/{} alive", alive, total);
}

/// Stage 4 — fetch every curated EPG, merge with dedupe, keep a rolling
/// time window so the merged guide stays a manageable size.
async fn fetch_epg(store: &Arc<AppStore>) {
    let sources: Vec<_> = get_curated_sources()
        .into_iter()
        .filter(|s| s.source_type == "epg")
        .collect();

    store.update_pipeline(|p| {
        p.phase = "fetching EPG".into();
        p.epg_total = sources.len();
    });

    let client = match http_client(180) {
        Some(c) => c,
        None => return,
    };

    let window = (
        Utc::now() - Duration::hours(6),
        Utc::now() + Duration::hours(store.config().epg_window_hours),
    );

    // Two at a time: EPG files are large and parsing is CPU-heavy.
    let semaphore = Arc::new(Semaphore::new(2));
    let mut set = JoinSet::new();
    for source in sources {
        let store = Arc::clone(store);
        let client = client.clone();
        let semaphore = Arc::clone(&semaphore);
        set.spawn(async move {
            let _permit = semaphore.acquire_owned().await;
            let bytes = match client.get(&source.url).send().await {
                Ok(resp) if resp.status().is_success() => match resp.bytes().await {
                    Ok(b) => b.to_vec(),
                    Err(e) => {
                        warn!("Failed to read EPG '{}': {}", source.name, e);
                        store.update_pipeline(|p| p.epg_fetched += 1);
                        return;
                    }
                },
                Ok(resp) => {
                    warn!("HTTP {} fetching EPG '{}'", resp.status(), source.name);
                    store.update_pipeline(|p| p.epg_fetched += 1);
                    return;
                }
                Err(e) => {
                    warn!("Failed to fetch EPG '{}': {}", source.name, e);
                    store.update_pipeline(|p| p.epg_fetched += 1);
                    return;
                }
            };

            let parsed = tokio::task::spawn_blocking(move || {
                let xml: Vec<u8> = if source.url.ends_with(".gz") {
                    use std::io::Read;
                    let mut decoder = flate2::read::GzDecoder::new(&bytes[..]);
                    let mut out = Vec::new();
                    if decoder.read_to_end(&mut out).is_err() {
                        return Err(format!("Failed to decompress '{}'", source.name));
                    }
                    out
                } else {
                    bytes
                };
                XmltvParser::parse_window(&xml, Some(window))
                    .map(|epg| (source.name, epg))
            })
            .await;

            match parsed {
                Ok(Ok((name, epg))) => {
                    let count = epg.total_programmes;
                    store.merge_epg(epg); // atomic in-memory; persisted once below
                    info!("Merged EPG '{}': {} programmes in window", name, count);
                }
                Ok(Err(e)) => warn!("{}", e),
                Err(e) => warn!("EPG parse task panicked: {}", e),
            }
            store.update_pipeline(|p| p.epg_fetched += 1);
        });
    }
    while set.join_next().await.is_some() {}

    // Persist the fully merged guide once, off the async runtime — the merged
    // EPG can be hundreds of MB and would otherwise stall request handling.
    store.update_pipeline(|p| p.phase = "saving EPG".into());
    let store = Arc::clone(store);
    if let Err(e) = tokio::task::spawn_blocking(move || store.persist_epg()).await {
        warn!("EPG persist task failed: {}", e);
    }
}
