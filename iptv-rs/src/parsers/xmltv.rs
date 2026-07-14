use crate::models::{EpgChannel, EpgData, Programme};
use chrono::{DateTime, NaiveDateTime, TimeZone, Utc};
use quick_xml::events::Event;
use quick_xml::Reader;
use tracing::{debug, warn};

pub struct XmltvParser;

impl XmltvParser {
    pub fn parse(xml_content: &[u8]) -> Result<EpgData, String> {
        Self::parse_window(xml_content, None)
    }

    /// Parse XMLTV, keeping only programmes overlapping [min, max] when a
    /// window is given. Filtering happens during the streaming parse, so a
    /// 300MB guide never materializes fully in memory.
    pub fn parse_window(
        xml_content: &[u8],
        window: Option<(DateTime<Utc>, DateTime<Utc>)>,
    ) -> Result<EpgData, String> {
        let mut reader = Reader::from_reader(xml_content);
        reader.trim_text(true);

        let mut channels: Vec<EpgChannel> = Vec::new();
        let mut programmes: Vec<Programme> = Vec::new();

        let mut buf = Vec::new();
        let mut in_channel = false;
        let mut in_programme = false;
        let mut current_channel = EpgChannel::default();
        let mut current_programme = Programme::default();
        let mut current_text = String::new();
        let mut in_element = String::new();

        loop {
            match reader.read_event_into(&mut buf) {
                Ok(Event::Start(ref e)) => {
                    let name = String::from_utf8_lossy(e.name().as_ref()).to_string();
                    match name.as_str() {
                        "channel" => {
                            in_channel = true;
                            current_channel = EpgChannel::default();
                            current_channel.id = Self::attr(e, "id").unwrap_or_default();
                        }
                        "programme" => {
                            in_programme = true;
                            current_programme = Programme::default();
                            current_programme.channel_id = Self::attr(e, "channel").unwrap_or_default();
                            current_programme.start = Self::attr(e, "start").unwrap_or_default();
                            current_programme.stop = Self::attr(e, "stop").unwrap_or_default();
                        }
                        _ => {
                            if in_channel || in_programme {
                                in_element = name;
                                current_text.clear();
                            }
                        }
                    }
                }
                Ok(Event::End(ref e)) => {
                    let name = String::from_utf8_lossy(e.name().as_ref()).to_string();
                    match name.as_str() {
                        "channel" => {
                            if in_channel && !current_channel.id.is_empty() {
                                channels.push(current_channel.clone());
                            }
                            in_channel = false;
                        }
                        "programme" => {
                            if in_programme && !current_programme.channel_id.is_empty() {
                                // Parse dates and calculate duration
                                let mut in_window = window.is_none();
                                if let (Some(start_dt), Some(stop_dt)) = (
                                    Self::parse_xmltv_date(&current_programme.start),
                                    Self::parse_xmltv_date(&current_programme.stop),
                                ) {
                                    current_programme.start = start_dt.to_rfc3339();
                                    current_programme.stop = stop_dt.to_rfc3339();
                                    current_programme.duration_minutes =
                                        (stop_dt - start_dt).num_minutes();
                                    if let Some((min, max)) = window {
                                        in_window = stop_dt >= min && start_dt <= max;
                                    }
                                }
                                if in_window {
                                    programmes.push(current_programme.clone());
                                }
                            }
                            in_programme = false;
                        }
                        _ => {
                            if in_channel {
                                match in_element.as_str() {
                                    "display-name" => {
                                        current_channel.name = current_text.trim().to_string();
                                    }
                                    "icon" => {
                                        current_channel.icon = current_text.trim().to_string();
                                    }
                                    _ => {}
                                }
                            }
                            if in_programme {
                                match in_element.as_str() {
                                    "title" => current_programme.title = current_text.trim().to_string(),
                                    "desc" => {
                                        current_programme.description = current_text.trim().to_string()
                                    }
                                    "category" => {
                                        let ct = current_text.trim().to_string();
                                        if !ct.is_empty() {
                                            current_programme.category = Some(ct);
                                        }
                                    }
                                    "icon" => {
                                        let ic = current_text.trim().to_string();
                                        if !ic.is_empty() {
                                            current_programme.icon = Some(ic);
                                        }
                                    }
                                    "episode-num" => {
                                        let ep = current_text.trim().to_string();
                                        if !ep.is_empty() {
                                            current_programme.episode_num = Some(ep);
                                        }
                                    }
                                    _ => {}
                                }
                            }
                            in_element.clear();
                        }
                    }
                }
                Ok(Event::Text(ref e)) => {
                    if let Ok(t) = e.unescape() {
                        current_text.push_str(&t);
                    }
                }
                Ok(Event::Eof) => break,
                Err(e) => {
                    warn!("XML parse error: {}", e);
                    return Err(format!("XML parse error: {}", e));
                }
                _ => {}
            }
            buf.clear();
        }

        let total = programmes.len();
        debug!(
            "Parsed EPG: {} channels, {} programmes",
            channels.len(),
            total
        );

        Ok(EpgData {
            channels,
            programmes,
            last_updated: Utc::now().to_rfc3339(),
            total_programmes: total,
        })
    }

