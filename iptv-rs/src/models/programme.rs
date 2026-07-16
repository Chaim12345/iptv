use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Programme {
    pub channel_id: String,
    pub start: String,
    pub stop: String,
    pub title: String,
    #[serde(default, skip_serializing_if = "String::is_empty")]
    pub description: String,
    #[serde(default)]
    pub duration_minutes: i64,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub category: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub icon: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub episode_num: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EpgChannel {
    pub id: String,
    pub name: String,
    #[serde(default, skip_serializing_if = "String::is_empty")]
    pub icon: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EpgData {
    pub channels: Vec<EpgChannel>,
    pub programmes: Vec<Programme>,
    pub last_updated: String,
    pub total_programmes: usize,
}
