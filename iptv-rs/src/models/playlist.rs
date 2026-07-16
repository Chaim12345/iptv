use serde::{Deserialize, Serialize};

use super::channel::Channel;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Playlist {
    pub name: String,
    pub channels: Vec<Channel>,
    pub last_updated: String,
    pub total_channels: usize,
}

impl Playlist {
    pub fn new(name: String, channels: Vec<Channel>) -> Self {
        let total = channels.len();
        Self {
            name,
            channels,
            last_updated: chrono::Utc::now().to_rfc3339(),
            total_channels: total,
        }
    }
}
