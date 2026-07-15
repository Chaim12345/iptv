# Graph Report - iptv  (2026-07-15)

## Corpus Check
- 33 files · ~96,131 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1692 nodes · 3939 edges · 91 communities (55 shown, 36 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 165 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7b86fc19`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]

## God Nodes (most connected - your core abstractions)
1. `$()` - 127 edges
2. `zi()` - 68 edges
3. `Le` - 67 edges
4. `AppStore` - 50 edges
5. `xu` - 50 edges
6. `Uc` - 38 edges
7. `At` - 37 edges
8. `kc` - 32 edges
9. `_l()` - 31 edges
10. `hh` - 30 edges

## Surprising Connections (you probably didn't know these)
- `delete_playlist()` --references--> `state`  [EXTRACTED]
  iptv-rs/src/routes/mod.rs → frontend/src/store.ts
- `export_playlist()` --references--> `state`  [EXTRACTED]
  iptv-rs/src/routes/mod.rs → frontend/src/store.ts
- `fetch_source()` --references--> `state`  [EXTRACTED]
  iptv-rs/src/routes/mod.rs → frontend/src/store.ts
- `get_channel_epg()` --references--> `state`  [EXTRACTED]
  iptv-rs/src/routes/mod.rs → frontend/src/store.ts
- `get_playlist()` --references--> `state`  [EXTRACTED]
  iptv-rs/src/routes/mod.rs → frontend/src/store.ts

## Import Cycles
- None detected.

## Communities (91 total, 36 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.03
Nodes (70): $(), clock, deadLocal, drawer, errorDetail, favs, filterControls, filtered (+62 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (4): fl(), ll, mt, Rl()

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (31): ah(), al(), ao(), As(), Au(), bu(), _c, co() (+23 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (6): Ds(), ga(), _l(), ma(), Rc(), Ve()

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (4): cs(), tl(), wi(), zi()

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (6): ea(), fc, ml(), wr, Yt(), zo()

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (13): FnOnce, HashMap, PathBuf, Playlist, Programme, RwLock, AppConfig, AppStore (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.17
Nodes (37): Arc, HeaderMap, IntoResponse, Json, Multipart, Path, Query, Response (+29 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (4): ir(), qo(), Rs(), Uc

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (20): Br(), Fo(), ho(), ko(), Kr(), mo(), ne(), No() (+12 more)

### Community 11 - "Community 11"
Cohesion: 0.09
Nodes (3): Fa, kl(), mr

### Community 13 - "Community 13"
Cohesion: 0.10
Nodes (6): da(), Et(), gc, hl(), yc(), Ze

### Community 14 - "Community 14"
Cohesion: 0.09
Nodes (5): ar(), cr(), hh, Hr(), Yr()

### Community 15 - "Community 15"
Cohesion: 0.10
Nodes (3): At, js(), yn()

### Community 18 - "Community 18"
Cohesion: 0.14
Nodes (19): Channel, JsValue, Playlist, ExtinfAttrs, M3uParser, test_basic_parse(), test_multiple_channels(), test_unquoted_attributes() (+11 more)

### Community 20 - "Community 20"
Cohesion: 0.11
Nodes (15): a(), Ed(), eh, Hs(), ja(), ls(), nc(), nh() (+7 more)

### Community 21 - "Community 21"
Cohesion: 0.14
Nodes (8): Default, EpgChannel, Programme, Self, Reliability, source(), SourceBuilder, SourceCategory

### Community 23 - "Community 23"
Cohesion: 0.11
Nodes (3): Bn(), qs, Xr()

### Community 24 - "Community 24"
Cohesion: 0.09
Nodes (14): cc(), ha(), hc, ia(), ic(), la(), Nn, oa() (+6 more)

### Community 26 - "Community 26"
Cohesion: 0.14
Nodes (13): aa(), ec(), fd(), Fh(), gs(), ka(), ks(), na() (+5 more)

### Community 27 - "Community 27"
Cohesion: 0.14
Nodes (19): Ad(), bh(), ca(), ch(), dr(), Gn(), he(), Ih() (+11 more)

### Community 28 - "Community 28"
Cohesion: 0.11
Nodes (17): bl(), cl(), dl(), gl(), Hn(), _i(), Ii(), il() (+9 more)

### Community 31 - "Community 31"
Cohesion: 0.18
Nodes (13): BytesStart, DateTime, Channel, EpgChannel, EpgData, Programme, Option, test_basic_epg() (+5 more)

### Community 32 - "Community 32"
Cohesion: 0.19
Nodes (3): Is(), Un(), vl

### Community 34 - "Community 34"
Cohesion: 0.14
Nodes (11): cd(), Cn(), el(), Jl(), mh(), Ns(), ph(), Ql() (+3 more)

### Community 35 - "Community 35"
Cohesion: 0.16
Nodes (4): ct(), Ji, vt(), wl()

### Community 38 - "Community 38"
Cohesion: 0.28
Nodes (15): Client, CuratedSource, get_curated_sources(), Candidate, check_stream(), deduplicate(), fetch_capped(), fetch_epg() (+7 more)

### Community 39 - "Community 39"
Cohesion: 0.12
Nodes (16): dependencies, hls.js, iptv-wasm, devDependencies, typescript, vite, vite-plugin-top-level-await, vite-plugin-wasm (+8 more)

### Community 40 - "Community 40"
Cohesion: 0.12
Nodes (16): compilerOptions, declaration, esModuleInterop, forceConsistentCasingInFileNames, module, moduleResolution, noImplicitReturns, noUnusedLocals (+8 more)

### Community 45 - "Community 45"
Cohesion: 0.21
Nodes (6): bi(), Dn(), fu(), kn(), Me(), Pn()

### Community 50 - "Community 50"
Cohesion: 0.17
Nodes (3): En(), Ue(), zl()

### Community 52 - "Community 52"
Cohesion: 0.24
Nodes (13): addRecent(), applyFilters(), layoutLibrary(), onStreamPlaying(), play(), renderLibraryRows(), renderVisibleRows(), rerenderActiveView() (+5 more)

### Community 53 - "Community 53"
Cohesion: 0.22
Nodes (13): channels, fetchSource(), loadChannels(), loadGuide(), openDrawer(), pollPipeline(), renderGroupSelect(), renderMyPlaylists() (+5 more)

### Community 55 - "Community 55"
Cohesion: 0.21
Nodes (8): gd(), Gr(), gt(), Jt(), re(), st(), Vo(), Wt

### Community 59 - "Community 59"
Cohesion: 0.26
Nodes (10): Ee(), ki(), Ot(), Sd(), su(), tu(), va(), vd() (+2 more)

### Community 63 - "Community 63"
Cohesion: 0.20
Nodes (7): api, Channel, CuratedSource, PipelineStatus, Playlist, Programme, Store

### Community 65 - "Community 65"
Cohesion: 0.33
Nodes (11): buildCard(), buildHome(), buildRow(), chKey(), favButton(), favId(), isDead(), letterTile() (+3 more)

### Community 67 - "Community 67"
Cohesion: 0.20
Nodes (9): Contributing, Features, Installation, IPTV Web Player, License, Notes, Prerequisites, Running the Application (+1 more)

### Community 68 - "Community 68"
Cohesion: 0.25
Nodes (3): newCue(), ss, uh()

### Community 70 - "Community 70"
Cohesion: 0.33
Nodes (3): $e(), It(), Lt()

### Community 74 - "Community 74"
Cohesion: 0.25
Nodes (7): API Endpoints, Build, IPTV Web Player — Rust Rewrite, Notes, Project structure, Run, Testing

### Community 75 - "Community 75"
Cohesion: 0.25
Nodes (7): 11:53 | main, 13:33 | main, 16:31 | main, 16:51-17:51 | main, 17:00 | main, 18:26-18:40 | main, 19:02 | main

### Community 79 - "Community 79"
Cohesion: 0.60
Nodes (5): fmtTime(), positionNow(), renderGuide(), renderSplit(), updateNowNext()

### Community 85 - "Community 85"
Cohesion: 0.67
Nodes (3): focusHomeCard(), handleHomeKey(), homeCardAt()

## Knowledge Gaps
- **123 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+118 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `zi()` connect `Community 4` to `Community 33`, `Community 2`, `Community 37`, `Community 11`, `Community 43`, `Community 44`, `Community 16`, `Community 81`, `Community 17`, `Community 19`, `Community 20`, `Community 51`, `Community 23`, `Community 56`, `Community 57`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `Le` connect `Community 6` to `Community 1`, `Community 2`, `Community 26`, `Community 36`, `Community 33`, `Community 37`, `Community 44`, `Community 45`, `Community 16`, `Community 17`, `Community 56`, `Community 25`, `Community 58`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `xu` connect `Community 16` to `Community 33`, `Community 2`, `Community 1`, `Community 4`, `Community 5`, `Community 37`, `Community 43`, `Community 17`, `Community 19`, `Community 54`, `Community 23`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _123 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.02666666666666667 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05902980713033314 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05224963715529753 - nodes in this community are weakly interconnected._