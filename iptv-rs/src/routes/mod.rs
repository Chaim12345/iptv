use std::io::Read;
use std::sync::Arc;

use axum::{
    extract::{Multipart, Path, Query, State},
    routing::{get, post},
    response::IntoResponse,
    Json, Router,
};
use serde::Deserialize;
use serde_json::{json, Value};
use tracing::info;

use crate::error::AppError;
use crate::models::{Channel, Playlist};
use crate::parsers::m3u::M3uParser;
use crate::parsers::xmltv::XmltvParser;
use crate::services::curated::get_curated_sources;
use crate::store::AppStore;

// ── Query / Body types ─────────────────────────────────────────────────────

#[derive(Deserialize)]
pub struct SearchQuery {
    pub q: Option<String>,
}

#[derive(Deserialize)]
pub struct FetchSourceBody {
    pub url: Option<String>,
}

#[derive(Deserialize)]
pub struct EpgChannelQuery {
    /// Fallback display name used when the tvg-id doesn't match any EPG channel.
    pub name: Option<String>,
}

// ── Router builder ─────────────────────────────────────────────────────────

pub fn build(store: Arc<AppStore>) -> Router {
    Router::new()
        // Index page
        // Playlists — specific before parameterized
        .route("/api/playlists/upload", post(upload_playlist))
        .route("/api/playlists", get(list_playlists))
        .route("/api/playlists/:name", get(get_playlist).delete(delete_playlist))
        // EPG — per-channel lookup only; the full guide is too large to serve
        .route("/api/epg/upload", post(upload_epg))
        .route("/api/epg/channel/:id", get(get_channel_epg))
        // Jellyfin Live TV feed — M3U tuner + XMLTV guide over the verified set
        .route("/api/jellyfin/playlist.m3u", get(jellyfin_m3u))
        .route("/api/jellyfin/epg.xml", get(jellyfin_xmltv))
        // Channels & search
        .route("/api/channels/search", get(search_channels))
        .route("/api/channels", get(list_channels))
        // Curated sources
        .route("/api/sources/fetch", post(fetch_source))
        .route("/api/sources", get(list_sources))
        // Curation pipeline
        .route("/api/pipeline/status", get(pipeline_status))
        .route("/api/pipeline/run", post(pipeline_run))
        // Stream proxy (CORS escape hatch for the web player)
        .route("/api/proxy", get(proxy_stream))
        // Export & metrics
        .route("/api/export/:name", get(export_playlist))
        .route("/api/metrics", get(metrics))
        // Health
        .route("/api/health", get(health_check))
        .with_state(store)
}

// ── Handlers ───────────────────────────────────────────────────────────────

// ── Playlists ──────────────────────────────────────────────────────────────

/// List all uploaded playlists.
async fn list_playlists(State(store): State<Arc<AppStore>>) -> Result<Json<Value>, AppError> {
    let playlists = store.get_playlists();
    let total: usize = playlists.values().map(|p| p.total_channels).sum();
    Ok(Json(json!({
        "playlists": playlists,
        "total_playlists": playlists.len(),
        "total_channels": total
    })))
}

/// Get a single playlist by name.
async fn get_playlist(
    State(store): State<Arc<AppStore>>,
    Path(name): Path<String>,
) -> Result<Json<Value>, AppError> {
    match store.get_playlist(&name) {
        Some(p) => Ok(Json(json!(p))),
        None => Err(AppError::NotFound(format!("Playlist '{}' not found", name))),
    }
}

/// Delete a playlist by name.
async fn delete_playlist(
    State(store): State<Arc<AppStore>>,
    Path(name): Path<String>,
) -> Result<Json<Value>, AppError> {
    match store.delete_playlist(&name).map_err(|e| AppError::Internal(e.to_string()))? {
        true => Ok(Json(json!({ "status": "success", "deleted": true }))),
        false => Err(AppError::NotFound(format!("Playlist '{}' not found", name))),
    }
}

