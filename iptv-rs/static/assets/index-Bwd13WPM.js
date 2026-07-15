(async ()=>{
    (function() {
        const e = document.createElement("link").relList;
        if (e && e.supports && e.supports("modulepreload")) return;
        for (const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);
        new MutationObserver((i)=>{
            for (const n of i)if (n.type === "childList") for (const a of n.addedNodes)a.tagName === "LINK" && a.rel === "modulepreload" && s(a);
        }).observe(document, {
            childList: !0,
            subtree: !0
        });
        function t(i) {
            const n = {};
            return i.integrity && (n.integrity = i.integrity), i.referrerPolicy && (n.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? n.credentials = "include" : i.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n;
        }
        function s(i) {
            if (i.ep) return;
            i.ep = !0;
            const n = t(i);
            fetch(i.href, n);
        }
    })();
    function Za(r) {
        return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
    }
    var Cr = {
        exports: {}
    };
    (function(r, e) {
        (function(t) {
            var s = /^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/, i = /^(?=([^\/?#]*))\1([^]*)$/, n = /(?:\/|^)\.(?=\/)/g, a = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g, o = {
                buildAbsoluteURL: function(l, c, h) {
                    if (h = h || {}, l = l.trim(), c = c.trim(), !c) {
                        if (!h.alwaysNormalize) return l;
                        var u = o.parseURL(l);
                        if (!u) throw new Error("Error trying to parse base URL.");
                        return u.path = o.normalizePath(u.path), o.buildURLFromParts(u);
                    }
                    var d = o.parseURL(c);
                    if (!d) throw new Error("Error trying to parse relative URL.");
                    if (d.scheme) return h.alwaysNormalize ? (d.path = o.normalizePath(d.path), o.buildURLFromParts(d)) : c;
                    var f = o.parseURL(l);
                    if (!f) throw new Error("Error trying to parse base URL.");
                    if (!f.netLoc && f.path && f.path[0] !== "/") {
                        var g = i.exec(f.path);
                        f.netLoc = g[1], f.path = g[2];
                    }
                    f.netLoc && !f.path && (f.path = "/");
                    var m = {
                        scheme: f.scheme,
                        netLoc: d.netLoc,
                        path: null,
                        params: d.params,
                        query: d.query,
                        fragment: d.fragment
                    };
                    if (!d.netLoc && (m.netLoc = f.netLoc, d.path[0] !== "/")) if (!d.path) m.path = f.path, d.params || (m.params = f.params, d.query || (m.query = f.query));
                    else {
                        var y = f.path, E = y.substring(0, y.lastIndexOf("/") + 1) + d.path;
                        m.path = o.normalizePath(E);
                    }
                    return m.path === null && (m.path = h.alwaysNormalize ? o.normalizePath(d.path) : d.path), o.buildURLFromParts(m);
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
                    for(l = l.split("").reverse().join("").replace(n, ""); l.length !== (l = l.replace(a, "")).length;);
                    return l.split("").reverse().join("");
                },
                buildURLFromParts: function(l) {
                    return l.scheme + l.netLoc + l.path + l.params + l.query + l.fragment;
                }
            };
            r.exports = o;
        })();
    })(Cr);
    var Wi = Cr.exports;
    function mn(r, e) {
        var t = Object.keys(r);
        if (Object.getOwnPropertySymbols) {
            var s = Object.getOwnPropertySymbols(r);
            e && (s = s.filter(function(i) {
                return Object.getOwnPropertyDescriptor(r, i).enumerable;
            })), t.push.apply(t, s);
        }
        return t;
    }
    function he(r) {
        for(var e = 1; e < arguments.length; e++){
            var t = arguments[e] != null ? arguments[e] : {};
            e % 2 ? mn(Object(t), !0).forEach(function(s) {
                so(r, s, t[s]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t)) : mn(Object(t)).forEach(function(s) {
                Object.defineProperty(r, s, Object.getOwnPropertyDescriptor(t, s));
            });
        }
        return r;
    }
    function eo(r, e) {
        if (typeof r != "object" || !r) return r;
        var t = r[Symbol.toPrimitive];
        if (t !== void 0) {
            var s = t.call(r, e);
            if (typeof s != "object") return s;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (e === "string" ? String : Number)(r);
    }
    function to(r) {
        var e = eo(r, "string");
        return typeof e == "symbol" ? e : String(e);
    }
    function so(r, e, t) {
        return e = to(e), e in r ? Object.defineProperty(r, e, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : r[e] = t, r;
    }
    function ne() {
        return ne = Object.assign ? Object.assign.bind() : function(r) {
            for(var e = 1; e < arguments.length; e++){
                var t = arguments[e];
                for(var s in t)Object.prototype.hasOwnProperty.call(t, s) && (r[s] = t[s]);
            }
            return r;
        }, ne.apply(this, arguments);
    }
    const M = Number.isFinite || function(r) {
        return typeof r == "number" && isFinite(r);
    }, io = Number.isSafeInteger || function(r) {
        return typeof r == "number" && Math.abs(r) <= no;
    }, no = Number.MAX_SAFE_INTEGER || 9007199254740991;
    let p = function(r) {
        return r.MEDIA_ATTACHING = "hlsMediaAttaching", r.MEDIA_ATTACHED = "hlsMediaAttached", r.MEDIA_DETACHING = "hlsMediaDetaching", r.MEDIA_DETACHED = "hlsMediaDetached", r.BUFFER_RESET = "hlsBufferReset", r.BUFFER_CODECS = "hlsBufferCodecs", r.BUFFER_CREATED = "hlsBufferCreated", r.BUFFER_APPENDING = "hlsBufferAppending", r.BUFFER_APPENDED = "hlsBufferAppended", r.BUFFER_EOS = "hlsBufferEos", r.BUFFER_FLUSHING = "hlsBufferFlushing", r.BUFFER_FLUSHED = "hlsBufferFlushed", r.MANIFEST_LOADING = "hlsManifestLoading", r.MANIFEST_LOADED = "hlsManifestLoaded", r.MANIFEST_PARSED = "hlsManifestParsed", r.LEVEL_SWITCHING = "hlsLevelSwitching", r.LEVEL_SWITCHED = "hlsLevelSwitched", r.LEVEL_LOADING = "hlsLevelLoading", r.LEVEL_LOADED = "hlsLevelLoaded", r.LEVEL_UPDATED = "hlsLevelUpdated", r.LEVEL_PTS_UPDATED = "hlsLevelPtsUpdated", r.LEVELS_UPDATED = "hlsLevelsUpdated", r.AUDIO_TRACKS_UPDATED = "hlsAudioTracksUpdated", r.AUDIO_TRACK_SWITCHING = "hlsAudioTrackSwitching", r.AUDIO_TRACK_SWITCHED = "hlsAudioTrackSwitched", r.AUDIO_TRACK_LOADING = "hlsAudioTrackLoading", r.AUDIO_TRACK_LOADED = "hlsAudioTrackLoaded", r.SUBTITLE_TRACKS_UPDATED = "hlsSubtitleTracksUpdated", r.SUBTITLE_TRACKS_CLEARED = "hlsSubtitleTracksCleared", r.SUBTITLE_TRACK_SWITCH = "hlsSubtitleTrackSwitch", r.SUBTITLE_TRACK_LOADING = "hlsSubtitleTrackLoading", r.SUBTITLE_TRACK_LOADED = "hlsSubtitleTrackLoaded", r.SUBTITLE_FRAG_PROCESSED = "hlsSubtitleFragProcessed", r.CUES_PARSED = "hlsCuesParsed", r.NON_NATIVE_TEXT_TRACKS_FOUND = "hlsNonNativeTextTracksFound", r.INIT_PTS_FOUND = "hlsInitPtsFound", r.FRAG_LOADING = "hlsFragLoading", r.FRAG_LOAD_EMERGENCY_ABORTED = "hlsFragLoadEmergencyAborted", r.FRAG_LOADED = "hlsFragLoaded", r.FRAG_DECRYPTED = "hlsFragDecrypted", r.FRAG_PARSING_INIT_SEGMENT = "hlsFragParsingInitSegment", r.FRAG_PARSING_USERDATA = "hlsFragParsingUserdata", r.FRAG_PARSING_METADATA = "hlsFragParsingMetadata", r.FRAG_PARSED = "hlsFragParsed", r.FRAG_BUFFERED = "hlsFragBuffered", r.FRAG_CHANGED = "hlsFragChanged", r.FPS_DROP = "hlsFpsDrop", r.FPS_DROP_LEVEL_CAPPING = "hlsFpsDropLevelCapping", r.MAX_AUTO_LEVEL_UPDATED = "hlsMaxAutoLevelUpdated", r.ERROR = "hlsError", r.DESTROYING = "hlsDestroying", r.KEY_LOADING = "hlsKeyLoading", r.KEY_LOADED = "hlsKeyLoaded", r.LIVE_BACK_BUFFER_REACHED = "hlsLiveBackBufferReached", r.BACK_BUFFER_REACHED = "hlsBackBufferReached", r.STEERING_MANIFEST_LOADED = "hlsSteeringManifestLoaded", r;
    }({}), G = function(r) {
        return r.NETWORK_ERROR = "networkError", r.MEDIA_ERROR = "mediaError", r.KEY_SYSTEM_ERROR = "keySystemError", r.MUX_ERROR = "muxError", r.OTHER_ERROR = "otherError", r;
    }({}), A = function(r) {
        return r.KEY_SYSTEM_NO_KEYS = "keySystemNoKeys", r.KEY_SYSTEM_NO_ACCESS = "keySystemNoAccess", r.KEY_SYSTEM_NO_SESSION = "keySystemNoSession", r.KEY_SYSTEM_NO_CONFIGURED_LICENSE = "keySystemNoConfiguredLicense", r.KEY_SYSTEM_LICENSE_REQUEST_FAILED = "keySystemLicenseRequestFailed", r.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED = "keySystemServerCertificateRequestFailed", r.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED = "keySystemServerCertificateUpdateFailed", r.KEY_SYSTEM_SESSION_UPDATE_FAILED = "keySystemSessionUpdateFailed", r.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED = "keySystemStatusOutputRestricted", r.KEY_SYSTEM_STATUS_INTERNAL_ERROR = "keySystemStatusInternalError", r.MANIFEST_LOAD_ERROR = "manifestLoadError", r.MANIFEST_LOAD_TIMEOUT = "manifestLoadTimeOut", r.MANIFEST_PARSING_ERROR = "manifestParsingError", r.MANIFEST_INCOMPATIBLE_CODECS_ERROR = "manifestIncompatibleCodecsError", r.LEVEL_EMPTY_ERROR = "levelEmptyError", r.LEVEL_LOAD_ERROR = "levelLoadError", r.LEVEL_LOAD_TIMEOUT = "levelLoadTimeOut", r.LEVEL_PARSING_ERROR = "levelParsingError", r.LEVEL_SWITCH_ERROR = "levelSwitchError", r.AUDIO_TRACK_LOAD_ERROR = "audioTrackLoadError", r.AUDIO_TRACK_LOAD_TIMEOUT = "audioTrackLoadTimeOut", r.SUBTITLE_LOAD_ERROR = "subtitleTrackLoadError", r.SUBTITLE_TRACK_LOAD_TIMEOUT = "subtitleTrackLoadTimeOut", r.FRAG_LOAD_ERROR = "fragLoadError", r.FRAG_LOAD_TIMEOUT = "fragLoadTimeOut", r.FRAG_DECRYPT_ERROR = "fragDecryptError", r.FRAG_PARSING_ERROR = "fragParsingError", r.FRAG_GAP = "fragGap", r.REMUX_ALLOC_ERROR = "remuxAllocError", r.KEY_LOAD_ERROR = "keyLoadError", r.KEY_LOAD_TIMEOUT = "keyLoadTimeOut", r.BUFFER_ADD_CODEC_ERROR = "bufferAddCodecError", r.BUFFER_INCOMPATIBLE_CODECS_ERROR = "bufferIncompatibleCodecsError", r.BUFFER_APPEND_ERROR = "bufferAppendError", r.BUFFER_APPENDING_ERROR = "bufferAppendingError", r.BUFFER_STALLED_ERROR = "bufferStalledError", r.BUFFER_FULL_ERROR = "bufferFullError", r.BUFFER_SEEK_OVER_HOLE = "bufferSeekOverHole", r.BUFFER_NUDGE_ON_STALL = "bufferNudgeOnStall", r.INTERNAL_EXCEPTION = "internalException", r.INTERNAL_ABORTED = "aborted", r.UNKNOWN = "unknown", r;
    }({});
    const nt = function() {}, Ai = {
        trace: nt,
        debug: nt,
        log: nt,
        warn: nt,
        info: nt,
        error: nt
    };
    let Nt = Ai;
    function ro(r) {
        const e = self.console[r];
        return e ? e.bind(self.console, `[${r}] >`) : nt;
    }
    function ao(r, ...e) {
        e.forEach(function(t) {
            Nt[t] = r[t] ? r[t].bind(r) : ro(t);
        });
    }
    function oo(r, e) {
        if (typeof console == "object" && r === !0 || typeof r == "object") {
            ao(r, "debug", "log", "info", "warn", "error");
            try {
                Nt.log(`Debug logs enabled for "${e}" in hls.js version 1.5.13`);
            } catch  {
                Nt = Ai;
            }
        } else Nt = Ai;
    }
    const v = Nt, lo = /^(\d+)x(\d+)$/, pn = /(.+?)=(".*?"|.*?)(?:,|$)/g;
    class te {
        constructor(e){
            typeof e == "string" && (e = te.parseAttrList(e)), ne(this, e);
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
            const t = lo.exec(this[e]);
            if (t !== null) return {
                width: parseInt(t[1], 10),
                height: parseInt(t[2], 10)
            };
        }
        static parseAttrList(e) {
            let t;
            const s = {}, i = '"';
            for(pn.lastIndex = 0; (t = pn.exec(e)) !== null;){
                let n = t[2];
                n.indexOf(i) === 0 && n.lastIndexOf(i) === n.length - 1 && (n = n.slice(1, -1));
                const a = t[1].trim();
                s[a] = n;
            }
            return s;
        }
    }
    function co(r) {
        return r !== "ID" && r !== "CLASS" && r !== "START-DATE" && r !== "DURATION" && r !== "END-DATE" && r !== "END-ON-NEXT";
    }
    function ho(r) {
        return r === "SCTE35-OUT" || r === "SCTE35-IN";
    }
    class _r {
        constructor(e, t){
            if (this.attr = void 0, this._startDate = void 0, this._endDate = void 0, this._badValueForSameId = void 0, t) {
                const s = t.attr;
                for(const i in s)if (Object.prototype.hasOwnProperty.call(e, i) && e[i] !== s[i]) {
                    v.warn(`DATERANGE tag attribute: "${i}" does not match for tags with ID: "${e.ID}"`), this._badValueForSameId = i;
                    break;
                }
                e = ne(new te({}), s, e);
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
    class Us {
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
    class wr {
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
            return !this._url && this.baseurl && this.relurl && (this._url = Wi.buildAbsoluteURL(this.baseurl, this.relurl, {
                alwaysNormalize: !0
            })), this._url || "";
        }
        set url(e) {
            this._url = e;
        }
    }
    class qs extends wr {
        constructor(e, t){
            super(t), this._decryptdata = null, this.rawProgramDateTime = null, this.programDateTime = null, this.tagList = [], this.duration = 0, this.sn = 0, this.levelkeys = void 0, this.type = void 0, this.loader = null, this.keyLoader = null, this.level = -1, this.cc = 0, this.startPTS = void 0, this.endPTS = void 0, this.startDTS = void 0, this.endDTS = void 0, this.start = 0, this.deltaPTS = void 0, this.maxStartPTS = void 0, this.minEndPTS = void 0, this.stats = new Us, this.data = void 0, this.bitrateTest = !1, this.title = null, this.initSegment = null, this.endList = void 0, this.gap = void 0, this.urlId = 0, this.type = e;
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
        setElementaryStreamInfo(e, t, s, i, n, a = !1) {
            const { elementaryStreams: o } = this, l = o[e];
            if (!l) {
                o[e] = {
                    startPTS: t,
                    endPTS: s,
                    startDTS: i,
                    endDTS: n,
                    partial: a
                };
                return;
            }
            l.startPTS = Math.min(l.startPTS, t), l.endPTS = Math.max(l.endPTS, s), l.startDTS = Math.min(l.startDTS, i), l.endDTS = Math.max(l.endDTS, n);
        }
        clearElementaryStreamInfo() {
            const { elementaryStreams: e } = this;
            e[Q.AUDIO] = null, e[Q.VIDEO] = null, e[Q.AUDIOVIDEO] = null;
        }
    }
    class uo extends wr {
        constructor(e, t, s, i, n){
            super(s), this.fragOffset = 0, this.duration = 0, this.gap = !1, this.independent = !1, this.relurl = void 0, this.fragment = void 0, this.index = void 0, this.stats = new Us, this.duration = e.decimalFloatingPoint("DURATION"), this.gap = e.bool("GAP"), this.independent = e.bool("INDEPENDENT"), this.relurl = e.enumeratedString("URI"), this.fragment = t, this.index = i;
            const a = e.enumeratedString("BYTERANGE");
            a && this.setByteRange(a, n), n && (this.fragOffset = n.fragOffset + n.duration);
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
    const fo = 10;
    class go {
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
            return this.averagetargetduration || this.targetduration || fo;
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
    function Yi(r) {
        return Uint8Array.from(atob(r), (e)=>e.charCodeAt(0));
    }
    function mo(r) {
        const e = Ri(r).subarray(0, 16), t = new Uint8Array(16);
        return t.set(e, 16 - e.length), t;
    }
    function po(r) {
        const e = function(s, i, n) {
            const a = s[i];
            s[i] = s[n], s[n] = a;
        };
        e(r, 0, 3), e(r, 1, 2), e(r, 4, 5), e(r, 6, 7);
    }
    function yo(r) {
        const e = r.split(":");
        let t = null;
        if (e[0] === "data" && e.length === 2) {
            const s = e[1].split(";"), i = s[s.length - 1].split(",");
            if (i.length === 2) {
                const n = i[0] === "base64", a = i[1];
                n ? (s.splice(-1, 1), t = Yi(a)) : t = mo(a);
            }
        }
        return t;
    }
    function Ri(r) {
        return Uint8Array.from(unescape(encodeURIComponent(r)), (e)=>e.charCodeAt(0));
    }
    const Rt = typeof self < "u" ? self : void 0;
    var ee = {
        CLEARKEY: "org.w3.clearkey",
        FAIRPLAY: "com.apple.fps",
        PLAYREADY: "com.microsoft.playready",
        WIDEVINE: "com.widevine.alpha"
    }, ye = {
        CLEARKEY: "org.w3.clearkey",
        FAIRPLAY: "com.apple.streamingkeydelivery",
        PLAYREADY: "com.microsoft.playready",
        WIDEVINE: "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"
    };
    function yn(r) {
        switch(r){
            case ye.FAIRPLAY:
                return ee.FAIRPLAY;
            case ye.PLAYREADY:
                return ee.PLAYREADY;
            case ye.WIDEVINE:
                return ee.WIDEVINE;
            case ye.CLEARKEY:
                return ee.CLEARKEY;
        }
    }
    var kr = {
        WIDEVINE: "edef8ba979d64acea3c827dcd51d21ed"
    };
    function Eo(r) {
        if (r === kr.WIDEVINE) return ee.WIDEVINE;
    }
    function En(r) {
        switch(r){
            case ee.FAIRPLAY:
                return ye.FAIRPLAY;
            case ee.PLAYREADY:
                return ye.PLAYREADY;
            case ee.WIDEVINE:
                return ye.WIDEVINE;
            case ee.CLEARKEY:
                return ye.CLEARKEY;
        }
    }
    function js(r) {
        const { drmSystems: e, widevineLicenseUrl: t } = r, s = e ? [
            ee.FAIRPLAY,
            ee.WIDEVINE,
            ee.PLAYREADY,
            ee.CLEARKEY
        ].filter((i)=>!!e[i]) : [];
        return !s[ee.WIDEVINE] && t && s.push(ee.WIDEVINE), s;
    }
    const Pr = function(r) {
        return Rt != null && (r = Rt.navigator) != null && r.requestMediaKeySystemAccess ? self.navigator.requestMediaKeySystemAccess.bind(self.navigator) : null;
    }();
    function To(r, e, t, s) {
        let i;
        switch(r){
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
                throw new Error(`Unknown key-system: ${r}`);
        }
        return xo(i, e, t, s);
    }
    function xo(r, e, t, s) {
        return [
            {
                initDataTypes: r,
                persistentState: s.persistentState || "optional",
                distinctiveIdentifier: s.distinctiveIdentifier || "optional",
                sessionTypes: s.sessionTypes || [
                    s.sessionType || "temporary"
                ],
                audioCapabilities: e.map((n)=>({
                        contentType: `audio/mp4; codecs="${n}"`,
                        robustness: s.audioRobustness || "",
                        encryptionScheme: s.audioEncryptionScheme || null
                    })),
                videoCapabilities: t.map((n)=>({
                        contentType: `video/mp4; codecs="${n}"`,
                        robustness: s.videoRobustness || "",
                        encryptionScheme: s.videoEncryptionScheme || null
                    }))
            }
        ];
    }
    function ct(r, e, t) {
        return Uint8Array.prototype.slice ? r.slice(e, t) : new Uint8Array(Array.prototype.slice.call(r, e, t));
    }
    const qi = (r, e)=>e + 10 <= r.length && r[e] === 73 && r[e + 1] === 68 && r[e + 2] === 51 && r[e + 3] < 255 && r[e + 4] < 255 && r[e + 6] < 128 && r[e + 7] < 128 && r[e + 8] < 128 && r[e + 9] < 128, Fr = (r, e)=>e + 10 <= r.length && r[e] === 51 && r[e + 1] === 68 && r[e + 2] === 73 && r[e + 3] < 255 && r[e + 4] < 255 && r[e + 6] < 128 && r[e + 7] < 128 && r[e + 8] < 128 && r[e + 9] < 128, Vt = (r, e)=>{
        const t = e;
        let s = 0;
        for(; qi(r, e);){
            s += 10;
            const i = Bs(r, e + 6);
            s += i, Fr(r, e + 10) && (s += 10), e += s;
        }
        if (s > 0) return r.subarray(t, t + s);
    }, Bs = (r, e)=>{
        let t = 0;
        return t = (r[e] & 127) << 21, t |= (r[e + 1] & 127) << 14, t |= (r[e + 2] & 127) << 7, t |= r[e + 3] & 127, t;
    }, So = (r, e)=>qi(r, e) && Bs(r, e + 6) + 10 <= r.length - e, ji = (r)=>{
        const e = Mr(r);
        for(let t = 0; t < e.length; t++){
            const s = e[t];
            if (Or(s)) return Io(s);
        }
    }, Or = (r)=>r && r.key === "PRIV" && r.info === "com.apple.streaming.transportStreamTimestamp", vo = (r)=>{
        const e = String.fromCharCode(r[0], r[1], r[2], r[3]), t = Bs(r, 4), s = 10;
        return {
            type: e,
            size: t,
            data: r.subarray(s, s + t)
        };
    }, Mr = (r)=>{
        let e = 0;
        const t = [];
        for(; qi(r, e);){
            const s = Bs(r, e + 6);
            e += 10;
            const i = e + s;
            for(; e + 8 < i;){
                const n = vo(r.subarray(e)), a = Lo(n);
                a && t.push(a), e += n.size + 10;
            }
            Fr(r, e) && (e += 10);
        }
        return t;
    }, Lo = (r)=>r.type === "PRIV" ? Ao(r) : r.type[0] === "W" ? bo(r) : Ro(r), Ao = (r)=>{
        if (r.size < 2) return;
        const e = Ge(r.data, !0), t = new Uint8Array(r.data.subarray(e.length + 1));
        return {
            key: r.type,
            info: e,
            data: t.buffer
        };
    }, Ro = (r)=>{
        if (r.size < 2) return;
        if (r.type === "TXXX") {
            let t = 1;
            const s = Ge(r.data.subarray(t), !0);
            t += s.length + 1;
            const i = Ge(r.data.subarray(t));
            return {
                key: r.type,
                info: s,
                data: i
            };
        }
        const e = Ge(r.data.subarray(1));
        return {
            key: r.type,
            data: e
        };
    }, bo = (r)=>{
        if (r.type === "WXXX") {
            if (r.size < 2) return;
            let t = 1;
            const s = Ge(r.data.subarray(t), !0);
            t += s.length + 1;
            const i = Ge(r.data.subarray(t));
            return {
                key: r.type,
                info: s,
                data: i
            };
        }
        const e = Ge(r.data);
        return {
            key: r.type,
            data: e
        };
    }, Io = (r)=>{
        if (r.data.byteLength === 8) {
            const e = new Uint8Array(r.data), t = e[3] & 1;
            let s = (e[4] << 23) + (e[5] << 15) + (e[6] << 7) + e[7];
            return s /= 45, t && (s += 4772185884e-2), Math.round(s);
        }
    }, Ge = (r, e = !1)=>{
        const t = Do();
        if (t) {
            const c = t.decode(r);
            if (e) {
                const h = c.indexOf("\0");
                return h !== -1 ? c.substring(0, h) : c;
            }
            return c.replace(/\0/g, "");
        }
        const s = r.length;
        let i, n, a, o = "", l = 0;
        for(; l < s;){
            if (i = r[l++], i === 0 && e) return o;
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
                    n = r[l++], o += String.fromCharCode((i & 31) << 6 | n & 63);
                    break;
                case 14:
                    n = r[l++], a = r[l++], o += String.fromCharCode((i & 15) << 12 | (n & 63) << 6 | (a & 63) << 0);
                    break;
            }
        }
        return o;
    };
    let zs;
    function Do() {
        if (!navigator.userAgent.includes("PlayStation 4")) return !zs && typeof self.TextDecoder < "u" && (zs = new self.TextDecoder("utf-8")), zs;
    }
    const Ne = {
        hexDump: function(r) {
            let e = "";
            for(let t = 0; t < r.length; t++){
                let s = r[t].toString(16);
                s.length < 2 && (s = "0" + s), e += s;
            }
            return e;
        }
    }, vs = Math.pow(2, 32) - 1, Co = [].push, Nr = {
        video: 1,
        audio: 2,
        id3: 3,
        text: 4
    };
    function re(r) {
        return String.fromCharCode.apply(null, r);
    }
    function Ur(r, e) {
        const t = r[e] << 8 | r[e + 1];
        return t < 0 ? 65536 + t : t;
    }
    function U(r, e) {
        const t = Br(r, e);
        return t < 0 ? 4294967296 + t : t;
    }
    function Tn(r, e) {
        let t = U(r, e);
        return t *= Math.pow(2, 32), t += U(r, e + 4), t;
    }
    function Br(r, e) {
        return r[e] << 24 | r[e + 1] << 16 | r[e + 2] << 8 | r[e + 3];
    }
    function Xs(r, e, t) {
        r[e] = t >> 24, r[e + 1] = t >> 16 & 255, r[e + 2] = t >> 8 & 255, r[e + 3] = t & 255;
    }
    function _o(r) {
        const e = r.byteLength;
        for(let t = 0; t < e;){
            const s = U(r, t);
            if (s > 8 && r[t + 4] === 109 && r[t + 5] === 111 && r[t + 6] === 111 && r[t + 7] === 102) return !0;
            t = s > 1 ? t + s : e;
        }
        return !1;
    }
    function W(r, e) {
        const t = [];
        if (!e.length) return t;
        const s = r.byteLength;
        for(let i = 0; i < s;){
            const n = U(r, i), a = re(r.subarray(i + 4, i + 8)), o = n > 1 ? i + n : s;
            if (a === e[0]) if (e.length === 1) t.push(r.subarray(i + 8, o));
            else {
                const l = W(r.subarray(i + 8, o), e.slice(1));
                l.length && Co.apply(t, l);
            }
            i = o;
        }
        return t;
    }
    function wo(r) {
        const e = [], t = r[0];
        let s = 8;
        const i = U(r, s);
        s += 4;
        let n = 0, a = 0;
        t === 0 ? (n = U(r, s), a = U(r, s + 4), s += 8) : (n = Tn(r, s), a = Tn(r, s + 8), s += 16), s += 2;
        let o = r.length + a;
        const l = Ur(r, s);
        s += 2;
        for(let c = 0; c < l; c++){
            let h = s;
            const u = U(r, h);
            h += 4;
            const d = u & 2147483647;
            if ((u & 2147483648) >>> 31 === 1) return v.warn("SIDX has hierarchical references (not supported)"), null;
            const g = U(r, h);
            h += 4, e.push({
                referenceSize: d,
                subsegmentDuration: g,
                info: {
                    duration: g / i,
                    start: o,
                    end: o + d - 1
                }
            }), o += d, h += 4, s = h;
        }
        return {
            earliestPresentationTime: n,
            timescale: i,
            version: t,
            referencesCount: l,
            references: e
        };
    }
    function $r(r) {
        const e = [], t = W(r, [
            "moov",
            "trak"
        ]);
        for(let i = 0; i < t.length; i++){
            const n = t[i], a = W(n, [
                "tkhd"
            ])[0];
            if (a) {
                let o = a[0];
                const l = U(a, o === 0 ? 12 : 20), c = W(n, [
                    "mdia",
                    "mdhd"
                ])[0];
                if (c) {
                    o = c[0];
                    const h = U(c, o === 0 ? 12 : 20), u = W(n, [
                        "mdia",
                        "hdlr"
                    ])[0];
                    if (u) {
                        const d = re(u.subarray(8, 12)), f = {
                            soun: Q.AUDIO,
                            vide: Q.VIDEO
                        }[d];
                        if (f) {
                            const g = W(n, [
                                "mdia",
                                "minf",
                                "stbl",
                                "stsd"
                            ])[0], m = ko(g);
                            e[l] = {
                                timescale: h,
                                type: f
                            }, e[f] = he({
                                timescale: h,
                                id: l
                            }, m);
                        }
                    }
                }
            }
        }
        return W(r, [
            "moov",
            "mvex",
            "trex"
        ]).forEach((i)=>{
            const n = U(i, 4), a = e[n];
            a && (a.default = {
                duration: U(i, 12),
                flags: U(i, 20)
            });
        }), e;
    }
    function ko(r) {
        const e = r.subarray(8), t = e.subarray(86), s = re(e.subarray(4, 8));
        let i = s;
        const n = s === "enca" || s === "encv";
        if (n) {
            const o = W(e, [
                s
            ])[0].subarray(s === "enca" ? 28 : 78);
            W(o, [
                "sinf"
            ]).forEach((c)=>{
                const h = W(c, [
                    "schm"
                ])[0];
                if (h) {
                    const u = re(h.subarray(4, 8));
                    if (u === "cbcs" || u === "cenc") {
                        const d = W(c, [
                            "frma"
                        ])[0];
                        d && (i = re(d));
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
                    i += "." + zt(a[1]) + zt(a[2]) + zt(a[3]);
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
                        l = Qs(o, l), l += 2;
                        const c = o[l++];
                        if (c & 128 && (l += 2), c & 64 && (l += o[l++]), o[l++] !== 4) break;
                        l = Qs(o, l);
                        const h = o[l++];
                        if (h === 64) i += "." + zt(h);
                        else break;
                        if (l += 12, o[l++] !== 5) break;
                        l = Qs(o, l);
                        const u = o[l++];
                        let d = (u & 248) >> 3;
                        d === 31 && (d += 1 + ((u & 7) << 3) + ((o[l] & 224) >> 5)), i += "." + d;
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
                    ][o >> 6], c = o & 31, h = U(a, 2), u = (o & 32) >> 5 ? "H" : "L", d = a[12], f = a.subarray(6, 12);
                    i += "." + l + c, i += "." + h.toString(16).toUpperCase(), i += "." + u + d;
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
                    i += "." + Me(o) + "." + Me(l);
                    break;
                }
            case "vp09":
                {
                    const a = W(t, [
                        "vpcC"
                    ])[0], o = a[4], l = a[5], c = a[6] >> 4 & 15;
                    i += "." + Me(o) + "." + Me(l) + "." + Me(c);
                    break;
                }
            case "av01":
                {
                    const a = W(t, [
                        "av1C"
                    ])[0], o = a[1] >>> 5, l = a[1] & 31, c = a[2] >>> 7 ? "H" : "M", h = (a[2] & 64) >> 6, u = (a[2] & 32) >> 5, d = o === 2 && h ? u ? 12 : 10 : h ? 10 : 8, f = (a[2] & 16) >> 4, g = (a[2] & 8) >> 3, m = (a[2] & 4) >> 2, y = a[2] & 3;
                    i += "." + o + "." + Me(l) + c + "." + Me(d) + "." + f + "." + g + m + y + "." + Me(1) + "." + Me(1) + "." + Me(1) + "." + 0;
                    break;
                }
        }
        return {
            codec: i,
            encrypted: n
        };
    }
    function Qs(r, e) {
        const t = e + 5;
        for(; r[e++] & 128 && e < t;);
        return e;
    }
    function zt(r) {
        return ("0" + r.toString(16).toUpperCase()).slice(-2);
    }
    function Me(r) {
        return (r < 10 ? "0" : "") + r;
    }
    function Po(r, e) {
        if (!r || !e) return r;
        const t = e.keyId;
        return t && e.isCommonEncryption && W(r, [
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
                const h = l ? c.subarray(28) : c.subarray(78);
                W(h, [
                    "sinf"
                ]).forEach((d)=>{
                    const f = Gr(d);
                    if (f) {
                        const g = f.subarray(8, 24);
                        g.some((m)=>m !== 0) || (v.log(`[eme] Patching keyId in 'enc${l ? "a" : "v"}>sinf>>tenc' box: ${Ne.hexDump(g)} -> ${Ne.hexDump(t)}`), f.set(t, 8));
                    }
                });
            });
        }), r;
    }
    function Gr(r) {
        const e = W(r, [
            "schm"
        ])[0];
        if (e) {
            const t = re(e.subarray(4, 8));
            if (t === "cbcs" || t === "cenc") return W(r, [
                "schi",
                "tenc"
            ])[0];
        }
        return v.error("[eme] missing 'schm' box"), null;
    }
    function Fo(r, e) {
        return W(e, [
            "moof",
            "traf"
        ]).reduce((t, s)=>{
            const i = W(s, [
                "tfdt"
            ])[0], n = i[0], a = W(s, [
                "tfhd"
            ]).reduce((o, l)=>{
                const c = U(l, 4), h = r[c];
                if (h) {
                    let u = U(i, 4);
                    if (n === 1) {
                        if (u === vs) return v.warn("[mp4-demuxer]: Ignoring assumed invalid signed 64-bit track fragment decode time"), o;
                        u *= vs + 1, u += U(i, 8);
                    }
                    const d = h.timescale || 9e4, f = u / d;
                    if (M(f) && (o === null || f < o)) return f;
                }
                return o;
            }, null);
            return a !== null && M(a) && (t === null || a < t) ? a : t;
        }, null);
    }
    function Oo(r, e) {
        let t = 0, s = 0, i = 0;
        const n = W(r, [
            "moof",
            "traf"
        ]);
        for(let a = 0; a < n.length; a++){
            const o = n[a], l = W(o, [
                "tfhd"
            ])[0], c = U(l, 4), h = e[c];
            if (!h) continue;
            const u = h.default, d = U(l, 0) | u?.flags;
            let f = u?.duration;
            d & 8 && (d & 2 ? f = U(l, 12) : f = U(l, 8));
            const g = h.timescale || 9e4, m = W(o, [
                "trun"
            ]);
            for(let y = 0; y < m.length; y++){
                if (t = Mo(m[y]), !t && f) {
                    const E = U(m[y], 4);
                    t = f * E;
                }
                h.type === Q.VIDEO ? s += t / g : h.type === Q.AUDIO && (i += t / g);
            }
        }
        if (s === 0 && i === 0) {
            let a = 1 / 0, o = 0, l = 0;
            const c = W(r, [
                "sidx"
            ]);
            for(let h = 0; h < c.length; h++){
                const u = wo(c[h]);
                if (u != null && u.references) {
                    a = Math.min(a, u.earliestPresentationTime / u.timescale);
                    const d = u.references.reduce((f, g)=>f + g.info.duration || 0, 0);
                    o = Math.max(o, d + u.earliestPresentationTime / u.timescale), l = o - a;
                }
            }
            if (l && M(l)) return l;
        }
        return s || i;
    }
    function Mo(r) {
        const e = U(r, 0);
        let t = 8;
        e & 1 && (t += 4), e & 4 && (t += 4);
        let s = 0;
        const i = U(r, 4);
        for(let n = 0; n < i; n++){
            if (e & 256) {
                const a = U(r, t);
                s += a, t += 4;
            }
            e & 512 && (t += 4), e & 1024 && (t += 4), e & 2048 && (t += 4);
        }
        return s;
    }
    function No(r, e, t) {
        W(e, [
            "moof",
            "traf"
        ]).forEach((s)=>{
            W(s, [
                "tfhd"
            ]).forEach((i)=>{
                const n = U(i, 4), a = r[n];
                if (!a) return;
                const o = a.timescale || 9e4;
                W(s, [
                    "tfdt"
                ]).forEach((l)=>{
                    const c = l[0], h = t * o;
                    if (h) {
                        let u = U(l, 4);
                        if (c === 0) u -= h, u = Math.max(u, 0), Xs(l, 4, u);
                        else {
                            u *= Math.pow(2, 32), u += U(l, 8), u -= h, u = Math.max(u, 0);
                            const d = Math.floor(u / (vs + 1)), f = Math.floor(u % (vs + 1));
                            Xs(l, 4, d), Xs(l, 8, f);
                        }
                    }
                });
            });
        });
    }
    function Uo(r) {
        const e = {
            valid: null,
            remainder: null
        }, t = W(r, [
            "moof"
        ]);
        if (t.length < 2) return e.remainder = r, e;
        const s = t[t.length - 1];
        return e.valid = ct(r, 0, s.byteOffset - 8), e.remainder = ct(r, s.byteOffset - 8), e;
    }
    function be(r, e) {
        const t = new Uint8Array(r.length + e.length);
        return t.set(r), t.set(e, r.length), t;
    }
    function xn(r, e) {
        const t = [], s = e.samples, i = e.timescale, n = e.id;
        let a = !1;
        return W(s, [
            "moof"
        ]).map((l)=>{
            const c = l.byteOffset - 8;
            W(l, [
                "traf"
            ]).map((u)=>{
                const d = W(u, [
                    "tfdt"
                ]).map((f)=>{
                    const g = f[0];
                    let m = U(f, 4);
                    return g === 1 && (m *= Math.pow(2, 32), m += U(f, 8)), m / i;
                })[0];
                return d !== void 0 && (r = d), W(u, [
                    "tfhd"
                ]).map((f)=>{
                    const g = U(f, 4), m = U(f, 0) & 16777215, y = (m & 1) !== 0, E = (m & 2) !== 0, x = (m & 8) !== 0;
                    let T = 0;
                    const b = (m & 16) !== 0;
                    let S = 0;
                    const D = (m & 32) !== 0;
                    let R = 8;
                    g === n && (y && (R += 8), E && (R += 4), x && (T = U(f, R), R += 4), b && (S = U(f, R), R += 4), D && (R += 4), e.type === "video" && (a = Bo(e.codec)), W(u, [
                        "trun"
                    ]).map((_)=>{
                        const P = _[0], I = U(_, 0) & 16777215, w = (I & 1) !== 0;
                        let V = 0;
                        const F = (I & 4) !== 0, H = (I & 256) !== 0;
                        let K = 0;
                        const $ = (I & 512) !== 0;
                        let j = 0;
                        const J = (I & 1024) !== 0, N = (I & 2048) !== 0;
                        let O = 0;
                        const z = U(_, 4);
                        let Y = 8;
                        w && (V = U(_, Y), Y += 4), F && (Y += 4);
                        let X = V + c;
                        for(let se = 0; se < z; se++){
                            if (H ? (K = U(_, Y), Y += 4) : K = T, $ ? (j = U(_, Y), Y += 4) : j = S, J && (Y += 4), N && (P === 0 ? O = U(_, Y) : O = Br(_, Y), Y += 4), e.type === Q.VIDEO) {
                                let ae = 0;
                                for(; ae < j;){
                                    const ue = U(s, X);
                                    if (X += 4, $o(a, s[X])) {
                                        const xe = s.subarray(X, X + ue);
                                        Kr(xe, a ? 2 : 1, r + O / i, t);
                                    }
                                    X += ue, ae += ue + 4;
                                }
                            }
                            r += K / i;
                        }
                    }));
                });
            });
        }), t;
    }
    function Bo(r) {
        if (!r) return !1;
        const e = r.indexOf("."), t = e < 0 ? r : r.substring(0, e);
        return t === "hvc1" || t === "hev1" || t === "dvh1" || t === "dvhe";
    }
    function $o(r, e) {
        if (r) {
            const t = e >> 1 & 63;
            return t === 39 || t === 40;
        } else return (e & 31) === 6;
    }
    function Kr(r, e, t, s) {
        const i = Hr(r);
        let n = 0;
        n += e;
        let a = 0, o = 0, l = 0;
        for(; n < i.length;){
            a = 0;
            do {
                if (n >= i.length) break;
                l = i[n++], a += l;
            }while (l === 255);
            o = 0;
            do {
                if (n >= i.length) break;
                l = i[n++], o += l;
            }while (l === 255);
            const c = i.length - n;
            let h = n;
            if (o < c) n += o;
            else if (o > c) {
                v.error(`Malformed SEI payload. ${o} is too small, only ${c} bytes left to parse.`);
                break;
            }
            if (a === 4) {
                if (i[h++] === 181) {
                    const d = Ur(i, h);
                    if (h += 2, d === 49) {
                        const f = U(i, h);
                        if (h += 4, f === 1195456820) {
                            const g = i[h++];
                            if (g === 3) {
                                const m = i[h++], y = 31 & m, E = 64 & m, x = E ? 2 + y * 3 : 0, T = new Uint8Array(x);
                                if (E) {
                                    T[0] = m;
                                    for(let b = 1; b < x; b++)T[b] = i[h++];
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
                    const m = i[h++].toString(16);
                    u.push(m.length == 1 ? "0" + m : m), (g === 3 || g === 5 || g === 7 || g === 9) && u.push("-");
                }
                const d = o - 16, f = new Uint8Array(d);
                for(let g = 0; g < d; g++)f[g] = i[h++];
                s.push({
                    payloadType: a,
                    pts: t,
                    uuid: u.join(""),
                    userData: Ge(f),
                    userDataBytes: f
                });
            }
        }
    }
    function Hr(r) {
        const e = r.byteLength, t = [];
        let s = 1;
        for(; s < e - 2;)r[s] === 0 && r[s + 1] === 0 && r[s + 2] === 3 ? (t.push(s + 2), s += 2) : s++;
        if (t.length === 0) return r;
        const i = e - t.length, n = new Uint8Array(i);
        let a = 0;
        for(s = 0; s < i; a++, s++)a === t[0] && (a++, t.shift()), n[s] = r[a];
        return n;
    }
    function Go(r) {
        const e = r[0];
        let t = "", s = "", i = 0, n = 0, a = 0, o = 0, l = 0, c = 0;
        if (e === 0) {
            for(; re(r.subarray(c, c + 1)) !== "\0";)t += re(r.subarray(c, c + 1)), c += 1;
            for(t += re(r.subarray(c, c + 1)), c += 1; re(r.subarray(c, c + 1)) !== "\0";)s += re(r.subarray(c, c + 1)), c += 1;
            s += re(r.subarray(c, c + 1)), c += 1, i = U(r, 12), n = U(r, 16), o = U(r, 20), l = U(r, 24), c = 28;
        } else if (e === 1) {
            c += 4, i = U(r, c), c += 4;
            const u = U(r, c);
            c += 4;
            const d = U(r, c);
            for(c += 4, a = 2 ** 32 * u + d, io(a) || (a = Number.MAX_SAFE_INTEGER, v.warn("Presentation time exceeds safe integer limit and wrapped to max safe integer in parsing emsg box")), o = U(r, c), c += 4, l = U(r, c), c += 4; re(r.subarray(c, c + 1)) !== "\0";)t += re(r.subarray(c, c + 1)), c += 1;
            for(t += re(r.subarray(c, c + 1)), c += 1; re(r.subarray(c, c + 1)) !== "\0";)s += re(r.subarray(c, c + 1)), c += 1;
            s += re(r.subarray(c, c + 1)), c += 1;
        }
        const h = r.subarray(c, r.byteLength);
        return {
            schemeIdUri: t,
            value: s,
            timeScale: i,
            presentationTime: a,
            presentationTimeDelta: n,
            eventDuration: o,
            id: l,
            payload: h
        };
    }
    function Ko(r, ...e) {
        const t = e.length;
        let s = 8, i = t;
        for(; i--;)s += e[i].byteLength;
        const n = new Uint8Array(s);
        for(n[0] = s >> 24 & 255, n[1] = s >> 16 & 255, n[2] = s >> 8 & 255, n[3] = s & 255, n.set(r, 4), i = 0, s = 8; i < t; i++)n.set(e[i], s), s += e[i].byteLength;
        return n;
    }
    function Ho(r, e, t) {
        if (r.byteLength !== 16) throw new RangeError("Invalid system id");
        let s, i;
        s = 0, i = new Uint8Array;
        let n;
        s > 0 ? (n = new Uint8Array(4), e.length > 0 && new DataView(n.buffer).setUint32(0, e.length, !1)) : n = new Uint8Array;
        const a = new Uint8Array(4);
        return t && t.byteLength > 0 && new DataView(a.buffer).setUint32(0, t.byteLength, !1), Ko([
            112,
            115,
            115,
            104
        ], new Uint8Array([
            s,
            0,
            0,
            0
        ]), r, n, i, a, t || new Uint8Array);
    }
    function Vo(r) {
        if (!(r instanceof ArrayBuffer) || r.byteLength < 32) return null;
        const e = {
            version: 0,
            systemId: "",
            kids: null,
            data: null
        }, t = new DataView(r), s = t.getUint32(0);
        if (r.byteLength !== s && s > 44 || t.getUint32(4) !== 1886614376 || (e.version = t.getUint32(8) >>> 24, e.version > 1)) return null;
        e.systemId = Ne.hexDump(new Uint8Array(r, 12, 16));
        const n = t.getUint32(28);
        if (e.version === 0) {
            if (s - 32 < n) return null;
            e.data = new Uint8Array(r, 32, n);
        } else if (e.version === 1) {
            e.kids = [];
            for(let a = 0; a < n; a++)e.kids.push(new Uint8Array(r, 32 + a * 16, 16));
        }
        return e;
    }
    let Xt = {};
    class Wt {
        static clearKeyUriToKeyIdMap() {
            Xt = {};
        }
        constructor(e, t, s, i = [
            1
        ], n = null){
            this.uri = void 0, this.method = void 0, this.keyFormat = void 0, this.keyFormatVersions = void 0, this.encrypted = void 0, this.isCommonEncryption = void 0, this.iv = null, this.key = null, this.keyId = null, this.pssh = null, this.method = e, this.uri = t, this.keyFormat = s, this.keyFormatVersions = i, this.iv = n, this.encrypted = e ? e !== "NONE" : !1, this.isCommonEncryption = this.encrypted && e !== "AES-128";
        }
        isSupported() {
            if (this.method) {
                if (this.method === "AES-128" || this.method === "NONE") return !0;
                if (this.keyFormat === "identity") return this.method === "SAMPLE-AES";
                switch(this.keyFormat){
                    case ye.FAIRPLAY:
                    case ye.WIDEVINE:
                    case ye.PLAYREADY:
                    case ye.CLEARKEY:
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
                typeof e != "number" && (this.method === "AES-128" && !this.iv && v.warn(`missing IV for initialization segment with method="${this.method}" - compliance issue`), e = 0);
                const s = Wo(e);
                return new Wt(this.method, this.uri, "identity", this.keyFormatVersions, s);
            }
            const t = yo(this.uri);
            if (t) switch(this.keyFormat){
                case ye.WIDEVINE:
                    this.pssh = t, t.length >= 22 && (this.keyId = t.subarray(t.length - 22, t.length - 6));
                    break;
                case ye.PLAYREADY:
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
                        this.pssh = Ho(s, null, t);
                        const i = new Uint16Array(t.buffer, t.byteOffset, t.byteLength / 2), n = String.fromCharCode.apply(null, Array.from(i)), a = n.substring(n.indexOf("<"), n.length), c = new DOMParser().parseFromString(a, "text/xml").getElementsByTagName("KID")[0];
                        if (c) {
                            const h = c.childNodes[0] ? c.childNodes[0].nodeValue : c.getAttribute("VALUE");
                            if (h) {
                                const u = Yi(h).subarray(0, 16);
                                po(u), this.keyId = u;
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
                let s = Xt[this.uri];
                if (!s) {
                    const i = Object.keys(Xt).length % Number.MAX_SAFE_INTEGER;
                    s = new Uint8Array(16), new DataView(s.buffer, 12, 4).setUint32(0, i), Xt[this.uri] = s;
                }
                this.keyId = s;
            }
            return this;
        }
    }
    function Wo(r) {
        const e = new Uint8Array(16);
        for(let t = 12; t < 16; t++)e[t] = r >> 8 * (15 - t) & 255;
        return e;
    }
    const Vr = /\{\$([a-zA-Z0-9-_]+)\}/g;
    function Sn(r) {
        return Vr.test(r);
    }
    function me(r, e, t) {
        if (r.variableList !== null || r.hasVariableRefs) for(let s = t.length; s--;){
            const i = t[s], n = e[i];
            n && (e[i] = bi(r, n));
        }
    }
    function bi(r, e) {
        if (r.variableList !== null || r.hasVariableRefs) {
            const t = r.variableList;
            return e.replace(Vr, (s)=>{
                const i = s.substring(2, s.length - 1), n = t?.[i];
                return n === void 0 ? (r.playlistParsingError || (r.playlistParsingError = new Error(`Missing preceding EXT-X-DEFINE tag for Variable Reference: "${i}"`)), s) : n;
            });
        }
        return e;
    }
    function vn(r, e, t) {
        let s = r.variableList;
        s || (r.variableList = s = {});
        let i, n;
        if ("QUERYPARAM" in e) {
            i = e.QUERYPARAM;
            try {
                const a = new self.URL(t).searchParams;
                if (a.has(i)) n = a.get(i);
                else throw new Error(`"${i}" does not match any query parameter in URI: "${t}"`);
            } catch (a) {
                r.playlistParsingError || (r.playlistParsingError = new Error(`EXT-X-DEFINE QUERYPARAM: ${a.message}`));
            }
        } else i = e.NAME, n = e.VALUE;
        i in s ? r.playlistParsingError || (r.playlistParsingError = new Error(`EXT-X-DEFINE duplicate Variable Name declarations: "${i}"`)) : s[i] = n || "";
    }
    function Yo(r, e, t) {
        const s = e.IMPORT;
        if (t && s in t) {
            let i = r.variableList;
            i || (r.variableList = i = {}), i[s] = t[s];
        } else r.playlistParsingError || (r.playlistParsingError = new Error(`EXT-X-DEFINE IMPORT attribute not found in Multivariant Playlist: "${s}"`));
    }
    function ut(r = !0) {
        return typeof self > "u" ? void 0 : (r || !self.MediaSource) && self.ManagedMediaSource || self.MediaSource || self.WebKitMediaSource;
    }
    function qo(r) {
        return typeof self < "u" && r === self.ManagedMediaSource;
    }
    const Ls = {
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
    function jo(r, e) {
        const t = Ls[e];
        return !!t && !!t[r.slice(0, 4)];
    }
    function Js(r, e, t = !0) {
        return !r.split(",").some((s)=>!Wr(s, e, t));
    }
    function Wr(r, e, t = !0) {
        var s;
        const i = ut(t);
        return (s = i?.isTypeSupported(Yt(r, e))) != null ? s : !1;
    }
    function Yt(r, e) {
        return `${e}/mp4;codecs="${r}"`;
    }
    function Ln(r) {
        if (r) {
            const e = r.substring(0, 4);
            return Ls.video[e];
        }
        return 2;
    }
    function As(r) {
        return r.split(",").reduce((e, t)=>{
            const s = Ls.video[t];
            return s ? (s * 2 + e) / (e ? 3 : 2) : (Ls.audio[t] + e) / (e ? 2 : 1);
        }, 0);
    }
    const Zs = {};
    function zo(r, e = !0) {
        if (Zs[r]) return Zs[r];
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
        }[r];
        for(let s = 0; s < t.length; s++)if (Wr(t[s], "audio", e)) return Zs[r] = t[s], t[s];
        return r;
    }
    const Xo = /flac|opus/i;
    function Rs(r, e = !0) {
        return r.replace(Xo, (t)=>zo(t.toLowerCase(), e));
    }
    function An(r, e) {
        return r && r !== "mp4a" ? r : e && e.split(",")[0];
    }
    function Qo(r) {
        const e = r.split(",");
        for(let t = 0; t < e.length; t++){
            const s = e[t].split(".");
            if (s.length > 2) {
                let i = s.shift() + ".";
                i += parseInt(s.shift()).toString(16), i += ("000" + parseInt(s.shift()).toString(16)).slice(-4), e[t] = i;
            }
        }
        return e.join(",");
    }
    const Rn = /#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-(SESSION-DATA|SESSION-KEY|DEFINE|CONTENT-STEERING|START):([^\r\n]*)[\r\n]+/g, bn = /#EXT-X-MEDIA:(.*)/g, Jo = /^#EXT(?:INF|-X-TARGETDURATION):/m, In = new RegExp([
        /#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,
        /(?!#) *(\S[^\r\n]*)/.source,
        /#EXT-X-BYTERANGE:*(.+)/.source,
        /#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,
        /#.*/.source
    ].join("|"), "g"), Zo = new RegExp([
        /#(EXTM3U)/.source,
        /#EXT-X-(DATERANGE|DEFINE|KEY|MAP|PART|PART-INF|PLAYLIST-TYPE|PRELOAD-HINT|RENDITION-REPORT|SERVER-CONTROL|SKIP|START):(.+)/.source,
        /#EXT-X-(BITRATE|DISCONTINUITY-SEQUENCE|MEDIA-SEQUENCE|TARGETDURATION|VERSION): *(\d+)/.source,
        /#EXT-X-(DISCONTINUITY|ENDLIST|GAP|INDEPENDENT-SEGMENTS)/.source,
        /(#)([^:]*):(.*)/.source,
        /(#)(.*)(?:.*)\r?\n?/.source
    ].join("|"));
    class Be {
        static findGroup(e, t) {
            for(let s = 0; s < e.length; s++){
                const i = e[s];
                if (i.id === t) return i;
            }
        }
        static resolve(e, t) {
            return Wi.buildAbsoluteURL(t, e, {
                alwaysNormalize: !0
            });
        }
        static isMediaPlaylist(e) {
            return Jo.test(e);
        }
        static parseMasterPlaylist(e, t) {
            const s = Sn(e), i = {
                contentSteering: null,
                levels: [],
                playlistParsingError: null,
                sessionData: null,
                sessionKeys: null,
                startTimeOffset: null,
                variableList: null,
                hasVariableRefs: s
            }, n = [];
            Rn.lastIndex = 0;
            let a;
            for(; (a = Rn.exec(e)) != null;)if (a[1]) {
                var o;
                const c = new te(a[1]);
                me(i, c, [
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
                const h = bi(i, a[2]), u = {
                    attrs: c,
                    bitrate: c.decimalInteger("BANDWIDTH") || c.decimalInteger("AVERAGE-BANDWIDTH"),
                    name: c.NAME,
                    url: Be.resolve(h, t)
                }, d = c.decimalResolution("RESOLUTION");
                d && (u.width = d.width, u.height = d.height), el(c.CODECS, u), (o = u.unknownCodecs) != null && o.length || n.push(u), i.levels.push(u);
            } else if (a[3]) {
                const c = a[3], h = a[4];
                switch(c){
                    case "SESSION-DATA":
                        {
                            const u = new te(h);
                            me(i, u, [
                                "DATA-ID",
                                "LANGUAGE",
                                "VALUE",
                                "URI"
                            ]);
                            const d = u["DATA-ID"];
                            d && (i.sessionData === null && (i.sessionData = {}), i.sessionData[d] = u);
                            break;
                        }
                    case "SESSION-KEY":
                        {
                            const u = Dn(h, t, i);
                            u.encrypted && u.isSupported() ? (i.sessionKeys === null && (i.sessionKeys = []), i.sessionKeys.push(u)) : v.warn(`[Keys] Ignoring invalid EXT-X-SESSION-KEY tag: "${h}"`);
                            break;
                        }
                    case "DEFINE":
                        {
                            {
                                const u = new te(h);
                                me(i, u, [
                                    "NAME",
                                    "VALUE",
                                    "QUERYPARAM"
                                ]), vn(i, u, t);
                            }
                            break;
                        }
                    case "CONTENT-STEERING":
                        {
                            const u = new te(h);
                            me(i, u, [
                                "SERVER-URI",
                                "PATHWAY-ID"
                            ]), i.contentSteering = {
                                uri: Be.resolve(u["SERVER-URI"], t),
                                pathwayId: u["PATHWAY-ID"] || "."
                            };
                            break;
                        }
                    case "START":
                        {
                            i.startTimeOffset = Cn(h);
                            break;
                        }
                }
            }
            const l = n.length > 0 && n.length < i.levels.length;
            return i.levels = l ? n : i.levels, i.levels.length === 0 && (i.playlistParsingError = new Error("no levels found in manifest")), i;
        }
        static parseMasterPlaylistMedia(e, t, s) {
            let i;
            const n = {}, a = s.levels, o = {
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
            for(bn.lastIndex = 0; (i = bn.exec(e)) !== null;){
                const c = new te(i[1]), h = c.TYPE;
                if (h) {
                    const u = o[h], d = n[h] || [];
                    n[h] = d, me(s, c, [
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
                        type: h,
                        default: c.bool("DEFAULT"),
                        autoselect: c.bool("AUTOSELECT"),
                        forced: c.bool("FORCED"),
                        lang: f,
                        url: c.URI ? Be.resolve(c.URI, t) : ""
                    };
                    if (g && (x.assocLang = g), m && (x.channels = m), y && (x.characteristics = y), E && (x.instreamId = E), u != null && u.length) {
                        const T = Be.findGroup(u, x.groupId) || u[0];
                        _n(x, T, "audioCodec"), _n(x, T, "textCodec");
                    }
                    d.push(x);
                }
            }
            return n;
        }
        static parseLevelPlaylist(e, t, s, i, n, a) {
            const o = new go(t), l = o.fragments;
            let c = null, h = 0, u = 0, d = 0, f = 0, g = null, m = new qs(i, t), y, E, x, T = -1, b = !1, S = null;
            for(In.lastIndex = 0, o.m3u8 = e, o.hasVariableRefs = Sn(e); (y = In.exec(e)) !== null;){
                b && (b = !1, m = new qs(i, t), m.start = d, m.sn = h, m.cc = f, m.level = s, c && (m.initSegment = c, m.rawProgramDateTime = c.rawProgramDateTime, c.rawProgramDateTime = null, S && (m.setByteRange(S), S = null)));
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
                        m.start = d, x && Pn(m, x, o), m.sn = h, m.level = s, m.cc = f, l.push(m);
                        const I = (" " + y[3]).slice(1);
                        m.relurl = bi(o, I), wn(m, g), g = m, d += m.duration, h++, u = 0, b = !0;
                    }
                } else if (y[4]) {
                    const I = (" " + y[4]).slice(1);
                    g ? m.setByteRange(I, g) : m.setByteRange(I);
                } else if (y[5]) m.rawProgramDateTime = (" " + y[5]).slice(1), m.tagList.push([
                    "PROGRAM-DATE-TIME",
                    m.rawProgramDateTime
                ]), T === -1 && (T = l.length);
                else {
                    if (y = y[0].match(Zo), !y) {
                        v.warn("No matches on slow regex match for level playlist!");
                        continue;
                    }
                    for(E = 1; E < y.length && !(typeof y[E] < "u"); E++);
                    const I = (" " + y[E]).slice(1), w = (" " + y[E + 1]).slice(1), V = y[E + 2] ? (" " + y[E + 2]).slice(1) : "";
                    switch(I){
                        case "PLAYLIST-TYPE":
                            o.type = w.toUpperCase();
                            break;
                        case "MEDIA-SEQUENCE":
                            h = o.startSN = parseInt(w);
                            break;
                        case "SKIP":
                            {
                                const F = new te(w);
                                me(o, F, [
                                    "RECENTLY-REMOVED-DATERANGES"
                                ]);
                                const H = F.decimalInteger("SKIPPED-SEGMENTS");
                                if (M(H)) {
                                    o.skippedSegments = H;
                                    for(let $ = H; $--;)l.unshift(null);
                                    h += H;
                                }
                                const K = F.enumeratedString("RECENTLY-REMOVED-DATERANGES");
                                K && (o.recentlyRemovedDateranges = K.split("	"));
                                break;
                            }
                        case "TARGETDURATION":
                            o.targetduration = Math.max(parseInt(w), 1);
                            break;
                        case "VERSION":
                            o.version = parseInt(w);
                            break;
                        case "INDEPENDENT-SEGMENTS":
                        case "EXTM3U":
                            break;
                        case "ENDLIST":
                            o.live = !1;
                            break;
                        case "#":
                            (w || V) && m.tagList.push(V ? [
                                w,
                                V
                            ] : [
                                w
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
                                w
                            ]);
                            break;
                        case "DATERANGE":
                            {
                                const F = new te(w);
                                me(o, F, [
                                    "ID",
                                    "CLASS",
                                    "START-DATE",
                                    "END-DATE",
                                    "SCTE35-CMD",
                                    "SCTE35-OUT",
                                    "SCTE35-IN"
                                ]), me(o, F, F.clientAttrs);
                                const H = new _r(F, o.dateRanges[F.ID]);
                                H.isValid || o.skippedSegments ? o.dateRanges[H.id] = H : v.warn(`Ignoring invalid DATERANGE tag: "${w}"`), m.tagList.push([
                                    "EXT-X-DATERANGE",
                                    w
                                ]);
                                break;
                            }
                        case "DEFINE":
                            {
                                {
                                    const F = new te(w);
                                    me(o, F, [
                                        "NAME",
                                        "VALUE",
                                        "IMPORT",
                                        "QUERYPARAM"
                                    ]), "IMPORT" in F ? Yo(o, F, a) : vn(o, F, t);
                                }
                                break;
                            }
                        case "DISCONTINUITY-SEQUENCE":
                            f = parseInt(w);
                            break;
                        case "KEY":
                            {
                                const F = Dn(w, t, o);
                                if (F.isSupported()) {
                                    if (F.method === "NONE") {
                                        x = void 0;
                                        break;
                                    }
                                    x || (x = {}), x[F.keyFormat] && (x = ne({}, x)), x[F.keyFormat] = F;
                                } else v.warn(`[Keys] Ignoring invalid EXT-X-KEY tag: "${w}"`);
                                break;
                            }
                        case "START":
                            o.startTimeOffset = Cn(w);
                            break;
                        case "MAP":
                            {
                                const F = new te(w);
                                if (me(o, F, [
                                    "BYTERANGE",
                                    "URI"
                                ]), m.duration) {
                                    const H = new qs(i, t);
                                    kn(H, F, s, x), c = H, m.initSegment = c, c.rawProgramDateTime && !m.rawProgramDateTime && (m.rawProgramDateTime = c.rawProgramDateTime);
                                } else {
                                    const H = m.byteRangeEndOffset;
                                    if (H) {
                                        const K = m.byteRangeStartOffset;
                                        S = `${H - K}@${K}`;
                                    } else S = null;
                                    kn(m, F, s, x), c = m, b = !0;
                                }
                                break;
                            }
                        case "SERVER-CONTROL":
                            {
                                const F = new te(w);
                                o.canBlockReload = F.bool("CAN-BLOCK-RELOAD"), o.canSkipUntil = F.optionalFloat("CAN-SKIP-UNTIL", 0), o.canSkipDateRanges = o.canSkipUntil > 0 && F.bool("CAN-SKIP-DATERANGES"), o.partHoldBack = F.optionalFloat("PART-HOLD-BACK", 0), o.holdBack = F.optionalFloat("HOLD-BACK", 0);
                                break;
                            }
                        case "PART-INF":
                            {
                                const F = new te(w);
                                o.partTarget = F.decimalFloatingPoint("PART-TARGET");
                                break;
                            }
                        case "PART":
                            {
                                let F = o.partList;
                                F || (F = o.partList = []);
                                const H = u > 0 ? F[F.length - 1] : void 0, K = u++, $ = new te(w);
                                me(o, $, [
                                    "BYTERANGE",
                                    "URI"
                                ]);
                                const j = new uo($, m, t, K, H);
                                F.push(j), m.duration += j.duration;
                                break;
                            }
                        case "PRELOAD-HINT":
                            {
                                const F = new te(w);
                                me(o, F, [
                                    "URI"
                                ]), o.preloadHint = F;
                                break;
                            }
                        case "RENDITION-REPORT":
                            {
                                const F = new te(w);
                                me(o, F, [
                                    "URI"
                                ]), o.renditionReports = o.renditionReports || [], o.renditionReports.push(F);
                                break;
                            }
                        default:
                            v.warn(`line parsed but not handled: ${y}`);
                            break;
                    }
                }
            }
            g && !g.relurl ? (l.pop(), d -= g.duration, o.partList && (o.fragmentHint = g)) : o.partList && (wn(m, g), m.cc = f, o.fragmentHint = m, x && Pn(m, x, o));
            const D = l.length, R = l[0], _ = l[D - 1];
            if (d += o.skippedSegments * o.targetduration, d > 0 && D && _) {
                o.averagetargetduration = d / D;
                const P = _.sn;
                o.endSN = P !== "initSegment" ? P : 0, o.live || (_.endList = !0), R && (o.startCC = R.cc);
            } else o.endSN = 0, o.startCC = 0;
            return o.fragmentHint && (d += o.fragmentHint.duration), o.totalduration = d, o.endCC = f, T > 0 && tl(l, T), o;
        }
    }
    function Dn(r, e, t) {
        var s, i;
        const n = new te(r);
        me(t, n, [
            "KEYFORMAT",
            "KEYFORMATVERSIONS",
            "URI",
            "IV",
            "URI"
        ]);
        const a = (s = n.METHOD) != null ? s : "", o = n.URI, l = n.hexadecimalInteger("IV"), c = n.KEYFORMATVERSIONS, h = (i = n.KEYFORMAT) != null ? i : "identity";
        o && n.IV && !l && v.error(`Invalid IV: ${n.IV}`);
        const u = o ? Be.resolve(o, e) : "", d = (c || "1").split("/").map(Number).filter(Number.isFinite);
        return new Wt(a, u, h, d, l);
    }
    function Cn(r) {
        const t = new te(r).decimalFloatingPoint("TIME-OFFSET");
        return M(t) ? t : null;
    }
    function el(r, e) {
        let t = (r || "").split(/[ ,]+/).filter((s)=>s);
        [
            "video",
            "audio",
            "text"
        ].forEach((s)=>{
            const i = t.filter((n)=>jo(n, s));
            i.length && (e[`${s}Codec`] = i.join(","), t = t.filter((n)=>i.indexOf(n) === -1));
        }), e.unknownCodecs = t;
    }
    function _n(r, e, t) {
        const s = e[t];
        s && (r[t] = s);
    }
    function tl(r, e) {
        let t = r[e];
        for(let s = e; s--;){
            const i = r[s];
            if (!i) return;
            i.programDateTime = t.programDateTime - i.duration * 1e3, t = i;
        }
    }
    function wn(r, e) {
        r.rawProgramDateTime ? r.programDateTime = Date.parse(r.rawProgramDateTime) : e != null && e.programDateTime && (r.programDateTime = e.endProgramDateTime), M(r.programDateTime) || (r.programDateTime = null, r.rawProgramDateTime = null);
    }
    function kn(r, e, t, s) {
        r.relurl = e.URI, e.BYTERANGE && r.setByteRange(e.BYTERANGE), r.level = t, r.sn = "initSegment", s && (r.levelkeys = s), r.initSegment = null;
    }
    function Pn(r, e, t) {
        r.levelkeys = e;
        const { encryptedFragments: s } = t;
        (!s.length || s[s.length - 1].levelkeys !== e) && Object.keys(e).some((i)=>e[i].isCommonEncryption) && s.push(r);
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
    function Fn(r) {
        const { type: e } = r;
        switch(e){
            case q.AUDIO_TRACK:
                return B.AUDIO;
            case q.SUBTITLE_TRACK:
                return B.SUBTITLE;
            default:
                return B.MAIN;
        }
    }
    function ei(r, e) {
        let t = r.url;
        return (t === void 0 || t.indexOf("data:") === 0) && (t = e.url), t;
    }
    class sl {
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
            const t = this.hls.config, s = t.pLoader, i = t.loader, n = s || i, a = new n(t);
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
            const { id: s, level: i, pathwayId: n, url: a, deliveryDirectives: o } = t;
            this.load({
                id: s,
                level: i,
                pathwayId: n,
                responseType: "text",
                type: q.LEVEL,
                url: a,
                deliveryDirectives: o
            });
        }
        onAudioTrackLoading(e, t) {
            const { id: s, groupId: i, url: n, deliveryDirectives: a } = t;
            this.load({
                id: s,
                groupId: i,
                level: null,
                responseType: "text",
                type: q.AUDIO_TRACK,
                url: n,
                deliveryDirectives: a
            });
        }
        onSubtitleTrackLoading(e, t) {
            const { id: s, groupId: i, url: n, deliveryDirectives: a } = t;
            this.load({
                id: s,
                groupId: i,
                level: null,
                responseType: "text",
                type: q.SUBTITLE_TRACK,
                url: n,
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
                    v.trace("[playlist-loader]: playlist request ongoing");
                    return;
                }
                v.log(`[playlist-loader]: aborting previous loader for type: ${e.type}`), i.abort();
            }
            let n;
            if (e.type === q.MANIFEST ? n = s.manifestLoadPolicy.default : n = ne({}, s.playlistLoadPolicy.default, {
                timeoutRetry: null,
                errorRetry: null
            }), i = this.createInternalLoader(e), M((t = e.deliveryDirectives) == null ? void 0 : t.part)) {
                let c;
                if (e.type === q.LEVEL && e.level !== null ? c = this.hls.levels[e.level].details : e.type === q.AUDIO_TRACK && e.id !== null ? c = this.hls.audioTracks[e.id].details : e.type === q.SUBTITLE_TRACK && e.id !== null && (c = this.hls.subtitleTracks[e.id].details), c) {
                    const h = c.partTarget, u = c.targetduration;
                    if (h && u) {
                        const d = Math.max(h * 3, u * .8) * 1e3;
                        n = ne({}, n, {
                            maxTimeToFirstByteMs: Math.min(d, n.maxTimeToFirstByteMs),
                            maxLoadTimeMs: Math.min(d, n.maxTimeToFirstByteMs)
                        });
                    }
                }
            }
            const a = n.errorRetry || n.timeoutRetry || {}, o = {
                loadPolicy: n,
                timeout: n.maxLoadTimeMs,
                maxRetry: a.maxNumRetry || 0,
                retryDelay: a.retryDelayMs || 0,
                maxRetryDelay: a.maxRetryDelayMs || 0
            }, l = {
                onSuccess: (c, h, u, d)=>{
                    const f = this.getInternalLoader(u);
                    this.resetInternalLoader(u.type);
                    const g = c.data;
                    if (g.indexOf("#EXTM3U") !== 0) {
                        this.handleManifestParsingError(c, u, new Error("no EXTM3U delimiter"), d || null, h);
                        return;
                    }
                    h.parsing.start = performance.now(), Be.isMediaPlaylist(g) ? this.handleTrackOrLevelPlaylist(c, h, u, d || null, f) : this.handleMasterPlaylist(c, h, u, d);
                },
                onError: (c, h, u, d)=>{
                    this.handleNetworkError(h, u, !1, c, d);
                },
                onTimeout: (c, h, u)=>{
                    this.handleNetworkError(h, u, !0, void 0, c);
                }
            };
            i.load(e, o, l);
        }
        handleMasterPlaylist(e, t, s, i) {
            const n = this.hls, a = e.data, o = ei(e, s), l = Be.parseMasterPlaylist(a, o);
            if (l.playlistParsingError) {
                this.handleManifestParsingError(e, s, l.playlistParsingError, i, t);
                return;
            }
            const { contentSteering: c, levels: h, sessionData: u, sessionKeys: d, startTimeOffset: f, variableList: g } = l;
            this.variableList = g;
            const { AUDIO: m = [], SUBTITLES: y, "CLOSED-CAPTIONS": E } = Be.parseMasterPlaylistMedia(a, o, l);
            m.length && !m.some((T)=>!T.url) && h[0].audioCodec && !h[0].attrs.AUDIO && (v.log("[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one"), m.unshift({
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
            })), n.trigger(p.MANIFEST_LOADED, {
                levels: h,
                audioTracks: m,
                subtitles: y,
                captions: E,
                contentSteering: c,
                url: o,
                stats: t,
                networkDetails: i,
                sessionData: u,
                sessionKeys: d,
                startTimeOffset: f,
                variableList: g
            });
        }
        handleTrackOrLevelPlaylist(e, t, s, i, n) {
            const a = this.hls, { id: o, level: l, type: c } = s, h = ei(e, s), u = 0, d = M(l) ? l : M(o) ? o : 0, f = Fn(s), g = Be.parseLevelPlaylist(e.data, h, d, f, u, this.variableList);
            if (c === q.MANIFEST) {
                const m = {
                    attrs: new te({}),
                    bitrate: 0,
                    details: g,
                    name: "",
                    url: h
                };
                a.trigger(p.MANIFEST_LOADED, {
                    levels: [
                        m
                    ],
                    audioTracks: [],
                    url: h,
                    stats: t,
                    networkDetails: i,
                    sessionData: null,
                    sessionKeys: null,
                    contentSteering: null,
                    startTimeOffset: null,
                    variableList: null
                });
            }
            t.parsing.end = performance.now(), s.levelDetails = g, this.handlePlaylistLoaded(g, e, t, s, i, n);
        }
        handleManifestParsingError(e, t, s, i, n) {
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
                stats: n
            });
        }
        handleNetworkError(e, t, s = !1, i, n) {
            let a = `A network ${s ? "timeout" : "error" + (i ? " (status " + i.code + ")" : "")} occurred while loading ${e.type}`;
            e.type === q.LEVEL ? a += `: ${e.level} id: ${e.id}` : (e.type === q.AUDIO_TRACK || e.type === q.SUBTITLE_TRACK) && (a += ` id: ${e.id} group-id: "${e.groupId}"`);
            const o = new Error(a);
            v.warn(`[playlist-loader]: ${a}`);
            let l = A.UNKNOWN, c = !1;
            const h = this.getInternalLoader(e);
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
            h && this.resetInternalLoader(e.type);
            const u = {
                type: G.NETWORK_ERROR,
                details: l,
                fatal: c,
                url: e.url,
                loader: h,
                context: e,
                error: o,
                networkDetails: t,
                stats: n
            };
            if (i) {
                const d = t?.url || e.url;
                u.response = he({
                    url: d,
                    data: void 0
                }, i);
            }
            this.hls.trigger(p.ERROR, u);
        }
        handlePlaylistLoaded(e, t, s, i, n, a) {
            const o = this.hls, { type: l, level: c, id: h, groupId: u, deliveryDirectives: d } = i, f = ei(t, i), g = Fn(i), m = typeof i.level == "number" && g === B.MAIN ? c : void 0;
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
                    networkDetails: n,
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
                    networkDetails: n,
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
                        id: h || 0,
                        stats: s,
                        networkDetails: n,
                        deliveryDirectives: d
                    });
                    break;
                case q.AUDIO_TRACK:
                    o.trigger(p.AUDIO_TRACK_LOADED, {
                        details: e,
                        id: h || 0,
                        groupId: u || "",
                        stats: s,
                        networkDetails: n,
                        deliveryDirectives: d
                    });
                    break;
                case q.SUBTITLE_TRACK:
                    o.trigger(p.SUBTITLE_TRACK_LOADED, {
                        details: e,
                        id: h || 0,
                        groupId: u || "",
                        stats: s,
                        networkDetails: n,
                        deliveryDirectives: d
                    });
                    break;
            }
        }
    }
    function Yr(r, e) {
        let t;
        try {
            t = new Event("addtrack");
        } catch  {
            t = document.createEvent("Event"), t.initEvent("addtrack", !1, !1);
        }
        t.track = r, e.dispatchEvent(t);
    }
    function qr(r, e) {
        const t = r.mode;
        if (t === "disabled" && (r.mode = "hidden"), r.cues && !r.cues.getCueById(e.id)) try {
            if (r.addCue(e), !r.cues.getCueById(e.id)) throw new Error(`addCue is failed for: ${e}`);
        } catch (s) {
            v.debug(`[texttrack-utils]: ${s}`);
            try {
                const i = new self.TextTrackCue(e.startTime, e.endTime, e.text);
                i.id = e.id, r.addCue(i);
            } catch (i) {
                v.debug(`[texttrack-utils]: Legacy TextTrackCue fallback failed: ${i}`);
            }
        }
        t === "disabled" && (r.mode = t);
    }
    function vt(r) {
        const e = r.mode;
        if (e === "disabled" && (r.mode = "hidden"), r.cues) for(let t = r.cues.length; t--;)r.removeCue(r.cues[t]);
        e === "disabled" && (r.mode = e);
    }
    function Ii(r, e, t, s) {
        const i = r.mode;
        if (i === "disabled" && (r.mode = "hidden"), r.cues && r.cues.length > 0) {
            const n = nl(r.cues, e, t);
            for(let a = 0; a < n.length; a++)(!s || s(n[a])) && r.removeCue(n[a]);
        }
        i === "disabled" && (r.mode = i);
    }
    function il(r, e) {
        if (e < r[0].startTime) return 0;
        const t = r.length - 1;
        if (e > r[t].endTime) return -1;
        let s = 0, i = t;
        for(; s <= i;){
            const n = Math.floor((i + s) / 2);
            if (e < r[n].startTime) i = n - 1;
            else if (e > r[n].startTime && s < t) s = n + 1;
            else return n;
        }
        return r[s].startTime - e < e - r[i].startTime ? s : i;
    }
    function nl(r, e, t) {
        const s = [], i = il(r, e);
        if (i > -1) for(let n = i, a = r.length; n < a; n++){
            const o = r[n];
            if (o.startTime >= e && o.endTime <= t) s.push(o);
            else if (o.startTime > t) return s;
        }
        return s;
    }
    function cs(r) {
        const e = [];
        for(let t = 0; t < r.length; t++){
            const s = r[t];
            (s.kind === "subtitles" || s.kind === "captions") && s.label && e.push(r[t]);
        }
        return e;
    }
    var ke = {
        audioId3: "org.id3",
        dateRange: "com.apple.quicktime.HLS",
        emsg: "https://aomedia.org/emsg/ID3"
    };
    const rl = .25;
    function Di() {
        if (!(typeof self > "u")) return self.VTTCue || self.TextTrackCue;
    }
    function On(r, e, t, s, i) {
        let n = new r(e, t, "");
        try {
            n.value = s, i && (n.type = i);
        } catch  {
            n = new r(e, t, JSON.stringify(i ? he({
                type: i
            }, s) : s));
        }
        return n;
    }
    const Qt = (()=>{
        const r = Di();
        try {
            r && new r(0, Number.POSITIVE_INFINITY, "");
        } catch  {
            return Number.MAX_VALUE;
        }
        return Number.POSITIVE_INFINITY;
    })();
    function ti(r, e) {
        return r.getTime() / 1e3 - e;
    }
    function al(r) {
        return Uint8Array.from(r.replace(/^0x/, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")).buffer;
    }
    class ol {
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
            this.id3Track && (vt(this.id3Track), this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {});
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
                    if (s.kind === "metadata" && s.label === "id3") return Yr(s, this.media), s;
                }
                return this.media.addTextTrack("metadata", "id3");
            }
        }
        onFragParsingMetadata(e, t) {
            if (!this.media) return;
            const { hls: { config: { enableEmsgMetadataCues: s, enableID3MetadataCues: i } } } = this;
            if (!s && !i) return;
            const { samples: n } = t;
            this.id3Track || (this.id3Track = this.createTrack(this.media));
            const a = Di();
            if (a) for(let o = 0; o < n.length; o++){
                const l = n[o].type;
                if (l === ke.emsg && !s || !i) continue;
                const c = Mr(n[o].data);
                if (c) {
                    const h = n[o].pts;
                    let u = h + n[o].duration;
                    u > Qt && (u = Qt), u - h <= 0 && (u = h + rl);
                    for(let f = 0; f < c.length; f++){
                        const g = c[f];
                        if (!Or(g)) {
                            this.updateId3CueEnds(h, l);
                            const m = On(a, h, u, g, l);
                            m && this.id3Track.addCue(m);
                        }
                    }
                }
            }
        }
        updateId3CueEnds(e, t) {
            var s;
            const i = (s = this.id3Track) == null ? void 0 : s.cues;
            if (i) for(let n = i.length; n--;){
                const a = i[n];
                a.type === t && a.startTime < e && a.endTime === Qt && (a.endTime = e);
            }
        }
        onBufferFlushing(e, { startOffset: t, endOffset: s, type: i }) {
            const { id3Track: n, hls: a } = this;
            if (!a) return;
            const { config: { enableEmsgMetadataCues: o, enableID3MetadataCues: l } } = a;
            if (n && (o || l)) {
                let c;
                i === "audio" ? c = (h)=>h.type === ke.audioId3 && l : i === "video" ? c = (h)=>h.type === ke.emsg && o : c = (h)=>h.type === ke.audioId3 && l || h.type === ke.emsg && o, Ii(n, t, s, c);
            }
        }
        onLevelUpdated(e, { details: t }) {
            if (!this.media || !t.hasProgramDateTime || !this.hls.config.enableDateRangeMetadataCues) return;
            const { dateRangeCuesAppended: s, id3Track: i } = this, { dateRanges: n } = t, a = Object.keys(n);
            if (i) {
                const h = Object.keys(s).filter((u)=>!a.includes(u));
                for(let u = h.length; u--;){
                    const d = h[u];
                    Object.keys(s[d].cues).forEach((f)=>{
                        i.removeCue(s[d].cues[f]);
                    }), delete s[d];
                }
            }
            const o = t.fragments[t.fragments.length - 1];
            if (a.length === 0 || !M(o?.programDateTime)) return;
            this.id3Track || (this.id3Track = this.createTrack(this.media));
            const l = o.programDateTime / 1e3 - o.start, c = Di();
            for(let h = 0; h < a.length; h++){
                const u = a[h], d = n[u], f = ti(d.startDate, l), g = s[u], m = g?.cues || {};
                let y = g?.durationKnown || !1, E = Qt;
                const x = d.endDate;
                if (x) E = ti(x, l), y = !0;
                else if (d.endOnNext && !y) {
                    const b = a.reduce((S, D)=>{
                        if (D !== d.id) {
                            const R = n[D];
                            if (R.class === d.class && R.startDate > d.startDate && (!S || d.startDate < S.startDate)) return R;
                        }
                        return S;
                    }, null);
                    b && (E = ti(b.startDate, l), y = !0);
                }
                const T = Object.keys(d.attr);
                for(let b = 0; b < T.length; b++){
                    const S = T[b];
                    if (!co(S)) continue;
                    const D = m[S];
                    if (D) y && !g.durationKnown && (D.endTime = E);
                    else if (c) {
                        let R = d.attr[S];
                        ho(S) && (R = al(R));
                        const _ = On(c, f, E, {
                            key: S,
                            data: R
                        }, ke.dateRange);
                        _ && (_.id = u, this.id3Track.addCue(_), m[S] = _);
                    }
                }
                s[u] = {
                    cues: m,
                    dateRange: d,
                    durationKnown: y
                };
            }
        }
    }
    class ll {
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
            const { holdBack: t, partHoldBack: s, targetduration: i } = e, { liveSyncDuration: n, liveSyncDurationCount: a, lowLatencyMode: o } = this.config, l = this.hls.userConfig;
            let c = o && s || t;
            (l.liveSyncDuration || l.liveSyncDurationCount || c === 0) && (c = n !== void 0 ? n : a * i);
            const h = i;
            return c + Math.min(this.stallCount * 1, h);
        }
        get liveSyncPosition() {
            const e = this.estimateLiveEdge(), t = this.targetLatency, s = this.levelDetails;
            if (e === null || t === null || s === null) return null;
            const i = s.edge, n = e - t - this.edgeStalled, a = i - s.totalduration, o = i - (this.config.lowLatencyMode && s.partTarget || s.targetduration);
            return Math.min(Math.max(a, n), o);
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
            t.details === A.BUFFER_STALLED_ERROR && (this.stallCount++, (s = this.levelDetails) != null && s.live && v.warn("[playback-rate-controller]: Stall detected, adjusting target latency"));
        }
        timeupdate() {
            const { media: e, levelDetails: t } = this;
            if (!e || !t) return;
            this.currentTime = e.currentTime;
            const s = this.computeLatency();
            if (s === null) return;
            this._latency = s;
            const { lowLatencyMode: i, maxLiveSyncPlaybackRate: n } = this.config;
            if (!i || n === 1 || !t.live) return;
            const a = this.targetLatency;
            if (a === null) return;
            const o = s - a, l = Math.min(this.maxLatency, a + t.targetduration);
            if (o < l && o > .05 && this.forwardBufferLength > 1) {
                const h = Math.min(2, Math.max(1, n)), u = Math.round(2 / (1 + Math.exp(-.75 * o - this.edgeStalled)) * 20) / 20;
                e.playbackRate = Math.min(h, Math.max(1, u));
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
    const Ci = [
        "NONE",
        "TYPE-0",
        "TYPE-1",
        null
    ];
    function cl(r) {
        return Ci.indexOf(r) > -1;
    }
    const bs = [
        "SDR",
        "PQ",
        "HLG"
    ];
    function hl(r) {
        return !!r && bs.indexOf(r) > -1;
    }
    var hs = {
        No: "",
        Yes: "YES",
        v2: "v2"
    };
    function Mn(r) {
        const { canSkipUntil: e, canSkipDateRanges: t, age: s } = r, i = s < e / 2;
        return e && i ? t ? hs.v2 : hs.Yes : hs.No;
    }
    class Nn {
        constructor(e, t, s){
            this.msn = void 0, this.part = void 0, this.skip = void 0, this.msn = e, this.part = t, this.skip = s;
        }
        addDirectives(e) {
            const t = new self.URL(e);
            return this.msn !== void 0 && t.searchParams.set("_HLS_msn", this.msn.toString()), this.part !== void 0 && t.searchParams.set("_HLS_part", this.part.toString()), this.skip && t.searchParams.set("_HLS_skip", this.skip), t.href;
        }
    }
    class bt {
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
            return Un(this._audioGroups, e);
        }
        hasSubtitleGroup(e) {
            return Un(this._subtitleGroups, e);
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
    function Un(r, e) {
        return !e || !r ? !1 : r.indexOf(e) !== -1;
    }
    function si(r, e) {
        const t = e.startPTS;
        if (M(t)) {
            let s = 0, i;
            e.sn > r.sn ? (s = t - r.start, i = r) : (s = r.start - t, i = e), i.duration !== s && (i.duration = s);
        } else e.sn > r.sn ? r.cc === e.cc && r.minEndPTS ? e.start = r.start + (r.minEndPTS - r.start) : e.start = r.start + r.duration : e.start = Math.max(r.start - e.duration, 0);
    }
    function jr(r, e, t, s, i, n) {
        s - t <= 0 && (v.warn("Fragment should have a positive duration", e), s = t + e.duration, n = i + e.duration);
        let o = t, l = s;
        const c = e.startPTS, h = e.endPTS;
        if (M(c)) {
            const y = Math.abs(c - t);
            M(e.deltaPTS) ? e.deltaPTS = Math.max(y, e.deltaPTS) : e.deltaPTS = y, o = Math.max(t, c), t = Math.min(t, c), i = Math.min(i, e.startDTS), l = Math.min(s, h), s = Math.max(s, h), n = Math.max(n, e.endDTS);
        }
        const u = t - e.start;
        e.start !== 0 && (e.start = t), e.duration = s - e.start, e.startPTS = t, e.maxStartPTS = o, e.startDTS = i, e.endPTS = s, e.minEndPTS = l, e.endDTS = n;
        const d = e.sn;
        if (!r || d < r.startSN || d > r.endSN) return 0;
        let f;
        const g = d - r.startSN, m = r.fragments;
        for(m[g] = e, f = g; f > 0; f--)si(m[f], m[f - 1]);
        for(f = g; f < m.length - 1; f++)si(m[f], m[f + 1]);
        return r.fragmentHint && si(m[m.length - 1], r.fragmentHint), r.PTSKnown = r.alignedSliding = !0, u;
    }
    function ul(r, e) {
        let t = null;
        const s = r.fragments;
        for(let l = s.length - 1; l >= 0; l--){
            const c = s[l].initSegment;
            if (c) {
                t = c;
                break;
            }
        }
        r.fragmentHint && delete r.fragmentHint.endPTS;
        let i = 0, n;
        if (gl(r, e, (l, c)=>{
            l.relurl && (i = l.cc - c.cc), M(l.startPTS) && M(l.endPTS) && (c.start = c.startPTS = l.startPTS, c.startDTS = l.startDTS, c.maxStartPTS = l.maxStartPTS, c.endPTS = l.endPTS, c.endDTS = l.endDTS, c.minEndPTS = l.minEndPTS, c.duration = l.endPTS - l.startPTS, c.duration && (n = c), e.PTSKnown = e.alignedSliding = !0), c.elementaryStreams = l.elementaryStreams, c.loader = l.loader, c.stats = l.stats, l.initSegment && (c.initSegment = l.initSegment, t = l.initSegment);
        }), t && (e.fragmentHint ? e.fragments.concat(e.fragmentHint) : e.fragments).forEach((c)=>{
            var h;
            c && (!c.initSegment || c.initSegment.relurl === ((h = t) == null ? void 0 : h.relurl)) && (c.initSegment = t);
        }), e.skippedSegments) if (e.deltaUpdateFailed = e.fragments.some((l)=>!l), e.deltaUpdateFailed) {
            v.warn("[level-helper] Previous playlist missing segments skipped in delta playlist");
            for(let l = e.skippedSegments; l--;)e.fragments.shift();
            e.startSN = e.fragments[0].sn, e.startCC = e.fragments[0].cc;
        } else e.canSkipDateRanges && (e.dateRanges = dl(r.dateRanges, e.dateRanges, e.recentlyRemovedDateranges));
        const a = e.fragments;
        if (i) {
            v.warn("discontinuity sliding from playlist, take drift into account");
            for(let l = 0; l < a.length; l++)a[l].cc += i;
        }
        e.skippedSegments && (e.startCC = e.fragments[0].cc), fl(r.partList, e.partList, (l, c)=>{
            c.elementaryStreams = l.elementaryStreams, c.stats = l.stats;
        }), n ? jr(e, n, n.startPTS, n.endPTS, n.startDTS, n.endDTS) : zr(r, e), a.length && (e.totalduration = e.edge - a[0].start), e.driftStartTime = r.driftStartTime, e.driftStart = r.driftStart;
        const o = e.advancedDateTime;
        if (e.advanced && o) {
            const l = e.edge;
            e.driftStart || (e.driftStartTime = o, e.driftStart = l), e.driftEndTime = o, e.driftEnd = l;
        } else e.driftEndTime = r.driftEndTime, e.driftEnd = r.driftEnd, e.advancedDateTime = r.advancedDateTime;
    }
    function dl(r, e, t) {
        const s = ne({}, r);
        return t && t.forEach((i)=>{
            delete s[i];
        }), Object.keys(e).forEach((i)=>{
            const n = new _r(e[i].attr, s[i]);
            n.isValid ? s[i] = n : v.warn(`Ignoring invalid Playlist Delta Update DATERANGE tag: "${JSON.stringify(e[i].attr)}"`);
        }), s;
    }
    function fl(r, e, t) {
        if (r && e) {
            let s = 0;
            for(let i = 0, n = r.length; i <= n; i++){
                const a = r[i], o = e[i + s];
                a && o && a.index === o.index && a.fragment.sn === o.fragment.sn ? t(a, o) : s--;
            }
        }
    }
    function gl(r, e, t) {
        const s = e.skippedSegments, i = Math.max(r.startSN, e.startSN) - e.startSN, n = (r.fragmentHint ? 1 : 0) + (s ? e.endSN : Math.min(r.endSN, e.endSN)) - e.startSN, a = e.startSN - r.startSN, o = e.fragmentHint ? e.fragments.concat(e.fragmentHint) : e.fragments, l = r.fragmentHint ? r.fragments.concat(r.fragmentHint) : r.fragments;
        for(let c = i; c <= n; c++){
            const h = l[a + c];
            let u = o[c];
            s && !u && c < s && (u = e.fragments[c] = h), h && u && t(h, u);
        }
    }
    function zr(r, e) {
        const t = e.startSN + e.skippedSegments - r.startSN, s = r.fragments;
        t < 0 || t >= s.length || _i(e, s[t].start);
    }
    function _i(r, e) {
        if (e) {
            const t = r.fragments;
            for(let s = r.skippedSegments; s < t.length; s++)t[s].start += e;
            r.fragmentHint && (r.fragmentHint.start += e);
        }
    }
    function ml(r, e = 1 / 0) {
        let t = 1e3 * r.targetduration;
        if (r.updated) {
            const s = r.fragments;
            if (s.length && t * 4 > e) {
                const n = s[s.length - 1].duration * 1e3;
                n < t && (t = n);
            }
        } else t /= 2;
        return Math.round(t);
    }
    function pl(r, e, t) {
        if (!(r != null && r.details)) return null;
        const s = r.details;
        let i = s.fragments[e - s.startSN];
        return i || (i = s.fragmentHint, i && i.sn === e) ? i : e < s.startSN && t && t.sn === e ? t : null;
    }
    function Bn(r, e, t) {
        var s;
        return r != null && r.details ? Xr((s = r.details) == null ? void 0 : s.partList, e, t) : null;
    }
    function Xr(r, e, t) {
        if (r) for(let s = r.length; s--;){
            const i = r[s];
            if (i.index === t && i.fragment.sn === e) return i;
        }
        return null;
    }
    function Qr(r) {
        r.forEach((e, t)=>{
            const { details: s } = e;
            s != null && s.fragments && s.fragments.forEach((i)=>{
                i.level = t;
            });
        });
    }
    function Is(r) {
        switch(r.details){
            case A.FRAG_LOAD_TIMEOUT:
            case A.KEY_LOAD_TIMEOUT:
            case A.LEVEL_LOAD_TIMEOUT:
            case A.MANIFEST_LOAD_TIMEOUT:
                return !0;
        }
        return !1;
    }
    function $n(r, e) {
        const t = Is(e);
        return r.default[`${t ? "timeout" : "error"}Retry`];
    }
    function zi(r, e) {
        const t = r.backoff === "linear" ? 1 : Math.pow(2, e);
        return Math.min(t * r.retryDelayMs, r.maxRetryDelayMs);
    }
    function Gn(r) {
        return he(he({}, r), {
            errorRetry: null,
            timeoutRetry: null
        });
    }
    function Ds(r, e, t, s) {
        if (!r) return !1;
        const i = s?.code, n = e < r.maxNumRetry && (yl(i) || !!t);
        return r.shouldRetry ? r.shouldRetry(r, e, t, s, n) : n;
    }
    function yl(r) {
        return r === 0 && navigator.onLine === !1 || !!r && (r < 400 || r > 499);
    }
    const Jr = {
        search: function(r, e) {
            let t = 0, s = r.length - 1, i = null, n = null;
            for(; t <= s;){
                i = (t + s) / 2 | 0, n = r[i];
                const a = e(n);
                if (a > 0) t = i + 1;
                else if (a < 0) s = i - 1;
                else return n;
            }
            return null;
        }
    };
    function El(r, e, t) {
        if (e === null || !Array.isArray(r) || !r.length || !M(e)) return null;
        const s = r[0].programDateTime;
        if (e < (s || 0)) return null;
        const i = r[r.length - 1].endProgramDateTime;
        if (e >= (i || 0)) return null;
        t = t || 0;
        for(let n = 0; n < r.length; ++n){
            const a = r[n];
            if (xl(e, t, a)) return a;
        }
        return null;
    }
    function Cs(r, e, t = 0, s = 0, i = .005) {
        let n = null;
        if (r) {
            n = e[r.sn - e[0].sn + 1] || null;
            const o = r.endDTS - t;
            o > 0 && o < 15e-7 && (t += 15e-7);
        } else t === 0 && e[0].start === 0 && (n = e[0]);
        if (n && ((!r || r.level === n.level) && wi(t, s, n) === 0 || Tl(n, r, Math.min(i, s)))) return n;
        const a = Jr.search(e, wi.bind(null, t, s));
        return a && (a !== r || !n) ? a : n;
    }
    function Tl(r, e, t) {
        if (e && e.start === 0 && e.level < r.level && (e.endPTS || 0) > 0) {
            const s = e.tagList.reduce((i, n)=>(n[0] === "INF" && (i += parseFloat(n[1])), i), t);
            return r.start <= s;
        }
        return !1;
    }
    function wi(r = 0, e = 0, t) {
        if (t.start <= r && t.start + t.duration > r) return 0;
        const s = Math.min(e, t.duration + (t.deltaPTS ? t.deltaPTS : 0));
        return t.start + t.duration - s <= r ? 1 : t.start - s > r && t.start ? -1 : 0;
    }
    function xl(r, e, t) {
        const s = Math.min(e, t.duration + (t.deltaPTS ? t.deltaPTS : 0)) * 1e3;
        return (t.endProgramDateTime || 0) - s > r;
    }
    function Sl(r, e) {
        return Jr.search(r, (t)=>t.cc < e ? 1 : t.cc > e ? -1 : 0);
    }
    var de = {
        DoNothing: 0,
        SendAlternateToPenaltyBox: 2,
        RemoveAlternatePermanently: 3,
        RetryRequest: 5
    }, De = {
        None: 0,
        MoveAllAlternatesMatchingHost: 1,
        MoveAllAlternatesMatchingHDCP: 2
    };
    class vl {
        constructor(e){
            this.hls = void 0, this.playlistError = 0, this.penalizedRenditions = {}, this.log = void 0, this.warn = void 0, this.error = void 0, this.hls = e, this.log = v.log.bind(v, "[info]:"), this.warn = v.warn.bind(v, "[warning]:"), this.error = v.error.bind(v, "[error]:"), this.registerListeners();
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
            const n = this.hls, a = t.context;
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
                            action: de.DoNothing,
                            flags: De.None
                        };
                        return;
                    }
                case A.FRAG_GAP:
                case A.FRAG_DECRYPT_ERROR:
                    {
                        t.errorAction = this.getFragRetryOrSwitchAction(t), t.errorAction.action = de.SendAlternateToPenaltyBox;
                        return;
                    }
                case A.LEVEL_EMPTY_ERROR:
                case A.LEVEL_PARSING_ERROR:
                    {
                        var o, l;
                        const c = t.parent === B.MAIN ? t.level : n.loadLevel;
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
                        const c = n.levels[n.loadLevel];
                        if (c && (a.type === q.AUDIO_TRACK && c.hasAudioGroup(a.groupId) || a.type === q.SUBTITLE_TRACK && c.hasSubtitleGroup(a.groupId))) {
                            t.errorAction = this.getPlaylistRetryOrSwitchAction(t, n.loadLevel), t.errorAction.action = de.SendAlternateToPenaltyBox, t.errorAction.flags = De.MoveAllAlternatesMatchingHost;
                            return;
                        }
                    }
                    return;
                case A.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED:
                    {
                        const c = n.levels[n.loadLevel], h = c?.attrs["HDCP-LEVEL"];
                        h ? t.errorAction = {
                            action: de.SendAlternateToPenaltyBox,
                            flags: De.MoveAllAlternatesMatchingHDCP,
                            hdcpLevel: h
                        } : this.keySystemError(t);
                    }
                    return;
                case A.BUFFER_ADD_CODEC_ERROR:
                case A.REMUX_ALLOC_ERROR:
                case A.BUFFER_APPEND_ERROR:
                    t.errorAction = this.getLevelSwitchAction(t, (i = t.level) != null ? i : n.loadLevel);
                    return;
                case A.INTERNAL_EXCEPTION:
                case A.BUFFER_APPENDING_ERROR:
                case A.BUFFER_FULL_ERROR:
                case A.LEVEL_SWITCH_ERROR:
                case A.BUFFER_STALLED_ERROR:
                case A.BUFFER_SEEK_OVER_HOLE:
                case A.BUFFER_NUDGE_ON_STALL:
                    t.errorAction = {
                        action: de.DoNothing,
                        flags: De.None
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
            const s = this.hls, i = $n(s.config.playlistLoadPolicy, e), n = this.playlistError++;
            if (Ds(i, n, Is(e), e.response)) return {
                action: de.RetryRequest,
                flags: De.None,
                retryConfig: i,
                retryCount: n
            };
            const o = this.getLevelSwitchAction(e, t);
            return i && (o.retryConfig = i, o.retryCount = n), o;
        }
        getFragRetryOrSwitchAction(e) {
            const t = this.hls, s = this.getVariantLevelIndex(e.frag), i = t.levels[s], { fragLoadPolicy: n, keyLoadPolicy: a } = t.config, o = $n(e.details.startsWith("key") ? a : n, e), l = t.levels.reduce((h, u)=>h + u.fragmentError, 0);
            if (i && (e.details !== A.FRAG_GAP && i.fragmentError++, Ds(o, l, Is(e), e.response))) return {
                action: de.RetryRequest,
                flags: De.None,
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
                var n, a;
                const c = e.details;
                i.loadError++, c === A.BUFFER_APPEND_ERROR && i.fragmentError++;
                let h = -1;
                const { levels: u, loadLevel: d, minAutoLevel: f, maxAutoLevel: g } = s;
                s.autoLevelEnabled || (s.loadLevel = -1);
                const m = (n = e.frag) == null ? void 0 : n.type, E = (m === B.AUDIO && c === A.FRAG_PARSING_ERROR || e.sourceBufferName === "audio" && (c === A.BUFFER_ADD_CODEC_ERROR || c === A.BUFFER_APPEND_ERROR)) && u.some(({ audioCodec: D })=>i.audioCodec !== D), T = e.sourceBufferName === "video" && (c === A.BUFFER_ADD_CODEC_ERROR || c === A.BUFFER_APPEND_ERROR) && u.some(({ codecSet: D, audioCodec: R })=>i.codecSet !== D && i.audioCodec === R), { type: b, groupId: S } = (a = e.context) != null ? a : {};
                for(let D = u.length; D--;){
                    const R = (D + d) % u.length;
                    if (R !== d && R >= f && R <= g && u[R].loadError === 0) {
                        var o, l;
                        const _ = u[R];
                        if (c === A.FRAG_GAP && m === B.MAIN && e.frag) {
                            const P = u[R].details;
                            if (P) {
                                const I = Cs(e.frag, P.fragments, e.frag.start);
                                if (I != null && I.gap) continue;
                            }
                        } else {
                            if (b === q.AUDIO_TRACK && _.hasAudioGroup(S) || b === q.SUBTITLE_TRACK && _.hasSubtitleGroup(S)) continue;
                            if (m === B.AUDIO && (o = i.audioGroups) != null && o.some((P)=>_.hasAudioGroup(P)) || m === B.SUBTITLE && (l = i.subtitleGroups) != null && l.some((P)=>_.hasSubtitleGroup(P)) || E && i.audioCodec === _.audioCodec || !E && i.audioCodec !== _.audioCodec || T && i.codecSet === _.codecSet) continue;
                        }
                        h = R;
                        break;
                    }
                }
                if (h > -1 && s.loadLevel !== h) return e.levelRetry = !0, this.playlistError = 0, {
                    action: de.SendAlternateToPenaltyBox,
                    flags: De.None,
                    nextAutoLevel: h
                };
            }
            return {
                action: de.SendAlternateToPenaltyBox,
                flags: De.MoveAllAlternatesMatchingHost
            };
        }
        onErrorOut(e, t) {
            var s;
            switch((s = t.errorAction) == null ? void 0 : s.action){
                case de.DoNothing:
                    break;
                case de.SendAlternateToPenaltyBox:
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
            const { flags: i, hdcpLevel: n, nextAutoLevel: a } = s;
            switch(i){
                case De.None:
                    this.switchLevel(e, a);
                    break;
                case De.MoveAllAlternatesMatchingHDCP:
                    n && (t.maxHdcpLevel = Ci[Ci.indexOf(n) - 1], s.resolved = !0), this.warn(`Restricting playback to HDCP-LEVEL of "${t.maxHdcpLevel}" or lower`);
                    break;
            }
            s.resolved || this.switchLevel(e, a);
        }
        switchLevel(e, t) {
            t !== void 0 && e.errorAction && (this.warn(`switching to level ${t} after ${e.details}`), this.hls.nextAutoLevel = t, e.errorAction.resolved = !0, this.hls.nextLoadLevel = this.hls.nextAutoLevel);
        }
    }
    class Xi {
        constructor(e, t){
            this.hls = void 0, this.timer = -1, this.requestScheduled = -1, this.canLoad = !1, this.log = void 0, this.warn = void 0, this.log = v.log.bind(v, `${t}:`), this.warn = v.warn.bind(v, `${t}:`), this.hls = e;
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
                let n = -1;
                for(let a = 0; a < i.length; a++){
                    const o = i[a];
                    let l;
                    try {
                        l = new self.URL(o.URI, t.url).href;
                    } catch (c) {
                        v.warn(`Could not construct new URL for Rendition Report: ${c}`), l = o.URI || "";
                    }
                    if (l === e) {
                        n = a;
                        break;
                    } else l === e.substring(0, l.length) && (n = a);
                }
                if (n !== -1) {
                    const a = i[n], o = parseInt(a["LAST-MSN"]) || t?.lastPartSn;
                    let l = parseInt(a["LAST-PART"]) || t?.lastPartIndex;
                    if (this.hls.config.lowLatencyMode) {
                        const h = Math.min(t.age - t.partTarget, t.targetduration);
                        l >= 0 && h > t.partTarget && (l += 1);
                    }
                    const c = s && Mn(s);
                    return new Nn(o, l >= 0 ? l : void 0, c);
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
            const { details: i, stats: n } = t, a = self.performance.now(), o = n.loading.first ? Math.max(0, a - n.loading.first) : 0;
            if (i.advancedDateTime = Date.now() - o, i.live || s != null && s.live) {
                if (i.reloaded(s), s && this.log(`live playlist ${e} ${i.advanced ? "REFRESHED " + i.lastPartSn + "-" + i.lastPartIndex : i.updated ? "UPDATED" : "MISSED"}`), s && i.fragments.length > 0 && ul(s, i), !this.canLoad || !i.live) return;
                let l, c, h;
                if (i.canBlockReload && i.endSN && i.advanced) {
                    const y = this.hls.config.lowLatencyMode, E = i.lastPartSn, x = i.endSN, T = i.lastPartIndex, b = T !== -1, S = E === x, D = y ? 0 : T;
                    b ? (c = S ? x + 1 : E, h = S ? D : T + 1) : c = x + 1;
                    const R = i.age, _ = R + i.ageHeader;
                    let P = Math.min(_ - i.partTarget, i.targetduration * 1.5);
                    if (P > 0) {
                        if (s && P > s.tuneInGoal) this.warn(`CDN Tune-in goal increased from: ${s.tuneInGoal} to: ${P} with playlist age: ${i.age}`), P = 0;
                        else {
                            const I = Math.floor(P / i.targetduration);
                            if (c += I, h !== void 0) {
                                const w = Math.round(P % i.targetduration / i.partTarget);
                                h += w;
                            }
                            this.log(`CDN Tune-in age: ${i.ageHeader}s last advanced ${R.toFixed(2)}s goal: ${P} skip sn ${I} to part ${h}`);
                        }
                        i.tuneInGoal = P;
                    }
                    if (l = this.getDeliveryDirectives(i, t.deliveryDirectives, c, h), y || !S) {
                        this.loadPlaylist(l);
                        return;
                    }
                } else (i.canBlockReload || i.canSkipUntil) && (l = this.getDeliveryDirectives(i, t.deliveryDirectives, c, h));
                const u = this.hls.mainForwardBufferInfo, d = u ? u.end - u.len : 0, f = (i.edge - d) * 1e3, g = ml(i, f);
                i.updated && a > this.requestScheduled + g && (this.requestScheduled = n.loading.start), c !== void 0 && i.canBlockReload ? this.requestScheduled = n.loading.first + g - (i.partTarget * 1e3 || 1e3) : this.requestScheduled === -1 || this.requestScheduled + g < a ? this.requestScheduled = a : this.requestScheduled - a <= 0 && (this.requestScheduled += g);
                let m = this.requestScheduled - a;
                m = Math.max(0, m), this.log(`reload live playlist ${e} in ${Math.round(m)} ms`), this.timer = self.setTimeout(()=>this.loadPlaylist(l), m);
            } else this.clearTimer();
        }
        getDeliveryDirectives(e, t, s, i) {
            let n = Mn(e);
            return t != null && t.skip && e.deltaUpdateFailed && (s = t.msn, i = t.part, n = hs.No), new Nn(s, i, n);
        }
        checkRetry(e) {
            const t = e.details, s = Is(e), i = e.errorAction, { action: n, retryCount: a = 0, retryConfig: o } = i || {}, l = !!i && !!o && (n === de.RetryRequest || !i.resolved && n === de.SendAlternateToPenaltyBox);
            if (l) {
                var c;
                if (this.requestScheduled = -1, a >= o.maxNumRetry) return !1;
                if (s && (c = e.context) != null && c.deliveryDirectives) this.warn(`Retrying playlist loading ${a + 1}/${o.maxNumRetry} after "${t}" without delivery-directives`), this.loadPlaylist();
                else {
                    const h = zi(o, a);
                    this.timer = self.setTimeout(()=>this.loadPlaylist(), h), this.warn(`Retrying playlist loading ${a + 1}/${o.maxNumRetry} after "${t}" in ${h}ms`);
                }
                e.levelRetry = !0, i.resolved = !0;
            }
            return l;
        }
    }
    class mt {
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
    class Ll {
        constructor(e, t, s, i = 100){
            this.defaultEstimate_ = void 0, this.minWeight_ = void 0, this.minDelayMs_ = void 0, this.slow_ = void 0, this.fast_ = void 0, this.defaultTTFB_ = void 0, this.ttfb_ = void 0, this.defaultEstimate_ = s, this.minWeight_ = .001, this.minDelayMs_ = 50, this.slow_ = new mt(e), this.fast_ = new mt(t), this.defaultTTFB_ = i, this.ttfb_ = new mt(e);
        }
        update(e, t) {
            const { slow_: s, fast_: i, ttfb_: n } = this;
            s.halfLife !== e && (this.slow_ = new mt(e, s.getEstimate(), s.getTotalWeight())), i.halfLife !== t && (this.fast_ = new mt(t, i.getEstimate(), i.getTotalWeight())), n.halfLife !== e && (this.ttfb_ = new mt(e, n.getEstimate(), n.getTotalWeight()));
        }
        sample(e, t) {
            e = Math.max(e, this.minDelayMs_);
            const s = 8 * t, i = e / 1e3, n = s / i;
            this.fast_.sample(i, n), this.slow_.sample(i, n);
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
    const Zr = {
        supported: !0,
        configurations: [],
        decodingInfoResults: [
            {
                supported: !0,
                powerEfficient: !0,
                smooth: !0
            }
        ]
    }, Kn = {};
    function Al(r, e, t, s, i, n) {
        const a = r.audioCodec ? r.audioGroups : null, o = n?.audioCodec, l = n?.channels, c = l ? parseInt(l) : o ? 1 / 0 : 2;
        let h = null;
        if (a != null && a.length) try {
            a.length === 1 && a[0] ? h = e.groups[a[0]].channels : h = a.reduce((u, d)=>{
                if (d) {
                    const f = e.groups[d];
                    if (!f) throw new Error(`Audio track group ${d} not found`);
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
        return r.videoCodec !== void 0 && (r.width > 1920 && r.height > 1088 || r.height > 1920 && r.width > 1088 || r.frameRate > Math.max(s, 30) || r.videoRange !== "SDR" && r.videoRange !== t || r.bitrate > Math.max(i, 8e6)) || !!h && M(c) && Object.keys(h).some((u)=>parseInt(u) > c);
    }
    function Rl(r, e, t) {
        const s = r.videoCodec, i = r.audioCodec;
        if (!s || !i || !t) return Promise.resolve(Zr);
        const n = {
            width: r.width,
            height: r.height,
            bitrate: Math.ceil(Math.max(r.bitrate * .9, r.averageBitrate)),
            framerate: r.frameRate || 30
        }, a = r.videoRange;
        a !== "SDR" && (n.transferFunction = a.toLowerCase());
        const o = s.split(",").map((l)=>({
                type: "media-source",
                video: he(he({}, n), {}, {
                    contentType: Yt(l, "video")
                })
            }));
        return i && r.audioGroups && r.audioGroups.forEach((l)=>{
            var c;
            l && ((c = e.groups[l]) == null || c.tracks.forEach((h)=>{
                if (h.groupId === l) {
                    const u = h.channels || "", d = parseFloat(u);
                    M(d) && d > 2 && o.push.apply(o, i.split(",").map((f)=>({
                            type: "media-source",
                            audio: {
                                contentType: Yt(f, "audio"),
                                channels: "" + d
                            }
                        })));
                }
            }));
        }), Promise.all(o.map((l)=>{
            const c = bl(l);
            return Kn[c] || (Kn[c] = t.decodingInfo(l));
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
    function bl(r) {
        const { audio: e, video: t } = r, s = t || e;
        if (s) {
            const i = s.contentType.split('"')[1];
            if (t) return `r${t.height}x${t.width}f${Math.ceil(t.framerate)}${t.transferFunction || "sd"}_${i}_${Math.ceil(t.bitrate / 1e5)}`;
            if (e) return `c${e.channels}${e.spatialRendering ? "s" : "n"}_${i}`;
        }
        return "";
    }
    function Il() {
        if (typeof matchMedia == "function") {
            const r = matchMedia("(dynamic-range: high)"), e = matchMedia("bad query");
            if (r.media !== e.media) return r.matches === !0;
        }
        return !1;
    }
    function Dl(r, e) {
        let t = !1, s = [];
        return r && (t = r !== "SDR", s = [
            r
        ]), e && (s = e.allowedVideoRanges || bs.slice(0), t = e.preferHDR !== void 0 ? e.preferHDR : Il(), t ? s = s.filter((i)=>i !== "SDR") : s = [
            "SDR"
        ]), {
            preferHDR: t,
            allowedVideoRanges: s
        };
    }
    function Cl(r, e, t, s, i) {
        const n = Object.keys(r), a = s?.channels, o = s?.audioCodec, l = a && parseInt(a) === 2;
        let c = !0, h = !1, u = 1 / 0, d = 1 / 0, f = 1 / 0, g = 0, m = [];
        const { preferHDR: y, allowedVideoRanges: E } = Dl(e, i);
        for(let S = n.length; S--;){
            const D = r[n[S]];
            c = D.channels[2] > 0, u = Math.min(u, D.minHeight), d = Math.min(d, D.minFramerate), f = Math.min(f, D.minBitrate);
            const R = E.filter((_)=>D.videoRanges[_] > 0);
            R.length > 0 && (h = !0, m = R);
        }
        u = M(u) ? u : 0, d = M(d) ? d : 0;
        const x = Math.max(1080, u), T = Math.max(30, d);
        return f = M(f) ? f : t, t = Math.max(f, t), h || (e = void 0, m = []), {
            codecSet: n.reduce((S, D)=>{
                const R = r[D];
                if (D === S) return S;
                if (R.minBitrate > t) return Ve(D, `min bitrate of ${R.minBitrate} > current estimate of ${t}`), S;
                if (!R.hasDefaultAudio) return Ve(D, "no renditions with default or auto-select sound found"), S;
                if (o && D.indexOf(o.substring(0, 4)) % 5 !== 0) return Ve(D, `audio codec preference "${o}" not found`), S;
                if (a && !l) {
                    if (!R.channels[a]) return Ve(D, `no renditions with ${a} channel sound found (channels options: ${Object.keys(R.channels)})`), S;
                } else if ((!o || l) && c && R.channels[2] === 0) return Ve(D, "no renditions with stereo sound found"), S;
                return R.minHeight > x ? (Ve(D, `min resolution of ${R.minHeight} > maximum of ${x}`), S) : R.minFramerate > T ? (Ve(D, `min framerate of ${R.minFramerate} > maximum of ${T}`), S) : m.some((_)=>R.videoRanges[_] > 0) ? R.maxScore < g ? (Ve(D, `max score of ${R.maxScore} < selected max of ${g}`), S) : S && (As(D) >= As(S) || R.fragmentError > r[S].fragmentError) ? S : (g = R.maxScore, D) : (Ve(D, `no variants with VIDEO-RANGE of ${JSON.stringify(m)} found`), S);
            }, void 0),
            videoRanges: m,
            preferHDR: y,
            minFramerate: d,
            minBitrate: f
        };
    }
    function Ve(r, e) {
        v.log(`[abr] start candidates with "${r}" ignored because ${e}`);
    }
    function _l(r) {
        return r.reduce((e, t)=>{
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
    function wl(r, e, t, s) {
        return r.slice(t, s + 1).reduce((i, n)=>{
            if (!n.codecSet) return i;
            const a = n.audioGroups;
            let o = i[n.codecSet];
            o || (i[n.codecSet] = o = {
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
            }), o.minBitrate = Math.min(o.minBitrate, n.bitrate);
            const l = Math.min(n.height, n.width);
            return o.minHeight = Math.min(o.minHeight, l), o.minFramerate = Math.min(o.minFramerate, n.frameRate), o.maxScore = Math.max(o.maxScore, n.score), o.fragmentError += n.fragmentError, o.videoRanges[n.videoRange] = (o.videoRanges[n.videoRange] || 0) + 1, a && a.forEach((c)=>{
                if (!c) return;
                const h = e.groups[c];
                h && (o.hasDefaultAudio = o.hasDefaultAudio || e.hasDefaultAudio ? h.hasDefault : h.hasAutoSelect || !e.hasDefaultAudio && !e.hasAutoSelectAudio, Object.keys(h.channels).forEach((u)=>{
                    o.channels[u] = (o.channels[u] || 0) + h.channels[u];
                }));
            }), i;
        }, {});
    }
    function $e(r, e, t) {
        if ("attrs" in r) {
            const s = e.indexOf(r);
            if (s !== -1) return s;
        }
        for(let s = 0; s < e.length; s++){
            const i = e[s];
            if (Lt(r, i, t)) return s;
        }
        return -1;
    }
    function Lt(r, e, t) {
        const { groupId: s, name: i, lang: n, assocLang: a, characteristics: o, default: l } = r, c = r.forced;
        return (s === void 0 || e.groupId === s) && (i === void 0 || e.name === i) && (n === void 0 || e.lang === n) && (n === void 0 || e.assocLang === a) && (l === void 0 || e.default === l) && (c === void 0 || e.forced === c) && (o === void 0 || kl(o, e.characteristics)) && (t === void 0 || t(r, e));
    }
    function kl(r, e = "") {
        const t = r.split(","), s = e.split(",");
        return t.length === s.length && !t.some((i)=>s.indexOf(i) === -1);
    }
    function pt(r, e) {
        const { audioCodec: t, channels: s } = r;
        return (t === void 0 || (e.audioCodec || "").substring(0, 4) === t.substring(0, 4)) && (s === void 0 || s === (e.channels || "2"));
    }
    function Pl(r, e, t, s, i) {
        const n = e[s], o = e.reduce((d, f, g)=>{
            const m = f.uri;
            return (d[m] || (d[m] = [])).push(g), d;
        }, {})[n.uri];
        o.length > 1 && (s = Math.max.apply(Math, o));
        const l = n.videoRange, c = n.frameRate, h = n.codecSet.substring(0, 4), u = Hn(e, s, (d)=>{
            if (d.videoRange !== l || d.frameRate !== c || d.codecSet.substring(0, 4) !== h) return !1;
            const f = d.audioGroups, g = t.filter((m)=>!f || f.indexOf(m.groupId) !== -1);
            return $e(r, g, i) > -1;
        });
        return u > -1 ? u : Hn(e, s, (d)=>{
            const f = d.audioGroups, g = t.filter((m)=>!f || f.indexOf(m.groupId) !== -1);
            return $e(r, g, i) > -1;
        });
    }
    function Hn(r, e, t) {
        for(let s = e; s; s--)if (t(r[s])) return s;
        for(let s = e + 1; s < r.length; s++)if (t(r[s])) return s;
        return -1;
    }
    class Fl {
        constructor(e){
            this.hls = void 0, this.lastLevelLoadSec = 0, this.lastLoadedFragLevel = -1, this.firstSelection = -1, this._nextAutoLevel = -1, this.nextAutoLevelKey = "", this.audioTracksByGroup = null, this.codecTiers = null, this.timer = -1, this.fragCurrent = null, this.partCurrent = null, this.bitrateTestDelay = 0, this.bwEstimator = void 0, this._abandonRulesCheck = ()=>{
                const { fragCurrent: t, partCurrent: s, hls: i } = this, { autoLevelEnabled: n, media: a } = i;
                if (!t || !a) return;
                const o = performance.now(), l = s ? s.stats : t.stats, c = s ? s.duration : t.duration, h = o - l.loading.start, u = i.minAutoLevel;
                if (l.aborted || l.loaded && l.loaded === l.total || t.level <= u) {
                    this.clearTimer(), this._nextAutoLevel = -1;
                    return;
                }
                if (!n || a.paused || !a.playbackRate || !a.readyState) return;
                const d = i.mainForwardBufferInfo;
                if (d === null) return;
                const f = this.bwEstimator.getEstimateTTFB(), g = Math.abs(a.playbackRate);
                if (h <= Math.max(f, 1e3 * (c / (g * 2)))) return;
                const m = d.len / g, y = l.loading.first ? l.loading.first - l.loading.start : -1, E = l.loaded && y > -1, x = this.getBwEstimate(), T = i.levels, b = T[t.level], S = l.total || Math.max(l.loaded, Math.round(c * b.averageBitrate / 8));
                let D = E ? h - y : h;
                D < 1 && E && (D = Math.min(h, l.loaded * 8 / x));
                const R = E ? l.loaded * 1e3 / D : 0, _ = R ? (S - l.loaded) / R : S * 8 / x + f / 1e3;
                if (_ <= m) return;
                const P = R ? R * 8 : x;
                let I = Number.POSITIVE_INFINITY, w;
                for(w = t.level - 1; w > u; w--){
                    const F = T[w].maxBitrate;
                    if (I = this.getTimeToLoadFrag(f / 1e3, P, c * F, !T[w].details), I < m) break;
                }
                if (I >= _ || I > c * 10) return;
                i.nextLoadLevel = i.nextAutoLevel = w, E ? this.bwEstimator.sample(h - Math.min(f, y), l.loaded) : this.bwEstimator.sampleTTFB(h);
                const V = T[w].maxBitrate;
                this.getBwEstimate() * this.hls.config.abrBandWidthUpFactor > V && this.resetEstimator(V), this.clearTimer(), v.warn(`[abr] Fragment ${t.sn}${s ? " part " + s.index : ""} of level ${t.level} is loading too slowly;
      Time to underbuffer: ${m.toFixed(3)} s
      Estimated load time for current fragment: ${_.toFixed(3)} s
      Estimated load time for down switch fragment: ${I.toFixed(3)} s
      TTFB estimate: ${y | 0} ms
      Current BW estimate: ${M(x) ? x | 0 : "Unknown"} bps
      New BW estimate: ${this.getBwEstimate() | 0} bps
      Switching to level ${w} @ ${V | 0} bps`), i.trigger(p.FRAG_LOAD_EMERGENCY_ABORTED, {
                    frag: t,
                    part: s,
                    stats: l
                });
            }, this.hls = e, this.bwEstimator = this.initEstimator(), this.registerListeners();
        }
        resetEstimator(e) {
            e && (v.log(`setting initial bwe to ${e}`), this.hls.config.abrEwmaDefaultEstimate = e), this.firstSelection = -1, this.bwEstimator = this.initEstimator();
        }
        initEstimator() {
            const e = this.hls.config;
            return new Ll(e.abrEwmaSlowVoD, e.abrEwmaFastVoD, e.abrEwmaDefaultEstimate);
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
                        const s = t.frag, { fragCurrent: i, partCurrent: n } = this;
                        if (s && i && s.sn === i.sn && s.level === i.level) {
                            const a = performance.now(), o = n ? n.stats : s.stats, l = a - o.loading.start, c = o.loading.first ? o.loading.first - o.loading.start : -1;
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
            const n = e + s / t, a = i ? this.lastLevelLoadSec : 0;
            return n + a;
        }
        onLevelLoaded(e, t) {
            const s = this.hls.config, { loading: i } = t.stats, n = i.end - i.start;
            M(n) && (this.lastLevelLoadSec = n / 1e3), t.details.live ? this.bwEstimator.update(s.abrEwmaSlowLive, s.abrEwmaFastLive) : this.bwEstimator.update(s.abrEwmaSlowVoD, s.abrEwmaFastVoD);
        }
        onFragLoaded(e, { frag: t, part: s }) {
            const i = s ? s.stats : t.stats;
            if (t.type === B.MAIN && this.bwEstimator.sampleTTFB(i.loading.first - i.loading.start), !this.ignoreFragment(t)) {
                if (this.clearTimer(), t.level === this._nextAutoLevel && (this._nextAutoLevel = -1), this.firstSelection = -1, this.hls.config.abrMaxWithRealBitrate) {
                    const n = s ? s.duration : t.duration, a = this.hls.levels[t.level], o = (a.loaded ? a.loaded.bytes : 0) + i.loaded, l = (a.loaded ? a.loaded.duration : 0) + n;
                    a.loaded = {
                        bytes: o,
                        duration: l
                    }, a.realBitrate = Math.round(8 * o / l);
                }
                if (t.bitrateTest) {
                    const n = {
                        stats: i,
                        frag: t,
                        part: s,
                        id: t.type
                    };
                    this.onFragBuffered(p.FRAG_BUFFERED, n), t.bitrateTest = !1;
                } else this.lastLoadedFragLevel = t.level;
            }
        }
        onFragBuffered(e, t) {
            const { frag: s, part: i } = t, n = i != null && i.stats.loaded ? i.stats : s.stats;
            if (n.aborted || this.ignoreFragment(s)) return;
            const a = n.parsing.end - n.loading.start - Math.min(n.loading.first - n.loading.start, this.bwEstimator.getEstimateTTFB());
            this.bwEstimator.sample(a, n.loaded), n.bwEstimate = this.getBwEstimate(), s.bitrateTest ? this.bitrateTestDelay = a / 1e3 : this.bitrateTestDelay = 0;
        }
        ignoreFragment(e) {
            return e.type !== B.MAIN || e.sn === "initSegment";
        }
        clearTimer() {
            this.timer > -1 && (self.clearInterval(this.timer), this.timer = -1);
        }
        get firstAutoLevel() {
            const { maxAutoLevel: e, minAutoLevel: t } = this.hls, s = this.getBwEstimate(), i = this.hls.config.maxStarvationDelay, n = this.findBestLevel(s, t, e, 0, i, 1, 1);
            if (n > -1) return n;
            const a = this.hls.firstLevel, o = Math.min(Math.max(a, t), e);
            return v.warn(`[abr] Could not find best starting auto level. Defaulting to first in playlist ${a} clamped to ${o}`), o;
        }
        get forcedAutoLevel() {
            return this.nextAutoLevelKey ? -1 : this._nextAutoLevel;
        }
        get nextAutoLevel() {
            const e = this.forcedAutoLevel, s = this.bwEstimator.canEstimate(), i = this.lastLoadedFragLevel > -1;
            if (e !== -1 && (!s || !i || this.nextAutoLevelKey === this.getAutoLevelKey())) return e;
            const n = s && i ? this.getNextABRAutoLevel() : this.firstAutoLevel;
            if (e !== -1) {
                const a = this.hls.levels;
                if (a.length > Math.max(e, n) && a[e].loadError <= a[n].loadError) return e;
            }
            return this._nextAutoLevel = n, this.nextAutoLevelKey = this.getAutoLevelKey(), n;
        }
        getAutoLevelKey() {
            return `${this.getBwEstimate()}_${this.getStarvationDelay().toFixed(2)}`;
        }
        getNextABRAutoLevel() {
            const { fragCurrent: e, partCurrent: t, hls: s } = this, { maxAutoLevel: i, config: n, minAutoLevel: a } = s, o = t ? t.duration : e ? e.duration : 0, l = this.getBwEstimate(), c = this.getStarvationDelay();
            let h = n.abrBandWidthFactor, u = n.abrBandWidthUpFactor;
            if (c) {
                const y = this.findBestLevel(l, a, i, c, 0, h, u);
                if (y >= 0) return y;
            }
            let d = o ? Math.min(o, n.maxStarvationDelay) : n.maxStarvationDelay;
            if (!c) {
                const y = this.bitrateTestDelay;
                y && (d = (o ? Math.min(o, n.maxLoadingDelay) : n.maxLoadingDelay) - y, v.info(`[abr] bitrate test took ${Math.round(1e3 * y)}ms, set first fragment max fetchDuration to ${Math.round(1e3 * d)} ms`), h = u = 1);
            }
            const f = this.findBestLevel(l, a, i, c, d, h, u);
            if (v.info(`[abr] ${c ? "rebuffering expected" : "buffer is empty"}, optimal quality level ${f}`), f > -1) return f;
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
        findBestLevel(e, t, s, i, n, a, o) {
            var l;
            const c = i + n, h = this.lastLoadedFragLevel, u = h === -1 ? this.hls.firstLevel : h, { fragCurrent: d, partCurrent: f } = this, { levels: g, allAudioTracks: m, loadLevel: y, config: E } = this.hls;
            if (g.length === 1) return 0;
            const x = g[u], T = !!(x != null && (l = x.details) != null && l.live), b = y === -1 || h === -1;
            let S, D = "SDR", R = x?.frameRate || 0;
            const { audioPreference: _, videoPreference: P } = E, I = this.audioTracksByGroup || (this.audioTracksByGroup = _l(m));
            if (b) {
                if (this.firstSelection !== -1) return this.firstSelection;
                const K = this.codecTiers || (this.codecTiers = wl(g, I, t, s)), $ = Cl(K, D, e, _, P), { codecSet: j, videoRanges: J, minFramerate: N, minBitrate: O, preferHDR: z } = $;
                S = j, D = z ? J[J.length - 1] : J[0], R = N, e = Math.max(e, O), v.log(`[abr] picked start tier ${JSON.stringify($)}`);
            } else S = x?.codecSet, D = x?.videoRange;
            const w = f ? f.duration : d ? d.duration : 0, V = this.bwEstimator.getEstimateTTFB() / 1e3, F = [];
            for(let K = s; K >= t; K--){
                var H;
                const $ = g[K], j = K > u;
                if (!$) continue;
                if (E.useMediaCapabilities && !$.supportedResult && !$.supportedPromise) {
                    const se = navigator.mediaCapabilities;
                    typeof se?.decodingInfo == "function" && Al($, I, D, R, e, _) ? ($.supportedPromise = Rl($, I, se), $.supportedPromise.then((ae)=>{
                        if (!this.hls) return;
                        $.supportedResult = ae;
                        const ue = this.hls.levels, xe = ue.indexOf($);
                        ae.error ? v.warn(`[abr] MediaCapabilities decodingInfo error: "${ae.error}" for level ${xe} ${JSON.stringify(ae)}`) : ae.supported || (v.warn(`[abr] Unsupported MediaCapabilities decodingInfo result for level ${xe} ${JSON.stringify(ae)}`), xe > -1 && ue.length > 1 && (v.log(`[abr] Removing unsupported level ${xe}`), this.hls.removeLevel(xe)));
                    })) : $.supportedResult = Zr;
                }
                if (S && $.codecSet !== S || D && $.videoRange !== D || j && R > $.frameRate || !j && R > 0 && R < $.frameRate || $.supportedResult && !((H = $.supportedResult.decodingInfoResults) != null && H[0].smooth)) {
                    F.push(K);
                    continue;
                }
                const J = $.details, N = (f ? J?.partTarget : J?.averagetargetduration) || w;
                let O;
                j ? O = o * e : O = a * e;
                const z = w && i >= w * 2 && n === 0 ? g[K].averageBitrate : g[K].maxBitrate, Y = this.getTimeToLoadFrag(V, O, z * N, J === void 0);
                if (O >= z && (K === h || $.loadError === 0 && $.fragmentError === 0) && (Y <= V || !M(Y) || T && !this.bitrateTestDelay || Y < c)) {
                    const se = this.forcedAutoLevel;
                    return K !== y && (se === -1 || se !== y) && (F.length && v.trace(`[abr] Skipped level(s) ${F.join(",")} of ${s} max with CODECS and VIDEO-RANGE:"${g[F[0]].codecs}" ${g[F[0]].videoRange}; not compatible with "${x.codecs}" ${D}`), v.info(`[abr] switch candidate:${u}->${K} adjustedbw(${Math.round(O)})-bitrate=${Math.round(O - z)} ttfb:${V.toFixed(1)} avgDuration:${N.toFixed(1)} maxFetchDuration:${c.toFixed(1)} fetchDuration:${Y.toFixed(1)} firstSelection:${b} codecSet:${S} videoRange:${D} hls.loadLevel:${y}`)), b && (this.firstSelection = K), K;
                }
            }
            return -1;
        }
        set nextAutoLevel(e) {
            const { maxAutoLevel: t, minAutoLevel: s } = this.hls, i = Math.min(Math.max(e, s), t);
            this._nextAutoLevel !== i && (this.nextAutoLevelKey = "", this._nextAutoLevel = i);
        }
    }
    class Ol {
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
    var le = {
        NOT_LOADED: "NOT_LOADED",
        APPENDING: "APPENDING",
        PARTIAL: "PARTIAL",
        OK: "OK"
    };
    class Ml {
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
                const n = s[i];
                if (!n) break;
                const a = n.end;
                if (n.start <= e && a !== null && e <= a) return n;
            }
            return this.getBufferedFrag(e, t);
        }
        getBufferedFrag(e, t) {
            const { fragments: s } = this, i = Object.keys(s);
            for(let n = i.length; n--;){
                const a = s[i[n]];
                if (a?.body.type === t && a.buffered) {
                    const o = a.body;
                    if (o.start <= e && e <= o.end) return o;
                }
            }
            return null;
        }
        detectEvictedFragments(e, t, s, i) {
            this.timeRanges && (this.timeRanges[e] = t);
            const n = i?.fragment.sn || -1;
            Object.keys(this.fragments).forEach((a)=>{
                const o = this.fragments[a];
                if (!o || n >= o.body.sn) return;
                if (!o.buffered && !o.loaded) {
                    o.body.type === s && this.removeFragment(o.body);
                    return;
                }
                const l = o.range[e];
                l && l.time.some((c)=>{
                    const h = !this.isTimeBuffered(c.startPTS, c.endPTS, t);
                    return h && this.removeFragment(o.body), h;
                });
            });
        }
        detectPartialFragments(e) {
            const t = this.timeRanges, { frag: s, part: i } = e;
            if (!t || s.sn === "initSegment") return;
            const n = yt(s), a = this.fragments[n];
            if (!a || a.buffered && s.gap) return;
            const o = !s.relurl;
            Object.keys(t).forEach((l)=>{
                const c = s.elementaryStreams[l];
                if (!c) return;
                const h = t[l], u = o || c.partial === !0;
                a.range[l] = this.getBufferedTimes(s, i, u, h);
            }), a.loaded = null, Object.keys(a.range).length ? (a.buffered = !0, (a.body.endList = s.endList || a.body.endList) && (this.endListFragments[a.body.type] = a), Jt(a) || this.removeParts(s.sn - 1, s.type)) : this.removeFragment(a.body);
        }
        removeParts(e, t) {
            const s = this.activePartLists[t];
            s && (this.activePartLists[t] = s.filter((i)=>i.fragment.sn >= e));
        }
        fragBuffered(e, t) {
            const s = yt(e);
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
            const n = {
                time: [],
                partial: s
            }, a = e.start, o = e.end, l = e.minEndPTS || o, c = e.maxStartPTS || a;
            for(let h = 0; h < i.length; h++){
                const u = i.start(h) - this.bufferPadding, d = i.end(h) + this.bufferPadding;
                if (c >= u && l <= d) {
                    n.time.push({
                        startPTS: Math.max(a, i.start(h)),
                        endPTS: Math.min(o, i.end(h))
                    });
                    break;
                } else if (a < d && o > u) {
                    const f = Math.max(a, i.start(h)), g = Math.min(o, i.end(h));
                    g > f && (n.partial = !0, n.time.push({
                        startPTS: f,
                        endPTS: g
                    }));
                } else if (o <= u) break;
            }
            return n;
        }
        getPartialFragment(e) {
            let t = null, s, i, n, a = 0;
            const { bufferPadding: o, fragments: l } = this;
            return Object.keys(l).forEach((c)=>{
                const h = l[c];
                h && Jt(h) && (i = h.body.start - o, n = h.body.end + o, e >= i && e <= n && (s = Math.min(e - i, n - e), a <= s && (t = h.body, a = s)));
            }), t;
        }
        isEndListAppended(e) {
            const t = this.endListFragments[e];
            return t !== void 0 && (t.buffered || Jt(t));
        }
        getState(e) {
            const t = yt(e), s = this.fragments[t];
            return s ? s.buffered ? Jt(s) ? le.PARTIAL : le.OK : le.APPENDING : le.NOT_LOADED;
        }
        isTimeBuffered(e, t, s) {
            let i, n;
            for(let a = 0; a < s.length; a++){
                if (i = s.start(a) - this.bufferPadding, n = s.end(a) + this.bufferPadding, e >= i && t <= n) return !0;
                if (t <= i) return !1;
            }
            return !1;
        }
        onFragLoaded(e, t) {
            const { frag: s, part: i } = t;
            if (s.sn === "initSegment" || s.bitrateTest) return;
            const n = i ? null : t, a = yt(s);
            this.fragments[a] = {
                body: s,
                appendedPTS: null,
                loaded: n,
                buffered: !1,
                range: Object.create(null)
            };
        }
        onBufferAppended(e, t) {
            const { frag: s, part: i, timeRanges: n } = t;
            if (s.sn === "initSegment") return;
            const a = s.type;
            if (i) {
                let o = this.activePartLists[a];
                o || (this.activePartLists[a] = o = []), o.push(i);
            }
            this.timeRanges = n, Object.keys(n).forEach((o)=>{
                const l = n[o];
                this.detectEvictedFragments(o, l, a, i);
            });
        }
        onFragBuffered(e, t) {
            this.detectPartialFragments(t);
        }
        hasFragment(e) {
            const t = yt(e);
            return !!this.fragments[t];
        }
        hasParts(e) {
            var t;
            return !!((t = this.activePartLists[e]) != null && t.length);
        }
        removeFragmentsInRange(e, t, s, i, n) {
            i && !this.hasGaps || Object.keys(this.fragments).forEach((a)=>{
                const o = this.fragments[a];
                if (!o) return;
                const l = o.body;
                l.type !== s || i && !l.gap || l.start < t && l.end > e && (o.buffered || n) && this.removeFragment(l);
            });
        }
        removeFragment(e) {
            const t = yt(e);
            e.stats.loaded = 0, e.clearElementaryStreamInfo();
            const s = this.activePartLists[e.type];
            if (s) {
                const i = e.sn;
                this.activePartLists[e.type] = s.filter((n)=>n.fragment.sn !== i);
            }
            delete this.fragments[t], e.endList && delete this.endListFragments[e.type];
        }
        removeAllFragments() {
            this.fragments = Object.create(null), this.endListFragments = Object.create(null), this.activePartLists = Object.create(null), this.hasGaps = !1;
        }
    }
    function Jt(r) {
        var e, t, s;
        return r.buffered && (r.body.gap || ((e = r.range.video) == null ? void 0 : e.partial) || ((t = r.range.audio) == null ? void 0 : t.partial) || ((s = r.range.audiovideo) == null ? void 0 : s.partial));
    }
    function yt(r) {
        return `${r.type}_${r.level}_${r.sn}`;
    }
    const Nl = {
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
                    const i = Z.getBuffered(e), n = [];
                    let a;
                    for(a = 0; a < i.length; a++)n.push({
                        start: i.start(a),
                        end: i.end(a)
                    });
                    return this.bufferedInfo(n, t, s);
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
            t = Math.max(0, t), e.sort(function(c, h) {
                const u = c.start - h.start;
                return u || h.end - c.end;
            });
            let i = [];
            if (s) for(let c = 0; c < e.length; c++){
                const h = i.length;
                if (h) {
                    const u = i[h - 1].end;
                    e[c].start - u < s ? e[c].end > u && (i[h - 1].end = e[c].end) : i.push(e[c]);
                } else i.push(e[c]);
            }
            else i = e;
            let n = 0, a, o = t, l = t;
            for(let c = 0; c < i.length; c++){
                const h = i[c].start, u = i[c].end;
                if (t + s >= h && t < u) o = h, l = u, n = l - t;
                else if (t + s < h) {
                    a = h;
                    break;
                }
            }
            return {
                len: n,
                start: o || 0,
                end: l || 0,
                nextStart: a
            };
        }
        static getBuffered(e) {
            try {
                return e.buffered;
            } catch (t) {
                return v.log("failed to get media.buffered", t), Nl;
            }
        }
    }
    class Qi {
        constructor(e, t, s, i = 0, n = -1, a = !1){
            this.level = void 0, this.sn = void 0, this.part = void 0, this.id = void 0, this.size = void 0, this.partial = void 0, this.transmuxing = Zt(), this.buffering = {
                audio: Zt(),
                video: Zt(),
                audiovideo: Zt()
            }, this.level = e, this.sn = t, this.id = s, this.size = i, this.part = n, this.partial = a;
        }
    }
    function Zt() {
        return {
            start: 0,
            executeStart: 0,
            executeEnd: 0,
            end: 0
        };
    }
    function us(r, e) {
        for(let s = 0, i = r.length; s < i; s++){
            var t;
            if (((t = r[s]) == null ? void 0 : t.cc) === e) return r[s];
        }
        return null;
    }
    function Ul(r, e, t) {
        return !!(e && (t.endCC > t.startCC || r && r.cc < t.startCC));
    }
    function Bl(r, e) {
        const t = r.fragments, s = e.fragments;
        if (!s.length || !t.length) {
            v.log("No fragments to align");
            return;
        }
        const i = us(t, s[0].cc);
        if (!i || i && !i.startPTS) {
            v.log("No frag in previous level to align on");
            return;
        }
        return i;
    }
    function Vn(r, e) {
        if (r) {
            const t = r.start + e;
            r.start = r.startPTS = t, r.endPTS = t + r.duration;
        }
    }
    function ea(r, e) {
        const t = e.fragments;
        for(let s = 0, i = t.length; s < i; s++)Vn(t[s], r);
        e.fragmentHint && Vn(e.fragmentHint, r), e.alignedSliding = !0;
    }
    function $l(r, e, t) {
        e && (Gl(r, t, e), !t.alignedSliding && e && _s(t, e), !t.alignedSliding && e && !t.skippedSegments && zr(e, t));
    }
    function Gl(r, e, t) {
        if (Ul(r, t, e)) {
            const s = Bl(t, e);
            s && M(s.start) && (v.log(`Adjusting PTS using last level due to CC increase within current level ${e.url}`), ea(s.start, e));
        }
    }
    function _s(r, e) {
        if (!r.hasProgramDateTime || !e.hasProgramDateTime) return;
        const t = r.fragments, s = e.fragments;
        if (!t.length || !s.length) return;
        let i, n;
        const a = Math.min(e.endCC, r.endCC);
        e.startCC < a && r.startCC < a && (i = us(s, a), n = us(t, a)), (!i || !n) && (i = s[Math.floor(s.length / 2)], n = us(t, i.cc) || t[Math.floor(t.length / 2)]);
        const o = i.programDateTime, l = n.programDateTime;
        if (!o || !l) return;
        const c = (l - o) / 1e3 - (n.start - i.start);
        ea(c, r);
    }
    const Wn = Math.pow(2, 17);
    class Kl {
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
            if (!s) return Promise.reject(new Ye({
                type: G.NETWORK_ERROR,
                details: A.FRAG_LOAD_ERROR,
                fatal: !1,
                frag: e,
                error: new Error(`Fragment does not have a ${s ? "part list" : "url"}`),
                networkDetails: null
            }));
            this.abort();
            const i = this.config, n = i.fLoader, a = i.loader;
            return new Promise((o, l)=>{
                if (this.loader && this.loader.destroy(), e.gap) if (e.tagList.some((f)=>f[0] === "GAP")) {
                    l(qn(e));
                    return;
                } else e.gap = !1;
                const c = this.loader = e.loader = n ? new n(i) : new a(i), h = Yn(e), u = Gn(i.fragLoadPolicy.default), d = {
                    loadPolicy: u,
                    timeout: u.maxLoadTimeMs,
                    maxRetry: 0,
                    retryDelay: 0,
                    maxRetryDelay: 0,
                    highWaterMark: e.sn === "initSegment" ? 1 / 0 : Wn
                };
                e.stats = c.stats, c.load(h, d, {
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
                        this.resetLoader(e, c), l(new Ye({
                            type: G.NETWORK_ERROR,
                            details: A.FRAG_LOAD_ERROR,
                            fatal: !1,
                            frag: e,
                            response: he({
                                url: s,
                                data: void 0
                            }, f),
                            error: new Error(`HTTP Error ${f.code} ${f.text}`),
                            networkDetails: m,
                            stats: y
                        }));
                    },
                    onAbort: (f, g, m)=>{
                        this.resetLoader(e, c), l(new Ye({
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
                        this.resetLoader(e, c), l(new Ye({
                            type: G.NETWORK_ERROR,
                            details: A.FRAG_LOAD_TIMEOUT,
                            fatal: !1,
                            frag: e,
                            error: new Error(`Timeout after ${d.timeout}ms`),
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
            const i = this.config, n = i.fLoader, a = i.loader;
            return new Promise((o, l)=>{
                if (this.loader && this.loader.destroy(), e.gap || t.gap) {
                    l(qn(e, t));
                    return;
                }
                const c = this.loader = e.loader = n ? new n(i) : new a(i), h = Yn(e, t), u = Gn(i.fragLoadPolicy.default), d = {
                    loadPolicy: u,
                    timeout: u.maxLoadTimeMs,
                    maxRetry: 0,
                    retryDelay: 0,
                    maxRetryDelay: 0,
                    highWaterMark: Wn
                };
                t.stats = c.stats, c.load(h, d, {
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
                        this.resetLoader(e, c), l(new Ye({
                            type: G.NETWORK_ERROR,
                            details: A.FRAG_LOAD_ERROR,
                            fatal: !1,
                            frag: e,
                            part: t,
                            response: he({
                                url: h.url,
                                data: void 0
                            }, f),
                            error: new Error(`HTTP Error ${f.code} ${f.text}`),
                            networkDetails: m,
                            stats: y
                        }));
                    },
                    onAbort: (f, g, m)=>{
                        e.stats.aborted = t.stats.aborted, this.resetLoader(e, c), l(new Ye({
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
                        this.resetLoader(e, c), l(new Ye({
                            type: G.NETWORK_ERROR,
                            details: A.FRAG_LOAD_TIMEOUT,
                            fatal: !1,
                            frag: e,
                            part: t,
                            error: new Error(`Timeout after ${d.timeout}ms`),
                            networkDetails: m,
                            stats: f
                        }));
                    }
                });
            });
        }
        updateStatsFromPart(e, t) {
            const s = e.stats, i = t.stats, n = i.total;
            if (s.loaded += i.loaded, n) {
                const l = Math.round(e.duration / t.duration), c = Math.min(Math.round(s.loaded / n), l), u = (l - c) * Math.round(s.loaded / c);
                s.total = s.loaded + u;
            } else s.total = Math.max(s.loaded, s.total);
            const a = s.loading, o = i.loading;
            a.start ? a.first += o.first - o.start : (a.start = o.start, a.first = o.first), a.end = o.end;
        }
        resetLoader(e, t) {
            e.loader = null, this.loader === t && (self.clearTimeout(this.partLoadTimeout), this.loader = null), t.destroy();
        }
    }
    function Yn(r, e = null) {
        const t = e || r, s = {
            frag: r,
            part: e,
            responseType: "arraybuffer",
            url: t.url,
            headers: {},
            rangeStart: 0,
            rangeEnd: 0
        }, i = t.byteRangeStartOffset, n = t.byteRangeEndOffset;
        if (M(i) && M(n)) {
            var a;
            let o = i, l = n;
            if (r.sn === "initSegment" && ((a = r.decryptdata) == null ? void 0 : a.method) === "AES-128") {
                const c = n - i;
                c % 16 && (l = n + (16 - c % 16)), i !== 0 && (s.resetIV = !0, o = i - 16);
            }
            s.rangeStart = o, s.rangeEnd = l;
        }
        return s;
    }
    function qn(r, e) {
        const t = new Error(`GAP ${r.gap ? "tag" : "attribute"} found`), s = {
            type: G.MEDIA_ERROR,
            details: A.FRAG_GAP,
            fatal: !1,
            frag: r,
            error: t,
            networkDetails: null
        };
        return e && (s.part = e), (e || r).stats.aborted = !0, new Ye(s);
    }
    class Ye extends Error {
        constructor(e){
            super(e.error.message), this.data = void 0, this.data = e;
        }
    }
    class Hl {
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
    class Vl {
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
    function Wl(r) {
        const e = r.byteLength, t = e && new DataView(r.buffer).getUint8(e - 1);
        return t ? ct(r, 0, e - t) : r;
    }
    class Yl {
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
            const e = this.sBox, t = this.invSBox, s = this.subMix, i = s[0], n = s[1], a = s[2], o = s[3], l = this.invSubMix, c = l[0], h = l[1], u = l[2], d = l[3], f = new Uint32Array(256);
            let g = 0, m = 0, y = 0;
            for(y = 0; y < 256; y++)y < 128 ? f[y] = y << 1 : f[y] = y << 1 ^ 283;
            for(y = 0; y < 256; y++){
                let E = m ^ m << 1 ^ m << 2 ^ m << 3 ^ m << 4;
                E = E >>> 8 ^ E & 255 ^ 99, e[g] = E, t[E] = g;
                const x = f[g], T = f[x], b = f[T];
                let S = f[E] * 257 ^ E * 16843008;
                i[g] = S << 24 | S >>> 8, n[g] = S << 16 | S >>> 16, a[g] = S << 8 | S >>> 24, o[g] = S, S = b * 16843009 ^ T * 65537 ^ x * 257 ^ g * 16843008, c[E] = S << 24 | S >>> 8, h[E] = S << 16 | S >>> 16, u[E] = S << 8 | S >>> 24, d[E] = S, g ? (g = x ^ f[f[f[b ^ x]]], m ^= f[f[m]]) : g = m = 1;
            }
        }
        expandKey(e) {
            const t = this.uint8ArrayToUint32Array_(e);
            let s = !0, i = 0;
            for(; i < t.length && s;)s = t[i] === this.key[i], i++;
            if (s) return;
            this.key = t;
            const n = this.keySize = t.length;
            if (n !== 4 && n !== 6 && n !== 8) throw new Error("Invalid aes key size=" + n);
            const a = this.ksRows = (n + 6 + 1) * 4;
            let o, l;
            const c = this.keySchedule = new Uint32Array(a), h = this.invKeySchedule = new Uint32Array(a), u = this.sBox, d = this.rcon, f = this.invSubMix, g = f[0], m = f[1], y = f[2], E = f[3];
            let x, T;
            for(o = 0; o < a; o++){
                if (o < n) {
                    x = c[o] = t[o];
                    continue;
                }
                T = x, o % n === 0 ? (T = T << 8 | T >>> 24, T = u[T >>> 24] << 24 | u[T >>> 16 & 255] << 16 | u[T >>> 8 & 255] << 8 | u[T & 255], T ^= d[o / n | 0] << 24) : n > 6 && o % n === 4 && (T = u[T >>> 24] << 24 | u[T >>> 16 & 255] << 16 | u[T >>> 8 & 255] << 8 | u[T & 255]), c[o] = x = (c[o - n] ^ T) >>> 0;
            }
            for(l = 0; l < a; l++)o = a - l, l & 3 ? T = c[o] : T = c[o - 4], l < 4 || o <= 4 ? h[l] = T : h[l] = g[u[T >>> 24]] ^ m[u[T >>> 16 & 255]] ^ y[u[T >>> 8 & 255]] ^ E[u[T & 255]], h[l] = h[l] >>> 0;
        }
        networkToHostOrderSwap(e) {
            return e << 24 | (e & 65280) << 8 | (e & 16711680) >> 8 | e >>> 24;
        }
        decrypt(e, t, s) {
            const i = this.keySize + 6, n = this.invKeySchedule, a = this.invSBox, o = this.invSubMix, l = o[0], c = o[1], h = o[2], u = o[3], d = this.uint8ArrayToUint32Array_(s);
            let f = d[0], g = d[1], m = d[2], y = d[3];
            const E = new Int32Array(e), x = new Int32Array(E.length);
            let T, b, S, D, R, _, P, I, w, V, F, H, K, $;
            const j = this.networkToHostOrderSwap;
            for(; t < E.length;){
                for(w = j(E[t]), V = j(E[t + 1]), F = j(E[t + 2]), H = j(E[t + 3]), R = w ^ n[0], _ = H ^ n[1], P = F ^ n[2], I = V ^ n[3], K = 4, $ = 1; $ < i; $++)T = l[R >>> 24] ^ c[_ >> 16 & 255] ^ h[P >> 8 & 255] ^ u[I & 255] ^ n[K], b = l[_ >>> 24] ^ c[P >> 16 & 255] ^ h[I >> 8 & 255] ^ u[R & 255] ^ n[K + 1], S = l[P >>> 24] ^ c[I >> 16 & 255] ^ h[R >> 8 & 255] ^ u[_ & 255] ^ n[K + 2], D = l[I >>> 24] ^ c[R >> 16 & 255] ^ h[_ >> 8 & 255] ^ u[P & 255] ^ n[K + 3], R = T, _ = b, P = S, I = D, K = K + 4;
                T = a[R >>> 24] << 24 ^ a[_ >> 16 & 255] << 16 ^ a[P >> 8 & 255] << 8 ^ a[I & 255] ^ n[K], b = a[_ >>> 24] << 24 ^ a[P >> 16 & 255] << 16 ^ a[I >> 8 & 255] << 8 ^ a[R & 255] ^ n[K + 1], S = a[P >>> 24] << 24 ^ a[I >> 16 & 255] << 16 ^ a[R >> 8 & 255] << 8 ^ a[_ & 255] ^ n[K + 2], D = a[I >>> 24] << 24 ^ a[R >> 16 & 255] << 16 ^ a[_ >> 8 & 255] << 8 ^ a[P & 255] ^ n[K + 3], x[t] = j(T ^ f), x[t + 1] = j(D ^ g), x[t + 2] = j(S ^ m), x[t + 3] = j(b ^ y), f = w, g = V, m = F, y = H, t = t + 4;
            }
            return x.buffer;
        }
    }
    const ql = 16;
    class Ji {
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
            return this.reset(), this.removePKCS7Padding ? Wl(s) : s;
        }
        reset() {
            this.currentResult = null, this.currentIV = null, this.remainderData = null, this.softwareDecrypter && (this.softwareDecrypter = null);
        }
        decrypt(e, t, s) {
            return this.useSoftware ? new Promise((i, n)=>{
                this.softwareDecrypt(new Uint8Array(e), t, s);
                const a = this.flush();
                a ? i(a.buffer) : n(new Error("[softwareDecrypt] Failed to decrypt data"));
            }) : this.webCryptoDecrypt(new Uint8Array(e), t, s);
        }
        softwareDecrypt(e, t, s) {
            const { currentIV: i, currentResult: n, remainderData: a } = this;
            this.logOnce("JS AES decrypt"), a && (e = be(a, e), this.remainderData = null);
            const o = this.getValidChunk(e);
            if (!o.length) return null;
            i && (s = i);
            let l = this.softwareDecrypter;
            l || (l = this.softwareDecrypter = new Yl), l.expandKey(t);
            const c = n;
            return this.currentResult = l.decrypt(o.buffer, 0, s), this.currentIV = ct(o, -16).buffer, c || null;
        }
        webCryptoDecrypt(e, t, s) {
            if (this.key !== t || !this.fastAesKey) {
                if (!this.subtle) return Promise.resolve(this.onWebCryptoError(e, t, s));
                this.key = t, this.fastAesKey = new Vl(this.subtle, t);
            }
            return this.fastAesKey.expandKey().then((i)=>this.subtle ? (this.logOnce("WebCrypto AES decrypt"), new Hl(this.subtle, new Uint8Array(s)).decrypt(e.buffer, i)) : Promise.reject(new Error("web crypto not initialized"))).catch((i)=>(v.warn(`[decrypter]: WebCrypto Error, disable WebCrypto API, ${i.name}: ${i.message}`), this.onWebCryptoError(e, t, s)));
        }
        onWebCryptoError(e, t, s) {
            this.useSoftware = !0, this.logEnabled = !0, this.softwareDecrypt(e, t, s);
            const i = this.flush();
            if (i) return i.buffer;
            throw new Error("WebCrypto and softwareDecrypt: failed to decrypt data");
        }
        getValidChunk(e) {
            let t = e;
            const s = e.length - e.length % ql;
            return s !== e.length && (t = ct(e, 0, s), this.remainderData = ct(e, s)), t;
        }
        logOnce(e) {
            this.logEnabled && (v.log(`[decrypter]: ${e}`), this.logEnabled = !1);
        }
    }
    const jl = {
        toString: function(r) {
            let e = "";
            const t = r.length;
            for(let s = 0; s < t; s++)e += `[${r.start(s).toFixed(3)}-${r.end(s).toFixed(3)}]`;
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
    class Zi extends Ol {
        constructor(e, t, s, i, n){
            super(), this.hls = void 0, this.fragPrevious = null, this.fragCurrent = null, this.fragmentTracker = void 0, this.transmuxer = null, this._state = C.STOPPED, this.playlistType = void 0, this.media = null, this.mediaBuffer = null, this.config = void 0, this.bitrateTest = !1, this.lastCurrentTime = 0, this.nextLoadPosition = 0, this.startPosition = 0, this.startTimeOffset = null, this.loadedmetadata = !1, this.retryDate = 0, this.levels = null, this.fragmentLoader = void 0, this.keyLoader = void 0, this.levelLastLoaded = null, this.startFragRequested = !1, this.decrypter = void 0, this.initPTS = [], this.onvseeking = null, this.onvended = null, this.logPrefix = "", this.log = void 0, this.warn = void 0, this.playlistType = n, this.logPrefix = i, this.log = v.log.bind(v, `${i}:`), this.warn = v.warn.bind(v, `${i}:`), this.hls = e, this.fragmentLoader = new Kl(e.config), this.keyLoader = s, this.fragmentTracker = t, this.config = e.config, this.decrypter = new Ji(e.config), e.on(p.MANIFEST_LOADED, this.onManifestLoaded, this);
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
                const n = s[s.length - 1];
                return Z.isBuffered(this.media, n.start + n.duration / 2);
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
            const { config: e, fragCurrent: t, media: s, mediaBuffer: i, state: n } = this, a = s ? s.currentTime : 0, o = Z.bufferInfo(i || s, a, e.maxBufferHole);
            if (this.log(`media seeking to ${M(a) ? a.toFixed(3) : a}, state: ${n}`), this.state === C.ENDED) this.resetLoadingState();
            else if (t) {
                const l = e.maxFragLookUpTolerance, c = t.start - l, h = t.start + t.duration + l;
                if (!o.len || h < o.start || c > o.end) {
                    const u = a > h;
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
            const i = (n)=>{
                if (this.fragContextChanged(e)) {
                    this.warn(`Fragment ${e.sn}${n.part ? " p: " + n.part.index : ""} of level ${e.level} was dropped during download.`), this.fragmentTracker.removeFragment(e);
                    return;
                }
                e.stats.chunkCount++, this._handleFragmentLoadProgress(n);
            };
            this._doFragLoad(e, t, s, i).then((n)=>{
                if (!n) return;
                const a = this.state;
                if (this.fragContextChanged(e)) {
                    (a === C.FRAG_LOADING || !this.fragCurrent && a === C.PARSING) && (this.fragmentTracker.removeFragment(e), this.state = C.IDLE);
                    return;
                }
                "payload" in n && (this.log(`Loaded fragment ${e.sn} of level ${e.level}`), this.hls.trigger(p.FRAG_LOADED, n)), this._handleFragmentLoadComplete(n);
            }).catch((n)=>{
                this.state === C.STOPPED || this.state === C.ERROR || (this.warn(`Frag error: ${n?.message || n}`), this.resetFragmentLoading(e));
            });
        }
        clearTrackerIfNeeded(e) {
            var t;
            const { fragmentTracker: s } = this;
            if (s.getState(e) === le.APPENDING) {
                const n = e.type, a = this.getFwdBufferInfo(this.mediaBuffer, n), o = Math.max(e.duration, a ? a.len : this.config.maxBufferLength), l = this.backtrackFragment;
                ((l ? e.sn - l.sn : 0) === 1 || this.reduceMaxBufferLength(o, e.duration)) && s.removeFragment(e);
            } else ((t = this.mediaBuffer) == null ? void 0 : t.buffered.length) === 0 ? s.removeAllFragments() : s.hasParts(e.type) && (s.detectPartialFragments({
                frag: e,
                part: null,
                stats: e.stats,
                id: e.type
            }), s.getState(e) === le.PARTIAL && s.removeFragment(e));
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
                const { hls: i } = this, { payload: n } = s, a = e.decryptdata;
                if (n && n.byteLength > 0 && a != null && a.key && a.iv && a.method === "AES-128") {
                    const o = self.performance.now();
                    return this.decrypter.decrypt(new Uint8Array(n), a.key.buffer, a.iv.buffer).catch((l)=>{
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
            var s, i, n, a;
            const o = this.mediaBuffer ? this.mediaBuffer : this.media;
            if (this.log(`Buffered ${e.type} sn: ${e.sn}${t ? " part: " + t.index : ""} of ${this.playlistType === B.MAIN ? "level" : "track"} ${e.level} (frag:[${((s = e.startPTS) != null ? s : NaN).toFixed(3)}-${((i = e.endPTS) != null ? i : NaN).toFixed(3)}] > buffer:${o ? jl.toString(Z.getBuffered(o)) : "(detached)"})`), e.sn !== "initSegment") {
                var l;
                if (e.type !== B.SUBTITLE) {
                    const h = e.elementaryStreams;
                    if (!Object.keys(h).some((u)=>!!h[u])) {
                        this.state = C.IDLE;
                        return;
                    }
                }
                const c = (l = this.levels) == null ? void 0 : l[e.level];
                c != null && c.fragmentError && (this.log(`Resetting level fragment error count of ${c.fragmentError} on frag buffered`), c.fragmentError = 0);
            }
            this.state = C.IDLE, o && (!this.loadedmetadata && e.type == B.MAIN && o.buffered.length && ((n = this.fragCurrent) == null ? void 0 : n.sn) === ((a = this.fragPrevious) == null ? void 0 : a.sn) && (this.loadedmetadata = !0, this.seekToStartPos()), this.tick());
        }
        seekToStartPos() {}
        _handleFragmentLoadComplete(e) {
            const { transmuxer: t } = this;
            if (!t) return;
            const { frag: s, part: i, partsLoaded: n } = e, a = !n || n.length === 0 || n.some((l)=>!l), o = new Qi(s.level, s.sn, s.stats.chunkCount + 1, 0, i ? i.index : -1, !a);
            t.flush(o);
        }
        _handleFragmentLoadProgress(e) {}
        _doFragLoad(e, t, s = null, i) {
            var n;
            const a = t?.details;
            if (!this.levels || !a) throw new Error(`frag load aborted, missing level${a ? "" : " detail"}s`);
            let o = null;
            if (e.encrypted && !((n = e.decryptdata) != null && n.key) ? (this.log(`Loading key for ${e.sn} of [${a.startSN}-${a.endSN}], ${this.logPrefix === "[stream-controller]" ? "level" : "track"} ${e.level}`), this.state = C.KEY_LOADING, this.fragCurrent = e, o = this.keyLoader.load(e).then((h)=>{
                if (!this.fragContextChanged(h.frag)) return this.hls.trigger(p.KEY_LOADED, h), this.state === C.KEY_LOADING && (this.state = C.IDLE), h;
            }), this.hls.trigger(p.KEY_LOADING, {
                frag: e
            }), this.fragCurrent === null && (o = Promise.reject(new Error("frag load aborted, context changed in KEY_LOADING")))) : !e.encrypted && a.encryptedFragments.length && this.keyLoader.loadClear(e, a.encryptedFragments), s = Math.max(e.start, s || 0), this.config.lowLatencyMode && e.sn !== "initSegment") {
                const h = a.partList;
                if (h && i) {
                    s > e.end && a.fragmentHint && (e = a.fragmentHint);
                    const u = this.getNextPart(h, e, s);
                    if (u > -1) {
                        const d = h[u];
                        this.log(`Loading part sn: ${e.sn} p: ${d.index} cc: ${e.cc} of playlist [${a.startSN}-${a.endSN}] parts [0-${u}-${h.length - 1}] ${this.logPrefix === "[stream-controller]" ? "level" : "track"}: ${e.level}, target: ${parseFloat(s.toFixed(3))}`), this.nextLoadPosition = d.start + d.duration, this.state = C.FRAG_LOADING;
                        let f;
                        return o ? f = o.then((g)=>!g || this.fragContextChanged(g.frag) ? null : this.doFragPartsLoad(e, d, t, i)).catch((g)=>this.handleFragLoadError(g)) : f = this.doFragPartsLoad(e, d, t, i).catch((g)=>this.handleFragLoadError(g)), this.hls.trigger(p.FRAG_LOADING, {
                            frag: e,
                            part: d,
                            targetBufferTime: s
                        }), this.fragCurrent === null ? Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING parts")) : f;
                    } else if (!e.url || this.loadedEndOfParts(h, s)) return Promise.resolve(null);
                }
            }
            this.log(`Loading fragment ${e.sn} cc: ${e.cc} ${a ? "of [" + a.startSN + "-" + a.endSN + "] " : ""}${this.logPrefix === "[stream-controller]" ? "level" : "track"}: ${e.level}, target: ${parseFloat(s.toFixed(3))}`), M(e.sn) && !this.bitrateTest && (this.nextLoadPosition = e.start + e.duration), this.state = C.FRAG_LOADING;
            const l = this.config.progressive;
            let c;
            return l && o ? c = o.then((h)=>!h || this.fragContextChanged(h?.frag) ? null : this.fragmentLoader.load(e, i)).catch((h)=>this.handleFragLoadError(h)) : c = Promise.all([
                this.fragmentLoader.load(e, l ? i : void 0),
                o
            ]).then(([h])=>(!l && h && i && i(h), h)).catch((h)=>this.handleFragLoadError(h)), this.hls.trigger(p.FRAG_LOADING, {
                frag: e,
                targetBufferTime: s
            }), this.fragCurrent === null ? Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING")) : c;
        }
        doFragPartsLoad(e, t, s, i) {
            return new Promise((n, a)=>{
                var o;
                const l = [], c = (o = s.details) == null ? void 0 : o.partList, h = (u)=>{
                    this.fragmentLoader.loadPart(e, u, i).then((d)=>{
                        l[u.index] = d;
                        const f = d.part;
                        this.hls.trigger(p.FRAG_LOADED, d);
                        const g = Bn(s, e.sn, u.index + 1) || Xr(c, e.sn, u.index + 1);
                        if (g) h(g);
                        else return n({
                            frag: e,
                            part: f,
                            partsLoaded: l
                        });
                    }).catch(a);
                };
                h(t);
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
            const { frag: s, part: i, level: n } = t, a = self.performance.now();
            s.stats.parsing.end = a, i && (i.stats.parsing.end = a), this.updateLevelTiming(s, i, n, e.partial);
        }
        getCurrentContext(e) {
            const { levels: t, fragCurrent: s } = this, { level: i, sn: n, part: a } = e;
            if (!(t != null && t[i])) return this.warn(`Levels object was unset while buffering fragment ${n} of level ${i}. The current chunk will not be buffered.`), null;
            const o = t[i], l = a > -1 ? Bn(o, n, a) : null, c = l ? l.fragment : pl(o, n, s);
            return c ? (s && s !== c && (c.stats = s.stats), {
                frag: c,
                part: l,
                level: o
            }) : null;
        }
        bufferFragmentData(e, t, s, i, n) {
            var a;
            if (!e || this.state !== C.PARSING) return;
            const { data1: o, data2: l } = e;
            let c = o;
            if (o && l && (c = be(o, l)), !((a = c) != null && a.length)) return;
            const h = {
                type: e.type,
                frag: t,
                part: s,
                chunkMeta: i,
                parent: t.type,
                data: c
            };
            if (this.hls.trigger(p.BUFFER_APPENDING, h), e.dropped && e.independent && !s) {
                if (n) return;
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
            const s = t.currentTime, i = Z.bufferInfo(t, s, 0), n = e.duration, a = Math.min(this.config.maxFragLookUpTolerance * 2, n * .25), o = Math.max(Math.min(e.start - a, i.end - a), s + a);
            e.start - o > a && this.flushMainBuffer(o, e.start);
        }
        getFwdBufferInfo(e, t) {
            const s = this.getLoadPosition();
            return M(s) ? this.getFwdBufferInfoAtPos(e, s, t) : null;
        }
        getFwdBufferInfoAtPos(e, t, s) {
            const { config: { maxBufferHole: i } } = this, n = Z.bufferInfo(e, t, i);
            if (n.len === 0 && n.nextStart !== void 0) {
                const a = this.fragmentTracker.getBufferedFrag(t, s);
                if (a && n.nextStart < a.end) return Z.bufferInfo(e, t, Math.max(n.nextStart, i));
            }
            return n;
        }
        getMaxBufferLength(e) {
            const { config: t } = this;
            let s;
            return e ? s = Math.max(8 * t.maxBufferSize / e, t.maxBufferLength) : s = t.maxBufferLength, Math.min(s, t.maxMaxBufferLength);
        }
        reduceMaxBufferLength(e, t) {
            const s = this.config, i = Math.max(Math.min(e - t, s.maxBufferLength), t), n = Math.max(e - t * 3, s.maxMaxBufferLength / 2, i);
            return n >= i ? (s.maxMaxBufferLength = n, this.warn(`Reduce max buffer length to ${n}s`), !0) : !1;
        }
        getAppendedFrag(e, t = B.MAIN) {
            const s = this.fragmentTracker.getAppendedFrag(e, B.MAIN);
            return s && "fragment" in s ? s.fragment : s;
        }
        getNextFragment(e, t) {
            const s = t.fragments, i = s.length;
            if (!i) return null;
            const { config: n } = this, a = s[0].start;
            let o;
            if (t.live) {
                const l = n.initialLiveManifestSize;
                if (i < l) return this.warn(`Not enough fragments to start playback (have: ${i}, need: ${l})`), null;
                (!t.PTSKnown && !this.startFragRequested && this.startPosition === -1 || e < a) && (o = this.getInitialLiveFragment(t, s), this.startPosition = this.nextLoadPosition = o ? this.hls.liveSyncPosition || o.start : e);
            } else e <= a && (o = s[0]);
            if (!o) {
                const l = n.lowLatencyMode ? t.partEnd : t.fragmentEnd;
                o = this.getFragmentAtPosition(e, l, t);
            }
            return this.mapToInitFragWhenRequired(o);
        }
        isLoopLoading(e, t) {
            const s = this.fragmentTracker.getState(e);
            return (s === le.OK || s === le.PARTIAL && !!e.gap) && this.nextLoadPosition > t;
        }
        getNextFragmentLoopLoading(e, t, s, i, n) {
            const a = e.gap, o = this.getNextFragment(this.nextLoadPosition, t);
            if (o === null) return o;
            if (e = o, a && e && !e.gap && s.nextStart) {
                const l = this.getFwdBufferInfoAtPos(this.mediaBuffer ? this.mediaBuffer : this.media, s.nextStart, i);
                if (l !== null && s.len + l.len >= n) return this.log(`buffer full after gaps in "${i}" playlist starting at sn: ${e.sn}`), null;
            }
            return e;
        }
        mapToInitFragWhenRequired(e) {
            return e != null && e.initSegment && !(e != null && e.initSegment.data) && !this.bitrateTest ? e.initSegment : e;
        }
        getNextPart(e, t, s) {
            let i = -1, n = !1, a = !0;
            for(let o = 0, l = e.length; o < l; o++){
                const c = e[o];
                if (a = a && !c.independent, i > -1 && s < c.start) break;
                const h = c.loaded;
                h ? i = -1 : (n || c.independent || a) && c.fragment === t && (i = o), n = h;
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
                if (e.hasProgramDateTime && (this.log(`Live playlist, switching playlist, load frag with same PDT: ${s.programDateTime}`), i = El(t, s.endProgramDateTime, this.config.maxFragLookUpTolerance)), !i) {
                    const n = s.sn + 1;
                    if (n >= e.startSN && n <= e.endSN) {
                        const a = t[n - e.startSN];
                        s.cc === a.cc && (i = a, this.log(`Live playlist, switching playlist, load frag with next SN: ${i.sn}`));
                    }
                    i || (i = Sl(t, s.cc), i && this.log(`Live playlist, switching playlist, load frag with same CC: ${i.sn}`));
                }
            } else {
                const n = this.hls.liveSyncPosition;
                n !== null && (i = this.getFragmentAtPosition(n, this.bitrateTest ? e.fragmentEnd : e.edge, e));
            }
            return i;
        }
        getFragmentAtPosition(e, t, s) {
            const { config: i } = this;
            let { fragPrevious: n } = this, { fragments: a, endSN: o } = s;
            const { fragmentHint: l } = s, { maxFragLookUpTolerance: c } = i, h = s.partList, u = !!(i.lowLatencyMode && h != null && h.length && l);
            u && l && !this.bitrateTest && (a = a.concat(l), o = l.sn);
            let d;
            if (e < t) {
                const f = e > t - c ? 0 : c;
                d = Cs(n, a, e, f);
            } else d = a[a.length - 1];
            if (d) {
                const f = d.sn - s.startSN, g = this.fragmentTracker.getState(d);
                if ((g === le.OK || g === le.PARTIAL && d.gap) && (n = d), n && d.sn === n.sn && (!u || h[0].fragment.sn > d.sn) && n && d.level === n.level) {
                    const y = a[f + 1];
                    d.sn < o && this.fragmentTracker.getState(y) !== le.OK ? d = y : d = null;
                }
            }
            return d;
        }
        synchronizeToLiveEdge(e) {
            const { config: t, media: s } = this;
            if (!s) return;
            const i = this.hls.liveSyncPosition, n = s.currentTime, a = e.fragments[0].start, o = e.edge, l = n >= a - t.maxFragLookUpTolerance && n <= o;
            if (i !== null && s.duration > i && (n < i || !l)) {
                const c = t.liveMaxLatencyDuration !== void 0 ? t.liveMaxLatencyDuration : t.liveMaxLatencyDurationCount * e.targetduration;
                (!l && s.readyState < 4 || n < o - c) && (this.loadedmetadata || (this.nextLoadPosition = i), s.readyState && (this.warn(`Playback: ${n.toFixed(3)} is located too far from the end of live sliding playlist: ${o}, reset currentTime to : ${i.toFixed(3)}`), s.currentTime = i));
            }
        }
        alignPlaylists(e, t, s) {
            const i = e.fragments.length;
            if (!i) return this.warn("No fragments in live playlist"), 0;
            const n = e.fragments[0].start, a = !t, o = e.alignedSliding && M(n);
            if (a || !o && !n) {
                const { fragPrevious: l } = this;
                $l(l, s, e);
                const c = e.fragments[0].start;
                return this.log(`Live playlist sliding: ${c.toFixed(2)} start-sn: ${t ? t.startSN : "na"}->${e.startSN} prev-sn: ${l ? l.sn : "na"} fragments: ${i}`), c;
            }
            return n;
        }
        waitForCdnTuneIn(e) {
            return e.live && e.canBlockReload && e.partTarget && e.tuneInGoal > Math.max(e.partHoldBack, e.partTarget * 3);
        }
        setStartPosition(e, t) {
            let s = this.startPosition;
            if (s < t && (s = -1), s === -1 || this.lastCurrentTime === -1) {
                const i = this.startTimeOffset !== null, n = i ? this.startTimeOffset : e.startTimeOffset;
                n !== null && M(n) ? (s = t + n, n < 0 && (s += e.totalduration), s = Math.min(Math.max(t, s), t + e.totalduration), this.log(`Start time offset ${n} found in ${i ? "multivariant" : "media"} playlist, adjust startPosition to ${s}`), this.startPosition = s) : e.live ? s = this.hls.liveSyncPosition || t : this.startPosition = s = 0, this.lastCurrentTime = s;
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
                const h = this.getCurrentContext(t.chunkMeta);
                h && (t.frag = h.frag);
            }
            const s = t.frag;
            if (!s || s.type !== e || !this.levels) return;
            if (this.fragContextChanged(s)) {
                var i;
                this.warn(`Frag load error must match current frag to retry ${s.url} > ${(i = this.fragCurrent) == null ? void 0 : i.url}`);
                return;
            }
            const n = t.details === A.FRAG_GAP;
            n && this.fragmentTracker.fragBuffered(s, !0);
            const a = t.errorAction, { action: o, retryCount: l = 0, retryConfig: c } = a || {};
            if (a && o === de.RetryRequest && c) {
                this.resetStartWhenNotLoaded(this.levelLastLoaded);
                const h = zi(c, l);
                this.warn(`Fragment ${s.sn} of ${e} ${s.level} errored with ${t.details}, retrying loading ${l + 1}/${c.maxNumRetry} in ${h}ms`), a.resolved = !0, this.retryDate = self.performance.now() + h, this.state = C.FRAG_LOADING_WAITING_RETRY;
            } else if (c && a) if (this.resetFragmentErrors(e), l < c.maxNumRetry) !n && o !== de.RemoveAlternatePermanently && (a.resolved = !0);
            else {
                v.warn(`${t.details} reached or exceeded max retry (${l})`);
                return;
            }
            else a?.action === de.SendAlternateToPenaltyBox ? this.state = C.WAITING_LEVEL : this.state = C.ERROR;
            this.tickImmediate();
        }
        reduceLengthAndFlushBuffer(e) {
            if (this.state === C.PARSING || this.state === C.PARSED) {
                const t = e.frag, s = e.parent, i = this.getFwdBufferInfo(this.mediaBuffer, s), n = i && i.len > .5;
                n && this.reduceMaxBufferLength(i.len, t?.duration || 10);
                const a = !n;
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
            var n;
            const a = s.details;
            if (!a) {
                this.warn("level.details undefined");
                return;
            }
            if (!Object.keys(e.elementaryStreams).reduce((l, c)=>{
                const h = e.elementaryStreams[c];
                if (h) {
                    const u = h.endPTS - h.startPTS;
                    if (u <= 0) return this.warn(`Could not parse fragment ${e.sn} ${c} duration reliably (${u})`), l || !1;
                    const d = i ? 0 : jr(a, e, h.startPTS, h.endPTS, h.startDTS, h.endDTS);
                    return this.hls.trigger(p.LEVEL_PTS_UPDATED, {
                        details: a,
                        level: s,
                        drift: d,
                        type: c,
                        frag: e,
                        start: h.startPTS,
                        end: h.endPTS
                    }), !0;
                }
                return l;
            }, !1) && ((n = this.transmuxer) == null ? void 0 : n.error) === null) {
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
    class ta {
        constructor(){
            this.chunks = [], this.dataLength = 0;
        }
        push(e) {
            this.chunks.push(e), this.dataLength += e.length;
        }
        flush() {
            const { chunks: e, dataLength: t } = this;
            let s;
            if (e.length) e.length === 1 ? s = e[0] : s = zl(e, t);
            else return new Uint8Array(0);
            return this.reset(), s;
        }
        reset() {
            this.chunks.length = 0, this.dataLength = 0;
        }
    }
    function zl(r, e) {
        const t = new Uint8Array(e);
        let s = 0;
        for(let i = 0; i < r.length; i++){
            const n = r[i];
            t.set(n, s), s += n.length;
        }
        return t;
    }
    function Xl() {
        return typeof __HLS_WORKER_BUNDLE__ == "function";
    }
    function Ql() {
        const r = new self.Blob([
            `var exports={};var module={exports:exports};function define(f){f()};define.amd=true;(${__HLS_WORKER_BUNDLE__.toString()})(true);`
        ], {
            type: "text/javascript"
        }), e = self.URL.createObjectURL(r);
        return {
            worker: new self.Worker(e),
            objectURL: e
        };
    }
    function Jl(r) {
        const e = new self.URL(r, self.location.href).href;
        return {
            worker: new self.Worker(e),
            scriptURL: e
        };
    }
    function Ue(r = "", e = 9e4) {
        return {
            type: r,
            id: -1,
            pid: -1,
            inputTimeScale: e,
            sequenceNumber: -1,
            samples: [],
            dropped: 0
        };
    }
    class en {
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
            this.cachedData && (e = be(this.cachedData, e), this.cachedData = null);
            let s = Vt(e, 0), i = s ? s.length : 0, n;
            const a = this._audioTrack, o = this._id3Track, l = s ? ji(s) : void 0, c = e.length;
            for((this.basePTS === null || this.frameIndex === 0 && M(l)) && (this.basePTS = Zl(l, t, this.initPTS), this.lastPTS = this.basePTS), this.lastPTS === null && (this.lastPTS = this.basePTS), s && s.length > 0 && o.samples.push({
                pts: this.lastPTS,
                dts: this.lastPTS,
                data: s,
                type: ke.audioId3,
                duration: Number.POSITIVE_INFINITY
            }); i < c;){
                if (this.canParse(e, i)) {
                    const h = this.appendFrame(a, e, i);
                    h ? (this.frameIndex++, this.lastPTS = h.sample.pts, i += h.length, n = i) : i = c;
                } else So(e, i) ? (s = Vt(e, i), o.samples.push({
                    pts: this.lastPTS,
                    dts: this.lastPTS,
                    data: s,
                    type: ke.audioId3,
                    duration: Number.POSITIVE_INFINITY
                }), i += s.length, n = i) : i++;
                if (i === c && n !== c) {
                    const h = ct(e, n);
                    this.cachedData ? this.cachedData = be(this.cachedData, h) : this.cachedData = h;
                }
            }
            return {
                audioTrack: a,
                videoTrack: Ue(),
                id3Track: o,
                textTrack: Ue()
            };
        }
        demuxSampleAes(e, t, s) {
            return Promise.reject(new Error(`[${this}] This demuxer does not support Sample-AES decryption`));
        }
        flush(e) {
            const t = this.cachedData;
            return t && (this.cachedData = null, this.demux(t, 0)), {
                audioTrack: this._audioTrack,
                videoTrack: Ue(),
                id3Track: this._id3Track,
                textTrack: Ue()
            };
        }
        destroy() {}
    }
    const Zl = (r, e, t)=>{
        if (M(r)) return r * 90;
        const s = t ? t.baseTime * 9e4 / t.timescale : 0;
        return e * 9e4 + s;
    };
    function ec(r, e, t, s) {
        let i, n, a, o;
        const l = navigator.userAgent.toLowerCase(), c = s, h = [
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
        if (u > h.length - 1) {
            const d = new Error(`invalid ADTS sampling index:${u}`);
            r.emit(p.ERROR, p.ERROR, {
                type: G.MEDIA_ERROR,
                details: A.FRAG_PARSING_ERROR,
                fatal: !0,
                error: d,
                reason: d.message
            });
            return;
        }
        return a = (e[t + 2] & 1) << 2, a |= (e[t + 3] & 192) >>> 6, v.log(`manifest codec:${s}, ADTS type:${i}, samplingIndex:${u}`), /firefox/i.test(l) ? u >= 6 ? (i = 5, o = new Array(4), n = u - 3) : (i = 2, o = new Array(2), n = u) : l.indexOf("android") !== -1 ? (i = 2, o = new Array(2), n = u) : (i = 5, o = new Array(4), s && (s.indexOf("mp4a.40.29") !== -1 || s.indexOf("mp4a.40.5") !== -1) || !s && u >= 6 ? n = u - 3 : ((s && s.indexOf("mp4a.40.2") !== -1 && (u >= 6 && a === 1 || /vivaldi/i.test(l)) || !s && a === 1) && (i = 2, o = new Array(2)), n = u)), o[0] = i << 3, o[0] |= (u & 14) >> 1, o[1] |= (u & 1) << 7, o[1] |= a << 3, i === 5 && (o[1] |= (n & 14) >> 1, o[2] = (n & 1) << 7, o[2] |= 8, o[3] = 0), {
            config: o,
            samplerate: h[u],
            channelCount: a,
            codec: "mp4a.40." + i,
            manifestCodec: c
        };
    }
    function sa(r, e) {
        return r[e] === 255 && (r[e + 1] & 246) === 240;
    }
    function ia(r, e) {
        return r[e + 1] & 1 ? 7 : 9;
    }
    function tn(r, e) {
        return (r[e + 3] & 3) << 11 | r[e + 4] << 3 | (r[e + 5] & 224) >>> 5;
    }
    function tc(r, e) {
        return e + 5 < r.length;
    }
    function ws(r, e) {
        return e + 1 < r.length && sa(r, e);
    }
    function sc(r, e) {
        return tc(r, e) && sa(r, e) && tn(r, e) <= r.length - e;
    }
    function ic(r, e) {
        if (ws(r, e)) {
            const t = ia(r, e);
            if (e + t >= r.length) return !1;
            const s = tn(r, e);
            if (s <= t) return !1;
            const i = e + s;
            return i === r.length || ws(r, i);
        }
        return !1;
    }
    function na(r, e, t, s, i) {
        if (!r.samplerate) {
            const n = ec(e, t, s, i);
            if (!n) return;
            r.config = n.config, r.samplerate = n.samplerate, r.channelCount = n.channelCount, r.codec = n.codec, r.manifestCodec = n.manifestCodec, v.log(`parsed codec:${r.codec}, rate:${n.samplerate}, channels:${n.channelCount}`);
        }
    }
    function ra(r) {
        return 1024 * 9e4 / r;
    }
    function nc(r, e) {
        const t = ia(r, e);
        if (e + t <= r.length) {
            const s = tn(r, e) - t;
            if (s > 0) return {
                headerLength: t,
                frameLength: s
            };
        }
    }
    function aa(r, e, t, s, i) {
        const n = ra(r.samplerate), a = s + i * n, o = nc(e, t);
        let l;
        if (o) {
            const { frameLength: u, headerLength: d } = o, f = d + u, g = Math.max(0, t + f - e.length);
            g ? (l = new Uint8Array(f - d), l.set(e.subarray(t + d, e.length), 0)) : l = e.subarray(t + d, t + f);
            const m = {
                unit: l,
                pts: a
            };
            return g || r.samples.push(m), {
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
    let es = null;
    const rc = [
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
    ], ac = [
        44100,
        48e3,
        32e3,
        22050,
        24e3,
        16e3,
        11025,
        12e3,
        8e3
    ], oc = [
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
    ], lc = [
        0,
        1,
        1,
        4
    ];
    function oa(r, e, t, s, i) {
        if (t + 24 > e.length) return;
        const n = la(e, t);
        if (n && t + n.frameLength <= e.length) {
            const a = n.samplesPerFrame * 9e4 / n.sampleRate, o = s + i * a, l = {
                unit: e.subarray(t, t + n.frameLength),
                pts: o,
                dts: o
            };
            return r.config = [], r.channelCount = n.channelCount, r.samplerate = n.sampleRate, r.samples.push(l), {
                sample: l,
                length: n.frameLength,
                missing: 0
            };
        }
    }
    function la(r, e) {
        const t = r[e + 1] >> 3 & 3, s = r[e + 1] >> 1 & 3, i = r[e + 2] >> 4 & 15, n = r[e + 2] >> 2 & 3;
        if (t !== 1 && i !== 0 && i !== 15 && n !== 3) {
            const a = r[e + 2] >> 1 & 1, o = r[e + 3] >> 6, l = t === 3 ? 3 - s : s === 3 ? 3 : 4, c = rc[l * 14 + i - 1] * 1e3, u = ac[(t === 3 ? 0 : t === 2 ? 1 : 2) * 3 + n], d = o === 3 ? 1 : 2, f = oc[t][s], g = lc[s], m = f * 8 * g, y = Math.floor(f * c / u + a) * g;
            if (es === null) {
                const T = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
                es = T ? parseInt(T[1]) : 0;
            }
            return !!es && es <= 87 && s === 2 && c >= 224e3 && o === 0 && (r[e + 3] = r[e + 3] | 128), {
                sampleRate: u,
                channelCount: d,
                frameLength: y,
                samplesPerFrame: m
            };
        }
    }
    function sn(r, e) {
        return r[e] === 255 && (r[e + 1] & 224) === 224 && (r[e + 1] & 6) !== 0;
    }
    function ca(r, e) {
        return e + 1 < r.length && sn(r, e);
    }
    function cc(r, e) {
        return sn(r, e) && 4 <= r.length - e;
    }
    function ha(r, e) {
        if (e + 1 < r.length && sn(r, e)) {
            const s = la(r, e);
            let i = 4;
            s != null && s.frameLength && (i = s.frameLength);
            const n = e + i;
            return n === r.length || ca(r, n);
        }
        return !1;
    }
    class hc extends en {
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
            const t = Vt(e, 0);
            let s = t?.length || 0;
            if (ha(e, s)) return !1;
            for(let i = e.length; s < i; s++)if (ic(e, s)) return v.log("ADTS sync word found !"), !0;
            return !1;
        }
        canParse(e, t) {
            return sc(e, t);
        }
        appendFrame(e, t, s) {
            na(e, this.observer, t, s, e.manifestCodec);
            const i = aa(e, t, s, this.basePTS, this.frameIndex);
            if (i && i.missing === 0) return i;
        }
    }
    const uc = /\/emsg[-/]ID3/i;
    class dc {
        constructor(e, t){
            this.remainderData = null, this.timeOffset = 0, this.config = void 0, this.videoTrack = void 0, this.audioTrack = void 0, this.id3Track = void 0, this.txtTrack = void 0, this.config = t;
        }
        resetTimeStamp() {}
        resetInitSegment(e, t, s, i) {
            const n = this.videoTrack = Ue("video", 1), a = this.audioTrack = Ue("audio", 1), o = this.txtTrack = Ue("text", 1);
            if (this.id3Track = Ue("id3", 1), this.timeOffset = 0, !(e != null && e.byteLength)) return;
            const l = $r(e);
            if (l.video) {
                const { id: c, timescale: h, codec: u } = l.video;
                n.id = c, n.timescale = o.timescale = h, n.codec = u;
            }
            if (l.audio) {
                const { id: c, timescale: h, codec: u } = l.audio;
                a.id = c, a.timescale = h, a.codec = u;
            }
            o.id = Nr.text, n.sampleDuration = 0, n.duration = a.duration = i;
        }
        resetContiguity() {
            this.remainderData = null;
        }
        static probe(e) {
            return _o(e);
        }
        demux(e, t) {
            this.timeOffset = t;
            let s = e;
            const i = this.videoTrack, n = this.txtTrack;
            if (this.config.progressive) {
                this.remainderData && (s = be(this.remainderData, e));
                const o = Uo(s);
                this.remainderData = o.remainder, i.samples = o.valid || new Uint8Array;
            } else i.samples = s;
            const a = this.extractID3Track(i, t);
            return n.samples = xn(t, i), {
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
            return s.samples = xn(e, t), {
                videoTrack: t,
                audioTrack: Ue(),
                id3Track: i,
                textTrack: Ue()
            };
        }
        extractID3Track(e, t) {
            const s = this.id3Track;
            if (e.samples.length) {
                const i = W(e.samples, [
                    "emsg"
                ]);
                i && i.forEach((n)=>{
                    const a = Go(n);
                    if (uc.test(a.schemeIdUri)) {
                        const o = M(a.presentationTime) ? a.presentationTime / a.timeScale : t + a.presentationTimeDelta / a.timeScale;
                        let l = a.eventDuration === 4294967295 ? Number.POSITIVE_INFINITY : a.eventDuration / a.timeScale;
                        l <= .001 && (l = Number.POSITIVE_INFINITY);
                        const c = a.payload;
                        s.samples.push({
                            data: c,
                            len: c.byteLength,
                            dts: o,
                            pts: o,
                            type: ke.emsg,
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
    const ua = (r, e)=>{
        let t = 0, s = 5;
        e += s;
        const i = new Uint32Array(1), n = new Uint32Array(1), a = new Uint8Array(1);
        for(; s > 0;){
            a[0] = r[e];
            const o = Math.min(s, 8), l = 8 - o;
            n[0] = 4278190080 >>> 24 + l << l, i[0] = (a[0] & n[0]) >> l, t = t ? t << o | i[0] : i[0], e += 1, s -= o;
        }
        return t;
    };
    class fc extends en {
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
            const i = da(e, t, s, this.basePTS, this.frameIndex);
            if (i !== -1) return {
                sample: e.samples[e.samples.length - 1],
                length: i,
                missing: 0
            };
        }
        static probe(e) {
            if (!e) return !1;
            const t = Vt(e, 0);
            if (!t) return !1;
            const s = t.length;
            return e[s] === 11 && e[s + 1] === 119 && ji(t) !== void 0 && ua(e, s) < 16;
        }
    }
    function da(r, e, t, s, i) {
        if (t + 8 > e.length || e[t] !== 11 || e[t + 1] !== 119) return -1;
        const n = e[t + 4] >> 6;
        if (n >= 3) return -1;
        const o = [
            48e3,
            44100,
            32e3
        ][n], l = e[t + 4] & 63, h = [
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
        ][l * 3 + n] * 2;
        if (t + h > e.length) return -1;
        const u = e[t + 6] >> 5;
        let d = 0;
        u === 2 ? d += 2 : (u & 1 && u !== 1 && (d += 2), u & 4 && (d += 2));
        const f = (e[t + 6] << 8 | e[t + 7]) >> 12 - d & 1, m = [
            2,
            1,
            2,
            3,
            3,
            4,
            4,
            5
        ][u] + f, y = e[t + 5] >> 3, E = e[t + 5] & 7, x = new Uint8Array([
            n << 6 | y << 1 | E >> 2,
            (E & 3) << 6 | u << 3 | f << 2 | l >> 4,
            l << 4 & 224
        ]), T = 1536 / o * 9e4, b = s + i * T, S = e.subarray(t, t + h);
        return r.config = x, r.channelCount = m, r.samplerate = o, r.samples.push({
            unit: S,
            pts: b
        }), h;
    }
    class gc {
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
                const n = s.units;
                i = n[n.length - 1];
            }
            return i;
        }
        pushAccessUnit(e, t) {
            if (e.units.length && e.frame) {
                if (e.pts === void 0) {
                    const s = t.samples, i = s.length;
                    if (i) {
                        const n = s[i - 1];
                        e.pts = n.pts, e.dts = n.dts;
                    } else {
                        t.dropped++;
                        return;
                    }
                }
                t.samples.push(e);
            }
            e.debug.length && v.log(e.pts + "/" + e.dts + ":" + e.debug);
        }
    }
    class jn {
        constructor(e){
            this.data = void 0, this.bytesAvailable = void 0, this.word = void 0, this.bitsAvailable = void 0, this.data = e, this.bytesAvailable = e.byteLength, this.word = 0, this.bitsAvailable = 0;
        }
        loadWord() {
            const e = this.data, t = this.bytesAvailable, s = e.byteLength - t, i = new Uint8Array(4), n = Math.min(4, t);
            if (n === 0) throw new Error("no bytes available");
            i.set(e.subarray(s, s + n)), this.word = new DataView(i.buffer).getUint32(0), this.bitsAvailable = n * 8, this.bytesAvailable -= n;
        }
        skipBits(e) {
            let t;
            e = Math.min(e, this.bytesAvailable * 8 + this.bitsAvailable), this.bitsAvailable > e ? (this.word <<= e, this.bitsAvailable -= e) : (e -= this.bitsAvailable, t = e >> 3, e -= t << 3, this.bytesAvailable -= t, this.loadWord(), this.word <<= e, this.bitsAvailable -= e);
        }
        readBits(e) {
            let t = Math.min(this.bitsAvailable, e);
            const s = this.word >>> 32 - t;
            if (e > 32 && v.error("Cannot read more than 32 bits at a time"), this.bitsAvailable -= t, this.bitsAvailable > 0) this.word <<= t;
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
            for(let n = 0; n < e; n++)s !== 0 && (i = this.readEG(), s = (t + i + 256) % 256), t = s === 0 ? t : s;
        }
        readSPS() {
            let e = 0, t = 0, s = 0, i = 0, n, a, o;
            const l = this.readUByte.bind(this), c = this.readBits.bind(this), h = this.readUEG.bind(this), u = this.readBoolean.bind(this), d = this.skipBits.bind(this), f = this.skipEG.bind(this), g = this.skipUEG.bind(this), m = this.skipScalingList.bind(this);
            l();
            const y = l();
            if (c(5), d(3), l(), g(), y === 100 || y === 110 || y === 122 || y === 244 || y === 44 || y === 83 || y === 86 || y === 118 || y === 128) {
                const D = h();
                if (D === 3 && d(1), g(), g(), d(1), u()) for(a = D !== 3 ? 8 : 12, o = 0; o < a; o++)u() && (o < 6 ? m(16) : m(64));
            }
            g();
            const E = h();
            if (E === 0) h();
            else if (E === 1) for(d(1), f(), f(), n = h(), o = 0; o < n; o++)f();
            g(), d(1);
            const x = h(), T = h(), b = c(1);
            b === 0 && d(1), d(1), u() && (e = h(), t = h(), s = h(), i = h());
            let S = [
                1,
                1
            ];
            if (u() && u()) switch(l()){
                case 1:
                    S = [
                        1,
                        1
                    ];
                    break;
                case 2:
                    S = [
                        12,
                        11
                    ];
                    break;
                case 3:
                    S = [
                        10,
                        11
                    ];
                    break;
                case 4:
                    S = [
                        16,
                        11
                    ];
                    break;
                case 5:
                    S = [
                        40,
                        33
                    ];
                    break;
                case 6:
                    S = [
                        24,
                        11
                    ];
                    break;
                case 7:
                    S = [
                        20,
                        11
                    ];
                    break;
                case 8:
                    S = [
                        32,
                        11
                    ];
                    break;
                case 9:
                    S = [
                        80,
                        33
                    ];
                    break;
                case 10:
                    S = [
                        18,
                        11
                    ];
                    break;
                case 11:
                    S = [
                        15,
                        11
                    ];
                    break;
                case 12:
                    S = [
                        64,
                        33
                    ];
                    break;
                case 13:
                    S = [
                        160,
                        99
                    ];
                    break;
                case 14:
                    S = [
                        4,
                        3
                    ];
                    break;
                case 15:
                    S = [
                        3,
                        2
                    ];
                    break;
                case 16:
                    S = [
                        2,
                        1
                    ];
                    break;
                case 255:
                    {
                        S = [
                            l() << 8 | l(),
                            l() << 8 | l()
                        ];
                        break;
                    }
            }
            return {
                width: Math.ceil((x + 1) * 16 - e * 2 - t * 2),
                height: (2 - b) * (T + 1) * 16 - (b ? 2 : 4) * (s + i),
                pixelRatio: S
            };
        }
        readSliceType() {
            return this.readUByte(), this.readUEG(), this.readUEG();
        }
    }
    class mc extends gc {
        parseAVCPES(e, t, s, i, n) {
            const a = this.parseAVCNALu(e, s.data);
            let o = this.VideoSample, l, c = !1;
            s.data = null, o && a.length && !e.audFound && (this.pushAccessUnit(o, e), o = this.VideoSample = this.createVideoSample(!1, s.pts, s.dts, "")), a.forEach((h)=>{
                var u;
                switch(h.type){
                    case 1:
                        {
                            let m = !1;
                            l = !0;
                            const y = h.data;
                            if (c && y.length > 4) {
                                const E = new jn(y).readSliceType();
                                (E === 2 || E === 4 || E === 7 || E === 9) && (m = !0);
                            }
                            if (m) {
                                var d;
                                (d = o) != null && d.frame && !o.key && (this.pushAccessUnit(o, e), o = this.VideoSample = null);
                            }
                            o || (o = this.VideoSample = this.createVideoSample(!0, s.pts, s.dts, "")), o.frame = !0, o.key = m;
                            break;
                        }
                    case 5:
                        l = !0, (u = o) != null && u.frame && !o.key && (this.pushAccessUnit(o, e), o = this.VideoSample = null), o || (o = this.VideoSample = this.createVideoSample(!0, s.pts, s.dts, "")), o.key = !0, o.frame = !0;
                        break;
                    case 6:
                        {
                            l = !0, Kr(h.data, 1, s.pts, t.samples);
                            break;
                        }
                    case 7:
                        {
                            var f, g;
                            l = !0, c = !0;
                            const m = h.data, E = new jn(m).readSPS();
                            if (!e.sps || e.width !== E.width || e.height !== E.height || ((f = e.pixelRatio) == null ? void 0 : f[0]) !== E.pixelRatio[0] || ((g = e.pixelRatio) == null ? void 0 : g[1]) !== E.pixelRatio[1]) {
                                e.width = E.width, e.height = E.height, e.pixelRatio = E.pixelRatio, e.sps = [
                                    m
                                ], e.duration = n;
                                const x = m.subarray(1, 4);
                                let T = "avc1.";
                                for(let b = 0; b < 3; b++){
                                    let S = x[b].toString(16);
                                    S.length < 2 && (S = "0" + S), T += S;
                                }
                                e.codec = T;
                            }
                            break;
                        }
                    case 8:
                        l = !0, e.pps = [
                            h.data
                        ];
                        break;
                    case 9:
                        l = !0, e.audFound = !0, o && this.pushAccessUnit(o, e), o = this.VideoSample = this.createVideoSample(!1, s.pts, s.dts, "");
                        break;
                    case 12:
                        l = !0;
                        break;
                    default:
                        l = !1, o && (o.debug += "unknown NAL " + h.type + " ");
                        break;
                }
                o && l && o.units.push(h);
            }), i && o && (this.pushAccessUnit(o, e), this.VideoSample = null);
        }
        parseAVCNALu(e, t) {
            const s = t.byteLength;
            let i = e.naluState || 0;
            const n = i, a = [];
            let o = 0, l, c, h, u = -1, d = 0;
            for(i === -1 && (u = 0, d = t[0] & 31, i = 0, o = 1); o < s;){
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
                            type: d
                        };
                        a.push(f);
                    } else {
                        const f = this.getLastNalUnit(e.samples);
                        f && (n && o <= 4 - n && f.state && (f.data = f.data.subarray(0, f.data.byteLength - n)), c > 0 && (f.data = be(f.data, t.subarray(0, c)), f.state = 0));
                    }
                    o < s ? (h = t[o] & 31, u = o, d = h, i = 0) : i = -1;
                } else i = 0;
            }
            if (u >= 0 && i >= 0) {
                const f = {
                    data: t.subarray(u, s),
                    type: d,
                    state: i
                };
                a.push(f);
            }
            if (a.length === 0) {
                const f = this.getLastNalUnit(e.samples);
                f && (f.data = be(f.data, t));
            }
            return e.naluState = i, a;
        }
    }
    class pc {
        constructor(e, t, s){
            this.keyData = void 0, this.decrypter = void 0, this.keyData = s, this.decrypter = new Ji(t, {
                removePKCS7Padding: !1
            });
        }
        decryptBuffer(e) {
            return this.decrypter.decrypt(e, this.keyData.key.buffer, this.keyData.iv.buffer);
        }
        decryptAacSample(e, t, s) {
            const i = e[t].unit;
            if (i.length <= 16) return;
            const n = i.subarray(16, i.length - i.length % 16), a = n.buffer.slice(n.byteOffset, n.byteOffset + n.length);
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
            for(let n = 32; n < e.length - 16; n += 160, i += 16)s.set(e.subarray(n, n + 16), i);
            return s;
        }
        getAvcDecryptedUnit(e, t) {
            const s = new Uint8Array(t);
            let i = 0;
            for(let n = 32; n < e.length - 16; n += 160, i += 16)e.set(s.subarray(i, i + 16), n);
            return e;
        }
        decryptAvcSample(e, t, s, i, n) {
            const a = Hr(n.data), o = this.getAvcEncryptedData(a);
            this.decryptBuffer(o.buffer).then((l)=>{
                n.data = this.getAvcDecryptedUnit(a, l), this.decrypter.isSync() || this.decryptAvcSamples(e, t, s + 1, i);
            });
        }
        decryptAvcSamples(e, t, s, i) {
            if (e instanceof Uint8Array) throw new Error("Cannot decrypt samples of type Uint8Array");
            for(;; t++, s = 0){
                if (t >= e.length) {
                    i();
                    return;
                }
                const n = e[t].units;
                for(; !(s >= n.length); s++){
                    const a = n[s];
                    if (!(a.data.length <= 48 || a.type !== 1 && a.type !== 5) && (this.decryptAvcSample(e, t, s, i, a), !this.decrypter.isSync())) return;
                }
            }
        }
    }
    const oe = 188;
    class Ze {
        constructor(e, t, s){
            this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.sampleAes = null, this.pmtParsed = !1, this.audioCodec = void 0, this.videoCodec = void 0, this._duration = 0, this._pmtId = -1, this._videoTrack = void 0, this._audioTrack = void 0, this._id3Track = void 0, this._txtTrack = void 0, this.aacOverFlow = null, this.remainderData = null, this.videoParser = void 0, this.observer = e, this.config = t, this.typeSupported = s, this.videoParser = new mc;
        }
        static probe(e) {
            const t = Ze.syncOffset(e);
            return t > 0 && v.warn(`MPEG2-TS detected but first sync word found @ offset ${t}`), t !== -1;
        }
        static syncOffset(e) {
            const t = e.length;
            let s = Math.min(oe * 5, t - oe) + 1, i = 0;
            for(; i < s;){
                let n = !1, a = -1, o = 0;
                for(let l = i; l < t; l += oe)if (e[l] === 71 && (t - l === oe || e[l + oe] === 71)) {
                    if (o++, a === -1 && (a = l, a !== 0 && (s = Math.min(a + oe * 99, e.length - oe) + 1)), n || (n = ki(e, l) === 0), n && o > 1 && (a === 0 && o > 2 || l + oe > s)) return a;
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
                id: Nr[e],
                pid: -1,
                inputTimeScale: 9e4,
                sequenceNumber: 0,
                samples: [],
                dropped: 0,
                duration: e === "audio" ? t : void 0
            };
        }
        resetInitSegment(e, t, s, i) {
            this.pmtParsed = !1, this._pmtId = -1, this._videoTrack = Ze.createTrack("video"), this._audioTrack = Ze.createTrack("audio", i), this._id3Track = Ze.createTrack("id3"), this._txtTrack = Ze.createTrack("text"), this._audioTrack.segmentCodec = "aac", this.aacOverFlow = null, this.remainderData = null, this.audioCodec = t, this.videoCodec = s, this._duration = i;
        }
        resetTimeStamp() {}
        resetContiguity() {
            const { _audioTrack: e, _videoTrack: t, _id3Track: s } = this;
            e && (e.pesData = null), t && (t.pesData = null), s && (s.pesData = null), this.aacOverFlow = null, this.remainderData = null;
        }
        demux(e, t, s = !1, i = !1) {
            s || (this.sampleAes = null);
            let n;
            const a = this._videoTrack, o = this._audioTrack, l = this._id3Track, c = this._txtTrack;
            let h = a.pid, u = a.pesData, d = o.pid, f = l.pid, g = o.pesData, m = l.pesData, y = null, E = this.pmtParsed, x = this._pmtId, T = e.length;
            if (this.remainderData && (e = be(this.remainderData, e), T = e.length, this.remainderData = null), T < oe && !i) return this.remainderData = e, {
                audioTrack: o,
                videoTrack: a,
                id3Track: l,
                textTrack: c
            };
            const b = Math.max(0, Ze.syncOffset(e));
            T -= (T - b) % oe, T < e.byteLength && !i && (this.remainderData = new Uint8Array(e.buffer, T, e.buffer.byteLength - T));
            let S = 0;
            for(let R = b; R < T; R += oe)if (e[R] === 71) {
                const _ = !!(e[R + 1] & 64), P = ki(e, R), I = (e[R + 3] & 48) >> 4;
                let w;
                if (I > 1) {
                    if (w = R + 5 + e[R + 4], w === R + oe) continue;
                } else w = R + 4;
                switch(P){
                    case h:
                        _ && (u && (n = Et(u)) && this.videoParser.parseAVCPES(a, c, n, !1, this._duration), u = {
                            data: [],
                            size: 0
                        }), u && (u.data.push(e.subarray(w, R + oe)), u.size += R + oe - w);
                        break;
                    case d:
                        if (_) {
                            if (g && (n = Et(g))) switch(o.segmentCodec){
                                case "aac":
                                    this.parseAACPES(o, n);
                                    break;
                                case "mp3":
                                    this.parseMPEGPES(o, n);
                                    break;
                                case "ac3":
                                    this.parseAC3PES(o, n);
                                    break;
                            }
                            g = {
                                data: [],
                                size: 0
                            };
                        }
                        g && (g.data.push(e.subarray(w, R + oe)), g.size += R + oe - w);
                        break;
                    case f:
                        _ && (m && (n = Et(m)) && this.parseID3PES(l, n), m = {
                            data: [],
                            size: 0
                        }), m && (m.data.push(e.subarray(w, R + oe)), m.size += R + oe - w);
                        break;
                    case 0:
                        _ && (w += e[w] + 1), x = this._pmtId = yc(e, w);
                        break;
                    case x:
                        {
                            _ && (w += e[w] + 1);
                            const V = Ec(e, w, this.typeSupported, s, this.observer);
                            h = V.videoPid, h > 0 && (a.pid = h, a.segmentCodec = V.segmentVideoCodec), d = V.audioPid, d > 0 && (o.pid = d, o.segmentCodec = V.segmentAudioCodec), f = V.id3Pid, f > 0 && (l.pid = f), y !== null && !E && (v.warn(`MPEG-TS PMT found at ${R} after unknown PID '${y}'. Backtracking to sync byte @${b} to parse all TS packets.`), y = null, R = b - 188), E = this.pmtParsed = !0;
                            break;
                        }
                    case 17:
                    case 8191:
                        break;
                    default:
                        y = P;
                        break;
                }
            } else S++;
            S > 0 && ks(this.observer, new Error(`Found ${S} TS packet/s that do not start with 0x47`)), a.pesData = u, o.pesData = g, l.pesData = m;
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
            const { audioTrack: t, videoTrack: s, id3Track: i, textTrack: n } = e, a = s.pesData, o = t.pesData, l = i.pesData;
            let c;
            if (a && (c = Et(a)) ? (this.videoParser.parseAVCPES(s, n, c, !0, this._duration), s.pesData = null) : s.pesData = a, o && (c = Et(o))) {
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
            } else o != null && o.size && v.log("last AAC PES packet truncated,might overlap between fragments"), t.pesData = o;
            l && (c = Et(l)) ? (this.parseID3PES(i, c), i.pesData = null) : i.pesData = l;
        }
        demuxSampleAes(e, t, s) {
            const i = this.demux(e, s, !0, !this.config.progressive), n = this.sampleAes = new pc(this.observer, this.config, t);
            return this.decrypt(i, n);
        }
        decrypt(e, t) {
            return new Promise((s)=>{
                const { audioTrack: i, videoTrack: n } = e;
                i.samples && i.segmentCodec === "aac" ? t.decryptAacSamples(i.samples, 0, ()=>{
                    n.samples ? t.decryptAvcSamples(n.samples, 0, 0, ()=>{
                        s(e);
                    }) : s(e);
                }) : n.samples && t.decryptAvcSamples(n.samples, 0, 0, ()=>{
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
            let n = t.data;
            if (i) {
                this.aacOverFlow = null;
                const u = i.missing, d = i.sample.unit.byteLength;
                if (u === -1) n = be(i.sample.unit, n);
                else {
                    const f = d - u;
                    i.sample.unit.set(n.subarray(0, u), f), e.samples.push(i.sample), s = i.missing;
                }
            }
            let a, o;
            for(a = s, o = n.length; a < o - 1 && !ws(n, a); a++);
            if (a !== s) {
                let u;
                const d = a < o - 1;
                if (d ? u = `AAC PES did not start with ADTS header,offset:${a}` : u = "No ADTS header found in AAC PES", ks(this.observer, new Error(u), d), !d) return;
            }
            na(e, this.observer, n, a, this.audioCodec);
            let l;
            if (t.pts !== void 0) l = t.pts;
            else if (i) {
                const u = ra(e.samplerate);
                l = i.sample.pts + u;
            } else {
                v.warn("[tsdemuxer]: AAC PES unknown PTS");
                return;
            }
            let c = 0, h;
            for(; a < o;)if (h = aa(e, n, a, l, c), a += h.length, h.missing) {
                this.aacOverFlow = h;
                break;
            } else for(c++; a < o - 1 && !ws(n, a); a++);
        }
        parseMPEGPES(e, t) {
            const s = t.data, i = s.length;
            let n = 0, a = 0;
            const o = t.pts;
            if (o === void 0) {
                v.warn("[tsdemuxer]: MPEG PES unknown PTS");
                return;
            }
            for(; a < i;)if (ca(s, a)) {
                const l = oa(e, s, a, o, n);
                if (l) a += l.length, n++;
                else break;
            } else a++;
        }
        parseAC3PES(e, t) {
            {
                const s = t.data, i = t.pts;
                if (i === void 0) {
                    v.warn("[tsdemuxer]: AC3 PES unknown PTS");
                    return;
                }
                const n = s.length;
                let a = 0, o = 0, l;
                for(; o < n && (l = da(e, s, o, i, a++)) > 0;)o += l;
            }
        }
        parseID3PES(e, t) {
            if (t.pts === void 0) {
                v.warn("[tsdemuxer]: ID3 PES unknown PTS");
                return;
            }
            const s = ne({}, t, {
                type: this._videoTrack ? ke.emsg : ke.audioId3,
                duration: Number.POSITIVE_INFINITY
            });
            e.samples.push(s);
        }
    }
    function ki(r, e) {
        return ((r[e + 1] & 31) << 8) + r[e + 2];
    }
    function yc(r, e) {
        return (r[e + 10] & 31) << 8 | r[e + 11];
    }
    function Ec(r, e, t, s, i) {
        const n = {
            audioPid: -1,
            videoPid: -1,
            id3Pid: -1,
            segmentVideoCodec: "avc",
            segmentAudioCodec: "aac"
        }, a = (r[e + 1] & 15) << 8 | r[e + 2], o = e + 3 + a - 4, l = (r[e + 10] & 15) << 8 | r[e + 11];
        for(e += 12 + l; e < o;){
            const c = ki(r, e), h = (r[e + 3] & 15) << 8 | r[e + 4];
            switch(r[e]){
                case 207:
                    if (!s) {
                        ii("ADTS AAC");
                        break;
                    }
                case 15:
                    n.audioPid === -1 && (n.audioPid = c);
                    break;
                case 21:
                    n.id3Pid === -1 && (n.id3Pid = c);
                    break;
                case 219:
                    if (!s) {
                        ii("H.264");
                        break;
                    }
                case 27:
                    n.videoPid === -1 && (n.videoPid = c, n.segmentVideoCodec = "avc");
                    break;
                case 3:
                case 4:
                    !t.mpeg && !t.mp3 ? v.log("MPEG audio found, not supported in this browser") : n.audioPid === -1 && (n.audioPid = c, n.segmentAudioCodec = "mp3");
                    break;
                case 193:
                    if (!s) {
                        ii("AC-3");
                        break;
                    }
                case 129:
                    t.ac3 ? n.audioPid === -1 && (n.audioPid = c, n.segmentAudioCodec = "ac3") : v.log("AC-3 audio found, not supported in this browser");
                    break;
                case 6:
                    if (n.audioPid === -1 && h > 0) {
                        let u = e + 5, d = h;
                        for(; d > 2;){
                            switch(r[u]){
                                case 106:
                                    t.ac3 !== !0 ? v.log("AC-3 audio found, not supported in this browser for now") : (n.audioPid = c, n.segmentAudioCodec = "ac3");
                                    break;
                            }
                            const g = r[u + 1] + 2;
                            u += g, d -= g;
                        }
                    }
                    break;
                case 194:
                case 135:
                    return ks(i, new Error("Unsupported EC-3 in M2TS found")), n;
                case 36:
                    return ks(i, new Error("Unsupported HEVC in M2TS found")), n;
            }
            e += h + 5;
        }
        return n;
    }
    function ks(r, e, t) {
        v.warn(`parsing error: ${e.message}`), r.emit(p.ERROR, p.ERROR, {
            type: G.MEDIA_ERROR,
            details: A.FRAG_PARSING_ERROR,
            fatal: !1,
            levelRetry: t,
            error: e,
            reason: e.message
        });
    }
    function ii(r) {
        v.log(`${r} with AES-128-CBC encryption found in unencrypted stream`);
    }
    function Et(r) {
        let e = 0, t, s, i, n, a;
        const o = r.data;
        if (!r || r.size === 0) return null;
        for(; o[0].length < 19 && o.length > 1;)o[0] = be(o[0], o[1]), o.splice(1, 1);
        if (t = o[0], (t[0] << 16) + (t[1] << 8) + t[2] === 1) {
            if (s = (t[4] << 8) + t[5], s && s > r.size - 6) return null;
            const c = t[7];
            c & 192 && (n = (t[9] & 14) * 536870912 + (t[10] & 255) * 4194304 + (t[11] & 254) * 16384 + (t[12] & 255) * 128 + (t[13] & 254) / 2, c & 64 ? (a = (t[14] & 14) * 536870912 + (t[15] & 255) * 4194304 + (t[16] & 254) * 16384 + (t[17] & 255) * 128 + (t[18] & 254) / 2, n - a > 60 * 9e4 && (v.warn(`${Math.round((n - a) / 9e4)}s delta between PTS and DTS, align them`), n = a)) : a = n), i = t[8];
            let h = i + 9;
            if (r.size <= h) return null;
            r.size -= h;
            const u = new Uint8Array(r.size);
            for(let d = 0, f = o.length; d < f; d++){
                t = o[d];
                let g = t.byteLength;
                if (h) if (h > g) {
                    h -= g;
                    continue;
                } else t = t.subarray(h), g -= h, h = 0;
                u.set(t, e), e += g;
            }
            return s && (s -= i + 3), {
                data: u,
                pts: n,
                dts: a,
                len: s
            };
        }
        return null;
    }
    class Tc extends en {
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
            const t = Vt(e, 0);
            let s = t?.length || 0;
            if (t && e[s] === 11 && e[s + 1] === 119 && ji(t) !== void 0 && ua(e, s) <= 16) return !1;
            for(let i = e.length; s < i; s++)if (ha(e, s)) return v.log("MPEG Audio sync word found !"), !0;
            return !1;
        }
        canParse(e, t) {
            return cc(e, t);
        }
        appendFrame(e, t, s) {
            if (this.basePTS !== null) return oa(e, t, s, this.basePTS, this.frameIndex);
        }
    }
    class zn {
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
    const Je = Math.pow(2, 32) - 1;
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
            ]), n = new Uint8Array([
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]);
            L.STTS = L.STSC = L.STCO = n, L.STSZ = new Uint8Array([
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
            const n = i;
            for(; i--;)s += t[i].byteLength;
            const a = new Uint8Array(s);
            for(a[0] = s >> 24 & 255, a[1] = s >> 16 & 255, a[2] = s >> 8 & 255, a[3] = s & 255, a.set(e, 4), i = 0, s = 8; i < n; i++)a.set(t[i], s), s += t[i].byteLength;
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
            const s = Math.floor(t / (Je + 1)), i = Math.floor(t % (Je + 1));
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
            const s = Math.floor(t / (Je + 1)), i = Math.floor(t % (Je + 1)), n = new Uint8Array([
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
            return L.box(L.types.mvhd, n);
        }
        static sdtp(e) {
            const t = e.samples || [], s = new Uint8Array(4 + t.length);
            let i, n;
            for(i = 0; i < t.length; i++)n = t[i].flags, s[i + 4] = n.dependsOn << 4 | n.isDependedOn << 2 | n.hasRedundancy;
            return L.box(L.types.sdtp, s);
        }
        static stbl(e) {
            return L.box(L.types.stbl, L.stsd(e), L.box(L.types.stts, L.STTS), L.box(L.types.stsc, L.STSC), L.box(L.types.stsz, L.STSZ), L.box(L.types.stco, L.STCO));
        }
        static avc1(e) {
            let t = [], s = [], i, n, a;
            for(i = 0; i < e.sps.length; i++)n = e.sps[i], a = n.byteLength, t.push(a >>> 8 & 255), t.push(a & 255), t = t.concat(Array.prototype.slice.call(n));
            for(i = 0; i < e.pps.length; i++)n = e.pps[i], a = n.byteLength, s.push(a >>> 8 & 255), s.push(a & 255), s = s.concat(Array.prototype.slice.call(n));
            const o = L.box(L.types.avcC, new Uint8Array([
                1,
                t[3],
                t[4],
                t[5],
                255,
                224 | e.sps.length
            ].concat(t).concat([
                e.pps.length
            ]).concat(s))), l = e.width, c = e.height, h = e.pixelRatio[0], u = e.pixelRatio[1];
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
                h >> 24,
                h >> 16 & 255,
                h >> 8 & 255,
                h & 255,
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
            const t = e.id, s = e.duration * e.timescale, i = e.width, n = e.height, a = Math.floor(s / (Je + 1)), o = Math.floor(s % (Je + 1));
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
                n >> 8 & 255,
                n & 255,
                0,
                0
            ]));
        }
        static traf(e, t) {
            const s = L.sdtp(e), i = e.id, n = Math.floor(t / (Je + 1)), a = Math.floor(t % (Je + 1));
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
                n >> 24,
                n >> 16 & 255,
                n >> 8 & 255,
                n & 255,
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
            const s = e.samples || [], i = s.length, n = 12 + 16 * i, a = new Uint8Array(n);
            let o, l, c, h, u, d;
            for(t += 8 + n, a.set([
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
            ], 0), o = 0; o < i; o++)l = s[o], c = l.duration, h = l.size, u = l.flags, d = l.cts, a.set([
                c >>> 24 & 255,
                c >>> 16 & 255,
                c >>> 8 & 255,
                c & 255,
                h >>> 24 & 255,
                h >>> 16 & 255,
                h >>> 8 & 255,
                h & 255,
                u.isLeading << 2 | u.dependsOn,
                u.isDependedOn << 6 | u.hasRedundancy << 4 | u.paddingValue << 1 | u.isNonSync,
                u.degradPrio & 61440,
                u.degradPrio & 15,
                d >>> 24 & 255,
                d >>> 16 & 255,
                d >>> 8 & 255,
                d & 255
            ], 12 + 16 * o);
            return L.box(L.types.trun, a);
        }
        static initSegment(e) {
            L.types || L.init();
            const t = L.moov(e);
            return be(L.FTYP, t);
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
    const fa = 9e4;
    function nn(r, e, t = 1, s = !1) {
        const i = r * e * t;
        return s ? Math.round(i) : i;
    }
    function xc(r, e, t = 1, s = !1) {
        return nn(r, e, 1 / t, s);
    }
    function Pt(r, e = !1) {
        return nn(r, 1e3, 1 / fa, e);
    }
    function Sc(r, e = 1) {
        return nn(r, fa, 1 / e);
    }
    const vc = 10 * 1e3, Xn = 1024, Lc = 1152, Ac = 1536;
    let Tt = null, ni = null;
    class ds {
        constructor(e, t, s, i = ""){
            if (this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.ISGenerated = !1, this._initPTS = null, this._initDTS = null, this.nextAvcDts = null, this.nextAudioPts = null, this.videoSampleDuration = null, this.isAudioContiguous = !1, this.isVideoContiguous = !1, this.videoTrackConfig = void 0, this.observer = e, this.config = t, this.typeSupported = s, this.ISGenerated = !1, Tt === null) {
                const a = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
                Tt = a ? parseInt(a[1]) : 0;
            }
            if (ni === null) {
                const n = navigator.userAgent.match(/Safari\/(\d+)/i);
                ni = n ? parseInt(n[1]) : 0;
            }
        }
        destroy() {
            this.config = this.videoTrackConfig = this._initPTS = this._initDTS = null;
        }
        resetTimeStamp(e) {
            v.log("[mp4-remuxer]: initPTS & initDTS reset"), this._initPTS = this._initDTS = e;
        }
        resetNextTimestamp() {
            v.log("[mp4-remuxer]: reset next timestamp"), this.isVideoContiguous = !1, this.isAudioContiguous = !1;
        }
        resetInitSegment() {
            v.log("[mp4-remuxer]: ISGenerated flag reset"), this.ISGenerated = !1, this.videoTrackConfig = void 0;
        }
        getVideoStartPts(e) {
            let t = !1;
            const s = e.reduce((i, n)=>{
                const a = n.pts - i;
                return a < -4294967296 ? (t = !0, ve(i, n.pts)) : a > 0 ? i : n.pts;
            }, e[0].pts);
            return t && v.debug("PTS rollover detected"), s;
        }
        remux(e, t, s, i, n, a, o, l) {
            let c, h, u, d, f, g, m = n, y = n;
            const E = e.pid > -1, x = t.pid > -1, T = t.samples.length, b = e.samples.length > 0, S = o && T > 0 || T > 1;
            if ((!E || b) && (!x || S) || this.ISGenerated || o) {
                if (this.ISGenerated) {
                    var R, _, P, I;
                    const H = this.videoTrackConfig;
                    H && (t.width !== H.width || t.height !== H.height || ((R = t.pixelRatio) == null ? void 0 : R[0]) !== ((_ = H.pixelRatio) == null ? void 0 : _[0]) || ((P = t.pixelRatio) == null ? void 0 : P[1]) !== ((I = H.pixelRatio) == null ? void 0 : I[1])) && this.resetInitSegment();
                } else u = this.generateIS(e, t, n, a);
                const w = this.isVideoContiguous;
                let V = -1, F;
                if (S && (V = Rc(t.samples), !w && this.config.forceKeyFrameOnDiscontinuity)) if (g = !0, V > 0) {
                    v.warn(`[mp4-remuxer]: Dropped ${V} out of ${T} video samples due to a missing keyframe`);
                    const H = this.getVideoStartPts(t.samples);
                    t.samples = t.samples.slice(V), t.dropped += V, y += (t.samples[0].pts - H) / t.inputTimeScale, F = y;
                } else V === -1 && (v.warn(`[mp4-remuxer]: No keyframe found out of ${T} video samples`), g = !1);
                if (this.ISGenerated) {
                    if (b && S) {
                        const H = this.getVideoStartPts(t.samples), $ = (ve(e.samples[0].pts, H) - H) / t.inputTimeScale;
                        m += Math.max(0, $), y += Math.max(0, -$);
                    }
                    if (b) {
                        if (e.samplerate || (v.warn("[mp4-remuxer]: regenerate InitSegment as audio detected"), u = this.generateIS(e, t, n, a)), h = this.remuxAudio(e, m, this.isAudioContiguous, a, x || S || l === B.AUDIO ? y : void 0), S) {
                            const H = h ? h.endPTS - h.startPTS : 0;
                            t.inputTimeScale || (v.warn("[mp4-remuxer]: regenerate InitSegment as video detected"), u = this.generateIS(e, t, n, a)), c = this.remuxVideo(t, y, w, H);
                        }
                    } else S && (c = this.remuxVideo(t, y, w, 0));
                    c && (c.firstKeyFrame = V, c.independent = V !== -1, c.firstKeyFramePTS = F);
                }
            }
            return this.ISGenerated && this._initPTS && this._initDTS && (s.samples.length && (f = ga(s, n, this._initPTS, this._initDTS)), i.samples.length && (d = ma(i, n, this._initPTS))), {
                audio: h,
                video: c,
                initSegment: u,
                independent: g,
                text: d,
                id3: f
            };
        }
        generateIS(e, t, s, i) {
            const n = e.samples, a = t.samples, o = this.typeSupported, l = {}, c = this._initPTS;
            let h = !c || i, u = "audio/mp4", d, f, g;
            if (h && (d = f = 1 / 0), e.config && n.length) {
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
                }, h && (g = e.inputTimeScale, !c || g !== c.timescale ? d = f = n[0].pts - Math.round(g * s) : h = !1);
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
                }, h) if (g = t.inputTimeScale, !c || g !== c.timescale) {
                    const m = this.getVideoStartPts(a), y = Math.round(g * s);
                    f = Math.min(f, ve(a[0].dts, m) - y), d = Math.min(d, m - y);
                } else h = !1;
                this.videoTrackConfig = {
                    width: t.width,
                    height: t.height,
                    pixelRatio: t.pixelRatio
                };
            }
            if (Object.keys(l).length) return this.ISGenerated = !0, h ? (this._initPTS = {
                baseTime: d,
                timescale: g
            }, this._initDTS = {
                baseTime: f,
                timescale: g
            }) : d = g = void 0, {
                tracks: l,
                initPTS: d,
                timescale: g
            };
        }
        remuxVideo(e, t, s, i) {
            const n = e.inputTimeScale, a = e.samples, o = [], l = a.length, c = this._initPTS;
            let h = this.nextAvcDts, u = 8, d = this.videoSampleDuration, f, g, m = Number.POSITIVE_INFINITY, y = Number.NEGATIVE_INFINITY, E = !1;
            if (!s || h === null) {
                const N = t * n, O = a[0].pts - ve(a[0].dts, a[0].pts);
                Tt && h !== null && Math.abs(N - O - h) < 15e3 ? s = !0 : h = N - O;
            }
            const x = c.baseTime * n / c.timescale;
            for(let N = 0; N < l; N++){
                const O = a[N];
                O.pts = ve(O.pts - x, h), O.dts = ve(O.dts - x, h), O.dts < a[N > 0 ? N - 1 : N].dts && (E = !0);
            }
            E && a.sort(function(N, O) {
                const z = N.dts - O.dts, Y = N.pts - O.pts;
                return z || Y;
            }), f = a[0].dts, g = a[a.length - 1].dts;
            const T = g - f, b = T ? Math.round(T / (l - 1)) : d || e.inputTimeScale / 30;
            if (s) {
                const N = f - h, O = N > b, z = N < -1;
                if ((O || z) && (O ? v.warn(`AVC: ${Pt(N, !0)} ms (${N}dts) hole between fragments detected at ${t.toFixed(3)}`) : v.warn(`AVC: ${Pt(-N, !0)} ms (${N}dts) overlapping between fragments detected at ${t.toFixed(3)}`), !z || h >= a[0].pts || Tt)) {
                    f = h;
                    const Y = a[0].pts - N;
                    if (O) a[0].dts = f, a[0].pts = Y;
                    else for(let X = 0; X < a.length && !(a[X].dts > Y); X++)a[X].dts -= N, a[X].pts -= N;
                    v.log(`Video: Initial PTS/DTS adjusted: ${Pt(Y, !0)}/${Pt(f, !0)}, delta: ${Pt(N, !0)} ms`);
                }
            }
            f = Math.max(0, f);
            let S = 0, D = 0, R = f;
            for(let N = 0; N < l; N++){
                const O = a[N], z = O.units, Y = z.length;
                let X = 0;
                for(let se = 0; se < Y; se++)X += z[se].data.length;
                D += X, S += Y, O.length = X, O.dts < R ? (O.dts = R, R += b / 4 | 0 || 1) : R = O.dts, m = Math.min(O.pts, m), y = Math.max(O.pts, y);
            }
            g = a[l - 1].dts;
            const _ = D + 4 * S + 8;
            let P;
            try {
                P = new Uint8Array(_);
            } catch (N) {
                this.observer.emit(p.ERROR, p.ERROR, {
                    type: G.MUX_ERROR,
                    details: A.REMUX_ALLOC_ERROR,
                    fatal: !1,
                    error: N,
                    bytes: _,
                    reason: `fail allocating video mdat ${_}`
                });
                return;
            }
            const I = new DataView(P.buffer);
            I.setUint32(0, _), P.set(L.types.mdat, 4);
            let w = !1, V = Number.POSITIVE_INFINITY, F = Number.POSITIVE_INFINITY, H = Number.NEGATIVE_INFINITY, K = Number.NEGATIVE_INFINITY;
            for(let N = 0; N < l; N++){
                const O = a[N], z = O.units;
                let Y = 0;
                for(let ae = 0, ue = z.length; ae < ue; ae++){
                    const xe = z[ae], kt = xe.data, Ys = xe.data.byteLength;
                    I.setUint32(u, Ys), u += 4, P.set(kt, u), u += Ys, Y += 4 + Ys;
                }
                let X;
                if (N < l - 1) d = a[N + 1].dts - O.dts, X = a[N + 1].pts - O.pts;
                else {
                    const ae = this.config, ue = N > 0 ? O.dts - a[N - 1].dts : b;
                    if (X = N > 0 ? O.pts - a[N - 1].pts : b, ae.stretchShortVideoTrack && this.nextAudioPts !== null) {
                        const xe = Math.floor(ae.maxBufferHole * n), kt = (i ? m + i * n : this.nextAudioPts) - O.pts;
                        kt > xe ? (d = kt - ue, d < 0 ? d = ue : w = !0, v.log(`[mp4-remuxer]: It is approximately ${kt / 90} ms to the next segment; using duration ${d / 90} ms for the last video frame.`)) : d = ue;
                    } else d = ue;
                }
                const se = Math.round(O.pts - O.dts);
                V = Math.min(V, d), H = Math.max(H, d), F = Math.min(F, X), K = Math.max(K, X), o.push(new Qn(O.key, d, Y, se));
            }
            if (o.length) {
                if (Tt) {
                    if (Tt < 70) {
                        const N = o[0].flags;
                        N.dependsOn = 2, N.isNonSync = 0;
                    }
                } else if (ni && K - F < H - V && b / H < .025 && o[0].cts === 0) {
                    v.warn("Found irregular gaps in sample duration. Using PTS instead of DTS to determine MP4 sample duration.");
                    let N = f;
                    for(let O = 0, z = o.length; O < z; O++){
                        const Y = N + o[O].duration, X = N + o[O].cts;
                        if (O < z - 1) {
                            const se = Y + o[O + 1].cts;
                            o[O].duration = se - X;
                        } else o[O].duration = O ? o[O - 1].duration : b;
                        o[O].cts = 0, N = Y;
                    }
                }
            }
            d = w || !d ? b : d, this.nextAvcDts = h = g + d, this.videoSampleDuration = d, this.isVideoContiguous = !0;
            const J = {
                data1: L.moof(e.sequenceNumber++, f, ne({}, e, {
                    samples: o
                })),
                data2: P,
                startPTS: m / n,
                endPTS: (y + d) / n,
                startDTS: f / n,
                endDTS: h / n,
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
                    return Lc;
                case "ac3":
                    return Ac;
                default:
                    return Xn;
            }
        }
        remuxAudio(e, t, s, i, n) {
            const a = e.inputTimeScale, o = e.samplerate ? e.samplerate : a, l = a / o, c = this.getSamplesPerFrame(e), h = c * l, u = this._initPTS, d = e.segmentCodec === "mp3" && this.typeSupported.mpeg, f = [], g = n !== void 0;
            let m = e.samples, y = d ? 0 : 8, E = this.nextAudioPts || -1;
            const x = t * a, T = u.baseTime * a / u.timescale;
            if (this.isAudioContiguous = s = s || m.length && E > 0 && (i && Math.abs(x - E) < 9e3 || Math.abs(ve(m[0].pts - T, x) - E) < 20 * h), m.forEach(function($) {
                $.pts = ve($.pts - T, x);
            }), !s || E < 0) {
                if (m = m.filter(($)=>$.pts >= 0), !m.length) return;
                n === 0 ? E = 0 : i && !g ? E = Math.max(0, x) : E = m[0].pts;
            }
            if (e.segmentCodec === "aac") {
                const $ = this.config.maxAudioFramesDrift;
                for(let j = 0, J = E; j < m.length; j++){
                    const N = m[j], O = N.pts, z = O - J, Y = Math.abs(1e3 * z / a);
                    if (z <= -$ * h && g) j === 0 && (v.warn(`Audio frame @ ${(O / a).toFixed(3)}s overlaps nextAudioPts by ${Math.round(1e3 * z / a)} ms.`), this.nextAudioPts = E = J = O);
                    else if (z >= $ * h && Y < vc && g) {
                        let X = Math.round(z / h);
                        J = O - X * h, J < 0 && (X--, J += h), j === 0 && (this.nextAudioPts = E = J), v.warn(`[mp4-remuxer]: Injecting ${X} audio frame @ ${(J / a).toFixed(3)}s due to ${Math.round(1e3 * z / a)} ms gap.`);
                        for(let se = 0; se < X; se++){
                            const ae = Math.max(J, 0);
                            let ue = zn.getSilentFrame(e.manifestCodec || e.codec, e.channelCount);
                            ue || (v.log("[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead."), ue = N.unit.subarray()), m.splice(j, 0, {
                                unit: ue,
                                pts: ae
                            }), J += h, j++;
                        }
                    }
                    N.pts = J, J += h;
                }
            }
            let b = null, S = null, D, R = 0, _ = m.length;
            for(; _--;)R += m[_].unit.byteLength;
            for(let $ = 0, j = m.length; $ < j; $++){
                const J = m[$], N = J.unit;
                let O = J.pts;
                if (S !== null) {
                    const Y = f[$ - 1];
                    Y.duration = Math.round((O - S) / l);
                } else if (s && e.segmentCodec === "aac" && (O = E), b = O, R > 0) {
                    R += y;
                    try {
                        D = new Uint8Array(R);
                    } catch (Y) {
                        this.observer.emit(p.ERROR, p.ERROR, {
                            type: G.MUX_ERROR,
                            details: A.REMUX_ALLOC_ERROR,
                            fatal: !1,
                            error: Y,
                            bytes: R,
                            reason: `fail allocating audio mdat ${R}`
                        });
                        return;
                    }
                    d || (new DataView(D.buffer).setUint32(0, R), D.set(L.types.mdat, 4));
                } else return;
                D.set(N, y);
                const z = N.byteLength;
                y += z, f.push(new Qn(!0, c, z, 0)), S = O;
            }
            const P = f.length;
            if (!P) return;
            const I = f[f.length - 1];
            this.nextAudioPts = E = S + l * I.duration;
            const w = d ? new Uint8Array(0) : L.moof(e.sequenceNumber++, b / l, ne({}, e, {
                samples: f
            }));
            e.samples = [];
            const V = b / a, F = E / a, K = {
                data1: w,
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
            const n = e.inputTimeScale, a = e.samplerate ? e.samplerate : n, o = n / a, l = this.nextAudioPts, c = this._initDTS, h = c.baseTime * 9e4 / c.timescale, u = (l !== null ? l : i.startDTS * n) + h, d = i.endDTS * n + h, f = o * Xn, g = Math.ceil((d - u) / f), m = zn.getSilentFrame(e.manifestCodec || e.codec, e.channelCount);
            if (v.warn("[mp4-remuxer]: remux empty Audio"), !m) {
                v.trace("[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec");
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
    function ve(r, e) {
        let t;
        if (e === null) return r;
        for(e < r ? t = -8589934592 : t = 8589934592; Math.abs(r - e) > 4294967296;)r += t;
        return r;
    }
    function Rc(r) {
        for(let e = 0; e < r.length; e++)if (r[e].key) return e;
        return -1;
    }
    function ga(r, e, t, s) {
        const i = r.samples.length;
        if (!i) return;
        const n = r.inputTimeScale;
        for(let o = 0; o < i; o++){
            const l = r.samples[o];
            l.pts = ve(l.pts - t.baseTime * n / t.timescale, e * n) / n, l.dts = ve(l.dts - s.baseTime * n / s.timescale, e * n) / n;
        }
        const a = r.samples;
        return r.samples = [], {
            samples: a
        };
    }
    function ma(r, e, t) {
        const s = r.samples.length;
        if (!s) return;
        const i = r.inputTimeScale;
        for(let a = 0; a < s; a++){
            const o = r.samples[a];
            o.pts = ve(o.pts - t.baseTime * i / t.timescale, e * i) / i;
        }
        r.samples.sort((a, o)=>a.pts - o.pts);
        const n = r.samples;
        return r.samples = [], {
            samples: n
        };
    }
    class Qn {
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
    class bc {
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
            this.audioCodec = t, this.videoCodec = s, this.generateInitSegment(Po(e, i)), this.emitInitSegment = !0;
        }
        generateInitSegment(e) {
            let { audioCodec: t, videoCodec: s } = this;
            if (!(e != null && e.byteLength)) {
                this.initTracks = void 0, this.initData = void 0;
                return;
            }
            const i = this.initData = $r(e);
            i.audio && (t = Jn(i.audio, Q.AUDIO)), i.video && (s = Jn(i.video, Q.VIDEO));
            const n = {};
            i.audio && i.video ? n.audiovideo = {
                container: "video/mp4",
                codec: t + "," + s,
                initSegment: e,
                id: "main"
            } : i.audio ? n.audio = {
                container: "audio/mp4",
                codec: t,
                initSegment: e,
                id: "audio"
            } : i.video ? n.video = {
                container: "video/mp4",
                codec: s,
                initSegment: e,
                id: "main"
            } : v.warn("[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes."), this.initTracks = n;
        }
        remux(e, t, s, i, n, a) {
            var o, l;
            let { initPTS: c, lastEndTime: h } = this;
            const u = {
                audio: void 0,
                video: void 0,
                text: i,
                id3: s,
                initSegment: void 0
            };
            M(h) || (h = this.lastEndTime = n || 0);
            const d = t.samples;
            if (!(d != null && d.length)) return u;
            const f = {
                initPTS: void 0,
                timescale: 1
            };
            let g = this.initData;
            if ((o = g) != null && o.length || (this.generateInitSegment(d), g = this.initData), !((l = g) != null && l.length)) return v.warn("[passthrough-remuxer.ts]: Failed to generate initSegment."), u;
            this.emitInitSegment && (f.tracks = this.initTracks, this.emitInitSegment = !1);
            const m = Oo(d, g), y = Fo(g, d), E = y === null ? n : y;
            (Ic(c, E, n, m) || f.timescale !== c.timescale && a) && (f.initPTS = E - n, c && c.timescale === 1 && v.warn(`Adjusting initPTS by ${f.initPTS - c.baseTime}`), this.initPTS = c = {
                baseTime: f.initPTS,
                timescale: 1
            });
            const x = e ? E - c.baseTime / c.timescale : h, T = x + m;
            No(g, d, c.baseTime / c.timescale), m > 0 ? this.lastEndTime = T : (v.warn("Duration parsed from mp4 should be greater than zero"), this.resetNextTimestamp());
            const b = !!g.audio, S = !!g.video;
            let D = "";
            b && (D += "audio"), S && (D += "video");
            const R = {
                data1: d,
                startPTS: x,
                startDTS: x,
                endPTS: T,
                endDTS: T,
                type: D,
                hasAudio: b,
                hasVideo: S,
                nb: 1,
                dropped: 0
            };
            return u.audio = R.type === "audio" ? R : void 0, u.video = R.type !== "audio" ? R : void 0, u.initSegment = f, u.id3 = ga(s, n, c, c), i.samples.length && (u.text = ma(i, n, c)), u;
        }
    }
    function Ic(r, e, t, s) {
        if (r === null) return !0;
        const i = Math.max(s, 1), n = e - r.baseTime / r.timescale;
        return Math.abs(n - t) > i;
    }
    function Jn(r, e) {
        const t = r?.codec;
        if (t && t.length > 4) return t;
        if (e === Q.AUDIO) {
            if (t === "ec-3" || t === "ac-3" || t === "alac") return t;
            if (t === "fLaC" || t === "Opus") return Rs(t, !1);
            const s = "mp4a.40.5";
            return v.info(`Parsed audio codec "${t}" or audio object type not handled. Using "${s}"`), s;
        }
        return v.warn(`Unhandled video codec "${t}"`), t === "hvc1" || t === "hev1" ? "hvc1.1.6.L120.90" : t === "av01" ? "av01.0.04M.08" : "avc1.42e01e";
    }
    let qe;
    try {
        qe = self.performance.now.bind(self.performance);
    } catch  {
        v.debug("Unable to use Performance API on this environment"), qe = Rt?.Date.now;
    }
    const fs = [
        {
            demux: dc,
            remux: bc
        },
        {
            demux: Ze,
            remux: ds
        },
        {
            demux: hc,
            remux: ds
        },
        {
            demux: Tc,
            remux: ds
        }
    ];
    fs.splice(2, 0, {
        demux: fc,
        remux: ds
    });
    class Zn {
        constructor(e, t, s, i, n){
            this.async = !1, this.observer = void 0, this.typeSupported = void 0, this.config = void 0, this.vendor = void 0, this.id = void 0, this.demuxer = void 0, this.remuxer = void 0, this.decrypter = void 0, this.probe = void 0, this.decryptionPromise = null, this.transmuxConfig = void 0, this.currentTransmuxState = void 0, this.observer = e, this.typeSupported = t, this.config = s, this.vendor = i, this.id = n;
        }
        configure(e) {
            this.transmuxConfig = e, this.decrypter && this.decrypter.reset();
        }
        push(e, t, s, i) {
            const n = s.transmuxing;
            n.executeStart = qe();
            let a = new Uint8Array(e);
            const { currentTransmuxState: o, transmuxConfig: l } = this;
            i && (this.currentTransmuxState = i);
            const { contiguous: c, discontinuity: h, trackSwitch: u, accurateTimeOffset: d, timeOffset: f, initSegmentChange: g } = i || o, { audioCodec: m, videoCodec: y, defaultInitPts: E, duration: x, initSegmentData: T } = l, b = Dc(a, t);
            if (b && b.method === "AES-128") {
                const _ = this.getDecrypter();
                if (_.isSync()) {
                    let P = _.softwareDecrypt(a, b.key.buffer, b.iv.buffer);
                    if (s.part > -1 && (P = _.flush()), !P) return n.executeEnd = qe(), ri(s);
                    a = new Uint8Array(P);
                } else return this.decryptionPromise = _.webCryptoDecrypt(a, b.key.buffer, b.iv.buffer).then((P)=>{
                    const I = this.push(P, null, s);
                    return this.decryptionPromise = null, I;
                }), this.decryptionPromise;
            }
            const S = this.needsProbing(h, u);
            if (S) {
                const _ = this.configureTransmuxer(a);
                if (_) return v.warn(`[transmuxer] ${_.message}`), this.observer.emit(p.ERROR, p.ERROR, {
                    type: G.MEDIA_ERROR,
                    details: A.FRAG_PARSING_ERROR,
                    fatal: !1,
                    error: _,
                    reason: _.message
                }), n.executeEnd = qe(), ri(s);
            }
            (h || u || g || S) && this.resetInitSegment(T, m, y, x, t), (h || g || S) && this.resetInitialTimestamp(E), c || this.resetContiguity();
            const D = this.transmux(a, b, f, d, s), R = this.currentTransmuxState;
            return R.contiguous = !0, R.discontinuity = !1, R.trackSwitch = !1, n.executeEnd = qe(), D;
        }
        flush(e) {
            const t = e.transmuxing;
            t.executeStart = qe();
            const { decrypter: s, currentTransmuxState: i, decryptionPromise: n } = this;
            if (n) return n.then(()=>this.flush(e));
            const a = [], { timeOffset: o } = i;
            if (s) {
                const u = s.flush();
                u && a.push(this.push(u, null, e));
            }
            const { demuxer: l, remuxer: c } = this;
            if (!l || !c) return t.executeEnd = qe(), [
                ri(e)
            ];
            const h = l.flush(o);
            return gs(h) ? h.then((u)=>(this.flushRemux(a, u, e), a)) : (this.flushRemux(a, h, e), a);
        }
        flushRemux(e, t, s) {
            const { audioTrack: i, videoTrack: n, id3Track: a, textTrack: o } = t, { accurateTimeOffset: l, timeOffset: c } = this.currentTransmuxState;
            v.log(`[transmuxer.ts]: Flushed fragment ${s.sn}${s.part > -1 ? " p: " + s.part : ""} of level ${s.level}`);
            const h = this.remuxer.remux(i, n, a, o, c, l, !0, this.id);
            e.push({
                remuxResult: h,
                chunkMeta: s
            }), s.transmuxing.executeEnd = qe();
        }
        resetInitialTimestamp(e) {
            const { demuxer: t, remuxer: s } = this;
            !t || !s || (t.resetTimeStamp(e), s.resetTimeStamp(e));
        }
        resetContiguity() {
            const { demuxer: e, remuxer: t } = this;
            !e || !t || (e.resetContiguity(), t.resetNextTimestamp());
        }
        resetInitSegment(e, t, s, i, n) {
            const { demuxer: a, remuxer: o } = this;
            !a || !o || (a.resetInitSegment(e, t, s, i), o.resetInitSegment(e, t, s, n));
        }
        destroy() {
            this.demuxer && (this.demuxer.destroy(), this.demuxer = void 0), this.remuxer && (this.remuxer.destroy(), this.remuxer = void 0);
        }
        transmux(e, t, s, i, n) {
            let a;
            return t && t.method === "SAMPLE-AES" ? a = this.transmuxSampleAes(e, t, s, i, n) : a = this.transmuxUnencrypted(e, s, i, n), a;
        }
        transmuxUnencrypted(e, t, s, i) {
            const { audioTrack: n, videoTrack: a, id3Track: o, textTrack: l } = this.demuxer.demux(e, t, !1, !this.config.progressive);
            return {
                remuxResult: this.remuxer.remux(n, a, o, l, t, s, !1, this.id),
                chunkMeta: i
            };
        }
        transmuxSampleAes(e, t, s, i, n) {
            return this.demuxer.demuxSampleAes(e, t, s).then((a)=>({
                    remuxResult: this.remuxer.remux(a.audioTrack, a.videoTrack, a.id3Track, a.textTrack, s, i, !1, this.id),
                    chunkMeta: n
                }));
        }
        configureTransmuxer(e) {
            const { config: t, observer: s, typeSupported: i, vendor: n } = this;
            let a;
            for(let d = 0, f = fs.length; d < f; d++){
                var o;
                if ((o = fs[d].demux) != null && o.probe(e)) {
                    a = fs[d];
                    break;
                }
            }
            if (!a) return new Error("Failed to find demuxer by probing fragment data");
            const l = this.demuxer, c = this.remuxer, h = a.remux, u = a.demux;
            (!c || !(c instanceof h)) && (this.remuxer = new h(s, t, i, n)), (!l || !(l instanceof u)) && (this.demuxer = new u(s, t, i), this.probe = u.probe);
        }
        needsProbing(e, t) {
            return !this.demuxer || !this.remuxer || e || t;
        }
        getDecrypter() {
            let e = this.decrypter;
            return e || (e = this.decrypter = new Ji(this.config)), e;
        }
    }
    function Dc(r, e) {
        let t = null;
        return r.byteLength > 0 && e?.key != null && e.iv !== null && e.method != null && (t = e), t;
    }
    const ri = (r)=>({
            remuxResult: {},
            chunkMeta: r
        });
    function gs(r) {
        return "then" in r && r.then instanceof Function;
    }
    class Cc {
        constructor(e, t, s, i, n){
            this.audioCodec = void 0, this.videoCodec = void 0, this.initSegmentData = void 0, this.duration = void 0, this.defaultInitPts = void 0, this.audioCodec = e, this.videoCodec = t, this.initSegmentData = s, this.duration = i, this.defaultInitPts = n || null;
        }
    }
    class _c {
        constructor(e, t, s, i, n, a){
            this.discontinuity = void 0, this.contiguous = void 0, this.accurateTimeOffset = void 0, this.trackSwitch = void 0, this.timeOffset = void 0, this.initSegmentChange = void 0, this.discontinuity = e, this.contiguous = t, this.accurateTimeOffset = s, this.trackSwitch = i, this.timeOffset = n, this.initSegmentChange = a;
        }
    }
    var pa = {
        exports: {}
    };
    (function(r) {
        var e = Object.prototype.hasOwnProperty, t = "~";
        function s() {}
        Object.create && (s.prototype = Object.create(null), new s().__proto__ || (t = !1));
        function i(l, c, h) {
            this.fn = l, this.context = c, this.once = h || !1;
        }
        function n(l, c, h, u, d) {
            if (typeof h != "function") throw new TypeError("The listener must be a function");
            var f = new i(h, u || l, d), g = t ? t + c : c;
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
            var c = [], h, u;
            if (this._eventsCount === 0) return c;
            for(u in h = this._events)e.call(h, u) && c.push(t ? u.slice(1) : u);
            return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(h)) : c;
        }, o.prototype.listeners = function(c) {
            var h = t ? t + c : c, u = this._events[h];
            if (!u) return [];
            if (u.fn) return [
                u.fn
            ];
            for(var d = 0, f = u.length, g = new Array(f); d < f; d++)g[d] = u[d].fn;
            return g;
        }, o.prototype.listenerCount = function(c) {
            var h = t ? t + c : c, u = this._events[h];
            return u ? u.fn ? 1 : u.length : 0;
        }, o.prototype.emit = function(c, h, u, d, f, g) {
            var m = t ? t + c : c;
            if (!this._events[m]) return !1;
            var y = this._events[m], E = arguments.length, x, T;
            if (y.fn) {
                switch(y.once && this.removeListener(c, y.fn, void 0, !0), E){
                    case 1:
                        return y.fn.call(y.context), !0;
                    case 2:
                        return y.fn.call(y.context, h), !0;
                    case 3:
                        return y.fn.call(y.context, h, u), !0;
                    case 4:
                        return y.fn.call(y.context, h, u, d), !0;
                    case 5:
                        return y.fn.call(y.context, h, u, d, f), !0;
                    case 6:
                        return y.fn.call(y.context, h, u, d, f, g), !0;
                }
                for(T = 1, x = new Array(E - 1); T < E; T++)x[T - 1] = arguments[T];
                y.fn.apply(y.context, x);
            } else {
                var b = y.length, S;
                for(T = 0; T < b; T++)switch(y[T].once && this.removeListener(c, y[T].fn, void 0, !0), E){
                    case 1:
                        y[T].fn.call(y[T].context);
                        break;
                    case 2:
                        y[T].fn.call(y[T].context, h);
                        break;
                    case 3:
                        y[T].fn.call(y[T].context, h, u);
                        break;
                    case 4:
                        y[T].fn.call(y[T].context, h, u, d);
                        break;
                    default:
                        if (!x) for(S = 1, x = new Array(E - 1); S < E; S++)x[S - 1] = arguments[S];
                        y[T].fn.apply(y[T].context, x);
                }
            }
            return !0;
        }, o.prototype.on = function(c, h, u) {
            return n(this, c, h, u, !1);
        }, o.prototype.once = function(c, h, u) {
            return n(this, c, h, u, !0);
        }, o.prototype.removeListener = function(c, h, u, d) {
            var f = t ? t + c : c;
            if (!this._events[f]) return this;
            if (!h) return a(this, f), this;
            var g = this._events[f];
            if (g.fn) g.fn === h && (!d || g.once) && (!u || g.context === u) && a(this, f);
            else {
                for(var m = 0, y = [], E = g.length; m < E; m++)(g[m].fn !== h || d && !g[m].once || u && g[m].context !== u) && y.push(g[m]);
                y.length ? this._events[f] = y.length === 1 ? y[0] : y : a(this, f);
            }
            return this;
        }, o.prototype.removeAllListeners = function(c) {
            var h;
            return c ? (h = t ? t + c : c, this._events[h] && a(this, h)) : (this._events = new s, this._eventsCount = 0), this;
        }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = t, o.EventEmitter = o, r.exports = o;
    })(pa);
    var wc = pa.exports, rn = Za(wc);
    class ya {
        constructor(e, t, s, i){
            this.error = null, this.hls = void 0, this.id = void 0, this.observer = void 0, this.frag = null, this.part = null, this.useWorker = void 0, this.workerContext = null, this.onwmsg = void 0, this.transmuxer = null, this.onTransmuxComplete = void 0, this.onFlush = void 0;
            const n = e.config;
            this.hls = e, this.id = t, this.useWorker = !!n.enableWorker, this.onTransmuxComplete = s, this.onFlush = i;
            const a = (c, h)=>{
                h = h || {}, h.frag = this.frag, h.id = this.id, c === p.ERROR && (this.error = h.error), this.hls.trigger(c, h);
            };
            this.observer = new rn, this.observer.on(p.FRAG_DECRYPTED, a), this.observer.on(p.ERROR, a);
            const o = ut(n.preferManagedMediaSource) || {
                isTypeSupported: ()=>!1
            }, l = {
                mpeg: o.isTypeSupported("audio/mpeg"),
                mp3: o.isTypeSupported('audio/mp4; codecs="mp3"'),
                ac3: o.isTypeSupported('audio/mp4; codecs="ac-3"')
            };
            if (this.useWorker && typeof Worker < "u" && (n.workerPath || Xl())) {
                try {
                    n.workerPath ? (v.log(`loading Web Worker ${n.workerPath} for "${t}"`), this.workerContext = Jl(n.workerPath)) : (v.log(`injecting Web Worker for "${t}"`), this.workerContext = Ql()), this.onwmsg = (u)=>this.onWorkerMessage(u);
                    const { worker: h } = this.workerContext;
                    h.addEventListener("message", this.onwmsg), h.onerror = (u)=>{
                        const d = new Error(`${u.message}  (${u.filename}:${u.lineno})`);
                        n.enableWorker = !1, v.warn(`Error in "${t}" Web Worker, fallback to inline`), this.hls.trigger(p.ERROR, {
                            type: G.OTHER_ERROR,
                            details: A.INTERNAL_EXCEPTION,
                            fatal: !1,
                            event: "demuxerWorker",
                            error: d
                        });
                    }, h.postMessage({
                        cmd: "init",
                        typeSupported: l,
                        vendor: "",
                        id: t,
                        config: JSON.stringify(n)
                    });
                } catch (h) {
                    v.warn(`Error setting up "${t}" Web Worker, fallback to inline`, h), this.resetWorker(), this.error = null, this.transmuxer = new Zn(this.observer, l, n, "", t);
                }
                return;
            }
            this.transmuxer = new Zn(this.observer, l, n, "", t);
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
        push(e, t, s, i, n, a, o, l, c, h) {
            var u, d;
            c.transmuxing.start = self.performance.now();
            const { transmuxer: f } = this, g = a ? a.start : n.start, m = n.decryptdata, y = this.frag, E = !(y && n.cc === y.cc), x = !(y && c.level === y.level), T = y ? c.sn - y.sn : -1, b = this.part ? c.part - this.part.index : -1, S = T === 0 && c.id > 1 && c.id === y?.stats.chunkCount, D = !x && (T === 1 || T === 0 && (b === 1 || S && b <= 0)), R = self.performance.now();
            (x || T || n.stats.parsing.start === 0) && (n.stats.parsing.start = R), a && (b || !D) && (a.stats.parsing.start = R);
            const _ = !(y && ((u = n.initSegment) == null ? void 0 : u.url) === ((d = y.initSegment) == null ? void 0 : d.url)), P = new _c(E, D, l, x, g, _);
            if (!D || E || _) {
                v.log(`[transmuxer-interface, ${n.type}]: Starting new transmux session for sn: ${c.sn} p: ${c.part} level: ${c.level} id: ${c.id}
        discontinuity: ${E}
        trackSwitch: ${x}
        contiguous: ${D}
        accurateTimeOffset: ${l}
        timeOffset: ${g}
        initSegmentChange: ${_}`);
                const I = new Cc(s, i, t, o, h);
                this.configureTransmuxer(I);
            }
            if (this.frag = n, this.part = a, this.workerContext) this.workerContext.worker.postMessage({
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
                gs(I) ? (f.async = !0, I.then((w)=>{
                    this.handleTransmuxComplete(w);
                }).catch((w)=>{
                    this.transmuxerError(w, c, "transmuxer-interface push error");
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
                gs(s) || t.async ? (gs(s) || (s = Promise.resolve(s)), s.then((n)=>{
                    this.handleFlushResult(n, e);
                }).catch((n)=>{
                    this.transmuxerError(n, e, "transmuxer-interface flush error");
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
                v.warn(`worker message received with no ${t ? "event name" : "data"}`);
                return;
            }
            const s = this.hls;
            if (this.hls) switch(t.event){
                case "init":
                    {
                        var i;
                        const n = (i = this.workerContext) == null ? void 0 : i.objectURL;
                        n && self.URL.revokeObjectURL(n);
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
                    v[t.data.logType] && v[t.data.logType](t.data.message);
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
    function Ea(r, e) {
        if (r.length !== e.length) return !1;
        for(let t = 0; t < r.length; t++)if (!It(r[t].attrs, e[t].attrs)) return !1;
        return !0;
    }
    function It(r, e, t) {
        const s = r["STABLE-RENDITION-ID"];
        return s && !t ? s === e["STABLE-RENDITION-ID"] : !(t || [
            "LANGUAGE",
            "NAME",
            "CHARACTERISTICS",
            "AUTOSELECT",
            "DEFAULT",
            "FORCED",
            "ASSOC-LANGUAGE"
        ]).some((i)=>r[i] !== e[i]);
    }
    function Pi(r, e) {
        return e.label.toLowerCase() === r.name.toLowerCase() && (!e.language || e.language.toLowerCase() === (r.lang || "").toLowerCase());
    }
    const er = 100;
    class kc extends Zi {
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
        onInitPtsFound(e, { frag: t, id: s, initPTS: i, timescale: n }) {
            if (s === "main") {
                const a = t.cc;
                this.initPTS[t.cc] = {
                    baseTime: i,
                    timescale: n
                }, this.log(`InitPTS for cc: ${a} found from main: ${i}`), this.videoTrackCC = a, this.state === C.WAITING_INIT_PTS && this.tick();
            }
        }
        startLoad(e) {
            if (!this.levels) {
                this.startPosition = e, this.state = C.STOPPED;
                return;
            }
            const t = this.lastCurrentTime;
            this.stopLoad(), this.setInterval(er), t > 0 && e === -1 ? (this.log(`Override startPosition with lastCurrentTime @${t.toFixed(3)}`), e = t, this.state = C.IDLE) : (this.loadedmetadata = !1, this.state = C.WAITING_TRACK), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = e, this.tick();
        }
        doTick() {
            switch(this.state){
                case C.IDLE:
                    this.doTickIdle();
                    break;
                case C.WAITING_TRACK:
                    {
                        var e;
                        const { levels: s, trackId: i } = this, n = s == null || (e = s[i]) == null ? void 0 : e.details;
                        if (n) {
                            if (this.waitForCdnTuneIn(n)) break;
                            this.state = C.WAITING_INIT_PTS;
                        }
                        break;
                    }
                case C.FRAG_LOADING_WAITING_RETRY:
                    {
                        var t;
                        const s = performance.now(), i = this.retryDate;
                        if (!i || s >= i || (t = this.media) != null && t.seeking) {
                            const { levels: n, trackId: a } = this;
                            this.log("RetryDate reached, switch back to IDLE state"), this.resetStartWhenNotLoaded(n?.[a] || null), this.state = C.IDLE;
                        }
                        break;
                    }
                case C.WAITING_INIT_PTS:
                    {
                        const s = this.waitingData;
                        if (s) {
                            const { frag: i, part: n, cache: a, complete: o } = s;
                            if (this.initPTS[i.cc] !== void 0) {
                                this.waitingData = null, this.waitingVideoCC = -1, this.state = C.FRAG_LOADING;
                                const l = a.flush(), c = {
                                    frag: i,
                                    part: n,
                                    payload: l,
                                    networkDetails: null
                                };
                                this._handleFragmentLoadProgress(c), o && super._handleFragmentLoadComplete(c);
                            } else if (this.videoTrackCC !== this.waitingVideoCC) this.log(`Waiting fragment cc (${i.cc}) cancelled because video is at cc ${this.videoTrackCC}`), this.clearWaitingFragment();
                            else {
                                const l = this.getLoadPosition(), c = Z.bufferInfo(this.mediaBuffer, l, this.config.maxBufferHole);
                                wi(c.end, this.config.maxFragLookUpTolerance, i) < 0 && (this.log(`Waiting fragment cc (${i.cc}) @ ${i.start} cancelled because another fragment at ${c.end} is needed`), this.clearWaitingFragment());
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
            const { hls: e, levels: t, media: s, trackId: i } = this, n = e.config;
            if (!s && (this.startFragRequested || !n.startFragPrefetch) || !(t != null && t[i])) return;
            const a = t[i], o = a.details;
            if (!o || o.live && this.levelLastLoaded !== a || this.waitForCdnTuneIn(o)) {
                this.state = C.WAITING_TRACK;
                return;
            }
            const l = this.mediaBuffer ? this.mediaBuffer : this.media;
            this.bufferFlushed && l && (this.bufferFlushed = !1, this.afterBufferFlushed(l, Q.AUDIO, B.AUDIO));
            const c = this.getFwdBufferInfo(l, B.AUDIO);
            if (c === null) return;
            const { bufferedTrack: h, switchingTrack: u } = this;
            if (!u && this._streamEnded(c, o)) {
                e.trigger(p.BUFFER_EOS, {
                    type: "audio"
                }), this.state = C.ENDED;
                return;
            }
            const d = this.getFwdBufferInfo(this.videoBuffer ? this.videoBuffer : this.media, B.MAIN), f = c.len, g = this.getMaxBufferLength(d?.len), m = o.fragments, y = m[0].start;
            let E = this.flushing ? this.getLoadPosition() : c.end;
            if (u && s) {
                const S = this.getLoadPosition();
                h && !It(u.attrs, h.attrs) && (E = S), o.PTSKnown && S < y && (c.end > y || c.nextStart) && (this.log("Alt audio track ahead of main track, seek to start of alt audio track"), s.currentTime = y + .05);
            }
            if (f >= g && !u && E < m[m.length - 1].start) return;
            let x = this.getNextFragment(E, o), T = !1;
            if (x && this.isLoopLoading(x, E) && (T = !!x.gap, x = this.getNextFragmentLoopLoading(x, o, c, B.MAIN, g)), !x) {
                this.bufferFlushed = !0;
                return;
            }
            const b = d && x.start > d.end + o.targetduration;
            if (b || !(d != null && d.len) && c.len) {
                const S = this.getAppendedFrag(x.start, B.MAIN);
                if (S === null || (T || (T = !!S.gap || !!b && d.len === 0), b && !T || T && c.nextStart && c.nextStart < S.end)) return;
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
            this.resetTransmuxer(), this.levels = t.map((s)=>new bt(s));
        }
        onAudioTrackSwitching(e, t) {
            const s = !!t.url;
            this.trackId = t.id;
            const { fragCurrent: i } = this;
            i && (i.abortRequests(), this.removeUnbufferedFrags(i.start)), this.resetLoadingState(), s ? this.setInterval(er) : this.resetTransmuxer(), s ? (this.switchingTrack = t, this.state = C.IDLE, this.flushAudioIfNeeded(t)) : (this.switchingTrack = null, this.bufferedTrack = t, this.state = C.STOPPED), this.tick();
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
            const { levels: i } = this, { details: n, id: a } = t;
            if (!i) {
                this.warn(`Audio tracks were reset while loading level ${a}`);
                return;
            }
            this.log(`Audio track ${a} loaded [${n.startSN},${n.endSN}]${n.lastPartSn ? `[part-${n.lastPartSn}-${n.lastPartIndex}]` : ""},duration:${n.totalduration}`);
            const o = i[a];
            let l = 0;
            if (n.live || (s = o.details) != null && s.live) {
                this.checkLiveUpdate(n);
                const h = this.mainDetails;
                if (n.deltaUpdateFailed || !h) return;
                if (!o.details && n.hasProgramDateTime && h.hasProgramDateTime) _s(n, h), l = n.fragments[0].start;
                else {
                    var c;
                    l = this.alignPlaylists(n, o.details, (c = this.levelLastLoaded) == null ? void 0 : c.details);
                }
            }
            o.details = n, this.levelLastLoaded = o, !this.startFragRequested && (this.mainDetails || !n.live) && this.setStartPosition(this.mainDetails || n, l), this.state === C.WAITING_TRACK && !this.waitForCdnTuneIn(n) && (this.state = C.IDLE), this.tick();
        }
        _handleFragmentLoadProgress(e) {
            var t;
            const { frag: s, part: i, payload: n } = e, { config: a, trackId: o, levels: l } = this;
            if (!l) {
                this.warn(`Audio tracks were reset while fragment load was in progress. Fragment ${s.sn} of level ${s.level} will not be buffered`);
                return;
            }
            const c = l[o];
            if (!c) {
                this.warn("Audio track is undefined on fragment load progress");
                return;
            }
            const h = c.details;
            if (!h) {
                this.warn("Audio track details undefined on fragment load progress"), this.removeUnbufferedFrags(s.start);
                return;
            }
            const u = a.defaultAudioCodec || c.audioCodec || "mp4a.40.2";
            let d = this.transmuxer;
            d || (d = this.transmuxer = new ya(this.hls, B.AUDIO, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)));
            const f = this.initPTS[s.cc], g = (t = s.initSegment) == null ? void 0 : t.data;
            if (f !== void 0) {
                const y = i ? i.index : -1, E = y !== -1, x = new Qi(s.level, s.sn, s.stats.chunkCount, n.byteLength, y, E);
                d.push(n, g, u, "", s, i, h.totalduration, !1, x, f);
            } else {
                this.log(`Unknown video PTS for cc ${s.cc}, waiting for video PTS before demuxing audio frag ${s.sn} of [${h.startSN} ,${h.endSN}],track ${o}`);
                const { cache: m } = this.waitingData = this.waitingData || {
                    frag: s,
                    part: i,
                    cache: new ta,
                    complete: !1
                };
                m.push(new Uint8Array(n)), this.waitingVideoCC = this.videoTrackCC, this.state = C.WAITING_INIT_PTS;
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
                    const n = this.videoBuffer || this.media;
                    n && Z.getBuffered(n).length && (this.loadedmetadata = !0);
                }
                return;
            }
            if (this.fragContextChanged(s)) {
                this.warn(`Fragment ${s.sn}${i ? " p: " + i.index : ""} of level ${s.level} finished buffering, but was aborted. state: ${this.state}, audioSwitch: ${this.switchingTrack ? this.switchingTrack.name : "false"}`);
                return;
            }
            if (s.sn !== "initSegment") {
                this.fragPrevious = s;
                const n = this.switchingTrack;
                n && (this.bufferedTrack = n, this.switchingTrack = null, this.hls.trigger(p.AUDIO_TRACK_SWITCHED, he({}, n)));
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
            const s = "audio", { hls: i } = this, { remuxResult: n, chunkMeta: a } = e, o = this.getCurrentContext(a);
            if (!o) {
                this.resetWhenMissingContext(a);
                return;
            }
            const { frag: l, part: c, level: h } = o, { details: u } = h, { audio: d, text: f, id3: g, initSegment: m } = n;
            if (this.fragContextChanged(l) || !u) {
                this.fragmentTracker.removeFragment(l);
                return;
            }
            if (this.state = C.PARSING, this.switchingTrack && d && this.completeAudioSwitch(this.switchingTrack), m != null && m.tracks) {
                const y = l.initSegment || l;
                this._bufferInitSegment(h, m.tracks, y, a), i.trigger(p.FRAG_PARSING_INIT_SEGMENT, {
                    frag: y,
                    id: s,
                    tracks: m.tracks
                });
            }
            if (d) {
                const { startPTS: y, endPTS: E, startDTS: x, endDTS: T } = d;
                c && (c.elementaryStreams[Q.AUDIO] = {
                    startPTS: y,
                    endPTS: E,
                    startDTS: x,
                    endDTS: T
                }), l.setElementaryStreamInfo(Q.AUDIO, y, E, x, T), this.bufferFragmentData(d, l, c, a);
            }
            if (g != null && (t = g.samples) != null && t.length) {
                const y = ne({
                    id: s,
                    frag: l,
                    details: u
                }, g);
                i.trigger(p.FRAG_PARSING_METADATA, y);
            }
            if (f) {
                const y = ne({
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
            const n = t.audio;
            if (!n) return;
            n.id = "audio";
            const a = e.audioCodec;
            this.log(`Init audio buffer, container:${n.container}, codecs[level/parsed]=[${a}/${n.codec}]`), a && a.split(",").length === 1 && (n.levelCodec = a), this.hls.trigger(p.BUFFER_CODECS, t);
            const o = n.initSegment;
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
            if (this.fragCurrent = e, this.switchingTrack || i === le.NOT_LOADED || i === le.PARTIAL) {
                var n;
                if (e.sn === "initSegment") this._loadInitSegment(e, t);
                else if ((n = t.details) != null && n.live && !this.initPTS[e.cc]) {
                    this.log(`Waiting for video PTS in continuity counter ${e.cc} of live stream before loading audio fragment ${e.sn} of level ${this.trackId}`), this.state = C.WAITING_INIT_PTS;
                    const a = this.mainDetails;
                    a && a.fragments[0].start !== t.details.fragments[0].start && _s(t.details, a);
                } else this.startFragRequested = !0, super.loadFragment(e, t, s);
            } else this.clearTrackerIfNeeded(e);
        }
        flushAudioIfNeeded(e) {
            const { media: t, bufferedTrack: s } = this, i = s?.attrs, n = e.attrs;
            t && i && (i.CHANNELS !== n.CHANNELS || s.name !== e.name || s.lang !== e.lang) && (this.log("Switching audio track : flushing all audio"), super.flushMainBuffer(0, Number.POSITIVE_INFINITY, "audio"), this.bufferedTrack = null);
        }
        completeAudioSwitch(e) {
            const { hls: t } = this;
            this.flushAudioIfNeeded(e), this.bufferedTrack = e, this.switchingTrack = null, t.trigger(p.AUDIO_TRACK_SWITCHED, he({}, e));
        }
    }
    class Pc extends Xi {
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
            const { id: s, groupId: i, details: n } = t, a = this.tracksInGroup[s];
            if (!a || a.groupId !== i) {
                this.warn(`Audio track with id:${s} and group:${i} not found in active group ${a?.groupId}`);
                return;
            }
            const o = a.details;
            a.details = t.details, this.log(`Audio track ${s} "${a.name}" lang:${a.lang} group:${i} loaded [${n.startSN}-${n.endSN}]`), s === this.trackId && this.playlistLoaded(s, t, o);
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
            let n = this.currentTrack;
            if (!s || i?.length !== s?.length || s != null && s.some((o)=>i?.indexOf(o) === -1)) {
                this.groupIds = s, this.trackId = -1, this.currentTrack = null;
                const o = this.tracks.filter((d)=>!s || s.indexOf(d.groupId) !== -1);
                if (o.length) this.selectDefaultTrack && !o.some((d)=>d.default) && (this.selectDefaultTrack = !1), o.forEach((d, f)=>{
                    d.id = f;
                });
                else if (!n && !this.tracksInGroup.length) return;
                this.tracksInGroup = o;
                const l = this.hls.config.audioPreference;
                if (!n && l) {
                    const d = $e(l, o, pt);
                    if (d > -1) n = o[d];
                    else {
                        const f = $e(l, this.tracks);
                        n = this.tracks[f];
                    }
                }
                let c = this.findTrackId(n);
                c === -1 && n && (c = this.findTrackId(null));
                const h = {
                    audioTracks: o
                };
                this.log(`Updating audio tracks, ${o.length} track(s) found in group(s): ${s?.join(",")}`), this.hls.trigger(p.AUDIO_TRACKS_UPDATED, h);
                const u = this.trackId;
                if (c !== -1 && u === -1) this.setAudioTrack(c);
                else if (o.length && u === -1) {
                    var a;
                    const d = new Error(`No audio track selected for current audio group-ID(s): ${(a = this.groupIds) == null ? void 0 : a.join(",")} track count: ${o.length}`);
                    this.warn(d.message), this.hls.trigger(p.ERROR, {
                        type: G.MEDIA_ERROR,
                        details: A.AUDIO_TRACK_LOAD_ERROR,
                        fatal: !0,
                        error: d
                    });
                }
            } else this.shouldReloadPlaylist(n) && this.setAudioTrack(this.trackId);
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
                    if (i && Lt(e, i, pt)) return i;
                    const n = $e(e, this.tracksInGroup, pt);
                    if (n > -1) {
                        const a = this.tracksInGroup[n];
                        return this.setAudioTrack(n), a;
                    } else if (i) {
                        let a = t.loadLevel;
                        a === -1 && (a = t.firstAutoLevel);
                        const o = Pl(e, t.levels, s, a, pt);
                        if (o === -1) return null;
                        t.nextLoadLevel = o;
                    }
                    if (e.channels || e.audioCodec) {
                        const a = $e(e, s);
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
            const s = this.currentTrack, i = t[e], n = i.details && !i.details.live;
            if (e === this.trackId && i === s && n || (this.log(`Switching to audio-track ${e} "${i.name}" lang:${i.lang} group:${i.groupId} channels:${i.channels}`), this.trackId = e, this.currentTrack = i, this.hls.trigger(p.AUDIO_TRACK_SWITCHING, he({}, i)), n)) return;
            const a = this.switchParams(i.url, s?.details, i.details);
            this.loadPlaylist(a);
        }
        findTrackId(e) {
            const t = this.tracksInGroup;
            for(let s = 0; s < t.length; s++){
                const i = t[s];
                if (!(this.selectDefaultTrack && !i.default) && (!e || Lt(e, i, pt))) return s;
            }
            if (e) {
                const { name: s, lang: i, assocLang: n, characteristics: a, audioCodec: o, channels: l } = e;
                for(let c = 0; c < t.length; c++){
                    const h = t[c];
                    if (Lt({
                        name: s,
                        lang: i,
                        assocLang: n,
                        characteristics: a,
                        audioCodec: o,
                        channels: l
                    }, h, pt)) return c;
                }
                for(let c = 0; c < t.length; c++){
                    const h = t[c];
                    if (It(e.attrs, h.attrs, [
                        "LANGUAGE",
                        "ASSOC-LANGUAGE",
                        "CHARACTERISTICS"
                    ])) return c;
                }
                for(let c = 0; c < t.length; c++){
                    const h = t[c];
                    if (It(e.attrs, h.attrs, [
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
                let n = t.url;
                if (e) try {
                    n = e.addDirectives(n);
                } catch (a) {
                    this.warn(`Could not construct new URL with HLS Delivery Directives: ${a}`);
                }
                this.log(`loading audio-track playlist ${s} "${t.name}" lang:${t.lang} group:${i}`), this.clearTimer(), this.hls.trigger(p.AUDIO_TRACK_LOADING, {
                    url: n,
                    id: s,
                    groupId: i,
                    deliveryDirectives: e || null
                });
            }
        }
    }
    const tr = 500;
    class Fc extends Zi {
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
            this.stopLoad(), this.state = C.IDLE, this.setInterval(tr), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = e, this.tick();
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
            const n = this.tracksBuffered[this.currentTrackId];
            if (!n) return;
            let a;
            const o = s.start;
            for(let c = 0; c < n.length; c++)if (o >= n[c].start && o <= n[c].end) {
                a = n[c];
                break;
            }
            const l = s.start + s.duration;
            a ? a.end = l : (a = {
                start: o,
                end: l
            }, n.push(a)), this.fragmentTracker.fragBuffered(s), this.fragBufferedComplete(s, null);
        }
        onBufferFlushing(e, t) {
            const { startOffset: s, endOffset: i } = t;
            if (s === 0 && i !== Number.POSITIVE_INFINITY) {
                const n = i - 1;
                if (n <= 0) return;
                t.endOffsetSubtitles = Math.max(0, n), this.tracksBuffered.forEach((a)=>{
                    for(let o = 0; o < a.length;){
                        if (a[o].end <= n) {
                            a.shift();
                            continue;
                        } else if (a[o].start < n) a[o].start = n;
                        else break;
                        o++;
                    }
                }), this.fragmentTracker.removeFragmentsInRange(s, n, B.SUBTITLE);
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
            if (this.levels && Ea(this.levels, t)) {
                this.levels = t.map((s)=>new bt(s));
                return;
            }
            this.tracksBuffered = [], this.levels = t.map((s)=>{
                const i = new bt(s);
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
            i != null && i.details ? this.mediaBuffer = this.mediaBufferTimeRanges : this.mediaBuffer = null, i && this.setInterval(tr);
        }
        onSubtitleTrackLoaded(e, t) {
            var s;
            const { currentTrackId: i, levels: n } = this, { details: a, id: o } = t;
            if (!n) {
                this.warn(`Subtitle tracks were reset while loading level ${o}`);
                return;
            }
            const l = n[o];
            if (o >= n.length || !l) return;
            this.log(`Subtitle track ${o} loaded [${a.startSN},${a.endSN}]${a.lastPartSn ? `[part-${a.lastPartSn}-${a.lastPartIndex}]` : ""},duration:${a.totalduration}`), this.mediaBuffer = this.mediaBufferTimeRanges;
            let c = 0;
            if (a.live || (s = l.details) != null && s.live) {
                const u = this.mainDetails;
                if (a.deltaUpdateFailed || !u) return;
                const d = u.fragments[0];
                if (!l.details) a.hasProgramDateTime && u.hasProgramDateTime ? (_s(a, u), c = a.fragments[0].start) : d && (c = d.start, _i(a, c));
                else {
                    var h;
                    c = this.alignPlaylists(a, l.details, (h = this.levelLastLoaded) == null ? void 0 : h.details), c === 0 && d && (c = d.start, _i(a, c));
                }
            }
            l.details = a, this.levelLastLoaded = l, o === i && (!this.startFragRequested && (this.mainDetails || !a.live) && this.setStartPosition(this.mainDetails || a, c), this.tick(), a.live && !this.fragCurrent && this.media && this.state === C.IDLE && (Cs(null, a.fragments, this.media.currentTime, 0) || (this.warn("Subtitle playlist not aligned with playback"), l.details = void 0)));
        }
        _handleFragmentLoadComplete(e) {
            const { frag: t, payload: s } = e, i = t.decryptdata, n = this.hls;
            if (!this.fragContextChanged(t) && s && s.byteLength > 0 && i != null && i.key && i.iv && i.method === "AES-128") {
                const a = performance.now();
                this.decrypter.decrypt(new Uint8Array(s), i.key.buffer, i.iv.buffer).catch((o)=>{
                    throw n.trigger(p.ERROR, {
                        type: G.MEDIA_ERROR,
                        details: A.FRAG_DECRYPT_ERROR,
                        fatal: !1,
                        error: o,
                        reason: o.message,
                        frag: t
                    }), o;
                }).then((o)=>{
                    const l = performance.now();
                    n.trigger(p.FRAG_DECRYPTED, {
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
                const { config: i } = this, n = this.getLoadPosition(), a = Z.bufferedInfo(this.tracksBuffered[this.currentTrackId] || [], n, i.maxBufferHole), { end: o, len: l } = a, c = this.getFwdBufferInfo(this.media, B.MAIN), h = s.details, u = this.getMaxBufferLength(c?.len) + h.levelTargetDuration;
                if (l > u) return;
                const d = h.fragments, f = d.length, g = h.edge;
                let m = null;
                const y = this.fragPrevious;
                if (o < g) {
                    const E = i.maxFragLookUpTolerance, x = o > g - E ? 0 : E;
                    m = Cs(y, d, Math.max(d[0].start, o), x), !m && y && y.start < d[0].start && (m = d[0]);
                } else m = d[f - 1];
                if (!m) return;
                if (m = this.mapToInitFragWhenRequired(m), m.sn !== "initSegment") {
                    const E = m.sn - h.startSN, x = d[E - 1];
                    x && x.cc === m.cc && this.fragmentTracker.getState(x) === le.NOT_LOADED && (m = x);
                }
                this.fragmentTracker.getState(m) === le.NOT_LOADED && this.loadFragment(m, s, o);
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
            return new Oc(this.tracksBuffered[this.currentTrackId] || []);
        }
    }
    class Oc {
        constructor(e){
            this.buffered = void 0;
            const t = (s, i, n)=>{
                if (i = i >>> 0, i > n - 1) throw new DOMException(`Failed to execute '${s}' on 'TimeRanges': The index provided (${i}) is greater than the maximum bound (${n})`);
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
    class Mc extends Xi {
        constructor(e){
            super(e, "[subtitle-track-controller]"), this.media = null, this.tracks = [], this.groupIds = null, this.tracksInGroup = [], this.trackId = -1, this.currentTrack = null, this.selectDefaultTrack = !0, this.queuedDefaultTrack = -1, this.asyncPollTrackChange = ()=>this.pollTrackChange(0), this.useTextTrackPolling = !1, this.subtitlePollingInterval = -1, this._subtitleDisplay = !0, this.onTextTracksChanged = ()=>{
                if (this.useTextTrackPolling || self.clearInterval(this.subtitlePollingInterval), !this.media || !this.hls.config.renderTextTracksNatively) return;
                let t = null;
                const s = cs(this.media.textTracks);
                for(let n = 0; n < s.length; n++)if (s[n].mode === "hidden") t = s[n];
                else if (s[n].mode === "showing") {
                    t = s[n];
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
            self.clearInterval(this.subtitlePollingInterval), this.useTextTrackPolling || this.media.textTracks.removeEventListener("change", this.asyncPollTrackChange), this.trackId > -1 && (this.queuedDefaultTrack = this.trackId), cs(this.media.textTracks).forEach((t)=>{
                vt(t);
            }), this.subtitleTrack = -1, this.media = null;
        }
        onManifestLoading() {
            this.tracks = [], this.groupIds = null, this.tracksInGroup = [], this.trackId = -1, this.currentTrack = null, this.selectDefaultTrack = !0;
        }
        onManifestParsed(e, t) {
            this.tracks = t.subtitleTracks;
        }
        onSubtitleTrackLoaded(e, t) {
            const { id: s, groupId: i, details: n } = t, a = this.tracksInGroup[s];
            if (!a || a.groupId !== i) {
                this.warn(`Subtitle track with id:${s} and group:${i} not found in active group ${a?.groupId}`);
                return;
            }
            const o = a.details;
            a.details = t.details, this.log(`Subtitle track ${s} "${a.name}" lang:${a.lang} group:${i} loaded [${n.startSN}-${n.endSN}]`), s === this.trackId && this.playlistLoaded(s, t, o);
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
            let n = this.currentTrack;
            if (!s || i?.length !== s?.length || s != null && s.some((a)=>i?.indexOf(a) === -1)) {
                this.groupIds = s, this.trackId = -1, this.currentTrack = null;
                const a = this.tracks.filter((h)=>!s || s.indexOf(h.groupId) !== -1);
                if (a.length) this.selectDefaultTrack && !a.some((h)=>h.default) && (this.selectDefaultTrack = !1), a.forEach((h, u)=>{
                    h.id = u;
                });
                else if (!n && !this.tracksInGroup.length) return;
                this.tracksInGroup = a;
                const o = this.hls.config.subtitlePreference;
                if (!n && o) {
                    this.selectDefaultTrack = !1;
                    const h = $e(o, a);
                    if (h > -1) n = a[h];
                    else {
                        const u = $e(o, this.tracks);
                        n = this.tracks[u];
                    }
                }
                let l = this.findTrackId(n);
                l === -1 && n && (l = this.findTrackId(null));
                const c = {
                    subtitleTracks: a
                };
                this.log(`Updating subtitle tracks, ${a.length} track(s) found in "${s?.join(",")}" group-id`), this.hls.trigger(p.SUBTITLE_TRACKS_UPDATED, c), l !== -1 && this.trackId === -1 && this.setSubtitleTrack(l);
            } else this.shouldReloadPlaylist(n) && this.setSubtitleTrack(this.trackId);
        }
        findTrackId(e) {
            const t = this.tracksInGroup, s = this.selectDefaultTrack;
            for(let i = 0; i < t.length; i++){
                const n = t[i];
                if (!(s && !n.default || !s && !e) && (!e || Lt(n, e))) return i;
            }
            if (e) {
                for(let i = 0; i < t.length; i++){
                    const n = t[i];
                    if (It(e.attrs, n.attrs, [
                        "LANGUAGE",
                        "ASSOC-LANGUAGE",
                        "CHARACTERISTICS"
                    ])) return i;
                }
                for(let i = 0; i < t.length; i++){
                    const n = t[i];
                    if (It(e.attrs, n.attrs, [
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
                    if (Pi(i, e)) return s;
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
                    if (s && Lt(e, s)) return s;
                    const i = $e(e, this.tracksInGroup);
                    if (i > -1) {
                        const n = this.tracksInGroup[i];
                        return this.setSubtitleTrack(i), n;
                    } else {
                        if (s) return null;
                        {
                            const n = $e(e, t);
                            if (n > -1) return t[n];
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
                let n = t.url;
                if (e) try {
                    n = e.addDirectives(n);
                } catch (a) {
                    this.warn(`Could not construct new URL with HLS Delivery Directives: ${a}`);
                }
                this.log(`Loading subtitle playlist for id ${s}`), this.hls.trigger(p.SUBTITLE_TRACK_LOADING, {
                    url: n,
                    id: s,
                    groupId: i,
                    deliveryDirectives: e || null
                });
            }
        }
        toggleTrackModes() {
            const { media: e } = this;
            if (!e) return;
            const t = cs(e.textTracks), s = this.currentTrack;
            let i;
            if (s && (i = t.filter((n)=>Pi(s, n))[0], i || this.warn(`Unable to find subtitle TextTrack with name "${s.name}" and language "${s.lang}"`)), [].slice.call(t).forEach((n)=>{
                n.mode !== "disabled" && n !== i && (n.mode = "disabled");
            }), i) {
                const n = this.subtitleDisplay ? "showing" : "hidden";
                i.mode !== n && (i.mode = n);
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
            const n = !!i.details && !i.details.live;
            if (e === this.trackId && i === s && n) return;
            this.log(`Switching to subtitle-track ${e}` + (i ? ` "${i.name}" lang:${i.lang} group:${i.groupId}` : ""));
            const { id: a, groupId: o = "", name: l, type: c, url: h } = i;
            this.hls.trigger(p.SUBTITLE_TRACK_SWITCH, {
                id: a,
                groupId: o,
                name: l,
                type: c,
                url: h
            });
            const u = this.switchParams(i.url, s?.details, i.details);
            this.loadPlaylist(u);
        }
    }
    class Nc {
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
            const s = new Promise((n)=>{
                t = n;
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
                    v.warn(`[buffer-operation-queue]: Exception executing "${e}" SourceBuffer operation: ${i}`), s.onError(i);
                    const n = this.buffers[e];
                    n != null && n.updating || this.shiftAndExecuteNext(e);
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
    const sr = /(avc[1234]|hvc1|hev1|dvh[1e]|vp09|av01)(?:\.[^.,]+)+/;
    class Uc {
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
                s !== i && v.error(`Media element src was set while attaching MediaSource (${i} > ${s})`);
            }, this.hls = e;
            const t = "[buffer-controller]";
            this.appendSource = qo(ut(e.config.preferManagedMediaSource)), this.log = v.log.bind(v, t), this.warn = v.warn.bind(v, t), this.error = v.error.bind(v, t), this._initSourceBuffer(), this.registerListeners();
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
            this.sourceBuffer = {}, this.operationQueue = new Nc(this.sourceBuffer), this.listeners = {
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
            const s = this.media = t.media, i = ut(this.appendSource);
            if (s && i) {
                var n;
                const a = this.mediaSource = new i;
                this.log(`created media source: ${(n = a.constructor) == null ? void 0 : n.name}`), a.addEventListener("sourceopen", this._onMediaSourceOpen), a.addEventListener("sourceended", this._onMediaSourceEnded), a.addEventListener("sourceclose", this._onMediaSourceClose), this.appendSource && (a.addEventListener("startstreaming", this._onStartStreaming), a.addEventListener("endstreaming", this._onEndStreaming));
                const o = this._objectUrl = self.URL.createObjectURL(a);
                if (this.appendSource) try {
                    s.removeAttribute("src");
                    const l = self.ManagedMediaSource;
                    s.disableRemotePlayback = s.disableRemotePlayback || l && a instanceof l, ir(s), Bc(s, o), s.load();
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
                this.onBufferReset(), t.removeEventListener("sourceopen", this._onMediaSourceOpen), t.removeEventListener("sourceended", this._onMediaSourceEnded), t.removeEventListener("sourceclose", this._onMediaSourceClose), this.appendSource && (t.removeEventListener("startstreaming", this._onStartStreaming), t.removeEventListener("endstreaming", this._onEndStreaming)), e && (e.removeEventListener("emptied", this._onMediaEmptied), s && self.URL.revokeObjectURL(s), this.mediaSrc === s ? (e.removeAttribute("src"), this.appendSource && ir(e), e.load()) : this.warn("media|source.src was changed by a third party - skip cleanup")), this.mediaSource = null, this.media = null, this._objectUrl = null, this.bufferCodecEventsExpected = this._bufferCodecEventsTotal, this.pendingTracks = {}, this.tracks = {};
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
                        const { id: c, codec: h, levelCodec: u, container: d, metadata: f } = t[a], g = An(l.codec, l.levelCodec), m = g?.replace(sr, "$1");
                        let y = An(h, u);
                        const E = (o = y) == null ? void 0 : o.replace(sr, "$1");
                        if (y && m !== E) {
                            a.slice(0, 5) === "audio" && (y = Rs(y, this.appendSource));
                            const x = `${d};codecs=${y}`;
                            this.appendChangeType(a, x), this.log(`switching codec ${g} to ${y}`), this.tracks[a] = {
                                buffer: l.buffer,
                                codec: h,
                                container: d,
                                levelCodec: u,
                                metadata: f,
                                id: c
                            };
                        }
                    }
                } else this.pendingTracks[a] = t[a];
            }), s) return;
            const n = Math.max(this.bufferCodecEventsExpected - 1, 0);
            this.bufferCodecEventsExpected !== n && (this.log(`${n} bufferCodec event(s) expected ${i.join(",")}`), this.bufferCodecEventsExpected = n), this.mediaSource && this.mediaSource.readyState === "open" && this.checkPendingTracks();
        }
        appendChangeType(e, t) {
            const { operationQueue: s } = this, i = {
                execute: ()=>{
                    const n = this.sourceBuffer[e];
                    n && (this.log(`changing ${e} sourceBuffer type to ${t}`), n.changeType(t)), s.shiftAndExecuteNext(e);
                },
                onStart: ()=>{},
                onComplete: ()=>{},
                onError: (n)=>{
                    this.warn(`Failed to change ${e} SourceBuffer type`, n);
                }
            };
            s.append(i, e, !!this.pendingTracks[e]);
        }
        onBufferAppending(e, t) {
            const { hls: s, operationQueue: i, tracks: n } = this, { data: a, type: o, frag: l, part: c, chunkMeta: h } = t, u = h.buffering[o], d = self.performance.now();
            u.start = d;
            const f = l.stats.buffering, g = c ? c.stats.buffering : null;
            f.start === 0 && (f.start = d), g && g.start === 0 && (g.start = d);
            const m = n.audio;
            let y = !1;
            o === "audio" && m?.container === "audio/mpeg" && (y = !this.lastMpegAudioChunk || h.id === 1 || this.lastMpegAudioChunk.sn !== h.sn, this.lastMpegAudioChunk = h);
            const E = l.start, x = {
                execute: ()=>{
                    if (u.executeStart = self.performance.now(), y) {
                        const T = this.sourceBuffer[o];
                        if (T) {
                            const b = E - T.timestampOffset;
                            Math.abs(b) >= .1 && (this.log(`Updating audio SourceBuffer timestampOffset to ${E} (delta: ${b}) sn: ${l.sn})`), T.timestampOffset = E);
                        }
                    }
                    this.appendExecutor(a, o);
                },
                onStart: ()=>{},
                onComplete: ()=>{
                    const T = self.performance.now();
                    u.executeEnd = u.end = T, f.first === 0 && (f.first = T), g && g.first === 0 && (g.first = T);
                    const { sourceBuffer: b } = this, S = {};
                    for(const D in b)S[D] = Z.getBuffered(b[D]);
                    this.appendErrors[o] = 0, o === "audio" || o === "video" ? this.appendErrors.audiovideo = 0 : (this.appendErrors.audio = 0, this.appendErrors.video = 0), this.hls.trigger(p.BUFFER_APPENDED, {
                        type: o,
                        frag: l,
                        part: c,
                        chunkMeta: h,
                        parent: l.type,
                        timeRanges: S
                    });
                },
                onError: (T)=>{
                    const b = {
                        type: G.MEDIA_ERROR,
                        parent: l.type,
                        details: A.BUFFER_APPEND_ERROR,
                        sourceBufferName: o,
                        frag: l,
                        part: c,
                        chunkMeta: h,
                        error: T,
                        err: T,
                        fatal: !1
                    };
                    if (T.code === DOMException.QUOTA_EXCEEDED_ERR) b.details = A.BUFFER_FULL_ERROR;
                    else {
                        const S = ++this.appendErrors[o];
                        b.details = A.BUFFER_APPEND_ERROR, this.warn(`Failed ${S}/${s.config.appendErrorMaxRetry} times to append segment in "${o}" sourceBuffer`), S >= s.config.appendErrorMaxRetry && (b.fatal = !0);
                    }
                    s.trigger(p.ERROR, b);
                }
            };
            i.append(x, o, !!this.pendingTracks[o]);
        }
        onBufferFlushing(e, t) {
            const { operationQueue: s } = this, i = (n)=>({
                    execute: this.removeExecutor.bind(this, n, t.startOffset, t.endOffset),
                    onStart: ()=>{},
                    onComplete: ()=>{
                        this.hls.trigger(p.BUFFER_FLUSHED, {
                            type: n
                        });
                    },
                    onError: (a)=>{
                        this.warn(`Failed to remove from ${n} SourceBuffer`, a);
                    }
                });
            t.type ? s.append(i(t.type), t.type) : this.getSourceBufferTypes().forEach((n)=>{
                s.append(i(n), n);
            });
        }
        onFragParsed(e, t) {
            const { frag: s, part: i } = t, n = [], a = i ? i.elementaryStreams : s.elementaryStreams;
            a[Q.AUDIOVIDEO] ? n.push("audiovideo") : (a[Q.AUDIO] && n.push("audio"), a[Q.VIDEO] && n.push("video"));
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
            n.length === 0 && this.warn(`Fragments must have at least one ElementaryStreamType set. type: ${s.type} level: ${s.level} sn: ${s.sn}`), this.blockBuffers(o, n);
        }
        onFragChanged(e, t) {
            this.trimBuffers();
        }
        onBufferEos(e, t) {
            this.getSourceBufferTypes().reduce((i, n)=>{
                const a = this.sourceBuffer[n];
                return a && (!t.type || t.type === n) && (a.ending = !0, a.ended || (a.ended = !0, this.log(`${n} sourceBuffer now EOS`))), i && !!(!a || a.ended);
            }, !0) && (this.log("Queueing mediaSource.endOfStream()"), this.blockBuffers(()=>{
                this.getSourceBufferTypes().forEach((n)=>{
                    const a = this.sourceBuffer[n];
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
            const n = e.config, a = s.currentTime, o = t.levelTargetDuration, l = t.live && n.liveBackBufferLength !== null ? n.liveBackBufferLength : n.backBufferLength;
            if (M(l) && l > 0) {
                const c = Math.max(l, o), h = Math.floor(a / o) * o - c;
                this.flushBackBuffer(a, o, h);
            }
            if (M(n.frontBufferFlushThreshold) && n.frontBufferFlushThreshold > 0) {
                const c = Math.max(n.maxBufferLength, n.frontBufferFlushThreshold), h = Math.max(c, o), u = Math.floor(a / o) * o + h;
                this.flushFrontBuffer(a, o, u);
            }
        }
        flushBackBuffer(e, t, s) {
            const { details: i, sourceBuffer: n } = this;
            this.getSourceBufferTypes().forEach((o)=>{
                const l = n[o];
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
                    const h = l.start(c - 1), u = l.end(c - 1);
                    if (s > h || e >= h && e <= u) return;
                    if (o.ended && e - u < 2 * t) {
                        this.log(`Cannot flush ${a} front buffer while SourceBuffer is in ended state`);
                        return;
                    }
                    this.hls.trigger(p.BUFFER_FLUSHING, {
                        startOffset: h,
                        endOffset: 1 / 0,
                        type: a
                    });
                }
            });
        }
        updateMediaElementDuration() {
            if (!this.details || !this.media || !this.mediaSource || this.mediaSource.readyState !== "open") return;
            const { details: e, hls: t, media: s, mediaSource: i } = this, n = e.fragments[0].start + e.totalduration, a = s.duration, o = M(i.duration) ? i.duration : 0;
            e.live && t.config.liveDurationInfinity ? (i.duration = 1 / 0, this.updateSeekableRange(e)) : (n > o && n > a || !M(a)) && (this.log(`Updating Media Source duration to ${n.toFixed(3)}`), i.duration = n);
        }
        updateSeekableRange(e) {
            const t = this.mediaSource, s = e.fragments;
            if (s.length && e.live && t != null && t.setLiveSeekableRange) {
                const n = Math.max(0, s[0].start), a = Math.max(n, n + e.totalduration);
                this.log(`Media Source duration is set to ${t.duration}. Setting seekable range to ${n}-${a}.`), t.setLiveSeekableRange(n, a);
            }
        }
        checkPendingTracks() {
            const { bufferCodecEventsExpected: e, operationQueue: t, pendingTracks: s } = this, i = Object.keys(s).length;
            if (i && (!e || i === 2 || "audiovideo" in s)) {
                this.createSourceBuffers(s), this.pendingTracks = {};
                const n = this.getSourceBufferTypes();
                if (n.length) this.hls.trigger(p.BUFFER_CREATED, {
                    tracks: this.tracks
                }), n.forEach((a)=>{
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
            for(const n in e)if (!t[n]) {
                var i;
                const a = e[n];
                if (!a) throw Error(`source buffer exists for track ${n}, however track does not`);
                let o = ((i = a.levelCodec) == null ? void 0 : i.indexOf(",")) === -1 ? a.levelCodec : a.codec;
                o && n.slice(0, 5) === "audio" && (o = Rs(o, this.appendSource));
                const l = `${a.container};codecs=${o}`;
                this.log(`creating sourceBuffer(${l})`);
                try {
                    const c = t[n] = s.addSourceBuffer(l), h = n;
                    this.addBufferListener(h, "updatestart", this._onSBUpdateStart), this.addBufferListener(h, "updateend", this._onSBUpdateEnd), this.addBufferListener(h, "error", this._onSBUpdateError), this.appendSource && this.addBufferListener(h, "bufferedchange", (u, d)=>{
                        const f = d.removedRanges;
                        f != null && f.length && this.hls.trigger(p.BUFFER_FLUSHED, {
                            type: n
                        });
                    }), this.tracks[n] = {
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
                        sourceBufferName: n,
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
            const n = this.operationQueue.current(e);
            n && n.onError(i);
        }
        removeExecutor(e, t, s) {
            const { media: i, mediaSource: n, operationQueue: a, sourceBuffer: o } = this, l = o[e];
            if (!i || !n || !l) {
                this.warn(`Attempting to remove from the ${e} SourceBuffer, but it does not exist`), a.shiftAndExecuteNext(e);
                return;
            }
            const c = M(i.duration) ? i.duration : 1 / 0, h = M(n.duration) ? n.duration : 1 / 0, u = Math.max(0, t), d = Math.min(s, c, h);
            d > u && (!l.ending || l.ended) ? (l.ended = !1, this.log(`Removing [${u},${d}] from the ${e} SourceBuffer`), l.remove(u, d)) : a.shiftAndExecuteNext(e);
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
            const { operationQueue: s } = this, i = t.map((n)=>s.appendBlocker(n));
            Promise.all(i).then(()=>{
                e(), t.forEach((n)=>{
                    const a = this.sourceBuffer[n];
                    a != null && a.updating || s.shiftAndExecuteNext(n);
                });
            });
        }
        getSourceBufferTypes() {
            return Object.keys(this.sourceBuffer);
        }
        addBufferListener(e, t, s) {
            const i = this.sourceBuffer[e];
            if (!i) return;
            const n = s.bind(this, e);
            this.listeners[e].push({
                event: t,
                listener: n
            }), i.addEventListener(t, n);
        }
        removeBufferListeners(e) {
            const t = this.sourceBuffer[e];
            t && this.listeners[e].forEach((s)=>{
                t.removeEventListener(s.event, s.listener);
            });
        }
    }
    function ir(r) {
        const e = r.querySelectorAll("source");
        [].slice.call(e).forEach((t)=>{
            r.removeChild(t);
        });
    }
    function Bc(r, e) {
        const t = self.document.createElement("source");
        t.type = "video/mp4", t.src = e, r.appendChild(t);
    }
    const $c = {
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
    }, Ta = (r)=>String.fromCharCode($c[r] || r), _e = 15, We = 100, Gc = {
        17: 1,
        18: 3,
        21: 5,
        22: 7,
        23: 9,
        16: 11,
        19: 12,
        20: 14
    }, Kc = {
        17: 2,
        18: 4,
        21: 6,
        22: 8,
        23: 10,
        19: 13,
        20: 15
    }, Hc = {
        25: 1,
        26: 3,
        29: 5,
        30: 7,
        31: 9,
        24: 11,
        27: 12,
        28: 14
    }, Vc = {
        25: 2,
        26: 4,
        29: 6,
        30: 8,
        31: 10,
        27: 13,
        28: 15
    }, Wc = [
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
    class Yc {
        constructor(){
            this.time = null, this.verboseLevel = 0;
        }
        log(e, t) {
            if (this.verboseLevel >= e) {
                const s = typeof t == "function" ? t() : t;
                v.log(`${this.time} [${e}] ${s}`);
            }
        }
    }
    const it = function(e) {
        const t = [];
        for(let s = 0; s < e.length; s++)t.push(e[s].toString(16));
        return t;
    };
    class xa {
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
    class qc {
        constructor(){
            this.uchar = " ", this.penState = new xa;
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
    class jc {
        constructor(e){
            this.chars = [], this.pos = 0, this.currPenState = new xa, this.cueStartTime = null, this.logger = void 0;
            for(let t = 0; t < We; t++)this.chars.push(new qc);
            this.logger = e;
        }
        equals(e) {
            for(let t = 0; t < We; t++)if (!this.chars[t].equals(e.chars[t])) return !1;
            return !0;
        }
        copy(e) {
            for(let t = 0; t < We; t++)this.chars[t].copy(e.chars[t]);
        }
        isEmpty() {
            let e = !0;
            for(let t = 0; t < We; t++)if (!this.chars[t].isEmpty()) {
                e = !1;
                break;
            }
            return e;
        }
        setCursor(e) {
            this.pos !== e && (this.pos = e), this.pos < 0 ? (this.logger.log(3, "Negative cursor position " + this.pos), this.pos = 0) : this.pos > We && (this.logger.log(3, "Too large cursor position " + this.pos), this.pos = We);
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
            const t = Ta(e);
            if (this.pos >= We) {
                this.logger.log(0, ()=>"Cannot insert " + e.toString(16) + " (" + t + ") at position " + this.pos + ". Skipping it!");
                return;
            }
            this.chars[this.pos].setChar(t, this.currPenState), this.moveCursor(1);
        }
        clearFromPos(e) {
            let t;
            for(t = e; t < We; t++)this.chars[t].reset();
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
            for(let s = 0; s < We; s++){
                const i = this.chars[s].uchar;
                i !== " " && (t = !1), e.push(i);
            }
            return t ? "" : e.join("");
        }
        setPenStyles(e) {
            this.currPenState.setStyles(e), this.chars[this.pos].setPenState(this.currPenState);
        }
    }
    class ai {
        constructor(e){
            this.rows = [], this.currRow = _e - 1, this.nrRollUpRows = null, this.lastOutputScreen = null, this.logger = void 0;
            for(let t = 0; t < _e; t++)this.rows.push(new jc(e));
            this.logger = e;
        }
        reset() {
            for(let e = 0; e < _e; e++)this.rows[e].clear();
            this.currRow = _e - 1;
        }
        equals(e) {
            let t = !0;
            for(let s = 0; s < _e; s++)if (!this.rows[s].equals(e.rows[s])) {
                t = !1;
                break;
            }
            return t;
        }
        copy(e) {
            for(let t = 0; t < _e; t++)this.rows[t].copy(e.rows[t]);
        }
        isEmpty() {
            let e = !0;
            for(let t = 0; t < _e; t++)if (!this.rows[t].isEmpty()) {
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
                for(let o = 0; o < _e; o++)this.rows[o].clear();
                const n = this.currRow + 1 - this.nrRollUpRows, a = this.lastOutputScreen;
                if (a) {
                    const o = a.rows[n].cueStartTime, l = this.logger.time;
                    if (o !== null && l !== null && o < l) for(let c = 0; c < this.nrRollUpRows; c++)this.rows[t - this.nrRollUpRows + c + 1].copy(a.rows[n + c]);
                }
            }
            this.currRow = t;
            const s = this.rows[this.currRow];
            if (e.indent !== null) {
                const n = e.indent, a = Math.max(n - 1, 0);
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
            for(let n = 0; n < _e; n++){
                const a = this.rows[n].getTextString();
                a && (i = n + 1, e ? t.push("Row " + i + ": '" + a + "'") : t.push(a.trim()));
            }
            return t.length > 0 && (e ? s = "[" + t.join(" | ") + "]" : s = t.join(`
`)), s;
        }
        getTextAndFormat() {
            return this.rows;
        }
    }
    class nr {
        constructor(e, t, s){
            this.chNr = void 0, this.outputFilter = void 0, this.mode = void 0, this.verbose = void 0, this.displayedMemory = void 0, this.nonDisplayedMemory = void 0, this.lastOutputScreen = void 0, this.currRollUpRow = void 0, this.writeScreen = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chNr = e, this.outputFilter = t, this.mode = null, this.verbose = 0, this.displayedMemory = new ai(s), this.nonDisplayedMemory = new ai(s), this.lastOutputScreen = new ai(s), this.currRollUpRow = this.displayedMemory.rows[_e - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null, this.logger = s;
        }
        reset() {
            this.mode = null, this.displayedMemory.reset(), this.nonDisplayedMemory.reset(), this.lastOutputScreen.reset(), this.outputFilter.reset(), this.currRollUpRow = this.displayedMemory.rows[_e - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null;
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
    class rr {
        constructor(e, t, s){
            this.channels = void 0, this.currentChannel = 0, this.cmdHistory = Xc(), this.logger = void 0;
            const i = this.logger = new Yc;
            this.channels = [
                null,
                new nr(e, t, i),
                new nr(e + 1, s, i)
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
                const i = t[s] & 127, n = t[s + 1] & 127;
                let a = !1, o = null;
                if (i === 0 && n === 0) continue;
                this.logger.log(3, ()=>"[" + it([
                        t[s],
                        t[s + 1]
                    ]) + "] -> (" + it([
                        i,
                        n
                    ]) + ")");
                const l = this.cmdHistory;
                if (i >= 16 && i <= 31) {
                    if (zc(i, n, l)) {
                        ts(null, null, l), this.logger.log(3, ()=>"Repeated command (" + it([
                                i,
                                n
                            ]) + ") is dropped");
                        continue;
                    }
                    ts(i, n, this.cmdHistory), a = this.parseCmd(i, n), a || (a = this.parseMidrow(i, n)), a || (a = this.parsePAC(i, n)), a || (a = this.parseBackgroundAttributes(i, n));
                } else ts(null, null, l);
                if (!a && (o = this.parseChars(i, n), o)) {
                    const h = this.currentChannel;
                    h && h > 0 ? this.channels[h].insertChars(o) : this.logger.log(2, "No channel found yet. TEXT-MODE?");
                }
                !a && !o && this.logger.log(2, ()=>"Couldn't parse cleaned data " + it([
                        i,
                        n
                    ]) + " orig: " + it([
                        t[s],
                        t[s + 1]
                    ]));
            }
        }
        parseCmd(e, t) {
            const s = (e === 20 || e === 28 || e === 21 || e === 29) && t >= 32 && t <= 47, i = (e === 23 || e === 31) && t >= 33 && t <= 35;
            if (!(s || i)) return !1;
            const n = e === 20 || e === 21 || e === 23 ? 1 : 2, a = this.channels[n];
            return e === 20 || e === 21 || e === 28 || e === 29 ? t === 32 ? a.ccRCL() : t === 33 ? a.ccBS() : t === 34 ? a.ccAOF() : t === 35 ? a.ccAON() : t === 36 ? a.ccDER() : t === 37 ? a.ccRU(2) : t === 38 ? a.ccRU(3) : t === 39 ? a.ccRU(4) : t === 40 ? a.ccFON() : t === 41 ? a.ccRDC() : t === 42 ? a.ccTR() : t === 43 ? a.ccRTD() : t === 44 ? a.ccEDM() : t === 45 ? a.ccCR() : t === 46 ? a.ccENM() : t === 47 && a.ccEOC() : a.ccTO(t - 32), this.currentChannel = n, !0;
        }
        parseMidrow(e, t) {
            let s = 0;
            if ((e === 17 || e === 25) && t >= 32 && t <= 47) {
                if (e === 17 ? s = 1 : s = 2, s !== this.currentChannel) return this.logger.log(0, "Mismatch channel in midrow parsing"), !1;
                const i = this.channels[s];
                return i ? (i.ccMIDROW(t), this.logger.log(3, ()=>"MIDROW (" + it([
                        e,
                        t
                    ]) + ")"), !0) : !1;
            }
            return !1;
        }
        parsePAC(e, t) {
            let s;
            const i = (e >= 17 && e <= 23 || e >= 25 && e <= 31) && t >= 64 && t <= 127, n = (e === 16 || e === 24) && t >= 64 && t <= 95;
            if (!(i || n)) return !1;
            const a = e <= 23 ? 1 : 2;
            t >= 64 && t <= 95 ? s = a === 1 ? Gc[e] : Hc[e] : s = a === 1 ? Kc[e] : Vc[e];
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
            let s, i = null, n = null;
            if (e >= 25 ? (s = 2, n = e - 8) : (s = 1, n = e), n >= 17 && n <= 19) {
                let a;
                n === 17 ? a = t + 80 : n === 18 ? a = t + 112 : a = t + 144, this.logger.log(2, ()=>"Special char '" + Ta(a) + "' in channel " + s), i = [
                    a
                ];
            } else e >= 32 && e <= 127 && (i = t === 0 ? [
                e
            ] : [
                e,
                t
            ]);
            return i && this.logger.log(3, ()=>"Char codes =  " + it(i).join(",")), i;
        }
        parseBackgroundAttributes(e, t) {
            const s = (e === 16 || e === 24) && t >= 32 && t <= 47, i = (e === 23 || e === 31) && t >= 45 && t <= 47;
            if (!(s || i)) return !1;
            let n;
            const a = {};
            e === 16 || e === 24 ? (n = Math.floor((t - 32) / 2), a.background = Wc[n], t % 2 === 1 && (a.background = a.background + "_semi")) : t === 45 ? a.background = "transparent" : (a.foreground = "black", t === 47 && (a.underline = !0));
            const o = e <= 23 ? 1 : 2;
            return this.channels[o].setBkgData(a), !0;
        }
        reset() {
            for(let e = 0; e < Object.keys(this.channels).length; e++){
                const t = this.channels[e];
                t && t.reset();
            }
            ts(null, null, this.cmdHistory);
        }
        cueSplitAtTime(e) {
            for(let t = 0; t < this.channels.length; t++){
                const s = this.channels[t];
                s && s.cueSplitAtTime(e);
            }
        }
    }
    function ts(r, e, t) {
        t.a = r, t.b = e;
    }
    function zc(r, e, t) {
        return t.a === r && t.b === e;
    }
    function Xc() {
        return {
            a: null,
            b: null
        };
    }
    class ss {
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
    var an = function() {
        if (Rt != null && Rt.VTTCue) return self.VTTCue;
        const r = [
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
            return t(r, o);
        }
        function i(o) {
            return t(e, o);
        }
        function n(o, ...l) {
            let c = 1;
            for(; c < arguments.length; c++){
                const h = arguments[c];
                for(const u in h)o[u] = h[u];
            }
            return o;
        }
        function a(o, l, c) {
            const h = this, u = {
                enumerable: !0
            };
            h.hasBeenReset = !1;
            let d = "", f = !1, g = o, m = l, y = c, E = null, x = "", T = !0, b = "auto", S = "start", D = 50, R = "middle", _ = 50, P = "middle";
            Object.defineProperty(h, "id", n({}, u, {
                get: function() {
                    return d;
                },
                set: function(I) {
                    d = "" + I;
                }
            })), Object.defineProperty(h, "pauseOnExit", n({}, u, {
                get: function() {
                    return f;
                },
                set: function(I) {
                    f = !!I;
                }
            })), Object.defineProperty(h, "startTime", n({}, u, {
                get: function() {
                    return g;
                },
                set: function(I) {
                    if (typeof I != "number") throw new TypeError("Start time must be set to a number.");
                    g = I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(h, "endTime", n({}, u, {
                get: function() {
                    return m;
                },
                set: function(I) {
                    if (typeof I != "number") throw new TypeError("End time must be set to a number.");
                    m = I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(h, "text", n({}, u, {
                get: function() {
                    return y;
                },
                set: function(I) {
                    y = "" + I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(h, "region", n({}, u, {
                get: function() {
                    return E;
                },
                set: function(I) {
                    E = I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(h, "vertical", n({}, u, {
                get: function() {
                    return x;
                },
                set: function(I) {
                    const w = s(I);
                    if (w === !1) throw new SyntaxError("An invalid or illegal string was specified.");
                    x = w, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(h, "snapToLines", n({}, u, {
                get: function() {
                    return T;
                },
                set: function(I) {
                    T = !!I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(h, "line", n({}, u, {
                get: function() {
                    return b;
                },
                set: function(I) {
                    if (typeof I != "number" && I !== "auto") throw new SyntaxError("An invalid number or illegal string was specified.");
                    b = I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(h, "lineAlign", n({}, u, {
                get: function() {
                    return S;
                },
                set: function(I) {
                    const w = i(I);
                    if (!w) throw new SyntaxError("An invalid or illegal string was specified.");
                    S = w, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(h, "position", n({}, u, {
                get: function() {
                    return D;
                },
                set: function(I) {
                    if (I < 0 || I > 100) throw new Error("Position must be between 0 and 100.");
                    D = I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(h, "positionAlign", n({}, u, {
                get: function() {
                    return R;
                },
                set: function(I) {
                    const w = i(I);
                    if (!w) throw new SyntaxError("An invalid or illegal string was specified.");
                    R = w, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(h, "size", n({}, u, {
                get: function() {
                    return _;
                },
                set: function(I) {
                    if (I < 0 || I > 100) throw new Error("Size must be between 0 and 100.");
                    _ = I, this.hasBeenReset = !0;
                }
            })), Object.defineProperty(h, "align", n({}, u, {
                get: function() {
                    return P;
                },
                set: function(I) {
                    const w = i(I);
                    if (!w) throw new SyntaxError("An invalid or illegal string was specified.");
                    P = w, this.hasBeenReset = !0;
                }
            })), h.displayState = void 0;
        }
        return a.prototype.getCueAsHTML = function() {
            return self.WebVTT.convertCueToDOMTree(self, this.text);
        }, a;
    }();
    class Qc {
        decode(e, t) {
            if (!e) return "";
            if (typeof e != "string") throw new Error("Error - expected string data.");
            return decodeURIComponent(encodeURIComponent(e));
        }
    }
    function Sa(r) {
        function e(s, i, n, a) {
            return (s | 0) * 3600 + (i | 0) * 60 + (n | 0) + parseFloat(a || 0);
        }
        const t = r.match(/^(?:(\d+):)?(\d{2}):(\d{2})(\.\d+)?/);
        return t ? parseFloat(t[2]) > 59 ? e(t[2], t[3], 0, t[4]) : e(t[1], t[2], t[3], t[4]) : null;
    }
    class Jc {
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
    function va(r, e, t, s) {
        const i = s ? r.split(s) : [
            r
        ];
        for(const n in i){
            if (typeof i[n] != "string") continue;
            const a = i[n].split(t);
            if (a.length !== 2) continue;
            const o = a[0], l = a[1];
            e(o, l);
        }
    }
    const Fi = new an(0, 0, ""), is = Fi.align === "middle" ? "middle" : "center";
    function Zc(r, e, t) {
        const s = r;
        function i() {
            const o = Sa(r);
            if (o === null) throw new Error("Malformed timestamp: " + s);
            return r = r.replace(/^[^\sa-zA-Z-]+/, ""), o;
        }
        function n(o, l) {
            const c = new Jc;
            va(o, function(d, f) {
                let g;
                switch(d){
                    case "region":
                        for(let m = t.length - 1; m >= 0; m--)if (t[m].id === f) {
                            c.set(d, t[m].region);
                            break;
                        }
                        break;
                    case "vertical":
                        c.alt(d, f, [
                            "rl",
                            "lr"
                        ]);
                        break;
                    case "line":
                        g = f.split(","), c.integer(d, g[0]), c.percent(d, g[0]) && c.set("snapToLines", !1), c.alt(d, g[0], [
                            "auto"
                        ]), g.length === 2 && c.alt("lineAlign", g[1], [
                            "start",
                            is,
                            "end"
                        ]);
                        break;
                    case "position":
                        g = f.split(","), c.percent(d, g[0]), g.length === 2 && c.alt("positionAlign", g[1], [
                            "start",
                            is,
                            "end",
                            "line-left",
                            "line-right",
                            "auto"
                        ]);
                        break;
                    case "size":
                        c.percent(d, f);
                        break;
                    case "align":
                        c.alt(d, f, [
                            "start",
                            is,
                            "end",
                            "left",
                            "right"
                        ]);
                        break;
                }
            }, /:/, /\s/), l.region = c.get("region", null), l.vertical = c.get("vertical", "");
            let h = c.get("line", "auto");
            h === "auto" && Fi.line === -1 && (h = -1), l.line = h, l.lineAlign = c.get("lineAlign", "start"), l.snapToLines = c.get("snapToLines", !0), l.size = c.get("size", 100), l.align = c.get("align", is);
            let u = c.get("position", "auto");
            u === "auto" && Fi.position === 50 && (u = l.align === "start" || l.align === "left" ? 0 : l.align === "end" || l.align === "right" ? 100 : 50), l.position = u;
        }
        function a() {
            r = r.replace(/^\s+/, "");
        }
        if (a(), e.startTime = i(), a(), r.slice(0, 3) !== "-->") throw new Error("Malformed time stamp (time stamps must be separated by '-->'): " + s);
        r = r.slice(3), a(), e.endTime = i(), a(), n(r, e);
    }
    function La(r) {
        return r.replace(/<br(?: \/)?>/gi, `
`);
    }
    class eh {
        constructor(){
            this.state = "INITIAL", this.buffer = "", this.decoder = new Qc, this.regionList = [], this.cue = null, this.oncue = void 0, this.onparsingerror = void 0, this.onflush = void 0;
        }
        parse(e) {
            const t = this;
            e && (t.buffer += t.decoder.decode(e, {
                stream: !0
            }));
            function s() {
                let n = t.buffer, a = 0;
                for(n = La(n); a < n.length && n[a] !== "\r" && n[a] !== `
`;)++a;
                const o = n.slice(0, a);
                return n[a] === "\r" && ++a, n[a] === `
` && ++a, t.buffer = n.slice(a), o;
            }
            function i(n) {
                va(n, function(a, o) {}, /:/);
            }
            try {
                let n = "";
                if (t.state === "INITIAL") {
                    if (!/\r\n|\n/.test(t.buffer)) return this;
                    n = s();
                    const o = n.match(/^(ï»¿)?WEBVTT([ \t].*)?$/);
                    if (!(o != null && o[0])) throw new Error("Malformed WebVTT signature.");
                    t.state = "HEADER";
                }
                let a = !1;
                for(; t.buffer;){
                    if (!/\r\n|\n/.test(t.buffer)) return this;
                    switch(a ? a = !1 : n = s(), t.state){
                        case "HEADER":
                            /:/.test(n) ? i(n) : n || (t.state = "ID");
                            continue;
                        case "NOTE":
                            n || (t.state = "ID");
                            continue;
                        case "ID":
                            if (/^NOTE($|[ \t])/.test(n)) {
                                t.state = "NOTE";
                                break;
                            }
                            if (!n) continue;
                            if (t.cue = new an(0, 0, ""), t.state = "CUE", n.indexOf("-->") === -1) {
                                t.cue.id = n;
                                continue;
                            }
                        case "CUE":
                            if (!t.cue) {
                                t.state = "BADCUE";
                                continue;
                            }
                            try {
                                Zc(n, t.cue, t.regionList);
                            } catch  {
                                t.cue = null, t.state = "BADCUE";
                                continue;
                            }
                            t.state = "CUETEXT";
                            continue;
                        case "CUETEXT":
                            {
                                const o = n.indexOf("-->") !== -1;
                                if (!n || o && (a = !0)) {
                                    t.oncue && t.cue && t.oncue(t.cue), t.cue = null, t.state = "ID";
                                    continue;
                                }
                                if (t.cue === null) continue;
                                t.cue.text && (t.cue.text += `
`), t.cue.text += n;
                            }
                            continue;
                        case "BADCUE":
                            n || (t.state = "ID");
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
    const th = /\r\n|\n\r|\n|\r/g, oi = function(e, t, s = 0) {
        return e.slice(s, s + t.length) === t;
    }, sh = function(e) {
        let t = parseInt(e.slice(-3));
        const s = parseInt(e.slice(-6, -4)), i = parseInt(e.slice(-9, -7)), n = e.length > 9 ? parseInt(e.substring(0, e.indexOf(":"))) : 0;
        if (!M(t) || !M(s) || !M(i) || !M(n)) throw Error(`Malformed X-TIMESTAMP-MAP: Local:${e}`);
        return t += 1e3 * s, t += 60 * 1e3 * i, t += 60 * 60 * 1e3 * n, t;
    }, li = function(e) {
        let t = 5381, s = e.length;
        for(; s;)t = t * 33 ^ e.charCodeAt(--s);
        return (t >>> 0).toString();
    };
    function on(r, e, t) {
        return li(r.toString()) + li(e.toString()) + li(t);
    }
    const ih = function(e, t, s) {
        let i = e[t], n = e[i.prevCC];
        if (!n || !n.new && i.new) {
            e.ccOffset = e.presentationOffset = i.start, i.new = !1;
            return;
        }
        for(; (a = n) != null && a.new;){
            var a;
            e.ccOffset += i.start - n.start, i.new = !1, i = n, n = e[i.prevCC];
        }
        e.presentationOffset = s;
    };
    function nh(r, e, t, s, i, n, a) {
        const o = new eh, l = Ge(new Uint8Array(r)).trim().replace(th, `
`).split(`
`), c = [], h = e ? Sc(e.baseTime, e.timescale) : 0;
        let u = "00:00.000", d = 0, f = 0, g, m = !0;
        o.oncue = function(y) {
            const E = t[s];
            let x = t.ccOffset;
            const T = (d - h) / 9e4;
            if (E != null && E.new && (f !== void 0 ? x = t.ccOffset = E.start : ih(t, s, T)), T) {
                if (!e) {
                    g = new Error("Missing initPTS for VTT MPEGTS");
                    return;
                }
                x = T - t.presentationOffset;
            }
            const b = y.endTime - y.startTime, S = ve((y.startTime + x - f) * 9e4, i * 9e4) / 9e4;
            y.startTime = Math.max(S, 0), y.endTime = Math.max(S + b, 0);
            const D = y.text.trim();
            y.text = decodeURIComponent(encodeURIComponent(D)), y.id || (y.id = on(y.startTime, y.endTime, D)), y.endTime > 0 && c.push(y);
        }, o.onparsingerror = function(y) {
            g = y;
        }, o.onflush = function() {
            if (g) {
                a(g);
                return;
            }
            n(c);
        }, l.forEach((y)=>{
            if (m) if (oi(y, "X-TIMESTAMP-MAP=")) {
                m = !1, y.slice(16).split(",").forEach((E)=>{
                    oi(E, "LOCAL:") ? u = E.slice(6) : oi(E, "MPEGTS:") && (d = parseInt(E.slice(7)));
                });
                try {
                    f = sh(u) / 1e3;
                } catch (E) {
                    g = E;
                }
                return;
            } else y === "" && (m = !1);
            o.parse(y + `
`);
        }), o.flush();
    }
    const ci = "stpp.ttml.im1t", Aa = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/, Ra = /^(\d*(?:\.\d*)?)(h|m|s|ms|f|t)$/, rh = {
        left: "start",
        center: "center",
        right: "end",
        start: "start",
        end: "end"
    };
    function ar(r, e, t, s) {
        const i = W(new Uint8Array(r), [
            "mdat"
        ]);
        if (i.length === 0) {
            s(new Error("Could not parse IMSC1 mdat"));
            return;
        }
        const n = i.map((o)=>Ge(o)), a = xc(e.baseTime, 1, e.timescale);
        try {
            n.forEach((o)=>t(ah(o, a)));
        } catch (o) {
            s(o);
        }
    }
    function ah(r, e) {
        const i = new DOMParser().parseFromString(r, "text/xml").getElementsByTagName("tt")[0];
        if (!i) throw new Error("Invalid ttml");
        const n = {
            frameRate: 30,
            subFrameRate: 1,
            frameRateMultiplier: 0,
            tickRate: 0
        }, a = Object.keys(n).reduce((u, d)=>(u[d] = i.getAttribute(`ttp:${d}`) || n[d], u), {}), o = i.getAttribute("xml:space") !== "preserve", l = or(hi(i, "styling", "style")), c = or(hi(i, "layout", "region")), h = hi(i, "body", "[begin]");
        return [].map.call(h, (u)=>{
            const d = ba(u, o);
            if (!d || !u.hasAttribute("begin")) return null;
            const f = di(u.getAttribute("begin"), a), g = di(u.getAttribute("dur"), a);
            let m = di(u.getAttribute("end"), a);
            if (f === null) throw lr(u);
            if (m === null) {
                if (g === null) throw lr(u);
                m = f + g;
            }
            const y = new an(f - e, m - e, d);
            y.id = on(y.startTime, y.endTime, y.text);
            const E = c[u.getAttribute("region")], x = l[u.getAttribute("style")], T = oh(E, x, l), { textAlign: b } = T;
            if (b) {
                const S = rh[b];
                S && (y.lineAlign = S), y.align = b;
            }
            return ne(y, T), y;
        }).filter((u)=>u !== null);
    }
    function hi(r, e, t) {
        const s = r.getElementsByTagName(e)[0];
        return s ? [].slice.call(s.querySelectorAll(t)) : [];
    }
    function or(r) {
        return r.reduce((e, t)=>{
            const s = t.getAttribute("xml:id");
            return s && (e[s] = t), e;
        }, {});
    }
    function ba(r, e) {
        return [].slice.call(r.childNodes).reduce((t, s, i)=>{
            var n;
            return s.nodeName === "br" && i ? t + `
` : (n = s.childNodes) != null && n.length ? ba(s, e) : e ? t + s.textContent.trim().replace(/\s+/g, " ") : t + s.textContent;
        }, "");
    }
    function oh(r, e, t) {
        const s = "http://www.w3.org/ns/ttml#styling";
        let i = null;
        const n = [
            "displayAlign",
            "textAlign",
            "color",
            "backgroundColor",
            "fontSize",
            "fontFamily"
        ], a = r != null && r.hasAttribute("style") ? r.getAttribute("style") : null;
        return a && t.hasOwnProperty(a) && (i = t[a]), n.reduce((o, l)=>{
            const c = ui(e, s, l) || ui(r, s, l) || ui(i, s, l);
            return c && (o[l] = c), o;
        }, {});
    }
    function ui(r, e, t) {
        return r && r.hasAttributeNS(e, t) ? r.getAttributeNS(e, t) : null;
    }
    function lr(r) {
        return new Error(`Could not parse ttml timestamp ${r}`);
    }
    function di(r, e) {
        if (!r) return null;
        let t = Sa(r);
        return t === null && (Aa.test(r) ? t = lh(r, e) : Ra.test(r) && (t = ch(r, e))), t;
    }
    function lh(r, e) {
        const t = Aa.exec(r), s = (t[4] | 0) + (t[5] | 0) / e.subFrameRate;
        return (t[1] | 0) * 3600 + (t[2] | 0) * 60 + (t[3] | 0) + s / e.frameRate;
    }
    function ch(r, e) {
        const t = Ra.exec(r), s = Number(t[1]);
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
    class hh {
        constructor(e){
            this.hls = void 0, this.media = null, this.config = void 0, this.enabled = !0, this.Cues = void 0, this.textTracks = [], this.tracks = [], this.initPTS = [], this.unparsedVttFrags = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.cea608Parser1 = void 0, this.cea608Parser2 = void 0, this.lastCc = -1, this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = hr(), this.captionsProperties = void 0, this.hls = e, this.config = e.config, this.Cues = e.config.cueHandler, this.captionsProperties = {
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
                const e = new ss(this, "textTrack1"), t = new ss(this, "textTrack2"), s = new ss(this, "textTrack3"), i = new ss(this, "textTrack4");
                this.cea608Parser1 = new rr(1, e, t), this.cea608Parser2 = new rr(3, s, i);
            }
        }
        addCues(e, t, s, i, n) {
            let a = !1;
            for(let o = n.length; o--;){
                const l = n[o], c = uh(l[0], l[1], t, s);
                if (c >= 0 && (l[0] = Math.min(l[0], t), l[1] = Math.max(l[1], s), a = !0, c / (s - t) > .5)) return;
            }
            if (a || n.push([
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
        onInitPtsFound(e, { frag: t, id: s, initPTS: i, timescale: n }) {
            const { unparsedVttFrags: a } = this;
            s === "main" && (this.initPTS[t.cc] = {
                baseTime: i,
                timescale: n
            }), a.length && (this.unparsedVttFrags = [], a.forEach((o)=>{
                this.onFragLoaded(p.FRAG_LOADED, o);
            }));
        }
        getExistingTrack(e, t) {
            const { media: s } = this;
            if (s) for(let i = 0; i < s.textTracks.length; i++){
                const n = s.textTracks[i];
                if (cr(n, {
                    name: e,
                    lang: t
                })) return n;
            }
            return null;
        }
        createCaptionsTrack(e) {
            this.config.renderTextTracksNatively ? this.createNativeTrack(e) : this.createNonNativeTrack(e);
        }
        createNativeTrack(e) {
            if (this.captionsTracks[e]) return;
            const { captionsProperties: t, captionsTracks: s, media: i } = this, { label: n, languageCode: a } = t[e], o = this.getExistingTrack(n, a);
            if (o) s[e] = o, vt(s[e]), Yr(s[e], i);
            else {
                const l = this.createTextTrack("captions", n, a);
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
                vt(e[t]), delete e[t];
            }), this.nonNativeCaptionsTracks = {};
        }
        onManifestLoading() {
            this.lastCc = -1, this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = hr(), this._cleanTracks(), this.tracks = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.textTracks = [], this.unparsedVttFrags = [], this.initPTS = [], this.cea608Parser1 && this.cea608Parser2 && (this.cea608Parser1.reset(), this.cea608Parser2.reset());
        }
        _cleanTracks() {
            const { media: e } = this;
            if (!e) return;
            const t = e.textTracks;
            if (t) for(let s = 0; s < t.length; s++)vt(t[s]);
        }
        onSubtitleTracksUpdated(e, t) {
            const s = t.subtitleTracks || [], i = s.some((n)=>n.textCodec === ci);
            if (this.config.enableWebVTT || i && this.config.enableIMSC1) {
                if (Ea(this.tracks, s)) {
                    this.tracks = s;
                    return;
                }
                if (this.textTracks = [], this.tracks = s, this.config.renderTextTracksNatively) {
                    const a = this.media, o = a ? cs(a.textTracks) : null;
                    if (this.tracks.forEach((l, c)=>{
                        let h;
                        if (o) {
                            let u = null;
                            for(let d = 0; d < o.length; d++)if (o[d] && cr(o[d], l)) {
                                u = o[d], o[d] = null;
                                break;
                            }
                            u && (h = u);
                        }
                        if (h) vt(h);
                        else {
                            const u = Ia(l);
                            h = this.createTextTrack(u, l.name, l.lang), h && (h.mode = "disabled");
                        }
                        h && this.textTracks.push(h);
                    }), o != null && o.length) {
                        const l = o.filter((c)=>c !== null).map((c)=>c.label);
                        l.length && v.warn(`Media element contains unused subtitle tracks: ${l.join(", ")}. Replace media element for each source to clear TextTracks and captions menu.`);
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
                const n = `textTrack${i[1]}`, a = this.captionsProperties[n];
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
                const { cea608Parser1: n, cea608Parser2: a, lastSn: o } = this, { cc: l, sn: c } = t.frag, h = (s = (i = t.part) == null ? void 0 : i.index) != null ? s : -1;
                n && a && (c !== o + 1 || c === o && h !== this.lastPartIndex + 1 || l !== this.lastCc) && (n.reset(), a.reset()), this.lastCc = l, this.lastSn = c, this.lastPartIndex = h;
            }
        }
        onFragLoaded(e, t) {
            const { frag: s, payload: i } = t;
            if (s.type === B.SUBTITLE) if (i.byteLength) {
                const n = s.decryptdata, a = "stats" in t;
                if (n == null || !n.encrypted || a) {
                    const o = this.tracks[s.level], l = this.vttCCs;
                    l[s.cc] || (l[s.cc] = {
                        start: s.start,
                        prevCC: this.prevCC,
                        new: !0
                    }, this.prevCC = s.cc), o && o.textCodec === ci ? this._parseIMSC1(s, i) : this._parseVTTs(t);
                }
            } else this.hls.trigger(p.SUBTITLE_FRAG_PROCESSED, {
                success: !1,
                frag: s,
                error: new Error("Empty subtitle payload")
            });
        }
        _parseIMSC1(e, t) {
            const s = this.hls;
            ar(t, this.initPTS[e.cc], (i)=>{
                this._appendCues(i, e.level), s.trigger(p.SUBTITLE_FRAG_PROCESSED, {
                    success: !0,
                    frag: e
                });
            }, (i)=>{
                v.log(`Failed to parse IMSC1: ${i}`), s.trigger(p.SUBTITLE_FRAG_PROCESSED, {
                    success: !1,
                    frag: e,
                    error: i
                });
            });
        }
        _parseVTTs(e) {
            var t;
            const { frag: s, payload: i } = e, { initPTS: n, unparsedVttFrags: a } = this, o = n.length - 1;
            if (!n[s.cc] && o === -1) {
                a.push(e);
                return;
            }
            const l = this.hls, c = (t = s.initSegment) != null && t.data ? be(s.initSegment.data, new Uint8Array(i)) : i;
            nh(c, this.initPTS[s.cc], this.vttCCs, s.cc, s.start, (h)=>{
                this._appendCues(h, s.level), l.trigger(p.SUBTITLE_FRAG_PROCESSED, {
                    success: !0,
                    frag: s
                });
            }, (h)=>{
                const u = h.message === "Missing initPTS for VTT MPEGTS";
                u ? a.push(e) : this._fallbackToIMSC1(s, i), v.log(`Failed to parse VTT cue: ${h}`), !(u && o > s.cc) && l.trigger(p.SUBTITLE_FRAG_PROCESSED, {
                    success: !1,
                    frag: s,
                    error: h
                });
            });
        }
        _fallbackToIMSC1(e, t) {
            const s = this.tracks[e.level];
            s.textCodec || ar(t, this.initPTS[e.cc], ()=>{
                s.textCodec = ci, this._parseIMSC1(e, t);
            }, ()=>{
                s.textCodec = "wvtt";
            });
        }
        _appendCues(e, t) {
            const s = this.hls;
            if (this.config.renderTextTracksNatively) {
                const i = this.textTracks[t];
                if (!i || i.mode === "disabled") return;
                e.forEach((n)=>qr(i, n));
            } else {
                const i = this.tracks[t];
                if (!i) return;
                const n = i.default ? "default" : "subtitles" + t;
                s.trigger(p.CUES_PARSED, {
                    type: "subtitles",
                    cues: e,
                    track: n
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
            const { frag: n, samples: a } = t;
            if (!(n.type === B.MAIN && this.closedCaptionsForLevel(n) === "NONE")) for(let o = 0; o < a.length; o++){
                const l = a[o].bytes;
                if (l) {
                    const c = this.extractCea608Data(l);
                    s.addData(a[o].pts, c[0]), i.addData(a[o].pts, c[1]);
                }
            }
        }
        onBufferFlushing(e, { startOffset: t, endOffset: s, endOffsetSubtitles: i, type: n }) {
            const { media: a } = this;
            if (!(!a || a.currentTime < s)) {
                if (!n || n === "video") {
                    const { captionsTracks: o } = this;
                    Object.keys(o).forEach((l)=>Ii(o[l], t, s));
                }
                if (this.config.renderTextTracksNatively && t === 0 && i !== void 0) {
                    const { textTracks: o } = this;
                    Object.keys(o).forEach((l)=>Ii(o[l], t, i));
                }
            }
        }
        extractCea608Data(e) {
            const t = [
                [],
                []
            ], s = e[0] & 31;
            let i = 2;
            for(let n = 0; n < s; n++){
                const a = e[i++], o = 127 & e[i++], l = 127 & e[i++];
                if (o === 0 && l === 0) continue;
                if ((4 & a) !== 0) {
                    const h = 3 & a;
                    (h === 0 || h === 1) && (t[h].push(o), t[h].push(l));
                }
            }
            return t;
        }
    }
    function Ia(r) {
        return r.characteristics && /transcribes-spoken-dialog/gi.test(r.characteristics) && /describes-music-and-sound/gi.test(r.characteristics) ? "captions" : "subtitles";
    }
    function cr(r, e) {
        return !!r && r.kind === Ia(e) && Pi(e, r);
    }
    function uh(r, e, t, s) {
        return Math.min(e, s) - Math.max(r, t);
    }
    function hr() {
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
    class ln {
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
                    s !== this.autoLevelCapping && v.log(`Setting autoLevelCapping to ${s}: ${e[s].height}p@${e[s].bitrate} for media ${this.mediaWidth}x${this.mediaHeight}`), t.autoLevelCapping = s, t.autoLevelCapping > this.autoLevelCapping && this.streamController && this.streamController.nextLevelSwitch(), this.autoLevelCapping = t.autoLevelCapping;
                }
            }
        }
        getMaxLevel(e) {
            const t = this.hls.levels;
            if (!t.length) return -1;
            const s = t.filter((i, n)=>this.isLevelAllowed(i) && n <= e);
            return this.clientRect = null, ln.getMaxLevelByMediaSize(s, this.mediaWidth, this.mediaHeight);
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
            let n = e.length - 1;
            const a = Math.max(t, s);
            for(let o = 0; o < e.length; o += 1){
                const l = e[o];
                if ((l.width >= a || l.height >= a) && i(l, e[o + 1])) {
                    n = o;
                    break;
                }
            }
            return n;
        }
    }
    class dh {
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
                    const n = i - this.lastTime, a = s - this.lastDroppedFrames, o = t - this.lastDecodedFrames, l = 1e3 * a / n, c = this.hls;
                    if (c.trigger(p.FPS_DROP, {
                        currentDropped: a,
                        currentDecoded: o,
                        totalDroppedFrames: s
                    }), l > 0 && a > c.config.fpsDroppedMonitoringThreshold * o) {
                        let h = c.currentLevel;
                        v.warn("drop FPS ratio greater than max allowed value for currentLevel: " + h), h > 0 && (c.autoLevelCapping === -1 || c.autoLevelCapping >= h) && (h = h - 1, c.trigger(p.FPS_DROP_LEVEL_CAPPING, {
                            level: h,
                            droppedLevel: c.currentLevel
                        }), c.autoLevelCapping = h, this.streamController.nextLevelSwitch());
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
    const ns = "[eme]";
    class At {
        constructor(e){
            this.hls = void 0, this.config = void 0, this.media = null, this.keyFormatPromise = null, this.keySystemAccessPromises = {}, this._requestLicenseFailureCount = 0, this.mediaKeySessions = [], this.keyIdToKeySessionPromise = {}, this.setMediaKeysQueue = At.CDMCleanupPromise ? [
                At.CDMCleanupPromise
            ] : [], this.onMediaEncrypted = this._onMediaEncrypted.bind(this), this.onWaitingForKey = this._onWaitingForKey.bind(this), this.debug = v.debug.bind(v, ns), this.log = v.log.bind(v, ns), this.warn = v.warn.bind(v, ns), this.error = v.error.bind(v, ns), this.hls = e, this.config = e.config, this.registerListeners();
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
            const t = this.hls.levels, s = (a, o, l)=>!!a && l.indexOf(a) === o, i = t.map((a)=>a.audioCodec).filter(s), n = t.map((a)=>a.videoCodec).filter(s);
            return i.length + n.length === 0 && n.push("avc1.42e01e"), new Promise((a, o)=>{
                const l = (c)=>{
                    const h = c.shift();
                    this.getMediaKeysPromise(h, i, n).then((u)=>a({
                            keySystem: h,
                            mediaKeys: u
                        })).catch((u)=>{
                        c.length ? l(c) : u instanceof Se ? o(u) : o(new Se({
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
                return Pr === null && self.location.protocol === "http:" && (i = `navigator.requestMediaKeySystemAccess is not available over insecure protocol ${location.protocol}`), Promise.reject(new Error(i));
            }
            return s(e, t);
        }
        getMediaKeysPromise(e, t, s) {
            const i = To(e, t, s, this.config.drmSystemOptions), n = this.keySystemAccessPromises[e];
            let a = n?.keySystemAccess;
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
                    return this.log(`Create media-keys for "${e}"`), o.mediaKeys = l.createMediaKeys().then((h)=>(this.log(`Media-keys created for "${e}"`), c.then((u)=>u ? this.setMediaKeysServerCertificate(h, e, u) : h))), o.mediaKeys.catch((h)=>{
                        this.error(`Failed to create media-keys for "${e}"}: ${h}`);
                    }), o.mediaKeys;
                });
            }
            return a.then(()=>n.mediaKeys);
        }
        createMediaKeySessionContext({ decryptdata: e, keySystem: t, mediaKeys: s }) {
            this.log(`Creating key-system session "${t}" keyId: ${Ne.hexDump(e.keyId || [])}`);
            const i = s.createSession(), n = {
                decryptdata: e,
                keySystem: t,
                mediaKeys: s,
                mediaKeysSession: i,
                keyStatus: "status-pending"
            };
            return this.mediaKeySessions.push(n), n;
        }
        renewKeySession(e) {
            const t = e.decryptdata;
            if (t.pssh) {
                const s = this.createMediaKeySessionContext(e), i = this.getKeyIdString(t), n = "cenc";
                this.keyIdToKeySessionPromise[i] = this.generateRequestWithPreferredKeySession(s, n, t.pssh, "expired");
            } else this.warn("Could not renew expired session. Missing pssh initData.");
            this.removeSession(e);
        }
        getKeyIdString(e) {
            if (!e) throw new Error("Could not read keyId of undefined decryptdata");
            if (e.keyId === null) throw new Error("keyId is null");
            return Ne.hexDump(e.keyId);
        }
        updateKeySession(e, t) {
            var s;
            const i = e.mediaKeysSession;
            return this.log(`Updating key-session "${i.sessionId}" for keyID ${Ne.hexDump(((s = e.decryptdata) == null ? void 0 : s.keyId) || [])}
      } (data length: ${t && t.byteLength})`), i.update(t);
        }
        selectKeySystemFormat(e) {
            const t = Object.keys(e.levelkeys || {});
            return this.keyFormatPromise || (this.log(`Selecting key-system from fragment (sn: ${e.sn} ${e.type}: ${e.level}) key formats ${t.join(", ")}`), this.keyFormatPromise = this.getKeyFormatPromise(t)), this.keyFormatPromise;
        }
        getKeyFormatPromise(e) {
            return new Promise((t, s)=>{
                const i = js(this.config), n = e.map(yn).filter((a)=>!!a && i.indexOf(a) !== -1);
                return this.getKeySystemSelectionPromise(n).then(({ keySystem: a })=>{
                    const o = En(a);
                    o ? t(o) : s(new Error(`Unable to find format for key-system "${a}"`));
                }).catch(s);
            });
        }
        loadKey(e) {
            const t = e.keyInfo.decryptdata, s = this.getKeyIdString(t), i = `(keyId: ${s} format: "${t.keyFormat}" method: ${t.method} uri: ${t.uri})`;
            this.log(`Starting session for key ${i}`);
            let n = this.keyIdToKeySessionPromise[s];
            return n || (n = this.keyIdToKeySessionPromise[s] = this.getKeySystemForKeyPromise(t).then(({ keySystem: a, mediaKeys: o })=>(this.throwIfDestroyed(), this.log(`Handle encrypted media sn: ${e.frag.sn} ${e.frag.type}: ${e.frag.level} using key ${i}`), this.attemptSetMediaKeys(a, o).then(()=>{
                    this.throwIfDestroyed();
                    const l = this.createMediaKeySessionContext({
                        keySystem: a,
                        mediaKeys: o,
                        decryptdata: t
                    });
                    return this.generateRequestWithPreferredKeySession(l, "cenc", t.pssh, "playlist-key");
                }))), n.catch((a)=>this.handleError(a))), n;
        }
        throwIfDestroyed(e = "Invalid state") {
            if (!this.hls) throw new Error("invalid state");
        }
        handleError(e) {
            this.hls && (this.error(e.message), e instanceof Se ? this.hls.trigger(p.ERROR, e.data) : this.hls.trigger(p.ERROR, {
                type: G.KEY_SYSTEM_ERROR,
                details: A.KEY_SYSTEM_NO_KEYS,
                error: e,
                fatal: !0
            }));
        }
        getKeySystemForKeyPromise(e) {
            const t = this.getKeyIdString(e), s = this.keyIdToKeySessionPromise[t];
            if (!s) {
                const i = yn(e.keyFormat), n = i ? [
                    i
                ] : js(this.config);
                return this.attemptKeySystemAccess(n);
            }
            return s;
        }
        getKeySystemSelectionPromise(e) {
            if (e.length || (e = js(this.config)), e.length === 0) throw new Se({
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
            let i, n;
            if (t === "sinf" && this.config.drmSystems[ee.FAIRPLAY]) {
                const h = re(new Uint8Array(s));
                try {
                    const u = Yi(JSON.parse(h).sinf), d = Gr(new Uint8Array(u));
                    if (!d) return;
                    i = d.subarray(8, 24), n = ee.FAIRPLAY;
                } catch  {
                    this.warn('Failed to parse sinf "encrypted" event message initData');
                    return;
                }
            } else {
                const h = Vo(s);
                if (h === null) return;
                h.version === 0 && h.systemId === kr.WIDEVINE && h.data && (i = h.data.subarray(8, 24)), n = Eo(h.systemId);
            }
            if (!n || !i) return;
            const a = Ne.hexDump(i), { keyIdToKeySessionPromise: o, mediaKeySessions: l } = this;
            let c = o[a];
            for(let h = 0; h < l.length; h++){
                const u = l[h], d = u.decryptdata;
                if (d.pssh || !d.keyId) continue;
                const f = Ne.hexDump(d.keyId);
                if (a === f || d.uri.replace(/-/g, "").indexOf(a) !== -1) {
                    c = o[f], delete o[f], d.pssh = new Uint8Array(s), d.keyId = i, c = o[a] = c.then(()=>this.generateRequestWithPreferredKeySession(u, t, s, "encrypted-event-key-match"));
                    break;
                }
            }
            c || (c = o[a] = this.getKeySystemSelectionPromise([
                n
            ]).then(({ keySystem: h, mediaKeys: u })=>{
                var d;
                this.throwIfDestroyed();
                const f = new Wt("ISO-23001-7", a, (d = En(h)) != null ? d : "");
                return f.pssh = new Uint8Array(s), f.keyId = i, this.attemptSetMediaKeys(h, u).then(()=>{
                    this.throwIfDestroyed();
                    const g = this.createMediaKeySessionContext({
                        decryptdata: f,
                        keySystem: h,
                        mediaKeys: u
                    });
                    return this.generateRequestWithPreferredKeySession(g, t, s, "encrypted-event-no-match");
                });
            })), c.catch((h)=>this.handleError(h));
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
                this.log(`Media-keys set for "${e}"`), s.push(i), this.setMediaKeysQueue = this.setMediaKeysQueue.filter((n)=>s.indexOf(n) === -1);
            });
        }
        generateRequestWithPreferredKeySession(e, t, s, i) {
            var n, a;
            const o = (n = this.config.drmSystems) == null || (a = n[e.keySystem]) == null ? void 0 : a.generateRequest;
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
            const h = new rn, u = e._onmessage = (g)=>{
                const m = e.mediaKeysSession;
                if (!m) {
                    h.emit("error", new Error("invalid state"));
                    return;
                }
                const { messageType: y, message: E } = g;
                this.log(`"${y}" message event for session "${m.sessionId}" message size: ${E.byteLength}`), y === "license-request" || y === "license-renewal" ? this.renewLicense(e, E).catch((x)=>{
                    this.handleError(x), h.emit("error", x);
                }) : y === "license-release" ? e.keySystem === ee.FAIRPLAY && (this.updateKeySession(e, Ri("acknowledged")), this.removeSession(e)) : this.warn(`unhandled media key message type "${y}"`);
            }, d = e._onkeystatuseschange = (g)=>{
                if (!e.mediaKeysSession) {
                    h.emit("error", new Error("invalid state"));
                    return;
                }
                this.onKeyStatusChange(e);
                const y = e.keyStatus;
                h.emit("keyStatus", y), y === "expired" && (this.warn(`${e.keySystem} expired for key ${c}`), this.renewKeySession(e));
            };
            e.mediaKeysSession.addEventListener("message", u), e.mediaKeysSession.addEventListener("keystatuseschange", d);
            const f = new Promise((g, m)=>{
                h.on("error", m), h.on("keyStatus", (y)=>{
                    y.startsWith("usable") ? g() : y === "output-restricted" ? m(new Se({
                        type: G.KEY_SYSTEM_ERROR,
                        details: A.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED,
                        fatal: !1
                    }, "HDCP level output restricted")) : y === "internal-error" ? m(new Se({
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
                throw new Se({
                    type: G.KEY_SYSTEM_ERROR,
                    details: A.KEY_SYSTEM_NO_SESSION,
                    error: g,
                    fatal: !1
                }, `Error generating key-session request: ${g}`);
            }).then(()=>f).catch((g)=>{
                throw h.removeAllListeners(), this.removeSession(e), g;
            }).then(()=>(h.removeAllListeners(), e));
        }
        onKeyStatusChange(e) {
            e.mediaKeysSession.keyStatuses.forEach((t, s)=>{
                this.log(`key status change "${t}" for keyStatuses keyId: ${Ne.hexDump("buffer" in s ? new Uint8Array(s.buffer, s.byteOffset, s.byteLength) : new Uint8Array(s))} session keyId: ${Ne.hexDump(new Uint8Array(e.decryptdata.keyId || []))} uri: ${e.decryptdata.uri}`), e.keyStatus = t;
            });
        }
        fetchServerCertificate(e) {
            const t = this.config, s = t.loader, i = new s(t), n = this.getServerCertificateUrl(e);
            return n ? (this.log(`Fetching server certificate for "${e}"`), new Promise((a, o)=>{
                const l = {
                    responseType: "arraybuffer",
                    url: n
                }, c = t.certLoadPolicy.default, h = {
                    loadPolicy: c,
                    timeout: c.maxLoadTimeMs,
                    maxRetry: 0,
                    retryDelay: 0,
                    maxRetryDelay: 0
                }, u = {
                    onSuccess: (d, f, g, m)=>{
                        a(d.data);
                    },
                    onError: (d, f, g, m)=>{
                        o(new Se({
                            type: G.KEY_SYSTEM_ERROR,
                            details: A.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,
                            fatal: !0,
                            networkDetails: g,
                            response: he({
                                url: l.url,
                                data: void 0
                            }, d)
                        }, `"${e}" certificate request failed (${n}). Status: ${d.code} (${d.text})`));
                    },
                    onTimeout: (d, f, g)=>{
                        o(new Se({
                            type: G.KEY_SYSTEM_ERROR,
                            details: A.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,
                            fatal: !0,
                            networkDetails: g,
                            response: {
                                url: l.url,
                                data: void 0
                            }
                        }, `"${e}" certificate request timed out (${n})`));
                    },
                    onAbort: (d, f, g)=>{
                        o(new Error("aborted"));
                    }
                };
                i.load(l, h, u);
            })) : Promise.resolve();
        }
        setMediaKeysServerCertificate(e, t, s) {
            return new Promise((i, n)=>{
                e.setServerCertificate(s).then((a)=>{
                    this.log(`setServerCertificate ${a ? "success" : "not supported by CDM"} (${s?.byteLength}) on "${t}"`), i(e);
                }).catch((a)=>{
                    n(new Se({
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
                    throw new Se({
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
            const i = new DOMParser().parseFromString(s, "application/xml"), n = i.querySelectorAll("HttpHeader");
            if (n.length > 0) {
                let h;
                for(let u = 0, d = n.length; u < d; u++){
                    var a, o;
                    h = n[u];
                    const f = (a = h.querySelector("name")) == null ? void 0 : a.textContent, g = (o = h.querySelector("value")) == null ? void 0 : o.textContent;
                    f && g && e.setRequestHeader(f, g);
                }
            }
            const l = i.querySelector("Challenge"), c = l?.textContent;
            if (!c) throw new Error("Cannot find <Challenge> in key message");
            return Ri(atob(c));
        }
        setupLicenseXHR(e, t, s, i) {
            const n = this.config.licenseXhrSetup;
            return n ? Promise.resolve().then(()=>{
                if (!s.decryptdata) throw new Error("Key removed");
                return n.call(this.hls, e, t, s, i);
            }).catch((a)=>{
                if (!s.decryptdata) throw a;
                return e.open("POST", t, !0), n.call(this.hls, e, t, s, i);
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
            return new Promise((i, n)=>{
                const a = this.getLicenseServerUrl(e.keySystem);
                this.log(`Sending license request to URL: ${a}`);
                const o = new XMLHttpRequest;
                o.responseType = "arraybuffer", o.onreadystatechange = ()=>{
                    if (!this.hls || !e.mediaKeysSession) return n(new Error("invalid state"));
                    if (o.readyState === 4) if (o.status === 200) {
                        this._requestLicenseFailureCount = 0;
                        let l = o.response;
                        this.log(`License received ${l instanceof ArrayBuffer ? l.byteLength : l}`);
                        const c = this.config.licenseResponseCallback;
                        if (c) try {
                            l = c.call(this.hls, o, a, e);
                        } catch (h) {
                            this.error(h);
                        }
                        i(l);
                    } else {
                        const l = s.errorRetry, c = l ? l.maxNumRetry : 0;
                        if (this._requestLicenseFailureCount++, this._requestLicenseFailureCount > c || o.status >= 400 && o.status < 500) n(new Se({
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
                            const h = c - this._requestLicenseFailureCount + 1;
                            this.warn(`Retrying license request, ${h} attempts left`), this.requestLicense(e, t).then(i, n);
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
            e && (e.removeEventListener("encrypted", this.onMediaEncrypted), e.removeEventListener("waitingforkey", this.onWaitingForKey), this.media = null), this._requestLicenseFailureCount = 0, this.setMediaKeysQueue = [], this.mediaKeySessions = [], this.keyIdToKeySessionPromise = {}, Wt.clearKeyUriToKeyIdMap();
            const s = t.length;
            At.CDMCleanupPromise = Promise.all(t.map((i)=>this.removeSession(i)).concat(e?.setMediaKeys(null).catch((i)=>{
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
                const s = t.reduce((i, n)=>(i.indexOf(n.keyFormat) === -1 && i.push(n.keyFormat), i), []);
                this.log(`Selecting key-system from session-keys ${s.join(", ")}`), this.keyFormatPromise = this.getKeyFormatPromise(s);
            }
        }
        removeSession(e) {
            const { mediaKeysSession: t, licenseXhr: s } = e;
            if (t) {
                this.log(`Remove licenses and keys and close session ${t.sessionId}`), e._onmessage && (t.removeEventListener("message", e._onmessage), e._onmessage = void 0), e._onkeystatuseschange && (t.removeEventListener("keystatuseschange", e._onkeystatuseschange), e._onkeystatuseschange = void 0), s && s.readyState !== XMLHttpRequest.DONE && s.abort(), e.mediaKeysSession = e.decryptdata = e.licenseXhr = void 0;
                const i = this.mediaKeySessions.indexOf(e);
                return i > -1 && this.mediaKeySessions.splice(i, 1), t.remove().catch((n)=>{
                    this.log(`Could not remove session: ${n}`);
                }).then(()=>t.close()).catch((n)=>{
                    this.log(`Could not close session: ${n}`);
                });
            }
        }
    }
    At.CDMCleanupPromise = void 0;
    class Se extends Error {
        constructor(e, t){
            super(t), this.data = void 0, e.error || (e.error = new Error(t)), this.data = e, e.err = e.error;
        }
    }
    var ge;
    (function(r) {
        r.MANIFEST = "m", r.AUDIO = "a", r.VIDEO = "v", r.MUXED = "av", r.INIT = "i", r.CAPTION = "c", r.TIMED_TEXT = "tt", r.KEY = "k", r.OTHER = "o";
    })(ge || (ge = {}));
    var Oi;
    (function(r) {
        r.DASH = "d", r.HLS = "h", r.SMOOTH = "s", r.OTHER = "o";
    })(Oi || (Oi = {}));
    var ot;
    (function(r) {
        r.OBJECT = "CMCD-Object", r.REQUEST = "CMCD-Request", r.SESSION = "CMCD-Session", r.STATUS = "CMCD-Status";
    })(ot || (ot = {}));
    const fh = {
        [ot.OBJECT]: [
            "br",
            "d",
            "ot",
            "tb"
        ],
        [ot.REQUEST]: [
            "bl",
            "dl",
            "mtp",
            "nor",
            "nrr",
            "su"
        ],
        [ot.SESSION]: [
            "cid",
            "pr",
            "sf",
            "sid",
            "st",
            "v"
        ],
        [ot.STATUS]: [
            "bs",
            "rtp"
        ]
    };
    class Dt {
        constructor(e, t){
            this.value = void 0, this.params = void 0, Array.isArray(e) && (e = e.map((s)=>s instanceof Dt ? s : new Dt(s))), this.value = e, this.params = t;
        }
    }
    class Da {
        constructor(e){
            this.description = void 0, this.description = e;
        }
    }
    const gh = "Dict";
    function mh(r) {
        return Array.isArray(r) ? JSON.stringify(r) : r instanceof Map ? "Map{}" : r instanceof Set ? "Set{}" : typeof r == "object" ? JSON.stringify(r) : String(r);
    }
    function ph(r, e, t, s) {
        return new Error(`failed to ${r} "${mh(e)}" as ${t}`, {
            cause: s
        });
    }
    const ur = "Bare Item", yh = "Boolean", Eh = "Byte Sequence", Th = "Decimal", xh = "Integer";
    function Sh(r) {
        return r < -999999999999999 || 999999999999999 < r;
    }
    const vh = /[\x00-\x1f\x7f]+/, Lh = "Token", Ah = "Key";
    function He(r, e, t) {
        return ph("serialize", r, e, t);
    }
    function Rh(r) {
        if (typeof r != "boolean") throw He(r, yh);
        return r ? "?1" : "?0";
    }
    function bh(r) {
        return btoa(String.fromCharCode(...r));
    }
    function Ih(r) {
        if (ArrayBuffer.isView(r) === !1) throw He(r, Eh);
        return `:${bh(r)}:`;
    }
    function Ca(r) {
        if (Sh(r)) throw He(r, xh);
        return r.toString();
    }
    function Dh(r) {
        return `@${Ca(r.getTime() / 1e3)}`;
    }
    function _a(r, e) {
        if (r < 0) return -_a(-r, e);
        const t = Math.pow(10, e);
        if (Math.abs(r * t % 1 - .5) < Number.EPSILON) {
            const i = Math.floor(r * t);
            return (i % 2 === 0 ? i : i + 1) / t;
        } else return Math.round(r * t) / t;
    }
    function Ch(r) {
        const e = _a(r, 3);
        if (Math.floor(Math.abs(e)).toString().length > 12) throw He(r, Th);
        const t = e.toString();
        return t.includes(".") ? t : `${t}.0`;
    }
    const _h = "String";
    function wh(r) {
        if (vh.test(r)) throw He(r, _h);
        return `"${r.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }
    function kh(r) {
        return r.description || r.toString().slice(7, -1);
    }
    function dr(r) {
        const e = kh(r);
        if (/^([a-zA-Z*])([!#$%&'*+\-.^_`|~\w:/]*)$/.test(e) === !1) throw He(e, Lh);
        return e;
    }
    function Mi(r) {
        switch(typeof r){
            case "number":
                if (!M(r)) throw He(r, ur);
                return Number.isInteger(r) ? Ca(r) : Ch(r);
            case "string":
                return wh(r);
            case "symbol":
                return dr(r);
            case "boolean":
                return Rh(r);
            case "object":
                if (r instanceof Date) return Dh(r);
                if (r instanceof Uint8Array) return Ih(r);
                if (r instanceof Da) return dr(r);
            default:
                throw He(r, ur);
        }
    }
    function Ni(r) {
        if (/^[a-z*][a-z0-9\-_.*]*$/.test(r) === !1) throw He(r, Ah);
        return r;
    }
    function cn(r) {
        return r == null ? "" : Object.entries(r).map(([e, t])=>t === !0 ? `;${Ni(e)}` : `;${Ni(e)}=${Mi(t)}`).join("");
    }
    function wa(r) {
        return r instanceof Dt ? `${Mi(r.value)}${cn(r.params)}` : Mi(r);
    }
    function Ph(r) {
        return `(${r.value.map(wa).join(" ")})${cn(r.params)}`;
    }
    function Fh(r, e = {
        whitespace: !0
    }) {
        if (typeof r != "object") throw He(r, gh);
        const t = r instanceof Map ? r.entries() : Object.entries(r), s = e != null && e.whitespace ? " " : "";
        return Array.from(t).map(([i, n])=>{
            n instanceof Dt || (n = new Dt(n));
            let a = Ni(i);
            return n.value === !0 ? a += cn(n.params) : (a += "=", Array.isArray(n.value) ? a += Ph(n) : a += wa(n)), a;
        }).join(`,${s}`);
    }
    function Oh(r, e) {
        return Fh(r, e);
    }
    const Mh = (r)=>r === "ot" || r === "sf" || r === "st", Nh = (r)=>typeof r == "number" ? M(r) : r != null && r !== "" && r !== !1;
    function Uh(r, e) {
        const t = new URL(r), s = new URL(e);
        if (t.origin !== s.origin) return r;
        const i = t.pathname.split("/").slice(1), n = s.pathname.split("/").slice(1, -1);
        for(; i[0] === n[0];)i.shift(), n.shift();
        for(; n.length;)n.shift(), i.unshift("..");
        return i.join("/");
    }
    function Bh() {
        try {
            return crypto.randomUUID();
        } catch  {
            try {
                const e = URL.createObjectURL(new Blob), t = e.toString();
                return URL.revokeObjectURL(e), t.slice(t.lastIndexOf("/") + 1);
            } catch  {
                let t = new Date().getTime();
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (i)=>{
                    const n = (t + Math.random() * 16) % 16 | 0;
                    return t = Math.floor(t / 16), (i == "x" ? n : n & 3 | 8).toString(16);
                });
            }
        }
    }
    const ms = (r)=>Math.round(r), $h = (r, e)=>(e != null && e.baseUrl && (r = Uh(r, e.baseUrl)), encodeURIComponent(r)), rs = (r)=>ms(r / 100) * 100, Gh = {
        br: ms,
        d: ms,
        bl: rs,
        dl: rs,
        mtp: rs,
        nor: $h,
        rtp: rs,
        tb: ms
    };
    function Kh(r, e) {
        const t = {};
        if (r == null || typeof r != "object") return t;
        const s = Object.keys(r).sort(), i = ne({}, Gh, e?.formatters), n = e?.filter;
        return s.forEach((a)=>{
            if (n != null && n(a)) return;
            let o = r[a];
            const l = i[a];
            l && (o = l(o, e)), !(a === "v" && o === 1) && (a == "pr" && o === 1 || Nh(o) && (Mh(a) && typeof o == "string" && (o = new Da(o)), t[a] = o));
        }), t;
    }
    function ka(r, e = {}) {
        return r ? Oh(Kh(r, e), ne({
            whitespace: !1
        }, e)) : "";
    }
    function Hh(r, e = {}) {
        if (!r) return {};
        const t = Object.entries(r), s = Object.entries(fh).concat(Object.entries(e?.customHeaderMap || {})), i = t.reduce((n, a)=>{
            var o, l;
            const [c, h] = a, u = ((o = s.find((d)=>d[1].includes(c))) == null ? void 0 : o[0]) || ot.REQUEST;
            return (l = n[u]) != null || (n[u] = {}), n[u][c] = h, n;
        }, {});
        return Object.entries(i).reduce((n, [a, o])=>(n[a] = ka(o, e), n), {});
    }
    function Vh(r, e, t) {
        return ne(r, Hh(e, t));
    }
    const Wh = "CMCD";
    function Yh(r, e = {}) {
        if (!r) return "";
        const t = ka(r, e);
        return `${Wh}=${encodeURIComponent(t)}`;
    }
    const fr = /CMCD=[^&#]+/;
    function qh(r, e, t) {
        const s = Yh(e, t);
        if (!s) return r;
        if (fr.test(r)) return r.replace(fr, s);
        const i = r.includes("?") ? "&" : "?";
        return `${r}${i}${s}`;
    }
    class jh {
        constructor(e){
            this.hls = void 0, this.config = void 0, this.media = void 0, this.sid = void 0, this.cid = void 0, this.useHeaders = !1, this.includeKeys = void 0, this.initialized = !1, this.starved = !1, this.buffering = !0, this.audioBuffer = void 0, this.videoBuffer = void 0, this.onWaiting = ()=>{
                this.initialized && (this.starved = !0), this.buffering = !0;
            }, this.onPlaying = ()=>{
                this.initialized || (this.initialized = !0), this.buffering = !1;
            }, this.applyPlaylistData = (i)=>{
                try {
                    this.apply(i, {
                        ot: ge.MANIFEST,
                        su: !this.initialized
                    });
                } catch (n) {
                    v.warn("Could not generate manifest CMCD data.", n);
                }
            }, this.applyFragmentData = (i)=>{
                try {
                    const n = i.frag, a = this.hls.levels[n.level], o = this.getObjectType(n), l = {
                        d: n.duration * 1e3,
                        ot: o
                    };
                    (o === ge.VIDEO || o === ge.AUDIO || o == ge.MUXED) && (l.br = a.bitrate / 1e3, l.tb = this.getTopBandwidth(o) / 1e3, l.bl = this.getBufferLength(o)), this.apply(i, l);
                } catch (n) {
                    v.warn("Could not generate segment CMCD data.", n);
                }
            }, this.hls = e;
            const t = this.config = e.config, { cmcd: s } = t;
            s != null && (t.pLoader = this.createPlaylistLoader(), t.fLoader = this.createFragmentLoader(), this.sid = s.sessionId || Bh(), this.cid = s.contentId, this.useHeaders = s.useHeaders === !0, this.includeKeys = s.includeKeys, this.registerListeners());
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
                sf: Oi.HLS,
                sid: this.sid,
                cid: this.cid,
                pr: (e = this.media) == null ? void 0 : e.playbackRate,
                mtp: this.hls.bandwidthEstimate / 1e3
            };
        }
        apply(e, t = {}) {
            ne(t, this.createData());
            const s = t.ot === ge.INIT || t.ot === ge.VIDEO || t.ot === ge.MUXED;
            this.starved && s && (t.bs = !0, t.su = !0, this.starved = !1), t.su == null && (t.su = this.buffering);
            const { includeKeys: i } = this;
            i && (t = Object.keys(t).reduce((n, a)=>(i.includes(a) && (n[a] = t[a]), n), {})), this.useHeaders ? (e.headers || (e.headers = {}), Vh(e.headers, t)) : e.url = qh(e.url, t);
        }
        getObjectType(e) {
            const { type: t } = e;
            if (t === "subtitle") return ge.TIMED_TEXT;
            if (e.sn === "initSegment") return ge.INIT;
            if (t === "audio") return ge.AUDIO;
            if (t === "main") return this.hls.audioTracks.length ? ge.VIDEO : ge.MUXED;
        }
        getTopBandwidth(e) {
            let t = 0, s;
            const i = this.hls;
            if (e === ge.AUDIO) s = i.audioTracks;
            else {
                const n = i.maxAutoLevel, a = n > -1 ? n + 1 : i.levels.length;
                s = i.levels.slice(0, a);
            }
            for (const n of s)n.bitrate > t && (t = n.bitrate);
            return t > 0 ? t : NaN;
        }
        getBufferLength(e) {
            const t = this.hls.media, s = e === ge.AUDIO ? this.audioBuffer : this.videoBuffer;
            return !s || !t ? NaN : Z.bufferInfo(s, t.currentTime, this.config.maxBufferHole).len * 1e3;
        }
        createPlaylistLoader() {
            const { pLoader: e } = this.config, t = this.applyPlaylistData, s = e || this.config.loader;
            return class {
                constructor(n){
                    this.loader = void 0, this.loader = new s(n);
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
                load(n, a, o) {
                    t(n), this.loader.load(n, a, o);
                }
            };
        }
        createFragmentLoader() {
            const { fLoader: e } = this.config, t = this.applyFragmentData, s = e || this.config.loader;
            return class {
                constructor(n){
                    this.loader = void 0, this.loader = new s(n);
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
                load(n, a, o) {
                    t(n), this.loader.load(n, a, o);
                }
            };
        }
    }
    const zh = 3e5;
    class Xh {
        constructor(e){
            this.hls = void 0, this.log = void 0, this.loader = null, this.uri = null, this.pathwayId = ".", this.pathwayPriority = null, this.timeToLoad = 300, this.reloadTimer = -1, this.updated = 0, this.started = !1, this.enabled = !0, this.levels = null, this.audioTracks = null, this.subtitleTracks = null, this.penalizedPathways = {}, this.hls = e, this.log = v.log.bind(v, "[content-steering]:"), this.registerListeners();
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
            if (s?.action === de.SendAlternateToPenaltyBox && s.flags === De.MoveAllAlternatesMatchingHost) {
                const i = this.levels;
                let n = this.pathwayPriority, a = this.pathwayId;
                if (t.context) {
                    const { groupId: o, pathwayId: l, type: c } = t.context;
                    o && i ? a = this.getPathwayForGroupId(o, c, a) : l && (a = l);
                }
                a in this.penalizedPathways || (this.penalizedPathways[a] = performance.now()), !n && i && (n = i.reduce((o, l)=>(o.indexOf(l.pathwayId) === -1 && o.push(l.pathwayId), o), [])), n && n.length > 1 && (this.updatePathwayPriority(n), s.resolved = this.pathwayId !== a), s.resolved || v.warn(`Could not resolve ${t.details} ("${t.error.message}") with content-steering for Pathway: ${a} levels: ${i && i.length} priorities: ${JSON.stringify(n)} penalized: ${JSON.stringify(this.penalizedPathways)}`);
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
            Object.keys(s).forEach((n)=>{
                i - s[n] > zh && delete s[n];
            });
            for(let n = 0; n < e.length; n++){
                const a = e[n];
                if (a in s) continue;
                if (a === this.pathwayId) return;
                const o = this.hls.nextLoadLevel, l = this.hls.levels[o];
                if (t = this.getLevelsForPathway(a), t.length > 0) {
                    this.log(`Setting Pathway to "${a}"`), this.pathwayId = a, Qr(t), this.hls.trigger(p.LEVELS_UPDATED, {
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
            for(let n = 0; n < i.length; n++)if (t === q.AUDIO_TRACK && i[n].hasAudioGroup(e) || t === q.SUBTITLE_TRACK && i[n].hasSubtitleGroup(e)) return i[n].pathwayId;
            return s;
        }
        clonePathways(e) {
            const t = this.levels;
            if (!t) return;
            const s = {}, i = {};
            e.forEach((n)=>{
                const { ID: a, "BASE-ID": o, "URI-REPLACEMENT": l } = n;
                if (t.some((h)=>h.pathwayId === a)) return;
                const c = this.getLevelsForPathway(o).map((h)=>{
                    const u = new te(h.attrs);
                    u["PATHWAY-ID"] = a;
                    const d = u.AUDIO && `${u.AUDIO}_clone_${a}`, f = u.SUBTITLES && `${u.SUBTITLES}_clone_${a}`;
                    d && (s[u.AUDIO] = d, u.AUDIO = d), f && (i[u.SUBTITLES] = f, u.SUBTITLES = f);
                    const g = Pa(h.uri, u["STABLE-VARIANT-ID"], "PER-VARIANT-URIS", l), m = new bt({
                        attrs: u,
                        audioCodec: h.audioCodec,
                        bitrate: h.bitrate,
                        height: h.height,
                        name: h.name,
                        url: g,
                        videoCodec: h.videoCodec,
                        width: h.width
                    });
                    if (h.audioGroups) for(let y = 1; y < h.audioGroups.length; y++)m.addGroupId("audio", `${h.audioGroups[y]}_clone_${a}`);
                    if (h.subtitleGroups) for(let y = 1; y < h.subtitleGroups.length; y++)m.addGroupId("text", `${h.subtitleGroups[y]}_clone_${a}`);
                    return m;
                });
                t.push(...c), gr(this.audioTracks, s, l, a), gr(this.subtitleTracks, i, l, a);
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
                const h = (this.hls.bandwidthEstimate || t.abrEwmaDefaultEstimate) | 0;
                i.searchParams.set("_HLS_pathway", this.pathwayId), i.searchParams.set("_HLS_throughput", "" + h);
            }
            const n = {
                responseType: "json",
                url: i.href
            }, a = t.steeringManifestLoadPolicy.default, o = a.errorRetry || a.timeoutRetry || {}, l = {
                loadPolicy: a,
                timeout: a.maxLoadTimeMs,
                maxRetry: o.maxNumRetry || 0,
                retryDelay: o.retryDelayMs || 0,
                maxRetryDelay: o.maxRetryDelayMs || 0
            }, c = {
                onSuccess: (h, u, d, f)=>{
                    this.log(`Loaded steering manifest: "${i}"`);
                    const g = h.data;
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
                    this.scheduleRefresh(this.uri || d.url), y && this.clonePathways(y);
                    const x = {
                        steeringManifest: g,
                        url: i.toString()
                    };
                    this.hls.trigger(p.STEERING_MANIFEST_LOADED, x), E && this.updatePathwayPriority(E);
                },
                onError: (h, u, d, f)=>{
                    if (this.log(`Error loading steering manifest: ${h.code} ${h.text} (${u.url})`), this.stopLoad(), h.code === 410) {
                        this.enabled = !1, this.log(`Steering manifest ${u.url} no longer available`);
                        return;
                    }
                    let g = this.timeToLoad * 1e3;
                    if (h.code === 429) {
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
                onTimeout: (h, u, d)=>{
                    this.log(`Timeout loading steering manifest (${u.url})`), this.scheduleRefresh(this.uri || u.url);
                }
            };
            this.log(`Requesting steering manifest: ${i}`), this.loader.load(n, l, c);
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
    function gr(r, e, t, s) {
        r && Object.keys(e).forEach((i)=>{
            const n = r.filter((a)=>a.groupId === i).map((a)=>{
                const o = ne({}, a);
                return o.details = void 0, o.attrs = new te(o.attrs), o.url = o.attrs.URI = Pa(a.url, a.attrs["STABLE-RENDITION-ID"], "PER-RENDITION-URIS", t), o.groupId = o.attrs["GROUP-ID"] = e[i], o.attrs["PATHWAY-ID"] = s, o;
            });
            r.push(...n);
        });
    }
    function Pa(r, e, t, s) {
        const { HOST: i, PARAMS: n, [t]: a } = s;
        let o;
        e && (o = a?.[e], o && (r = o));
        const l = new self.URL(r);
        return i && !o && (l.host = i), n && Object.keys(n).sort().forEach((c)=>{
            c && l.searchParams.set(c, n[c]);
        }), l.href;
    }
    const Qh = /^age:\s*[\d.]+\s*$/im;
    class Fa {
        constructor(e){
            this.xhrSetup = void 0, this.requestTimeout = void 0, this.retryTimeout = void 0, this.retryDelay = void 0, this.config = null, this.callbacks = null, this.context = null, this.loader = null, this.stats = void 0, this.xhrSetup = e && e.xhrSetup || null, this.stats = new Us, this.retryDelay = 0;
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
            const n = this.xhrSetup;
            n ? Promise.resolve().then(()=>{
                if (!(this.loader !== s || this.stats.aborted)) return n(s, t.url);
            }).catch((a)=>{
                if (!(this.loader !== s || this.stats.aborted)) return s.open("GET", t.url, !0), n(s, t.url);
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
            const i = t.headers, { maxTimeToFirstByteMs: n, maxLoadTimeMs: a } = s.loadPolicy;
            if (i) for(const o in i)e.setRequestHeader(o, i[o]);
            t.rangeEnd && e.setRequestHeader("Range", "bytes=" + t.rangeStart + "-" + (t.rangeEnd - 1)), e.onreadystatechange = this.readystatechange.bind(this), e.onprogress = this.loadprogress.bind(this), e.responseType = t.responseType, self.clearTimeout(this.requestTimeout), s.timeout = n && M(n) ? n : a, this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), s.timeout), e.send();
        }
        readystatechange() {
            const { context: e, loader: t, stats: s } = this;
            if (!e || !t) return;
            const i = t.readyState, n = this.config;
            if (!s.aborted && i >= 2 && (s.loading.first === 0 && (s.loading.first = Math.max(self.performance.now(), s.loading.start), n.timeout !== n.loadPolicy.maxLoadTimeMs && (self.clearTimeout(this.requestTimeout), n.timeout = n.loadPolicy.maxLoadTimeMs, this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), n.loadPolicy.maxLoadTimeMs - (s.loading.first - s.loading.start)))), i === 4)) {
                self.clearTimeout(this.requestTimeout), t.onreadystatechange = null, t.onprogress = null;
                const a = t.status, o = t.responseType !== "text";
                if (a >= 200 && a < 300 && (o && t.response || t.responseText !== null)) {
                    s.loading.end = Math.max(self.performance.now(), s.loading.first);
                    const l = o ? t.response : t.responseText, c = t.responseType === "arraybuffer" ? l.byteLength : l.length;
                    if (s.loaded = s.total = c, s.bwEstimate = s.total * 8e3 / (s.loading.end - s.loading.first), !this.callbacks) return;
                    const h = this.callbacks.onProgress;
                    if (h && h(s, e, l, t), !this.callbacks) return;
                    const u = {
                        url: t.responseURL,
                        data: l,
                        code: a
                    };
                    this.callbacks.onSuccess(u, s, e, t);
                } else {
                    const l = n.loadPolicy.errorRetry, c = s.retry, h = {
                        url: e.url,
                        data: void 0,
                        code: a
                    };
                    Ds(l, c, !1, h) ? this.retry(l) : (v.error(`${a} while loading ${e.url}`), this.callbacks.onError({
                        code: a,
                        text: t.statusText
                    }, e, t, s));
                }
            }
        }
        loadtimeout() {
            if (!this.config) return;
            const e = this.config.loadPolicy.timeoutRetry, t = this.stats.retry;
            if (Ds(e, t, !0)) this.retry(e);
            else {
                var s;
                v.warn(`timeout while loading ${(s = this.context) == null ? void 0 : s.url}`);
                const i = this.callbacks;
                i && (this.abortInternal(), i.onTimeout(this.stats, this.context, this.loader));
            }
        }
        retry(e) {
            const { context: t, stats: s } = this;
            this.retryDelay = zi(e, s.retry), s.retry++, v.warn(`${status ? "HTTP Status " + status : "Timeout"} while loading ${t?.url}, retrying ${s.retry}/${e.maxNumRetry} in ${this.retryDelay}ms`), this.abortInternal(), this.loader = null, self.clearTimeout(this.retryTimeout), this.retryTimeout = self.setTimeout(this.loadInternal.bind(this), this.retryDelay);
        }
        loadprogress(e) {
            const t = this.stats;
            t.loaded = e.loaded, e.lengthComputable && (t.total = e.total);
        }
        getCacheAge() {
            let e = null;
            if (this.loader && Qh.test(this.loader.getAllResponseHeaders())) {
                const t = this.loader.getResponseHeader("age");
                e = t ? parseFloat(t) : null;
            }
            return e;
        }
        getResponseHeader(e) {
            return this.loader && new RegExp(`^${e}:\\s*[\\d.]+\\s*$`, "im").test(this.loader.getAllResponseHeaders()) ? this.loader.getResponseHeader(e) : null;
        }
    }
    function Jh() {
        if (self.fetch && self.AbortController && self.ReadableStream && self.Request) try {
            return new self.ReadableStream({}), !0;
        } catch  {}
        return !1;
    }
    const Zh = /(\d+)-(\d+)\/(\d+)/;
    class mr {
        constructor(e){
            this.fetchSetup = void 0, this.requestTimeout = void 0, this.request = null, this.response = null, this.controller = void 0, this.context = null, this.config = null, this.callbacks = null, this.stats = void 0, this.loader = null, this.fetchSetup = e.fetchSetup || iu, this.controller = new self.AbortController, this.stats = new Us;
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
            const n = eu(e, this.controller.signal), a = s.onProgress, o = e.responseType === "arraybuffer", l = o ? "byteLength" : "length", { maxTimeToFirstByteMs: c, maxLoadTimeMs: h } = t.loadPolicy;
            this.context = e, this.config = t, this.callbacks = s, this.request = this.fetchSetup(e, n), self.clearTimeout(this.requestTimeout), t.timeout = c && M(c) ? c : h, this.requestTimeout = self.setTimeout(()=>{
                this.abortInternal(), s.onTimeout(i, e, this.response);
            }, t.timeout), self.fetch(this.request).then((u)=>{
                this.response = this.loader = u;
                const d = Math.max(self.performance.now(), i.loading.start);
                if (self.clearTimeout(this.requestTimeout), t.timeout = h, this.requestTimeout = self.setTimeout(()=>{
                    this.abortInternal(), s.onTimeout(i, e, this.response);
                }, h - (d - i.loading.start)), !u.ok) {
                    const { status: f, statusText: g } = u;
                    throw new nu(g || "fetch, bad network response", f, u);
                }
                return i.loading.first = d, i.total = su(u.headers) || i.total, a && M(t.highWaterMark) ? this.loadProgressively(u, i, e, t.highWaterMark, a) : o ? u.arrayBuffer() : e.responseType === "json" ? u.json() : u.text();
            }).then((u)=>{
                const d = this.response;
                if (!d) throw new Error("loader destroyed");
                self.clearTimeout(this.requestTimeout), i.loading.end = Math.max(self.performance.now(), i.loading.first);
                const f = u[l];
                f && (i.loaded = i.total = f);
                const g = {
                    url: d.url,
                    data: u,
                    code: d.status
                };
                a && !M(t.highWaterMark) && a(i, e, u, d), s.onSuccess(g, i, e, d);
            }).catch((u)=>{
                if (self.clearTimeout(this.requestTimeout), i.aborted) return;
                const d = u && u.code || 0, f = u ? u.message : null;
                s.onError({
                    code: d,
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
        loadProgressively(e, t, s, i = 0, n) {
            const a = new ta, o = e.body.getReader(), l = ()=>o.read().then((c)=>{
                    if (c.done) return a.dataLength && n(t, s, a.flush(), e), Promise.resolve(new ArrayBuffer(0));
                    const h = c.value, u = h.length;
                    return t.loaded += u, u < i || a.dataLength ? (a.push(h), a.dataLength >= i && n(t, s, a.flush(), e)) : n(t, s, h, e), l();
                }).catch(()=>Promise.reject());
            return l();
        }
    }
    function eu(r, e) {
        const t = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            signal: e,
            headers: new self.Headers(ne({}, r.headers))
        };
        return r.rangeEnd && t.headers.set("Range", "bytes=" + r.rangeStart + "-" + String(r.rangeEnd - 1)), t;
    }
    function tu(r) {
        const e = Zh.exec(r);
        if (e) return parseInt(e[2]) - parseInt(e[1]) + 1;
    }
    function su(r) {
        const e = r.get("Content-Range");
        if (e) {
            const s = tu(e);
            if (M(s)) return s;
        }
        const t = r.get("Content-Length");
        if (t) return parseInt(t);
    }
    function iu(r, e) {
        return new self.Request(r.url, e);
    }
    class nu extends Error {
        constructor(e, t, s){
            super(e), this.code = void 0, this.details = void 0, this.code = t, this.details = s;
        }
    }
    const ru = /\s/, au = {
        newCue (r, e, t, s) {
            const i = [];
            let n, a, o, l, c;
            const h = self.VTTCue || self.TextTrackCue;
            for(let d = 0; d < s.rows.length; d++)if (n = s.rows[d], o = !0, l = 0, c = "", !n.isEmpty()) {
                var u;
                for(let m = 0; m < n.chars.length; m++)ru.test(n.chars[m].uchar) && o ? l++ : (c += n.chars[m].uchar, o = !1);
                n.cueStartTime = e, e === t && (t += 1e-4), l >= 16 ? l-- : l++;
                const f = La(c.trim()), g = on(e, t, f);
                r != null && (u = r.cues) != null && u.getCueById(g) || (a = new h(e, t, f), a.id = g, a.line = d + 1, a.align = "left", a.position = 10 + Math.min(80, Math.floor(l * 8 / 32) * 10), i.push(a));
            }
            return r && i.length && (i.sort((d, f)=>d.line === "auto" || f.line === "auto" ? 0 : d.line > 8 && f.line > 8 ? f.line - d.line : d.line - f.line), i.forEach((d)=>qr(r, d))), i;
        }
    }, ou = {
        maxTimeToFirstByteMs: 8e3,
        maxLoadTimeMs: 2e4,
        timeoutRetry: null,
        errorRetry: null
    }, Oa = he(he({
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
        loader: Fa,
        fLoader: void 0,
        pLoader: void 0,
        xhrSetup: void 0,
        licenseXhrSetup: void 0,
        licenseResponseCallback: void 0,
        abrController: Fl,
        bufferController: Uc,
        capLevelController: ln,
        errorController: vl,
        fpsController: dh,
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
        requestMediaKeySystemAccessFunc: Pr,
        testBandwidth: !0,
        progressive: !1,
        lowLatencyMode: !0,
        cmcd: void 0,
        enableDateRangeMetadataCues: !0,
        enableEmsgMetadataCues: !0,
        enableID3MetadataCues: !0,
        useMediaCapabilities: !0,
        certLoadPolicy: {
            default: ou
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
    }, lu()), {}, {
        subtitleStreamController: Fc,
        subtitleTrackController: Mc,
        timelineController: hh,
        audioStreamController: kc,
        audioTrackController: Pc,
        emeController: At,
        cmcdController: jh,
        contentSteeringController: Xh
    });
    function lu() {
        return {
            cueHandler: au,
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
    function cu(r, e) {
        if ((e.liveSyncDurationCount || e.liveMaxLatencyDurationCount) && (e.liveSyncDuration || e.liveMaxLatencyDuration)) throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
        if (e.liveMaxLatencyDurationCount !== void 0 && (e.liveSyncDurationCount === void 0 || e.liveMaxLatencyDurationCount <= e.liveSyncDurationCount)) throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"');
        if (e.liveMaxLatencyDuration !== void 0 && (e.liveSyncDuration === void 0 || e.liveMaxLatencyDuration <= e.liveSyncDuration)) throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"');
        const t = Ui(r), s = [
            "manifest",
            "level",
            "frag"
        ], i = [
            "TimeOut",
            "MaxRetry",
            "RetryDelay",
            "MaxRetryTimeout"
        ];
        return s.forEach((n)=>{
            const a = `${n === "level" ? "playlist" : n}LoadPolicy`, o = e[a] === void 0, l = [];
            i.forEach((c)=>{
                const h = `${n}Loading${c}`, u = e[h];
                if (u !== void 0 && o) {
                    l.push(h);
                    const d = t[a].default;
                    switch(e[a] = {
                        default: d
                    }, c){
                        case "TimeOut":
                            d.maxLoadTimeMs = u, d.maxTimeToFirstByteMs = u;
                            break;
                        case "MaxRetry":
                            d.errorRetry.maxNumRetry = u, d.timeoutRetry.maxNumRetry = u;
                            break;
                        case "RetryDelay":
                            d.errorRetry.retryDelayMs = u, d.timeoutRetry.retryDelayMs = u;
                            break;
                        case "MaxRetryTimeout":
                            d.errorRetry.maxRetryDelayMs = u, d.timeoutRetry.maxRetryDelayMs = u;
                            break;
                    }
                }
            }), l.length && v.warn(`hls.js config: "${l.join('", "')}" setting(s) are deprecated, use "${a}": ${JSON.stringify(e[a])}`);
        }), he(he({}, t), e);
    }
    function Ui(r) {
        return r && typeof r == "object" ? Array.isArray(r) ? r.map(Ui) : Object.keys(r).reduce((e, t)=>(e[t] = Ui(r[t]), e), {}) : r;
    }
    function hu(r) {
        const e = r.loader;
        e !== mr && e !== Fa ? (v.log("[config]: Custom loader detected, cannot enable progressive streaming"), r.progressive = !1) : Jh() && (r.loader = mr, r.progressive = !0, r.enableSoftwareAES = !0, v.log("[config]: Progressive streaming enabled, using FetchLoader"));
    }
    let fi;
    class uu extends Xi {
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
            const s = this.hls.config.preferManagedMediaSource, i = [], n = {}, a = {};
            let o = !1, l = !1, c = !1;
            t.levels.forEach((h)=>{
                var u, d;
                const f = h.attrs;
                let { audioCodec: g, videoCodec: m } = h;
                ((u = g) == null ? void 0 : u.indexOf("mp4a.40.34")) !== -1 && (fi || (fi = /chrome|firefox/i.test(navigator.userAgent)), fi && (h.audioCodec = g = void 0)), g && (h.audioCodec = g = Rs(g, s)), ((d = m) == null ? void 0 : d.indexOf("avc1")) === 0 && (m = h.videoCodec = Qo(m));
                const { width: y, height: E, unknownCodecs: x } = h;
                if (o || (o = !!(y && E)), l || (l = !!m), c || (c = !!g), x != null && x.length || g && !Js(g, "audio", s) || m && !Js(m, "video", s)) return;
                const { CODECS: T, "FRAME-RATE": b, "HDCP-LEVEL": S, "PATHWAY-ID": D, RESOLUTION: R, "VIDEO-RANGE": _ } = f, I = `${`${D || "."}-`}${h.bitrate}-${R}-${b}-${T}-${_}-${S}`;
                if (n[I]) if (n[I].uri !== h.url && !h.attrs["PATHWAY-ID"]) {
                    const w = a[I] += 1;
                    h.attrs["PATHWAY-ID"] = new Array(w + 1).join(".");
                    const V = new bt(h);
                    n[I] = V, i.push(V);
                } else n[I].addGroupId("audio", f.AUDIO), n[I].addGroupId("text", f.SUBTITLES);
                else {
                    const w = new bt(h);
                    n[I] = w, a[I] = 1, i.push(w);
                }
            }), this.filterAndSortMediaOptions(i, t, o, l, c);
        }
        filterAndSortMediaOptions(e, t, s, i, n) {
            let a = [], o = [], l = e;
            if ((s || i) && n && (l = l.filter(({ videoCodec: g, videoRange: m, width: y, height: E })=>(!!g || !!(y && E)) && hl(m))), l.length === 0) {
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
                a = t.audioTracks.filter((m)=>!m.audioCodec || Js(m.audioCodec, "audio", g)), pr(a);
            }
            t.subtitles && (o = t.subtitles, pr(o));
            const c = l.slice(0);
            l.sort((g, m)=>{
                if (g.attrs["HDCP-LEVEL"] !== m.attrs["HDCP-LEVEL"]) return (g.attrs["HDCP-LEVEL"] || "") > (m.attrs["HDCP-LEVEL"] || "") ? 1 : -1;
                if (s && g.height !== m.height) return g.height - m.height;
                if (g.frameRate !== m.frameRate) return g.frameRate - m.frameRate;
                if (g.videoRange !== m.videoRange) return bs.indexOf(g.videoRange) - bs.indexOf(m.videoRange);
                if (g.videoCodec !== m.videoCodec) {
                    const y = Ln(g.videoCodec), E = Ln(m.videoCodec);
                    if (y !== E) return E - y;
                }
                if (g.uri === m.uri && g.codecSet !== m.codecSet) {
                    const y = As(g.codecSet), E = As(m.codecSet);
                    if (y !== E) return E - y;
                }
                return g.averageBitrate !== m.averageBitrate ? g.averageBitrate - m.averageBitrate : 0;
            });
            let h = c[0];
            if (this.steering && (l = this.steering.filterParsedLevels(l), l.length !== c.length)) {
                for(let g = 0; g < c.length; g++)if (c[g].pathwayId === l[0].pathwayId) {
                    h = c[g];
                    break;
                }
            }
            this._levels = l;
            for(let g = 0; g < l.length; g++)if (l[g] === h) {
                var u;
                this._firstLevel = g;
                const m = h.bitrate, y = this.hls.bandwidthEstimate;
                if (this.log(`manifest loaded, ${l.length} level(s) found, first bitrate: ${m}`), ((u = this.hls.userConfig) == null ? void 0 : u.abrEwmaDefaultEstimate) === void 0) {
                    const E = Math.min(m, this.hls.config.abrEwmaDefaultEstimateMax);
                    E > y && y === Oa.abrEwmaDefaultEstimate && (this.hls.bandwidthEstimate = E);
                }
                break;
            }
            const d = n && !i, f = {
                levels: l,
                audioTracks: a,
                subtitleTracks: o,
                sessionData: t.sessionData,
                sessionKeys: t.sessionKeys,
                firstLevel: this._firstLevel,
                stats: t.stats,
                audio: n,
                video: i,
                altAudio: !d && a.some((g)=>!!g.url)
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
                const h = new Error("invalid level idx"), u = e < 0;
                if (this.hls.trigger(p.ERROR, {
                    type: G.OTHER_ERROR,
                    details: A.LEVEL_SWITCH_ERROR,
                    level: e,
                    fatal: u,
                    error: h,
                    reason: h.message
                }), u) return;
                e = Math.min(e, t.length - 1);
            }
            const s = this.currentLevelIndex, i = this.currentLevel, n = i ? i.attrs["PATHWAY-ID"] : void 0, a = t[e], o = a.attrs["PATHWAY-ID"];
            if (this.currentLevelIndex = e, this.currentLevel = a, s === e && a.details && i && n === o) return;
            this.log(`Switching to level ${e} (${a.height ? a.height + "p " : ""}${a.videoRange ? a.videoRange + " " : ""}${a.codecSet ? a.codecSet + " " : ""}@${a.bitrate})${o ? " with Pathway " + o : ""} from level ${s}${n ? " with Pathway " + n : ""}`);
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
                const h = this.switchParams(a.uri, i?.details, c);
                this.loadPlaylist(h);
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
                if (!Object.keys(s).some((n)=>!!s[n])) return;
                const i = this._levels[t.level];
                i != null && i.loadError && (this.log(`Resetting level error count of ${i.loadError} on frag buffered`), i.loadError = 0);
            }
        }
        onLevelLoaded(e, t) {
            var s;
            const { level: i, details: n } = t, a = this._levels[i];
            if (!a) {
                var o;
                this.warn(`Invalid level index ${i}`), (o = t.deliveryDirectives) != null && o.skip && (n.deltaUpdateFailed = !0);
                return;
            }
            i === this.currentLevelIndex ? (a.fragmentError === 0 && (a.loadError = 0), this.playlistLoaded(i, t, a.details)) : (s = t.deliveryDirectives) != null && s.skip && (n.deltaUpdateFailed = !0);
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
                const n = s.attrs["PATHWAY-ID"];
                this.log(`Loading level index ${t}${e?.msn !== void 0 ? " at sn " + e.msn + " part " + e.part : ""} with${n ? " Pathway " + n : ""} ${i}`), this.clearTimer(), this.hls.trigger(p.LEVEL_LOADING, {
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
            const s = this._levels.filter((i, n)=>n !== e ? !0 : (this.steering && this.steering.removeLevel(i), i === this.currentLevel && (this.currentLevel = null, this.currentLevelIndex = -1, i.details && i.details.fragments.forEach((a)=>a.level = -1)), !1));
            Qr(s), this._levels = s, this.currentLevelIndex > -1 && (t = this.currentLevel) != null && t.details && (this.currentLevelIndex = this.currentLevel.details.fragments[0].level), this.hls.trigger(p.LEVELS_UPDATED, {
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
    function pr(r) {
        const e = {};
        r.forEach((t)=>{
            const s = t.groupId || "";
            t.id = e[s] = e[s] || 0, e[s]++;
        });
    }
    class du {
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
        createKeyLoadError(e, t = A.KEY_LOAD_ERROR, s, i, n) {
            return new Ye({
                type: G.NETWORK_ERROR,
                details: t,
                fatal: !1,
                frag: e,
                response: n,
                error: s,
                networkDetails: i
            });
        }
        loadClear(e, t) {
            if (this.emeController && this.config.emeEnabled) {
                const { sn: s, cc: i } = e;
                for(let n = 0; n < t.length; n++){
                    const a = t[n];
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
            const n = e.decryptdata;
            if (!n) {
                const c = new Error(t ? `Expected frag.decryptdata to be defined after setting format ${t}` : "Missing decryption data on fragment in onKeyLoading");
                return Promise.reject(this.createKeyLoadError(e, A.KEY_LOAD_ERROR, c));
            }
            const a = n.uri;
            if (!a) return Promise.reject(this.createKeyLoadError(e, A.KEY_LOAD_ERROR, new Error(`Invalid key URI: "${a}"`)));
            let o = this.keyUriToKeyInfo[a];
            if ((s = o) != null && s.decryptdata.key) return n.key = o.decryptdata.key, Promise.resolve({
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
                        return o.keyLoadPromise.then((c)=>(n.key = c.keyInfo.decryptdata.key, {
                                frag: e,
                                keyInfo: o
                            }));
                }
            }
            switch(o = this.keyUriToKeyInfo[a] = {
                decryptdata: n,
                keyLoadPromise: null,
                loader: null,
                mediaKeySessionContext: null
            }, n.method){
                case "ISO-23001-7":
                case "SAMPLE-AES":
                case "SAMPLE-AES-CENC":
                case "SAMPLE-AES-CTR":
                    return n.keyFormat === "identity" ? this.loadKeyHTTP(o, e) : this.loadKeyEME(o, e);
                case "AES-128":
                    return this.loadKeyHTTP(o, e);
                default:
                    return Promise.reject(this.createKeyLoadError(e, A.KEY_LOAD_ERROR, new Error(`Key supplied with unsupported METHOD: "${n.method}"`)));
            }
        }
        loadKeyEME(e, t) {
            const s = {
                frag: t,
                keyInfo: e
            };
            if (this.emeController && this.config.emeEnabled) {
                const i = this.emeController.loadKey(s);
                if (i) return (e.keyLoadPromise = i.then((n)=>(e.mediaKeySessionContext = n, s))).catch((n)=>{
                    throw e.keyLoadPromise = null, n;
                });
            }
            return Promise.resolve(s);
        }
        loadKeyHTTP(e, t) {
            const s = this.config, i = s.loader, n = new i(s);
            return t.keyLoader = e.loader = n, e.keyLoadPromise = new Promise((a, o)=>{
                const l = {
                    keyInfo: e,
                    frag: t,
                    responseType: "arraybuffer",
                    url: e.decryptdata.uri
                }, c = s.keyLoadPolicy.default, h = {
                    loadPolicy: c,
                    timeout: c.maxLoadTimeMs,
                    maxRetry: 0,
                    retryDelay: 0,
                    maxRetryDelay: 0
                }, u = {
                    onSuccess: (d, f, g, m)=>{
                        const { frag: y, keyInfo: E, url: x } = g;
                        if (!y.decryptdata || E !== this.keyUriToKeyInfo[x]) return o(this.createKeyLoadError(y, A.KEY_LOAD_ERROR, new Error("after key load, decryptdata unset or changed"), m));
                        E.decryptdata.key = y.decryptdata.key = new Uint8Array(d.data), y.keyLoader = null, E.loader = null, a({
                            frag: y,
                            keyInfo: E
                        });
                    },
                    onError: (d, f, g, m)=>{
                        this.resetLoader(f), o(this.createKeyLoadError(t, A.KEY_LOAD_ERROR, new Error(`HTTP Error ${d.code} loading key ${d.text}`), g, he({
                            url: l.url,
                            data: void 0
                        }, d)));
                    },
                    onTimeout: (d, f, g)=>{
                        this.resetLoader(f), o(this.createKeyLoadError(t, A.KEY_LOAD_TIMEOUT, new Error("key loading timed out"), g));
                    },
                    onAbort: (d, f, g)=>{
                        this.resetLoader(f), o(this.createKeyLoadError(t, A.INTERNAL_ABORTED, new Error("key loading aborted"), g));
                    }
                };
                n.load(l, h, u);
            });
        }
        resetLoader(e) {
            const { frag: t, keyInfo: s, url: i } = e, n = s.loader;
            t.keyLoader === n && (t.keyLoader = null, s.loader = null), delete this.keyUriToKeyInfo[i], n && n.destroy();
        }
    }
    function Ma() {
        return self.SourceBuffer || self.WebKitSourceBuffer;
    }
    function Na() {
        if (!ut()) return !1;
        const e = Ma();
        return !e || e.prototype && typeof e.prototype.appendBuffer == "function" && typeof e.prototype.remove == "function";
    }
    function fu() {
        if (!Na()) return !1;
        const r = ut();
        return typeof r?.isTypeSupported == "function" && ([
            "avc1.42E01E,mp4a.40.2",
            "av01.0.01M.08",
            "vp09.00.50.08"
        ].some((e)=>r.isTypeSupported(Yt(e, "video"))) || [
            "mp4a.40.2",
            "fLaC"
        ].some((e)=>r.isTypeSupported(Yt(e, "audio"))));
    }
    function gu() {
        var r;
        const e = Ma();
        return typeof (e == null || (r = e.prototype) == null ? void 0 : r.changeType) == "function";
    }
    const mu = 250, ps = 2, pu = .1, yu = .05;
    class Eu {
        constructor(e, t, s, i){
            this.config = void 0, this.media = null, this.fragmentTracker = void 0, this.hls = void 0, this.nudgeRetry = 0, this.stallReported = !1, this.stalled = null, this.moved = !1, this.seeking = !1, this.config = e, this.media = t, this.fragmentTracker = s, this.hls = i;
        }
        destroy() {
            this.media = null, this.hls = this.fragmentTracker = null;
        }
        poll(e, t) {
            const { config: s, media: i, stalled: n } = this;
            if (i === null) return;
            const { currentTime: a, seeking: o } = i, l = this.seeking && !o, c = !this.seeking && o;
            if (this.seeking = o, a !== e) {
                if (this.moved = !0, o || (this.nudgeRetry = 0), n !== null) {
                    if (this.stallReported) {
                        const y = self.performance.now() - n;
                        v.warn(`playback not stuck anymore @${a}, after ${Math.round(y)}ms`), this.stallReported = !1;
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
            const h = Z.bufferInfo(i, a, 0), u = h.nextStart || 0;
            if (o) {
                const y = h.len > ps, E = !u || t && t.start <= a || u - a > ps && !this.fragmentTracker.getPartialFragment(a);
                if (y || E) return;
                this.moved = !1;
            }
            if (!this.moved && this.stalled !== null) {
                var d;
                if (!(h.len > 0) && !u) return;
                const E = Math.max(u, h.start || 0) - a, x = this.hls.levels ? this.hls.levels[this.hls.currentLevel] : null, b = (x == null || (d = x.details) == null ? void 0 : d.live) ? x.details.targetduration * 2 : ps, S = this.fragmentTracker.getPartialFragment(a);
                if (E > 0 && (E <= b || S)) {
                    i.paused || this._trySkipBufferHole(S);
                    return;
                }
            }
            const f = self.performance.now();
            if (n === null) {
                this.stalled = f;
                return;
            }
            const g = f - n;
            if (!o && g >= mu && (this._reportStall(h), !this.media)) return;
            const m = Z.bufferInfo(i, a, s.maxBufferHole);
            this._tryFixBufferStall(m, g);
        }
        _tryFixBufferStall(e, t) {
            const { config: s, fragmentTracker: i, media: n } = this;
            if (n === null) return;
            const a = n.currentTime, o = i.getPartialFragment(a);
            o && (this._trySkipBufferHole(o) || !this.media) || (e.len > s.maxBufferHole || e.nextStart && e.nextStart - a < s.maxBufferHole) && t > s.highBufferWatchdogPeriod * 1e3 && (v.warn("Trying to nudge playhead over buffer-hole"), this.stalled = null, this._tryNudgeBuffer());
        }
        _reportStall(e) {
            const { hls: t, media: s, stallReported: i } = this;
            if (!i && s) {
                this.stallReported = !0;
                const n = new Error(`Playback stalling at @${s.currentTime} due to low buffer (${JSON.stringify(e)})`);
                v.warn(n.message), t.trigger(p.ERROR, {
                    type: G.MEDIA_ERROR,
                    details: A.BUFFER_STALLED_ERROR,
                    fatal: !1,
                    error: n,
                    buffer: e.len
                });
            }
        }
        _trySkipBufferHole(e) {
            const { config: t, hls: s, media: i } = this;
            if (i === null) return 0;
            const n = i.currentTime, a = Z.bufferInfo(i, n, 0), o = n < a.start ? a.start : a.nextStart;
            if (o) {
                const l = a.len <= t.maxBufferHole, c = a.len > 0 && a.len < 1 && i.readyState < 3, h = o - n;
                if (h > 0 && (l || c)) {
                    if (h > t.maxBufferHole) {
                        const { fragmentTracker: d } = this;
                        let f = !1;
                        if (n === 0) {
                            const g = d.getAppendedFrag(0, B.MAIN);
                            g && o < g.end && (f = !0);
                        }
                        if (!f) {
                            const g = e || d.getAppendedFrag(n, B.MAIN);
                            if (g) {
                                let m = !1, y = g.end;
                                for(; y < o;){
                                    const E = d.getPartialFragment(y);
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
                    const u = Math.max(o + yu, n + pu);
                    if (v.warn(`skipping hole, adjusting currentTime from ${n} to ${u}`), this.moved = !0, this.stalled = null, i.currentTime = u, e && !e.gap) {
                        const d = new Error(`fragment loaded with buffer holes, seeking from ${n} to ${u}`);
                        s.trigger(p.ERROR, {
                            type: G.MEDIA_ERROR,
                            details: A.BUFFER_SEEK_OVER_HOLE,
                            fatal: !1,
                            error: d,
                            reason: d.message,
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
            const n = s.currentTime;
            if (this.nudgeRetry++, i < e.nudgeMaxRetry) {
                const a = n + (i + 1) * e.nudgeOffset, o = new Error(`Nudging 'currentTime' from ${n} to ${a}`);
                v.warn(o.message), s.currentTime = a, t.trigger(p.ERROR, {
                    type: G.MEDIA_ERROR,
                    details: A.BUFFER_NUDGE_ON_STALL,
                    error: o,
                    fatal: !1
                });
            } else {
                const a = new Error(`Playhead still not moving while enough data buffered @${n} after ${e.nudgeMaxRetry} nudges`);
                v.error(a.message), t.trigger(p.ERROR, {
                    type: G.MEDIA_ERROR,
                    details: A.BUFFER_STALLED_ERROR,
                    error: a,
                    fatal: !0
                });
            }
        }
    }
    const Tu = 100;
    class xu extends Zi {
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
                if (this.stopLoad(), this.setInterval(Tu), this.level = -1, !this.startFragRequested) {
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
                        const { levels: t, level: s } = this, i = t?.[s], n = i?.details;
                        if (n && (!n.live || this.levelLastLoaded === i)) {
                            if (this.waitForCdnTuneIn(n)) break;
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
                            const { levels: i, level: n } = this, a = i?.[n];
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
            const n = e.nextLoadLevel;
            if (!(s != null && s[n])) return;
            const a = s[n], o = this.getMainFwdBufferInfo();
            if (o === null) return;
            const l = this.getLevelDetails();
            if (l && this._streamEnded(o, l)) {
                const m = {};
                this.altAudio && (m.type = "video"), this.hls.trigger(p.BUFFER_EOS, m), this.state = C.ENDED;
                return;
            }
            e.loadLevel !== n && e.manualLevel === -1 && this.log(`Adapting to level ${n} from level ${this.level}`), this.level = e.nextLoadLevel = n;
            const c = a.details;
            if (!c || this.state === C.WAITING_LEVEL || c.live && this.levelLastLoaded !== a) {
                this.level = n, this.state = C.WAITING_LEVEL;
                return;
            }
            const h = o.len, u = this.getMaxBufferLength(a.maxBitrate);
            if (h >= u) return;
            this.backtrackFragment && this.backtrackFragment.start > o.end && (this.backtrackFragment = null);
            const d = this.backtrackFragment ? this.backtrackFragment.start : o.end;
            let f = this.getNextFragment(d, c);
            if (this.couldBacktrack && !this.fragPrevious && f && f.sn !== "initSegment" && this.fragmentTracker.getState(f) !== le.OK) {
                var g;
                const y = ((g = this.backtrackFragment) != null ? g : f).sn - c.startSN, E = c.fragments[y - 1];
                E && f.cc === E.cc && (f = E, this.fragmentTracker.removeFragment(E));
            } else this.backtrackFragment && o.len && (this.backtrackFragment = null);
            if (f && this.isLoopLoading(f, d)) {
                if (!f.gap) {
                    const y = this.audioOnly && !this.altAudio ? Q.AUDIO : Q.VIDEO, E = (y === Q.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
                    E && this.afterBufferFlushed(E, y, B.MAIN);
                }
                f = this.getNextFragmentLoopLoading(f, c, o, B.MAIN, u);
            }
            f && (f.initSegment && !f.initSegment.data && !this.bitrateTest && (f = f.initSegment), this.loadFragment(f, a, d));
        }
        loadFragment(e, t, s) {
            const i = this.fragmentTracker.getState(e);
            this.fragCurrent = e, i === le.NOT_LOADED || i === le.PARTIAL ? e.sn === "initSegment" ? this._loadInitSegment(e, t) : this.bitrateTest ? (this.log(`Fragment ${e.sn} of level ${e.level} is being downloaded to test bitrate and will not be buffered`), this._loadBitrateTestFrag(e, t)) : (this.startFragRequested = !0, super.loadFragment(e, t, s)) : this.clearTrackerIfNeeded(e);
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
                const n = this.getLevelDetails();
                if (n != null && n.live) {
                    const o = this.getMainFwdBufferInfo();
                    if (!o || o.len < n.targetduration * 2) return;
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
                        const l = o.maxStartPTS ? o.maxStartPTS : o.start, c = o.duration, h = Math.max(a.end, l + Math.min(Math.max(c - this.config.maxFragLookUpTolerance, c * (this.couldBacktrack ? .5 : .125)), c * (this.couldBacktrack ? .75 : .25)));
                        this.flushMainBuffer(h, Number.POSITIVE_INFINITY);
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
            this.onvplaying = this.onMediaPlaying.bind(this), this.onvseeked = this.onMediaSeeked.bind(this), s.addEventListener("playing", this.onvplaying), s.addEventListener("seeked", this.onvseeked), this.gapController = new Eu(this.config, s, this.fragmentTracker, this.hls);
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
            t.levels.forEach((n)=>{
                const a = n.audioCodec;
                a && (s = s || a.indexOf("mp4a.40.2") !== -1, i = i || a.indexOf("mp4a.40.5") !== -1);
            }), this.audioCodecSwitch = s && i && !gu(), this.audioCodecSwitch && this.log("Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"), this.levels = t.levels, this.startFragRequested = !1;
        }
        onLevelLoading(e, t) {
            const { levels: s } = this;
            if (!s || this.state !== C.IDLE) return;
            const i = s[t.level];
            (!i.details || i.details.live && this.levelLastLoaded !== i || this.waitForCdnTuneIn(i.details)) && (this.state = C.WAITING_LEVEL);
        }
        onLevelLoaded(e, t) {
            var s;
            const { levels: i } = this, n = t.level, a = t.details, o = a.totalduration;
            if (!i) {
                this.warn(`Levels were reset while loading level ${n}`);
                return;
            }
            this.log(`Level ${n} loaded [${a.startSN},${a.endSN}]${a.lastPartSn ? `[part-${a.lastPartSn}-${a.lastPartIndex}]` : ""}, cc [${a.startCC}, ${a.endCC}] duration:${o}`);
            const l = i[n], c = this.fragCurrent;
            c && (this.state === C.FRAG_LOADING || this.state === C.FRAG_LOADING_WAITING_RETRY) && c.level !== t.level && c.loader && this.abortCurrentFrag();
            let h = 0;
            if (a.live || (s = l.details) != null && s.live) {
                var u;
                if (this.checkLiveUpdate(a), a.deltaUpdateFailed) return;
                h = this.alignPlaylists(a, l.details, (u = this.levelLastLoaded) == null ? void 0 : u.details);
            }
            if (l.details = a, this.levelLastLoaded = l, this.hls.trigger(p.LEVEL_UPDATED, {
                details: a,
                level: n
            }), this.state === C.WAITING_LEVEL) {
                if (this.waitForCdnTuneIn(a)) return;
                this.state = C.IDLE;
            }
            this.startFragRequested ? a.live && this.synchronizeToLiveEdge(a) : this.setStartPosition(a, h), this.tick();
        }
        _handleFragmentLoadProgress(e) {
            var t;
            const { frag: s, part: i, payload: n } = e, { levels: a } = this;
            if (!a) {
                this.warn(`Levels were reset while fragment load was in progress. Fragment ${s.sn} of level ${s.level} will not be buffered`);
                return;
            }
            const o = a[s.level], l = o.details;
            if (!l) {
                this.warn(`Dropping fragment ${s.sn} of level ${s.level} after level details were reset`), this.fragmentTracker.removeFragment(s);
                return;
            }
            const c = o.videoCodec, h = l.PTSKnown || !l.live, u = (t = s.initSegment) == null ? void 0 : t.data, d = this._getAudioCodec(o), f = this.transmuxer = this.transmuxer || new ya(this.hls, B.MAIN, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)), g = i ? i.index : -1, m = g !== -1, y = new Qi(s.level, s.sn, s.stats.chunkCount, n.byteLength, g, m), E = this.initPTS[s.cc];
            f.push(n, u, d, c, s, i, l.totalduration, h, y, E);
        }
        onAudioTrackSwitching(e, t) {
            const s = this.altAudio;
            if (!!!t.url) {
                if (this.mediaBuffer !== this.media) {
                    this.log("Switching on main audio, use media.buffered to schedule main fragment loading"), this.mediaBuffer = this.media;
                    const a = this.fragCurrent;
                    a && (this.log("Switching to main audio track, cancel main fragment load"), a.abortRequests(), this.fragmentTracker.removeFragment(a)), this.resetTransmuxer(), this.resetLoadingState();
                } else this.audioOnly && this.resetTransmuxer();
                const n = this.hls;
                s && (n.trigger(p.BUFFER_FLUSHING, {
                    startOffset: 0,
                    endOffset: Number.POSITIVE_INFINITY,
                    type: null
                }), this.fragmentTracker.removeAllFragments()), n.trigger(p.AUDIO_TRACK_SWITCHED, t);
            }
        }
        onAudioTrackSwitched(e, t) {
            const s = t.id, i = !!this.hls.audioTracks[s].url;
            if (i) {
                const n = this.videoBuffer;
                n && this.mediaBuffer !== n && (this.log("Switching on alternate audio, use video.buffered to schedule main fragment loading"), this.mediaBuffer = n);
            }
            this.altAudio = i, this.tick();
        }
        onBufferCreated(e, t) {
            const s = t.tracks;
            let i, n, a = !1;
            for(const o in s){
                const l = s[o];
                if (l.id === "main") {
                    if (n = o, i = l, o === "video") {
                        const c = s[o];
                        c && (this.videoBuffer = c.buffer);
                    }
                } else a = !0;
            }
            a && i ? (this.log(`Alternate track found, use ${n}.buffered to schedule main fragment loading`), this.mediaBuffer = i.buffer) : this.mediaBuffer = this.media;
        }
        onFragBuffered(e, t) {
            const { frag: s, part: i } = t;
            if (s && s.type !== B.MAIN) return;
            if (this.fragContextChanged(s)) {
                this.warn(`Fragment ${s.sn}${i ? " p: " + i.index : ""} of level ${s.level} finished buffering, but was aborted. state: ${this.state}`), this.state === C.PARSED && (this.state = C.IDLE);
                return;
            }
            const n = i ? i.stats : s.stats;
            this.fragLastKbps = Math.round(8 * n.total / (n.buffering.end - n.loading.first)), s.sn !== "initSegment" && (this.fragPrevious = s), this.fragBufferedComplete(s, i);
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
                const n = e.stats;
                n.parsing.start = n.parsing.end = n.buffering.start = n.buffering.end = self.performance.now(), i.trigger(p.FRAG_LOADED, s), e.bitrateTest = !1;
            });
        }
        _handleTransmuxComplete(e) {
            var t;
            const s = "main", { hls: i } = this, { remuxResult: n, chunkMeta: a } = e, o = this.getCurrentContext(a);
            if (!o) {
                this.resetWhenMissingContext(a);
                return;
            }
            const { frag: l, part: c, level: h } = o, { video: u, text: d, id3: f, initSegment: g } = n, { details: m } = h, y = this.altAudio ? void 0 : n.audio;
            if (this.fragContextChanged(l)) {
                this.fragmentTracker.removeFragment(l);
                return;
            }
            if (this.state = C.PARSING, g) {
                if (g != null && g.tracks) {
                    const T = l.initSegment || l;
                    this._bufferInitSegment(h, g.tracks, T, a), i.trigger(p.FRAG_PARSING_INIT_SEGMENT, {
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
                if (n.independent !== !1) {
                    const { startPTS: b, endPTS: S, startDTS: D, endDTS: R } = u;
                    if (c) c.elementaryStreams[u.type] = {
                        startPTS: b,
                        endPTS: S,
                        startDTS: D,
                        endDTS: R
                    };
                    else if (u.firstKeyFrame && u.independent && a.id === 1 && !T && (this.couldBacktrack = !0), u.dropped && u.independent) {
                        const _ = this.getMainFwdBufferInfo(), P = (_ ? _.end : this.getLoadPosition()) + this.config.maxBufferHole, I = u.firstKeyFramePTS ? u.firstKeyFramePTS : b;
                        if (!x && P < I - this.config.maxBufferHole && !T) {
                            this.backtrack(l);
                            return;
                        } else T && (l.gap = !0);
                        l.setElementaryStreamInfo(u.type, l.start, S, l.start, R, !0);
                    } else x && b > ps && (l.gap = !0);
                    l.setElementaryStreamInfo(u.type, b, S, D, R), this.backtrackFragment && (this.backtrackFragment = l), this.bufferFragmentData(u, l, c, a, x || T);
                } else if (x || T) l.gap = !0;
                else {
                    this.backtrack(l);
                    return;
                }
            }
            if (y) {
                const { startPTS: E, endPTS: x, startDTS: T, endDTS: b } = y;
                c && (c.elementaryStreams[Q.AUDIO] = {
                    startPTS: E,
                    endPTS: x,
                    startDTS: T,
                    endDTS: b
                }), l.setElementaryStreamInfo(Q.AUDIO, E, x, T, b), this.bufferFragmentData(y, l, c, a);
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
            if (m && d) {
                const E = {
                    id: s,
                    frag: l,
                    details: m,
                    samples: d.samples
                };
                i.trigger(p.FRAG_PARSING_USERDATA, E);
            }
        }
        _bufferInitSegment(e, t, s, i) {
            if (this.state !== C.PARSING) return;
            this.audioOnly = !!t.audio && !t.video, this.altAudio && !this.audioOnly && delete t.audio;
            const { audio: n, video: a, audiovideo: o } = t;
            if (n) {
                let l = e.audioCodec;
                const c = navigator.userAgent.toLowerCase();
                if (this.audioCodecSwitch) {
                    l && (l.indexOf("mp4a.40.5") !== -1 ? l = "mp4a.40.2" : l = "mp4a.40.5");
                    const h = n.metadata;
                    h && "channelCount" in h && (h.channelCount || 1) !== 1 && c.indexOf("firefox") === -1 && (l = "mp4a.40.5");
                }
                l && l.indexOf("mp4a.40.5") !== -1 && c.indexOf("android") !== -1 && n.container !== "audio/mpeg" && (l = "mp4a.40.2", this.log(`Android: force audio codec to ${l}`)), e.audioCodec && e.audioCodec !== l && this.log(`Swapping manifest audio codec "${e.audioCodec}" for "${l}"`), n.levelCodec = l, n.id = "main", this.log(`Init audio buffer, container:${n.container}, codecs[selected/level/parsed]=[${l || ""}/${e.audioCodec || ""}/${n.codec}]`);
            }
            a && (a.levelCodec = e.videoCodec, a.id = "main", this.log(`Init video buffer, container:${a.container}, codecs[level/parsed]=[${e.videoCodec || ""}/${a.codec}]`)), o && this.log(`Init audiovideo buffer, container:${o.container}, codecs[level/parsed]=[${e.codecs}/${o.codec}]`), this.hls.trigger(p.BUFFER_CODECS, t), Object.keys(t).forEach((l)=>{
                const h = t[l].initSegment;
                h != null && h.byteLength && this.hls.trigger(p.BUFFER_APPENDING, {
                    type: l,
                    data: h,
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
                    const i = this.fragPlaying, n = t.level;
                    (!i || t.sn !== i.sn || i.level !== n) && (this.fragPlaying = t, this.hls.trigger(p.FRAG_CHANGED, {
                        frag: t
                    }), (!i || i.level !== n) && this.hls.trigger(p.LEVEL_SWITCHED, {
                        level: n
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
    class Le {
        static get version() {
            return "1.5.13";
        }
        static isMSESupported() {
            return Na();
        }
        static isSupported() {
            return fu();
        }
        static getMediaSource() {
            return ut();
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
            return Le.defaultConfig ? Le.defaultConfig : Oa;
        }
        static set DefaultConfig(e) {
            Le.defaultConfig = e;
        }
        constructor(e = {}){
            this.config = void 0, this.userConfig = void 0, this.coreComponents = void 0, this.networkControllers = void 0, this.started = !1, this._emitter = new rn, this._autoLevelCapping = -1, this._maxHdcpLevel = null, this.abrController = void 0, this.bufferController = void 0, this.capLevelController = void 0, this.latencyController = void 0, this.levelController = void 0, this.streamController = void 0, this.audioTrackController = void 0, this.subtitleTrackController = void 0, this.emeController = void 0, this.cmcdController = void 0, this._media = null, this.url = null, this.triggeringException = void 0, oo(e.debug || !1, "Hls instance");
            const t = this.config = cu(Le.DefaultConfig, e);
            this.userConfig = e, t.progressive && hu(t);
            const { abrController: s, bufferController: i, capLevelController: n, errorController: a, fpsController: o } = t, l = new a(this), c = this.abrController = new s(this), h = this.bufferController = new i(this), u = this.capLevelController = new n(this), d = new o(this), f = new sl(this), g = new ol(this), m = t.contentSteeringController, y = m ? new m(this) : null, E = this.levelController = new uu(this, y), x = new Ml(this), T = new du(this.config), b = this.streamController = new xu(this, x, T);
            u.setStreamController(b), d.setStreamController(b);
            const S = [
                f,
                E,
                b
            ];
            y && S.splice(1, 0, y), this.networkControllers = S;
            const D = [
                c,
                h,
                u,
                d,
                g,
                x
            ];
            this.audioTrackController = this.createController(t.audioTrackController, S);
            const R = t.audioStreamController;
            R && S.push(new R(this, x, T)), this.subtitleTrackController = this.createController(t.subtitleTrackController, S);
            const _ = t.subtitleStreamController;
            _ && S.push(new _(this, x, T)), this.createController(t.timelineController, D), T.emeController = this.emeController = this.createController(t.emeController, D), this.cmcdController = this.createController(t.cmcdController, D), this.latencyController = this.createController(ll, D), this.coreComponents = D, S.push(l);
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
                if (v.error("An internal error happened while handling event " + e + '. Error message: "' + s.message + '". Here is a stacktrace:', s), !this.triggeringException) {
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
            v.log("destroy"), this.trigger(p.DESTROYING, void 0), this.detachMedia(), this.removeAllListeners(), this._autoLevelCapping = -1, this.url = null, this.networkControllers.forEach((t)=>t.destroy()), this.networkControllers.length = 0, this.coreComponents.forEach((t)=>t.destroy()), this.coreComponents.length = 0;
            const e = this.config;
            e.xhrSetup = e.fetchSetup = void 0, this.userConfig = null;
        }
        attachMedia(e) {
            v.log("attachMedia"), this._media = e, this.trigger(p.MEDIA_ATTACHING, {
                media: e
            });
        }
        detachMedia() {
            v.log("detachMedia"), this.trigger(p.MEDIA_DETACHING, void 0), this._media = null;
        }
        loadSource(e) {
            this.stopLoad();
            const t = this.media, s = this.url, i = this.url = Wi.buildAbsoluteURL(self.location.href, e, {
                alwaysNormalize: !0
            });
            this._autoLevelCapping = -1, this._maxHdcpLevel = null, v.log(`loadSource:${i}`), t && s && (s !== i || this.bufferController.hasSourceTypes()) && (this.detachMedia(), this.attachMedia(t)), this.trigger(p.MANIFEST_LOADING, {
                url: e
            });
        }
        startLoad(e = -1) {
            v.log(`startLoad(${e})`), this.started = !0, this.networkControllers.forEach((t)=>{
                t.startLoad(e);
            });
        }
        stopLoad() {
            v.log("stopLoad"), this.started = !1, this.networkControllers.forEach((e)=>{
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
            v.log("swapAudioCodec"), this.streamController.swapAudioCodec();
        }
        recoverMediaError() {
            v.log("recoverMediaError");
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
            v.log(`set currentLevel:${e}`), this.levelController.manualLevel = e, this.streamController.immediateLevelSwitch();
        }
        get nextLevel() {
            return this.streamController.nextLevel;
        }
        set nextLevel(e) {
            v.log(`set nextLevel:${e}`), this.levelController.manualLevel = e, this.streamController.nextLevelSwitch();
        }
        get loadLevel() {
            return this.levelController.level;
        }
        set loadLevel(e) {
            v.log(`set loadLevel:${e}`), this.levelController.manualLevel = e;
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
            v.log(`set firstLevel:${e}`), this.levelController.firstLevel = e;
        }
        get startLevel() {
            const e = this.levelController.startLevel;
            return e === -1 && this.abrController.forcedAutoLevel > -1 ? this.abrController.forcedAutoLevel : e;
        }
        set startLevel(e) {
            v.log(`set startLevel:${e}`), e !== -1 && (e = Math.max(e, this.minAutoLevel)), this.levelController.startLevel = e;
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
            this._autoLevelCapping !== e && (v.log(`set autoLevelCapping:${e}`), this._autoLevelCapping = e, this.levelController.checkMaxAutoUpdated());
        }
        get maxHdcpLevel() {
            return this._maxHdcpLevel;
        }
        set maxHdcpLevel(e) {
            cl(e) && this._maxHdcpLevel !== e && (this._maxHdcpLevel = e, this.levelController.checkMaxAutoUpdated());
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
            if (t === -1 && e != null && e.length ? i = e.length - 1 : i = t, s) for(let n = i; n--;){
                const a = e[n].attrs["HDCP-LEVEL"];
                if (a && a <= s) return n;
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
    Le.defaultConfig = void 0;
    function Su(r) {
        return fe.extract_groups(r);
    }
    function vu() {
        return {
            __proto__: null,
            "./iptv_wasm_bg.js": {
                __proto__: null,
                __wbg_Error_92b29b0548f8b746: function(e, t) {
                    return Error(gi(e, t));
                },
                __wbg_Number_9a4e0ecb0fa16705: function(e) {
                    return Number(e);
                },
                __wbg___wbindgen_boolean_get_fa956cfa2d1bd751: function(e) {
                    const t = e, s = typeof t == "boolean" ? t : void 0;
                    return as(s) ? 16777215 : s ? 1 : 0;
                },
                __wbg___wbindgen_debug_string_c25d447a39f5578f: function(e, t) {
                    const s = Bi(t), i = yr(s, fe.__wbindgen_malloc, fe.__wbindgen_realloc), n = Ps;
                    xt().setInt32(e + 4, n, !0), xt().setInt32(e + 0, i, !0);
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
                    xt().setFloat64(e + 8, as(i) ? 0 : i, !0), xt().setInt32(e + 0, !as(i), !0);
                },
                __wbg___wbindgen_string_get_b0ca35b86a603356: function(e, t) {
                    const s = t, i = typeof s == "string" ? s : void 0;
                    var n = as(i) ? 0 : yr(i, fe.__wbindgen_malloc, fe.__wbindgen_realloc), a = Ps;
                    xt().setInt32(e + 4, a, !0), xt().setInt32(e + 0, n, !0);
                },
                __wbg___wbindgen_throw_344f42d3211c4765: function(e, t) {
                    throw new Error(gi(e, t));
                },
                __wbg_call_8a2dd23819f8a60a: function() {
                    return mi(function(e, t) {
                        return e.call(t);
                    }, arguments);
                },
                __wbg_done_89b2b13e91a60321: function(e) {
                    return e.done;
                },
                __wbg_get_c7eb1f358a7654df: function() {
                    return mi(function(e, t) {
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
                    return mi(function(e) {
                        return e.next();
                    }, arguments);
                },
                __wbg_prototypesetcall_4770620bbe4688a0: function(e, t, s) {
                    Uint8Array.prototype.set.call(Au(e, t), s);
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
                    return gi(e, t);
                },
                __wbindgen_cast_0000000000000003: function(e) {
                    return BigInt.asUintN(64, e);
                },
                __wbindgen_init_externref_table: function() {
                    const e = fe.__wbindgen_externrefs, t = e.grow(4);
                    e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, !0), e.set(t + 3, !1);
                }
            }
        };
    }
    function Lu(r) {
        const e = fe.__externref_table_alloc();
        return fe.__wbindgen_externrefs.set(e, r), e;
    }
    function Bi(r) {
        const e = typeof r;
        if (e == "number" || e == "boolean" || r == null) return `${r}`;
        if (e == "string") return `"${r}"`;
        if (e == "symbol") {
            const i = r.description;
            return i == null ? "Symbol" : `Symbol(${i})`;
        }
        if (e == "function") {
            const i = r.name;
            return typeof i == "string" && i.length > 0 ? `Function(${i})` : "Function";
        }
        if (Array.isArray(r)) {
            const i = r.length;
            let n = "[";
            i > 0 && (n += Bi(r[0]));
            for(let a = 1; a < i; a++)n += ", " + Bi(r[a]);
            return n += "]", n;
        }
        const t = /\[object ([^\]]+)\]/.exec(toString.call(r));
        let s;
        if (t && t.length > 1) s = t[1];
        else return toString.call(r);
        if (s == "Object") try {
            return "Object(" + JSON.stringify(r) + ")";
        } catch  {
            return "Object";
        }
        return r instanceof Error ? `${r.name}: ${r.message}
${r.stack}` : s;
    }
    function Au(r, e) {
        return r = r >>> 0, Ut().subarray(r / 1, r / 1 + e);
    }
    let rt = null;
    function xt() {
        return (rt === null || rt.buffer.detached === !0 || rt.buffer.detached === void 0 && rt.buffer !== fe.memory.buffer) && (rt = new DataView(fe.memory.buffer)), rt;
    }
    function gi(r, e) {
        return bu(r >>> 0, e);
    }
    let Mt = null;
    function Ut() {
        return (Mt === null || Mt.byteLength === 0) && (Mt = new Uint8Array(fe.memory.buffer)), Mt;
    }
    function mi(r, e) {
        try {
            return r.apply(this, e);
        } catch (t) {
            const s = Lu(t);
            fe.__wbindgen_exn_store(s);
        }
    }
    function as(r) {
        return r == null;
    }
    function yr(r, e, t) {
        if (t === void 0) {
            const o = Bt.encode(r), l = e(o.length, 1) >>> 0;
            return Ut().subarray(l, l + o.length).set(o), Ps = o.length, l;
        }
        let s = r.length, i = e(s, 1) >>> 0;
        const n = Ut();
        let a = 0;
        for(; a < s; a++){
            const o = r.charCodeAt(a);
            if (o > 127) break;
            n[i + a] = o;
        }
        if (a !== s) {
            a !== 0 && (r = r.slice(a)), i = t(i, s, s = a + r.length * 3, 1) >>> 0;
            const o = Ut().subarray(i + a, i + s), l = Bt.encodeInto(r, o);
            a += l.written, i = t(i, s, a, 1) >>> 0;
        }
        return Ps = a, i;
    }
    let ys = new TextDecoder("utf-8", {
        ignoreBOM: !0,
        fatal: !0
    });
    ys.decode();
    const Ru = 2146435072;
    let pi = 0;
    function bu(r, e) {
        return pi += e, pi >= Ru && (ys = new TextDecoder("utf-8", {
            ignoreBOM: !0,
            fatal: !0
        }), ys.decode(), pi = e), ys.decode(Ut().subarray(r, r + e));
    }
    const Bt = new TextEncoder;
    "encodeInto" in Bt || (Bt.encodeInto = function(r, e) {
        const t = Bt.encode(r);
        return e.set(t), {
            read: r.length,
            written: t.length
        };
    });
    let Ps = 0, fe;
    function Iu(r, e) {
        return fe = r.exports, rt = null, Mt = null, fe.__wbindgen_start(), fe;
    }
    async function Du(r, e) {
        if (typeof Response == "function" && r instanceof Response) {
            if (typeof WebAssembly.instantiateStreaming == "function") try {
                return await WebAssembly.instantiateStreaming(r, e);
            } catch (i) {
                if (r.ok && t(r.type) && r.headers.get("Content-Type") !== "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", i);
                else throw i;
            }
            const s = await r.arrayBuffer();
            return await WebAssembly.instantiate(s, e);
        } else {
            const s = await WebAssembly.instantiate(r, e);
            return s instanceof WebAssembly.Instance ? {
                instance: s,
                module: r
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
    async function Cu(r) {
        if (fe !== void 0) return fe;
        r !== void 0 && (Object.getPrototypeOf(r) === Object.prototype ? { module_or_path: r } = r : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), r === void 0 && (r = new URL("/assets/iptv_wasm_bg-C1cpzyIi.wasm", import.meta.url));
        const e = vu();
        (typeof r == "string" || typeof Request == "function" && r instanceof Request || typeof URL == "function" && r instanceof URL) && (r = fetch(r));
        const { instance: t, module: s } = await Du(await r, e);
        return Iu(t);
    }
    const _u = "";
    async function Ie(r, e) {
        const t = await fetch(`${_u}${r}`, e);
        if (!t.ok) {
            const s = await t.json().catch(()=>({
                    error: t.statusText
                }));
            throw new Error(s.error || t.statusText);
        }
        return t.json();
    }
    const Oe = {
        health: ()=>Ie("/api/health"),
        channels: ()=>Ie("/api/channels"),
        search: (r)=>Ie(`/api/channels/search?q=${encodeURIComponent(r)}`),
        playlists: ()=>Ie("/api/playlists"),
        deletePlaylist: (r)=>Ie(`/api/playlists/${encodeURIComponent(r)}`, {
                method: "DELETE"
            }),
        uploadFile: (r, e)=>{
            const t = new FormData;
            return t.append("file", e, e.name), Ie(r, {
                method: "POST",
                body: t
            });
        },
        fetchSource: (r)=>Ie("/api/sources/fetch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: r
                })
            }),
        sources: ()=>Ie("/api/sources"),
        pipelineStatus: ()=>Ie("/api/pipeline/status"),
        pipelineRun: ()=>Ie("/api/pipeline/run", {
                method: "POST"
            }),
        channelEpg: (r, e)=>{
            const t = e ? `?name=${encodeURIComponent(e)}` : "";
            return Ie(`/api/epg/channel/${encodeURIComponent(r)}${t}`);
        },
        proxyUrl: (r)=>`/api/proxy?url=${encodeURIComponent(r)}`
    };
    await Cu();
    const k = (r)=>document.getElementById(r), lt = k("search"), et = k("groupSelect"), je = k("listViewport"), wu = k("listSpacer"), yi = k("listRows"), ku = k("listEmpty"), Pu = k("listEmptyHint"), Fu = k("railCount"), Fs = k("serverStatus"), Ua = k("rail"), Ou = k("railTools"), Er = k("filterControls"), Ba = k("hideDeadBtn"), Mu = k("pipelineStrip"), Tr = k("pipelineText"), Nu = k("pipelineBarFill"), Ce = k("player"), $a = k("playerShell"), Uu = k("veilIdle"), Bu = k("veilTuning"), $u = k("veilError"), Gu = k("tuningName"), Ku = k("errorDetail"), Hu = k("tally"), Vu = k("tallyLabel"), xr = k("clock"), Wu = k("ltNumber"), Yu = k("ltName"), qu = k("ltGroup"), $t = k("ltNow"), Gt = k("ltNext"), ju = k("nowTitle"), zu = k("nowTime"), Xu = k("nowProgress"), Qu = k("nextTitle"), Ju = k("nextTime"), os = k("guideStatus"), hn = k("guideTimeline"), Zu = k("guideSplit"), Es = k("guideEmpty"), Sr = k("tlRuler"), $i = k("tlTrack"), vr = k("tlNow"), Ft = k("guideNow"), Ei = k("guideNext"), ed = k("libraryTools"), Os = k("libViewport"), td = k("libSpacer"), Ti = k("libRows"), sd = k("libEmpty"), id = k("libEmptyHint"), dt = k("drawer"), nd = k("toasts"), ft = k("homeRails"), Gi = k("homeHero"), rd = k("homeEmpty"), ht = 56, Lr = 6, ad = 170, Ts = 14, Ga = 210, Ms = 20;
    let Ke = [], ce = [], at = new Map, Ct = "all", Kt = localStorage.getItem("signal.hideDead") === "1", Te = localStorage.getItem("signal.layout") || "home", _t = null, Fe = null, pe = -1, we = null, ze = null, Ae = [], xi = 0, xs = [
        -1,
        -1
    ], Ht = 1, Ss = [
        -1,
        -1
    ], Ar = !1, Rr = -1;
    const ie = new Set(JSON.parse(localStorage.getItem("signal.favs") || "[]")), qt = new Set(JSON.parse(localStorage.getItem("signal.dead") || "[]"));
    let tt = JSON.parse(localStorage.getItem("signal.recents") || "[]");
    const od = 20, Re = (r)=>r.tvg_id || `${r.name}|${r.url}`, Xe = (r)=>r.tvg_id || r.name, Qe = (r)=>r.status === "dead" || qt.has(Re(r)), Ka = ()=>localStorage.setItem("signal.dead", JSON.stringify([
            ...qt
        ])), un = ()=>localStorage.setItem("signal.favs", JSON.stringify([
            ...ie
        ]));
    function Ee(r, e = "info", t = 3200) {
        const s = document.createElement("div");
        s.className = `toast ${e}`, s.textContent = r, nd.appendChild(s), setTimeout(()=>{
            s.style.opacity = "0", setTimeout(()=>s.remove(), 350);
        }, t);
    }
    function Ha() {
        const r = new Date;
        xr.textContent = r.toLocaleTimeString([], {
            hour12: !1
        }), xr.setAttribute("datetime", r.toISOString());
    }
    Ha();
    setInterval(Ha, 1e3);
    async function Ki() {
        try {
            const r = await Oe.channels();
            Ke = r.channels || [], at = new Map;
            try {
                const e = Su(Ke);
                if (e) for (const [t, s] of e)at.set(t || "Uncategorized", s);
            } catch  {}
            if (at.size === 0) for (const e of Ke){
                const t = e.group || "Uncategorized";
                at.set(t, (at.get(t) || 0) + 1);
            }
            ld(), st(), Te === "home" && Ws(), Fs.dataset.ok = "1", r.pipeline && Va(r.pipeline);
        } catch  {
            Fs.dataset.ok = "0", Ee("Could not reach the server", "err");
        }
    }
    function ld() {
        const r = et.value;
        et.innerHTML = "";
        const e = document.createElement("option");
        e.value = "", e.textContent = `All groups (${Ke.length.toLocaleString()})`, et.appendChild(e), [
            ...at.entries()
        ].sort((t, s)=>t[0].localeCompare(s[0])).forEach(([t, s])=>{
            const i = document.createElement("option");
            i.value = t, i.textContent = `${t} (${s})`, et.appendChild(i);
        }), [
            ...et.options
        ].some((t)=>t.value === r) && (et.value = r);
    }
    function Va(r) {
        const e = !!r.running;
        if (Mu.hidden = !e, e) {
            let i = r.phase || "working…", n = 0;
            r.phase === "fetching playlists" && r.playlists_total ? (i = `Fetching playlists ${r.playlists_fetched}/${r.playlists_total}`, n = r.playlists_fetched / r.playlists_total * 100) : r.phase === "checking streams" && r.unique_channels ? (i = `Testing streams ${r.checked.toLocaleString()}/${r.unique_channels.toLocaleString()} · ${r.alive.toLocaleString()} live`, n = r.checked / r.unique_channels * 100) : r.phase === "fetching EPG" && r.epg_total ? (i = `Merging EPG ${r.epg_fetched}/${r.epg_total}`, n = r.epg_fetched / r.epg_total * 100) : r.phase === "deduplicating" && (i = "Deduplicating channels…"), Tr.textContent = i, Nu.style.width = `${Math.min(100, n)}%`;
            const a = Math.floor((r.alive || 0) / 500);
            a !== Rr && (Rr = a, r.phase === "checking streams" && Ki());
        }
        Ar && !e && (Ee("Channel curation finished — list updated", "ok"), Ki(), ze && Hs(ze)), Ar = e;
        const t = document.getElementById("pipelineNote");
        t && (e ? t.textContent = `Running: ${Tr.textContent}` : r.last_run && (t.textContent = `Last rebuilt ${new Date(r.last_run).toLocaleString()}. Rebuild to re-test every stream.`));
        const s = document.getElementById("pipelineRunBtn");
        s && (s.disabled = e);
    }
    async function $s() {
        try {
            const r = await Oe.pipelineStatus();
            Va(r), Fs.dataset.ok = "1";
        } catch  {
            Fs.dataset.ok = "0";
        }
    }
    setInterval($s, 5e3);
    function st() {
        const r = lt.value.trim().toLowerCase(), e = et.value;
        let t = Ke;
        if (Ct === "fav" && (t = t.filter((n)=>ie.has(Xe(n)))), Ct === "recent") {
            const n = new Map(tt.map((a, o)=>[
                    a,
                    o
                ]));
            t = t.filter((a)=>n.has(Re(a))).sort((a, o)=>n.get(Re(a)) - n.get(Re(o)));
        }
        Kt && (t = t.filter((n)=>!Qe(n))), e && (t = t.filter((n)=>(n.group || "Uncategorized") === e)), r && (t = t.filter((n)=>(n.name || "").toLowerCase().includes(r) || (n.tvg_id || "").toLowerCase().includes(r) || (n.group || "").toLowerCase().includes(r))), ce = t, pe = -1, Fu.textContent = `${ce.length.toLocaleString()} CH`;
        const s = ce.length === 0, i = Ke.length === 0 ? "The server is still curating channels — give it a moment, or open Sources." : "Nothing matches this filter.";
        ku.hidden = !s, Pu.textContent = i, sd.hidden = !s, id.textContent = i, wu.style.height = `${ce.length * ht}px`, xs = [
            -1,
            -1
        ], gt(!0), Te === "library" && dn();
    }
    function gt(r = !1) {
        const e = je.scrollTop, t = je.clientHeight || 600, s = Math.max(0, Math.floor(e / ht) - Lr), i = Math.min(ce.length, Math.ceil((e + t) / ht) + Lr);
        if (!r && s === xs[0] && i === xs[1]) return;
        xs = [
            s,
            i
        ], yi.style.transform = `translateY(${s * ht}px)`, yi.innerHTML = "";
        const n = document.createDocumentFragment();
        for(let a = s; a < i; a++)n.appendChild(cd(ce[a], a));
        yi.appendChild(n);
    }
    function Ns(r) {
        const e = document.createElement("span");
        return e.className = "ch-tile", e.textContent = (r || "?").trim().charAt(0).toUpperCase() || "?", e;
    }
    function Wa(r, e) {
        const t = Xe(r), s = document.createElement("button");
        return s.className = e + (ie.has(t) ? " is-fav" : ""), s.textContent = ie.has(t) ? "★" : "☆", s.title = ie.has(t) ? "Remove from favorites" : "Add to favorites", s.addEventListener("click", (i)=>{
            i.stopPropagation(), ie.has(t) ? ie.delete(t) : ie.add(t), un(), Ct === "fav" ? st() : Gs();
        }), s;
    }
    function Gs() {
        gt(!0), Te === "library" && fn(!0), Te === "home" && Ws();
    }
    function cd(r, e) {
        const t = Re(r), s = document.createElement("div");
        s.className = "ch-row", t === Fe && s.classList.add("is-current"), e === pe && s.classList.add("is-keyed"), Qe(r) && s.classList.add("is-dead");
        const i = document.createElement("span");
        if (i.className = "ch-num", i.textContent = String(e + 1).padStart(3, "0"), s.appendChild(i), r.logo) {
            const l = document.createElement("img");
            l.className = "ch-logo", l.loading = "lazy", l.src = r.logo, l.alt = "", l.onerror = ()=>l.replaceWith(Ns(r.name)), s.appendChild(l);
        } else s.appendChild(Ns(r.name));
        const n = document.createElement("div");
        n.className = "ch-meta";
        const a = document.createElement("span");
        a.className = "ch-name", a.textContent = r.name || "Unnamed channel";
        const o = document.createElement("span");
        if (o.className = "ch-group", o.textContent = r.group || "", n.append(a, o), s.appendChild(n), Qe(r)) {
            const l = document.createElement("span");
            l.className = "ch-health dead", l.title = "Stream failed recently", s.appendChild(l);
        }
        return s.appendChild(Wa(r, "ch-fav")), s.addEventListener("click", ()=>jt(r)), s;
    }
    let Si = !1;
    je.addEventListener("scroll", ()=>{
        Si || (Si = !0, requestAnimationFrame(()=>{
            Si = !1, gt();
        }));
    });
    function dn() {
        const r = (Os.clientWidth || 900) - Ms * 2;
        Ht = Math.max(1, Math.floor((r + Ts) / (ad + Ts)));
        const e = Math.ceil(ce.length / Ht);
        td.style.height = `${e * (Ga + Ts) + Ms * 2}px`, Ss = [
            -1,
            -1
        ], fn(!0);
    }
    function fn(r = !1) {
        const e = Ga + Ts, t = Os.scrollTop, s = Os.clientHeight || 700, i = Math.ceil(ce.length / Ht), n = Math.max(0, Math.floor((t - Ms) / e) - 2), a = Math.min(i, Math.ceil((t + s) / e) + 2);
        if (!r && n === Ss[0] && a === Ss[1]) return;
        Ss = [
            n,
            a
        ], Ti.style.transform = `translateY(${Ms + n * e}px)`, Ti.innerHTML = "";
        const o = document.createDocumentFragment();
        for(let l = n; l < a; l++){
            const c = document.createElement("div");
            c.className = "lib-row";
            for(let h = 0; h < Ht; h++){
                const u = l * Ht + h;
                if (u >= ce.length) break;
                c.appendChild(Ya(ce[u]));
            }
            o.appendChild(c);
        }
        Ti.appendChild(o);
    }
    function Ya(r) {
        const e = Re(r), t = document.createElement("div");
        t.className = "lib-card", e === Fe && t.classList.add("is-current"), Qe(r) && t.classList.add("is-dead");
        const s = document.createElement("div");
        if (s.className = "lib-poster", r.logo) {
            const o = document.createElement("img");
            o.loading = "lazy", o.src = r.logo, o.alt = "", o.onerror = ()=>o.replaceWith(Ns(r.name)), s.appendChild(o);
        } else s.appendChild(Ns(r.name));
        t.appendChild(s);
        const i = document.createElement("div");
        i.className = "lib-meta";
        const n = document.createElement("div");
        n.className = "lib-name", n.textContent = r.name || "Unnamed channel";
        const a = document.createElement("span");
        if (a.className = "lib-group", a.textContent = r.group || "", i.append(n, a), t.appendChild(i), e === Fe) {
            const o = document.createElement("span");
            o.className = "lib-live-tag", o.textContent = "ON AIR", t.appendChild(o);
        } else if (Qe(r)) {
            const o = document.createElement("span");
            o.className = "lib-dead-dot", o.title = "Stream failed recently", t.appendChild(o);
        }
        return t.appendChild(Wa(r, "lib-fav")), t.addEventListener("click", ()=>jt(r)), t;
    }
    let vi = !1;
    Os.addEventListener("scroll", ()=>{
        vi || (vi = !0, requestAnimationFrame(()=>{
            vi = !1, fn();
        }));
    });
    window.addEventListener("resize", ()=>{
        gt(!0), Te === "library" && dn();
    });
    function wt(r) {
        Te = r, localStorage.setItem("signal.layout", r), document.body.dataset.layout = r, k("layoutHomeBtn").classList.toggle("is-active", r === "home"), k("layoutConsoleBtn").classList.toggle("is-active", r === "console"), k("layoutLibraryBtn").classList.toggle("is-active", r === "library"), r === "library" ? (ed.appendChild(Er), dn()) : r === "console" ? (Ou.appendChild(Er), gt(!0)) : Ws();
    }
    k("layoutHomeBtn").addEventListener("click", ()=>wt("home"));
    k("layoutConsoleBtn").addEventListener("click", ()=>wt("console"));
    k("layoutLibraryBtn").addEventListener("click", ()=>wt("library"));
    function Ks(r) {
        $a.dataset.state = r, Uu.hidden = r !== "idle", Bu.hidden = r !== "tuning", $u.hidden = r !== "error", Ce.controls = r === "playing";
        const e = r === "playing" ? "live" : r === "tuning" ? "tuning" : "standby";
        Hu.dataset.state = e, Vu.textContent = e === "live" ? "ON AIR" : e === "tuning" ? "CUED" : "STANDBY";
    }
    function jt(r) {
        ze = r, Fe = Re(r), pe = -1, Te !== "console" && wt("console"), Gs(), window.innerWidth <= 920 && Ua.classList.remove("is-open"), Ks("tuning"), Gu.textContent = r.name || "";
        const e = ce.findIndex((t)=>Re(t) === Fe);
        Wu.textContent = e >= 0 ? String(e + 1).padStart(3, "0") : "···", Yu.textContent = r.name || "Unnamed channel", qu.textContent = r.group || "", $t.hidden = !0, Gt.hidden = !0, hd(r.url), gd(r), Hs(r);
    }
    let br = 0;
    function hd(r) {
        const e = ++br;
        we && (we.destroy(), we = null), Ce.removeAttribute("src");
        const t = Oe.proxyUrl(r), s = (n)=>{
            e === br && fd(n);
        };
        Ce.addEventListener("playing", ud, {
            once: !0
        });
        const i = /\.m3u8($|\?)/i.test(r);
        i && Le.isSupported() ? (we = new Le({
            maxBufferLength: 30,
            manifestLoadingTimeOut: 15e3,
            levelLoadingTimeOut: 15e3
        }), we.loadSource(t), we.attachMedia(Ce), we.on(Le.Events.MANIFEST_PARSED, ()=>Ce.play().catch(()=>{})), we.on(Le.Events.ERROR, (n, a)=>{
            a.fatal && s(dd(a));
        })) : i && Ce.canPlayType("application/vnd.apple.mpegurl") ? (Ce.src = t, Ce.play().catch(()=>{})) : (Ce.src = t, Ce.play().catch(()=>s("The browser refused to start this stream."))), Ce.onerror = ()=>{
            $a.dataset.state !== "playing" && s("The stream did not respond. It may be offline or geo-blocked.");
        };
    }
    function ud() {
        Ks("playing"), Fe && qt.delete(Fe) && (Ka(), Gs());
    }
    function dd(r) {
        return r.type === Le.ErrorTypes.NETWORK_ERROR ? "Network error — the stream may be offline or geo-blocked." : r.type === Le.ErrorTypes.MEDIA_ERROR ? "The stream sent media the browser could not decode." : "Playback failed.";
    }
    function fd(r) {
        we && (we.destroy(), we = null), Ku.textContent = r, Ks("error"), Fe && !qt.has(Fe) && (qt.add(Fe), Ka(), Gs());
    }
    k("retryBtn").addEventListener("click", ()=>{
        ze && jt(ze);
    });
    function gd(r) {
        const e = Re(r);
        tt = [
            e,
            ...tt.filter((t)=>t !== e)
        ].slice(0, od), localStorage.setItem("signal.recents", JSON.stringify(tt)), Ct === "recent" && st();
    }
    const Pe = (r)=>{
        const e = new Date(r);
        return isNaN(e.getTime()) ? "" : e.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: !1
        });
    }, md = 30 * 6e4, Hi = 4.5 * 36e5;
    let St = 0;
    function ls(r) {
        hn.hidden = r !== "ok", Zu.hidden = r !== "ok", Es.hidden = r === "ok";
    }
    async function Hs(r) {
        const e = ++xi;
        Ae = [], os.textContent = `Loading schedule for ${r.name}…`, ls("loading"), Es.textContent = "", $t.hidden = !0, Gt.hidden = !0;
        const t = r.tvg_id || r.name;
        try {
            const s = await Oe.channelEpg(t, r.name || "");
            if (e !== xi) return;
            if (Ae = (s.programmes || []).filter((i)=>!isNaN(Date.parse(i.start)) && !isNaN(Date.parse(i.stop))), !Ae.length) {
                os.textContent = r.name, ls("empty"), Es.textContent = "No programme data for this channel yet. Load a matching guide from Sources → Library.";
                return;
            }
            os.textContent = `${r.name} — ${Ae.length} programmes`, ls("ok"), qa();
        } catch  {
            if (e !== xi) return;
            os.textContent = r.name, ls("empty"), Es.textContent = "Could not load the schedule from the server.";
        }
    }
    function qa() {
        St = Date.now() - md;
        const e = St + Hi, t = (n)=>(n - St) / Hi * 100;
        Sr.innerHTML = "";
        const s = Math.ceil(St / 36e5) * 36e5;
        for(let n = s; n <= e; n += 36e5){
            const a = document.createElement("span");
            a.className = "tl-tick", a.style.left = `${t(n)}%`, a.textContent = Pe(n), Sr.appendChild(a);
        }
        $i.innerHTML = "";
        const i = document.createDocumentFragment();
        for (const n of Ae){
            const a = Date.parse(n.start), o = Date.parse(n.stop);
            if (o <= St || a >= e) continue;
            const l = Math.max(0, t(a)), h = Math.min(100, t(o)) - l;
            if (h <= .4) continue;
            const u = document.createElement("div");
            u.className = "tl-block", u.dataset.start = String(a), u.dataset.stop = String(o), u.style.left = `${l}%`, u.style.width = `${h}%`;
            const d = document.createElement("div");
            d.className = "b-title", d.textContent = n.title || "Untitled programme";
            const f = document.createElement("div");
            f.className = "b-time", f.textContent = `${Pe(n.start)}–${Pe(n.stop)}`, u.title = `${n.title}
${Pe(n.start)}–${Pe(n.stop)}`, u.append(d, f), i.appendChild(u);
        }
        $i.appendChild(i), pd(), yd();
    }
    function pd() {
        const r = Date.now(), e = Ae.find((s)=>Date.parse(s.start) <= r && r < Date.parse(s.stop)), t = Ae.filter((s)=>Date.parse(s.start) > r).slice(0, 5);
        if (Ft.innerHTML = "", e) {
            const s = document.createElement("div");
            s.className = "gc-now-title", s.textContent = e.title || "Untitled programme";
            const i = document.createElement("div");
            if (i.className = "gc-now-time", i.textContent = `${Pe(e.start)} – ${Pe(e.stop)}`, Ft.append(s, i), e.description) {
                const o = document.createElement("div");
                o.className = "gc-now-desc", o.textContent = e.description, Ft.appendChild(o);
            }
            const n = document.createElement("div");
            n.className = "gc-progress";
            const a = document.createElement("div");
            a.className = "gc-progress-bar", a.id = "gcProgBar", n.appendChild(a), Ft.appendChild(n);
        } else {
            const s = document.createElement("div");
            s.className = "gc-now-desc", s.textContent = "Nothing scheduled right now.", Ft.appendChild(s);
        }
        if (Ei.innerHTML = "", t.length) {
            const s = document.createDocumentFragment();
            for (const i of t){
                const n = document.createElement("div");
                n.className = "gc-next-item";
                const a = document.createElement("span");
                a.className = "gc-next-time", a.textContent = Pe(i.start);
                const o = document.createElement("span");
                o.className = "gc-next-title", o.textContent = i.title || "Untitled programme", n.append(a, o), s.appendChild(n);
            }
            Ei.appendChild(s);
        } else {
            const s = document.createElement("div");
            s.className = "gc-now-desc", s.textContent = "No upcoming programmes in the guide.", Ei.appendChild(s);
        }
    }
    function yd() {
        const r = Date.now();
        if (Ae.length && !hn.hidden) {
            const e = (r - St) / Hi * 100;
            vr.style.left = `${Math.max(0, Math.min(100, e))}%`, vr.style.display = e < 0 || e > 100 ? "none" : "block", $i.querySelectorAll(".tl-block").forEach((i)=>{
                const n = Number(i.dataset.start), a = Number(i.dataset.stop);
                i.classList.toggle("is-live", n <= r && r < a), i.classList.toggle("is-past", a <= r);
            });
            const t = Ae.find((i)=>Date.parse(i.start) <= r && r < Date.parse(i.stop)), s = document.getElementById("gcProgBar");
            if (t && s) {
                const i = Date.parse(t.start), n = Date.parse(t.stop);
                s.style.width = `${Math.min(100, Math.max(0, (r - i) / (n - i) * 100))}%`;
            }
        }
        ja();
    }
    function ja() {
        if (!Ae.length) {
            $t.hidden = !0, Gt.hidden = !0;
            return;
        }
        const r = Date.now();
        let e = null, t = null;
        for (const s of Ae){
            const i = Date.parse(s.start), n = Date.parse(s.stop);
            if (i <= r && r < n) e = s;
            else if (i > r) {
                t = s;
                break;
            }
        }
        if (e) {
            $t.hidden = !1, ju.textContent = e.title || "Untitled programme", zu.textContent = `${Pe(e.start)}–${Pe(e.stop)}`;
            const s = Date.parse(e.start), i = Date.parse(e.stop);
            Xu.style.width = `${Math.min(100, Math.max(0, (r - s) / (i - s) * 100))}%`;
        } else $t.hidden = !0;
        t ? (Gt.hidden = !1, Qu.textContent = t.title || "Untitled programme", Ju.textContent = Pe(t.start)) : Gt.hidden = !0;
    }
    setInterval(()=>{
        Ae.length && !hn.hidden ? qa() : ja();
    }, 6e4);
    let Li = null;
    lt.addEventListener("input", ()=>{
        Li && clearTimeout(Li), Li = setTimeout(()=>{
            Te === "home" && lt.value.trim() && wt("library"), st();
        }, 120);
    });
    et.addEventListener("change", st);
    document.querySelectorAll(".chip[data-mode]").forEach((r)=>{
        r.addEventListener("click", ()=>{
            document.querySelectorAll(".chip[data-mode]").forEach((e)=>e.classList.remove("is-active")), r.classList.add("is-active"), Ct = r.dataset.mode, st();
        });
    });
    function za() {
        Ba.setAttribute("aria-pressed", Kt ? "true" : "false");
    }
    Ba.addEventListener("click", ()=>{
        Kt = !Kt, localStorage.setItem("signal.hideDead", Kt ? "1" : "0"), za(), st();
    });
    za();
    document.addEventListener("keydown", (r)=>{
        const e = [
            "INPUT",
            "TEXTAREA",
            "SELECT"
        ].includes(r.target.tagName);
        if (r.key === "/" && !e) {
            r.preventDefault(), lt.focus(), lt.select();
            return;
        }
        if (r.key === "Escape") {
            dt.hidden ? r.target === lt && lt.blur() : Xa();
            return;
        }
        if (!(e || !dt.hidden)) {
            if (Te === "home") {
                Ad(r);
                return;
            }
            if (Te === "console") {
                if (r.key === "ArrowDown" || r.key === "ArrowUp") {
                    if (r.preventDefault(), !ce.length) return;
                    const t = r.key === "ArrowDown" ? 1 : -1;
                    pe < 0 ? pe = Math.max(0, ce.findIndex((i)=>Re(i) === Fe)) : pe = Math.min(ce.length - 1, Math.max(0, pe + t));
                    const s = pe * ht;
                    s < je.scrollTop ? je.scrollTop = s : s + ht > je.scrollTop + je.clientHeight && (je.scrollTop = s + ht - je.clientHeight), gt(!0);
                } else if (r.key === "Enter" && pe >= 0 && ce[pe]) jt(ce[pe]);
                else if (r.key.toLowerCase() === "f" && pe >= 0 && ce[pe]) {
                    const t = ce[pe], s = Xe(t);
                    ie.has(s) ? ie.delete(s) : ie.add(s), un(), Ct === "fav" ? st() : gt(!0);
                }
            }
        }
    });
    k("railToggle").addEventListener("click", ()=>Ua.classList.toggle("is-open"));
    function Ed() {
        dt.hidden = !1, Td(), Vs(), $s();
    }
    function Xa() {
        dt.hidden = !0;
    }
    k("sourcesBtn").addEventListener("click", Ed);
    dt.querySelectorAll("[data-close]").forEach((r)=>r.addEventListener("click", Xa));
    dt.querySelectorAll(".tab").forEach((r)=>{
        r.addEventListener("click", ()=>{
            dt.querySelectorAll(".tab").forEach((e)=>e.classList.remove("is-active")), r.classList.add("is-active"), [
                "library",
                "playlists",
                "import"
            ].forEach((e)=>{
                k(`tab-${e}`).hidden = e !== r.dataset.tab;
            });
        });
    });
    async function Td() {
        const r = k("libM3u"), e = k("libEpg");
        try {
            const t = await Oe.sources();
            r.innerHTML = "", e.innerHTML = "";
            for (const s of t.sources || []){
                const i = document.createElement("li");
                i.className = "source-item";
                const n = document.createElement("div");
                n.className = "source-info";
                const a = document.createElement("div");
                a.className = "source-name", a.textContent = s.name;
                const o = document.createElement("div");
                o.className = "source-desc", o.textContent = s.description, n.append(a, o);
                const l = document.createElement("span");
                l.className = "region-chip", l.textContent = s.region;
                const c = document.createElement("button");
                c.className = "btn btn-outline btn-sm", c.textContent = "Load", c.addEventListener("click", ()=>Qa(s.url, c)), i.append(n, l, c), (s.source_type === "m3u" ? r : e).appendChild(i);
            }
        } catch  {
            r.innerHTML = '<li class="source-item"><span class="source-desc">Could not load the library.</span></li>';
        }
    }
    async function Qa(r, e) {
        e.disabled = !0, e.textContent = "Loading…";
        try {
            const t = await Oe.fetchSource(r);
            t.type === "playlist" ? (Ee(`Loaded ${String(t.name ?? "playlist")}: ${(t.total_channels || 0).toLocaleString()} channels. Rebuild the working set to include them.`, "ok", 5e3), Vs()) : (Ee(`EPG loaded: ${(t.programs_count || 0).toLocaleString()} programmes`, "ok"), ze && Hs(ze)), e.textContent = "Loaded";
        } catch (t) {
            Ee(`Fetch failed: ${t.message}`, "err", 5e3), e.textContent = "Load", e.disabled = !1;
        }
    }
    async function Vs() {
        const r = k("myPlaylists");
        try {
            const e = await Oe.playlists(), t = Object.values(e.playlists || {});
            if (r.innerHTML = "", !t.length) {
                r.innerHTML = '<li class="source-item"><span class="source-desc">No playlists on the server yet — grab one from the Library tab.</span></li>';
                return;
            }
            t.sort((s, i)=>s.name.localeCompare(i.name));
            for (const s of t){
                const i = document.createElement("li");
                i.className = "playlist-item";
                const n = document.createElement("span");
                n.className = "playlist-name", n.textContent = s.name;
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
                        await Oe.deletePlaylist(s.name), Ee(`Deleted ${s.name}`, "ok"), Vs();
                    } catch (c) {
                        Ee(`Delete failed: ${c.message}`, "err");
                    }
                }), o.append(l), i.append(n, a, o), r.appendChild(i);
            }
        } catch  {
            r.innerHTML = '<li class="source-item"><span class="source-desc">Could not load playlists.</span></li>';
        }
    }
    const Ir = document.getElementById("pipelineRunBtn");
    Ir && Ir.addEventListener("click", async ()=>{
        try {
            await Oe.pipelineRun(), Ee("Rebuilding the working set — streams are being re-tested", "info"), $s();
        } catch (r) {
            Ee(`Could not start rebuild: ${r.message}`, "err");
        }
    });
    async function Ja(r, e, t) {
        const s = r.files?.[0];
        if (!s) {
            Ee(`Choose a ${t} file first`, "err");
            return;
        }
        try {
            const i = await Oe.uploadFile(e, s);
            i.type === "playlist" ? (Ee(`Uploaded ${s.name}: ${(i.total_channels || 0).toLocaleString()} channels. Rebuild the working set to include them.`, "ok", 5e3), Vs()) : (Ee(`EPG uploaded: ${(i.programs_count || 0).toLocaleString()} programmes`, "ok"), ze && Hs(ze)), r.value = "";
        } catch (i) {
            Ee(`Upload failed: ${i.message}`, "err", 5e3);
        }
    }
    k("uploadM3u").addEventListener("click", ()=>Ja(k("m3uFile"), "/api/playlists/upload", "playlist"));
    k("uploadEpg").addEventListener("click", ()=>Ja(k("epgFile"), "/api/epg/upload", "EPG"));
    k("importUrlBtn").addEventListener("click", async ()=>{
        const r = k("importUrl"), e = r.value.trim();
        if (!e) {
            Ee("Enter a URL first", "err");
            return;
        }
        const t = k("importUrlBtn");
        await Qa(e, t), t.textContent = "Fetch", t.disabled = !1, r.value = "";
    });
    const xd = [
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
    ], gn = (r)=>Ke.find((e)=>Re(e) === r);
    function Sd(r) {
        const e = new Map, t = (n, a)=>{
            n && e.set(n, (e.get(n) || 0) + a);
        };
        for (const n of Ke)ie.has(Xe(n)) && t(n.group, 3);
        if (tt.slice(0, 10).forEach((n, a)=>{
            const o = gn(n);
            o && t(o.group, 2 - a * .1);
        }), e.size === 0) return [];
        const s = new Set(tt), i = [];
        for (const n of Ke){
            if (Qe(n) || ie.has(Xe(n)) || s.has(Re(n))) continue;
            const a = e.get(n.group || "") || 0;
            a > 0 && i.push([
                a,
                n
            ]);
        }
        return i.sort((n, a)=>a[0] - n[0]), i.slice(0, r).map((n)=>n[1]);
    }
    function Ot(r, e, t) {
        if (!t.length) return null;
        const s = document.createElement("div");
        s.className = "rail-block";
        const i = document.createElement("div");
        i.className = "rail-head";
        const n = document.createElement("span");
        if (n.className = "rail-title", n.textContent = r, i.appendChild(n), e) {
            const l = document.createElement("span");
            l.className = "rail-sub", l.textContent = e, i.appendChild(l);
        }
        const a = document.createElement("div");
        a.className = "rail-track";
        const o = document.createDocumentFragment();
        for (const l of t)o.appendChild(Ya(l));
        return a.appendChild(o), s.append(i, a), s;
    }
    function vd(r) {
        const e = r.filter((a)=>ie.has(Xe(a))), t = tt.map(gn).filter((a)=>!!a).filter((a)=>!Qe(a)), s = e[0] || t[0] || r[0];
        if (!s) {
            Gi.hidden = !0;
            return;
        }
        _t = s, Gi.hidden = !1;
        const i = k("heroLogo");
        s.logo ? (i.src = s.logo, i.style.display = "") : (i.removeAttribute("src"), i.style.display = "none"), k("heroName").textContent = s.name || "Featured channel", k("heroEyebrow").textContent = e[0] ? "From your favorites" : t[0] ? "Jump back in" : "Featured", k("heroProg").textContent = s.group || "", k("heroFav").textContent = ie.has(Xe(s)) ? "★ Favorited" : "☆ Favorite";
        const n = s.tvg_id || s.name;
        Oe.channelEpg(n, s.name || "").then((a)=>{
            if (_t !== s) return;
            const o = Date.now(), l = (a.programmes || []).find((c)=>Date.parse(c.start) <= o && o < Date.parse(c.stop));
            l && (k("heroProg").textContent = `Now: ${l.title}`);
        }).catch(()=>{});
    }
    function Ws() {
        const r = Ke.filter((n)=>!Qe(n));
        if (rd.hidden = r.length > 0, ft.innerHTML = "", !r.length) {
            Gi.hidden = !0;
            return;
        }
        vd(r);
        const e = 24, t = (n)=>{
            n && ft.appendChild(n);
        }, s = tt.map(gn).filter((n)=>!!n).filter((n)=>!Qe(n));
        t(Ot("Continue watching", null, s.slice(0, e)));
        const i = r.filter((n)=>ie.has(Xe(n)));
        t(Ot("Your favorites", null, i.slice(0, e))), t(Ot("Recommended for you", "Based on what you watch", Sd(e)));
        for (const n of xd){
            const a = r.filter((o)=>n.re.test(o.group || "") || n.re.test(o.name || ""));
            a.length >= 4 && t(Ot(n.title, `${a.length.toLocaleString()} channels`, a.slice(0, e)));
        }
        [
            ...at.entries()
        ].sort((n, a)=>a[1] - n[1]).slice(0, 14).forEach(([n])=>{
            const a = r.filter((o)=>(o.group || "Uncategorized") === n);
            t(Ot(n, `${a.length.toLocaleString()} channels`, a.slice(0, e)));
        });
    }
    let Vi = {
        r: 0,
        c: 0
    };
    function Ld(r, e) {
        const t = ft.querySelectorAll(".rail-track")[r];
        return t && t.querySelectorAll(".lib-card")[e] || null;
    }
    function Dr(r, e) {
        const t = ft.querySelectorAll(".rail-track");
        if (!t.length) return;
        r = Math.max(0, Math.min(t.length - 1, r));
        const s = t[r].querySelectorAll(".lib-card").length;
        if (!s) return;
        e = Math.max(0, Math.min(s - 1, e)), ft.querySelectorAll(".lib-card.is-focused").forEach((n)=>n.classList.remove("is-focused"));
        const i = Ld(r, e);
        i && (i.classList.add("is-focused"), Vi = {
            r,
            c: e
        }, i.scrollIntoView({
            block: "nearest",
            inline: "center",
            behavior: "smooth"
        }));
    }
    function Ad(r) {
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
        if (r.key in e) {
            if (r.preventDefault(), !ft.querySelector(".lib-card.is-focused")) {
                Dr(0, 0);
                return;
            }
            const [s, i] = e[r.key];
            Dr(Vi.r + s, Vi.c + i);
        } else if (r.key === "Enter") {
            const t = ft.querySelector(".lib-card.is-focused");
            t && (r.preventDefault(), t.click());
        }
    }
    k("heroPlay").addEventListener("click", ()=>{
        _t && jt(_t);
    });
    k("heroFav").addEventListener("click", ()=>{
        if (!_t) return;
        const r = Xe(_t);
        ie.has(r) ? ie.delete(r) : ie.add(r), un(), k("heroFav").textContent = ie.has(r) ? "★ Favorited" : "☆ Favorite", Ws();
    });
    Ks("idle");
    [
        "home",
        "console",
        "library"
    ].includes(Te) || (Te = "home");
    wt(Te);
    Ki();
    $s();
})();
