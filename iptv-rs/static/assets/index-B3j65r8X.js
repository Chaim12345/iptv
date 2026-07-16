(async ()=>{
    (function() {
        const e = document.createElement("link").relList;
        if (e && e.supports && e.supports("modulepreload")) return;
        for (const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);
        new MutationObserver((i)=>{
            for (const r of i)if (r.type === "childList") for (const a of r.addedNodes)a.tagName === "LINK" && a.rel === "modulepreload" && s(a);
        }).observe(document, {
            childList: !0,
            subtree: !0
        });
        function t(i) {
            const r = {};
            return i.integrity && (r.integrity = i.integrity), i.referrerPolicy && (r.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? r.credentials = "include" : i.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r;
        }
        function s(i) {
            if (i.ep) return;
            i.ep = !0;
            const r = t(i);
            fetch(i.href, r);
        }
    })();
    function po(n) {
        return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
    }
    var Gr = {
        exports: {}
    };
    (function(n, e) {
        (function(t) {
            var s = /^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/, i = /^(?=([^\/?#]*))\1([^]*)$/, r = /(?:\/|^)\.(?=\/)/g, a = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g, o = {
                buildAbsoluteURL: function(l, c, d) {
                    if (d = d || {}, l = l.trim(), c = c.trim(), !c) {
                        if (!d.alwaysNormalize) return l;
                        var u = o.parseURL(l);
                        if (!u) throw new Error("Error trying to parse base URL.");
                        return u.path = o.normalizePath(u.path), o.buildURLFromParts(u);
                    }
                    var h = o.parseURL(c);
                    if (!h) throw new Error("Error trying to parse relative URL.");
                    if (h.scheme) return d.alwaysNormalize ? (h.path = o.normalizePath(h.path), o.buildURLFromParts(h)) : c;
                    var f = o.parseURL(l);
                    if (!f) throw new Error("Error trying to parse base URL.");
                    if (!f.netLoc && f.path && f.path[0] !== "/") {
                        var g = i.exec(f.path);
                        f.netLoc = g[1], f.path = g[2];
                    }
                    f.netLoc && !f.path && (f.path = "/");
                    var m = {
                        scheme: f.scheme,
                        netLoc: h.netLoc,
                        path: null,
                        params: h.params,
                        query: h.query,
                        fragment: h.fragment
                    };
                    if (!h.netLoc && (m.netLoc = f.netLoc, h.path[0] !== "/")) if (!h.path) m.path = f.path, h.params || (m.params = f.params, h.query || (m.query = f.query));
                    else {
                        var y = f.path, E = y.substring(0, y.lastIndexOf("/") + 1) + h.path;
                        m.path = o.normalizePath(E);
                    }
                    return m.path === null && (m.path = d.alwaysNormalize ? o.normalizePath(h.path) : h.path), o.buildURLFromParts(m);
                },
                parseURL: function(l) {
                    var c = s.exec(l);
                    return c ? {
                        scheme: c[1] || "",
                        netLoc: c[2] || "",
                        path: c[3] || "",
                        params: c[4] || "",
                        query: c[5] || "",
                        fragment: c[6] || ""
                    } : null;
                },
                normalizePath: function(l) {
                    for(l = l.split("").reverse().join("").replace(r, ""); l.length !== (l = l.replace(a, "")).length;);
                    return l.split("").reverse().join("");
                },
                buildURLFromParts: function(l) {
                    return l.scheme + l.netLoc + l.path + l.params + l.query + l.fragment;
                }
            };
            n.exports = o;
        })();
    })(Gr);
    var en = Gr.exports;
    function bn(n, e) {
        var t = Object.keys(n);
        if (Object.getOwnPropertySymbols) {
            var s = Object.getOwnPropertySymbols(n);
            e && (s = s.filter(function(i) {
                return Object.getOwnPropertyDescriptor(n, i).enumerable;
            })), t.push.apply(t, s);
        }
        return t;
    }
    function ue(n) {
        for(var e = 1; e < arguments.length; e++){
            var t = arguments[e] != null ? arguments[e] : {};
            e % 2 ? bn(Object(t), !0).forEach(function(s) {
                To(n, s, t[s]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : bn(Object(t)).forEach(function(s) {
                Object.defineProperty(n, s, Object.getOwnPropertyDescriptor(t, s));
            });
        }
        return n;
    }
    function yo(n, e) {
        if (typeof n != "object" || !n) return n;
        var t = n[Symbol.toPrimitive];
        if (t !== void 0) {
            var s = t.call(n, e);
            if (typeof s != "object") return s;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (e === "string" ? String : Number)(n);
    }
    function Eo(n) {
        var e = yo(n, "string");
        return typeof e == "symbol" ? e : String(e);
    }
    function To(n, e, t) {
        return e = Eo(e), e in n ? Object.defineProperty(n, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : n[e] = t, n;
    }
    function re() {
        return re = Object.assign ? Object.assign.bind() : function(n) {
            for(var e = 1; e < arguments.length; e++){
                var t = arguments[e];
                for(var s in t)Object.prototype.hasOwnProperty.call(t, s) && (n[s] = t[s]);
            }
            return n;
        }, re.apply(this, arguments);
    }
    const M = Number.isFinite || function(n) {
        return typeof n == "number" && isFinite(n);
    }, xo = Number.isSafeInteger || function(n) {
        return typeof n == "number" && Math.abs(n) <= vo;
    }, vo = Number.MAX_SAFE_INTEGER || 9007199254740991;
    let p = function(n) {
        return n.MEDIA_ATTACHING = "hlsMediaAttaching", n.MEDIA_ATTACHED = "hlsMediaAttached", n.MEDIA_DETACHING = "hlsMediaDetaching", n.MEDIA_DETACHED = "hlsMediaDetached", n.BUFFER_RESET = "hlsBufferReset", n.BUFFER_CODECS = "hlsBufferCodecs", n.BUFFER_CREATED = "hlsBufferCreated", n.BUFFER_APPENDING = "hlsBufferAppending", n.BUFFER_APPENDED = "hlsBufferAppended", n.BUFFER_EOS = "hlsBufferEos", n.BUFFER_FLUSHING = "hlsBufferFlushing", n.BUFFER_FLUSHED = "hlsBufferFlushed", n.MANIFEST_LOADING = "hlsManifestLoading", n.MANIFEST_LOADED = "hlsManifestLoaded", n.MANIFEST_PARSED = "hlsManifestParsed", n.LEVEL_SWITCHING = "hlsLevelSwitching", n.LEVEL_SWITCHED = "hlsLevelSwitched", n.LEVEL_LOADING = "hlsLevelLoading", n.LEVEL_LOADED = "hlsLevelLoaded", n.LEVEL_UPDATED = "hlsLevelUpdated", n.LEVEL_PTS_UPDATED = "hlsLevelPtsUpdated", n.LEVELS_UPDATED = "hlsLevelsUpdated", n.AUDIO_TRACKS_UPDATED = "hlsAudioTracksUpdated", n.AUDIO_TRACK_SWITCHING = "hlsAudioTrackSwitching", n.AUDIO_TRACK_SWITCHED = "hlsAudioTrackSwitched", n.AUDIO_TRACK_LOADING = "hlsAudioTrackLoading", n.AUDIO_TRACK_LOADED = "hlsAudioTrackLoaded", n.SUBTITLE_TRACKS_UPDATED = "hlsSubtitleTracksUpdated", n.SUBTITLE_TRACKS_CLEARED = "hlsSubtitleTracksCleared", n.SUBTITLE_TRACK_SWITCH = "hlsSubtitleTrackSwitch", n.SUBTITLE_TRACK_LOADING = "hlsSubtitleTrackLoading", n.SUBTITLE_TRACK_LOADED = "hlsSubtitleTrackLoaded", n.SUBTITLE_FRAG_PROCESSED = "hlsSubtitleFragProcessed", n.CUES_PARSED = "hlsCuesParsed", n.NON_NATIVE_TEXT_TRACKS_FOUND = "hlsNonNativeTextTracksFound", n.INIT_PTS_FOUND = "hlsInitPtsFound", n.FRAG_LOADING = "hlsFragLoading", n.FRAG_LOAD_EMERGENCY_ABORTED = "hlsFragLoadEmergencyAborted", n.FRAG_LOADED = "hlsFragLoaded", n.FRAG_DECRYPTED = "hlsFragDecrypted", n.FRAG_PARSING_INIT_SEGMENT = "hlsFragParsingInitSegment", n.FRAG_PARSING_USERDATA = "hlsFragParsingUserdata", n.FRAG_PARSING_METADATA = "hlsFragParsingMetadata", n.FRAG_PARSED = "hlsFragParsed", n.FRAG_BUFFERED = "hlsFragBuffered", n.FRAG_CHANGED = "hlsFragChanged", n.FPS_DROP = "hlsFpsDrop", n.FPS_DROP_LEVEL_CAPPING = "hlsFpsDropLevelCapping", n.MAX_AUTO_LEVEL_UPDATED = "hlsMaxAutoLevelUpdated", n.ERROR = "hlsError", n.DESTROYING = "hlsDestroying", n.KEY_LOADING = "hlsKeyLoading", n.KEY_LOADED = "hlsKeyLoaded", n.LIVE_BACK_BUFFER_REACHED = "hlsLiveBackBufferReached", n.BACK_BUFFER_REACHED = "hlsBackBufferReached", n.STEERING_MANIFEST_LOADED = "hlsSteeringManifestLoaded", n;
    }({}), G = function(n) {
        return n.NETWORK_ERROR = "networkError", n.MEDIA_ERROR = "mediaError", n.KEY_SYSTEM_ERROR = "keySystemError", n.MUX_ERROR = "muxError", n.OTHER_ERROR = "otherError", n;
    }({}), A = function(n) {
        return n.KEY_SYSTEM_NO_KEYS = "keySystemNoKeys", n.KEY_SYSTEM_NO_ACCESS = "keySystemNoAccess", n.KEY_SYSTEM_NO_SESSION = "keySystemNoSession", n.KEY_SYSTEM_NO_CONFIGURED_LICENSE = "keySystemNoConfiguredLicense", n.KEY_SYSTEM_LICENSE_REQUEST_FAILED = "keySystemLicenseRequestFailed", n.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED = "keySystemServerCertificateRequestFailed", n.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED = "keySystemServerCertificateUpdateFailed", n.KEY_SYSTEM_SESSION_UPDATE_FAILED = "keySystemSessionUpdateFailed", n.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED = "keySystemStatusOutputRestricted", n.KEY_SYSTEM_STATUS_INTERNAL_ERROR = "keySystemStatusInternalError", n.MANIFEST_LOAD_ERROR = "manifestLoadError", n.MANIFEST_LOAD_TIMEOUT = "manifestLoadTimeOut", n.MANIFEST_PARSING_ERROR = "manifestParsingError", n.MANIFEST_INCOMPATIBLE_CODECS_ERROR = "manifestIncompatibleCodecsError", n.LEVEL_EMPTY_ERROR = "levelEmptyError", n.LEVEL_LOAD_ERROR = "levelLoadError", n.LEVEL_LOAD_TIMEOUT = "levelLoadTimeOut", n.LEVEL_PARSING_ERROR = "levelParsingError", n.LEVEL_SWITCH_ERROR = "levelSwitchError", n.AUDIO_TRACK_LOAD_ERROR = "audioTrackLoadError", n.AUDIO_TRACK_LOAD_TIMEOUT = "audioTrackLoadTimeOut", n.SUBTITLE_LOAD_ERROR = "subtitleTrackLoadError", n.SUBTITLE_TRACK_LOAD_TIMEOUT = "subtitleTrackLoadTimeOut", n.FRAG_LOAD_ERROR = "fragLoadError", n.FRAG_LOAD_TIMEOUT = "fragLoadTimeOut", n.FRAG_DECRYPT_ERROR = "fragDecryptError", n.FRAG_PARSING_ERROR = "fragParsingError", n.FRAG_GAP = "fragGap", n.REMUX_ALLOC_ERROR = "remuxAllocError", n.KEY_LOAD_ERROR = "keyLoadError", n.KEY_LOAD_TIMEOUT = "keyLoadTimeOut", n.BUFFER_ADD_CODEC_ERROR = "bufferAddCodecError", n.BUFFER_INCOMPATIBLE_CODECS_ERROR = "bufferIncompatibleCodecsError", n.BUFFER_APPEND_ERROR = "bufferAppendError", n.BUFFER_APPENDING_ERROR = "bufferAppendingError", n.BUFFER_STALLED_ERROR = "bufferStalledError", n.BUFFER_FULL_ERROR = "bufferFullError", n.BUFFER_SEEK_OVER_HOLE = "bufferSeekOverHole", n.BUFFER_NUDGE_ON_STALL = "bufferNudgeOnStall", n.INTERNAL_EXCEPTION = "internalException", n.INTERNAL_ABORTED = "aborted", n.UNKNOWN = "unknown", n;
    }({});
    const at = function() {}, _i = {
        trace: at,
        debug: at,
        log: at,
        warn: at,
        info: at,
        error: at
    };
    let Gt = _i;
    function So(n) {
        const e = self.console[n];
        return e ? e.bind(self.console, `[${n}] >`) : at;
    }
    function Lo(n, ...e) {
        e.forEach(function(t) {
            Gt[t] = n[t] ? n[t].bind(n) : So(t);
        });
    }
    function Ao(n, e) {
        if (typeof console == "object" && n === !0 || typeof n == "object") {
            Lo(n, "debug", "log", "info", "warn", "error");
            try {
                Gt.log(`Debug logs enabled for "${e}" in hls.js version 1.5.13`);
            } catch  {
                Gt = _i;
            }
        } else Gt = _i;
    }
    const S = Gt, bo = /^(\d+)x(\d+)$/, Rn = /(.+?)=(".*?"|.*?)(?:,|$)/g;
    class te {
        constructor(e){
            typeof e == "string" && (e = te.parseAttrList(e)), re(this, e);
        }
        get clientAttrs() {
            return Object.keys(this).filter((e)=>e.substring(0, 2) === "X-");
        }
        decimalInteger(e) {
            const t = parseInt(this[e], 10);
            return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t;
        }
        hexadecimalInteger(e) {
            if (this[e]) {
                let t = (this[e] || "0x").slice(2);
                t = (t.length & 1 ? "0" : "") + t;
                const s = new Uint8Array(t.length / 2);
                for(let i = 0; i < t.length / 2; i++)s[i] = parseInt(t.slice(i * 2, i * 2 + 2), 16);
                return s;
            } else return null;
        }
        hexadecimalIntegerAsNumber(e) {
            const t = parseInt(this[e], 16);
            return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t;
        }
        decimalFloatingPoint(e) {
            return parseFloat(this[e]);
        }
        optionalFloat(e, t) {
            const s = this[e];
            return s ? parseFloat(s) : t;
        }
        enumeratedString(e) {
            return this[e];
        }
        bool(e) {
            return this[e] === "YES";
        }
        decimalResolution(e) {
            const t = bo.exec(this[e]);
            if (t !== null) return {
                width: parseInt(t[1], 10),
                height: parseInt(t[2], 10)
            };
        }
        static parseAttrList(e) {
            let t;
            const s = {}, i = '"';
            for(Rn.lastIndex = 0; (t = Rn.exec(e)) !== null;){
                let r = t[2];
                r.indexOf(i) === 0 && r.lastIndexOf(i) === r.length - 1 && (r = r.slice(1, -1));
                const a = t[1].trim();
                s[a] = r;
            }
            return s;
        }
    }
    function Ro(n) {
        return n !== "ID" && n !== "CLASS" && n !== "START-DATE" && n !== "DURATION" && n !== "END-DATE" && n !== "END-ON-NEXT";
    }
    function Io(n) {
        return n === "SCTE35-OUT" || n === "SCTE35-IN";
    }
    class Kr {
        constructor(e, t){
            if (this.attr = void 0, this._startDate = void 0, this._endDate = void 0, this._badValueForSameId = void 0, t) {
                const s = t.attr;
                for(const i in s)if (Object.prototype.hasOwnProperty.call(e, i) && e[i] !== s[i]) {
                    S.warn(`DATERANGE tag attribute: "${i}" does not match for tags with ID: "${e.ID}"`), this._badValueForSameId = i;
                    break;
                }
                e = re(new te({}), s, e);
            }
            if (this.attr = e, this._startDate = new Date(e["START-DATE"]), "END-DATE" in this.attr) {
                const s = new Date(this.attr["END-DATE"]);
                M(s.getTime()) && (this._endDate = s);
            }
        }
        get id() {
            return this.attr.ID;
        }
        get class() {
            return this.attr.CLASS;
        }
        get startDate() {
            return this._startDate;
        }
        get endDate() {
            if (this._endDate) return this._endDate;
            const e = this.duration;
            return e !== null ? new Date(this._startDate.getTime() + e * 1e3) : null;
        }
        get duration() {
            if ("DURATION" in this.attr) {
                const e = this.attr.decimalFloatingPoint("DURATION");
                if (M(e)) return e;
            } else if (this._endDate) return (this._endDate.getTime() - this._startDate.getTime()) / 1e3;
            return null;
        }
        get plannedDuration() {
            return "PLANNED-DURATION" in this.attr ? this.attr.decimalFloatingPoint("PLANNED-DURATION") : null;
        }
        get endOnNext() {
            return this.attr.bool("END-ON-NEXT");
        }
        get isValid() {
            return !!this.id && !this._badValueForSameId && M(this.startDate.getTime()) && (this.duration === null || this.duration >= 0) && (!this.endOnNext || !!this.class);
        }
    }
    class Ws {
        constructor(){
            this.aborted = !1, this.loaded = 0, this.retry = 0, this.total = 0, this.chunkCount = 0, this.bwEstimate = 0, this.loading = {
                start: 0,
                first: 0,
                end: 0
            }, this.parsing = {
                start: 0,
                end: 0
            }, this.buffering = {
                start: 0,
                first: 0,
                end: 0
            };
        }
    }
    var Q = {
        AUDIO: "audio",
        VIDEO: "video",
        AUDIOVIDEO: "audiovideo"
    };
    class Hr {
        constructor(e){
            this._byteRange = null, this._url = null, this.baseurl = void 0, this.relurl = void 0, this.elementaryStreams = {
                [Q.AUDIO]: null,
                [Q.VIDEO]: null,
                [Q.AUDIOVIDEO]: null
            }, this.baseurl = e;
        }
        setByteRange(e, t) {
            const s = e.split("@", 2);
            let i;
            s.length === 1 ? i = t?.byteRangeEndOffset || 0 : i = parseInt(s[1]), this._byteRange = [
                i,
                parseInt(s[0]) + i
            ];
        }
        get byteRange() {
            return this._byteRange ? this._byteRange : [];
        }
        get byteRangeStartOffset() {
            return this.byteRange[0];
        }
        get byteRangeEndOffset() {
            return this.byteRange[1];
        }
        get url() {
            return !this._url && this.baseurl && this.relurl && (this._url = en.buildAbsoluteURL(this.baseurl, this.relurl, {
                alwaysNormalize: !0
            })), this._url || "";
        }
        set url(e) {
            this._url = e;
        }
    }
    class ei extends Hr {
        constructor(e, t){
            super(t), this._decryptdata = null, this.rawProgramDateTime = null, this.programDateTime = null, this.tagList = [], this.duration = 0, this.sn = 0, this.levelkeys = void 0, this.type = void 0, this.loader = null, this.keyLoader = null, this.level = -1, this.cc = 0, this.startPTS = void 0, this.endPTS = void 0, this.startDTS = void 0, this.endDTS = void 0, this.start = 0, this.deltaPTS = void 0, this.maxStartPTS = void 0, this.minEndPTS = void 0, this.stats = new Ws, this.data = void 0, this.bitrateTest = !1, this.title = null, this.initSegment = null, this.endList = void 0, this.gap = void 0, this.urlId = 0, this.type = e;
        }
        get decryptdata() {
            const { levelkeys: e } = this;
            if (!e && !this._decryptdata) return null;
            if (!this._decryptdata && this.levelkeys && !this.levelkeys.NONE) {
                const t = this.levelkeys.identity;
                if (t) this._decryptdata = t.getDecryptData(this.sn);
                else {
                    const s = Object.keys(this.levelkeys);
                    if (s.length === 1) return this._decryptdata = this.levelkeys[s[0]].getDecryptData(this.sn);
                }
            }
            return this._decryptdata;
        }
        get end() {
            return this.start + this.duration;
        }
        get endProgramDateTime() {
            if (this.programDateTime === null || !M(this.programDateTime)) return null;
            const e = M(this.duration) ? this.duration : 0;
            return this.programDateTime + e * 1e3;
        }
        get encrypted() {
            var e;
            if ((e = this._decryptdata) != null && e.encrypted) return !0;
            if (this.levelkeys) {
                const t = Object.keys(this.levelkeys), s = t.length;
                if (s > 1 || s === 1 && this.levelkeys[t[0]].encrypted) return !0;
            }
            return !1;
        }
        setKeyFormat(e) {
            if (this.levelkeys) {
                const t = this.levelkeys[e];
                t && !this._decryptdata && (this._decryptdata = t.getDecryptData(this.sn));
            }
        }
        abortRequests() {
            var e, t;
            (e = this.loader) == null || e.abort(), (t = this.keyLoader) == null || t.abort();
        }
        setElementaryStreamInfo(e, t, s, i, r, a = !1) {
            const { elementaryStreams: o } = this, l = o[e];
            if (!l) {
                o[e] = {
                    startPTS: t,
                    endPTS: s,
                    startDTS: i,
                    endDTS: r,
                    partial: a
                };
                return;
            }
            l.startPTS = Math.min(l.startPTS, t), l.endPTS = Math.max(l.endPTS, s), l.startDTS = Math.min(l.startDTS, i), l.endDTS = Math.max(l.endDTS, r);
        }
        clearElementaryStreamInfo() {
            const { elementaryStreams: e } = this;
            e[Q.AUDIO] = null, e[Q.VIDEO] = null, e[Q.AUDIOVIDEO] = null;
        }
    }
    class Do extends Hr {
        constructor(e, t, s, i, r){
            super(s), this.fragOffset = 0, this.duration = 0, this.gap = !1, this.independent = !1, this.relurl = void 0, this.fragment = void 0, this.index = void 0, this.stats = new Ws, this.duration = e.decimalFloatingPoint("DURATION"), this.gap = e.bool("GAP"), this.independent = e.bool("INDEPENDENT"), this.relurl = e.enumeratedString("URI"), this.fragment = t, this.index = i;
            const a = e.enumeratedString("BYTERANGE");
            a && this.setByteRange(a, r), r && (this.fragOffset = r.fragOffset + r.duration);
        }
        get start() {
            return this.fragment.start + this.fragOffset;
        }
        get end() {
            return this.start + this.duration;
        }
        get loaded() {
            const { elementaryStreams: e } = this;
            return !!(e.audio || e.video || e.audiovideo);
        }
    }
    const Co = 10;
    class wo {
        constructor(e){
            this.PTSKnown = !1, this.alignedSliding = !1, this.averagetargetduration = void 0, this.endCC = 0, this.endSN = 0, this.fragments = void 0, this.fragmentHint = void 0, this.partList = null, this.dateRanges = void 0, this.live = !0, this.ageHeader = 0, this.advancedDateTime = void 0, this.updated = !0, this.advanced = !0, this.availabilityDelay = void 0, this.misses = 0, this.startCC = 0, this.startSN = 0, this.startTimeOffset = null, this.targetduration = 0, this.totalduration = 0, this.type = null, this.url = void 0, this.m3u8 = "", this.version = null, this.canBlockReload = !1, this.canSkipUntil = 0, this.canSkipDateRanges = !1, this.skippedSegments = 0, this.recentlyRemovedDateranges = void 0, this.partHoldBack = 0, this.holdBack = 0, this.partTarget = 0, this.preloadHint = void 0, this.renditionReports = void 0, this.tuneInGoal = 0, this.deltaUpdateFailed = void 0, this.driftStartTime = 0, this.driftEndTime = 0, this.driftStart = 0, this.driftEnd = 0, this.encryptedFragments = void 0, this.playlistParsingError = null, this.variableList = null, this.hasVariableRefs = !1, this.fragments = [], this.encryptedFragments = [], this.dateRanges = {}, this.url = e;
        }
        reloaded(e) {
            if (!e) {
                this.advanced = !0, this.updated = !0;
                return;
            }
            const t = this.lastPartSn - e.lastPartSn, s = this.lastPartIndex - e.lastPartIndex;
            this.updated = this.endSN !== e.endSN || !!s || !!t || !this.live, this.advanced = this.endSN > e.endSN || t > 0 || t === 0 && s > 0, this.updated || this.advanced ? this.misses = Math.floor(e.misses * .6) : this.misses = e.misses + 1, this.availabilityDelay = e.availabilityDelay;
        }
        get hasProgramDateTime() {
            return this.fragments.length ? M(this.fragments[this.fragments.length - 1].programDateTime) : !1;
        }
        get levelTargetDuration() {
            return this.averagetargetduration || this.targetduration || Co;
        }
        get drift() {
            const e = this.driftEndTime - this.driftStartTime;
            return e > 0 ? (this.driftEnd - this.driftStart) * 1e3 / e : 1;
        }
        get edge() {
            return this.partEnd || this.fragmentEnd;
        }
        get partEnd() {
            var e;
            return (e = this.partList) != null && e.length ? this.partList[this.partList.length - 1].end : this.fragmentEnd;
        }
        get fragmentEnd() {
            var e;
            return (e = this.fragments) != null && e.length ? this.fragments[this.fragments.length - 1].end : 0;
        }
        get age() {
            return this.advancedDateTime ? Math.max(Date.now() - this.advancedDateTime, 0) / 1e3 : 0;
        }
        get lastPartIndex() {
            var e;
            return (e = this.partList) != null && e.length ? this.partList[this.partList.length - 1].index : -1;
        }
        get lastPartSn() {
            var e;
            return (e = this.partList) != null && e.length ? this.partList[this.partList.length - 1].fragment.sn : this.endSN;
        }
    }
    function tn(n) {
        return Uint8Array.from(atob(n), (e)=>e.charCodeAt(0));
    }
    function _o(n) {
        const e = ki(n).subarray(0, 16), t = new Uint8Array(16);
        return t.set(e, 16 - e.length), t;
    }
    function ko(n) {
        const e = function(s, i, r) {
            const a = s[i];
            s[i] = s[r], s[r] = a;
        };
        e(n, 0, 3), e(n, 1, 2), e(n, 4, 5), e(n, 6, 7);
    }
    function Po(n) {
        const e = n.split(":");
        let t = null;
        if (e[0] === "data" && e.length === 2) {
            const s = e[1].split(";"), i = s[s.length - 1].split(",");
            if (i.length === 2) {
                const r = i[0] === "base64", a = i[1];
                r ? (s.splice(-1, 1), t = tn(a)) : t = _o(a);
            }
        }
        return t;
    }
    function ki(n) {
        return Uint8Array.from(unescape(encodeURIComponent(n)), (e)=>e.charCodeAt(0));
    }
    const It = typeof self < "u" ? self : void 0;
    var ee = {
        CLEARKEY: "org.w3.clearkey",
        FAIRPLAY: "com.apple.fps",
        PLAYREADY: "com.microsoft.playready",
        WIDEVINE: "com.widevine.alpha"
    }, Ee = {
        CLEARKEY: "org.w3.clearkey",
        FAIRPLAY: "com.apple.streamingkeydelivery",
        PLAYREADY: "com.microsoft.playready",
        WIDEVINE: "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"
    };
    function In(n) {
        switch(n){
            case Ee.FAIRPLAY:
                return ee.FAIRPLAY;
            case Ee.PLAYREADY:
                return ee.PLAYREADY;
            case Ee.WIDEVINE:
                return ee.WIDEVINE;
            case Ee.CLEARKEY:
                return ee.CLEARKEY;
        }
    }
    var Vr = {
        WIDEVINE: "edef8ba979d64acea3c827dcd51d21ed"
    };
    function Fo(n) {
        if (n === Vr.WIDEVINE) return ee.WIDEVINE;
    }
    function Dn(n) {
        switch(n){
            case ee.FAIRPLAY:
                return Ee.FAIRPLAY;
            case ee.PLAYREADY:
                return Ee.PLAYREADY;
            case ee.WIDEVINE:
                return Ee.WIDEVINE;
            case ee.CLEARKEY:
                return Ee.CLEARKEY;
        }
    }
    function ti(n) {
        const { drmSystems: e, widevineLicenseUrl: t } = n, s = e ? [
            ee.FAIRPLAY,
            ee.WIDEVINE,
            ee.PLAYREADY,
            ee.CLEARKEY
        ].filter((i)=>!!e[i]) : [];
        return !s[ee.WIDEVINE] && t && s.push(ee.WIDEVINE), s;
    }
    const Wr = function(n) {
        return It != null && (n = It.navigator) != null && n.requestMediaKeySystemAccess ? self.navigator.requestMediaKeySystemAccess.bind(self.navigator) : null;
    }();
    function Oo(n, e, t, s) {
        let i;
        switch(n){
            case ee.FAIRPLAY:
                i = [
                    "cenc",
                    "sinf"
                ];
                break;
            case ee.WIDEVINE:
            case ee.PLAYREADY:
                i = [
                    "cenc"
                ];
                break;
            case ee.CLEARKEY:
                i = [
                    "cenc",
                    "keyids"
                ];
                break;
            default:
                throw new Error(`Unknown key-system: ${n}`);
        }
        return Mo(i, e, t, s);
    }
    function Mo(n, e, t, s) {
        return [
            {
                initDataTypes: n,
                persistentState: s.persistentState || "optional",
                distinctiveIdentifier: s.distinctiveIdentifier || "optional",
                sessionTypes: s.sessionTypes || [
                    s.sessionType || "temporary"
                ],
                audioCapabilities: e.map((r)=>({
                        contentType: `audio/mp4; codecs="${r}"`,
                        robustness: s.audioRobustness || "",
                        encryptionScheme: s.audioEncryptionScheme || null
                    })),
                videoCapabilities: t.map((r)=>({
                        contentType: `video/mp4; codecs="${r}"`,
                        robustness: s.videoRobustness || "",
                        encryptionScheme: s.videoEncryptionScheme || null
                    }))
            }
        ];
    }
    function ut(n, e, t) {
        return Uint8Array.prototype.slice ? n.slice(e, t) : new Uint8Array(Array.prototype.slice.call(n, e, t));
    }
    const sn = (n, e)=>e + 10 <= n.length && n[e] === 73 && n[e + 1] === 68 && n[e + 2] === 51 && n[e + 3] < 255 && n[e + 4] < 255 && n[e + 6] < 128 && n[e + 7] < 128 && n[e + 8] < 128 && n[e + 9] < 128, Yr = (n, e)=>e + 10 <= n.length && n[e] === 51 && n[e + 1] === 68 && n[e + 2] === 73 && n[e + 3] < 255 && n[e + 4] < 255 && n[e + 6] < 128 && n[e + 7] < 128 && n[e + 8] < 128 && n[e + 9] < 128, jt = (n, e)=>{
        const t = e;
        let s = 0;
        for(; sn(n, e);){
            s += 10;
            const i = Ys(n, e + 6);
            s += i, Yr(n, e + 10) && (s += 10), e += s;
        }
        if (s > 0) return n.subarray(t, t + s);
    }, Ys = (n, e)=>{
        let t = 0;
        return t = (n[e] & 127) << 21, t |= (n[e + 1] & 127) << 14, t |= (n[e + 2] & 127) << 7, t |= n[e + 3] & 127, t;
    }, No = (n, e)=>sn(n, e) && Ys(n, e + 6) + 10 <= n.length - e, nn = (n)=>{
        const e = jr(n);
        for(let t = 0; t < e.length; t++){
            const s = e[t];
            if (qr(s)) return Ho(s);
        }
    }, qr = (n)=>n && n.key === "PRIV" && n.info === "com.apple.streaming.transportStreamTimestamp", Uo = (n)=>{
        const e = String.fromCharCode(n[0], n[1], n[2], n[3]), t = Ys(n, 4), s = 10;
        return {
            type: e,
            size: t,
            data: n.subarray(s, s + t)
        };
    }, jr = (n)=>{
        let e = 0;
        const t = [];
        for(; sn(n, e);){
            const s = Ys(n, e + 6);
            e += 10;
            const i = e + s;
            for(; e + 8 < i;){
                const r = Uo(n.subarray(e)), a = Bo(r);
                a && t.push(a), e += r.size + 10;
            }
            Yr(n, e) && (e += 10);
        }
        return t;
    }, Bo = (n)=>n.type === "PRIV" ? $o(n) : n.type[0] === "W" ? Ko(n) : Go(n), $o = (n)=>{
        if (n.size < 2) return;
        const e = He(n.data, !0), t = new Uint8Array(n.data.subarray(e.length + 1));
        return {
            key: n.type,
            info: e,
            data: t.buffer
        };
    }, Go = (n)=>{
        if (n.size < 2) return;
        if (n.type === "TXXX") {
            let t = 1;
            const s = He(n.data.subarray(t), !0);
            t += s.length + 1;
            const i = He(n.data.subarray(t));
            return {
                key: n.type,
                info: s,
                data: i
            };
        }
        const e = He(n.data.subarray(1));
        return {
            key: n.type,
            data: e
        };
    }, Ko = (n)=>{
        if (n.type === "WXXX") {
            if (n.size < 2) return;
            let t = 1;
            const s = He(n.data.subarray(t), !0);
            t += s.length + 1;
            const i = He(n.data.subarray(t));
            return {
                key: n.type,
                info: s,
                data: i
            };
        }
        const e = He(n.data);
        return {
            key: n.type,
            data: e
        };
    }, Ho = (n)=>{
        if (n.data.byteLength === 8) {
            const e = new Uint8Array(n.data), t = e[3] & 1;
            let s = (e[4] << 23) + (e[5] << 15) + (e[6] << 7) + e[7];
            return s /= 45, t && (s += 4772185884e-2), Math.round(s);
        }
    }, He = (n, e = !1)=>{
        const t = Vo();
        if (t) {
            const c = t.decode(n);
            if (e) {
                const d = c.indexOf("\0");
                return d !== -1 ? c.substring(0, d) : c;
            }
            return c.replace(/\0/g, "");
        }
        const s = n.length;
        let i, r, a, o = "", l = 0;
        for(; l < s;){
            if (i = n[l++], i === 0 && e) return o;
            if (i === 0 || i === 3) continue;
            switch(i >> 4){
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    o += String.fromCharCode(i);
                    break;
                case 12:
                case 13:
                    r = n[l++], o += String.fromCharCode((i & 31) << 6 | r & 63);
                    break;
                case 14:
                    r = n[l++], a = n[l++], o += String.fromCharCode((i & 15) << 12 | (r & 63) << 6 | (a & 63) << 0);
                    break;
            }
        }
        return o;
    };
    let si;
    function Vo() {
        if (!navigator.userAgent.includes("PlayStation 4")) return !si && typeof self.TextDecoder < "u" && (si = new self.TextDecoder("utf-8")), si;
    }
    const Be = {
        hexDump: function(n) {
            let e = "";
            for(let t = 0; t < n.length; t++){
                let s = n[t].toString(16);
                s.length < 2 && (s = "0" + s), e += s;
            }
            return e;
        }
    }, Ds = Math.pow(2, 32) - 1, Wo = [].push, zr = {
        video: 1,
        audio: 2,
        id3: 3,
        text: 4
    };
    function ae(n) {
        return String.fromCharCode.apply(null, n);
    }
    function Xr(n, e) {
        const t = n[e] << 8 | n[e + 1];
        return t < 0 ? 65536 + t : t;
    }
    function U(n, e) {
        const t = Qr(n, e);
        return t < 0 ? 4294967296 + t : t;
    }
    function Cn(n, e) {
        let t = U(n, e);
        return t *= Math.pow(2, 32), t += U(n, e + 4), t;
    }
    function Qr(n, e) {
        return n[e] << 24 | n[e + 1] << 16 | n[e + 2] << 8 | n[e + 3];
    }
    function ii(n, e, t) {
        n[e] = t >> 24, n[e + 1] = t >> 16 & 255, n[e + 2] = t >> 8 & 255, n[e + 3] = t & 255;
    }
    function Yo(n) {
        const e = n.byteLength;
        for(let t = 0; t < e;){
            const s = U(n, t);
            if (s > 8 && n[t + 4] === 109 && n[t + 5] === 111 && n[t + 6] === 111 && n[t + 7] === 102) return !0;
            t = s > 1 ? t + s : e;
        }
        return !1;
    }
    function W(n, e) {
        const t = [];
        if (!e.length) return t;
        const s = n.byteLength;
        for(let i = 0; i < s;){
            const r = U(n, i), a = ae(n.subarray(i + 4, i + 8)), o = r > 1 ? i + r : s;
            if (a === e[0]) if (e.length === 1) t.push(n.subarray(i + 8, o));
            else {
                const l = W(n.subarray(i + 8, o), e.slice(1));
                l.length && Wo.apply(t, l);
            }
            i = o;
        }
        return t;
    }
    function qo(n) {
        const e = [], t = n[0];
        let s = 8;
        const i = U(n, s);
        s += 4;
        let r = 0, a = 0;
        t === 0 ? (r = U(n, s), a = U(n, s + 4), s += 8) : (r = Cn(n, s), a = Cn(n, s + 8), s += 16), s += 2;
        let o = n.length + a;
        const l = Xr(n, s);
        s += 2;
        for(let c = 0; c < l; c++){
            let d = s;
            const u = U(n, d);
            d += 4;
            const h = u & 2147483647;
            if ((u & 2147483648) >>> 31 === 1) return S.warn("SIDX has hierarchical references (not supported)"), null;
            const g = U(n, d);
            d += 4, e.push({
                referenceSize: h,
                subsegmentDuration: g,
                info: {
                    duration: g / i,
                    start: o,
                    end: o + h - 1
                }
            }), o += h, d += 4, s = d;
        }
        return {
            earliestPresentationTime: r,
            timescale: i,
            version: t,
            referencesCount: l,
            references: e
        };
    }
    function Jr(n) {
        const e = [], t = W(n, [
            "moov",
            "trak"
        ]);
        for(let i = 0; i < t.length; i++){
            const r = t[i], a = W(r, [
                "tkhd"
            ])[0];
            if (a) {
                let o = a[0];
                const l = U(a, o === 0 ? 12 : 20), c = W(r, [
                    "mdia",
                    "mdhd"
                ])[0];
                if (c) {
                    o = c[0];
                    const d = U(c, o === 0 ? 12 : 20), u = W(r, [
                        "mdia",
                        "hdlr"
                    ])[0];
                    if (u) {
                        const h = ae(u.subarray(8, 12)), f = {
                            soun: Q.AUDIO,
                            vide: Q.VIDEO
                        }[h];
                        if (f) {
                            const g = W(r, [
                                "mdia",
                                "minf",
                                "stbl",
                                "stsd"
                            ])[0], m = jo(g);
                            e[l] = {
                                timescale: d,
                                type: f
                            }, e[f] = ue({
                                timescale: d,
                                id: l
                            }, m);
                        }
                    }
                }
            }
        }
        return W(n, [
            "moov",
            "mvex",
            "trex"
        ]).forEach((i)=>{
            const r = U(i, 4), a = e[r];
            a && (a.default = {
                duration: U(i, 12),
                flags: U(i, 20)
            });
        }), e;
    }
    function jo(n) {
        const e = n.subarray(8), t = e.subarray(86), s = ae(e.subarray(4, 8));
        let i = s;
        const r = s === "enca" || s === "encv";
        if (r) {
            const o = W(e, [
                s
            ])[0].subarray(s === "enca" ? 28 : 78);
            W(o, [
                "sinf"
            ]).forEach((c)=>{
                const d = W(c, [
                    "schm"
                ])[0];
                if (d) {
                    const u = ae(d.subarray(4, 8));
                    if (u === "cbcs" || u === "cenc") {
                        const h = W(c, [
                            "frma"
                        ])[0];
                        h && (i = ae(h));
                    }
                }
            });
        }
        switch(i){
            case "avc1":
            case "avc2":
            case "avc3":
            case "avc4":
                {
                    const a = W(t, [
                        "avcC"
                    ])[0];
                    i += "." + es(a[1]) + es(a[2]) + es(a[3]);
                    break;
                }
            case "mp4a":
                {
                    const a = W(e, [
                        s
                    ])[0], o = W(a.subarray(28), [
                        "esds"
                    ])[0];
                    if (o && o.length > 12) {
                        let l = 4;
                        if (o[l++] !== 3) break;
                        l = ni(o, l), l += 2;
                        const c = o[l++];
                        if (c & 128 && (l += 2), c & 64 && (l += o[l++]), o[l++] !== 4) break;
                        l = ni(o, l);
                        const d = o[l++];
                        if (d === 64) i += "." + es(d);
                        else break;
                        if (l += 12, o[l++] !== 5) break;
                        l = ni(o, l);
                        const u = o[l++];
                        let h = (u & 248) >> 3;
                        h === 31 && (h += 1 + ((u & 7) << 3) + ((o[l] & 224) >> 5)), i += "." + h;
                    }
                    break;
                }
            case "hvc1":
            case "hev1":
                {
                    const a = W(t, [
                        "hvcC"
                    ])[0], o = a[1], l = [
                        "",
                        "A",
                        "B",
                        "C"
                    ][o >> 6], c = o & 31, d = U(a, 2), u = (o & 32) >> 5 ? "H" : "L", h = a[12], f = a.subarray(6, 12);
                    i += "." + l + c, i += "." + d.toString(16).toUpperCase(), i += "." + u + h;
                    let g = "";
                    for(let m = f.length; m--;){
                        const y = f[m];
                        (y || g) && (g = "." + y.toString(16).toUpperCase() + g);
                    }
                    i += g;
                    break;
                }
            case "dvh1":
            case "dvhe":
                {
                    const a = W(t, [
                        "dvcC"
                    ])[0], o = a[2] >> 1 & 127, l = a[2] << 5 & 32 | a[3] >> 3 & 31;
                    i += "." + Ue(o) + "." + Ue(l);
                    break;
                }
            case "vp09":
                {
                    const a = W(t, [
                        "vpcC"
                    ])[0], o = a[4], l = a[5], c = a[6] >> 4 & 15;
                    i += "." + Ue(o) + "." + Ue(l) + "." + Ue(c);
                    break;
                }
            case "av01":
                {
                    const a = W(t, [
                        "av1C"
                    ])[0], o = a[1] >>> 5, l = a[1] & 31, c = a[2] >>> 7 ? "H" : "M", d = (a[2] & 64) >> 6, u = (a[2] & 32) >> 5, h = o === 2 && d ? u ? 12 : 10 : d ? 10 : 8, f = (a[2] & 16) >> 4, g = (a[2] & 8) >> 3, m = (a[2] & 4) >> 2, y = a[2] & 3;
                    i += "." + o + "." + Ue(l) + c + "." + Ue(h) + "." + f + "." + g + m + y + "." + Ue(1) + "." + Ue(1) + "." + Ue(1) + "." + 0;
                    break;
                }
        }
        return {
            codec: i,
            encrypted: r
        };
    }
    function ni(n, e) {
        const t = e + 5;
        for(; n[e++] & 128 && e < t;);
        return e;
    }
    function es(n) {
        return ("0" + n.toString(16).toUpperCase()).slice(-2);
    }
    function Ue(n) {
        return (n < 10 ? "0" : "") + n;
    }
    function zo(n, e) {
        if (!n || !e) return n;
        const t = e.keyId;
        return t && e.isCommonEncryption && W(n, [
            "moov",
            "trak"
        ]).forEach((i)=>{
            const a = W(i, [
                "mdia",
                "minf",
                "stbl",
                "stsd"
            ])[0].subarray(8);
            let o = W(a, [
                "enca"
            ]);
            const l = o.length > 0;
            l || (o = W(a, [
                "encv"
            ])), o.forEach((c)=>{
                const d = l ? c.subarray(28) : c.subarray(78);
                W(d, [
                    "sinf"
                ]).forEach((h)=>{
                    const f = Zr(h);
                    if (f) {
                        const g = f.subarray(8, 24);
                        g.some((m)=>m !== 0) || (S.log(`[eme] Patching keyId in 'enc${l ? "a" : "v"}>sinf>>tenc' box: ${Be.hexDump(g)} -> ${Be.hexDump(t)}`), f.set(t, 8));
                    }
                });
            });
        }), n;
    }
    function Zr(n) {
        const e = W(n, [
            "schm"
        ])[0];
        if (e) {
            const t = ae(e.subarray(4, 8));
            if (t === "cbcs" || t === "cenc") return W(n, [
                "schi",
                "tenc"
            ])[0];
        }
        return S.error("[eme] missing 'schm' box"), null;
    }
    function Xo(n, e) {
        return W(e, [
            "moof",
            "traf"
        ]).reduce((t, s)=>{
            const i = W(s, [
                "tfdt"
            ])[0], r = i[0], a = W(s, [
                "tfhd"
            ]).reduce((o, l)=>{
                const c = U(l, 4), d = n[c];
                if (d) {
                    let u = U(i, 4);
                    if (r === 1) {
                        if (u === Ds) return S.warn("[mp4-demuxer]: Ignoring assumed invalid signed 64-bit track fragment decode time"), o;
                        u *= Ds + 1, u += U(i, 8);
                    }
                    const h = d.timescale || 9e4, f = u / h;
                    if (M(f) && (o === null || f < o)) return f;
                }
                return o;
            }, null);
            return a !== null && M(a) && (t === null || a < t) ? a : t;
        }, null);
    }
    function Qo(n, e) {
        let t = 0, s = 0, i = 0;
        const r = W(n, [
            "moof",
            "traf"
        ]);
        for(let a = 0; a < r.length; a++){
            const o = r[a], l = W(o, [
                "tfhd"
            ])[0], c = U(l, 4), d = e[c];
            if (!d) continue;
            const u = d.default, h = U(l, 0) | u?.flags;
            let f = u?.duration;
            h & 8 && (h & 2 ? f = U(l, 12) : f = U(l, 8));
            const g = d.timescale || 9e4, m = W(o, [
                "trun"
            ]);
            for(let y = 0; y < m.length; y++){
                if (t = Jo(m[y]), !t && f) {
                    const E = U(m[y], 4);
                    t = f * E;
                }
                d.type === Q.VIDEO ? s += t / g : d.type === Q.AUDIO && (i += t / g);
            }
        }
        if (s === 0 && i === 0) {
            let a = 1 / 0, o = 0, l = 0;
            const c = W(n, [
                "sidx"
            ]);
            for(let d = 0; d < c.length; d++){
                const u = qo(c[d]);
                if (u != null && u.references) {
                    a = Math.min(a, u.earliestPresentationTime / u.timescale);
                    const h = u.references.reduce((f, g)=>f + g.info.duration || 0, 0);
                    o = Math.max(o, h + u.earliestPresentationTime / u.timescale), l = o - a;
                }
            }
            if (l && M(l)) return l;
        }
        return s || i;
    }
    function Jo(n) {
        const e = U(n, 0);
        let t = 8;
        e & 1 && (t += 4), e & 4 && (t += 4);
        let s = 0;
        const i = U(n, 4);
        for(let r = 0; r < i; r++){
            if (e & 256) {
                const a = U(n, t);
                s += a, t += 4;
            }
            e & 512 && (t += 4), e & 1024 && (t += 4), e & 2048 && (t += 4);
        }
        return s;
    }
    function Zo(n, e, t) {
        W(e, [
            "moof",
            "traf"
        ]).forEach((s)=>{
            W(s, [
                "tfhd"
            ]).forEach((i)=>{
                const r = U(i, 4), a = n[r];
                if (!a) return;
                const o = a.timescale || 9e4;
                W(s, [
                    "tfdt"
                ]).forEach((l)=>{
                    const c = l[0], d = t * o;
                    if (d) {
                        let u = U(l, 4);
                        if (c === 0) u -= d, u = Math.max(u, 0), ii(l, 4, u);
                        else {
                            u *= Math.pow(2, 32), u += U(l, 8), u -= d, u = Math.max(u, 0);
                            const h = Math.floor(u / (Ds + 1)), f = Math.floor(u % (Ds + 1));
                            ii(l, 4, h), ii(l, 8, f);
                        }
                    }
                });
            });
        });
    }
    function el(n) {
        const e = {
            valid: null,
            remainder: null
        }, t = W(n, [
            "moof"
        ]);
        if (t.length < 2) return e.remainder = n, e;
        const s = t[t.length - 1];
        return e.valid = ut(n, 0, s.byteOffset - 8), e.remainder = ut(n, s.byteOffset - 8), e;
    }
    function De(n, e) {
        const t = new Uint8Array(n.length + e.length);
        return t.set(n), t.set(e, n.length), t;
    }
    function wn(n, e) {
        const t = [], s = e.samples, i = e.timescale, r = e.id;
        let a = !1;
        return W(s, [
            "moof"
        ]).map((l)=>{
            const c = l.byteOffset - 8;
            W(l, [
                "traf"
            ]).map((u)=>{
                const h = W(u, [
                    "tfdt"
                ]).map((f)=>{
                    const g = f[0];
                    let m = U(f, 4);
                    return g === 1 && (m *= Math.pow(2, 32), m += U(f, 8)), m / i;
                })[0];
                return h !== void 0 && (n = h), W(u, [
                    "tfhd"
                ]).map((f)=>{
                    const g = U(f, 4), m = U(f, 0) & 16777215, y = (m & 1) !== 0, E = (m & 2) !== 0, x = (m & 8) !== 0;
                    let T = 0;
                    const R = (m & 16) !== 0;
                    let v = 0;
                    const D = (m & 32) !== 0;
                    let b = 8;
                    g === r && (y && (b += 8), E && (b += 4), x && (T = U(f, b), b += 4), R && (v = U(f, b), b += 4), D && (b += 4), e.type === "video" && (a = tl(e.codec)), W(u, [
                        "trun"
                    ]).map((w)=>{
                        const P = w[0], I = U(w, 0) & 16777215, _ = (I & 1) !== 0;
                        let V = 0;
                        const F = (I & 4) !== 0, H = (I & 256) !== 0;
                        let K = 0;
                        const $ = (I & 512) !== 0;
                        let j = 0;
                        const J = (I & 1024) !== 0, N = (I & 2048) !== 0;
                        let O = 0;
                        const z = U(w, 4);
                        let Y = 8;
                        _ && (V = U(w, Y), Y += 4), F && (Y += 4);
                        let X = V + c;
                        for(let ie = 0; ie < z; ie++){
                            if (H ? (K = U(w, Y), Y += 4) : K = T, $ ? (j = U(w, Y), Y += 4) : j = v, J && (Y += 4), N && (P === 0 ? O = U(w, Y) : O = Qr(w, Y), Y += 4), e.type === Q.VIDEO) {
                                let oe = 0;
                                for(; oe < j;){
                                    const he = U(s, X);
                                    if (X += 4, sl(a, s[X])) {
                                        const Se = s.subarray(X, X + he);
                                        ea(Se, a ? 2 : 1, n + O / i, t);
                                    }
                                    X += he, oe += he + 4;
                                }
                            }
                            n += K / i;
                        }
                    }));
                });
            });
        }), t;
    }
    function tl(n) {
        if (!n) return !1;
        const e = n.indexOf("."), t = e < 0 ? n : n.substring(0, e);
        return t === "hvc1" || t === "hev1" || t === "dvh1" || t === "dvhe";
    }
    function sl(n, e) {
        if (n) {
            const t = e >> 1 & 63;
            return t === 39 || t === 40;
        } else return (e & 31) === 6;
    }
    function ea(n, e, t, s) {
        const i = ta(n);
        let r = 0;
        r += e;
        let a = 0, o = 0, l = 0;
        for(; r < i.length;){
            a = 0;
            do {
                if (r >= i.length) break;
                l = i[r++], a += l;
            }while (l === 255)
            o = 0;
            do {
                if (r >= i.length) break;
                l = i[r++], o += l;
            }while (l === 255)
            const c = i.length - r;
            let d = r;
            if (o < c) r += o;
            else if (o > c) {
                S.error(`Malformed SEI payload. ${o} is too small, only ${c} bytes left to parse.`);
                break;
            }
            if (a === 4) {
                if (i[d++] === 181) {
                    const h = Xr(i, d);
                    if (d += 2, h === 49) {
                        const f = U(i, d);
                        if (d += 4, f === 1195456820) {
                            const g = i[d++];
                            if (g === 3) {
                                const m = i[d++], y = 31 & m, E = 64 & m, x = E ? 2 + y * 3 : 0, T = new Uint8Array(x);
                                if (E) {
                                    T[0] = m;
                                    for(let R = 1; R < x; R++)T[R] = i[d++];
                                }
                                s.push({
                                    type: g,
                                    payloadType: a,
                                    pts: t,
                                    bytes: T
                                });
                            }
                        }
                    }
                }
            } else if (a === 5 && o > 16) {
                const u = [];
                for(let g = 0; g < 16; g++){
                    const m = i[d++].toString(16);
                    u.push(m.length == 1 ? "0" + m : m), (g === 3 || g === 5 || g === 7 || g === 9) && u.push("-");
                }
                const h = o - 16, f = new Uint8Array(h);
                for(let g = 0; g < h; g++)f[g] = i[d++];
                s.push({
                    payloadType: a,
                    pts: t,
                    uuid: u.join(""),
                    userData: He(f),
                    userDataBytes: f
                });
            }
        }
    }
    function ta(n) {
        const e = n.byteLength, t = [];
        let s = 1;
        for(; s < e - 2;)n[s] === 0 && n[s + 1] === 0 && n[s + 2] === 3 ? (t.push(s + 2), s += 2) : s++;
        if (t.length === 0) return n;
        const i = e - t.length, r = new Uint8Array(i);
        let a = 0;
        for(s = 0; s < i; a++, s++)a === t[0] && (a++, t.shift()), r[s] = n[a];
        return r;
    }
    function il(n) {
        const e = n[0];
        let t = "", s = "", i = 0, r = 0, a = 0, o = 0, l = 0, c = 0;
        if (e === 0) {
            for(; ae(n.subarray(c, c + 1)) !== "\0";)t += ae(n.subarray(c, c + 1)), c += 1;
            for(t += ae(n.subarray(c, c + 1)), c += 1; ae(n.subarray(c, c + 1)) !== "\0";)s += ae(n.subarray(c, c + 1)), c += 1;
            s += ae(n.subarray(c, c + 1)), c += 1, i = U(n, 12), r = U(n, 16), o = U(n, 20), l = U(n, 24), c = 28;
        } else if (e === 1) {
            c += 4, i = U(n, c), c += 4;
            const u = U(n, c);
            c += 4;
            const h = U(n, c);
            for(c += 4, a = 2 ** 32 * u + h, xo(a) || (a = Number.MAX_SAFE_INTEGER, S.warn("Presentation time exceeds safe integer limit and wrapped to max safe integer in parsing emsg box")), o = U(n, c), c += 4, l = U(n, c), c += 4; ae(n.subarray(c, c + 1)) !== "\0";)t += ae(n.subarray(c, c + 1)), c += 1;
            for(t += ae(n.subarray(c, c + 1)), c += 1; ae(n.subarray(c, c + 1)) !== "\0";)s += ae(n.subarray(c, c + 1)), c += 1;
            s += ae(n.subarray(c, c + 1)), c += 1;
        }
        const d = n.subarray(c, n.byteLength);
        return {
            schemeIdUri: t,
            value: s,
            timeScale: i,
            presentationTime: a,
            presentationTimeDelta: r,
            eventDuration: o,
            id: l,
            payload: d
        };
    }
    function nl(n, ...e) {
        const t = e.length;
        let s = 8, i = t;
        for(; i--;)s += e[i].byteLength;
        const r = new Uint8Array(s);
        for(r[0] = s >> 24 & 255, r[1] = s >> 16 & 255, r[2] = s >> 8 & 255, r[3] = s & 255, r.set(n, 4), i = 0, s = 8; i < t; i++)r.set(e[i], s), s += e[i].byteLength;
        return r;
    }
    function rl(n, e, t) {
        if (n.byteLength !== 16) throw new RangeError("Invalid system id");
        let s, i;
        s = 0, i = new Uint8Array;
        let r;
        s > 0 ? (r = new Uint8Array(4), e.length > 0 && new DataView(r.buffer).setUint32(0, e.length, !1)) : r = new Uint8Array;
        const a = new Uint8Array(4);
        return t && t.byteLength > 0 && new DataView(a.buffer).setUint32(0, t.byteLength, !1), nl([
            112,
            115,
            115,
            104
        ], new Uint8Array([
            s,
            0,
            0,
            0
        ]), n, r, i, a, t || new Uint8Array);
    }
    function al(n) {
        if (!(n instanceof ArrayBuffer) || n.byteLength < 32) return null;
        const e = {
            version: 0,
            systemId: "",
            kids: null,
            data: null
        }, t = new DataView(n), s = t.getUint32(0);
        if (n.byteLength !== s && s > 44 || t.getUint32(4) !== 1886614376 || (e.version = t.getUint32(8) >>> 24, e.version > 1)) return null;
        e.systemId = Be.hexDump(new Uint8Array(n, 12, 16));
        const r = t.getUint32(28);
        if (e.version === 0) {
            if (s - 32 < r) return null;
            e.data = new Uint8Array(n, 32, r);
        } else if (e.version === 1) {
            e.kids = [];
            for(let a = 0; a < r; a++)e.kids.push(new Uint8Array(n, 32 + a * 16, 16));
        }
        return e;
    }
    let ts = {};
    class zt {
        static clearKeyUriToKeyIdMap() {
            ts = {};
        }
        constructor(e, t, s, i = [
            1
        ], r = null){
            this.uri = void 0, this.method = void 0, this.keyFormat = void 0, this.keyFormatVersions = void 0, this.encrypted = void 0, this.isCommonEncryption = void 0, this.iv = null, this.key = null, this.keyId = null, this.pssh = null, this.method = e, this.uri = t, this.keyFormat = s, this.keyFormatVersions = i, this.iv = r, this.encrypted = e ? e !== "NONE" : !1, this.isCommonEncryption = this.encrypted && e !== "AES-128";
        }
        isSupported() {
            if (this.method) {
                if (this.method === "AES-128" || this.method === "NONE") return !0;
                if (this.keyFormat === "identity") return this.method === "SAMPLE-AES";
                switch(this.keyFormat){
                    case Ee.FAIRPLAY:
                    case Ee.WIDEVINE:
                    case Ee.PLAYREADY:
                    case Ee.CLEARKEY:
                        return [
                            "ISO-23001-7",
                            "SAMPLE-AES",
                            "SAMPLE-AES-CENC",
                            "SAMPLE-AES-CTR"
                        ].indexOf(this.method) !== -1;
                }
            }
            return !1;
        }
        getDecryptData(e) {
            if (!this.encrypted || !this.uri) return null;
            if (this.method === "AES-128" && this.uri && !this.iv) {
                typeof e != "number" && (this.method === "AES-128" && !this.iv && S.warn(`missing IV for initialization segment with method="${this.method}" - compliance issue`), e = 0);
                const s = ol(e);
                return new zt(this.method, this.uri, "identity", this.keyFormatVersions, s);
            }
            const t = Po(this.uri);
            if (t) switch(this.keyFormat){
                case Ee.WIDEVINE:
                    this.pssh = t, t.length >= 22 && (this.keyId = t.subarray(t.length - 22, t.length - 6));
                    break;
                case Ee.PLAYREADY:
                    {
                        const s = new Uint8Array([
                            154,
                            4,
                            240,
                            121,
                            152,
                            64,
                            66,
                            134,
                            171,
                            146,
                            230,
                            91,
                            224,
                            136,
                            95,
                            149
                        ]);
                        this.pssh = rl(s, null, t);
                        const i = new Uint16Array(t.buffer, t.byteOffset, t.byteLength / 2), r = String.fromCharCode.apply(null, Array.from(i)), a = r.substring(r.indexOf("<"), r.length), c = new DOMParser().parseFromString(a, "text/xml").getElementsByTagName("KID")[0];
                        if (c) {
                            const d = c.childNodes[0] ? c.childNodes[0].nodeValue : c.getAttribute("VALUE");
                            if (d) {
                                const u = tn(d).subarray(0, 16);
                                ko(u), this.keyId = u;
                            }
                        }
                        break;
                    }
                default:
                    {
                        let s = t.subarray(0, 16);
                        if (s.length !== 16) {
                            const i = new Uint8Array(16);
                            i.set(s, 16 - s.length), s = i;
                        }
                        this.keyId = s;
                        break;
                    }
            }
            if (!this.keyId || this.keyId.byteLength !== 16) {
                let s = ts[this.uri];
                if (!s) {
                    const i = Object.keys(ts).length % Number.MAX_SAFE_INTEGER;
                    s = new Uint8Array(16), new DataView(s.buffer, 12, 4).setUint32(0, i), ts[this.uri] = s;
                }
                this.keyId = s;
            }
            return this;
        }
    }
    function ol(n) {
        const e = new Uint8Array(16);
        for(let t = 12; t < 16; t++)e[t] = n >> 8 * (15 - t) & 255;
        return e;
    }
    const sa = /\{\$([a-zA-Z0-9-_]+)\}/g;
    function _n(n) {
        return sa.test(n);
    }
    function pe(n, e, t) {
        if (n.variableList !== null || n.hasVariableRefs) for(let s = t.length; s--;){
            const i = t[s], r = e[i];
            r && (e[i] = Pi(n, r));
        }
    }
    function Pi(n, e) {
        if (n.variableList !== null || n.hasVariableRefs) {
            const t = n.variableList;
            return e.replace(sa, (s)=>{
                const i = s.substring(2, s.length - 1), r = t?.[i];
                return r === void 0 ? (n.playlistParsingError || (n.playlistParsingError = new Error(`Missing preceding EXT-X-DEFINE tag for Variable Reference: "${i}"`)), s) : r;
            });
        }
        return e;
    }
    function kn(n, e, t) {
        let s = n.variableList;
        s || (n.variableList = s = {});
        let i, r;
        if ("QUERYPARAM" in e) {
            i = e.QUERYPARAM;
            try {
                const a = new self.URL(t).searchParams;
                if (a.has(i)) r = a.get(i);
                else throw new Error(`"${i}" does not match any query parameter in URI: "${t}"`);
            } catch (a) {
                n.playlistParsingError || (n.playlistParsingError = new Error(`EXT-X-DEFINE QUERYPARAM: ${a.message}`));
            }
        } else i = e.NAME, r = e.VALUE;
        i in s ? n.playlistParsingError || (n.playlistParsingError = new Error(`EXT-X-DEFINE duplicate Variable Name declarations: "${i}"`)) : s[i] = r || "";
    }
    function ll(n, e, t) {
        const s = e.IMPORT;
        if (t && s in t) {
            let i = n.variableList;
            i || (n.variableList = i = {}), i[s] = t[s];
        } else n.playlistParsingError || (n.playlistParsingError = new Error(`EXT-X-DEFINE IMPORT attribute not found in Multivariant Playlist: "${s}"`));
    }
    function ft(n = !0) {
        return typeof self > "u" ? void 0 : (n || !self.MediaSource) && self.ManagedMediaSource || self.MediaSource || self.WebKitMediaSource;
    }
    function cl(n) {
        return typeof self < "u" && n === self.ManagedMediaSource;
    }
    const Cs = {
        audio: {
            a3ds: 1,
            "ac-3": .95,
            "ac-4": 1,
            alac: .9,
            alaw: 1,
            dra1: 1,
            "dts+": 1,
            "dts-": 1,
            dtsc: 1,
            dtse: 1,
            dtsh: 1,
            "ec-3": .9,
            enca: 1,
            fLaC: .9,
            flac: .9,
            FLAC: .9,
            g719: 1,
            g726: 1,
            m4ae: 1,
            mha1: 1,
            mha2: 1,
            mhm1: 1,
            mhm2: 1,
            mlpa: 1,
            mp4a: 1,
            "raw ": 1,
            Opus: 1,
            opus: 1,
            samr: 1,
            sawb: 1,
            sawp: 1,
            sevc: 1,
            sqcp: 1,
            ssmv: 1,
            twos: 1,
            ulaw: 1
        },
        video: {
            avc1: 1,
            avc2: 1,
            avc3: 1,
            avc4: 1,
            avcp: 1,
            av01: .8,
            drac: 1,
            dva1: 1,
            dvav: 1,
            dvh1: .7,
            dvhe: .7,
            encv: 1,
            hev1: .75,
            hvc1: .75,
            mjp2: 1,
            mp4v: 1,
            mvc1: 1,
            mvc2: 1,
            mvc3: 1,
            mvc4: 1,
            resv: 1,
            rv60: 1,
            s263: 1,
            svc1: 1,
            svc2: 1,
            "vc-1": 1,
            vp08: 1,
            vp09: .9
        },
        text: {
            stpp: 1,
            wvtt: 1
        }
    };
    function dl(n, e) {
        const t = Cs[e];
        return !!t && !!t[n.slice(0, 4)];
    }
    function ri(n, e, t = !0) {
        return !n.split(",").some((s)=>!ia(s, e, t));
    }
    function ia(n, e, t = !0) {
        var s;
        const i = ft(t);
        return (s = i?.isTypeSupported(Xt(n, e))) != null ? s : !1;
    }
    function Xt(n, e) {
        return `${e}/mp4;codecs="${n}"`;
    }
    function Pn(n) {
        if (n) {
            const e = n.substring(0, 4);
            return Cs.video[e];
        }
        return 2;
    }
    function ws(n) {
        return n.split(",").reduce((e, t)=>{
            const s = Cs.video[t];
            return s ? (s * 2 + e) / (e ? 3 : 2) : (Cs.audio[t] + e) / (e ? 2 : 1);
        }, 0);
    }
    const ai = {};
    function ul(n, e = !0) {
        if (ai[n]) return ai[n];
        const t = {
            flac: [
                "flac",
                "fLaC",
                "FLAC"
            ],
            opus: [
                "opus",
                "Opus"
            ]
        }[n];
        for(let s = 0; s < t.length; s++)if (ia(t[s], "audio", e)) return ai[n] = t[s], t[s];
        return n;
    }
    const hl = /flac|opus/i;
    function _s(n, e = !0) {
        return n.replace(hl, (t)=>ul(t.toLowerCase(), e));
    }
    function Fn(n, e) {
        return n && n !== "mp4a" ? n : e && e.split(",")[0];
    }
    function fl(n) {
        const e = n.split(",");
        for(let t = 0; t < e.length; t++){
            const s = e[t].split(".");
            if (s.length > 2) {
                let i = s.shift() + ".";
                i += parseInt(s.shift()).toString(16), i += ("000" + parseInt(s.shift()).toString(16)).slice(-4), e[t] = i;
            }
        }
        return e.join(",");
    }
    const On = /#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-(SESSION-DATA|SESSION-KEY|DEFINE|CONTENT-STEERING|START):([^\r\n]*)[\r\n]+/g, Mn = /#EXT-X-MEDIA:(.*)/g, gl = /^#EXT(?:INF|-X-TARGETDURATION):/m, Nn = new RegExp([
        /#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,
        /(?!#) *(\S[^\r\n]*)/.source,
        /#EXT-X-BYTERANGE:*(.+)/.source,
        /#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,
        /#.*/.source
    ].join("|"), "g"), ml = new RegExp([
        /#(EXTM3U)/.source,
        /#EXT-X-(DATERANGE|DEFINE|KEY|MAP|PART|PART-INF|PLAYLIST-TYPE|PRELOAD-HINT|RENDITION-REPORT|SERVER-CONTROL|SKIP|START):(.+)/.source,
        /#EXT-X-(BITRATE|DISCONTINUITY-SEQUENCE|MEDIA-SEQUENCE|TARGETDURATION|VERSION): *(\d+)/.source,
        /#EXT-X-(DISCONTINUITY|ENDLIST|GAP|INDEPENDENT-SEGMENTS)/.source,
        /(#)([^:]*):(.*)/.source,
        /(#)(.*)(?:.*)\r?\n?/.source
    ].join("|"));
    class Ge {
        static findGroup(e, t) {
            for(let s = 0; s < e.length; s++){
                const i = e[s];
                if (i.id === t) return i;
            }
        }
        static resolve(e, t) {
            return en.buildAbsoluteURL(t, e, {
                alwaysNormalize: !0
            });
        }
        static isMediaPlaylist(e) {
            return gl.test(e);
        }
        static parseMasterPlaylist(e, t) {
            const s = _n(e), i = {
                contentSteering: null,
                levels: [],
                playlistParsingError: null,
                sessionData: null,
                sessionKeys: null,
                startTimeOffset: null,
                variableList: null,
                hasVariableRefs: s
            }, r = [];
            On.lastIndex = 0;
            let a;
            for(; (a = On.exec(e)) != null;)if (a[1]) {
                var o;
                const c = new te(a[1]);
                pe(i, c, [
                    "CODECS",
                    "SUPPLEMENTAL-CODECS",
                    "ALLOWED-CPC",
                    "PATHWAY-ID",
                    "STABLE-VARIANT-ID",
                    "AUDIO",
                    "VIDEO",
                    "SUBTITLES",
                    "CLOSED-CAPTIONS",
                    "NAME"
                ]);
                const d = Pi(i, a[2]), u = {
                    attrs: c,
                    bitrate: c.decimalInteger("BANDWIDTH") || c.decimalInteger("AVERAGE-BANDWIDTH"),
                    name: c.NAME,
                    url: Ge.resolve(d, t)
                }, h = c.decimalResolution("RESOLUTION");
                h && (u.width = h.width, u.height = h.height), pl(c.CODECS, u), (o = u.unknownCodecs) != null && o.length || r.push(u), i.levels.push(u);
            } else if (a[3]) {
                const c = a[3], d = a[4];
                switch(c){
                    case "SESSION-DATA":
                        {
                            const u = new te(d);
                            pe(i, u, [
                                "DATA-ID",
                                "LANGUAGE",
                                "VALUE",
                                "URI"
                            ]);
                            const h = u["DATA-ID"];
                            h && (i.sessionData === null && (i.sessionData = {}), i.sessionData[h] = u);
                            break;
                        }
                    case "SESSION-KEY":
                        {
                            const u = Un(d, t, i);
                            u.encrypted && u.isSupported() ? (i.sessionKeys === null && (i.sessionKeys = []), i.sessionKeys.push(u)) : S.warn(`[Keys] Ignoring invalid EXT-X-SESSION-KEY tag: "${d}"`);
                            break;
                        }
                    case "DEFINE":
                        {
                            {
                                const u = new te(d);
                                pe(i, u, [
                                    "NAME",
                                    "VALUE",
                                    "QUERYPARAM"
                                ]), kn(i, u, t);
                            }
                            break;
                        }
                    case "CONTENT-STEERING":
                        {
                            const u = new te(d);
                            pe(i, u, [
                                "SERVER-URI",
                                "PATHWAY-ID"
                            ]), i.contentSteering = {
                                uri: Ge.resolve(u["SERVER-URI"], t),
                                pathwayId: u["PATHWAY-ID"] || "."
                            };
                            break;
                        }
                    case "START":
                        {
                            i.startTimeOffset = Bn(d);
                            break;
                        }
                }
            }
            const l = r.length > 0 && r.length < i.levels.length;
            return i.levels = l ? r : i.levels, i.levels.length === 0 && (i.playlistParsingError = new Error("no levels found in manifest")), i;
        }
        static parseMasterPlaylistMedia(e, t, s) {
            let i;
            const r = {}, a = s.levels, o = {
                AUDIO: a.map((c)=>({
                        id: c.attrs.AUDIO,
                        audioCodec: c.audioCodec
                    })),
                SUBTITLES: a.map((c)=>({
                        id: c.attrs.SUBTITLES,
                        textCodec: c.textCodec
                    })),
                "CLOSED-CAPTIONS": []
            };
            let l = 0;
            for(Mn.lastIndex = 0; (i = Mn.exec(e)) !== null;){
                const c = new te(i[1]), d = c.TYPE;
                if (d) {
                    const u = o[d], h = r[d] || [];
                    r[d] = h, pe(s, c, [
                        "URI",
                        "GROUP-ID",
                        "LANGUAGE",
                        "ASSOC-LANGUAGE",
                        "STABLE-RENDITION-ID",
                        "NAME",
                        "INSTREAM-ID",
                        "CHARACTERISTICS",
                        "CHANNELS"
                    ]);
                    const f = c.LANGUAGE, g = c["ASSOC-LANGUAGE"], m = c.CHANNELS, y = c.CHARACTERISTICS, E = c["INSTREAM-ID"], x = {
                        attrs: c,
                        bitrate: 0,
                        id: l++,
                        groupId: c["GROUP-ID"] || "",
                        name: c.NAME || f || "",
                        type: d,
                        default: c.bool("DEFAULT"),
                        autoselect: c.bool("AUTOSELECT"),
                        forced: c.bool("FORCED"),
                        lang: f,
                        url: c.URI ? Ge.resolve(c.URI, t) : ""
                    };
                    if (g && (x.assocLang = g), m && (x.channels = m), y && (x.characteristics = y), E && (x.instreamId = E), u != null && u.length) {
                        const T = Ge.findGroup(u, x.groupId) || u[0];
                        $n(x, T, "audioCodec"), $n(x, T, "textCodec");
                    }
                    h.push(x);
                }
            }
            return r;
        }
        static parseLevelPlaylist(e, t, s, i, r, a) {
            const o = new wo(t), l = o.fragments;
            let c = null, d = 0, u = 0, h = 0, f = 0, g = null, m = new ei(i, t), y, E, x, T = -1, R = !1, v = null;
            for(Nn.lastIndex = 0, o.m3u8 = e, o.hasVariableRefs = _n(e); (y = Nn.exec(e)) !== null;){
                R && (R = !1, m = new ei(i, t), m.start = h, m.sn = d, m.cc = f, m.level = s, c && (m.initSegment = c, m.rawProgramDateTime = c.rawProgramDateTime, c.rawProgramDateTime = null, v && (m.setByteRange(v), v = null)));
                const P = y[1];
                if (P) {
                    m.duration = parseFloat(P);
                    const I = (" " + y[2]).slice(1);
                    m.title = I || null, m.tagList.push(I ? [
                        "INF",
                        P,
                        I
                    ] : [
                        "INF",
                        P
                    ]);
                } else if (y[3]) {
                    if (M(m.duration)) {
                        m.start = h, x && Hn(m, x, o), m.sn = d, m.level = s, m.cc = f, l.push(m);
                        const I = (" " + y[3]).slice(1);
                        m.relurl = Pi(o, I), Gn(m, g), g = m, h += m.duration, d++, u = 0, R = !0;
                    }
                } else if (y[4]) {
                    const I = (" " + y[4]).slice(1);
                    g ? m.setByteRange(I, g) : m.setByteRange(I);
                } else if (y[5]) m.rawProgramDateTime = (" " + y[5]).slice(1), m.tagList.push([
                    "PROGRAM-DATE-TIME",
                    m.rawProgramDateTime
                ]), T === -1 && (T = l.length);
                else {
                    if (y = y[0].match(ml), !y) {
                        S.warn("No matches on slow regex match for level playlist!");
                        continue;
                    }
                    for(E = 1; E < y.length && !(typeof y[E] < "u"); E++);
                    const I = (" " + y[E]).slice(1), _ = (" " + y[E + 1]).slice(1), V = y[E + 2] ? (" " + y[E + 2]).slice(1) : "";
                    switch(I){
                        case "PLAYLIST-TYPE":
                            o.type = _.toUpperCase();
                            break;
                        case "MEDIA-SEQUENCE":
                            d = o.startSN = parseInt(_);
                            break;
                        case "SKIP":
                            {
                                const F = new te(_);
                                pe(o, F, [
                                    "RECENTLY-REMOVED-DATERANGES"
                                ]);
                                const H = F.decimalInteger("SKIPPED-SEGMENTS");
                                if (M(H)) {
                                    o.skippedSegments = H;
                                    for(let $ = H; $--;)l.unshift(null);
                                    d += H;
                                }
                                const K = F.enumeratedString("RECENTLY-REMOVED-DATERANGES");
                                K && (o.recentlyRemovedDateranges = K.split("	"));
                                break;
                            }
                        case "TARGETDURATION":
                            o.targetduration = Math.max(parseInt(_), 1);
                            break;
                        case "VERSION":
                            o.version = parseInt(_);
                            break;
                        case "INDEPENDENT-SEGMENTS":
                        case "EXTM3U":
                            break;
                        case "ENDLIST":
                            o.live = !1;
                            break;
                        case "#":
                            (_ || V) && m.tagList.push(V ? [
                                _,
                                V
                            ] : [
                                _
                            ]);
                            break;
                        case "DISCONTINUITY":
                            f++, m.tagList.push([
                                "DIS"
                            ]);
                            break;
                        case "GAP":
                            m.gap = !0, m.tagList.push([
                                I
                            ]);
                            break;
                        case "BITRATE":
                            m.tagList.push([
                                I,
                                _
                            ]);
                            break;
                        case "DATERANGE":
                            {
                                const F = new te(_);
                                pe(o, F, [
                                    "ID",
                                    "CLASS",
                                    "START-DATE",
                                    "END-DATE",
                                    "SCTE35-CMD",
                                    "SCTE35-OUT",
                                    "SCTE35-IN"
                                ]), pe(o, F, F.clientAttrs);
                                const H = new Kr(F, o.dateRanges[F.ID]);
                                H.isValid || o.skippedSegments ? o.dateRanges[H.id] = H : S.warn(`Ignoring invalid DATERANGE tag: "${_}"`), m.tagList.push([
                                    "EXT-X-DATERANGE",
                                    _
                                ]);
                                break;
                            }
                        case "DEFINE":
                            {
                                {
                                    const F = new te(_);
                                    pe(o, F, [
                                        "NAME",
                                        "VALUE",
                                        "IMPORT",
                                        "QUERYPARAM"
                                    ]), "IMPORT" in F ? ll(o, F, a) : kn(o, F, t);
                                }
                                break;
                            }
                        case "DISCONTINUITY-SEQUENCE":
                            f = parseInt(_);
                            break;
                        case "KEY":
                            {
                                const F = Un(_, t, o);
                                if (F.isSupported()) {
                                    if (F.method === "NONE") {
                                        x = void 0;
                                        break;
                                    }
                                    x || (x = {}), x[F.keyFormat] && (x = re({}, x)), x[F.keyFormat] = F;
                                } else S.warn(`[Keys] Ignoring invalid EXT-X-KEY tag: "${_}"`);
                                break;
                            }
                        case "START":
                            o.startTimeOffset = Bn(_);
                            break;
                        case "MAP":
                            {
                                const F = new te(_);
                                if (pe(o, F, [
                                    "BYTERANGE",
                                    "URI"
                                ]), m.duration) {
                                    const H = new ei(i, t);
                                    Kn(H, F, s, x), c = H, m.initSegment = c, c.rawProgramDateTime && !m.rawProgramDateTime && (m.rawProgramDateTime = c.rawProgramDateTime);
                                } else {
                                    const H = m.byteRangeEndOffset;
                                    if (H) {
                                        const K = m.byteRangeStartOffset;
                                        v = `${H - K}@${K}`;
                                    } else v = null;
                                    Kn(m, F, s, x), c = m, R = !0;
                                }
                                break;
                            }
                        case "SERVER-CONTROL":
                            {
                                const F = new te(_);
                                o.canBlockReload = F.bool("CAN-BLOCK-RELOAD"), o.canSkipUntil = F.optionalFloat("CAN-SKIP-UNTIL", 0), o.canSkipDateRanges = o.canSkipUntil > 0 && F.bool("CAN-SKIP-DATERANGES"), o.partHoldBack = F.optionalFloat("PART-HOLD-BACK", 0), o.holdBack = F.optionalFloat("HOLD-BACK", 0);
                                break;
                            }
                        case "PART-INF":
                            {
                                const F = new te(_);
                                o.partTarget = F.decimalFloatingPoint("PART-TARGET");
                                break;
                            }
                        case "PART":
                            {
                                let F = o.partList;
                                F || (F = o.partList = []);
                                const H = u > 0 ? F[F.length - 1] : void 0, K = u++, $ = new te(_);
                                pe(o, $, [
                                    "BYTERANGE",
                                    "URI"
                                ]);
                                const j = new Do($, m, t, K, H);
                                F.push(j), m.duration += j.duration;
                                break;
                            }
                        case "PRELOAD-HINT":
                            {
                                const F = new te(_);
                                pe(o, F, [
                                    "URI"
                                ]), o.preloadHint = F;
                                break;
                            }
                        case "RENDITION-REPORT":
                            {
                                const F = new te(_);
                                pe(o, F, [
                                    "URI"
                                ]), o.renditionReports = o.renditionReports || [], o.renditionReports.push(F);
                                break;
                            }
                        default:
                            S.warn(`line parsed but not handled: ${y}`);
                            break;
                    }
                }
            }
            g && !g.relurl ? (l.pop(), h -= g.duration, o.partList && (o.fragmentHint = g)) : o.partList && (Gn(m, g), m.cc = f, o.fragmentHint = m, x && Hn(m, x, o));
            const D = l.length, b = l[0], w = l[D - 1];
            if (h += o.skippedSegments * o.targetduration, h > 0 && D && w) {
                o.averagetargetduration = h / D;
                const P = w.sn;
                o.endSN = P !== "initSegment" ? P : 0, o.live || (w.endList = !0), b && (o.startCC = b.cc);
            } else o.endSN = 0, o.startCC = 0;
            return o.fragmentHint && (h += o.fragmentHint.duration), o.totalduration = h, o.endCC = f, T > 0 && yl(l, T), o;
        }
    }
    function Un(n, e, t) {
        var s, i;
        const r = new te(n);
        pe(t, r, [
            "KEYFORMAT",
            "KEYFORMATVERSIONS",
            "URI",
            "IV",
            "URI"
        ]);
        const a = (s = r.METHOD) != null ? s : "", o = r.URI, l = r.hexadecimalInteger("IV"), c = r.KEYFORMATVERSIONS, d = (i = r.KEYFORMAT) != null ? i : "identity";
        o && r.IV && !l && S.error(`Invalid IV: ${r.IV}`);
        const u = o ? Ge.resolve(o, e) : "", h = (c || "1").split("/").map(Number).filter(Number.isFinite);
        return new zt(a, u, d, h, l);
    }
    function Bn(n) {
        const t = new te(n).decimalFloatingPoint("TIME-OFFSET");
        return M(t) ? t : null;
    }
    function pl(n, e) {
        let t = (n || "").split(/[ ,]+/).filter((s)=>s);
        [
            "video",
            "audio",
            "text"
        ].forEach((s)=>{
            const i = t.filter((r)=>dl(r, s));
            i.length && (e[`${s}Codec`] = i.join(","), t = t.filter((r)=>i.indexOf(r) === -1));
        }), e.unknownCodecs = t;
    }
    function $n(n, e, t) {
        const s = e[t];
        s && (n[t] = s);
    }
    function yl(n, e) {
        let t = n[e];
        for(let s = e; s--;){
            const i = n[s];
            if (!i) return;
            i.programDateTime = t.programDateTime - i.duration * 1e3, t = i;
        }
    }
    function Gn(n, e) {
        n.rawProgramDateTime ? n.programDateTime = Date.parse(n.rawProgramDateTime) : e != null && e.programDateTime && (n.programDateTime = e.endProgramDateTime), M(n.programDateTime) || (n.programDateTime = null, n.rawProgramDateTime = null);
    }
    function Kn(n, e, t, s) {
        n.relurl = e.URI, e.BYTERANGE && n.setByteRange(e.BYTERANGE), n.level = t, n.sn = "initSegment", s && (n.levelkeys = s), n.initSegment = null;
    }
    function Hn(n, e, t) {
        n.levelkeys = e;
        const { encryptedFragments: s } = t;
        (!s.length || s[s.length - 1].levelkeys !== e) && Object.keys(e).some((i)=>e[i].isCommonEncryption) && s.push(n);
    }
    var q = {
        MANIFEST: "manifest",
        LEVEL: "level",
        AUDIO_TRACK: "audioTrack",
        SUBTITLE_TRACK: "subtitleTrack"
    }, B = {
        MAIN: "main",
        AUDIO: "audio",
        SUBTITLE: "subtitle"
    };
    function Vn(n) {
        const { type: e } = n;
        switch(e){
            case q.AUDIO_TRACK:
                return B.AUDIO;
            case q.SUBTITLE_TRACK:
                return B.SUBTITLE;
            default:
                return B.MAIN;
        }
    }
    function oi(n, e) {
        let t = n.url;
        return (t === void 0 || t.indexOf("data:") === 0) && (t = e.url), t;
    }
    class El {
        constructor(e){
            this.hls = void 0, this.loaders = Object.create(null), this.variableList = null, this.hls = e, this.registerListeners();
        }
        startLoad(e) {}
        stopLoad() {
            this.destroyInternalLoaders();
        }
        registerListeners() {
            const { hls: e } = this;
            e.on(p.MANIFEST_LOADING, this.onManifestLoading, this), e.on(p.LEVEL_LOADING, this.onLevelLoading, this), e.on(p.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), e.on(p.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this);
        }
        unregisterListeners() {
            const { hls: e } = this;
            e.off(p.MANIFEST_LOADING, this.onManifestLoading, this), e.off(p.LEVEL_LOADING, this.onLevelLoading, this), e.off(p.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), e.off(p.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this);
        }
        createInternalLoader(e) {
            const t = this.hls.config, s = t.pLoader, i = t.loader, r = s || i, a = new r(t);
            return this.loaders[e.type] = a, a;
        }
        getInternalLoader(e) {
            return this.loaders[e.type];
        }
        resetInternalLoader(e) {
            this.loaders[e] && delete this.loaders[e];
        }
        destroyInternalLoaders() {
            for(const e in this.loaders){
                const t = this.loaders[e];
                t && t.destroy(), this.resetInternalLoader(e);
            }
        }
        destroy() {
            this.variableList = null, this.unregisterListeners(), this.destroyInternalLoaders();
        }
        onManifestLoading(e, t) {
            const { url: s } = t;
            this.variableList = null, this.load({
                id: null,
                level: 0,
                responseType: "text",
                type: q.MANIFEST,
                url: s,
                deliveryDirectives: null
            });
        }
        onLevelLoading(e, t) {
            const { id: s, level: i, pathwayId: r, url: a, deliveryDirectives: o } = t;
            this.load({
                id: s,
                level: i,
                pathwayId: r,
                responseType: "text",
                type: q.LEVEL,
                url: a,
                deliveryDirectives: o
            });
        }
        onAudioTrackLoading(e, t) {
            const { id: s, groupId: i, url: r, deliveryDirectives: a } = t;
            this.load({
                id: s,
                groupId: i,
                level: null,
                responseType: "text",
                type: q.AUDIO_TRACK,
                url: r,
                deliveryDirectives: a
            });
        }
        onSubtitleTrackLoading(e, t) {
            const { id: s, groupId: i, url: r, deliveryDirectives: a } = t;
            this.load({
                id: s,
                groupId: i,
                level: null,
                responseType: "text",
                type: q.SUBTITLE_TRACK,
                url: r,
                deliveryDirectives: a
            });
        }
        load(e) {
            var t;
            const s = this.hls.config;
            let i = this.getInternalLoader(e);
            if (i) {
                const c = i.context;
                if (c && c.url === e.url && c.level === e.level) {
                    S.trace("[playlist-loader]: playlist request ongoing");
                    return;
                }
                S.log(`[playlist-loader]: aborting previous loader for type: ${e.type}`), i.abort();
            }
            let r;
            if (e.type === q.MANIFEST ? r = s.manifestLoadPolicy.default : r = re({}, s.playlistLoadPolicy.default, {
                timeoutRetry: null,
                errorRetry: null
            }), i = this.createInternalLoader(e), M((t = e.deliveryDirectives) == null ? void 0 : t.part)) {
                let c;
                if (e.type === q.LEVEL && e.level !== null ? c = this.hls.levels[e.level].details : e.type === q.AUDIO_TRACK && e.id !== null ? c = this.hls.audioTracks[e.id].details : e.type === q.SUBTITLE_TRACK && e.id !== null && (c = this.hls.subtitleTracks[e.id].details), c) {
                    const d = c.partTarget, u = c.targetduration;
                    if (d && u) {
                        const h = Math.max(d * 3, u * .8) * 1e3;
                        r = re({}, r, {
                            maxTimeToFirstByteMs: Math.min(h, r.maxTimeToFirstByteMs),
                            maxLoadTimeMs: Math.min(h, r.maxTimeToFirstByteMs)
                        });
                    }
                }
            }
            const a = r.errorRetry || r.timeoutRetry || {}, o = {
                loadPolicy: r,
                timeout: r.maxLoadTimeMs,
                maxRetry: a.maxNumRetry || 0,
                retryDelay: a.retryDelayMs || 0,
                maxRetryDelay: a.maxRetryDelayMs || 0
            }, l = {
                onSuccess: (c, d, u, h)=>{
                    const f = this.getInternalLoader(u);
                    this.resetInternalLoader(u.type);
                    const g = c.data;
                    if (g.indexOf("#EXTM3U") !== 0) {
                        this.handleManifestParsingError(c, u, new Error("no EXTM3U delimiter"), h || null, d);
                        return;
                    }
                    d.parsing.start = performance.now(), Ge.isMediaPlaylist(g) ? this.handleTrackOrLevelPlaylist(c, d, u, h || null, f) : this.handleMasterPlaylist(c, d, u, h);
                },
                onError: (c, d, u, h)=>{
                    this.handleNetworkError(d, u, !1, c, h);
                },
                onTimeout: (c, d, u)=>{
                    this.handleNetworkError(d, u, !0, void 0, c);
                }
            };
            i.load(e, o, l);
        }
        handleMasterPlaylist(e, t, s, i) {
            const r = this.hls, a = e.data, o = oi(e, s), l = Ge.parseMasterPlaylist(a, o);
            if (l.playlistParsingError) {
                this.handleManifestParsingError(e, s, l.playlistParsingError, i, t);
                return;
            }
            const { contentSteering: c, levels: d, sessionData: u, sessionKeys: h, startTimeOffset: f, variableList: g } = l;
            this.variableList = g;
            const { AUDIO: m = [], SUBTITLES: y, "CLOSED-CAPTIONS": E } = Ge.parseMasterPlaylistMedia(a, o, l);
            m.length && !m.some((T)=>!T.url) && d[0].audioCodec && !d[0].attrs.AUDIO && (S.log("[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one"), m.unshift({
                type: "main",
                name: "main",
                groupId: "main",
                default: !1,
                autoselect: !1,
                forced: !1,
                id: -1,
                attrs: new te({}),
                bitrate: 0,
                url: ""
            })), r.trigger(p.MANIFEST_LOADED, {
                levels: d,
                audioTracks: m,
                subtitles: y,
                captions: E,
                contentSteering: c,
                url: o,
                stats: t,
                networkDetails: i,
                sessionData: u,
                sessionKeys: h,
                startTimeOffset: f,
                variableList: g
            });
        }
        handleTrackOrLevelPlaylist(e, t, s, i, r) {
            const a = this.hls, { id: o, level: l, type: c } = s, d = oi(e, s), u = 0, h = M(l) ? l : M(o) ? o : 0, f = Vn(s), g = Ge.parseLevelPlaylist(e.data, d, h, f, u, this.variableList);
            if (c === q.MANIFEST) {
                const m = {
                    attrs: new te({}),
                    bitrate: 0,
                    details: g,
                    name: "",
                    url: d
                };
                a.trigger(p.MANIFEST_LOADED, {
                    levels: [
                        m
                    ],
                    audioTracks: [],
                    url: d,
                    stats: t,
                    networkDetails: i,
                    sessionData: null,
                    sessionKeys: null,
                    contentSteering: null,
                    startTimeOffset: null,
                    variableList: null
                });
            }
            t.parsing.end = performance.now(), s.levelDetails = g, this.handlePlaylistLoaded(g, e, t, s, i, r);
        }
        handleManifestParsingError(e, t, s, i, r) {
            this.hls.trigger(p.ERROR, {
                type: G.NETWORK_ERROR,
                details: A.MANIFEST_PARSING_ERROR,
                fatal: t.type === q.MANIFEST,
                url: e.url,
                err: s,
                error: s,
                reason: s.message,
                response: e,
                context: t,
                networkDetails: i,
                stats: r
            });
        }
        handleNetworkError(e, t, s = !1, i, r) {
            let a = `A network ${s ? "timeout" : "error" + (i ? " (status " + i.code + ")" : "")} occurred while loading ${e.type}`;
            e.type === q.LEVEL ? a += `: ${e.level} id: ${e.id}` : (e.type === q.AUDIO_TRACK || e.type === q.SUBTITLE_TRACK) && (a += ` id: ${e.id} group-id: "${e.groupId}"`);
            const o = new Error(a);
            S.warn(`[playlist-loader]: ${a}`);
            let l = A.UNKNOWN, c = !1;
            const d = this.getInternalLoader(e);
            switch(e.type){
                case q.MANIFEST:
                    l = s ? A.MANIFEST_LOAD_TIMEOUT : A.MANIFEST_LOAD_ERROR, c = !0;
                    break;
                case q.LEVEL:
                    l = s ? A.LEVEL_LOAD_TIMEOUT : A.LEVEL_LOAD_ERROR, c = !1;
                    break;
                case q.AUDIO_TRACK:
                    l = s ? A.AUDIO_TRACK_LOAD_TIMEOUT : A.AUDIO_TRACK_LOAD_ERROR, c = !1;
                    break;
                case q.SUBTITLE_TRACK:
                    l = s ? A.SUBTITLE_TRACK_LOAD_TIMEOUT : A.SUBTITLE_LOAD_ERROR, c = !1;
                    break;
            }
            d && this.resetInternalLoader(e.type);
            const u = {
                type: G.NETWORK_ERROR,
                details: l,
                fatal: c,
                url: e.url,
                loader: d,
                context: e,
                error: o,
                networkDetails: t,
                stats: r
            };
            if (i) {
                const h = t?.url || e.url;
                u.response = ue({
                    url: h,
                    data: void 0
                }, i);
            }
            this.hls.trigger(p.ERROR, u);
        }
        handlePlaylistLoaded(e, t, s, i, r, a) {
            const o = this.hls, { type: l, level: c, id: d, groupId: u, deliveryDirectives: h } = i, f = oi(t, i), g = Vn(i), m = typeof i.level == "number" && g === B.MAIN ? c : void 0;
            if (!e.fragments.length) {
                const E = new Error("No Segments found in Playlist");
                o.trigger(p.ERROR, {
                    type: G.NETWORK_ERROR,
                    details: A.LEVEL_EMPTY_ERROR,
                    fatal: !1,
                    url: f,
                    error: E,
                    reason: E.message,
                    response: t,
                    context: i,
                    level: m,
                    parent: g,
                    networkDetails: r,
                    stats: s
                });
                return;
            }
            e.targetduration || (e.playlistParsingError = new Error("Missing Target Duration"));
            const y = e.playlistParsingError;
            if (y) {
                o.trigger(p.ERROR, {
                    type: G.NETWORK_ERROR,
                    details: A.LEVEL_PARSING_ERROR,
                    fatal: !1,
                    url: f,
                    error: y,
                    reason: y.message,
                    response: t,
                    context: i,
                    level: m,
                    parent: g,
                    networkDetails: r,
                    stats: s
                });
                return;
            }
            switch(e.live && a && (a.getCacheAge && (e.ageHeader = a.getCacheAge() || 0), (!a.getCacheAge || isNaN(e.ageHeader)) && (e.ageHeader = 0)), l){
                case q.MANIFEST:
                case q.LEVEL:
                    o.trigger(p.LEVEL_LOADED, {
                        details: e,
                        level: m || 0,
                        id: d || 0,
                        stats: s,
                        networkDetails: r,
                        deliveryDirectives: h
                    });
                    break;
                case q.AUDIO_TRACK:
                    o.trigger(p.AUDIO_TRACK_LOADED, {
                        details: e,
                        id: d || 0,
                        groupId: u || "",
                        stats: s,
                        networkDetails: r,
                        deliveryDirectives: h
                    });
                    break;
                case q.SUBTITLE_TRACK:
                    o.trigger(p.SUBTITLE_TRACK_LOADED, {
                        details: e,
                        id: d || 0,
                        groupId: u || "",
                        stats: s,
                        networkDetails: r,
                        deliveryDirectives: h
                    });
                    break;
            }
        }
    }
    function na(n, e) {
        let t;
        try {
            t = new Event("addtrack");
        } catch  {
            t = document.createEvent("Event"), t.initEvent("addtrack", !1, !1);
        }
        t.track = n, e.dispatchEvent(t);
    }
    function ra(n, e) {
        const t = n.mode;
        if (t === "disabled" && (n.mode = "hidden"), n.cues && !n.cues.getCueById(e.id)) try {
            if (n.addCue(e), !n.cues.getCueById(e.id)) throw new Error(`addCue is failed for: ${e}`);
        } catch (s) {
            S.debug(`[texttrack-utils]: ${s}`);
            try {
                const i = new self.TextTrackCue(e.startTime, e.endTime, e.text);
                i.id = e.id, n.addCue(i);
            } catch (i) {
                S.debug(`[texttrack-utils]: Legacy TextTrackCue fallback failed: ${i}`);
            }
        }
        t === "disabled" && (n.mode = t);
    }
    function At(n) {
        const e = n.mode;
        if (e === "disabled" && (n.mode = "hidden"), n.cues) for(let t = n.cues.length; t--;)n.removeCue(n.cues[t]);
        e === "disabled" && (n.mode = e);
    }
    function Fi(n, e, t, s) {
        const i = n.mode;
        if (i === "disabled" && (n.mode = "hidden"), n.cues && n.cues.length > 0) {
            const r = xl(n.cues, e, t);
            for(let a = 0; a < r.length; a++)(!s || s(r[a])) && n.removeCue(r[a]);
        }
        i === "disabled" && (n.mode = i);
    }
    function Tl(n, e) {
        if (e < n[0].startTime) return 0;
        const t = n.length - 1;
        if (e > n[t].endTime) return -1;
        let s = 0, i = t;
        for(; s <= i;){
            const r = Math.floor((i + s) / 2);
            if (e < n[r].startTime) i = r - 1;
            else if (e > n[r].startTime && s < t) s = r + 1;
            else return r;
        }
        return n[s].startTime - e < e - n[i].startTime ? s : i;
    }
    function xl(n, e, t) {
        const s = [], i = Tl(n, e);
        if (i > -1) for(let r = i, a = n.length; r < a; r++){
            const o = n[r];
            if (o.startTime >= e && o.endTime <= t) s.push(o);
            else if (o.startTime > t) return s;
        }
        return s;
    }
    function gs(n) {
        const e = [];
        for(let t = 0; t < n.length; t++){
            const s = n[t];
            (s.kind === "subtitles" || s.kind === "captions") && s.label && e.push(n[t]);
        }
        return e;
    }
    var Fe = {
        audioId3: "org.id3",
        dateRange: "com.apple.quicktime.HLS",
        emsg: "https://aomedia.org/emsg/ID3"
    };
    const vl = .25;
    function Oi() {
        if (!(typeof self > "u")) return self.VTTCue || self.TextTrackCue;
    }
    function Wn(n, e, t, s, i) {
        let r = new n(e, t, "");
        try {
            r.value = s, i && (r.type = i);
        } catch  {
            r = new n(e, t, JSON.stringify(i ? ue({
                type: i
            }, s) : s));
        }
        return r;
    }
    const ss = (()=>{
        const n = Oi();
        try {
            n && new n(0, Number.POSITIVE_INFINITY, "");
        } catch  {
            return Number.MAX_VALUE;
        }
        return Number.POSITIVE_INFINITY;
    })();
    function li(n, e) {
        return n.getTime() / 1e3 - e;
    }
    function Sl(n) {
        return Uint8Array.from(n.replace(/^0x/, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")).buffer;
    }
    class Ll {
        constructor(e){
            this.hls = void 0, this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}, this.hls = e, this._registerListeners();
        }
        destroy() {
            this._unregisterListeners(), this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}, this.hls = null;
        }
        _registerListeners() {
            const { hls: e } = this;
            e.on(p.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(p.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(p.MANIFEST_LOADING, this.onManifestLoading, this), e.on(p.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), e.on(p.BUFFER_FLUSHING, this.onBufferFlushing, this), e.on(p.LEVEL_UPDATED, this.onLevelUpdated, this);
        }
        _unregisterListeners() {
            const { hls: e } = this;
            e.off(p.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(p.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(p.MANIFEST_LOADING, this.onManifestLoading, this), e.off(p.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), e.off(p.BUFFER_FLUSHING, this.onBufferFlushing, this), e.off(p.LEVEL_UPDATED, this.onLevelUpdated, this);
        }
        onMediaAttached(e, t) {
            this.media = t.media;
        }
        onMediaDetaching() {
            this.id3Track && (At(this.id3Track), this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {});
        }
        onManifestLoading() {
            this.dateRangeCuesAppended = {};
        }
        createTrack(e) {
            const t = this.getID3Track(e.textTracks);
            return t.mode = "hidden", t;
        }
        getID3Track(e) {
            if (this.media) {
                for(let t = 0; t < e.length; t++){
                    const s = e[t];
                    if (s.kind === "metadata" && s.label === "id3") return na(s, this.media), s;
                }
                return this.media.addTextTrack("metadata", "id3");
            }
        }
        onFragParsingMetadata(e, t) {
            if (!this.media) return;
            const { hls: { config: { enableEmsgMetadataCues: s, enableID3MetadataCues: i } } } = this;
            if (!s && !i) return;
            const { samples: r } = t;
            this.id3Track || (this.id3Track = this.createTrack(this.media));
            const a = Oi();
            if (a) for(let o = 0; o < r.length; o++){
                const l = r[o].type;
                if (l === Fe.emsg && !s || !i) continue;
                const c = jr(r[o].data);
                if (c) {
                    const d = r[o].pts;
                    let u = d + r[o].duration;
                    u > ss && (u = ss), u - d <= 0 && (u = d + vl);
                    for(let f = 0; f < c.length; f++){
                        const g = c[f];
                        if (!qr(g)) {
                            this.updateId3CueEnds(d, l);
                            const m = Wn(a, d, u, g, l);
                            m && this.id3Track.addCue(m);
                        }
                    }
                }
            }
        }
        updateId3CueEnds(e, t) {
            var s;
            const i = (s = this.id3Track) == null ? void 0 : s.cues;
            if (i) for(let r = i.length; r--;){
                const a = i[r];
                a.type === t && a.startTime < e && a.endTime === ss && (a.endTime = e);
            }
        }
        onBufferFlushing(e, { startOffset: t, endOffset: s, type: i }) {
            const { id3Track: r, hls: a } = this;
            if (!a) return;
            const { config: { enableEmsgMetadataCues: o, enableID3MetadataCues: l } } = a;
            if (r && (o || l)) {
                let c;
                i === "audio" ? c = (d)=>d.type === Fe.audioId3 && l : i === "video" ? c = (d)=>d.type === Fe.emsg && o : c = (d)=>d.type === Fe.audioId3 && l || d.type === Fe.emsg && o, Fi(r, t, s, c);
            }
        }
        onLevelUpdated(e, { details: t }) {
            if (!this.media || !t.hasProgramDateTime || !this.hls.config.enableDateRangeMetadataCues) return;
            const { dateRangeCuesAppended: s, id3Track: i } = this, { dateRanges: r } = t, a = Object.keys(r);
            if (i) {
                const d = Object.keys(s).filter((u)=>!a.includes(u));
                for(let u = d.length; u--;){
                    const h = d[u];
                    Object.keys(s[h].cues).forEach((f)=>{
                        i.removeCue(s[h].cues[f]);
                    }), delete s[h];
                }
            }
            const o = t.fragments[t.fragments.length - 1];
            if (a.length === 0 || !M(o?.programDateTime)) return;
            this.id3Track || (this.id3Track = this.createTrack(this.media));
            const l = o.programDateTime / 1e3 - o.start, c = Oi();
            for(let d = 0; d < a.length; d++){
                const u = a[d], h = r[u], f = li(h.startDate, l), g = s[u], m = g?.cues || {};
                let y = g?.durationKnown || !1, E = ss;
                const x = h.endDate;
                if (x) E = li(x, l), y = !0;
                else if (h.endOnNext && !y) {
                    const R = a.reduce((v, D)=>{
                        if (D !== h.id) {
                            const b = r[D];
                            if (b.class === h.class && b.startDate > h.startDate && (!v || h.startDate < v.startDate)) return b;
                        }
                        return v;
                    }, null);
                    R && (E = li(R.startDate, l), y = !0);
                }
                const T = Object.keys(h.attr);
                for(let R = 0; R < T.length; R++){
                    const v = T[R];
                    if (!Ro(v)) continue;
                    const D = m[v];
                    if (D) y && !g.durationKnown && (D.endTime = E);
                    else if (c) {
                        let b = h.attr[v];
                        Io(v) && (b = Sl(b));
                        const w = Wn(c, f, E, {
                            key: v,
                            data: b
                        }, Fe.dateRange);
                        w && (w.id = u, this.id3Track.addCue(w), m[v] = w);
                    }
                }
                s[u] = {
                    cues: m,
                    dateRange: h,
                    durationKnown: y
                };
            }
        }
    }
    class Al {
        constructor(e){
            this.hls = void 0, this.config = void 0, this.media = null, this.levelDetails = null, this.currentTime = 0, this.stallCount = 0, this._latency = null, this.timeupdateHandler = ()=>this.timeupdate(), this.hls = e, this.config = e.config, this.registerListeners();
        }
        get latency() {
            return this._latency || 0;
        }
        get maxLatency() {
            const { config: e, levelDetails: t } = this;
            return e.liveMaxLatencyDuration !== void 0 ? e.liveMaxLatencyDuration : t ? e.liveMaxLatencyDurationCount * t.targetduration : 0;
        }
        get targetLatency() {
            const { levelDetails: e } = this;
            if (e === null) return null;
            const { holdBack: t, partHoldBack: s, targetduration: i } = e, { liveSyncDuration: r, liveSyncDurationCount: a, lowLatencyMode: o } = this.config, l = this.hls.userConfig;
            let c = o && s || t;
            (l.liveSyncDuration || l.liveSyncDurationCount || c === 0) && (c = r !== void 0 ? r : a * i);
            const d = i;
            return c + Math.min(this.stallCount * 1, d);
        }
        get liveSyncPosition() {
            const e = this.estimateLiveEdge(), t = this.targetLatency, s = this.levelDetails;
            if (e === null || t === null || s === null) return null;
            const i = s.edge, r = e - t - this.edgeStalled, a = i - s.totalduration, o = i - (this.config.lowLatencyMode && s.partTarget || s.targetduration);
            return Math.min(Math.max(a, r), o);
        }
        get drift() {
            const { levelDetails: e } = this;
            return e === null ? 1 : e.drift;
        }
        get edgeStalled() {
            const { levelDetails: e } = this;
            if (e === null) return 0;
            const t = (this.config.lowLatencyMode && e.partTarget || e.targetduration) * 3;
            return Math.max(e.age - t, 0);
        }
        get forwardBufferLength() {
            const { media: e, levelDetails: t } = this;
            if (!e || !t) return 0;
            const s = e.buffered.length;
            return (s ? e.buffered.end(s - 1) : t.edge) - this.currentTime;
        }
        destroy() {
            this.unregisterListeners(), this.onMediaDetaching(), this.levelDetails = null, this.hls = this.timeupdateHandler = null;
        }
        registerListeners() {
            this.hls.on(p.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(p.MEDIA_DETACHING, this.onMediaDetaching, this), this.hls.on(p.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.on(p.LEVEL_UPDATED, this.onLevelUpdated, this), this.hls.on(p.ERROR, this.onError, this);
        }
        unregisterListeners() {
            this.hls.off(p.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.off(p.MEDIA_DETACHING, this.onMediaDetaching, this), this.hls.off(p.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.off(p.LEVEL_UPDATED, this.onLevelUpdated, this), this.hls.off(p.ERROR, this.onError, this);
        }
        onMediaAttached(e, t) {
            this.media = t.media, this.media.addEventListener("timeupdate", this.timeupdateHandler);
        }
        onMediaDetaching() {
            this.media && (this.media.removeEventListener("timeupdate", this.timeupdateHandler), this.media = null);
        }
        onManifestLoading() {
            this.levelDetails = null, this._latency = null, this.stallCount = 0;
        }
        onLevelUpdated(e, { details: t }) {
            this.levelDetails = t, t.advanced && this.timeupdate(), !t.live && this.media && this.media.removeEventListener("timeupdate", this.timeupdateHandler);
        }
        onError(e, t) {
            var s;
            t.details === A.BUFFER_STALLED_ERROR && (this.stallCount++, (s = this.levelDetails) != null && s.live && S.warn("[playback-rate-controller]: Stall detected, adjusting target latency"));
        }
        timeupdate() {
            const { media: e, levelDetails: t } = this;
            if (!e || !t) return;
            this.currentTime = e.currentTime;
            const s = this.computeLatency();
            if (s === null) return;
            this._latency = s;
            const { lowLatencyMode: i, maxLiveSyncPlaybackRate: r } = this.config;
            if (!i || r === 1 || !t.live) return;
            const a = this.targetLatency;
            if (a === null) return;
            const o = s - a, l = Math.min(this.maxLatency, a + t.targetduration);
            if (o < l && o > .05 && this.forwardBufferLength > 1) {
                const d = Math.min(2, Math.max(1, r)), u = Math.round(2 / (1 + Math.exp(-.75 * o - this.edgeStalled)) * 20) / 20;
                e.playbackRate = Math.min(d, Math.max(1, u));
            } else e.playbackRate !== 1 && e.playbackRate !== 0 && (e.playbackRate = 1);
        }
        estimateLiveEdge() {
            const { levelDetails: e } = this;
            return e === null ? null : e.edge + e.age;
        }
        computeLatency() {
            const e = this.estimateLiveEdge();
            return e === null ? null : e - this.currentTime;
        }
    }
    const Mi = [
        "NONE",
        "TYPE-0",
        "TYPE-1",
        null
    ];
    function bl(n) {
        return Mi.indexOf(n) > -1;
    }
    const ks = [
        "SDR",
        "PQ",
        "HLG"
    ];
    function Rl(n) {
        return !!n && ks.indexOf(n) > -1;
    }
    var ms = {
        No: "",
        Yes: "YES",
        v2: "v2"
    };
    function Yn(n) {
        const { canSkipUntil: e, canSkipDateRanges: t, age: s } = n, i = s < e / 2;
        return e && i ? t ? ms.v2 : ms.Yes : ms.No;
    }
    class qn {
        constructor(e, t, s){
            this.msn = void 0, this.part = void 0, this.skip = void 0, this.msn = e, this.part = t, this.skip = s;
        }
        addDirectives(e) {
            const t = new self.URL(e);
            return this.msn !== void 0 && t.searchParams.set("_HLS_msn", this.msn.toString()), this.part !== void 0 && t.searchParams.set("_HLS_part", this.part.toString()), this.skip && t.searchParams.set("_HLS_skip", this.skip), t.href;
        }
    }
    class Dt {
        constructor(e){
            this._attrs = void 0, this.audioCodec = void 0, this.bitrate = void 0, this.codecSet = void 0, this.url = void 0, this.frameRate = void 0, this.height = void 0, this.id = void 0, this.name = void 0, this.videoCodec = void 0, this.width = void 0, this.details = void 0, this.fragmentError = 0, this.loadError = 0, this.loaded = void 0, this.realBitrate = 0, this.supportedPromise = void 0, this.supportedResult = void 0, this._avgBitrate = 0, this._audioGroups = void 0, this._subtitleGroups = void 0, this._urlId = 0, this.url = [
                e.url
            ], this._attrs = [
                e.attrs
            ], this.bitrate = e.bitrate, e.details && (this.details = e.details), this.id = e.id || 0, this.name = e.name, this.width = e.width || 0, this.height = e.height || 0, this.frameRate = e.attrs.optionalFloat("FRAME-RATE", 0), this._avgBitrate = e.attrs.decimalInteger("AVERAGE-BANDWIDTH"), this.audioCodec = e.audioCodec, this.videoCodec = e.videoCodec, this.codecSet = [
                e.videoCodec,
                e.audioCodec
            ].filter((t)=>!!t).map((t)=>t.substring(0, 4)).join(","), this.addGroupId("audio", e.attrs.AUDIO), this.addGroupId("text", e.attrs.SUBTITLES);
        }
        get maxBitrate() {
            return Math.max(this.realBitrate, this.bitrate);
        }
        get averageBitrate() {
            return this._avgBitrate || this.realBitrate || this.bitrate;
        }
        get attrs() {
            return this._attrs[0];
        }
        get codecs() {
            return this.attrs.CODECS || "";
        }
        get pathwayId() {
            return this.attrs["PATHWAY-ID"] || ".";
        }
        get videoRange() {
            return this.attrs["VIDEO-RANGE"] || "SDR";
        }
        get score() {
            return this.attrs.optionalFloat("SCORE", 0);
        }
        get uri() {
            return this.url[0] || "";
        }
        hasAudioGroup(e) {
            return jn(this._audioGroups, e);
        }
        hasSubtitleGroup(e) {
            return jn(this._subtitleGroups, e);
        }
        get audioGroups() {
            return this._audioGroups;
        }
        get subtitleGroups() {
            return this._subtitleGroups;
        }
        addGroupId(e, t) {
            if (t) {
                if (e === "audio") {
                    let s = this._audioGroups;
                    s || (s = this._audioGroups = []), s.indexOf(t) === -1 && s.push(t);
                } else if (e === "text") {
                    let s = this._subtitleGroups;
                    s || (s = this._subtitleGroups = []), s.indexOf(t) === -1 && s.push(t);
                }
            }
        }
        get urlId() {
            return 0;
        }
        set urlId(e) {}
        get audioGroupIds() {
            return this.audioGroups ? [
                this.audioGroupId
            ] : void 0;
        }
        get textGroupIds() {
            return this.subtitleGroups ? [
                this.textGroupId
            ] : void 0;
        }
        get audioGroupId() {
            var e;
            return (e = this.audioGroups) == null ? void 0 : e[0];
        }
        get textGroupId() {
            var e;
            return (e = this.subtitleGroups) == null ? void 0 : e[0];
        }
        addFallback() {}
    }
    function jn(n, e) {
        return !e || !n ? !1 : n.indexOf(e) !== -1;
    }
    function ci(n, e) {
        const t = e.startPTS;
        if (M(t)) {
            let s = 0, i;
            e.sn > n.sn ? (s = t - n.start, i = n) : (s = n.start - t, i = e), i.duration !== s && (i.duration = s);
        } else e.sn > n.sn ? n.cc === e.cc && n.minEndPTS ? e.start = n.start + (n.minEndPTS - n.start) : e.start = n.start + n.duration : e.start = Math.max(n.start - e.duration, 0);
    }
    function aa(n, e, t, s, i, r) {
        s - t <= 0 && (S.warn("Fragment should have a positive duration", e), s = t + e.duration, r = i + e.duration);
        let o = t, l = s;
        const c = e.startPTS, d = e.endPTS;
        if (M(c)) {
            const y = Math.abs(c - t);
            M(e.deltaPTS) ? e.deltaPTS = Math.max(y, e.deltaPTS) : e.deltaPTS = y, o = Math.max(t, c), t = Math.min(t, c), i = Math.min(i, e.startDTS), l = Math.min(s, d), s = Math.max(s, d), r = Math.max(r, e.endDTS);
        }
        const u = t - e.start;
        e.start !== 0 && (e.start = t), e.duration = s - e.start, e.startPTS = t, e.maxStartPTS = o, e.startDTS = i, e.endPTS = s, e.minEndPTS = l, e.endDTS = r;
        const h = e.sn;
        if (!n || h < n.startSN || h > n.endSN) return 0;
        let f;
        const g = h - n.startSN, m = n.fragments;
        for(m[g] = e, f = g; f > 0; f--)ci(m[f], m[f - 1]);
        for(f = g; f < m.length - 1; f++)ci(m[f], m[f + 1]);
        return n.fragmentHint && ci(m[m.length - 1], n.fragmentHint), n.PTSKnown = n.alignedSliding = !0, u;
    }
    function Il(n, e) {
        let t = null;
        const s = n.fragments;
        for(let l = s.length - 1; l >= 0; l--){
            const c = s[l].initSegment;
            if (c) {
                t = c;
                break;
            }
        }
        n.fragmentHint && delete n.fragmentHint.endPTS;
        let i = 0, r;
        if (wl(n, e, (l, c)=>{
            l.relurl && (i = l.cc - c.cc), M(l.startPTS) && M(l.endPTS) && (c.start = c.startPTS = l.startPTS, c.startDTS = l.startDTS, c.maxStartPTS = l.maxStartPTS, c.endPTS = l.endPTS, c.endDTS = l.endDTS, c.minEndPTS = l.minEndPTS, c.duration = l.endPTS - l.startPTS, c.duration && (r = c), e.PTSKnown = e.alignedSliding = !0), c.elementaryStreams = l.elementaryStreams, c.loader = l.loader, c.stats = l.stats, l.initSegment && (c.initSegment = l.initSegment, t = l.initSegment);
        }), t && (e.fragmentHint ? e.fragments.concat(e.fragmentHint) : e.fragments).forEach((c)=>{
            var d;
            c && (!c.initSegment || c.initSegment.relurl === ((d = t) == null ? void 0 : d.relurl)) && (c.initSegment = t);
        }), e.skippedSegments) if (e.deltaUpdateFailed = e.fragments.some((l)=>!l), e.deltaUpdateFailed) {
            S.warn("[level-helper] Previous playlist missing segments skipped in delta playlist");
            for(let l = e.skippedSegments; l--;)e.fragments.shift();
            e.startSN = e.fragments[0].sn, e.startCC = e.fragments[0].cc;
        } else e.canSkipDateRanges && (e.dateRanges = Dl(n.dateRanges, e.dateRanges, e.recentlyRemovedDateranges));
        const a = e.fragments;
        if (i) {
            S.warn("discontinuity sliding from playlist, take drift into account");
            for(let l = 0; l < a.length; l++)a[l].cc += i;
        }
        e.skippedSegments && (e.startCC = e.fragments[0].cc), Cl(n.partList, e.partList, (l, c)=>{
            c.elementaryStreams = l.elementaryStreams, c.stats = l.stats;
        }), r ? aa(e, r, r.startPTS, r.endPTS, r.startDTS, r.endDTS) : oa(n, e), a.length && (e.totalduration = e.edge - a[0].start), e.driftStartTime = n.driftStartTime, e.driftStart = n.driftStart;
        const o = e.advancedDateTime;
        if (e.advanced && o) {
            const l = e.edge;
            e.driftStart || (e.driftStartTime = o, e.driftStart = l), e.driftEndTime = o, e.driftEnd = l;
        } else e.driftEndTime = n.driftEndTime, e.driftEnd = n.driftEnd, e.advancedDateTime = n.advancedDateTime;
    }
    function Dl(n, e, t) {
        const s = re({}, n);
        return t && t.forEach((i)=>{
            delete s[i];
        }), Object.keys(e).forEach((i)=>{
            const r = new Kr(e[i].attr, s[i]);
            r.isValid ? s[i] = r : S.warn(`Ignoring invalid Playlist Delta Update DATERANGE tag: "${JSON.stringify(e[i].attr)}"`);
        }), s;
    }
    function Cl(n, e, t) {
        if (n && e) {
            let s = 0;
            for(let i = 0, r = n.length; i <= r; i++){
                const a = n[i], o = e[i + s];
                a && o && a.index === o.index && a.fragment.sn === o.fragment.sn ? t(a, o) : s--;
            }
        }
    }
    function wl(n, e, t) {
        const s = e.skippedSegments, i = Math.max(n.startSN, e.startSN) - e.startSN, r = (n.fragmentHint ? 1 : 0) + (s ? e.endSN : Math.min(n.endSN, e.endSN)) - e.startSN, a = e.startSN - n.startSN, o = e.fragmentHint ? e.fragments.concat(e.fragmentHint) : e.fragments, l = n.fragmentHint ? n.fragments.concat(n.fragmentHint) : n.fragments;
        for(let c = i; c <= r; c++){
            const d = l[a + c];
            let u = o[c];
            s && !u && c < s && (u = e.fragments[c] = d), d && u && t(d, u);
        }
    }
    function oa(n, e) {
        const t = e.startSN + e.skippedSegments - n.startSN, s = n.fragments;
        t < 0 || t >= s.length || Ni(e, s[t].start);
    }
    function Ni(n, e) {
        if (e) {
            const t = n.fragments;
            for(let s = n.skippedSegments; s < t.length; s++)t[s].start += e;
            n.fragmentHint && (n.fragmentHint.start += e);
        }
    }
    function _l(n, e = 1 / 0) {
        let t = 1e3 * n.targetduration;
        if (n.updated) {
            const s = n.fragments;
            if (s.length && t * 4 > e) {
                const r = s[s.length - 1].duration * 1e3;
                r < t && (t = r);
            }
        } else t /= 2;
        return Math.round(t);
    }
    function kl(n, e, t) {
        if (!(n != null && n.details)) return null;
        const s = n.details;
        let i = s.fragments[e - s.startSN];
        return i || (i = s.fragmentHint, i && i.sn === e) ? i : e < s.startSN && t && t.sn === e ? t : null;
    }
    function zn(n, e, t) {
        var s;
        return n != null && n.details ? la((s = n.details) == null ? void 0 : s.partList, e, t) : null;
    }
    function la(n, e, t) {
        if (n) for(let s = n.length; s--;){
            const i = n[s];
            if (i.index === t && i.fragment.sn === e) return i;
        }
        return null;
    }
    function ca(n) {
        n.forEach((e, t)=>{
            const { details: s } = e;
            s != null && s.fragments && s.fragments.forEach((i)=>{
                i.level = t;
            });
        });
    }
    function Ps(n) {
        switch(n.details){
            case A.FRAG_LOAD_TIMEOUT:
            case A.KEY_LOAD_TIMEOUT:
            case A.LEVEL_LOAD_TIMEOUT:
            case A.MANIFEST_LOAD_TIMEOUT:
                return !0;
        }
        return !1;
    }
    function Xn(n, e) {
        const t = Ps(e);
        return n.default[`${t ? "timeout" : "error"}Retry`];
    }
    function rn(n, e) {
        const t = n.backoff === "linear" ? 1 : Math.pow(2, e);
        return Math.min(t * n.retryDelayMs, n.maxRetryDelayMs);
    }
    function Qn(n) {
        return ue(ue({}, n), {
            errorRetry: null,
            timeoutRetry: null
        });
    }
    function Fs(n, e, t, s) {
        if (!n) return !1;
        const i = s?.code, r = e < n.maxNumRetry && (Pl(i) || !!t);
        return n.shouldRetry ? n.shouldRetry(n, e, t, s, r) : r;
    }
    function Pl(n) {
        return n === 0 && navigator.onLine === !1 || !!n && (n < 400 || n > 499);
    }
    const da = {
        search: function(n, e) {
            let t = 0, s = n.length - 1, i = null, r = null;
            for(; t <= s;){
                i = (t + s) / 2 | 0, r = n[i];
                const a = e(r);
                if (a > 0) t = i + 1;
                else if (a < 0) s = i - 1;
                else return r;
            }
            return null;
        }
    };
    function Fl(n, e, t) {
        if (e === null || !Array.isArray(n) || !n.length || !M(e)) return null;
        const s = n[0].programDateTime;
        if (e < (s || 0)) return null;
        const i = n[n.length - 1].endProgramDateTime;
        if (e >= (i || 0)) return null;
        t = t || 0;
        for(let r = 0; r < n.length; ++r){
            const a = n[r];
            if (Ml(e, t, a)) return a;
        }
        return null;
    }
    function Os(n, e, t = 0, s = 0, i = .005) {
        let r = null;
        if (n) {
            r = e[n.sn - e[0].sn + 1] || null;
            const o = n.endDTS - t;
            o > 0 && o < 15e-7 && (t += 15e-7);
        } else t === 0 && e[0].start === 0 && (r = e[0]);
        if (r && ((!n || n.level === r.level) && Ui(t, s, r) === 0 || Ol(r, n, Math.min(i, s)))) return r;
        const a = da.search(e, Ui.bind(null, t, s));
        return a && (a !== n || !r) ? a : r;
    }
    function Ol(n, e, t) {
        if (e && e.start === 0 && e.level < n.level && (e.endPTS || 0) > 0) {
            const s = e.tagList.reduce((i, r)=>(r[0] === "INF" && (i += parseFloat(r[1])), i), t);
            return n.start <= s;
        }
        return !1;
    }
    function Ui(n = 0, e = 0, t) {
        if (t.start <= n && t.start + t.duration > n) return 0;
        const s = Math.min(e, t.duration + (t.deltaPTS ? t.deltaPTS : 0));
        return t.start + t.duration - s <= n ? 1 : t.start - s > n && t.start ? -1 : 0;
    }
    function Ml(n, e, t) {
        const s = Math.min(e, t.duration + (t.deltaPTS ? t.deltaPTS : 0)) * 1e3;
        return (t.endProgramDateTime || 0) - s > n;
    }
    function Nl(n, e) {
        return da.search(n, (t)=>t.cc < e ? 1 : t.cc > e ? -1 : 0);
    }
    var fe = {
        DoNothing: 0,
        SendAlternateToPenaltyBox: 2,
        RemoveAlternatePermanently: 3,
        RetryRequest: 5
    }, we = {
        None: 0,
        MoveAllAlternatesMatchingHost: 1,
        MoveAllAlternatesMatchingHDCP: 2
    };
    class Ul {
        constructor(e){
            this.hls = void 0, this.playlistError = 0, this.penalizedRenditions = {}, this.log = void 0, this.warn = void 0, this.error = void 0, this.hls = e, this.log = S.log.bind(S, "[info]:"), this.warn = S.warn.bind(S, "[warning]:"), this.error = S.error.bind(S, "[error]:"), this.registerListeners();
        }
        registerListeners() {
            const e = this.hls;
            e.on(p.ERROR, this.onError, this), e.on(p.MANIFEST_LOADING, this.onManifestLoading, this), e.on(p.LEVEL_UPDATED, this.onLevelUpdated, this);
        }
        unregisterListeners() {
            const e = this.hls;
            e && (e.off(p.ERROR, this.onError, this), e.off(p.ERROR, this.onErrorOut, this), e.off(p.MANIFEST_LOADING, this.onManifestLoading, this), e.off(p.LEVEL_UPDATED, this.onLevelUpdated, this));
        }
        destroy() {
            this.unregisterListeners(), this.hls = null, this.penalizedRenditions = {};
        }
        startLoad(e) {}
        stopLoad() {
            this.playlistError = 0;
        }
        getVariantLevelIndex(e) {
            return e?.type === B.MAIN ? e.level : this.hls.loadLevel;
        }
        onManifestLoading() {
            this.playlistError = 0, this.penalizedRenditions = {};
        }
        onLevelUpdated() {
            this.playlistError = 0;
        }
        onError(e, t) {
            var s, i;
            if (t.fatal) return;
            const r = this.hls, a = t.context;
            switch(t.details){
                case A.FRAG_LOAD_ERROR:
                case A.FRAG_LOAD_TIMEOUT:
                case A.KEY_LOAD_ERROR:
                case A.KEY_LOAD_TIMEOUT:
                    t.errorAction = this.getFragRetryOrSwitchAction(t);
                    return;
                case A.FRAG_PARSING_ERROR:
                    if ((s = t.frag) != null && s.gap) {
                        t.errorAction = {
                            action: fe.DoNothing,
                            flags: we.None
                        };
                        return;
                    }
                case A.FRAG_GAP:
                case A.FRAG_DECRYPT_ERROR:
                    {
                        t.errorAction = this.getFragRetryOrSwitchAction(t), t.errorAction.action = fe.SendAlternateToPenaltyBox;
                        return;
                    }
                case A.LEVEL_EMPTY_ERROR:
                case A.LEVEL_PARSING_ERROR:
                    {
                        var o, l;
                        const c = t.parent === B.MAIN ? t.level : r.loadLevel;
                        t.details === A.LEVEL_EMPTY_ERROR && ((o = t.context) != null && (l = o.levelDetails) != null && l.live) ? t.errorAction = this.getPlaylistRetryOrSwitchAction(t, c) : (t.levelRetry = !1, t.errorAction = this.getLevelSwitchAction(t, c));
                    }
                    return;
                case A.LEVEL_LOAD_ERROR:
                case A.LEVEL_LOAD_TIMEOUT:
                    typeof a?.level == "number" && (t.errorAction = this.getPlaylistRetryOrSwitchAction(t, a.level));
                    return;
                case A.AUDIO_TRACK_LOAD_ERROR:
                case A.AUDIO_TRACK_LOAD_TIMEOUT:
                case A.SUBTITLE_LOAD_ERROR:
                case A.SUBTITLE_TRACK_LOAD_TIMEOUT:
                    if (a) {
                        const c = r.levels[r.loadLevel];
                        if (c && (a.type === q.AUDIO_TRACK && c.hasAudioGroup(a.groupId) || a.type === q.SUBTITLE_TRACK && c.hasSubtitleGroup(a.groupId))) {
                            t.errorAction = this.getPlaylistRetryOrSwitchAction(t, r.loadLevel), t.errorAction.action = fe.SendAlternateToPenaltyBox, t.errorAction.flags = we.MoveAllAlternatesMatchingHost;
                            return;
                        }
                    }
                    return;
                case A.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED:
                    {
                        const c = r.levels[r.loadLevel], d = c?.attrs["HDCP-LEVEL"];
                        d ? t.errorAction = {
                            action: fe.SendAlternateToPenaltyBox,
                            flags: we.MoveAllAlternatesMatchingHDCP,
                            hdcpLevel: d
                        } : this.keySystemError(t);
                    }
                    return;
                case A.BUFFER_ADD_CODEC_ERROR:
                case A.REMUX_ALLOC_ERROR:
                case A.BUFFER_APPEND_ERROR:
                    t.errorAction = this.getLevelSwitchAction(t, (i = t.level) != null ? i : r.loadLevel);
                    return;
                case A.INTERNAL_EXCEPTION:
                case A.BUFFER_APPENDING_ERROR:
                case A.BUFFER_FULL_ERROR:
                case A.LEVEL_SWITCH_ERROR:
                case A.BUFFER_STALLED_ERROR:
                case A.BUFFER_SEEK_OVER_HOLE:
                case A.BUFFER_NUDGE_ON_STALL:
                    t.errorAction = {
                        action: fe.DoNothing,
                        flags: we.None
                    };
                    return;
            }
            t.type === G.KEY_SYSTEM_ERROR && this.keySystemError(t);
        }
        keySystemError(e) {
            const t = this.getVariantLevelIndex(e.frag);
            e.levelRetry = !1, e.errorAction = this.getLevelSwitchAction(e, t);
        }
        getPlaylistRetryOrSwitchAction(e, t) {
            const s = this.hls, i = Xn(s.config.playlistLoadPolicy, e), r = this.playlistError++;
            if (Fs(i, r, Ps(e), e.response)) return {
                action: fe.RetryRequest,
                flags: we.None,
                retryConfig: i,
                retryCount: r
            };
            const o = this.getLevelSwitchAction(e, t);
            return i && (o.retryConfig = i, o.retryCount = r), o;
        }
        getFragRetryOrSwitchAction(e) {
            const t = this.hls, s = this.getVariantLevelIndex(e.frag), i = t.levels[s], { fragLoadPolicy: r, keyLoadPolicy: a } = t.config, o = Xn(e.details.startsWith("key") ? a : r, e), l = t.levels.reduce((d, u)=>d + u.fragmentError, 0);
            if (i && (e.details !== A.FRAG_GAP && i.fragmentError++, Fs(o, l, Ps(e), e.response))) return {
                action: fe.RetryRequest,
                flags: we.None,
                retryConfig: o,
                retryCount: l
            };
            const c = this.getLevelSwitchAction(e, s);
            return o && (c.retryConfig = o, c.retryCount = l), c;
        }
        getLevelSwitchAction(e, t) {
            const s = this.hls;
            t == null && (t = s.loadLevel);
            const i = this.hls.levels[t];
            if (i) {
                var r, a;
                const c = e.details;
                i.loadError++, c === A.BUFFER_APPEND_ERROR && i.fragmentError++;
                let d = -1;
                const { levels: u, loadLevel: h, minAutoLevel: f, maxAutoLevel: g } = s;
                s.autoLevelEnabled || (s.loadLevel = -1);
                const m = (r = e.frag) == null ? void 0 : r.type, E = (m === B.AUDIO && c === A.FRAG_PARSING_ERROR || e.sourceBufferName === "audio" && (c === A.BUFFER_ADD_CODEC_ERROR || c === A.BUFFER_APPEND_ERROR)) && u.some(({ audioCodec: D })=>i.audioCodec !== D), T = e.sourceBufferName === "video" && (c === A.BUFFER_ADD_CODEC_ERROR || c === A.BUFFER_APPEND_ERROR) && u.some(({ codecSet: D, audioCodec: b })=>i.codecSet !== D && i.audioCodec === b), { type: R, groupId: v } = (a = e.context) != null ? a : {};
                for(let D = u.length; D--;){
                    const b = (D + h) % u.length;
                    if (b !== h && b >= f && b <= g && u[b].loadError === 0) {
                        var o, l;
                        const w = u[b];
                        if (c === A.FRAG_GAP && m === B.MAIN && e.frag) {
                            const P = u[b].details;
                            if (P) {
                                const I = Os(e.frag, P.fragments, e.frag.start);
                                if (I != null && I.gap) continue;
                            }
                        } else {
                            if (R === q.AUDIO_TRACK && w.hasAudioGroup(v) || R === q.SUBTITLE_TRACK && w.hasSubtitleGroup(v)) continue;
                            if (m === B.AUDIO && (o = i.audioGroups) != null && o.some((P)=>w.hasAudioGroup(P)) || m === B.SUBTITLE && (l = i.subtitleGroups) != null && l.some((P)=>w.hasSubtitleGroup(P)) || E && i.audioCodec === w.audioCodec || !E && i.audioCodec !== w.audioCodec || T && i.codecSet === w.codecSet) continue;
                        }
                        d = b;
                        break;
                    }
                }
                if (d > -1 && s.loadLevel !== d) return e.levelRetry = !0, this.playlistError = 0, {
                    action: fe.SendAlternateToPenaltyBox,
                    flags: we.None,
                    nextAutoLevel: d
                };
            }
            return {
                action: fe.SendAlternateToPenaltyBox,
                flags: we.MoveAllAlternatesMatchingHost
            };
        }
        onErrorOut(e, t) {
            var s;
            switch((s = t.errorAction) == null ? void 0 : s.action){
                case fe.DoNothing:
                    break;
                case fe.SendAlternateToPenaltyBox:
                    this.sendAlternateToPenaltyBox(t), !t.errorAction.resolved && t.details !== A.FRAG_GAP ? t.fatal = !0 : /MediaSource readyState: ended/.test(t.error.message) && (this.warn(`MediaSource ended after "${t.sourceBufferName}" sourceBuffer append error. Attempting to recover from media error.`), this.hls.recoverMediaError());
                    break;
            }
            if (t.fatal) {
                this.hls.stopLoad();
                return;
            }
        }
        sendAlternateToPenaltyBox(e) {
            const t = this.hls, s = e.errorAction;
            if (!s) return;
            const { flags: i, hdcpLevel: r, nextAutoLevel: a } = s;
            switch(i){
                case we.None:
                    this.switchLevel(e, a);
                    break;
                case we.MoveAllAlternatesMatchingHDCP:
                    r && (t.maxHdcpLevel = Mi[Mi.indexOf(r) - 1], s.resolved = !0), this.warn(`Restricting playback to HDCP-LEVEL of "${t.maxHdcpLevel}" or lower`);
                    break;
            }
            s.resolved || this.switchLevel(e, a);
        }
        switchLevel(e, t) {
            t !== void 0 && e.errorAction && (this.warn(`switching to level ${t} after ${e.details}`), this.hls.nextAutoLevel = t, e.errorAction.resolved = !0, this.hls.nextLoadLevel = this.hls.nextAutoLevel);
        }
    }
    class an {
        constructor(e, t){
            this.hls = void 0, this.timer = -1, this.requestScheduled = -1, this.canLoad = !1, this.log = void 0, this.warn = void 0, this.log = S.log.bind(S, `${t}:`), this.warn = S.warn.bind(S, `${t}:`), this.hls = e;
        }
        destroy() {
            this.clearTimer(), this.hls = this.log = this.warn = null;
        }
        clearTimer() {
            this.timer !== -1 && (self.clearTimeout(this.timer), this.timer = -1);
        }
        startLoad() {
            this.canLoad = !0, this.requestScheduled = -1, this.loadPlaylist();
        }
        stopLoad() {
            this.canLoad = !1, this.clearTimer();
        }
        switchParams(e, t, s) {
            const i = t?.renditionReports;
            if (i) {
                let r = -1;
                for(let a = 0; a < i.length; a++){
                    const o = i[a];
                    let l;
                    try {
                        l = new self.URL(o.URI, t.url).href;
                    } catch (c) {
                        S.warn(`Could not construct new URL for Rendition Report: ${c}`), l = o.URI || "";
                    }
                    if (l === e) {
                        r = a;
                        break;
                    } else l === e.substring(0, l.length) && (r = a);
                }
                if (r !== -1) {
                    const a = i[r], o = parseInt(a["LAST-MSN"]) || t?.lastPartSn;
                    let l = parseInt(a["LAST-PART"]) || t?.lastPartIndex;
                    if (this.hls.config.lowLatencyMode) {
                        const d = Math.min(t.age - t.partTarget, t.targetduration);
                        l >= 0 && d > t.partTarget && (l += 1);
                    }
                    const c = s && Yn(s);
                    return new qn(o, l >= 0 ? l : void 0, c);
                }
            }
        }
        loadPlaylist(e) {
            this.requestScheduled === -1 && (this.requestScheduled = self.performance.now());
        }
        shouldLoadPlaylist(e) {
            return this.canLoad && !!e && !!e.url && (!e.details || e.details.live);
        }
        shouldReloadPlaylist(e) {
            return this.timer === -1 && this.requestScheduled === -1 && this.shouldLoadPlaylist(e);
        }
        playlistLoaded(e, t, s) {
            const { details: i, stats: r } = t, a = self.performance.now(), o = r.loading.first ? Math.max(0, a - r.loading.first) : 0;
            if (i.advancedDateTime = Date.now() - o, i.live || s != null && s.live) {
                if (i.reloaded(s), s && this.log(`live playlist ${e} ${i.advanced ? "REFRESHED " + i.lastPartSn + "-" + i.lastPartIndex : i.updated ? "UPDATED" : "MISSED"}`), s && i.fragments.length > 0 && Il(s, i), !this.canLoad || !i.live) return;
                let l, c, d;
                if (i.canBlockReload && i.endSN && i.advanced) {
                    const y = this.hls.config.lowLatencyMode, E = i.lastPartSn, x = i.endSN, T = i.lastPartIndex, R = T !== -1, v = E === x, D = y ? 0 : T;
                    R ? (c = v ? x + 1 : E, d = v ? D : T + 1) : c = x + 1;
                    const b = i.age, w = b + i.ageHeader;
                    let P = Math.min(w - i.partTarget, i.targetduration * 1.5);
                    if (P > 0) {
                        if (s && P > s.tuneInGoal) this.warn(`CDN Tune-in goal increased from: ${s.tuneInGoal} to: ${P} with playlist age: ${i.age}`), P = 0;
                        else {
                            const I = Math.floor(P / i.targetduration);
                            if (c += I, d !== void 0) {
                                const _ = Math.round(P % i.targetduration / i.partTarget);
                                d += _;
                            }
                            this.log(`CDN Tune-in age: ${i.ageHeader}s last advanced ${b.toFixed(2)}s goal: ${P} skip sn ${I} to part ${d}`);
                        }
                        i.tuneInGoal = P;
                    }
                    if (l = this.getDeliveryDirectives(i, t.deliveryDirectives, c, d), y || !v) {
                        this.loadPlaylist(l);
                        return;
                    }
                } else (i.canBlockReload || i.canSkipUntil) && (l = this.getDeliveryDirectives(i, t.deliveryDirectives, c, d));
                const u = this.hls.mainForwardBufferInfo, h = u ? u.end - u.len : 0, f = (i.edge - h) * 1e3, g = _l(i, f);
                i.updated && a > this.requestScheduled + g && (this.requestScheduled = r.loading.start), c !== void 0 && i.canBlockReload ? this.requestScheduled = r.loading.first + g - (i.partTarget * 1e3 || 1e3) : this.requestScheduled === -1 || this.requestScheduled + g < a ? this.requestScheduled = a : this.requestScheduled - a <= 0 && (this.requestScheduled += g);
                let m = this.requestScheduled - a;
                m = Math.max(0, m), this.log(`reload live playlist ${e} in ${Math.round(m)} ms`), this.timer = self.setTimeout(()=>this.loadPlaylist(l), m);
            } else this.clearTimer();
        }
        getDeliveryDirectives(e, t, s, i) {
            let r = Yn(e);
            return t != null && t.skip && e.deltaUpdateFailed && (s = t.msn, i = t.part, r = ms.No), new qn(s, i, r);
        }
        checkRetry(e) {
            const t = e.details, s = Ps(e), i = e.errorAction, { action: r, retryCount: a = 0, retryConfig: o } = i || {}, l = !!i && !!o && (r === fe.RetryRequest || !i.resolved && r === fe.SendAlternateToPenaltyBox);
            if (l) {
                var c;
                if (this.requestScheduled = -1, a >= o.maxNumRetry) return !1;
                if (s && (c = e.context) != null && c.deliveryDirectives) this.warn(`Retrying playlist loading ${a + 1}/${o.maxNumRetry} after "${t}" without delivery-directives`), this.loadPlaylist();
                else {
                    const d = rn(o, a);
                    this.timer = self.setTimeout(()=>this.loadPlaylist(), d), this.warn(`Retrying playlist loading ${a + 1}/${o.maxNumRetry} after "${t}" in ${d}ms`);
                }
                e.levelRetry = !0, i.resolved = !0;
            }
            return l;
        }
    }
    class yt {
        constructor(e, t = 0, s = 0){
            this.halfLife = void 0, this.alpha_ = void 0, this.estimate_ = void 0, this.totalWeight_ = void 0, this.halfLife = e, this.alpha_ = e ? Math.exp(Math.log(.5) / e) : 0, this.estimate_ = t, this.totalWeight_ = s;
        }
        sample(e, t) {
            const s = Math.pow(this.alpha_, e);
            this.estimate_ = t * (1 - s) + s * this.estimate_, this.totalWeight_ += e;
        }
        getTotalWeight() {
            return this.totalWeight_;
        }
        getEstimate() {
            if (this.alpha_) {
                const e = 1 - Math.pow(this.alpha_, this.totalWeight_);
                if (e) return this.estimate_ / e;
            }
            return this.estimate_;
        }
    }
    class Bl {
        constructor(e, t, s, i = 100){
            this.defaultEstimate_ = void 0, this.minWeight_ = void 0, this.minDelayMs_ = void 0, this.slow_ = void 0, this.fast_ = void 0, this.defaultTTFB_ = void 0, this.ttfb_ = void 0, this.defaultEstimate_ = s, this.minWeight_ = .001, this.minDelayMs_ = 50, this.slow_ = new yt(e), this.fast_ = new yt(t), this.defaultTTFB_ = i, this.ttfb_ = new yt(e);
        }
        update(e, t) {
            const { slow_: s, fast_: i, ttfb_: r } = this;
            s.halfLife !== e && (this.slow_ = new yt(e, s.getEstimate(), s.getTotalWeight())), i.halfLife !== t && (this.fast_ = new yt(t, i.getEstimate(), i.getTotalWeight())), r.halfLife !== e && (this.ttfb_ = new yt(e, r.getEstimate(), r.getTotalWeight()));
        }
        sample(e, t) {
            e = Math.max(e, this.minDelayMs_);
            const s = 8 * t, i = e / 1e3, r = s / i;
            this.fast_.sample(i, r), this.slow_.sample(i, r);
        }
        sampleTTFB(e) {
            const t = e / 1e3, s = Math.sqrt(2) * Math.exp(-Math.pow(t, 2) / 2);
            this.ttfb_.sample(s, Math.max(e, 5));
        }
        canEstimate() {
            return this.fast_.getTotalWeight() >= this.minWeight_;
        }
        getEstimate() {
            return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_;
        }
        getEstimateTTFB() {
            return this.ttfb_.getTotalWeight() >= this.minWeight_ ? this.ttfb_.getEstimate() : this.defaultTTFB_;
        }
        destroy() {}
    }
    const ua = {
        supported: !0,
        configurations: [],
        decodingInfoResults: [
            {
                supported: !0,
                powerEfficient: !0,
                smooth: !0
            }
        ]
    }, Jn = {};
    function $l(n, e, t, s, i, r) {
        const a = n.audioCodec ? n.audioGroups : null, o = r?.audioCodec, l = r?.channels, c = l ? parseInt(l) : o ? 1 / 0 : 2;
        let d = null;
        if (a != null && a.length) try {
            a.length === 1 && a[0] ? d = e.groups[a[0]].channels : d = a.reduce((u, h)=>{
                if (h) {
                    const f = e.groups[h];
                    if (!f) throw new Error(`Audio track group ${h} not found`);
                    Object.keys(f.channels).forEach((g)=>{
                        u[g] = (u[g] || 0) + f.channels[g];
                    });
                }
                return u;
            }, {
                2: 0
            });
        } catch  {
            return !0;
        }
        return n.videoCodec !== void 0 && (n.width > 1920 && n.height > 1088 || n.height > 1920 && n.width > 1088 || n.frameRate > Math.max(s, 30) || n.videoRange !== "SDR" && n.videoRange !== t || n.bitrate > Math.max(i, 8e6)) || !!d && M(c) && Object.keys(d).some((u)=>parseInt(u) > c);
    }
    function Gl(n, e, t) {
        const s = n.videoCodec, i = n.audioCodec;
        if (!s || !i || !t) return Promise.resolve(ua);
        const r = {
            width: n.width,
            height: n.height,
            bitrate: Math.ceil(Math.max(n.bitrate * .9, n.averageBitrate)),
            framerate: n.frameRate || 30
        }, a = n.videoRange;
        a !== "SDR" && (r.transferFunction = a.toLowerCase());
        const o = s.split(",").map((l)=>({
                type: "media-source",
                video: ue(ue({}, r), {}, {
                    contentType: Xt(l, "video")
                })
            }));
        return i && n.audioGroups && n.audioGroups.forEach((l)=>{
            var c;
            l && ((c = e.groups[l]) == null || c.tracks.forEach((d)=>{
                if (d.groupId === l) {
                    const u = d.channels || "", h = parseFloat(u);
                    M(h) && h > 2 && o.push.apply(o, i.split(",").map((f)=>({
                            type: "media-source",
                            audio: {
                                contentType: Xt(f, "audio"),
                                channels: "" + h
                            }
                        })));
                }
            }));
        }), Promise.all(o.map((l)=>{
            const c = Kl(l);
            return Jn[c] || (Jn[c] = t.decodingInfo(l));
        })).then((l)=>({
                supported: !l.some((c)=>!c.supported),
                configurations: o,
                decodingInfoResults: l
            })).catch((l)=>({
                supported: !1,
                configurations: o,
                decodingInfoResults: [],
                error: l
            }));
    }
    function Kl(n) {
        const { audio: e, video: t } = n, s = t || e;
        if (s) {
            const i = s.contentType.split('"')[1];
            if (t) return `r${t.height}x${t.width}f${Math.ceil(t.framerate)}${t.transferFunction || "sd"}_${i}_${Math.ceil(t.bitrate / 1e5)}`;
            if (e) return `c${e.channels}${e.spatialRendering ? "s" : "n"}_${i}`;
        }
        return "";
    }
    function Hl() {
        if (typeof matchMedia == "function") {
            const n = matchMedia("(dynamic-range: high)"), e = matchMedia("bad query");
            if (n.media !== e.media) return n.matches === !0;
        }
        return !1;
    }
    function Vl(n, e) {
        let t = !1, s = [];
        return n && (t = n !== "SDR", s = [
            n
        ]), e && (s = e.allowedVideoRanges || ks.slice(0), t = e.preferHDR !== void 0 ? e.preferHDR : Hl(), t ? s = s.filter((i)=>i !== "SDR") : s = [
            "SDR"
        ]), {
            preferHDR: t,
            allowedVideoRanges: s
        };
    }
    function Wl(n, e, t, s, i) {
        const r = Object.keys(n), a = s?.channels, o = s?.audioCodec, l = a && parseInt(a) === 2;
        let c = !0, d = !1, u = 1 / 0, h = 1 / 0, f = 1 / 0, g = 0, m = [];
        const { preferHDR: y, allowedVideoRanges: E } = Vl(e, i);
        for(let v = r.length; v--;){
            const D = n[r[v]];
            c = D.channels[2] > 0, u = Math.min(u, D.minHeight), h = Math.min(h, D.minFramerate), f = Math.min(f, D.minBitrate);
            const b = E.filter((w)=>D.videoRanges[w] > 0);
            b.length > 0 && (d = !0, m = b);
        }
        u = M(u) ? u : 0, h = M(h) ? h : 0;
        const x = Math.max(1080, u), T = Math.max(30, h);
        return f = M(f) ? f : t, t = Math.max(f, t), d || (e = void 0, m = []), {
            codecSet: r.reduce((v, D)=>{
                const b = n[D];
                if (D === v) return v;
                if (b.minBitrate > t) return Ye(D, `min bitrate of ${b.minBitrate} > current estimate of ${t}`), v;
                if (!b.hasDefaultAudio) return Ye(D, "no renditions with default or auto-select sound found"), v;
                if (o && D.indexOf(o.substring(0, 4)) % 5 !== 0) return Ye(D, `audio codec preference "${o}" not found`), v;
                if (a && !l) {
                    if (!b.channels[a]) return Ye(D, `no renditions with ${a} channel sound found (channels options: ${Object.keys(b.channels)})`), v;
                } else if ((!o || l) && c && b.channels[2] === 0) return Ye(D, "no renditions with stereo sound found"), v;
                return b.minHeight > x ? (Ye(D, `min resolution of ${b.minHeight} > maximum of ${x}`), v) : b.minFramerate > T ? (Ye(D, `min framerate of ${b.minFramerate} > maximum of ${T}`), v) : m.some((w)=>b.videoRanges[w] > 0) ? b.maxScore < g ? (Ye(D, `max score of ${b.maxScore} < selected max of ${g}`), v) : v && (ws(D) >= ws(v) || b.fragmentError > n[v].fragmentError) ? v : (g = b.maxScore, D) : (Ye(D, `no variants with VIDEO-RANGE of ${JSON.stringify(m)} found`), v);
            }, void 0),
            videoRanges: m,
            preferHDR: y,
            minFramerate: h,
            minBitrate: f
        };
    }
    function Ye(n, e) {
        S.log(`[abr] start candidates with "${n}" ignored because ${e}`);
    }
    function Yl(n) {
        return n.reduce((e, t)=>{
            let s = e.groups[t.groupId];
            s || (s = e.groups[t.groupId] = {
                tracks: [],
                channels: {
                    2: 0
                },
                hasDefault: !1,
                hasAutoSelect: !1
            }), s.tracks.push(t);
            const i = t.channels || "2";
            return s.channels[i] = (s.channels[i] || 0) + 1, s.hasDefault = s.hasDefault || t.default, s.hasAutoSelect = s.hasAutoSelect || t.autoselect, s.hasDefault && (e.hasDefaultAudio = !0), s.hasAutoSelect && (e.hasAutoSelectAudio = !0), e;
        }, {
            hasDefaultAudio: !1,
            hasAutoSelectAudio: !1,
            groups: {}
        });
    }
    function ql(n, e, t, s) {
        return n.slice(t, s + 1).reduce((i, r)=>{
            if (!r.codecSet) return i;
            const a = r.audioGroups;
            let o = i[r.codecSet];
            o || (i[r.codecSet] = o = {
                minBitrate: 1 / 0,
                minHeight: 1 / 0,
                minFramerate: 1 / 0,
                maxScore: 0,
                videoRanges: {
                    SDR: 0
                },
                channels: {
                    2: 0
                },
                hasDefaultAudio: !a,
                fragmentError: 0
            }), o.minBitrate = Math.min(o.minBitrate, r.bitrate);
            const l = Math.min(r.height, r.width);
            return o.minHeight = Math.min(o.minHeight, l), o.minFramerate = Math.min(o.minFramerate, r.frameRate), o.maxScore = Math.max(o.maxScore, r.score), o.fragmentError += r.fragmentError, o.videoRanges[r.videoRange] = (o.videoRanges[r.videoRange] || 0) + 1, a && a.forEach((c)=>{
                if (!c) return;
                const d = e.groups[c];
                d && (o.hasDefaultAudio = o.hasDefaultAudio || e.hasDefaultAudio ? d.hasDefault : d.hasAutoSelect || !e.hasDefaultAudio && !e.hasAutoSelectAudio, Object.keys(d.channels).forEach((u)=>{
                    o.channels[u] = (o.channels[u] || 0) + d.channels[u];
                }));
            }), i;
        }, {});
    }
    function Ke(n, e, t) {
        if ("attrs" in n) {
            const s = e.indexOf(n);
            if (s !== -1) return s;
        }
        for(let s = 0; s < e.length; s++){
            const i = e[s];
            if (bt(n, i, t)) return s;
        }
        return -1;
    }
    function bt(n, e, t) {
        const { groupId: s, name: i, lang: r, assocLang: a, characteristics: o, default: l } = n, c = n.forced;
        return (s === void 0 || e.groupId === s) && (i === void 0 || e.name === i) && (r === void 0 || e.lang === r) && (r === void 0 || e.assocLang === a) && (l === void 0 || e.default === l) && (c === void 0 || e.forced === c) && (o === void 0 || jl(o, e.characteristics)) && (t === void 0 || t(n, e));
    }
    function jl(n, e = "") {
        const t = n.split(","), s = e.split(",");
        return t.length === s.length && !t.some((i)=>s.indexOf(i) === -1);
    }
    function Et(n, e) {
        const { audioCodec: t, channels: s } = n;
        return (t === void 0 || (e.audioCodec || "").substring(0, 4) === t.substring(0, 4)) && (s === void 0 || s === (e.channels || "2"));
    }
    function zl(n, e, t, s, i) {
        const r = e[s], o = e.reduce((h, f, g)=>{
            const m = f.uri;
            return (h[m] || (h[m] = [])).push(g), h;
        }, {})[r.uri];
        o.length > 1 && (s = Math.max.apply(Math, o));
        const l = r.videoRange, c = r.frameRate, d = r.codecSet.substring(0, 4), u = Zn(e, s, (h)=>{
            if (h.videoRange !== l || h.frameRate !== c || h.codecSet.substring(0, 4) !== d) return !1;
            const f = h.audioGroups, g = t.filter((m)=>!f || f.indexOf(m.groupId) !== -1);
            return Ke(n, g, i) > -1;
        });
        return u > -1 ? u : Zn(e, s, (h)=>{
            const f = h.audioGroups, g = t.filter((m)=>!f || f.indexOf(m.groupId) !== -1);
            return Ke(n, g, i) > -1;
        });
    }
    function Zn(n, e, t) {
        for(let s = e; s; s--)if (t(n[s])) return s;
        for(let s = e + 1; s < n.length; s++)if (t(n[s])) return s;
        return -1;
    }
    class Xl {
        constructor(e){
            this.hls = void 0, this.lastLevelLoadSec = 0, this.lastLoadedFragLevel = -1, this.firstSelection = -1, this._nextAutoLevel = -1, this.nextAutoLevelKey = "", this.audioTracksByGroup = null, this.codecTiers = null, this.timer = -1, this.fragCurrent = null, this.partCurrent = null, this.bitrateTestDelay = 0, this.bwEstimator = void 0, this._abandonRulesCheck = ()=>{
                const { fragCurrent: t, partCurrent: s, hls: i } = this, { autoLevelEnabled: r, media: a } = i;
                if (!t || !a) return;
                const o = performance.now(), l = s ? s.stats : t.stats, c = s ? s.duration : t.duration, d = o - l.loading.start, u = i.minAutoLevel;
                if (l.aborted || l.loaded && l.loaded === l.total || t.level <= u) {
                    this.clearTimer(), this._nextAutoLevel = -1;
                    return;
                }
                if (!r || a.paused || !a.playbackRate || !a.readyState) return;
                const h = i.mainForwardBufferInfo;
                if (h === null) return;
                const f = this.bwEstimator.getEstimateTTFB(), g = Math.abs(a.playbackRate);
                if (d <= Math.max(f, 1e3 * (c / (g * 2)))) return;
                const m = h.len / g, y = l.loading.first ? l.loading.first - l.loading.start : -1, E = l.loaded && y > -1, x = this.getBwEstimate(), T = i.levels, R = T[t.level], v = l.total || Math.max(l.loaded, Math.round(c * R.averageBitrate / 8));
                let D = E ? d - y : d;
                D < 1 && E && (D = Math.min(d, l.loaded * 8 / x));
                const b = E ? l.loaded * 1e3 / D : 0, w = b ? (v - l.loaded) / b : v * 8 / x + f / 1e3;
                if (w <= m) return;
                const P = b ? b * 8 : x;
                let I = Number.POSITIVE_INFINITY, _;
                for(_ = t.level - 1; _ > u; _--){
                    const F = T[_].maxBitrate;
                    if (I = this.getTimeToLoadFrag(f / 1e3, P, c * F, !T[_].details), I < m) break;
                }
                if (I >= w || I > c * 10) return;
                i.nextLoadLevel = i.nextAutoLevel = _, E ? this.bwEstimator.sample(d - Math.min(f, y), l.loaded) : this.bwEstimator.sampleTTFB(d);
                const V = T[_].maxBitrate;
                this.getBwEstimate() * this.hls.config.abrBandWidthUpFactor > V && this.resetEstimator(V), this.clearTimer(), S.warn(`[abr] Fragment ${t.sn}${s ? " part " + s.index : ""} of level ${t.level} is loading too slowly;
      Time to underbuffer: ${m.toFixed(3)} s
      Estimated load time for current fragment: ${w.toFixed(3)} s
      Estimated load time for down switch fragment: ${I.toFixed(3)} s
      TTFB estimate: ${y | 0} ms
      Current BW estimate: ${M(x) ? x | 0 : "Unknown"} bps
      New BW estimate: ${this.getBwEstimate() | 0} bps
      Switching to level ${_} @ ${V | 0} bps`), i.trigger(p.FRAG_LOAD_EMERGENCY_ABORTED, {
                    frag: t,
                    part: s,
                    stats: l
                });
            }, this.hls = e, this.bwEstimator = this.initEstimator(), this.registerListeners();
        }
        resetEstimator(e) {
            e && (S.log(`setting initial bwe to ${e}`), this.hls.config.abrEwmaDefaultEstimate = e), this.firstSelection = -1, this.bwEstimator = this.initEstimator();
        }
        initEstimator() {
            const e = this.hls.config;
            return new Bl(e.abrEwmaSlowVoD, e.abrEwmaFastVoD, e.abrEwmaDefaultEstimate);
        }
        registerListeners() {
            const { hls: e } = this;
            e.on(p.MANIFEST_LOADING, this.onManifestLoading, this), e.on(p.FRAG_LOADING, this.onFragLoading, this), e.on(p.FRAG_LOADED, this.onFragLoaded, this), e.on(p.FRAG_BUFFERED, this.onFragBuffered, this), e.on(p.LEVEL_SWITCHING, this.onLevelSwitching, this), e.on(p.LEVEL_LOADED, this.onLevelLoaded, this), e.on(p.LEVELS_UPDATED, this.onLevelsUpdated, this), e.on(p.MAX_AUTO_LEVEL_UPDATED, this.onMaxAutoLevelUpdated, this), e.on(p.ERROR, this.onError, this);
        }
        unregisterListeners() {
            const { hls: e } = this;
            e && (e.off(p.MANIFEST_LOADING, this.onManifestLoading, this), e.off(p.FRAG_LOADING, this.onFragLoading, this), e.off(p.FRAG_LOADED, this.onFragLoaded, this), e.off(p.FRAG_BUFFERED, this.onFragBuffered, this), e.off(p.LEVEL_SWITCHING, this.onLevelSwitching, this), e.off(p.LEVEL_LOADED, this.onLevelLoaded, this), e.off(p.LEVELS_UPDATED, this.onLevelsUpdated, this), e.off(p.MAX_AUTO_LEVEL_UPDATED, this.onMaxAutoLevelUpdated, this), e.off(p.ERROR, this.onError, this));
        }
        destroy() {
            this.unregisterListeners(), this.clearTimer(), this.hls = this._abandonRulesCheck = null, this.fragCurrent = this.partCurrent = null;
        }
        onManifestLoading(e, t) {
            this.lastLoadedFragLevel = -1, this.firstSelection = -1, this.lastLevelLoadSec = 0, this.fragCurrent = this.partCurrent = null, this.onLevelsUpdated(), this.clearTimer();
        }
        onLevelsUpdated() {
            this.lastLoadedFragLevel > -1 && this.fragCurrent && (this.lastLoadedFragLevel = this.fragCurrent.level), this._nextAutoLevel = -1, this.onMaxAutoLevelUpdated(), this.codecTiers = null, this.audioTracksByGroup = null;
        }
        onMaxAutoLevelUpdated() {
            this.firstSelection = -1, this.nextAutoLevelKey = "";
        }
        onFragLoading(e, t) {
            const s = t.frag;
            if (!this.ignoreFragment(s)) {
                if (!s.bitrateTest) {
                    var i;
                    this.fragCurrent = s, this.partCurrent = (i = t.part) != null ? i : null;
                }
                this.clearTimer(), this.timer = self.setInterval(this._abandonRulesCheck, 100);
            }
        }
        onLevelSwitching(e, t) {
            this.clearTimer();
        }
        onError(e, t) {
            if (!t.fatal) switch(t.details){
                case A.BUFFER_ADD_CODEC_ERROR:
                case A.BUFFER_APPEND_ERROR:
                    this.lastLoadedFragLevel = -1, this.firstSelection = -1;
                    break;
                case A.FRAG_LOAD_TIMEOUT:
                    {
                        const s = t.frag, { fragCurrent: i, partCurrent: r } = this;
                        if (s && i && s.sn === i.sn && s.level === i.level) {
                            const a = performance.now(), o = r ? r.stats : s.stats, l = a - o.loading.start, c = o.loading.first ? o.loading.first - o.loading.start : -1;
                            if (o.loaded && c > -1) {
                                const u = this.bwEstimator.getEstimateTTFB();
                                this.bwEstimator.sample(l - Math.min(u, c), o.loaded);
                            } else this.bwEstimator.sampleTTFB(l);
                        }
                        break;
                    }
            }
        }
        getTimeToLoadFrag(e, t, s, i) {
            const r = e + s / t, a = i ? this.lastLevelLoadSec : 0;
            return r + a;
        }
        onLevelLoaded(e, t) {
            const s = this.hls.config, { loading: i } = t.stats, r = i.end - i.start;
            M(r) && (this.lastLevelLoadSec = r / 1e3), t.details.live ? this.bwEstimator.update(s.abrEwmaSlowLive, s.abrEwmaFastLive) : this.bwEstimator.update(s.abrEwmaSlowVoD, s.abrEwmaFastVoD);
        }
        onFragLoaded(e, { frag: t, part: s }) {
            const i = s ? s.stats : t.stats;
            if (t.type === B.MAIN && this.bwEstimator.sampleTTFB(i.loading.first - i.loading.start), !this.ignoreFragment(t)) {
                if (this.clearTimer(), t.level === this._nextAutoLevel && (this._nextAutoLevel = -1), this.firstSelection = -1, this.hls.config.abrMaxWithRealBitrate) {
                    const r = s ? s.duration : t.duration, a = this.hls.levels[t.level], o = (a.loaded ? a.loaded.bytes : 0) + i.loaded, l = (a.loaded ? a.loaded.duration : 0) + r;
                    a.loaded = {
                        bytes: o,
                        duration: l
                    }, a.realBitrate = Math.round(8 * o / l);
                }
                if (t.bitrateTest) {
                    const r = {
                        stats: i,
                        frag: t,
                        part: s,
                        id: t.type
                    };
                    this.onFragBuffered(p.FRAG_BUFFERED, r), t.bitrateTest = !1;
                } else this.lastLoadedFragLevel = t.level;
            }
        }
        onFragBuffered(e, t) {
            const { frag: s, part: i } = t, r = i != null && i.stats.loaded ? i.stats : s.stats;
            if (r.aborted || this.ignoreFragment(s)) return;
            const a = r.parsing.end - r.loading.start - Math.min(r.loading.first - r.loading.start, this.bwEstimator.getEstimateTTFB());
            this.bwEstimator.sample(a, r.loaded), r.bwEstimate = this.getBwEstimate(), s.bitrateTest ? this.bitrateTestDelay = a / 1e3 : this.bitrateTestDelay = 0;
        }
        ignoreFragment(e) {
            return e.type !== B.MAIN || e.sn === "initSegment";
        }
        clearTimer() {
            this.timer > -1 && (self.clearInterval(this.timer), this.timer = -1);
        }
        get firstAutoLevel() {
            const { maxAutoLevel: e, minAutoLevel: t } = this.hls, s = this.getBwEstimate(), i = this.hls.config.maxStarvationDelay, r = this.findBestLevel(s, t, e, 0, i, 1, 1);
            if (r > -1) return r;
            const a = this.hls.firstLevel, o = Math.min(Math.max(a, t), e);
            return S.warn(`[abr] Could not find best starting auto level. Defaulting to first in playlist ${a} clamped to ${o}`), o;
        }
        get forcedAutoLevel() {
            return this.nextAutoLevelKey ? -1 : this._nextAutoLevel;
        }
        get nextAutoLevel() {
            const e = this.forcedAutoLevel, s = this.bwEstimator.canEstimate(), i = this.lastLoadedFragLevel > -1;
            if (e !== -1 && (!s || !i || this.nextAutoLevelKey === this.getAutoLevelKey())) return e;
            const r = s && i ? this.getNextABRAutoLevel() : this.firstAutoLevel;
            if (e !== -1) {
                const a = this.hls.levels;
                if (a.length > Math.max(e, r) && a[e].loadError <= a[r].loadError) return e;
            }
            return this._nextAutoLevel = r, this.nextAutoLevelKey = this.getAutoLevelKey(), r;
        }
        getAutoLevelKey() {
            return `${this.getBwEstimate()}_${this.getStarvationDelay().toFixed(2)}`;
        }
        getNextABRAutoLevel() {
            const { fragCurrent: e, partCurrent: t, hls: s } = this, { maxAutoLevel: i, config: r, minAutoLevel: a } = s, o = t ? t.duration : e ? e.duration : 0, l = this.getBwEstimate(), c = this.getStarvationDelay();
            let d = r.abrBandWidthFactor, u = r.abrBandWidthUpFactor;
            if (c) {
                const y = this.findBestLevel(l, a, i, c, 0, d, u);
                if (y >= 0) return y;
            }
            let h = o ? Math.min(o, r.maxStarvationDelay) : r.maxStarvationDelay;
            if (!c) {
                const y = this.bitrateTestDelay;
                y && (h = (o ? Math.min(o, r.maxLoadingDelay) : r.maxLoadingDelay) - y, S.info(`[abr] bitrate test took ${Math.round(1e3 * y)}ms, set first fragment max fetchDuration to ${Math.round(1e3 * h)} ms`), d = u = 1);
            }
            const f = this.findBestLevel(l, a, i, c, h, d, u);
            if (S.info(`[abr] ${c ? "rebuffering expected" : "buffer is empty"}, optimal quality level ${f}`), f > -1) return f;
            const g = s.levels[a], m = s.levels[s.loadLevel];
            return g?.bitrate < m?.bitrate ? a : s.loadLevel;
        }
        getStarvationDelay() {
            const e = this.hls, t = e.media;
            if (!t) return 1 / 0;
            const s = t && t.playbackRate !== 0 ? Math.abs(t.playbackRate) : 1, i = e.mainForwardBufferInfo;
            return (i ? i.len : 0) / s;
        }
        getBwEstimate() {
            return this.bwEstimator.canEstimate() ? this.bwEstimator.getEstimate() : this.hls.config.abrEwmaDefaultEstimate;
        }
        findBestLevel(e, t, s, i, r, a, o) {
            var l;
            const c = i + r, d = this.lastLoadedFragLevel, u = d === -1 ? this.hls.firstLevel : d, { fragCurrent: h, partCurrent: f } = this, { levels: g, allAudioTracks: m, loadLevel: y, config: E } = this.hls;
            if (g.length === 1) return 0;
            const x = g[u], T = !!(x != null && (l = x.details) != null && l.live), R = y === -1 || d === -1;
            let v, D = "SDR", b = x?.frameRate || 0;
            const { audioPreference: w, videoPreference: P } = E, I = this.audioTracksByGroup || (this.audioTracksByGroup = Yl(m));
            if (R) {
                if (this.firstSelection !== -1) return this.firstSelection;
                const K = this.codecTiers || (this.codecTiers = ql(g, I, t, s)), $ = Wl(K, D, e, w, P), { codecSet: j, videoRanges: J, minFramerate: N, minBitrate: O, preferHDR: z } = $;
                v = j, D = z ? J[J.length - 1] : J[0], b = N, e = Math.max(e, O), S.log(`[abr] picked start tier ${JSON.stringify($)}`);
            } else v = x?.codecSet, D = x?.videoRange;
            const _ = f ? f.duration : h ? h.duration : 0, V = this.bwEstimator.getEstimateTTFB() / 1e3, F = [];
            for(let K = s; K >= t; K--){
                var H;
                const $ = g[K], j = K > u;
                if (!$) continue;
                if (E.useMediaCapabilities && !$.supportedResult && !$.supportedPromise) {
                    const ie = navigator.mediaCapabilities;
                    typeof ie?.decodingInfo == "function" && $l($, I, D, b, e, w) ? ($.supportedPromise = Gl($, I, ie), $.supportedPromise.then((oe)=>{
                        if (!this.hls) return;
                        $.supportedResult = oe;
                        const he = this.hls.levels, Se = he.indexOf($);
                        oe.error ? S.warn(`[abr] MediaCapabilities decodingInfo error: "${oe.error}" for level ${Se} ${JSON.stringify(oe)}`) : oe.supported || (S.warn(`[abr] Unsupported MediaCapabilities decodingInfo result for level ${Se} ${JSON.stringify(oe)}`), Se > -1 && he.length > 1 && (S.log(`[abr] Removing unsupported level ${Se}`), this.hls.removeLevel(Se)));
                    })) : $.supportedResult = ua;
                }
                if (v && $.codecSet !== v || D && $.videoRange !== D || j && b > $.frameRate || !j && b > 0 && b < $.frameRate || $.supportedResult && !((H = $.supportedResult.decodingInfoResults) != null && H[0].smooth)) {
                    F.push(K);
                    continue;
                }
                const J = $.details, N = (f ? J?.partTarget : J?.averagetargetduration) || _;
                let O;
                j ? O = o * e : O = a * e;
                const z = _ && i >= _ * 2 && r === 0 ? g[K].averageBitrate : g[K].maxBitrate, Y = this.getTimeToLoadFrag(V, O, z * N, J === void 0);
                if (O >= z && (K === d || $.loadError === 0 && $.fragmentError === 0) && (Y <= V || !M(Y) || T && !this.bitrateTestDelay || Y < c)) {
                    const ie = this.forcedAutoLevel;
                    return K !== y && (ie === -1 || ie !== y) && (F.length && S.trace(`[abr] Skipped level(s) ${F.join(",")} of ${s} max with CODECS and VIDEO-RANGE:"${g[F[0]].codecs}" ${g[F[0]].videoRange}; not compatible with "${x.codecs}" ${D}`), S.info(`[abr] switch candidate:${u}->${K} adjustedbw(${Math.round(O)})-bitrate=${Math.round(O - z)} ttfb:${V.toFixed(1)} avgDuration:${N.toFixed(1)} maxFetchDuration:${c.toFixed(1)} fetchDuration:${Y.toFixed(1)} firstSelection:${R} codecSet:${v} videoRange:${D} hls.loadLevel:${y}`)), R && (this.firstSelection = K), K;
                }
            }
            return -1;
        }
        set nextAutoLevel(e) {
            const { maxAutoLevel: t, minAutoLevel: s } = this.hls, i = Math.min(Math.max(e, s), t);
            this._nextAutoLevel !== i && (this.nextAutoLevelKey = "", this._nextAutoLevel = i);
        }
    }
    class Ql {
        constructor(){
            this._boundTick = void 0, this._tickTimer = null, this._tickInterval = null, this._tickCallCount = 0, this._boundTick = this.tick.bind(this);
        }
        destroy() {
            this.onHandlerDestroying(), this.onHandlerDestroyed();
        }
        onHandlerDestroying() {
            this.clearNextTick(), this.clearInterval();
        }
        onHandlerDestroyed() {}
        hasInterval() {
            return !!this._tickInterval;
        }
        hasNextTick() {
            return !!this._tickTimer;
        }
        setInterval(e) {
            return this._tickInterval ? !1 : (this._tickCallCount = 0, this._tickInterval = self.setInterval(this._boundTick, e), !0);
        }
        clearInterval() {
            return this._tickInterval ? (self.clearInterval(this._tickInterval), this._tickInterval = null, !0) : !1;
        }
        clearNextTick() {
            return this._tickTimer ? (self.clearTimeout(this._tickTimer), this._tickTimer = null, !0) : !1;
        }
        tick() {
            this._tickCallCount++, this._tickCallCount === 1 && (this.doTick(), this._tickCallCount > 1 && this.tickImmediate(), this._tickCallCount = 0);
        }
        tickImmediate() {
            this.clearNextTick(), this._tickTimer = self.setTimeout(this._boundTick, 0);
        }
        doTick() {}
    }
    var ce = {
        NOT_LOADED: "NOT_LOADED",
        APPENDING: "APPENDING",
        PARTIAL: "PARTIAL",
        OK: "OK"
    };
    class Jl {
        constructor(e){
            this.activePartLists = Object.create(null), this.endListFragments = Object.create(null), this.fragments = Object.create(null), this.timeRanges = Object.create(null), this.bufferPadding = .2, this.hls = void 0, this.hasGaps = !1, this.hls = e, this._registerListeners();
        }
        _registerListeners() {
            const { hls: e } = this;
            e.on(p.BUFFER_APPENDED, this.onBufferAppended, this), e.on(p.FRAG_BUFFERED, this.onFragBuffered, this), e.on(p.FRAG_LOADED, this.onFragLoaded, this);
        }
        _unregisterListeners() {
            const { hls: e } = this;
            e.off(p.BUFFER_APPENDED, this.onBufferAppended, this), e.off(p.FRAG_BUFFERED, this.onFragBuffered, this), e.off(p.FRAG_LOADED, this.onFragLoaded, this);
        }
        destroy() {
            this._unregisterListeners(), this.fragments = this.activePartLists = this.endListFragments = this.timeRanges = null;
        }
        getAppendedFrag(e, t) {
            const s = this.activePartLists[t];
            if (s) for(let i = s.length; i--;){
                const r = s[i];
                if (!r) break;
                const a = r.end;
                if (r.start <= e && a !== null && e <= a) return r;
            }
            return this.getBufferedFrag(e, t);
        }
        getBufferedFrag(e, t) {
            const { fragments: s } = this, i = Object.keys(s);
            for(let r = i.length; r--;){
                const a = s[i[r]];
                if (a?.body.type === t && a.buffered) {
                    const o = a.body;
                    if (o.start <= e && e <= o.end) return o;
                }
            }
            return null;
        }
        detectEvictedFragments(e, t, s, i) {
            this.timeRanges && (this.timeRanges[e] = t);
            const r = i?.fragment.sn || -1;
            Object.keys(this.fragments).forEach((a)=>{
                const o = this.fragments[a];
                if (!o || r >= o.body.sn) return;
                if (!o.buffered && !o.loaded) {
                    o.body.type === s && this.removeFragment(o.body);
                    return;
                }
                const l = o.range[e];
                l && l.time.some((c)=>{
                    const d = !this.isTimeBuffered(c.startPTS, c.endPTS, t);
                    return d && this.removeFragment(o.body), d;
                });
            });
        }
        detectPartialFragments(e) {
            const t = this.timeRanges, { frag: s, part: i } = e;
            if (!t || s.sn === "initSegment") return;
            const r = Tt(s), a = this.fragments[r];
            if (!a || a.buffered && s.gap) return;
            const o = !s.relurl;
            Object.keys(t).forEach((l)=>{
                const c = s.elementaryStreams[l];
                if (!c) return;
                const d = t[l], u = o || c.partial === !0;
                a.range[l] = this.getBufferedTimes(s, i, u, d);
            }), a.loaded = null, Object.keys(a.range).length ? (a.buffered = !0, (a.body.endList = s.endList || a.body.endList) && (this.endListFragments[a.body.type] = a), is(a) || this.removeParts(s.sn - 1, s.type)) : this.removeFragment(a.body);
        }
        removeParts(e, t) {
            const s = this.activePartLists[t];
            s && (this.activePartLists[t] = s.filter((i)=>i.fragment.sn >= e));
        }
        fragBuffered(e, t) {
            const s = Tt(e);
            let i = this.fragments[s];
            !i && t && (i = this.fragments[s] = {
                body: e,
                appendedPTS: null,
                loaded: null,
                buffered: !1,
                range: Object.create(null)
            }, e.gap && (this.hasGaps = !0)), i && (i.loaded = null, i.buffered = !0);
        }
        getBufferedTimes(e, t, s, i) {
            const r = {
                time: [],
                partial: s
            }, a = e.start, o = e.end, l = e.minEndPTS || o, c = e.maxStartPTS || a;
            for(let d = 0; d < i.length; d++){
                const u = i.start(d) - this.bufferPadding, h = i.end(d) + this.bufferPadding;
                if (c >= u && l <= h) {
                    r.time.push({
                        startPTS: Math.max(a, i.start(d)),
                        endPTS: Math.min(o, i.end(d))
                    });
                    break;
                } else if (a < h && o > u) {
                    const f = Math.max(a, i.start(d)), g = Math.min(o, i.end(d));
                    g > f && (r.partial = !0, r.time.push({
                        startPTS: f,
                        endPTS: g
                    }));
                } else if (o <= u) break;
            }
            return r;
        }
        getPartialFragment(e) {
            let t = null, s, i, r, a = 0;
            const { bufferPadding: o, fragments: l } = this;
            return Object.keys(l).forEach((c)=>{
                const d = l[c];
                d && is(d) && (i = d.body.start - o, r = d.body.end + o, e >= i && e <= r && (s = Math.min(e - i, r - e), a <= s && (t = d.body, a = s)));
            }), t;
        }
        isEndListAppended(e) {
            const t = this.endListFragments[e];
            return t !== void 0 && (t.buffered || is(t));
        }
        getState(e) {
            const t = Tt(e), s = this.fragments[t];
            return s ? s.buffered ? is(s) ? ce.PARTIAL : ce.OK : ce.APPENDING : ce.NOT_LOADED;
        }
        isTimeBuffered(e, t, s) {
            let i, r;
            for(let a = 0; a < s.length; a++){
                if (i = s.start(a) - this.bufferPadding, r = s.end(a) + this.bufferPadding, e >= i && t <= r) return !0;
                if (t <= i) return !1;
            }
            return !1;
        }
        onFragLoaded(e, t) {
            const { frag: s, part: i } = t;
            if (s.sn === "initSegment" || s.bitrateTest) return;
            const r = i ? null : t, a = Tt(s);
            this.fragments[a] = {
                body: s,
                appendedPTS: null,
                loaded: r,
                buffered: !1,
                range: Object.create(null)
            };
        }
        onBufferAppended(e, t) {
            const { frag: s, part: i, timeRanges: r } = t;
            if (s.sn === "initSegment") return;
            const a = s.type;
            if (i) {
                let o = this.activePartLists[a];
                o || (this.activePartLists[a] = o = []), o.push(i);
            }
            this.timeRanges = r, Object.keys(r).forEach((o)=>{
                const l = r[o];
                this.detectEvictedFragments(o, l, a, i);
            });
        }
        onFragBuffered(e, t) {
            this.detectPartialFragments(t);
        }
        hasFragment(e) {
            const t = Tt(e);
            return !!this.fragments[t];
        }
        hasParts(e) {
            var t;
            return !!((t = this.activePartLists[e]) != null && t.length);
        }
        removeFragmentsInRange(e, t, s, i, r) {
            i && !this.hasGaps || Object.keys(this.fragments).forEach((a)=>{
                const o = this.fragments[a];
                if (!o) return;
                const l = o.body;
                l.type !== s || i && !l.gap || l.start < t && l.end > e && (o.buffered || r) && this.removeFragment(l);
            });
        }
        removeFragment(e) {
            const t = Tt(e);
            e.stats.loaded = 0, e.clearElementaryStreamInfo();
            const s = this.activePartLists[e.type];
            if (s) {
                const i = e.sn;
                this.activePartLists[e.type] = s.filter((r)=>r.fragment.sn !== i);
            }
            delete this.fragments[t], e.endList && delete this.endListFragments[e.type];
        }
        removeAllFragments() {
            this.fragments = Object.create(null), this.endListFragments = Object.create(null), this.activePartLists = Object.create(null), this.hasGaps = !1;
        }
    }
    function is(n) {
        var e, t, s;
        return n.buffered && (n.body.gap || ((e = n.range.video) == null ? void 0 : e.partial) || ((t = n.range.audio) == null ? void 0 : t.partial) || ((s = n.range.audiovideo) == null ? void 0 : s.partial));
    }
    function Tt(n) {
        return `${n.type}_${n.level}_${n.sn}`;
    }
    const Zl = {
        length: 0,
        start: ()=>0,
        end: ()=>0
    };
    class Z {
        static isBuffered(e, t) {
            try {
                if (e) {
                    const s = Z.getBuffered(e);
                    for(let i = 0; i < s.length; i++)if (t >= s.start(i) && t <= s.end(i)) return !0;
                }
            } catch  {}
            return !1;
        }
        static bufferInfo(e, t, s) {
            try {
                if (e) {
                    const i = Z.getBuffered(e), r = [];
                    let a;
                    for(a = 0; a < i.length; a++)r.push({
                        start: i.start(a),
                        end: i.end(a)
                    });
                    return this.bufferedInfo(r, t, s);
                }
            } catch  {}
            return {
                len: 0,
                start: t,
                end: t,
                nextStart: void 0
            };
        }
        static bufferedInfo(e, t, s) {
            t = Math.max(0, t), e.sort(function(c, d) {
                const u = c.start - d.start;
                return u || d.end - c.end;
            });
            let i = [];
            if (s) for(let c = 0; c < e.length; c++){
                const d = i.length;
                if (d) {
                    const u = i[d - 1].end;
                    e[c].start - u < s ? e[c].end > u && (i[d - 1].end = e[c].end) : i.push(e[c]);
                } else i.push(e[c]);
            }
            else i = e;
            let r = 0, a, o = t, l = t;
            for(let c = 0; c < i.length; c++){
                const d = i[c].start, u = i[c].end;
                if (t + s >= d && t < u) o = d, l = u, r = l - t;
                else if (t + s < d) {
                    a = d;
                    break;
                }
            }
            return {
                len: r,
                start: o || 0,
                end: l || 0,
                nextStart: a
            };
        }
        static getBuffered(e) {
            try {
                return e.buffered;
            } catch (t) {
                return S.log("failed to get media.buffered", t), Zl;
            }
        }
    }
    class on {
        constructor(e, t, s, i = 0, r = -1, a = !1){
            this.level = void 0, this.sn = void 0, this.part = void 0, this.id = void 0, this.size = void 0, this.partial = void 0, this.transmuxing = ns(), this.buffering = {
                audio: ns(),
                video: ns(),
                audiovideo: ns()
            }, this.level = e, this.sn = t, this.id = s, this.size = i, this.part = r, this.partial = a;
        }
    }
    function ns() {
        return {
            start: 0,
            executeStart: 0,
            executeEnd: 0,
            end: 0
        };
    }
    function ps(n, e) {
        for(let s = 0, i = n.length; s < i; s++){
            var t;
            if (((t = n[s]) == null ? void 0 : t.cc) === e) return n[s];
        }
        return null;
    }
    function ec(n, e, t) {
        return !!(e && (t.endCC > t.startCC || n && n.cc < t.startCC));
    }
    function tc(n, e) {
        const t = n.fragments, s = e.fragments;
        if (!s.length || !t.length) {
            S.log("No fragments to align");
            return;
        }
        const i = ps(t, s[0].cc);
        if (!i || i && !i.startPTS) {
            S.log("No frag in previous level to align on");
            return;
        }
        return i;
    }
    function er(n, e) {
        if (n) {
            const t = n.start + e;
            n.start = n.startPTS = t, n.endPTS = t + n.duration;
        }
    }
    function ha(n, e) {
        const t = e.fragments;
        for(let s = 0, i = t.length; s < i; s++)er(t[s], n);
        e.fragmentHint && er(e.fragmentHint, n), e.alignedSliding = !0;
    }
    function sc(n, e, t) {
        e && (ic(n, t, e), !t.alignedSliding && e && Ms(t, e), !t.alignedSliding && e && !t.skippedSegments && oa(e, t));
    }
    function ic(n, e, t) {
        if (ec(n, t, e)) {
            const s = tc(t, e);
            s && M(s.start) && (S.log(`Adjusting PTS using last level due to CC increase within current level ${e.url}`), ha(s.start, e));
        }
    }
    function Ms(n, e) {
        if (!n.hasProgramDateTime || !e.hasProgramDateTime) return;
        const t = n.fragments, s = e.fragments;
        if (!t.length || !s.length) return;
        let i, r;
        const a = Math.min(e.endCC, n.endCC);
        e.startCC < a && n.startCC < a && (i = ps(s, a), r = ps(t, a)), (!i || !r) && (i = s[Math.floor(s.length / 2)], r = ps(t, i.cc) || t[Math.floor(t.length / 2)]);
        const o = i.programDateTime, l = r.programDateTime;
        if (!o || !l) return;
        const c = (l - o) / 1e3 - (r.start - i.start);
        ha(c, n);
    }
    const tr = Math.pow(2, 17);
    class nc {
        constructor(e){
            this.config = void 0, this.loader = null, this.partLoadTimeout = -1, this.config = e;
        }
        destroy() {
            this.loader && (this.loader.destroy(), this.loader = null);
        }
        abort() {
            this.loader && this.loader.abort();
        }
        load(e, t) {
            const s = e.url;
            if (!s) return Promise.reject(new je({
                type: G.NETWORK_ERROR,
                details: A.FRAG_LOAD_ERROR,
                fatal: !1,
                frag: e,
                error: new Error(`Fragment does not have a ${s ? "part list" : "url"}`),
                networkDetails: null
            }));
            this.abort();
            const i = this.config, r = i.fLoader, a = i.loader;
            return new Promise((o, l)=>{
                if (this.loader && this.loader.destroy(), e.gap) if (e.tagList.some((f)=>f[0] === "GAP")) {
                    l(ir(e));
                    return;
                } else e.gap = !1;
                const c = this.loader = e.loader = r ? new r(i) : new a(i), d = sr(e), u = Qn(i.fragLoadPolicy.default), h = {
                    loadPolicy: u,
                    timeout: u.maxLoadTimeMs,
                    maxRetry: 0,
                    retryDelay: 0,
                    maxRetryDelay: 0,
                    highWaterMark: e.sn === "initSegment" ? 1 / 0 : tr
                };
                e.stats = c.stats, c.load(d, h, {
                    onSuccess: (f, g, m, y)=>{
                        this.resetLoader(e, c);
                        let E = f.data;
                        m.resetIV && e.decryptdata && (e.decryptdata.iv = new Uint8Array(E.slice(0, 16)), E = E.slice(16)), o({
                            frag: e,
                            part: null,
                            payload: E,
                            networkDetails: y
                        });
                    },
                    onError: (f, g, m, y)=>{
                        this.resetLoader(e, c), l(new je({
                            type: G.NETWORK_ERROR,
                            details: A.FRAG_LOAD_ERROR,
                            fatal: !1,
                            frag: e,
                            response: ue({
                                url: s,
                                data: void 0
                            }, f),
                            error: new Error(`HTTP Error ${f.code} ${f.text}`),
                            networkDetails: m,
                            stats: y
                        }));
                    },
                    onAbort: (f, g, m)=>{
                        this.resetLoader(e, c), l(new je({
                            type: G.NETWORK_ERROR,
                            details: A.INTERNAL_ABORTED,
                            fatal: !1,
                            frag: e,
                            error: new Error("Aborted"),
                            networkDetails: m,
                            stats: f
                        }));
                    },
                    onTimeout: (f, g, m)=>{
                        this.resetLoader(e, c), l(new je({
                            type: G.NETWORK_ERROR,
                            details: A.FRAG_LOAD_TIMEOUT,
                            fatal: !1,
                            frag: e,
                            error: new Error(`Timeout after ${h.timeout}ms`),
                            networkDetails: m,
                            stats: f
                        }));
                    },
                    onProgress: (f, g, m, y)=>{
                        t && t({
                            frag: e,
                            part: null,
                            payload: m,
                            networkDetails: y
                        });
                    }
                });
            });
        }
        loadPart(e, t, s) {
            this.abort();
            const i = this.config, r = i.fLoader, a = i.loader;
            return new Promise((o, l)=>{
                if (this.loader && this.loader.destroy(), e.gap || t.gap) {
                    l(ir(e, t));
                    return;
                }
                const c = this.loader = e.loader = r ? new r(i) : new a(i), d = sr(e, t), u = Qn(i.fragLoadPolicy.default), h = {
                    loadPolicy: u,
                    timeout: u.maxLoadTimeMs,
                    maxRetry: 0,
                    retryDelay: 0,
                    maxRetryDelay: 0,
                    highWaterMark: tr
                };
                t.stats = c.stats, c.load(d, h, {
                    onSuccess: (f, g, m, y)=>{
                        this.resetLoader(e, c), this.updateStatsFromPart(e, t);
                        const E = {
                            frag: e,
                            part: t,
                            payload: f.data,
                            networkDetails: y
                        };
                        s(E), o(E);
                    },
                    onError: (f, g, m, y)=>{
                        this.resetLoader(e, c), l(new je({
                            type: G.NETWORK_ERROR,
                            details: A.FRAG_LOAD_ERROR,
                            fatal: !1,
                            frag: e,
                            part: t,
                            response: ue({
                                url: d.url,
                                data: void 0
                            }, f),
                            error: new Error(`HTTP Error ${f.code} ${f.text}`),
                            networkDetails: m,
                            stats: y
                        }));
                    },
                    onAbort: (f, g, m)=>{
                        e.stats.aborted = t.stats.aborted, this.resetLoader(e, c), l(new je({
                            type: G.NETWORK_ERROR,
                            details: A.INTERNAL_ABORTED,
                            fatal: !1,
                            frag: e,
                            part: t,
                            error: new Error("Aborted"),
                            networkDetails: m,
                            stats: f
                        }));
                    },
                    onTimeout: (f, g, m)=>{
                        this.resetLoader(e, c), l(new je({
                            type: G.NETWORK_ERROR,
                            details: A.FRAG_LOAD_TIMEOUT,
                            fatal: !1,
                            frag: e,
                            part: t,
                            error: new Error(`Timeout after ${h.timeout}ms`),
                            networkDetails: m,
                            stats: f
                        }));
                    }
                });
            });
        }
        updateStatsFromPart(e, t) {
            const s = e.stats, i = t.stats, r = i.total;
            if (s.loaded += i.loaded, r) {
                const l = Math.round(e.duration / t.duration), c = Math.min(Math.round(s.loaded / r), l), u = (l - c) * Math.round(s.loaded / c);
                s.total = s.loaded + u;
            } else s.total = Math.max(s.loaded, s.total);
            const a = s.loading, o = i.loading;
            a.start ? a.first += o.first - o.start : (a.start = o.start, a.first = o.first), a.end = o.end;
        }
        resetLoader(e, t) {
            e.loader = null, this.loader === t && (self.clearTimeout(this.partLoadTimeout), this.loader = null), t.destroy();
        }
    }
    function sr(n, e = null) {
        const t = e || n, s = {
            frag: n,
            part: e,
            responseType: "arraybuffer",
            url: t.url,
            headers: {},
            rangeStart: 0,
            rangeEnd: 0
        }, i = t.byteRangeStartOffset, r = t.byteRangeEndOffset;
        if (M(i) && M(r)) {
            var a;
            let o = i, l = r;
            if (n.sn === "initSegment" && ((a = n.decryptdata) == null ? void 0 : a.method) === "AES-128") {
                const c = r - i;
                c % 16 && (l = r + (16 - c % 16)), i !== 0 && (s.resetIV = !0, o = i - 16);
            }
            s.rangeStart = o, s.rangeEnd = l;
        }
        return s;
    }
    function ir(n, e) {
        const t = new Error(`GAP ${n.gap ? "tag" : "attribute"} found`), s = {
            type: G.MEDIA_ERROR,
            details: A.FRAG_GAP,
            fatal: !1,
            frag: n,
            error: t,
            networkDetails: null
        };
        return e && (s.part = e), (e || n).stats.aborted = !0, new je(s);
    }
    class je extends Error {
        constructor(e){
            super(e.error.message), this.data = void 0, this.data = e;
        }
    }
    class rc {
        constructor(e, t){
            this.subtle = void 0, this.aesIV = void 0, this.subtle = e, this.aesIV = t;
        }
        decrypt(e, t) {
            return this.subtle.decrypt({
                name: "AES-CBC",
                iv: this.aesIV
            }, t, e);
        }
    }
    class ac {
        constructor(e, t){
            this.subtle = void 0, this.key = void 0, this.subtle = e, this.key = t;
        }
        expandKey() {
            return this.subtle.importKey("raw", this.key, {
                name: "AES-CBC"
            }, !1, [
                "encrypt",
                "decrypt"
            ]);
        }
    }
    function oc(n) {
        const e = n.byteLength, t = e && new DataView(n.buffer).getUint8(e - 1);
        return t ? ut(n, 0, e - t) : n;
    }
    class lc {
        constructor(){
            this.rcon = [
                0,
                1,
                2,
                4,
                8,
                16,
                32,
                64,
                128,
                27,
                54
            ], this.subMix = [
                new Uint32Array(256),
                new Uint32Array(256),
                new Uint32Array(256),
                new Uint32Array(256)
            ], this.invSubMix = [
                new Uint32Array(256),
                new Uint32Array(256),
                new Uint32Array(256),
                new Uint32Array(256)
            ], this.sBox = new Uint32Array(256), this.invSBox = new Uint32Array(256), this.key = new Uint32Array(0), this.ksRows = 0, this.keySize = 0, this.keySchedule = void 0, this.invKeySchedule = void 0, this.initTable();
        }
        uint8ArrayToUint32Array_(e) {
            const t = new DataView(e), s = new Uint32Array(4);
            for(let i = 0; i < 4; i++)s[i] = t.getUint32(i * 4);
            return s;
        }
        initTable() {
            const e = this.sBox, t = this.invSBox, s = this.subMix, i = s[0], r = s[1], a = s[2], o = s[3], l = this.invSubMix, c = l[0], d = l[1], u = l[2], h = l[3], f = new Uint32Array(256);
            let g = 0, m = 0, y = 0;
            for(y = 0; y < 256; y++)y < 128 ? f[y] = y << 1 : f[y] = y << 1 ^ 283;
            for(y = 0; y < 256; y++){
                let E = m ^ m << 1 ^ m << 2 ^ m << 3 ^ m << 4;
                E = E >>> 8 ^ E & 255 ^ 99, e[g] = E, t[E] = g;
                const x = f[g], T = f[x], R = f[T];
                let v = f[E] * 257 ^ E * 16843008;
                i[g] = v << 24 | v >>> 8, r[g] = v << 16 | v >>> 16, a[g] = v << 8 | v >>> 24, o[g] = v, v = R * 16843009 ^ T * 65537 ^ x * 257 ^ g * 16843008, c[E] = v << 24 | v >>> 8, d[E] = v << 16 | v >>> 16, u[E] = v << 8 | v >>> 24, h[E] = v, g ? (g = x ^ f[f[f[R ^ x]]], m ^= f[f[m]]) : g = m = 1;
            }
        }
        expandKey(e) {
            const t = this.uint8ArrayToUint32Array_(e);
            let s = !0, i = 0;
            for(; i < t.length && s;)s = t[i] === this.key[i], i++;
            if (s) return;
            this.key = t;
            const r = this.keySize = t.length;
            if (r !== 4 && r !== 6 && r !== 8) throw new Error("Invalid aes key size=" + r);
            const a = this.ksRows = (r + 6 + 1) * 4;
            let o, l;
            const c = this.keySchedule = new Uint32Array(a), d = this.invKeySchedule = new Uint32Array(a), u = this.sBox, h = this.rcon, f = this.invSubMix, g = f[0], m = f[1], y = f[2], E = f[3];
            let x, T;
            for(o = 0; o < a; o++){
                if (o < r) {
                    x = c[o] = t[o];
                    continue;
                }
                T = x, o % r === 0 ? (T = T << 8 | T >>> 24, T = u[T >>> 24] << 24 | u[T >>> 16 & 255] << 16 | u[T >>> 8 & 255] << 8 | u[T & 255], T ^= h[o / r | 0] << 24) : r > 6 && o % r === 4 && (T = u[T >>> 24] << 24 | u[T >>> 16 & 255] << 16 | u[T >>> 8 & 255] << 8 | u[T & 255]), c[o] = x = (c[o - r] ^ T) >>> 0;
            }
            for(l = 0; l < a; l++)o = a - l, l & 3 ? T = c[o] : T = c[o - 4], l < 4 || o <= 4 ? d[l] = T : d[l] = g[u[T >>> 24]] ^ m[u[T >>> 16 & 255]] ^ y[u[T >>> 8 & 255]] ^ E[u[T & 255]], d[l] = d[l] >>> 0;
        }
        networkToHostOrderSwap(e) {
            return e << 24 | (e & 65280) << 8 | (e & 16711680) >> 8 | e >>> 24;
        }
        decrypt(e, t, s) {
            const i = this.keySize + 6, r = this.invKeySchedule, a = this.invSBox, o = this.invSubMix, l = o[0], c = o[1], d = o[2], u = o[3], h = this.uint8ArrayToUint32Array_(s);
            let f = h[0], g = h[1], m = h[2], y = h[3];
            const E = new Int32Array(e), x = new Int32Array(E.length);
            let T, R, v, D, b, w, P, I, _, V, F, H, K, $;
            const j = this.networkToHostOrderSwap;
            for(; t < E.length;){
                for(_ = j(E[t]), V = j(E[t + 1]), F = j(E[t + 2]), H = j(E[t + 3]), b = _ ^ r[0], w = H ^ r[1], P = F ^ r[2], I = V ^ r[3], K = 4, $ = 1; $ < i; $++)T = l[b >>> 24] ^ c[w >> 16 & 255] ^ d[P >> 8 & 255] ^ u[I & 255] ^ r[K], R = l[w >>> 24] ^ c[P >> 16 & 255] ^ d[I >> 8 & 255] ^ u[b & 255] ^ r[K + 1], v = l[P >>> 24] ^ c[I >> 16 & 255] ^ d[b >> 8 & 255] ^ u[w & 255] ^ r[K + 2], D = l[I >>> 24] ^ c[b >> 16 & 255] ^ d[w >> 8 & 255] ^ u[P & 255] ^ r[K + 3], b = T, w = R, P = v, I = D, K = K + 4;
                T = a[b >>> 24] << 24 ^ a[w >> 16 & 255] << 16 ^ a[P >> 8 & 255] << 8 ^ a[I & 255] ^ r[K], R = a[w >>> 24] << 24 ^ a[P >> 16 & 255] << 16 ^ a[I >> 8 & 255] << 8 ^ a[b & 255] ^ r[K + 1], v = a[P >>> 24] << 24 ^ a[I >> 16 & 255] << 16 ^ a[b >> 8 & 255] << 8 ^ a[w & 255] ^ r[K + 2], D = a[I >>> 24] << 24 ^ a[b >> 16 & 255] << 16 ^ a[w >> 8 & 255] << 8 ^ a[P & 255] ^ r[K + 3], x[t] = j(T ^ f), x[t + 1] = j(D ^ g), x[t + 2] = j(v ^ m), x[t + 3] = j(R ^ y), f = _, g = V, m = F, y = H, t = t + 4;
            }
            return x.buffer;
        }
    }
    const cc = 16;
    class ln {
        constructor(e, { removePKCS7Padding: t = !0 } = {}){
            if (this.logEnabled = !0, this.removePKCS7Padding = void 0, this.subtle = null, this.softwareDecrypter = null, this.key = null, this.fastAesKey = null, this.remainderData = null, this.currentIV = null, this.currentResult = null, this.useSoftware = void 0, this.useSoftware = e.enableSoftwareAES, this.removePKCS7Padding = t, t) try {
                const s = self.crypto;
                s && (this.subtle = s.subtle || s.webkitSubtle);
            } catch  {}
            this.useSoftware = !this.subtle;
        }
        destroy() {
            this.subtle = null, this.softwareDecrypter = null, this.key = null, this.fastAesKey = null, this.remainderData = null, this.currentIV = null, this.currentResult = null;
        }
        isSync() {
            return this.useSoftware;
        }
        flush() {
            const { currentResult: e, remainderData: t } = this;
            if (!e || t) return this.reset(), null;
            const s = new Uint8Array(e);
            return this.reset(), this.removePKCS7Padding ? oc(s) : s;
        }
        reset() {
            this.currentResult = null, this.currentIV = null, this.remainderData = null, this.softwareDecrypter && (this.softwareDecrypter = null);
        }
        decrypt(e, t, s) {
            return this.useSoftware ? new Promise((i, r)=>{
                this.softwareDecrypt(new Uint8Array(e), t, s);
                const a = this.flush();
                a ? i(a.buffer) : r(new Error("[softwareDecrypt] Failed to decrypt data"));
            }) : this.webCryptoDecrypt(new Uint8Array(e), t, s);
        }
        softwareDecrypt(e, t, s) {
            const { currentIV: i, currentResult: r, remainderData: a } = this;
            this.logOnce("JS AES decrypt"), a && (e = De(a, e), this.remainderData = null);
            const o = this.getValidChunk(e);
            if (!o.length) return null;
            i && (s = i);
            let l = this.softwareDecrypter;
            l || (l = this.softwareDecrypter = new lc), l.expandKey(t);
            const c = r;
            return this.currentResult = l.decrypt(o.buffer, 0, s), this.currentIV = ut(o, -16).buffer, c || null;
        }
        webCryptoDecrypt(e, t, s) {
            if (this.key !== t || !this.fastAesKey) {
                if (!this.subtle) return Promise.resolve(this.onWebCryptoError(e, t, s));
                this.key = t, this.fastAesKey = new ac(this.subtle, t);
            }
            return this.fastAesKey.expandKey().then((i)=>this.subtle ? (this.logOnce("WebCrypto AES decrypt"), new rc(this.subtle, new Uint8Array(s)).decrypt(e.buffer, i)) : Promise.reject(new Error("web crypto not initialized"))).catch((i)=>(S.warn(`[decrypter]: WebCrypto Error, disable WebCrypto API, ${i.name}: ${i.message}`), this.onWebCryptoError(e, t, s)));
        }
        onWebCryptoError(e, t, s) {
            this.useSoftware = !0, this.logEnabled = !0, this.softwareDecrypt(e, t, s);
            const i = this.flush();
            if (i) return i.buffer;
            throw new Error("WebCrypto and softwareDecrypt: failed to decrypt data");
        }
        getValidChunk(e) {
            let t = e;
            const s = e.length - e.length % cc;
            return s !== e.length && (t = ut(e, 0, s), this.remainderData = ut(e, s)), t;
        }
        logOnce(e) {
            this.logEnabled && (S.log(`[decrypter]: ${e}`), this.logEnabled = !1);
        }
    }
    const dc = {
        toString: function(n) {
            let e = "";
            const t = n.length;
            for(let s = 0; s < t; s++)e += `[${n.start(s).toFixed(3)}-${n.end(s).toFixed(3)}]`;
            return e;
        }
    }, C = {
        STOPPED: "STOPPED",
        IDLE: "IDLE",
        KEY_LOADING: "KEY_LOADING",
        FRAG_LOADING: "FRAG_LOADING",
        FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
        WAITING_TRACK: "WAITING_TRACK",
        PARSING: "PARSING",
        PARSED: "PARSED",
        ENDED: "ENDED",
        ERROR: "ERROR",
        WAITING_INIT_PTS: "WAITING_INIT_PTS",
        WAITING_LEVEL: "WAITING_LEVEL"
    };
    class cn extends Ql {
        constructor(e, t, s, i, r){
            super(), this.hls = void 0, this.fragPrevious = null, this.fragCurrent = null, this.fragmentTracker = void 0, this.transmuxer = null, this._state = C.STOPPED, this.playlistType = void 0, this.media = null, this.mediaBuffer = null, this.config = void 0, this.bitrateTest = !1, this.lastCurrentTime = 0, this.nextLoadPosition = 0, this.startPosition = 0, this.startTimeOffset = null, this.loadedmetadata = !1, this.retryDate = 0, this.levels = null, this.fragmentLoader = void 0, this.keyLoader = void 0, this.levelLastLoaded = null, this.startFragRequested = !1, this.decrypter = void 0, this.initPTS = [], this.onvseeking = null, this.onvended = null, this.logPrefix = "", this.log = void 0, this.warn = void 0, this.playlistType = r, this.logPrefix = i, this.log = S.log.bind(S, `${i}:`), this.warn = S.warn.bind(S, `${i}:`), this.hls = e, this.fragmentLoader = new nc(e.config), this.keyLoader = s, this.fragmentTracker = t, this.config = e.config, this.decrypter = new ln(e.config), e.on(p.MANIFEST_LOADED, this.onManifestLoaded, this);
        }
        doTick() {
            this.onTickEnd();
        }
        onTickEnd() {}
        startLoad(e) {}
        stopLoad() {
            this.fragmentLoader.abort(), this.keyLoader.abort(this.playlistType);
            const e = this.fragCurrent;
            e != null && e.loader && (e.abortRequests(), this.fragmentTracker.removeFragment(e)), this.resetTransmuxer(), this.fragCurrent = null, this.fragPrevious = null, this.clearInterval(), this.clearNextTick(), this.state = C.STOPPED;
        }
        _streamEnded(e, t) {
            if (t.live || e.nextStart || !e.end || !this.media) return !1;
            const s = t.partList;
            if (s != null && s.length) {
                const r = s[s.length - 1];
                return Z.isBuffered(this.media, r.start + r.duration / 2);
            }
            const i = t.fragments[t.fragments.length - 1].type;
            return this.fragmentTracker.isEndListAppended(i);
        }
        getLevelDetails() {
            if (this.levels && this.levelLastLoaded !== null) {
                var e;
                return (e = this.levelLastLoaded) == null ? void 0 : e.details;
            }
        }
        onMediaAttached(e, t) {
            const s = this.media = this.mediaBuffer = t.media;
            this.onvseeking = this.onMediaSeeking.bind(this), this.onvended = this.onMediaEnded.bind(this), s.addEventListener("seeking", this.onvseeking), s.addEventListener("ended", this.onvended);
            const i = this.config;
            this.levels && i.autoStartLoad && this.state === C.STOPPED && this.startLoad(i.startPosition);
        }
        onMediaDetaching() {
            const e = this.media;
            e != null && e.ended && (this.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0), e && this.onvseeking && this.onvended && (e.removeEventListener("seeking", this.onvseeking), e.removeEventListener("ended", this.onvended), this.onvseeking = this.onvended = null), this.keyLoader && this.keyLoader.detach(), this.media = this.mediaBuffer = null, this.loadedmetadata = !1, this.fragmentTracker.removeAllFragments(), this.stopLoad();
        }
        onMediaSeeking() {
            const { config: e, fragCurrent: t, media: s, mediaBuffer: i, state: r } = this, a = s ? s.currentTime : 0, o = Z.bufferInfo(i || s, a, e.maxBufferHole);
            if (this.log(`media seeking to ${M(a) ? a.toFixed(3) : a}, state: ${r}`), this.state === C.ENDED) this.resetLoadingState();
            else if (t) {
                const l = e.maxFragLookUpTolerance, c = t.start - l, d = t.start + t.duration + l;
                if (!o.len || d < o.start || c > o.end) {
                    const u = a > d;
                    (a < c || u) && (u && t.loader && (this.log("seeking outside of buffer while fragment load in progress, cancel fragment load"), t.abortRequests(), this.resetLoadingState()), this.fragPrevious = null);
                }
            }
            s && (this.fragmentTracker.removeFragmentsInRange(a, 1 / 0, this.playlistType, !0), this.lastCurrentTime = a), !this.loadedmetadata && !o.len && (this.nextLoadPosition = this.startPosition = a), this.tickImmediate();
        }
        onMediaEnded() {
            this.startPosition = this.lastCurrentTime = 0;
        }
        onManifestLoaded(e, t) {
            this.startTimeOffset = t.startTimeOffset, this.initPTS = [];
        }
        onHandlerDestroying() {
            this.hls.off(p.MANIFEST_LOADED, this.onManifestLoaded, this), this.stopLoad(), super.onHandlerDestroying(), this.hls = null;
        }
        onHandlerDestroyed() {
            this.state = C.STOPPED, this.fragmentLoader && this.fragmentLoader.destroy(), this.keyLoader && this.keyLoader.destroy(), this.decrypter && this.decrypter.destroy(), this.hls = this.log = this.warn = this.decrypter = this.keyLoader = this.fragmentLoader = this.fragmentTracker = null, super.onHandlerDestroyed();
        }
        loadFragment(e, t, s) {
            this._loadFragForPlayback(e, t, s);
        }
        _loadFragForPlayback(e, t, s) {
            const i = (r)=>{
                if (this.fragContextChanged(e)) {
                    this.warn(`Fragment ${e.sn}${r.part ? " p: " + r.part.index : ""} of level ${e.level} was dropped during download.`), this.fragmentTracker.removeFragment(e);
                    return;
                }
                e.stats.chunkCount++, this._handleFragmentLoadProgress(r);
            };
            this._doFragLoad(e, t, s, i).then((r)=>{
                if (!r) return;
                const a = this.state;
                if (this.fragContextChanged(e)) {
                    (a === C.FRAG_LOADING || !this.fragCurrent && a === C.PARSING) && (this.fragmentTracker.removeFragment(e), this.state = C.IDLE);
                    return;
                }
                "payload" in r && (this.log(`Loaded fragment ${e.sn} of level ${e.level}`), this.hls.trigger(p.FRAG_LOADED, r)), this._handleFragmentLoadComplete(r);
            }).catch((r)=>{
                this.state === C.STOPPED || this.state === C.ERROR || (this.warn(`Frag error: ${r?.message || r}`), this.resetFragmentLoading(e));
            });
        }
        clearTrackerIfNeeded(e) {
            var t;
            const { fragmentTracker: s } = this;
            if (s.getState(e) === ce.APPENDING) {
                const r = e.type, a = this.getFwdBufferInfo(this.mediaBuffer, r), o = Math.max(e.duration, a ? a.len : this.config.maxBufferLength), l = this.backtrackFragment;
                ((l ? e.sn - l.sn : 0) === 1 || this.reduceMaxBufferLength(o, e.duration)) && s.removeFragment(e);
            } else ((t = this.mediaBuffer) == null ? void 0 : t.buffered.length) === 0 ? s.removeAllFragments() : s.hasParts(e.type) && (s.detectPartialFragments({
                frag: e,
                part: null,
                stats: e.stats,
                id: e.type
            }), s.getState(e) === ce.PARTIAL && s.removeFragment(e));
        }
        checkLiveUpdate(e) {
            if (e.updated && !e.live) {
                const t = e.fragments[e.fragments.length - 1];
                this.fragmentTracker.detectPartialFragments({
                    frag: t,
                    part: null,
                    stats: t.stats,
                    id: t.type
                });
            }
            e.fragments[0] || (e.deltaUpdateFailed = !0);
        }
        flushMainBuffer(e, t, s = null) {
            if (!(e - t)) return;
            const i = {
                startOffset: e,
                endOffset: t,
                type: s
            };
            this.hls.trigger(p.BUFFER_FLUSHING, i);
        }
        _loadInitSegment(e, t) {
            this._doFragLoad(e, t).then((s)=>{
                if (!s || this.fragContextChanged(e) || !this.levels) throw new Error("init load aborted");
                return s;
            }).then((s)=>{
                const { hls: i } = this, { payload: r } = s, a = e.decryptdata;
                if (r && r.byteLength > 0 && a != null && a.key && a.iv && a.method === "AES-128") {
                    const o = self.performance.now();
                    return this.decrypter.decrypt(new Uint8Array(r), a.key.buffer, a.iv.buffer).catch((l)=>{
                        throw i.trigger(p.ERROR, {
                            type: G.MEDIA_ERROR,
                            details: A.FRAG_DECRYPT_ERROR,
                            fatal: !1,
                            error: l,
                            reason: l.message,
                            frag: e
                        }), l;
                    }).then((l)=>{
                        const c = self.performance.now();
                        return i.trigger(p.FRAG_DECRYPTED, {
                            frag: e,
                            payload: l,
                            stats: {
                                tstart: o,
                                tdecrypt: c
                            }
                        }), s.payload = l, this.completeInitSegmentLoad(s);
                    });
                }
                return this.completeInitSegmentLoad(s);
            }).catch((s)=>{
                this.state === C.STOPPED || this.state === C.ERROR || (this.warn(s), this.resetFragmentLoading(e));
            });
        }
        completeInitSegmentLoad(e) {
            const { levels: t } = this;
            if (!t) throw new Error("init load aborted, missing levels");
            const s = e.frag.stats;
            this.state = C.IDLE, e.frag.data = new Uint8Array(e.payload), s.parsing.start = s.buffering.start = self.performance.now(), s.parsing.end = s.buffering.end = self.performance.now(), this.tick();
        }
        fragContextChanged(e) {
            const { fragCurrent: t } = this;
            return !e || !t || e.sn !== t.sn || e.level !== t.level;
        }
        fragBufferedComplete(e, t) {
            var s, i, r, a;
            const o = this.mediaBuffer ? this.mediaBuffer : this.media;
            if (this.log(`Buffered ${e.type} sn: ${e.sn}${t ? " part: " + t.index : ""} of ${this.playlistType === B.MAIN ? "level" : "track"} ${e.level} (frag:[${((s = e.startPTS) != null ? s : NaN).toFixed(3)}-${((i = e.endPTS) != null ? i : NaN).toFixed(3)}] > buffer:${o ? dc.toString(Z.getBuffered(o)) : "(detached)"})`), e.sn !== "initSegment") {
                var l;
                if (e.type !== B.SUBTITLE) {
                    const d = e.elementaryStreams;
                    if (!Object.keys(d).some((u)=>!!d[u])) {
                        this.state = C.IDLE;
                        return;
                    }
                }
                const c = (l = this.levels) == null ? void 0 : l[e.level];
                c != null && c.fragmentError && (this.log(`Resetting level fragment error count of ${c.fragmentError} on frag buffered`), c.fragmentError = 0);
            }
            this.state = C.IDLE, o && (!this.loadedmetadata && e.type == B.MAIN && o.buffered.length && ((r = this.fragCurrent) == null ? void 0 : r.sn) === ((a = this.fragPrevious) == null ? void 0 : a.sn) && (this.loadedmetadata = !0, this.seekToStartPos()), this.tick());
        }
        seekToStartPos() {}
        _handleFragmentLoadComplete(e) {
            const { transmuxer: t } = this;
            if (!t) return;
            const { frag: s, part: i, partsLoaded: r } = e, a = !r || r.length === 0 || r.some((l)=>!l), o = new on(s.level, s.sn, s.stats.chunkCount + 1, 0, i ? i.index : -1, !a);
            t.flush(o);
        }
        _handleFragmentLoadProgress(e) {}
        _doFragLoad(e, t, s = null, i) {
            var r;
            const a = t?.details;
            if (!this.levels || !a) throw new Error(`frag load aborted, missing level${a ? "" : " detail"}s`);
            let o = null;
            if (e.encrypted && !((r = e.decryptdata) != null && r.key) ? (this.log(`Loading key for ${e.sn} of [${a.startSN}-${a.endSN}], ${this.logPrefix === "[stream-controller]" ? "level" : "track"} ${e.level}`), this.state = C.KEY_LOADING, this.fragCurrent = e, o = this.keyLoader.load(e).then((d)=>{
                if (!this.fragContextChanged(d.frag)) return this.hls.trigger(p.KEY_LOADED, d), this.state === C.KEY_LOADING && (this.state = C.IDLE), d;
            }), this.hls.trigger(p.KEY_LOADING, {
                frag: e
            }), this.fragCurrent === null && (o = Promise.reject(new Error("frag load aborted, context changed in KEY_LOADING")))) : !e.encrypted && a.encryptedFragments.length && this.keyLoader.loadClear(e, a.encryptedFragments), s = Math.max(e.start, s || 0), this.config.lowLatencyMode && e.sn !== "initSegment") {
                const d = a.partList;
                if (d && i) {
                    s > e.end && a.fragmentHint && (e = a.fragmentHint);
                    const u = this.getNextPart(d, e, s);
                    if (u > -1) {
                        const h = d[u];
                        this.log(`Loading part sn: ${e.sn} p: ${h.index} cc: ${e.cc} of playlist [${a.startSN}-${a.endSN}] parts [0-${u}-${d.length - 1}] ${this.logPrefix === "[stream-controller]" ? "level" : "track"}: ${e.level}, target: ${parseFloat(s.toFixed(3))}`), this.nextLoadPosition = h.start + h.duration, this.state = C.FRAG_LOADING;
                        let f;
                        return o ? f = o.then((g)=>!g || this.fragContextChanged(g.frag) ? null : this.doFragPartsLoad(e, h, t, i)).catch((g)=>this.handleFragLoadError(g)) : f = this.doFragPartsLoad(e, h, t, i).catch((g)=>this.handleFragLoadError(g)), this.hls.trigger(p.FRAG_LOADING, {
                            frag: e,
                            part: h,
                            targetBufferTime: s
                        }), this.fragCurrent === null ? Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING parts")) : f;
                    } else if (!e.url || this.loadedEndOfParts(d, s)) return Promise.resolve(null);
                }
            }
            this.log(`Loading fragment ${e.sn} cc: ${e.cc} ${a ? "of [" + a.startSN + "-" + a.endSN + "] " : ""}${this.logPrefix === "[stream-controller]" ? "level" : "track"}: ${e.level}, target: ${parseFloat(s.toFixed(3))}`), M(e.sn) && !this.bitrateTest && (this.nextLoadPosition = e.start + e.duration), this.state = C.FRAG_LOADING;
            const l = this.config.progressive;
            let c;
            return l && o ? c = o.then((d)=>!d || this.fragContextChanged(d?.frag) ? null : this.fragmentLoader.load(e, i)).catch((d)=>this.handleFragLoadError(d)) : c = Promise.all([
                this.fragmentLoader.load(e, l ? i : void 0),
                o
            ]).then(([d])=>(!l && d && i && i(d), d)).catch((d)=>this.handleFragLoadError(d)), this.hls.trigger(p.FRAG_LOADING, {
                frag: e,
                targetBufferTime: s
            }), this.fragCurrent === null ? Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING")) : c;
        }
        doFragPartsLoad(e, t, s, i) {
            return new Promise((r, a)=>{
                var o;
                const l = [], c = (o = s.details) == null ? void 0 : o.partList, d = (u)=>{
                    this.fragmentLoader.loadPart(e, u, i).then((h)=>{
                        l[u.index] = h;
                        const f = h.part;
                        this.hls.trigger(p.FRAG_LOADED, h);
                        const g = zn(s, e.sn, u.index + 1) || la(c, e.sn, u.index + 1);
                        if (g) d(g);
                        else return r({
                            frag: e,
                            part: f,
                            partsLoaded: l
                        });
                    }).catch(a);
                };
                d(t);
            });
        }
        handleFragLoadError(e) {
            if ("data" in e) {
                const t = e.data;
                e.data && t.details === A.INTERNAL_ABORTED ? this.handleFragLoadAborted(t.frag, t.part) : this.hls.trigger(p.ERROR, t);
            } else this.hls.trigger(p.ERROR, {
                type: G.OTHER_ERROR,
                details: A.INTERNAL_EXCEPTION,
                err: e,
                error: e,
                fatal: !0
            });
            return null;
        }
        _handleTransmuxerFlush(e) {
            const t = this.getCurrentContext(e);
            if (!t || this.state !== C.PARSING) {
                !this.fragCurrent && this.state !== C.STOPPED && this.state !== C.ERROR && (this.state = C.IDLE);
                return;
            }
            const { frag: s, part: i, level: r } = t, a = self.performance.now();
            s.stats.parsing.end = a, i && (i.stats.parsing.end = a), this.updateLevelTiming(s, i, r, e.partial);
        }
        getCurrentContext(e) {
            const { levels: t, fragCurrent: s } = this, { level: i, sn: r, part: a } = e;
            if (!(t != null && t[i])) return this.warn(`Levels object was unset while buffering fragment ${r} of level ${i}. The current chunk will not be buffered.`), null;
            const o = t[i], l = a > -1 ? zn(o, r, a) : null, c = l ? l.fragment : kl(o, r, s);
            return c ? (s && s !== c && (c.stats = s.stats), {
                frag: c,
                part: l,
                level: o
            }) : null;
        }
        bufferFragmentData(e, t, s, i, r) {
            var a;
            if (!e || this.state !== C.PARSING) return;
            const { data1: o, data2: l } = e;
            let c = o;
            if (o && l && (c = De(o, l)), !((a = c) != null && a.length)) return;
            const d = {
                type: e.type,
                frag: t,
                part: s,
                chunkMeta: i,
                parent: t.type,
                data: c
            };
            if (this.hls.trigger(p.BUFFER_APPENDING, d), e.dropped && e.independent && !s) {
                if (r) return;
                this.flushBufferGap(t);
            }
        }
        flushBufferGap(e) {
            const t = this.media;
            if (!t) return;
            if (!Z.isBuffered(t, t.currentTime)) {
                this.flushMainBuffer(0, e.start);
                return;
            }
            const s = t.currentTime, i = Z.bufferInfo(t, s, 0), r = e.duration, a = Math.min(this.config.maxFragLookUpTolerance * 2, r * .25), o = Math.max(Math.min(e.start - a, i.end - a), s + a);
            e.start - o > a && this.flushMainBuffer(o, e.start);
        }
        getFwdBufferInfo(e, t) {
            const s = this.getLoadPosition();
            return M(s) ? this.getFwdBufferInfoAtPos(e, s, t) : null;
        }
        getFwdBufferInfoAtPos(e, t, s) {
            const { config: { maxBufferHole: i } } = this, r = Z.bufferInfo(e, t, i);
            if (r.len === 0 && r.nextStart !== void 0) {
                const a = this.fragmentTracker.getBufferedFrag(t, s);
                if (a && r.nextStart < a.end) return Z.bufferInfo(e, t, Math.max(r.nextStart, i));
            }
            return r;
        }
        getMaxBufferLength(e) {
            const { config: t } = this;
            let s;
            return e ? s = Math.max(8 * t.maxBufferSize / e, t.maxBufferLength) : s = t.maxBufferLength, Math.min(s, t.maxMaxBufferLength);
        }
        reduceMaxBufferLength(e, t) {
            const s = this.config, i = Math.max(Math.min(e - t, s.maxBufferLength), t), r = Math.max(e - t * 3, s.maxMaxBufferLength / 2, i);
            return r >= i ? (s.maxMaxBufferLength = r, this.warn(`Reduce max buffer length to ${r}s`), !0) : !1;
        }
        getAppendedFrag(e, t = B.MAIN) {
            const s = this.fragmentTracker.getAppendedFrag(e, B.MAIN);
            return s && "fragment" in s ? s.fragment : s;
        }
        getNextFragment(e, t) {
            const s = t.fragments, i = s.length;
            if (!i) return null;
            const { config: r } = this, a = s[0].start;
            let o;
            if (t.live) {
                const l = r.initialLiveManifestSize;
                if (i < l) return this.warn(`Not enough fragments to start playback (have: ${i}, need: ${l})`), null;
                (!t.PTSKnown && !this.startFragRequested && this.startPosition === -1 || e < a) && (o = this.getInitialLiveFragment(t, s), this.startPosition = this.nextLoadPosition = o ? this.hls.liveSyncPosition || o.start : e);
            } else e <= a && (o = s[0]);
            if (!o) {
                const l = r.lowLatencyMode ? t.partEnd : t.fragmentEnd;
                o = this.getFragmentAtPosition(e, l, t);
            }
            return this.mapToInitFragWhenRequired(o);
        }
        isLoopLoading(e, t) {
            const s = this.fragmentTracker.getState(e);
            return (s === ce.OK || s === ce.PARTIAL && !!e.gap) && this.nextLoadPosition > t;
        }
        getNextFragmentLoopLoading(e, t, s, i, r) {
            const a = e.gap, o = this.getNextFragment(this.nextLoadPosition, t);
            if (o === null) return o;
            if (e = o, a && e && !e.gap && s.nextStart) {
                const l = this.getFwdBufferInfoAtPos(this.mediaBuffer ? this.mediaBuffer : this.media, s.nextStart, i);
                if (l !== null && s.len + l.len >= r) return this.log(`buffer full after gaps in "${i}" playlist starting at sn: ${e.sn}`), null;
            }
            return e;
        }
        mapToInitFragWhenRequired(e) {
            return e != null && e.initSegment && !(e != null && e.initSegment.data) && !this.bitrateTest ? e.initSegment : e;
        }
        getNextPart(e, t, s) {
            let i = -1, r = !1, a = !0;
            for(let o = 0, l = e.length; o < l; o++){
                const c = e[o];
                if (a = a && !c.independent, i > -1 && s < c.start) break;
                const d = c.loaded;
                d ? i = -1 : (r || c.independent || a) && c.fragment === t && (i = o), r = d;
            }
            return i;
        }
        loadedEndOfParts(e, t) {
            const s = e[e.length - 1];
            return s && t > s.start && s.loaded;
        }
        getInitialLiveFragment(e, t) {
            const s = this.fragPrevious;
            let i = null;
            if (s) {
                if (e.hasProgramDateTime && (this.log(`Live playlist, switching playlist, load frag with same PDT: ${s.programDateTime}`), i = Fl(t, s.endProgramDateTime, this.config.maxFragLookUpTolerance)), !i) {
                    const r = s.sn + 1;
                    if (r >= e.startSN && r <= e.endSN) {
                        const a = t[r - e.startSN];
                        s.cc === a.cc && (i = a, this.log(`Live playlist, switching playlist, load frag with next SN: ${i.sn}`));
                    }
                    i || (i = Nl(t, s.cc), i && this.log(`Live playlist, switching playlist, load frag with same CC: ${i.sn}`));
                }
            } else {
                const r = this.hls.liveSyncPosition;
                r !== null && (i = this.getFragmentAtPosition(r, this.bitrateTest ? e.fragmentEnd : e.edge, e));
            }
            return i;
        }
        getFragmentAtPosition(e, t, s) {
            const { config: i } = this;
            let { fragPrevious: r } = this, { fragments: a, endSN: o } = s;
            const { fragmentHint: l } = s, { maxFragLookUpTolerance: c } = i, d = s.partList, u = !!(i.lowLatencyMode && d != null && d.length && l);
            u && l && !this.bitrateTest && (a = a.concat(l), o = l.sn);
            let h;
            if (e < t) {
                const f = e > t - c ? 0 : c;
                h = Os(r, a, e, f);
            } else h = a[a.length - 1];
            if (h) {
                const f = h.sn - s.startSN, g = this.fragmentTracker.getState(h);
                if ((g === ce.OK || g === ce.PARTIAL && h.gap) && (r = h), r && h.sn === r.sn && (!u || d[0].fragment.sn > h.sn) && r && h.level === r.level) {
                    const y = a[f + 1];
                    h.sn < o && this.fragmentTracker.getState(y) !== ce.OK ? h = y : h = null;
                }
            }
            return h;
        }
        synchronizeToLiveEdge(e) {
            const { config: t, media: s } = this;
            if (!s) return;
            const i = this.hls.liveSyncPosition, r = s.currentTime, a = e.fragments[0].start, o = e.edge, l = r >= a - t.maxFragLookUpTolerance && r <= o;
            if (i !== null && s.duration > i && (r < i || !l)) {
                const c = t.liveMaxLatencyDuration !== void 0 ? t.liveMaxLatencyDuration : t.liveMaxLatencyDurationCount * e.targetduration;
                (!l && s.readyState < 4 || r < o - c) && (this.loadedmetadata || (this.nextLoadPosition = i), s.readyState && (this.warn(`Playback: ${r.toFixed(3)} is located too far from the end of live sliding playlist: ${o}, reset currentTime to : ${i.toFixed(3)}`), s.currentTime = i));
            }
        }
        alignPlaylists(e, t, s) {
            const i = e.fragments.length;
            if (!i) return this.warn("No fragments in live playlist"), 0;
            const r = e.fragments[0].start, a = !t, o = e.alignedSliding && M(r);
            if (a || !o && !r) {
                const { fragPrevious: l } = this;
                sc(l, s, e);
                const c = e.fragments[0].start;
                return this.log(`Live playlist sliding: ${c.toFixed(2)} start-sn: ${t ? t.startSN : "na"}->${e.startSN} prev-sn: ${l ? l.sn : "na"} fragments: ${i}`), c;
            }
            return r;
        }
        waitForCdnTuneIn(e) {
            return e.live && e.canBlockReload && e.partTarget && e.tuneInGoal > Math.max(e.partHoldBack, e.partTarget * 3);
        }
        setStartPosition(e, t) {
            let s = this.startPosition;
            if (s < t && (s = -1), s === -1 || this.lastCurrentTime === -1) {
                const i = this.startTimeOffset !== null, r = i ? this.startTimeOffset : e.startTimeOffset;
                r !== null && M(r) ? (s = t + r, r < 0 && (s += e.totalduration), s = Math.min(Math.max(t, s), t + e.totalduration), this.log(`Start time offset ${r} found in ${i ? "multivariant" : "media"} playlist, adjust startPosition to ${s}`), this.startPosition = s) : e.live ? s = this.hls.liveSyncPosition || t : this.startPosition = s = 0, this.lastCurrentTime = s;
            }
            this.nextLoadPosition = s;
        }
        getLoadPosition() {
            const { media: e } = this;
            let t = 0;
            return this.loadedmetadata && e ? t = e.currentTime : this.nextLoadPosition && (t = this.nextLoadPosition), t;
        }
        handleFragLoadAborted(e, t) {
            this.transmuxer && e.sn !== "initSegment" && e.stats.aborted && (this.warn(`Fragment ${e.sn}${t ? " part " + t.index : ""} of level ${e.level} was aborted`), this.resetFragmentLoading(e));
        }
        resetFragmentLoading(e) {
            (!this.fragCurrent || !this.fragContextChanged(e) && this.state !== C.FRAG_LOADING_WAITING_RETRY) && (this.state = C.IDLE);
        }
        onFragmentOrKeyLoadError(e, t) {
            if (t.chunkMeta && !t.frag) {
                const d = this.getCurrentContext(t.chunkMeta);
                d && (t.frag = d.frag);
            }
            const s = t.frag;
            if (!s || s.type !== e || !this.levels) return;
            if (this.fragContextChanged(s)) {
                var i;
                this.warn(`Frag load error must match current frag to retry ${s.url} > ${(i = this.fragCurrent) == null ? void 0 : i.url}`);
                return;
            }
            const r = t.details === A.FRAG_GAP;
            r && this.fragmentTracker.fragBuffered(s, !0);
            const a = t.errorAction, { action: o, retryCount: l = 0, retryConfig: c } = a || {};
            if (a && o === fe.RetryRequest && c) {
                this.resetStartWhenNotLoaded(this.levelLastLoaded);
                const d = rn(c, l);
                this.warn(`Fragment ${s.sn} of ${e} ${s.level} errored with ${t.details}, retrying loading ${l + 1}/${c.maxNumRetry} in ${d}ms`), a.resolved = !0, this.retryDate = self.performance.now() + d, this.state = C.FRAG_LOADING_WAITING_RETRY;
            } else if (c && a) if (this.resetFragmentErrors(e), l < c.maxNumRetry) !r && o !== fe.RemoveAlternatePermanently && (a.resolved = !0);
            else {
                S.warn(`${t.details} reached or exceeded max retry (${l})`);
                return;
            }
            else a?.action === fe.SendAlternateToPenaltyBox ? this.state = C.WAITING_LEVEL : this.state = C.ERROR;
            this.tickImmediate();
        }
        reduceLengthAndFlushBuffer(e) {
            if (this.state === C.PARSING || this.state === C.PARSED) {
                const t = e.frag, s = e.parent, i = this.getFwdBufferInfo(this.mediaBuffer, s), r = i && i.len > .5;
                r && this.reduceMaxBufferLength(i.len, t?.duration || 10);
                const a = !r;
                return a && this.warn(`Buffer full error while media.currentTime is not buffered, flush ${s} buffer`), t && (this.fragmentTracker.removeFragment(t), this.nextLoadPosition = t.start), this.resetLoadingState(), a;
            }
            return !1;
        }
        resetFragmentErrors(e) {
            e === B.AUDIO && (this.fragCurrent = null), this.loadedmetadata || (this.startFragRequested = !1), this.state !== C.STOPPED && (this.state = C.IDLE);
        }
        afterBufferFlushed(e, t, s) {
            if (!e) return;
            const i = Z.getBuffered(e);
            this.fragmentTracker.detectEvictedFragments(t, i, s), this.state === C.ENDED && this.resetLoadingState();
        }
        resetLoadingState() {
            this.log("Reset loading state"), this.fragCurrent = null, this.fragPrevious = null, this.state = C.IDLE;
        }
        resetStartWhenNotLoaded(e) {
            if (!this.loadedmetadata) {
                this.startFragRequested = !1;
                const t = e ? e.details : null;
                t != null && t.live ? (this.startPosition = -1, this.setStartPosition(t, 0), this.resetLoadingState()) : this.nextLoadPosition = this.startPosition;
            }
        }
        resetWhenMissingContext(e) {
            this.warn(`The loading context changed while buffering fragment ${e.sn} of level ${e.level}. This chunk will not be buffered.`), this.removeUnbufferedFrags(), this.resetStartWhenNotLoaded(this.levelLastLoaded), this.resetLoadingState();
        }
        removeUnbufferedFrags(e = 0) {
            this.fragmentTracker.removeFragmentsInRange(e, 1 / 0, this.playlistType, !1, !0);
        }
        updateLevelTiming(e, t, s, i) {
            var r;
            const a = s.details;
            if (!a) {
                this.warn("level.details undefined");
                return;
            }
            if (!Object.keys(e.elementaryStreams).reduce((l, c)=>{
                const d = e.elementaryStreams[c];
                if (d) {
                    const u = d.endPTS - d.startPTS;
                    if (u <= 0) return this.warn(`Could not parse fragment ${e.sn} ${c} duration reliably (${u})`), l || !1;
                    const h = i ? 0 : aa(a, e, d.startPTS, d.endPTS, d.startDTS, d.endDTS);
                    return this.hls.trigger(p.LEVEL_PTS_UPDATED, {
                        details: a,
                        level: s,
                        drift: h,
                        type: c,
                        frag: e,
                        start: d.startPTS,
                        end: d.endPTS
                    }), !0;
                }
                return l;
            }, !1) && ((r = this.transmuxer) == null ? void 0 : r.error) === null) {
                const l = new Error(`Found no media in fragment ${e.sn} of level ${e.level} resetting transmuxer to fallback to playlist timing`);
                if (s.fragmentError === 0 && (s.fragmentError++, e.gap = !0, this.fragmentTracker.removeFragment(e), this.fragmentTracker.fragBuffered(e, !0)), this.warn(l.message), this.hls.trigger(p.ERROR, {
                    type: G.MEDIA_ERROR,
                    details: A.FRAG_PARSING_ERROR,
                    fatal: !1,
                    error: l,
                    frag: e,
                    reason: `Found no media in msn ${e.sn} of level "${s.url}"`
                }), !this.hls) return;
                this.resetTransmuxer();
            }
            this.state = C.PARSED, this.hls.trigger(p.FRAG_PARSED, {
                frag: e,
                part: t
            });
        }
        resetTransmuxer() {
            this.transmuxer && (this.transmuxer.destroy(), this.transmuxer = null);
        }
        recoverWorkerError(e) {
            e.event === "demuxerWorker" && (this.fragmentTracker.removeAllFragments(), this.resetTransmuxer(), this.resetStartWhenNotLoaded(this.levelLastLoaded), this.resetLoadingState());
        }
        set state(e) {
            const t = this._state;
            t !== e && (this._state = e, this.log(`${t}->${e}`));
        }
        get state() {
            return this._state;
        }
    }
    class fa {
        constructor(){
            this.chunks = [], this.dataLength = 0;
        }
        push(e) {
            this.chunks.push(e), this.dataLength += e.length;
        }
        flush() {
            const { chunks: e, dataLength: t } = this;
            let s;
            if (e.length) e.length === 1 ? s = e[0] : s = uc(e, t);
            else return new Uint8Array(0);
            return this.reset(), s;
        }
        reset() {
            this.chunks.length = 0, this.dataLength = 0;
        }
    }
    function uc(n, e) {
        const t = new Uint8Array(e);
        let s = 0;
        for(let i = 0; i < n.length; i++){
            const r = n[i];
            t.set(r, s), s += r.length;
        }
        return t;
    }
    function hc() {
        return typeof __HLS_WORKER_BUNDLE__ == "function";
    }
    function fc() {
        const n = new self.Blob([
            `var exports={};var module={exports:exports};function define(f){f()};define.amd=true;(${__HLS_WORKER_BUNDLE__.toString()})(true);`
        ], {
            type: "text/javascript"
        }), e = self.URL.createObjectURL(n);
        return {
            worker: new self.Worker(e),
            objectURL: e
        };
    }
    function gc(n) {
        const e = new self.URL(n, self.location.href).href;
        return {
            worker: new self.Worker(e),
            scriptURL: e
        };
    }
    function $e(n = "", e = 9e4) {
        return {
            type: n,
            id: -1,
            pid: -1,
            inputTimeScale: e,
            sequenceNumber: -1,
            samples: [],
            dropped: 0
        };
    }
    class dn {
        constructor(){
            this._audioTrack = void 0, this._id3Track = void 0, this.frameIndex = 0, this.cachedData = null, this.basePTS = null, this.initPTS = null, this.lastPTS = null;
        }
        resetInitSegment(e, t, s, i) {
            this._id3Track = {
                type: "id3",
                id: 3,
                pid: -1,
                inputTimeScale: 9e4,
                sequenceNumber: 0,
                samples: [],
                dropped: 0
            };
        }
        resetTimeStamp(e) {
            this.initPTS = e, this.resetContiguity();
        }
        resetContiguity() {
            this.basePTS = null, this.lastPTS = null, this.frameIndex = 0;
        }
        canParse(e, t) {
            return !1;
        }
        appendFrame(e, t, s) {}
        demux(e, t) {
            this.cachedData && (e = De(this.cachedData, e), this.cachedData = null);
            let s = jt(e, 0), i = s ? s.length : 0, r;
            const a = this._audioTrack, o = this._id3Track, l = s ? nn(s) : void 0, c = e.length;
            for((this.basePTS === null || this.frameIndex === 0 && M(l)) && (this.basePTS = mc(l, t, this.initPTS), this.lastPTS = this.basePTS), this.lastPTS === null && (this.lastPTS = this.basePTS), s && s.length > 0 && o.samples.push({
                pts: this.lastPTS,
                dts: this.lastPTS,
                data: s,
                type: Fe.audioId3,
                duration: Number.POSITIVE_INFINITY
            }); i < c;){
                if (this.canParse(e, i)) {
                    const d = this.appendFrame(a, e, i);
                    d ? (this.frameIndex++, this.lastPTS = d.sample.pts, i += d.length, r = i) : i = c;
                } else No(e, i) ? (s = jt(e, i), o.samples.push({
                    pts: this.lastPTS,
                    dts: this.lastPTS,
                    data: s,
                    type: Fe.audioId3,
                    duration: Number.POSITIVE_INFINITY
                }), i += s.length, r = i) : i++;
                if (i === c && r !== c) {
                    const d = ut(e, r);
                    this.cachedData ? this.cachedData = De(this.cachedData, d) : this.cachedData = d;
                }
            }
            return {
                audioTrack: a,
                videoTrack: $e(),
                id3Track: o,
                textTrack: $e()
            };
        }
        demuxSampleAes(e, t, s) {
            return Promise.reject(new Error(`[${this}] This demuxer does not support Sample-AES decryption`));
        }
        flush(e) {
            const t = this.cachedData;
            return t && (this.cachedData = null, this.demux(t, 0)), {
                audioTrack: this._audioTrack,
                videoTrack: $e(),
                id3Track: this._id3Track,
                textTrack: $e()
            };
        }
        destroy() {}
    }
    const mc = (n, e, t)=>{
        if (M(n)) return n * 90;
        const s = t ? t.baseTime * 9e4 / t.timescale : 0;
        return e * 9e4 + s;
    };
    function pc(n, e, t, s) {
        let i, r, a, o;
        const l = navigator.userAgent.toLowerCase(), c = s, d = [
            96e3,
            88200,
            64e3,
            48e3,
            44100,
            32e3,
            24e3,
            22050,
            16e3,
            12e3,
            11025,
            8e3,
            7350
        ];
        i = ((e[t + 2] & 192) >>> 6) + 1;
        const u = (e[t + 2] & 60) >>> 2;
        if (u > d.length - 1) {
            const h = new Error(`invalid ADTS sampling index:${u}`);
            n.emit(p.ERROR, p.ERROR, {
                type: G.MEDIA_ERROR,
                details: A.FRAG_PARSING_ERROR,
                fatal: !0,
                error: h,
                reason: h.message
            });
            return;
        }
        return a = (e[t + 2] & 1) << 2, a |= (e[t + 3] & 192) >>> 6, S.log(`manifest codec:${s}, ADTS type:${i}, samplingIndex:${u}`), /firefox/i.test(l) ? u >= 6 ? (i = 5, o = new Array(4), r = u - 3) : (i = 2, o = new Array(2), r = u) : l.indexOf("android") !== -1 ? (i = 2, o = new Array(2), r = u) : (i = 5, o = new Array(4), s && (s.indexOf("mp4a.40.29") !== -1 || s.indexOf("mp4a.40.5") !== -1) || !s && u >= 6 ? r = u - 3 : ((s && s.indexOf("mp4a.40.2") !== -1 && (u >= 6 && a === 1 || /vivaldi/i.test(l)) || !s && a === 1) && (i = 2, o = new Array(2)), r = u)), o[0] = i << 3, o[0] |= (u & 14) >> 1, o[1] |= (u & 1) << 7, o[1] |= a << 3, i === 5 && (o[1] |= (r & 14) >> 1, o[2] = (r & 1) << 7, o[2] |= 8, o[3] = 0), {
            config: o,
            samplerate: d[u],
            channelCount: a,
            codec: "mp4a.40." + i,
            manifestCodec: c
        };
    }
    function ga(n, e) {
        return n[e] === 255 && (n[e + 1] & 246) === 240;
    }
    function ma(n, e) {
        return n[e + 1] & 1 ? 7 : 9;
    }
    function un(n, e) {
        return (n[e + 3] & 3) << 11 | n[e + 4] << 3 | (n[e + 5] & 224) >>> 5;
    }
    function yc(n, e) {
        return e + 5 < n.length;
    }
    function Ns(n, e) {
        return e + 1 < n.length && ga(n, e);
    }
    function Ec(n, e) {
        return yc(n, e) && ga(n, e) && un(n, e) <= n.length - e;
    }
    function Tc(n, e) {
        if (Ns(n, e)) {
            const t = ma(n, e);
            if (e + t >= n.length) return !1;
            const s = un(n, e);
            if (s <= t) return !1;
            const i = e + s;
            return i === n.length || Ns(n, i);
        }
        return !1;
    }
    function pa(n, e, t, s, i) {
        if (!n.samplerate) {
            const r = pc(e, t, s, i);
            if (!r) return;
            n.config = r.config, n.samplerate = r.samplerate, n.channelCount = r.channelCount, n.codec = r.codec, n.manifestCodec = r.manifestCodec, S.log(`parsed codec:${n.codec}, rate:${r.samplerate}, channels:${r.channelCount}`);
        }
    }
    function ya(n) {
        return 1024 * 9e4 / n;
    }
    function xc(n, e) {
        const t = ma(n, e);
        if (e + t <= n.length) {
            const s = un(n, e) - t;
            if (s > 0) return {
                headerLength: t,
                frameLength: s
            };
        }
    }
    function Ea(n, e, t, s, i) {
        const r = ya(n.samplerate), a = s + i * r, o = xc(e, t);
        let l;
        if (o) {
            const { frameLength: u, headerLength: h } = o, f = h + u, g = Math.max(0, t + f - e.length);
            g ? (l = new Uint8Array(f - h), l.set(e.subarray(t + h, e.length), 0)) : l = e.subarray(t + h, t + f);
            const m = {
                unit: l,
                pts: a
            };
            return g || n.samples.push(m), {
                sample: m,
                length: f,
                missing: g
            };
        }
        const c = e.length - t;
        return l = new Uint8Array(c), l.set(e.subarray(t, e.length), 0), {
            sample: {
                unit: l,
                pts: a
            },
            length: c,
            missing: -1
        };
    }
    let rs = null;
    const vc = [
        32,
        64,
        96,
        128,
        160,
        192,
        224,
        256,
        288,
        320,
        352,
        384,
        416,
        448,
        32,
        48,
        56,
        64,
        80,
        96,
        112,
        128,
        160,
        192,
        224,
        256,
        320,
        384,
        32,
        40,
        48,
        56,
        64,
        80,
        96,
        112,
        128,
        160,
        192,
        224,
        256,
        320,
        32,
        48,
        56,
        64,
        80,
        96,
        112,
        128,
        144,
        160,
        176,
        192,
        224,
        256,
        8,
        16,
        24,
        32,
        40,
        48,
        56,
        64,
        80,
        96,
        112,
        128,
        144,
        160
    ], Sc = [
        44100,
        48e3,
        32e3,
        22050,
        24e3,
        16e3,
        11025,
        12e3,
        8e3
    ], Lc = [
        [
            0,
            72,
            144,
            12
        ],
        [
            0,
            0,
            0,
            0
        ],
        [
            0,
            72,
            144,
            12
        ],
        [
            0,
            144,
            144,
            12
        ]
    ], Ac = [
        0,
        1,
        1,
        4
    ];
    function Ta(n, e, t, s, i) {
        if (t + 24 > e.length) return;
        const r = xa(e, t);
        if (r && t + r.frameLength <= e.length) {
            const a = r.samplesPerFrame * 9e4 / r.sampleRate, o = s + i * a, l = {
                unit: e.subarray(t, t + r.frameLength),
                pts: o,
                dts: o
            };
            return n.config = [], n.channelCount = r.channelCount, n.samplerate = r.sampleRate, n.samples.push(l), {
                sample: l,
                length: r.frameLength,
                missing: 0
            };
        }
    }
    function xa(n, e) {
        const t = n[e + 1] >> 3 & 3, s = n[e + 1] >> 1 & 3, i = n[e + 2] >> 4 & 15, r = n[e + 2] >> 2 & 3;
        if (t !== 1 && i !== 0 && i !== 15 && r !== 3) {
            const a = n[e + 2] >> 1 & 1, o = n[e + 3] >> 6, l = t === 3 ? 3 - s : s === 3 ? 3 : 4, c = vc[l * 14 + i - 1] * 1e3, u = Sc[(t === 3 ? 0 : t === 2 ? 1 : 2) * 3 + r], h = o === 3 ? 1 : 2, f = Lc[t][s], g = Ac[s], m = f * 8 * g, y = Math.floor(f * c / u + a) * g;
            if (rs === null) {
                const T = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
                rs = T ? parseInt(T[1]) : 0;
            }
            return !!rs && rs <= 87 && s === 2 && c >= 224e3 && o === 0 && (n[e + 3] = n[e + 3] | 128), {
                sampleRate: u,
                channelCount: h,
                frameLength: y,
                samplesPerFrame: m
            };
        }
    }
    function hn(n, e) {
        return n[e] === 255 && (n[e + 1] & 224) === 224 && (n[e + 1] & 6) !== 0;
    }
    function va(n, e) {
        return e + 1 < n.length && hn(n, e);
    }
    function bc(n, e) {
        return hn(n, e) && 4 <= n.length - e;
    }
    function Sa(n, e) {
        if (e + 1 < n.length && hn(n, e)) {
            const s = xa(n, e);
            let i = 4;
            s != null && s.frameLength && (i = s.frameLength);
            const r = e + i;
            return r === n.length || va(n, r);
        }
        return !1;
    }
    class Rc extends dn {
        constructor(e, t){
            super(), this.observer = void 0, this.config = void 0, this.observer = e, this.config = t;
        }
        resetInitSegment(e, t, s, i) {
            super.resetInitSegment(e, t, s, i), this._audioTrack = {
                container: "audio/adts",
                type: "audio",
                id: 2,
                pid: -1,
                sequenceNumber: 0,
                segmentCodec: "aac",
                samples: [],
                manifestCodec: t,
                duration: i,
                inputTimeScale: 9e4,
                dropped: 0
            };
        }
        static probe(e) {
            if (!e) return !1;
            const t = jt(e, 0);
            let s = t?.length || 0;
            if (Sa(e, s)) return !1;
            for(let i = e.length; s < i; s++)if (Tc(e, s)) return S.log("ADTS sync word found !"), !0;
            return !1;
        }
        canParse(e, t) {
            return Ec(e, t);
        }
        appendFrame(e, t, s) {
            pa(e, this.observer, t, s, e.manifestCodec);
            const i = Ea(e, t, s, this.basePTS, this.frameIndex);
            if (i && i.missing === 0) return i;
        }
    }
    const Ic = /\/emsg[-/]ID3/i;
    class Dc {
        constructor(e, t){
            this.remainderData = null, this.timeOffset = 0, this.config = void 0, this.videoTrack = void 0, this.audioTrack = void 0, this.id3Track = void 0, this.txtTrack = void 0, this.config = t;
        }
        resetTimeStamp() {}
        resetInitSegment(e, t, s, i) {
            const r = this.videoTrack = $e("video", 1), a = this.audioTrack = $e("audio", 1), o = this.txtTrack = $e("text", 1);
            if (this.id3Track = $e("id3", 1), this.timeOffset = 0, !(e != null && e.byteLength)) return;
            const l = Jr(e);
            if (l.video) {
                const { id: c, timescale: d, codec: u } = l.video;
                r.id = c, r.timescale = o.timescale = d, r.codec = u;
            }
            if (l.audio) {
                const { id: c, timescale: d, codec: u } = l.audio;
                a.id = c, a.timescale = d, a.codec = u;
            }
            o.id = zr.text, r.sampleDuration = 0, r.duration = a.duration = i;
        }
        resetContiguity() {
            this.remainderData = null;
        }
        static probe(e) {
            return Yo(e);
        }
        demux(e, t) {
            this.timeOffset = t;
            let s = e;
            const i = this.videoTrack, r = this.txtTrack;
            if (this.config.progressive) {
                this.remainderData && (s = De(this.remainderData, e));
                const o = el(s);
                this.remainderData = o.remainder, i.samples = o.valid || new Uint8Array;
            } else i.samples = s;
            const a = this.extractID3Track(i, t);
            return r.samples = wn(t, i), {
                videoTrack: i,
                audioTrack: this.audioTrack,
                id3Track: a,
                textTrack: this.txtTrack
            };
        }
        flush() {
            const e = this.timeOffset, t = this.videoTrack, s = this.txtTrack;
            t.samples = this.remainderData || new Uint8Array, this.remainderData = null;
            const i = this.extractID3Track(t, this.timeOffset);
            return s.samples = wn(e, t), {
                videoTrack: t,
                audioTrack: $e(),
                id3Track: i,
                textTrack: $e()
            };
        }
        extractID3Track(e, t) {
            const s = this.id3Track;
            if (e.samples.length) {
                const i = W(e.samples, [
                    "emsg"
                ]);
                i && i.forEach((r)=>{
                    const a = il(r);
                    if (Ic.test(a.schemeIdUri)) {
                        const o = M(a.presentationTime) ? a.presentationTime / a.timeScale : t + a.presentationTimeDelta / a.timeScale;
                        let l = a.eventDuration === 4294967295 ? Number.POSITIVE_INFINITY : a.eventDuration / a.timeScale;
                        l <= .001 && (l = Number.POSITIVE_INFINITY);
                        const c = a.payload;
                        s.samples.push({
                            data: c,
                            len: c.byteLength,
                            dts: o,
                            pts: o,
                            type: Fe.emsg,
                            duration: l
                        });
                    }
                });
            }
            return s;
        }
        demuxSampleAes(e, t, s) {
            return Promise.reject(new Error("The MP4 demuxer does not support SAMPLE-AES decryption"));
        }
        destroy() {}
    }
    const La = (n, e)=>{
        let t = 0, s = 5;
        e += s;
        const i = new Uint32Array(1), r = new Uint32Array(1), a = new Uint8Array(1);
        for(; s > 0;){
            a[0] = n[e];
            const o = Math.min(s, 8), l = 8 - o;
            r[0] = 4278190080 >>> 24 + l << l, i[0] = (a[0] & r[0]) >> l, t = t ? t << o | i[0] : i[0], e += 1, s -= o;
        }
        return t;
    };
    class Cc extends dn {
        constructor(e){
            super(), this.observer = void 0, this.observer = e;
        }
        resetInitSegment(e, t, s, i) {
            super.resetInitSegment(e, t, s, i), this._audioTrack = {
                container: "audio/ac-3",
                type: "audio",
                id: 2,
                pid: -1,
                sequenceNumber: 0,
                segmentCodec: "ac3",
                samples: [],
                manifestCodec: t,
                duration: i,
                inputTimeScale: 9e4,
                dropped: 0
            };
        }
        canParse(e, t) {
            return t + 64 < e.length;
        }
        appendFrame(e, t, s) {
            const i = Aa(e, t, s, this.basePTS, this.frameIndex);
            if (i !== -1) return {
                sample: e.samples[e.samples.length - 1],
                length: i,
                missing: 0
            };
        }
        static probe(e) {
            if (!e) return !1;
            const t = jt(e, 0);
            if (!t) return !1;
            const s = t.length;
            return e[s] === 11 && e[s + 1] === 119 && nn(t) !== void 0 && La(e, s) < 16;
        }
    }
    function Aa(n, e, t, s, i) {
        if (t + 8 > e.length || e[t] !== 11 || e[t + 1] !== 119) return -1;
        const r = e[t + 4] >> 6;
        if (r >= 3) return -1;
        const o = [
            48e3,
            44100,
            32e3
        ][r], l = e[t + 4] & 63, d = [
            64,
            69,
            96,
            64,
            70,
            96,
            80,
            87,
            120,
            80,
            88,
            120,
            96,
            104,
            144,
            96,
            105,
            144,
            112,
            121,
            168,
            112,
            122,
            168,
            128,
            139,
            192,
            128,
            140,
            192,
            160,
            174,
            240,
            160,
            175,
            240,
            192,
            208,
            288,
            192,
            209,
            288,
            224,
            243,
            336,
            224,
            244,
            336,
            256,
            278,
            384,
            256,
            279,
            384,
            320,
            348,
            480,
            320,
            349,
            480,
            384,
            417,
            576,
            384,
            418,
            576,
            448,
            487,
            672,
            448,
            488,
            672,
            512,
            557,
            768,
            512,
            558,
            768,
            640,
            696,
            960,
            640,
            697,
            960,
            768,
            835,
            1152,
            768,
            836,
            1152,
            896,
            975,
            1344,
            896,
            976,
            1344,
            1024,
            1114,
            1536,
            1024,
            1115,
            1536,
            1152,
            1253,
            1728,
            1152,
            1254,
            1728,
            1280,
            1393,
            1920,
            1280,
            1394,
            1920
        ][l * 3 + r] * 2;
        if (t + d > e.length) return -1;
        const u = e[t + 6] >> 5;
        let h = 0;
        u === 2 ? h += 2 : (u & 1 && u !== 1 && (h += 2), u & 4 && (h += 2));
        const f = (e[t + 6] << 8 | e[t + 7]) >> 12 - h & 1, m = [
            2,
            1,
            2,
            3,
            3,
            4,
            4,
            5
        ][u] + f, y = e[t + 5] >> 3, E = e[t + 5] & 7, x = new Uint8Array([
            r << 6 | y << 1 | E >> 2,
            (E & 3) << 6 | u << 3 | f << 2 | l >> 4,
            l << 4 & 224
        ]), T = 1536 / o * 9e4, R = s + i * T, v = e.subarray(t, t + d);
        return n.config = x, n.channelCount = m, n.samplerate = o, n.samples.push({
            unit: v,
            pts: R
        }), d;
    }
    class wc {
        constructor(){
            this.VideoSample = null;
        }
        createVideoSample(e, t, s, i) {
            return {
                key: e,
                frame: !1,
                pts: t,
                dts: s,
                units: [],
                debug: i,
                length: 0
            };
        }
        getLastNalUnit(e) {
            var t;
            let s = this.VideoSample, i;
            if ((!s || s.units.length === 0) && (s = e[e.length - 1]), (t = s) != null && t.units) {
                const r = s.units;
                i = r[r.length - 1];
            }
            return i;
        }
        pushAccessUnit(e, t) {
            if (e.units.length && e.frame) {
                if (e.pts === void 0) {
                    const s = t.samples, i = s.length;
                    if (i) {
                        const r = s[i - 1];
                        e.pts = r.pts, e.dts = r.dts;
                    } else {
                        t.dropped++;
                        return;
                    }
                }
                t.samples.push(e);
            }
            e.debug.length && S.log(e.pts + "/" + e.dts + ":" + e.debug);
        }
    }
    class nr {
        constructor(e){
            this.data = void 0, this.bytesAvailable = void 0, this.word = void 0, this.bitsAvailable = void 0, this.data = e, this.bytesAvailable = e.byteLength, this.word = 0, this.bitsAvailable = 0;
        }
        loadWord() {
            const e = this.data, t = this.bytesAvailable, s = e.byteLength - t, i = new Uint8Array(4), r = Math.min(4, t);
            if (r === 0) throw new Error("no bytes available");
            i.set(e.subarray(s, s + r)), this.word = new DataView(i.buffer).getUint32(0), this.bitsAvailable = r * 8, this.bytesAvailable -= r;
        }
        skipBits(e) {
            let t;
            e = Math.min(e, this.bytesAvailable * 8 + this.bitsAvailable), this.bitsAvailable > e ? (this.word <<= e, this.bitsAvailable -= e) : (e -= this.bitsAvailable, t = e >> 3, e -= t << 3, this.bytesAvailable -= t, this.loadWord(), this.word <<= e, this.bitsAvailable -= e);
        }
        readBits(e) {
            let t = Math.min(this.bitsAvailable, e);
            const s = this.word >>> 32 - t;
            if (e > 32 && S.error("Cannot read more than 32 bits at a time"), this.bitsAvailable -= t, this.bitsAvailable > 0) this.word <<= t;
            else if (this.bytesAvailable > 0) this.loadWord();
            else throw new Error("no bits available");
            return t = e - t, t > 0 && this.bitsAvailable ? s << t | this.readBits(t) : s;
        }
        skipLZ() {
            let e;
            for(e = 0; e < this.bitsAvailable; ++e)if (this.word & 2147483648 >>> e) return this.word <<= e, this.bitsAvailable -= e, e;
            return this.loadWord(), e + this.skipLZ();
        }
        skipUEG() {
            this.skipBits(1 + this.skipLZ());
        }
        skipEG() {
            this.skipBits(1 + this.skipLZ());
        }
        readUEG() {
            const e = this.skipLZ();
            return this.readBits(e + 1) - 1;
        }
        readEG() {
            const e = this.readUEG();
            return 1 & e ? 1 + e >>> 1 : -1 * (e >>> 1);
        }
        readBoolean() {
            return this.readBits(1) === 1;
        }
        readUByte() {
            return this.readBits(8);
        }
        readUShort() {
            return this.readBits(16);
        }
        readUInt() {
            return this.readBits(32);
        }
        skipScalingList(e) {
            let t = 8, s = 8, i;
            for(let r = 0; r < e; r++)s !== 0 && (i = this.readEG(), s = (t + i + 256) % 256), t = s === 0 ? t : s;
        }
        readSPS() {
            let e = 0, t = 0, s = 0, i = 0, r, a, o;
            const l = this.readUByte.bind(this), c = this.readBits.bind(this), d = this.readUEG.bind(this), u = this.readBoolean.bind(this), h = this.skipBits.bind(this), f = this.skipEG.bind(this), g = this.skipUEG.bind(this), m = this.skipScalingList.bind(this);
            l();
            const y = l();
            if (c(5), h(3), l(), g(), y === 100 || y === 110 || y === 122 || y === 244 || y === 44 || y === 83 || y === 86 || y === 118 || y === 128) {
                const D = d();
                if (D === 3 && h(1), g(), g(), h(1), u()) for(a = D !== 3 ? 8 : 12, o = 0; o < a; o++)u() && (o < 6 ? m(16) : m(64));
            }
            g();
            const E = d();
            if (E === 0) d();
            else if (E === 1) for(h(1), f(), f(), r = d(), o = 0; o < r; o++)f();
            g(), h(1);
            const x = d(), T = d(), R = c(1);
            R === 0 && h(1), h(1), u() && (e = d(), t = d(), s = d(), i = d());
            let v = [
                1,
                1
            ];
            if (u() && u()) switch(l()){
                case 1:
                    v = [
                        1,
                        1
                    ];
                    break;
                case 2:
                    v = [
                        12,
                        11
                    ];
                    break;
                case 3:
                    v = [
                        10,
                        11
                    ];
                    break;
                case 4:
                    v = [
                        16,
                        11
                    ];
                    break;
                case 5:
                    v = [
                        40,
                        33
                    ];
                    break;
                case 6:
                    v = [
                        24,
                        11
                    ];
                    break;
                case 7:
                    v = [
                        20,
                        11
                    ];
                    break;
                case 8:
                    v = [
                        32,
                        11
                    ];
                    break;
                case 9:
                    v = [
                        80,
                        33
                    ];
                    break;
                case 10:
                    v = [
                        18,
                        11
                    ];
                    break;
                case 11:
                    v = [
                        15,
                        11
                    ];
                    break;
                case 12:
                    v = [
                        64,
                        33
                    ];
                    break;
                case 13:
                    v = [
                        160,
                        99
                    ];
                    break;
                case 14:
                    v = [
                        4,
                        3
                    ];
                    break;
                case 15:
                    v = [
                        3,
                        2
                    ];
                    break;
                case 16:
                    v = [
                        2,
                        1
                    ];
                    break;
                case 255:
                    {
                        v = [
                            l() << 8 | l(),
                            l() << 8 | l()
                        ];
                        break;
                    }
            }
            return {
                width: Math.ceil((x + 1) * 16 - e * 2 - t * 2),
                height: (2 - R) * (T + 1) * 16 - (R ? 2 : 4) * (s + i),
                pixelRatio: v
            };
        }
        readSliceType() {
            return this.readUByte(), this.readUEG(), this.readUEG();
        }
    }
    class _c extends wc {
        parseAVCPES(e, t, s, i, r) {
            const a = this.parseAVCNALu(e, s.data);
            let o = this.VideoSample, l, c = !1;
            s.data = null, o && a.length && !e.audFound && (this.pushAccessUnit(o, e), o = this.VideoSample = this.createVideoSample(!1, s.pts, s.dts, "")), a.forEach((d)=>{
                var u;
                switch(d.type){
                    case 1:
                        {
                            let m = !1;
                            l = !0;
                            const y = d.data;
                            if (c && y.length > 4) {
                                const E = new nr(y).readSliceType();
                                (E === 2 || E === 4 || E === 7 || E === 9) && (m = !0);
                            }
                            if (m) {
                                var h;
                                (h = o) != null && h.frame && !o.key && (this.pushAccessUnit(o, e), o = this.VideoSample = null);
                            }
                            o || (o = this.VideoSample = this.createVideoSample(!0, s.pts, s.dts, "")), o.frame = !0, o.key = m;
                            break;
                        }
                    case 5:
                        l = !0, (u = o) != null && u.frame && !o.key && (this.pushAccessUnit(o, e), o = this.VideoSample = null), o || (o = this.VideoSample = this.createVideoSample(!0, s.pts, s.dts, "")), o.key = !0, o.frame = !0;
                        break;
                    case 6:
                        {
                            l = !0, ea(d.data, 1, s.pts, t.samples);
                            break;
                        }
                    case 7:
                        {
                            var f, g;
                            l = !0, c = !0;
                            const m = d.data, E = new nr(m).readSPS();
                            if (!e.sps || e.width !== E.width || e.height !== E.height || ((f = e.pixelRatio) == null ? void 0 : f[0]) !== E.pixelRatio[0] || ((g = e.pixelRatio) == null ? void 0 : g[1]) !== E.pixelRatio[1]) {
                                e.width = E.width, e.height = E.height, e.pixelRatio = E.pixelRatio, e.sps = [
                                    m
                                ], e.duration = r;
                                const x = m.subarray(1, 4);
                                let T = "avc1.";
                                for(let R = 0; R < 3; R++){
                                    let v = x[R].toString(16);
                                    v.length < 2 && (v = "0" + v), T += v;
                                }
                                e.codec = T;
                            }
                            break;
                        }
                    case 8:
                        l = !0, e.pps = [
                            d.data
                        ];
                        break;
                    case 9:
                        l = !0, e.audFound = !0, o && this.pushAccessUnit(o, e), o = this.VideoSample = this.createVideoSample(!1, s.pts, s.dts, "");
                        break;
                    case 12:
                        l = !0;
                        break;
                    default:
                        l = !1, o && (o.debug += "unknown NAL " + d.type + " ");
                        break;
                }
                o && l && o.units.push(d);
            }), i && o && (this.pushAccessUnit(o, e), this.VideoSample = null);
        }
        parseAVCNALu(e, t) {
            const s = t.byteLength;
            let i = e.naluState || 0;
            const r = i, a = [];
            let o = 0, l, c, d, u = -1, h = 0;
            for(i === -1 && (u = 0, h = t[0] & 31, i = 0, o = 1); o < s;){
                if (l = t[o++], !i) {
                    i = l ? 0 : 1;
                    continue;
                }
                if (i === 1) {
                    i = l ? 0 : 2;
                    continue;
                }
                if (!l) i = 3;
                else if (l === 1) {
                    if (c = o - i - 1, u >= 0) {
                        const f = {
                            data: t.subarray(u, c),
                            type: h
                        };
                        a.push(f);
                    } else {
                        const f = this.getLastNalUnit(e.samples);
                        f && (r && o <= 4 - r && f.state && (f.data = f.data.subarray(0, f.data.byteLength - r)), c > 0 && (f.data = De(f.data, t.subarray(0, c)), f.state = 0));
                    }
                    o < s ? (d = t[o] & 31, u = o, h = d, i = 0) : i = -1;
                } else i = 0;
            }
            if (u >= 0 && i >= 0) {
                const f = {
                    data: t.subarray(u, s),
                    type: h,
                    state: i
                };
                a.push(f);
            }
            if (a.length === 0) {
                const f = this.getLastNalUnit(e.samples);
                f && (f.data = De(f.data, t));
            }
            return e.naluState = i, a;
        }
    }
    class kc {
        constructor(e, t, s){
            this.keyData = void 0, this.decrypter = void 0, this.keyData = s, this.decrypter = new ln(t, {
                removePKCS7Padding: !1
            });
        }
        decryptBuffer(e) {
            return this.decrypter.decrypt(e, this.keyData.key.buffer, this.keyData.iv.buffer);
        }
        decryptAacSample(e, t, s) {
            const i = e[t].unit;
            if (i.length <= 16) return;
            const r = i.subarray(16, i.length - i.length % 16), a = r.buffer.slice(r.byteOffset, r.byteOffset + r.length);
            this.decryptBuffer(a).then((o)=>{
                const l = new Uint8Array(o);
                i.set(l, 16), this.decrypter.isSync() || this.decryptAacSamples(e, t + 1, s);
            });
        }
        decryptAacSamples(e, t, s) {
            for(;; t++){
                if (t >= e.length) {
                    s();
                    return;
                }
                if (!(e[t].unit.length < 32) && (this.decryptAacSample(e, t, s), !this.decrypter.isSync())) return;
            }
        }
        getAvcEncryptedData(e) {
            const t = Math.floor((e.length - 48) / 160) * 16 + 16, s = new Int8Array(t);
            let i = 0;
            for(let r = 32; r < e.length - 16; r += 160, i += 16)s.set(e.subarray(r, r + 16), i);
            return s;
        }
        getAvcDecryptedUnit(e, t) {
            const s = new Uint8Array(t);
            let i = 0;
            for(let r = 32; r < e.length - 16; r += 160, i += 16)e.set(s.subarray(i, i + 16), r);
            return e;
        }
        decryptAvcSample(e, t, s, i, r) {
            const a = ta(r.data), o = this.getAvcEncryptedData(a);
            this.decryptBuffer(o.buffer).then((l)=>{
                r.data = this.getAvcDecryptedUnit(a, l), this.decrypter.isSync() || this.decryptAvcSamples(e, t, s + 1, i);
            });
        }
        decryptAvcSamples(e, t, s, i) {
            if (e instanceof Uint8Array) throw new Error("Cannot decrypt samples of type Uint8Array");
            for(;; t++, s = 0){
                if (t >= e.length) {
                    i();
                    return;
                }
                const r = e[t].units;
                for(; !(s >= r.length); s++){
                    const a = r[s];
                    if (!(a.data.length <= 48 || a.type !== 1 && a.type !== 5) && (this.decryptAvcSample(e, t, s, i, a), !this.decrypter.isSync())) return;
                }
            }
        }
    }
    const le = 188;
    class tt {
        constructor(e, t, s){
            this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.sampleAes = null, this.pmtParsed = !1, this.audioCodec = void 0, this.videoCodec = void 0, this._duration = 0, this._pmtId = -1, this._videoTrack = void 0, this._audioTrack = void 0, this._id3Track = void 0, this._txtTrack = void 0, this.aacOverFlow = null, this.remainderData = null, this.videoParser = void 0, this.observer = e, this.config = t, this.typeSupported = s, this.videoParser = new _c;
        }
        static probe(e) {
            const t = tt.syncOffset(e);
            return t > 0 && S.warn(`MPEG2-TS detected but first sync word found @ offset ${t}`), t !== -1;
        }
        static syncOffset(e) {
            const t = e.length;
            let s = Math.min(le * 5, t - le) + 1, i = 0;
            for(; i < s;){
                let r = !1, a = -1, o = 0;
                for(let l = i; l < t; l += le)if (e[l] === 71 && (t - l === le || e[l + le] === 71)) {
                    if (o++, a === -1 && (a = l, a !== 0 && (s = Math.min(a + le * 99, e.length - le) + 1)), r || (r = Bi(e, l) === 0), r && o > 1 && (a === 0 && o > 2 || l + le > s)) return a;
                } else {
                    if (o) return -1;
                    break;
                }
                i++;
            }
            return -1;
        }
        static createTrack(e, t) {
            return {
                container: e === "video" || e === "audio" ? "video/mp2t" : void 0,
                type: e,
                id: zr[e],
                pid: -1,
                inputTimeScale: 9e4,
                sequenceNumber: 0,
                samples: [],
                dropped: 0,
                duration: e === "audio" ? t : void 0
            };
        }
        resetInitSegment(e, t, s, i) {
            this.pmtParsed = !1, this._pmtId = -1, this._videoTrack = tt.createTrack("video"), this._audioTrack = tt.createTrack("audio", i), this._id3Track = tt.createTrack("id3"), this._txtTrack = tt.createTrack("text"), this._audioTrack.segmentCodec = "aac", this.aacOverFlow = null, this.remainderData = null, this.audioCodec = t, this.videoCodec = s, this._duration = i;
        }
        resetTimeStamp() {}
        resetContiguity() {
            const { _audioTrack: e, _videoTrack: t, _id3Track: s } = this;
            e && (e.pesData = null), t && (t.pesData = null), s && (s.pesData = null), this.aacOverFlow = null, this.remainderData = null;
        }
        demux(e, t, s = !1, i = !1) {
            s || (this.sampleAes = null);
            let r;
            const a = this._videoTrack, o = this._audioTrack, l = this._id3Track, c = this._txtTrack;
            let d = a.pid, u = a.pesData, h = o.pid, f = l.pid, g = o.pesData, m = l.pesData, y = null, E = this.pmtParsed, x = this._pmtId, T = e.length;
            if (this.remainderData && (e = De(this.remainderData, e), T = e.length, this.remainderData = null), T < le && !i) return this.remainderData = e, {
                audioTrack: o,
                videoTrack: a,
                id3Track: l,
                textTrack: c
            };
            const R = Math.max(0, tt.syncOffset(e));
            T -= (T - R) % le, T < e.byteLength && !i && (this.remainderData = new Uint8Array(e.buffer, T, e.buffer.byteLength - T));
            let v = 0;
            for(let b = R; b < T; b += le)if (e[b] === 71) {
                const w = !!(e[b + 1] & 64), P = Bi(e, b), I = (e[b + 3] & 48) >> 4;
                let _;
                if (I > 1) {
                    if (_ = b + 5 + e[b + 4], _ === b + le) continue;
                } else _ = b + 4;
                switch(P){
                    case d:
                        w && (u && (r = xt(u)) && this.videoParser.parseAVCPES(a, c, r, !1, this._duration), u = {
                            data: [],
                            size: 0
                        }), u && (u.data.push(e.subarray(_, b + le)), u.size += b + le - _);
                        break;
                    case h:
                        if (w) {
                            if (g && (r = xt(g))) switch(o.segmentCodec){
                                case "aac":
                                    this.parseAACPES(o, r);
                                    break;
                                case "mp3":
                                    this.parseMPEGPES(o, r);
                                    break;
                                case "ac3":
                                    this.parseAC3PES(o, r);
                                    break;
                            }
                            g = {
                                data: [],
                                size: 0
                            };
                        }
                        g && (g.data.push(e.subarray(_, b + le)), g.size += b + le - _);
                        break;
                    case f:
                        w && (m && (r = xt(m)) && this.parseID3PES(l, r), m = {
                            data: [],
                            size: 0
                        }), m && (m.data.push(e.subarray(_, b + le)), m.size += b + le - _);
                        break;
                    case 0:
                        w && (_ += e[_] + 1), x = this._pmtId = Pc(e, _);
                        break;
                    case x:
                        {
                            w && (_ += e[_] + 1);
                            const V = Fc(e, _, this.typeSupported, s, this.observer);
                            d = V.videoPid, d > 0 && (a.pid = d, a.segmentCodec = V.segmentVideoCodec), h = V.audioPid, h > 0 && (o.pid = h, o.segmentCodec = V.segmentAudioCodec), f = V.id3Pid, f > 0 && (l.pid = f), y !== null && !E && (S.warn(`MPEG-TS PMT found at ${b} after unknown PID '${y}'. Backtracking to sync byte @${R} to parse all TS packets.`), y = null, b = R - 188), E = this.pmtParsed = !0;
                            break;
                        }
                    case 17:
                    case 8191:
                        break;
                    default:
                        y = P;
                        break;
                }
            } else v++;
            v > 0 && Us(this.observer, new Error(`Found ${v} TS packet/s that do not start with 0x47`)), a.pesData = u, o.pesData = g, l.pesData = m;
            const D = {
                audioTrack: o,
                videoTrack: a,
                id3Track: l,
                textTrack: c
            };
            return i && this.extractRemainingSamples(D), D;
        }
        flush() {
            const { remainderData: e } = this;
            this.remainderData = null;
            let t;
            return e ? t = this.demux(e, -1, !1, !0) : t = {
                videoTrack: this._videoTrack,
                audioTrack: this._audioTrack,
                id3Track: this._id3Track,
                textTrack: this._txtTrack
            }, this.extractRemainingSamples(t), this.sampleAes ? this.decrypt(t, this.sampleAes) : t;
        }
        extractRemainingSamples(e) {
            const { audioTrack: t, videoTrack: s, id3Track: i, textTrack: r } = e, a = s.pesData, o = t.pesData, l = i.pesData;
            let c;
            if (a && (c = xt(a)) ? (this.videoParser.parseAVCPES(s, r, c, !0, this._duration), s.pesData = null) : s.pesData = a, o && (c = xt(o))) {
                switch(t.segmentCodec){
                    case "aac":
                        this.parseAACPES(t, c);
                        break;
                    case "mp3":
                        this.parseMPEGPES(t, c);
                        break;
                    case "ac3":
                        this.parseAC3PES(t, c);
                        break;
                }
                t.pesData = null;
            } else o != null && o.size && S.log("last AAC PES packet truncated,might overlap between fragments"), t.pesData = o;
            l && (c = xt(l)) ? (this.parseID3PES(i, c), i.pesData = null) : i.pesData = l;
        }
        demuxSampleAes(e, t, s) {
            const i = this.demux(e, s, !0, !this.config.progressive), r = this.sampleAes = new kc(this.observer, this.config, t);
            return this.decrypt(i, r);
        }
        decrypt(e, t) {
            return new Promise((s)=>{
                const { audioTrack: i, videoTrack: r } = e;
                i.samples && i.segmentCodec === "aac" ? t.decryptAacSamples(i.samples, 0, ()=>{
                    r.samples ? t.decryptAvcSamples(r.samples, 0, 0, ()=>{
                        s(e);
                    }) : s(e);
                }) : r.samples && t.decryptAvcSamples(r.samples, 0, 0, ()=>{
                    s(e);
                });
            });
        }
        destroy() {
            this._duration = 0;
        }
        parseAACPES(e, t) {
            let s = 0;
            const i = this.aacOverFlow;
            let r = t.data;
            if (i) {
                this.aacOverFlow = null;
                const u = i.missing, h = i.sample.unit.byteLength;
                if (u === -1) r = De(i.sample.unit, r);
                else {
                    const f = h - u;
                    i.sample.unit.set(r.subarray(0, u), f), e.samples.push(i.sample), s = i.missing;
                }
            }
            let a, o;
            for(a = s, o = r.length; a < o - 1 && !Ns(r, a); a++);
            if (a !== s) {
                let u;
                const h = a < o - 1;
                if (h ? u = `AAC PES did not start with ADTS header,offset:${a}` : u = "No ADTS header found in AAC PES", Us(this.observer, new Error(u), h), !h) return;
            }
            pa(e, this.observer, r, a, this.audioCodec);
            let l;
            if (t.pts !== void 0) l = t.pts;
            else if (i) {
                const u = ya(e.samplerate);
                l = i.sample.pts + u;
            } else {
                S.warn("[tsdemuxer]: AAC PES unknown PTS");
                return;
            }
            let c = 0, d;
            for(; a < o;)if (d = Ea(e, r, a, l, c), a += d.length, d.missing) {
                this.aacOverFlow = d;
                break;
            } else for(c++; a < o - 1 && !Ns(r, a); a++);
        }
        parseMPEGPES(e, t) {
            const s = t.data, i = s.length;
            let r = 0, a = 0;
            const o = t.pts;
            if (o === void 0) {
                S.warn("[tsdemuxer]: MPEG PES unknown PTS");
                return;
            }
            for(; a < i;)if (va(s, a)) {
                const l = Ta(e, s, a, o, r);
                if (l) a += l.length, r++;
                else break;
            } else a++;
        }
        parseAC3PES(e, t) {
            {
                const s = t.data, i = t.pts;
                if (i === void 0) {
                    S.warn("[tsdemuxer]: AC3 PES unknown PTS");
                    return;
                }
                const r = s.length;
                let a = 0, o = 0, l;
                for(; o < r && (l = Aa(e, s, o, i, a++)) > 0;)o += l;
            }
        }
        parseID3PES(e, t) {
            if (t.pts === void 0) {
                S.warn("[tsdemuxer]: ID3 PES unknown PTS");
                return;
            }
            const s = re({}, t, {
                type: this._videoTrack ? Fe.emsg : Fe.audioId3,
                duration: Number.POSITIVE_INFINITY
            });
            e.samples.push(s);
        }
    }
    function Bi(n, e) {
        return ((n[e + 1] & 31) << 8) + n[e + 2];
    }
    function Pc(n, e) {
        return (n[e + 10] & 31) << 8 | n[e + 11];
    }
    function Fc(n, e, t, s, i) {
        const r = {
            audioPid: -1,
            videoPid: -1,
            id3Pid: -1,
            segmentVideoCodec: "avc",
            segmentAudioCodec: "aac"
        }, a = (n[e + 1] & 15) << 8 | n[e + 2], o = e + 3 + a - 4, l = (n[e + 10] & 15) << 8 | n[e + 11];
        for(e += 12 + l; e < o;){
            const c = Bi(n, e), d = (n[e + 3] & 15) << 8 | n[e + 4];
            switch(n[e]){
                case 207:
                    if (!s) {
                        di("ADTS AAC");
                        break;
                    }
                case 15:
                    r.audioPid === -1 && (r.audioPid = c);
                    break;
                case 21:
                    r.id3Pid === -1 && (r.id3Pid = c);
                    break;
                case 219:
                    if (!s) {
                        di("H.264");
                        break;
                    }
                case 27:
                    r.videoPid === -1 && (r.videoPid = c, r.segmentVideoCodec = "avc");
                    break;
                case 3:
                case 4:
                    !t.mpeg && !t.mp3 ? S.log("MPEG audio found, not supported in this browser") : r.audioPid === -1 && (r.audioPid = c, r.segmentAudioCodec = "mp3");
                    break;
                case 193:
                    if (!s) {
                        di("AC-3");
                        break;
                    }
                case 129:
                    t.ac3 ? r.audioPid === -1 && (r.audioPid = c, r.segmentAudioCodec = "ac3") : S.log("AC-3 audio found, not supported in this browser");
                    break;
                case 6:
                    if (r.audioPid === -1 && d > 0) {
                        let u = e + 5, h = d;
                        for(; h > 2;){
                            switch(n[u]){
                                case 106:
                                    t.ac3 !== !0 ? S.log("AC-3 audio found, not supported in this browser for now") : (r.audioPid = c, r.segmentAudioCodec = "ac3");
                                    break;
                            }
                            const g = n[u + 1] + 2;
                            u += g, h -= g;
                        }
                    }
                    break;
                case 194:
                case 135:
                    return Us(i, new Error("Unsupported EC-3 in M2TS found")), r;
                case 36:
                    return Us(i, new Error("Unsupported HEVC in M2TS found")), r;
            }
            e += d + 5;
        }
        return r;
    }
    function Us(n, e, t) {
        S.warn(`parsing error: ${e.message}`), n.emit(p.ERROR, p.ERROR, {
            type: G.MEDIA_ERROR,
            details: A.FRAG_PARSING_ERROR,
            fatal: !1,
            levelRetry: t,
            error: e,
            reason: e.message
        });
    }
    function di(n) {
        S.log(`${n} with AES-128-CBC encryption found in unencrypted stream`);
    }
    function xt(n) {
        let e = 0, t, s, i, r, a;
        const o = n.data;
        if (!n || n.size === 0) return null;
        for(; o[0].length < 19 && o.length > 1;)o[0] = De(o[0], o[1]), o.splice(1, 1);
        if (t = o[0], (t[0] << 16) + (t[1] << 8) + t[2] === 1) {
            if (s = (t[4] << 8) + t[5], s && s > n.size - 6) return null;
            const c = t[7];
            c & 192 && (r = (t[9] & 14) * 536870912 + (t[10] & 255) * 4194304 + (t[11] & 254) * 16384 + (t[12] & 255) * 128 + (t[13] & 254) / 2, c & 64 ? (a = (t[14] & 14) * 536870912 + (t[15] & 255) * 4194304 + (t[16] & 254) * 16384 + (t[17] & 255) * 128 + (t[18] & 254) / 2, r - a > 60 * 9e4 && (S.warn(`${Math.round((r - a) / 9e4)}s delta between PTS and DTS, align them`), r = a)) : a = r), i = t[8];
            let d = i + 9;
            if (n.size <= d) return null;
            n.size -= d;
            const u = new Uint8Array(n.size);
            for(let h = 0, f = o.length; h < f; h++){
                t = o[h];
                let g = t.byteLength;
                if (d) if (d > g) {
                    d -= g;
                    continue;
                } else t = t.subarray(d), g -= d, d = 0;
                u.set(t, e), e += g;
            }
            return s && (s -= i + 3), {
                data: u,
                pts: r,
                dts: a,
                len: s
            };
        }
        return null;
    }
    class Oc extends dn {
        resetInitSegment(e, t, s, i) {
            super.resetInitSegment(e, t, s, i), this._audioTrack = {
                container: "audio/mpeg",
                type: "audio",
                id: 2,
                pid: -1,
                sequenceNumber: 0,
                segmentCodec: "mp3",
                samples: [],
                manifestCodec: t,
                duration: i,
                inputTimeScale: 9e4,
                dropped: 0
            };
        }
        static probe(e) {
            if (!e) return !1;
            const t = jt(e, 0);
            let s = t?.length || 0;
            if (t && e[s] === 11 && e[s + 1] === 119 && nn(t) !== void 0 && La(e, s) <= 16) return !1;
            for(let i = e.length; s < i; s++)if (Sa(e, s)) return S.log("MPEG Audio sync word found !"), !0;
            return !1;
        }
        canParse(e, t) {
            return bc(e, t);
        }
        appendFrame(e, t, s) {
            if (this.basePTS !== null) return Ta(e, t, s, this.basePTS, this.frameIndex);
        }
    }
    class rr {
        static getSilentFrame(e, t) {
            switch(e){
                case "mp4a.40.2":
                    if (t === 1) return new Uint8Array([
                        0,
                        200,
                        0,
                        128,
                        35,
                        128
                    ]);
                    if (t === 2) return new Uint8Array([
                        33,
                        0,
                        73,
                        144,
                        2,
                        25,
                        0,
                        35,
                        128
                    ]);
                    if (t === 3) return new Uint8Array([
                        0,
                        200,
                        0,
                        128,
                        32,
                        132,
                        1,
                        38,
                        64,
                        8,
                        100,
                        0,
                        142
                    ]);
                    if (t === 4) return new Uint8Array([
                        0,
                        200,
                        0,
                        128,
                        32,
                        132,
                        1,
                        38,
                        64,
                        8,
                        100,
                        0,
                        128,
                        44,
                        128,
                        8,
                        2,
                        56
                    ]);
                    if (t === 5) return new Uint8Array([
                        0,
                        200,
                        0,
                        128,
                        32,
                        132,
                        1,
                        38,
                        64,
                        8,
                        100,
                        0,
                        130,
                        48,
                        4,
                        153,
                        0,
                        33,
                        144,
                        2,
                        56
                    ]);
                    if (t === 6) return new Uint8Array([
                        0,
                        200,
                        0,
                        128,
                        32,
                        132,
                        1,
                        38,
                        64,
                        8,
                        100,
                        0,
                        130,
                        48,
                        4,
                        153,
                        0,
                        33,
                        144,
                        2,
                        0,
                        178,
                        0,
                        32,
                        8,
                        224
                    ]);
                    break;
                default:
                    if (t === 1) return new Uint8Array([
                        1,
                        64,
                        34,
                        128,
                        163,
                        78,
                        230,
                        128,
                        186,
                        8,
                        0,
                        0,
                        0,
                        28,
                        6,
                        241,
                        193,
                        10,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        94
                    ]);
                    if (t === 2) return new Uint8Array([
                        1,
                        64,
                        34,
                        128,
                        163,
                        94,
                        230,
                        128,
                        186,
                        8,
                        0,
                        0,
                        0,
                        0,
                        149,
                        0,
                        6,
                        241,
                        161,
                        10,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        94
                    ]);
                    if (t === 3) return new Uint8Array([
                        1,
                        64,
                        34,
                        128,
                        163,
                        94,
                        230,
                        128,
                        186,
                        8,
                        0,
                        0,
                        0,
                        0,
                        149,
                        0,
                        6,
                        241,
                        161,
                        10,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        90,
                        94
                    ]);
                    break;
            }
        }
    }
    const et = Math.pow(2, 32) - 1;
    class L {
        static init() {
            L.types = {
                avc1: [],
                avcC: [],
                btrt: [],
                dinf: [],
                dref: [],
                esds: [],
                ftyp: [],
                hdlr: [],
                mdat: [],
                mdhd: [],
                mdia: [],
                mfhd: [],
                minf: [],
                moof: [],
                moov: [],
                mp4a: [],
                ".mp3": [],
                dac3: [],
                "ac-3": [],
                mvex: [],
                mvhd: [],
                pasp: [],
                sdtp: [],
                stbl: [],
                stco: [],
                stsc: [],
                stsd: [],
                stsz: [],
                stts: [],
                tfdt: [],
                tfhd: [],
                traf: [],
                trak: [],
                trun: [],
                trex: [],
                tkhd: [],
                vmhd: [],
                smhd: []
            };
            let e;
            for(e in L.types)L.types.hasOwnProperty(e) && (L.types[e] = [
                e.charCodeAt(0),
                e.charCodeAt(1),
                e.charCodeAt(2),
                e.charCodeAt(3)
            ]);
            const t = new Uint8Array([
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                118,
                105,
                100,
                101,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                86,
                105,
                100,
                101,
                111,
                72,
                97,
                110,
                100,
                108,
                101,
                114,
                0
            ]), s = new Uint8Array([
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                115,
                111,
                117,
                110,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                83,
                111,
                117,
                110,
                100,
                72,
                97,
                110,
                100,
                108,
                101,
                114,
                0
            ]);
            L.HDLR_TYPES = {
                video: t,
                audio: s
            };
            const i = new Uint8Array([
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                12,
                117,
                114,
                108,
                32,
                0,
                0,
                0,
                1
            ]), r = new Uint8Array([
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]);
            L.STTS = L.STSC = L.STCO = r, L.STSZ = new Uint8Array([
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]), L.VMHD = new Uint8Array([
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]), L.SMHD = new Uint8Array([
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]), L.STSD = new Uint8Array([
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1
            ]);
            const a = new Uint8Array([
                105,
                115,
                111,
                109
            ]), o = new Uint8Array([
                97,
                118,
                99,
                49
            ]), l = new Uint8Array([
                0,
                0,
                0,
                1
            ]);
            L.FTYP = L.box(L.types.ftyp, a, l, a, o), L.DINF = L.box(L.types.dinf, L.box(L.types.dref, i));
        }
        static box(e, ...t) {
            let s = 8, i = t.length;
            const r = i;
            for(; i--;)s += t[i].byteLength;
            const a = new Uint8Array(s);
            for(a[0] = s >> 24 & 255, a[1] = s >> 16 & 255, a[2] = s >> 8 & 255, a[3] = s & 255, a.set(e, 4), i = 0, s = 8; i < r; i++)a.set(t[i], s), s += t[i].byteLength;
            return a;
        }
        static hdlr(e) {
            return L.box(L.types.hdlr, L.HDLR_TYPES[e]);
        }
        static mdat(e) {
            return L.box(L.types.mdat, e);
        }
        static mdhd(e, t) {
            t *= e;
            const s = Math.floor(t / (et + 1)), i = Math.floor(t % (et + 1));
            return L.box(L.types.mdhd, new Uint8Array([
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                3,
                e >> 24 & 255,
                e >> 16 & 255,
                e >> 8 & 255,
                e & 255,
                s >> 24,
                s >> 16 & 255,
                s >> 8 & 255,
                s & 255,
                i >> 24,
                i >> 16 & 255,
                i >> 8 & 255,
                i & 255,
                85,
                196,
                0,
                0
            ]));
        }
        static mdia(e) {
            return L.box(L.types.mdia, L.mdhd(e.timescale, e.duration), L.hdlr(e.type), L.minf(e));
        }
        static mfhd(e) {
            return L.box(L.types.mfhd, new Uint8Array([
                0,
                0,
                0,
                0,
                e >> 24,
                e >> 16 & 255,
                e >> 8 & 255,
                e & 255
            ]));
        }
        static minf(e) {
            return e.type === "audio" ? L.box(L.types.minf, L.box(L.types.smhd, L.SMHD), L.DINF, L.stbl(e)) : L.box(L.types.minf, L.box(L.types.vmhd, L.VMHD), L.DINF, L.stbl(e));
        }
        static moof(e, t, s) {
            return L.box(L.types.moof, L.mfhd(e), L.traf(s, t));
        }
        static moov(e) {
            let t = e.length;
            const s = [];
            for(; t--;)s[t] = L.trak(e[t]);
            return L.box.apply(null, [
                L.types.moov,
                L.mvhd(e[0].timescale, e[0].duration)
            ].concat(s).concat(L.mvex(e)));
        }
        static mvex(e) {
            let t = e.length;
            const s = [];
            for(; t--;)s[t] = L.trex(e[t]);
            return L.box.apply(null, [
                L.types.mvex,
                ...s
            ]);
        }
        static mvhd(e, t) {
            t *= e;
            const s = Math.floor(t / (et + 1)), i = Math.floor(t % (et + 1)), r = new Uint8Array([
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                3,
                e >> 24 & 255,
                e >> 16 & 255,
                e >> 8 & 255,
                e & 255,
                s >> 24,
                s >> 16 & 255,
                s >> 8 & 255,
                s & 255,
                i >> 24,
                i >> 16 & 255,
                i >> 8 & 255,
                i & 255,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                64,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                255,
                255,
                255,
                255
            ]);
            return L.box(L.types.mvhd, r);
        }
        static sdtp(e) {
            const t = e.samples || [], s = new Uint8Array(4 + t.length);
            let i, r;
            for(i = 0; i < t.length; i++)r = t[i].flags, s[i + 4] = r.dependsOn << 4 | r.isDependedOn << 2 | r.hasRedundancy;
            return L.box(L.types.sdtp, s);
        }
        static stbl(e) {
            return L.box(L.types.stbl, L.stsd(e), L.box(L.types.stts, L.STTS), L.box(L.types.stsc, L.STSC), L.box(L.types.stsz, L.STSZ), L.box(L.types.stco, L.STCO));
        }
        static avc1(e) {
            let t = [], s = [], i, r, a;
            for(i = 0; i < e.sps.length; i++)r = e.sps[i], a = r.byteLength, t.push(a >>> 8 & 255), t.push(a & 255), t = t.concat(Array.prototype.slice.call(r));
            for(i = 0; i < e.pps.length; i++)r = e.pps[i], a = r.byteLength, s.push(a >>> 8 & 255), s.push(a & 255), s = s.concat(Array.prototype.slice.call(r));
            const o = L.box(L.types.avcC, new Uint8Array([
                1,
                t[3],
                t[4],
                t[5],
                255,
                224 | e.sps.length
            ].concat(t).concat([
                e.pps.length
            ]).concat(s))), l = e.width, c = e.height, d = e.pixelRatio[0], u = e.pixelRatio[1];
            return L.box(L.types.avc1, new Uint8Array([
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                l >> 8 & 255,
                l & 255,
                c >> 8 & 255,
                c & 255,
                0,
                72,
                0,
                0,
                0,
                72,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                18,
                100,
                97,
                105,
                108,
                121,
                109,
                111,
                116,
                105,
                111,
                110,
                47,
                104,
                108,
                115,
                46,
                106,
                115,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                24,
                17,
                17
            ]), o, L.box(L.types.btrt, new Uint8Array([
                0,
                28,
                156,
                128,
                0,
                45,
                198,
                192,
                0,
                45,
                198,
                192
            ])), L.box(L.types.pasp, new Uint8Array([
                d >> 24,
                d >> 16 & 255,
                d >> 8 & 255,
                d & 255,
                u >> 24,
                u >> 16 & 255,
                u >> 8 & 255,
                u & 255
            ])));
        }
        static esds(e) {
            const t = e.config.length;
            return new Uint8Array([
                0,
                0,
                0,
                0,
                3,
                23 + t,
                0,
                1,
                0,
                4,
                15 + t,
                64,
                21,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                5
            ].concat([
                t
            ]).concat(e.config).concat([
                6,
                1,
                2
            ]));
        }
        static audioStsd(e) {
            const t = e.samplerate;
            return new Uint8Array([
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                e.channelCount,
                0,
                16,
                0,
                0,
                0,
                0,
                t >> 8 & 255,
                t & 255,
                0,
                0
            ]);
        }
        static mp4a(e) {
            return L.box(L.types.mp4a, L.audioStsd(e), L.box(L.types.esds, L.esds(e)));
        }
        static mp3(e) {
            return L.box(L.types[".mp3"], L.audioStsd(e));
        }
        static ac3(e) {
            return L.box(L.types["ac-3"], L.audioStsd(e), L.box(L.types.dac3, e.config));
        }
        static stsd(e) {
            return e.type === "audio" ? e.segmentCodec === "mp3" && e.codec === "mp3" ? L.box(L.types.stsd, L.STSD, L.mp3(e)) : e.segmentCodec === "ac3" ? L.box(L.types.stsd, L.STSD, L.ac3(e)) : L.box(L.types.stsd, L.STSD, L.mp4a(e)) : L.box(L.types.stsd, L.STSD, L.avc1(e));
        }
        static tkhd(e) {
            const t = e.id, s = e.duration * e.timescale, i = e.width, r = e.height, a = Math.floor(s / (et + 1)), o = Math.floor(s % (et + 1));
            return L.box(L.types.tkhd, new Uint8Array([
                1,
                0,
                0,
                7,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                3,
                t >> 24 & 255,
                t >> 16 & 255,
                t >> 8 & 255,
                t & 255,
                0,
                0,
                0,
                0,
                a >> 24,
                a >> 16 & 255,
                a >> 8 & 255,
                a & 255,
                o >> 24,
                o >> 16 & 255,
                o >> 8 & 255,
                o & 255,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                64,
                0,
                0,
                0,
                i >> 8 & 255,
                i & 255,
                0,
                0,
                r >> 8 & 255,
                r & 255,
                0,
                0
            ]));
        }
        static traf(e, t) {
            const s = L.sdtp(e), i = e.id, r = Math.floor(t / (et + 1)), a = Math.floor(t % (et + 1));
            return L.box(L.types.traf, L.box(L.types.tfhd, new Uint8Array([
                0,
                0,
                0,
                0,
                i >> 24,
                i >> 16 & 255,
                i >> 8 & 255,
                i & 255
            ])), L.box(L.types.tfdt, new Uint8Array([
                1,
                0,
                0,
                0,
                r >> 24,
                r >> 16 & 255,
                r >> 8 & 255,
                r & 255,
                a >> 24,
                a >> 16 & 255,
                a >> 8 & 255,
                a & 255
            ])), L.trun(e, s.length + 16 + 20 + 8 + 16 + 8 + 8), s);
        }
        static trak(e) {
            return e.duration = e.duration || 4294967295, L.box(L.types.trak, L.tkhd(e), L.mdia(e));
        }
        static trex(e) {
            const t = e.id;
            return L.box(L.types.trex, new Uint8Array([
                0,
                0,
                0,
                0,
                t >> 24,
                t >> 16 & 255,
                t >> 8 & 255,
                t & 255,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                1
            ]));
        }
        static trun(e, t) {
            const s = e.samples || [], i = s.length, r = 12 + 16 * i, a = new Uint8Array(r);
            let o, l, c, d, u, h;
            for(t += 8 + r, a.set([
                e.type === "video" ? 1 : 0,
                0,
                15,
                1,
                i >>> 24 & 255,
                i >>> 16 & 255,
                i >>> 8 & 255,
                i & 255,
                t >>> 24 & 255,
                t >>> 16 & 255,
                t >>> 8 & 255,
                t & 255
            ], 0), o = 0; o < i; o++)l = s[o], c = l.duration, d = l.size, u = l.flags, h = l.cts, a.set([
                c >>> 24 & 255,
                c >>> 16 & 255,
                c >>> 8 & 255,
                c & 255,
                d >>> 24 & 255,
                d >>> 16 & 255,
                d >>> 8 & 255,
                d & 255,
                u.isLeading << 2 | u.dependsOn,
                u.isDependedOn << 6 | u.hasRedundancy << 4 | u.paddingValue << 1 | u.isNonSync,
                u.degradPrio & 61440,
                u.degradPrio & 15,
                h >>> 24 & 255,
                h >>> 16 & 255,
                h >>> 8 & 255,
                h & 255
            ], 12 + 16 * o);
            return L.box(L.types.trun, a);
        }
        static initSegment(e) {
            L.types || L.init();
            const t = L.moov(e);
            return De(L.FTYP, t);
        }
    }
    L.types = void 0;
    L.HDLR_TYPES = void 0;
    L.STTS = void 0;
    L.STSC = void 0;
    L.STCO = void 0;
    L.STSZ = void 0;
    L.VMHD = void 0;
    L.SMHD = void 0;
    L.STSD = void 0;
    L.FTYP = void 0;
    L.DINF = void 0;
    const ba = 9e4;
    function fn(n, e, t = 1, s = !1) {
        const i = n * e * t;
        return s ? Math.round(i) : i;
    }
    function Mc(n, e, t = 1, s = !1) {
        return fn(n, e, 1 / t, s);
    }
    function Mt(n, e = !1) {
        return fn(n, 1e3, 1 / ba, e);
    }
    function Nc(n, e = 1) {
        return fn(n, ba, 1 / e);
    }
    const Uc = 10 * 1e3, ar = 1024, Bc = 1152, $c = 1536;
    let vt = null, ui = null;
    class ys {
        constructor(e, t, s, i = ""){
            if (this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.ISGenerated = !1, this._initPTS = null, this._initDTS = null, this.nextAvcDts = null, this.nextAudioPts = null, this.videoSampleDuration = null, this.isAudioContiguous = !1, this.isVideoContiguous = !1, this.videoTrackConfig = void 0, this.observer = e, this.config = t, this.typeSupported = s, this.ISGenerated = !1, vt === null) {
                const a = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
                vt = a ? parseInt(a[1]) : 0;
            }
            if (ui === null) {
                const r = navigator.userAgent.match(/Safari\/(\d+)/i);
                ui = r ? parseInt(r[1]) : 0;
            }
        }
        destroy() {
            this.config = this.videoTrackConfig = this._initPTS = this._initDTS = null;
        }
        resetTimeStamp(e) {
            S.log("[mp4-remuxer]: initPTS & initDTS reset"), this._initPTS = this._initDTS = e;
        }
        resetNextTimestamp() {
            S.log("[mp4-remuxer]: reset next timestamp"), this.isVideoContiguous = !1, this.isAudioContiguous = !1;
        }
        resetInitSegment() {
            S.log("[mp4-remuxer]: ISGenerated flag reset"), this.ISGenerated = !1, this.videoTrackConfig = void 0;
        }
        getVideoStartPts(e) {
            let t = !1;
            const s = e.reduce((i, r)=>{
                const a = r.pts - i;
                return a < -4294967296 ? (t = !0, Ae(i, r.pts)) : a > 0 ? i : r.pts;
            }, e[0].pts);
            return t && S.debug("PTS rollover detected"), s;
        }
        remux(e, t, s, i, r, a, o, l) {
            let c, d, u, h, f, g, m = r, y = r;
            const E = e.pid > -1, x = t.pid > -1, T = t.samples.length, R = e.samples.length > 0, v = o && T > 0 || T > 1;
            if ((!E || R) && (!x || v) || this.ISGenerated || o) {
                if (this.ISGenerated) {
                    var b, w, P, I;
                    const H = this.videoTrackConfig;
                    H && (t.width !== H.width || t.height !== H.height || ((b = t.pixelRatio) == null ? void 0 : b[0]) !== ((w = H.pixelRatio) == null ? void 0 : w[0]) || ((P = t.pixelRatio) == null ? void 0 : P[1]) !== ((I = H.pixelRatio) == null ? void 0 : I[1])) && this.resetInitSegment();
                } else u = this.generateIS(e, t, r, a);
                const _ = this.isVideoContiguous;
                let V = -1, F;
                if (v && (V = Gc(t.samples), !_ && this.config.forceKeyFrameOnDiscontinuity)) if (g = !0, V > 0) {
                    S.warn(`[mp4-remuxer]: Dropped ${V} out of ${T} video samples due to a missing keyframe`);
                    const H = this.getVideoStartPts(t.samples);
                    t.samples = t.samples.slice(V), t.dropped += V, y += (t.samples[0].pts - H) / t.inputTimeScale, F = y;
                } else V === -1 && (S.warn(`[mp4-remuxer]: No keyframe found out of ${T} video samples`), g = !1);
                if (this.ISGenerated) {
                    if (R && v) {
                        const H = this.getVideoStartPts(t.samples), $ = (Ae(e.samples[0].pts, H) - H) / t.inputTimeScale;
                        m += Math.max(0, $), y += Math.max(0, -$);
                    }
                    if (R) {
                        if (e.samplerate || (S.warn("[mp4-remuxer]: regenerate InitSegment as audio detected"), u = this.generateIS(e, t, r, a)), d = this.remuxAudio(e, m, this.isAudioContiguous, a, x || v || l === B.AUDIO ? y : void 0), v) {
                            const H = d ? d.endPTS - d.startPTS : 0;
                            t.inputTimeScale || (S.warn("[mp4-remuxer]: regenerate InitSegment as video detected"), u = this.generateIS(e, t, r, a)), c = this.remuxVideo(t, y, _, H);
                        }
                    } else v && (c = this.remuxVideo(t, y, _, 0));
                    c && (c.firstKeyFrame = V, c.independent = V !== -1, c.firstKeyFramePTS = F);
                }
            }
            return this.ISGenerated && this._initPTS && this._initDTS && (s.samples.length && (f = Ra(s, r, this._initPTS, this._initDTS)), i.samples.length && (h = Ia(i, r, this._initPTS))), {
                audio: d,
                video: c,
                initSegment: u,
                independent: g,
                text: h,
                id3: f
            };
        }
        generateIS(e, t, s, i) {
            const r = e.samples, a = t.samples, o = this.typeSupported, l = {}, c = this._initPTS;
            let d = !c || i, u = "audio/mp4", h, f, g;
            if (d && (h = f = 1 / 0), e.config && r.length) {
                switch(e.timescale = e.samplerate, e.segmentCodec){
                    case "mp3":
                        o.mpeg ? (u = "audio/mpeg", e.codec = "") : o.mp3 && (e.codec = "mp3");
                        break;
                    case "ac3":
                        e.codec = "ac-3";
                        break;
                }
                l.audio = {
                    id: "audio",
                    container: u,
                    codec: e.codec,
                    initSegment: e.segmentCodec === "mp3" && o.mpeg ? new Uint8Array(0) : L.initSegment([
                        e
                    ]),
                    metadata: {
                        channelCount: e.channelCount
                    }
                }, d && (g = e.inputTimeScale, !c || g !== c.timescale ? h = f = r[0].pts - Math.round(g * s) : d = !1);
            }
            if (t.sps && t.pps && a.length) {
                if (t.timescale = t.inputTimeScale, l.video = {
                    id: "main",
                    container: "video/mp4",
                    codec: t.codec,
                    initSegment: L.initSegment([
                        t
                    ]),
                    metadata: {
                        width: t.width,
                        height: t.height
                    }
                }, d) if (g = t.inputTimeScale, !c || g !== c.timescale) {
                    const m = this.getVideoStartPts(a), y = Math.round(g * s);
                    f = Math.min(f, Ae(a[0].dts, m) - y), h = Math.min(h, m - y);
                } else d = !1;
                this.videoTrackConfig = {
                    width: t.width,
                    height: t.height,
                    pixelRatio: t.pixelRatio
                };
            }
            if (Object.keys(l).length) return this.ISGenerated = !0, d ? (this._initPTS = {
                baseTime: h,
                timescale: g
            }, this._initDTS = {
                baseTime: f,
                timescale: g
            }) : h = g = void 0, {
                tracks: l,
                initPTS: h,
                timescale: g
            };
        }
        remuxVideo(e, t, s, i) {
            const r = e.inputTimeScale, a = e.samples, o = [], l = a.length, c = this._initPTS;
            let d = this.nextAvcDts, u = 8, h = this.videoSampleDuration, f, g, m = Number.POSITIVE_INFINITY, y = Number.NEGATIVE_INFINITY, E = !1;
            if (!s || d === null) {
                const N = t * r, O = a[0].pts - Ae(a[0].dts, a[0].pts);
                vt && d !== null && Math.abs(N - O - d) < 15e3 ? s = !0 : d = N - O;
            }
            const x = c.baseTime * r / c.timescale;
            for(let N = 0; N < l; N++){
                const O = a[N];
                O.pts = Ae(O.pts - x, d), O.dts = Ae(O.dts - x, d), O.dts < a[N > 0 ? N - 1 : N].dts && (E = !0);
            }
            E && a.sort(function(N, O) {
                const z = N.dts - O.dts, Y = N.pts - O.pts;
                return z || Y;
            }), f = a[0].dts, g = a[a.length - 1].dts;
            const T = g - f, R = T ? Math.round(T / (l - 1)) : h || e.inputTimeScale / 30;
            if (s) {
                const N = f - d, O = N > R, z = N < -1;
                if ((O || z) && (O ? S.warn(`AVC: ${Mt(N, !0)} ms (${N}dts) hole between fragments detected at ${t.toFixed(3)}`) : S.warn(`AVC: ${Mt(-N, !0)} ms (${N}dts) overlapping between fragments detected at ${t.toFixed(3)}`), !z || d >= a[0].pts || vt)) {
                    f = d;
                    const Y = a[0].pts - N;
                    if (O) a[0].dts = f, a[0].pts = Y;
                    else for(let X = 0; X < a.length && !(a[X].dts > Y); X++)a[X].dts -= N, a[X].pts -= N;
                    S.log(`Video: Initial PTS/DTS adjusted: ${Mt(Y, !0)}/${Mt(f, !0)}, delta: ${Mt(N, !0)} ms`);
                }
            }
            f = Math.max(0, f);
            let v = 0, D = 0, b = f;
            for(let N = 0; N < l; N++){
                const O = a[N], z = O.units, Y = z.length;
                let X = 0;
                for(let ie = 0; ie < Y; ie++)X += z[ie].data.length;
                D += X, v += Y, O.length = X, O.dts < b ? (O.dts = b, b += R / 4 | 0 || 1) : b = O.dts, m = Math.min(O.pts, m), y = Math.max(O.pts, y);
            }
            g = a[l - 1].dts;
            const w = D + 4 * v + 8;
            let P;
            try {
                P = new Uint8Array(w);
            } catch (N) {
                this.observer.emit(p.ERROR, p.ERROR, {
                    type: G.MUX_ERROR,
                    details: A.REMUX_ALLOC_ERROR,
                    fatal: !1,
                    error: N,
                    bytes: w,
                    reason: `fail allocating video mdat ${w}`
                });
                return;
            }
            const I = new DataView(P.buffer);
            I.setUint32(0, w), P.set(L.types.mdat, 4);
            let _ = !1, V = Number.POSITIVE_INFINITY, F = Number.POSITIVE_INFINITY, H = Number.NEGATIVE_INFINITY, K = Number.NEGATIVE_INFINITY;
            for(let N = 0; N < l; N++){
                const O = a[N], z = O.units;
                let Y = 0;
                for(let oe = 0, he = z.length; oe < he; oe++){
                    const Se = z[oe], Ot = Se.data, Zs = Se.data.byteLength;
                    I.setUint32(u, Zs), u += 4, P.set(Ot, u), u += Zs, Y += 4 + Zs;
                }
                let X;
                if (N < l - 1) h = a[N + 1].dts - O.dts, X = a[N + 1].pts - O.pts;
                else {
                    const oe = this.config, he = N > 0 ? O.dts - a[N - 1].dts : R;
                    if (X = N > 0 ? O.pts - a[N - 1].pts : R, oe.stretchShortVideoTrack && this.nextAudioPts !== null) {
                        const Se = Math.floor(oe.maxBufferHole * r), Ot = (i ? m + i * r : this.nextAudioPts) - O.pts;
                        Ot > Se ? (h = Ot - he, h < 0 ? h = he : _ = !0, S.log(`[mp4-remuxer]: It is approximately ${Ot / 90} ms to the next segment; using duration ${h / 90} ms for the last video frame.`)) : h = he;
                    } else h = he;
                }
                const ie = Math.round(O.pts - O.dts);
                V = Math.min(V, h), H = Math.max(H, h), F = Math.min(F, X), K = Math.max(K, X), o.push(new or(O.key, h, Y, ie));
            }
            if (o.length) {
                if (vt) {
                    if (vt < 70) {
                        const N = o[0].flags;
                        N.dependsOn = 2, N.isNonSync = 0;
                    }
                } else if (ui && K - F < H - V && R / H < .025 && o[0].cts === 0) {
                    S.warn("Found irregular gaps in sample duration. Using PTS instead of DTS to determine MP4 sample duration.");
                    let N = f;
                    for(let O = 0, z = o.length; O < z; O++){
                        const Y = N + o[O].duration, X = N + o[O].cts;
                        if (O < z - 1) {
                            const ie = Y + o[O + 1].cts;
                            o[O].duration = ie - X;
                        } else o[O].duration = O ? o[O - 1].duration : R;
                        o[O].cts = 0, N = Y;
                    }
                }
            }
            h = _ || !h ? R : h, this.nextAvcDts = d = g + h, this.videoSampleDuration = h, this.isVideoContiguous = !0;
            const J = {
                data1: L.moof(e.sequenceNumber++, f, re({}, e, {
                    samples: o
                })),
                data2: P,
                startPTS: m / r,
                endPTS: (y + h) / r,
                startDTS: f / r,
                endDTS: d / r,
                type: "video",
                hasAudio: !1,
                hasVideo: !0,
                nb: o.length,
                dropped: e.dropped
            };
            return e.samples = [], e.dropped = 0, J;
        }
        getSamplesPerFrame(e) {
            switch(e.segmentCodec){
                case "mp3":
                    return Bc;
                case "ac3":
                    return $c;
                default:
                    return ar;
            }
        }
        remuxAudio(e, t, s, i, r) {
            const a = e.inputTimeScale, o = e.samplerate ? e.samplerate : a, l = a / o, c = this.getSamplesPerFrame(e), d = c * l, u = this._initPTS, h = e.segmentCodec === "mp3" && this.typeSupported.mpeg, f = [], g = r !== void 0;
            let m = e.samples, y = h ? 0 : 8, E = this.nextAudioPts || -1;
            const x = t * a, T = u.baseTime * a / u.timescale;
            if (this.isAudioContiguous = s = s || m.length && E > 0 && (i && Math.abs(x - E) < 9e3 || Math.abs(Ae(m[0].pts - T, x) - E) < 20 * d), m.forEach(function($) {
                $.pts = Ae($.pts - T, x);
            }), !s || E < 0) {
                if (m = m.filter(($)=>$.pts >= 0), !m.length) return;
                r === 0 ? E = 0 : i && !g ? E = Math.max(0, x) : E = m[0].pts;
            }
            if (e.segmentCodec === "aac") {
                const $ = this.config.maxAudioFramesDrift;
                for(let j = 0, J = E; j < m.length; j++){
                    const N = m[j], O = N.pts, z = O - J, Y = Math.abs(1e3 * z / a);
                    if (z <= -$ * d && g) j === 0 && (S.warn(`Audio frame @ ${(O / a).toFixed(3)}s overlaps nextAudioPts by ${Math.round(1e3 * z / a)} ms.`), this.nextAudioPts = E = J = O);
                    else if (z >= $ * d && Y < Uc && g) {
                        let X = Math.round(z / d);
                        J = O - X * d, J < 0 && (X--, J += d), j === 0 && (this.nextAudioPts = E = J), S.warn(`[mp4-remuxer]: Injecting ${X} audio frame @ ${(J / a).toFixed(3)}s due to ${Math.round(1e3 * z / a)} ms gap.`);
                        for(let ie = 0; ie < X; ie++){
                            const oe = Math.max(J, 0);
                            let he = rr.getSilentFrame(e.manifestCodec || e.codec, e.channelCount);
                            he || (S.log("[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead."), he = N.unit.subarray()), m.splice(j, 0, {
                                unit: he,
                                pts: oe
                            }), J += d, j++;
                        }
                    }
                    N.pts = J, J += d;
                }
            }
            let R = null, v = null, D, b = 0, w = m.length;
            for(; w--;)b += m[w].unit.byteLength;
            for(let $ = 0, j = m.length; $ < j; $++){
                const J = m[$], N = J.unit;
                let O = J.pts;
                if (v !== null) {
                    const Y = f[$ - 1];
                    Y.duration = Math.round((O - v) / l);
                } else if (s && e.segmentCodec === "aac" && (O = E), R = O, b > 0) {
                    b += y;
                    try {
                        D = new Uint8Array(b);
                    } catch (Y) {
                        this.observer.emit(p.ERROR, p.ERROR, {
                            type: G.MUX_ERROR,
                            details: A.REMUX_ALLOC_ERROR,
                            fatal: !1,
                            error: Y,
                            bytes: b,
                            reason: `fail allocating audio mdat ${b}`
                        });
                        return;
                    }
                    h || (new DataView(D.buffer).setUint32(0, b), D.set(L.types.mdat, 4));
                } else return;
                D.set(N, y);
                const z = N.byteLength;
                y += z, f.push(new or(!0, c, z, 0)), v = O;
            }
            const P = f.length;
            if (!P) return;
            const I = f[f.length - 1];
            this.nextAudioPts = E = v + l * I.duration;
            const _ = h ? new Uint8Array(0) : L.moof(e.sequenceNumber++, R / l, re({}, e, {
                samples: f
            }));
            e.samples = [];
            const V = R / a, F = E / a, K = {
                data1: _,
                data2: D,
                startPTS: V,
                endPTS: F,
                startDTS: V,
                endDTS: F,
                type: "audio",
                hasAudio: !0,
                hasVideo: !1,
                nb: P
            };
            return this.isAudioContiguous = !0, K;
        }
        remuxEmptyAudio(e, t, s, i) {
            const r = e.inputTimeScale, a = e.samplerate ? e.samplerate : r, o = r / a, l = this.nextAudioPts, c = this._initDTS, d = c.baseTime * 9e4 / c.timescale, u = (l !== null ? l : i.startDTS * r) + d, h = i.endDTS * r + d, f = o * ar, g = Math.ceil((h - u) / f), m = rr.getSilentFrame(e.manifestCodec || e.codec, e.channelCount);
            if (S.warn("[mp4-remuxer]: remux empty Audio"), !m) {
                S.trace("[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec");
                return;
            }
            const y = [];
            for(let E = 0; E < g; E++){
                const x = u + E * f;
                y.push({
                    unit: m,
                    pts: x,
                    dts: x
                });
            }
            return e.samples = y, this.remuxAudio(e, t, s, !1);
        }
    }
    function Ae(n, e) {
        let t;
        if (e === null) return n;
        for(e < n ? t = -8589934592 : t = 8589934592; Math.abs(n - e) > 4294967296;)n += t;
        return n;
    }
    function Gc(n) {
        for(let e = 0; e < n.length; e++)if (n[e].key) return e;
        return -1;
    }
    function Ra(n, e, t, s) {
        const i = n.samples.length;
        if (!i) return;
        const r = n.inputTimeScale;
        for(let o = 0; o < i; o++){
            const l = n.samples[o];
            l.pts = Ae(l.pts - t.baseTime * r / t.timescale, e * r) / r, l.dts = Ae(l.dts - s.baseTime * r / s.timescale, e * r) / r;
        }
        const a = n.samples;
        return n.samples = [], {
            samples: a
        };
    }
    function Ia(n, e, t) {
        const s = n.samples.length;
        if (!s) return;
        const i = n.inputTimeScale;
        for(let a = 0; a < s; a++){
            const o = n.samples[a];
            o.pts = Ae(o.pts - t.baseTime * i / t.timescale, e * i) / i;
        }
        n.samples.sort((a, o)=>a.pts - o.pts);
        const r = n.samples;
        return n.samples = [], {
            samples: r
        };
    }
    class or {
        constructor(e, t, s, i){
            this.size = void 0, this.duration = void 0, this.cts = void 0, this.flags = void 0, this.duration = t, this.size = s, this.cts = i, this.flags = {
                isLeading: 0,
                isDependedOn: 0,
                hasRedundancy: 0,
                degradPrio: 0,
                dependsOn: e ? 2 : 1,
                isNonSync: e ? 0 : 1
            };
        }
    }
    class Kc {
        constructor(){
            this.emitInitSegment = !1, this.audioCodec = void 0, this.videoCodec = void 0, this.initData = void 0, this.initPTS = null, this.initTracks = void 0, this.lastEndTime = null;
        }
        destroy() {}
        resetTimeStamp(e) {
            this.initPTS = e, this.lastEndTime = null;
        }
        resetNextTimestamp() {
            this.lastEndTime = null;
        }
        resetInitSegment(e, t, s, i) {
            this.audioCodec = t, this.videoCodec = s, this.generateInitSegment(zo(e, i)), this.emitInitSegment = !0;
        }
        generateInitSegment(e) {
            let { audioCodec: t, videoCodec: s } = this;
            if (!(e != null && e.byteLength)) {
                this.initTracks = void 0, this.initData = void 0;
                return;
            }
            const i = this.initData = Jr(e);
            i.audio && (t = lr(i.audio, Q.AUDIO)), i.video && (s = lr(i.video, Q.VIDEO));
            const r = {};
            i.audio && i.video ? r.audiovideo = {
                container: "video/mp4",
                codec: t + "," + s,
                initSegment: e,
                id: "main"
            } : i.audio ? r.audio = {
                container: "audio/mp4",
                codec: t,
                initSegment: e,
                id: "audio"
            } : i.video ? r.video = {
                container: "video/mp4",
                codec: s,
                initSegment: e,
                id: "main"
            } : S.warn("[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes."), this.initTracks = r;
        }
        remux(e, t, s, i, r, a) {
            var o, l;
            let { initPTS: c, lastEndTime: d } = this;
            const u = {
                audio: void 0,
                video: void 0,
                text: i,
                id3: s,
                initSegment: void 0
            };
            M(d) || (d = this.lastEndTime = r || 0);
            const h = t.samples;
            if (!(h != null && h.length)) return u;
            const f = {
                initPTS: void 0,
                timescale: 1
            };
            let g = this.initData;
            if ((o = g) != null && o.length || (this.generateInitSegment(h), g = this.initData), !((l = g) != null && l.length)) return S.warn("[passthrough-remuxer.ts]: Failed to generate initSegment."), u;
            this.emitInitSegment && (f.tracks = this.initTracks, this.emitInitSegment = !1);
            const m = Qo(h, g), y = Xo(g, h), E = y === null ? r : y;
            (Hc(c, E, r, m) || f.timescale !== c.timescale && a) && (f.initPTS = E - r, c && c.timescale === 1 && S.warn(`Adjusting initPTS by ${f.initPTS - c.baseTime}`), this.initPTS = c = {
                baseTime: f.initPTS,
                timescale: 1
            });
            const x = e ? E - c.baseTime / c.timescale : d, T = x + m;
            Zo(g, h, c.baseTime / c.timescale), m > 0 ? this.lastEndTime = T : (S.warn("Duration parsed from mp4 should be greater than zero"), this.resetNextTimestamp());
            const R = !!g.audio, v = !!g.video;
            let D = "";
            R && (D += "audio"), v && (D += "video");
            const b = {
                data1: h,
                startPTS: x,
                startDTS: x,
                endPTS: T,
                endDTS: T,
                type: D,
                hasAudio: R,
                hasVideo: v,
                nb: 1,
                dropped: 0
            };
            return u.audio = b.type === "audio" ? b : void 0, u.video = b.type !== "audio" ? b : void 0, u.initSegment = f, u.id3 = Ra(s, r, c, c), i.samples.length && (u.text = Ia(i, r, c)), u;
        }
    }
    function Hc(n, e, t, s) {
        if (n === null) return !0;
        const i = Math.max(s, 1), r = e - n.baseTime / n.timescale;
        return Math.abs(r - t) > i;
    }
    function lr(n, e) {
        const t = n?.codec;
        if (t && t.length > 4) return t;
        if (e === Q.AUDIO) {
            if (t === "ec-3" || t === "ac-3" || t === "alac") return t;
            if (t === "fLaC" || t === "Opus") return _s(t, !1);
            const s = "mp4a.40.5";
            return S.info(`Parsed audio codec "${t}" or audio object type not handled. Using "${s}"`), s;
        }
        return S.warn(`Unhandled video codec "${t}"`), t === "hvc1" || t === "hev1" ? "hvc1.1.6.L120.90" : t === "av01" ? "av01.0.04M.08" : "avc1.42e01e";
    }
    let ze;
    try {
        ze = self.performance.now.bind(self.performance);
    } catch  {
        S.debug("Unable to use Performance API on this environment"), ze = It?.Date.now;
    }
    const Es = [
        {
            demux: Dc,
            remux: Kc
        },
        {
            demux: tt,
            remux: ys
        },
        {
            demux: Rc,
            remux: ys
        },
        {
            demux: Oc,
            remux: ys
        }
    ];
    Es.splice(2, 0, {
        demux: Cc,
        remux: ys
    });
    class cr {
        constructor(e, t, s, i, r){
            this.async = !1, this.observer = void 0, this.typeSupported = void 0, this.config = void 0, this.vendor = void 0, this.id = void 0, this.demuxer = void 0, this.remuxer = void 0, this.decrypter = void 0, this.probe = void 0, this.decryptionPromise = null, this.transmuxConfig = void 0, this.currentTransmuxState = void 0, this.observer = e, this.typeSupported = t, this.config = s, this.vendor = i, this.id = r;
        }
        configure(e) {
            this.transmuxConfig = e, this.decrypter && this.decrypter.reset();
        }
        push(e, t, s, i) {
            const r = s.transmuxing;
            r.executeStart = ze();
            let a = new Uint8Array(e);
            const { currentTransmuxState: o, transmuxConfig: l } = this;
            i && (this.currentTransmuxState = i);
            const { contiguous: c, discontinuity: d, trackSwitch: u, accurateTimeOffset: h, timeOffset: f, initSegmentChange: g } = i || o, { audioCodec: m, videoCodec: y, defaultInitPts: E, duration: x, initSegmentData: T } = l, R = Vc(a, t);
            if (R && R.method === "AES-128") {
                const w = this.getDecrypter();
                if (w.isSync()) {
                    let P = w.softwareDecrypt(a, R.key.buffer, R.iv.buffer);
                    if (s.part > -1 && (P = w.flush()), !P) return r.executeEnd = ze(), hi(s);
                    a = new Uint8Array(P);
                } else return this.decryptionPromise = w.webCryptoDecrypt(a, R.key.buffer, R.iv.buffer).then((P)=>{
                    const I = this.push(P, null, s);
                    return this.decryptionPromise = null, I;
                }), this.decryptionPromise;
            }
            const v = this.needsProbing(d, u);
            if (v) {
                const w = this.configureTransmuxer(a);
                if (w) return S.warn(`[transmuxer] ${w.message}`), this.observer.emit(p.ERROR, p.ERROR, {
                    type: G.MEDIA_ERROR,
                    details: A.FRAG_PARSING_ERROR,
                    fatal: !1,
                    error: w,
                    reason: w.message
                }), r.executeEnd = ze(), hi(s);
            }
            (d || u || g || v) && this.resetInitSegment(T, m, y, x, t), (d || g || v) && this.resetInitialTimestamp(E), c || this.resetContiguity();
            const D = this.transmux(a, R, f, h, s), b = this.currentTransmuxState;
            return b.contiguous = !0, b.discontinuity = !1, b.trackSwitch = !1, r.executeEnd = ze(), D;
        }
        flush(e) {
            const t = e.transmuxing;
            t.executeStart = ze();
            const { decrypter: s, currentTransmuxState: i, decryptionPromise: r } = this;
            if (r) return r.then(()=>this.flush(e));
            const a = [], { timeOffset: o } = i;
            if (s) {
                const u = s.flush();
                u && a.push(this.push(u, null, e));
            }
            const { demuxer: l, remuxer: c } = this;
            if (!l || !c) return t.executeEnd = ze(), [
                hi(e)
            ];
            const d = l.flush(o);
            return Ts(d) ? d.then((u)=>(this.flushRemux(a, u, e), a)) : (this.flushRemux(a, d, e), a);
        }
        flushRemux(e, t, s) {
            const { audioTrack: i, videoTrack: r, id3Track: a, textTrack: o } = t, { accurateTimeOffset: l, timeOffset: c } = this.currentTransmuxState;
            S.log(`[transmuxer.ts]: Flushed fragment ${s.sn}${s.part > -1 ? " p: " + s.part : ""} of level ${s.level}`);
            const d = this.remuxer.remux(i, r, a, o, c, l, !0, this.id);
            e.push({
                remuxResult: d,
                chunkMeta: s
            }), s.transmuxing.executeEnd = ze();
        }
        resetInitialTimestamp(e) {
            const { demuxer: t, remuxer: s } = this;
            !t || !s || (t.resetTimeStamp(e), s.resetTimeStamp(e));
        }
        resetContiguity() {
            const { demuxer: e, remuxer: t } = this;
            !e || !t || (e.resetContiguity(), t.resetNextTimestamp());
        }
        resetInitSegment(e, t, s, i, r) {
            const { demuxer: a, remuxer: o } = this;
            !a || !o || (a.resetInitSegment(e, t, s, i), o.resetInitSegment(e, t, s, r));
        }
        destroy() {
            this.demuxer && (this.demuxer.destroy(), this.demuxer = void 0), this.remuxer && (this.remuxer.destroy(), this.remuxer = void 0);
        }
        transmux(e, t, s, i, r) {
            let a;
            return t && t.method === "SAMPLE-AES" ? a = this.transmuxSampleAes(e, t, s, i, r) : a = this.transmuxUnencrypted(e, s, i, r), a;
        }
        transmuxUnencrypted(e, t, s, i) {
            const { audioTrack: r, videoTrack: a, id3Track: o, textTrack: l } = this.demuxer.demux(e, t, !1, !this.config.progressive);
            return {
                remuxResult: this.remuxer.remux(r, a, o, l, t, s, !1, this.id),
                chunkMeta: i
            };
        }
        transmuxSampleAes(e, t, s, i, r) {
            return this.demuxer.demuxSampleAes(e, t, s).then((a)=>({
                    remuxResult: this.remuxer.remux(a.audioTrack, a.videoTrack, a.id3Track, a.textTrack, s, i, !1, this.id),
                    chunkMeta: r
                }));
        }
        configureTransmuxer(e) {
            const { config: t, observer: s, typeSupported: i, vendor: r } = this;
            let a;
            for(let h = 0, f = Es.length; h < f; h++){
                var o;
                if ((o = Es[h].demux) != null && o.probe(e)) {
                    a = Es[h];
                    break;
                }
            }
            if (!a) return new Error("Failed to find demuxer by probing fragment data");
            const l = this.demuxer, c = this.remuxer, d = a.remux, u = a.demux;
            (!c || !(c instanceof d)) && (this.remuxer = new d(s, t, i, r)), (!l || !(l instanceof u)) && (this.demuxer = new u(s, t, i), this.probe = u.probe);
        }
        needsProbing(e, t) {
            return !this.demuxer || !this.remuxer || e || t;
        }
        getDecrypter() {
            let e = this.decrypter;
            return e || (e = this.decrypter = new ln(this.config)), e;
        }
    }
    function Vc(n, e) {
        let t = null;
        return n.byteLength > 0 && e?.key != null && e.iv !== null && e.method != null && (t = e), t;
    }
    const hi = (n)=>({
            remuxResult: {},
            chunkMeta: n
        });
    function Ts(n) {
        return "then" in n && n.then instanceof Function;
    }
    class Wc {
        constructor(e, t, s, i, r){
            this.audioCodec = void 0, this.videoCodec = void 0, this.initSegmentData = void 0, this.duration = void 0, this.defaultInitPts = void 0, this.audioCodec = e, this.videoCodec = t, this.initSegmentData = s, this.duration = i, this.defaultInitPts = r || null;
        }
    }
    class Yc {
        constructor(e, t, s, i, r, a){
            this.discontinuity = void 0, this.contiguous = void 0, this.accurateTimeOffset = void 0, this.trackSwitch = void 0, this.timeOffset = void 0, this.initSegmentChange = void 0, this.discontinuity = e, this.contiguous = t, this.accurateTimeOffset = s, this.trackSwitch = i, this.timeOffset = r, this.initSegmentChange = a;
        }
    }
    var Da = {
        exports: {}
    };
    (function(n) {
        var e = Object.prototype.hasOwnProperty, t = "~";
        function s() {}
        Object.create && (s.prototype = Object.create(null), new s().__proto__ || (t = !1));
        function i(l, c, d) {
            this.fn = l, this.context = c, this.once = d || !1;
        }
        function r(l, c, d, u, h) {
            if (typeof d != "function") throw new TypeError("The listener must be a function");
            var f = new i(d, u || l, h), g = t ? t + c : c;
            return l._events[g] ? l._events[g].fn ? l._events[g] = [
                l._events[g],
                f
            ] : l._events[g].push(f) : (l._events[g] = f, l._eventsCount++), l;
        }
        function a(l, c) {
            --l._eventsCount === 0 ? l._events = new s : delete l._events[c];
        }
        function o() {
            this._events = new s, this._eventsCount = 0;
        }
        o.prototype.eventNames = function() {
            var c = [], d, u;
            if (this._eventsCount === 0) return c;
            for(u in d = this._events)e.call(d, u) && c.push(t ? u.slice(1) : u);
            return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(d)) : c;
        }, o.prototype.listeners = function(c) {
            var d = t ? t + c : c, u = this._events[d];
            if (!u) return [];
            if (u.fn) return [
                u.fn
            ];
            for(var h = 0, f = u.length, g = new Array(f); h < f; h++)g[h] = u[h].fn;
            return g;
        }, o.prototype.listenerCount = function(c) {
            var d = t ? t + c : c, u = this._events[d];
            return u ? u.fn ? 1 : u.length : 0;
        }, o.prototype.emit = function(c, d, u, h, f, g) {
            var m = t ? t + c : c;
            if (!this._events[m]) return !1;
            var y = this._events[m], E = arguments.length, x, T;
            if (y.fn) {
                switch(y.once && this.removeListener(c, y.fn, void 0, !0), E){
                    case 1:
                        return y.fn.call(y.context), !0;
                    case 2:
                        return y.fn.call(y.context, d), !0;
                    case 3:
                        return y.fn.call(y.context, d, u), !0;
                    case 4:
                        return y.fn.call(y.context, d, u, h), !0;
                    case 5:
                        return y.fn.call(y.context, d, u, h, f), !0;
                    case 6:
                        return y.fn.call(y.context, d, u, h, f, g), !0;
                }
                for(T = 1, x = new Array(E - 1); T < E; T++)x[T - 1] = arguments[T];
                y.fn.apply(y.context, x);
            } else {
                var R = y.length, v;
                for(T = 0; T < R; T++)switch(y[T].once && this.removeListener(c, y[T].fn, void 0, !0), E){
                    case 1:
                        y[T].fn.call(y[T].context);
                        break;
                    case 2:
                        y[T].fn.call(y[T].context, d);
                        break;
                    case 3:
                        y[T].fn.call(y[T].context, d, u);
                        break;
                    case 4:
                        y[T].fn.call(y[T].context, d, u, h);
                        break;
                    default:
                        if (!x) for(v = 1, x = new Array(E - 1); v < E; v++)x[v - 1] = arguments[v];
                        y[T].fn.apply(y[T].context, x);
                }
            }
            return !0;
        }, o.prototype.on = function(c, d, u) {
            return r(this, c, d, u, !1);
        }, o.prototype.once = function(c, d, u) {
            return r(this, c, d, u, !0);
        }, o.prototype.removeListener = function(c, d, u, h) {
            var f = t ? t + c : c;
            if (!this._events[f]) return this;
            if (!d) return a(this, f), this;
            var g = this._events[f];
            if (g.fn) g.fn === d && (!h || g.once) && (!u || g.context === u) && a(this, f);
            else {
                for(var m = 0, y = [], E = g.length; m < E; m++)(g[m].fn !== d || h && !g[m].once || u && g[m].context !== u) && y.push(g[m]);
                y.length ? this._events[f] = y.length === 1 ? y[0] : y : a(this, f);
            }
            return this;
        }, o.prototype.removeAllListeners = function(c) {
            var d;
            return c ? (d = t ? t + c : c, this._events[d] && a(this, d)) : (this._events = new s, this._eventsCount = 0), this;
        }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = t, o.EventEmitter = o, n.exports = o;
    })(Da);
    var qc = Da.exports, gn = po(qc);
    class Ca {
        constructor(e, t, s, i){
            this.error = null, this.hls = void 0, this.id = void 0, this.observer = void 0, this.frag = null, this.part = null, this.useWorker = void 0, this.workerContext = null, this.onwmsg = void 0, this.transmuxer = null, this.onTransmuxComplete = void 0, this.onFlush = void 0;
            const r = e.config;
            this.hls = e, this.id = t, this.useWorker = !!r.enableWorker, this.onTransmuxComplete = s, this.onFlush = i;
            const a = (c, d)=>{
                d = d || {}, d.frag = this.frag, d.id = this.id, c === p.ERROR && (this.error = d.error), this.hls.trigger(c, d);
            };
            this.observer = new gn, this.observer.on(p.FRAG_DECRYPTED, a), this.observer.on(p.ERROR, a);
            const o = ft(r.preferManagedMediaSource) || {
                isTypeSupported: ()=>!1
            }, l = {
                mpeg: o.isTypeSupported("audio/mpeg"),
                mp3: o.isTypeSupported('audio/mp4; codecs="mp3"'),
                ac3: o.isTypeSupported('audio/mp4; codecs="ac-3"')
            };
            if (this.useWorker && typeof Worker < "u" && (r.workerPath || hc())) {
                try {
                    r.workerPath ? (S.log(`loading Web Worker ${r.workerPath} for "${t}"`), this.workerContext = gc(r.workerPath)) : (S.log(`injecting Web Worker for "${t}"`), this.workerContext = fc()), this.onwmsg = (u)=>this.onWorkerMessage(u);
                    const { worker: d } = this.workerContext;
                    d.addEventListener("message", this.onwmsg), d.onerror = (u)=>{
                        const h = new Error(`${u.message}  (${u.filename}:${u.lineno})`);
                        r.enableWorker = !1, S.warn(`Error in "${t}" Web Worker, fallback to inline`), this.hls.trigger(p.ERROR, {
                            type: G.OTHER_ERROR,
                            details: A.INTERNAL_EXCEPTION,
                            fatal: !1,
                            event: "demuxerWorker",
                            error: h
                        });
                    }, d.postMessage({
                        cmd: "init",
                        typeSupported: l,
                        vendor: "",
                        id: t,
                        config: JSON.stringify(r)
                    });
                } catch (d) {
                    S.warn(`Error setting up "${t}" Web Worker, fallback to inline`, d), this.resetWorker(), this.error = null, this.transmuxer = new cr(this.observer, l, r, "", t);
                }
                return;
            }
            this.transmuxer = new cr(this.observer, l, r, "", t);
        }
        resetWorker() {
            if (this.workerContext) {
                const { worker: e, objectURL: t } = this.workerContext;
                t && self.URL.revokeObjectURL(t), e.removeEventListener("message", this.onwmsg), e.onerror = null, e.terminate(), this.workerContext = null;
            }
        }
        destroy() {
            if (this.workerContext) this.resetWorker(), this.onwmsg = void 0;
            else {
                const t = this.transmuxer;
                t && (t.destroy(), this.transmuxer = null);
            }
            const e = this.observer;
            e && e.removeAllListeners(), this.frag = null, this.observer = null, this.hls = null;
        }
        push(e, t, s, i, r, a, o, l, c, d) {
            var u, h;
            c.transmuxing.start = self.performance.now();
            const { transmuxer: f } = this, g = a ? a.start : r.start, m = r.decryptdata, y = this.frag, E = !(y && r.cc === y.cc), x = !(y && c.level === y.level), T = y ? c.sn - y.sn : -1, R = this.part ? c.part - this.part.index : -1, v = T === 0 && c.id > 1 && c.id === y?.stats.chunkCount, D = !x && (T === 1 || T === 0 && (R === 1 || v && R <= 0)), b = self.performance.now();
            (x || T || r.stats.parsing.start === 0) && (r.stats.parsing.start = b), a && (R || !D) && (a.stats.parsing.start = b);
            const w = !(y && ((u = r.initSegment) == null ? void 0 : u.url) === ((h = y.initSegment) == null ? void 0 : h.url)), P = new Yc(E, D, l, x, g, w);
            if (!D || E || w) {
                S.log(`[transmuxer-interface, ${r.type}]: Starting new transmux session for sn: ${c.sn} p: ${c.part} level: ${c.level} id: ${c.id}
        discontinuity: ${E}
        trackSwitch: ${x}
        contiguous: ${D}
        accurateTimeOffset: ${l}
        timeOffset: ${g}
        initSegmentChange: ${w}`);
                const I = new Wc(s, i, t, o, d);
                this.configureTransmuxer(I);
            }
            if (this.frag = r, this.part = a, this.workerContext) this.workerContext.worker.postMessage({
                cmd: "demux",
                data: e,
                decryptdata: m,
                chunkMeta: c,
                state: P
            }, e instanceof ArrayBuffer ? [
                e
            ] : []);
            else if (f) {
                const I = f.push(e, m, c, P);
                Ts(I) ? (f.async = !0, I.then((_)=>{
                    this.handleTransmuxComplete(_);
                }).catch((_)=>{
                    this.transmuxerError(_, c, "transmuxer-interface push error");
                })) : (f.async = !1, this.handleTransmuxComplete(I));
            }
        }
        flush(e) {
            e.transmuxing.start = self.performance.now();
            const { transmuxer: t } = this;
            if (this.workerContext) this.workerContext.worker.postMessage({
                cmd: "flush",
                chunkMeta: e
            });
            else if (t) {
                let s = t.flush(e);
                Ts(s) || t.async ? (Ts(s) || (s = Promise.resolve(s)), s.then((r)=>{
                    this.handleFlushResult(r, e);
                }).catch((r)=>{
                    this.transmuxerError(r, e, "transmuxer-interface flush error");
                })) : this.handleFlushResult(s, e);
            }
        }
        transmuxerError(e, t, s) {
            this.hls && (this.error = e, this.hls.trigger(p.ERROR, {
                type: G.MEDIA_ERROR,
                details: A.FRAG_PARSING_ERROR,
                chunkMeta: t,
                frag: this.frag || void 0,
                fatal: !1,
                error: e,
                err: e,
                reason: s
            }));
        }
        handleFlushResult(e, t) {
            e.forEach((s)=>{
                this.handleTransmuxComplete(s);
            }), this.onFlush(t);
        }
        onWorkerMessage(e) {
            const t = e.data;
            if (!(t != null && t.event)) {
                S.warn(`worker message received with no ${t ? "event name" : "data"}`);
                return;
            }
            const s = this.hls;
            if (this.hls) switch(t.event){
                case "init":
                    {
                        var i;
                        const r = (i = this.workerContext) == null ? void 0 : i.objectURL;
                        r && self.URL.revokeObjectURL(r);
                        break;
                    }
                case "transmuxComplete":
                    {
                        this.handleTransmuxComplete(t.data);
                        break;
                    }
                case "flush":
                    {
                        this.onFlush(t.data);
                        break;
                    }
                case "workerLog":
                    S[t.data.logType] && S[t.data.logType](t.data.message);
                    break;
                default:
                    {
                        t.data = t.data || {}, t.data.frag = this.frag, t.data.id = this.id, s.trigger(t.event, t.data);
                        break;
                    }
            }
        }
        configureTransmuxer(e) {
            const { transmuxer: t } = this;
            this.workerContext ? this.workerContext.worker.postMessage({
                cmd: "configure",
                config: e
            }) : t && t.configure(e);
        }
        handleTransmuxComplete(e) {
            e.chunkMeta.transmuxing.end = self.performance.now(), this.onTransmuxComplete(e);
        }
    }
    function wa(n, e) {
        if (n.length !== e.length) return !1;
        for(let t = 0; t < n.length; t++)if (!Ct(n[t].attrs, e[t].attrs)) return !1;
        return !0;
    }
    function Ct(n, e, t) {
        const s = n["STABLE-RENDITION-ID"];
        return s && !t ? s === e["STABLE-RENDITION-ID"] : !(t || [
            "LANGUAGE",
            "NAME",
            "CHARACTERISTICS",
            "AUTOSELECT",
            "DEFAULT",
            "FORCED",
            "ASSOC-LANGUAGE"
        ]).some((i)=>n[i] !== e[i]);
    }
    function $i(n, e) {
        return e.label.toLowerCase() === n.name.toLowerCase() && (!e.language || e.language.toLowerCase() === (n.lang || "").toLowerCase());
    }
    const dr = 100;
    class jc extends cn {
        constructor(e, t, s){
            super(e, t, s, "[audio-stream-controller]", B.AUDIO), this.videoBuffer = null, this.videoTrackCC = -1, this.waitingVideoCC = -1, this.bufferedTrack = null, this.switchingTrack = null, this.trackId = -1, this.waitingData = null, this.mainDetails = null, this.flushing = !1, this.bufferFlushed = !1, this.cachedTrackLoadedData = null, this._registerListeners();
        }
        onHandlerDestroying() {
            this._unregisterListeners(), super.onHandlerDestroying(), this.mainDetails = null, this.bufferedTrack = null, this.switchingTrack = null;
        }
        _registerListeners() {
            const { hls: e } = this;
            e.on(p.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(p.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(p.MANIFEST_LOADING, this.onManifestLoading, this), e.on(p.LEVEL_LOADED, this.onLevelLoaded, this), e.on(p.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), e.on(p.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), e.on(p.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), e.on(p.ERROR, this.onError, this), e.on(p.BUFFER_RESET, this.onBufferReset, this), e.on(p.BUFFER_CREATED, this.onBufferCreated, this), e.on(p.BUFFER_FLUSHING, this.onBufferFlushing, this), e.on(p.BUFFER_FLUSHED, this.onBufferFlushed, this), e.on(p.INIT_PTS_FOUND, this.onInitPtsFound, this), e.on(p.FRAG_BUFFERED, this.onFragBuffered, this);
        }
        _unregisterListeners() {
            const { hls: e } = this;
            e.off(p.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(p.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(p.MANIFEST_LOADING, this.onManifestLoading, this), e.off(p.LEVEL_LOADED, this.onLevelLoaded, this), e.off(p.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), e.off(p.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), e.off(p.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), e.off(p.ERROR, this.onError, this), e.off(p.BUFFER_RESET, this.onBufferReset, this), e.off(p.BUFFER_CREATED, this.onBufferCreated, this), e.off(p.BUFFER_FLUSHING, this.onBufferFlushing, this), e.off(p.BUFFER_FLUSHED, this.onBufferFlushed, this), e.off(p.INIT_PTS_FOUND, this.onInitPtsFound, this), e.off(p.FRAG_BUFFERED, this.onFragBuffered, this);
        }
        onInitPtsFound(e, { frag: t, id: s, initPTS: i, timescale: r }) {
            if (s === "main") {
                const a = t.cc;
                this.initPTS[t.cc] = {
                    baseTime: i,
                    timescale: r
                }, this.log(`InitPTS for cc: ${a} found from main: ${i}`), this.videoTrackCC = a, this.state === C.WAITING_INIT_PTS && this.tick();
            }
        }
        startLoad(e) {
            if (!this.levels) {
                this.startPosition = e, this.state = C.STOPPED;
                return;
            }
            const t = this.lastCurrentTime;
            this.stopLoad(), this.setInterval(dr), t > 0 && e === -1 ? (this.log(`Override startPosition with lastCurrentTime @${t.toFixed(3)}`), e = t, this.state = C.IDLE) : (this.loadedmetadata = !1, this.state = C.WAITING_TRACK), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = e, this.tick();
        }
        doTick() {
            switch(this.state){
                case C.IDLE:
                    this.doTickIdle();
                    break;
                case C.WAITING_TRACK:
                    {
                        var e;
                        const { levels: s, trackId: i } = this, r = s == null || (e = s[i]) == null ? void 0 : e.details;
                        if (r) {
                            if (this.waitForCdnTuneIn(r)) break;
                            this.state = C.WAITING_INIT_PTS;
                        }
                        break;
                    }
                case C.FRAG_LOADING_WAITING_RETRY:
                    {
                        var t;
                        const s = performance.now(), i = this.retryDate;
                        if (!i || s >= i || (t = this.media) != null && t.seeking) {
                            const { levels: r, trackId: a } = this;
                            this.log("RetryDate reached, switch back to IDLE state"), this.resetStartWhenNotLoaded(r?.[a] || null), this.state = C.IDLE;
                        }
                        break;
                    }
                case C.WAITING_INIT_PTS:
                    {
                        const s = this.waitingData;
                        if (s) {
                            const { frag: i, part: r, cache: a, complete: o } = s;
                            if (this.initPTS[i.cc] !== void 0) {
                                this.waitingData = null, this.waitingVideoCC = -1, this.state = C.FRAG_LOADING;
                                const l = a.flush(), c = {
                                    frag: i,
                                    part: r,
                                    payload: l,
                                    networkDetails: null
                                };
                                this._handleFragmentLoadProgress(c), o && super._handleFragmentLoadComplete(c);
                            } else if (this.videoTrackCC !== this.waitingVideoCC) this.log(`Waiting fragment cc (${i.cc}) cancelled because video is at cc ${this.videoTrackCC}`), this.clearWaitingFragment();
                            else {
                                const l = this.getLoadPosition(), c = Z.bufferInfo(this.mediaBuffer, l, this.config.maxBufferHole);
                                Ui(c.end, this.config.maxFragLookUpTolerance, i) < 0 && (this.log(`Waiting fragment cc (${i.cc}) @ ${i.start} cancelled because another fragment at ${c.end} is needed`), this.clearWaitingFragment());
                            }
                        } else this.state = C.IDLE;
                    }
            }
            this.onTickEnd();
        }
        clearWaitingFragment() {
            const e = this.waitingData;
            e && (this.fragmentTracker.removeFragment(e.frag), this.waitingData = null, this.waitingVideoCC = -1, this.state = C.IDLE);
        }
        resetLoadingState() {
            this.clearWaitingFragment(), super.resetLoadingState();
        }
        onTickEnd() {
            const { media: e } = this;
            e != null && e.readyState && (this.lastCurrentTime = e.currentTime);
        }
        doTickIdle() {
            const { hls: e, levels: t, media: s, trackId: i } = this, r = e.config;
            if (!s && (this.startFragRequested || !r.startFragPrefetch) || !(t != null && t[i])) return;
            const a = t[i], o = a.details;
            if (!o || o.live && this.levelLastLoaded !== a || this.waitForCdnTuneIn(o)) {
                this.state = C.WAITING_TRACK;
                return;
            }
            const l = this.mediaBuffer ? this.mediaBuffer : this.media;
            this.bufferFlushed && l && (this.bufferFlushed = !1, this.afterBufferFlushed(l, Q.AUDIO, B.AUDIO));
            const c = this.getFwdBufferInfo(l, B.AUDIO);
            if (c === null) return;
            const { bufferedTrack: d, switchingTrack: u } = this;
            if (!u && this._streamEnded(c, o)) {
                e.trigger(p.BUFFER_EOS, {
                    type: "audio"
                }), this.state = C.ENDED;
                return;
            }
            const h = this.getFwdBufferInfo(this.videoBuffer ? this.videoBuffer : this.media, B.MAIN), f = c.len, g = this.getMaxBufferLength(h?.len), m = o.fragments, y = m[0].start;
            let E = this.flushing ? this.getLoadPosition() : c.end;
            if (u && s) {
                const v = this.getLoadPosition();
                d && !Ct(u.attrs, d.attrs) && (E = v), o.PTSKnown && v < y && (c.end > y || c.nextStart) && (this.log("Alt audio track ahead of main track, seek to start of alt audio track"), s.currentTime = y + .05);
            }
            if (f >= g && !u && E < m[m.length - 1].start) return;
            let x = this.getNextFragment(E, o), T = !1;
            if (x && this.isLoopLoading(x, E) && (T = !!x.gap, x = this.getNextFragmentLoopLoading(x, o, c, B.MAIN, g)), !x) {
                this.bufferFlushed = !0;
                return;
            }
            const R = h && x.start > h.end + o.targetduration;
            if (R || !(h != null && h.len) && c.len) {
                const v = this.getAppendedFrag(x.start, B.MAIN);
                if (v === null || (T || (T = !!v.gap || !!R && h.len === 0), R && !T || T && c.nextStart && c.nextStart < v.end)) return;
            }
            this.loadFragment(x, a, E);
        }
        getMaxBufferLength(e) {
            const t = super.getMaxBufferLength();
            return e ? Math.min(Math.max(t, e), this.config.maxMaxBufferLength) : t;
        }
        onMediaDetaching() {
            this.videoBuffer = null, this.bufferFlushed = this.flushing = !1, super.onMediaDetaching();
        }
        onAudioTracksUpdated(e, { audioTracks: t }) {
            this.resetTransmuxer(), this.levels = t.map((s)=>new Dt(s));
        }
        onAudioTrackSwitching(e, t) {
            const s = !!t.url;
            this.trackId = t.id;
            const { fragCurrent: i } = this;
            i && (i.abortRequests(), this.removeUnbufferedFrags(i.start)), this.resetLoadingState(), s ? this.setInterval(dr) : this.resetTransmuxer(), s ? (this.switchingTrack = t, this.state = C.IDLE, this.flushAudioIfNeeded(t)) : (this.switchingTrack = null, this.bufferedTrack = t, this.state = C.STOPPED), this.tick();
        }
        onManifestLoading() {
            this.fragmentTracker.removeAllFragments(), this.startPosition = this.lastCurrentTime = 0, this.bufferFlushed = this.flushing = !1, this.levels = this.mainDetails = this.waitingData = this.bufferedTrack = this.cachedTrackLoadedData = this.switchingTrack = null, this.startFragRequested = !1, this.trackId = this.videoTrackCC = this.waitingVideoCC = -1;
        }
        onLevelLoaded(e, t) {
            this.mainDetails = t.details, this.cachedTrackLoadedData !== null && (this.hls.trigger(p.AUDIO_TRACK_LOADED, this.cachedTrackLoadedData), this.cachedTrackLoadedData = null);
        }
        onAudioTrackLoaded(e, t) {
            var s;
            if (this.mainDetails == null) {
                this.cachedTrackLoadedData = t;
                return;
            }
            const { levels: i } = this, { details: r, id: a } = t;
            if (!i) {
                this.warn(`Audio tracks were reset while loading level ${a}`);
                return;
            }
            this.log(`Audio track ${a} loaded [${r.startSN},${r.endSN}]${r.lastPartSn ? `[part-${r.lastPartSn}-${r.lastPartIndex}]` : ""},duration:${r.totalduration}`);
            const o = i[a];
            let l = 0;
            if (r.live || (s = o.details) != null && s.live) {
                this.checkLiveUpdate(r);
                const d = this.mainDetails;
                if (r.deltaUpdateFailed || !d) return;
                if (!o.details && r.hasProgramDateTime && d.hasProgramDateTime) Ms(r, d), l = r.fragments[0].start;
                else {
                    var c;
                    l = this.alignPlaylists(r, o.details, (c = this.levelLastLoaded) == null ? void 0 : c.details);
                }
            }
            o.details = r, this.levelLastLoaded = o, !this.startFragRequested && (this.mainDetails || !r.live) && this.setStartPosition(this.mainDetails || r, l), this.state === C.WAITING_TRACK && !this.waitForCdnTuneIn(r) && (this.state = C.IDLE), this.tick();
        }
        _handleFragmentLoadProgress(e) {
            var t;
            const { frag: s, part: i, payload: r } = e, { config: a, trackId: o, levels: l } = this;
            if (!l) {
                this.warn(`Audio tracks were reset while fragment load was in progress. Fragment ${s.sn} of level ${s.level} will not be buffered`);
                return;
            }
            const c = l[o];
            if (!c) {
                this.warn("Audio track is undefined on fragment load progress");
                return;
            }
            const d = c.details;
            if (!d) {
                this.warn("Audio track details undefined on fragment load progress"), this.removeUnbufferedFrags(s.start);
                return;
            }
            const u = a.defaultAudioCodec || c.audioCodec || "mp4a.40.2";
            let h = this.transmuxer;
            h || (h = this.transmuxer = new Ca(this.hls, B.AUDIO, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)));
            const f = this.initPTS[s.cc], g = (t = s.initSegment) == null ? void 0 : t.data;
            if (f !== void 0) {
                const y = i ? i.index : -1, E = y !== -1, x = new on(s.level, s.sn, s.stats.chunkCount, r.byteLength, y, E);
                h.push(r, g, u, "", s, i, d.totalduration, !1, x, f);
            } else {
                this.log(`Unknown video PTS for cc ${s.cc}, waiting for video PTS before demuxing audio frag ${s.sn} of [${d.startSN} ,${d.endSN}],track ${o}`);
                const { cache: m } = this.waitingData = this.waitingData || {
                    frag: s,
                    part: i,
                    cache: new fa,
                    complete: !1
                };
                m.push(new Uint8Array(r)), this.waitingVideoCC = this.videoTrackCC, this.state = C.WAITING_INIT_PTS;
            }
        }
        _handleFragmentLoadComplete(e) {
            if (this.waitingData) {
                this.waitingData.complete = !0;
                return;
            }
            super._handleFragmentLoadComplete(e);
        }
        onBufferReset() {
            this.mediaBuffer = this.videoBuffer = null, this.loadedmetadata = !1;
        }
        onBufferCreated(e, t) {
            const s = t.tracks.audio;
            s && (this.mediaBuffer = s.buffer || null), t.tracks.video && (this.videoBuffer = t.tracks.video.buffer || null);
        }
        onFragBuffered(e, t) {
            const { frag: s, part: i } = t;
            if (s.type !== B.AUDIO) {
                if (!this.loadedmetadata && s.type === B.MAIN) {
                    const r = this.videoBuffer || this.media;
                    r && Z.getBuffered(r).length && (this.loadedmetadata = !0);
                }
                return;
            }
            if (this.fragContextChanged(s)) {
                this.warn(`Fragment ${s.sn}${i ? " p: " + i.index : ""} of level ${s.level} finished buffering, but was aborted. state: ${this.state}, audioSwitch: ${this.switchingTrack ? this.switchingTrack.name : "false"}`);
                return;
            }
            if (s.sn !== "initSegment") {
                this.fragPrevious = s;
                const r = this.switchingTrack;
                r && (this.bufferedTrack = r, this.switchingTrack = null, this.hls.trigger(p.AUDIO_TRACK_SWITCHED, ue({}, r)));
            }
            this.fragBufferedComplete(s, i);
        }
        onError(e, t) {
            var s;
            if (t.fatal) {
                this.state = C.ERROR;
                return;
            }
            switch(t.details){
                case A.FRAG_GAP:
                case A.FRAG_PARSING_ERROR:
                case A.FRAG_DECRYPT_ERROR:
                case A.FRAG_LOAD_ERROR:
                case A.FRAG_LOAD_TIMEOUT:
                case A.KEY_LOAD_ERROR:
                case A.KEY_LOAD_TIMEOUT:
                    this.onFragmentOrKeyLoadError(B.AUDIO, t);
                    break;
                case A.AUDIO_TRACK_LOAD_ERROR:
                case A.AUDIO_TRACK_LOAD_TIMEOUT:
                case A.LEVEL_PARSING_ERROR:
                    !t.levelRetry && this.state === C.WAITING_TRACK && ((s = t.context) == null ? void 0 : s.type) === q.AUDIO_TRACK && (this.state = C.IDLE);
                    break;
                case A.BUFFER_APPEND_ERROR:
                case A.BUFFER_FULL_ERROR:
                    if (!t.parent || t.parent !== "audio") return;
                    if (t.details === A.BUFFER_APPEND_ERROR) {
                        this.resetLoadingState();
                        return;
                    }
                    this.reduceLengthAndFlushBuffer(t) && (this.bufferedTrack = null, super.flushMainBuffer(0, Number.POSITIVE_INFINITY, "audio"));
                    break;
                case A.INTERNAL_EXCEPTION:
                    this.recoverWorkerError(t);
                    break;
            }
        }
        onBufferFlushing(e, { type: t }) {
            t !== Q.VIDEO && (this.flushing = !0);
        }
        onBufferFlushed(e, { type: t }) {
            if (t !== Q.VIDEO) {
                this.flushing = !1, this.bufferFlushed = !0, this.state === C.ENDED && (this.state = C.IDLE);
                const s = this.mediaBuffer || this.media;
                s && (this.afterBufferFlushed(s, t, B.AUDIO), this.tick());
            }
        }
        _handleTransmuxComplete(e) {
            var t;
            const s = "audio", { hls: i } = this, { remuxResult: r, chunkMeta: a } = e, o = this.getCurrentContext(a);
            if (!o) {
                this.resetWhenMissingContext(a);
                return;
            }
            const { frag: l, part: c, level: d } = o, { details: u } = d, { audio: h, text: f, id3: g, initSegment: m } = r;
            if (this.fragContextChanged(l) || !u) {
                this.fragmentTracker.removeFragment(l);
                return;
            }
            if (this.state = C.PARSING, this.switchingTrack && h && this.completeAudioSwitch(this.switchingTrack), m != null && m.tracks) {
                const y = l.initSegment || l;
                this._bufferInitSegment(d, m.tracks, y, a), i.trigger(p.FRAG_PARSING_INIT_SEGMENT, {
                    frag: y,
                    id: s,
                    tracks: m.tracks
                });
            }
            if (h) {
                const { startPTS: y, endPTS: E, startDTS: x, endDTS: T } = h;
                c && (c.elementaryStreams[Q.AUDIO] = {
                    startPTS: y,
                    endPTS: E,
                    startDTS: x,
                    endDTS: T
                }), l.setElementaryStreamInfo(Q.AUDIO, y, E, x, T), this.bufferFragmentData(h, l, c, a);
            }
            if (g != null && (t = g.samples) != null && t.length) {
                const y = re({
                    id: s,
                    frag: l,
                    details: u
                }, g);
                i.trigger(p.FRAG_PARSING_METADATA, y);
            }
            if (f) {
                const y = re({
                    id: s,
                    frag: l,
                    details: u
                }, f);
                i.trigger(p.FRAG_PARSING_USERDATA, y);
            }
        }
        _bufferInitSegment(e, t, s, i) {
            if (this.state !== C.PARSING) return;
            t.video && delete t.video;
            const r = t.audio;
            if (!r) return;
            r.id = "audio";
            const a = e.audioCodec;
            this.log(`Init audio buffer, container:${r.container}, codecs[level/parsed]=[${a}/${r.codec}]`), a && a.split(",").length === 1 && (r.levelCodec = a), this.hls.trigger(p.BUFFER_CODECS, t);
            const o = r.initSegment;
            if (o != null && o.byteLength) {
                const l = {
                    type: "audio",
                    frag: s,
                    part: null,
                    chunkMeta: i,
                    parent: s.type,
                    data: o
                };
                this.hls.trigger(p.BUFFER_APPENDING, l);
            }
            this.tickImmediate();
        }
        loadFragment(e, t, s) {
            const i = this.fragmentTracker.getState(e);
            if (this.fragCurrent = e, this.switchingTrack || i === ce.NOT_LOADED || i === ce.PARTIAL) {
                var r;
                if (e.sn === "initSegment") this._loadInitSegment(e, t);
                else if ((r = t.details) != null && r.live && !this.initPTS[e.cc]) {
                    this.log(`Waiting for video PTS in continuity counter ${e.cc} of live stream before loading audio fragment ${e.sn} of level ${this.trackId}`), this.state = C.WAITING_INIT_PTS;
                    const a = this.mainDetails;
                    a && a.fragments[0].start !== t.details.fragments[0].start && Ms(t.details, a);
                } else this.startFragRequested = !0, super.loadFragment(e, t, s);
            } else this.clearTrackerIfNeeded(e);
        }
        flushAudioIfNeeded(e) {
            const { media: t, bufferedTrack: s } = this, i = s?.attrs, r = e.attrs;
            t && i && (i.CHANNELS !== r.CHANNELS || s.name !== e.name || s.lang !== e.lang) && (this.log("Switching audio track : flushing all audio"), super.flushMainBuffer(0, Number.POSITIVE_INFINITY, "audio"), this.bufferedTrack = null);
        }
        completeAudioSwitch(e) {
            const { hls: t } = this;
            this.flushAudioIfNeeded(e), this.bufferedTrack = e, this.switchingTrack = null, t.trigger(p.AUDIO_TRACK_SWITCHED, ue({}, e));
        }
    }
    class zc extends an {
        constructor(e){
            super(e, "[audio-track-controller]"), this.tracks = [], this.groupIds = null, this.tracksInGroup = [], this.trackId = -1, this.currentTrack = null, this.selectDefaultTrack = !0, this.registerListeners();
        }
        registerListeners() {
            const { hls: e } = this;
            e.on(p.MANIFEST_LOADING, this.onManifestLoading, this), e.on(p.MANIFEST_PARSED, this.onManifestParsed, this), e.on(p.LEVEL_LOADING, this.onLevelLoading, this), e.on(p.LEVEL_SWITCHING, this.onLevelSwitching, this), e.on(p.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), e.on(p.ERROR, this.onError, this);
        }
        unregisterListeners() {
            const { hls: e } = this;
            e.off(p.MANIFEST_LOADING, this.onManifestLoading, this), e.off(p.MANIFEST_PARSED, this.onManifestParsed, this), e.off(p.LEVEL_LOADING, this.onLevelLoading, this), e.off(p.LEVEL_SWITCHING, this.onLevelSwitching, this), e.off(p.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), e.off(p.ERROR, this.onError, this);
        }
        destroy() {
            this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, this.currentTrack = null, super.destroy();
        }
        onManifestLoading() {
            this.tracks = [], this.tracksInGroup = [], this.groupIds = null, this.currentTrack = null, this.trackId = -1, this.selectDefaultTrack = !0;
        }
        onManifestParsed(e, t) {
            this.tracks = t.audioTracks || [];
        }
        onAudioTrackLoaded(e, t) {
            const { id: s, groupId: i, details: r } = t, a = this.tracksInGroup[s];
            if (!a || a.groupId !== i) {
                this.warn(`Audio track with id:${s} and group:${i} not found in active group ${a?.groupId}`);
                return;
            }
            const o = a.details;
            a.details = t.details, this.log(`Audio track ${s} "${a.name}" lang:${a.lang} group:${i} loaded [${r.startSN}-${r.endSN}]`), s === this.trackId && this.playlistLoaded(s, t, o);
        }
        onLevelLoading(e, t) {
            this.switchLevel(t.level);
        }
        onLevelSwitching(e, t) {
            this.switchLevel(t.level);
        }
        switchLevel(e) {
            const t = this.hls.levels[e];
            if (!t) return;
            const s = t.audioGroups || null, i = this.groupIds;
            let r = this.currentTrack;
            if (!s || i?.length !== s?.length || s != null && s.some((o)=>i?.indexOf(o) === -1)) {
                this.groupIds = s, this.trackId = -1, this.currentTrack = null;
                const o = this.tracks.filter((h)=>!s || s.indexOf(h.groupId) !== -1);
                if (o.length) this.selectDefaultTrack && !o.some((h)=>h.default) && (this.selectDefaultTrack = !1), o.forEach((h, f)=>{
                    h.id = f;
                });
                else if (!r && !this.tracksInGroup.length) return;
                this.tracksInGroup = o;
                const l = this.hls.config.audioPreference;
                if (!r && l) {
                    const h = Ke(l, o, Et);
                    if (h > -1) r = o[h];
                    else {
                        const f = Ke(l, this.tracks);
                        r = this.tracks[f];
                    }
                }
                let c = this.findTrackId(r);
                c === -1 && r && (c = this.findTrackId(null));
                const d = {
                    audioTracks: o
                };
                this.log(`Updating audio tracks, ${o.length} track(s) found in group(s): ${s?.join(",")}`), this.hls.trigger(p.AUDIO_TRACKS_UPDATED, d);
                const u = this.trackId;
                if (c !== -1 && u === -1) this.setAudioTrack(c);
                else if (o.length && u === -1) {
                    var a;
                    const h = new Error(`No audio track selected for current audio group-ID(s): ${(a = this.groupIds) == null ? void 0 : a.join(",")} track count: ${o.length}`);
                    this.warn(h.message), this.hls.trigger(p.ERROR, {
                        type: G.MEDIA_ERROR,
                        details: A.AUDIO_TRACK_LOAD_ERROR,
                        fatal: !0,
                        error: h
                    });
                }
            } else this.shouldReloadPlaylist(r) && this.setAudioTrack(this.trackId);
        }
        onError(e, t) {
            t.fatal || !t.context || t.context.type === q.AUDIO_TRACK && t.context.id === this.trackId && (!this.groupIds || this.groupIds.indexOf(t.context.groupId) !== -1) && (this.requestScheduled = -1, this.checkRetry(t));
        }
        get allAudioTracks() {
            return this.tracks;
        }
        get audioTracks() {
            return this.tracksInGroup;
        }
        get audioTrack() {
            return this.trackId;
        }
        set audioTrack(e) {
            this.selectDefaultTrack = !1, this.setAudioTrack(e);
        }
        setAudioOption(e) {
            const t = this.hls;
            if (t.config.audioPreference = e, e) {
                const s = this.allAudioTracks;
                if (this.selectDefaultTrack = !1, s.length) {
                    const i = this.currentTrack;
                    if (i && bt(e, i, Et)) return i;
                    const r = Ke(e, this.tracksInGroup, Et);
                    if (r > -1) {
                        const a = this.tracksInGroup[r];
                        return this.setAudioTrack(r), a;
                    } else if (i) {
                        let a = t.loadLevel;
                        a === -1 && (a = t.firstAutoLevel);
                        const o = zl(e, t.levels, s, a, Et);
                        if (o === -1) return null;
                        t.nextLoadLevel = o;
                    }
                    if (e.channels || e.audioCodec) {
                        const a = Ke(e, s);
                        if (a > -1) return s[a];
                    }
                }
            }
            return null;
        }
        setAudioTrack(e) {
            const t = this.tracksInGroup;
            if (e < 0 || e >= t.length) {
                this.warn(`Invalid audio track id: ${e}`);
                return;
            }
            this.clearTimer(), this.selectDefaultTrack = !1;
            const s = this.currentTrack, i = t[e], r = i.details && !i.details.live;
            if (e === this.trackId && i === s && r || (this.log(`Switching to audio-track ${e} "${i.name}" lang:${i.lang} group:${i.groupId} channels:${i.channels}`), this.trackId = e, this.currentTrack = i, this.hls.trigger(p.AUDIO_TRACK_SWITCHING, ue({}, i)), r)) return;
            const a = this.switchParams(i.url, s?.details, i.details);
            this.loadPlaylist(a);
        }
        findTrackId(e) {
            const t = this.tracksInGroup;
            for(let s = 0; s < t.length; s++){
                const i = t[s];
                if (!(this.selectDefaultTrack && !i.default) && (!e || bt(e, i, Et))) return s;
            }
            if (e) {
                const { name: s, lang: i, assocLang: r, characteristics: a, audioCodec: o, channels: l } = e;
                for(let c = 0; c < t.length; c++){
                    const d = t[c];
                    if (bt({
                        name: s,
                        lang: i,
                        assocLang: r,
                        characteristics: a,
                        audioCodec: o,
                        channels: l
                    }, d, Et)) return c;
                }
                for(let c = 0; c < t.length; c++){
                    const d = t[c];
                    if (Ct(e.attrs, d.attrs, [
                        "LANGUAGE",
                        "ASSOC-LANGUAGE",
                        "CHARACTERISTICS"
                    ])) return c;
                }
                for(let c = 0; c < t.length; c++){
                    const d = t[c];
                    if (Ct(e.attrs, d.attrs, [
                        "LANGUAGE"
                    ])) return c;
                }
            }
            return -1;
        }
        loadPlaylist(e) {
            const t = this.currentTrack;
            if (this.shouldLoadPlaylist(t) && t) {
                super.loadPlaylist();
                const s = t.id, i = t.groupId;
                let r = t.url;
                if (e) try {
                    r = e.addDirectives(r);
                } catch (a) {
                    this.warn(`Could not construct new URL with HLS Delivery Directives: ${a}`);
                }
                this.log(`loading audio-track playlist ${s} "${t.name}" lang:${t.lang} group:${i}`), this.clearTimer(), this.hls.trigger(p.AUDIO_TRACK_LOADING, {
                    url: r,
                    id: s,
                    groupId: i,
                    deliveryDirectives: e || null
                });
            }
        }
    }
    const ur = 500;
    class Xc extends cn {
        constructor(e, t, s){
            super(e, t, s, "[subtitle-stream-controller]", B.SUBTITLE), this.currentTrackId = -1, this.tracksBuffered = [], this.mainDetails = null, this._registerListeners();
        }
        onHandlerDestroying() {
            this._unregisterListeners(), super.onHandlerDestroying(), this.mainDetails = null;
        }
        _registerListeners() {
            const { hls: e } = this;
            e.on(p.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(p.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(p.MANIFEST_LOADING, this.onManifestLoading, this), e.on(p.LEVEL_LOADED, this.onLevelLoaded, this), e.on(p.ERROR, this.onError, this), e.on(p.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), e.on(p.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), e.on(p.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), e.on(p.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), e.on(p.BUFFER_FLUSHING, this.onBufferFlushing, this), e.on(p.FRAG_BUFFERED, this.onFragBuffered, this);
        }
        _unregisterListeners() {
            const { hls: e } = this;
            e.off(p.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(p.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(p.MANIFEST_LOADING, this.onManifestLoading, this), e.off(p.LEVEL_LOADED, this.onLevelLoaded, this), e.off(p.ERROR, this.onError, this), e.off(p.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), e.off(p.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), e.off(p.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), e.off(p.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), e.off(p.BUFFER_FLUSHING, this.onBufferFlushing, this), e.off(p.FRAG_BUFFERED, this.onFragBuffered, this);
        }
        startLoad(e) {
            this.stopLoad(), this.state = C.IDLE, this.setInterval(ur), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = e, this.tick();
        }
        onManifestLoading() {
            this.mainDetails = null, this.fragmentTracker.removeAllFragments();
        }
        onMediaDetaching() {
            this.tracksBuffered = [], super.onMediaDetaching();
        }
        onLevelLoaded(e, t) {
            this.mainDetails = t.details;
        }
        onSubtitleFragProcessed(e, t) {
            const { frag: s, success: i } = t;
            if (this.fragPrevious = s, this.state = C.IDLE, !i) return;
            const r = this.tracksBuffered[this.currentTrackId];
            if (!r) return;
            let a;
            const o = s.start;
            for(let c = 0; c < r.length; c++)if (o >= r[c].start && o <= r[c].end) {
                a = r[c];
                break;
            }
            const l = s.start + s.duration;
            a ? a.end = l : (a = {
                start: o,
                end: l
            }, r.push(a)), this.fragmentTracker.fragBuffered(s), this.fragBufferedComplete(s, null);
        }
        onBufferFlushing(e, t) {
            const { startOffset: s, endOffset: i } = t;
            if (s === 0 && i !== Number.POSITIVE_INFINITY) {
                const r = i - 1;
                if (r <= 0) return;
                t.endOffsetSubtitles = Math.max(0, r), this.tracksBuffered.forEach((a)=>{
                    for(let o = 0; o < a.length;){
                        if (a[o].end <= r) {
                            a.shift();
                            continue;
                        } else if (a[o].start < r) a[o].start = r;
                        else break;
                        o++;
                    }
                }), this.fragmentTracker.removeFragmentsInRange(s, r, B.SUBTITLE);
            }
        }
        onFragBuffered(e, t) {
            if (!this.loadedmetadata && t.frag.type === B.MAIN) {
                var s;
                (s = this.media) != null && s.buffered.length && (this.loadedmetadata = !0);
            }
        }
        onError(e, t) {
            const s = t.frag;
            s?.type === B.SUBTITLE && (t.details === A.FRAG_GAP && this.fragmentTracker.fragBuffered(s, !0), this.fragCurrent && this.fragCurrent.abortRequests(), this.state !== C.STOPPED && (this.state = C.IDLE));
        }
        onSubtitleTracksUpdated(e, { subtitleTracks: t }) {
            if (this.levels && wa(this.levels, t)) {
                this.levels = t.map((s)=>new Dt(s));
                return;
            }
            this.tracksBuffered = [], this.levels = t.map((s)=>{
                const i = new Dt(s);
                return this.tracksBuffered[i.id] = [], i;
            }), this.fragmentTracker.removeFragmentsInRange(0, Number.POSITIVE_INFINITY, B.SUBTITLE), this.fragPrevious = null, this.mediaBuffer = null;
        }
        onSubtitleTrackSwitch(e, t) {
            var s;
            if (this.currentTrackId = t.id, !((s = this.levels) != null && s.length) || this.currentTrackId === -1) {
                this.clearInterval();
                return;
            }
            const i = this.levels[this.currentTrackId];
            i != null && i.details ? this.mediaBuffer = this.mediaBufferTimeRanges : this.mediaBuffer = null, i && this.setInterval(ur);
        }
        onSubtitleTrackLoaded(e, t) {
            var s;
            const { currentTrackId: i, levels: r } = this, { details: a, id: o } = t;
            if (!r) {
                this.warn(`Subtitle tracks were reset while loading level ${o}`);
                return;
            }
            const l = r[o];
            if (o >= r.length || !l) return;
            this.log(`Subtitle track ${o} loaded [${a.startSN},${a.endSN}]${a.lastPartSn ? `[part-${a.lastPartSn}-${a.lastPartIndex}]` : ""},duration:${a.totalduration}`), this.mediaBuffer = this.mediaBufferTimeRanges;
            let c = 0;
            if (a.live || (s = l.details) != null && s.live) {
                const u = this.mainDetails;
                if (a.deltaUpdateFailed || !u) return;
                const h = u.fragments[0];
                if (!l.details) a.hasProgramDateTime && u.hasProgramDateTime ? (Ms(a, u), c = a.fragments[0].start) : h && (c = h.start, Ni(a, c));
                else {
                    var d;
                    c = this.alignPlaylists(a, l.details, (d = this.levelLastLoaded) == null ? void 0 : d.details), c === 0 && h && (c = h.start, Ni(a, c));
                }
            }
            l.details = a, this.levelLastLoaded = l, o === i && (!this.startFragRequested && (this.mainDetails || !a.live) && this.setStartPosition(this.mainDetails || a, c), this.tick(), a.live && !this.fragCurrent && this.media && this.state === C.IDLE && (Os(null, a.fragments, this.media.currentTime, 0) || (this.warn("Subtitle playlist not aligned with playback"), l.details = void 0)));
        }
        _handleFragmentLoadComplete(e) {
            const { frag: t, payload: s } = e, i = t.decryptdata, r = this.hls;
            if (!this.fragContextChanged(t) && s && s.byteLength > 0 && i != null && i.key && i.iv && i.method === "AES-128") {
                const a = performance.now();
                this.decrypter.decrypt(new Uint8Array(s), i.key.buffer, i.iv.buffer).catch((o)=>{
                    throw r.trigger(p.ERROR, {
                        type: G.MEDIA_ERROR,
                        details: A.FRAG_DECRYPT_ERROR,
                        fatal: !1,
                        error: o,
                        reason: o.message,
                        frag: t
                    }), o;
                }).then((o)=>{
                    const l = performance.now();
                    r.trigger(p.FRAG_DECRYPTED, {
                        frag: t,
                        payload: o,
                        stats: {
                            tstart: a,
                            tdecrypt: l
                        }
                    });
                }).catch((o)=>{
                    this.warn(`${o.name}: ${o.message}`), this.state = C.IDLE;
                });
            }
        }
        doTick() {
            if (!this.media) {
                this.state = C.IDLE;
                return;
            }
            if (this.state === C.IDLE) {
                const { currentTrackId: e, levels: t } = this, s = t?.[e];
                if (!s || !t.length || !s.details) return;
                const { config: i } = this, r = this.getLoadPosition(), a = Z.bufferedInfo(this.tracksBuffered[this.currentTrackId] || [], r, i.maxBufferHole), { end: o, len: l } = a, c = this.getFwdBufferInfo(this.media, B.MAIN), d = s.details, u = this.getMaxBufferLength(c?.len) + d.levelTargetDuration;
                if (l > u) return;
                const h = d.fragments, f = h.length, g = d.edge;
                let m = null;
                const y = this.fragPrevious;
                if (o < g) {
                    const E = i.maxFragLookUpTolerance, x = o > g - E ? 0 : E;
                    m = Os(y, h, Math.max(h[0].start, o), x), !m && y && y.start < h[0].start && (m = h[0]);
                } else m = h[f - 1];
                if (!m) return;
                if (m = this.mapToInitFragWhenRequired(m), m.sn !== "initSegment") {
                    const E = m.sn - d.startSN, x = h[E - 1];
                    x && x.cc === m.cc && this.fragmentTracker.getState(x) === ce.NOT_LOADED && (m = x);
                }
                this.fragmentTracker.getState(m) === ce.NOT_LOADED && this.loadFragment(m, s, o);
            }
        }
        getMaxBufferLength(e) {
            const t = super.getMaxBufferLength();
            return e ? Math.max(t, e) : t;
        }
        loadFragment(e, t, s) {
            this.fragCurrent = e, e.sn === "initSegment" ? this._loadInitSegment(e, t) : (this.startFragRequested = !0, super.loadFragment(e, t, s));
        }
        get mediaBufferTimeRanges() {
            return new Qc(this.tracksBuffered[this.currentTrackId] || []);
        }
    }
    class Qc {
        constructor(e){
            this.buffered = void 0;
            const t = (s, i, r)=>{
                if (i = i >>> 0, i > r - 1) throw new DOMException(`Failed to execute '${s}' on 'TimeRanges': The index provided (${i}) is greater than the maximum bound (${r})`);
                return e[i][s];
            };
            this.buffered = {
                get length () {
                    return e.length;
                },
                end (s) {
                    return t("end", s, e.length);
                },
                start (s) {
                    return t("start", s, e.length);
                }
            };
        }
    }
    class Jc extends an {
        constructor(e){
            super(e, "[subtitle-track-controller]"), this.media = null, this.tracks = [], this.groupIds = null, this.tracksInGroup = [], this.trackId = -1, this.currentTrack = null, this.selectDefaultTrack = !0, this.queuedDefaultTrack = -1, this.asyncPollTrackChange = ()=>this.pollTrackChange(0), this.useTextTrackPolling = !1, this.subtitlePollingInterval = -1, this._subtitleDisplay = !0, this.onTextTracksChanged = ()=>{
                if (this.useTextTrackPolling || self.clearInterval(this.subtitlePollingInterval), !this.media || !this.hls.config.renderTextTracksNatively) return;
                let t = null;
                const s = gs(this.media.textTracks);
                for(let r = 0; r < s.length; r++)if (s[r].mode === "hidden") t = s[r];
                else if (s[r].mode === "showing") {
                    t = s[r];
                    break;
                }
                const i = this.findTrackForTextTrack(t);
                this.subtitleTrack !== i && this.setSubtitleTrack(i);
            }, this.registerListeners();
        }
        destroy() {
            this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, this.currentTrack = null, this.onTextTracksChanged = this.asyncPollTrackChange = null, super.destroy();
        }
        get subtitleDisplay() {
            return this._subtitleDisplay;
        }
        set subtitleDisplay(e) {
            this._subtitleDisplay = e, this.trackId > -1 && this.toggleTrackModes();
        }
        registerListeners() {
            const { hls: e } = this;
            e.on(p.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(p.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(p.MANIFEST_LOADING, this.onManifestLoading, this), e.on(p.MANIFEST_PARSED, this.onManifestParsed, this), e.on(p.LEVEL_LOADING, this.onLevelLoading, this), e.on(p.LEVEL_SWITCHING, this.onLevelSwitching, this), e.on(p.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), e.on(p.ERROR, this.onError, this);
        }
        unregisterListeners() {
            const { hls: e } = this;
            e.off(p.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(p.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(p.MANIFEST_LOADING, this.onManifestLoading, this), e.off(p.MANIFEST_PARSED, this.onManifestParsed, this), e.off(p.LEVEL_LOADING, this.onLevelLoading, this), e.off(p.LEVEL_SWITCHING, this.onLevelSwitching, this), e.off(p.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), e.off(p.ERROR, this.onError, this);
        }
        onMediaAttached(e, t) {
            this.media = t.media, this.media && (this.queuedDefaultTrack > -1 && (this.subtitleTrack = this.queuedDefaultTrack, this.queuedDefaultTrack = -1), this.useTextTrackPolling = !(this.media.textTracks && "onchange" in this.media.textTracks), this.useTextTrackPolling ? this.pollTrackChange(500) : this.media.textTracks.addEventListener("change", this.asyncPollTrackChange));
        }
        pollTrackChange(e) {
            self.clearInterval(this.subtitlePollingInterval), this.subtitlePollingInterval = self.setInterval(this.onTextTracksChanged, e);
        }
        onMediaDetaching() {
            if (!this.media) return;
            self.clearInterval(this.subtitlePollingInterval), this.useTextTrackPolling || this.media.textTracks.removeEventListener("change", this.asyncPollTrackChange), this.trackId > -1 && (this.queuedDefaultTrack = this.trackId), gs(this.media.textTracks).forEach((t)=>{
                At(t);
            }), this.subtitleTrack = -1, this.media = null;
        }
        onManifestLoading() {
            this.tracks = [], this.groupIds = null, this.tracksInGroup = [], this.trackId = -1, this.currentTrack = null, this.selectDefaultTrack = !0;
        }
        onManifestParsed(e, t) {
            this.tracks = t.subtitleTracks;
        }
        onSubtitleTrackLoaded(e, t) {
            const { id: s, groupId: i, details: r } = t, a = this.tracksInGroup[s];
            if (!a || a.groupId !== i) {
                this.warn(`Subtitle track with id:${s} and group:${i} not found in active group ${a?.groupId}`);
                return;
            }
            const o = a.details;
            a.details = t.details, this.log(`Subtitle track ${s} "${a.name}" lang:${a.lang} group:${i} loaded [${r.startSN}-${r.endSN}]`), s === this.trackId && this.playlistLoaded(s, t, o);
        }
        onLevelLoading(e, t) {
            this.switchLevel(t.level);
        }
        onLevelSwitching(e, t) {
            this.switchLevel(t.level);
        }
        switchLevel(e) {
            const t = this.hls.levels[e];
            if (!t) return;
            const s = t.subtitleGroups || null, i = this.groupIds;
            let r = this.currentTrack;
            if (!s || i?.length !== s?.length || s != null && s.some((a)=>i?.indexOf(a) === -1)) {
                this.groupIds = s, this.trackId = -1, this.currentTrack = null;
                const a = this.tracks.filter((d)=>!s || s.indexOf(d.groupId) !== -1);
                if (a.length) this.selectDefaultTrack && !a.some((d)=>d.default) && (this.selectDefaultTrack = !1), a.forEach((d, u)=>{
                    d.id = u;
                });
                else if (!r && !this.tracksInGroup.length) return;
                this.tracksInGroup = a;
                const o = this.hls.config.subtitlePreference;
                if (!r && o) {
                    this.selectDefaultTrack = !1;
                    const d = Ke(o, a);
                    if (d > -1) r = a[d];
                    else {
                        const u = Ke(o, this.tracks);
                        r = this.tracks[u];
                    }
                }
                let l = this.findTrackId(r);
                l === -1 && r && (l = this.findTrackId(null));
                const c = {
                    subtitleTracks: a
                };
                this.log(`Updating subtitle tracks, ${a.length} track(s) found in "${s?.join(",")}" group-id`), this.hls.trigger(p.SUBTITLE_TRACKS_UPDATED, c), l !== -1 && this.trackId === -1 && this.setSubtitleTrack(l);
            } else this.shouldReloadPlaylist(r) && this.setSubtitleTrack(this.trackId);
        }
        findTrackId(e) {
            const t = this.tracksInGroup, s = this.selectDefaultTrack;
            for(let i = 0; i < t.length; i++){
                const r = t[i];
                if (!(s && !r.default || !s && !e) && (!e || bt(r, e))) return i;
            }
            if (e) {
                for(let i = 0; i < t.length; i++){
                    const r = t[i];
                    if (Ct(e.attrs, r.attrs, [
                        "LANGUAGE",
                        "ASSOC-LANGUAGE",
                        "CHARACTERISTICS"
                    ])) return i;
                }
                for(let i = 0; i < t.length; i++){
                    const r = t[i];
                    if (Ct(e.attrs, r.attrs, [
                        "LANGUAGE"
                    ])) return i;
                }
            }
            return -1;
        }
        findTrackForTextTrack(e) {
            if (e) {
                const t = this.tracksInGroup;
                for(let s = 0; s < t.length; s++){
                    const i = t[s];
                    if ($i(i, e)) return s;
                }
            }
            return -1;
        }
        onError(e, t) {
            t.fatal || !t.context || t.context.type === q.SUBTITLE_TRACK && t.context.id === this.trackId && (!this.groupIds || this.groupIds.indexOf(t.context.groupId) !== -1) && this.checkRetry(t);
        }
        get allSubtitleTracks() {
            return this.tracks;
        }
        get subtitleTracks() {
            return this.tracksInGroup;
        }
        get subtitleTrack() {
            return this.trackId;
        }
        set subtitleTrack(e) {
            this.selectDefaultTrack = !1, this.setSubtitleTrack(e);
        }
        setSubtitleOption(e) {
            if (this.hls.config.subtitlePreference = e, e) {
                const t = this.allSubtitleTracks;
                if (this.selectDefaultTrack = !1, t.length) {
                    const s = this.currentTrack;
                    if (s && bt(e, s)) return s;
                    const i = Ke(e, this.tracksInGroup);
                    if (i > -1) {
                        const r = this.tracksInGroup[i];
                        return this.setSubtitleTrack(i), r;
                    } else {
                        if (s) return null;
                        {
                            const r = Ke(e, t);
                            if (r > -1) return t[r];
                        }
                    }
                }
            }
            return null;
        }
        loadPlaylist(e) {
            super.loadPlaylist();
            const t = this.currentTrack;
            if (this.shouldLoadPlaylist(t) && t) {
                const s = t.id, i = t.groupId;
                let r = t.url;
                if (e) try {
                    r = e.addDirectives(r);
                } catch (a) {
                    this.warn(`Could not construct new URL with HLS Delivery Directives: ${a}`);
                }
                this.log(`Loading subtitle playlist for id ${s}`), this.hls.trigger(p.SUBTITLE_TRACK_LOADING, {
                    url: r,
                    id: s,
                    groupId: i,
                    deliveryDirectives: e || null
                });
            }
        }
        toggleTrackModes() {
            const { media: e } = this;
            if (!e) return;
            const t = gs(e.textTracks), s = this.currentTrack;
            let i;
            if (s && (i = t.filter((r)=>$i(s, r))[0], i || this.warn(`Unable to find subtitle TextTrack with name "${s.name}" and language "${s.lang}"`)), [].slice.call(t).forEach((r)=>{
                r.mode !== "disabled" && r !== i && (r.mode = "disabled");
            }), i) {
                const r = this.subtitleDisplay ? "showing" : "hidden";
                i.mode !== r && (i.mode = r);
            }
        }
        setSubtitleTrack(e) {
            const t = this.tracksInGroup;
            if (!this.media) {
                this.queuedDefaultTrack = e;
                return;
            }
            if (e < -1 || e >= t.length || !M(e)) {
                this.warn(`Invalid subtitle track id: ${e}`);
                return;
            }
            this.clearTimer(), this.selectDefaultTrack = !1;
            const s = this.currentTrack, i = t[e] || null;
            if (this.trackId = e, this.currentTrack = i, this.toggleTrackModes(), !i) {
                this.hls.trigger(p.SUBTITLE_TRACK_SWITCH, {
                    id: e
                });
                return;
            }
            const r = !!i.details && !i.details.live;
            if (e === this.trackId && i === s && r) return;
            this.log(`Switching to subtitle-track ${e}` + (i ? ` "${i.name}" lang:${i.lang} group:${i.groupId}` : ""));
            const { id: a, groupId: o = "", name: l, type: c, url: d } = i;
            this.hls.trigger(p.SUBTITLE_TRACK_SWITCH, {
                id: a,
                groupId: o,
                name: l,
                type: c,
                url: d
            });
            const u = this.switchParams(i.url, s?.details, i.details);
            this.loadPlaylist(u);
        }
    }
    class Zc {
        constructor(e){
            this.buffers = void 0, this.queues = {
                video: [],
                audio: [],
                audiovideo: []
            }, this.buffers = e;
        }
        append(e, t, s) {
            const i = this.queues[t];
            i.push(e), i.length === 1 && !s && this.executeNext(t);
        }
        insertAbort(e, t) {
            this.queues[t].unshift(e), this.executeNext(t);
        }
        appendBlocker(e) {
            let t;
            const s = new Promise((r)=>{
                t = r;
            }), i = {
                execute: t,
                onStart: ()=>{},
                onComplete: ()=>{},
                onError: ()=>{}
            };
            return this.append(i, e), s;
        }
        executeNext(e) {
            const t = this.queues[e];
            if (t.length) {
                const s = t[0];
                try {
                    s.execute();
                } catch (i) {
                    S.warn(`[buffer-operation-queue]: Exception executing "${e}" SourceBuffer operation: ${i}`), s.onError(i);
                    const r = this.buffers[e];
                    r != null && r.updating || this.shiftAndExecuteNext(e);
                }
            }
        }
        shiftAndExecuteNext(e) {
            this.queues[e].shift(), this.executeNext(e);
        }
        current(e) {
            return this.queues[e][0];
        }
    }
    const hr = /(avc[1234]|hvc1|hev1|dvh[1e]|vp09|av01)(?:\.[^.,]+)+/;
    class ed {
        constructor(e){
            this.details = null, this._objectUrl = null, this.operationQueue = void 0, this.listeners = void 0, this.hls = void 0, this.bufferCodecEventsExpected = 0, this._bufferCodecEventsTotal = 0, this.media = null, this.mediaSource = null, this.lastMpegAudioChunk = null, this.appendSource = void 0, this.appendErrors = {
                audio: 0,
                video: 0,
                audiovideo: 0
            }, this.tracks = {}, this.pendingTracks = {}, this.sourceBuffer = void 0, this.log = void 0, this.warn = void 0, this.error = void 0, this._onEndStreaming = (s)=>{
                this.hls && this.hls.pauseBuffering();
            }, this._onStartStreaming = (s)=>{
                this.hls && this.hls.resumeBuffering();
            }, this._onMediaSourceOpen = ()=>{
                const { media: s, mediaSource: i } = this;
                this.log("Media source opened"), s && (s.removeEventListener("emptied", this._onMediaEmptied), this.updateMediaElementDuration(), this.hls.trigger(p.MEDIA_ATTACHED, {
                    media: s,
                    mediaSource: i
                })), i && i.removeEventListener("sourceopen", this._onMediaSourceOpen), this.checkPendingTracks();
            }, this._onMediaSourceClose = ()=>{
                this.log("Media source closed");
            }, this._onMediaSourceEnded = ()=>{
                this.log("Media source ended");
            }, this._onMediaEmptied = ()=>{
                const { mediaSrc: s, _objectUrl: i } = this;
                s !== i && S.error(`Media element src was set while attaching MediaSource (${i} > ${s})`);
            }, this.hls = e;
            const t = "[buffer-controller]";
            this.appendSource = cl(ft(e.config.preferManagedMediaSource)), this.log = S.log.bind(S, t), this.warn = S.warn.bind(S, t), this.error = S.error.bind(S, t), this._initSourceBuffer(), this.registerListeners();
        }
        hasSourceTypes() {
            return this.getSourceBufferTypes().length > 0 || Object.keys(this.pendingTracks).length > 0;
        }
        destroy() {
            this.unregisterListeners(), this.details = null, this.lastMpegAudioChunk = null, this.hls = null;
        }
        registerListeners() {
            const { hls: e } = this;
            e.on(p.MEDIA_ATTACHING, this.onMediaAttaching, this), e.on(p.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(p.MANIFEST_LOADING, this.onManifestLoading, this), e.on(p.MANIFEST_PARSED, this.onManifestParsed, this), e.on(p.BUFFER_RESET, this.onBufferReset, this), e.on(p.BUFFER_APPENDING, this.onBufferAppending, this), e.on(p.BUFFER_CODECS, this.onBufferCodecs, this), e.on(p.BUFFER_EOS, this.onBufferEos, this), e.on(p.BUFFER_FLUSHING, this.onBufferFlushing, this), e.on(p.LEVEL_UPDATED, this.onLevelUpdated, this), e.on(p.FRAG_PARSED, this.onFragParsed, this), e.on(p.FRAG_CHANGED, this.onFragChanged, this);
        }
        unregisterListeners() {
            const { hls: e } = this;
            e.off(p.MEDIA_ATTACHING, this.onMediaAttaching, this), e.off(p.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(p.MANIFEST_LOADING, this.onManifestLoading, this), e.off(p.MANIFEST_PARSED, this.onManifestParsed, this), e.off(p.BUFFER_RESET, this.onBufferReset, this), e.off(p.BUFFER_APPENDING, this.onBufferAppending, this), e.off(p.BUFFER_CODECS, this.onBufferCodecs, this), e.off(p.BUFFER_EOS, this.onBufferEos, this), e.off(p.BUFFER_FLUSHING, this.onBufferFlushing, this), e.off(p.LEVEL_UPDATED, this.onLevelUpdated, this), e.off(p.FRAG_PARSED, this.onFragParsed, this), e.off(p.FRAG_CHANGED, this.onFragChanged, this);
        }
        _initSourceBuffer() {
            this.sourceBuffer = {}, this.operationQueue = new Zc(this.sourceBuffer), this.listeners = {
                audio: [],
                video: [],
                audiovideo: []
            }, this.appendErrors = {
                audio: 0,
                video: 0,
                audiovideo: 0
            }, this.lastMpegAudioChunk = null;
        }
        onManifestLoading() {
            this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = 0, this.details = null;
        }
        onManifestParsed(e, t) {
            let s = 2;
            (t.audio && !t.video || !t.altAudio) && (s = 1), this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = s, this.log(`${this.bufferCodecEventsExpected} bufferCodec event(s) expected`);
        }
        onMediaAttaching(e, t) {
            const s = this.media = t.media, i = ft(this.appendSource);
            if (s && i) {
                var r;
                const a = this.mediaSource = new i;
                this.log(`created media source: ${(r = a.constructor) == null ? void 0 : r.name}`), a.addEventListener("sourceopen", this._onMediaSourceOpen), a.addEventListener("sourceended", this._onMediaSourceEnded), a.addEventListener("sourceclose", this._onMediaSourceClose), this.appendSource && (a.addEventListener("startstreaming", this._onStartStreaming), a.addEventListener("endstreaming", this._onEndStreaming));
                const o = this._objectUrl = self.URL.createObjectURL(a);
                if (this.appendSource) try {
                    s.removeAttribute("src");
                    const l = self.ManagedMediaSource;
                    s.disableRemotePlayback = s.disableRemotePlayback || l && a instanceof l, fr(s), td(s, o), s.load();
                } catch  {
                    s.src = o;
                }
                else s.src = o;
                s.addEventListener("emptied", this._onMediaEmptied);
            }
        }
        onMediaDetaching() {
            const { media: e, mediaSource: t, _objectUrl: s } = this;
            if (t) {
                if (this.log("media source detaching"), t.readyState === "open") try {
                    t.endOfStream();
                } catch (i) {
                    this.warn(`onMediaDetaching: ${i.message} while calling endOfStream`);
                }
                this.onBufferReset(), t.removeEventListener("sourceopen", this._onMediaSourceOpen), t.removeEventListener("sourceended", this._onMediaSourceEnded), t.removeEventListener("sourceclose", this._onMediaSourceClose), this.appendSource && (t.removeEventListener("startstreaming", this._onStartStreaming), t.removeEventListener("endstreaming", this._onEndStreaming)), e && (e.removeEventListener("emptied", this._onMediaEmptied), s && self.URL.revokeObjectURL(s), this.mediaSrc === s ? (e.removeAttribute("src"), this.appendSource && fr(e), e.load()) : this.warn("media|source.src was changed by a third party - skip cleanup")), this.mediaSource = null, this.media = null, this._objectUrl = null, this.bufferCodecEventsExpected = this._bufferCodecEventsTotal, this.pendingTracks = {}, this.tracks = {};
            }
            this.hls.trigger(p.MEDIA_DETACHED, void 0);
        }
        onBufferReset() {
            this.getSourceBufferTypes().forEach((e)=>{
                this.resetBuffer(e);
            }), this._initSourceBuffer();
        }
        resetBuffer(e) {
            const t = this.sourceBuffer[e];
            try {
                if (t) {
                    var s;
                    this.removeBufferListeners(e), this.sourceBuffer[e] = void 0, (s = this.mediaSource) != null && s.sourceBuffers.length && this.mediaSource.removeSourceBuffer(t);
                }
            } catch (i) {
                this.warn(`onBufferReset ${e}`, i);
            }
        }
        onBufferCodecs(e, t) {
            const s = this.getSourceBufferTypes().length, i = Object.keys(t);
            if (i.forEach((a)=>{
                if (s) {
                    const l = this.tracks[a];
                    if (l && typeof l.buffer.changeType == "function") {
                        var o;
                        const { id: c, codec: d, levelCodec: u, container: h, metadata: f } = t[a], g = Fn(l.codec, l.levelCodec), m = g?.replace(hr, "$1");
                        let y = Fn(d, u);
                        const E = (o = y) == null ? void 0 : o.replace(hr, "$1");
                        if (y && m !== E) {
                            a.slice(0, 5) === "audio" && (y = _s(y, this.appendSource));
                            const x = `${h};codecs=${y}`;
                            this.appendChangeType(a, x), this.log(`switching codec ${g} to ${y}`), this.tracks[a] = {
                                buffer: l.buffer,
                                codec: d,
                                container: h,
                                levelCodec: u,
                                metadata: f,
                                id: c
                            };
                        }
                    }
                } else this.pendingTracks[a] = t[a];
            }), s) return;
            const r = Math.max(this.bufferCodecEventsExpected - 1, 0);
            this.bufferCodecEventsExpected !== r && (this.log(`${r} bufferCodec event(s) expected ${i.join(",")}`), this.bufferCodecEventsExpected = r), this.mediaSource && this.mediaSource.readyState === "open" && this.checkPendingTracks();
        }
        appendChangeType(e, t) {
            const { operationQueue: s } = this, i = {
                execute: ()=>{
                    const r = this.sourceBuffer[e];
                    r && (this.log(`changing ${e} sourceBuffer type to ${t}`), r.changeType(t)), s.shiftAndExecuteNext(e);
                },
                onStart: ()=>{},
                onComplete: ()=>{},
                onError: (r)=>{
                    this.warn(`Failed to change ${e} SourceBuffer type`, r);
                }
            };
            s.append(i, e, !!this.pendingTracks[e]);
        }
        onBufferAppending(e, t) {
            const { hls: s, operationQueue: i, tracks: r } = this, { data: a, type: o, frag: l, part: c, chunkMeta: d } = t, u = d.buffering[o], h = self.performance.now();
            u.start = h;
            const f = l.stats.buffering, g = c ? c.stats.buffering : null;
            f.start === 0 && (f.start = h), g && g.start === 0 && (g.start = h);
            const m = r.audio;
            let y = !1;
            o === "audio" && m?.container === "audio/mpeg" && (y = !this.lastMpegAudioChunk || d.id === 1 || this.lastMpegAudioChunk.sn !== d.sn, this.lastMpegAudioChunk = d);
            const E = l.start, x = {
                execute: ()=>{
                    if (u.executeStart = self.performance.now(), y) {
                        const T = this.sourceBuffer[o];
                        if (T) {
                            const R = E - T.timestampOffset;
                            Math.abs(R) >= .1 && (this.log(`Updating audio SourceBuffer timestampOffset to ${E} (delta: ${R}) sn: ${l.sn})`), T.timestampOffset = E);
                        }
                    }
                    this.appendExecutor(a, o);
                },
                onStart: ()=>{},
                onComplete: ()=>{
                    const T = self.performance.now();
                    u.executeEnd = u.end = T, f.first === 0 && (f.first = T), g && g.first === 0 && (g.first = T);
                    const { sourceBuffer: R } = this, v = {};
                    for(const D in R)v[D] = Z.getBuffered(R[D]);
                    this.appendErrors[o] = 0, o === "audio" || o === "video" ? this.appendErrors.audiovideo = 0 : (this.appendErrors.audio = 0, this.appendErrors.video = 0), this.hls.trigger(p.BUFFER_APPENDED, {
                        type: o,
                        frag: l,
                        part: c,
                        chunkMeta: d,
                        parent: l.type,
                        timeRanges: v
                    });
                },
                onError: (T)=>{
                    const R = {
                        type: G.MEDIA_ERROR,
                        parent: l.type,
                        details: A.BUFFER_APPEND_ERROR,
                        sourceBufferName: o,
                        frag: l,
                        part: c,
                        chunkMeta: d,
                        error: T,
                        err: T,
                        fatal: !1
                    };
                    if (T.code === DOMException.QUOTA_EXCEEDED_ERR) R.details = A.BUFFER_FULL_ERROR;
                    else {
                        const v = ++this.appendErrors[o];
                        R.details = A.BUFFER_APPEND_ERROR, this.warn(`Failed ${v}/${s.config.appendErrorMaxRetry} times to append segment in "${o}" sourceBuffer`), v >= s.config.appendErrorMaxRetry && (R.fatal = !0);
                    }
                    s.trigger(p.ERROR, R);
                }
            };
            i.append(x, o, !!this.pendingTracks[o]);
        }
        onBufferFlushing(e, t) {
            const { operationQueue: s } = this, i = (r)=>({
                    execute: this.removeExecutor.bind(this, r, t.startOffset, t.endOffset),
                    onStart: ()=>{},
                    onComplete: ()=>{
                        this.hls.trigger(p.BUFFER_FLUSHED, {
                            type: r
                        });
                    },
                    onError: (a)=>{
                        this.warn(`Failed to remove from ${r} SourceBuffer`, a);
                    }
                });
            t.type ? s.append(i(t.type), t.type) : this.getSourceBufferTypes().forEach((r)=>{
                s.append(i(r), r);
            });
        }
        onFragParsed(e, t) {
            const { frag: s, part: i } = t, r = [], a = i ? i.elementaryStreams : s.elementaryStreams;
            a[Q.AUDIOVIDEO] ? r.push("audiovideo") : (a[Q.AUDIO] && r.push("audio"), a[Q.VIDEO] && r.push("video"));
            const o = ()=>{
                const l = self.performance.now();
                s.stats.buffering.end = l, i && (i.stats.buffering.end = l);
                const c = i ? i.stats : s.stats;
                this.hls.trigger(p.FRAG_BUFFERED, {
                    frag: s,
                    part: i,
                    stats: c,
                    id: s.type
                });
            };
            r.length === 0 && this.warn(`Fragments must have at least one ElementaryStreamType set. type: ${s.type} level: ${s.level} sn: ${s.sn}`), this.blockBuffers(o, r);
        }
        onFragChanged(e, t) {
            this.trimBuffers();
        }
        onBufferEos(e, t) {
            this.getSourceBufferTypes().reduce((i, r)=>{
                const a = this.sourceBuffer[r];
                return a && (!t.type || t.type === r) && (a.ending = !0, a.ended || (a.ended = !0, this.log(`${r} sourceBuffer now EOS`))), i && !!(!a || a.ended);
            }, !0) && (this.log("Queueing mediaSource.endOfStream()"), this.blockBuffers(()=>{
                this.getSourceBufferTypes().forEach((r)=>{
                    const a = this.sourceBuffer[r];
                    a && (a.ending = !1);
                });
                const { mediaSource: i } = this;
                if (!i || i.readyState !== "open") {
                    i && this.log(`Could not call mediaSource.endOfStream(). mediaSource.readyState: ${i.readyState}`);
                    return;
                }
                this.log("Calling mediaSource.endOfStream()"), i.endOfStream();
            }));
        }
        onLevelUpdated(e, { details: t }) {
            t.fragments.length && (this.details = t, this.getSourceBufferTypes().length ? this.blockBuffers(this.updateMediaElementDuration.bind(this)) : this.updateMediaElementDuration());
        }
        trimBuffers() {
            const { hls: e, details: t, media: s } = this;
            if (!s || t === null || !this.getSourceBufferTypes().length) return;
            const r = e.config, a = s.currentTime, o = t.levelTargetDuration, l = t.live && r.liveBackBufferLength !== null ? r.liveBackBufferLength : r.backBufferLength;
            if (M(l) && l > 0) {
                const c = Math.max(l, o), d = Math.floor(a / o) * o - c;
                this.flushBackBuffer(a, o, d);
            }
            if (M(r.frontBufferFlushThreshold) && r.frontBufferFlushThreshold > 0) {
                const c = Math.max(r.maxBufferLength, r.frontBufferFlushThreshold), d = Math.max(c, o), u = Math.floor(a / o) * o + d;
                this.flushFrontBuffer(a, o, u);
            }
        }
        flushBackBuffer(e, t, s) {
            const { details: i, sourceBuffer: r } = this;
            this.getSourceBufferTypes().forEach((o)=>{
                const l = r[o];
                if (l) {
                    const c = Z.getBuffered(l);
                    if (c.length > 0 && s > c.start(0)) {
                        if (this.hls.trigger(p.BACK_BUFFER_REACHED, {
                            bufferEnd: s
                        }), i != null && i.live) this.hls.trigger(p.LIVE_BACK_BUFFER_REACHED, {
                            bufferEnd: s
                        });
                        else if (l.ended && c.end(c.length - 1) - e < t * 2) {
                            this.log(`Cannot flush ${o} back buffer while SourceBuffer is in ended state`);
                            return;
                        }
                        this.hls.trigger(p.BUFFER_FLUSHING, {
                            startOffset: 0,
                            endOffset: s,
                            type: o
                        });
                    }
                }
            });
        }
        flushFrontBuffer(e, t, s) {
            const { sourceBuffer: i } = this;
            this.getSourceBufferTypes().forEach((a)=>{
                const o = i[a];
                if (o) {
                    const l = Z.getBuffered(o), c = l.length;
                    if (c < 2) return;
                    const d = l.start(c - 1), u = l.end(c - 1);
                    if (s > d || e >= d && e <= u) return;
                    if (o.ended && e - u < 2 * t) {
                        this.log(`Cannot flush ${a} front buffer while SourceBuffer is in ended state`);
                        return;
                    }
                    this.hls.trigger(p.BUFFER_FLUSHING, {
                        startOffset: d,
                        endOffset: 1 / 0,
                        type: a
                    });
                }
            });
        }
        updateMediaElementDuration() {
            if (!this.details || !this.media || !this.mediaSource || this.mediaSource.readyState !== "open") return;
            const { details: e, hls: t, media: s, mediaSource: i } = this, r = e.fragments[0].start + e.totalduration, a = s.duration, o = M(i.duration) ? i.duration : 0;
            e.live && t.config.liveDurationInfinity ? (i.duration = 1 / 0, this.updateSeekableRange(e)) : (r > o && r > a || !M(a)) && (this.log(`Updating Media Source duration to ${r.toFixed(3)}`), i.duration = r);
        }
        updateSeekableRange(e) {
            const t = this.mediaSource, s = e.fragments;
            if (s.length && e.live && t != null && t.setLiveSeekableRange) {
                const r = Math.max(0, s[0].start), a = Math.max(r, r + e.totalduration);
                this.log(`Media Source duration is set to ${t.duration}. Setting seekable range to ${r}-${a}.`), t.setLiveSeekableRange(r, a);
            }
        }
        checkPendingTracks() {
            const { bufferCodecEventsExpected: e, operationQueue: t, pendingTracks: s } = this, i = Object.keys(s).length;
            if (i && (!e || i === 2 || "audiovideo" in s)) {
                this.createSourceBuffers(s), this.pendingTracks = {};
                const r = this.getSourceBufferTypes();
                if (r.length) this.hls.trigger(p.BUFFER_CREATED, {
                    tracks: this.tracks
                }), r.forEach((a)=>{
                    t.executeNext(a);
                });
                else {
                    const a = new Error("could not create source buffer for media codec(s)");
                    this.hls.trigger(p.ERROR, {
                        type: G.MEDIA_ERROR,
                        details: A.BUFFER_INCOMPATIBLE_CODECS_ERROR,
                        fatal: !0,
                        error: a,
                        reason: a.message
                    });
                }
            }
        }
        createSourceBuffers(e) {
            const { sourceBuffer: t, mediaSource: s } = this;
            if (!s) throw Error("createSourceBuffers called when mediaSource was null");
            for(const r in e)if (!t[r]) {
                var i;
                const a = e[r];
                if (!a) throw Error(`source buffer exists for track ${r}, however track does not`);
                let o = ((i = a.levelCodec) == null ? void 0 : i.indexOf(",")) === -1 ? a.levelCodec : a.codec;
                o && r.slice(0, 5) === "audio" && (o = _s(o, this.appendSource));
                const l = `${a.container};codecs=${o}`;
                this.log(`creating sourceBuffer(${l})`);
                try {
                    const c = t[r] = s.addSourceBuffer(l), d = r;
                    this.addBufferListener(d, "updatestart", this._onSBUpdateStart), this.addBufferListener(d, "updateend", this._onSBUpdateEnd), this.addBufferListener(d, "error", this._onSBUpdateError), this.appendSource && this.addBufferListener(d, "bufferedchange", (u, h)=>{
                        const f = h.removedRanges;
                        f != null && f.length && this.hls.trigger(p.BUFFER_FLUSHED, {
                            type: r
                        });
                    }), this.tracks[r] = {
                        buffer: c,
                        codec: o,
                        container: a.container,
                        levelCodec: a.levelCodec,
                        metadata: a.metadata,
                        id: a.id
                    };
                } catch (c) {
                    this.error(`error while trying to add sourceBuffer: ${c.message}`), this.hls.trigger(p.ERROR, {
                        type: G.MEDIA_ERROR,
                        details: A.BUFFER_ADD_CODEC_ERROR,
                        fatal: !1,
                        error: c,
                        sourceBufferName: r,
                        mimeType: l
                    });
                }
            }
        }
        get mediaSrc() {
            var e;
            const t = ((e = this.media) == null ? void 0 : e.firstChild) || this.media;
            return t?.src;
        }
        _onSBUpdateStart(e) {
            const { operationQueue: t } = this;
            t.current(e).onStart();
        }
        _onSBUpdateEnd(e) {
            var t;
            if (((t = this.mediaSource) == null ? void 0 : t.readyState) === "closed") {
                this.resetBuffer(e);
                return;
            }
            const { operationQueue: s } = this;
            s.current(e).onComplete(), s.shiftAndExecuteNext(e);
        }
        _onSBUpdateError(e, t) {
            var s;
            const i = new Error(`${e} SourceBuffer error. MediaSource readyState: ${(s = this.mediaSource) == null ? void 0 : s.readyState}`);
            this.error(`${i}`, t), this.hls.trigger(p.ERROR, {
                type: G.MEDIA_ERROR,
                details: A.BUFFER_APPENDING_ERROR,
                sourceBufferName: e,
                error: i,
                fatal: !1
            });
            const r = this.operationQueue.current(e);
            r && r.onError(i);
        }
        removeExecutor(e, t, s) {
            const { media: i, mediaSource: r, operationQueue: a, sourceBuffer: o } = this, l = o[e];
            if (!i || !r || !l) {
                this.warn(`Attempting to remove from the ${e} SourceBuffer, but it does not exist`), a.shiftAndExecuteNext(e);
                return;
            }
            const c = M(i.duration) ? i.duration : 1 / 0, d = M(r.duration) ? r.duration : 1 / 0, u = Math.max(0, t), h = Math.min(s, c, d);
            h > u && (!l.ending || l.ended) ? (l.ended = !1, this.log(`Removing [${u},${h}] from the ${e} SourceBuffer`), l.remove(u, h)) : a.shiftAndExecuteNext(e);
        }
        appendExecutor(e, t) {
            const s = this.sourceBuffer[t];
            if (!s) {
                if (!this.pendingTracks[t]) throw new Error(`Attempting to append to the ${t} SourceBuffer, but it does not exist`);
                return;
            }
            s.ended = !1, s.appendBuffer(e);
        }
        blockBuffers(e, t = this.getSourceBufferTypes()) {
            if (!t.length) {
                this.log("Blocking operation requested, but no SourceBuffers exist"), Promise.resolve().then(e);
                return;
            }
            const { operationQueue: s } = this, i = t.map((r)=>s.appendBlocker(r));
            Promise.all(i).then(()=>{
                e(), t.forEach((r)=>{
                    const a = this.sourceBuffer[r];
                    a != null && a.updating || s.shiftAndExecuteNext(r);
                });
            });
        }
        getSourceBufferTypes() {
            return Object.keys(this.sourceBuffer);
        }
        addBufferListener(e, t, s) {
            const i = this.sourceBuffer[e];
            if (!i) return;
            const r = s.bind(this, e);
            this.listeners[e].push({
                event: t,
                listener: r
            }), i.addEventListener(t, r);
        }
        removeBufferListeners(e) {
            const t = this.sourceBuffer[e];
            t && this.listeners[e].forEach((s)=>{
                t.removeEventListener(s.event, s.listener);
            });
        }
    }
    function fr(n) {
        const e = n.querySelectorAll("source");
        [].slice.call(e).forEach((t)=>{
            n.removeChild(t);
        });
    }
    function td(n, e) {
        const t = self.document.createElement("source");
        t.type = "video/mp4", t.src = e, n.appendChild(t);
    }
    const sd = {
        42: 225,
        92: 233,
        94: 237,
        95: 243,
        96: 250,
        123: 231,
        124: 247,
        125: 209,
        126: 241,
        127: 9608,
        128: 174,
        129: 176,
        130: 189,
        131: 191,
        132: 8482,
        133: 162,
        134: 163,
        135: 9834,
        136: 224,
        137: 32,
        138: 232,
        139: 226,
        140: 234,
        141: 238,
        142: 244,
        143: 251,
        144: 193,
        145: 201,
        146: 211,
        147: 218,
        148: 220,
        149: 252,
        150: 8216,
        151: 161,
        152: 42,
        153: 8217,
        154: 9473,
        155: 169,
        156: 8480,
        157: 8226,
        158: 8220,
        159: 8221,
        160: 192,
        161: 194,
        162: 199,
        163: 200,
        164: 202,
        165: 203,
        166: 235,
        167: 206,
        168: 207,
        169: 239,
        170: 212,
        171: 217,
        172: 249,
        173: 219,
        174: 171,
        175: 187,
        176: 195,
        177: 227,
        178: 205,
        179: 204,
        180: 236,
        181: 210,
        182: 242,
        183: 213,
        184: 245,
        185: 123,
        186: 125,
        187: 92,
        188: 94,
        189: 95,
        190: 124,
        191: 8764,
        192: 196,
        193: 228,
        194: 214,
        195: 246,
        196: 223,
        197: 165,
        198: 164,
        199: 9475,
        200: 197,
        201: 229,
        202: 216,
        203: 248,
        204: 9487,
        205: 9491,
        206: 9495,
        207: 9499
    }, _a = (n)=>String.fromCharCode(sd[n] || n), ke = 15, qe = 100, id = {
        17: 1,
        18: 3,
        21: 5,
        22: 7,
        23: 9,
        16: 11,
        19: 12,
        20: 14
    }, nd = {
        17: 2,
        18: 4,
        21: 6,
        22: 8,
        23: 10,
        19: 13,
        20: 15
    }, rd = {
        25: 1,
        26: 3,
        29: 5,
        30: 7,
        31: 9,
        24: 11,
        27: 12,
        28: 14
    }, ad = {
        25: 2,
        26: 4,
        29: 6,
        30: 8,
        31: 10,
        27: 13,
        28: 15
    }, od = [
        "white",
        "green",
        "blue",
        "cyan",
        "red",
        "yellow",
        "magenta",
        "black",
        "transparent"
    ];
    class ld {
        constructor(){
            this.time = null, this.verboseLevel = 0;
        }
        log(e, t) {
            if (this.verboseLevel >= e) {
                const s = typeof t == "function" ? t() : t;
                S.log(`${this.time} [${e}] ${s}`);
            }
        }
    }
    const rt = function(e) {
        const t = [];
        for(let s = 0; s < e.length; s++)t.push(e[s].toString(16));
        return t;
    };
    class ka {
        constructor(){
            this.foreground = "white", this.underline = !1, this.italics = !1, this.background = "black", this.flash = !1;
        }
        reset() {
            this.foreground = "white", this.underline = !1, this.italics = !1, this.background = "black", this.flash = !1;
        }
        setStyles(e) {
            const t = [
                "foreground",
                "underline",
                "italics",
                "background",
                "flash"
            ];
            for(let s = 0; s < t.length; s++){
                const i = t[s];
                e.hasOwnProperty(i) && (this[i] = e[i]);
            }
        }
        isDefault() {
            return this.foreground === "white" && !this.underline && !this.italics && this.background === "black" && !this.flash;
        }
        equals(e) {
            return this.foreground === e.foreground && this.underline === e.underline && this.italics === e.italics && this.background === e.background && this.flash === e.flash;
        }
        copy(e) {
            this.foreground = e.foreground, this.underline = e.underline, this.italics = e.italics, this.background = e.background, this.flash = e.flash;
        }
        toString() {
            return "color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics + ", background=" + this.background + ", flash=" + this.flash;
        }
    }
    class cd {
        constructor(){
            this.uchar = " ", this.penState = new ka;
        }
        reset() {
            this.uchar = " ", this.penState.reset();
        }
        setChar(e, t) {
            this.uchar = e, this.penState.copy(t);
        }
        setPenState(e) {
            this.penState.copy(e);
        }
        equals(e) {
            return this.uchar === e.uchar && this.penState.equals(e.penState);
        }
        copy(e) {
            this.uchar = e.uchar, this.penState.copy(e.penState);
        }
        isEmpty() {
            return this.uchar === " " && this.penState.isDefault();
        }
    }
    class dd {
        constructor(e){
            this.chars = [], this.pos = 0, this.currPenState = new ka, this.cueStartTime = null, this.logger = void 0;
            for(let t = 0; t < qe; t++)this.chars.push(new cd);
            this.logger = e;
        }
        equals(e) {
            for(let t = 0; t < qe; t++)if (!this.chars[t].equals(e.chars[t])) return !1;
            return !0;
        }
        copy(e) {
            for(let t = 0; t < qe; t++)this.chars[t].copy(e.chars[t]);
        }
        isEmpty() {
            let e = !0;
            for(let t = 0; t < qe; t++)if (!this.chars[t].isEmpty()) {
                e = !1;
                break;
            }
            return e;
        }
        setCursor(e) {
            this.pos !== e && (this.pos = e), this.pos < 0 ? (this.logger.log(3, "Negative cursor position " + this.pos), this.pos = 0) : this.pos > qe && (this.logger.log(3, "Too large cursor position " + this.pos), this.pos = qe);
        }
        moveCursor(e) {
            const t = this.pos + e;
            if (e > 1) for(let s = this.pos + 1; s < t + 1; s++)this.chars[s].setPenState(this.currPenState);
            this.setCursor(t);
        }
        backSpace() {
            this.moveCursor(-1), this.chars[this.pos].setChar(" ", this.currPenState);
        }
        insertChar(e) {
            e >= 144 && this.backSpace();
            const t = _a(e);
            if (this.pos >= qe) {
                this.logger.log(0, ()=>"Cannot insert " + e.toString(16) + " (" + t + ") at position " + this.pos + ". Skipping it!");
                return;
            }
            this.chars[this.pos].setChar(t, this.currPenState), this.moveCursor(1);
        }
        clearFromPos(e) {
            let t;
            for(t = e; t < qe; t++)this.chars[t].reset();
        }
        clear() {
            this.clearFromPos(0), this.pos = 0, this.currPenState.reset();
        }
        clearToEndOfRow() {
            this.clearFromPos(this.pos);
        }
        getTextString() {
            const e = [];
            let t = !0;
            for(let s = 0; s < qe; s++){
                const i = this.chars[s].uchar;
                i !== " " && (t = !1), e.push(i);
            }
            return t ? "" : e.join("");
        }
        setPenStyles(e) {
            this.currPenState.setStyles(e), this.chars[this.pos].setPenState(this.currPenState);
        }
    }
    class fi {
        constructor(e){
            this.rows = [], this.currRow = ke - 1, this.nrRollUpRows = null, this.lastOutputScreen = null, this.logger = void 0;
            for(let t = 0; t < ke; t++)this.rows.push(new dd(e));
            this.logger = e;
        }
        reset() {
            for(let e = 0; e < ke; e++)this.rows[e].clear();
            this.currRow = ke - 1;
        }
        equals(e) {
            let t = !0;
            for(let s = 0; s < ke; s++)if (!this.rows[s].equals(e.rows[s])) {
                t = !1;
                break;
            }
            return t;
        }
        copy(e) {
            for(let t = 0; t < ke; t++)this.rows[t].copy(e.rows[t]);
        }
        isEmpty() {
            let e = !0;
            for(let t = 0; t < ke; t++)if (!this.rows[t].isEmpty()) {
                e = !1;
                break;
            }
            return e;
        }
        backSpace() {
            this.rows[this.currRow].backSpace();
        }
        clearToEndOfRow() {
            this.rows[this.currRow].clearToEndOfRow();
        }
        insertChar(e) {
            this.rows[this.currRow].insertChar(e);
        }
        setPen(e) {
            this.rows[this.currRow].setPenStyles(e);
        }
        moveCursor(e) {
            this.rows[this.currRow].moveCursor(e);
        }
        setCursor(e) {
            this.logger.log(2, "setCursor: " + e), this.rows[this.currRow].setCursor(e);
        }
        setPAC(e) {
            this.logger.log(2, ()=>"pacData = " + JSON.stringify(e));
            let t = e.row - 1;
            if (this.nrRollUpRows && t < this.nrRollUpRows - 1 && (t = this.nrRollUpRows - 1), this.nrRollUpRows && this.currRow !== t) {
                for(let o = 0; o < ke; o++)this.rows[o].clear();
                const r = this.currRow + 1 - this.nrRollUpRows, a = this.lastOutputScreen;
                if (a) {
                    const o = a.rows[r].cueStartTime, l = this.logger.time;
                    if (o !== null && l !== null && o < l) for(let c = 0; c < this.nrRollUpRows; c++)this.rows[t - this.nrRollUpRows + c + 1].copy(a.rows[r + c]);
                }
            }
            this.currRow = t;
            const s = this.rows[this.currRow];
            if (e.indent !== null) {
                const r = e.indent, a = Math.max(r - 1, 0);
                s.setCursor(e.indent), e.color = s.chars[a].penState.foreground;
            }
            const i = {
                foreground: e.color,
                underline: e.underline,
                italics: e.italics,
                background: "black",
                flash: !1
            };
            this.setPen(i);
        }
        setBkgData(e) {
            this.logger.log(2, ()=>"bkgData = " + JSON.stringify(e)), this.backSpace(), this.setPen(e), this.insertChar(32);
        }
        setRollUpRows(e) {
            this.nrRollUpRows = e;
        }
        rollUp() {
            if (this.nrRollUpRows === null) {
                this.logger.log(3, "roll_up but nrRollUpRows not set yet");
                return;
            }
            this.logger.log(1, ()=>this.getDisplayText());
            const e = this.currRow + 1 - this.nrRollUpRows, t = this.rows.splice(e, 1)[0];
            t.clear(), this.rows.splice(this.currRow, 0, t), this.logger.log(2, "Rolling up");
        }
        getDisplayText(e) {
            e = e || !1;
            const t = [];
            let s = "", i = -1;
            for(let r = 0; r < ke; r++){
                const a = this.rows[r].getTextString();
                a && (i = r + 1, e ? t.push("Row " + i + ": '" + a + "'") : t.push(a.trim()));
            }
            return t.length > 0 && (e ? s = "[" + t.join(" | ") + "]" : s = t.join(`
`)), s;
        }
        getTextAndFormat() {
            return this.rows;
        }
    }
    class gr {
        constructor(e, t, s){
            this.chNr = void 0, this.outputFilter = void 0, this.mode = void 0, this.verbose = void 0, this.displayedMemory = void 0, this.nonDisplayedMemory = void 0, this.lastOutputScreen = void 0, this.currRollUpRow = void 0, this.writeScreen = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chNr = e, this.outputFilter = t, this.mode = null, this.verbose = 0, this.displayedMemory = new fi(s), this.nonDisplayedMemory = new fi(s), this.lastOutputScreen = new fi(s), this.currRollUpRow = this.displayedMemory.rows[ke - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null, this.logger = s;
        }
        reset() {
            this.mode = null, this.displayedMemory.reset(), this.nonDisplayedMemory.reset(), this.lastOutputScreen.reset(), this.outputFilter.reset(), this.currRollUpRow = this.displayedMemory.rows[ke - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null;
        }
        getHandler() {
            return this.outputFilter;
        }
        setHandler(e) {
            this.outputFilter = e;
        }
        setPAC(e) {
            this.writeScreen.setPAC(e);
        }
        setBkgData(e) {
            this.writeScreen.setBkgData(e);
        }
        setMode(e) {
            e !== this.mode && (this.mode = e, this.logger.log(2, ()=>"MODE=" + e), this.mode === "MODE_POP-ON" ? this.writeScreen = this.nonDisplayedMemory : (this.writeScreen = this.displayedMemory, this.writeScreen.reset()), this.mode !== "MODE_ROLL-UP" && (this.displayedMemory.nrRollUpRows = null, this.nonDisplayedMemory.nrRollUpRows = null), this.mode = e);
        }
        insertChars(e) {
            for(let s = 0; s < e.length; s++)this.writeScreen.insertChar(e[s]);
            const t = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
            this.logger.log(2, ()=>t + ": " + this.writeScreen.getDisplayText(!0)), (this.mode === "MODE_PAINT-ON" || this.mode === "MODE_ROLL-UP") && (this.logger.log(1, ()=>"DISPLAYED: " + this.displayedMemory.getDisplayText(!0)), this.outputDataUpdate());
        }
        ccRCL() {
            this.logger.log(2, "RCL - Resume Caption Loading"), this.setMode("MODE_POP-ON");
        }
        ccBS() {
            this.logger.log(2, "BS - BackSpace"), this.mode !== "MODE_TEXT" && (this.writeScreen.backSpace(), this.writeScreen === this.displayedMemory && this.outputDataUpdate());
        }
        ccAOF() {}
        ccAON() {}
        ccDER() {
            this.logger.log(2, "DER- Delete to End of Row"), this.writeScreen.clearToEndOfRow(), this.outputDataUpdate();
        }
        ccRU(e) {
            this.logger.log(2, "RU(" + e + ") - Roll Up"), this.writeScreen = this.displayedMemory, this.setMode("MODE_ROLL-UP"), this.writeScreen.setRollUpRows(e);
        }
        ccFON() {
            this.logger.log(2, "FON - Flash On"), this.writeScreen.setPen({
                flash: !0
            });
        }
        ccRDC() {
            this.logger.log(2, "RDC - Resume Direct Captioning"), this.setMode("MODE_PAINT-ON");
        }
        ccTR() {
            this.logger.log(2, "TR"), this.setMode("MODE_TEXT");
        }
        ccRTD() {
            this.logger.log(2, "RTD"), this.setMode("MODE_TEXT");
        }
        ccEDM() {
            this.logger.log(2, "EDM - Erase Displayed Memory"), this.displayedMemory.reset(), this.outputDataUpdate(!0);
        }
        ccCR() {
            this.logger.log(2, "CR - Carriage Return"), this.writeScreen.rollUp(), this.outputDataUpdate(!0);
        }
        ccENM() {
            this.logger.log(2, "ENM - Erase Non-displayed Memory"), this.nonDisplayedMemory.reset();
        }
        ccEOC() {
            if (this.logger.log(2, "EOC - End Of Caption"), this.mode === "MODE_POP-ON") {
                const e = this.displayedMemory;
                this.displayedMemory = this.nonDisplayedMemory, this.nonDisplayedMemory = e, this.writeScreen = this.nonDisplayedMemory, this.logger.log(1, ()=>"DISP: " + this.displayedMemory.getDisplayText());
            }
            this.outputDataUpdate(!0);
        }
        ccTO(e) {
            this.logger.log(2, "TO(" + e + ") - Tab Offset"), this.writeScreen.moveCursor(e);
        }
        ccMIDROW(e) {
            const t = {
                flash: !1
            };
            if (t.underline = e % 2 === 1, t.italics = e >= 46, t.italics) t.foreground = "white";
            else {
                const s = Math.floor(e / 2) - 16, i = [
                    "white",
                    "green",
                    "blue",
                    "cyan",
                    "red",
                    "yellow",
                    "magenta"
                ];
                t.foreground = i[s];
            }
            this.logger.log(2, "MIDROW: " + JSON.stringify(t)), this.writeScreen.setPen(t);
        }
        outputDataUpdate(e = !1) {
            const t = this.logger.time;
            t !== null && this.outputFilter && (this.cueStartTime === null && !this.displayedMemory.isEmpty() ? this.cueStartTime = t : this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue(this.cueStartTime, t, this.lastOutputScreen), e && this.outputFilter.dispatchCue && this.outputFilter.dispatchCue(), this.cueStartTime = this.displayedMemory.isEmpty() ? null : t), this.lastOutputScreen.copy(this.displayedMemory));
        }
        cueSplitAtTime(e) {
            this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, e, this.displayedMemory), this.cueStartTime = e));
        }
    }
    class mr {
        constructor(e, t, s){
            this.channels = void 0, this.currentChannel = 0, this.cmdHistory = hd(), this.logger = void 0;
            const i = this.logger = new ld;
            this.channels = [
                null,
                new gr(e, t, i),
                new gr(e + 1, s, i)
            ];
        }
        getHandler(e) {
            return this.channels[e].getHandler();
        }
        setHandler(e, t) {
            this.channels[e].setHandler(t);
        }
        addData(e, t) {
            this.logger.time = e;
            for(let s = 0; s < t.length; s += 2){
                const i = t[s] & 127, r = t[s + 1] & 127;
                let a = !1, o = null;
                if (i === 0 && r === 0) continue;
                this.logger.log(3, ()=>"[" + rt([
                        t[s],
                        t[s + 1]
                    ]) + "] -> (" + rt([
                        i,
                        r
                    ]) + ")");
                const l = this.cmdHistory;
                if (i >= 16 && i <= 31) {
                    if (ud(i, r, l)) {
                        as(null, null, l), this.logger.log(3, ()=>"Repeated command (" + rt([
                                i,
                                r
                            ]) + ") is dropped");
                        continue;
                    }
                    as(i, r, this.cmdHistory), a = this.parseCmd(i, r), a || (a = this.parseMidrow(i, r)), a || (a = this.parsePAC(i, r)), a || (a = this.parseBackgroundAttributes(i, r));
                } else as(null, null, l);
                if (!a && (o = this.parseChars(i, r), o)) {
                    const d = this.currentChannel;
                    d && d > 0 ? this.channels[d].insertChars(o) : this.logger.log(2, "No channel found yet. TEXT-MODE?");
                }
                !a && !o && this.logger.log(2, ()=>"Couldn't parse cleaned data " + rt([
                        i,
                        r
                    ]) + " orig: " + rt([
                        t[s],
                        t[s + 1]
                    ]));
            }
        }
        parseCmd(e, t) {
            const s = (e === 20 || e === 28 || e === 21 || e === 29) && t >= 32 && t <= 47, i = (e === 23 || e === 31) && t >= 33 && t <= 35;
            if (!(s || i)) return !1;
            const r = e === 20 || e === 21 || e === 23 ? 1 : 2, a = this.channels[r];
            return e === 20 || e === 21 || e === 28 || e === 29 ? t === 32 ? a.ccRCL() : t === 33 ? a.ccBS() : t === 34 ? a.ccAOF() : t === 35 ? a.ccAON() : t === 36 ? a.ccDER() : t === 37 ? a.ccRU(2) : t === 38 ? a.ccRU(3) : t === 39 ? a.ccRU(4) : t === 40 ? a.ccFON() : t === 41 ? a.ccRDC() : t === 42 ? a.ccTR() : t === 43 ? a.ccRTD() : t === 44 ? a.ccEDM() : t === 45 ? a.ccCR() : t === 46 ? a.ccENM() : t === 47 && a.ccEOC() : a.ccTO(t - 32), this.currentChannel = r, !0;
        }
        parseMidrow(e, t) {
            let s = 0;
            if ((e === 17 || e === 25) && t >= 32 && t <= 47) {
                if (e === 17 ? s = 1 : s = 2, s !== this.currentChannel) return this.logger.log(0, "Mismatch channel in midrow parsing"), !1;
                const i = this.channels[s];
                return i ? (i.ccMIDROW(t), this.logger.log(3, ()=>"MIDROW (" + rt([
                        e,
                        t
                    ]) + ")"), !0) : !1;
            }
            return !1;
        }
        parsePAC(e, t) {
            let s;
            const i = (e >= 17 && e <= 23 || e >= 25 && e <= 31) && t >= 64 && t <= 127, r = (e === 16 || e === 24) && t >= 64 && t <= 95;
            if (!(i || r)) return !1;
            const a = e <= 23 ? 1 : 2;
            t >= 64 && t <= 95 ? s = a === 1 ? id[e] : rd[e] : s = a === 1 ? nd[e] : ad[e];
            const o = this.channels[a];
            return o ? (o.setPAC(this.interpretPAC(s, t)), this.currentChannel = a, !0) : !1;
        }
        interpretPAC(e, t) {
            let s;
            const i = {
                color: null,
                italics: !1,
                indent: null,
                underline: !1,
                row: e
            };
            return t > 95 ? s = t - 96 : s = t - 64, i.underline = (s & 1) === 1, s <= 13 ? i.color = [
                "white",
                "green",
                "blue",
                "cyan",
                "red",
                "yellow",
                "magenta",
                "white"
            ][Math.floor(s / 2)] : s <= 15 ? (i.italics = !0, i.color = "white") : i.indent = Math.floor((s - 16) / 2) * 4, i;
        }
        parseChars(e, t) {
            let s, i = null, r = null;
            if (e >= 25 ? (s = 2, r = e - 8) : (s = 1, r = e), r >= 17 && r <= 19) {
                let a;
                r === 17 ? a = t + 80 : r === 18 ? a = t + 112 : a = t + 144, this.logger.log(2, ()=>"Special char '" + _a(a) + "' in channel " + s), i = [
                    a
                ];
            } else e >= 32 && e <= 127 && (i = t === 0 ? [
                e
            ] : [
                e,
                t
            ]);
            return i && this.logger.log(3, ()=>"Char codes =  " + rt(i).join(",")), i;
        }
        parseBackgroundAttributes(e, t) {
            const s = (e === 16 || e === 24) && t >= 32 && t <= 47, i = (e === 23 || e === 31) && t >= 45 && t <= 47;
            if (!(s || i)) return !1;
            let r;
            const a = {};
            e === 16 || e === 24 ? (r = Math.floor((t - 32) / 2), a.background = od[r], t % 2 === 1 && (a.background = a.background + "_semi")) : t === 45 ? a.background = "transparent" : (a.foreground = "black", t === 47 && (a.underline = !0));
            const o = e <= 23 ? 1 : 2;
            return this.channels[o].setBkgData(a), !0;
        }
        reset() {
            for(let e = 0; e < Object.keys(this.channels).length; e++){
                const t = this.channels[e];
                t && t.reset();
            }
            as(null, null, this.cmdHistory);
        }
        cueSplitAtTime(e) {
            for(let t = 0; t < this.channels.length; t++){
                const s = this.channels[t];
                s && s.cueSplitAtTime(e);
            }
        }
    }
    function as(n, e, t) {
        t.a = n, t.b = e;
    }
    function ud(n, e, t) {
        return t.a === n && t.b === e;
    }
    function hd() {
        return {
            a: null,
            b: null
        };
    }
    class os {
        constructor(e, t){
            this.timelineController = void 0, this.cueRanges = [], this.trackName = void 0, this.startTime = null, this.endTime = null, this.screen = null, this.timelineController = e, this.trackName = t;
        }
        dispatchCue() {
            this.startTime !== null && (this.timelineController.addCues(this.trackName, this.startTime, this.endTime, this.screen, this.cueRanges), this.startTime = null);
        }
        newCue(e, t, s) {
            (this.startTime === null || this.startTime > e) && (this.startTime = e), this.endTime = t, this.screen = s, this.timelineController.createCaptionsTrack(this.trackName);
        }
        reset() {
            this.cueRanges = [], this.startTime = null;
        }
    }
    var mn = function() {
        if (It != null && It.VTTCue) return self.VTTCue;
        const n = [
            "",
            "lr",
            "rl"
        ], e = [
            "start",
            "middle",
            "end",
            "left",
            "right"
        ];
        function t(o, l) {
            if (typeof l != "string" || !Array.isArray(o)) return !1;
            const c = l.toLowerCase();
            return ~o.indexOf(c) ? c : !1;
        }
        function s(o) {
            return t(n, o);
        }
        function i(o) {
            return t(e, o);
        }
        function r(o, ...l) {
            let c = 1;
            for(; c < arguments.length; c++){
                const d = arguments[c];
                for(const u in d)o[u] = d[u];
            }
            return o;
        }
        function a(o, l, c) {
            const d = this, u = {
                enumerable: !0
            };
            d.hasBeenReset = !1;
            let h = "", f = !1, g = o, m = l, y = c, E = null, x = "", T = !0, R = "auto", v = "start", D = 50, b = "middle", w = 50, P = "middle";
            Object.defineProperty(d, "id", r({}, u, {
                get: function() {
                    return h;
                },
                set: function(I) {
                    h = "" + I;
                }
            })), Object.defineProperty(d, "pauseOnExit", r({}, u, {
                get: function() {
                    return f;
                },
                set: function(I) {
                    f = !!I;
                }
            })), Object.defineProperty(d, "startTime", r({}, u, {
                get: function() {
                    return g;
                },
                set: function(I) {
                    if (typeof I != "number") throw new TypeError("Start time must be set to a number.");
                    g = I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(d, "endTime", r({}, u, {
                get: function() {
                    return m;
                },
                set: function(I) {
                    if (typeof I != "number") throw new TypeError("End time must be set to a number.");
                    m = I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(d, "text", r({}, u, {
                get: function() {
                    return y;
                },
                set: function(I) {
                    y = "" + I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(d, "region", r({}, u, {
                get: function() {
                    return E;
                },
                set: function(I) {
                    E = I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(d, "vertical", r({}, u, {
                get: function() {
                    return x;
                },
                set: function(I) {
                    const _ = s(I);
                    if (_ === !1) throw new SyntaxError("An invalid or illegal string was specified.");
                    x = _, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(d, "snapToLines", r({}, u, {
                get: function() {
                    return T;
                },
                set: function(I) {
                    T = !!I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(d, "line", r({}, u, {
                get: function() {
                    return R;
                },
                set: function(I) {
                    if (typeof I != "number" && I !== "auto") throw new SyntaxError("An invalid number or illegal string was specified.");
                    R = I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(d, "lineAlign", r({}, u, {
                get: function() {
                    return v;
                },
                set: function(I) {
                    const _ = i(I);
                    if (!_) throw new SyntaxError("An invalid or illegal string was specified.");
                    v = _, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(d, "position", r({}, u, {
                get: function() {
                    return D;
                },
                set: function(I) {
                    if (I < 0 || I > 100) throw new Error("Position must be between 0 and 100.");
                    D = I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(d, "positionAlign", r({}, u, {
                get: function() {
                    return b;
                },
                set: function(I) {
                    const _ = i(I);
                    if (!_) throw new SyntaxError("An invalid or illegal string was specified.");
                    b = _, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(d, "size", r({}, u, {
                get: function() {
                    return w;
                },
                set: function(I) {
                    if (I < 0 || I > 100) throw new Error("Size must be between 0 and 100.");
                    w = I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(d, "align", r({}, u, {
                get: function() {
                    return P;
                },
                set: function(I) {
                    const _ = i(I);
                    if (!_) throw new SyntaxError("An invalid or illegal string was specified.");
                    P = _, this.hasBeenReset = !0;
                }
            })), d.displayState = void 0;
        }
        return a.prototype.getCueAsHTML = function() {
            return self.WebVTT.convertCueToDOMTree(self, this.text);
        }, a;
    }();
    class fd {
        decode(e, t) {
            if (!e) return "";
            if (typeof e != "string") throw new Error("Error - expected string data.");
            return decodeURIComponent(encodeURIComponent(e));
        }
    }
    function Pa(n) {
        function e(s, i, r, a) {
            return (s | 0) * 3600 + (i | 0) * 60 + (r | 0) + parseFloat(a || 0);
        }
        const t = n.match(/^(?:(\d+):)?(\d{2}):(\d{2})(\.\d+)?/);
        return t ? parseFloat(t[2]) > 59 ? e(t[2], t[3], 0, t[4]) : e(t[1], t[2], t[3], t[4]) : null;
    }
    class gd {
        constructor(){
            this.values = Object.create(null);
        }
        set(e, t) {
            !this.get(e) && t !== "" && (this.values[e] = t);
        }
        get(e, t, s) {
            return s ? this.has(e) ? this.values[e] : t[s] : this.has(e) ? this.values[e] : t;
        }
        has(e) {
            return e in this.values;
        }
        alt(e, t, s) {
            for(let i = 0; i < s.length; ++i)if (t === s[i]) {
                this.set(e, t);
                break;
            }
        }
        integer(e, t) {
            /^-?\d+$/.test(t) && this.set(e, parseInt(t, 10));
        }
        percent(e, t) {
            if (/^([\d]{1,3})(\.[\d]*)?%$/.test(t)) {
                const s = parseFloat(t);
                if (s >= 0 && s <= 100) return this.set(e, s), !0;
            }
            return !1;
        }
    }
    function Fa(n, e, t, s) {
        const i = s ? n.split(s) : [
            n
        ];
        for(const r in i){
            if (typeof i[r] != "string") continue;
            const a = i[r].split(t);
            if (a.length !== 2) continue;
            const o = a[0], l = a[1];
            e(o, l);
        }
    }
    const Gi = new mn(0, 0, ""), ls = Gi.align === "middle" ? "middle" : "center";
    function md(n, e, t) {
        const s = n;
        function i() {
            const o = Pa(n);
            if (o === null) throw new Error("Malformed timestamp: " + s);
            return n = n.replace(/^[^\sa-zA-Z-]+/, ""), o;
        }
        function r(o, l) {
            const c = new gd;
            Fa(o, function(h, f) {
                let g;
                switch(h){
                    case "region":
                        for(let m = t.length - 1; m >= 0; m--)if (t[m].id === f) {
                            c.set(h, t[m].region);
                            break;
                        }
                        break;
                    case "vertical":
                        c.alt(h, f, [
                            "rl",
                            "lr"
                        ]);
                        break;
                    case "line":
                        g = f.split(","), c.integer(h, g[0]), c.percent(h, g[0]) && c.set("snapToLines", !1), c.alt(h, g[0], [
                            "auto"
                        ]), g.length === 2 && c.alt("lineAlign", g[1], [
                            "start",
                            ls,
                            "end"
                        ]);
                        break;
                    case "position":
                        g = f.split(","), c.percent(h, g[0]), g.length === 2 && c.alt("positionAlign", g[1], [
                            "start",
                            ls,
                            "end",
                            "line-left",
                            "line-right",
                            "auto"
                        ]);
                        break;
                    case "size":
                        c.percent(h, f);
                        break;
                    case "align":
                        c.alt(h, f, [
                            "start",
                            ls,
                            "end",
                            "left",
                            "right"
                        ]);
                        break;
                }
            }, /:/, /\s/), l.region = c.get("region", null), l.vertical = c.get("vertical", "");
            let d = c.get("line", "auto");
            d === "auto" && Gi.line === -1 && (d = -1), l.line = d, l.lineAlign = c.get("lineAlign", "start"), l.snapToLines = c.get("snapToLines", !0), l.size = c.get("size", 100), l.align = c.get("align", ls);
            let u = c.get("position", "auto");
            u === "auto" && Gi.position === 50 && (u = l.align === "start" || l.align === "left" ? 0 : l.align === "end" || l.align === "right" ? 100 : 50), l.position = u;
        }
        function a() {
            n = n.replace(/^\s+/, "");
        }
        if (a(), e.startTime = i(), a(), n.slice(0, 3) !== "-->") throw new Error("Malformed time stamp (time stamps must be separated by '-->'): " + s);
        n = n.slice(3), a(), e.endTime = i(), a(), r(n, e);
    }
    function Oa(n) {
        return n.replace(/<br(?: \/)?>/gi, `
`);
    }
    class pd {
        constructor(){
            this.state = "INITIAL", this.buffer = "", this.decoder = new fd, this.regionList = [], this.cue = null, this.oncue = void 0, this.onparsingerror = void 0, this.onflush = void 0;
        }
        parse(e) {
            const t = this;
            e && (t.buffer += t.decoder.decode(e, {
                stream: !0
            }));
            function s() {
                let r = t.buffer, a = 0;
                for(r = Oa(r); a < r.length && r[a] !== "\r" && r[a] !== `
`;)++a;
                const o = r.slice(0, a);
                return r[a] === "\r" && ++a, r[a] === `
` && ++a, t.buffer = r.slice(a), o;
            }
            function i(r) {
                Fa(r, function(a, o) {}, /:/);
            }
            try {
                let r = "";
                if (t.state === "INITIAL") {
                    if (!/\r\n|\n/.test(t.buffer)) return this;
                    r = s();
                    const o = r.match(/^(ï»¿)?WEBVTT([ \t].*)?$/);
                    if (!(o != null && o[0])) throw new Error("Malformed WebVTT signature.");
                    t.state = "HEADER";
                }
                let a = !1;
                for(; t.buffer;){
                    if (!/\r\n|\n/.test(t.buffer)) return this;
                    switch(a ? a = !1 : r = s(), t.state){
                        case "HEADER":
                            /:/.test(r) ? i(r) : r || (t.state = "ID");
                            continue;
                        case "NOTE":
                            r || (t.state = "ID");
                            continue;
                        case "ID":
                            if (/^NOTE($|[ \t])/.test(r)) {
                                t.state = "NOTE";
                                break;
                            }
                            if (!r) continue;
                            if (t.cue = new mn(0, 0, ""), t.state = "CUE", r.indexOf("-->") === -1) {
                                t.cue.id = r;
                                continue;
                            }
                        case "CUE":
                            if (!t.cue) {
                                t.state = "BADCUE";
                                continue;
                            }
                            try {
                                md(r, t.cue, t.regionList);
                            } catch  {
                                t.cue = null, t.state = "BADCUE";
                                continue;
                            }
                            t.state = "CUETEXT";
                            continue;
                        case "CUETEXT":
                            {
                                const o = r.indexOf("-->") !== -1;
                                if (!r || o && (a = !0)) {
                                    t.oncue && t.cue && t.oncue(t.cue), t.cue = null, t.state = "ID";
                                    continue;
                                }
                                if (t.cue === null) continue;
                                t.cue.text && (t.cue.text += `
`), t.cue.text += r;
                            }
                            continue;
                        case "BADCUE":
                            r || (t.state = "ID");
                    }
                }
            } catch  {
                t.state === "CUETEXT" && t.cue && t.oncue && t.oncue(t.cue), t.cue = null, t.state = t.state === "INITIAL" ? "BADWEBVTT" : "BADCUE";
            }
            return this;
        }
        flush() {
            const e = this;
            try {
                if ((e.cue || e.state === "HEADER") && (e.buffer += `

`, e.parse()), e.state === "INITIAL" || e.state === "BADWEBVTT") throw new Error("Malformed WebVTT signature.");
            } catch (t) {
                e.onparsingerror && e.onparsingerror(t);
            }
            return e.onflush && e.onflush(), this;
        }
    }
    const yd = /\r\n|\n\r|\n|\r/g, gi = function(e, t, s = 0) {
        return e.slice(s, s + t.length) === t;
    }, Ed = function(e) {
        let t = parseInt(e.slice(-3));
        const s = parseInt(e.slice(-6, -4)), i = parseInt(e.slice(-9, -7)), r = e.length > 9 ? parseInt(e.substring(0, e.indexOf(":"))) : 0;
        if (!M(t) || !M(s) || !M(i) || !M(r)) throw Error(`Malformed X-TIMESTAMP-MAP: Local:${e}`);
        return t += 1e3 * s, t += 60 * 1e3 * i, t += 60 * 60 * 1e3 * r, t;
    }, mi = function(e) {
        let t = 5381, s = e.length;
        for(; s;)t = t * 33 ^ e.charCodeAt(--s);
        return (t >>> 0).toString();
    };
    function pn(n, e, t) {
        return mi(n.toString()) + mi(e.toString()) + mi(t);
    }
    const Td = function(e, t, s) {
        let i = e[t], r = e[i.prevCC];
        if (!r || !r.new && i.new) {
            e.ccOffset = e.presentationOffset = i.start, i.new = !1;
            return;
        }
        for(; (a = r) != null && a.new;){
            var a;
            e.ccOffset += i.start - r.start, i.new = !1, i = r, r = e[i.prevCC];
        }
        e.presentationOffset = s;
    };
    function xd(n, e, t, s, i, r, a) {
        const o = new pd, l = He(new Uint8Array(n)).trim().replace(yd, `
`).split(`
`), c = [], d = e ? Nc(e.baseTime, e.timescale) : 0;
        let u = "00:00.000", h = 0, f = 0, g, m = !0;
        o.oncue = function(y) {
            const E = t[s];
            let x = t.ccOffset;
            const T = (h - d) / 9e4;
            if (E != null && E.new && (f !== void 0 ? x = t.ccOffset = E.start : Td(t, s, T)), T) {
                if (!e) {
                    g = new Error("Missing initPTS for VTT MPEGTS");
                    return;
                }
                x = T - t.presentationOffset;
            }
            const R = y.endTime - y.startTime, v = Ae((y.startTime + x - f) * 9e4, i * 9e4) / 9e4;
            y.startTime = Math.max(v, 0), y.endTime = Math.max(v + R, 0);
            const D = y.text.trim();
            y.text = decodeURIComponent(encodeURIComponent(D)), y.id || (y.id = pn(y.startTime, y.endTime, D)), y.endTime > 0 && c.push(y);
        }, o.onparsingerror = function(y) {
            g = y;
        }, o.onflush = function() {
            if (g) {
                a(g);
                return;
            }
            r(c);
        }, l.forEach((y)=>{
            if (m) if (gi(y, "X-TIMESTAMP-MAP=")) {
                m = !1, y.slice(16).split(",").forEach((E)=>{
                    gi(E, "LOCAL:") ? u = E.slice(6) : gi(E, "MPEGTS:") && (h = parseInt(E.slice(7)));
                });
                try {
                    f = Ed(u) / 1e3;
                } catch (E) {
                    g = E;
                }
                return;
            } else y === "" && (m = !1);
            o.parse(y + `
`);
        }), o.flush();
    }
    const pi = "stpp.ttml.im1t", Ma = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/, Na = /^(\d*(?:\.\d*)?)(h|m|s|ms|f|t)$/, vd = {
        left: "start",
        center: "center",
        right: "end",
        start: "start",
        end: "end"
    };
    function pr(n, e, t, s) {
        const i = W(new Uint8Array(n), [
            "mdat"
        ]);
        if (i.length === 0) {
            s(new Error("Could not parse IMSC1 mdat"));
            return;
        }
        const r = i.map((o)=>He(o)), a = Mc(e.baseTime, 1, e.timescale);
        try {
            r.forEach((o)=>t(Sd(o, a)));
        } catch (o) {
            s(o);
        }
    }
    function Sd(n, e) {
        const i = new DOMParser().parseFromString(n, "text/xml").getElementsByTagName("tt")[0];
        if (!i) throw new Error("Invalid ttml");
        const r = {
            frameRate: 30,
            subFrameRate: 1,
            frameRateMultiplier: 0,
            tickRate: 0
        }, a = Object.keys(r).reduce((u, h)=>(u[h] = i.getAttribute(`ttp:${h}`) || r[h], u), {}), o = i.getAttribute("xml:space") !== "preserve", l = yr(yi(i, "styling", "style")), c = yr(yi(i, "layout", "region")), d = yi(i, "body", "[begin]");
        return [].map.call(d, (u)=>{
            const h = Ua(u, o);
            if (!h || !u.hasAttribute("begin")) return null;
            const f = Ti(u.getAttribute("begin"), a), g = Ti(u.getAttribute("dur"), a);
            let m = Ti(u.getAttribute("end"), a);
            if (f === null) throw Er(u);
            if (m === null) {
                if (g === null) throw Er(u);
                m = f + g;
            }
            const y = new mn(f - e, m - e, h);
            y.id = pn(y.startTime, y.endTime, y.text);
            const E = c[u.getAttribute("region")], x = l[u.getAttribute("style")], T = Ld(E, x, l), { textAlign: R } = T;
            if (R) {
                const v = vd[R];
                v && (y.lineAlign = v), y.align = R;
            }
            return re(y, T), y;
        }).filter((u)=>u !== null);
    }
    function yi(n, e, t) {
        const s = n.getElementsByTagName(e)[0];
        return s ? [].slice.call(s.querySelectorAll(t)) : [];
    }
    function yr(n) {
        return n.reduce((e, t)=>{
            const s = t.getAttribute("xml:id");
            return s && (e[s] = t), e;
        }, {});
    }
    function Ua(n, e) {
        return [].slice.call(n.childNodes).reduce((t, s, i)=>{
            var r;
            return s.nodeName === "br" && i ? t + `
` : (r = s.childNodes) != null && r.length ? Ua(s, e) : e ? t + s.textContent.trim().replace(/\s+/g, " ") : t + s.textContent;
        }, "");
    }
    function Ld(n, e, t) {
        const s = "http://www.w3.org/ns/ttml#styling";
        let i = null;
        const r = [
            "displayAlign",
            "textAlign",
            "color",
            "backgroundColor",
            "fontSize",
            "fontFamily"
        ], a = n != null && n.hasAttribute("style") ? n.getAttribute("style") : null;
        return a && t.hasOwnProperty(a) && (i = t[a]), r.reduce((o, l)=>{
            const c = Ei(e, s, l) || Ei(n, s, l) || Ei(i, s, l);
            return c && (o[l] = c), o;
        }, {});
    }
    function Ei(n, e, t) {
        return n && n.hasAttributeNS(e, t) ? n.getAttributeNS(e, t) : null;
    }
    function Er(n) {
        return new Error(`Could not parse ttml timestamp ${n}`);
    }
    function Ti(n, e) {
        if (!n) return null;
        let t = Pa(n);
        return t === null && (Ma.test(n) ? t = Ad(n, e) : Na.test(n) && (t = bd(n, e))), t;
    }
    function Ad(n, e) {
        const t = Ma.exec(n), s = (t[4] | 0) + (t[5] | 0) / e.subFrameRate;
        return (t[1] | 0) * 3600 + (t[2] | 0) * 60 + (t[3] | 0) + s / e.frameRate;
    }
    function bd(n, e) {
        const t = Na.exec(n), s = Number(t[1]);
        switch(t[2]){
            case "h":
                return s * 3600;
            case "m":
                return s * 60;
            case "ms":
                return s * 1e3;
            case "f":
                return s / e.frameRate;
            case "t":
                return s / e.tickRate;
        }
        return s;
    }
    class Rd {
        constructor(e){
            this.hls = void 0, this.media = null, this.config = void 0, this.enabled = !0, this.Cues = void 0, this.textTracks = [], this.tracks = [], this.initPTS = [], this.unparsedVttFrags = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.cea608Parser1 = void 0, this.cea608Parser2 = void 0, this.lastCc = -1, this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = xr(), this.captionsProperties = void 0, this.hls = e, this.config = e.config, this.Cues = e.config.cueHandler, this.captionsProperties = {
                textTrack1: {
                    label: this.config.captionsTextTrack1Label,
                    languageCode: this.config.captionsTextTrack1LanguageCode
                },
                textTrack2: {
                    label: this.config.captionsTextTrack2Label,
                    languageCode: this.config.captionsTextTrack2LanguageCode
                },
                textTrack3: {
                    label: this.config.captionsTextTrack3Label,
                    languageCode: this.config.captionsTextTrack3LanguageCode
                },
                textTrack4: {
                    label: this.config.captionsTextTrack4Label,
                    languageCode: this.config.captionsTextTrack4LanguageCode
                }
            }, e.on(p.MEDIA_ATTACHING, this.onMediaAttaching, this), e.on(p.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(p.MANIFEST_LOADING, this.onManifestLoading, this), e.on(p.MANIFEST_LOADED, this.onManifestLoaded, this), e.on(p.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), e.on(p.FRAG_LOADING, this.onFragLoading, this), e.on(p.FRAG_LOADED, this.onFragLoaded, this), e.on(p.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), e.on(p.FRAG_DECRYPTED, this.onFragDecrypted, this), e.on(p.INIT_PTS_FOUND, this.onInitPtsFound, this), e.on(p.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), e.on(p.BUFFER_FLUSHING, this.onBufferFlushing, this);
        }
        destroy() {
            const { hls: e } = this;
            e.off(p.MEDIA_ATTACHING, this.onMediaAttaching, this), e.off(p.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(p.MANIFEST_LOADING, this.onManifestLoading, this), e.off(p.MANIFEST_LOADED, this.onManifestLoaded, this), e.off(p.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), e.off(p.FRAG_LOADING, this.onFragLoading, this), e.off(p.FRAG_LOADED, this.onFragLoaded, this), e.off(p.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), e.off(p.FRAG_DECRYPTED, this.onFragDecrypted, this), e.off(p.INIT_PTS_FOUND, this.onInitPtsFound, this), e.off(p.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), e.off(p.BUFFER_FLUSHING, this.onBufferFlushing, this), this.hls = this.config = null, this.cea608Parser1 = this.cea608Parser2 = void 0;
        }
        initCea608Parsers() {
            if (this.config.enableCEA708Captions && (!this.cea608Parser1 || !this.cea608Parser2)) {
                const e = new os(this, "textTrack1"), t = new os(this, "textTrack2"), s = new os(this, "textTrack3"), i = new os(this, "textTrack4");
                this.cea608Parser1 = new mr(1, e, t), this.cea608Parser2 = new mr(3, s, i);
            }
        }
        addCues(e, t, s, i, r) {
            let a = !1;
            for(let o = r.length; o--;){
                const l = r[o], c = Id(l[0], l[1], t, s);
                if (c >= 0 && (l[0] = Math.min(l[0], t), l[1] = Math.max(l[1], s), a = !0, c / (s - t) > .5)) return;
            }
            if (a || r.push([
                t,
                s
            ]), this.config.renderTextTracksNatively) {
                const o = this.captionsTracks[e];
                this.Cues.newCue(o, t, s, i);
            } else {
                const o = this.Cues.newCue(null, t, s, i);
                this.hls.trigger(p.CUES_PARSED, {
                    type: "captions",
                    cues: o,
                    track: e
                });
            }
        }
        onInitPtsFound(e, { frag: t, id: s, initPTS: i, timescale: r }) {
            const { unparsedVttFrags: a } = this;
            s === "main" && (this.initPTS[t.cc] = {
                baseTime: i,
                timescale: r
            }), a.length && (this.unparsedVttFrags = [], a.forEach((o)=>{
                this.onFragLoaded(p.FRAG_LOADED, o);
            }));
        }
        getExistingTrack(e, t) {
            const { media: s } = this;
            if (s) for(let i = 0; i < s.textTracks.length; i++){
                const r = s.textTracks[i];
                if (Tr(r, {
                    name: e,
                    lang: t
                })) return r;
            }
            return null;
        }
        createCaptionsTrack(e) {
            this.config.renderTextTracksNatively ? this.createNativeTrack(e) : this.createNonNativeTrack(e);
        }
        createNativeTrack(e) {
            if (this.captionsTracks[e]) return;
            const { captionsProperties: t, captionsTracks: s, media: i } = this, { label: r, languageCode: a } = t[e], o = this.getExistingTrack(r, a);
            if (o) s[e] = o, At(s[e]), na(s[e], i);
            else {
                const l = this.createTextTrack("captions", r, a);
                l && (l[e] = !0, s[e] = l);
            }
        }
        createNonNativeTrack(e) {
            if (this.nonNativeCaptionsTracks[e]) return;
            const t = this.captionsProperties[e];
            if (!t) return;
            const s = t.label, i = {
                _id: e,
                label: s,
                kind: "captions",
                default: t.media ? !!t.media.default : !1,
                closedCaptions: t.media
            };
            this.nonNativeCaptionsTracks[e] = i, this.hls.trigger(p.NON_NATIVE_TEXT_TRACKS_FOUND, {
                tracks: [
                    i
                ]
            });
        }
        createTextTrack(e, t, s) {
            const i = this.media;
            if (i) return i.addTextTrack(e, t, s);
        }
        onMediaAttaching(e, t) {
            this.media = t.media, this._cleanTracks();
        }
        onMediaDetaching() {
            const { captionsTracks: e } = this;
            Object.keys(e).forEach((t)=>{
                At(e[t]), delete e[t];
            }), this.nonNativeCaptionsTracks = {};
        }
        onManifestLoading() {
            this.lastCc = -1, this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = xr(), this._cleanTracks(), this.tracks = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.textTracks = [], this.unparsedVttFrags = [], this.initPTS = [], this.cea608Parser1 && this.cea608Parser2 && (this.cea608Parser1.reset(), this.cea608Parser2.reset());
        }
        _cleanTracks() {
            const { media: e } = this;
            if (!e) return;
            const t = e.textTracks;
            if (t) for(let s = 0; s < t.length; s++)At(t[s]);
        }
        onSubtitleTracksUpdated(e, t) {
            const s = t.subtitleTracks || [], i = s.some((r)=>r.textCodec === pi);
            if (this.config.enableWebVTT || i && this.config.enableIMSC1) {
                if (wa(this.tracks, s)) {
                    this.tracks = s;
                    return;
                }
                if (this.textTracks = [], this.tracks = s, this.config.renderTextTracksNatively) {
                    const a = this.media, o = a ? gs(a.textTracks) : null;
                    if (this.tracks.forEach((l, c)=>{
                        let d;
                        if (o) {
                            let u = null;
                            for(let h = 0; h < o.length; h++)if (o[h] && Tr(o[h], l)) {
                                u = o[h], o[h] = null;
                                break;
                            }
                            u && (d = u);
                        }
                        if (d) At(d);
                        else {
                            const u = Ba(l);
                            d = this.createTextTrack(u, l.name, l.lang), d && (d.mode = "disabled");
                        }
                        d && this.textTracks.push(d);
                    }), o != null && o.length) {
                        const l = o.filter((c)=>c !== null).map((c)=>c.label);
                        l.length && S.warn(`Media element contains unused subtitle tracks: ${l.join(", ")}. Replace media element for each source to clear TextTracks and captions menu.`);
                    }
                } else if (this.tracks.length) {
                    const a = this.tracks.map((o)=>({
                            label: o.name,
                            kind: o.type.toLowerCase(),
                            default: o.default,
                            subtitleTrack: o
                        }));
                    this.hls.trigger(p.NON_NATIVE_TEXT_TRACKS_FOUND, {
                        tracks: a
                    });
                }
            }
        }
        onManifestLoaded(e, t) {
            this.config.enableCEA708Captions && t.captions && t.captions.forEach((s)=>{
                const i = /(?:CC|SERVICE)([1-4])/.exec(s.instreamId);
                if (!i) return;
                const r = `textTrack${i[1]}`, a = this.captionsProperties[r];
                a && (a.label = s.name, s.lang && (a.languageCode = s.lang), a.media = s);
            });
        }
        closedCaptionsForLevel(e) {
            const t = this.hls.levels[e.level];
            return t?.attrs["CLOSED-CAPTIONS"];
        }
        onFragLoading(e, t) {
            if (this.enabled && t.frag.type === B.MAIN) {
                var s, i;
                const { cea608Parser1: r, cea608Parser2: a, lastSn: o } = this, { cc: l, sn: c } = t.frag, d = (s = (i = t.part) == null ? void 0 : i.index) != null ? s : -1;
                r && a && (c !== o + 1 || c === o && d !== this.lastPartIndex + 1 || l !== this.lastCc) && (r.reset(), a.reset()), this.lastCc = l, this.lastSn = c, this.lastPartIndex = d;
            }
        }
        onFragLoaded(e, t) {
            const { frag: s, payload: i } = t;
            if (s.type === B.SUBTITLE) if (i.byteLength) {
                const r = s.decryptdata, a = "stats" in t;
                if (r == null || !r.encrypted || a) {
                    const o = this.tracks[s.level], l = this.vttCCs;
                    l[s.cc] || (l[s.cc] = {
                        start: s.start,
                        prevCC: this.prevCC,
                        new: !0
                    }, this.prevCC = s.cc), o && o.textCodec === pi ? this._parseIMSC1(s, i) : this._parseVTTs(t);
                }
            } else this.hls.trigger(p.SUBTITLE_FRAG_PROCESSED, {
                success: !1,
                frag: s,
                error: new Error("Empty subtitle payload")
            });
        }
        _parseIMSC1(e, t) {
            const s = this.hls;
            pr(t, this.initPTS[e.cc], (i)=>{
                this._appendCues(i, e.level), s.trigger(p.SUBTITLE_FRAG_PROCESSED, {
                    success: !0,
                    frag: e
                });
            }, (i)=>{
                S.log(`Failed to parse IMSC1: ${i}`), s.trigger(p.SUBTITLE_FRAG_PROCESSED, {
                    success: !1,
                    frag: e,
                    error: i
                });
            });
        }
        _parseVTTs(e) {
            var t;
            const { frag: s, payload: i } = e, { initPTS: r, unparsedVttFrags: a } = this, o = r.length - 1;
            if (!r[s.cc] && o === -1) {
                a.push(e);
                return;
            }
            const l = this.hls, c = (t = s.initSegment) != null && t.data ? De(s.initSegment.data, new Uint8Array(i)) : i;
            xd(c, this.initPTS[s.cc], this.vttCCs, s.cc, s.start, (d)=>{
                this._appendCues(d, s.level), l.trigger(p.SUBTITLE_FRAG_PROCESSED, {
                    success: !0,
                    frag: s
                });
            }, (d)=>{
                const u = d.message === "Missing initPTS for VTT MPEGTS";
                u ? a.push(e) : this._fallbackToIMSC1(s, i), S.log(`Failed to parse VTT cue: ${d}`), !(u && o > s.cc) && l.trigger(p.SUBTITLE_FRAG_PROCESSED, {
                    success: !1,
                    frag: s,
                    error: d
                });
            });
        }
        _fallbackToIMSC1(e, t) {
            const s = this.tracks[e.level];
            s.textCodec || pr(t, this.initPTS[e.cc], ()=>{
                s.textCodec = pi, this._parseIMSC1(e, t);
            }, ()=>{
                s.textCodec = "wvtt";
            });
        }
        _appendCues(e, t) {
            const s = this.hls;
            if (this.config.renderTextTracksNatively) {
                const i = this.textTracks[t];
                if (!i || i.mode === "disabled") return;
                e.forEach((r)=>ra(i, r));
            } else {
                const i = this.tracks[t];
                if (!i) return;
                const r = i.default ? "default" : "subtitles" + t;
                s.trigger(p.CUES_PARSED, {
                    type: "subtitles",
                    cues: e,
                    track: r
                });
            }
        }
        onFragDecrypted(e, t) {
            const { frag: s } = t;
            s.type === B.SUBTITLE && this.onFragLoaded(p.FRAG_LOADED, t);
        }
        onSubtitleTracksCleared() {
            this.tracks = [], this.captionsTracks = {};
        }
        onFragParsingUserdata(e, t) {
            this.initCea608Parsers();
            const { cea608Parser1: s, cea608Parser2: i } = this;
            if (!this.enabled || !s || !i) return;
            const { frag: r, samples: a } = t;
            if (!(r.type === B.MAIN && this.closedCaptionsForLevel(r) === "NONE")) for(let o = 0; o < a.length; o++){
                const l = a[o].bytes;
                if (l) {
                    const c = this.extractCea608Data(l);
                    s.addData(a[o].pts, c[0]), i.addData(a[o].pts, c[1]);
                }
            }
        }
        onBufferFlushing(e, { startOffset: t, endOffset: s, endOffsetSubtitles: i, type: r }) {
            const { media: a } = this;
            if (!(!a || a.currentTime < s)) {
                if (!r || r === "video") {
                    const { captionsTracks: o } = this;
                    Object.keys(o).forEach((l)=>Fi(o[l], t, s));
                }
                if (this.config.renderTextTracksNatively && t === 0 && i !== void 0) {
                    const { textTracks: o } = this;
                    Object.keys(o).forEach((l)=>Fi(o[l], t, i));
                }
            }
        }
        extractCea608Data(e) {
            const t = [
                [],
                []
            ], s = e[0] & 31;
            let i = 2;
            for(let r = 0; r < s; r++){
                const a = e[i++], o = 127 & e[i++], l = 127 & e[i++];
                if (o === 0 && l === 0) continue;
                if ((4 & a) !== 0) {
                    const d = 3 & a;
                    (d === 0 || d === 1) && (t[d].push(o), t[d].push(l));
                }
            }
            return t;
        }
    }
    function Ba(n) {
        return n.characteristics && /transcribes-spoken-dialog/gi.test(n.characteristics) && /describes-music-and-sound/gi.test(n.characteristics) ? "captions" : "subtitles";
    }
    function Tr(n, e) {
        return !!n && n.kind === Ba(e) && $i(e, n);
    }
    function Id(n, e, t, s) {
        return Math.min(e, s) - Math.max(n, t);
    }
    function xr() {
        return {
            ccOffset: 0,
            presentationOffset: 0,
            0: {
                start: 0,
                prevCC: -1,
                new: !0
            }
        };
    }
    class yn {
        constructor(e){
            this.hls = void 0, this.autoLevelCapping = void 0, this.firstLevel = void 0, this.media = void 0, this.restrictedLevels = void 0, this.timer = void 0, this.clientRect = void 0, this.streamController = void 0, this.hls = e, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.firstLevel = -1, this.media = null, this.restrictedLevels = [], this.timer = void 0, this.clientRect = null, this.registerListeners();
        }
        setStreamController(e) {
            this.streamController = e;
        }
        destroy() {
            this.hls && this.unregisterListener(), this.timer && this.stopCapping(), this.media = null, this.clientRect = null, this.hls = this.streamController = null;
        }
        registerListeners() {
            const { hls: e } = this;
            e.on(p.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), e.on(p.MEDIA_ATTACHING, this.onMediaAttaching, this), e.on(p.MANIFEST_PARSED, this.onManifestParsed, this), e.on(p.LEVELS_UPDATED, this.onLevelsUpdated, this), e.on(p.BUFFER_CODECS, this.onBufferCodecs, this), e.on(p.MEDIA_DETACHING, this.onMediaDetaching, this);
        }
        unregisterListener() {
            const { hls: e } = this;
            e.off(p.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), e.off(p.MEDIA_ATTACHING, this.onMediaAttaching, this), e.off(p.MANIFEST_PARSED, this.onManifestParsed, this), e.off(p.LEVELS_UPDATED, this.onLevelsUpdated, this), e.off(p.BUFFER_CODECS, this.onBufferCodecs, this), e.off(p.MEDIA_DETACHING, this.onMediaDetaching, this);
        }
        onFpsDropLevelCapping(e, t) {
            const s = this.hls.levels[t.droppedLevel];
            this.isLevelAllowed(s) && this.restrictedLevels.push({
                bitrate: s.bitrate,
                height: s.height,
                width: s.width
            });
        }
        onMediaAttaching(e, t) {
            this.media = t.media instanceof HTMLVideoElement ? t.media : null, this.clientRect = null, this.timer && this.hls.levels.length && this.detectPlayerSize();
        }
        onManifestParsed(e, t) {
            const s = this.hls;
            this.restrictedLevels = [], this.firstLevel = t.firstLevel, s.config.capLevelToPlayerSize && t.video && this.startCapping();
        }
        onLevelsUpdated(e, t) {
            this.timer && M(this.autoLevelCapping) && this.detectPlayerSize();
        }
        onBufferCodecs(e, t) {
            this.hls.config.capLevelToPlayerSize && t.video && this.startCapping();
        }
        onMediaDetaching() {
            this.stopCapping();
        }
        detectPlayerSize() {
            if (this.media) {
                if (this.mediaHeight <= 0 || this.mediaWidth <= 0) {
                    this.clientRect = null;
                    return;
                }
                const e = this.hls.levels;
                if (e.length) {
                    const t = this.hls, s = this.getMaxLevel(e.length - 1);
                    s !== this.autoLevelCapping && S.log(`Setting autoLevelCapping to ${s}: ${e[s].height}p@${e[s].bitrate} for media ${this.mediaWidth}x${this.mediaHeight}`), t.autoLevelCapping = s, t.autoLevelCapping > this.autoLevelCapping && this.streamController && this.streamController.nextLevelSwitch(), this.autoLevelCapping = t.autoLevelCapping;
                }
            }
        }
        getMaxLevel(e) {
            const t = this.hls.levels;
            if (!t.length) return -1;
            const s = t.filter((i, r)=>this.isLevelAllowed(i) && r <= e);
            return this.clientRect = null, yn.getMaxLevelByMediaSize(s, this.mediaWidth, this.mediaHeight);
        }
        startCapping() {
            this.timer || (this.autoLevelCapping = Number.POSITIVE_INFINITY, self.clearInterval(this.timer), this.timer = self.setInterval(this.detectPlayerSize.bind(this), 1e3), this.detectPlayerSize());
        }
        stopCapping() {
            this.restrictedLevels = [], this.firstLevel = -1, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.timer && (self.clearInterval(this.timer), this.timer = void 0);
        }
        getDimensions() {
            if (this.clientRect) return this.clientRect;
            const e = this.media, t = {
                width: 0,
                height: 0
            };
            if (e) {
                const s = e.getBoundingClientRect();
                t.width = s.width, t.height = s.height, !t.width && !t.height && (t.width = s.right - s.left || e.width || 0, t.height = s.bottom - s.top || e.height || 0);
            }
            return this.clientRect = t, t;
        }
        get mediaWidth() {
            return this.getDimensions().width * this.contentScaleFactor;
        }
        get mediaHeight() {
            return this.getDimensions().height * this.contentScaleFactor;
        }
        get contentScaleFactor() {
            let e = 1;
            if (!this.hls.config.ignoreDevicePixelRatio) try {
                e = self.devicePixelRatio;
            } catch  {}
            return e;
        }
        isLevelAllowed(e) {
            return !this.restrictedLevels.some((s)=>e.bitrate === s.bitrate && e.width === s.width && e.height === s.height);
        }
        static getMaxLevelByMediaSize(e, t, s) {
            if (!(e != null && e.length)) return -1;
            const i = (o, l)=>l ? o.width !== l.width || o.height !== l.height : !0;
            let r = e.length - 1;
            const a = Math.max(t, s);
            for(let o = 0; o < e.length; o += 1){
                const l = e[o];
                if ((l.width >= a || l.height >= a) && i(l, e[o + 1])) {
                    r = o;
                    break;
                }
            }
            return r;
        }
    }
    class Dd {
        constructor(e){
            this.hls = void 0, this.isVideoPlaybackQualityAvailable = !1, this.timer = void 0, this.media = null, this.lastTime = void 0, this.lastDroppedFrames = 0, this.lastDecodedFrames = 0, this.streamController = void 0, this.hls = e, this.registerListeners();
        }
        setStreamController(e) {
            this.streamController = e;
        }
        registerListeners() {
            this.hls.on(p.MEDIA_ATTACHING, this.onMediaAttaching, this);
        }
        unregisterListeners() {
            this.hls.off(p.MEDIA_ATTACHING, this.onMediaAttaching, this);
        }
        destroy() {
            this.timer && clearInterval(this.timer), this.unregisterListeners(), this.isVideoPlaybackQualityAvailable = !1, this.media = null;
        }
        onMediaAttaching(e, t) {
            const s = this.hls.config;
            if (s.capLevelOnFPSDrop) {
                const i = t.media instanceof self.HTMLVideoElement ? t.media : null;
                this.media = i, i && typeof i.getVideoPlaybackQuality == "function" && (this.isVideoPlaybackQualityAvailable = !0), self.clearInterval(this.timer), this.timer = self.setInterval(this.checkFPSInterval.bind(this), s.fpsDroppedMonitoringPeriod);
            }
        }
        checkFPS(e, t, s) {
            const i = performance.now();
            if (t) {
                if (this.lastTime) {
                    const r = i - this.lastTime, a = s - this.lastDroppedFrames, o = t - this.lastDecodedFrames, l = 1e3 * a / r, c = this.hls;
                    if (c.trigger(p.FPS_DROP, {
                        currentDropped: a,
                        currentDecoded: o,
                        totalDroppedFrames: s
                    }), l > 0 && a > c.config.fpsDroppedMonitoringThreshold * o) {
                        let d = c.currentLevel;
                        S.warn("drop FPS ratio greater than max allowed value for currentLevel: " + d), d > 0 && (c.autoLevelCapping === -1 || c.autoLevelCapping >= d) && (d = d - 1, c.trigger(p.FPS_DROP_LEVEL_CAPPING, {
                            level: d,
                            droppedLevel: c.currentLevel
                        }), c.autoLevelCapping = d, this.streamController.nextLevelSwitch());
                    }
                }
                this.lastTime = i, this.lastDroppedFrames = s, this.lastDecodedFrames = t;
            }
        }
        checkFPSInterval() {
            const e = this.media;
            if (e) if (this.isVideoPlaybackQualityAvailable) {
                const t = e.getVideoPlaybackQuality();
                this.checkFPS(e, t.totalVideoFrames, t.droppedVideoFrames);
            } else this.checkFPS(e, e.webkitDecodedFrameCount, e.webkitDroppedFrameCount);
        }
    }
    const cs = "[eme]";
    class Rt {
        constructor(e){
            this.hls = void 0, this.config = void 0, this.media = null, this.keyFormatPromise = null, this.keySystemAccessPromises = {}, this._requestLicenseFailureCount = 0, this.mediaKeySessions = [], this.keyIdToKeySessionPromise = {}, this.setMediaKeysQueue = Rt.CDMCleanupPromise ? [
                Rt.CDMCleanupPromise
            ] : [], this.onMediaEncrypted = this._onMediaEncrypted.bind(this), this.onWaitingForKey = this._onWaitingForKey.bind(this), this.debug = S.debug.bind(S, cs), this.log = S.log.bind(S, cs), this.warn = S.warn.bind(S, cs), this.error = S.error.bind(S, cs), this.hls = e, this.config = e.config, this.registerListeners();
        }
        destroy() {
            this.unregisterListeners(), this.onMediaDetached();
            const e = this.config;
            e.requestMediaKeySystemAccessFunc = null, e.licenseXhrSetup = e.licenseResponseCallback = void 0, e.drmSystems = e.drmSystemOptions = {}, this.hls = this.onMediaEncrypted = this.onWaitingForKey = this.keyIdToKeySessionPromise = null, this.config = null;
        }
        registerListeners() {
            this.hls.on(p.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(p.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.on(p.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.on(p.MANIFEST_LOADED, this.onManifestLoaded, this);
        }
        unregisterListeners() {
            this.hls.off(p.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.off(p.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.off(p.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.off(p.MANIFEST_LOADED, this.onManifestLoaded, this);
        }
        getLicenseServerUrl(e) {
            const { drmSystems: t, widevineLicenseUrl: s } = this.config, i = t[e];
            if (i) return i.licenseUrl;
            if (e === ee.WIDEVINE && s) return s;
            throw new Error(`no license server URL configured for key-system "${e}"`);
        }
        getServerCertificateUrl(e) {
            const { drmSystems: t } = this.config, s = t[e];
            if (s) return s.serverCertificateUrl;
            this.log(`No Server Certificate in config.drmSystems["${e}"]`);
        }
        attemptKeySystemAccess(e) {
            const t = this.hls.levels, s = (a, o, l)=>!!a && l.indexOf(a) === o, i = t.map((a)=>a.audioCodec).filter(s), r = t.map((a)=>a.videoCodec).filter(s);
            return i.length + r.length === 0 && r.push("avc1.42e01e"), new Promise((a, o)=>{
                const l = (c)=>{
                    const d = c.shift();
                    this.getMediaKeysPromise(d, i, r).then((u)=>a({
                            keySystem: d,
                            mediaKeys: u
                        })).catch((u)=>{
                        c.length ? l(c) : u instanceof Le ? o(u) : o(new Le({
                            type: G.KEY_SYSTEM_ERROR,
                            details: A.KEY_SYSTEM_NO_ACCESS,
                            error: u,
                            fatal: !0
                        }, u.message));
                    });
                };
                l(e);
            });
        }
        requestMediaKeySystemAccess(e, t) {
            const { requestMediaKeySystemAccessFunc: s } = this.config;
            if (typeof s != "function") {
                let i = `Configured requestMediaKeySystemAccess is not a function ${s}`;
                return Wr === null && self.location.protocol === "http:" && (i = `navigator.requestMediaKeySystemAccess is not available over insecure protocol ${location.protocol}`), Promise.reject(new Error(i));
            }
            return s(e, t);
        }
        getMediaKeysPromise(e, t, s) {
            const i = Oo(e, t, s, this.config.drmSystemOptions), r = this.keySystemAccessPromises[e];
            let a = r?.keySystemAccess;
            if (!a) {
                this.log(`Requesting encrypted media "${e}" key-system access with config: ${JSON.stringify(i)}`), a = this.requestMediaKeySystemAccess(e, i);
                const o = this.keySystemAccessPromises[e] = {
                    keySystemAccess: a
                };
                return a.catch((l)=>{
                    this.log(`Failed to obtain access to key-system "${e}": ${l}`);
                }), a.then((l)=>{
                    this.log(`Access for key-system "${l.keySystem}" obtained`);
                    const c = this.fetchServerCertificate(e);
                    return this.log(`Create media-keys for "${e}"`), o.mediaKeys = l.createMediaKeys().then((d)=>(this.log(`Media-keys created for "${e}"`), c.then((u)=>u ? this.setMediaKeysServerCertificate(d, e, u) : d))), o.mediaKeys.catch((d)=>{
                        this.error(`Failed to create media-keys for "${e}"}: ${d}`);
                    }), o.mediaKeys;
                });
            }
            return a.then(()=>r.mediaKeys);
        }
        createMediaKeySessionContext({ decryptdata: e, keySystem: t, mediaKeys: s }) {
            this.log(`Creating key-system session "${t}" keyId: ${Be.hexDump(e.keyId || [])}`);
            const i = s.createSession(), r = {
                decryptdata: e,
                keySystem: t,
                mediaKeys: s,
                mediaKeysSession: i,
                keyStatus: "status-pending"
            };
            return this.mediaKeySessions.push(r), r;
        }
        renewKeySession(e) {
            const t = e.decryptdata;
            if (t.pssh) {
                const s = this.createMediaKeySessionContext(e), i = this.getKeyIdString(t), r = "cenc";
                this.keyIdToKeySessionPromise[i] = this.generateRequestWithPreferredKeySession(s, r, t.pssh, "expired");
            } else this.warn("Could not renew expired session. Missing pssh initData.");
            this.removeSession(e);
        }
        getKeyIdString(e) {
            if (!e) throw new Error("Could not read keyId of undefined decryptdata");
            if (e.keyId === null) throw new Error("keyId is null");
            return Be.hexDump(e.keyId);
        }
        updateKeySession(e, t) {
            var s;
            const i = e.mediaKeysSession;
            return this.log(`Updating key-session "${i.sessionId}" for keyID ${Be.hexDump(((s = e.decryptdata) == null ? void 0 : s.keyId) || [])}
      } (data length: ${t && t.byteLength})`), i.update(t);
        }
        selectKeySystemFormat(e) {
            const t = Object.keys(e.levelkeys || {});
            return this.keyFormatPromise || (this.log(`Selecting key-system from fragment (sn: ${e.sn} ${e.type}: ${e.level}) key formats ${t.join(", ")}`), this.keyFormatPromise = this.getKeyFormatPromise(t)), this.keyFormatPromise;
        }
        getKeyFormatPromise(e) {
            return new Promise((t, s)=>{
                const i = ti(this.config), r = e.map(In).filter((a)=>!!a && i.indexOf(a) !== -1);
                return this.getKeySystemSelectionPromise(r).then(({ keySystem: a })=>{
                    const o = Dn(a);
                    o ? t(o) : s(new Error(`Unable to find format for key-system "${a}"`));
                }).catch(s);
            });
        }
        loadKey(e) {
            const t = e.keyInfo.decryptdata, s = this.getKeyIdString(t), i = `(keyId: ${s} format: "${t.keyFormat}" method: ${t.method} uri: ${t.uri})`;
            this.log(`Starting session for key ${i}`);
            let r = this.keyIdToKeySessionPromise[s];
            return r || (r = this.keyIdToKeySessionPromise[s] = this.getKeySystemForKeyPromise(t).then(({ keySystem: a, mediaKeys: o })=>(this.throwIfDestroyed(), this.log(`Handle encrypted media sn: ${e.frag.sn} ${e.frag.type}: ${e.frag.level} using key ${i}`), this.attemptSetMediaKeys(a, o).then(()=>{
                    this.throwIfDestroyed();
                    const l = this.createMediaKeySessionContext({
                        keySystem: a,
                        mediaKeys: o,
                        decryptdata: t
                    });
                    return this.generateRequestWithPreferredKeySession(l, "cenc", t.pssh, "playlist-key");
                }))), r.catch((a)=>this.handleError(a))), r;
        }
        throwIfDestroyed(e = "Invalid state") {
            if (!this.hls) throw new Error("invalid state");
        }
        handleError(e) {
            this.hls && (this.error(e.message), e instanceof Le ? this.hls.trigger(p.ERROR, e.data) : this.hls.trigger(p.ERROR, {
                type: G.KEY_SYSTEM_ERROR,
                details: A.KEY_SYSTEM_NO_KEYS,
                error: e,
                fatal: !0
            }));
        }
        getKeySystemForKeyPromise(e) {
            const t = this.getKeyIdString(e), s = this.keyIdToKeySessionPromise[t];
            if (!s) {
                const i = In(e.keyFormat), r = i ? [
                    i
                ] : ti(this.config);
                return this.attemptKeySystemAccess(r);
            }
            return s;
        }
        getKeySystemSelectionPromise(e) {
            if (e.length || (e = ti(this.config)), e.length === 0) throw new Le({
                type: G.KEY_SYSTEM_ERROR,
                details: A.KEY_SYSTEM_NO_CONFIGURED_LICENSE,
                fatal: !0
            }, `Missing key-system license configuration options ${JSON.stringify({
                drmSystems: this.config.drmSystems
            })}`);
            return this.attemptKeySystemAccess(e);
        }
        _onMediaEncrypted(e) {
            const { initDataType: t, initData: s } = e;
            if (this.debug(`"${e.type}" event: init data type: "${t}"`), s === null) return;
            let i, r;
            if (t === "sinf" && this.config.drmSystems[ee.FAIRPLAY]) {
                const d = ae(new Uint8Array(s));
                try {
                    const u = tn(JSON.parse(d).sinf), h = Zr(new Uint8Array(u));
                    if (!h) return;
                    i = h.subarray(8, 24), r = ee.FAIRPLAY;
                } catch  {
                    this.warn('Failed to parse sinf "encrypted" event message initData');
                    return;
                }
            } else {
                const d = al(s);
                if (d === null) return;
                d.version === 0 && d.systemId === Vr.WIDEVINE && d.data && (i = d.data.subarray(8, 24)), r = Fo(d.systemId);
            }
            if (!r || !i) return;
            const a = Be.hexDump(i), { keyIdToKeySessionPromise: o, mediaKeySessions: l } = this;
            let c = o[a];
            for(let d = 0; d < l.length; d++){
                const u = l[d], h = u.decryptdata;
                if (h.pssh || !h.keyId) continue;
                const f = Be.hexDump(h.keyId);
                if (a === f || h.uri.replace(/-/g, "").indexOf(a) !== -1) {
                    c = o[f], delete o[f], h.pssh = new Uint8Array(s), h.keyId = i, c = o[a] = c.then(()=>this.generateRequestWithPreferredKeySession(u, t, s, "encrypted-event-key-match"));
                    break;
                }
            }
            c || (c = o[a] = this.getKeySystemSelectionPromise([
                r
            ]).then(({ keySystem: d, mediaKeys: u })=>{
                var h;
                this.throwIfDestroyed();
                const f = new zt("ISO-23001-7", a, (h = Dn(d)) != null ? h : "");
                return f.pssh = new Uint8Array(s), f.keyId = i, this.attemptSetMediaKeys(d, u).then(()=>{
                    this.throwIfDestroyed();
                    const g = this.createMediaKeySessionContext({
                        decryptdata: f,
                        keySystem: d,
                        mediaKeys: u
                    });
                    return this.generateRequestWithPreferredKeySession(g, t, s, "encrypted-event-no-match");
                });
            })), c.catch((d)=>this.handleError(d));
        }
        _onWaitingForKey(e) {
            this.log(`"${e.type}" event`);
        }
        attemptSetMediaKeys(e, t) {
            const s = this.setMediaKeysQueue.slice();
            this.log(`Setting media-keys for "${e}"`);
            const i = Promise.all(s).then(()=>{
                if (!this.media) throw new Error("Attempted to set mediaKeys without media element attached");
                return this.media.setMediaKeys(t);
            });
            return this.setMediaKeysQueue.push(i), i.then(()=>{
                this.log(`Media-keys set for "${e}"`), s.push(i), this.setMediaKeysQueue = this.setMediaKeysQueue.filter((r)=>s.indexOf(r) === -1);
            });
        }
        generateRequestWithPreferredKeySession(e, t, s, i) {
            var r, a;
            const o = (r = this.config.drmSystems) == null || (a = r[e.keySystem]) == null ? void 0 : a.generateRequest;
            if (o) try {
                const g = o.call(this.hls, t, s, e);
                if (!g) throw new Error("Invalid response from configured generateRequest filter");
                t = g.initDataType, s = e.decryptdata.pssh = g.initData ? new Uint8Array(g.initData) : null;
            } catch (g) {
                var l;
                if (this.warn(g.message), (l = this.hls) != null && l.config.debug) throw g;
            }
            if (s === null) return this.log(`Skipping key-session request for "${i}" (no initData)`), Promise.resolve(e);
            const c = this.getKeyIdString(e.decryptdata);
            this.log(`Generating key-session request for "${i}": ${c} (init data type: ${t} length: ${s ? s.byteLength : null})`);
            const d = new gn, u = e._onmessage = (g)=>{
                const m = e.mediaKeysSession;
                if (!m) {
                    d.emit("error", new Error("invalid state"));
                    return;
                }
                const { messageType: y, message: E } = g;
                this.log(`"${y}" message event for session "${m.sessionId}" message size: ${E.byteLength}`), y === "license-request" || y === "license-renewal" ? this.renewLicense(e, E).catch((x)=>{
                    this.handleError(x), d.emit("error", x);
                }) : y === "license-release" ? e.keySystem === ee.FAIRPLAY && (this.updateKeySession(e, ki("acknowledged")), this.removeSession(e)) : this.warn(`unhandled media key message type "${y}"`);
            }, h = e._onkeystatuseschange = (g)=>{
                if (!e.mediaKeysSession) {
                    d.emit("error", new Error("invalid state"));
                    return;
                }
                this.onKeyStatusChange(e);
                const y = e.keyStatus;
                d.emit("keyStatus", y), y === "expired" && (this.warn(`${e.keySystem} expired for key ${c}`), this.renewKeySession(e));
            };
            e.mediaKeysSession.addEventListener("message", u), e.mediaKeysSession.addEventListener("keystatuseschange", h);
            const f = new Promise((g, m)=>{
                d.on("error", m), d.on("keyStatus", (y)=>{
                    y.startsWith("usable") ? g() : y === "output-restricted" ? m(new Le({
                        type: G.KEY_SYSTEM_ERROR,
                        details: A.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED,
                        fatal: !1
                    }, "HDCP level output restricted")) : y === "internal-error" ? m(new Le({
                        type: G.KEY_SYSTEM_ERROR,
                        details: A.KEY_SYSTEM_STATUS_INTERNAL_ERROR,
                        fatal: !0
                    }, `key status changed to "${y}"`)) : y === "expired" ? m(new Error("key expired while generating request")) : this.warn(`unhandled key status change "${y}"`);
                });
            });
            return e.mediaKeysSession.generateRequest(t, s).then(()=>{
                var g;
                this.log(`Request generated for key-session "${(g = e.mediaKeysSession) == null ? void 0 : g.sessionId}" keyId: ${c}`);
            }).catch((g)=>{
                throw new Le({
                    type: G.KEY_SYSTEM_ERROR,
                    details: A.KEY_SYSTEM_NO_SESSION,
                    error: g,
                    fatal: !1
                }, `Error generating key-session request: ${g}`);
            }).then(()=>f).catch((g)=>{
                throw d.removeAllListeners(), this.removeSession(e), g;
            }).then(()=>(d.removeAllListeners(), e));
        }
        onKeyStatusChange(e) {
            e.mediaKeysSession.keyStatuses.forEach((t, s)=>{
                this.log(`key status change "${t}" for keyStatuses keyId: ${Be.hexDump("buffer" in s ? new Uint8Array(s.buffer, s.byteOffset, s.byteLength) : new Uint8Array(s))} session keyId: ${Be.hexDump(new Uint8Array(e.decryptdata.keyId || []))} uri: ${e.decryptdata.uri}`), e.keyStatus = t;
            });
        }
        fetchServerCertificate(e) {
            const t = this.config, s = t.loader, i = new s(t), r = this.getServerCertificateUrl(e);
            return r ? (this.log(`Fetching server certificate for "${e}"`), new Promise((a, o)=>{
                const l = {
                    responseType: "arraybuffer",
                    url: r
                }, c = t.certLoadPolicy.default, d = {
                    loadPolicy: c,
                    timeout: c.maxLoadTimeMs,
                    maxRetry: 0,
                    retryDelay: 0,
                    maxRetryDelay: 0
                }, u = {
                    onSuccess: (h, f, g, m)=>{
                        a(h.data);
                    },
                    onError: (h, f, g, m)=>{
                        o(new Le({
                            type: G.KEY_SYSTEM_ERROR,
                            details: A.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,
                            fatal: !0,
                            networkDetails: g,
                            response: ue({
                                url: l.url,
                                data: void 0
                            }, h)
                        }, `"${e}" certificate request failed (${r}). Status: ${h.code} (${h.text})`));
                    },
                    onTimeout: (h, f, g)=>{
                        o(new Le({
                            type: G.KEY_SYSTEM_ERROR,
                            details: A.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,
                            fatal: !0,
                            networkDetails: g,
                            response: {
                                url: l.url,
                                data: void 0
                            }
                        }, `"${e}" certificate request timed out (${r})`));
                    },
                    onAbort: (h, f, g)=>{
                        o(new Error("aborted"));
                    }
                };
                i.load(l, d, u);
            })) : Promise.resolve();
        }
        setMediaKeysServerCertificate(e, t, s) {
            return new Promise((i, r)=>{
                e.setServerCertificate(s).then((a)=>{
                    this.log(`setServerCertificate ${a ? "success" : "not supported by CDM"} (${s?.byteLength}) on "${t}"`), i(e);
                }).catch((a)=>{
                    r(new Le({
                        type: G.KEY_SYSTEM_ERROR,
                        details: A.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED,
                        error: a,
                        fatal: !0
                    }, a.message));
                });
            });
        }
        renewLicense(e, t) {
            return this.requestLicense(e, new Uint8Array(t)).then((s)=>this.updateKeySession(e, new Uint8Array(s)).catch((i)=>{
                    throw new Le({
                        type: G.KEY_SYSTEM_ERROR,
                        details: A.KEY_SYSTEM_SESSION_UPDATE_FAILED,
                        error: i,
                        fatal: !0
                    }, i.message);
                }));
        }
        unpackPlayReadyKeyMessage(e, t) {
            const s = String.fromCharCode.apply(null, new Uint16Array(t.buffer));
            if (!s.includes("PlayReadyKeyMessage")) return e.setRequestHeader("Content-Type", "text/xml; charset=utf-8"), t;
            const i = new DOMParser().parseFromString(s, "application/xml"), r = i.querySelectorAll("HttpHeader");
            if (r.length > 0) {
                let d;
                for(let u = 0, h = r.length; u < h; u++){
                    var a, o;
                    d = r[u];
                    const f = (a = d.querySelector("name")) == null ? void 0 : a.textContent, g = (o = d.querySelector("value")) == null ? void 0 : o.textContent;
                    f && g && e.setRequestHeader(f, g);
                }
            }
            const l = i.querySelector("Challenge"), c = l?.textContent;
            if (!c) throw new Error("Cannot find <Challenge> in key message");
            return ki(atob(c));
        }
        setupLicenseXHR(e, t, s, i) {
            const r = this.config.licenseXhrSetup;
            return r ? Promise.resolve().then(()=>{
                if (!s.decryptdata) throw new Error("Key removed");
                return r.call(this.hls, e, t, s, i);
            }).catch((a)=>{
                if (!s.decryptdata) throw a;
                return e.open("POST", t, !0), r.call(this.hls, e, t, s, i);
            }).then((a)=>(e.readyState || e.open("POST", t, !0), {
                    xhr: e,
                    licenseChallenge: a || i
                })) : (e.open("POST", t, !0), Promise.resolve({
                xhr: e,
                licenseChallenge: i
            }));
        }
        requestLicense(e, t) {
            const s = this.config.keyLoadPolicy.default;
            return new Promise((i, r)=>{
                const a = this.getLicenseServerUrl(e.keySystem);
                this.log(`Sending license request to URL: ${a}`);
                const o = new XMLHttpRequest;
                o.responseType = "arraybuffer", o.onreadystatechange = ()=>{
                    if (!this.hls || !e.mediaKeysSession) return r(new Error("invalid state"));
                    if (o.readyState === 4) if (o.status === 200) {
                        this._requestLicenseFailureCount = 0;
                        let l = o.response;
                        this.log(`License received ${l instanceof ArrayBuffer ? l.byteLength : l}`);
                        const c = this.config.licenseResponseCallback;
                        if (c) try {
                            l = c.call(this.hls, o, a, e);
                        } catch (d) {
                            this.error(d);
                        }
                        i(l);
                    } else {
                        const l = s.errorRetry, c = l ? l.maxNumRetry : 0;
                        if (this._requestLicenseFailureCount++, this._requestLicenseFailureCount > c || o.status >= 400 && o.status < 500) r(new Le({
                            type: G.KEY_SYSTEM_ERROR,
                            details: A.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                            fatal: !0,
                            networkDetails: o,
                            response: {
                                url: a,
                                data: void 0,
                                code: o.status,
                                text: o.statusText
                            }
                        }, `License Request XHR failed (${a}). Status: ${o.status} (${o.statusText})`));
                        else {
                            const d = c - this._requestLicenseFailureCount + 1;
                            this.warn(`Retrying license request, ${d} attempts left`), this.requestLicense(e, t).then(i, r);
                        }
                    }
                }, e.licenseXhr && e.licenseXhr.readyState !== XMLHttpRequest.DONE && e.licenseXhr.abort(), e.licenseXhr = o, this.setupLicenseXHR(o, a, e, t).then(({ xhr: l, licenseChallenge: c })=>{
                    e.keySystem == ee.PLAYREADY && (c = this.unpackPlayReadyKeyMessage(l, c)), l.send(c);
                });
            });
        }
        onMediaAttached(e, t) {
            if (!this.config.emeEnabled) return;
            const s = t.media;
            this.media = s, s.addEventListener("encrypted", this.onMediaEncrypted), s.addEventListener("waitingforkey", this.onWaitingForKey);
        }
        onMediaDetached() {
            const e = this.media, t = this.mediaKeySessions;
            e && (e.removeEventListener("encrypted", this.onMediaEncrypted), e.removeEventListener("waitingforkey", this.onWaitingForKey), this.media = null), this._requestLicenseFailureCount = 0, this.setMediaKeysQueue = [], this.mediaKeySessions = [], this.keyIdToKeySessionPromise = {}, zt.clearKeyUriToKeyIdMap();
            const s = t.length;
            Rt.CDMCleanupPromise = Promise.all(t.map((i)=>this.removeSession(i)).concat(e?.setMediaKeys(null).catch((i)=>{
                this.log(`Could not clear media keys: ${i}`);
            }))).then(()=>{
                s && (this.log("finished closing key sessions and clearing media keys"), t.length = 0);
            }).catch((i)=>{
                this.log(`Could not close sessions and clear media keys: ${i}`);
            });
        }
        onManifestLoading() {
            this.keyFormatPromise = null;
        }
        onManifestLoaded(e, { sessionKeys: t }) {
            if (!(!t || !this.config.emeEnabled) && !this.keyFormatPromise) {
                const s = t.reduce((i, r)=>(i.indexOf(r.keyFormat) === -1 && i.push(r.keyFormat), i), []);
                this.log(`Selecting key-system from session-keys ${s.join(", ")}`), this.keyFormatPromise = this.getKeyFormatPromise(s);
            }
        }
        removeSession(e) {
            const { mediaKeysSession: t, licenseXhr: s } = e;
            if (t) {
                this.log(`Remove licenses and keys and close session ${t.sessionId}`), e._onmessage && (t.removeEventListener("message", e._onmessage), e._onmessage = void 0), e._onkeystatuseschange && (t.removeEventListener("keystatuseschange", e._onkeystatuseschange), e._onkeystatuseschange = void 0), s && s.readyState !== XMLHttpRequest.DONE && s.abort(), e.mediaKeysSession = e.decryptdata = e.licenseXhr = void 0;
                const i = this.mediaKeySessions.indexOf(e);
                return i > -1 && this.mediaKeySessions.splice(i, 1), t.remove().catch((r)=>{
                    this.log(`Could not remove session: ${r}`);
                }).then(()=>t.close()).catch((r)=>{
                    this.log(`Could not close session: ${r}`);
                });
            }
        }
    }
    Rt.CDMCleanupPromise = void 0;
    class Le extends Error {
        constructor(e, t){
            super(t), this.data = void 0, e.error || (e.error = new Error(t)), this.data = e, e.err = e.error;
        }
    }
    var me;
    (function(n) {
        n.MANIFEST = "m", n.AUDIO = "a", n.VIDEO = "v", n.MUXED = "av", n.INIT = "i", n.CAPTION = "c", n.TIMED_TEXT = "tt", n.KEY = "k", n.OTHER = "o";
    })(me || (me = {}));
    var Ki;
    (function(n) {
        n.DASH = "d", n.HLS = "h", n.SMOOTH = "s", n.OTHER = "o";
    })(Ki || (Ki = {}));
    var ct;
    (function(n) {
        n.OBJECT = "CMCD-Object", n.REQUEST = "CMCD-Request", n.SESSION = "CMCD-Session", n.STATUS = "CMCD-Status";
    })(ct || (ct = {}));
    const Cd = {
        [ct.OBJECT]: [
            "br",
            "d",
            "ot",
            "tb"
        ],
        [ct.REQUEST]: [
            "bl",
            "dl",
            "mtp",
            "nor",
            "nrr",
            "su"
        ],
        [ct.SESSION]: [
            "cid",
            "pr",
            "sf",
            "sid",
            "st",
            "v"
        ],
        [ct.STATUS]: [
            "bs",
            "rtp"
        ]
    };
    class wt {
        constructor(e, t){
            this.value = void 0, this.params = void 0, Array.isArray(e) && (e = e.map((s)=>s instanceof wt ? s : new wt(s))), this.value = e, this.params = t;
        }
    }
    class $a {
        constructor(e){
            this.description = void 0, this.description = e;
        }
    }
    const wd = "Dict";
    function _d(n) {
        return Array.isArray(n) ? JSON.stringify(n) : n instanceof Map ? "Map{}" : n instanceof Set ? "Set{}" : typeof n == "object" ? JSON.stringify(n) : String(n);
    }
    function kd(n, e, t, s) {
        return new Error(`failed to ${n} "${_d(e)}" as ${t}`, {
            cause: s
        });
    }
    const vr = "Bare Item", Pd = "Boolean", Fd = "Byte Sequence", Od = "Decimal", Md = "Integer";
    function Nd(n) {
        return n < -999999999999999 || 999999999999999 < n;
    }
    const Ud = /[\x00-\x1f\x7f]+/, Bd = "Token", $d = "Key";
    function We(n, e, t) {
        return kd("serialize", n, e, t);
    }
    function Gd(n) {
        if (typeof n != "boolean") throw We(n, Pd);
        return n ? "?1" : "?0";
    }
    function Kd(n) {
        return btoa(String.fromCharCode(...n));
    }
    function Hd(n) {
        if (ArrayBuffer.isView(n) === !1) throw We(n, Fd);
        return `:${Kd(n)}:`;
    }
    function Ga(n) {
        if (Nd(n)) throw We(n, Md);
        return n.toString();
    }
    function Vd(n) {
        return `@${Ga(n.getTime() / 1e3)}`;
    }
    function Ka(n, e) {
        if (n < 0) return -Ka(-n, e);
        const t = Math.pow(10, e);
        if (Math.abs(n * t % 1 - .5) < Number.EPSILON) {
            const i = Math.floor(n * t);
            return (i % 2 === 0 ? i : i + 1) / t;
        } else return Math.round(n * t) / t;
    }
    function Wd(n) {
        const e = Ka(n, 3);
        if (Math.floor(Math.abs(e)).toString().length > 12) throw We(n, Od);
        const t = e.toString();
        return t.includes(".") ? t : `${t}.0`;
    }
    const Yd = "String";
    function qd(n) {
        if (Ud.test(n)) throw We(n, Yd);
        return `"${n.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }
    function jd(n) {
        return n.description || n.toString().slice(7, -1);
    }
    function Sr(n) {
        const e = jd(n);
        if (/^([a-zA-Z*])([!#$%&'*+\-.^_`|~\w:/]*)$/.test(e) === !1) throw We(e, Bd);
        return e;
    }
    function Hi(n) {
        switch(typeof n){
            case "number":
                if (!M(n)) throw We(n, vr);
                return Number.isInteger(n) ? Ga(n) : Wd(n);
            case "string":
                return qd(n);
            case "symbol":
                return Sr(n);
            case "boolean":
                return Gd(n);
            case "object":
                if (n instanceof Date) return Vd(n);
                if (n instanceof Uint8Array) return Hd(n);
                if (n instanceof $a) return Sr(n);
            default:
                throw We(n, vr);
        }
    }
    function Vi(n) {
        if (/^[a-z*][a-z0-9\-_.*]*$/.test(n) === !1) throw We(n, $d);
        return n;
    }
    function En(n) {
        return n == null ? "" : Object.entries(n).map(([e, t])=>t === !0 ? `;${Vi(e)}` : `;${Vi(e)}=${Hi(t)}`).join("");
    }
    function Ha(n) {
        return n instanceof wt ? `${Hi(n.value)}${En(n.params)}` : Hi(n);
    }
    function zd(n) {
        return `(${n.value.map(Ha).join(" ")})${En(n.params)}`;
    }
    function Xd(n, e = {
        whitespace: !0
    }) {
        if (typeof n != "object") throw We(n, wd);
        const t = n instanceof Map ? n.entries() : Object.entries(n), s = e != null && e.whitespace ? " " : "";
        return Array.from(t).map(([i, r])=>{
            r instanceof wt || (r = new wt(r));
            let a = Vi(i);
            return r.value === !0 ? a += En(r.params) : (a += "=", Array.isArray(r.value) ? a += zd(r) : a += Ha(r)), a;
        }).join(`,${s}`);
    }
    function Qd(n, e) {
        return Xd(n, e);
    }
    const Jd = (n)=>n === "ot" || n === "sf" || n === "st", Zd = (n)=>typeof n == "number" ? M(n) : n != null && n !== "" && n !== !1;
    function eu(n, e) {
        const t = new URL(n), s = new URL(e);
        if (t.origin !== s.origin) return n;
        const i = t.pathname.split("/").slice(1), r = s.pathname.split("/").slice(1, -1);
        for(; i[0] === r[0];)i.shift(), r.shift();
        for(; r.length;)r.shift(), i.unshift("..");
        return i.join("/");
    }
    function tu() {
        try {
            return crypto.randomUUID();
        } catch  {
            try {
                const e = URL.createObjectURL(new Blob), t = e.toString();
                return URL.revokeObjectURL(e), t.slice(t.lastIndexOf("/") + 1);
            } catch  {
                let t = new Date().getTime();
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (i)=>{
                    const r = (t + Math.random() * 16) % 16 | 0;
                    return t = Math.floor(t / 16), (i == "x" ? r : r & 3 | 8).toString(16);
                });
            }
        }
    }
    const xs = (n)=>Math.round(n), su = (n, e)=>(e != null && e.baseUrl && (n = eu(n, e.baseUrl)), encodeURIComponent(n)), ds = (n)=>xs(n / 100) * 100, iu = {
        br: xs,
        d: xs,
        bl: ds,
        dl: ds,
        mtp: ds,
        nor: su,
        rtp: ds,
        tb: xs
    };
    function nu(n, e) {
        const t = {};
        if (n == null || typeof n != "object") return t;
        const s = Object.keys(n).sort(), i = re({}, iu, e?.formatters), r = e?.filter;
        return s.forEach((a)=>{
            if (r != null && r(a)) return;
            let o = n[a];
            const l = i[a];
            l && (o = l(o, e)), !(a === "v" && o === 1) && (a == "pr" && o === 1 || Zd(o) && (Jd(a) && typeof o == "string" && (o = new $a(o)), t[a] = o));
        }), t;
    }
    function Va(n, e = {}) {
        return n ? Qd(nu(n, e), re({
            whitespace: !1
        }, e)) : "";
    }
    function ru(n, e = {}) {
        if (!n) return {};
        const t = Object.entries(n), s = Object.entries(Cd).concat(Object.entries(e?.customHeaderMap || {})), i = t.reduce((r, a)=>{
            var o, l;
            const [c, d] = a, u = ((o = s.find((h)=>h[1].includes(c))) == null ? void 0 : o[0]) || ct.REQUEST;
            return (l = r[u]) != null || (r[u] = {}), r[u][c] = d, r;
        }, {});
        return Object.entries(i).reduce((r, [a, o])=>(r[a] = Va(o, e), r), {});
    }
    function au(n, e, t) {
        return re(n, ru(e, t));
    }
    const ou = "CMCD";
    function lu(n, e = {}) {
        if (!n) return "";
        const t = Va(n, e);
        return `${ou}=${encodeURIComponent(t)}`;
    }
    const Lr = /CMCD=[^&#]+/;
    function cu(n, e, t) {
        const s = lu(e, t);
        if (!s) return n;
        if (Lr.test(n)) return n.replace(Lr, s);
        const i = n.includes("?") ? "&" : "?";
        return `${n}${i}${s}`;
    }
    class du {
        constructor(e){
            this.hls = void 0, this.config = void 0, this.media = void 0, this.sid = void 0, this.cid = void 0, this.useHeaders = !1, this.includeKeys = void 0, this.initialized = !1, this.starved = !1, this.buffering = !0, this.audioBuffer = void 0, this.videoBuffer = void 0, this.onWaiting = ()=>{
                this.initialized && (this.starved = !0), this.buffering = !0;
            }, this.onPlaying = ()=>{
                this.initialized || (this.initialized = !0), this.buffering = !1;
            }, this.applyPlaylistData = (i)=>{
                try {
                    this.apply(i, {
                        ot: me.MANIFEST,
                        su: !this.initialized
                    });
                } catch (r) {
                    S.warn("Could not generate manifest CMCD data.", r);
                }
            }, this.applyFragmentData = (i)=>{
                try {
                    const r = i.frag, a = this.hls.levels[r.level], o = this.getObjectType(r), l = {
                        d: r.duration * 1e3,
                        ot: o
                    };
                    (o === me.VIDEO || o === me.AUDIO || o == me.MUXED) && (l.br = a.bitrate / 1e3, l.tb = this.getTopBandwidth(o) / 1e3, l.bl = this.getBufferLength(o)), this.apply(i, l);
                } catch (r) {
                    S.warn("Could not generate segment CMCD data.", r);
                }
            }, this.hls = e;
            const t = this.config = e.config, { cmcd: s } = t;
            s != null && (t.pLoader = this.createPlaylistLoader(), t.fLoader = this.createFragmentLoader(), this.sid = s.sessionId || tu(), this.cid = s.contentId, this.useHeaders = s.useHeaders === !0, this.includeKeys = s.includeKeys, this.registerListeners());
        }
        registerListeners() {
            const e = this.hls;
            e.on(p.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(p.MEDIA_DETACHED, this.onMediaDetached, this), e.on(p.BUFFER_CREATED, this.onBufferCreated, this);
        }
        unregisterListeners() {
            const e = this.hls;
            e.off(p.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(p.MEDIA_DETACHED, this.onMediaDetached, this), e.off(p.BUFFER_CREATED, this.onBufferCreated, this);
        }
        destroy() {
            this.unregisterListeners(), this.onMediaDetached(), this.hls = this.config = this.audioBuffer = this.videoBuffer = null, this.onWaiting = this.onPlaying = null;
        }
        onMediaAttached(e, t) {
            this.media = t.media, this.media.addEventListener("waiting", this.onWaiting), this.media.addEventListener("playing", this.onPlaying);
        }
        onMediaDetached() {
            this.media && (this.media.removeEventListener("waiting", this.onWaiting), this.media.removeEventListener("playing", this.onPlaying), this.media = null);
        }
        onBufferCreated(e, t) {
            var s, i;
            this.audioBuffer = (s = t.tracks.audio) == null ? void 0 : s.buffer, this.videoBuffer = (i = t.tracks.video) == null ? void 0 : i.buffer;
        }
        createData() {
            var e;
            return {
                v: 1,
                sf: Ki.HLS,
                sid: this.sid,
                cid: this.cid,
                pr: (e = this.media) == null ? void 0 : e.playbackRate,
                mtp: this.hls.bandwidthEstimate / 1e3
            };
        }
        apply(e, t = {}) {
            re(t, this.createData());
            const s = t.ot === me.INIT || t.ot === me.VIDEO || t.ot === me.MUXED;
            this.starved && s && (t.bs = !0, t.su = !0, this.starved = !1), t.su == null && (t.su = this.buffering);
            const { includeKeys: i } = this;
            i && (t = Object.keys(t).reduce((r, a)=>(i.includes(a) && (r[a] = t[a]), r), {})), this.useHeaders ? (e.headers || (e.headers = {}), au(e.headers, t)) : e.url = cu(e.url, t);
        }
        getObjectType(e) {
            const { type: t } = e;
            if (t === "subtitle") return me.TIMED_TEXT;
            if (e.sn === "initSegment") return me.INIT;
            if (t === "audio") return me.AUDIO;
            if (t === "main") return this.hls.audioTracks.length ? me.VIDEO : me.MUXED;
        }
        getTopBandwidth(e) {
            let t = 0, s;
            const i = this.hls;
            if (e === me.AUDIO) s = i.audioTracks;
            else {
                const r = i.maxAutoLevel, a = r > -1 ? r + 1 : i.levels.length;
                s = i.levels.slice(0, a);
            }
            for (const r of s)r.bitrate > t && (t = r.bitrate);
            return t > 0 ? t : NaN;
        }
        getBufferLength(e) {
            const t = this.hls.media, s = e === me.AUDIO ? this.audioBuffer : this.videoBuffer;
            return !s || !t ? NaN : Z.bufferInfo(s, t.currentTime, this.config.maxBufferHole).len * 1e3;
        }
        createPlaylistLoader() {
            const { pLoader: e } = this.config, t = this.applyPlaylistData, s = e || this.config.loader;
            return class {
                constructor(r){
                    this.loader = void 0, this.loader = new s(r);
                }
                get stats() {
                    return this.loader.stats;
                }
                get context() {
                    return this.loader.context;
                }
                destroy() {
                    this.loader.destroy();
                }
                abort() {
                    this.loader.abort();
                }
                load(r, a, o) {
                    t(r), this.loader.load(r, a, o);
                }
            };
        }
        createFragmentLoader() {
            const { fLoader: e } = this.config, t = this.applyFragmentData, s = e || this.config.loader;
            return class {
                constructor(r){
                    this.loader = void 0, this.loader = new s(r);
                }
                get stats() {
                    return this.loader.stats;
                }
                get context() {
                    return this.loader.context;
                }
                destroy() {
                    this.loader.destroy();
                }
                abort() {
                    this.loader.abort();
                }
                load(r, a, o) {
                    t(r), this.loader.load(r, a, o);
                }
            };
        }
    }
    const uu = 3e5;
    class hu {
        constructor(e){
            this.hls = void 0, this.log = void 0, this.loader = null, this.uri = null, this.pathwayId = ".", this.pathwayPriority = null, this.timeToLoad = 300, this.reloadTimer = -1, this.updated = 0, this.started = !1, this.enabled = !0, this.levels = null, this.audioTracks = null, this.subtitleTracks = null, this.penalizedPathways = {}, this.hls = e, this.log = S.log.bind(S, "[content-steering]:"), this.registerListeners();
        }
        registerListeners() {
            const e = this.hls;
            e.on(p.MANIFEST_LOADING, this.onManifestLoading, this), e.on(p.MANIFEST_LOADED, this.onManifestLoaded, this), e.on(p.MANIFEST_PARSED, this.onManifestParsed, this), e.on(p.ERROR, this.onError, this);
        }
        unregisterListeners() {
            const e = this.hls;
            e && (e.off(p.MANIFEST_LOADING, this.onManifestLoading, this), e.off(p.MANIFEST_LOADED, this.onManifestLoaded, this), e.off(p.MANIFEST_PARSED, this.onManifestParsed, this), e.off(p.ERROR, this.onError, this));
        }
        startLoad() {
            if (this.started = !0, this.clearTimeout(), this.enabled && this.uri) {
                if (this.updated) {
                    const e = this.timeToLoad * 1e3 - (performance.now() - this.updated);
                    if (e > 0) {
                        this.scheduleRefresh(this.uri, e);
                        return;
                    }
                }
                this.loadSteeringManifest(this.uri);
            }
        }
        stopLoad() {
            this.started = !1, this.loader && (this.loader.destroy(), this.loader = null), this.clearTimeout();
        }
        clearTimeout() {
            this.reloadTimer !== -1 && (self.clearTimeout(this.reloadTimer), this.reloadTimer = -1);
        }
        destroy() {
            this.unregisterListeners(), this.stopLoad(), this.hls = null, this.levels = this.audioTracks = this.subtitleTracks = null;
        }
        removeLevel(e) {
            const t = this.levels;
            t && (this.levels = t.filter((s)=>s !== e));
        }
        onManifestLoading() {
            this.stopLoad(), this.enabled = !0, this.timeToLoad = 300, this.updated = 0, this.uri = null, this.pathwayId = ".", this.levels = this.audioTracks = this.subtitleTracks = null;
        }
        onManifestLoaded(e, t) {
            const { contentSteering: s } = t;
            s !== null && (this.pathwayId = s.pathwayId, this.uri = s.uri, this.started && this.startLoad());
        }
        onManifestParsed(e, t) {
            this.audioTracks = t.audioTracks, this.subtitleTracks = t.subtitleTracks;
        }
        onError(e, t) {
            const { errorAction: s } = t;
            if (s?.action === fe.SendAlternateToPenaltyBox && s.flags === we.MoveAllAlternatesMatchingHost) {
                const i = this.levels;
                let r = this.pathwayPriority, a = this.pathwayId;
                if (t.context) {
                    const { groupId: o, pathwayId: l, type: c } = t.context;
                    o && i ? a = this.getPathwayForGroupId(o, c, a) : l && (a = l);
                }
                a in this.penalizedPathways || (this.penalizedPathways[a] = performance.now()), !r && i && (r = i.reduce((o, l)=>(o.indexOf(l.pathwayId) === -1 && o.push(l.pathwayId), o), [])), r && r.length > 1 && (this.updatePathwayPriority(r), s.resolved = this.pathwayId !== a), s.resolved || S.warn(`Could not resolve ${t.details} ("${t.error.message}") with content-steering for Pathway: ${a} levels: ${i && i.length} priorities: ${JSON.stringify(r)} penalized: ${JSON.stringify(this.penalizedPathways)}`);
            }
        }
        filterParsedLevels(e) {
            this.levels = e;
            let t = this.getLevelsForPathway(this.pathwayId);
            if (t.length === 0) {
                const s = e[0].pathwayId;
                this.log(`No levels found in Pathway ${this.pathwayId}. Setting initial Pathway to "${s}"`), t = this.getLevelsForPathway(s), this.pathwayId = s;
            }
            return t.length !== e.length ? (this.log(`Found ${t.length}/${e.length} levels in Pathway "${this.pathwayId}"`), t) : e;
        }
        getLevelsForPathway(e) {
            return this.levels === null ? [] : this.levels.filter((t)=>e === t.pathwayId);
        }
        updatePathwayPriority(e) {
            this.pathwayPriority = e;
            let t;
            const s = this.penalizedPathways, i = performance.now();
            Object.keys(s).forEach((r)=>{
                i - s[r] > uu && delete s[r];
            });
            for(let r = 0; r < e.length; r++){
                const a = e[r];
                if (a in s) continue;
                if (a === this.pathwayId) return;
                const o = this.hls.nextLoadLevel, l = this.hls.levels[o];
                if (t = this.getLevelsForPathway(a), t.length > 0) {
                    this.log(`Setting Pathway to "${a}"`), this.pathwayId = a, ca(t), this.hls.trigger(p.LEVELS_UPDATED, {
                        levels: t
                    });
                    const c = this.hls.levels[o];
                    l && c && this.levels && (c.attrs["STABLE-VARIANT-ID"] !== l.attrs["STABLE-VARIANT-ID"] && c.bitrate !== l.bitrate && this.log(`Unstable Pathways change from bitrate ${l.bitrate} to ${c.bitrate}`), this.hls.nextLoadLevel = o);
                    break;
                }
            }
        }
        getPathwayForGroupId(e, t, s) {
            const i = this.getLevelsForPathway(s).concat(this.levels || []);
            for(let r = 0; r < i.length; r++)if (t === q.AUDIO_TRACK && i[r].hasAudioGroup(e) || t === q.SUBTITLE_TRACK && i[r].hasSubtitleGroup(e)) return i[r].pathwayId;
            return s;
        }
        clonePathways(e) {
            const t = this.levels;
            if (!t) return;
            const s = {}, i = {};
            e.forEach((r)=>{
                const { ID: a, "BASE-ID": o, "URI-REPLACEMENT": l } = r;
                if (t.some((d)=>d.pathwayId === a)) return;
                const c = this.getLevelsForPathway(o).map((d)=>{
                    const u = new te(d.attrs);
                    u["PATHWAY-ID"] = a;
                    const h = u.AUDIO && `${u.AUDIO}_clone_${a}`, f = u.SUBTITLES && `${u.SUBTITLES}_clone_${a}`;
                    h && (s[u.AUDIO] = h, u.AUDIO = h), f && (i[u.SUBTITLES] = f, u.SUBTITLES = f);
                    const g = Wa(d.uri, u["STABLE-VARIANT-ID"], "PER-VARIANT-URIS", l), m = new Dt({
                        attrs: u,
                        audioCodec: d.audioCodec,
                        bitrate: d.bitrate,
                        height: d.height,
                        name: d.name,
                        url: g,
                        videoCodec: d.videoCodec,
                        width: d.width
                    });
                    if (d.audioGroups) for(let y = 1; y < d.audioGroups.length; y++)m.addGroupId("audio", `${d.audioGroups[y]}_clone_${a}`);
                    if (d.subtitleGroups) for(let y = 1; y < d.subtitleGroups.length; y++)m.addGroupId("text", `${d.subtitleGroups[y]}_clone_${a}`);
                    return m;
                });
                t.push(...c), Ar(this.audioTracks, s, l, a), Ar(this.subtitleTracks, i, l, a);
            });
        }
        loadSteeringManifest(e) {
            const t = this.hls.config, s = t.loader;
            this.loader && this.loader.destroy(), this.loader = new s(t);
            let i;
            try {
                i = new self.URL(e);
            } catch  {
                this.enabled = !1, this.log(`Failed to parse Steering Manifest URI: ${e}`);
                return;
            }
            if (i.protocol !== "data:") {
                const d = (this.hls.bandwidthEstimate || t.abrEwmaDefaultEstimate) | 0;
                i.searchParams.set("_HLS_pathway", this.pathwayId), i.searchParams.set("_HLS_throughput", "" + d);
            }
            const r = {
                responseType: "json",
                url: i.href
            }, a = t.steeringManifestLoadPolicy.default, o = a.errorRetry || a.timeoutRetry || {}, l = {
                loadPolicy: a,
                timeout: a.maxLoadTimeMs,
                maxRetry: o.maxNumRetry || 0,
                retryDelay: o.retryDelayMs || 0,
                maxRetryDelay: o.maxRetryDelayMs || 0
            }, c = {
                onSuccess: (d, u, h, f)=>{
                    this.log(`Loaded steering manifest: "${i}"`);
                    const g = d.data;
                    if (g.VERSION !== 1) {
                        this.log(`Steering VERSION ${g.VERSION} not supported!`);
                        return;
                    }
                    this.updated = performance.now(), this.timeToLoad = g.TTL;
                    const { "RELOAD-URI": m, "PATHWAY-CLONES": y, "PATHWAY-PRIORITY": E } = g;
                    if (m) try {
                        this.uri = new self.URL(m, i).href;
                    } catch  {
                        this.enabled = !1, this.log(`Failed to parse Steering Manifest RELOAD-URI: ${m}`);
                        return;
                    }
                    this.scheduleRefresh(this.uri || h.url), y && this.clonePathways(y);
                    const x = {
                        steeringManifest: g,
                        url: i.toString()
                    };
                    this.hls.trigger(p.STEERING_MANIFEST_LOADED, x), E && this.updatePathwayPriority(E);
                },
                onError: (d, u, h, f)=>{
                    if (this.log(`Error loading steering manifest: ${d.code} ${d.text} (${u.url})`), this.stopLoad(), d.code === 410) {
                        this.enabled = !1, this.log(`Steering manifest ${u.url} no longer available`);
                        return;
                    }
                    let g = this.timeToLoad * 1e3;
                    if (d.code === 429) {
                        const m = this.loader;
                        if (typeof m?.getResponseHeader == "function") {
                            const y = m.getResponseHeader("Retry-After");
                            y && (g = parseFloat(y) * 1e3);
                        }
                        this.log(`Steering manifest ${u.url} rate limited`);
                        return;
                    }
                    this.scheduleRefresh(this.uri || u.url, g);
                },
                onTimeout: (d, u, h)=>{
                    this.log(`Timeout loading steering manifest (${u.url})`), this.scheduleRefresh(this.uri || u.url);
                }
            };
            this.log(`Requesting steering manifest: ${i}`), this.loader.load(r, l, c);
        }
        scheduleRefresh(e, t = this.timeToLoad * 1e3) {
            this.clearTimeout(), this.reloadTimer = self.setTimeout(()=>{
                var s;
                const i = (s = this.hls) == null ? void 0 : s.media;
                if (i && !i.ended) {
                    this.loadSteeringManifest(e);
                    return;
                }
                this.scheduleRefresh(e, this.timeToLoad * 1e3);
            }, t);
        }
    }
    function Ar(n, e, t, s) {
        n && Object.keys(e).forEach((i)=>{
            const r = n.filter((a)=>a.groupId === i).map((a)=>{
                const o = re({}, a);
                return o.details = void 0, o.attrs = new te(o.attrs), o.url = o.attrs.URI = Wa(a.url, a.attrs["STABLE-RENDITION-ID"], "PER-RENDITION-URIS", t), o.groupId = o.attrs["GROUP-ID"] = e[i], o.attrs["PATHWAY-ID"] = s, o;
            });
            n.push(...r);
        });
    }
    function Wa(n, e, t, s) {
        const { HOST: i, PARAMS: r, [t]: a } = s;
        let o;
        e && (o = a?.[e], o && (n = o));
        const l = new self.URL(n);
        return i && !o && (l.host = i), r && Object.keys(r).sort().forEach((c)=>{
            c && l.searchParams.set(c, r[c]);
        }), l.href;
    }
    const fu = /^age:\s*[\d.]+\s*$/im;
    class Ya {
        constructor(e){
            this.xhrSetup = void 0, this.requestTimeout = void 0, this.retryTimeout = void 0, this.retryDelay = void 0, this.config = null, this.callbacks = null, this.context = null, this.loader = null, this.stats = void 0, this.xhrSetup = e && e.xhrSetup || null, this.stats = new Ws, this.retryDelay = 0;
        }
        destroy() {
            this.callbacks = null, this.abortInternal(), this.loader = null, this.config = null, this.context = null, this.xhrSetup = null;
        }
        abortInternal() {
            const e = this.loader;
            self.clearTimeout(this.requestTimeout), self.clearTimeout(this.retryTimeout), e && (e.onreadystatechange = null, e.onprogress = null, e.readyState !== 4 && (this.stats.aborted = !0, e.abort()));
        }
        abort() {
            var e;
            this.abortInternal(), (e = this.callbacks) != null && e.onAbort && this.callbacks.onAbort(this.stats, this.context, this.loader);
        }
        load(e, t, s) {
            if (this.stats.loading.start) throw new Error("Loader can only be used once.");
            this.stats.loading.start = self.performance.now(), this.context = e, this.config = t, this.callbacks = s, this.loadInternal();
        }
        loadInternal() {
            const { config: e, context: t } = this;
            if (!e || !t) return;
            const s = this.loader = new self.XMLHttpRequest, i = this.stats;
            i.loading.first = 0, i.loaded = 0, i.aborted = !1;
            const r = this.xhrSetup;
            r ? Promise.resolve().then(()=>{
                if (!(this.loader !== s || this.stats.aborted)) return r(s, t.url);
            }).catch((a)=>{
                if (!(this.loader !== s || this.stats.aborted)) return s.open("GET", t.url, !0), r(s, t.url);
            }).then(()=>{
                this.loader !== s || this.stats.aborted || this.openAndSendXhr(s, t, e);
            }).catch((a)=>{
                this.callbacks.onError({
                    code: s.status,
                    text: a.message
                }, t, s, i);
            }) : this.openAndSendXhr(s, t, e);
        }
        openAndSendXhr(e, t, s) {
            e.readyState || e.open("GET", t.url, !0);
            const i = t.headers, { maxTimeToFirstByteMs: r, maxLoadTimeMs: a } = s.loadPolicy;
            if (i) for(const o in i)e.setRequestHeader(o, i[o]);
            t.rangeEnd && e.setRequestHeader("Range", "bytes=" + t.rangeStart + "-" + (t.rangeEnd - 1)), e.onreadystatechange = this.readystatechange.bind(this), e.onprogress = this.loadprogress.bind(this), e.responseType = t.responseType, self.clearTimeout(this.requestTimeout), s.timeout = r && M(r) ? r : a, this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), s.timeout), e.send();
        }
        readystatechange() {
            const { context: e, loader: t, stats: s } = this;
            if (!e || !t) return;
            const i = t.readyState, r = this.config;
            if (!s.aborted && i >= 2 && (s.loading.first === 0 && (s.loading.first = Math.max(self.performance.now(), s.loading.start), r.timeout !== r.loadPolicy.maxLoadTimeMs && (self.clearTimeout(this.requestTimeout), r.timeout = r.loadPolicy.maxLoadTimeMs, this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), r.loadPolicy.maxLoadTimeMs - (s.loading.first - s.loading.start)))), i === 4)) {
                self.clearTimeout(this.requestTimeout), t.onreadystatechange = null, t.onprogress = null;
                const a = t.status, o = t.responseType !== "text";
                if (a >= 200 && a < 300 && (o && t.response || t.responseText !== null)) {
                    s.loading.end = Math.max(self.performance.now(), s.loading.first);
                    const l = o ? t.response : t.responseText, c = t.responseType === "arraybuffer" ? l.byteLength : l.length;
                    if (s.loaded = s.total = c, s.bwEstimate = s.total * 8e3 / (s.loading.end - s.loading.first), !this.callbacks) return;
                    const d = this.callbacks.onProgress;
                    if (d && d(s, e, l, t), !this.callbacks) return;
                    const u = {
                        url: t.responseURL,
                        data: l,
                        code: a
                    };
                    this.callbacks.onSuccess(u, s, e, t);
                } else {
                    const l = r.loadPolicy.errorRetry, c = s.retry, d = {
                        url: e.url,
                        data: void 0,
                        code: a
                    };
                    Fs(l, c, !1, d) ? this.retry(l) : (S.error(`${a} while loading ${e.url}`), this.callbacks.onError({
                        code: a,
                        text: t.statusText
                    }, e, t, s));
                }
            }
        }
        loadtimeout() {
            if (!this.config) return;
            const e = this.config.loadPolicy.timeoutRetry, t = this.stats.retry;
            if (Fs(e, t, !0)) this.retry(e);
            else {
                var s;
                S.warn(`timeout while loading ${(s = this.context) == null ? void 0 : s.url}`);
                const i = this.callbacks;
                i && (this.abortInternal(), i.onTimeout(this.stats, this.context, this.loader));
            }
        }
        retry(e) {
            const { context: t, stats: s } = this;
            this.retryDelay = rn(e, s.retry), s.retry++, S.warn(`${status ? "HTTP Status " + status : "Timeout"} while loading ${t?.url}, retrying ${s.retry}/${e.maxNumRetry} in ${this.retryDelay}ms`), this.abortInternal(), this.loader = null, self.clearTimeout(this.retryTimeout), this.retryTimeout = self.setTimeout(this.loadInternal.bind(this), this.retryDelay);
        }
        loadprogress(e) {
            const t = this.stats;
            t.loaded = e.loaded, e.lengthComputable && (t.total = e.total);
        }
        getCacheAge() {
            let e = null;
            if (this.loader && fu.test(this.loader.getAllResponseHeaders())) {
                const t = this.loader.getResponseHeader("age");
                e = t ? parseFloat(t) : null;
            }
            return e;
        }
        getResponseHeader(e) {
            return this.loader && new RegExp(`^${e}:\\s*[\\d.]+\\s*$`, "im").test(this.loader.getAllResponseHeaders()) ? this.loader.getResponseHeader(e) : null;
        }
    }
    function gu() {
        if (self.fetch && self.AbortController && self.ReadableStream && self.Request) try {
            return new self.ReadableStream({}), !0;
        } catch  {}
        return !1;
    }
    const mu = /(\d+)-(\d+)\/(\d+)/;
    class br {
        constructor(e){
            this.fetchSetup = void 0, this.requestTimeout = void 0, this.request = null, this.response = null, this.controller = void 0, this.context = null, this.config = null, this.callbacks = null, this.stats = void 0, this.loader = null, this.fetchSetup = e.fetchSetup || Tu, this.controller = new self.AbortController, this.stats = new Ws;
        }
        destroy() {
            this.loader = this.callbacks = this.context = this.config = this.request = null, this.abortInternal(), this.response = null, this.fetchSetup = this.controller = this.stats = null;
        }
        abortInternal() {
            this.controller && !this.stats.loading.end && (this.stats.aborted = !0, this.controller.abort());
        }
        abort() {
            var e;
            this.abortInternal(), (e = this.callbacks) != null && e.onAbort && this.callbacks.onAbort(this.stats, this.context, this.response);
        }
        load(e, t, s) {
            const i = this.stats;
            if (i.loading.start) throw new Error("Loader can only be used once.");
            i.loading.start = self.performance.now();
            const r = pu(e, this.controller.signal), a = s.onProgress, o = e.responseType === "arraybuffer", l = o ? "byteLength" : "length", { maxTimeToFirstByteMs: c, maxLoadTimeMs: d } = t.loadPolicy;
            this.context = e, this.config = t, this.callbacks = s, this.request = this.fetchSetup(e, r), self.clearTimeout(this.requestTimeout), t.timeout = c && M(c) ? c : d, this.requestTimeout = self.setTimeout(()=>{
                this.abortInternal(), s.onTimeout(i, e, this.response);
            }, t.timeout), self.fetch(this.request).then((u)=>{
                this.response = this.loader = u;
                const h = Math.max(self.performance.now(), i.loading.start);
                if (self.clearTimeout(this.requestTimeout), t.timeout = d, this.requestTimeout = self.setTimeout(()=>{
                    this.abortInternal(), s.onTimeout(i, e, this.response);
                }, d - (h - i.loading.start)), !u.ok) {
                    const { status: f, statusText: g } = u;
                    throw new xu(g || "fetch, bad network response", f, u);
                }
                return i.loading.first = h, i.total = Eu(u.headers) || i.total, a && M(t.highWaterMark) ? this.loadProgressively(u, i, e, t.highWaterMark, a) : o ? u.arrayBuffer() : e.responseType === "json" ? u.json() : u.text();
            }).then((u)=>{
                const h = this.response;
                if (!h) throw new Error("loader destroyed");
                self.clearTimeout(this.requestTimeout), i.loading.end = Math.max(self.performance.now(), i.loading.first);
                const f = u[l];
                f && (i.loaded = i.total = f);
                const g = {
                    url: h.url,
                    data: u,
                    code: h.status
                };
                a && !M(t.highWaterMark) && a(i, e, u, h), s.onSuccess(g, i, e, h);
            }).catch((u)=>{
                if (self.clearTimeout(this.requestTimeout), i.aborted) return;
                const h = u && u.code || 0, f = u ? u.message : null;
                s.onError({
                    code: h,
                    text: f
                }, e, u ? u.details : null, i);
            });
        }
        getCacheAge() {
            let e = null;
            if (this.response) {
                const t = this.response.headers.get("age");
                e = t ? parseFloat(t) : null;
            }
            return e;
        }
        getResponseHeader(e) {
            return this.response ? this.response.headers.get(e) : null;
        }
        loadProgressively(e, t, s, i = 0, r) {
            const a = new fa, o = e.body.getReader(), l = ()=>o.read().then((c)=>{
                    if (c.done) return a.dataLength && r(t, s, a.flush(), e), Promise.resolve(new ArrayBuffer(0));
                    const d = c.value, u = d.length;
                    return t.loaded += u, u < i || a.dataLength ? (a.push(d), a.dataLength >= i && r(t, s, a.flush(), e)) : r(t, s, d, e), l();
                }).catch(()=>Promise.reject());
            return l();
        }
    }
    function pu(n, e) {
        const t = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            signal: e,
            headers: new self.Headers(re({}, n.headers))
        };
        return n.rangeEnd && t.headers.set("Range", "bytes=" + n.rangeStart + "-" + String(n.rangeEnd - 1)), t;
    }
    function yu(n) {
        const e = mu.exec(n);
        if (e) return parseInt(e[2]) - parseInt(e[1]) + 1;
    }
    function Eu(n) {
        const e = n.get("Content-Range");
        if (e) {
            const s = yu(e);
            if (M(s)) return s;
        }
        const t = n.get("Content-Length");
        if (t) return parseInt(t);
    }
    function Tu(n, e) {
        return new self.Request(n.url, e);
    }
    class xu extends Error {
        constructor(e, t, s){
            super(e), this.code = void 0, this.details = void 0, this.code = t, this.details = s;
        }
    }
    const vu = /\s/, Su = {
        newCue (n, e, t, s) {
            const i = [];
            let r, a, o, l, c;
            const d = self.VTTCue || self.TextTrackCue;
            for(let h = 0; h < s.rows.length; h++)if (r = s.rows[h], o = !0, l = 0, c = "", !r.isEmpty()) {
                var u;
                for(let m = 0; m < r.chars.length; m++)vu.test(r.chars[m].uchar) && o ? l++ : (c += r.chars[m].uchar, o = !1);
                r.cueStartTime = e, e === t && (t += 1e-4), l >= 16 ? l-- : l++;
                const f = Oa(c.trim()), g = pn(e, t, f);
                n != null && (u = n.cues) != null && u.getCueById(g) || (a = new d(e, t, f), a.id = g, a.line = h + 1, a.align = "left", a.position = 10 + Math.min(80, Math.floor(l * 8 / 32) * 10), i.push(a));
            }
            return n && i.length && (i.sort((h, f)=>h.line === "auto" || f.line === "auto" ? 0 : h.line > 8 && f.line > 8 ? f.line - h.line : h.line - f.line), i.forEach((h)=>ra(n, h))), i;
        }
    }, Lu = {
        maxTimeToFirstByteMs: 8e3,
        maxLoadTimeMs: 2e4,
        timeoutRetry: null,
        errorRetry: null
    }, qa = ue(ue({
        autoStartLoad: !0,
        startPosition: -1,
        defaultAudioCodec: void 0,
        debug: !1,
        capLevelOnFPSDrop: !1,
        capLevelToPlayerSize: !1,
        ignoreDevicePixelRatio: !1,
        preferManagedMediaSource: !0,
        initialLiveManifestSize: 1,
        maxBufferLength: 30,
        backBufferLength: 1 / 0,
        frontBufferFlushThreshold: 1 / 0,
        maxBufferSize: 60 * 1e3 * 1e3,
        maxBufferHole: .1,
        highBufferWatchdogPeriod: 2,
        nudgeOffset: .1,
        nudgeMaxRetry: 3,
        maxFragLookUpTolerance: .25,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 1 / 0,
        liveSyncDuration: void 0,
        liveMaxLatencyDuration: void 0,
        maxLiveSyncPlaybackRate: 1,
        liveDurationInfinity: !1,
        liveBackBufferLength: null,
        maxMaxBufferLength: 600,
        enableWorker: !0,
        workerPath: null,
        enableSoftwareAES: !0,
        startLevel: void 0,
        startFragPrefetch: !1,
        fpsDroppedMonitoringPeriod: 5e3,
        fpsDroppedMonitoringThreshold: .2,
        appendErrorMaxRetry: 3,
        loader: Ya,
        fLoader: void 0,
        pLoader: void 0,
        xhrSetup: void 0,
        licenseXhrSetup: void 0,
        licenseResponseCallback: void 0,
        abrController: Xl,
        bufferController: ed,
        capLevelController: yn,
        errorController: Ul,
        fpsController: Dd,
        stretchShortVideoTrack: !1,
        maxAudioFramesDrift: 1,
        forceKeyFrameOnDiscontinuity: !0,
        abrEwmaFastLive: 3,
        abrEwmaSlowLive: 9,
        abrEwmaFastVoD: 3,
        abrEwmaSlowVoD: 9,
        abrEwmaDefaultEstimate: 5e5,
        abrEwmaDefaultEstimateMax: 5e6,
        abrBandWidthFactor: .95,
        abrBandWidthUpFactor: .7,
        abrMaxWithRealBitrate: !1,
        maxStarvationDelay: 4,
        maxLoadingDelay: 4,
        minAutoBitrate: 0,
        emeEnabled: !1,
        widevineLicenseUrl: void 0,
        drmSystems: {},
        drmSystemOptions: {},
        requestMediaKeySystemAccessFunc: Wr,
        testBandwidth: !0,
        progressive: !1,
        lowLatencyMode: !0,
        cmcd: void 0,
        enableDateRangeMetadataCues: !0,
        enableEmsgMetadataCues: !0,
        enableID3MetadataCues: !0,
        useMediaCapabilities: !0,
        certLoadPolicy: {
            default: Lu
        },
        keyLoadPolicy: {
            default: {
                maxTimeToFirstByteMs: 8e3,
                maxLoadTimeMs: 2e4,
                timeoutRetry: {
                    maxNumRetry: 1,
                    retryDelayMs: 1e3,
                    maxRetryDelayMs: 2e4,
                    backoff: "linear"
                },
                errorRetry: {
                    maxNumRetry: 8,
                    retryDelayMs: 1e3,
                    maxRetryDelayMs: 2e4,
                    backoff: "linear"
                }
            }
        },
        manifestLoadPolicy: {
            default: {
                maxTimeToFirstByteMs: 1 / 0,
                maxLoadTimeMs: 2e4,
                timeoutRetry: {
                    maxNumRetry: 2,
                    retryDelayMs: 0,
                    maxRetryDelayMs: 0
                },
                errorRetry: {
                    maxNumRetry: 1,
                    retryDelayMs: 1e3,
                    maxRetryDelayMs: 8e3
                }
            }
        },
        playlistLoadPolicy: {
            default: {
                maxTimeToFirstByteMs: 1e4,
                maxLoadTimeMs: 2e4,
                timeoutRetry: {
                    maxNumRetry: 2,
                    retryDelayMs: 0,
                    maxRetryDelayMs: 0
                },
                errorRetry: {
                    maxNumRetry: 2,
                    retryDelayMs: 1e3,
                    maxRetryDelayMs: 8e3
                }
            }
        },
        fragLoadPolicy: {
            default: {
                maxTimeToFirstByteMs: 1e4,
                maxLoadTimeMs: 12e4,
                timeoutRetry: {
                    maxNumRetry: 4,
                    retryDelayMs: 0,
                    maxRetryDelayMs: 0
                },
                errorRetry: {
                    maxNumRetry: 6,
                    retryDelayMs: 1e3,
                    maxRetryDelayMs: 8e3
                }
            }
        },
        steeringManifestLoadPolicy: {
            default: {
                maxTimeToFirstByteMs: 1e4,
                maxLoadTimeMs: 2e4,
                timeoutRetry: {
                    maxNumRetry: 2,
                    retryDelayMs: 0,
                    maxRetryDelayMs: 0
                },
                errorRetry: {
                    maxNumRetry: 1,
                    retryDelayMs: 1e3,
                    maxRetryDelayMs: 8e3
                }
            }
        },
        manifestLoadingTimeOut: 1e4,
        manifestLoadingMaxRetry: 1,
        manifestLoadingRetryDelay: 1e3,
        manifestLoadingMaxRetryTimeout: 64e3,
        levelLoadingTimeOut: 1e4,
        levelLoadingMaxRetry: 4,
        levelLoadingRetryDelay: 1e3,
        levelLoadingMaxRetryTimeout: 64e3,
        fragLoadingTimeOut: 2e4,
        fragLoadingMaxRetry: 6,
        fragLoadingRetryDelay: 1e3,
        fragLoadingMaxRetryTimeout: 64e3
    }, Au()), {}, {
        subtitleStreamController: Xc,
        subtitleTrackController: Jc,
        timelineController: Rd,
        audioStreamController: jc,
        audioTrackController: zc,
        emeController: Rt,
        cmcdController: du,
        contentSteeringController: hu
    });
    function Au() {
        return {
            cueHandler: Su,
            enableWebVTT: !0,
            enableIMSC1: !0,
            enableCEA708Captions: !0,
            captionsTextTrack1Label: "English",
            captionsTextTrack1LanguageCode: "en",
            captionsTextTrack2Label: "Spanish",
            captionsTextTrack2LanguageCode: "es",
            captionsTextTrack3Label: "Unknown CC",
            captionsTextTrack3LanguageCode: "",
            captionsTextTrack4Label: "Unknown CC",
            captionsTextTrack4LanguageCode: "",
            renderTextTracksNatively: !0
        };
    }
    function bu(n, e) {
        if ((e.liveSyncDurationCount || e.liveMaxLatencyDurationCount) && (e.liveSyncDuration || e.liveMaxLatencyDuration)) throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
        if (e.liveMaxLatencyDurationCount !== void 0 && (e.liveSyncDurationCount === void 0 || e.liveMaxLatencyDurationCount <= e.liveSyncDurationCount)) throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"');
        if (e.liveMaxLatencyDuration !== void 0 && (e.liveSyncDuration === void 0 || e.liveMaxLatencyDuration <= e.liveSyncDuration)) throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"');
        const t = Wi(n), s = [
            "manifest",
            "level",
            "frag"
        ], i = [
            "TimeOut",
            "MaxRetry",
            "RetryDelay",
            "MaxRetryTimeout"
        ];
        return s.forEach((r)=>{
            const a = `${r === "level" ? "playlist" : r}LoadPolicy`, o = e[a] === void 0, l = [];
            i.forEach((c)=>{
                const d = `${r}Loading${c}`, u = e[d];
                if (u !== void 0 && o) {
                    l.push(d);
                    const h = t[a].default;
                    switch(e[a] = {
                        default: h
                    }, c){
                        case "TimeOut":
                            h.maxLoadTimeMs = u, h.maxTimeToFirstByteMs = u;
                            break;
                        case "MaxRetry":
                            h.errorRetry.maxNumRetry = u, h.timeoutRetry.maxNumRetry = u;
                            break;
                        case "RetryDelay":
                            h.errorRetry.retryDelayMs = u, h.timeoutRetry.retryDelayMs = u;
                            break;
                        case "MaxRetryTimeout":
                            h.errorRetry.maxRetryDelayMs = u, h.timeoutRetry.maxRetryDelayMs = u;
                            break;
                    }
                }
            }), l.length && S.warn(`hls.js config: "${l.join('", "')}" setting(s) are deprecated, use "${a}": ${JSON.stringify(e[a])}`);
        }), ue(ue({}, t), e);
    }
    function Wi(n) {
        return n && typeof n == "object" ? Array.isArray(n) ? n.map(Wi) : Object.keys(n).reduce((e, t)=>(e[t] = Wi(n[t]), e), {}) : n;
    }
    function Ru(n) {
        const e = n.loader;
        e !== br && e !== Ya ? (S.log("[config]: Custom loader detected, cannot enable progressive streaming"), n.progressive = !1) : gu() && (n.loader = br, n.progressive = !0, n.enableSoftwareAES = !0, S.log("[config]: Progressive streaming enabled, using FetchLoader"));
    }
    let xi;
    class Iu extends an {
        constructor(e, t){
            super(e, "[level-controller]"), this._levels = [], this._firstLevel = -1, this._maxAutoLevel = -1, this._startLevel = void 0, this.currentLevel = null, this.currentLevelIndex = -1, this.manualLevelIndex = -1, this.steering = void 0, this.onParsedComplete = void 0, this.steering = t, this._registerListeners();
        }
        _registerListeners() {
            const { hls: e } = this;
            e.on(p.MANIFEST_LOADING, this.onManifestLoading, this), e.on(p.MANIFEST_LOADED, this.onManifestLoaded, this), e.on(p.LEVEL_LOADED, this.onLevelLoaded, this), e.on(p.LEVELS_UPDATED, this.onLevelsUpdated, this), e.on(p.FRAG_BUFFERED, this.onFragBuffered, this), e.on(p.ERROR, this.onError, this);
        }
        _unregisterListeners() {
            const { hls: e } = this;
            e.off(p.MANIFEST_LOADING, this.onManifestLoading, this), e.off(p.MANIFEST_LOADED, this.onManifestLoaded, this), e.off(p.LEVEL_LOADED, this.onLevelLoaded, this), e.off(p.LEVELS_UPDATED, this.onLevelsUpdated, this), e.off(p.FRAG_BUFFERED, this.onFragBuffered, this), e.off(p.ERROR, this.onError, this);
        }
        destroy() {
            this._unregisterListeners(), this.steering = null, this.resetLevels(), super.destroy();
        }
        stopLoad() {
            this._levels.forEach((t)=>{
                t.loadError = 0, t.fragmentError = 0;
            }), super.stopLoad();
        }
        resetLevels() {
            this._startLevel = void 0, this.manualLevelIndex = -1, this.currentLevelIndex = -1, this.currentLevel = null, this._levels = [], this._maxAutoLevel = -1;
        }
        onManifestLoading(e, t) {
            this.resetLevels();
        }
        onManifestLoaded(e, t) {
            const s = this.hls.config.preferManagedMediaSource, i = [], r = {}, a = {};
            let o = !1, l = !1, c = !1;
            t.levels.forEach((d)=>{
                var u, h;
                const f = d.attrs;
                let { audioCodec: g, videoCodec: m } = d;
                ((u = g) == null ? void 0 : u.indexOf("mp4a.40.34")) !== -1 && (xi || (xi = /chrome|firefox/i.test(navigator.userAgent)), xi && (d.audioCodec = g = void 0)), g && (d.audioCodec = g = _s(g, s)), ((h = m) == null ? void 0 : h.indexOf("avc1")) === 0 && (m = d.videoCodec = fl(m));
                const { width: y, height: E, unknownCodecs: x } = d;
                if (o || (o = !!(y && E)), l || (l = !!m), c || (c = !!g), x != null && x.length || g && !ri(g, "audio", s) || m && !ri(m, "video", s)) return;
                const { CODECS: T, "FRAME-RATE": R, "HDCP-LEVEL": v, "PATHWAY-ID": D, RESOLUTION: b, "VIDEO-RANGE": w } = f, I = `${`${D || "."}-`}${d.bitrate}-${b}-${R}-${T}-${w}-${v}`;
                if (r[I]) if (r[I].uri !== d.url && !d.attrs["PATHWAY-ID"]) {
                    const _ = a[I] += 1;
                    d.attrs["PATHWAY-ID"] = new Array(_ + 1).join(".");
                    const V = new Dt(d);
                    r[I] = V, i.push(V);
                } else r[I].addGroupId("audio", f.AUDIO), r[I].addGroupId("text", f.SUBTITLES);
                else {
                    const _ = new Dt(d);
                    r[I] = _, a[I] = 1, i.push(_);
                }
            }), this.filterAndSortMediaOptions(i, t, o, l, c);
        }
        filterAndSortMediaOptions(e, t, s, i, r) {
            let a = [], o = [], l = e;
            if ((s || i) && r && (l = l.filter(({ videoCodec: g, videoRange: m, width: y, height: E })=>(!!g || !!(y && E)) && Rl(m))), l.length === 0) {
                Promise.resolve().then(()=>{
                    if (this.hls) {
                        t.levels.length && this.warn(`One or more CODECS in variant not supported: ${JSON.stringify(t.levels[0].attrs)}`);
                        const g = new Error("no level with compatible codecs found in manifest");
                        this.hls.trigger(p.ERROR, {
                            type: G.MEDIA_ERROR,
                            details: A.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                            fatal: !0,
                            url: t.url,
                            error: g,
                            reason: g.message
                        });
                    }
                });
                return;
            }
            if (t.audioTracks) {
                const { preferManagedMediaSource: g } = this.hls.config;
                a = t.audioTracks.filter((m)=>!m.audioCodec || ri(m.audioCodec, "audio", g)), Rr(a);
            }
            t.subtitles && (o = t.subtitles, Rr(o));
            const c = l.slice(0);
            l.sort((g, m)=>{
                if (g.attrs["HDCP-LEVEL"] !== m.attrs["HDCP-LEVEL"]) return (g.attrs["HDCP-LEVEL"] || "") > (m.attrs["HDCP-LEVEL"] || "") ? 1 : -1;
                if (s && g.height !== m.height) return g.height - m.height;
                if (g.frameRate !== m.frameRate) return g.frameRate - m.frameRate;
                if (g.videoRange !== m.videoRange) return ks.indexOf(g.videoRange) - ks.indexOf(m.videoRange);
                if (g.videoCodec !== m.videoCodec) {
                    const y = Pn(g.videoCodec), E = Pn(m.videoCodec);
                    if (y !== E) return E - y;
                }
                if (g.uri === m.uri && g.codecSet !== m.codecSet) {
                    const y = ws(g.codecSet), E = ws(m.codecSet);
                    if (y !== E) return E - y;
                }
                return g.averageBitrate !== m.averageBitrate ? g.averageBitrate - m.averageBitrate : 0;
            });
            let d = c[0];
            if (this.steering && (l = this.steering.filterParsedLevels(l), l.length !== c.length)) {
                for(let g = 0; g < c.length; g++)if (c[g].pathwayId === l[0].pathwayId) {
                    d = c[g];
                    break;
                }
            }
            this._levels = l;
            for(let g = 0; g < l.length; g++)if (l[g] === d) {
                var u;
                this._firstLevel = g;
                const m = d.bitrate, y = this.hls.bandwidthEstimate;
                if (this.log(`manifest loaded, ${l.length} level(s) found, first bitrate: ${m}`), ((u = this.hls.userConfig) == null ? void 0 : u.abrEwmaDefaultEstimate) === void 0) {
                    const E = Math.min(m, this.hls.config.abrEwmaDefaultEstimateMax);
                    E > y && y === qa.abrEwmaDefaultEstimate && (this.hls.bandwidthEstimate = E);
                }
                break;
            }
            const h = r && !i, f = {
                levels: l,
                audioTracks: a,
                subtitleTracks: o,
                sessionData: t.sessionData,
                sessionKeys: t.sessionKeys,
                firstLevel: this._firstLevel,
                stats: t.stats,
                audio: r,
                video: i,
                altAudio: !h && a.some((g)=>!!g.url)
            };
            this.hls.trigger(p.MANIFEST_PARSED, f), (this.hls.config.autoStartLoad || this.hls.forceStartLoad) && this.hls.startLoad(this.hls.config.startPosition);
        }
        get levels() {
            return this._levels.length === 0 ? null : this._levels;
        }
        get level() {
            return this.currentLevelIndex;
        }
        set level(e) {
            const t = this._levels;
            if (t.length === 0) return;
            if (e < 0 || e >= t.length) {
                const d = new Error("invalid level idx"), u = e < 0;
                if (this.hls.trigger(p.ERROR, {
                    type: G.OTHER_ERROR,
                    details: A.LEVEL_SWITCH_ERROR,
                    level: e,
                    fatal: u,
                    error: d,
                    reason: d.message
                }), u) return;
                e = Math.min(e, t.length - 1);
            }
            const s = this.currentLevelIndex, i = this.currentLevel, r = i ? i.attrs["PATHWAY-ID"] : void 0, a = t[e], o = a.attrs["PATHWAY-ID"];
            if (this.currentLevelIndex = e, this.currentLevel = a, s === e && a.details && i && r === o) return;
            this.log(`Switching to level ${e} (${a.height ? a.height + "p " : ""}${a.videoRange ? a.videoRange + " " : ""}${a.codecSet ? a.codecSet + " " : ""}@${a.bitrate})${o ? " with Pathway " + o : ""} from level ${s}${r ? " with Pathway " + r : ""}`);
            const l = {
                level: e,
                attrs: a.attrs,
                details: a.details,
                bitrate: a.bitrate,
                averageBitrate: a.averageBitrate,
                maxBitrate: a.maxBitrate,
                realBitrate: a.realBitrate,
                width: a.width,
                height: a.height,
                codecSet: a.codecSet,
                audioCodec: a.audioCodec,
                videoCodec: a.videoCodec,
                audioGroups: a.audioGroups,
                subtitleGroups: a.subtitleGroups,
                loaded: a.loaded,
                loadError: a.loadError,
                fragmentError: a.fragmentError,
                name: a.name,
                id: a.id,
                uri: a.uri,
                url: a.url,
                urlId: 0,
                audioGroupIds: a.audioGroupIds,
                textGroupIds: a.textGroupIds
            };
            this.hls.trigger(p.LEVEL_SWITCHING, l);
            const c = a.details;
            if (!c || c.live) {
                const d = this.switchParams(a.uri, i?.details, c);
                this.loadPlaylist(d);
            }
        }
        get manualLevel() {
            return this.manualLevelIndex;
        }
        set manualLevel(e) {
            this.manualLevelIndex = e, this._startLevel === void 0 && (this._startLevel = e), e !== -1 && (this.level = e);
        }
        get firstLevel() {
            return this._firstLevel;
        }
        set firstLevel(e) {
            this._firstLevel = e;
        }
        get startLevel() {
            if (this._startLevel === void 0) {
                const e = this.hls.config.startLevel;
                return e !== void 0 ? e : this.hls.firstAutoLevel;
            }
            return this._startLevel;
        }
        set startLevel(e) {
            this._startLevel = e;
        }
        onError(e, t) {
            t.fatal || !t.context || t.context.type === q.LEVEL && t.context.level === this.level && this.checkRetry(t);
        }
        onFragBuffered(e, { frag: t }) {
            if (t !== void 0 && t.type === B.MAIN) {
                const s = t.elementaryStreams;
                if (!Object.keys(s).some((r)=>!!s[r])) return;
                const i = this._levels[t.level];
                i != null && i.loadError && (this.log(`Resetting level error count of ${i.loadError} on frag buffered`), i.loadError = 0);
            }
        }
        onLevelLoaded(e, t) {
            var s;
            const { level: i, details: r } = t, a = this._levels[i];
            if (!a) {
                var o;
                this.warn(`Invalid level index ${i}`), (o = t.deliveryDirectives) != null && o.skip && (r.deltaUpdateFailed = !0);
                return;
            }
            i === this.currentLevelIndex ? (a.fragmentError === 0 && (a.loadError = 0), this.playlistLoaded(i, t, a.details)) : (s = t.deliveryDirectives) != null && s.skip && (r.deltaUpdateFailed = !0);
        }
        loadPlaylist(e) {
            super.loadPlaylist();
            const t = this.currentLevelIndex, s = this.currentLevel;
            if (s && this.shouldLoadPlaylist(s)) {
                let i = s.uri;
                if (e) try {
                    i = e.addDirectives(i);
                } catch (a) {
                    this.warn(`Could not construct new URL with HLS Delivery Directives: ${a}`);
                }
                const r = s.attrs["PATHWAY-ID"];
                this.log(`Loading level index ${t}${e?.msn !== void 0 ? " at sn " + e.msn + " part " + e.part : ""} with${r ? " Pathway " + r : ""} ${i}`), this.clearTimer(), this.hls.trigger(p.LEVEL_LOADING, {
                    url: i,
                    level: t,
                    pathwayId: s.attrs["PATHWAY-ID"],
                    id: 0,
                    deliveryDirectives: e || null
                });
            }
        }
        get nextLoadLevel() {
            return this.manualLevelIndex !== -1 ? this.manualLevelIndex : this.hls.nextAutoLevel;
        }
        set nextLoadLevel(e) {
            this.level = e, this.manualLevelIndex === -1 && (this.hls.nextAutoLevel = e);
        }
        removeLevel(e) {
            var t;
            const s = this._levels.filter((i, r)=>r !== e ? !0 : (this.steering && this.steering.removeLevel(i), i === this.currentLevel && (this.currentLevel = null, this.currentLevelIndex = -1, i.details && i.details.fragments.forEach((a)=>a.level = -1)), !1));
            ca(s), this._levels = s, this.currentLevelIndex > -1 && (t = this.currentLevel) != null && t.details && (this.currentLevelIndex = this.currentLevel.details.fragments[0].level), this.hls.trigger(p.LEVELS_UPDATED, {
                levels: s
            });
        }
        onLevelsUpdated(e, { levels: t }) {
            this._levels = t;
        }
        checkMaxAutoUpdated() {
            const { autoLevelCapping: e, maxAutoLevel: t, maxHdcpLevel: s } = this.hls;
            this._maxAutoLevel !== t && (this._maxAutoLevel = t, this.hls.trigger(p.MAX_AUTO_LEVEL_UPDATED, {
                autoLevelCapping: e,
                levels: this.levels,
                maxAutoLevel: t,
                minAutoLevel: this.hls.minAutoLevel,
                maxHdcpLevel: s
            }));
        }
    }
    function Rr(n) {
        const e = {};
        n.forEach((t)=>{
            const s = t.groupId || "";
            t.id = e[s] = e[s] || 0, e[s]++;
        });
    }
    class Du {
        constructor(e){
            this.config = void 0, this.keyUriToKeyInfo = {}, this.emeController = null, this.config = e;
        }
        abort(e) {
            for(const s in this.keyUriToKeyInfo){
                const i = this.keyUriToKeyInfo[s].loader;
                if (i) {
                    var t;
                    if (e && e !== ((t = i.context) == null ? void 0 : t.frag.type)) return;
                    i.abort();
                }
            }
        }
        detach() {
            for(const e in this.keyUriToKeyInfo){
                const t = this.keyUriToKeyInfo[e];
                (t.mediaKeySessionContext || t.decryptdata.isCommonEncryption) && delete this.keyUriToKeyInfo[e];
            }
        }
        destroy() {
            this.detach();
            for(const e in this.keyUriToKeyInfo){
                const t = this.keyUriToKeyInfo[e].loader;
                t && t.destroy();
            }
            this.keyUriToKeyInfo = {};
        }
        createKeyLoadError(e, t = A.KEY_LOAD_ERROR, s, i, r) {
            return new je({
                type: G.NETWORK_ERROR,
                details: t,
                fatal: !1,
                frag: e,
                response: r,
                error: s,
                networkDetails: i
            });
        }
        loadClear(e, t) {
            if (this.emeController && this.config.emeEnabled) {
                const { sn: s, cc: i } = e;
                for(let r = 0; r < t.length; r++){
                    const a = t[r];
                    if (i <= a.cc && (s === "initSegment" || a.sn === "initSegment" || s < a.sn)) {
                        this.emeController.selectKeySystemFormat(a).then((o)=>{
                            a.setKeyFormat(o);
                        });
                        break;
                    }
                }
            }
        }
        load(e) {
            return !e.decryptdata && e.encrypted && this.emeController ? this.emeController.selectKeySystemFormat(e).then((t)=>this.loadInternal(e, t)) : this.loadInternal(e);
        }
        loadInternal(e, t) {
            var s, i;
            t && e.setKeyFormat(t);
            const r = e.decryptdata;
            if (!r) {
                const c = new Error(t ? `Expected frag.decryptdata to be defined after setting format ${t}` : "Missing decryption data on fragment in onKeyLoading");
                return Promise.reject(this.createKeyLoadError(e, A.KEY_LOAD_ERROR, c));
            }
            const a = r.uri;
            if (!a) return Promise.reject(this.createKeyLoadError(e, A.KEY_LOAD_ERROR, new Error(`Invalid key URI: "${a}"`)));
            let o = this.keyUriToKeyInfo[a];
            if ((s = o) != null && s.decryptdata.key) return r.key = o.decryptdata.key, Promise.resolve({
                frag: e,
                keyInfo: o
            });
            if ((i = o) != null && i.keyLoadPromise) {
                var l;
                switch((l = o.mediaKeySessionContext) == null ? void 0 : l.keyStatus){
                    case void 0:
                    case "status-pending":
                    case "usable":
                    case "usable-in-future":
                        return o.keyLoadPromise.then((c)=>(r.key = c.keyInfo.decryptdata.key, {
                                frag: e,
                                keyInfo: o
                            }));
                }
            }
            switch(o = this.keyUriToKeyInfo[a] = {
                decryptdata: r,
                keyLoadPromise: null,
                loader: null,
                mediaKeySessionContext: null
            }, r.method){
                case "ISO-23001-7":
                case "SAMPLE-AES":
                case "SAMPLE-AES-CENC":
                case "SAMPLE-AES-CTR":
                    return r.keyFormat === "identity" ? this.loadKeyHTTP(o, e) : this.loadKeyEME(o, e);
                case "AES-128":
                    return this.loadKeyHTTP(o, e);
                default:
                    return Promise.reject(this.createKeyLoadError(e, A.KEY_LOAD_ERROR, new Error(`Key supplied with unsupported METHOD: "${r.method}"`)));
            }
        }
        loadKeyEME(e, t) {
            const s = {
                frag: t,
                keyInfo: e
            };
            if (this.emeController && this.config.emeEnabled) {
                const i = this.emeController.loadKey(s);
                if (i) return (e.keyLoadPromise = i.then((r)=>(e.mediaKeySessionContext = r, s))).catch((r)=>{
                    throw e.keyLoadPromise = null, r;
                });
            }
            return Promise.resolve(s);
        }
        loadKeyHTTP(e, t) {
            const s = this.config, i = s.loader, r = new i(s);
            return t.keyLoader = e.loader = r, e.keyLoadPromise = new Promise((a, o)=>{
                const l = {
                    keyInfo: e,
                    frag: t,
                    responseType: "arraybuffer",
                    url: e.decryptdata.uri
                }, c = s.keyLoadPolicy.default, d = {
                    loadPolicy: c,
                    timeout: c.maxLoadTimeMs,
                    maxRetry: 0,
                    retryDelay: 0,
                    maxRetryDelay: 0
                }, u = {
                    onSuccess: (h, f, g, m)=>{
                        const { frag: y, keyInfo: E, url: x } = g;
                        if (!y.decryptdata || E !== this.keyUriToKeyInfo[x]) return o(this.createKeyLoadError(y, A.KEY_LOAD_ERROR, new Error("after key load, decryptdata unset or changed"), m));
                        E.decryptdata.key = y.decryptdata.key = new Uint8Array(h.data), y.keyLoader = null, E.loader = null, a({
                            frag: y,
                            keyInfo: E
                        });
                    },
                    onError: (h, f, g, m)=>{
                        this.resetLoader(f), o(this.createKeyLoadError(t, A.KEY_LOAD_ERROR, new Error(`HTTP Error ${h.code} loading key ${h.text}`), g, ue({
                            url: l.url,
                            data: void 0
                        }, h)));
                    },
                    onTimeout: (h, f, g)=>{
                        this.resetLoader(f), o(this.createKeyLoadError(t, A.KEY_LOAD_TIMEOUT, new Error("key loading timed out"), g));
                    },
                    onAbort: (h, f, g)=>{
                        this.resetLoader(f), o(this.createKeyLoadError(t, A.INTERNAL_ABORTED, new Error("key loading aborted"), g));
                    }
                };
                r.load(l, d, u);
            });
        }
        resetLoader(e) {
            const { frag: t, keyInfo: s, url: i } = e, r = s.loader;
            t.keyLoader === r && (t.keyLoader = null, s.loader = null), delete this.keyUriToKeyInfo[i], r && r.destroy();
        }
    }
    function ja() {
        return self.SourceBuffer || self.WebKitSourceBuffer;
    }
    function za() {
        if (!ft()) return !1;
        const e = ja();
        return !e || e.prototype && typeof e.prototype.appendBuffer == "function" && typeof e.prototype.remove == "function";
    }
    function Cu() {
        if (!za()) return !1;
        const n = ft();
        return typeof n?.isTypeSupported == "function" && ([
            "avc1.42E01E,mp4a.40.2",
            "av01.0.01M.08",
            "vp09.00.50.08"
        ].some((e)=>n.isTypeSupported(Xt(e, "video"))) || [
            "mp4a.40.2",
            "fLaC"
        ].some((e)=>n.isTypeSupported(Xt(e, "audio"))));
    }
    function wu() {
        var n;
        const e = ja();
        return typeof (e == null || (n = e.prototype) == null ? void 0 : n.changeType) == "function";
    }
    const _u = 250, vs = 2, ku = .1, Pu = .05;
    class Fu {
        constructor(e, t, s, i){
            this.config = void 0, this.media = null, this.fragmentTracker = void 0, this.hls = void 0, this.nudgeRetry = 0, this.stallReported = !1, this.stalled = null, this.moved = !1, this.seeking = !1, this.config = e, this.media = t, this.fragmentTracker = s, this.hls = i;
        }
        destroy() {
            this.media = null, this.hls = this.fragmentTracker = null;
        }
        poll(e, t) {
            const { config: s, media: i, stalled: r } = this;
            if (i === null) return;
            const { currentTime: a, seeking: o } = i, l = this.seeking && !o, c = !this.seeking && o;
            if (this.seeking = o, a !== e) {
                if (this.moved = !0, o || (this.nudgeRetry = 0), r !== null) {
                    if (this.stallReported) {
                        const y = self.performance.now() - r;
                        S.warn(`playback not stuck anymore @${a}, after ${Math.round(y)}ms`), this.stallReported = !1;
                    }
                    this.stalled = null;
                }
                return;
            }
            if (c || l) {
                this.stalled = null;
                return;
            }
            if (i.paused && !o || i.ended || i.playbackRate === 0 || !Z.getBuffered(i).length) {
                this.nudgeRetry = 0;
                return;
            }
            const d = Z.bufferInfo(i, a, 0), u = d.nextStart || 0;
            if (o) {
                const y = d.len > vs, E = !u || t && t.start <= a || u - a > vs && !this.fragmentTracker.getPartialFragment(a);
                if (y || E) return;
                this.moved = !1;
            }
            if (!this.moved && this.stalled !== null) {
                var h;
                if (!(d.len > 0) && !u) return;
                const E = Math.max(u, d.start || 0) - a, x = this.hls.levels ? this.hls.levels[this.hls.currentLevel] : null, R = (x == null || (h = x.details) == null ? void 0 : h.live) ? x.details.targetduration * 2 : vs, v = this.fragmentTracker.getPartialFragment(a);
                if (E > 0 && (E <= R || v)) {
                    i.paused || this._trySkipBufferHole(v);
                    return;
                }
            }
            const f = self.performance.now();
            if (r === null) {
                this.stalled = f;
                return;
            }
            const g = f - r;
            if (!o && g >= _u && (this._reportStall(d), !this.media)) return;
            const m = Z.bufferInfo(i, a, s.maxBufferHole);
            this._tryFixBufferStall(m, g);
        }
        _tryFixBufferStall(e, t) {
            const { config: s, fragmentTracker: i, media: r } = this;
            if (r === null) return;
            const a = r.currentTime, o = i.getPartialFragment(a);
            o && (this._trySkipBufferHole(o) || !this.media) || (e.len > s.maxBufferHole || e.nextStart && e.nextStart - a < s.maxBufferHole) && t > s.highBufferWatchdogPeriod * 1e3 && (S.warn("Trying to nudge playhead over buffer-hole"), this.stalled = null, this._tryNudgeBuffer());
        }
        _reportStall(e) {
            const { hls: t, media: s, stallReported: i } = this;
            if (!i && s) {
                this.stallReported = !0;
                const r = new Error(`Playback stalling at @${s.currentTime} due to low buffer (${JSON.stringify(e)})`);
                S.warn(r.message), t.trigger(p.ERROR, {
                    type: G.MEDIA_ERROR,
                    details: A.BUFFER_STALLED_ERROR,
                    fatal: !1,
                    error: r,
                    buffer: e.len
                });
            }
        }
        _trySkipBufferHole(e) {
            const { config: t, hls: s, media: i } = this;
            if (i === null) return 0;
            const r = i.currentTime, a = Z.bufferInfo(i, r, 0), o = r < a.start ? a.start : a.nextStart;
            if (o) {
                const l = a.len <= t.maxBufferHole, c = a.len > 0 && a.len < 1 && i.readyState < 3, d = o - r;
                if (d > 0 && (l || c)) {
                    if (d > t.maxBufferHole) {
                        const { fragmentTracker: h } = this;
                        let f = !1;
                        if (r === 0) {
                            const g = h.getAppendedFrag(0, B.MAIN);
                            g && o < g.end && (f = !0);
                        }
                        if (!f) {
                            const g = e || h.getAppendedFrag(r, B.MAIN);
                            if (g) {
                                let m = !1, y = g.end;
                                for(; y < o;){
                                    const E = h.getPartialFragment(y);
                                    if (E) y += E.duration;
                                    else {
                                        m = !0;
                                        break;
                                    }
                                }
                                if (m) return 0;
                            }
                        }
                    }
                    const u = Math.max(o + Pu, r + ku);
                    if (S.warn(`skipping hole, adjusting currentTime from ${r} to ${u}`), this.moved = !0, this.stalled = null, i.currentTime = u, e && !e.gap) {
                        const h = new Error(`fragment loaded with buffer holes, seeking from ${r} to ${u}`);
                        s.trigger(p.ERROR, {
                            type: G.MEDIA_ERROR,
                            details: A.BUFFER_SEEK_OVER_HOLE,
                            fatal: !1,
                            error: h,
                            reason: h.message,
                            frag: e
                        });
                    }
                    return u;
                }
            }
            return 0;
        }
        _tryNudgeBuffer() {
            const { config: e, hls: t, media: s, nudgeRetry: i } = this;
            if (s === null) return;
            const r = s.currentTime;
            if (this.nudgeRetry++, i < e.nudgeMaxRetry) {
                const a = r + (i + 1) * e.nudgeOffset, o = new Error(`Nudging 'currentTime' from ${r} to ${a}`);
                S.warn(o.message), s.currentTime = a, t.trigger(p.ERROR, {
                    type: G.MEDIA_ERROR,
                    details: A.BUFFER_NUDGE_ON_STALL,
                    error: o,
                    fatal: !1
                });
            } else {
                const a = new Error(`Playhead still not moving while enough data buffered @${r} after ${e.nudgeMaxRetry} nudges`);
                S.error(a.message), t.trigger(p.ERROR, {
                    type: G.MEDIA_ERROR,
                    details: A.BUFFER_STALLED_ERROR,
                    error: a,
                    fatal: !0
                });
            }
        }
    }
    const Ou = 100;
    class Mu extends cn {
        constructor(e, t, s){
            super(e, t, s, "[stream-controller]", B.MAIN), this.audioCodecSwap = !1, this.gapController = null, this.level = -1, this._forceStartLoad = !1, this.altAudio = !1, this.audioOnly = !1, this.fragPlaying = null, this.onvplaying = null, this.onvseeked = null, this.fragLastKbps = 0, this.couldBacktrack = !1, this.backtrackFragment = null, this.audioCodecSwitch = !1, this.videoBuffer = null, this._registerListeners();
        }
        _registerListeners() {
            const { hls: e } = this;
            e.on(p.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(p.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(p.MANIFEST_LOADING, this.onManifestLoading, this), e.on(p.MANIFEST_PARSED, this.onManifestParsed, this), e.on(p.LEVEL_LOADING, this.onLevelLoading, this), e.on(p.LEVEL_LOADED, this.onLevelLoaded, this), e.on(p.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), e.on(p.ERROR, this.onError, this), e.on(p.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), e.on(p.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), e.on(p.BUFFER_CREATED, this.onBufferCreated, this), e.on(p.BUFFER_FLUSHED, this.onBufferFlushed, this), e.on(p.LEVELS_UPDATED, this.onLevelsUpdated, this), e.on(p.FRAG_BUFFERED, this.onFragBuffered, this);
        }
        _unregisterListeners() {
            const { hls: e } = this;
            e.off(p.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(p.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(p.MANIFEST_LOADING, this.onManifestLoading, this), e.off(p.MANIFEST_PARSED, this.onManifestParsed, this), e.off(p.LEVEL_LOADED, this.onLevelLoaded, this), e.off(p.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), e.off(p.ERROR, this.onError, this), e.off(p.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), e.off(p.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), e.off(p.BUFFER_CREATED, this.onBufferCreated, this), e.off(p.BUFFER_FLUSHED, this.onBufferFlushed, this), e.off(p.LEVELS_UPDATED, this.onLevelsUpdated, this), e.off(p.FRAG_BUFFERED, this.onFragBuffered, this);
        }
        onHandlerDestroying() {
            this._unregisterListeners(), super.onHandlerDestroying();
        }
        startLoad(e) {
            if (this.levels) {
                const { lastCurrentTime: t, hls: s } = this;
                if (this.stopLoad(), this.setInterval(Ou), this.level = -1, !this.startFragRequested) {
                    let i = s.startLevel;
                    i === -1 && (s.config.testBandwidth && this.levels.length > 1 ? (i = 0, this.bitrateTest = !0) : i = s.firstAutoLevel), s.nextLoadLevel = i, this.level = s.loadLevel, this.loadedmetadata = !1;
                }
                t > 0 && e === -1 && (this.log(`Override startPosition with lastCurrentTime @${t.toFixed(3)}`), e = t), this.state = C.IDLE, this.nextLoadPosition = this.startPosition = this.lastCurrentTime = e, this.tick();
            } else this._forceStartLoad = !0, this.state = C.STOPPED;
        }
        stopLoad() {
            this._forceStartLoad = !1, super.stopLoad();
        }
        doTick() {
            switch(this.state){
                case C.WAITING_LEVEL:
                    {
                        const { levels: t, level: s } = this, i = t?.[s], r = i?.details;
                        if (r && (!r.live || this.levelLastLoaded === i)) {
                            if (this.waitForCdnTuneIn(r)) break;
                            this.state = C.IDLE;
                            break;
                        } else if (this.hls.nextLoadLevel !== this.level) {
                            this.state = C.IDLE;
                            break;
                        }
                        break;
                    }
                case C.FRAG_LOADING_WAITING_RETRY:
                    {
                        var e;
                        const t = self.performance.now(), s = this.retryDate;
                        if (!s || t >= s || (e = this.media) != null && e.seeking) {
                            const { levels: i, level: r } = this, a = i?.[r];
                            this.resetStartWhenNotLoaded(a || null), this.state = C.IDLE;
                        }
                    }
                    break;
            }
            this.state === C.IDLE && this.doTickIdle(), this.onTickEnd();
        }
        onTickEnd() {
            super.onTickEnd(), this.checkBuffer(), this.checkFragmentChanged();
        }
        doTickIdle() {
            const { hls: e, levelLastLoaded: t, levels: s, media: i } = this;
            if (t === null || !i && (this.startFragRequested || !e.config.startFragPrefetch) || this.altAudio && this.audioOnly) return;
            const r = e.nextLoadLevel;
            if (!(s != null && s[r])) return;
            const a = s[r], o = this.getMainFwdBufferInfo();
            if (o === null) return;
            const l = this.getLevelDetails();
            if (l && this._streamEnded(o, l)) {
                const m = {};
                this.altAudio && (m.type = "video"), this.hls.trigger(p.BUFFER_EOS, m), this.state = C.ENDED;
                return;
            }
            e.loadLevel !== r && e.manualLevel === -1 && this.log(`Adapting to level ${r} from level ${this.level}`), this.level = e.nextLoadLevel = r;
            const c = a.details;
            if (!c || this.state === C.WAITING_LEVEL || c.live && this.levelLastLoaded !== a) {
                this.level = r, this.state = C.WAITING_LEVEL;
                return;
            }
            const d = o.len, u = this.getMaxBufferLength(a.maxBitrate);
            if (d >= u) return;
            this.backtrackFragment && this.backtrackFragment.start > o.end && (this.backtrackFragment = null);
            const h = this.backtrackFragment ? this.backtrackFragment.start : o.end;
            let f = this.getNextFragment(h, c);
            if (this.couldBacktrack && !this.fragPrevious && f && f.sn !== "initSegment" && this.fragmentTracker.getState(f) !== ce.OK) {
                var g;
                const y = ((g = this.backtrackFragment) != null ? g : f).sn - c.startSN, E = c.fragments[y - 1];
                E && f.cc === E.cc && (f = E, this.fragmentTracker.removeFragment(E));
            } else this.backtrackFragment && o.len && (this.backtrackFragment = null);
            if (f && this.isLoopLoading(f, h)) {
                if (!f.gap) {
                    const y = this.audioOnly && !this.altAudio ? Q.AUDIO : Q.VIDEO, E = (y === Q.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
                    E && this.afterBufferFlushed(E, y, B.MAIN);
                }
                f = this.getNextFragmentLoopLoading(f, c, o, B.MAIN, u);
            }
            f && (f.initSegment && !f.initSegment.data && !this.bitrateTest && (f = f.initSegment), this.loadFragment(f, a, h));
        }
        loadFragment(e, t, s) {
            const i = this.fragmentTracker.getState(e);
            this.fragCurrent = e, i === ce.NOT_LOADED || i === ce.PARTIAL ? e.sn === "initSegment" ? this._loadInitSegment(e, t) : this.bitrateTest ? (this.log(`Fragment ${e.sn} of level ${e.level} is being downloaded to test bitrate and will not be buffered`), this._loadBitrateTestFrag(e, t)) : (this.startFragRequested = !0, super.loadFragment(e, t, s)) : this.clearTrackerIfNeeded(e);
        }
        getBufferedFrag(e) {
            return this.fragmentTracker.getBufferedFrag(e, B.MAIN);
        }
        followingBufferedFrag(e) {
            return e ? this.getBufferedFrag(e.end + .5) : null;
        }
        immediateLevelSwitch() {
            this.abortCurrentFrag(), this.flushMainBuffer(0, Number.POSITIVE_INFINITY);
        }
        nextLevelSwitch() {
            const { levels: e, media: t } = this;
            if (t != null && t.readyState) {
                let s;
                const i = this.getAppendedFrag(t.currentTime);
                i && i.start > 1 && this.flushMainBuffer(0, i.start - 1);
                const r = this.getLevelDetails();
                if (r != null && r.live) {
                    const o = this.getMainFwdBufferInfo();
                    if (!o || o.len < r.targetduration * 2) return;
                }
                if (!t.paused && e) {
                    const o = this.hls.nextLoadLevel, l = e[o], c = this.fragLastKbps;
                    c && this.fragCurrent ? s = this.fragCurrent.duration * l.maxBitrate / (1e3 * c) + 1 : s = 0;
                } else s = 0;
                const a = this.getBufferedFrag(t.currentTime + s);
                if (a) {
                    const o = this.followingBufferedFrag(a);
                    if (o) {
                        this.abortCurrentFrag();
                        const l = o.maxStartPTS ? o.maxStartPTS : o.start, c = o.duration, d = Math.max(a.end, l + Math.min(Math.max(c - this.config.maxFragLookUpTolerance, c * (this.couldBacktrack ? .5 : .125)), c * (this.couldBacktrack ? .75 : .25)));
                        this.flushMainBuffer(d, Number.POSITIVE_INFINITY);
                    }
                }
            }
        }
        abortCurrentFrag() {
            const e = this.fragCurrent;
            switch(this.fragCurrent = null, this.backtrackFragment = null, e && (e.abortRequests(), this.fragmentTracker.removeFragment(e)), this.state){
                case C.KEY_LOADING:
                case C.FRAG_LOADING:
                case C.FRAG_LOADING_WAITING_RETRY:
                case C.PARSING:
                case C.PARSED:
                    this.state = C.IDLE;
                    break;
            }
            this.nextLoadPosition = this.getLoadPosition();
        }
        flushMainBuffer(e, t) {
            super.flushMainBuffer(e, t, this.altAudio ? "video" : null);
        }
        onMediaAttached(e, t) {
            super.onMediaAttached(e, t);
            const s = t.media;
            this.onvplaying = this.onMediaPlaying.bind(this), this.onvseeked = this.onMediaSeeked.bind(this), s.addEventListener("playing", this.onvplaying), s.addEventListener("seeked", this.onvseeked), this.gapController = new Fu(this.config, s, this.fragmentTracker, this.hls);
        }
        onMediaDetaching() {
            const { media: e } = this;
            e && this.onvplaying && this.onvseeked && (e.removeEventListener("playing", this.onvplaying), e.removeEventListener("seeked", this.onvseeked), this.onvplaying = this.onvseeked = null, this.videoBuffer = null), this.fragPlaying = null, this.gapController && (this.gapController.destroy(), this.gapController = null), super.onMediaDetaching();
        }
        onMediaPlaying() {
            this.tick();
        }
        onMediaSeeked() {
            const e = this.media, t = e ? e.currentTime : null;
            M(t) && this.log(`Media seeked to ${t.toFixed(3)}`);
            const s = this.getMainFwdBufferInfo();
            if (s === null || s.len === 0) {
                this.warn(`Main forward buffer length on "seeked" event ${s ? s.len : "empty"})`);
                return;
            }
            this.tick();
        }
        onManifestLoading() {
            this.log("Trigger BUFFER_RESET"), this.hls.trigger(p.BUFFER_RESET, void 0), this.fragmentTracker.removeAllFragments(), this.couldBacktrack = !1, this.startPosition = this.lastCurrentTime = this.fragLastKbps = 0, this.levels = this.fragPlaying = this.backtrackFragment = this.levelLastLoaded = null, this.altAudio = this.audioOnly = this.startFragRequested = !1;
        }
        onManifestParsed(e, t) {
            let s = !1, i = !1;
            t.levels.forEach((r)=>{
                const a = r.audioCodec;
                a && (s = s || a.indexOf("mp4a.40.2") !== -1, i = i || a.indexOf("mp4a.40.5") !== -1);
            }), this.audioCodecSwitch = s && i && !wu(), this.audioCodecSwitch && this.log("Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"), this.levels = t.levels, this.startFragRequested = !1;
        }
        onLevelLoading(e, t) {
            const { levels: s } = this;
            if (!s || this.state !== C.IDLE) return;
            const i = s[t.level];
            (!i.details || i.details.live && this.levelLastLoaded !== i || this.waitForCdnTuneIn(i.details)) && (this.state = C.WAITING_LEVEL);
        }
        onLevelLoaded(e, t) {
            var s;
            const { levels: i } = this, r = t.level, a = t.details, o = a.totalduration;
            if (!i) {
                this.warn(`Levels were reset while loading level ${r}`);
                return;
            }
            this.log(`Level ${r} loaded [${a.startSN},${a.endSN}]${a.lastPartSn ? `[part-${a.lastPartSn}-${a.lastPartIndex}]` : ""}, cc [${a.startCC}, ${a.endCC}] duration:${o}`);
            const l = i[r], c = this.fragCurrent;
            c && (this.state === C.FRAG_LOADING || this.state === C.FRAG_LOADING_WAITING_RETRY) && c.level !== t.level && c.loader && this.abortCurrentFrag();
            let d = 0;
            if (a.live || (s = l.details) != null && s.live) {
                var u;
                if (this.checkLiveUpdate(a), a.deltaUpdateFailed) return;
                d = this.alignPlaylists(a, l.details, (u = this.levelLastLoaded) == null ? void 0 : u.details);
            }
            if (l.details = a, this.levelLastLoaded = l, this.hls.trigger(p.LEVEL_UPDATED, {
                details: a,
                level: r
            }), this.state === C.WAITING_LEVEL) {
                if (this.waitForCdnTuneIn(a)) return;
                this.state = C.IDLE;
            }
            this.startFragRequested ? a.live && this.synchronizeToLiveEdge(a) : this.setStartPosition(a, d), this.tick();
        }
        _handleFragmentLoadProgress(e) {
            var t;
            const { frag: s, part: i, payload: r } = e, { levels: a } = this;
            if (!a) {
                this.warn(`Levels were reset while fragment load was in progress. Fragment ${s.sn} of level ${s.level} will not be buffered`);
                return;
            }
            const o = a[s.level], l = o.details;
            if (!l) {
                this.warn(`Dropping fragment ${s.sn} of level ${s.level} after level details were reset`), this.fragmentTracker.removeFragment(s);
                return;
            }
            const c = o.videoCodec, d = l.PTSKnown || !l.live, u = (t = s.initSegment) == null ? void 0 : t.data, h = this._getAudioCodec(o), f = this.transmuxer = this.transmuxer || new Ca(this.hls, B.MAIN, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)), g = i ? i.index : -1, m = g !== -1, y = new on(s.level, s.sn, s.stats.chunkCount, r.byteLength, g, m), E = this.initPTS[s.cc];
            f.push(r, u, h, c, s, i, l.totalduration, d, y, E);
        }
        onAudioTrackSwitching(e, t) {
            const s = this.altAudio;
            if (!!!t.url) {
                if (this.mediaBuffer !== this.media) {
                    this.log("Switching on main audio, use media.buffered to schedule main fragment loading"), this.mediaBuffer = this.media;
                    const a = this.fragCurrent;
                    a && (this.log("Switching to main audio track, cancel main fragment load"), a.abortRequests(), this.fragmentTracker.removeFragment(a)), this.resetTransmuxer(), this.resetLoadingState();
                } else this.audioOnly && this.resetTransmuxer();
                const r = this.hls;
                s && (r.trigger(p.BUFFER_FLUSHING, {
                    startOffset: 0,
                    endOffset: Number.POSITIVE_INFINITY,
                    type: null
                }), this.fragmentTracker.removeAllFragments()), r.trigger(p.AUDIO_TRACK_SWITCHED, t);
            }
        }
        onAudioTrackSwitched(e, t) {
            const s = t.id, i = !!this.hls.audioTracks[s].url;
            if (i) {
                const r = this.videoBuffer;
                r && this.mediaBuffer !== r && (this.log("Switching on alternate audio, use video.buffered to schedule main fragment loading"), this.mediaBuffer = r);
            }
            this.altAudio = i, this.tick();
        }
        onBufferCreated(e, t) {
            const s = t.tracks;
            let i, r, a = !1;
            for(const o in s){
                const l = s[o];
                if (l.id === "main") {
                    if (r = o, i = l, o === "video") {
                        const c = s[o];
                        c && (this.videoBuffer = c.buffer);
                    }
                } else a = !0;
            }
            a && i ? (this.log(`Alternate track found, use ${r}.buffered to schedule main fragment loading`), this.mediaBuffer = i.buffer) : this.mediaBuffer = this.media;
        }
        onFragBuffered(e, t) {
            const { frag: s, part: i } = t;
            if (s && s.type !== B.MAIN) return;
            if (this.fragContextChanged(s)) {
                this.warn(`Fragment ${s.sn}${i ? " p: " + i.index : ""} of level ${s.level} finished buffering, but was aborted. state: ${this.state}`), this.state === C.PARSED && (this.state = C.IDLE);
                return;
            }
            const r = i ? i.stats : s.stats;
            this.fragLastKbps = Math.round(8 * r.total / (r.buffering.end - r.loading.first)), s.sn !== "initSegment" && (this.fragPrevious = s), this.fragBufferedComplete(s, i);
        }
        onError(e, t) {
            var s;
            if (t.fatal) {
                this.state = C.ERROR;
                return;
            }
            switch(t.details){
                case A.FRAG_GAP:
                case A.FRAG_PARSING_ERROR:
                case A.FRAG_DECRYPT_ERROR:
                case A.FRAG_LOAD_ERROR:
                case A.FRAG_LOAD_TIMEOUT:
                case A.KEY_LOAD_ERROR:
                case A.KEY_LOAD_TIMEOUT:
                    this.onFragmentOrKeyLoadError(B.MAIN, t);
                    break;
                case A.LEVEL_LOAD_ERROR:
                case A.LEVEL_LOAD_TIMEOUT:
                case A.LEVEL_PARSING_ERROR:
                    !t.levelRetry && this.state === C.WAITING_LEVEL && ((s = t.context) == null ? void 0 : s.type) === q.LEVEL && (this.state = C.IDLE);
                    break;
                case A.BUFFER_APPEND_ERROR:
                case A.BUFFER_FULL_ERROR:
                    if (!t.parent || t.parent !== "main") return;
                    if (t.details === A.BUFFER_APPEND_ERROR) {
                        this.resetLoadingState();
                        return;
                    }
                    this.reduceLengthAndFlushBuffer(t) && this.flushMainBuffer(0, Number.POSITIVE_INFINITY);
                    break;
                case A.INTERNAL_EXCEPTION:
                    this.recoverWorkerError(t);
                    break;
            }
        }
        checkBuffer() {
            const { media: e, gapController: t } = this;
            if (!(!e || !t || !e.readyState)) {
                if (this.loadedmetadata || !Z.getBuffered(e).length) {
                    const s = this.state !== C.IDLE ? this.fragCurrent : null;
                    t.poll(this.lastCurrentTime, s);
                }
                this.lastCurrentTime = e.currentTime;
            }
        }
        onFragLoadEmergencyAborted() {
            this.state = C.IDLE, this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition), this.tickImmediate();
        }
        onBufferFlushed(e, { type: t }) {
            if (t !== Q.AUDIO || this.audioOnly && !this.altAudio) {
                const s = (t === Q.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
                this.afterBufferFlushed(s, t, B.MAIN), this.tick();
            }
        }
        onLevelsUpdated(e, t) {
            this.level > -1 && this.fragCurrent && (this.level = this.fragCurrent.level), this.levels = t.levels;
        }
        swapAudioCodec() {
            this.audioCodecSwap = !this.audioCodecSwap;
        }
        seekToStartPos() {
            const { media: e } = this;
            if (!e) return;
            const t = e.currentTime;
            let s = this.startPosition;
            if (s >= 0 && t < s) {
                if (e.seeking) {
                    this.log(`could not seek to ${s}, already seeking at ${t}`);
                    return;
                }
                const i = Z.getBuffered(e), a = (i.length ? i.start(0) : 0) - s;
                a > 0 && (a < this.config.maxBufferHole || a < this.config.maxFragLookUpTolerance) && (this.log(`adjusting start position by ${a} to match buffer start`), s += a, this.startPosition = s), this.log(`seek to target start position ${s} from current time ${t}`), e.currentTime = s;
            }
        }
        _getAudioCodec(e) {
            let t = this.config.defaultAudioCodec || e.audioCodec;
            return this.audioCodecSwap && t && (this.log("Swapping audio codec"), t.indexOf("mp4a.40.5") !== -1 ? t = "mp4a.40.2" : t = "mp4a.40.5"), t;
        }
        _loadBitrateTestFrag(e, t) {
            e.bitrateTest = !0, this._doFragLoad(e, t).then((s)=>{
                const { hls: i } = this;
                if (!s || this.fragContextChanged(e)) return;
                t.fragmentError = 0, this.state = C.IDLE, this.startFragRequested = !1, this.bitrateTest = !1;
                const r = e.stats;
                r.parsing.start = r.parsing.end = r.buffering.start = r.buffering.end = self.performance.now(), i.trigger(p.FRAG_LOADED, s), e.bitrateTest = !1;
            });
        }
        _handleTransmuxComplete(e) {
            var t;
            const s = "main", { hls: i } = this, { remuxResult: r, chunkMeta: a } = e, o = this.getCurrentContext(a);
            if (!o) {
                this.resetWhenMissingContext(a);
                return;
            }
            const { frag: l, part: c, level: d } = o, { video: u, text: h, id3: f, initSegment: g } = r, { details: m } = d, y = this.altAudio ? void 0 : r.audio;
            if (this.fragContextChanged(l)) {
                this.fragmentTracker.removeFragment(l);
                return;
            }
            if (this.state = C.PARSING, g) {
                if (g != null && g.tracks) {
                    const T = l.initSegment || l;
                    this._bufferInitSegment(d, g.tracks, T, a), i.trigger(p.FRAG_PARSING_INIT_SEGMENT, {
                        frag: T,
                        id: s,
                        tracks: g.tracks
                    });
                }
                const E = g.initPTS, x = g.timescale;
                M(E) && (this.initPTS[l.cc] = {
                    baseTime: E,
                    timescale: x
                }, i.trigger(p.INIT_PTS_FOUND, {
                    frag: l,
                    id: s,
                    initPTS: E,
                    timescale: x
                }));
            }
            if (u && m && l.sn !== "initSegment") {
                const E = m.fragments[l.sn - 1 - m.startSN], x = l.sn === m.startSN, T = !E || l.cc > E.cc;
                if (r.independent !== !1) {
                    const { startPTS: R, endPTS: v, startDTS: D, endDTS: b } = u;
                    if (c) c.elementaryStreams[u.type] = {
                        startPTS: R,
                        endPTS: v,
                        startDTS: D,
                        endDTS: b
                    };
                    else if (u.firstKeyFrame && u.independent && a.id === 1 && !T && (this.couldBacktrack = !0), u.dropped && u.independent) {
                        const w = this.getMainFwdBufferInfo(), P = (w ? w.end : this.getLoadPosition()) + this.config.maxBufferHole, I = u.firstKeyFramePTS ? u.firstKeyFramePTS : R;
                        if (!x && P < I - this.config.maxBufferHole && !T) {
                            this.backtrack(l);
                            return;
                        } else T && (l.gap = !0);
                        l.setElementaryStreamInfo(u.type, l.start, v, l.start, b, !0);
                    } else x && R > vs && (l.gap = !0);
                    l.setElementaryStreamInfo(u.type, R, v, D, b), this.backtrackFragment && (this.backtrackFragment = l), this.bufferFragmentData(u, l, c, a, x || T);
                } else if (x || T) l.gap = !0;
                else {
                    this.backtrack(l);
                    return;
                }
            }
            if (y) {
                const { startPTS: E, endPTS: x, startDTS: T, endDTS: R } = y;
                c && (c.elementaryStreams[Q.AUDIO] = {
                    startPTS: E,
                    endPTS: x,
                    startDTS: T,
                    endDTS: R
                }), l.setElementaryStreamInfo(Q.AUDIO, E, x, T, R), this.bufferFragmentData(y, l, c, a);
            }
            if (m && f != null && (t = f.samples) != null && t.length) {
                const E = {
                    id: s,
                    frag: l,
                    details: m,
                    samples: f.samples
                };
                i.trigger(p.FRAG_PARSING_METADATA, E);
            }
            if (m && h) {
                const E = {
                    id: s,
                    frag: l,
                    details: m,
                    samples: h.samples
                };
                i.trigger(p.FRAG_PARSING_USERDATA, E);
            }
        }
        _bufferInitSegment(e, t, s, i) {
            if (this.state !== C.PARSING) return;
            this.audioOnly = !!t.audio && !t.video, this.altAudio && !this.audioOnly && delete t.audio;
            const { audio: r, video: a, audiovideo: o } = t;
            if (r) {
                let l = e.audioCodec;
                const c = navigator.userAgent.toLowerCase();
                if (this.audioCodecSwitch) {
                    l && (l.indexOf("mp4a.40.5") !== -1 ? l = "mp4a.40.2" : l = "mp4a.40.5");
                    const d = r.metadata;
                    d && "channelCount" in d && (d.channelCount || 1) !== 1 && c.indexOf("firefox") === -1 && (l = "mp4a.40.5");
                }
                l && l.indexOf("mp4a.40.5") !== -1 && c.indexOf("android") !== -1 && r.container !== "audio/mpeg" && (l = "mp4a.40.2", this.log(`Android: force audio codec to ${l}`)), e.audioCodec && e.audioCodec !== l && this.log(`Swapping manifest audio codec "${e.audioCodec}" for "${l}"`), r.levelCodec = l, r.id = "main", this.log(`Init audio buffer, container:${r.container}, codecs[selected/level/parsed]=[${l || ""}/${e.audioCodec || ""}/${r.codec}]`);
            }
            a && (a.levelCodec = e.videoCodec, a.id = "main", this.log(`Init video buffer, container:${a.container}, codecs[level/parsed]=[${e.videoCodec || ""}/${a.codec}]`)), o && this.log(`Init audiovideo buffer, container:${o.container}, codecs[level/parsed]=[${e.codecs}/${o.codec}]`), this.hls.trigger(p.BUFFER_CODECS, t), Object.keys(t).forEach((l)=>{
                const d = t[l].initSegment;
                d != null && d.byteLength && this.hls.trigger(p.BUFFER_APPENDING, {
                    type: l,
                    data: d,
                    frag: s,
                    part: null,
                    chunkMeta: i,
                    parent: s.type
                });
            }), this.tickImmediate();
        }
        getMainFwdBufferInfo() {
            return this.getFwdBufferInfo(this.mediaBuffer ? this.mediaBuffer : this.media, B.MAIN);
        }
        backtrack(e) {
            this.couldBacktrack = !0, this.backtrackFragment = e, this.resetTransmuxer(), this.flushBufferGap(e), this.fragmentTracker.removeFragment(e), this.fragPrevious = null, this.nextLoadPosition = e.start, this.state = C.IDLE;
        }
        checkFragmentChanged() {
            const e = this.media;
            let t = null;
            if (e && e.readyState > 1 && e.seeking === !1) {
                const s = e.currentTime;
                if (Z.isBuffered(e, s) ? t = this.getAppendedFrag(s) : Z.isBuffered(e, s + .1) && (t = this.getAppendedFrag(s + .1)), t) {
                    this.backtrackFragment = null;
                    const i = this.fragPlaying, r = t.level;
                    (!i || t.sn !== i.sn || i.level !== r) && (this.fragPlaying = t, this.hls.trigger(p.FRAG_CHANGED, {
                        frag: t
                    }), (!i || i.level !== r) && this.hls.trigger(p.LEVEL_SWITCHED, {
                        level: r
                    }));
                }
            }
        }
        get nextLevel() {
            const e = this.nextBufferedFrag;
            return e ? e.level : -1;
        }
        get currentFrag() {
            const e = this.media;
            return e ? this.fragPlaying || this.getAppendedFrag(e.currentTime) : null;
        }
        get currentProgramDateTime() {
            const e = this.media;
            if (e) {
                const t = e.currentTime, s = this.currentFrag;
                if (s && M(t) && M(s.programDateTime)) {
                    const i = s.programDateTime + (t - s.start) * 1e3;
                    return new Date(i);
                }
            }
            return null;
        }
        get currentLevel() {
            const e = this.currentFrag;
            return e ? e.level : -1;
        }
        get nextBufferedFrag() {
            const e = this.currentFrag;
            return e ? this.followingBufferedFrag(e) : null;
        }
        get forceStartLoad() {
            return this._forceStartLoad;
        }
    }
    class be {
        static get version() {
            return "1.5.13";
        }
        static isMSESupported() {
            return za();
        }
        static isSupported() {
            return Cu();
        }
        static getMediaSource() {
            return ft();
        }
        static get Events() {
            return p;
        }
        static get ErrorTypes() {
            return G;
        }
        static get ErrorDetails() {
            return A;
        }
        static get DefaultConfig() {
            return be.defaultConfig ? be.defaultConfig : qa;
        }
        static set DefaultConfig(e) {
            be.defaultConfig = e;
        }
        constructor(e = {}){
            this.config = void 0, this.userConfig = void 0, this.coreComponents = void 0, this.networkControllers = void 0, this.started = !1, this._emitter = new gn, this._autoLevelCapping = -1, this._maxHdcpLevel = null, this.abrController = void 0, this.bufferController = void 0, this.capLevelController = void 0, this.latencyController = void 0, this.levelController = void 0, this.streamController = void 0, this.audioTrackController = void 0, this.subtitleTrackController = void 0, this.emeController = void 0, this.cmcdController = void 0, this._media = null, this.url = null, this.triggeringException = void 0, Ao(e.debug || !1, "Hls instance");
            const t = this.config = bu(be.DefaultConfig, e);
            this.userConfig = e, t.progressive && Ru(t);
            const { abrController: s, bufferController: i, capLevelController: r, errorController: a, fpsController: o } = t, l = new a(this), c = this.abrController = new s(this), d = this.bufferController = new i(this), u = this.capLevelController = new r(this), h = new o(this), f = new El(this), g = new Ll(this), m = t.contentSteeringController, y = m ? new m(this) : null, E = this.levelController = new Iu(this, y), x = new Jl(this), T = new Du(this.config), R = this.streamController = new Mu(this, x, T);
            u.setStreamController(R), h.setStreamController(R);
            const v = [
                f,
                E,
                R
            ];
            y && v.splice(1, 0, y), this.networkControllers = v;
            const D = [
                c,
                d,
                u,
                h,
                g,
                x
            ];
            this.audioTrackController = this.createController(t.audioTrackController, v);
            const b = t.audioStreamController;
            b && v.push(new b(this, x, T)), this.subtitleTrackController = this.createController(t.subtitleTrackController, v);
            const w = t.subtitleStreamController;
            w && v.push(new w(this, x, T)), this.createController(t.timelineController, D), T.emeController = this.emeController = this.createController(t.emeController, D), this.cmcdController = this.createController(t.cmcdController, D), this.latencyController = this.createController(Al, D), this.coreComponents = D, v.push(l);
            const P = l.onErrorOut;
            typeof P == "function" && this.on(p.ERROR, P, l);
        }
        createController(e, t) {
            if (e) {
                const s = new e(this);
                return t && t.push(s), s;
            }
            return null;
        }
        on(e, t, s = this) {
            this._emitter.on(e, t, s);
        }
        once(e, t, s = this) {
            this._emitter.once(e, t, s);
        }
        removeAllListeners(e) {
            this._emitter.removeAllListeners(e);
        }
        off(e, t, s = this, i) {
            this._emitter.off(e, t, s, i);
        }
        listeners(e) {
            return this._emitter.listeners(e);
        }
        emit(e, t, s) {
            return this._emitter.emit(e, t, s);
        }
        trigger(e, t) {
            if (this.config.debug) return this.emit(e, e, t);
            try {
                return this.emit(e, e, t);
            } catch (s) {
                if (S.error("An internal error happened while handling event " + e + '. Error message: "' + s.message + '". Here is a stacktrace:', s), !this.triggeringException) {
                    this.triggeringException = !0;
                    const i = e === p.ERROR;
                    this.trigger(p.ERROR, {
                        type: G.OTHER_ERROR,
                        details: A.INTERNAL_EXCEPTION,
                        fatal: i,
                        event: e,
                        error: s
                    }), this.triggeringException = !1;
                }
            }
            return !1;
        }
        listenerCount(e) {
            return this._emitter.listenerCount(e);
        }
        destroy() {
            S.log("destroy"), this.trigger(p.DESTROYING, void 0), this.detachMedia(), this.removeAllListeners(), this._autoLevelCapping = -1, this.url = null, this.networkControllers.forEach((t)=>t.destroy()), this.networkControllers.length = 0, this.coreComponents.forEach((t)=>t.destroy()), this.coreComponents.length = 0;
            const e = this.config;
            e.xhrSetup = e.fetchSetup = void 0, this.userConfig = null;
        }
        attachMedia(e) {
            S.log("attachMedia"), this._media = e, this.trigger(p.MEDIA_ATTACHING, {
                media: e
            });
        }
        detachMedia() {
            S.log("detachMedia"), this.trigger(p.MEDIA_DETACHING, void 0), this._media = null;
        }
        loadSource(e) {
            this.stopLoad();
            const t = this.media, s = this.url, i = this.url = en.buildAbsoluteURL(self.location.href, e, {
                alwaysNormalize: !0
            });
            this._autoLevelCapping = -1, this._maxHdcpLevel = null, S.log(`loadSource:${i}`), t && s && (s !== i || this.bufferController.hasSourceTypes()) && (this.detachMedia(), this.attachMedia(t)), this.trigger(p.MANIFEST_LOADING, {
                url: e
            });
        }
        startLoad(e = -1) {
            S.log(`startLoad(${e})`), this.started = !0, this.networkControllers.forEach((t)=>{
                t.startLoad(e);
            });
        }
        stopLoad() {
            S.log("stopLoad"), this.started = !1, this.networkControllers.forEach((e)=>{
                e.stopLoad();
            });
        }
        resumeBuffering() {
            this.started && this.networkControllers.forEach((e)=>{
                "fragmentLoader" in e && e.startLoad(-1);
            });
        }
        pauseBuffering() {
            this.networkControllers.forEach((e)=>{
                "fragmentLoader" in e && e.stopLoad();
            });
        }
        swapAudioCodec() {
            S.log("swapAudioCodec"), this.streamController.swapAudioCodec();
        }
        recoverMediaError() {
            S.log("recoverMediaError");
            const e = this._media;
            this.detachMedia(), e && this.attachMedia(e);
        }
        removeLevel(e) {
            this.levelController.removeLevel(e);
        }
        get levels() {
            const e = this.levelController.levels;
            return e || [];
        }
        get currentLevel() {
            return this.streamController.currentLevel;
        }
        set currentLevel(e) {
            S.log(`set currentLevel:${e}`), this.levelController.manualLevel = e, this.streamController.immediateLevelSwitch();
        }
        get nextLevel() {
            return this.streamController.nextLevel;
        }
        set nextLevel(e) {
            S.log(`set nextLevel:${e}`), this.levelController.manualLevel = e, this.streamController.nextLevelSwitch();
        }
        get loadLevel() {
            return this.levelController.level;
        }
        set loadLevel(e) {
            S.log(`set loadLevel:${e}`), this.levelController.manualLevel = e;
        }
        get nextLoadLevel() {
            return this.levelController.nextLoadLevel;
        }
        set nextLoadLevel(e) {
            this.levelController.nextLoadLevel = e;
        }
        get firstLevel() {
            return Math.max(this.levelController.firstLevel, this.minAutoLevel);
        }
        set firstLevel(e) {
            S.log(`set firstLevel:${e}`), this.levelController.firstLevel = e;
        }
        get startLevel() {
            const e = this.levelController.startLevel;
            return e === -1 && this.abrController.forcedAutoLevel > -1 ? this.abrController.forcedAutoLevel : e;
        }
        set startLevel(e) {
            S.log(`set startLevel:${e}`), e !== -1 && (e = Math.max(e, this.minAutoLevel)), this.levelController.startLevel = e;
        }
        get capLevelToPlayerSize() {
            return this.config.capLevelToPlayerSize;
        }
        set capLevelToPlayerSize(e) {
            const t = !!e;
            t !== this.config.capLevelToPlayerSize && (t ? this.capLevelController.startCapping() : (this.capLevelController.stopCapping(), this.autoLevelCapping = -1, this.streamController.nextLevelSwitch()), this.config.capLevelToPlayerSize = t);
        }
        get autoLevelCapping() {
            return this._autoLevelCapping;
        }
        get bandwidthEstimate() {
            const { bwEstimator: e } = this.abrController;
            return e ? e.getEstimate() : NaN;
        }
        set bandwidthEstimate(e) {
            this.abrController.resetEstimator(e);
        }
        get ttfbEstimate() {
            const { bwEstimator: e } = this.abrController;
            return e ? e.getEstimateTTFB() : NaN;
        }
        set autoLevelCapping(e) {
            this._autoLevelCapping !== e && (S.log(`set autoLevelCapping:${e}`), this._autoLevelCapping = e, this.levelController.checkMaxAutoUpdated());
        }
        get maxHdcpLevel() {
            return this._maxHdcpLevel;
        }
        set maxHdcpLevel(e) {
            bl(e) && this._maxHdcpLevel !== e && (this._maxHdcpLevel = e, this.levelController.checkMaxAutoUpdated());
        }
        get autoLevelEnabled() {
            return this.levelController.manualLevel === -1;
        }
        get manualLevel() {
            return this.levelController.manualLevel;
        }
        get minAutoLevel() {
            const { levels: e, config: { minAutoBitrate: t } } = this;
            if (!e) return 0;
            const s = e.length;
            for(let i = 0; i < s; i++)if (e[i].maxBitrate >= t) return i;
            return 0;
        }
        get maxAutoLevel() {
            const { levels: e, autoLevelCapping: t, maxHdcpLevel: s } = this;
            let i;
            if (t === -1 && e != null && e.length ? i = e.length - 1 : i = t, s) for(let r = i; r--;){
                const a = e[r].attrs["HDCP-LEVEL"];
                if (a && a <= s) return r;
            }
            return i;
        }
        get firstAutoLevel() {
            return this.abrController.firstAutoLevel;
        }
        get nextAutoLevel() {
            return this.abrController.nextAutoLevel;
        }
        set nextAutoLevel(e) {
            this.abrController.nextAutoLevel = e;
        }
        get playingDate() {
            return this.streamController.currentProgramDateTime;
        }
        get mainForwardBufferInfo() {
            return this.streamController.getMainFwdBufferInfo();
        }
        setAudioOption(e) {
            var t;
            return (t = this.audioTrackController) == null ? void 0 : t.setAudioOption(e);
        }
        setSubtitleOption(e) {
            var t;
            return (t = this.subtitleTrackController) == null || t.setSubtitleOption(e), null;
        }
        get allAudioTracks() {
            const e = this.audioTrackController;
            return e ? e.allAudioTracks : [];
        }
        get audioTracks() {
            const e = this.audioTrackController;
            return e ? e.audioTracks : [];
        }
        get audioTrack() {
            const e = this.audioTrackController;
            return e ? e.audioTrack : -1;
        }
        set audioTrack(e) {
            const t = this.audioTrackController;
            t && (t.audioTrack = e);
        }
        get allSubtitleTracks() {
            const e = this.subtitleTrackController;
            return e ? e.allSubtitleTracks : [];
        }
        get subtitleTracks() {
            const e = this.subtitleTrackController;
            return e ? e.subtitleTracks : [];
        }
        get subtitleTrack() {
            const e = this.subtitleTrackController;
            return e ? e.subtitleTrack : -1;
        }
        get media() {
            return this._media;
        }
        set subtitleTrack(e) {
            const t = this.subtitleTrackController;
            t && (t.subtitleTrack = e);
        }
        get subtitleDisplay() {
            const e = this.subtitleTrackController;
            return e ? e.subtitleDisplay : !1;
        }
        set subtitleDisplay(e) {
            const t = this.subtitleTrackController;
            t && (t.subtitleDisplay = e);
        }
        get lowLatencyMode() {
            return this.config.lowLatencyMode;
        }
        set lowLatencyMode(e) {
            this.config.lowLatencyMode = e;
        }
        get liveSyncPosition() {
            return this.latencyController.liveSyncPosition;
        }
        get latency() {
            return this.latencyController.latency;
        }
        get maxLatency() {
            return this.latencyController.maxLatency;
        }
        get targetLatency() {
            return this.latencyController.targetLatency;
        }
        get drift() {
            return this.latencyController.drift;
        }
        get forceStartLoad() {
            return this.streamController.forceStartLoad;
        }
    }
    be.defaultConfig = void 0;
    function Nu(n) {
        return ge.extract_groups(n);
    }
    function Uu() {
        return {
            __proto__: null,
            "./iptv_wasm_bg.js": {
                __proto__: null,
                __wbg_Error_92b29b0548f8b746: function(e, t) {
                    return Error(vi(e, t));
                },
                __wbg_Number_9a4e0ecb0fa16705: function(e) {
                    return Number(e);
                },
                __wbg___wbindgen_boolean_get_fa956cfa2d1bd751: function(e) {
                    const t = e, s = typeof t == "boolean" ? t : void 0;
                    return us(s) ? 16777215 : s ? 1 : 0;
                },
                __wbg___wbindgen_debug_string_c25d447a39f5578f: function(e, t) {
                    const s = Yi(t), i = Ir(s, ge.__wbindgen_malloc, ge.__wbindgen_realloc), r = Bs;
                    St().setInt32(e + 4, r, !0), St().setInt32(e + 0, i, !0);
                },
                __wbg___wbindgen_in_aca499c5de7ff5e5: function(e, t) {
                    return e in t;
                },
                __wbg___wbindgen_is_function_1ff95bcc5517c252: function(e) {
                    return typeof e == "function";
                },
                __wbg___wbindgen_is_object_a27215656b807791: function(e) {
                    const t = e;
                    return typeof t == "object" && t !== null;
                },
                __wbg___wbindgen_is_undefined_c05833b95a3cf397: function(e) {
                    return e === void 0;
                },
                __wbg___wbindgen_jsval_loose_eq_db4c3b15f63fc170: function(e, t) {
                    return e == t;
                },
                __wbg___wbindgen_number_get_394265ed1e1b84ee: function(e, t) {
                    const s = t, i = typeof s == "number" ? s : void 0;
                    St().setFloat64(e + 8, us(i) ? 0 : i, !0), St().setInt32(e + 0, !us(i), !0);
                },
                __wbg___wbindgen_string_get_b0ca35b86a603356: function(e, t) {
                    const s = t, i = typeof s == "string" ? s : void 0;
                    var r = us(i) ? 0 : Ir(i, ge.__wbindgen_malloc, ge.__wbindgen_realloc), a = Bs;
                    St().setInt32(e + 4, a, !0), St().setInt32(e + 0, r, !0);
                },
                __wbg___wbindgen_throw_344f42d3211c4765: function(e, t) {
                    throw new Error(vi(e, t));
                },
                __wbg_call_8a2dd23819f8a60a: function() {
                    return Si(function(e, t) {
                        return e.call(t);
                    }, arguments);
                },
                __wbg_done_89b2b13e91a60321: function(e) {
                    return e.done;
                },
                __wbg_get_c7eb1f358a7654df: function() {
                    return Si(function(e, t) {
                        return Reflect.get(e, t);
                    }, arguments);
                },
                __wbg_get_unchecked_6e0ad6d2a41b06f6: function(e, t) {
                    return e[t >>> 0];
                },
                __wbg_get_with_ref_key_6412cf3094599694: function(e, t) {
                    return e[t];
                },
                __wbg_instanceof_ArrayBuffer_4480b9e0068a8adb: function(e) {
                    let t;
                    try {
                        t = e instanceof ArrayBuffer;
                    } catch  {
                        t = !1;
                    }
                    return t;
                },
                __wbg_instanceof_Uint8Array_309b927aaf7a3fc7: function(e) {
                    let t;
                    try {
                        t = e instanceof Uint8Array;
                    } catch  {
                        t = !1;
                    }
                    return t;
                },
                __wbg_isArray_0677c962b281d01a: function(e) {
                    return Array.isArray(e);
                },
                __wbg_isSafeInteger_04f36e4056f1b851: function(e) {
                    return Number.isSafeInteger(e);
                },
                __wbg_iterator_6f722e4a93058b71: function() {
                    return Symbol.iterator;
                },
                __wbg_length_1f0964f4a5e2c6d8: function(e) {
                    return e.length;
                },
                __wbg_length_370319915dc99107: function(e) {
                    return e.length;
                },
                __wbg_new_32b398fb48b6d94a: function() {
                    return new Array;
                },
                __wbg_new_cd45aabdf6073e84: function(e) {
                    return new Uint8Array(e);
                },
                __wbg_new_da52cf8fe3429cb2: function() {
                    return new Object;
                },
                __wbg_next_6dbf2c0ac8cde20f: function(e) {
                    return e.next;
                },
                __wbg_next_71f2aa1cb3d1e37e: function() {
                    return Si(function(e) {
                        return e.next();
                    }, arguments);
                },
                __wbg_prototypesetcall_4770620bbe4688a0: function(e, t, s) {
                    Uint8Array.prototype.set.call($u(e, t), s);
                },
                __wbg_set_6be42768c690e380: function(e, t, s) {
                    e[t] = s;
                },
                __wbg_set_8a16b38e4805b298: function(e, t, s) {
                    e[t >>> 0] = s;
                },
                __wbg_value_a5d5488a9589444a: function(e) {
                    return e.value;
                },
                __wbindgen_cast_0000000000000001: function(e) {
                    return e;
                },
                __wbindgen_cast_0000000000000002: function(e, t) {
                    return vi(e, t);
                },
                __wbindgen_cast_0000000000000003: function(e) {
                    return BigInt.asUintN(64, e);
                },
                __wbindgen_init_externref_table: function() {
                    const e = ge.__wbindgen_externrefs, t = e.grow(4);
                    e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, !0), e.set(t + 3, !1);
                }
            }
        };
    }
    function Bu(n) {
        const e = ge.__externref_table_alloc();
        return ge.__wbindgen_externrefs.set(e, n), e;
    }
    function Yi(n) {
        const e = typeof n;
        if (e == "number" || e == "boolean" || n == null) return `${n}`;
        if (e == "string") return `"${n}"`;
        if (e == "symbol") {
            const i = n.description;
            return i == null ? "Symbol" : `Symbol(${i})`;
        }
        if (e == "function") {
            const i = n.name;
            return typeof i == "string" && i.length > 0 ? `Function(${i})` : "Function";
        }
        if (Array.isArray(n)) {
            const i = n.length;
            let r = "[";
            i > 0 && (r += Yi(n[0]));
            for(let a = 1; a < i; a++)r += ", " + Yi(n[a]);
            return r += "]", r;
        }
        const t = /\[object ([^\]]+)\]/.exec(toString.call(n));
        let s;
        if (t && t.length > 1) s = t[1];
        else return toString.call(n);
        if (s == "Object") try {
            return "Object(" + JSON.stringify(n) + ")";
        } catch  {
            return "Object";
        }
        return n instanceof Error ? `${n.name}: ${n.message}
${n.stack}` : s;
    }
    function $u(n, e) {
        return n = n >>> 0, Kt().subarray(n / 1, n / 1 + e);
    }
    let ot = null;
    function St() {
        return (ot === null || ot.buffer.detached === !0 || ot.buffer.detached === void 0 && ot.buffer !== ge.memory.buffer) && (ot = new DataView(ge.memory.buffer)), ot;
    }
    function vi(n, e) {
        return Ku(n >>> 0, e);
    }
    let Bt = null;
    function Kt() {
        return (Bt === null || Bt.byteLength === 0) && (Bt = new Uint8Array(ge.memory.buffer)), Bt;
    }
    function Si(n, e) {
        try {
            return n.apply(this, e);
        } catch (t) {
            const s = Bu(t);
            ge.__wbindgen_exn_store(s);
        }
    }
    function us(n) {
        return n == null;
    }
    function Ir(n, e, t) {
        if (t === void 0) {
            const o = Ht.encode(n), l = e(o.length, 1) >>> 0;
            return Kt().subarray(l, l + o.length).set(o), Bs = o.length, l;
        }
        let s = n.length, i = e(s, 1) >>> 0;
        const r = Kt();
        let a = 0;
        for(; a < s; a++){
            const o = n.charCodeAt(a);
            if (o > 127) break;
            r[i + a] = o;
        }
        if (a !== s) {
            a !== 0 && (n = n.slice(a)), i = t(i, s, s = a + n.length * 3, 1) >>> 0;
            const o = Kt().subarray(i + a, i + s), l = Ht.encodeInto(n, o);
            a += l.written, i = t(i, s, a, 1) >>> 0;
        }
        return Bs = a, i;
    }
    let Ss = new TextDecoder("utf-8", {
        ignoreBOM: !0,
        fatal: !0
    });
    Ss.decode();
    const Gu = 2146435072;
    let Li = 0;
    function Ku(n, e) {
        return Li += e, Li >= Gu && (Ss = new TextDecoder("utf-8", {
            ignoreBOM: !0,
            fatal: !0
        }), Ss.decode(), Li = e), Ss.decode(Kt().subarray(n, n + e));
    }
    const Ht = new TextEncoder;
    "encodeInto" in Ht || (Ht.encodeInto = function(n, e) {
        const t = Ht.encode(n);
        return e.set(t), {
            read: n.length,
            written: t.length
        };
    });
    let Bs = 0, ge;
    function Hu(n, e) {
        return ge = n.exports, ot = null, Bt = null, ge.__wbindgen_start(), ge;
    }
    async function Vu(n, e) {
        if (typeof Response == "function" && n instanceof Response) {
            if (typeof WebAssembly.instantiateStreaming == "function") try {
                return await WebAssembly.instantiateStreaming(n, e);
            } catch (i) {
                if (n.ok && t(n.type) && n.headers.get("Content-Type") !== "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", i);
                else throw i;
            }
            const s = await n.arrayBuffer();
            return await WebAssembly.instantiate(s, e);
        } else {
            const s = await WebAssembly.instantiate(n, e);
            return s instanceof WebAssembly.Instance ? {
                instance: s,
                module: n
            } : s;
        }
        function t(s) {
            switch(s){
                case "basic":
                case "cors":
                case "default":
                    return !0;
            }
            return !1;
        }
    }
    async function Wu(n) {
        if (ge !== void 0) return ge;
        n !== void 0 && (Object.getPrototypeOf(n) === Object.prototype ? { module_or_path: n } = n : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), n === void 0 && (n = new URL("/assets/iptv_wasm_bg-C1cpzyIi.wasm", import.meta.url));
        const e = Uu();
        (typeof n == "string" || typeof Request == "function" && n instanceof Request || typeof URL == "function" && n instanceof URL) && (n = fetch(n));
        const { instance: t, module: s } = await Vu(await n, e);
        return Hu(t);
    }
    const Yu = "";
    async function Ce(n, e) {
        const t = await fetch(`${Yu}${n}`, e);
        if (!t.ok) {
            const s = await t.json().catch(()=>({
                    error: t.statusText
                }));
            throw new Error(s.error || t.statusText);
        }
        return t.json();
    }
    const Ne = {
        health: ()=>Ce("/api/health"),
        channels: ()=>Ce("/api/channels"),
        search: (n)=>Ce(`/api/channels/search?q=${encodeURIComponent(n)}`),
        playlists: ()=>Ce("/api/playlists"),
        deletePlaylist: (n)=>Ce(`/api/playlists/${encodeURIComponent(n)}`, {
                method: "DELETE"
            }),
        uploadFile: (n, e)=>{
            const t = new FormData;
            return t.append("file", e, e.name), Ce(n, {
                method: "POST",
                body: t
            });
        },
        fetchSource: (n)=>Ce("/api/sources/fetch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: n
                })
            }),
        sources: ()=>Ce("/api/sources"),
        pipelineStatus: ()=>Ce("/api/pipeline/status"),
        pipelineRun: ()=>Ce("/api/pipeline/run", {
                method: "POST"
            }),
        channelEpg: (n, e)=>{
            const t = e ? `?name=${encodeURIComponent(e)}` : "";
            return Ce(`/api/epg/channel/${encodeURIComponent(n)}${t}`);
        },
        proxyUrl: (n)=>`/api/proxy?url=${encodeURIComponent(n)}`
    }, Xa = "signal.torrserver", qu = "http://137.131.63.155:8090", qi = ()=>(localStorage.getItem(Xa) || qu).replace(/\/+$/, ""), ju = (n)=>localStorage.setItem(Xa, n.trim()), zu = (n)=>n ? n > 1e9 ? `${(n / 1e9).toFixed(1)} GB` : `${Math.max(1, Math.round(n / 1e6))} MB` : "", Xu = /\.(mkv|mp4|m4v|webm|mov|avi|ts)$/i;
    let se = null, _t = null, Tn = null, xe = null, Ls = null, Qt = null, Qa = "movies";
    function Qu() {
        if (document.getElementById("vod-styles")) return;
        const n = `
  #vodOverlay{position:fixed;inset:0;z-index:60;display:none;background:rgba(6,8,11,.86);
    backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);color:#E8EDF2;
    font-family:'Hanken Grotesk',system-ui,sans-serif}
  #vodOverlay.is-open{display:flex;flex-direction:column}
  .vod-head{display:flex;align-items:center;gap:14px;padding:16px 22px;border-bottom:1px solid rgba(255,255,255,.08)}
  .vod-title{font-family:'Sora',sans-serif;font-weight:700;font-size:18px;letter-spacing:.02em}
  .vod-title small{font-weight:500;color:#8A94A6;margin-left:8px;font-size:12px}
  .vod-search{flex:1;display:flex;gap:8px;max-width:560px}
  .vod-search input{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);
    color:#E8EDF2;border-radius:10px;padding:10px 14px;font-size:14px;outline:none}
  .vod-search input:focus{border-color:#4FA9F5}
  .vod-btn{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);color:#E8EDF2;
    border-radius:10px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap}
  .vod-btn:hover{background:rgba(255,255,255,.14)}
  .vod-btn.solid{background:#4FA9F5;border-color:#4FA9F5;color:#06121f}
  .vod-cats{display:flex;gap:4px}
  .vod-cats button{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#8A94A6;border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;cursor:pointer}
  .vod-cats button.is-active{background:#4FA9F5;border-color:#4FA9F5;color:#06121f}
  .vod-close{margin-left:auto;font-size:20px;line-height:1;background:none;border:none;color:#8A94A6;cursor:pointer;padding:6px 10px}
  .vod-close:hover{color:#fff}
  .vod-body{flex:1;overflow:auto;padding:18px 22px;display:flex;flex-direction:column;min-height:0}
  .vod-status{color:#8A94A6;font-size:13px;padding:10px 2px}
  .vod-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px}
  .vod-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:14px;
    padding:14px;cursor:pointer;transition:transform .12s,border-color .12s}
  .vod-card:hover{transform:translateY(-2px);border-color:#4FA9F5}
  .vod-card h4{font-family:'Sora',sans-serif;font-size:14px;font-weight:600;margin:0 0 6px;line-height:1.3}
  .vod-meta{display:flex;flex-wrap:wrap;gap:6px;font-size:11px;color:#8A94A6}
  .vod-chip{background:rgba(255,255,255,.07);border-radius:6px;padding:2px 7px}
  .vod-src{color:#3DD68C}
  .vod-player{display:none;flex-direction:column;flex:1;min-height:0}
  .vod-player.is-open{display:flex}
  .vod-player-bar{display:flex;align-items:center;gap:12px;padding:0 0 12px}
  .vod-player-title{font-family:'Sora',sans-serif;font-weight:600}
  .vod-mount{flex:1;min-height:360px;background:#000;border-radius:12px;overflow:hidden;display:flex}
  .vod-mount video{width:100%;height:100%;background:#000}
  .vod-foot{display:flex;align-items:center;gap:8px;padding:12px 22px;border-top:1px solid rgba(255,255,255,.08);font-size:12px;color:#8A94A6}
  .vod-foot input{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#E8EDF2;
    border-radius:8px;padding:6px 10px;font-size:12px;min-width:260px;outline:none}
  .vod-note{color:#F5A524}
  `, e = document.createElement("style");
        e.id = "vod-styles", e.textContent = n, document.head.appendChild(e);
    }
    function Ju() {
        if (se) return;
        Qu(), se = document.createElement("div"), se.id = "vodOverlay", se.innerHTML = `
    <div class="vod-head">
      <span class="vod-title">Movies &amp; TV <small>torrent streaming</small></span>
      <div class="vod-cats" id="vodCats">
        <button type="button" data-cat="movies" class="is-active">Movies</button>
        <button type="button" data-cat="tv">TV</button>
      </div>
      <form class="vod-search" id="vodForm">
        <input id="vodQuery" type="search" placeholder="Search title…" autocomplete="off">
        <button class="vod-btn solid" type="submit">Search</button>
      </form>
      <button class="vod-close" id="vodClose" aria-label="Close">✕</button>
    </div>
    <div class="vod-body">
      <div class="vod-status" id="vodStatus">Search movies &amp; TV, then click a title to stream.</div>
      <div class="vod-grid" id="vodGrid"></div>
      <div class="vod-player" id="vodPlayer">
        <div class="vod-player-bar">
          <button class="vod-btn" id="vodBack">← Results</button>
          <span class="vod-player-title" id="vodPlayerTitle"></span>
        </div>
        <div class="vod-mount" id="vodMount"></div>
      </div>
    </div>
    <div class="vod-foot">
      <span>torrent server:</span>
      <input id="vodBase" type="text" spellcheck="false">
      <button class="vod-btn" id="vodBaseSave">Save</button>
      <span class="vod-note">Magnets stream via TorrServer (real BitTorrent peers). Browser plays H.264/AAC natively.</span>
    </div>`, document.body.appendChild(se), _t = se.querySelector("#vodGrid"), Tn = se.querySelector("#vodPlayer"), xe = se.querySelector("#vodMount"), Ls = se.querySelector("#vodQuery"), Qt = se.querySelector("#vodStatus");
        const n = se.querySelector("#vodBase");
        n.value = qi(), se.querySelector("#vodClose").addEventListener("click", Dr), se.querySelector("#vodBack").addEventListener("click", Ja), se.querySelector("#vodForm").addEventListener("submit", (e)=>{
            e.preventDefault(), ji(Ls.value.trim());
        }), se.querySelector("#vodBaseSave").addEventListener("click", ()=>{
            ju(n.value), $t(`torrent server set to ${qi()}`);
        }), se.querySelectorAll("#vodCats button").forEach((e)=>{
            e.addEventListener("click", ()=>{
                Qa = e.dataset.cat || "movies", se.querySelectorAll("#vodCats button").forEach((t)=>t.classList.remove("is-active")), e.classList.add("is-active"), ji(Ls.value.trim());
            });
        }), document.addEventListener("keydown", (e)=>{
            e.key === "Escape" && se.classList.contains("is-open") && Dr();
        });
    }
    function $t(n) {
        Qt && (Qt.textContent = n);
    }
    function Ja() {
        Tn.classList.remove("is-open"), _t.style.display = "", Qt.style.display = "", xe && (xe.innerHTML = "");
    }
    async function ji(n) {
        Ja(), _t.innerHTML = "", $t(n ? `Searching “${n}”…` : "Loading featured titles…");
        try {
            const e = `/api/vod/search?q=${encodeURIComponent(n)}&category=${Qa}`, t = await fetch(e);
            if (!t.ok) throw new Error(`HTTP ${t.status}`);
            const s = await t.json(), i = s.results || [];
            if (!i.length) {
                $t("No results. Try another title.");
                return;
            }
            $t(`${s.total ?? i.length} result(s) — click to stream`);
            const r = document.createDocumentFragment();
            for (const a of i)r.appendChild(Zu(a));
            _t.appendChild(r);
        } catch (e) {
            $t(`Search failed: ${e.message}`);
        }
    }
    function Zu(n) {
        const e = document.createElement("div");
        e.className = "vod-card";
        const t = [];
        return n.year && t.push(`<span class="vod-chip">${n.year}</span>`), n.size && t.push(`<span class="vod-chip">${zu(n.size)}</span>`), typeof n.seeders == "number" && t.push(`<span class="vod-chip">${n.seeders} seed</span>`), t.push(`<span class="vod-chip vod-src">${$s(n.source)}</span>`), e.innerHTML = `<h4>${$s(n.title)}</h4><div class="vod-meta">${t.join("")}</div>`, e.addEventListener("click", ()=>void eh(n)), e;
    }
    async function eh(n) {
        _t.style.display = "none", Qt.style.display = "none", Tn.classList.add("is-open"), se.querySelector("#vodPlayerTitle").textContent = n.title, xe.innerHTML = '<div class="vod-status" style="padding:20px">Loading…</div>', n.url.startsWith("magnet:") ? await sh(n) : await th(n);
    }
    function Za(n) {
        xe.innerHTML = "";
        const e = document.createElement("video");
        e.controls = !0, e.autoplay = !0, e.setAttribute("playsinline", ""), e.src = n, xe.appendChild(e), e.addEventListener("error", ()=>{
            xe.innerHTML = `<div class="vod-status" style="padding:20px">Playback error — the file's codec may not be browser-native (e.g. HEVC video or AC3/DDP audio). The stream is fine; it's a browser codec limit. Point a native player (or Jellyfin, which transcodes) at the same URL, or try another release.</div>`;
        });
    }
    async function th(n) {
        let e = 0;
        try {
            const t = await fetch(`/api/vod/resolve?magnet=${encodeURIComponent(n.url)}`);
            if (t.ok) {
                const i = (await t.json()).files || [], a = i.filter((o)=>/\.(mp4|m4v|webm|mov)$/i.test(o.name)).sort((o, l)=>l.size - o.size)[0] || i.slice().sort((o, l)=>l.size - o.size)[0];
                a && (e = a.index);
            }
        } catch  {}
        Za(`/api/vod/stream?magnet=${encodeURIComponent(n.url)}&file=${e}`);
    }
    async function sh(n) {
        const e = qi(), t = (o)=>fetch(`${e}/torrents`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(o)
            });
        xe.innerHTML = '<div class="vod-status" style="padding:20px">Adding torrent…</div>';
        let s = "";
        try {
            const o = await t({
                action: "add",
                link: n.url,
                title: n.title,
                save_to_db: !1
            });
            if (!o.ok) throw new Error(`HTTP ${o.status}`);
            if (s = (await o.json()).hash, !s) throw new Error("no hash returned");
        } catch (o) {
            xe.innerHTML = `<div class="vod-status" style="padding:20px">Couldn't reach the torrent server (<code>${$s(e)}</code>): ${$s(o.message)}. Set the correct address in the field below.</div>`;
            return;
        }
        xe.innerHTML = '<div class="vod-status" style="padding:20px">Connecting to peers &amp; fetching metadata…</div>';
        let i = null;
        const r = Date.now() + 45e3;
        for(; Date.now() < r;){
            try {
                const c = (await (await t({
                    action: "get",
                    hash: s
                })).json()).file_stats || [];
                if (c.length) {
                    i = c.filter((u)=>Xu.test(u.path)).sort((u, h)=>h.length - u.length)[0] || c.slice().sort((u, h)=>h.length - u.length)[0];
                    break;
                }
            } catch  {}
            await new Promise((o)=>setTimeout(o, 2e3));
        }
        if (!i) {
            xe.innerHTML = '<div class="vod-status" style="padding:20px">No peers responded for this release (no metadata after 45s). It may be dead/low-seeded — try another result.</div>';
            return;
        }
        const a = i.path.split("/").pop() || "video";
        Za(`${e}/stream/${encodeURIComponent(a)}?link=${encodeURIComponent(s)}&index=${i.id}&play`);
    }
    function $s(n) {
        return n.replace(/[&<>"']/g, (e)=>({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[e]);
    }
    function ih() {
        Ju(), se.classList.add("is-open"), Ls.focus(), _t.children.length || ji("");
    }
    function Dr() {
        se && (se.classList.remove("is-open"), xe && (xe.innerHTML = ""));
    }
    function Cr() {
        const n = document.querySelector("#topbar .topbar-right"), e = document.getElementById("sourcesBtn");
        if (!n || document.getElementById("vodOpenBtn")) return;
        const t = document.createElement("button");
        t.id = "vodOpenBtn", t.className = "btn btn-outline", t.textContent = "Movies", t.title = "Stream movies & TV from torrents", t.addEventListener("click", ih), n.insertBefore(t, e);
    }
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Cr) : Cr();
    await Wu();
    const k = (n)=>document.getElementById(n), dt = k("search"), st = k("groupSelect"), Xe = k("listViewport"), nh = k("listSpacer"), Ai = k("listRows"), rh = k("listEmpty"), ah = k("listEmptyHint"), oh = k("railCount"), Gs = k("serverStatus"), eo = k("rail"), lh = k("railTools"), wr = k("filterControls"), to = k("hideDeadBtn"), ch = k("pipelineStrip"), _r = k("pipelineText"), dh = k("pipelineBarFill"), _e = k("player"), so = k("playerShell"), uh = k("veilIdle"), hh = k("veilTuning"), fh = k("veilError"), gh = k("tuningName"), mh = k("errorDetail"), ph = k("tally"), yh = k("tallyLabel"), kr = k("clock"), Eh = k("ltNumber"), Th = k("ltName"), xh = k("ltGroup"), Vt = k("ltNow"), Wt = k("ltNext"), vh = k("nowTitle"), Sh = k("nowTime"), Lh = k("nowProgress"), Ah = k("nextTitle"), bh = k("nextTime"), hs = k("guideStatus"), xn = k("guideTimeline"), Rh = k("guideSplit"), As = k("guideEmpty"), Pr = k("tlRuler"), zi = k("tlTrack"), Fr = k("tlNow"), Nt = k("guideNow"), bi = k("guideNext"), Ih = k("libraryTools"), Ks = k("libViewport"), Dh = k("libSpacer"), Ri = k("libRows"), Ch = k("libEmpty"), wh = k("libEmptyHint"), gt = k("drawer"), _h = k("toasts"), mt = k("homeRails"), Xi = k("homeHero"), kh = k("homeEmpty"), ht = 56, Or = 6, Ph = 170, bs = 14, io = 210, Hs = 20;
    let Ve = [], de = [], lt = new Map, kt = "all", Yt = localStorage.getItem("signal.hideDead") === "1", ve = localStorage.getItem("signal.layout") || "home", Pt = null, Me = null, ye = -1, Pe = null, Qe = null, Re = [], Ii = 0, Rs = [
        -1,
        -1
    ], qt = 1, Is = [
        -1,
        -1
    ], Mr = !1, Nr = -1;
    const ne = new Set(JSON.parse(localStorage.getItem("signal.favs") || "[]")), Jt = new Set(JSON.parse(localStorage.getItem("signal.dead") || "[]"));
    let it = JSON.parse(localStorage.getItem("signal.recents") || "[]");
    const Fh = 20, Ie = (n)=>n.tvg_id || `${n.name}|${n.url}`, Je = (n)=>n.tvg_id || n.name, Ze = (n)=>n.status === "dead" || Jt.has(Ie(n)), no = ()=>localStorage.setItem("signal.dead", JSON.stringify([
            ...Jt
        ])), vn = ()=>localStorage.setItem("signal.favs", JSON.stringify([
            ...ne
        ]));
    function Te(n, e = "info", t = 3200) {
        const s = document.createElement("div");
        s.className = `toast ${e}`, s.textContent = n, _h.appendChild(s), setTimeout(()=>{
            s.style.opacity = "0", setTimeout(()=>s.remove(), 350);
        }, t);
    }
    function ro() {
        const n = new Date;
        kr.textContent = n.toLocaleTimeString([], {
            hour12: !1
        }), kr.setAttribute("datetime", n.toISOString());
    }
    ro();
    setInterval(ro, 1e3);
    async function Qi() {
        try {
            const n = await Ne.channels();
            Ve = n.channels || [], lt = new Map;
            try {
                const e = Nu(Ve);
                if (e) for (const [t, s] of e)lt.set(t || "Uncategorized", s);
            } catch  {}
            if (lt.size === 0) for (const e of Ve){
                const t = e.group || "Uncategorized";
                lt.set(t, (lt.get(t) || 0) + 1);
            }
            Oh(), nt(), ve === "home" && Js(), Gs.dataset.ok = "1", n.pipeline && ao(n.pipeline);
        } catch  {
            Gs.dataset.ok = "0", Te("Could not reach the server", "err");
        }
    }
    function Oh() {
        const n = st.value;
        st.innerHTML = "";
        const e = document.createElement("option");
        e.value = "", e.textContent = `All groups (${Ve.length.toLocaleString()})`, st.appendChild(e), [
            ...lt.entries()
        ].sort((t, s)=>t[0].localeCompare(s[0])).forEach(([t, s])=>{
            const i = document.createElement("option");
            i.value = t, i.textContent = `${t} (${s})`, st.appendChild(i);
        }), [
            ...st.options
        ].some((t)=>t.value === n) && (st.value = n);
    }
    function ao(n) {
        const e = !!n.running;
        if (ch.hidden = !e, e) {
            let i = n.phase || "working…", r = 0;
            n.phase === "fetching playlists" && n.playlists_total ? (i = `Fetching playlists ${n.playlists_fetched}/${n.playlists_total}`, r = n.playlists_fetched / n.playlists_total * 100) : n.phase === "checking streams" && n.unique_channels ? (i = `Testing streams ${n.checked.toLocaleString()}/${n.unique_channels.toLocaleString()} · ${n.alive.toLocaleString()} live`, r = n.checked / n.unique_channels * 100) : n.phase === "fetching EPG" && n.epg_total ? (i = `Merging EPG ${n.epg_fetched}/${n.epg_total}`, r = n.epg_fetched / n.epg_total * 100) : n.phase === "deduplicating" && (i = "Deduplicating channels…"), _r.textContent = i, dh.style.width = `${Math.min(100, r)}%`;
            const a = Math.floor((n.alive || 0) / 500);
            a !== Nr && (Nr = a, n.phase === "checking streams" && Qi());
        }
        Mr && !e && (Te("Channel curation finished — list updated", "ok"), Qi(), Qe && Xs(Qe)), Mr = e;
        const t = document.getElementById("pipelineNote");
        t && (e ? t.textContent = `Running: ${_r.textContent}` : n.last_run && (t.textContent = `Last rebuilt ${new Date(n.last_run).toLocaleString()}. Rebuild to re-test every stream.`));
        const s = document.getElementById("pipelineRunBtn");
        s && (s.disabled = e);
    }
    async function qs() {
        try {
            const n = await Ne.pipelineStatus();
            ao(n), Gs.dataset.ok = "1";
        } catch  {
            Gs.dataset.ok = "0";
        }
    }
    setInterval(qs, 5e3);
    function nt() {
        const n = dt.value.trim().toLowerCase(), e = st.value;
        let t = Ve;
        if (kt === "fav" && (t = t.filter((r)=>ne.has(Je(r)))), kt === "recent") {
            const r = new Map(it.map((a, o)=>[
                    a,
                    o
                ]));
            t = t.filter((a)=>r.has(Ie(a))).sort((a, o)=>r.get(Ie(a)) - r.get(Ie(o)));
        }
        Yt && (t = t.filter((r)=>!Ze(r))), e && (t = t.filter((r)=>(r.group || "Uncategorized") === e)), n && (t = t.filter((r)=>(r.name || "").toLowerCase().includes(n) || (r.tvg_id || "").toLowerCase().includes(n) || (r.group || "").toLowerCase().includes(n))), de = t, ye = -1, oh.textContent = `${de.length.toLocaleString()} CH`;
        const s = de.length === 0, i = Ve.length === 0 ? "The server is still curating channels — give it a moment, or open Sources." : "Nothing matches this filter.";
        rh.hidden = !s, ah.textContent = i, Ch.hidden = !s, wh.textContent = i, nh.style.height = `${de.length * ht}px`, Rs = [
            -1,
            -1
        ], pt(!0), ve === "library" && Sn();
    }
    function pt(n = !1) {
        const e = Xe.scrollTop, t = Xe.clientHeight || 600, s = Math.max(0, Math.floor(e / ht) - Or), i = Math.min(de.length, Math.ceil((e + t) / ht) + Or);
        if (!n && s === Rs[0] && i === Rs[1]) return;
        Rs = [
            s,
            i
        ], Ai.style.transform = `translateY(${s * ht}px)`, Ai.innerHTML = "";
        const r = document.createDocumentFragment();
        for(let a = s; a < i; a++)r.appendChild(Mh(de[a], a));
        Ai.appendChild(r);
    }
    function Vs(n) {
        const e = document.createElement("span");
        return e.className = "ch-tile", e.textContent = (n || "?").trim().charAt(0).toUpperCase() || "?", e;
    }
    function oo(n, e) {
        const t = Je(n), s = document.createElement("button");
        return s.className = e + (ne.has(t) ? " is-fav" : ""), s.textContent = ne.has(t) ? "★" : "☆", s.title = ne.has(t) ? "Remove from favorites" : "Add to favorites", s.addEventListener("click", (i)=>{
            i.stopPropagation(), ne.has(t) ? ne.delete(t) : ne.add(t), vn(), kt === "fav" ? nt() : js();
        }), s;
    }
    function js() {
        pt(!0), ve === "library" && Ln(!0), ve === "home" && Js();
    }
    function Mh(n, e) {
        const t = Ie(n), s = document.createElement("div");
        s.className = "ch-row", t === Me && s.classList.add("is-current"), e === ye && s.classList.add("is-keyed"), Ze(n) && s.classList.add("is-dead");
        const i = document.createElement("span");
        if (i.className = "ch-num", i.textContent = String(e + 1).padStart(3, "0"), s.appendChild(i), n.logo) {
            const l = document.createElement("img");
            l.className = "ch-logo", l.loading = "lazy", l.src = n.logo, l.alt = "", l.onerror = ()=>l.replaceWith(Vs(n.name)), s.appendChild(l);
        } else s.appendChild(Vs(n.name));
        const r = document.createElement("div");
        r.className = "ch-meta";
        const a = document.createElement("span");
        a.className = "ch-name", a.textContent = n.name || "Unnamed channel";
        const o = document.createElement("span");
        if (o.className = "ch-group", o.textContent = n.group || "", r.append(a, o), s.appendChild(r), Ze(n)) {
            const l = document.createElement("span");
            l.className = "ch-health dead", l.title = "Stream failed recently", s.appendChild(l);
        }
        return s.appendChild(oo(n, "ch-fav")), s.addEventListener("click", ()=>Zt(n)), s;
    }
    let Di = !1;
    Xe.addEventListener("scroll", ()=>{
        Di || (Di = !0, requestAnimationFrame(()=>{
            Di = !1, pt();
        }));
    });
    function Sn() {
        const n = (Ks.clientWidth || 900) - Hs * 2;
        qt = Math.max(1, Math.floor((n + bs) / (Ph + bs)));
        const e = Math.ceil(de.length / qt);
        Dh.style.height = `${e * (io + bs) + Hs * 2}px`, Is = [
            -1,
            -1
        ], Ln(!0);
    }
    function Ln(n = !1) {
        const e = io + bs, t = Ks.scrollTop, s = Ks.clientHeight || 700, i = Math.ceil(de.length / qt), r = Math.max(0, Math.floor((t - Hs) / e) - 2), a = Math.min(i, Math.ceil((t + s) / e) + 2);
        if (!n && r === Is[0] && a === Is[1]) return;
        Is = [
            r,
            a
        ], Ri.style.transform = `translateY(${Hs + r * e}px)`, Ri.innerHTML = "";
        const o = document.createDocumentFragment();
        for(let l = r; l < a; l++){
            const c = document.createElement("div");
            c.className = "lib-row";
            for(let d = 0; d < qt; d++){
                const u = l * qt + d;
                if (u >= de.length) break;
                c.appendChild(lo(de[u]));
            }
            o.appendChild(c);
        }
        Ri.appendChild(o);
    }
    function lo(n) {
        const e = Ie(n), t = document.createElement("div");
        t.className = "lib-card", e === Me && t.classList.add("is-current"), Ze(n) && t.classList.add("is-dead");
        const s = document.createElement("div");
        if (s.className = "lib-poster", n.logo) {
            const o = document.createElement("img");
            o.loading = "lazy", o.src = n.logo, o.alt = "", o.onerror = ()=>o.replaceWith(Vs(n.name)), s.appendChild(o);
        } else s.appendChild(Vs(n.name));
        t.appendChild(s);
        const i = document.createElement("div");
        i.className = "lib-meta";
        const r = document.createElement("div");
        r.className = "lib-name", r.textContent = n.name || "Unnamed channel";
        const a = document.createElement("span");
        if (a.className = "lib-group", a.textContent = n.group || "", i.append(r, a), t.appendChild(i), e === Me) {
            const o = document.createElement("span");
            o.className = "lib-live-tag", o.textContent = "ON AIR", t.appendChild(o);
        } else if (Ze(n)) {
            const o = document.createElement("span");
            o.className = "lib-dead-dot", o.title = "Stream failed recently", t.appendChild(o);
        }
        return t.appendChild(oo(n, "lib-fav")), t.addEventListener("click", ()=>Zt(n)), t;
    }
    let Ci = !1;
    Ks.addEventListener("scroll", ()=>{
        Ci || (Ci = !0, requestAnimationFrame(()=>{
            Ci = !1, Ln();
        }));
    });
    window.addEventListener("resize", ()=>{
        pt(!0), ve === "library" && Sn();
    });
    function Ft(n) {
        ve = n, localStorage.setItem("signal.layout", n), document.body.dataset.layout = n, k("layoutHomeBtn").classList.toggle("is-active", n === "home"), k("layoutConsoleBtn").classList.toggle("is-active", n === "console"), k("layoutLibraryBtn").classList.toggle("is-active", n === "library"), n === "library" ? (Ih.appendChild(wr), Sn()) : n === "console" ? (lh.appendChild(wr), pt(!0)) : Js();
    }
    k("layoutHomeBtn").addEventListener("click", ()=>Ft("home"));
    k("layoutConsoleBtn").addEventListener("click", ()=>Ft("console"));
    k("layoutLibraryBtn").addEventListener("click", ()=>Ft("library"));
    function zs(n) {
        so.dataset.state = n, uh.hidden = n !== "idle", hh.hidden = n !== "tuning", fh.hidden = n !== "error", _e.controls = n === "playing";
        const e = n === "playing" ? "live" : n === "tuning" ? "tuning" : "standby";
        ph.dataset.state = e, yh.textContent = e === "live" ? "ON AIR" : e === "tuning" ? "CUED" : "STANDBY";
    }
    function Zt(n) {
        Qe = n, Me = Ie(n), ye = -1, ve !== "console" && Ft("console"), js(), window.innerWidth <= 920 && eo.classList.remove("is-open"), zs("tuning"), gh.textContent = n.name || "";
        const e = de.findIndex((t)=>Ie(t) === Me);
        Eh.textContent = e >= 0 ? String(e + 1).padStart(3, "0") : "···", Th.textContent = n.name || "Unnamed channel", xh.textContent = n.group || "", Vt.hidden = !0, Wt.hidden = !0, Nh(n.url), Gh(n), Xs(n);
    }
    let Ur = 0;
    function Nh(n) {
        const e = ++Ur;
        Pe && (Pe.destroy(), Pe = null), _e.removeAttribute("src");
        const t = Ne.proxyUrl(n), s = (r)=>{
            e === Ur && $h(r);
        };
        _e.addEventListener("playing", Uh, {
            once: !0
        });
        const i = /\.m3u8($|\?)/i.test(n);
        i && be.isSupported() ? (Pe = new be({
            maxBufferLength: 30,
            manifestLoadingTimeOut: 15e3,
            levelLoadingTimeOut: 15e3
        }), Pe.loadSource(t), Pe.attachMedia(_e), Pe.on(be.Events.MANIFEST_PARSED, ()=>_e.play().catch(()=>{})), Pe.on(be.Events.ERROR, (r, a)=>{
            a.fatal && s(Bh(a));
        })) : i && _e.canPlayType("application/vnd.apple.mpegurl") ? (_e.src = t, _e.play().catch(()=>{})) : (_e.src = t, _e.play().catch(()=>s("The browser refused to start this stream."))), _e.onerror = ()=>{
            so.dataset.state !== "playing" && s("The stream did not respond. It may be offline or geo-blocked.");
        };
    }
    function Uh() {
        zs("playing"), Me && Jt.delete(Me) && (no(), js());
    }
    function Bh(n) {
        return n.type === be.ErrorTypes.NETWORK_ERROR ? "Network error — the stream may be offline or geo-blocked." : n.type === be.ErrorTypes.MEDIA_ERROR ? "The stream sent media the browser could not decode." : "Playback failed.";
    }
    function $h(n) {
        Pe && (Pe.destroy(), Pe = null), mh.textContent = n, zs("error"), Me && !Jt.has(Me) && (Jt.add(Me), no(), js());
    }
    k("retryBtn").addEventListener("click", ()=>{
        Qe && Zt(Qe);
    });
    function Gh(n) {
        const e = Ie(n);
        it = [
            e,
            ...it.filter((t)=>t !== e)
        ].slice(0, Fh), localStorage.setItem("signal.recents", JSON.stringify(it)), kt === "recent" && nt();
    }
    const Oe = (n)=>{
        const e = new Date(n);
        return isNaN(e.getTime()) ? "" : e.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: !1
        });
    }, Kh = 30 * 6e4, Ji = 4.5 * 36e5;
    let Lt = 0;
    function fs(n) {
        xn.hidden = n !== "ok", Rh.hidden = n !== "ok", As.hidden = n === "ok";
    }
    async function Xs(n) {
        const e = ++Ii;
        Re = [], hs.textContent = `Loading schedule for ${n.name}…`, fs("loading"), As.textContent = "", Vt.hidden = !0, Wt.hidden = !0;
        const t = n.tvg_id || n.name;
        try {
            const s = await Ne.channelEpg(t, n.name || "");
            if (e !== Ii) return;
            if (Re = (s.programmes || []).filter((i)=>!isNaN(Date.parse(i.start)) && !isNaN(Date.parse(i.stop))), !Re.length) {
                hs.textContent = n.name, fs("empty"), As.textContent = "No programme data for this channel yet. Load a matching guide from Sources → Library.";
                return;
            }
            hs.textContent = `${n.name} — ${Re.length} programmes`, fs("ok"), co();
        } catch  {
            if (e !== Ii) return;
            hs.textContent = n.name, fs("empty"), As.textContent = "Could not load the schedule from the server.";
        }
    }
    function co() {
        Lt = Date.now() - Kh;
        const e = Lt + Ji, t = (r)=>(r - Lt) / Ji * 100;
        Pr.innerHTML = "";
        const s = Math.ceil(Lt / 36e5) * 36e5;
        for(let r = s; r <= e; r += 36e5){
            const a = document.createElement("span");
            a.className = "tl-tick", a.style.left = `${t(r)}%`, a.textContent = Oe(r), Pr.appendChild(a);
        }
        zi.innerHTML = "";
        const i = document.createDocumentFragment();
        for (const r of Re){
            const a = Date.parse(r.start), o = Date.parse(r.stop);
            if (o <= Lt || a >= e) continue;
            const l = Math.max(0, t(a)), d = Math.min(100, t(o)) - l;
            if (d <= .4) continue;
            const u = document.createElement("div");
            u.className = "tl-block", u.dataset.start = String(a), u.dataset.stop = String(o), u.style.left = `${l}%`, u.style.width = `${d}%`;
            const h = document.createElement("div");
            h.className = "b-title", h.textContent = r.title || "Untitled programme";
            const f = document.createElement("div");
            f.className = "b-time", f.textContent = `${Oe(r.start)}–${Oe(r.stop)}`, u.title = `${r.title}
${Oe(r.start)}–${Oe(r.stop)}`, u.append(h, f), i.appendChild(u);
        }
        zi.appendChild(i), Hh(), Vh();
    }
    function Hh() {
        const n = Date.now(), e = Re.find((s)=>Date.parse(s.start) <= n && n < Date.parse(s.stop)), t = Re.filter((s)=>Date.parse(s.start) > n).slice(0, 5);
        if (Nt.innerHTML = "", e) {
            const s = document.createElement("div");
            s.className = "gc-now-title", s.textContent = e.title || "Untitled programme";
            const i = document.createElement("div");
            if (i.className = "gc-now-time", i.textContent = `${Oe(e.start)} – ${Oe(e.stop)}`, Nt.append(s, i), e.description) {
                const o = document.createElement("div");
                o.className = "gc-now-desc", o.textContent = e.description, Nt.appendChild(o);
            }
            const r = document.createElement("div");
            r.className = "gc-progress";
            const a = document.createElement("div");
            a.className = "gc-progress-bar", a.id = "gcProgBar", r.appendChild(a), Nt.appendChild(r);
        } else {
            const s = document.createElement("div");
            s.className = "gc-now-desc", s.textContent = "Nothing scheduled right now.", Nt.appendChild(s);
        }
        if (bi.innerHTML = "", t.length) {
            const s = document.createDocumentFragment();
            for (const i of t){
                const r = document.createElement("div");
                r.className = "gc-next-item";
                const a = document.createElement("span");
                a.className = "gc-next-time", a.textContent = Oe(i.start);
                const o = document.createElement("span");
                o.className = "gc-next-title", o.textContent = i.title || "Untitled programme", r.append(a, o), s.appendChild(r);
            }
            bi.appendChild(s);
        } else {
            const s = document.createElement("div");
            s.className = "gc-now-desc", s.textContent = "No upcoming programmes in the guide.", bi.appendChild(s);
        }
    }
    function Vh() {
        const n = Date.now();
        if (Re.length && !xn.hidden) {
            const e = (n - Lt) / Ji * 100;
            Fr.style.left = `${Math.max(0, Math.min(100, e))}%`, Fr.style.display = e < 0 || e > 100 ? "none" : "block", zi.querySelectorAll(".tl-block").forEach((i)=>{
                const r = Number(i.dataset.start), a = Number(i.dataset.stop);
                i.classList.toggle("is-live", r <= n && n < a), i.classList.toggle("is-past", a <= n);
            });
            const t = Re.find((i)=>Date.parse(i.start) <= n && n < Date.parse(i.stop)), s = document.getElementById("gcProgBar");
            if (t && s) {
                const i = Date.parse(t.start), r = Date.parse(t.stop);
                s.style.width = `${Math.min(100, Math.max(0, (n - i) / (r - i) * 100))}%`;
            }
        }
        uo();
    }
    function uo() {
        if (!Re.length) {
            Vt.hidden = !0, Wt.hidden = !0;
            return;
        }
        const n = Date.now();
        let e = null, t = null;
        for (const s of Re){
            const i = Date.parse(s.start), r = Date.parse(s.stop);
            if (i <= n && n < r) e = s;
            else if (i > n) {
                t = s;
                break;
            }
        }
        if (e) {
            Vt.hidden = !1, vh.textContent = e.title || "Untitled programme", Sh.textContent = `${Oe(e.start)}–${Oe(e.stop)}`;
            const s = Date.parse(e.start), i = Date.parse(e.stop);
            Lh.style.width = `${Math.min(100, Math.max(0, (n - s) / (i - s) * 100))}%`;
        } else Vt.hidden = !0;
        t ? (Wt.hidden = !1, Ah.textContent = t.title || "Untitled programme", bh.textContent = Oe(t.start)) : Wt.hidden = !0;
    }
    setInterval(()=>{
        Re.length && !xn.hidden ? co() : uo();
    }, 6e4);
    let wi = null;
    dt.addEventListener("input", ()=>{
        wi && clearTimeout(wi), wi = setTimeout(()=>{
            ve === "home" && dt.value.trim() && Ft("library"), nt();
        }, 120);
    });
    st.addEventListener("change", nt);
    document.querySelectorAll(".chip[data-mode]").forEach((n)=>{
        n.addEventListener("click", ()=>{
            document.querySelectorAll(".chip[data-mode]").forEach((e)=>e.classList.remove("is-active")), n.classList.add("is-active"), kt = n.dataset.mode, nt();
        });
    });
    function ho() {
        to.setAttribute("aria-pressed", Yt ? "true" : "false");
    }
    to.addEventListener("click", ()=>{
        Yt = !Yt, localStorage.setItem("signal.hideDead", Yt ? "1" : "0"), ho(), nt();
    });
    ho();
    document.addEventListener("keydown", (n)=>{
        const e = [
            "INPUT",
            "TEXTAREA",
            "SELECT"
        ].includes(n.target.tagName);
        if (n.key === "/" && !e) {
            n.preventDefault(), dt.focus(), dt.select();
            return;
        }
        if (n.key === "Escape") {
            gt.hidden ? n.target === dt && dt.blur() : fo();
            return;
        }
        if (!(e || !gt.hidden)) {
            if (ve === "home") {
                Qh(n);
                return;
            }
            if (ve === "console") {
                if (n.key === "ArrowDown" || n.key === "ArrowUp") {
                    if (n.preventDefault(), !de.length) return;
                    const t = n.key === "ArrowDown" ? 1 : -1;
                    ye < 0 ? ye = Math.max(0, de.findIndex((i)=>Ie(i) === Me)) : ye = Math.min(de.length - 1, Math.max(0, ye + t));
                    const s = ye * ht;
                    s < Xe.scrollTop ? Xe.scrollTop = s : s + ht > Xe.scrollTop + Xe.clientHeight && (Xe.scrollTop = s + ht - Xe.clientHeight), pt(!0);
                } else if (n.key === "Enter" && ye >= 0 && de[ye]) Zt(de[ye]);
                else if (n.key.toLowerCase() === "f" && ye >= 0 && de[ye]) {
                    const t = de[ye], s = Je(t);
                    ne.has(s) ? ne.delete(s) : ne.add(s), vn(), kt === "fav" ? nt() : pt(!0);
                }
            }
        }
    });
    k("railToggle").addEventListener("click", ()=>eo.classList.toggle("is-open"));
    function Wh() {
        gt.hidden = !1, Yh(), Qs(), qs();
    }
    function fo() {
        gt.hidden = !0;
    }
    k("sourcesBtn").addEventListener("click", Wh);
    gt.querySelectorAll("[data-close]").forEach((n)=>n.addEventListener("click", fo));
    gt.querySelectorAll(".tab").forEach((n)=>{
        n.addEventListener("click", ()=>{
            gt.querySelectorAll(".tab").forEach((e)=>e.classList.remove("is-active")), n.classList.add("is-active"), [
                "library",
                "playlists",
                "import"
            ].forEach((e)=>{
                k(`tab-${e}`).hidden = e !== n.dataset.tab;
            });
        });
    });
    async function Yh() {
        const n = k("libM3u"), e = k("libEpg");
        try {
            const t = await Ne.sources();
            n.innerHTML = "", e.innerHTML = "";
            for (const s of t.sources || []){
                const i = document.createElement("li");
                i.className = "source-item";
                const r = document.createElement("div");
                r.className = "source-info";
                const a = document.createElement("div");
                a.className = "source-name", a.textContent = s.name;
                const o = document.createElement("div");
                o.className = "source-desc", o.textContent = s.description, r.append(a, o);
                const l = document.createElement("span");
                l.className = "region-chip", l.textContent = s.region;
                const c = document.createElement("button");
                c.className = "btn btn-outline btn-sm", c.textContent = "Load", c.addEventListener("click", ()=>go(s.url, c)), i.append(r, l, c), (s.source_type === "m3u" ? n : e).appendChild(i);
            }
        } catch  {
            n.innerHTML = '<li class="source-item"><span class="source-desc">Could not load the library.</span></li>';
        }
    }
    async function go(n, e) {
        e.disabled = !0, e.textContent = "Loading…";
        try {
            const t = await Ne.fetchSource(n);
            t.type === "playlist" ? (Te(`Loaded ${String(t.name ?? "playlist")}: ${(t.total_channels || 0).toLocaleString()} channels. Rebuild the working set to include them.`, "ok", 5e3), Qs()) : (Te(`EPG loaded: ${(t.programs_count || 0).toLocaleString()} programmes`, "ok"), Qe && Xs(Qe)), e.textContent = "Loaded";
        } catch (t) {
            Te(`Fetch failed: ${t.message}`, "err", 5e3), e.textContent = "Load", e.disabled = !1;
        }
    }
    async function Qs() {
        const n = k("myPlaylists");
        try {
            const e = await Ne.playlists(), t = Object.values(e.playlists || {});
            if (n.innerHTML = "", !t.length) {
                n.innerHTML = '<li class="source-item"><span class="source-desc">No playlists on the server yet — grab one from the Library tab.</span></li>';
                return;
            }
            t.sort((s, i)=>s.name.localeCompare(i.name));
            for (const s of t){
                const i = document.createElement("li");
                i.className = "playlist-item";
                const r = document.createElement("span");
                r.className = "playlist-name", r.textContent = s.name;
                const a = document.createElement("span");
                a.className = "playlist-count", a.textContent = `${(s.total_channels || 0).toLocaleString()} CH`;
                const o = document.createElement("div");
                o.className = "playlist-actions";
                const l = document.createElement("button");
                l.className = "btn btn-danger btn-sm", l.textContent = "Delete", l.addEventListener("click", async ()=>{
                    if (l.dataset.armed !== "1") {
                        l.dataset.armed = "1", l.textContent = "Confirm delete", setTimeout(()=>{
                            l.dataset.armed = "", l.textContent = "Delete";
                        }, 3e3);
                        return;
                    }
                    try {
                        await Ne.deletePlaylist(s.name), Te(`Deleted ${s.name}`, "ok"), Qs();
                    } catch (c) {
                        Te(`Delete failed: ${c.message}`, "err");
                    }
                }), o.append(l), i.append(r, a, o), n.appendChild(i);
            }
        } catch  {
            n.innerHTML = '<li class="source-item"><span class="source-desc">Could not load playlists.</span></li>';
        }
    }
    const Br = document.getElementById("pipelineRunBtn");
    Br && Br.addEventListener("click", async ()=>{
        try {
            await Ne.pipelineRun(), Te("Rebuilding the working set — streams are being re-tested", "info"), qs();
        } catch (n) {
            Te(`Could not start rebuild: ${n.message}`, "err");
        }
    });
    async function mo(n, e, t) {
        const s = n.files?.[0];
        if (!s) {
            Te(`Choose a ${t} file first`, "err");
            return;
        }
        try {
            const i = await Ne.uploadFile(e, s);
            i.type === "playlist" ? (Te(`Uploaded ${s.name}: ${(i.total_channels || 0).toLocaleString()} channels. Rebuild the working set to include them.`, "ok", 5e3), Qs()) : (Te(`EPG uploaded: ${(i.programs_count || 0).toLocaleString()} programmes`, "ok"), Qe && Xs(Qe)), n.value = "";
        } catch (i) {
            Te(`Upload failed: ${i.message}`, "err", 5e3);
        }
    }
    k("uploadM3u").addEventListener("click", ()=>mo(k("m3uFile"), "/api/playlists/upload", "playlist"));
    k("uploadEpg").addEventListener("click", ()=>mo(k("epgFile"), "/api/epg/upload", "EPG"));
    k("importUrlBtn").addEventListener("click", async ()=>{
        const n = k("importUrl"), e = n.value.trim();
        if (!e) {
            Te("Enter a URL first", "err");
            return;
        }
        const t = k("importUrlBtn");
        await go(e, t), t.textContent = "Fetch", t.disabled = !1, n.value = "";
    });
    const qh = [
        {
            title: "News",
            re: /\bnews\b|cnn|bbc|msnbc|al ?jazeera|sky news|euronews|fox news/i
        },
        {
            title: "Sports",
            re: /sport|espn|football|soccer|\bnba\b|\bnfl\b|\bmlb\b|\bnhl\b|golf|tennis|racing|dazn/i
        },
        {
            title: "Movies & Series",
            re: /movie|cinema|\bfilm|drama|series|comedy|hollywood/i
        },
        {
            title: "Kids",
            re: /kids|cartoon|children|junior|nick|disney|boomerang|baby/i
        },
        {
            title: "Music",
            re: /music|mtv|vevo|\bhits\b|\bradio\b|\bfm\b|vibe/i
        },
        {
            title: "Documentary & Knowledge",
            re: /document|discovery|history|nat ?geo|science|animal|nature|travel/i
        },
        {
            title: "Lifestyle",
            re: /lifestyle|food|cook|home|fashion|travel|health/i
        }
    ], An = (n)=>Ve.find((e)=>Ie(e) === n);
    function jh(n) {
        const e = new Map, t = (r, a)=>{
            r && e.set(r, (e.get(r) || 0) + a);
        };
        for (const r of Ve)ne.has(Je(r)) && t(r.group, 3);
        if (it.slice(0, 10).forEach((r, a)=>{
            const o = An(r);
            o && t(o.group, 2 - a * .1);
        }), e.size === 0) return [];
        const s = new Set(it), i = [];
        for (const r of Ve){
            if (Ze(r) || ne.has(Je(r)) || s.has(Ie(r))) continue;
            const a = e.get(r.group || "") || 0;
            a > 0 && i.push([
                a,
                r
            ]);
        }
        return i.sort((r, a)=>a[0] - r[0]), i.slice(0, n).map((r)=>r[1]);
    }
    function Ut(n, e, t) {
        if (!t.length) return null;
        const s = document.createElement("div");
        s.className = "rail-block";
        const i = document.createElement("div");
        i.className = "rail-head";
        const r = document.createElement("span");
        if (r.className = "rail-title", r.textContent = n, i.appendChild(r), e) {
            const l = document.createElement("span");
            l.className = "rail-sub", l.textContent = e, i.appendChild(l);
        }
        const a = document.createElement("div");
        a.className = "rail-track";
        const o = document.createDocumentFragment();
        for (const l of t)o.appendChild(lo(l));
        return a.appendChild(o), s.append(i, a), s;
    }
    function zh(n) {
        const e = n.filter((a)=>ne.has(Je(a))), t = it.map(An).filter((a)=>!!a).filter((a)=>!Ze(a)), s = e[0] || t[0] || n[0];
        if (!s) {
            Xi.hidden = !0;
            return;
        }
        Pt = s, Xi.hidden = !1;
        const i = k("heroLogo");
        s.logo ? (i.src = s.logo, i.style.display = "") : (i.removeAttribute("src"), i.style.display = "none"), k("heroName").textContent = s.name || "Featured channel", k("heroEyebrow").textContent = e[0] ? "From your favorites" : t[0] ? "Jump back in" : "Featured", k("heroProg").textContent = s.group || "", k("heroFav").textContent = ne.has(Je(s)) ? "★ Favorited" : "☆ Favorite";
        const r = s.tvg_id || s.name;
        Ne.channelEpg(r, s.name || "").then((a)=>{
            if (Pt !== s) return;
            const o = Date.now(), l = (a.programmes || []).find((c)=>Date.parse(c.start) <= o && o < Date.parse(c.stop));
            l && (k("heroProg").textContent = `Now: ${l.title}`);
        }).catch(()=>{});
    }
    function Js() {
        const n = Ve.filter((r)=>!Ze(r));
        if (kh.hidden = n.length > 0, mt.innerHTML = "", !n.length) {
            Xi.hidden = !0;
            return;
        }
        zh(n);
        const e = 24, t = (r)=>{
            r && mt.appendChild(r);
        }, s = it.map(An).filter((r)=>!!r).filter((r)=>!Ze(r));
        t(Ut("Continue watching", null, s.slice(0, e)));
        const i = n.filter((r)=>ne.has(Je(r)));
        t(Ut("Your favorites", null, i.slice(0, e))), t(Ut("Recommended for you", "Based on what you watch", jh(e)));
        for (const r of qh){
            const a = n.filter((o)=>r.re.test(o.group || "") || r.re.test(o.name || ""));
            a.length >= 4 && t(Ut(r.title, `${a.length.toLocaleString()} channels`, a.slice(0, e)));
        }
        [
            ...lt.entries()
        ].sort((r, a)=>a[1] - r[1]).slice(0, 14).forEach(([r])=>{
            const a = n.filter((o)=>(o.group || "Uncategorized") === r);
            t(Ut(r, `${a.length.toLocaleString()} channels`, a.slice(0, e)));
        });
    }
    let Zi = {
        r: 0,
        c: 0
    };
    function Xh(n, e) {
        const t = mt.querySelectorAll(".rail-track")[n];
        return t && t.querySelectorAll(".lib-card")[e] || null;
    }
    function $r(n, e) {
        const t = mt.querySelectorAll(".rail-track");
        if (!t.length) return;
        n = Math.max(0, Math.min(t.length - 1, n));
        const s = t[n].querySelectorAll(".lib-card").length;
        if (!s) return;
        e = Math.max(0, Math.min(s - 1, e)), mt.querySelectorAll(".lib-card.is-focused").forEach((r)=>r.classList.remove("is-focused"));
        const i = Xh(n, e);
        i && (i.classList.add("is-focused"), Zi = {
            r: n,
            c: e
        }, i.scrollIntoView({
            block: "nearest",
            inline: "center",
            behavior: "smooth"
        }));
    }
    function Qh(n) {
        const e = {
            ArrowRight: [
                0,
                1
            ],
            ArrowLeft: [
                0,
                -1
            ],
            ArrowDown: [
                1,
                0
            ],
            ArrowUp: [
                -1,
                0
            ]
        };
        if (n.key in e) {
            if (n.preventDefault(), !mt.querySelector(".lib-card.is-focused")) {
                $r(0, 0);
                return;
            }
            const [s, i] = e[n.key];
            $r(Zi.r + s, Zi.c + i);
        } else if (n.key === "Enter") {
            const t = mt.querySelector(".lib-card.is-focused");
            t && (n.preventDefault(), t.click());
        }
    }
    k("heroPlay").addEventListener("click", ()=>{
        Pt && Zt(Pt);
    });
    k("heroFav").addEventListener("click", ()=>{
        if (!Pt) return;
        const n = Je(Pt);
        ne.has(n) ? ne.delete(n) : ne.add(n), vn(), k("heroFav").textContent = ne.has(n) ? "★ Favorited" : "☆ Favorite", Js();
    });
    zs("idle");
    [
        "home",
        "console",
        "library"
    ].includes(ve) || (ve = "home");
    Ft(ve);
    Qi();
    qs();
})();