/// Upload and parse an M3U playlist file.
async fn upload_playlist(
    State(store): State<Arc<AppStore>>,
    mut multipart: Multipart,
) -> Result<Json<Value>, AppError> {
    let mut filename = String::new();
    let mut content = String::new();

    while let Ok(Some(field)) = multipart.next_field().await {
        let name = field.name().unwrap_or("").to_string();
        if name == "file" {
            filename = field
                .file_name()
                .unwrap_or("unknown.m3u")
                .to_string();
            let data = field.bytes().await?;
            content = String::from_utf8_lossy(&data).to_string();
        }
    }

    if content.is_empty() {
        return Err(AppError::BadRequest("No file content received".into()));
    }

    // Parse as M3U
    let channels = M3uParser::parse(&content)
        .map_err(|e| AppError::Parse(format!("Failed to parse M3U: {}", e)))?;

    let playlist_name = filename
        .strip_suffix(".m3u8")
        .or_else(|| filename.strip_suffix(".m3u"))
        .unwrap_or(&filename)
        .to_string();

    let playlist = Playlist::new(playlist_name.clone(), channels);

    // Save to disk via store
    store
        .save_playlist(playlist)
        .map_err(|e| AppError::Internal(format!("Failed to save playlist: {}", e)))?;

    let total = store
        .get_playlist(&playlist_name)
        .map(|p| p.total_channels)
        .unwrap_or(0);

    info!("Uploaded playlist '{}' with {} channels", playlist_name, total);

    Ok(Json(json!({
        "status": "success",
        "type": "playlist",
        "filename": filename,
        "total_channels": total
    })))
}

// ── EPG ────────────────────────────────────────────────────────────────────

/// Upload and parse an EPG XMLTV file (plain .xml or gzipped .xml.gz).
async fn upload_epg(
    State(store): State<Arc<AppStore>>,
    mut multipart: Multipart,
) -> Result<Json<Value>, AppError> {
    let mut filename = String::new();
    let mut raw_bytes: Vec<u8> = Vec::new();

    while let Ok(Some(field)) = multipart.next_field().await {
        let name = field.name().unwrap_or("").to_string();
        if name == "file" {
            filename = field.file_name().unwrap_or("unknown.xml").to_string();
            raw_bytes = field.bytes().await?.to_vec();
        }
    }

    if raw_bytes.is_empty() {
        return Err(AppError::BadRequest("No file content received".into()));
    }

    // Decompress gzip if needed
    let xml_bytes: Vec<u8> = if filename.ends_with(".gz") {
        let mut decoder = flate2::read::GzDecoder::new(&raw_bytes[..]);
        let mut out = Vec::new();
        decoder
            .read_to_end(&mut out)
            .map_err(|e| AppError::Parse(format!("Failed to decompress gzip: {}", e)))?;
        out
    } else {
        raw_bytes
    };

    // Parse XMLTV
    let epg = XmltvParser::parse(&xml_bytes).map_err(AppError::Parse)?;

    info!(
        "Parsed EPG: {} channels, {} programmes",
        epg.channels.len(),
        epg.total_programmes
    );

    // Save to store
    store
        .save_epg(epg)
        .map_err(|e| AppError::Internal(format!("Failed to save EPG: {}", e)))?;

    let (channels_count, programs_count) = store.epg_stats().unwrap_or((0, 0));
    Ok(Json(json!({
        "status": "success",
        "type": "epg",
        "filename": filename,
        "programs_count": programs_count,
        "channels_count": channels_count
    })))
}

/// Get programmes for a single channel, matched by tvg-id or display name.
/// Always returns 200 with an empty list when nothing matches, so the
/// frontend can treat "no EPG" as a normal state rather than an error.
async fn get_channel_epg(
    State(store): State<Arc<AppStore>>,
    Path(id): Path<String>,
    Query(query): Query<EpgChannelQuery>,
) -> Result<Json<Value>, AppError> {
    let (matched_id, programmes) = store
        .get_channel_programmes(&id, query.name.as_deref())
        .unwrap_or((None, Vec::new()));

    Ok(Json(json!({
        "status": "success",
        "matched_id": matched_id,
        "total": programmes.len(),
        "programmes": programmes
    })))
}

