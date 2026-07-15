# Multi-stage build for IPTV-RS
# Stage 1: Build WASM, frontend, and Rust binary
FROM rust:1-bookworm AS builder

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install wasm-pack
RUN cargo install wasm-pack

# Set working directory
WORKDIR /app

# Copy all source code
COPY . .

# Build WASM module
WORKDIR /app/iptv-wasm
RUN wasm-pack build --target web --release

# Build frontend
WORKDIR /app/frontend
RUN npm ci
RUN npm run build

# Build Rust binary
WORKDIR /app/iptv-rs
RUN cargo build --release

# Stage 2: Runtime
FROM debian:bookworm-slim

# Install runtime dependencies
RUN apt-get update \
    && apt-get install -y \
        ca-certificates \
        libssl3 \
    && rm -rf /var/lib/apt/lists/*

# Create app directory and data directory
RUN mkdir -p /app/data

# Copy binary
COPY --from=builder /app/iptv-rs/target/release/iptv-rs /app/iptv-rs

# Copy static assets (frontend build output)
COPY --from=builder /app/iptv-rs/static /app/static

# Set working directory
WORKDIR /app

# Set environment variables
ENV IPTV_PORT=5000
ENV IPTV_DATA_DIR=/app/data

# Expose port
EXPOSE 5000

# Run the binary
CMD ["./iptv-rs"]