    fn attr(e: &quick_xml::events::BytesStart, name: &str) -> Option<String> {
        e.attributes()
            .filter_map(|a| a.ok())
            .find(|a| a.key.as_ref() == name.as_bytes())
            .and_then(|a| String::from_utf8(a.value.to_vec()).ok())
    }

    /// Parse XMLTV date format: YYYYMMDDHHMMSS ±HHMM or YYYYMMDDHHMMSS
    pub fn parse_xmltv_date(s: &str) -> Option<DateTime<Utc>> {
        if s.is_empty() {
            return None;
        }
        let s = s.trim();

        // Try with timezone offset
        if s.len() >= 20 && (s.as_bytes().get(14) == Some(&b' ')) {
            let base = &s[..14];
            let tz = &s[15..];
            if let Ok(naive) = NaiveDateTime::parse_from_str(base, "%Y%m%d%H%M%S") {
                // Parse ±HHMM
                if tz.len() == 5 && (tz.starts_with('+') || tz.starts_with('-')) {
                    let sign: i32 = if tz.starts_with('-') { -1 } else { 1 };
                    let hours: i32 = tz[1..3].parse().ok()?;
                    let mins: i32 = tz[3..5].parse().ok()?;
                    let offset_secs = sign * (hours * 3600 + mins * 60);
                    let dt = Utc
                        .from_utc_datetime(&naive)
                        .checked_sub_signed(chrono::Duration::seconds(offset_secs as i64))?;
                    return Some(dt);
                }
                if tz.eq_ignore_ascii_case("Z") || tz.eq_ignore_ascii_case("UTC") {
                    return Some(Utc.from_utc_datetime(&naive));
                }
            }
        }

        // Try without timezone (assume UTC)
        if let Ok(naive) = NaiveDateTime::parse_from_str(&s[..std::cmp::min(14, s.len())], "%Y%m%d%H%M%S") {
            return Some(Utc.from_utc_datetime(&naive));
        }

        warn!("Failed to parse XMLTV date: {}", s);
        None
    }
}

impl Default for EpgChannel {
    fn default() -> Self {
        Self {
            id: String::new(),
            name: String::new(),
            icon: String::new(),
        }
    }
}

impl Default for Programme {
    fn default() -> Self {
        Self {
            channel_id: String::new(),
            start: String::new(),
            stop: String::new(),
            title: "No Title".to_string(),
            description: String::new(),
            duration_minutes: 0,
            category: None,
            icon: None,
            episode_num: None,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::Timelike;

    #[test]
    fn test_basic_epg() {
        let xml = r#"<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE tv SYSTEM "xmltv.dtd">
<tv generator-info-name="test">
  <channel id="ch1">
    <display-name lang="en">Channel 1</display-name>
    <icon src="http://logo/c1.png"/>
  </channel>
  <programme channel="ch1" start="20231026080000 +0000" stop="20231026090000 +0000">
    <title lang="en">Morning News</title>
    <desc lang="en">The morning news.</desc>
  </programme>
</tv>"#;
        let epg = XmltvParser::parse(xml.as_bytes()).unwrap();
        assert_eq!(epg.channels.len(), 1);
        assert_eq!(epg.channels[0].id, "ch1");
        assert_eq!(epg.channels[0].name, "Channel 1");
        assert_eq!(epg.programmes.len(), 1);
        assert_eq!(epg.programmes[0].title, "Morning News");
        assert_eq!(epg.programmes[0].duration_minutes, 60);
    }

    #[test]
    fn test_date_parsing_utc() {
        let dt = XmltvParser::parse_xmltv_date("20231101100000 +0000");
        assert!(dt.is_some());
        let dt = dt.unwrap();
        assert_eq!(dt.hour(), 10);
    }

    #[test]
    fn test_date_parsing_offset() {
        let dt = XmltvParser::parse_xmltv_date("20231101100000 +0200");
        assert!(dt.is_some());
        assert_eq!(dt.unwrap().hour(), 8); // 10:00 +0200 = 08:00 UTC
    }

    #[test]
    fn test_date_no_timezone() {
        let dt = XmltvParser::parse_xmltv_date("20231101100000");
        assert!(dt.is_some());
        assert_eq!(dt.unwrap().hour(), 10); // assumes UTC
    }
}