// ── Jellyfin Live TV feed ────────────────────────────────────────────────

/// Reconstruct the SIGNAL origin (scheme://host) from request headers so the
/// M3U can hand Jellyfin absolute, proxied stream URLs.
fn origin_from_headers(headers: &axum::http::HeaderMap) -> String {
    let host = headers
        .get(axum::http::header::HOST)
        .and_then(|v| v.to_str().ok())
        .unwrap_or("localhost:5000");
    let scheme = headers
        .get("x-forwarded-proto")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("http");
    format!("{}://{}", scheme, host)
}

/// M3U tuner feed for Jellyfin — the verified working set, proxied URLs.
async fn jellyfin_m3u(
    headers: axum::http::HeaderMap,
    State(store): State<Arc<AppStore>>,
) -> impl IntoResponse {
    let body = store.render_m3u(&origin_from_headers(&headers));
    (
        [(axum::http::header::CONTENT_TYPE, "audio/x-mpegurl")],
        body,
    )
}

/// XMLTV guide feed for Jellyfin — the merged EPG.
async fn jellyfin_xmltv(State(store): State<Arc<AppStore>>) -> impl IntoResponse {
    let body = store.render_xmltv();
    ([(axum::http::header::CONTENT_TYPE, "application/xml")], body)
}

// ── Channels ───────────────────────────────────────────────────────────────

/// List channels for the player UI. Prefers the curated working set
/// (deduplicated, verified alive); falls back to the raw playlist union
/// while the first pipeline run is still in progress.
async fn list_channels(State(store): State<Arc<AppStore>>) -> Result<Json<Value>, AppError> {
    let pipeline = store.get_pipeline();

    if let Some(working) = store.get_working() {
        return Ok(Json(json!({
            "source": "working",
            "total": working.total_channels,
            "last_updated": working.last_updated,
            "channels": working.channels,
            "pipeline": pipeline
        })));
    }

    let playlists = store.get_playlists();
    let all_channels: Vec<&Channel> = playlists
        .values()
        .flat_map(|p| p.channels.iter())
        .collect();

    Ok(Json(json!({
        "source": "playlists",
        "total": all_channels.len(),
        "channels": all_channels,
        "pipeline": pipeline
    })))
}

// ── Pipeline ───────────────────────────────────────────────────────────────

/// Progress of the background curation pipeline.
async fn pipeline_status(State(store): State<Arc<AppStore>>) -> Json<Value> {
    Json(json!(store.get_pipeline()))
}

/// Force a pipeline re-run (fetch → dedupe → probe → EPG).
async fn pipeline_run(State(store): State<Arc<AppStore>>) -> Json<Value> {
    let status = store.get_pipeline();
    if status.running {
        return Json(json!({ "status": "already_running", "pipeline": status }));
    }
    let bg_store = Arc::clone(&store);
    tokio::spawn(async move {
        crate::services::pipeline::run(bg_store, true).await;
    });
    Json(json!({ "status": "started" }))
}

/// Search channels across all playlists by name/tvg_id/group.
async fn search_channels(
    State(store): State<Arc<AppStore>>,
    Query(query): Query<SearchQuery>,
) -> Result<Json<Value>, AppError> {
    let q = query.q.unwrap_or_default().to_lowercase();
    if q.is_empty() {
        return Ok(Json(json!({ "channels": [], "query": "" })));
    }

    let playlists = store.get_playlists();
    let mut results: Vec<Value> = Vec::new();

    for playlist in playlists.values() {
        for channel in &playlist.channels {
            let name_matches = channel.name.to_lowercase().contains(&q);
            let id_matches = channel
                .tvg_id
                .as_deref()
                .unwrap_or("")
                .to_lowercase()
                .contains(&q);
            let group_matches = channel
                .group
                .as_deref()
                .unwrap_or("")
                .to_lowercase()
                .contains(&q);

            if name_matches || id_matches || group_matches {
                results.push(json!({
                    "channel": channel,
                    "playlist": playlist.name
                }));
            }
        }
    }

    Ok(Json(json!({ "channels": results, "query": q, "total": results.len() })))
}

