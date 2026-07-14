use crate::models::Channel;
use tracing::{debug, warn};

/// Robust M3U/M3U8 parser that extracts all standard EXTINF attributes.
pub struct M3uParser;

impl M3uParser {
    pub fn parse(content: &str) -> Result<Vec<Channel>, String> {
        let lines: Vec<&str> = content.lines().map(|l| l.trim()).collect();

        if lines.is_empty() || !lines[0].starts_with("#EXTM3U") {
            return Err("Missing or incorrect #EXTM3U header".to_string());
        }

        let mut channels = Vec::new();
        let mut current_attrs: Option<ExtinfAttrs> = None;

        for (i, line) in lines.iter().enumerate() {
            if line.starts_with("#EXTINF:") {
                // Parse the EXTINF line
                match Self::parse_extinf(line) {
                    Ok(attrs) => {
                        current_attrs = Some(attrs);
                    }
                    Err(e) => {
                        warn!("Line {}: Failed to parse EXTINF: {}", i + 1, e);
                        current_attrs = None;
                    }
                }
            } else if !line.starts_with('#') && !line.is_empty() && (line.starts_with("http://") || line.starts_with("https://")) {
                // This is a URL line — finalize the current channel
                if let Some(attrs) = current_attrs.take() {
                    channels.push(Channel {
                        name: attrs.display_name,
                        url: line.to_string(),
                        urls: vec![],
                        logo: attrs.logo,
                        group: attrs.group_title,
                        tvg_id: attrs.tvg_id,
                        status: None,
                    });
                } else {
                    warn!("Line {}: URL without preceding EXTINF: {}", i + 1, line);
                }
            }
            // All other lines (comments, blanks, directives) are ignored
        }

        // Warn about orphaned EXTINF at end of file
        if current_attrs.is_some() {
            warn!("Last EXTINF has no trailing URL — ignored");
        }

        debug!("Parsed {} channels from M3U", channels.len());
        Ok(channels)
    }

    fn parse_extinf(line: &str) -> Result<ExtinfAttrs, String> {
        // Format: #EXTINF:<duration> [attributes],<display-name>
        let after_prefix = line
            .strip_prefix("#EXTINF:")
            .ok_or("Missing #EXTINF: prefix")?;

        // Split on the LAST comma (display name may contain commas)
        let comma_idx = after_prefix.rfind(',').ok_or("Missing comma in EXTINF")?;

        let attrs_part = after_prefix[..comma_idx].trim();
        let display_name = after_prefix[comma_idx + 1..].trim().to_string();

        // The first token is the duration
        let mut parts = attrs_part.splitn(2, ' ');
        let _duration_str = parts.next().unwrap_or("-1");
        let rest = parts.next().unwrap_or("");

        // Parse key="value" or key=value pairs from rest
        let (tvg_id, tvg_name, tvg_logo, group_title) = Self::parse_attributes(rest);

        // Use tvg-name as display name if available AND display_name is empty
        let name = if display_name.is_empty() {
            tvg_name.unwrap_or_else(|| "Unnamed Channel".to_string())
        } else {
            display_name
        };

        Ok(ExtinfAttrs {
            display_name: name,
            tvg_id,
            logo: tvg_logo,
            group_title,
        })
    }

    fn parse_attributes(
        attrs_str: &str,
    ) -> (Option<String>, Option<String>, Option<String>, Option<String>) {
        let mut tvg_id = None;
        let mut tvg_name = None;
        let mut tvg_logo = None;
        let mut group_title = None;

        let mut i = 0;
        let chars: Vec<char> = attrs_str.chars().collect();
        let len = chars.len();

        while i < len {
            // Skip whitespace
            while i < len && chars[i].is_whitespace() {
                i += 1;
            }
            if i >= len {
                break;
            }

            // Read key until '='
            let key_start = i;
            while i < len && chars[i] != '=' {
                i += 1;
            }
            if i >= len {
                break;
            }
            let key = chars[key_start..i].iter().collect::<String>().to_lowercase();
            i += 1; // skip '='

            // Read value — quoted or unquoted
            let value: String;
            if i < len && chars[i] == '"' {
                i += 1; // skip opening quote
                let val_start = i;
                while i < len && chars[i] != '"' {
                    i += 1;
                }
                value = chars[val_start..i].iter().collect();
                if i < len {
                    i += 1;
                } // skip closing quote
            } else {
                let val_start = i;
                while i < len && !chars[i].is_whitespace() {
                    i += 1;
                }
                value = chars[val_start..i].iter().collect();
            }

            match key.as_str() {
                "tvg-id" => tvg_id = Some(value),
                "tvg-name" => tvg_name = Some(value),
                "tvg-logo" => tvg_logo = Some(value),
                "group-title" => group_title = Some(value),
                _ => { /* ignore unknown attributes */ }
            }
        }

        (tvg_id, tvg_name, tvg_logo, group_title)
    }
}

#[derive(Debug)]
struct ExtinfAttrs {
    display_name: String,
    tvg_id: Option<String>,
    logo: Option<String>,
    group_title: Option<String>,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_parse() {
        let content = "#EXTM3U\n#EXTINF:-1 tvg-id=\"ch1\" tvg-name=\"Channel 1\" group-title=\"News\",Channel One\nhttp://example.com/stream1";
        let channels = M3uParser::parse(content).unwrap();
        assert_eq!(channels.len(), 1);
        assert_eq!(channels[0].name, "Channel One");
        assert_eq!(channels[0].url, "http://example.com/stream1");
        assert_eq!(channels[0].tvg_id, Some("ch1".to_string()));
        assert_eq!(channels[0].group, Some("News".to_string()));
    }

    #[test]
    fn test_missing_header() {
        let content = "#EXTINF:-1,Channel 1\nhttp://stream1";
        assert!(M3uParser::parse(content).is_err());
    }

    #[test]
    fn test_multiple_channels() {
        let content = "#EXTM3U\n#EXTINF:-1,Channel A\nhttp://a\n#EXTINF:0,Channel B\nhttp://b";
        let channels = M3uParser::parse(content).unwrap();
        assert_eq!(channels.len(), 2);
        assert_eq!(channels[0].name, "Channel A");
        assert_eq!(channels[1].name, "Channel B");
    }

    #[test]
    fn test_unquoted_attributes() {
        let content = "#EXTM3U\n#EXTINF:-1 tvg-id=ch2 tvg-logo=logo.png,Channel Two\nhttp://stream2";
        let channels = M3uParser::parse(content).unwrap();
        assert_eq!(channels.len(), 1);
        assert_eq!(channels[0].tvg_id, Some("ch2".to_string()));
        assert_eq!(channels[0].logo, Some("logo.png".to_string()));
    }
}
