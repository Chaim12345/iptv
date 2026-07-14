use serde::{Deserialize, Serialize};

/// A curated free/public IPTV or EPG source.
/// Every URL verified alive as of 2026-07-14.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CuratedSource {
    pub name: String,
    pub url: String,
    /// "m3u" or "epg"
    pub source_type: String,
    /// ISO 3166-1 alpha-2 country code, or "Global"/"Multi"
    pub region: String,
    pub description: String,
    /// Fetched automatically on server startup.
    pub auto_fetch: bool,

    // ── New metadata fields ──

    /// ISO 639-1 language code(s), comma-separated (e.g. "en", "en,es,fr")
    #[serde(default)]
    pub language: String,
    /// Source category for filtering in the UI
    #[serde(default)]
    pub category: SourceCategory,
    /// How often the source is updated upstream (human-readable)
    #[serde(default)]
    pub update_frequency: String,
    /// Reliability tier based on uptime history and maintenance activity
    #[serde(default)]
    pub reliability: Reliability,
    /// Approximate channel count (0 = unknown)
    #[serde(default)]
    pub channel_count: usize,
    /// GitHub stars or equivalent popularity metric (0 = N/A)
    #[serde(default)]
    pub popularity: usize,
    /// Tags for search/filter: ["fast", "news", "sports", "kids", ...]
    #[serde(default)]
    pub tags: Vec<String>,
    /// Upstream project URL (GitHub, website) — not the data URL
    #[serde(default)]
    pub upstream_url: String,
    /// Last date this entry was verified alive (YYYY-MM-DD)
    #[serde(default)]
    pub verified_date: String,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum SourceCategory {
    #[default]
    General,
    News,
    Sports,
    Entertainment,
    Movies,
    Kids,
    Music,
    Documentary,
    Lifestyle,
    Education,
    Religious,
    Fast, // Free Ad-Supported Streaming TV (Pluto, Samsung, etc.)
    Regional,
    Radio,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum Reliability {
    /// Actively maintained, daily updates, 99%+ uptime
    #[default]
    High,
    /// Regular updates, occasional downtime
    Medium,
    /// Irregular updates, may go stale
    Low,
    /// Community-maintained, variable quality
    Community,
}

/// Builder for source definitions.
fn source() -> SourceBuilder {
    SourceBuilder::default()
}

#[derive(Default)]
struct SourceBuilder {
    name: String,
    url: String,
    source_type: String,
    region: String,
    description: String,
    auto_fetch: bool,
    language: String,
    category: SourceCategory,
    update_frequency: String,
    reliability: Reliability,
    channel_count: usize,
    popularity: usize,
    tags: Vec<String>,
    upstream_url: String,
    verified_date: String,
}

impl SourceBuilder {
    fn name(mut self, v: &str) -> Self { self.name = v.into(); self }
    fn url(mut self, v: &str) -> Self { self.url = v.into(); self }
    fn m3u(mut self) -> Self { self.source_type = "m3u".into(); self }
    fn epg(mut self) -> Self { self.source_type = "epg".into(); self }
    fn region(mut self, v: &str) -> Self { self.region = v.into(); self }
    fn description(mut self, v: &str) -> Self { self.description = v.into(); self }
    fn auto_fetch(mut self, v: bool) -> Self { self.auto_fetch = v; self }
    fn language(mut self, v: &str) -> Self { self.language = v.into(); self }
    fn category(mut self, v: SourceCategory) -> Self { self.category = v; self }
    fn update_frequency(mut self, v: &str) -> Self { self.update_frequency = v.into(); self }
    fn reliability(mut self, v: Reliability) -> Self { self.reliability = v; self }
    fn channel_count(mut self, v: usize) -> Self { self.channel_count = v; self }
    fn popularity(mut self, v: usize) -> Self { self.popularity = v; self }
    fn tags(mut self, v: Vec<&str>) -> Self { self.tags = v.into_iter().map(String::from).collect(); self }
    fn upstream_url(mut self, v: &str) -> Self { self.upstream_url = v.into(); self }

    fn build(self) -> CuratedSource {
        CuratedSource {
            name: self.name,
            url: self.url,
            source_type: self.source_type,
            region: self.region,
            description: self.description,
            auto_fetch: self.auto_fetch,
            language: self.language,
            category: self.category,
            update_frequency: self.update_frequency,
            reliability: self.reliability,
            channel_count: self.channel_count,
            popularity: self.popularity,
            tags: self.tags,
            upstream_url: self.upstream_url,
            verified_date: if self.verified_date.is_empty() { "2026-07-14".into() } else { self.verified_date },
        }
    }
}

/// Returns all pre-configured free IPTV and EPG sources.
pub fn get_curated_sources() -> Vec<CuratedSource> {
    vec![
        // ═══════════════════════════════════════════════════════════════════
        // M3U: iptv-org — THE gold standard (73k+ stars)
        // ═══════════════════════════════════════════════════════════════════

        source()
            .name("iptv-org: All Channels")
            .url("https://iptv-org.github.io/iptv/index.m3u")
            .m3u()
            .region("Global")
            .description("Full iptv-org index — all categorized channels worldwide. The single largest curated collection of free-to-air IPTV streams.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::General)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(10000)
            .popularity(73000)
            .tags(vec!["global", "all", "master", "curated"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: By Country")
            .url("https://iptv-org.github.io/iptv/index.country.m3u")
            .m3u()
            .region("Global")
            .description("iptv-org playlists organized by country — channels grouped with country metadata.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(10000)
            .popularity(73000)
            .tags(vec!["global", "country", "grouped"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: By Category")
            .url("https://iptv-org.github.io/iptv/index.category.m3u")
            .m3u()
            .region("Global")
            .description("iptv-org playlists organized by category (news, sports, movies, kids, etc.).")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::General)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(10000)
            .popularity(73000)
            .tags(vec!["global", "category", "grouped"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        // ── iptv-org: Individual categories ──

        source()
            .name("iptv-org: News")
            .url("https://iptv-org.github.io/iptv/categories/news.m3u")
            .m3u()
            .region("Global")
            .description("News channels worldwide from iptv-org — BBC, CNN International, Al Jazeera, France 24, DW, etc.")
            .auto_fetch(true)
            .language("multi")
            .category(SourceCategory::News)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(700)
            .popularity(73000)
            .tags(vec!["news", "global", "live"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Sports")
            .url("https://iptv-org.github.io/iptv/categories/sports.m3u")
            .m3u()
            .region("Global")
            .description("Sports channels worldwide — ESPN, beIN, Sky Sports, regional sports networks.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Sports)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(400)
            .popularity(73000)
            .tags(vec!["sports", "global", "live"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Movies")
            .url("https://iptv-org.github.io/iptv/categories/movies.m3u")
            .m3u()
            .region("Global")
            .description("Movie channels — classic cinema, indie films, genre-specific movie channels.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Movies)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(350)
            .popularity(73000)
            .tags(vec!["movies", "global"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Entertainment")
            .url("https://iptv-org.github.io/iptv/categories/entertainment.m3u")
            .m3u()
            .region("Global")
            .description("General entertainment channels — variety, talk shows, reality TV, comedy.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Entertainment)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(1200)
            .popularity(73000)
            .tags(vec!["entertainment", "global"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Kids")
            .url("https://iptv-org.github.io/iptv/categories/kids.m3u")
            .m3u()
            .region("Global")
            .description("Children's programming — cartoons, educational content, family-friendly channels.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Kids)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(200)
            .popularity(73000)
            .tags(vec!["kids", "family", "global"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Music")
            .url("https://iptv-org.github.io/iptv/categories/music.m3u")
            .m3u()
            .region("Global")
            .description("Music channels — MTV, VH1, regional music TV, concert channels.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Music)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(300)
            .popularity(73000)
            .tags(vec!["music", "global"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Documentary")
            .url("https://iptv-org.github.io/iptv/categories/documentary.m3u")
            .m3u()
            .region("Global")
            .description("Documentary and factual channels — nature, science, history, true crime.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Documentary)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(227)
            .popularity(73000)
            .tags(vec!["documentary", "global"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Education")
            .url("https://iptv-org.github.io/iptv/categories/education.m3u")
            .m3u()
            .region("Global")
            .description("Educational channels — university lectures, science, learning platforms.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Education)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(150)
            .popularity(73000)
            .tags(vec!["education", "learning", "global"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Comedy")
            .url("https://iptv-org.github.io/iptv/categories/comedy.m3u")
            .m3u()
            .region("Global")
            .description("Comedy channels — stand-up, sitcoms, sketch comedy, improv.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Entertainment)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(219)
            .popularity(73000)
            .tags(vec!["comedy", "global"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Culture")
            .url("https://iptv-org.github.io/iptv/categories/culture.m3u")
            .m3u()
            .region("Global")
            .description("Culture and arts channels — museums, theatre, literature, cultural programming.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Lifestyle)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(186)
            .popularity(73000)
            .tags(vec!["culture", "arts", "global"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Cooking")
            .url("https://iptv-org.github.io/iptv/categories/cooking.m3u")
            .m3u()
            .region("Global")
            .description("Cooking and food channels — recipes, restaurant tours, food culture.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Lifestyle)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(53)
            .popularity(73000)
            .tags(vec!["cooking", "food", "global"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Animation")
            .url("https://iptv-org.github.io/iptv/categories/animation.m3u")
            .m3u()
            .region("Global")
            .description("Animation channels — anime, cartoons, animated series.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Kids)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(171)
            .popularity(73000)
            .tags(vec!["animation", "anime", "global"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Classic")
            .url("https://iptv-org.github.io/iptv/categories/classic.m3u")
            .m3u()
            .region("Global")
            .description("Classic TV and retro programming — vintage shows, classic cinema, nostalgia channels.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Entertainment)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(111)
            .popularity(73000)
            .tags(vec!["classic", "retro", "global"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        // ── iptv-org: Key countries ──

        source()
            .name("iptv-org: United States")
            .url("https://iptv-org.github.io/iptv/countries/us.m3u")
            .m3u()
            .region("US")
            .description("US free-to-air channels — local news, public access, PBS, network affiliates.")
            .auto_fetch(true)
            .language("en")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(800)
            .popularity(73000)
            .tags(vec!["us", "english", "north-america"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: United Kingdom")
            .url("https://iptv-org.github.io/iptv/countries/uk.m3u")
            .m3u()
            .region("UK")
            .description("UK free-to-air channels — BBC, ITV, Channel 4, Sky News, and regional UK channels.")
            .auto_fetch(true)
            .language("en")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(200)
            .popularity(73000)
            .tags(vec!["uk", "english", "europe", "freeview"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Canada")
            .url("https://iptv-org.github.io/iptv/countries/ca.m3u")
            .m3u()
            .region("CA")
            .description("Canadian free-to-air channels — CBC, CTV, Global, TVA, and provincial broadcasters.")
            .auto_fetch(false)
            .language("en,fr")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(150)
            .popularity(73000)
            .tags(vec!["canada", "english", "french", "north-america"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: France")
            .url("https://iptv-org.github.io/iptv/countries/fr.m3u")
            .m3u()
            .region("FR")
            .description("French free-to-air channels — France TV, TF1, M6, Arte, BFM, and regional channels.")
            .auto_fetch(false)
            .language("fr")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(180)
            .popularity(73000)
            .tags(vec!["france", "french", "europe"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Germany")
            .url("https://iptv-org.github.io/iptv/countries/de.m3u")
            .m3u()
            .region("DE")
            .description("German free-to-air channels — ARD, ZDF, RTL, Sat.1, ProSieben, and regional channels.")
            .auto_fetch(false)
            .language("de")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(200)
            .popularity(73000)
            .tags(vec!["germany", "german", "europe"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Spain")
            .url("https://iptv-org.github.io/iptv/countries/es.m3u")
            .m3u()
            .region("ES")
            .description("Spanish free-to-air channels — TVE, Antena 3, Telecinco, La Sexta, and regional channels.")
            .auto_fetch(false)
            .language("es")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(200)
            .popularity(73000)
            .tags(vec!["spain", "spanish", "europe"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Italy")
            .url("https://iptv-org.github.io/iptv/countries/it.m3u")
            .m3u()
            .region("IT")
            .description("Italian free-to-air channels — Rai, Mediaset, LA7, and regional Italian channels.")
            .auto_fetch(false)
            .language("it")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(200)
            .popularity(73000)
            .tags(vec!["italy", "italian", "europe"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Brazil")
            .url("https://iptv-org.github.io/iptv/countries/br.m3u")
            .m3u()
            .region("BR")
            .description("Brazilian free-to-air channels — Globo, SBT, Record, Band, and regional channels.")
            .auto_fetch(false)
            .language("pt")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(250)
            .popularity(73000)
            .tags(vec!["brazil", "portuguese", "south-america"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: India")
            .url("https://iptv-org.github.io/iptv/countries/in.m3u")
            .m3u()
            .region("IN")
            .description("Indian free-to-air channels — DD National, regional language channels, news, and entertainment.")
            .auto_fetch(false)
            .language("hi,en,ta,te,bn")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(400)
            .popularity(73000)
            .tags(vec!["india", "hindi", "asia"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Japan")
            .url("https://iptv-org.github.io/iptv/countries/jp.m3u")
            .m3u()
            .region("JP")
            .description("Japanese free-to-air channels — NHK, Fuji TV, TBS, TV Asahi, and regional broadcasters.")
            .auto_fetch(false)
            .language("ja")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(100)
            .popularity(73000)
            .tags(vec!["japan", "japanese", "asia"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Mexico")
            .url("https://iptv-org.github.io/iptv/countries/mx.m3u")
            .m3u()
            .region("MX")
            .description("Mexican free-to-air channels — Televisa, TV Azteca, Canal Once, and state channels.")
            .auto_fetch(false)
            .language("es")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(180)
            .popularity(73000)
            .tags(vec!["mexico", "spanish", "north-america"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Israel")
            .url("https://iptv-org.github.io/iptv/countries/il.m3u")
            .m3u()
            .region("IL")
            .description("Israeli free-to-air channels — Kan 11, Keshet 12, Reshet 13, Channel 14.")
            .auto_fetch(false)
            .language("he,ar")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(30)
            .popularity(73000)
            .tags(vec!["israel", "hebrew", "middle-east"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Russia")
            .url("https://iptv-org.github.io/iptv/countries/ru.m3u")
            .m3u()
            .region("RU")
            .description("Russian free-to-air channels — Channel One, Russia 1, NTV, and regional broadcasters.")
            .auto_fetch(false)
            .language("ru")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(250)
            .popularity(73000)
            .tags(vec!["russia", "russian", "europe", "asia"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Turkey")
            .url("https://iptv-org.github.io/iptv/countries/tr.m3u")
            .m3u()
            .region("TR")
            .description("Turkish free-to-air channels — TRT, ATV, Kanal D, Show TV, and regional channels.")
            .auto_fetch(false)
            .language("tr")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(150)
            .popularity(73000)
            .tags(vec!["turkey", "turkish", "europe", "asia"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Australia")
            .url("https://iptv-org.github.io/iptv/countries/au.m3u")
            .m3u()
            .region("AU")
            .description("Australian free-to-air channels — ABC, SBS, Seven, Nine, Ten, and regional channels.")
            .auto_fetch(false)
            .language("en")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(80)
            .popularity(73000)
            .tags(vec!["australia", "english", "oceania"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: South Korea")
            .url("https://iptv-org.github.io/iptv/countries/kr.m3u")
            .m3u()
            .region("KR")
            .description("South Korean free-to-air channels — KBS, MBC, SBS, JTBC, and cable channels.")
            .auto_fetch(false)
            .language("ko")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(80)
            .popularity(73000)
            .tags(vec!["korea", "korean", "asia"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: Arabic")
            .url("https://iptv-org.github.io/iptv/languages/ara.m3u")
            .m3u()
            .region("Multi")
            .description("Arabic-language channels worldwide — Al Jazeera, MBC, Rotana, and regional Arab channels.")
            .auto_fetch(false)
            .language("ar")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(500)
            .popularity(73000)
            .tags(vec!["arabic", "middle-east", "north-africa"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        source()
            .name("iptv-org: China")
            .url("https://iptv-org.github.io/iptv/countries/cn.m3u")
            .m3u()
            .region("CN")
            .description("Chinese free-to-air channels — CCTV, provincial stations, and regional broadcasters.")
            .auto_fetch(false)
            .language("zh")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(300)
            .popularity(73000)
            .tags(vec!["china", "chinese", "asia"])
            .upstream_url("https://github.com/iptv-org/iptv")
            .build(),

        // ═══════════════════════════════════════════════════════════════════
        // M3U: Free-TV — Curated free-to-air streams
        // ═══════════════════════════════════════════════════════════════════

        source()
            .name("Free-TV: Master Playlist")
            .url("https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8")
            .m3u()
            .region("Global")
            .description("Curated free-to-air IPTV playlist — focused on legally distributable content. Smaller but higher quality than iptv-org.")
            .auto_fetch(true)
            .language("multi")
            .category(SourceCategory::General)
            .update_frequency("weekly")
            .reliability(Reliability::High)
            .channel_count(3000)
            .popularity(1500)
            .tags(vec!["free", "curated", "legal", "global"])
            .upstream_url("https://github.com/Free-TV/IPTV")
            .build(),

        // ═══════════════════════════════════════════════════════════════════
        // M3U: Auto-verified working channels
        // ═══════════════════════════════════════════════════════════════════

        source()
            .name("world_ip_tv: 24/7 Verified Channels")
            .url("https://raw.githubusercontent.com/Romaxa55/world_ip_tv/main/playlist.m3u")
            .m3u()
            .region("Global")
            .description("Auto-verified working channels updated daily via GitHub Actions. Every channel is probed alive before inclusion.")
            .auto_fetch(true)
            .language("multi")
            .category(SourceCategory::General)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(2000)
            .popularity(40)
            .tags(vec!["verified", "alive", "auto-updated", "global"])
            .upstream_url("https://github.com/Romaxa55/world_ip_tv")
            .build(),

        // ═══════════════════════════════════════════════════════════════════
        // M3U: FAST services (Free Ad-Supported Streaming TV)
        // ═══════════════════════════════════════════════════════════════════

        // NOTE: mjh.nz M3U8 playlist endpoints were removed (404 as of 2026-07-14).
        // Their EPG XML endpoints still work — see the EPG section below.
        // FAST channels (Pluto, Samsung, Plex, Roku) are included in iptv-org playlists.

        // ═══════════════════════════════════════════════════════════════════
        // EPG: iptv-org/epg — the master EPG tool (3100+ stars)
        // ═══════════════════════════════════════════════════════════════════

        source()
            .name("EPG: iptv-org (US — tvguide.com)")
            .url("https://epg.pw/xmltv/epg_US.xml.gz")
            .epg()
            .region("US")
            .description("US EPG from epg.pw covering 1000+ channels — sourced from tvguide.com, zap2it, and others.")
            .auto_fetch(true)
            .language("en")
            .category(SourceCategory::General)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(1000)
            .popularity(3100)
            .tags(vec!["epg", "us", "xmltv", "tvguide"])
            .upstream_url("https://github.com/iptv-org/epg")
            .build(),

        source()
            .name("EPG: UK (tvguide.co.uk)")
            .url("https://epg.pw/xmltv/epg_GB.xml.gz")
            .epg()
            .region("UK")
            .description("UK EPG from epg.pw — Freeview, Sky, Freesat channels with 7-day schedules.")
            .auto_fetch(true)
            .language("en")
            .category(SourceCategory::General)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(400)
            .popularity(3100)
            .tags(vec!["epg", "uk", "xmltv", "freeview", "sky"])
            .upstream_url("https://github.com/iptv-org/epg")
            .build(),

        source()
            .name("EPG: Germany (epg.pw)")
            .url("https://epg.pw/xmltv/epg_DE.xml.gz")
            .epg()
            .region("DE")
            .description("German EPG from epg.pw — ARD, ZDF, RTL, Sat.1, and regional German channels.")
            .auto_fetch(false)
            .language("de")
            .category(SourceCategory::General)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(200)
            .popularity(3100)
            .tags(vec!["epg", "germany", "xmltv"])
            .upstream_url("https://github.com/iptv-org/epg")
            .build(),

        source()
            .name("EPG: France (epg.pw)")
            .url("https://epg.pw/xmltv/epg_FR.xml.gz")
            .epg()
            .region("FR")
            .description("French EPG from epg.pw — France TV, TF1, M6, Canal+, and regional channels.")
            .auto_fetch(false)
            .language("fr")
            .category(SourceCategory::General)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(200)
            .popularity(3100)
            .tags(vec!["epg", "france", "xmltv"])
            .upstream_url("https://github.com/iptv-org/epg")
            .build(),

        source()
            .name("EPG: Canada (epg.pw)")
            .url("https://epg.pw/xmltv/epg_CA.xml.gz")
            .epg()
            .region("CA")
            .description("Canadian EPG from epg.pw — CBC, CTV, Global, TVA, Sportsnet, TSN.")
            .auto_fetch(false)
            .language("en,fr")
            .category(SourceCategory::General)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(200)
            .popularity(3100)
            .tags(vec!["epg", "canada", "xmltv"])
            .upstream_url("https://github.com/iptv-org/epg")
            .build(),

        source()
            .name("EPG: Spain (epg.pw)")
            .url("https://epg.pw/xmltv/epg_ES.xml.gz")
            .epg()
            .region("ES")
            .description("Spanish EPG from epg.pw — TVE, Antena 3, Telecinco, Movistar+, and regional channels.")
            .auto_fetch(false)
            .language("es")
            .category(SourceCategory::General)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(150)
            .popularity(3100)
            .tags(vec!["epg", "spain", "xmltv"])
            .upstream_url("https://github.com/iptv-org/epg")
            .build(),

        source()
            .name("EPG: Italy (epg.pw)")
            .url("https://epg.pw/xmltv/epg_IT.xml.gz")
            .epg()
            .region("IT")
            .description("Italian EPG from epg.pw — Rai, Mediaset, Sky Italia, LA7, and regional channels.")
            .auto_fetch(false)
            .language("it")
            .category(SourceCategory::General)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(150)
            .popularity(3100)
            .tags(vec!["epg", "italy", "xmltv"])
            .upstream_url("https://github.com/iptv-org/epg")
            .build(),

        source()
            .name("EPG: Australia (epg.pw)")
            .url("https://epg.pw/xmltv/epg_AU.xml.gz")
            .epg()
            .region("AU")
            .description("Australian EPG from epg.pw — ABC, SBS, Seven, Nine, Ten, Foxtel channels.")
            .auto_fetch(false)
            .language("en")
            .category(SourceCategory::General)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(100)
            .popularity(3100)
            .tags(vec!["epg", "australia", "xmltv"])
            .upstream_url("https://github.com/iptv-org/epg")
            .build(),

        source()
            .name("EPG: Brazil (epg.pw)")
            .url("https://epg.pw/xmltv/epg_BR.xml.gz")
            .epg()
            .region("BR")
            .description("Brazilian EPG from epg.pw — Globo, SBT, Record, Band, and pay TV channels.")
            .auto_fetch(false)
            .language("pt")
            .category(SourceCategory::General)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(150)
            .popularity(3100)
            .tags(vec!["epg", "brazil", "xmltv"])
            .upstream_url("https://github.com/iptv-org/epg")
            .build(),

        source()
            .name("EPG: India (epg.pw)")
            .url("https://epg.pw/xmltv/epg_IN.xml.gz")
            .epg()
            .region("IN")
            .description("Indian EPG from epg.pw — DD, Star, Sony, Zee, Colors, and regional channels.")
            .auto_fetch(false)
            .language("hi,en,ta,te")
            .category(SourceCategory::General)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(300)
            .popularity(3100)
            .tags(vec!["epg", "india", "xmltv"])
            .upstream_url("https://github.com/iptv-org/epg")
            .build(),

        // ── EPG: i.mjh.nz (FAST services) ──

        source()
            .name("EPG: Pluto TV US (mjh.nz)")
            .url("https://i.mjh.nz/PlutoTV/us.xml.gz")
            .epg()
            .region("US")
            .description("Pluto TV US guide — matches Pluto streams in iptv-org/Free-TV with full programme data.")
            .auto_fetch(true)
            .language("en")
            .category(SourceCategory::Fast)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(250)
            .popularity(0)
            .tags(vec!["epg", "pluto", "fast", "us", "xmltv"])
            .upstream_url("https://i.mjh.nz")
            .build(),

        source()
            .name("EPG: Pluto TV All Regions (mjh.nz)")
            .url("https://i.mjh.nz/PlutoTV/all.xml.gz")
            .epg()
            .region("Global")
            .description("Pluto TV guide for all regions — US, UK, DE, AT, CH, and more.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Fast)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(500)
            .popularity(0)
            .tags(vec!["epg", "pluto", "fast", "global", "xmltv"])
            .upstream_url("https://i.mjh.nz")
            .build(),

        source()
            .name("EPG: Samsung TV Plus (mjh.nz)")
            .url("https://i.mjh.nz/SamsungTVPlus/all.xml.gz")
            .epg()
            .region("Global")
            .description("Samsung TV Plus guide — all regions with full programme schedules.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Fast)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(300)
            .popularity(0)
            .tags(vec!["epg", "samsung", "fast", "global", "xmltv"])
            .upstream_url("https://i.mjh.nz")
            .build(),

        source()
            .name("EPG: Plex TV (mjh.nz)")
            .url("https://i.mjh.nz/Plex/all.xml.gz")
            .epg()
            .region("Global")
            .description("Plex live TV guide — all free Plex channels with programme data.")
            .auto_fetch(false)
            .language("multi")
            .category(SourceCategory::Fast)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(200)
            .popularity(0)
            .tags(vec!["epg", "plex", "fast", "global", "xmltv"])
            .upstream_url("https://i.mjh.nz")
            .build(),

        source()
            .name("EPG: Roku Channel (mjh.nz)")
            .url("https://i.mjh.nz/Roku/all.xml.gz")
            .epg()
            .region("US")
            .description("The Roku Channel guide — free live TV with programme schedules.")
            .auto_fetch(false)
            .language("en")
            .category(SourceCategory::Fast)
            .update_frequency("daily")
            .reliability(Reliability::Medium)
            .channel_count(150)
            .popularity(0)
            .tags(vec!["epg", "roku", "fast", "us", "xmltv"])
            .upstream_url("https://i.mjh.nz")
            .build(),

        source()
            .name("EPG: PBS (mjh.nz)")
            .url("https://i.mjh.nz/PBS/all.xml.gz")
            .epg()
            .region("US")
            .description("PBS stations guide — public broadcasting programme schedules.")
            .auto_fetch(false)
            .language("en")
            .category(SourceCategory::Education)
            .update_frequency("daily")
            .reliability(Reliability::High)
            .channel_count(100)
            .popularity(0)
            .tags(vec!["epg", "pbs", "public", "us", "xmltv"])
            .upstream_url("https://i.mjh.nz")
            .build(),

        // ── EPG: Community-maintained ──

        source()
            .name("EPG: UK Freeview (dp247)")
            .url("https://raw.githubusercontent.com/dp247/Freeview-EPG/master/epg.xml")
            .epg()
            .region("UK")
            .description("Open-source UK Freeview TV + radio guide — community-maintained, covers all Freeview channels.")
            .auto_fetch(false)
            .language("en")
            .category(SourceCategory::Regional)
            .update_frequency("daily")
            .reliability(Reliability::Community)
            .channel_count(100)
            .popularity(180)
            .tags(vec!["epg", "uk", "freeview", "radio", "xmltv"])
            .upstream_url("https://github.com/dp247/Freeview-EPG")
            .build(),

        source()
            .name("EPG: US/CA/UK/MX (EPGTalk)")
            .url("https://raw.githubusercontent.com/acidjesuz/EPGTalk/master/guide.xml")
            .epg()
            .region("Multi")
            .description("Multi-region EPG covering US, Canada, UK, and Mexico — comprehensive channel coverage with detailed programme info.")
            .auto_fetch(false)
            .language("en,es")
            .category(SourceCategory::General)
            .update_frequency("daily")
            .reliability(Reliability::Community)
            .channel_count(500)
            .popularity(130)
            .tags(vec!["epg", "us", "canada", "uk", "mexico", "xmltv"])
            .upstream_url("https://github.com/acidjesuz/EPGTalk")
            .build(),

        // NOTE: suzukua/epg and mathewmeconry/TV7_EPG_Data repos removed (404 as of 2026-07-14).

        // ═══════════════════════════════════════════════════════════════════
        // M3U: additional Israel coverage
        // ═══════════════════════════════════════════════════════════════════

        source()
            .name("Israel: MichaelJorky")
            .url("https://raw.githubusercontent.com/MichaelJorky/Free-IPTV-M3U-Playlist/main/iptv-israel.m3u")
            .m3u()
            .region("IL")
            .description("Community-maintained Israeli channel list — supplements iptv-org/Free-TV Israel coverage.")
            .auto_fetch(false)
            .language("he")
            .category(SourceCategory::Regional)
            .update_frequency("weekly")
            .reliability(Reliability::Community)
            .channel_count(21)
            .tags(vec!["israel", "hebrew", "regional"])
            .upstream_url("https://github.com/MichaelJorky/Free-IPTV-M3U-Playlist")
            .build(),

        // ═══════════════════════════════════════════════════════════════════
        // VOD: on-demand movies & series (public-domain, archive.org hosted)
        // ═══════════════════════════════════════════════════════════════════

        source()
            .name("VOD: Classic Sci-Fi (Archive.org)")
            .url("https://raw.githubusercontent.com/jromero88/iptv/master/SciFi.m3u")
            .m3u()
            .region("Global")
            .description("On-demand public-domain sci-fi movies and classic series, streamed from the Internet Archive. Fully legal.")
            .auto_fetch(false)
            .language("en")
            .category(SourceCategory::Movies)
            .update_frequency("static")
            .reliability(Reliability::Community)
            .channel_count(111)
            .tags(vec!["vod", "movies", "series", "public-domain", "archive"])
            .upstream_url("https://github.com/jromero88/iptv")
            .build(),

        source()
            .name("jromero88: Live Mix")
            .url("https://raw.githubusercontent.com/jromero88/iptv/master/IPTV.m3u")
            .m3u()
            .region("Multi")
            .description("Community multi-country live channel mix (Mexico, US, UK, Spain and more).")
            .auto_fetch(false)
            .language("es,en")
            .category(SourceCategory::General)
            .update_frequency("weekly")
            .reliability(Reliability::Community)
            .channel_count(160)
            .tags(vec!["live", "latam", "multi"])
            .upstream_url("https://github.com/jromero88/iptv")
            .build(),
    ]
}