// ── Curated Sources ────────────────────────────────────────────────────────

/// List all available curated IPTV/EPG sources.
async fn list_sources() -> Json<Value> {
    let sources = get_curated_sources();
    let (m3u, epg): (Vec<_>, Vec<_>) = sources
        .iter()
        .partition(|s| s.source_type == "m3u");

    Json(json!({
        "sources": sources,
        "m3u_count": m3u.len(),
        "epg_count": epg.len()
    }))
}

/// Fetch a curated source by URL, parse it, and store the result.
async fn fetch_source(
    State(store): State<Arc<AppStore>>,
    Json(body): Json<FetchSourceBody>,
) -> Result<Json<Value>, AppError> {
    let url = body
        .url
        .ok_or_else(|| AppError::BadRequest("Missing 'url' field".into()))?;

    info!("Fetching source: {}", url);

    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(120))
        .danger_accept_invalid_certs(true)
        .build()
        .map_err(|e| AppError::Internal(format!("Failed to build HTTP client: {}", e)))?;

    let response = client
        .get(&url)
        .send()
        .await
        .map_err(|e| AppError::BadGateway(format!("Failed to fetch '{}': {}", url, e)))?;

    let status = response.status();
    if !status.is_success() {
        return Err(AppError::BadGateway(format!(
            "Failed to fetch '{}': HTTP {}",
            url,
            status.as_u16()
        )));
    }

    let url_lower = url.to_lowercase();

    // Determine type from URL
    if url_lower.contains(".m3u") {
        // Parse as M3U playlist
        let text = response
            .text()
            .await
            .map_err(|e| AppError::Parse(format!("Failed to read response body: {}", e)))?;

        let channels = M3uParser::parse(&text)
            .map_err(|e| AppError::Parse(format!("Failed to parse M3U: {}", e)))?;

        // Derive a name from the URL
        let name = url
            .rsplit('/')
            .next()
            .unwrap_or("curated")
            .trim_end_matches(".m3u8")
            .trim_end_matches(".m3u")
            .to_string();

        let playlist = Playlist::new(name.clone(), channels);
        store
            .save_playlist(playlist)
            .map_err(|e| AppError::Internal(format!("Failed to save playlist: {}", e)))?;

        let total = store
            .get_playlist(&name)
            .map(|p| p.total_channels)
            .unwrap_or(0);

        info!("Fetched M3U '{}': {} channels", name, total);

        Ok(Json(json!({
            "status": "success",
            "type": "playlist",
            "name": name,
            "total_channels": total
        })))
    } else if url_lower.contains(".xml") {
        // Parse as EPG XMLTV
        let bytes = response
            .bytes()
            .await
            .map_err(|e| AppError::Parse(format!("Failed to read response body: {}", e)))?;

        let xml_bytes: Vec<u8> = if url_lower.ends_with(".gz") {
            let mut decoder = flate2::read::GzDecoder::new(&bytes[..]);
            let mut out = Vec::new();
            decoder
                .read_to_end(&mut out)
                .map_err(|e| AppError::Parse(format!("Failed to decompress gzip: {}", e)))?;
            out
        } else {
            bytes.to_vec()
        };

        let epg = XmltvParser::parse(&xml_bytes).map_err(AppError::Parse)?;

        store
            .save_epg(epg)
            .map_err(|e| AppError::Internal(format!("Failed to save EPG: {}", e)))?;

        let (channels_count, programs_count) = store.epg_stats().unwrap_or((0, 0));
        info!(
            "Fetched EPG: {} channels, {} programmes",
            channels_count, programs_count
        );

        Ok(Json(json!({
            "status": "success",
            "type": "epg",
            "channels_count": channels_count,
            "programs_count": programs_count
        })))
    } else {
        Err(AppError::BadRequest(format!(
            "Unrecognized source type from URL: {}. Expected .m3u/.m3u8 or .xml/.xml.gz",
            url
        )))
    }
}

// ── Stream proxy ───────────────────────────────────────────────────────────

#[derive(Deserialize)]
pub struct ProxyQuery {
    pub url: Option<String>,
}

