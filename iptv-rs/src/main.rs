use std::net::SocketAddr;
use std::sync::Arc;

use axum::Router;
use tokio::net::TcpListener;
use tokio::signal;
use tower_http::cors::{Any, CorsLayer};
use tower_http::services::ServeDir;
use tower_http::trace::TraceLayer;
use tracing::info;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

mod config;
mod error;
mod models;
mod parsers;
mod routes;
mod services;
mod store;

use config::AppConfig;
use services::pipeline;
use store::AppStore;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(EnvFilter::try_from_default_env().unwrap_or_else(|_| "iptv_rs=debug,tower_http=debug".into()))
        .with(tracing_subscriber::fmt::layer())
        .init();

    let config = AppConfig::from_env();
    config.ensure_dirs()?;

    info!("Upload folder: {:?}", config.upload_folder);
    info!("EPG folder: {:?}", config.epg_folder);

    let store = AppStore::new(config.clone());

    // Load existing data from disk on startup
    store.load_all().await?;

    let store = Arc::new(store);

    // Curation pipeline: fetch all sources, dedupe, probe streams, merge EPG.
    // Skips itself when the working set is still fresh.
    {
        let bg_store = Arc::clone(&store);
        tokio::spawn(async move {
            pipeline::run(bg_store, false).await;
        });
    }

    // Serve the built Vite frontend (index.html + hashed /assets/* + wasm).
    // Path is crate-relative so it works regardless of the launch directory.
    // ServeDir serves index.html for "/" by default; API routes match first.
    let static_dir = ServeDir::new(concat!(env!("CARGO_MANIFEST_DIR"), "/static"));

    // Build router
    let app = Router::new()
        .merge(routes::build(store.clone()))
        .fallback_service(static_dir)
        // axum's default body limit is 2 MB — far too small for EPG uploads
        .layer(axum::extract::DefaultBodyLimit::max(config.max_upload_bytes))
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods(Any)
                .allow_headers(Any),
        )
        .layer(TraceLayer::new_for_http());

    let addr = SocketAddr::from(([0, 0, 0, 0], config.port));
    info!("IPTV Player (Rust) starting on http://{}", addr);

    let listener = TcpListener::bind(addr).await?;

    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await?;

    info!("Server stopped.");
    Ok(())
}

async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c().await.expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }

    info!("Shutdown signal received, starting graceful shutdown...");
}