/// Client for proxied streams: connect timeout only — a total request timeout
/// would cut live streams off mid-play.
fn proxy_client() -> &'static reqwest::Client {
    static CLIENT: std::sync::OnceLock<reqwest::Client> = std::sync::OnceLock::new();
    CLIENT.get_or_init(|| {
        reqwest::Client::builder()
            .connect_timeout(std::time::Duration::from_secs(10))
            .danger_accept_invalid_certs(true)
            .user_agent("Mozilla/5.0 (compatible; iptv-rs/1.0)")
            .build()
            .expect("proxy client")
    })
}

/// Rewrite every URI in an HLS manifest to route back through this proxy,
/// so segments and sub-playlists also dodge CORS.
fn rewrite_manifest(base: &reqwest::Url, text: &str) -> String {
    let proxied = |target: &str| -> Option<String> {
        let abs = base.join(target.trim()).ok()?;
        Some(format!("/api/proxy?url={}", urlencoding::encode(abs.as_str())))
    };

    text.lines()
        .map(|line| {
            let trimmed = line.trim();
            if trimmed.is_empty() {
                line.to_string()
            } else if trimmed.starts_with('#') {
                // Tags can carry URI="..." attributes (keys, sub-playlists)
                match line.find("URI=\"") {
                    Some(start) => {
                        let uri_start = start + 5;
                        match line[uri_start..].find('"') {
                            Some(len) => {
                                let uri = &line[uri_start..uri_start + len];
                                match proxied(uri) {
                                    Some(p) => format!(
                                        "{}URI=\"{}\"{}",
                                        &line[..start],
                                        p,
                                        &line[uri_start + len + 1..]
                                    ),
                                    None => line.to_string(),
                                }
                            }
                            None => line.to_string(),
                        }
                    }
                    None => line.to_string(),
                }
            } else {
                proxied(trimmed).unwrap_or_else(|| line.to_string())
            }
        })
        .collect::<Vec<_>>()
        .join("\n")
}

/// Proxy a stream URL through the server, rewriting HLS manifests so the
/// whole chain stays same-origin for the browser.
async fn proxy_stream(
    headers: axum::http::HeaderMap,
    Query(q): Query<ProxyQuery>,
) -> Result<axum::response::Response, AppError> {
    let url = q
        .url
        .ok_or_else(|| AppError::BadRequest("Missing 'url' query parameter".into()))?;
    if !(url.starts_with("http://") || url.starts_with("https://")) {
        return Err(AppError::BadRequest("Only http(s) URLs can be proxied".into()));
    }

    let mut req = proxy_client().get(&url);
    if let Some(range) = headers.get(axum::http::header::RANGE) {
        req = req.header(axum::http::header::RANGE, range);
    }

    let resp = req
        .send()
        .await
        .map_err(|e| AppError::BadGateway(format!("Upstream fetch failed: {}", e)))?;

    let status = axum::http::StatusCode::from_u16(resp.status().as_u16())
        .unwrap_or(axum::http::StatusCode::BAD_GATEWAY);
    let content_type = resp
        .headers()
        .get(axum::http::header::CONTENT_TYPE)
        .and_then(|v| v.to_str().ok())
        .unwrap_or("application/octet-stream")
        .to_string();

    let final_url = resp.url().clone();
    // Content-type alone is unreliable — some CDNs label AES keys and even
    // segments as mpegurl. Only rewrite when the body is really a manifest.
    let manifest_candidate = (content_type.contains("mpegurl")
        || final_url.path().to_lowercase().ends_with(".m3u8"))
        && resp.content_length().unwrap_or(0) < 5 * 1024 * 1024;

    if manifest_candidate {
        let bytes = resp
            .bytes()
            .await
            .map_err(|e| AppError::BadGateway(format!("Failed to read body: {}", e)))?;
        if bytes.len() >= 7 && String::from_utf8_lossy(&bytes).trim_start().starts_with("#EXTM3U") {
            let text = String::from_utf8_lossy(&bytes);
            let rewritten = rewrite_manifest(&final_url, &text);
            return Ok((
                status,
                [(axum::http::header::CONTENT_TYPE, "application/vnd.apple.mpegurl")],
                rewritten,
            )
                .into_response());
        }
        // Not actually a manifest (e.g. an AES key) — pass through untouched.
        return Ok((
            status,
            [(axum::http::header::CONTENT_TYPE, "application/octet-stream".to_string())],
            bytes,
        )
            .into_response());
    }

    use futures_util::TryStreamExt;

    // Forward the headers a media element needs, so VOD (.mp4) seeking works:
    // the browser sends Range, upstream answers 206 + Content-Range, and we
    // relay both intact instead of collapsing everything to a plain 200.
    let mut out_headers = axum::http::HeaderMap::new();
    if let Ok(v) = content_type.parse() {
        out_headers.insert(axum::http::header::CONTENT_TYPE, v);
    }
    for h in [
        axum::http::header::CONTENT_LENGTH,
        axum::http::header::CONTENT_RANGE,
        axum::http::header::ACCEPT_RANGES,
    ] {
        if let Some(v) = resp.headers().get(&h) {
            out_headers.insert(h, v.clone());
        }
    }

    let stream = resp.bytes_stream().map_err(std::io::Error::other);
    let body = axum::body::Body::from_stream(stream);

    Ok((status, out_headers, body).into_response())
}

// ── Health ─────────────────────────────────────────────────────────────────

/// Simple server health check.
async fn health_check() -> Json<Value> {
    Json(json!({
        "status": "healthy",
        "service": "iptv-rs",
        "version": env!("CARGO_PKG_VERSION"),
        "timestamp": chrono::Utc::now().to_rfc3339()
    }))
}

// ── Export ─────────────────────────────────────────────────────────────────

/// Export a playlist (or the working set) as an M3U file.
async fn export_playlist(
    State(store): State<Arc<AppStore>>,
    Path(name): Path<String>,
) -> Result<impl IntoResponse, AppError> {
    let playlist = if name == "working" {
        store
            .get_working()
            .ok_or_else(|| AppError::NotFound("No working set yet".into()))?
    } else {
        store
            .get_playlist(&name)
            .ok_or_else(|| AppError::NotFound(format!("Playlist '{}' not found", name)))?
    };

    let mut out = String::from("#EXTM3U\n");
    for ch in &playlist.channels {
        let mut attrs = String::new();
        if let Some(ref id) = ch.tvg_id {
            if !id.is_empty() {
                attrs.push_str(&format!(" tvg-id=\"{}\"", id));
            }
        }
        if let Some(ref logo) = ch.logo {
            if !logo.is_empty() {
                attrs.push_str(&format!(" tvg-logo=\"{}\"", logo));
            }
        }
        if let Some(ref group) = ch.group {
            if !group.is_empty() {
                attrs.push_str(&format!(" group-title=\"{}\"", group));
            }
        }
        out.push_str(&format!("#EXTINF:-1{},{}\n{}\n", attrs, ch.name, ch.url));
    }

    let filename = format!("{}.m3u", name);
    Ok((
        [(
            axum::http::header::CONTENT_DISPOSITION,
            format!("attachment; filename=\"{}\"", filename),
        )],
        out,
    ))
}

// ── Metrics ────────────────────────────────────────────────────────────────

/// Server metrics: channel counts, pipeline stats, uptime.
async fn metrics(
    State(store): State<Arc<AppStore>>,
) -> Json<Value> {
    let playlists = store.get_playlists();
    let total_playlist_channels: usize = playlists.values().map(|p| p.total_channels).sum();
    let pipeline = store.get_pipeline();
    let working = store.get_working();

    Json(json!({
        "playlists": playlists.len(),
        "playlist_channels": total_playlist_channels,
        "working_set": working.as_ref().map(|w| json!({
            "channels": w.total_channels,
            "last_updated": w.last_updated,
        })),
        "pipeline": pipeline,
        "epg": store.epg_stats().map(|(ch, prog)| json!({
            "channels": ch,
            "programmes": prog,
        })),
        "version": env!("CARGO_PKG_VERSION"),
    }))
}
