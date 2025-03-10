!function (e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
            t.Hls = e()
    }
}(function () {
    var e;
    return function e(t, r, i) {
        function a(s, o) {
            if (!r[s]) {
                if (!t[s]) {
                    var l = "function" == typeof require && require;
                    if (!o && l)
                        return l(s, !0);
                    if (n)
                        return n(s, !0);
                    var u = new Error("Cannot find module '" + s + "'");
                    throw u.code = "MODULE_NOT_FOUND",
                    u
                }
                var d = r[s] = {
                    exports: {}
                };
                t[s][0].call(d.exports, function (e) {
                    var r = t[s][1][e];
                    return a(r ? r : e)
                }, d, d.exports, e, t, r, i)
            }
            return r[s].exports
        }
        for (var n = "function" == typeof require && require, s = 0; s < i.length; s++)
            a(i[s]);
        return a
    }({
        1: [function (e, t, r) {
            function i() {
                this._events = this._events || {},
                    this._maxListeners = this._maxListeners || void 0
            }
            function a(e) {
                return "function" == typeof e
            }
            function n(e) {
                return "number" == typeof e
            }
            function s(e) {
                return "object" == typeof e && null !== e
            }
            function o(e) {
                return void 0 === e
            }
            t.exports = i,
                i.EventEmitter = i,
                i.prototype._events = void 0,
                i.prototype._maxListeners = void 0,
                i.defaultMaxListeners = 10,
                i.prototype.setMaxListeners = function (e) {
                    if (!n(e) || e < 0 || isNaN(e))
                        throw TypeError("n must be a positive number");
                    return this._maxListeners = e,
                        this
                }
                ,
                i.prototype.emit = function (e) {
                    var t, r, i, n, l, u;
                    if (this._events || (this._events = {}),
                        "error" === e && (!this._events.error || s(this._events.error) && !this._events.error.length)) {
                        if ((t = arguments[1]) instanceof Error)
                            throw t;
                        var d = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                        throw d.context = t,
                        d
                    }
                    if (r = this._events[e],
                        o(r))
                        return !1;
                    if (a(r))
                        switch (arguments.length) {
                            case 1:
                                r.call(this);
                                break;
                            case 2:
                                r.call(this, arguments[1]);
                                break;
                            case 3:
                                r.call(this, arguments[1], arguments[2]);
                                break;
                            default:
                                n = Array.prototype.slice.call(arguments, 1),
                                    r.apply(this, n)
                        }
                    else if (s(r))
                        for (n = Array.prototype.slice.call(arguments, 1),
                            u = r.slice(),
                            i = u.length,
                            l = 0; l < i; l++)
                            u[l].apply(this, n);
                    return !0
                }
                ,
                i.prototype.addListener = function (e, t) {
                    var r;
                    if (!a(t))
                        throw TypeError("listener must be a function");
                    return this._events || (this._events = {}),
                        this._events.newListener && this.emit("newListener", e, a(t.listener) ? t.listener : t),
                        this._events[e] ? s(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t,
                        s(this._events[e]) && !this._events[e].warned && (r = o(this._maxListeners) ? i.defaultMaxListeners : this._maxListeners) && r > 0 && this._events[e].length > r && (this._events[e].warned = !0,
                            console.trace),
                        this
                }
                ,
                i.prototype.on = i.prototype.addListener,
                i.prototype.once = function (e, t) {
                    function r() {
                        this.removeListener(e, r),
                            i || (i = !0,
                                t.apply(this, arguments))
                    }
                    if (!a(t))
                        throw TypeError("listener must be a function");
                    var i = !1;
                    return r.listener = t,
                        this.on(e, r),
                        this
                }
                ,
                i.prototype.removeListener = function (e, t) {
                    var r, i, n, o;
                    if (!a(t))
                        throw TypeError("listener must be a function");
                    if (!this._events || !this._events[e])
                        return this;
                    if (r = this._events[e],
                        n = r.length,
                        i = -1,
                        r === t || a(r.listener) && r.listener === t)
                        delete this._events[e],
                            this._events.removeListener && this.emit("removeListener", e, t);
                    else if (s(r)) {
                        for (o = n; o-- > 0;)
                            if (r[o] === t || r[o].listener && r[o].listener === t) {
                                i = o;
                                break
                            }
                        if (i < 0)
                            return this;
                        1 === r.length ? (r.length = 0,
                            delete this._events[e]) : r.splice(i, 1),
                            this._events.removeListener && this.emit("removeListener", e, t)
                    }
                    return this
                }
                ,
                i.prototype.removeAllListeners = function (e) {
                    var t, r;
                    if (!this._events)
                        return this;
                    if (!this._events.removeListener)
                        return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e],
                            this;
                    if (0 === arguments.length) {
                        for (t in this._events)
                            "removeListener" !== t && this.removeAllListeners(t);
                        return this.removeAllListeners("removeListener"),
                            this._events = {},
                            this
                    }
                    if (r = this._events[e],
                        a(r))
                        this.removeListener(e, r);
                    else if (r)
                        for (; r.length;)
                            this.removeListener(e, r[r.length - 1]);
                    return delete this._events[e],
                        this
                }
                ,
                i.prototype.listeners = function (e) {
                    return this._events && this._events[e] ? a(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
                }
                ,
                i.prototype.listenerCount = function (e) {
                    if (this._events) {
                        var t = this._events[e];
                        if (a(t))
                            return 1;
                        if (t)
                            return t.length
                    }
                    return 0
                }
                ,
                i.listenerCount = function (e, t) {
                    return e.listenerCount(t)
                }
        }
            , {}],
        2: [function (t, r, i) {
            !function (t) {
                var a = /^((?:[^\/;?#]+:)?)(\/\/[^\/\;?#]*)?(.*?)??(;.*?)?(\?.*?)?(#.*?)?$/
                    , n = /^([^\/;?#]*)(.*)$/
                    , s = {
                        buildAbsoluteURL: function (e, t, r) {
                            if (r = r || {},
                                e = e.trim(),
                                !(t = t.trim())) {
                                if (!r.alwaysNormalize)
                                    return e;
                                var i = this.parseURL(e);
                                if (!o)
                                    throw new Error("Error trying to parse base URL.");
                                return i.path = s.normalizePath(i.path),
                                    s.buildURLFromParts(i)
                            }
                            var a = this.parseURL(t);
                            if (!a)
                                throw new Error("Error trying to parse relative URL.");
                            if (a.scheme)
                                return r.alwaysNormalize ? (a.path = s.normalizePath(a.path),
                                    s.buildURLFromParts(a)) : t;
                            var o = this.parseURL(e);
                            if (!o)
                                throw new Error("Error trying to parse base URL.");
                            if (!o.netLoc && o.path && "/" !== o.path[0]) {
                                var l = n.exec(o.path);
                                o.netLoc = l[1],
                                    o.path = l[2]
                            }
                            o.netLoc && !o.path && (o.path = "/");
                            var u = {
                                scheme: o.scheme,
                                netLoc: a.netLoc,
                                path: null,
                                params: a.params,
                                query: a.query,
                                fragment: a.fragment
                            };
                            if (!a.netLoc && (u.netLoc = o.netLoc,
                                "/" !== a.path[0]))
                                if (a.path) {
                                    var d = o.path
                                        , f = d.substring(0, d.lastIndexOf("/") + 1) + a.path;
                                    u.path = s.normalizePath(f)
                                } else
                                    u.path = o.path,
                                        a.params || (u.params = o.params,
                                            a.query || (u.query = o.query));
                            return null === u.path && (u.path = r.alwaysNormalize ? s.normalizePath(a.path) : a.path),
                                s.buildURLFromParts(u)
                        },
                        parseURL: function (e) {
                            var t = a.exec(e);
                            return t ? {
                                scheme: t[1] || "",
                                netLoc: t[2] || "",
                                path: t[3] || "",
                                params: t[4] || "",
                                query: t[5] || "",
                                fragment: t[6] || ""
                            } : null
                        },
                        normalizePath: function (e) {
                            for (e = e.split("").reverse().join("").replace(/(?:\/|^)\.(?=\/)/g, ""); e.length !== (e = e.replace(/(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g, "")).length;)
                                ;
                            return e.split("").reverse().join("")
                        },
                        buildURLFromParts: function (e) {
                            return e.scheme + e.netLoc + e.path + e.params + e.query + e.fragment
                        }
                    };
                "object" == typeof i && "object" == typeof r ? r.exports = s : "function" == typeof e && e.amd ? e([], function () {
                    return s
                }) : "object" == typeof i ? i.URLToolkit = s : t.URLToolkit = s
            }(this)
        }
            , {}],
        3: [function (e, t, r) {
            var i = arguments[3]
                , a = arguments[4]
                , n = arguments[5]
                , s = JSON.stringify;
            t.exports = function (e, t) {
                function r(e) {
                    p[e] = !0;
                    for (var t in a[e][1]) {
                        var i = a[e][1][t];
                        p[i] || r(i)
                    }
                }
                for (var o, l = Object.keys(n), u = 0, d = l.length; u < d; u++) {
                    var f = l[u]
                        , c = n[f].exports;
                    if (c === e || c && c.default === e) {
                        o = f;
                        break
                    }
                }
                if (!o) {
                    o = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
                    for (var h = {}, u = 0, d = l.length; u < d; u++) {
                        var f = l[u];
                        h[f] = f
                    }
                    a[o] = [Function(["require", "module", "exports"], "(" + e + ")(self)"), h]
                }
                var g = Math.floor(Math.pow(16, 8) * Math.random()).toString(16)
                    , v = {};
                v[o] = o,
                    a[g] = [Function(["require"], "var f = require(" + s(o) + ");(f.default ? f.default : f)(self);"), v];
                var p = {};
                r(g);
                var y = "(" + i + ")({" + Object.keys(p).map(function (e) {
                    return s(e) + ":[" + a[e][0] + "," + s(a[e][1]) + "]"
                }).join(",") + "},{},[" + s(g) + "])"
                    , m = window.URL || window.webkitURL || window.mozURL || window.msURL
                    , E = new Blob([y], {
                        type: "text/javascript"
                    });
                if (t && t.bare)
                    return E;
                var b = m.createObjectURL(E)
                    , T = new Worker(b);
                return T.objectURL = b,
                    T
            }
        }
            , {}],
        4: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
                r.hlsDefaultConfig = void 0;
            var a = e(5)
                , n = i(a)
                , s = e(8)
                , o = i(s)
                , l = e(9)
                , u = i(l)
                , d = e(10)
                , f = i(d)
                , c = e(56)
                , h = i(c)
                , g = e(7)
                , v = i(g)
                , p = e(6)
                , y = i(p)
                , m = e(48)
                , E = i(m)
                , b = e(16)
                , T = i(b)
                , _ = e(15)
                , k = i(_)
                , R = e(14)
                , A = i(R);
            r.hlsDefaultConfig = {
                autoStartLoad: !0,
                startPosition: -1,
                defaultAudioCodec: void 0,
                debug: !1,
                capLevelOnFPSDrop: !1,
                capLevelToPlayerSize: !1,
                initialLiveManifestSize: 1,
                maxBufferLength: 30,
                maxBufferSize: 6e7,
                maxBufferHole: .5,
                maxSeekHole: 2,
                lowBufferWatchdogPeriod: .5,
                highBufferWatchdogPeriod: 3,
                nudgeOffset: .1,
                nudgeMaxRetry: 3,
                maxFragLookUpTolerance: .2,
                liveSyncDurationCount: 3,
                liveMaxLatencyDurationCount: 1 / 0,
                liveSyncDuration: void 0,
                liveMaxLatencyDuration: void 0,
                maxMaxBufferLength: 600,
                enableWorker: !0,
                enableSoftwareAES: !0,
                manifestLoadingTimeOut: 1e4,
                manifestLoadingMaxRetry: 1,
                manifestLoadingRetryDelay: 1e3,
                manifestLoadingMaxRetryTimeout: 64e3,
                startLevel: void 0,
                levelLoadingTimeOut: 1e4,
                levelLoadingMaxRetry: 4,
                levelLoadingRetryDelay: 1e3,
                levelLoadingMaxRetryTimeout: 64e3,
                fragLoadingTimeOut: 2e4,
                fragLoadingMaxRetry: 6,
                fragLoadingRetryDelay: 1e3,
                fragLoadingMaxRetryTimeout: 64e3,
                fragLoadingLoopThreshold: 3,
                startFragPrefetch: !1,
                fpsDroppedMonitoringPeriod: 5e3,
                fpsDroppedMonitoringThreshold: .2,
                appendErrorMaxRetry: 3,
                loader: h.default,
                fLoader: void 0,
                pLoader: void 0,
                xhrSetup: void 0,
                fetchSetup: void 0,
                abrController: n.default,
                bufferController: o.default,
                capLevelController: u.default,
                fpsController: f.default,
                audioStreamController: y.default,
                audioTrackController: v.default,
                subtitleStreamController: A.default,
                subtitleTrackController: k.default,
                timelineController: T.default,
                cueHandler: E.default,
                enableCEA708Captions: !0,
                enableWebVTT: !0,
                captionsTextTrack1Label: "English",
                captionsTextTrack1LanguageCode: "en",
                captionsTextTrack2Label: "Spanish",
                captionsTextTrack2LanguageCode: "es",
                stretchShortVideoTrack: !1,
                forceKeyFrameOnDiscontinuity: !0,
                abrEwmaFastLive: 3,
                abrEwmaSlowLive: 9,
                abrEwmaFastVoD: 3,
                abrEwmaSlowVoD: 9,
                abrEwmaDefaultEstimate: 5e5,
                abrBandWidthFactor: .95,
                abrBandWidthUpFactor: .7,
                abrMaxWithRealBitrate: !1,
                maxStarvationDelay: 4,
                maxLoadingDelay: 4,
                minAutoBitrate: 0
            }
        }
            , {
            10: 10,
            14: 14,
            15: 15,
            16: 16,
            48: 48,
            5: 5,
            56: 56,
            6: 6,
            7: 7,
            8: 8,
            9: 9
        }],
        5: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , l = e(33)
                , u = i(l)
                , d = e(32)
                , f = i(d)
                , c = e(35)
                , h = i(c)
                , g = e(31)
                , v = e(51)
                , p = e(49)
                , y = i(p)
                , m = function (e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.FRAG_LOADING, u.default.FRAG_LOADED, u.default.FRAG_BUFFERED, u.default.ERROR));
                        return r.lastLoadedFragLevel = 0,
                            r._nextAutoLevel = -1,
                            r.hls = e,
                            r.onCheck = r._abandonRulesCheck.bind(r),
                            r
                    }
                    return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function () {
                                this.clearTimer(),
                                    f.default.prototype.destroy.call(this)
                            }
                        }, {
                            key: "onFragLoading",
                            value: function (e) {
                                var t = e.frag;
                                if ("main" === t.type) {
                                    if (this.timer || (this.timer = setInterval(this.onCheck, 100)),
                                        !this._bwEstimator) {
                                        var r = this.hls
                                            , i = e.frag.level
                                            , a = r.levels[i].details.live
                                            , n = r.config
                                            , s = void 0
                                            , o = void 0;
                                        a ? (s = n.abrEwmaFastLive,
                                            o = n.abrEwmaSlowLive) : (s = n.abrEwmaFastVoD,
                                                o = n.abrEwmaSlowVoD),
                                            this._bwEstimator = new y.default(r, o, s, n.abrEwmaDefaultEstimate)
                                    }
                                    this.fragCurrent = t
                                }
                            }
                        }, {
                            key: "_abandonRulesCheck",
                            value: function () {
                                var e = this.hls
                                    , t = e.media
                                    , r = this.fragCurrent
                                    , i = r.loader
                                    , a = e.minAutoLevel;
                                if (!i || i.stats && i.stats.aborted)
                                    return v.logger.warn("frag loader destroy or aborted, disarm abandonRules"),
                                        void this.clearTimer();
                                var n = i.stats;
                                if (t && (!t.paused && 0 !== t.playbackRate || !t.readyState) && r.autoLevel && r.level) {
                                    var s = performance.now() - n.trequest
                                        , o = Math.abs(t.playbackRate);
                                    if (s > 500 * r.duration / o) {
                                        var l = e.levels
                                            , d = Math.max(1, n.bw ? n.bw / 8 : 1e3 * n.loaded / s)
                                            , f = l[r.level]
                                            , c = f.realBitrate ? Math.max(f.realBitrate, f.bitrate) : f.bitrate
                                            , g = n.total ? n.total : Math.max(n.loaded, Math.round(r.duration * c / 8))
                                            , p = t.currentTime
                                            , y = (g - n.loaded) / d
                                            , m = (h.default.bufferInfo(t, p, e.config.maxBufferHole).end - p) / o;
                                        if (m < 2 * r.duration / o && y > m) {
                                            var E = void 0
                                                , b = void 0;
                                            for (b = r.level - 1; b > a; b--) {
                                                var T = l[b].realBitrate ? Math.max(l[b].realBitrate, l[b].bitrate) : l[b].bitrate;
                                                if ((E = r.duration * T / (6.4 * d)) < m)
                                                    break
                                            }
                                            E < y && (v.logger.warn("loading too slow, abort fragment loading and switch to level " + b + ":fragLoadedDelay[" + b + "]<fragLoadedDelay[" + (r.level - 1) + "];bufferStarvationDelay:" + E.toFixed(1) + "<" + y.toFixed(1) + ":" + m.toFixed(1)),
                                                e.nextLoadLevel = b,
                                                this._bwEstimator.sample(s, n.loaded),
                                                i.abort(),
                                                this.clearTimer(),
                                                e.trigger(u.default.FRAG_LOAD_EMERGENCY_ABORTED, {
                                                    frag: r,
                                                    stats: n
                                                }))
                                        }
                                    }
                                }
                            }
                        }, {
                            key: "onFragLoaded",
                            value: function (e) {
                                var t = e.frag;
                                if ("main" === t.type && !isNaN(t.sn)) {
                                    if (this.clearTimer(),
                                        this.lastLoadedFragLevel = t.level,
                                        this._nextAutoLevel = -1,
                                        this.hls.config.abrMaxWithRealBitrate) {
                                        var r = this.hls.levels[t.level]
                                            , i = (r.loaded ? r.loaded.bytes : 0) + e.stats.loaded
                                            , a = (r.loaded ? r.loaded.duration : 0) + e.frag.duration;
                                        r.loaded = {
                                            bytes: i,
                                            duration: a
                                        },
                                            r.realBitrate = Math.round(8 * i / a)
                                    }
                                    if (e.frag.bitrateTest) {
                                        var n = e.stats;
                                        n.tparsed = n.tbuffered = n.tload,
                                            this.onFragBuffered(e)
                                    }
                                }
                            }
                        }, {
                            key: "onFragBuffered",
                            value: function (e) {
                                var t = e.stats
                                    , r = e.frag;
                                if (!(t.aborted === !0 || 1 !== r.loadCounter || "main" !== r.type || isNaN(r.sn) || r.bitrateTest && t.tload !== t.tbuffered)) {
                                    var i = t.tparsed - t.trequest;
                                    v.logger.log("latency/loading/parsing/append/kbps:" + Math.round(t.tfirst - t.trequest) + "/" + Math.round(t.tload - t.tfirst) + "/" + Math.round(t.tparsed - t.tload) + "/" + Math.round(t.tbuffered - t.tparsed) + "/" + Math.round(8 * t.loaded / (t.tbuffered - t.trequest))),
                                        this._bwEstimator.sample(i, t.loaded),
                                        t.bwEstimate = this._bwEstimator.getEstimate(),
                                        r.bitrateTest ? this.bitrateTestDelay = i / 1e3 : this.bitrateTestDelay = 0
                                }
                            }
                        }, {
                            key: "onError",
                            value: function (e) {
                                switch (e.details) {
                                    case g.ErrorDetails.FRAG_LOAD_ERROR:
                                    case g.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                        this.clearTimer()
                                }
                            }
                        }, {
                            key: "clearTimer",
                            value: function () {
                                this.timer && (clearInterval(this.timer),
                                    this.timer = null)
                            }
                        }, {
                            key: "_findBestLevel",
                            value: function (e, t, r, i, a, n, s, o, l) {
                                for (var u = a; u >= i; u--) {
                                    var d = l[u]
                                        , f = d.details
                                        , c = f ? f.totalduration / f.fragments.length : t
                                        , h = !!f && f.live
                                        , g = void 0;
                                    g = u <= e ? s * r : o * r;
                                    var p = l[u].realBitrate ? Math.max(l[u].realBitrate, l[u].bitrate) : l[u].bitrate
                                        , y = p * c / g;
                                    if (v.logger.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + u + "/" + Math.round(g) + "/" + p + "/" + c + "/" + n + "/" + y),
                                        g > p && (!y || h || y < n))
                                        return u
                                }
                                return -1
                            }
                        }, {
                            key: "nextAutoLevel",
                            get: function () {
                                var e = this._nextAutoLevel
                                    , t = this._bwEstimator;
                                if (!(e === -1 || t && t.canEstimate()))
                                    return e;
                                var r = this._nextABRAutoLevel;
                                return e !== -1 && (r = Math.min(e, r)),
                                    r
                            },
                            set: function (e) {
                                this._nextAutoLevel = e
                            }
                        }, {
                            key: "_nextABRAutoLevel",
                            get: function () {
                                var e = this.hls
                                    , t = e.maxAutoLevel
                                    , r = e.levels
                                    , i = e.config
                                    , a = e.minAutoLevel
                                    , n = e.media
                                    , s = this.lastLoadedFragLevel
                                    , o = this.fragCurrent ? this.fragCurrent.duration : 0
                                    , l = n ? n.currentTime : 0
                                    , u = n && 0 !== n.playbackRate ? Math.abs(n.playbackRate) : 1
                                    , d = this._bwEstimator ? this._bwEstimator.getEstimate() : i.abrEwmaDefaultEstimate
                                    , f = (h.default.bufferInfo(n, l, i.maxBufferHole).end - l) / u
                                    , c = this._findBestLevel(s, o, d, a, t, f, i.abrBandWidthFactor, i.abrBandWidthUpFactor, r);
                                if (c >= 0)
                                    return c;
                                v.logger.trace("rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering");
                                var g = o ? Math.min(o, i.maxStarvationDelay) : i.maxStarvationDelay
                                    , p = i.abrBandWidthFactor
                                    , y = i.abrBandWidthUpFactor;
                                if (0 === f) {
                                    var m = this.bitrateTestDelay;
                                    if (m) {
                                        g = (o ? Math.min(o, i.maxLoadingDelay) : i.maxLoadingDelay) - m,
                                            v.logger.trace("bitrate test took " + Math.round(1e3 * m) + "ms, set first fragment max fetchDuration to " + Math.round(1e3 * g) + " ms"),
                                            p = y = 1
                                    }
                                }
                                return c = this._findBestLevel(s, o, d, a, t, f + g, p, y, r),
                                    Math.max(c, 0)
                            }
                        }]),
                        t
                }(f.default);
            r.default = m
        }
            , {
            31: 31,
            32: 32,
            33: 33,
            35: 35,
            49: 49,
            51: 51
        }],
        6: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , l = e(46)
                , u = i(l)
                , d = e(35)
                , f = i(d)
                , c = e(25)
                , h = i(c)
                , g = e(33)
                , v = i(g)
                , p = e(32)
                , y = i(p)
                , m = e(36)
                , E = i(m)
                , b = e(52)
                , T = i(b)
                , _ = e(31)
                , k = e(51)
                , R = {
                    STOPPED: "STOPPED",
                    STARTING: "STARTING",
                    IDLE: "IDLE",
                    PAUSED: "PAUSED",
                    KEY_LOADING: "KEY_LOADING",
                    FRAG_LOADING: "FRAG_LOADING",
                    FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
                    WAITING_TRACK: "WAITING_TRACK",
                    PARSING: "PARSING",
                    PARSED: "PARSED",
                    BUFFER_FLUSHING: "BUFFER_FLUSHING",
                    ENDED: "ENDED",
                    ERROR: "ERROR",
                    WAITING_INIT_PTS: "WAITING_INIT_PTS"
                }
                , A = function (e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, v.default.MEDIA_ATTACHED, v.default.MEDIA_DETACHING, v.default.AUDIO_TRACKS_UPDATED, v.default.AUDIO_TRACK_SWITCHING, v.default.AUDIO_TRACK_LOADED, v.default.KEY_LOADED, v.default.FRAG_LOADED, v.default.FRAG_PARSING_INIT_SEGMENT, v.default.FRAG_PARSING_DATA, v.default.FRAG_PARSED, v.default.ERROR, v.default.BUFFER_CREATED, v.default.BUFFER_APPENDED, v.default.BUFFER_FLUSHED, v.default.INIT_PTS_FOUND));
                        return r.config = e.config,
                            r.audioCodecSwap = !1,
                            r.ticks = 0,
                            r._state = R.STOPPED,
                            r.ontick = r.tick.bind(r),
                            r.initPTS = [],
                            r.waitingFragment = null,
                            r
                    }
                    return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function () {
                                this.stopLoad(),
                                    this.timer && (clearInterval(this.timer),
                                        this.timer = null),
                                    y.default.prototype.destroy.call(this),
                                    this.state = R.STOPPED
                            }
                        }, {
                            key: "onInitPtsFound",
                            value: function (e) {
                                var t = e.id
                                    , r = e.frag.cc
                                    , i = e.initPTS;
                                "main" === t && (this.initPTS[r] = i,
                                    k.logger.log("InitPTS for cc:" + r + " found from video track:" + i),
                                    this.state === R.WAITING_INIT_PTS && (k.logger.log("sending pending audio frag to demuxer"),
                                        this.state = R.FRAG_LOADING,
                                        this.onFragLoaded(this.waitingFragment),
                                        this.waitingFragment = null))
                            }
                        }, {
                            key: "startLoad",
                            value: function (e) {
                                if (this.tracks) {
                                    var t = this.lastCurrentTime;
                                    this.stopLoad(),
                                        this.timer || (this.timer = setInterval(this.ontick, 100)),
                                        this.fragLoadError = 0,
                                        t > 0 && e === -1 ? (k.logger.log("audio:override startPosition with lastCurrentTime @" + t.toFixed(3)),
                                            this.state = R.IDLE) : (this.lastCurrentTime = this.startPosition ? this.startPosition : e,
                                                this.state = R.STARTING),
                                        this.nextLoadPosition = this.startPosition = this.lastCurrentTime,
                                        this.tick()
                                } else
                                    this.startPosition = e,
                                        this.state = R.STOPPED
                            }
                        }, {
                            key: "stopLoad",
                            value: function () {
                                var e = this.fragCurrent;
                                e && (e.loader && e.loader.abort(),
                                    this.fragCurrent = null),
                                    this.fragPrevious = null,
                                    this.demuxer && (this.demuxer.destroy(),
                                        this.demuxer = null),
                                    this.state = R.STOPPED
                            }
                        }, {
                            key: "tick",
                            value: function () {
                                1 === ++this.ticks && (this.doTick(),
                                    this.ticks > 1 && setTimeout(this.tick, 1),
                                    this.ticks = 0)
                            }
                        }, {
                            key: "doTick",
                            value: function () {
                                var e, t, r, i = this.hls, a = i.config;
                                switch (this.state) {
                                    case R.ERROR:
                                    case R.PAUSED:
                                    case R.BUFFER_FLUSHING:
                                        break;
                                    case R.STARTING:
                                        this.state = R.WAITING_TRACK,
                                            this.loadedmetadata = !1;
                                        break;
                                    case R.IDLE:
                                        var n = this.tracks;
                                        if (!n)
                                            break;
                                        if (!this.media && (this.startFragRequested || !a.startFragPrefetch))
                                            break;
                                        e = this.loadedmetadata ? this.media.currentTime : this.nextLoadPosition;
                                        var s = this.mediaBuffer ? this.mediaBuffer : this.media
                                            , o = f.default.bufferInfo(s, e, a.maxBufferHole)
                                            , l = o.len
                                            , d = o.end
                                            , c = this.fragPrevious
                                            , h = a.maxMaxBufferLength
                                            , g = this.audioSwitch
                                            , p = this.trackId;
                                        if ((l < h || g) && p < n.length) {
                                            if (void 0 === (r = n[p].details)) {
                                                this.state = R.WAITING_TRACK;
                                                break
                                            }
                                            if (!g && !r.live && c && c.sn === r.endSN && (!this.media.seeking || this.media.duration - d < c.duration / 2)) {
                                                this.hls.trigger(v.default.BUFFER_EOS, {
                                                    type: "audio"
                                                }),
                                                    this.state = R.ENDED;
                                                break
                                            }
                                            var y = r.fragments
                                                , m = y.length
                                                , E = y[0].start
                                                , b = y[m - 1].start + y[m - 1].duration
                                                , T = void 0;
                                            if (g)
                                                if (r.live && !r.PTSKnown)
                                                    k.logger.log("switching audiotrack, live stream, unknown PTS,load first fragment"),
                                                        d = 0;
                                                else if (d = e,
                                                    r.PTSKnown && e < E) {
                                                    if (!(o.end > E || o.nextStart))
                                                        return;
                                                    k.logger.log("alt audio track ahead of main track, seek to start of alt audio track"),
                                                        this.media.currentTime = E + .05
                                                }
                                            if (r.initSegment && !r.initSegment.data)
                                                T = r.initSegment;
                                            else if (d <= E) {
                                                if (T = y[0],
                                                    r.live && T.loadIdx && T.loadIdx === this.fragLoadIdx) {
                                                    var A = o.nextStart ? o.nextStart : E;
                                                    return k.logger.log("no alt audio available @currentTime:" + this.media.currentTime + ", seeking @" + (A + .05)),
                                                        void (this.media.currentTime = A + .05)
                                                }
                                            } else {
                                                var S = void 0
                                                    , L = a.maxFragLookUpTolerance
                                                    , w = c ? y[c.sn - y[0].sn + 1] : void 0
                                                    , D = function (e) {
                                                        var t = Math.min(L, e.duration);
                                                        return e.start + e.duration - t <= d ? 1 : e.start - t > d && e.start ? -1 : 0
                                                    };
                                                d < b ? (d > b - L && (L = 0),
                                                    S = w && !D(w) ? w : u.default.search(y, D)) : S = y[m - 1],
                                                    S && (T = S,
                                                        E = S.start,
                                                        c && T.level === c.level && T.sn === c.sn && (T.sn < r.endSN ? (T = y[T.sn + 1 - r.startSN],
                                                            k.logger.log("SN just loaded, load next one: " + T.sn)) : T = null))
                                            }
                                            if (T)
                                                if (T.decryptdata && null != T.decryptdata.uri && null == T.decryptdata.key)
                                                    k.logger.log("Loading key for " + T.sn + " of [" + r.startSN + " ," + r.endSN + "],track " + p),
                                                        this.state = R.KEY_LOADING,
                                                        i.trigger(v.default.KEY_LOADING, {
                                                            frag: T
                                                        });
                                                else {
                                                    if (k.logger.log("Loading " + T.sn + " of [" + r.startSN + " ," + r.endSN + "],track " + p + ", currentTime:" + e + ",bufferEnd:" + d.toFixed(3)),
                                                        void 0 !== this.fragLoadIdx ? this.fragLoadIdx++ : this.fragLoadIdx = 0,
                                                        T.loadCounter) {
                                                        T.loadCounter++;
                                                        var O = a.fragLoadingLoopThreshold;
                                                        if (T.loadCounter > O && Math.abs(this.fragLoadIdx - T.loadIdx) < O)
                                                            return void i.trigger(v.default.ERROR, {
                                                                type: _.ErrorTypes.MEDIA_ERROR,
                                                                details: _.ErrorDetails.FRAG_LOOP_LOADING_ERROR,
                                                                fatal: !1,
                                                                frag: T
                                                            })
                                                    } else
                                                        T.loadCounter = 1;
                                                    T.loadIdx = this.fragLoadIdx,
                                                        this.fragCurrent = T,
                                                        this.startFragRequested = !0,
                                                        isNaN(T.sn) || (this.nextLoadPosition = T.start + T.duration),
                                                        i.trigger(v.default.FRAG_LOADING, {
                                                            frag: T
                                                        }),
                                                        this.state = R.FRAG_LOADING
                                                }
                                        }
                                        break;
                                    case R.WAITING_TRACK:
                                        t = this.tracks[this.trackId],
                                            t && t.details && (this.state = R.IDLE);
                                        break;
                                    case R.FRAG_LOADING_WAITING_RETRY:
                                        var I = performance.now()
                                            , P = this.retryDate;
                                        s = this.media;
                                        var C = s && s.seeking;
                                        (!P || I >= P || C) && (k.logger.log("audioStreamController: retryDate reached, switch back to IDLE state"),
                                            this.state = R.IDLE);
                                        break;
                                    case R.WAITING_INIT_PTS:
                                    case R.STOPPED:
                                    case R.FRAG_LOADING:
                                    case R.PARSING:
                                    case R.PARSED:
                                    case R.ENDED:
                                }
                            }
                        }, {
                            key: "onMediaAttached",
                            value: function (e) {
                                var t = this.media = this.mediaBuffer = e.media;
                                this.onvseeking = this.onMediaSeeking.bind(this),
                                    this.onvended = this.onMediaEnded.bind(this),
                                    t.addEventListener("seeking", this.onvseeking),
                                    t.addEventListener("ended", this.onvended);
                                var r = this.config;
                                this.tracks && r.autoStartLoad && this.startLoad(r.startPosition)
                            }
                        }, {
                            key: "onMediaDetaching",
                            value: function () {
                                var e = this.media;
                                e && e.ended && (k.logger.log("MSE detaching and video ended, reset startPosition"),
                                    this.startPosition = this.lastCurrentTime = 0);
                                var t = this.tracks;
                                t && t.forEach(function (e) {
                                    e.details && e.details.fragments.forEach(function (e) {
                                        e.loadCounter = void 0
                                    })
                                }),
                                    e && (e.removeEventListener("seeking", this.onvseeking),
                                        e.removeEventListener("ended", this.onvended),
                                        this.onvseeking = this.onvseeked = this.onvended = null),
                                    this.media = this.mediaBuffer = null,
                                    this.loadedmetadata = !1,
                                    this.stopLoad()
                            }
                        }, {
                            key: "onMediaSeeking",
                            value: function () {
                                this.state === R.ENDED && (this.state = R.IDLE),
                                    this.media && (this.lastCurrentTime = this.media.currentTime),
                                    void 0 !== this.fragLoadIdx && (this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold),
                                    this.tick()
                            }
                        }, {
                            key: "onMediaEnded",
                            value: function () {
                                this.startPosition = this.lastCurrentTime = 0
                            }
                        }, {
                            key: "onAudioTracksUpdated",
                            value: function (e) {
                                k.logger.log("audio tracks updated"),
                                    this.tracks = e.audioTracks
                            }
                        }, {
                            key: "onAudioTrackSwitching",
                            value: function (e) {
                                var t = !!e.url;
                                this.trackId = e.id,
                                    this.state = R.IDLE,
                                    this.fragCurrent = null,
                                    this.state = R.PAUSED,
                                    this.waitingFragment = null,
                                    t ? this.timer || (this.timer = setInterval(this.ontick, 100)) : this.demuxer && (this.demuxer.destroy(),
                                        this.demuxer = null),
                                    t && (this.audioSwitch = !0,
                                        this.state = R.IDLE,
                                        void 0 !== this.fragLoadIdx && (this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold)),
                                    this.tick()
                            }
                        }, {
                            key: "onAudioTrackLoaded",
                            value: function (e) {
                                var t = e.details
                                    , r = e.id
                                    , i = this.tracks[r]
                                    , a = t.totalduration
                                    , n = 0;
                                if (k.logger.log("track " + r + " loaded [" + t.startSN + "," + t.endSN + "],duration:" + a),
                                    t.live) {
                                    var s = i.details;
                                    s && t.fragments.length > 0 ? (E.default.mergeDetails(s, t),
                                        n = t.fragments[0].start,
                                        t.PTSKnown ? k.logger.log("live audio playlist sliding:" + n.toFixed(3)) : k.logger.log("live audio playlist - outdated PTS, unknown sliding")) : (t.PTSKnown = !1,
                                            k.logger.log("live audio playlist - first load, unknown sliding"))
                                } else
                                    t.PTSKnown = !1;
                                if (i.details = t,
                                    !this.startFragRequested) {
                                    if (this.startPosition === -1) {
                                        var o = t.startTimeOffset;
                                        isNaN(o) ? this.startPosition = 0 : (k.logger.log("start time offset found in playlist, adjust startPosition to " + o),
                                            this.startPosition = o)
                                    }
                                    this.nextLoadPosition = this.startPosition
                                }
                                this.state === R.WAITING_TRACK && (this.state = R.IDLE),
                                    this.tick()
                            }
                        }, {
                            key: "onKeyLoaded",
                            value: function () {
                                this.state === R.KEY_LOADING && (this.state = R.IDLE,
                                    this.tick())
                            }
                        }, {
                            key: "onFragLoaded",
                            value: function (e) {
                                var t = this.fragCurrent
                                    , r = e.frag;
                                if (this.state === R.FRAG_LOADING && t && "audio" === r.type && r.level === t.level && r.sn === t.sn) {
                                    var i = this.tracks[this.trackId]
                                        , a = i.details
                                        , n = a.totalduration
                                        , s = t.level
                                        , o = t.sn
                                        , l = t.cc
                                        , u = this.config.defaultAudioCodec || i.audioCodec || "mp4a.40.2"
                                        , d = this.stats = e.stats;
                                    if ("initSegment" === o)
                                        this.state = R.IDLE,
                                            d.tparsed = d.tbuffered = performance.now(),
                                            a.initSegment.data = e.payload,
                                            this.hls.trigger(v.default.FRAG_BUFFERED, {
                                                stats: d,
                                                frag: t,
                                                id: "audio"
                                            }),
                                            this.tick();
                                    else {
                                        this.state = R.PARSING,
                                            this.appended = !1,
                                            this.demuxer || (this.demuxer = new h.default(this.hls, "audio"));
                                        var f = this.initPTS[l]
                                            , c = a.initSegment ? a.initSegment.data : [];
                                        if (a.initSegment || void 0 !== f) {
                                            this.pendingBuffering = !0,
                                                k.logger.log("Demuxing " + o + " of [" + a.startSN + " ," + a.endSN + "],track " + s);
                                            this.demuxer.push(e.payload, c, u, null, t, n, !1, f)
                                        } else
                                            k.logger.log("unknown video PTS for continuity counter " + l + ", waiting for video PTS before demuxing audio frag " + o + " of [" + a.startSN + " ," + a.endSN + "],track " + s),
                                                this.waitingFragment = e,
                                                this.state = R.WAITING_INIT_PTS
                                    }
                                }
                                this.fragLoadError = 0
                            }
                        }, {
                            key: "onFragParsingInitSegment",
                            value: function (e) {
                                var t = this.fragCurrent
                                    , r = e.frag;
                                if (t && "audio" === e.id && r.sn === t.sn && r.level === t.level && this.state === R.PARSING) {
                                    var i = e.tracks
                                        , a = void 0;
                                    if (i.video && delete i.video,
                                        a = i.audio) {
                                        a.levelCodec = "mp4a.40.2",
                                            a.id = e.id,
                                            this.hls.trigger(v.default.BUFFER_CODECS, i),
                                            k.logger.log("audio track:audio,container:" + a.container + ",codecs[level/parsed]=[" + a.levelCodec + "/" + a.codec + "]");
                                        var n = a.initSegment;
                                        if (n) {
                                            var s = {
                                                type: "audio",
                                                data: n,
                                                parent: "audio",
                                                content: "initSegment"
                                            };
                                            this.audioSwitch ? this.pendingData = [s] : (this.appended = !0,
                                                this.pendingBuffering = !0,
                                                this.hls.trigger(v.default.BUFFER_APPENDING, s))
                                        }
                                        this.tick()
                                    }
                                }
                            }
                        }, {
                            key: "onFragParsingData",
                            value: function (e) {
                                var t = this
                                    , r = this.fragCurrent
                                    , i = e.frag;
                                if (r && "audio" === e.id && "audio" === e.type && i.sn === r.sn && i.level === r.level && this.state === R.PARSING) {
                                    var a = this.trackId
                                        , n = this.tracks[a]
                                        , s = this.hls;
                                    isNaN(e.endPTS) && (e.endPTS = e.startPTS + r.duration,
                                        e.endDTS = e.startDTS + r.duration),
                                        k.logger.log("parsed " + e.type + ",PTS:[" + e.startPTS.toFixed(3) + "," + e.endPTS.toFixed(3) + "],DTS:[" + e.startDTS.toFixed(3) + "/" + e.endDTS.toFixed(3) + "],nb:" + e.nb),
                                        E.default.updateFragPTSDTS(n.details, r, e.startPTS, e.endPTS);
                                    var o = this.audioSwitch
                                        , l = this.media
                                        , u = !1;
                                    if (o && l)
                                        if (l.readyState) {
                                            var d = l.currentTime;
                                            k.logger.log("switching audio track : currentTime:" + d),
                                                d >= e.startPTS && (k.logger.log("switching audio track : flushing all audio"),
                                                    this.state = R.BUFFER_FLUSHING,
                                                    s.trigger(v.default.BUFFER_FLUSHING, {
                                                        startOffset: 0,
                                                        endOffset: Number.POSITIVE_INFINITY,
                                                        type: "audio"
                                                    }),
                                                    u = !0,
                                                    this.audioSwitch = !1,
                                                    s.trigger(v.default.AUDIO_TRACK_SWITCHED, {
                                                        id: a
                                                    }))
                                        } else
                                            this.audioSwitch = !1,
                                                s.trigger(v.default.AUDIO_TRACK_SWITCHED, {
                                                    id: a
                                                });
                                    var f = this.pendingData;
                                    this.audioSwitch || ([e.data1, e.data2].forEach(function (t) {
                                        t && t.length && f.push({
                                            type: e.type,
                                            data: t,
                                            parent: "audio",
                                            content: "data"
                                        })
                                    }),
                                        !u && f.length && (f.forEach(function (e) {
                                            t.state === R.PARSING && (t.pendingBuffering = !0,
                                                t.hls.trigger(v.default.BUFFER_APPENDING, e))
                                        }),
                                            this.pendingData = [],
                                            this.appended = !0)),
                                        this.tick()
                                }
                            }
                        }, {
                            key: "onFragParsed",
                            value: function (e) {
                                var t = this.fragCurrent
                                    , r = e.frag;
                                t && "audio" === e.id && r.sn === t.sn && r.level === t.level && this.state === R.PARSING && (this.stats.tparsed = performance.now(),
                                    this.state = R.PARSED,
                                    this._checkAppendedParsed())
                            }
                        }, {
                            key: "onBufferCreated",
                            value: function (e) {
                                var t = e.tracks.audio;
                                t && (this.mediaBuffer = t.buffer,
                                    this.loadedmetadata = !0)
                            }
                        }, {
                            key: "onBufferAppended",
                            value: function (e) {
                                if ("audio" === e.parent) {
                                    var t = this.state;
                                    t !== R.PARSING && t !== R.PARSED || (this.pendingBuffering = e.pending > 0,
                                        this._checkAppendedParsed())
                                }
                            }
                        }, {
                            key: "_checkAppendedParsed",
                            value: function () {
                                if (!(this.state !== R.PARSED || this.appended && this.pendingBuffering)) {
                                    var e = this.fragCurrent
                                        , t = this.stats
                                        , r = this.hls;
                                    if (e) {
                                        this.fragPrevious = e,
                                            t.tbuffered = performance.now(),
                                            r.trigger(v.default.FRAG_BUFFERED, {
                                                stats: t,
                                                frag: e,
                                                id: "audio"
                                            });
                                        var i = this.mediaBuffer ? this.mediaBuffer : this.media;
                                        k.logger.log("audio buffered : " + T.default.toString(i.buffered)),
                                            this.audioSwitch && this.appended && (this.audioSwitch = !1,
                                                r.trigger(v.default.AUDIO_TRACK_SWITCHED, {
                                                    id: this.trackId
                                                })),
                                            this.state = R.IDLE
                                    }
                                    this.tick()
                                }
                            }
                        }, {
                            key: "onError",
                            value: function (e) {
                                var t = e.frag;
                                if (!t || "audio" === t.type)
                                    switch (e.details) {
                                        case _.ErrorDetails.FRAG_LOAD_ERROR:
                                        case _.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                            if (!e.fatal) {
                                                var r = this.fragLoadError;
                                                r ? r++ : r = 1;
                                                var i = this.config;
                                                if (r <= i.fragLoadingMaxRetry) {
                                                    this.fragLoadError = r,
                                                        t.loadCounter = 0;
                                                    var a = Math.min(Math.pow(2, r - 1) * i.fragLoadingRetryDelay, i.fragLoadingMaxRetryTimeout);
                                                    k.logger.warn("audioStreamController: frag loading failed, retry in " + a + " ms"),
                                                        this.retryDate = performance.now() + a,
                                                        this.state = R.FRAG_LOADING_WAITING_RETRY
                                                } else
                                                    k.logger.error("audioStreamController: " + e.details + " reaches max retry, redispatch as fatal ..."),
                                                        e.fatal = !0,
                                                        this.state = R.ERROR
                                            }
                                            break;
                                        case _.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
                                        case _.ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
                                        case _.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
                                        case _.ErrorDetails.KEY_LOAD_ERROR:
                                        case _.ErrorDetails.KEY_LOAD_TIMEOUT:
                                            this.state !== R.ERROR && (this.state = e.fatal ? R.ERROR : R.IDLE,
                                                k.logger.warn("audioStreamController: " + e.details + " while loading frag,switch to " + this.state + " state ..."));
                                            break;
                                        case _.ErrorDetails.BUFFER_FULL_ERROR:
                                            if ("audio" === e.parent && (this.state === R.PARSING || this.state === R.PARSED)) {
                                                var n = this.mediaBuffer
                                                    , s = this.media.currentTime;
                                                if (n && f.default.isBuffered(n, s) && f.default.isBuffered(n, s + .5)) {
                                                    var o = this.config;
                                                    o.maxMaxBufferLength >= o.maxBufferLength && (o.maxMaxBufferLength /= 2,
                                                        k.logger.warn("audio:reduce max buffer length to " + o.maxMaxBufferLength + "s"),
                                                        this.fragLoadIdx += 2 * o.fragLoadingLoopThreshold),
                                                        this.state = R.IDLE
                                                } else
                                                    k.logger.warn("buffer full error also media.currentTime is not buffered, flush audio buffer"),
                                                        this.fragCurrent = null,
                                                        this.state = R.BUFFER_FLUSHING,
                                                        this.hls.trigger(v.default.BUFFER_FLUSHING, {
                                                            startOffset: 0,
                                                            endOffset: Number.POSITIVE_INFINITY,
                                                            type: "audio"
                                                        })
                                            }
                                    }
                            }
                        }, {
                            key: "onBufferFlushed",
                            value: function () {
                                var e = this
                                    , t = this.pendingData;
                                t && t.length ? (k.logger.log("appending pending audio data on Buffer Flushed"),
                                    t.forEach(function (t) {
                                        e.hls.trigger(v.default.BUFFER_APPENDING, t)
                                    }),
                                    this.appended = !0,
                                    this.pendingData = [],
                                    this.state = R.PARSED) : (this.state = R.IDLE,
                                        this.fragPrevious = null,
                                        this.tick())
                            }
                        }, {
                            key: "state",
                            set: function (e) {
                                if (this.state !== e) {
                                    var t = this.state;
                                    this._state = e,
                                        k.logger.log("audio stream:" + t + "->" + e)
                                }
                            },
                            get: function () {
                                return this._state
                            }
                        }]),
                        t
                }(y.default);
            r.default = A
        }
            , {
            25: 25,
            31: 31,
            32: 32,
            33: 33,
            35: 35,
            36: 36,
            46: 46,
            51: 51,
            52: 52
        }],
        7: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , l = e(33)
                , u = i(l)
                , d = e(32)
                , f = i(d)
                , c = e(51)
                , h = function (e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.MANIFEST_LOADING, u.default.MANIFEST_LOADED, u.default.AUDIO_TRACK_LOADED));
                        return r.ticks = 0,
                            r.ontick = r.tick.bind(r),
                            r
                    }
                    return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function () {
                                f.default.prototype.destroy.call(this)
                            }
                        }, {
                            key: "tick",
                            value: function () {
                                1 === ++this.ticks && (this.doTick(),
                                    this.ticks > 1 && setTimeout(this.tick, 1),
                                    this.ticks = 0)
                            }
                        }, {
                            key: "doTick",
                            value: function () {
                                this.updateTrack(this.trackId)
                            }
                        }, {
                            key: "onManifestLoading",
                            value: function () {
                                this.tracks = [],
                                    this.trackId = -1
                            }
                        }, {
                            key: "onManifestLoaded",
                            value: function (e) {
                                var t = this
                                    , r = e.audioTracks || []
                                    , i = !1;
                                this.tracks = r,
                                    this.hls.trigger(u.default.AUDIO_TRACKS_UPDATED, {
                                        audioTracks: r
                                    });
                                var a = 0;
                                r.forEach(function (e) {
                                    if (e.default)
                                        return t.audioTrack = a,
                                            void (i = !0);
                                    a++
                                }),
                                    i === !1 && r.length && (c.logger.log("no default audio track defined, use first audio track as default"),
                                        this.audioTrack = 0)
                            }
                        }, {
                            key: "onAudioTrackLoaded",
                            value: function (e) {
                                e.id < this.tracks.length && (c.logger.log("audioTrack " + e.id + " loaded"),
                                    this.tracks[e.id].details = e.details,
                                    e.details.live && !this.timer && (this.timer = setInterval(this.ontick, 1e3 * e.details.targetduration)),
                                    !e.details.live && this.timer && (clearInterval(this.timer),
                                        this.timer = null))
                            }
                        }, {
                            key: "setAudioTrackInternal",
                            value: function (e) {
                                if (e >= 0 && e < this.tracks.length) {
                                    this.timer && (clearInterval(this.timer),
                                        this.timer = null),
                                        this.trackId = e,
                                        c.logger.log("switching to audioTrack " + e);
                                    var t = this.tracks[e]
                                        , r = this.hls
                                        , i = t.type
                                        , a = t.url
                                        , n = {
                                            id: e,
                                            type: i,
                                            url: a
                                        };
                                    r.trigger(u.default.AUDIO_TRACK_SWITCH, n),
                                        r.trigger(u.default.AUDIO_TRACK_SWITCHING, n);
                                    var s = t.details;
                                    !a || void 0 !== s && s.live !== !0 || (c.logger.log("(re)loading playlist for audioTrack " + e),
                                        r.trigger(u.default.AUDIO_TRACK_LOADING, {
                                            url: a,
                                            id: e
                                        }))
                                }
                            }
                        }, {
                            key: "updateTrack",
                            value: function (e) {
                                if (e >= 0 && e < this.tracks.length) {
                                    this.timer && (clearInterval(this.timer),
                                        this.timer = null),
                                        this.trackId = e,
                                        c.logger.log("updating audioTrack " + e);
                                    var t = this.tracks[e]
                                        , r = t.url
                                        , i = t.details;
                                    !r || void 0 !== i && i.live !== !0 || (c.logger.log("(re)loading playlist for audioTrack " + e),
                                        this.hls.trigger(u.default.AUDIO_TRACK_LOADING, {
                                            url: r,
                                            id: e
                                        }))
                                }
                            }
                        }, {
                            key: "audioTracks",
                            get: function () {
                                return this.tracks
                            }
                        }, {
                            key: "audioTrack",
                            get: function () {
                                return this.trackId
                            },
                            set: function (e) {
                                this.trackId === e && void 0 !== this.tracks[e].details || this.setAudioTrackInternal(e)
                            }
                        }]),
                        t
                }(f.default);
            r.default = h
        }
            , {
            32: 32,
            33: 33,
            51: 51
        }],
        8: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , l = e(33)
                , u = i(l)
                , d = e(32)
                , f = i(d)
                , c = e(51)
                , h = e(31)
                , g = function (e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.MEDIA_ATTACHING, u.default.MEDIA_DETACHING, u.default.MANIFEST_PARSED, u.default.BUFFER_RESET, u.default.BUFFER_APPENDING, u.default.BUFFER_CODECS, u.default.BUFFER_EOS, u.default.BUFFER_FLUSHING, u.default.LEVEL_PTS_UPDATED, u.default.LEVEL_UPDATED));
                        return r._msDuration = null,
                            r._levelDuration = null,
                            r.onsbue = r.onSBUpdateEnd.bind(r),
                            r.onsbe = r.onSBUpdateError.bind(r),
                            r.pendingTracks = {},
                            r.tracks = {},
                            r
                    }
                    return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function () {
                                f.default.prototype.destroy.call(this)
                            }
                        }, {
                            key: "onLevelPtsUpdated",
                            value: function (e) {
                                var t = e.type
                                    , r = this.tracks.audio;
                                if ("audio" === t && r && "audio/mpeg" === r.container) {
                                    var i = this.sourceBuffer.audio;
                                    if (Math.abs(i.timestampOffset - e.start) > .1) {
                                        var a = i.updating;
                                        try {
                                            i.abort()
                                        } catch (e) {
                                            a = !0,
                                                c.logger.warn("can not abort audio buffer: " + e)
                                        }
                                        a ? this.audioTimestampOffset = e.start : (c.logger.warn("change mpeg audio timestamp offset from " + i.timestampOffset + " to " + e.start),
                                            i.timestampOffset = e.start)
                                    }
                                }
                            }
                        }, {
                            key: "onManifestParsed",
                            value: function (e) {
                                var t = e.audio
                                    , r = e.video
                                    , i = 0;
                                e.altAudio && (t || r) && (i = (t ? 1 : 0) + (r ? 1 : 0),
                                    c.logger.log(i + " sourceBuffer(s) expected")),
                                    this.sourceBufferNb = i
                            }
                        }, {
                            key: "onMediaAttaching",
                            value: function (e) {
                                var t = this.media = e.media;
                                if (t) {
                                    var r = this.mediaSource = new MediaSource;
                                    this.onmso = this.onMediaSourceOpen.bind(this),
                                        this.onmse = this.onMediaSourceEnded.bind(this),
                                        this.onmsc = this.onMediaSourceClose.bind(this),
                                        r.addEventListener("sourceopen", this.onmso),
                                        r.addEventListener("sourceended", this.onmse),
                                        r.addEventListener("sourceclose", this.onmsc),
                                        t.src = URL.createObjectURL(r)
                                }
                            }
                        }, {
                            key: "onMediaDetaching",
                            value: function () {
                                c.logger.log("media source detaching");
                                var e = this.mediaSource;
                                if (e) {
                                    if ("open" === e.readyState)
                                        try {
                                            e.endOfStream()
                                        } catch (e) {
                                            c.logger.warn("onMediaDetaching:" + e.message + " while calling endOfStream")
                                        }
                                    e.removeEventListener("sourceopen", this.onmso),
                                        e.removeEventListener("sourceended", this.onmse),
                                        e.removeEventListener("sourceclose", this.onmsc),
                                        this.media && (URL.revokeObjectURL(this.media.src),
                                            this.media.removeAttribute("src"),
                                            this.media.load()),
                                        this.mediaSource = null,
                                        this.media = null,
                                        this.pendingTracks = {},
                                        this.tracks = {},
                                        this.sourceBuffer = {},
                                        this.flushRange = [],
                                        this.segments = [],
                                        this.appended = 0
                                }
                                this.onmso = this.onmse = this.onmsc = null,
                                    this.hls.trigger(u.default.MEDIA_DETACHED)
                            }
                        }, {
                            key: "onMediaSourceOpen",
                            value: function () {
                                c.logger.log("media source opened"),
                                    this.hls.trigger(u.default.MEDIA_ATTACHED, {
                                        media: this.media
                                    });
                                var e = this.mediaSource;
                                e && e.removeEventListener("sourceopen", this.onmso),
                                    this.checkPendingTracks()
                            }
                        }, {
                            key: "checkPendingTracks",
                            value: function () {
                                var e = this.pendingTracks
                                    , t = Object.keys(e).length;
                                t && (this.sourceBufferNb <= t || 0 === this.sourceBufferNb) && (this.createSourceBuffers(e),
                                    this.pendingTracks = {},
                                    this.doAppending())
                            }
                        }, {
                            key: "onMediaSourceClose",
                            value: function () {
                                c.logger.log("media source closed")
                            }
                        }, {
                            key: "onMediaSourceEnded",
                            value: function () {
                                c.logger.log("media source ended")
                            }
                        }, {
                            key: "onSBUpdateEnd",
                            value: function () {
                                if (this.audioTimestampOffset) {
                                    var e = this.sourceBuffer.audio;
                                    c.logger.warn("change mpeg audio timestamp offset from " + e.timestampOffset + " to " + this.audioTimestampOffset),
                                        e.timestampOffset = this.audioTimestampOffset,
                                        delete this.audioTimestampOffset
                                }
                                this._needsFlush && this.doFlush(),
                                    this._needsEos && this.checkEos(),
                                    this.appending = !1;
                                var t = this.parent
                                    , r = this.segments.reduce(function (e, r) {
                                        return r.parent === t ? e + 1 : e
                                    }, 0);
                                this.hls.trigger(u.default.BUFFER_APPENDED, {
                                    parent: t,
                                    pending: r
                                }),
                                    this._needsFlush || this.doAppending(),
                                    this.updateMediaElementDuration()
                            }
                        }, {
                            key: "onSBUpdateError",
                            value: function (e) {
                                c.logger.error("sourceBuffer error:", e),
                                    this.hls.trigger(u.default.ERROR, {
                                        type: h.ErrorTypes.MEDIA_ERROR,
                                        details: h.ErrorDetails.BUFFER_APPENDING_ERROR,
                                        fatal: !1
                                    })
                            }
                        }, {
                            key: "onBufferReset",
                            value: function () {
                                var e = this.sourceBuffer;
                                for (var t in e) {
                                    var r = e[t];
                                    try {
                                        this.mediaSource.removeSourceBuffer(r),
                                            r.removeEventListener("updateend", this.onsbue),
                                            r.removeEventListener("error", this.onsbe)
                                    } catch (e) { }
                                }
                                this.sourceBuffer = {},
                                    this.flushRange = [],
                                    this.segments = [],
                                    this.appended = 0
                            }
                        }, {
                            key: "onBufferCodecs",
                            value: function (e) {
                                if (0 === Object.keys(this.sourceBuffer).length) {
                                    for (var t in e)
                                        this.pendingTracks[t] = e[t];
                                    var r = this.mediaSource;
                                    r && "open" === r.readyState && this.checkPendingTracks()
                                }
                            }
                        }, {
                            key: "createSourceBuffers",
                            value: function (e) {
                                var t = this.sourceBuffer
                                    , r = this.mediaSource;
                                for (var i in e)
                                    if (!t[i]) {
                                        var a = e[i]
                                            , n = a.levelCodec || a.codec
                                            , s = a.container + ";codecs=" + n;
                                        c.logger.log("creating sourceBuffer(" + s + ")");
                                        try {
                                            var o = t[i] = r.addSourceBuffer(s);
                                            o.addEventListener("updateend", this.onsbue),
                                                o.addEventListener("error", this.onsbe),
                                                this.tracks[i] = {
                                                    codec: n,
                                                    container: a.container
                                                },
                                                a.buffer = o
                                        } catch (e) {
                                            c.logger.error("error while trying to add sourceBuffer:" + e.message),
                                                this.hls.trigger(u.default.ERROR, {
                                                    type: h.ErrorTypes.MEDIA_ERROR,
                                                    details: h.ErrorDetails.BUFFER_ADD_CODEC_ERROR,
                                                    fatal: !1,
                                                    err: e,
                                                    mimeType: s
                                                })
                                        }
                                    }
                                this.hls.trigger(u.default.BUFFER_CREATED, {
                                    tracks: e
                                })
                            }
                        }, {
                            key: "onBufferAppending",
                            value: function (e) {
                                this._needsFlush || (this.segments ? this.segments.push(e) : this.segments = [e],
                                    this.doAppending())
                            }
                        }, {
                            key: "onBufferAppendFail",
                            value: function (e) {
                                c.logger.error("sourceBuffer error:", e.event),
                                    this.hls.trigger(u.default.ERROR, {
                                        type: h.ErrorTypes.MEDIA_ERROR,
                                        details: h.ErrorDetails.BUFFER_APPENDING_ERROR,
                                        fatal: !1
                                    })
                            }
                        }, {
                            key: "onBufferEos",
                            value: function (e) {
                                var t = this.sourceBuffer
                                    , r = e.type;
                                for (var i in t)
                                    r && i !== r || t[i].ended || (t[i].ended = !0,
                                        c.logger.log(i + " sourceBuffer now EOS"));
                                this.checkEos()
                            }
                        }, {
                            key: "checkEos",
                            value: function () {
                                var e = this.sourceBuffer
                                    , t = this.mediaSource;
                                if (!t || "open" !== t.readyState)
                                    return void (this._needsEos = !1);
                                for (var r in e) {
                                    var i = e[r];
                                    if (!i.ended)
                                        return;
                                    if (i.updating)
                                        return void (this._needsEos = !0)
                                }
                                c.logger.log("all media data available, signal endOfStream() to MediaSource and stop loading fragment");
                                try {
                                    t.endOfStream()
                                } catch (e) {
                                    c.logger.warn("exception while calling mediaSource.endOfStream()")
                                }
                                this._needsEos = !1
                            }
                        }, {
                            key: "onBufferFlushing",
                            value: function (e) {
                                this.flushRange.push({
                                    start: e.startOffset,
                                    end: e.endOffset,
                                    type: e.type
                                }),
                                    this.flushBufferCounter = 0,
                                    this.doFlush()
                            }
                        }, {
                            key: "onLevelUpdated",
                            value: function (e) {
                                var t = e.details;
                                0 !== t.fragments.length && (this._levelDuration = t.totalduration + t.fragments[0].start,
                                    this.updateMediaElementDuration())
                            }
                        }, {
                            key: "updateMediaElementDuration",
                            value: function () {
                                var e = this.media
                                    , t = this.mediaSource
                                    , r = this.sourceBuffer
                                    , i = this._levelDuration;
                                if (null !== i && e && t && r && 0 !== e.readyState && "open" === t.readyState) {
                                    for (var a in r)
                                        if (r[a].updating)
                                            return;
                                    null === this._msDuration && (this._msDuration = t.duration);
                                    var n = e.duration;
                                    (i > this._msDuration && i > n || n === 1 / 0 || isNaN(n)) && (c.logger.log("Updating mediasource duration to " + i.toFixed(3)),
                                        this._msDuration = t.duration = i)
                                }
                            }
                        }, {
                            key: "doFlush",
                            value: function () {
                                for (; this.flushRange.length;) {
                                    var e = this.flushRange[0];
                                    if (!this.flushBuffer(e.start, e.end, e.type))
                                        return void (this._needsFlush = !0);
                                    this.flushRange.shift(),
                                        this.flushBufferCounter = 0
                                }
                                if (0 === this.flushRange.length) {
                                    this._needsFlush = !1;
                                    var t = 0
                                        , r = this.sourceBuffer;
                                    try {
                                        for (var i in r)
                                            t += r[i].buffered.length
                                    } catch (e) {
                                        c.logger.error("error while accessing sourceBuffer.buffered")
                                    }
                                    this.appended = t,
                                        this.hls.trigger(u.default.BUFFER_FLUSHED)
                                }
                            }
                        }, {
                            key: "doAppending",
                            value: function () {
                                var e = this.hls
                                    , t = this.sourceBuffer
                                    , r = this.segments;
                                if (Object.keys(t).length) {
                                    if (this.media.error)
                                        return this.segments = [],
                                            void c.logger.error("trying to append although a media error occured, flush segment and abort");
                                    if (this.appending)
                                        return;
                                    if (r && r.length) {
                                        var i = r.shift();
                                        try {
                                            var a = i.type
                                                , n = t[a];
                                            n ? n.updating ? r.unshift(i) : (n.ended = !1,
                                                this.parent = i.parent,
                                                n.appendBuffer(i.data),
                                                this.appendError = 0,
                                                this.appended++,
                                                this.appending = !0) : this.onSBUpdateEnd()
                                        } catch (t) {
                                            c.logger.error("error while trying to append buffer:" + t.message),
                                                r.unshift(i);
                                            var s = {
                                                type: h.ErrorTypes.MEDIA_ERROR,
                                                parent: i.parent
                                            };
                                            if (22 === t.code)
                                                return this.segments = [],
                                                    s.details = h.ErrorDetails.BUFFER_FULL_ERROR,
                                                    s.fatal = !1,
                                                    void e.trigger(u.default.ERROR, s);
                                            if (this.appendError ? this.appendError++ : this.appendError = 1,
                                                s.details = h.ErrorDetails.BUFFER_APPEND_ERROR,
                                                this.appendError > e.config.appendErrorMaxRetry)
                                                return c.logger.log("fail " + e.config.appendErrorMaxRetry + " times to append segment in sourceBuffer"),
                                                    r = [],
                                                    s.fatal = !0,
                                                    void e.trigger(u.default.ERROR, s);
                                            s.fatal = !1,
                                                e.trigger(u.default.ERROR, s)
                                        }
                                    }
                                }
                            }
                        }, {
                            key: "flushBuffer",
                            value: function (e, t, r) {
                                var i, a, n, s, o, l, u = this.sourceBuffer;
                                if (Object.keys(u).length) {
                                    if (c.logger.log("flushBuffer,pos/start/end: " + this.media.currentTime.toFixed(3) + "/" + e + "/" + t),
                                        this.flushBufferCounter < this.appended) {
                                        for (var d in u)
                                            if (!r || d === r) {
                                                if (i = u[d],
                                                    i.ended = !1,
                                                    i.updating)
                                                    return c.logger.warn("cannot flush, sb updating in progress"),
                                                        !1;
                                                try {
                                                    for (a = 0; a < i.buffered.length; a++)
                                                        if (n = i.buffered.start(a),
                                                            s = i.buffered.end(a),
                                                            navigator.userAgent.toLowerCase().indexOf("firefox") !== -1 && t === Number.POSITIVE_INFINITY ? (o = e,
                                                                l = t) : (o = Math.max(n, e),
                                                                    l = Math.min(s, t)),
                                                            Math.min(l, s) - o > .5)
                                                            return this.flushBufferCounter++,
                                                                c.logger.log("flush " + d + " [" + o + "," + l + "], of [" + n + "," + s + "], pos:" + this.media.currentTime),
                                                                i.remove(o, l),
                                                                !1
                                                } catch (e) {
                                                    c.logger.warn("exception while accessing sourcebuffer, it might have been removed from MediaSource")
                                                }
                                            }
                                    } else
                                        c.logger.warn("abort flushing too many retries");
                                    c.logger.log("buffer flushed")
                                }
                                return !0
                            }
                        }]),
                        t
                }(f.default);
            r.default = g
        }
            , {
            31: 31,
            32: 32,
            33: 33,
            51: 51
        }],
        9: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , l = e(33)
                , u = i(l)
                , d = e(32)
                , f = i(d)
                , c = function (e) {
                    function t(e) {
                        return a(this, t),
                            n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.FPS_DROP_LEVEL_CAPPING, u.default.MEDIA_ATTACHING, u.default.MANIFEST_PARSED))
                    }
                    return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function () {
                                this.hls.config.capLevelToPlayerSize && (this.media = this.restrictedLevels = null,
                                    this.autoLevelCapping = Number.POSITIVE_INFINITY,
                                    this.timer && (this.timer = clearInterval(this.timer)))
                            }
                        }, {
                            key: "onFpsDropLevelCapping",
                            value: function (e) {
                                this.restrictedLevels || (this.restrictedLevels = []),
                                    this.isLevelRestricted(e.droppedLevel) || this.restrictedLevels.push(e.droppedLevel)
                            }
                        }, {
                            key: "onMediaAttaching",
                            value: function (e) {
                                this.media = e.media instanceof HTMLVideoElement ? e.media : null
                            }
                        }, {
                            key: "onManifestParsed",
                            value: function (e) {
                                var t = this.hls;
                                t.config.capLevelToPlayerSize && (this.autoLevelCapping = Number.POSITIVE_INFINITY,
                                    this.levels = e.levels,
                                    t.firstLevel = this.getMaxLevel(e.firstLevel),
                                    clearInterval(this.timer),
                                    this.timer = setInterval(this.detectPlayerSize.bind(this), 1e3),
                                    this.detectPlayerSize())
                            }
                        }, {
                            key: "detectPlayerSize",
                            value: function () {
                                if (this.media) {
                                    var e = this.levels ? this.levels.length : 0;
                                    if (e) {
                                        var t = this.hls;
                                        t.autoLevelCapping = this.getMaxLevel(e - 1),
                                            t.autoLevelCapping > this.autoLevelCapping && t.streamController.nextLevelSwitch(),
                                            this.autoLevelCapping = t.autoLevelCapping
                                    }
                                }
                            }
                        }, {
                            key: "getMaxLevel",
                            value: function (e) {
                                var t = 0
                                    , r = void 0
                                    , i = void 0
                                    , a = this.mediaWidth
                                    , n = this.mediaHeight
                                    , s = 0
                                    , o = 0;
                                for (r = 0; r <= e && (i = this.levels[r],
                                    !this.isLevelRestricted(r)) && (t = r,
                                        s = i.width,
                                        o = i.height,
                                        !(a <= s || n <= o)); r++)
                                    ;
                                return t
                            }
                        }, {
                            key: "isLevelRestricted",
                            value: function (e) {
                                return !(!this.restrictedLevels || this.restrictedLevels.indexOf(e) === -1)
                            }
                        }, {
                            key: "contentScaleFactor",
                            get: function () {
                                var e = 1;
                                try {
                                    e = window.devicePixelRatio
                                } catch (e) { }
                                return e
                            }
                        }, {
                            key: "mediaWidth",
                            get: function () {
                                var e = void 0
                                    , t = this.media;
                                return t && (e = t.width || t.clientWidth || t.offsetWidth,
                                    e *= this.contentScaleFactor),
                                    e
                            }
                        }, {
                            key: "mediaHeight",
                            get: function () {
                                var e = void 0
                                    , t = this.media;
                                return t && (e = t.height || t.clientHeight || t.offsetHeight,
                                    e *= this.contentScaleFactor),
                                    e
                            }
                        }]),
                        t
                }(f.default);
            r.default = c
        }
            , {
            32: 32,
            33: 33
        }],
        10: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , l = e(33)
                , u = i(l)
                , d = e(32)
                , f = i(d)
                , c = e(51)
                , h = function (e) {
                    function t(e) {
                        return a(this, t),
                            n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.MEDIA_ATTACHING))
                    }
                    return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function () {
                                this.timer && clearInterval(this.timer),
                                    this.isVideoPlaybackQualityAvailable = !1
                            }
                        }, {
                            key: "onMediaAttaching",
                            value: function (e) {
                                var t = this.hls.config;
                                if (t.capLevelOnFPSDrop) {
                                    "function" == typeof (this.video = e.media instanceof HTMLVideoElement ? e.media : null).getVideoPlaybackQuality && (this.isVideoPlaybackQualityAvailable = !0),
                                        clearInterval(this.timer),
                                        this.timer = setInterval(this.checkFPSInterval.bind(this), t.fpsDroppedMonitoringPeriod)
                                }
                            }
                        }, {
                            key: "checkFPS",
                            value: function (e, t, r) {
                                var i = performance.now();
                                if (t) {
                                    if (this.lastTime) {
                                        var a = i - this.lastTime
                                            , n = r - this.lastDroppedFrames
                                            , s = t - this.lastDecodedFrames
                                            , o = 1e3 * n / a
                                            , l = this.hls;
                                        if (l.trigger(u.default.FPS_DROP, {
                                            currentDropped: n,
                                            currentDecoded: s,
                                            totalDroppedFrames: r
                                        }),
                                            o > 0 && n > l.config.fpsDroppedMonitoringThreshold * s) {
                                            var d = l.currentLevel;
                                            c.logger.warn("drop FPS ratio greater than max allowed value for currentLevel: " + d),
                                                d > 0 && (l.autoLevelCapping === -1 || l.autoLevelCapping >= d) && (d -= 1,
                                                    l.trigger(u.default.FPS_DROP_LEVEL_CAPPING, {
                                                        level: d,
                                                        droppedLevel: l.currentLevel
                                                    }),
                                                    l.autoLevelCapping = d,
                                                    l.streamController.nextLevelSwitch())
                                        }
                                    }
                                    this.lastTime = i,
                                        this.lastDroppedFrames = r,
                                        this.lastDecodedFrames = t
                                }
                            }
                        }, {
                            key: "checkFPSInterval",
                            value: function () {
                                var e = this.video;
                                if (e)
                                    if (this.isVideoPlaybackQualityAvailable) {
                                        var t = e.getVideoPlaybackQuality();
                                        this.checkFPS(e, t.totalVideoFrames, t.droppedVideoFrames)
                                    } else
                                        this.checkFPS(e, e.webkitDecodedFrameCount, e.webkitDroppedFrameCount)
                            }
                        }]),
                        t
                }(f.default);
            r.default = h
        }
            , {
            32: 32,
            33: 33,
            51: 51
        }],
        11: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , l = e(33)
                , u = i(l)
                , d = e(32)
                , f = i(d)
                , c = function (e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.MEDIA_ATTACHED, u.default.MEDIA_DETACHING, u.default.FRAG_PARSING_METADATA));
                        return r.id3Track = void 0,
                            r.media = void 0,
                            r
                    }
                    return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function () {
                                f.default.prototype.destroy.call(this)
                            }
                        }, {
                            key: "onMediaAttached",
                            value: function (e) {
                                this.media = e.media,
                                    this.media && (this.id3Track = this.media.addTextTrack("metadata", "id3"),
                                        this.id3Track.mode = "hidden")
                            }
                        }, {
                            key: "onMediaDetaching",
                            value: function () {
                                this.media = void 0
                            }
                        }, {
                            key: "onFragParsingMetadata",
                            value: function (e) {
                                var t = e.frag
                                    , r = e.samples
                                    , i = t.start
                                    , a = t.start + t.duration;
                                i === a && (a += 1e-4);
                                for (var n = window.WebKitDataCue || window.VTTCue || window.TextTrackCue, s = 0; s < r.length; s++) {
                                    var o = this.parseID3Frame(r[s].data)
                                        , l = this.decodeID3Frame(o);
                                    if (l) {
                                        var u = new n(i, a, "");
                                        u.value = l,
                                            this.id3Track.addCue(u)
                                    }
                                }
                            }
                        }, {
                            key: "parseID3Frame",
                            value: function (e) {
                                if (!(e.length < 21) && 73 === e[0] && 68 === e[1] && 51 === e[2]) {
                                    var t = String.fromCharCode(e[10], e[11], e[12], e[13]);
                                    return e = e.subarray(20),
                                    {
                                        type: t,
                                        data: e
                                    }
                                }
                            }
                        }, {
                            key: "decodeID3Frame",
                            value: function (e) {
                                return "TXXX" === e.type ? this.decodeTxxxFrame(e) : "PRIV" === e.type ? this.decodePrivFrame(e) : "T" === e.type[0] ? this.decodeTextFrame(e) : void 0
                            }
                        }, {
                            key: "decodeTxxxFrame",
                            value: function (e) {
                                if (!(e.size < 2) && 3 === e.data[0]) {
                                    var t = 1
                                        , r = this.utf8ArrayToStr(e.data.subarray(t));
                                    t += r.length + 1;
                                    return {
                                        key: "TXXX",
                                        description: r,
                                        data: this.utf8ArrayToStr(e.data.subarray(t))
                                    }
                                }
                            }
                        }, {
                            key: "decodeTextFrame",
                            value: function (e) {
                                if (!(e.size < 2) && 3 === e.data[0]) {
                                    var t = e.data.subarray(1);
                                    return {
                                        key: e.type,
                                        data: this.utf8ArrayToStr(t)
                                    }
                                }
                            }
                        }, {
                            key: "decodePrivFrame",
                            value: function (e) {
                                if (!(e.size < 2)) {
                                    var t = this.utf8ArrayToStr(e.data);
                                    return {
                                        key: "PRIV",
                                        info: t,
                                        data: e.data.subarray(t.length + 1).buffer
                                    }
                                }
                            }
                        }, {
                            key: "utf8ArrayToStr",
                            value: function (e) {
                                for (var t = void 0, r = void 0, i = "", a = 0, n = e.length; a < n;) {
                                    var s = e[a++];
                                    switch (s >> 4) {
                                        case 0:
                                            return i;
                                        case 1:
                                        case 2:
                                        case 3:
                                        case 4:
                                        case 5:
                                        case 6:
                                        case 7:
                                            i += String.fromCharCode(s);
                                            break;
                                        case 12:
                                        case 13:
                                            t = e[a++],
                                                i += String.fromCharCode((31 & s) << 6 | 63 & t);
                                            break;
                                        case 14:
                                            t = e[a++],
                                                r = e[a++],
                                                i += String.fromCharCode((15 & s) << 12 | (63 & t) << 6 | (63 & r) << 0)
                                    }
                                }
                                return i
                            }
                        }]),
                        t
                }(f.default);
            r.default = c
        }
            , {
            32: 32,
            33: 33
        }],
        12: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , l = e(33)
                , u = i(l)
                , d = e(32)
                , f = i(d)
                , c = e(51)
                , h = e(31)
                , g = e(35)
                , v = i(g)
                , p = function (e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.MANIFEST_LOADED, u.default.LEVEL_LOADED, u.default.FRAG_LOADED, u.default.ERROR));
                        return r.ontick = r.tick.bind(r),
                            r._manualLevel = -1,
                            r
                    }
                    return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function () {
                                this.timer && (clearTimeout(this.timer),
                                    this.timer = null),
                                    this._manualLevel = -1
                            }
                        }, {
                            key: "startLoad",
                            value: function () {
                                this.canload = !0;
                                var e = this._levels;
                                e && e.forEach(function (e) {
                                    e.loadError = 0;
                                    var t = e.details;
                                    t && t.live && (e.details = void 0)
                                }),
                                    this.timer && this.tick()
                            }
                        }, {
                            key: "stopLoad",
                            value: function () {
                                this.canload = !1
                            }
                        }, {
                            key: "onManifestLoaded",
                            value: function (e) {
                                var t, r = [], i = [], a = {}, n = !1, s = !1, o = this.hls, l = /chrome|firefox/.test(navigator.userAgent.toLowerCase()), d = function (e, t) {
                                    return MediaSource.isTypeSupported(e + "/mp4;codecs=" + t)
                                };
                                if (e.levels.forEach(function (e) {
                                    e.videoCodec && (n = !0),
                                        l && e.audioCodec && e.audioCodec.indexOf("mp4a.40.34") !== -1 && (e.audioCodec = void 0),
                                        (e.audioCodec || e.attrs && e.attrs.AUDIO) && (s = !0);
                                    var t = a[e.bitrate];
                                    void 0 === t ? (a[e.bitrate] = r.length,
                                        e.url = [e.url],
                                        e.urlId = 0,
                                        r.push(e)) : r[t].url.push(e.url)
                                }),
                                    n && s ? r.forEach(function (e) {
                                        e.videoCodec && i.push(e)
                                    }) : i = r,
                                    i = i.filter(function (e) {
                                        var t = e.audioCodec
                                            , r = e.videoCodec;
                                        return (!t || d("audio", t)) && (!r || d("video", r))
                                    }),
                                    i.length) {
                                    t = i[0].bitrate,
                                        i.sort(function (e, t) {
                                            return e.bitrate - t.bitrate
                                        }),
                                        this._levels = i;
                                    for (var f = 0; f < i.length; f++)
                                        if (i[f].bitrate === t) {
                                            this._firstLevel = f,
                                                c.logger.log("manifest loaded," + i.length + " level(s) found, first bitrate:" + t);
                                            break
                                        }
                                    o.trigger(u.default.MANIFEST_PARSED, {
                                        levels: i,
                                        firstLevel: this._firstLevel,
                                        stats: e.stats,
                                        audio: s,
                                        video: n,
                                        altAudio: e.audioTracks.length > 0
                                    })
                                } else
                                    o.trigger(u.default.ERROR, {
                                        type: h.ErrorTypes.MEDIA_ERROR,
                                        details: h.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                                        fatal: !0,
                                        url: o.url,
                                        reason: "no level with compatible codecs found in manifest"
                                    })
                            }
                        }, {
                            key: "setLevelInternal",
                            value: function (e) {
                                var t = this._levels
                                    , r = this.hls;
                                if (e >= 0 && e < t.length) {
                                    if (this.timer && (clearTimeout(this.timer),
                                        this.timer = null),
                                        this._level !== e) {
                                        c.logger.log("switching to level " + e),
                                            this._level = e;
                                        var i = t[e];
                                        i.level = e,
                                            r.trigger(u.default.LEVEL_SWITCH, i),
                                            r.trigger(u.default.LEVEL_SWITCHING, i)
                                    }
                                    var a = t[e]
                                        , n = a.details;
                                    if (!n || n.live === !0) {
                                        var s = a.urlId;
                                        r.trigger(u.default.LEVEL_LOADING, {
                                            url: a.url[s],
                                            level: e,
                                            id: s
                                        })
                                    }
                                } else
                                    r.trigger(u.default.ERROR, {
                                        type: h.ErrorTypes.OTHER_ERROR,
                                        details: h.ErrorDetails.LEVEL_SWITCH_ERROR,
                                        level: e,
                                        fatal: !1,
                                        reason: "invalid level idx"
                                    })
                            }
                        }, {
                            key: "onError",
                            value: function (e) {
                                if (!e.fatal) {
                                    var t = e.details
                                        , r = this.hls
                                        , i = void 0
                                        , a = void 0
                                        , n = !1;
                                    switch (t) {
                                        case h.ErrorDetails.FRAG_LOAD_ERROR:
                                        case h.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                        case h.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
                                        case h.ErrorDetails.KEY_LOAD_ERROR:
                                        case h.ErrorDetails.KEY_LOAD_TIMEOUT:
                                            i = e.frag.level;
                                            break;
                                        case h.ErrorDetails.LEVEL_LOAD_ERROR:
                                        case h.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                            i = e.context.level,
                                                n = !0;
                                            break;
                                        case h.ErrorDetails.REMUX_ALLOC_ERROR:
                                            i = e.level
                                    }
                                    if (void 0 !== i) {
                                        a = this._levels[i],
                                            a.loadError ? a.loadError++ : a.loadError = 1;
                                        var s = a.url.length;
                                        if (s > 1 && a.loadError < s)
                                            a.urlId = (a.urlId + 1) % s,
                                                a.details = void 0,
                                                c.logger.warn("level controller," + t + " for level " + i + ": switching to redundant stream id " + a.urlId);
                                        else {
                                            if (this._manualLevel === -1 && i)
                                                c.logger.warn("level controller," + t + ": switch-down for next fragment"),
                                                    r.nextAutoLevel = Math.max(0, i - 1);
                                            else if (a && a.details && a.details.live)
                                                c.logger.warn("level controller," + t + " on live stream, discard"),
                                                    n && (this._level = void 0);
                                            else if (t === h.ErrorDetails.LEVEL_LOAD_ERROR || t === h.ErrorDetails.LEVEL_LOAD_TIMEOUT) {
                                                var o = r.media
                                                    , l = o && v.default.isBuffered(o, o.currentTime) && v.default.isBuffered(o, o.currentTime + .5);
                                                if (l) {
                                                    var u = r.config.levelLoadingRetryDelay;
                                                    c.logger.warn("level controller," + t + ", but media buffered, retry in " + u + "ms"),
                                                        this.timer = setTimeout(this.ontick, u)
                                                } else
                                                    c.logger.error("cannot recover " + t + " error"),
                                                        this._level = void 0,
                                                        this.timer && (clearTimeout(this.timer),
                                                            this.timer = null),
                                                        e.fatal = !0
                                            }
                                        }
                                    }
                                }
                            }
                        }, {
                            key: "onFragLoaded",
                            value: function (e) {
                                var t = e.frag;
                                if (t && "main" === t.type) {
                                    var r = this._levels[t.level];
                                    r && (r.loadError = 0)
                                }
                            }
                        }, {
                            key: "onLevelLoaded",
                            value: function (e) {
                                var t = e.level;
                                if (t === this._level) {
                                    var r = this._levels[t];
                                    r.loadError = 0;
                                    var i = e.details;
                                    if (i.live) {
                                        var a = 1e3 * (i.averagetargetduration ? i.averagetargetduration : i.targetduration)
                                            , n = r.details;
                                        n && i.endSN === n.endSN && (a /= 2,
                                            c.logger.log("same live playlist, reload twice faster")),
                                            a -= performance.now() - e.stats.trequest,
                                            a = Math.max(1e3, Math.round(a)),
                                            c.logger.log("live playlist, reload in " + a + " ms"),
                                            this.timer = setTimeout(this.ontick, a)
                                    } else
                                        this.timer = null
                                }
                            }
                        }, {
                            key: "tick",
                            value: function () {
                                var e = this._level;
                                if (void 0 !== e && this.canload) {
                                    var t = this._levels[e];
                                    if (t && t.url) {
                                        var r = t.urlId;
                                        this.hls.trigger(u.default.LEVEL_LOADING, {
                                            url: t.url[r],
                                            level: e,
                                            id: r
                                        })
                                    }
                                }
                            }
                        }, {
                            key: "levels",
                            get: function () {
                                return this._levels
                            }
                        }, {
                            key: "level",
                            get: function () {
                                return this._level
                            },
                            set: function (e) {
                                var t = this._levels;
                                t && t.length > e && (this._level === e && void 0 !== t[e].details || this.setLevelInternal(e))
                            }
                        }, {
                            key: "manualLevel",
                            get: function () {
                                return this._manualLevel
                            },
                            set: function (e) {
                                this._manualLevel = e,
                                    void 0 === this._startLevel && (this._startLevel = e),
                                    e !== -1 && (this.level = e)
                            }
                        }, {
                            key: "firstLevel",
                            get: function () {
                                return this._firstLevel
                            },
                            set: function (e) {
                                this._firstLevel = e
                            }
                        }, {
                            key: "startLevel",
                            get: function () {
                                if (void 0 === this._startLevel) {
                                    var e = this.hls.config.startLevel;
                                    return void 0 !== e ? e : this._firstLevel
                                }
                                return this._startLevel
                            },
                            set: function (e) {
                                this._startLevel = e
                            }
                        }, {
                            key: "nextLoadLevel",
                            get: function () {
                                return this._manualLevel !== -1 ? this._manualLevel : this.hls.nextAutoLevel
                            },
                            set: function (e) {
                                this.level = e,
                                    this._manualLevel === -1 && (this.hls.nextAutoLevel = e)
                            }
                        }]),
                        t
                }(f.default);
            r.default = p
        }
            , {
            31: 31,
            32: 32,
            33: 33,
            35: 35,
            51: 51
        }],
        13: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , l = e(46)
                , u = i(l)
                , d = e(35)
                , f = i(d)
                , c = e(25)
                , h = i(c)
                , g = e(33)
                , v = i(g)
                , p = e(32)
                , y = i(p)
                , m = e(36)
                , E = i(m)
                , b = e(52)
                , T = i(b)
                , _ = e(31)
                , k = e(51)
                , R = {
                    STOPPED: "STOPPED",
                    IDLE: "IDLE",
                    KEY_LOADING: "KEY_LOADING",
                    FRAG_LOADING: "FRAG_LOADING",
                    FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
                    WAITING_LEVEL: "WAITING_LEVEL",
                    PARSING: "PARSING",
                    PARSED: "PARSED",
                    BUFFER_FLUSHING: "BUFFER_FLUSHING",
                    ENDED: "ENDED",
                    ERROR: "ERROR"
                }
                , A = function (e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, v.default.MEDIA_ATTACHED, v.default.MEDIA_DETACHING, v.default.MANIFEST_LOADING, v.default.MANIFEST_PARSED, v.default.LEVEL_LOADED, v.default.KEY_LOADED, v.default.FRAG_LOADED, v.default.FRAG_LOAD_EMERGENCY_ABORTED, v.default.FRAG_PARSING_INIT_SEGMENT, v.default.FRAG_PARSING_DATA, v.default.FRAG_PARSED, v.default.ERROR, v.default.AUDIO_TRACK_SWITCHING, v.default.AUDIO_TRACK_SWITCHED, v.default.BUFFER_CREATED, v.default.BUFFER_APPENDED, v.default.BUFFER_FLUSHED));
                        return r.config = e.config,
                            r.audioCodecSwap = !1,
                            r.ticks = 0,
                            r._state = R.STOPPED,
                            r.ontick = r.tick.bind(r),
                            r
                    }
                    return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function () {
                                this.stopLoad(),
                                    this.timer && (clearInterval(this.timer),
                                        this.timer = null),
                                    y.default.prototype.destroy.call(this),
                                    this.state = R.STOPPED
                            }
                        }, {
                            key: "startLoad",
                            value: function (e) {
                                if (this.levels) {
                                    var t = this.lastCurrentTime
                                        , r = this.hls;
                                    if (this.stopLoad(),
                                        this.timer || (this.timer = setInterval(this.ontick, 100)),
                                        this.level = -1,
                                        this.fragLoadError = 0,
                                        !this.startFragRequested) {
                                        var i = r.startLevel;
                                        i === -1 && (i = 0,
                                            this.bitrateTest = !0),
                                            this.level = r.nextLoadLevel = i,
                                            this.loadedmetadata = !1
                                    }
                                    t > 0 && e === -1 && (k.logger.log("override startPosition with lastCurrentTime @" + t.toFixed(3)),
                                        e = t),
                                        this.state = R.IDLE,
                                        this.nextLoadPosition = this.startPosition = this.lastCurrentTime = e,
                                        this.tick()
                                } else
                                    this.forceStartLoad = !0,
                                        this.state = R.STOPPED
                            }
                        }, {
                            key: "stopLoad",
                            value: function () {
                                var e = this.fragCurrent;
                                e && (e.loader && e.loader.abort(),
                                    this.fragCurrent = null),
                                    this.fragPrevious = null,
                                    this.demuxer && (this.demuxer.destroy(),
                                        this.demuxer = null),
                                    this.state = R.STOPPED,
                                    this.forceStartLoad = !1
                            }
                        }, {
                            key: "tick",
                            value: function () {
                                1 === ++this.ticks && (this.doTick(),
                                    this.ticks > 1 && setTimeout(this.tick, 1),
                                    this.ticks = 0)
                            }
                        }, {
                            key: "doTick",
                            value: function () {
                                switch (this.state) {
                                    case R.ERROR:
                                        break;
                                    case R.BUFFER_FLUSHING:
                                        this.fragLoadError = 0;
                                        break;
                                    case R.IDLE:
                                        this._doTickIdle();
                                        break;
                                    case R.WAITING_LEVEL:
                                        var e = this.levels[this.level];
                                        e && e.details && (this.state = R.IDLE);
                                        break;
                                    case R.FRAG_LOADING_WAITING_RETRY:
                                        var t = performance.now()
                                            , r = this.retryDate;
                                        (!r || t >= r || this.media && this.media.seeking) && (k.logger.log("mediaController: retryDate reached, switch back to IDLE state"),
                                            this.state = R.IDLE);
                                        break;
                                    case R.ERROR:
                                    case R.STOPPED:
                                    case R.FRAG_LOADING:
                                    case R.PARSING:
                                    case R.PARSED:
                                    case R.ENDED:
                                }
                                this._checkBuffer(),
                                    this._checkFragmentChanged()
                            }
                        }, {
                            key: "_doTickIdle",
                            value: function () {
                                var e = this.hls
                                    , t = e.config
                                    , r = this.media;
                                if (void 0 === this.levelLastLoaded || r || !this.startFragRequested && t.startFragPrefetch) {
                                    var i = void 0;
                                    i = this.loadedmetadata ? r.currentTime : this.nextLoadPosition;
                                    var a = e.nextLoadLevel
                                        , n = this.levels[a]
                                        , s = n.bitrate
                                        , o = void 0;
                                    o = s ? Math.max(8 * t.maxBufferSize / s, t.maxBufferLength) : t.maxBufferLength,
                                        o = Math.min(o, t.maxMaxBufferLength);
                                    var l = f.default.bufferInfo(this.mediaBuffer ? this.mediaBuffer : r, i, t.maxBufferHole)
                                        , u = l.len;
                                    if (!(u >= o)) {
                                        k.logger.trace("buffer length of " + u.toFixed(3) + " is below max of " + o.toFixed(3) + ". checking for more payload ..."),
                                            this.level = e.nextLoadLevel = a;
                                        var d = n.details;
                                        if (void 0 === d || d.live && this.levelLastLoaded !== a)
                                            return void (this.state = R.WAITING_LEVEL);
                                        var c = this.fragPrevious;
                                        if (!d.live && c && c.sn === d.endSN) {
                                            if (Math.min(r.duration, c.start + c.duration) - Math.max(l.end, c.start) <= Math.max(.2, c.duration / 2)) {
                                                var h = {};
                                                return this.altAudio && (h.type = "video"),
                                                    this.hls.trigger(v.default.BUFFER_EOS, h),
                                                    void (this.state = R.ENDED)
                                            }
                                        }
                                        this._fetchPayloadOrEos(i, l, d)
                                    }
                                }
                            }
                        }, {
                            key: "_fetchPayloadOrEos",
                            value: function (e, t, r) {
                                var i = this.fragPrevious
                                    , a = this.level
                                    , n = r.fragments
                                    , s = n.length;
                                if (0 !== s) {
                                    var o = n[0].start
                                        , l = n[s - 1].start + n[s - 1].duration
                                        , u = t.end
                                        , d = void 0;
                                    if (r.initSegment && !r.initSegment.data)
                                        d = r.initSegment;
                                    else if (r.live) {
                                        var f = this.config.initialLiveManifestSize;
                                        if (s < f)
                                            return void k.logger.warn("Can not start playback of a level, reason: not enough fragments " + s + " < " + f);
                                        if (null === (d = this._ensureFragmentAtLivePoint(r, u, o, l, i, n, s)))
                                            return
                                    } else
                                        u < o && (d = n[0]);
                                    d || (d = this._findFragment(o, i, s, n, u, l, r)),
                                        d && this._loadFragmentOrKey(d, a, r, e, u)
                                }
                            }
                        }, {
                            key: "_ensureFragmentAtLivePoint",
                            value: function (e, t, r, i, a, n, s) {
                                var o = this.hls.config
                                    , l = this.media
                                    , u = void 0
                                    , d = void 0 !== o.liveMaxLatencyDuration ? o.liveMaxLatencyDuration : o.liveMaxLatencyDurationCount * e.targetduration;
                                if (t < Math.max(r - o.maxFragLookUpTolerance, i - d)) {
                                    var f = this.liveSyncPosition = this.computeLivePosition(r, e);
                                    k.logger.log("buffer end: " + t.toFixed(3) + " is located too far from the end of live sliding playlist, reset currentTime to : " + f.toFixed(3)),
                                        t = f,
                                        l && l.readyState && l.duration > f && (l.currentTime = f)
                                }
                                if (e.PTSKnown && t > i && l && l.readyState)
                                    return null;
                                if (this.startFragRequested && !e.PTSKnown) {
                                    if (a) {
                                        var c = a.sn + 1;
                                        c >= e.startSN && c <= e.endSN && (u = n[c - e.startSN],
                                            k.logger.log("live playlist, switching playlist, load frag with next SN: " + u.sn))
                                    }
                                    u || (u = n[Math.min(s - 1, Math.round(s / 2))],
                                        k.logger.log("live playlist, switching playlist, unknown, load middle frag : " + u.sn))
                                }
                                return u
                            }
                        }, {
                            key: "_findFragment",
                            value: function (e, t, r, i, a, n, s) {
                                var o = this.hls.config
                                    , l = void 0
                                    , d = void 0
                                    , f = o.maxFragLookUpTolerance
                                    , c = t ? i[t.sn - i[0].sn + 1] : void 0
                                    , h = function (e) {
                                        var t = Math.min(f, e.duration);
                                        return e.start + e.duration - t <= a ? 1 : e.start - t > a && e.start ? -1 : 0
                                    };
                                if (a < n ? (a > n - f && (f = 0),
                                    d = c && !h(c) ? c : u.default.search(i, h)) : d = i[r - 1],
                                    d) {
                                    l = d;
                                    var g = l.sn - s.startSN
                                        , v = t && l.level === t.level
                                        , p = i[g - 1]
                                        , y = i[g + 1];
                                    if (v && l.sn === t.sn)
                                        if (l.sn < s.endSN) {
                                            var m = t.deltaPTS;
                                            m && m > o.maxBufferHole && t.dropped && g ? (l = p,
                                                k.logger.warn("SN just loaded, with large PTS gap between audio and video, maybe frag is not starting with a keyframe ? load previous one to try to overcome this"),
                                                t.loadCounter--) : (l = y,
                                                    k.logger.log("SN just loaded, load next one: " + l.sn))
                                        } else
                                            l = null;
                                    else
                                        l.dropped && !v && (y && y.backtracked ? (k.logger.warn("Already backtracked from fragment " + (g + 1) + ", will not backtrack to fragment " + g + ". Loading fragment " + (g + 1)),
                                            l = y) : (k.logger.warn("Loaded fragment with dropped frames, backtracking 1 segment to find a keyframe"),
                                                l.dropped = 0,
                                                p ? (p.loadCounter && p.loadCounter--,
                                                    l = p) : l = null))
                                }
                                return l
                            }
                        }, {
                            key: "_loadFragmentOrKey",
                            value: function (e, t, r, i, a) {
                                var n = this.hls
                                    , s = n.config;
                                if (!e.decryptdata || null == e.decryptdata.uri || null != e.decryptdata.key) {
                                    if (k.logger.log("Loading " + e.sn + " of [" + r.startSN + " ," + r.endSN + "],level " + t + ", currentTime:" + i.toFixed(3) + ",bufferEnd:" + a.toFixed(3)),
                                        void 0 !== this.fragLoadIdx ? this.fragLoadIdx++ : this.fragLoadIdx = 0,
                                        e.loadCounter) {
                                        e.loadCounter++;
                                        var o = s.fragLoadingLoopThreshold;
                                        if (e.loadCounter > o && Math.abs(this.fragLoadIdx - e.loadIdx) < o)
                                            return void n.trigger(v.default.ERROR, {
                                                type: _.ErrorTypes.MEDIA_ERROR,
                                                details: _.ErrorDetails.FRAG_LOOP_LOADING_ERROR,
                                                fatal: !1,
                                                frag: e
                                            })
                                    } else
                                        e.loadCounter = 1;
                                    return e.loadIdx = this.fragLoadIdx,
                                        this.fragCurrent = e,
                                        this.startFragRequested = !0,
                                        isNaN(e.sn) || (this.nextLoadPosition = e.start + e.duration),
                                        e.autoLevel = n.autoLevelEnabled,
                                        e.bitrateTest = this.bitrateTest,
                                        n.trigger(v.default.FRAG_LOADING, {
                                            frag: e
                                        }),
                                        this.demuxer || (this.demuxer = new h.default(n, "main")),
                                        void (this.state = R.FRAG_LOADING)
                                }
                                k.logger.log("Loading key for " + e.sn + " of [" + r.startSN + " ," + r.endSN + "],level " + t),
                                    this.state = R.KEY_LOADING,
                                    n.trigger(v.default.KEY_LOADING, {
                                        frag: e
                                    })
                            }
                        }, {
                            key: "getBufferedFrag",
                            value: function (e) {
                                return u.default.search(this._bufferedFrags, function (t) {
                                    return e < t.startPTS ? -1 : e > t.endPTS ? 1 : 0
                                })
                            }
                        }, {
                            key: "followingBufferedFrag",
                            value: function (e) {
                                return e ? this.getBufferedFrag(e.endPTS + .5) : null
                            }
                        }, {
                            key: "_checkFragmentChanged",
                            value: function () {
                                var e, t, r = this.media;
                                if (r && r.readyState && r.seeking === !1 && (t = r.currentTime,
                                    t > r.playbackRate * this.lastCurrentTime && (this.lastCurrentTime = t),
                                    f.default.isBuffered(r, t) ? e = this.getBufferedFrag(t) : f.default.isBuffered(r, t + .1) && (e = this.getBufferedFrag(t + .1)),
                                    e)) {
                                    var i = e;
                                    if (i !== this.fragPlaying) {
                                        this.hls.trigger(v.default.FRAG_CHANGED, {
                                            frag: i
                                        });
                                        var a = i.level;
                                        this.fragPlaying && this.fragPlaying.level === a || this.hls.trigger(v.default.LEVEL_SWITCHED, {
                                            level: a
                                        }),
                                            this.fragPlaying = i
                                    }
                                }
                            }
                        }, {
                            key: "immediateLevelSwitch",
                            value: function () {
                                if (k.logger.log("immediateLevelSwitch"),
                                    !this.immediateSwitch) {
                                    this.immediateSwitch = !0;
                                    var e = this.media
                                        , t = void 0;
                                    e ? (t = e.paused,
                                        e.pause()) : t = !0,
                                        this.previouslyPaused = t
                                }
                                var r = this.fragCurrent;
                                r && r.loader && r.loader.abort(),
                                    this.fragCurrent = null,
                                    this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold,
                                    this.flushMainBuffer(0, Number.POSITIVE_INFINITY)
                            }
                        }, {
                            key: "immediateLevelSwitchEnd",
                            value: function () {
                                var e = this.media;
                                e && e.buffered.length && (this.immediateSwitch = !1,
                                    f.default.isBuffered(e, e.currentTime) && (e.currentTime -= 1e-4),
                                    this.previouslyPaused || e.play())
                            }
                        }, {
                            key: "nextLevelSwitch",
                            value: function () {
                                var e = this.media;
                                if (e && e.readyState) {
                                    var t = void 0
                                        , r = void 0
                                        , i = void 0;
                                    if (this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold,
                                        r = this.getBufferedFrag(e.currentTime),
                                        r && r.startPTS > 1 && this.flushMainBuffer(0, r.startPTS - 1),
                                        e.paused)
                                        t = 0;
                                    else {
                                        var a = this.hls.nextLoadLevel
                                            , n = this.levels[a]
                                            , s = this.fragLastKbps;
                                        t = s && this.fragCurrent ? this.fragCurrent.duration * n.bitrate / (1e3 * s) + 1 : 0
                                    }
                                    if ((i = this.getBufferedFrag(e.currentTime + t)) && (i = this.followingBufferedFrag(i))) {
                                        var o = this.fragCurrent;
                                        o && o.loader && o.loader.abort(),
                                            this.fragCurrent = null,
                                            this.flushMainBuffer(i.startPTS, Number.POSITIVE_INFINITY)
                                    }
                                }
                            }
                        }, {
                            key: "flushMainBuffer",
                            value: function (e, t) {
                                this.state = R.BUFFER_FLUSHING;
                                var r = {
                                    startOffset: e,
                                    endOffset: t
                                };
                                this.altAudio && (r.type = "video"),
                                    this.hls.trigger(v.default.BUFFER_FLUSHING, r)
                            }
                        }, {
                            key: "onMediaAttached",
                            value: function (e) {
                                var t = this.media = this.mediaBuffer = e.media;
                                this.onvseeking = this.onMediaSeeking.bind(this),
                                    this.onvseeked = this.onMediaSeeked.bind(this),
                                    this.onvended = this.onMediaEnded.bind(this),
                                    t.addEventListener("seeking", this.onvseeking),
                                    t.addEventListener("seeked", this.onvseeked),
                                    t.addEventListener("ended", this.onvended);
                                var r = this.config;
                                this.levels && r.autoStartLoad && this.hls.startLoad(r.startPosition)
                            }
                        }, {
                            key: "onMediaDetaching",
                            value: function () {
                                var e = this.media;
                                e && e.ended && (k.logger.log("MSE detaching and video ended, reset startPosition"),
                                    this.startPosition = this.lastCurrentTime = 0);
                                var t = this.levels;
                                t && t.forEach(function (e) {
                                    e.details && e.details.fragments.forEach(function (e) {
                                        e.loadCounter = void 0,
                                            e.backtracked = void 0
                                    })
                                }),
                                    e && (e.removeEventListener("seeking", this.onvseeking),
                                        e.removeEventListener("seeked", this.onvseeked),
                                        e.removeEventListener("ended", this.onvended),
                                        this.onvseeking = this.onvseeked = this.onvended = null),
                                    this.media = this.mediaBuffer = null,
                                    this.loadedmetadata = !1,
                                    this.stopLoad()
                            }
                        }, {
                            key: "onMediaSeeking",
                            value: function () {
                                var e = this.media
                                    , t = e ? e.currentTime : void 0
                                    , r = this.config;
                                if (k.logger.log("media seeking to " + t.toFixed(3)),
                                    this.state === R.FRAG_LOADING) {
                                    var i = this.mediaBuffer ? this.mediaBuffer : e
                                        , a = f.default.bufferInfo(i, t, this.config.maxBufferHole)
                                        , n = this.fragCurrent;
                                    if (0 === a.len && n) {
                                        var s = r.maxFragLookUpTolerance
                                            , o = n.start - s
                                            , l = n.start + n.duration + s;
                                        t < o || t > l ? (n.loader && (k.logger.log("seeking outside of buffer while fragment load in progress, cancel fragment load"),
                                            n.loader.abort()),
                                            this.fragCurrent = null,
                                            this.fragPrevious = null,
                                            this.state = R.IDLE) : k.logger.log("seeking outside of buffer but within currently loaded fragment range")
                                    }
                                } else
                                    this.state === R.ENDED && (this.state = R.IDLE);
                                e && (this.lastCurrentTime = t),
                                    this.state !== R.FRAG_LOADING && void 0 !== this.fragLoadIdx && (this.fragLoadIdx += 2 * r.fragLoadingLoopThreshold),
                                    this.loadedmetadata || (this.nextLoadPosition = this.startPosition = t),
                                    this.tick()
                            }
                        }, {
                            key: "onMediaSeeked",
                            value: function () {
                                k.logger.log("media seeked to " + this.media.currentTime.toFixed(3)),
                                    this.tick()
                            }
                        }, {
                            key: "onMediaEnded",
                            value: function () {
                                k.logger.log("media ended"),
                                    this.startPosition = this.lastCurrentTime = 0
                            }
                        }, {
                            key: "onManifestLoading",
                            value: function () {
                                k.logger.log("trigger BUFFER_RESET"),
                                    this.hls.trigger(v.default.BUFFER_RESET),
                                    this._bufferedFrags = [],
                                    this.stalled = !1,
                                    this.startPosition = this.lastCurrentTime = 0
                            }
                        }, {
                            key: "onManifestParsed",
                            value: function (e) {
                                var t, r = !1, i = !1;
                                e.levels.forEach(function (e) {
                                    (t = e.audioCodec) && (t.indexOf("mp4a.40.2") !== -1 && (r = !0),
                                        t.indexOf("mp4a.40.5") !== -1 && (i = !0))
                                }),
                                    this.audioCodecSwitch = r && i,
                                    this.audioCodecSwitch && k.logger.log("both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"),
                                    this.levels = e.levels,
                                    this.startLevelLoaded = !1,
                                    this.startFragRequested = !1;
                                var a = this.config;
                                (a.autoStartLoad || this.forceStartLoad) && this.hls.startLoad(a.startPosition)
                            }
                        }, {
                            key: "onLevelLoaded",
                            value: function (e) {
                                var t = e.details
                                    , r = e.level
                                    , i = this.levels[r]
                                    , a = t.totalduration
                                    , n = 0;
                                if (k.logger.log("level " + r + " loaded [" + t.startSN + "," + t.endSN + "],duration:" + a),
                                    this.levelLastLoaded = r,
                                    t.live) {
                                    var s = i.details;
                                    s && t.fragments.length > 0 ? (E.default.mergeDetails(s, t),
                                        n = t.fragments[0].start,
                                        this.liveSyncPosition = this.computeLivePosition(n, s),
                                        t.PTSKnown ? k.logger.log("live playlist sliding:" + n.toFixed(3)) : k.logger.log("live playlist - outdated PTS, unknown sliding")) : (t.PTSKnown = !1,
                                            k.logger.log("live playlist - first load, unknown sliding"))
                                } else
                                    t.PTSKnown = !1;
                                if (i.details = t,
                                    this.hls.trigger(v.default.LEVEL_UPDATED, {
                                        details: t,
                                        level: r
                                    }),
                                    this.startFragRequested === !1) {
                                    if (this.startPosition === -1 || this.lastCurrentTime === -1) {
                                        var o = t.startTimeOffset;
                                        isNaN(o) ? t.live ? (this.startPosition = this.computeLivePosition(n, t),
                                            k.logger.log("configure startPosition to " + this.startPosition)) : this.startPosition = 0 : (o < 0 && (k.logger.log("negative start time offset " + o + ", count from end of last fragment"),
                                                o = n + a + o),
                                                k.logger.log("start time offset found in playlist, adjust startPosition to " + o),
                                                this.startPosition = o),
                                            this.lastCurrentTime = this.startPosition
                                    }
                                    this.nextLoadPosition = this.startPosition
                                }
                                this.state === R.WAITING_LEVEL && (this.state = R.IDLE),
                                    this.tick()
                            }
                        }, {
                            key: "onKeyLoaded",
                            value: function () {
                                this.state === R.KEY_LOADING && (this.state = R.IDLE,
                                    this.tick())
                            }
                        }, {
                            key: "onFragLoaded",
                            value: function (e) {
                                var t = this.fragCurrent
                                    , r = e.frag;
                                if (this.state === R.FRAG_LOADING && t && "main" === r.type && r.level === t.level && r.sn === t.sn) {
                                    var i = e.stats
                                        , a = this.levels[t.level]
                                        , n = a.details;
                                    if (k.logger.log("Loaded  " + t.sn + " of [" + n.startSN + " ," + n.endSN + "],level " + t.level),
                                        this.bitrateTest = !1,
                                        this.stats = i,
                                        r.bitrateTest === !0 && this.hls.nextLoadLevel)
                                        this.state = R.IDLE,
                                            this.startFragRequested = !1,
                                            i.tparsed = i.tbuffered = performance.now(),
                                            this.hls.trigger(v.default.FRAG_BUFFERED, {
                                                stats: i,
                                                frag: t,
                                                id: "main"
                                            }),
                                            this.tick();
                                    else if ("initSegment" === r.sn)
                                        this.state = R.IDLE,
                                            i.tparsed = i.tbuffered = performance.now(),
                                            n.initSegment.data = e.payload,
                                            this.hls.trigger(v.default.FRAG_BUFFERED, {
                                                stats: i,
                                                frag: t,
                                                id: "main"
                                            }),
                                            this.tick();
                                    else {
                                        this.state = R.PARSING;
                                        var s = n.totalduration
                                            , o = t.level
                                            , l = t.sn
                                            , u = this.config.defaultAudioCodec || a.audioCodec;
                                        this.audioCodecSwap && (k.logger.log("swapping playlist audio codec"),
                                            void 0 === u && (u = this.lastAudioCodec),
                                            u && (u = u.indexOf("mp4a.40.5") !== -1 ? "mp4a.40.2" : "mp4a.40.5")),
                                            this.pendingBuffering = !0,
                                            this.appended = !1,
                                            k.logger.log("Parsing " + l + " of [" + n.startSN + " ," + n.endSN + "],level " + o + ", cc " + t.cc);
                                        var d = this.demuxer;
                                        d || (d = this.demuxer = new h.default(this.hls, "main"));
                                        var f = this.media
                                            , c = f && f.seeking
                                            , g = !c && (n.PTSKnown || !n.live)
                                            , p = n.initSegment ? n.initSegment.data : [];
                                        d.push(e.payload, p, u, a.videoCodec, t, s, g, void 0)
                                    }
                                }
                                this.fragLoadError = 0
                            }
                        }, {
                            key: "onFragParsingInitSegment",
                            value: function (e) {
                                var t = this.fragCurrent
                                    , r = e.frag;
                                if (t && "main" === e.id && r.sn === t.sn && r.level === t.level && this.state === R.PARSING) {
                                    var i, a, n = e.tracks;
                                    if (n.audio && this.altAudio && delete n.audio,
                                        a = n.audio) {
                                        var s = this.levels[this.level].audioCodec
                                            , o = navigator.userAgent.toLowerCase();
                                        s && this.audioCodecSwap && (k.logger.log("swapping playlist audio codec"),
                                            s = s.indexOf("mp4a.40.5") !== -1 ? "mp4a.40.2" : "mp4a.40.5"),
                                            this.audioCodecSwitch && 1 !== a.metadata.channelCount && o.indexOf("firefox") === -1 && (s = "mp4a.40.5"),
                                            o.indexOf("android") !== -1 && "audio/mpeg" !== a.container && (s = "mp4a.40.2",
                                                k.logger.log("Android: force audio codec to " + s)),
                                            a.levelCodec = s,
                                            a.id = e.id
                                    }
                                    a = n.video,
                                        a && (a.levelCodec = this.levels[this.level].videoCodec,
                                            a.id = e.id),
                                        this.hls.trigger(v.default.BUFFER_CODECS, n);
                                    for (i in n) {
                                        a = n[i],
                                            k.logger.log("main track:" + i + ",container:" + a.container + ",codecs[level/parsed]=[" + a.levelCodec + "/" + a.codec + "]");
                                        var l = a.initSegment;
                                        l && (this.appended = !0,
                                            this.pendingBuffering = !0,
                                            this.hls.trigger(v.default.BUFFER_APPENDING, {
                                                type: i,
                                                data: l,
                                                parent: "main",
                                                content: "initSegment"
                                            }))
                                    }
                                    this.tick()
                                }
                            }
                        }, {
                            key: "onFragParsingData",
                            value: function (e) {
                                var t = this
                                    , r = this.fragCurrent
                                    , i = e.frag;
                                if (r && "main" === e.id && i.sn === r.sn && i.level === r.level && ("audio" !== e.type || !this.altAudio) && this.state === R.PARSING) {
                                    var a = this.levels[this.level]
                                        , n = r;
                                    if (isNaN(e.endPTS) && (e.endPTS = e.startPTS + r.duration,
                                        e.endDTS = e.startDTS + r.duration),
                                        k.logger.log("Parsed " + e.type + ",PTS:[" + e.startPTS.toFixed(3) + "," + e.endPTS.toFixed(3) + "],DTS:[" + e.startDTS.toFixed(3) + "/" + e.endDTS.toFixed(3) + "],nb:" + e.nb + ",dropped:" + (e.dropped || 0)),
                                        "video" === e.type)
                                        if (n.dropped = e.dropped,
                                            n.dropped) {
                                            if (!n.backtracked)
                                                return n.backtracked = !0,
                                                    this.nextLoadPosition = e.startPTS,
                                                    this.state = R.IDLE,
                                                    void this.tick();
                                            k.logger.warn("Already backtracked on this fragment, appending with the gap")
                                        } else
                                            n.backtracked = !1;
                                    var s = E.default.updateFragPTSDTS(a.details, n, e.startPTS, e.endPTS, e.startDTS, e.endDTS)
                                        , o = this.hls;
                                    o.trigger(v.default.LEVEL_PTS_UPDATED, {
                                        details: a.details,
                                        level: this.level,
                                        drift: s,
                                        type: e.type,
                                        start: e.startPTS,
                                        end: e.endPTS
                                    }),
                                        [e.data1, e.data2].forEach(function (r) {
                                            r && r.length && t.state === R.PARSING && (t.appended = !0,
                                                t.pendingBuffering = !0,
                                                o.trigger(v.default.BUFFER_APPENDING, {
                                                    type: e.type,
                                                    data: r,
                                                    parent: "main",
                                                    content: "data"
                                                }))
                                        }),
                                        this.tick()
                                }
                            }
                        }, {
                            key: "onFragParsed",
                            value: function (e) {
                                var t = this.fragCurrent
                                    , r = e.frag;
                                t && "main" === e.id && r.sn === t.sn && r.level === t.level && this.state === R.PARSING && (this.stats.tparsed = performance.now(),
                                    this.state = R.PARSED,
                                    this._checkAppendedParsed())
                            }
                        }, {
                            key: "onAudioTrackSwitching",
                            value: function (e) {
                                var t = !!e.url
                                    , r = e.id;
                                if (!t) {
                                    if (this.mediaBuffer !== this.media) {
                                        k.logger.log("switching on main audio, use media.buffered to schedule main fragment loading"),
                                            this.mediaBuffer = this.media;
                                        var i = this.fragCurrent;
                                        i.loader && (k.logger.log("switching to main audio track, cancel main fragment load"),
                                            i.loader.abort()),
                                            this.fragCurrent = null,
                                            this.fragPrevious = null,
                                            this.demuxer && (this.demuxer.destroy(),
                                                this.demuxer = null),
                                            this.state = R.IDLE
                                    }
                                    var a = this.hls;
                                    a.trigger(v.default.BUFFER_FLUSHING, {
                                        startOffset: 0,
                                        endOffset: Number.POSITIVE_INFINITY,
                                        type: "audio"
                                    }),
                                        a.trigger(v.default.AUDIO_TRACK_SWITCHED, {
                                            id: r
                                        }),
                                        this.altAudio = !1
                                }
                            }
                        }, {
                            key: "onAudioTrackSwitched",
                            value: function (e) {
                                var t = e.id
                                    , r = !!this.hls.audioTracks[t].url;
                                if (r) {
                                    var i = this.videoBuffer;
                                    i && this.mediaBuffer !== i && (k.logger.log("switching on alternate audio, use video.buffered to schedule main fragment loading"),
                                        this.mediaBuffer = i)
                                }
                                this.altAudio = r,
                                    this.tick()
                            }
                        }, {
                            key: "onBufferCreated",
                            value: function (e) {
                                var t = e.tracks
                                    , r = void 0
                                    , i = void 0
                                    , a = !1;
                                for (var n in t) {
                                    var s = t[n];
                                    "main" === s.id ? (i = n,
                                        r = s,
                                        "video" === n && (this.videoBuffer = t[n].buffer)) : a = !0
                                }
                                a && r ? (k.logger.log("alternate track found, use " + i + ".buffered to schedule main fragment loading"),
                                    this.mediaBuffer = r.buffer) : this.mediaBuffer = this.media
                            }
                        }, {
                            key: "onBufferAppended",
                            value: function (e) {
                                if ("main" === e.parent) {
                                    var t = this.state;
                                    t !== R.PARSING && t !== R.PARSED || (this.pendingBuffering = e.pending > 0,
                                        this._checkAppendedParsed())
                                }
                            }
                        }, {
                            key: "_checkAppendedParsed",
                            value: function () {
                                if (!(this.state !== R.PARSED || this.appended && this.pendingBuffering)) {
                                    var e = this.fragCurrent;
                                    if (e) {
                                        var t = this.mediaBuffer ? this.mediaBuffer : this.media;
                                        k.logger.log("main buffered : " + T.default.toString(t.buffered));
                                        var r = this._bufferedFrags.filter(function (e) {
                                            return f.default.isBuffered(t, (e.startPTS + e.endPTS) / 2)
                                        });
                                        r.push(e),
                                            this._bufferedFrags = r.sort(function (e, t) {
                                                return e.startPTS - t.startPTS
                                            }),
                                            this.fragPrevious = e;
                                        var i = this.stats;
                                        i.tbuffered = performance.now(),
                                            this.fragLastKbps = Math.round(8 * i.total / (i.tbuffered - i.tfirst)),
                                            this.hls.trigger(v.default.FRAG_BUFFERED, {
                                                stats: i,
                                                frag: e,
                                                id: "main"
                                            }),
                                            this.state = R.IDLE
                                    }
                                    this.tick()
                                }
                            }
                        }, {
                            key: "onError",
                            value: function (e) {
                                var t = e.frag || this.fragCurrent;
                                if (!t || "main" === t.type) {
                                    var r = this.media
                                        , i = r && f.default.isBuffered(r, r.currentTime) && f.default.isBuffered(r, r.currentTime + .5);
                                    switch (e.details) {
                                        case _.ErrorDetails.FRAG_LOAD_ERROR:
                                        case _.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                        case _.ErrorDetails.KEY_LOAD_ERROR:
                                        case _.ErrorDetails.KEY_LOAD_TIMEOUT:
                                            if (!e.fatal) {
                                                var a = this.fragLoadError;
                                                a ? a++ : a = 1;
                                                var n = this.config;
                                                if (a <= n.fragLoadingMaxRetry || i || t.autoLevel && t.level) {
                                                    this.fragLoadError = a,
                                                        t.loadCounter = 0;
                                                    var s = Math.min(Math.pow(2, a - 1) * n.fragLoadingRetryDelay, n.fragLoadingMaxRetryTimeout);
                                                    k.logger.warn("mediaController: frag loading failed, retry in " + s + " ms"),
                                                        this.retryDate = performance.now() + s,
                                                        this.loadedmetadata || (this.startFragRequested = !1,
                                                            this.nextLoadPosition = this.startPosition),
                                                        this.state = R.FRAG_LOADING_WAITING_RETRY
                                                } else
                                                    k.logger.error("mediaController: " + e.details + " reaches max retry, redispatch as fatal ..."),
                                                        e.fatal = !0,
                                                        this.state = R.ERROR
                                            }
                                            break;
                                        case _.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
                                            e.fatal || (i ? (this._reduceMaxBufferLength(t.duration),
                                                this.state = R.IDLE) : t.autoLevel && 0 !== t.level || (e.fatal = !0,
                                                    this.state = R.ERROR));
                                            break;
                                        case _.ErrorDetails.LEVEL_LOAD_ERROR:
                                        case _.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                            this.state !== R.ERROR && (e.fatal ? (this.state = R.ERROR,
                                                k.logger.warn("streamController: " + e.details + ",switch to " + this.state + " state ...")) : this.state === R.WAITING_LEVEL && (this.state = R.IDLE));
                                            break;
                                        case _.ErrorDetails.BUFFER_FULL_ERROR:
                                            "main" !== e.parent || this.state !== R.PARSING && this.state !== R.PARSED || (i ? (this._reduceMaxBufferLength(this.config.maxBufferLength),
                                                this.state = R.IDLE) : (k.logger.warn("buffer full error also media.currentTime is not buffered, flush everything"),
                                                    this.fragCurrent = null,
                                                    this.flushMainBuffer(0, Number.POSITIVE_INFINITY)))
                                    }
                                }
                            }
                        }, {
                            key: "_reduceMaxBufferLength",
                            value: function (e) {
                                var t = this.config;
                                t.maxMaxBufferLength >= e && (t.maxMaxBufferLength /= 2,
                                    k.logger.warn("main:reduce max buffer length to " + t.maxMaxBufferLength + "s"),
                                    this.fragLoadIdx += 2 * t.fragLoadingLoopThreshold)
                            }
                        }, {
                            key: "_checkBuffer",
                            value: function () {
                                var e = this.media;
                                if (e && e.readyState) {
                                    var t = e.currentTime
                                        , r = this.mediaBuffer ? this.mediaBuffer : e
                                        , i = r.buffered;
                                    if (!this.loadedmetadata && i.length) {
                                        this.loadedmetadata = !0;
                                        var a = e.seeking ? t : this.startPosition
                                            , n = f.default.isBuffered(r, a);
                                        t === a && n || (k.logger.log("target start position:" + a),
                                            n || (a = i.start(0),
                                                k.logger.log("target start position not buffered, seek to buffered.start(0) " + a)),
                                            k.logger.log("adjust currentTime from " + t + " to " + a),
                                            e.currentTime = a)
                                    } else if (this.immediateSwitch)
                                        this.immediateLevelSwitchEnd();
                                    else {
                                        var s = f.default.bufferInfo(e, t, 0)
                                            , o = !(e.paused || e.ended || 0 === e.buffered.length)
                                            , l = t !== this.lastCurrentTime
                                            , u = this.config;
                                        if (l)
                                            this.stallReported && (k.logger.warn("playback not stuck anymore @" + t + ", after " + Math.round(performance.now() - this.stalled) + "ms"),
                                                this.stallReported = !1),
                                                this.stalled = void 0,
                                                this.nudgeRetry = 0;
                                        else if (o) {
                                            var d = performance.now()
                                                , c = this.hls;
                                            if (this.stalled) {
                                                var h = d - this.stalled
                                                    , g = s.len
                                                    , p = this.nudgeRetry || 0;
                                                if (g <= .5 && h > 1e3 * u.lowBufferWatchdogPeriod) {
                                                    this.stallReported || (this.stallReported = !0,
                                                        k.logger.warn("playback stalling in low buffer @" + t),
                                                        c.trigger(v.default.ERROR, {
                                                            type: _.ErrorTypes.MEDIA_ERROR,
                                                            details: _.ErrorDetails.BUFFER_STALLED_ERROR,
                                                            fatal: !1,
                                                            buffer: g
                                                        }));
                                                    var y = s.nextStart
                                                        , m = y - t;
                                                    if (y && m < u.maxSeekHole && m > 0) {
                                                        this.nudgeRetry = ++p;
                                                        var E = p * u.nudgeOffset;
                                                        k.logger.log("adjust currentTime from " + e.currentTime + " to next buffered @ " + y + " + nudge " + E),
                                                            e.currentTime = y + E,
                                                            this.stalled = void 0,
                                                            c.trigger(v.default.ERROR, {
                                                                type: _.ErrorTypes.MEDIA_ERROR,
                                                                details: _.ErrorDetails.BUFFER_SEEK_OVER_HOLE,
                                                                fatal: !1,
                                                                hole: y + E - t
                                                            })
                                                    }
                                                } else if (g > .5 && h > 1e3 * u.highBufferWatchdogPeriod)
                                                    if (this.stallReported || (this.stallReported = !0,
                                                        k.logger.warn("playback stalling in high buffer @" + t),
                                                        c.trigger(v.default.ERROR, {
                                                            type: _.ErrorTypes.MEDIA_ERROR,
                                                            details: _.ErrorDetails.BUFFER_STALLED_ERROR,
                                                            fatal: !1,
                                                            buffer: g
                                                        })),
                                                        this.stalled = void 0,
                                                        this.nudgeRetry = ++p,
                                                        p < u.nudgeMaxRetry) {
                                                        var b = e.currentTime
                                                            , T = b + p * u.nudgeOffset;
                                                        k.logger.log("adjust currentTime from " + b + " to " + T),
                                                            e.currentTime = T,
                                                            c.trigger(v.default.ERROR, {
                                                                type: _.ErrorTypes.MEDIA_ERROR,
                                                                details: _.ErrorDetails.BUFFER_NUDGE_ON_STALL,
                                                                fatal: !1
                                                            })
                                                    } else
                                                        k.logger.error("still stuck in high buffer @" + t + " after " + u.nudgeMaxRetry + ", raise fatal error"),
                                                            c.trigger(v.default.ERROR, {
                                                                type: _.ErrorTypes.MEDIA_ERROR,
                                                                details: _.ErrorDetails.BUFFER_STALLED_ERROR,
                                                                fatal: !0
                                                            })
                                            } else
                                                this.stalled = d,
                                                    this.stallReported = !1
                                        }
                                    }
                                }
                            }
                        }, {
                            key: "onFragLoadEmergencyAborted",
                            value: function () {
                                this.state = R.IDLE,
                                    this.loadedmetadata || (this.startFragRequested = !1,
                                        this.nextLoadPosition = this.startPosition),
                                    this.tick()
                            }
                        }, {
                            key: "onBufferFlushed",
                            value: function () {
                                var e = this.mediaBuffer ? this.mediaBuffer : this.media;
                                this._bufferedFrags = this._bufferedFrags.filter(function (t) {
                                    return f.default.isBuffered(e, (t.startPTS + t.endPTS) / 2)
                                }),
                                    this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold,
                                    this.state = R.IDLE,
                                    this.fragPrevious = null
                            }
                        }, {
                            key: "swapAudioCodec",
                            value: function () {
                                this.audioCodecSwap = !this.audioCodecSwap
                            }
                        }, {
                            key: "computeLivePosition",
                            value: function (e, t) {
                                var r = void 0 !== this.config.liveSyncDuration ? this.config.liveSyncDuration : this.config.liveSyncDurationCount * t.targetduration;
                                return e + Math.max(0, t.totalduration - r)
                            }
                        }, {
                            key: "state",
                            set: function (e) {
                                if (this.state !== e) {
                                    var t = this.state;
                                    this._state = e,
                                        k.logger.log("main stream:" + t + "->" + e),
                                        this.hls.trigger(v.default.STREAM_STATE_TRANSITION, {
                                            previousState: t,
                                            nextState: e
                                        })
                                }
                            },
                            get: function () {
                                return this._state
                            }
                        }, {
                            key: "currentLevel",
                            get: function () {
                                var e = this.media;
                                if (e) {
                                    var t = this.getBufferedFrag(e.currentTime);
                                    if (t)
                                        return t.level
                                }
                                return -1
                            }
                        }, {
                            key: "nextBufferedFrag",
                            get: function () {
                                var e = this.media;
                                return e ? this.followingBufferedFrag(this.getBufferedFrag(e.currentTime)) : null
                            }
                        }, {
                            key: "nextLevel",
                            get: function () {
                                var e = this.nextBufferedFrag;
                                return e ? e.level : -1
                            }
                        }, {
                            key: "liveSyncPosition",
                            get: function () {
                                return this._liveSyncPosition
                            },
                            set: function (e) {
                                this._liveSyncPosition = e
                            }
                        }]),
                        t
                }(y.default);
            r.default = A
        }
            , {
            25: 25,
            31: 31,
            32: 32,
            33: 33,
            35: 35,
            36: 36,
            46: 46,
            51: 51,
            52: 52
        }],
        14: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , l = e(33)
                , u = i(l)
                , d = e(32)
                , f = i(d)
                , c = e(51)
                , h = function (e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.ERROR, u.default.SUBTITLE_TRACKS_UPDATED, u.default.SUBTITLE_TRACK_SWITCH, u.default.SUBTITLE_TRACK_LOADED, u.default.SUBTITLE_FRAG_PROCESSED));
                        return r.config = e.config,
                            r.vttFragSNsProcessed = {},
                            r.vttFragQueues = void 0,
                            r.currentlyProcessing = null,
                            r.currentTrackId = -1,
                            r
                    }
                    return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function () {
                                f.default.prototype.destroy.call(this)
                            }
                        }, {
                            key: "clearVttFragQueues",
                            value: function () {
                                var e = this;
                                this.vttFragQueues = {},
                                    this.tracks.forEach(function (t) {
                                        e.vttFragQueues[t.id] = []
                                    })
                            }
                        }, {
                            key: "nextFrag",
                            value: function () {
                                if (null === this.currentlyProcessing && this.currentTrackId > -1 && this.vttFragQueues[this.currentTrackId].length) {
                                    var e = this.currentlyProcessing = this.vttFragQueues[this.currentTrackId].shift();
                                    this.hls.trigger(u.default.FRAG_LOADING, {
                                        frag: e
                                    })
                                }
                            }
                        }, {
                            key: "onSubtitleFragProcessed",
                            value: function (e) {
                                e.success && this.vttFragSNsProcessed[e.frag.trackId].push(e.frag.sn),
                                    this.currentlyProcessing = null,
                                    this.nextFrag()
                            }
                        }, {
                            key: "onError",
                            value: function (e) {
                                var t = e.frag;
                                t && "subtitle" !== t.type || this.currentlyProcessing && (this.currentlyProcessing = null,
                                    this.nextFrag())
                            }
                        }, {
                            key: "onSubtitleTracksUpdated",
                            value: function (e) {
                                var t = this;
                                c.logger.log("subtitle tracks updated"),
                                    this.tracks = e.subtitleTracks,
                                    this.clearVttFragQueues(),
                                    this.vttFragSNsProcessed = {},
                                    this.tracks.forEach(function (e) {
                                        t.vttFragSNsProcessed[e.id] = []
                                    })
                            }
                        }, {
                            key: "onSubtitleTrackSwitch",
                            value: function (e) {
                                this.currentTrackId = e.id,
                                    this.clearVttFragQueues()
                            }
                        }, {
                            key: "onSubtitleTrackLoaded",
                            value: function (e) {
                                var t = this.vttFragSNsProcessed[e.id]
                                    , r = this.vttFragQueues[e.id]
                                    , i = this.currentlyProcessing ? this.currentlyProcessing.sn : -1
                                    , a = function (e) {
                                        return t.indexOf(e.sn) > -1
                                    }
                                    , n = function (e) {
                                        return r.some(function (t) {
                                            return t.sn === e.sn
                                        })
                                    };
                                e.details.fragments.forEach(function (t) {
                                    a(t) || t.sn === i || n(t) || (t.trackId = e.id,
                                        r.push(t))
                                }),
                                    this.nextFrag()
                            }
                        }]),
                        t
                }(f.default);
            r.default = h
        }
            , {
            32: 32,
            33: 33,
            51: 51
        }],
        15: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            function o(e) {
                for (var t = [], r = 0; r < e.length; r++)
                    "subtitles" === e[r].kind && t.push(e[r]);
                return t
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var l = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , u = e(33)
                , d = i(u)
                , f = e(32)
                , c = i(f)
                , h = e(51)
                , g = function (e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, d.default.MEDIA_ATTACHED, d.default.MEDIA_DETACHING, d.default.MANIFEST_LOADING, d.default.MANIFEST_LOADED, d.default.SUBTITLE_TRACK_LOADED));
                        return r.tracks = [],
                            r.trackId = -1,
                            r.media = void 0,
                            r
                    }
                    return s(t, e),
                        l(t, [{
                            key: "destroy",
                            value: function () {
                                c.default.prototype.destroy.call(this)
                            }
                        }, {
                            key: "onMediaAttached",
                            value: function (e) {
                                var t = this;
                                this.media = e.media,
                                    this.media && this.media.textTracks.addEventListener("change", function () {
                                        if (t.media) {
                                            for (var e = -1, r = o(t.media.textTracks), i = 0; i < r.length; i++)
                                                "showing" === r[i].mode && (e = i);
                                            t.subtitleTrack = e
                                        }
                                    })
                            }
                        }, {
                            key: "onMediaDetaching",
                            value: function () {
                                this.media = void 0
                            }
                        }, {
                            key: "onManifestLoading",
                            value: function () {
                                this.tracks = [],
                                    this.trackId = -1
                            }
                        }, {
                            key: "onManifestLoaded",
                            value: function (e) {
                                var t = this
                                    , r = e.subtitles || []
                                    , i = !1;
                                this.tracks = r,
                                    this.trackId = -1,
                                    this.hls.trigger(d.default.SUBTITLE_TRACKS_UPDATED, {
                                        subtitleTracks: r
                                    }),
                                    r.forEach(function (e) {
                                        e.default && (t.subtitleTrack = e.id,
                                            i = !0)
                                    })
                            }
                        }, {
                            key: "onTick",
                            value: function () {
                                var e = this.trackId
                                    , t = this.tracks[e];
                                if (t) {
                                    var r = t.details;
                                    void 0 !== r && r.live !== !0 || (h.logger.log("(re)loading playlist for subtitle track " + e),
                                        this.hls.trigger(d.default.SUBTITLE_TRACK_LOADING, {
                                            url: t.url,
                                            id: e
                                        }))
                                }
                            }
                        }, {
                            key: "onSubtitleTrackLoaded",
                            value: function (e) {
                                var t = this;
                                e.id < this.tracks.length && (h.logger.log("subtitle track " + e.id + " loaded"),
                                    this.tracks[e.id].details = e.details,
                                    e.details.live && !this.timer && (this.timer = setInterval(function () {
                                        t.onTick()
                                    }, 1e3 * e.details.targetduration, this)),
                                    !e.details.live && this.timer && (clearInterval(this.timer),
                                        this.timer = null))
                            }
                        }, {
                            key: "setSubtitleTrackInternal",
                            value: function (e) {
                                if (e >= 0 && e < this.tracks.length) {
                                    this.timer && (clearInterval(this.timer),
                                        this.timer = null),
                                        this.trackId = e,
                                        h.logger.log("switching to subtitle track " + e);
                                    var t = this.tracks[e];
                                    this.hls.trigger(d.default.SUBTITLE_TRACK_SWITCH, {
                                        id: e
                                    });
                                    var r = t.details;
                                    void 0 !== r && r.live !== !0 || (h.logger.log("(re)loading playlist for subtitle track " + e),
                                        this.hls.trigger(d.default.SUBTITLE_TRACK_LOADING, {
                                            url: t.url,
                                            id: e
                                        }))
                                }
                            }
                        }, {
                            key: "subtitleTracks",
                            get: function () {
                                return this.tracks
                            }
                        }, {
                            key: "subtitleTrack",
                            get: function () {
                                return this.trackId
                            },
                            set: function (e) {
                                this.trackId !== e && this.setSubtitleTrackInternal(e)
                            }
                        }]),
                        t
                }(c.default);
            r.default = g
        }
            , {
            32: 32,
            33: 33,
            51: 51
        }],
        16: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            function o(e) {
                if (e && e.cues)
                    for (; e.cues.length > 0;)
                        e.removeCue(e.cues[0])
            }
            function l(e, t) {
                return e && e.label === t.name && !(e.textTrack1 || e.textTrack2)
            }
            function u(e, t, r, i) {
                return Math.min(t, i) - Math.max(e, r)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var d = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , f = e(33)
                , c = i(f)
                , h = e(32)
                , g = i(h)
                , v = e(47)
                , p = i(v)
                , y = e(55)
                , m = i(y)
                , E = e(51)
                , b = function (e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, c.default.MEDIA_ATTACHING, c.default.MEDIA_DETACHING, c.default.FRAG_PARSING_USERDATA, c.default.MANIFEST_LOADING, c.default.MANIFEST_LOADED, c.default.FRAG_LOADED, c.default.LEVEL_SWITCHING, c.default.INIT_PTS_FOUND));
                        if (r.hls = e,
                            r.config = e.config,
                            r.enabled = !0,
                            r.Cues = e.config.cueHandler,
                            r.textTracks = [],
                            r.tracks = [],
                            r.unparsedVttFrags = [],
                            r.initPTS = void 0,
                            r.cueRanges = [],
                            r.config.enableCEA708Captions) {
                            var i = r
                                , s = function (e, t) {
                                    var r = null;
                                    try {
                                        r = new window.Event("addtrack")
                                    } catch (e) {
                                        r = document.createEvent("Event"),
                                            r.initEvent("addtrack", !1, !1)
                                    }
                                    r.track = e,
                                        t.dispatchEvent(r)
                                }
                                , l = {
                                    newCue: function (e, t, r) {
                                        if (!i.textTrack1) {
                                            var a = i.getExistingTrack("1");
                                            if (a)
                                                i.textTrack1 = a,
                                                    o(i.textTrack1),
                                                    s(i.textTrack1, i.media);
                                            else {
                                                var n = i.createTextTrack("captions", i.config.captionsTextTrack1Label, i.config.captionsTextTrack1LanguageCode);
                                                n && (n.textTrack1 = !0,
                                                    i.textTrack1 = n)
                                            }
                                        }
                                        i.addCues("textTrack1", e, t, r)
                                    }
                                }
                                , u = {
                                    newCue: function (e, t, r) {
                                        if (!i.textTrack2) {
                                            var a = i.getExistingTrack("2");
                                            if (a)
                                                i.textTrack2 = a,
                                                    o(i.textTrack2),
                                                    s(i.textTrack2, i.media);
                                            else {
                                                var n = i.createTextTrack("captions", i.config.captionsTextTrack2Label, i.config.captionsTextTrack1LanguageCode);
                                                n && (n.textTrack2 = !0,
                                                    i.textTrack2 = n)
                                            }
                                        }
                                        i.addCues("textTrack2", e, t, r)
                                    }
                                };
                            r.cea608Parser = new p.default(0, l, u)
                        }
                        return r
                    }
                    return s(t, e),
                        d(t, [{
                            key: "addCues",
                            value: function (e, t, r, i) {
                                for (var a = this.cueRanges, n = !1, s = a.length; s--;) {
                                    var o = a[s]
                                        , l = u(o[0], o[1], t, r);
                                    if (l >= 0 && (o[0] = Math.min(o[0], t),
                                        o[1] = Math.max(o[1], r),
                                        n = !0,
                                        l / (r - t) > .5))
                                        return
                                }
                                n || a.push([t, r]),
                                    this.Cues.newCue(this[e], t, r, i)
                            }
                        }, {
                            key: "onInitPtsFound",
                            value: function (e) {
                                var t = this;
                                void 0 === this.initPTS && (this.initPTS = e.initPTS),
                                    this.unparsedVttFrags.length && (this.unparsedVttFrags.forEach(function (e) {
                                        t.onFragLoaded(e)
                                    }),
                                        this.unparsedVttFrags = [])
                            }
                        }, {
                            key: "getExistingTrack",
                            value: function (e) {
                                var t = this.media;
                                if (t)
                                    for (var r = 0; r < t.textTracks.length; r++) {
                                        var i = t.textTracks[r]
                                            , a = "textTrack" + e;
                                        if (i[a] === !0)
                                            return i
                                    }
                                return null
                            }
                        }, {
                            key: "createTextTrack",
                            value: function (e, t, r) {
                                var i = this.media;
                                if (i)
                                    return i.addTextTrack(e, t, r)
                            }
                        }, {
                            key: "destroy",
                            value: function () {
                                g.default.prototype.destroy.call(this)
                            }
                        }, {
                            key: "onMediaAttaching",
                            value: function (e) {
                                this.media = e.media
                            }
                        }, {
                            key: "onMediaDetaching",
                            value: function () {
                                o(this.textTrack1),
                                    o(this.textTrack2)
                            }
                        }, {
                            key: "onManifestLoading",
                            value: function () {
                                this.lastSn = -1,
                                    this.prevCC = -1,
                                    this.vttCCs = {
                                        ccOffset: 0,
                                        presentationOffset: 0
                                    };
                                var e = this.media;
                                if (e) {
                                    var t = e.textTracks;
                                    if (t)
                                        for (var r = 0; r < t.length; r++)
                                            o(t[r])
                                }
                            }
                        }, {
                            key: "onManifestLoaded",
                            value: function (e) {
                                var t = this;
                                if (this.textTracks = [],
                                    this.unparsedVttFrags = this.unparsedVttFrags || [],
                                    this.initPTS = void 0,
                                    this.cueRanges = [],
                                    this.config.enableWebVTT) {
                                    this.tracks = e.subtitles || [];
                                    var r = this.media ? this.media.textTracks : [];
                                    this.tracks.forEach(function (e, i) {
                                        var a = void 0;
                                        if (i < r.length) {
                                            var n = r[i];
                                            l(n, e) && (a = n)
                                        }
                                        a || (a = t.createTextTrack("subtitles", e.name, e.lang)),
                                            a.mode = e.default ? "showing" : "hidden",
                                            t.textTracks.push(a)
                                    })
                                }
                            }
                        }, {
                            key: "onLevelSwitching",
                            value: function () {
                                this.enabled = "NONE" !== this.hls.currentLevel.closedCaptions
                            }
                        }, {
                            key: "onFragLoaded",
                            value: function (e) {
                                var t = e.frag
                                    , r = e.payload;
                                if ("main" === t.type) {
                                    var i = t.sn;
                                    i !== this.lastSn + 1 && this.cea608Parser.reset(),
                                        this.lastSn = i
                                } else if ("subtitle" === t.type)
                                    if (r.byteLength) {
                                        if (void 0 === this.initPTS)
                                            return void this.unparsedVttFrags.push(e);
                                        var a = this.vttCCs;
                                        a[t.cc] || (a[t.cc] = {
                                            start: t.start,
                                            prevCC: this.prevCC,
                                            new: !0
                                        },
                                            this.prevCC = t.cc);
                                        var n = this.textTracks
                                            , s = this.hls;
                                        m.default.parse(r, this.initPTS, a, t.cc, function (e) {
                                            e.forEach(function (e) {
                                                n[t.trackId].addCue(e)
                                            }),
                                                s.trigger(c.default.SUBTITLE_FRAG_PROCESSED, {
                                                    success: !0,
                                                    frag: t
                                                })
                                        }, function (e) {
                                            E.logger.log("Failed to parse VTT cue: " + e),
                                                s.trigger(c.default.SUBTITLE_FRAG_PROCESSED, {
                                                    success: !1,
                                                    frag: t
                                                })
                                        })
                                    } else
                                        this.hls.trigger(c.default.SUBTITLE_FRAG_PROCESSED, {
                                            success: !1,
                                            frag: t
                                        })
                            }
                        }, {
                            key: "onFragParsingUserdata",
                            value: function (e) {
                                if (this.enabled && this.config.enableCEA708Captions)
                                    for (var t = 0; t < e.samples.length; t++) {
                                        var r = this.extractCea608Data(e.samples[t].bytes);
                                        this.cea608Parser.addData(e.samples[t].pts, r)
                                    }
                            }
                        }, {
                            key: "extractCea608Data",
                            value: function (e) {
                                for (var t, r, i, a, n, s = 31 & e[0], o = 2, l = [], u = 0; u < s; u++)
                                    t = e[o++],
                                        r = 127 & e[o++],
                                        i = 127 & e[o++],
                                        a = 0 != (4 & t),
                                        n = 3 & t,
                                        0 === r && 0 === i || a && 0 === n && (l.push(r),
                                            l.push(i));
                                return l
                            }
                        }]),
                        t
                }(g.default);
            r.default = b
        }
            , {
            32: 32,
            33: 33,
            47: 47,
            51: 51,
            55: 55
        }],
        17: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = function () {
                    function e(t, r) {
                        i(this, e),
                            this.subtle = t,
                            this.aesIV = r
                    }
                    return a(e, [{
                        key: "decrypt",
                        value: function (e, t) {
                            return this.subtle.decrypt({
                                name: "AES-CBC",
                                iv: this.aesIV
                            }, t, e)
                        }
                    }]),
                        e
                }();
            r.default = n
        }
            , {}],
        18: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = function () {
                    function e() {
                        i(this, e),
                            this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                            this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)],
                            this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)],
                            this.sBox = new Uint32Array(256),
                            this.invSBox = new Uint32Array(256),
                            this.key = new Uint32Array(0),
                            this.initTable()
                    }
                    return a(e, [{
                        key: "uint8ArrayToUint32Array_",
                        value: function (e) {
                            for (var t = new DataView(e), r = new Uint32Array(4), i = 0; i < 4; i++)
                                r[i] = t.getUint32(4 * i);
                            return r
                        }
                    }, {
                        key: "initTable",
                        value: function () {
                            var e = this.sBox
                                , t = this.invSBox
                                , r = this.subMix
                                , i = r[0]
                                , a = r[1]
                                , n = r[2]
                                , s = r[3]
                                , o = this.invSubMix
                                , l = o[0]
                                , u = o[1]
                                , d = o[2]
                                , f = o[3]
                                , c = new Uint32Array(256)
                                , h = 0
                                , g = 0
                                , v = 0;
                            for (v = 0; v < 256; v++)
                                c[v] = v < 128 ? v << 1 : v << 1 ^ 283;
                            for (v = 0; v < 256; v++) {
                                var p = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4;
                                p = p >>> 8 ^ 255 & p ^ 99,
                                    e[h] = p,
                                    t[p] = h;
                                var y = c[h]
                                    , m = c[y]
                                    , E = c[m]
                                    , b = 257 * c[p] ^ 16843008 * p;
                                i[h] = b << 24 | b >>> 8,
                                    a[h] = b << 16 | b >>> 16,
                                    n[h] = b << 8 | b >>> 24,
                                    s[h] = b,
                                    b = 16843009 * E ^ 65537 * m ^ 257 * y ^ 16843008 * h,
                                    l[p] = b << 24 | b >>> 8,
                                    u[p] = b << 16 | b >>> 16,
                                    d[p] = b << 8 | b >>> 24,
                                    f[p] = b,
                                    h ? (h = y ^ c[c[c[E ^ y]]],
                                        g ^= c[c[g]]) : h = g = 1
                            }
                        }
                    }, {
                        key: "expandKey",
                        value: function (e) {
                            for (var t = this.uint8ArrayToUint32Array_(e), r = !0, i = 0; i < t.length && r;)
                                r = t[i] === this.key[i],
                                    i++;
                            if (!r) {
                                this.key = t;
                                var a = this.keySize = t.length;
                                if (4 !== a && 6 !== a && 8 !== a)
                                    throw new Error("Invalid aes key size=" + a);
                                var n = this.ksRows = 4 * (a + 6 + 1)
                                    , s = void 0
                                    , o = void 0
                                    , l = this.keySchedule = new Uint32Array(n)
                                    , u = this.invKeySchedule = new Uint32Array(n)
                                    , d = this.sBox
                                    , f = this.rcon
                                    , c = this.invSubMix
                                    , h = c[0]
                                    , g = c[1]
                                    , v = c[2]
                                    , p = c[3]
                                    , y = void 0
                                    , m = void 0;
                                for (s = 0; s < n; s++)
                                    s < a ? y = l[s] = t[s] : (m = y,
                                        s % a == 0 ? (m = m << 8 | m >>> 24,
                                            m = d[m >>> 24] << 24 | d[m >>> 16 & 255] << 16 | d[m >>> 8 & 255] << 8 | d[255 & m],
                                            m ^= f[s / a | 0] << 24) : a > 6 && s % a == 4 && (m = d[m >>> 24] << 24 | d[m >>> 16 & 255] << 16 | d[m >>> 8 & 255] << 8 | d[255 & m]),
                                        l[s] = y = (l[s - a] ^ m) >>> 0);
                                for (o = 0; o < n; o++)
                                    s = n - o,
                                        m = 3 & o ? l[s] : l[s - 4],
                                        u[o] = o < 4 || s <= 4 ? m : h[d[m >>> 24]] ^ g[d[m >>> 16 & 255]] ^ v[d[m >>> 8 & 255]] ^ p[d[255 & m]],
                                        u[o] = u[o] >>> 0
                            }
                        }
                    }, {
                        key: "networkToHostOrderSwap",
                        value: function (e) {
                            return e << 24 | (65280 & e) << 8 | (16711680 & e) >> 8 | e >>> 24
                        }
                    }, {
                        key: "decrypt",
                        value: function (e, t, r) {
                            for (var i, a, n = this.keySize + 6, s = this.invKeySchedule, o = this.invSBox, l = this.invSubMix, u = l[0], d = l[1], f = l[2], c = l[3], h = this.uint8ArrayToUint32Array_(r), g = h[0], v = h[1], p = h[2], y = h[3], m = new Int32Array(e), E = new Int32Array(m.length), b = void 0, T = void 0, _ = void 0, k = void 0, R = void 0, A = void 0, S = void 0, L = void 0, w = void 0, D = void 0, O = void 0, I = void 0, P = this.networkToHostOrderSwap; t < m.length;) {
                                for (w = P(m[t]),
                                    D = P(m[t + 1]),
                                    O = P(m[t + 2]),
                                    I = P(m[t + 3]),
                                    R = w ^ s[0],
                                    A = I ^ s[1],
                                    S = O ^ s[2],
                                    L = D ^ s[3],
                                    i = 4,
                                    a = 1; a < n; a++)
                                    b = u[R >>> 24] ^ d[A >> 16 & 255] ^ f[S >> 8 & 255] ^ c[255 & L] ^ s[i],
                                        T = u[A >>> 24] ^ d[S >> 16 & 255] ^ f[L >> 8 & 255] ^ c[255 & R] ^ s[i + 1],
                                        _ = u[S >>> 24] ^ d[L >> 16 & 255] ^ f[R >> 8 & 255] ^ c[255 & A] ^ s[i + 2],
                                        k = u[L >>> 24] ^ d[R >> 16 & 255] ^ f[A >> 8 & 255] ^ c[255 & S] ^ s[i + 3],
                                        R = b,
                                        A = T,
                                        S = _,
                                        L = k,
                                        i += 4;
                                b = o[R >>> 24] << 24 ^ o[A >> 16 & 255] << 16 ^ o[S >> 8 & 255] << 8 ^ o[255 & L] ^ s[i],
                                    T = o[A >>> 24] << 24 ^ o[S >> 16 & 255] << 16 ^ o[L >> 8 & 255] << 8 ^ o[255 & R] ^ s[i + 1],
                                    _ = o[S >>> 24] << 24 ^ o[L >> 16 & 255] << 16 ^ o[R >> 8 & 255] << 8 ^ o[255 & A] ^ s[i + 2],
                                    k = o[L >>> 24] << 24 ^ o[R >> 16 & 255] << 16 ^ o[A >> 8 & 255] << 8 ^ o[255 & S] ^ s[i + 3],
                                    i += 3,
                                    E[t] = P(b ^ g),
                                    E[t + 1] = P(k ^ v),
                                    E[t + 2] = P(_ ^ p),
                                    E[t + 3] = P(T ^ y),
                                    g = w,
                                    v = D,
                                    p = O,
                                    y = I,
                                    t += 4
                            }
                            return E.buffer
                        }
                    }, {
                        key: "destroy",
                        value: function () {
                            this.key = void 0,
                                this.keySize = void 0,
                                this.ksRows = void 0,
                                this.sBox = void 0,
                                this.invSBox = void 0,
                                this.subMix = void 0,
                                this.invSubMix = void 0,
                                this.keySchedule = void 0,
                                this.invKeySchedule = void 0,
                                this.rcon = void 0
                        }
                    }]),
                        e
                }();
            r.default = n
        }
            , {}],
        19: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , s = e(17)
                , o = i(s)
                , l = e(20)
                , u = i(l)
                , d = e(18)
                , f = i(d)
                , c = e(31)
                , h = e(51)
                , g = function () {
                    function e(t, r) {
                        a(this, e),
                            this.observer = t,
                            this.config = r,
                            this.logEnabled = !0;
                        try {
                            var i = crypto ? crypto : self.crypto;
                            this.subtle = i.subtle || i.webkitSubtle
                        } catch (e) { }
                        this.disableWebCrypto = !this.subtle
                    }
                    return n(e, [{
                        key: "isSync",
                        value: function () {
                            return this.disableWebCrypto && this.config.enableSoftwareAES
                        }
                    }, {
                        key: "decrypt",
                        value: function (e, t, r, i) {
                            var a = this;
                            if (this.disableWebCrypto && this.config.enableSoftwareAES) {
                                this.logEnabled && (h.logger.log("JS AES decrypt"),
                                    this.logEnabled = !1);
                                var n = this.decryptor;
                                n || (this.decryptor = n = new f.default),
                                    n.expandKey(t),
                                    i(n.decrypt(e, 0, r))
                            } else {
                                this.logEnabled && (h.logger.log("WebCrypto AES decrypt"),
                                    this.logEnabled = !1);
                                var s = this.subtle;
                                this.key !== t && (this.key = t,
                                    this.fastAesKey = new u.default(s, t)),
                                    this.fastAesKey.expandKey().then(function (n) {
                                        new o.default(s, r).decrypt(e, n).catch(function (n) {
                                            a.onWebCryptoError(n, e, t, r, i)
                                        }).then(function (e) {
                                            i(e)
                                        })
                                    }).catch(function (n) {
                                        a.onWebCryptoError(n, e, t, r, i)
                                    })
                            }
                        }
                    }, {
                        key: "onWebCryptoError",
                        value: function (e, t, r, i, a) {
                            this.config.enableSoftwareAES ? (h.logger.log("WebCrypto Error, disable WebCrypto API"),
                                this.disableWebCrypto = !0,
                                this.logEnabled = !0,
                                this.decrypt(t, r, i, a)) : (h.logger.error("decrypting error : " + e.message),
                                    this.observer.trigger(Event.ERROR, {
                                        type: c.ErrorTypes.MEDIA_ERROR,
                                        details: c.ErrorDetails.FRAG_DECRYPT_ERROR,
                                        fatal: !0,
                                        reason: e.message
                                    }))
                        }
                    }, {
                        key: "destroy",
                        value: function () {
                            var e = this.decryptor;
                            e && (e.destroy(),
                                this.decryptor = void 0)
                        }
                    }]),
                        e
                }();
            r.default = g
        }
            , {
            17: 17,
            18: 18,
            20: 20,
            31: 31,
            51: 51
        }],
        20: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = function () {
                    function e(t, r) {
                        i(this, e),
                            this.subtle = t,
                            this.key = r
                    }
                    return a(e, [{
                        key: "expandKey",
                        value: function () {
                            return this.subtle.importKey("raw", this.key, {
                                name: "AES-CBC"
                            }, !1, ["encrypt", "decrypt"])
                        }
                    }]),
                        e
                }();
            r.default = n
        }
            , {}],
        21: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , s = e(22)
                , o = i(s)
                , l = e(51)
                , u = e(27)
                , d = i(u)
                , f = function () {
                    function e(t, r, i) {
                        a(this, e),
                            this.observer = t,
                            this.config = i,
                            this.remuxer = r
                    }
                    return n(e, [{
                        key: "resetInitSegment",
                        value: function (e, t, r, i) {
                            this._aacTrack = {
                                container: "audio/adts",
                                type: "audio",
                                id: -1,
                                sequenceNumber: 0,
                                isAAC: !0,
                                samples: [],
                                len: 0,
                                manifestCodec: t,
                                duration: i,
                                inputTimeScale: 9e4
                            }
                        }
                    }, {
                        key: "resetTimeStamp",
                        value: function () { }
                    }, {
                        key: "append",
                        value: function (e, t, r, i) {
                            var a, n, s, u, f, c, h, g, v, p, y = new d.default(e), m = 90 * y.timeStamp;
                            for (a = this._aacTrack,
                                c = y.length,
                                v = e.length; c < v - 1 && (255 !== e[c] || 240 != (240 & e[c + 1])); c++)
                                ;
                            for (a.samplerate || (n = o.default.getAudioConfig(this.observer, e, c, a.manifestCodec),
                                a.config = n.config,
                                a.samplerate = n.samplerate,
                                a.channelCount = n.channelCount,
                                a.codec = n.codec,
                                l.logger.log("parsed codec:" + a.codec + ",rate:" + n.samplerate + ",nb channel:" + n.channelCount)),
                                f = 0,
                                u = 9216e4 / a.samplerate; c + 5 < v && (h = 1 & e[c + 1] ? 7 : 9,
                                    s = (3 & e[c + 3]) << 11 | e[c + 4] << 3 | (224 & e[c + 5]) >>> 5,
                                    (s -= h) > 0 && c + h + s <= v);)
                                for (g = m + f * u,
                                    p = {
                                        unit: e.subarray(c + h, c + h + s),
                                        pts: g,
                                        dts: g
                                    },
                                    a.samples.push(p),
                                    a.len += s,
                                    c += s + h,
                                    f++; c < v - 1 && (255 !== e[c] || 240 != (240 & e[c + 1])); c++)
                                    ;
                            this.remuxer.remux(a, {
                                samples: []
                            }, {
                                samples: [{
                                    pts: m,
                                    dts: m,
                                    unit: y.payload
                                }],
                                inputTimeScale: 9e4
                            }, {
                                samples: []
                            }, t, r, i)
                        }
                    }, {
                        key: "destroy",
                        value: function () { }
                    }], [{
                        key: "probe",
                        value: function (e) {
                            var t, r, i = new d.default(e);
                            if (i.hasTimeStamp)
                                for (t = i.length,
                                    r = e.length; t < r - 1; t++)
                                    if (255 === e[t] && 240 == (240 & e[t + 1]))
                                        return !0;
                            return !1
                        }
                    }]),
                        e
                }();
            r.default = f
        }
            , {
            22: 22,
            27: 27,
            51: 51
        }],
        22: [function (e, t, r) {
            "use strict";
            var i = e(51)
                , a = e(31)
                , n = {
                    getAudioConfig: function (e, t, r, n) {
                        var s, o, l, u, d, f = navigator.userAgent.toLowerCase(), c = n, h = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
                        return s = 1 + ((192 & t[r + 2]) >>> 6),
                            (o = (60 & t[r + 2]) >>> 2) > h.length - 1 ? void e.trigger(Event.ERROR, {
                                type: a.ErrorTypes.MEDIA_ERROR,
                                details: a.ErrorDetails.FRAG_PARSING_ERROR,
                                fatal: !0,
                                reason: "invalid ADTS sampling index:" + o
                            }) : (u = (1 & t[r + 2]) << 2,
                                u |= (192 & t[r + 3]) >>> 6,
                                i.logger.log("manifest codec:" + n + ",ADTS data:type:" + s + ",sampleingIndex:" + o + "[" + h[o] + "Hz],channelConfig:" + u),
                                /firefox/i.test(f) ? o >= 6 ? (s = 5,
                                    d = new Array(4),
                                    l = o - 3) : (s = 2,
                                        d = new Array(2),
                                        l = o) : f.indexOf("android") !== -1 ? (s = 2,
                                            d = new Array(2),
                                            l = o) : (s = 5,
                                                d = new Array(4),
                                                n && (n.indexOf("mp4a.40.29") !== -1 || n.indexOf("mp4a.40.5") !== -1) || !n && o >= 6 ? l = o - 3 : ((n && n.indexOf("mp4a.40.2") !== -1 && o >= 6 && 1 === u || !n && 1 === u) && (s = 2,
                                                    d = new Array(2)),
                                                    l = o)),
                                d[0] = s << 3,
                                d[0] |= (14 & o) >> 1,
                                d[1] |= (1 & o) << 7,
                                d[1] |= u << 3,
                                5 === s && (d[1] |= (14 & l) >> 1,
                                    d[2] = (1 & l) << 7,
                                    d[2] |= 8,
                                    d[3] = 0),
                            {
                                config: d,
                                samplerate: h[o],
                                channelCount: u,
                                codec: "mp4a.40." + s,
                                manifestCodec: c
                            })
                    }
                };
            t.exports = n
        }
            , {
            31: 31,
            51: 51
        }],
        23: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , s = e(33)
                , o = i(s)
                , l = e(31)
                , u = e(19)
                , d = i(u)
                , f = e(21)
                , c = i(f)
                , h = e(28)
                , g = i(h)
                , v = e(30)
                , p = i(v)
                , y = e(43)
                , m = i(y)
                , E = e(44)
                , b = i(E)
                , T = function () {
                    function e(t, r, i, n) {
                        a(this, e),
                            this.observer = t,
                            this.typeSupported = r,
                            this.config = i,
                            this.vendor = n
                    }
                    return n(e, [{
                        key: "destroy",
                        value: function () {
                            var e = this.demuxer;
                            e && e.destroy()
                        }
                    }, {
                        key: "push",
                        value: function (e, t, r, i, a, n, s, l, u, f, c, h) {
                            if (e.byteLength > 0 && null != t && null != t.key && "AES-128" === t.method) {
                                var g = this.decrypter;
                                null == g && (g = this.decrypter = new d.default(this.observer, this.config));
                                var v, p = this;
                                try {
                                    v = performance.now()
                                } catch (e) {
                                    v = Date.now()
                                }
                                g.decrypt(e, t.key.buffer, t.iv.buffer, function (e) {
                                    var d;
                                    try {
                                        d = performance.now()
                                    } catch (e) {
                                        d = Date.now()
                                    }
                                    p.observer.trigger(o.default.FRAG_DECRYPTED, {
                                        stats: {
                                            tstart: v,
                                            tdecrypt: d
                                        }
                                    }),
                                        p.pushDecrypted(new Uint8Array(e), t, new Uint8Array(r), i, a, n, s, l, u, f, c, h)
                                })
                            } else
                                this.pushDecrypted(new Uint8Array(e), t, new Uint8Array(r), i, a, n, s, l, u, f, c, h)
                        }
                    }, {
                        key: "pushDecrypted",
                        value: function (e, t, r, i, a, n, s, u, d, f, h, v) {
                            var y = this.demuxer;
                            if (!y || s && !this.probe(e)) {
                                var E = this.observer
                                    , T = this.typeSupported
                                    , _ = this.config
                                    , k = [{
                                        demux: p.default,
                                        remux: m.default
                                    }, {
                                        demux: c.default,
                                        remux: m.default
                                    }, {
                                        demux: g.default,
                                        remux: b.default
                                    }];
                                for (var R in k) {
                                    var A = k[R]
                                        , S = A.demux.probe;
                                    if (S(e)) {
                                        var L = this.remuxer = new A.remux(E, _, T, this.vendor);
                                        y = new A.demux(E, L, _, T),
                                            this.probe = S;
                                        break
                                    }
                                }
                                if (!y)
                                    return void E.trigger(o.default.ERROR, {
                                        type: l.ErrorTypes.MEDIA_ERROR,
                                        details: l.ErrorDetails.FRAG_PARSING_ERROR,
                                        fatal: !0,
                                        reason: "no demux matching with content found"
                                    });
                                this.demuxer = y
                            }
                            var w = this.remuxer;
                            (s || u) && (y.resetInitSegment(r, i, a, f),
                                w.resetInitSegment()),
                                s && (y.resetTimeStamp(),
                                    w.resetTimeStamp(v)),
                                "function" == typeof y.setDecryptData && y.setDecryptData(t),
                                y.append(e, n, d, h)
                        }
                    }]),
                        e
                }();
            r.default = T
        }
            , {
            19: 19,
            21: 21,
            28: 28,
            30: 30,
            31: 31,
            33: 33,
            43: 43,
            44: 44
        }],
        24: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = e(23)
                , n = i(a)
                , s = e(33)
                , o = i(s)
                , l = e(51)
                , u = e(1)
                , d = i(u)
                , f = function (e) {
                    var t = new d.default;
                    t.trigger = function (e) {
                        for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
                            i[a - 1] = arguments[a];
                        t.emit.apply(t, [e, e].concat(i))
                    }
                        ,
                        t.off = function (e) {
                            for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
                                i[a - 1] = arguments[a];
                            t.removeListener.apply(t, [e].concat(i))
                        }
                        ;
                    var r = function (t, r) {
                        e.postMessage({
                            event: t,
                            data: r
                        })
                    };
                    e.addEventListener("message", function (i) {
                        var a = i.data;
                        switch (a.cmd) {
                            case "init":
                                var s = JSON.parse(a.config);
                                e.demuxer = new n.default(t, a.typeSupported, s, a.vendor);
                                try {
                                    (0,
                                        l.enableLogs)(s.debug === !0)
                                } catch (e) { }
                                r("init", null);
                                break;
                            case "demux":
                                e.demuxer.push(a.data, a.decryptdata, a.initSegment, a.audioCodec, a.videoCodec, a.timeOffset, a.discontinuity, a.trackSwitch, a.contiguous, a.duration, a.accurateTimeOffset, a.defaultInitPTS)
                        }
                    }),
                        t.on(o.default.FRAG_DECRYPTED, r),
                        t.on(o.default.FRAG_PARSING_INIT_SEGMENT, r),
                        t.on(o.default.FRAG_PARSED, r),
                        t.on(o.default.ERROR, r),
                        t.on(o.default.FRAG_PARSING_METADATA, r),
                        t.on(o.default.FRAG_PARSING_USERDATA, r),
                        t.on(o.default.INIT_PTS_FOUND, r),
                        t.on(o.default.FRAG_PARSING_DATA, function (t, r) {
                            var i = []
                                , a = {
                                    event: t,
                                    data: r
                                };
                            r.data1 && (a.data1 = r.data1.buffer,
                                i.push(r.data1.buffer),
                                delete r.data1),
                                r.data2 && (a.data2 = r.data2.buffer,
                                    i.push(r.data2.buffer),
                                    delete r.data2),
                                e.postMessage(a, i)
                        })
                };
            r.default = f
        }
            , {
            1: 1,
            23: 23,
            33: 33,
            51: 51
        }],
        25: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , s = e(33)
                , o = i(s)
                , l = e(23)
                , u = i(l)
                , d = e(24)
                , f = i(d)
                , c = e(51)
                , h = e(31)
                , g = e(1)
                , v = i(g)
                , p = function () {
                    function t(r, i) {
                        a(this, t),
                            this.hls = r,
                            this.id = i;
                        var n = this.observer = new v.default
                            , s = r.config;
                        n.trigger = function (e) {
                            for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                                r[i - 1] = arguments[i];
                            n.emit.apply(n, [e, e].concat(r))
                        }
                            ,
                            n.off = function (e) {
                                for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                                    r[i - 1] = arguments[i];
                                n.removeListener.apply(n, [e].concat(r))
                            }
                            ;
                        var l = function (e, t) {
                            t = t || {},
                                t.frag = this.frag,
                                t.id = this.id,
                                r.trigger(e, t)
                        }
                            .bind(this);
                        n.on(o.default.FRAG_DECRYPTED, l),
                            n.on(o.default.FRAG_PARSING_INIT_SEGMENT, l),
                            n.on(o.default.FRAG_PARSING_DATA, l),
                            n.on(o.default.FRAG_PARSED, l),
                            n.on(o.default.ERROR, l),
                            n.on(o.default.FRAG_PARSING_METADATA, l),
                            n.on(o.default.FRAG_PARSING_USERDATA, l),
                            n.on(o.default.INIT_PTS_FOUND, l);
                        var d = {
                            mp4: MediaSource.isTypeSupported("video/mp4"),
                            mpeg: MediaSource.isTypeSupported("audio/mpeg"),
                            mp3: MediaSource.isTypeSupported('audio/mp4; codecs="mp3"')
                        }
                            , g = navigator.vendor;
                        if (s.enableWorker && "undefined" != typeof Worker) {
                            c.logger.log("demuxing in webworker");
                            var p = void 0;
                            try {
                                var y = e(3);
                                p = this.w = y(f.default),
                                    this.onwmsg = this.onWorkerMessage.bind(this),
                                    p.addEventListener("message", this.onwmsg),
                                    p.onerror = function (e) {
                                        r.trigger(o.default.ERROR, {
                                            type: h.ErrorTypes.OTHER_ERROR,
                                            details: h.ErrorDetails.INTERNAL_EXCEPTION,
                                            fatal: !0,
                                            event: "demuxerWorker",
                                            err: {
                                                message: e.message + " (" + e.filename + ":" + e.lineno + ")"
                                            }
                                        })
                                    }
                                    ,
                                    p.postMessage({
                                        cmd: "init",
                                        typeSupported: d,
                                        vendor: g,
                                        id: i,
                                        config: JSON.stringify(s)
                                    })
                            } catch (e) {
                                c.logger.error("error while initializing DemuxerWorker, fallback on DemuxerInline"),
                                    p && URL.revokeObjectURL(p.objectURL),
                                    this.demuxer = new u.default(n, d, s, g),
                                    this.w = void 0
                            }
                        } else
                            this.demuxer = new u.default(n, d, s, g)
                    }
                    return n(t, [{
                        key: "destroy",
                        value: function () {
                            var e = this.w;
                            if (e)
                                e.removeEventListener("message", this.onwmsg),
                                    e.terminate(),
                                    this.w = null;
                            else {
                                var t = this.demuxer;
                                t && (t.destroy(),
                                    this.demuxer = null)
                            }
                            var r = this.observer;
                            r && (r.removeAllListeners(),
                                this.observer = null)
                        }
                    }, {
                        key: "push",
                        value: function (e, t, r, i, a, n, s, o) {
                            var l = this.w
                                , u = isNaN(a.startDTS) ? a.start : a.startDTS
                                , d = a.decryptdata
                                , f = this.frag
                                , h = !(f && a.cc === f.cc)
                                , g = !(f && a.level === f.level)
                                , v = f && a.sn === f.sn + 1
                                , p = !g && v;
                            if (h && c.logger.log(this.id + ":discontinuity detected"),
                                g && c.logger.log(this.id + ":switch detected"),
                                this.frag = a,
                                l)
                                l.postMessage({
                                    cmd: "demux",
                                    data: e,
                                    decryptdata: d,
                                    initSegment: t,
                                    audioCodec: r,
                                    videoCodec: i,
                                    timeOffset: u,
                                    discontinuity: h,
                                    trackSwitch: g,
                                    contiguous: p,
                                    duration: n,
                                    accurateTimeOffset: s,
                                    defaultInitPTS: o
                                }, [e]);
                            else {
                                var y = this.demuxer;
                                y && y.push(e, d, t, r, i, u, h, g, p, n, s, o)
                            }
                        }
                    }, {
                        key: "onWorkerMessage",
                        value: function (e) {
                            var t = e.data
                                , r = this.hls;
                            switch (t.event) {
                                case "init":
                                    URL.revokeObjectURL(this.w.objectURL);
                                    break;
                                case o.default.FRAG_PARSING_DATA:
                                    t.data.data1 = new Uint8Array(t.data1),
                                        t.data2 && (t.data.data2 = new Uint8Array(t.data2));
                                default:
                                    t.data = t.data || {},
                                        t.data.frag = this.frag,
                                        t.data.id = this.id,
                                        r.trigger(t.event, t.data)
                            }
                        }
                    }]),
                        t
                }();
            r.default = p
        }
            , {
            1: 1,
            23: 23,
            24: 24,
            3: 3,
            31: 31,
            33: 33,
            51: 51
        }],
        26: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = e(51)
                , s = function () {
                    function e(t) {
                        i(this, e),
                            this.data = t,
                            this.bytesAvailable = t.byteLength,
                            this.word = 0,
                            this.bitsAvailable = 0
                    }
                    return a(e, [{
                        key: "loadWord",
                        value: function () {
                            var e = this.data
                                , t = this.bytesAvailable
                                , r = e.byteLength - t
                                , i = new Uint8Array(4)
                                , a = Math.min(4, t);
                            if (0 === a)
                                throw new Error("no bytes available");
                            i.set(e.subarray(r, r + a)),
                                this.word = new DataView(i.buffer).getUint32(0),
                                this.bitsAvailable = 8 * a,
                                this.bytesAvailable -= a
                        }
                    }, {
                        key: "skipBits",
                        value: function (e) {
                            var t;
                            this.bitsAvailable > e ? (this.word <<= e,
                                this.bitsAvailable -= e) : (e -= this.bitsAvailable,
                                    t = e >> 3,
                                    e -= t >> 3,
                                    this.bytesAvailable -= t,
                                    this.loadWord(),
                                    this.word <<= e,
                                    this.bitsAvailable -= e)
                        }
                    }, {
                        key: "readBits",
                        value: function (e) {
                            var t = Math.min(this.bitsAvailable, e)
                                , r = this.word >>> 32 - t;
                            return e > 32 && n.logger.error("Cannot read more than 32 bits at a time"),
                                this.bitsAvailable -= t,
                                this.bitsAvailable > 0 ? this.word <<= t : this.bytesAvailable > 0 && this.loadWord(),
                                t = e - t,
                                t > 0 && this.bitsAvailable ? r << t | this.readBits(t) : r
                        }
                    }, {
                        key: "skipLZ",
                        value: function () {
                            var e;
                            for (e = 0; e < this.bitsAvailable; ++e)
                                if (0 != (this.word & 2147483648 >>> e))
                                    return this.word <<= e,
                                        this.bitsAvailable -= e,
                                        e;
                            return this.loadWord(),
                                e + this.skipLZ()
                        }
                    }, {
                        key: "skipUEG",
                        value: function () {
                            this.skipBits(1 + this.skipLZ())
                        }
                    }, {
                        key: "skipEG",
                        value: function () {
                            this.skipBits(1 + this.skipLZ())
                        }
                    }, {
                        key: "readUEG",
                        value: function () {
                            var e = this.skipLZ();
                            return this.readBits(e + 1) - 1
                        }
                    }, {
                        key: "readEG",
                        value: function () {
                            var e = this.readUEG();
                            return 1 & e ? 1 + e >>> 1 : -1 * (e >>> 1)
                        }
                    }, {
                        key: "readBoolean",
                        value: function () {
                            return 1 === this.readBits(1)
                        }
                    }, {
                        key: "readUByte",
                        value: function () {
                            return this.readBits(8)
                        }
                    }, {
                        key: "readUShort",
                        value: function () {
                            return this.readBits(16)
                        }
                    }, {
                        key: "readUInt",
                        value: function () {
                            return this.readBits(32)
                        }
                    }, {
                        key: "skipScalingList",
                        value: function (e) {
                            var t, r, i = 8, a = 8;
                            for (t = 0; t < e; t++)
                                0 !== a && (r = this.readEG(),
                                    a = (i + r + 256) % 256),
                                    i = 0 === a ? i : a
                        }
                    }, {
                        key: "readSPS",
                        value: function () {
                            var e, t, r, i, a, n, s, o = 0, l = 0, u = 0, d = 0, f = this.readUByte.bind(this), c = this.readBits.bind(this), h = this.readUEG.bind(this), g = this.readBoolean.bind(this), v = this.skipBits.bind(this), p = this.skipEG.bind(this), y = this.skipUEG.bind(this), m = this.skipScalingList.bind(this);
                            if (f(),
                                e = f(),
                                c(5),
                                v(3),
                                f(),
                                y(),
                                100 === e || 110 === e || 122 === e || 244 === e || 44 === e || 83 === e || 86 === e || 118 === e || 128 === e) {
                                var E = h();
                                if (3 === E && v(1),
                                    y(),
                                    y(),
                                    v(1),
                                    g())
                                    for (n = 3 !== E ? 8 : 12,
                                        s = 0; s < n; s++)
                                        g() && m(s < 6 ? 16 : 64)
                            }
                            y();
                            var b = h();
                            if (0 === b)
                                h();
                            else if (1 === b)
                                for (v(1),
                                    p(),
                                    p(),
                                    t = h(),
                                    s = 0; s < t; s++)
                                    p();
                            y(),
                                v(1),
                                r = h(),
                                i = h(),
                                a = c(1),
                                0 === a && v(1),
                                v(1),
                                g() && (o = h(),
                                    l = h(),
                                    u = h(),
                                    d = h());
                            var T = [1, 1];
                            if (g() && g()) {
                                switch (f()) {
                                    case 1:
                                        T = [1, 1];
                                        break;
                                    case 2:
                                        T = [12, 11];
                                        break;
                                    case 3:
                                        T = [10, 11];
                                        break;
                                    case 4:
                                        T = [16, 11];
                                        break;
                                    case 5:
                                        T = [40, 33];
                                        break;
                                    case 6:
                                        T = [24, 11];
                                        break;
                                    case 7:
                                        T = [20, 11];
                                        break;
                                    case 8:
                                        T = [32, 11];
                                        break;
                                    case 9:
                                        T = [80, 33];
                                        break;
                                    case 10:
                                        T = [18, 11];
                                        break;
                                    case 11:
                                        T = [15, 11];
                                        break;
                                    case 12:
                                        T = [64, 33];
                                        break;
                                    case 13:
                                        T = [160, 99];
                                        break;
                                    case 14:
                                        T = [4, 3];
                                        break;
                                    case 15:
                                        T = [3, 2];
                                        break;
                                    case 16:
                                        T = [2, 1];
                                        break;
                                    case 255:
                                        T = [f() << 8 | f(), f() << 8 | f()]
                                }
                            }
                            return {
                                width: Math.ceil(16 * (r + 1) - 2 * o - 2 * l),
                                height: (2 - a) * (i + 1) * 16 - (a ? 2 : 4) * (u + d),
                                pixelRatio: T
                            }
                        }
                    }, {
                        key: "readSliceType",
                        value: function () {
                            return this.readUByte(),
                                this.readUEG(),
                                this.readUEG()
                        }
                    }]),
                        e
                }();
            r.default = s
        }
            , {
            51: 51
        }],
        27: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = e(51)
                , s = function () {
                    function e(t) {
                        i(this, e),
                            this._hasTimeStamp = !1;
                        for (var r, a, s, o, l, u, d, f, c = 0; ;)
                            if (d = this.readUTF(t, c, 3),
                                c += 3,
                                "ID3" === d)
                                c += 3,
                                    r = 127 & t[c++],
                                    a = 127 & t[c++],
                                    s = 127 & t[c++],
                                    o = 127 & t[c++],
                                    l = (r << 21) + (a << 14) + (s << 7) + o,
                                    u = c + l,
                                    this._parseID3Frames(t, c, u),
                                    c = u;
                            else {
                                if ("3DI" !== d)
                                    return c -= 3,
                                        void ((f = c) && (this.hasTimeStamp || n.logger.warn("ID3 tag found, but no timestamp"),
                                            this._length = f,
                                            this._payload = t.subarray(0, f)));
                                c += 7,
                                    n.logger.log("3DI footer found, end: " + c)
                            }
                    }
                    return a(e, [{
                        key: "readUTF",
                        value: function (e, t, r) {
                            var i = ""
                                , a = t
                                , n = t + r;
                            do {
                                i += String.fromCharCode(e[a++])
                            } while (a < n);
                            return i
                        }
                    }, {
                        key: "_parseID3Frames",
                        value: function (e, t, r) {
                            for (var i, a; t + 8 <= r;)
                                switch (i = this.readUTF(e, t, 4),
                                t += 4,
                                e[t++] << 24 + e[t++] << 16 + e[t++] << 8 + e[t++],
                                e[t++] << 8 + e[t++],
                                t,
                                i) {
                                    case "PRIV":
                                        if ("com.apple.streaming.transportStreamTimestamp" === this.readUTF(e, t, 44)) {
                                            t += 44,
                                                t += 4;
                                            var s = 1 & e[t++];
                                            this._hasTimeStamp = !0,
                                                a = ((e[t++] << 23) + (e[t++] << 15) + (e[t++] << 7) + e[t++]) / 45,
                                                s && (a += 47721858.84),
                                                a = Math.round(a),
                                                n.logger.trace("ID3 timestamp found: " + a),
                                                this._timeStamp = a
                                        }
                                }
                        }
                    }, {
                        key: "hasTimeStamp",
                        get: function () {
                            return this._hasTimeStamp
                        }
                    }, {
                        key: "timeStamp",
                        get: function () {
                            return this._timeStamp
                        }
                    }, {
                        key: "length",
                        get: function () {
                            return this._length
                        }
                    }, {
                        key: "payload",
                        get: function () {
                            return this._payload
                        }
                    }]),
                        e
                }();
            r.default = s
        }
            , {
            51: 51
        }],
        28: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = e(33)
                , s = function (e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n)
                , o = function () {
                    function e(t, r) {
                        i(this, e),
                            this.observer = t,
                            this.remuxer = r
                    }
                    return a(e, [{
                        key: "resetTimeStamp",
                        value: function () { }
                    }, {
                        key: "resetInitSegment",
                        value: function (t, r, i, a) {
                            var n = this.initData = e.parseInitSegment(t)
                                , o = {};
                            n.audio && (o.audio = {
                                container: "audio/mp4",
                                codec: r,
                                initSegment: t
                            }),
                                n.video && (o.video = {
                                    container: "video/mp4",
                                    codec: i,
                                    initSegment: t
                                }),
                                this.observer.trigger(s.default.FRAG_PARSING_INIT_SEGMENT, {
                                    tracks: o
                                })
                        }
                    }, {
                        key: "append",
                        value: function (t, r, i, a) {
                            var n = this.initData
                                , s = e.startDTS(n, t);
                            this.remuxer.remux(n.audio, n.video, null, null, s, i, a, t)
                        }
                    }, {
                        key: "destroy",
                        value: function () { }
                    }], [{
                        key: "probe",
                        value: function (t) {
                            if (t.length >= 8) {
                                var r = e.bin2str(t.subarray(4, 8));
                                return ["moof", "ftyp", "styp"].indexOf(r) >= 0
                            }
                            return !1
                        }
                    }, {
                        key: "bin2str",
                        value: function (e) {
                            return String.fromCharCode.apply(null, e)
                        }
                    }, {
                        key: "findBox",
                        value: function (t, r) {
                            var i, a, n, s, o, l = [];
                            if (!r.length)
                                return null;
                            for (i = 0; i < t.byteLength;)
                                a = t[i] << 24,
                                    a |= t[i + 1] << 16,
                                    a |= t[i + 2] << 8,
                                    a |= t[i + 3],
                                    n = e.bin2str(t.subarray(i + 4, i + 8)),
                                    s = a > 1 ? i + a : t.byteLength,
                                    n === r[0] && (1 === r.length ? l.push(t.subarray(i + 8, s)) : (o = e.findBox(t.subarray(i + 8, s), r.slice(1)),
                                        o.length && (l = l.concat(o)))),
                                    i = s;
                            return l
                        }
                    }, {
                        key: "parseInitSegment",
                        value: function (t) {
                            var r = [];
                            return e.findBox(t, ["moov", "trak"]).forEach(function (t) {
                                var i = e.findBox(t, ["tkhd"])[0];
                                if (i) {
                                    var a = i[0]
                                        , n = 0 === a ? 12 : 20
                                        , s = i[n] << 24 | i[n + 1] << 16 | i[n + 2] << 8 | i[n + 3];
                                    s = s < 0 ? 4294967296 + s : s;
                                    var o = e.findBox(t, ["mdia", "mdhd"])[0];
                                    if (o) {
                                        a = o[0],
                                            n = 0 === a ? 12 : 20;
                                        var l = o[n] << 24 | o[n + 1] << 16 | o[n + 2] << 8 | o[n + 3]
                                            , u = e.findBox(t, ["mdia", "hdlr"])[0];
                                        if (u) {
                                            var d = e.bin2str(u.subarray(8, 12))
                                                , f = {
                                                    soun: "audio",
                                                    vide: "video"
                                                }[d];
                                            f && (r[s] = {
                                                timescale: l,
                                                type: f
                                            },
                                                r[f] = {
                                                    timescale: l,
                                                    id: s
                                                })
                                        }
                                    }
                                }
                            }),
                                r
                        }
                    }, {
                        key: "startDTS",
                        value: function (t, r) {
                            var i, a, n;
                            return i = e.findBox(r, ["moof", "traf"]),
                                a = [].concat.apply([], i.map(function (r) {
                                    return e.findBox(r, ["tfhd"]).map(function (i) {
                                        var a, n, s;
                                        return a = i[4] << 24 | i[5] << 16 | i[6] << 8 | i[7],
                                            n = t[a].timescale || 9e4,
                                            s = e.findBox(r, ["tfdt"]).map(function (e) {
                                                var t, r;
                                                return t = e[0],
                                                    r = e[4] << 24 | e[5] << 16 | e[6] << 8 | e[7],
                                                    1 === t && (r *= Math.pow(2, 32),
                                                        r += e[8] << 24 | e[9] << 16 | e[10] << 8 | e[11]),
                                                    r
                                            })[0],
                                            (s = s || 1 / 0) / n
                                    })
                                })),
                                n = Math.min.apply(null, a),
                                isFinite(n) ? n : 0
                        }
                    }]),
                        e
                }();
            r.default = o
        }
            , {
            33: 33
        }],
        29: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = e(19)
                , s = function (e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n)
                , o = function () {
                    function e(t, r, a, n) {
                        i(this, e),
                            this.decryptdata = a,
                            this.discardEPB = n,
                            this.decrypter = new s.default(t, r)
                    }
                    return a(e, [{
                        key: "decryptBuffer",
                        value: function (e, t) {
                            this.decrypter.decrypt(e, this.decryptdata.key.buffer, this.decryptdata.iv.buffer, t)
                        }
                    }, {
                        key: "decryptAacSample",
                        value: function (e, t, r, i) {
                            var a = e[t].unit
                                , n = a.subarray(16, a.length - a.length % 16)
                                , s = n.buffer.slice(n.byteOffset, n.byteOffset + n.length)
                                , o = this;
                            this.decryptBuffer(s, function (n) {
                                n = new Uint8Array(n),
                                    a.set(n, 16),
                                    i || o.decryptAacSamples(e, t + 1, r)
                            })
                        }
                    }, {
                        key: "decryptAacSamples",
                        value: function (e, t, r) {
                            for (; ; t++) {
                                if (t >= e.length)
                                    return void r();
                                if (!(e[t].unit.length < 32)) {
                                    var i = this.decrypter.isSync();
                                    if (this.decryptAacSample(e, t, r, i),
                                        !i)
                                        return
                                }
                            }
                        }
                    }, {
                        key: "getAvcEncryptedData",
                        value: function (e) {
                            for (var t = 16 * Math.floor((e.length - 48) / 160) + 16, r = new Int8Array(t), i = 0, a = 32; a <= e.length - 16; a += 160,
                                i += 16)
                                r.set(e.subarray(a, a + 16), i);
                            return r
                        }
                    }, {
                        key: "getAvcDecryptedUnit",
                        value: function (e, t) {
                            t = new Uint8Array(t);
                            for (var r = 0, i = 32; i <= e.length - 16; i += 160,
                                r += 16)
                                e.set(t.subarray(r, r + 16), i);
                            return e
                        }
                    }, {
                        key: "decryptAvcSample",
                        value: function (e, t, r, i, a, n) {
                            var s = this.discardEPB(a.data)
                                , o = this.getAvcEncryptedData(s)
                                , l = this;
                            this.decryptBuffer(o.buffer, function (o) {
                                a.data = l.getAvcDecryptedUnit(s, o),
                                    n || l.decryptAvcSamples(e, t, r + 1, i)
                            })
                        }
                    }, {
                        key: "decryptAvcSamples",
                        value: function (e, t, r, i) {
                            for (; ; t++,
                                r = 0) {
                                if (t >= e.length)
                                    return void i();
                                for (var a = e[t].units; !(r >= a.length); r++) {
                                    var n = a[r];
                                    if (!(n.length <= 48 || 1 !== n.type && 5 !== n.type)) {
                                        var s = this.decrypter.isSync();
                                        if (this.decryptAvcSample(e, t, r, i, n, s),
                                            !s)
                                            return
                                    }
                                }
                            }
                        }
                    }]),
                        e
                }();
            r.default = o
        }
            , {
            19: 19
        }],
        30: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , s = e(22)
                , o = i(s)
                , l = e(33)
                , u = i(l)
                , d = e(26)
                , f = i(d)
                , c = e(29)
                , h = i(c)
                , g = e(51)
                , v = e(31)
                , p = function () {
                    function e(t, r, i, n) {
                        a(this, e),
                            this.observer = t,
                            this.config = i,
                            this.typeSupported = n,
                            this.remuxer = r,
                            this.sampleAes = null
                    }
                    return n(e, [{
                        key: "setDecryptData",
                        value: function (e) {
                            null != e && null != e.key && "SAMPLE-AES" === e.method ? this.sampleAes = new h.default(this.observer, this.config, e, this.discardEPB) : this.sampleAes = null
                        }
                    }, {
                        key: "resetInitSegment",
                        value: function (e, t, r, i) {
                            this.pmtParsed = !1,
                                this._pmtId = -1,
                                this._avcTrack = {
                                    container: "video/mp2t",
                                    type: "video",
                                    id: -1,
                                    inputTimeScale: 9e4,
                                    sequenceNumber: 0,
                                    samples: [],
                                    len: 0,
                                    dropped: 0
                                },
                                this._audioTrack = {
                                    container: "video/mp2t",
                                    type: "audio",
                                    id: -1,
                                    inputTimeScale: 9e4,
                                    sequenceNumber: 0,
                                    samples: [],
                                    len: 0,
                                    isAAC: !0
                                },
                                this._id3Track = {
                                    type: "id3",
                                    id: -1,
                                    inputTimeScale: 9e4,
                                    sequenceNumber: 0,
                                    samples: [],
                                    len: 0
                                },
                                this._txtTrack = {
                                    type: "text",
                                    id: -1,
                                    inputTimeScale: 9e4,
                                    sequenceNumber: 0,
                                    samples: [],
                                    len: 0
                                },
                                this.aacOverFlow = null,
                                this.aacLastPTS = null,
                                this.avcSample = null,
                                this.audioCodec = t,
                                this.videoCodec = r,
                                this._duration = i
                        }
                    }, {
                        key: "resetTimeStamp",
                        value: function () { }
                    }, {
                        key: "append",
                        value: function (e, t, r, i) {
                            var a, n, s, o, l, d = e.length, f = !1;
                            this.contiguous = r;
                            var c = this.pmtParsed
                                , h = this._avcTrack
                                , p = this._audioTrack
                                , y = this._id3Track
                                , m = h.id
                                , E = p.id
                                , b = y.id
                                , T = this._pmtId
                                , _ = h.pesData
                                , k = p.pesData
                                , R = y.pesData
                                , A = this._parsePAT
                                , S = this._parsePMT
                                , L = this._parsePES
                                , w = this._parseAVCPES.bind(this)
                                , D = this._parseAACPES.bind(this)
                                , O = this._parseMPEGPES.bind(this)
                                , I = this._parseID3PES.bind(this);
                            for (d -= d % 188,
                                a = 0; a < d; a += 188)
                                if (71 === e[a]) {
                                    if (n = !!(64 & e[a + 1]),
                                        s = ((31 & e[a + 1]) << 8) + e[a + 2],
                                        (48 & e[a + 3]) >> 4 > 1) {
                                        if ((o = a + 5 + e[a + 4]) === a + 188)
                                            continue
                                    } else
                                        o = a + 4;
                                    switch (s) {
                                        case m:
                                            n && (_ && (l = L(_)) && w(l, !1),
                                                _ = {
                                                    data: [],
                                                    size: 0
                                                }),
                                                _ && (_.data.push(e.subarray(o, a + 188)),
                                                    _.size += a + 188 - o);
                                            break;
                                        case E:
                                            n && (k && (l = L(k)) && (p.isAAC ? D(l) : O(l)),
                                                k = {
                                                    data: [],
                                                    size: 0
                                                }),
                                                k && (k.data.push(e.subarray(o, a + 188)),
                                                    k.size += a + 188 - o);
                                            break;
                                        case b:
                                            n && (R && (l = L(R)) && I(l),
                                                R = {
                                                    data: [],
                                                    size: 0
                                                }),
                                                R && (R.data.push(e.subarray(o, a + 188)),
                                                    R.size += a + 188 - o);
                                            break;
                                        case 0:
                                            n && (o += e[o] + 1),
                                                T = this._pmtId = A(e, o);
                                            break;
                                        case T:
                                            n && (o += e[o] + 1);
                                            var P = S(e, o, this.typeSupported.mpeg === !0 || this.typeSupported.mp3 === !0, null != this.sampleAes);
                                            m = P.avc,
                                                m > 0 && (h.id = m),
                                                E = P.audio,
                                                E > 0 && (p.id = E,
                                                    p.isAAC = P.isAAC),
                                                b = P.id3,
                                                b > 0 && (y.id = b),
                                                f && !c && (g.logger.log("reparse from beginning"),
                                                    f = !1,
                                                    a = -188),
                                                c = this.pmtParsed = !0;
                                            break;
                                        case 17:
                                        case 8191:
                                            break;
                                        default:
                                            f = !0
                                    }
                                } else
                                    this.observer.trigger(u.default.ERROR, {
                                        type: v.ErrorTypes.MEDIA_ERROR,
                                        details: v.ErrorDetails.FRAG_PARSING_ERROR,
                                        fatal: !1,
                                        reason: "TS packet did not start with 0x47"
                                    });
                            _ && (l = L(_)) ? (w(l, !0),
                                h.pesData = null) : h.pesData = _,
                                k && (l = L(k)) ? (p.isAAC ? D(l) : O(l),
                                    p.pesData = null) : (k && k.size && g.logger.log("last AAC PES packet truncated,might overlap between fragments"),
                                        p.pesData = k),
                                R && (l = L(R)) ? (I(l),
                                    y.pesData = null) : y.pesData = R,
                                null == this.sampleAes ? this.remuxer.remux(p, h, y, this._txtTrack, t, r, i) : this.decryptAndRemux(p, h, y, this._txtTrack, t, r, i)
                        }
                    }, {
                        key: "decryptAndRemux",
                        value: function (e, t, r, i, a, n, s) {
                            if (e.samples && e.isAAC) {
                                var o = this;
                                this.sampleAes.decryptAacSamples(e.samples, 0, function () {
                                    o.decryptAndRemuxAvc(e, t, r, i, a, n, s)
                                })
                            } else
                                this.decryptAndRemuxAvc(e, t, r, i, a, n, s)
                        }
                    }, {
                        key: "decryptAndRemuxAvc",
                        value: function (e, t, r, i, a, n, s) {
                            if (t.samples) {
                                var o = this;
                                this.sampleAes.decryptAvcSamples(t.samples, 0, 0, function () {
                                    o.remuxer.remux(e, t, r, i, a, n, s)
                                })
                            } else
                                this.remuxer.remux(e, t, r, i, a, n, s)
                        }
                    }, {
                        key: "destroy",
                        value: function () {
                            this._initPTS = this._initDTS = void 0,
                                this._duration = 0
                        }
                    }, {
                        key: "_parsePAT",
                        value: function (e, t) {
                            return (31 & e[t + 10]) << 8 | e[t + 11]
                        }
                    }, {
                        key: "_parsePMT",
                        value: function (e, t, r, i) {
                            var a, n, s, o, l = {
                                audio: -1,
                                avc: -1,
                                id3: -1,
                                isAAC: !0
                            };
                            for (a = (15 & e[t + 1]) << 8 | e[t + 2],
                                n = t + 3 + a - 4,
                                s = (15 & e[t + 10]) << 8 | e[t + 11],
                                t += 12 + s; t < n;) {
                                switch (o = (31 & e[t + 1]) << 8 | e[t + 2],
                                e[t]) {
                                    case 207:
                                        if (!i) {
                                            g.logger.log("unkown stream type:" + e[t]);
                                            break
                                        }
                                    case 15:
                                        l.audio === -1 && (l.audio = o);
                                        break;
                                    case 21:
                                        l.id3 === -1 && (l.id3 = o);
                                        break;
                                    case 219:
                                        if (!i) {
                                            g.logger.log("unkown stream type:" + e[t]);
                                            break
                                        }
                                    case 27:
                                        l.avc === -1 && (l.avc = o);
                                        break;
                                    case 3:
                                    case 4:
                                        r ? l.audio === -1 && (l.audio = o,
                                            l.isAAC = !1) : g.logger.log("MPEG audio found, not supported in this browser for now");
                                        break;
                                    case 36:
                                        g.logger.warn("HEVC stream type found, not supported for now");
                                        break;
                                    default:
                                        g.logger.log("unkown stream type:" + e[t])
                                }
                                t += 5 + ((15 & e[t + 3]) << 8 | e[t + 4])
                            }
                            return l
                        }
                    }, {
                        key: "_parsePES",
                        value: function (e) {
                            var t, r, i, a, n, s, o, l, u = 0, d = e.data;
                            if (!e || 0 === e.size)
                                return null;
                            for (; d[0].length < 19 && d.length > 1;) {
                                var f = new Uint8Array(d[0].length + d[1].length);
                                f.set(d[0]),
                                    f.set(d[1], d[0].length),
                                    d[0] = f,
                                    d.splice(1, 1)
                            }
                            if (t = d[0],
                                1 === (t[0] << 16) + (t[1] << 8) + t[2]) {
                                if ((i = (t[4] << 8) + t[5]) && i > e.size - 6)
                                    return null;
                                r = t[7],
                                    192 & r && (s = 536870912 * (14 & t[9]) + 4194304 * (255 & t[10]) + 16384 * (254 & t[11]) + 128 * (255 & t[12]) + (254 & t[13]) / 2,
                                        s > 4294967295 && (s -= 8589934592),
                                        64 & r ? (o = 536870912 * (14 & t[14]) + 4194304 * (255 & t[15]) + 16384 * (254 & t[16]) + 128 * (255 & t[17]) + (254 & t[18]) / 2,
                                            o > 4294967295 && (o -= 8589934592),
                                            s - o > 54e5 && (g.logger.warn(Math.round((s - o) / 9e4) + "s delta between PTS and DTS, align them"),
                                                s = o)) : o = s),
                                    a = t[8],
                                    l = a + 9,
                                    e.size -= l,
                                    n = new Uint8Array(e.size);
                                for (var c = 0, h = d.length; c < h; c++) {
                                    t = d[c];
                                    var v = t.byteLength;
                                    if (l) {
                                        if (l > v) {
                                            l -= v;
                                            continue
                                        }
                                        t = t.subarray(l),
                                            v -= l,
                                            l = 0
                                    }
                                    n.set(t, u),
                                        u += v
                                }
                                return i && (i -= a + 3),
                                {
                                    data: n,
                                    pts: s,
                                    dts: o,
                                    len: i
                                }
                            }
                            return null
                        }
                    }, {
                        key: "pushAccesUnit",
                        value: function (e, t) {
                            if (e.units.length && e.frame) {
                                var r = t.samples
                                    , i = r.length;
                                !this.config.forceKeyFrameOnDiscontinuity || e.key === !0 || t.sps && (i || this.contiguous) ? (e.id = i,
                                    r.push(e)) : t.dropped++
                            }
                            e.debug.length && g.logger.log(e.pts + "/" + e.dts + ":" + e.debug)
                        }
                    }, {
                        key: "_parseAVCPES",
                        value: function (e, t) {
                            var r, i, a, n = this, s = this._avcTrack, o = this._parseAVCNALu(e.data), l = this.avcSample;
                            e.data = null,
                                o.forEach(function (t) {
                                    switch (t.type) {
                                        case 1:
                                            i = !0,
                                                l.frame = !0;
                                            var o = t.data;
                                            if (o.length > 4) {
                                                var u = new f.default(o).readSliceType();
                                                2 !== u && 4 !== u && 7 !== u && 9 !== u || (l.key = !0)
                                            }
                                            break;
                                        case 5:
                                            i = !0,
                                                l || (l = n.avcSample = n._createAVCSample(!0, e.pts, e.dts, "")),
                                                l.key = !0,
                                                l.frame = !0;
                                            break;
                                        case 6:
                                            i = !0,
                                                r = new f.default(n.discardEPB(t.data)),
                                                r.readUByte();
                                            for (var d = 0, c = 0, h = !1, g = 0; !h && r.bytesAvailable > 1;) {
                                                d = 0;
                                                do {
                                                    g = r.readUByte(),
                                                        d += g
                                                } while (255 === g);
                                                c = 0;
                                                do {
                                                    g = r.readUByte(),
                                                        c += g
                                                } while (255 === g);
                                                if (4 === d && 0 !== r.bytesAvailable) {
                                                    h = !0;
                                                    if (181 === r.readUByte()) {
                                                        if (49 === r.readUShort()) {
                                                            if (1195456820 === r.readUInt()) {
                                                                if (3 === r.readUByte()) {
                                                                    var v = r.readUByte()
                                                                        , p = r.readUByte()
                                                                        , y = 31 & v
                                                                        , m = [v, p];
                                                                    for (a = 0; a < y; a++)
                                                                        m.push(r.readUByte()),
                                                                            m.push(r.readUByte()),
                                                                            m.push(r.readUByte());
                                                                    n._insertSampleInOrder(n._txtTrack.samples, {
                                                                        type: 3,
                                                                        pts: e.pts,
                                                                        bytes: m
                                                                    })
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else if (c < r.bytesAvailable)
                                                    for (a = 0; a < c; a++)
                                                        r.readUByte()
                                            }
                                            break;
                                        case 7:
                                            if (i = !0,
                                                !s.sps) {
                                                r = new f.default(t.data);
                                                var E = r.readSPS();
                                                s.width = E.width,
                                                    s.height = E.height,
                                                    s.pixelRatio = E.pixelRatio,
                                                    s.sps = [t.data],
                                                    s.duration = n._duration;
                                                var b = t.data.subarray(1, 4)
                                                    , T = "avc1.";
                                                for (a = 0; a < 3; a++) {
                                                    var _ = b[a].toString(16);
                                                    _.length < 2 && (_ = "0" + _),
                                                        T += _
                                                }
                                                s.codec = T
                                            }
                                            break;
                                        case 8:
                                            i = !0,
                                                s.pps || (s.pps = [t.data]);
                                            break;
                                        case 9:
                                            i = !1,
                                                l && n.pushAccesUnit(l, s),
                                                l = n.avcSample = n._createAVCSample(!1, e.pts, e.dts, "");
                                            break;
                                        case 12:
                                            i = !1;
                                            break;
                                        default:
                                            i = !1,
                                                l && (l.debug += "unknown NAL " + t.type + " ")
                                    }
                                    if (l && i) {
                                        l.units.push(t)
                                    }
                                }),
                                t && l && (this.pushAccesUnit(l, s),
                                    this.avcSample = null)
                        }
                    }, {
                        key: "_createAVCSample",
                        value: function (e, t, r, i) {
                            return {
                                key: e,
                                pts: t,
                                dts: r,
                                units: [],
                                debug: i
                            }
                        }
                    }, {
                        key: "_insertSampleInOrder",
                        value: function (e, t) {
                            var r = e.length;
                            if (r > 0) {
                                if (t.pts >= e[r - 1].pts)
                                    e.push(t);
                                else
                                    for (var i = r - 1; i >= 0; i--)
                                        if (t.pts < e[i].pts) {
                                            e.splice(i, 0, t);
                                            break
                                        }
                            } else
                                e.push(t)
                        }
                    }, {
                        key: "_getLastNalUnit",
                        value: function () {
                            var e = this.avcSample
                                , t = void 0;
                            if (!e || 0 === e.units.length) {
                                var r = this._avcTrack
                                    , i = r.samples;
                                e = i[i.length - 1]
                            }
                            if (e) {
                                var a = e.units;
                                t = a[a.length - 1]
                            }
                            return t
                        }
                    }, {
                        key: "_parseAVCNALu",
                        value: function (e) {
                            var t, r, i, a, n, s = 0, o = e.byteLength, l = this._avcTrack, u = l.naluState || 0, d = u, f = [], c = -1;
                            for (u === -1 && (c = 0,
                                n = 31 & e[0],
                                u = 0,
                                s = 1); s < o;)
                                if (t = e[s++],
                                    u)
                                    if (1 !== u)
                                        if (t)
                                            if (1 === t) {
                                                if (c >= 0)
                                                    i = {
                                                        data: e.subarray(c, s - u - 1),
                                                        type: n
                                                    },
                                                        f.push(i);
                                                else {
                                                    var h = this._getLastNalUnit();
                                                    if (h && (d && s <= 4 - d && h.state && (h.data = h.data.subarray(0, h.data.byteLength - d)),
                                                        (r = s - u - 1) > 0)) {
                                                        var g = new Uint8Array(h.data.byteLength + r);
                                                        g.set(h.data, 0),
                                                            g.set(e.subarray(0, r), h.data.byteLength),
                                                            h.data = g
                                                    }
                                                }
                                                s < o ? (a = 31 & e[s],
                                                    c = s,
                                                    n = a,
                                                    u = 0) : u = -1
                                            } else
                                                u = 0;
                                        else
                                            u = 3;
                                    else
                                        u = t ? 0 : 2;
                                else
                                    u = t ? 0 : 1;
                            if (c >= 0 && u >= 0 && (i = {
                                data: e.subarray(c, o),
                                type: n,
                                state: u
                            },
                                f.push(i)),
                                0 === f.length) {
                                var v = this._getLastNalUnit();
                                if (v) {
                                    var p = new Uint8Array(v.data.byteLength + e.byteLength);
                                    p.set(v.data, 0),
                                        p.set(e, v.data.byteLength),
                                        v.data = p
                                }
                            }
                            return l.naluState = u,
                                f
                        }
                    }, {
                        key: "discardEPB",
                        value: function (e) {
                            for (var t, r, i = e.byteLength, a = [], n = 1; n < i - 2;)
                                0 === e[n] && 0 === e[n + 1] && 3 === e[n + 2] ? (a.push(n + 2),
                                    n += 2) : n++;
                            if (0 === a.length)
                                return e;
                            t = i - a.length,
                                r = new Uint8Array(t);
                            var s = 0;
                            for (n = 0; n < t; s++,
                                n++)
                                s === a[0] && (s++,
                                    a.shift()),
                                    r[n] = e[s];
                            return r
                        }
                    }, {
                        key: "_parseAACPES",
                        value: function (e) {
                            var t, r, i, a, n, s, l, d, f, c = this._audioTrack, h = e.data, p = e.pts, y = this.aacOverFlow, m = this.aacLastPTS;
                            if (y) {
                                var E = new Uint8Array(y.byteLength + h.byteLength);
                                E.set(y, 0),
                                    E.set(h, y.byteLength),
                                    h = E
                            }
                            for (n = 0,
                                d = h.length; n < d - 1 && (255 !== h[n] || 240 != (240 & h[n + 1])); n++)
                                ;
                            if (n) {
                                var b, T;
                                if (n < d - 1 ? (b = "AAC PES did not start with ADTS header,offset:" + n,
                                    T = !1) : (b = "no ADTS header found in AAC PES",
                                        T = !0),
                                    g.logger.warn("parsing error:" + b),
                                    this.observer.trigger(u.default.ERROR, {
                                        type: v.ErrorTypes.MEDIA_ERROR,
                                        details: v.ErrorDetails.FRAG_PARSING_ERROR,
                                        fatal: T,
                                        reason: b
                                    }),
                                    T)
                                    return
                            }
                            if (!c.samplerate) {
                                var _ = this.audioCodec;
                                t = o.default.getAudioConfig(this.observer, h, n, _),
                                    c.config = t.config,
                                    c.samplerate = t.samplerate,
                                    c.channelCount = t.channelCount,
                                    c.codec = t.codec,
                                    c.manifestCodec = t.manifestCodec,
                                    c.duration = this._duration,
                                    g.logger.log("parsed codec:" + c.codec + ",rate:" + t.samplerate + ",nb channel:" + t.channelCount)
                            }
                            if (a = 0,
                                i = 9216e4 / c.samplerate,
                                y && m) {
                                var k = m + i;
                                Math.abs(k - p) > 1 && (g.logger.log("AAC: align PTS for overlapping frames by " + Math.round((k - p) / 90)),
                                    p = k)
                            }
                            for (; n + 5 < d && (s = 1 & h[n + 1] ? 7 : 9,
                                r = (3 & h[n + 3]) << 11 | h[n + 4] << 3 | (224 & h[n + 5]) >>> 5,
                                (r -= s) > 0 && n + s + r <= d);)
                                for (l = p + a * i,
                                    f = {
                                        unit: h.subarray(n + s, n + s + r),
                                        pts: l,
                                        dts: l
                                    },
                                    c.samples.push(f),
                                    c.len += r,
                                    n += r + s,
                                    a++; n < d - 1 && (255 !== h[n] || 240 != (240 & h[n + 1])); n++)
                                    ;
                            y = n < d ? h.subarray(n, d) : null,
                                this.aacOverFlow = y,
                                this.aacLastPTS = l
                        }
                    }, {
                        key: "_parseMPEGPES",
                        value: function (e) {
                            for (var t, r = e.data, i = e.pts, a = r.length, n = 0, s = 0; s < a && (t = this._parseMpeg(r, s, a, n++, i)) > 0;)
                                s += t
                        }
                    }, {
                        key: "_onMpegFrame",
                        value: function (e, t, r, i, a, n) {
                            var s = 1152 / r * 1e3
                                , o = n + a * s
                                , l = this._audioTrack;
                            l.config = [],
                                l.channelCount = i,
                                l.samplerate = r,
                                l.duration = this._duration,
                                l.samples.push({
                                    unit: e,
                                    pts: o,
                                    dts: o
                                }),
                                l.len += e.length
                        }
                    }, {
                        key: "_onMpegNoise",
                        value: function (e) {
                            g.logger.warn("mpeg audio has noise: " + e.length + " bytes")
                        }
                    }, {
                        key: "_parseMpeg",
                        value: function (e, t, r, i, a) {
                            var n = [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160]
                                , s = [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3];
                            if (t + 2 > r)
                                return -1;
                            if (255 === e[t] || 224 == (224 & e[t + 1])) {
                                if (t + 24 > r)
                                    return -1;
                                var o = e[t + 1] >> 3 & 3
                                    , l = e[t + 1] >> 1 & 3
                                    , u = e[t + 2] >> 4 & 15
                                    , d = e[t + 2] >> 2 & 3
                                    , f = !!(2 & e[t + 2]);
                                if (1 !== o && 0 !== u && 15 !== u && 3 !== d) {
                                    var c = 3 === o ? 3 - l : 3 === l ? 3 : 4
                                        , h = 1e3 * n[14 * c + u - 1]
                                        , g = 3 === o ? 0 : 2 === o ? 1 : 2
                                        , v = s[3 * g + d]
                                        , p = f ? 1 : 0
                                        , y = e[t + 3] >> 6 == 3 ? 1 : 2
                                        , m = 3 === l ? (3 === o ? 12 : 6) * h / v + p << 2 : (3 === o ? 144 : 72) * h / v + p | 0;
                                    return t + m > r ? -1 : (this._onMpegFrame && this._onMpegFrame(e.subarray(t, t + m), h, v, y, i, a),
                                        m)
                                }
                            }
                            for (var E = t + 2; E < r;) {
                                if (255 === e[E - 1] && 224 == (224 & e[E]))
                                    return this._onMpegNoise && this._onMpegNoise(e.subarray(t, E - 1)),
                                        E - t - 1;
                                E++
                            }
                            return -1
                        }
                    }, {
                        key: "_parseID3PES",
                        value: function (e) {
                            this._id3Track.samples.push(e)
                        }
                    }], [{
                        key: "probe",
                        value: function (e) {
                            return e.length >= 564 && 71 === e[0] && 71 === e[188] && 71 === e[376]
                        }
                    }]),
                        e
                }();
            r.default = p
        }
            , {
            22: 22,
            26: 26,
            29: 29,
            31: 31,
            33: 33,
            51: 51
        }],
        31: [function (e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            r.ErrorTypes = {
                NETWORK_ERROR: "networkError",
                MEDIA_ERROR: "mediaError",
                MUX_ERROR: "muxError",
                OTHER_ERROR: "otherError"
            },
                r.ErrorDetails = {
                    MANIFEST_LOAD_ERROR: "manifestLoadError",
                    MANIFEST_LOAD_TIMEOUT: "manifestLoadTimeOut",
                    MANIFEST_PARSING_ERROR: "manifestParsingError",
                    MANIFEST_INCOMPATIBLE_CODECS_ERROR: "manifestIncompatibleCodecsError",
                    LEVEL_LOAD_ERROR: "levelLoadError",
                    LEVEL_LOAD_TIMEOUT: "levelLoadTimeOut",
                    LEVEL_SWITCH_ERROR: "levelSwitchError",
                    AUDIO_TRACK_LOAD_ERROR: "audioTrackLoadError",
                    AUDIO_TRACK_LOAD_TIMEOUT: "audioTrackLoadTimeOut",
                    FRAG_LOAD_ERROR: "fragLoadError",
                    FRAG_LOOP_LOADING_ERROR: "fragLoopLoadingError",
                    FRAG_LOAD_TIMEOUT: "fragLoadTimeOut",
                    FRAG_DECRYPT_ERROR: "fragDecryptError",
                    FRAG_PARSING_ERROR: "fragParsingError",
                    REMUX_ALLOC_ERROR: "remuxAllocError",
                    KEY_LOAD_ERROR: "keyLoadError",
                    KEY_LOAD_TIMEOUT: "keyLoadTimeOut",
                    BUFFER_ADD_CODEC_ERROR: "bufferAddCodecError",
                    BUFFER_APPEND_ERROR: "bufferAppendError",
                    BUFFER_APPENDING_ERROR: "bufferAppendingError",
                    BUFFER_STALLED_ERROR: "bufferStalledError",
                    BUFFER_FULL_ERROR: "bufferFullError",
                    BUFFER_SEEK_OVER_HOLE: "bufferSeekOverHole",
                    BUFFER_NUDGE_ON_STALL: "bufferNudgeOnStall",
                    INTERNAL_EXCEPTION: "internalException",
                    WEBVTT_EXCEPTION: "webVTTException"
                }
        }
            , {}],
        32: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            }
                : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                , n = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0,
                                "value" in i && (i.writable = !0),
                                Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function (t, r, i) {
                        return r && e(t.prototype, r),
                            i && e(t, i),
                            t
                    }
                }()
                , s = e(51)
                , o = e(31)
                , l = e(33)
                , u = function (e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(l)
                , d = function () {
                    function e(t) {
                        i(this, e),
                            this.hls = t,
                            this.onEvent = this.onEvent.bind(this);
                        for (var r = arguments.length, a = Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
                            a[n - 1] = arguments[n];
                        this.handledEvents = a,
                            this.useGenericHandler = !0,
                            this.registerListeners()
                    }
                    return n(e, [{
                        key: "destroy",
                        value: function () {
                            this.unregisterListeners()
                        }
                    }, {
                        key: "isEventHandler",
                        value: function () {
                            return "object" === a(this.handledEvents) && this.handledEvents.length && "function" == typeof this.onEvent
                        }
                    }, {
                        key: "registerListeners",
                        value: function () {
                            this.isEventHandler() && this.handledEvents.forEach(function (e) {
                                if ("hlsEventGeneric" === e)
                                    throw new Error("Forbidden event name: " + e);
                                this.hls.on(e, this.onEvent)
                            }
                                .bind(this))
                        }
                    }, {
                        key: "unregisterListeners",
                        value: function () {
                            this.isEventHandler() && this.handledEvents.forEach(function (e) {
                                this.hls.off(e, this.onEvent)
                            }
                                .bind(this))
                        }
                    }, {
                        key: "onEvent",
                        value: function (e, t) {
                            this.onEventGeneric(e, t)
                        }
                    }, {
                        key: "onEventGeneric",
                        value: function (e, t) {
                            var r = function (e, t) {
                                var r = "on" + e.replace("hls", "");
                                if ("function" != typeof this[r])
                                    throw new Error("Event " + e + " has no generic handler in this " + this.constructor.name + " class (tried " + r + ")");
                                return this[r].bind(this, t)
                            };
                            try {
                                r.call(this, e, t).call()
                            } catch (t) {
                                s.logger.error("internal error happened while processing " + e + ":" + t.message),
                                    this.hls.trigger(u.default.ERROR, {
                                        type: o.ErrorTypes.OTHER_ERROR,
                                        details: o.ErrorDetails.INTERNAL_EXCEPTION,
                                        fatal: !1,
                                        event: e,
                                        err: t
                                    })
                            }
                        }
                    }]),
                        e
                }();
            r.default = d
        }
            , {
            31: 31,
            33: 33,
            51: 51
        }],
        33: [function (e, t, r) {
            "use strict";
            t.exports = {
                MEDIA_ATTACHING: "hlsMediaAttaching",
                MEDIA_ATTACHED: "hlsMediaAttached",
                MEDIA_DETACHING: "hlsMediaDetaching",
                MEDIA_DETACHED: "hlsMediaDetached",
                BUFFER_RESET: "hlsBufferReset",
                BUFFER_CODECS: "hlsBufferCodecs",
                BUFFER_CREATED: "hlsBufferCreated",
                BUFFER_APPENDING: "hlsBufferAppending",
                BUFFER_APPENDED: "hlsBufferAppended",
                BUFFER_EOS: "hlsBufferEos",
                BUFFER_FLUSHING: "hlsBufferFlushing",
                BUFFER_FLUSHED: "hlsBufferFlushed",
                MANIFEST_LOADING: "hlsManifestLoading",
                MANIFEST_LOADED: "hlsManifestLoaded",
                MANIFEST_PARSED: "hlsManifestParsed",
                LEVEL_SWITCH: "hlsLevelSwitch",
                LEVEL_SWITCHING: "hlsLevelSwitching",
                LEVEL_SWITCHED: "hlsLevelSwitched",
                LEVEL_LOADING: "hlsLevelLoading",
                LEVEL_LOADED: "hlsLevelLoaded",
                LEVEL_UPDATED: "hlsLevelUpdated",
                LEVEL_PTS_UPDATED: "hlsLevelPtsUpdated",
                AUDIO_TRACKS_UPDATED: "hlsAudioTracksUpdated",
                AUDIO_TRACK_SWITCH: "hlsAudioTrackSwitch",
                AUDIO_TRACK_SWITCHING: "hlsAudioTrackSwitching",
                AUDIO_TRACK_SWITCHED: "hlsAudioTrackSwitched",
                AUDIO_TRACK_LOADING: "hlsAudioTrackLoading",
                AUDIO_TRACK_LOADED: "hlsAudioTrackLoaded",
                SUBTITLE_TRACKS_UPDATED: "hlsSubtitleTracksUpdated",
                SUBTITLE_TRACK_SWITCH: "hlsSubtitleTrackSwitch",
                SUBTITLE_TRACK_LOADING: "hlsSubtitleTrackLoading",
                SUBTITLE_TRACK_LOADED: "hlsSubtitleTrackLoaded",
                SUBTITLE_FRAG_PROCESSED: "hlsSubtitleFragProcessed",
                INIT_PTS_FOUND: "hlsInitPtsFound",
                FRAG_LOADING: "hlsFragLoading",
                FRAG_LOAD_PROGRESS: "hlsFragLoadProgress",
                FRAG_LOAD_EMERGENCY_ABORTED: "hlsFragLoadEmergencyAborted",
                FRAG_LOADED: "hlsFragLoaded",
                FRAG_DECRYPTED: "hlsFragDecrypted",
                FRAG_PARSING_INIT_SEGMENT: "hlsFragParsingInitSegment",
                FRAG_PARSING_USERDATA: "hlsFragParsingUserdata",
                FRAG_PARSING_METADATA: "hlsFragParsingMetadata",
                FRAG_PARSING_DATA: "hlsFragParsingData",
                FRAG_PARSED: "hlsFragParsed",
                FRAG_BUFFERED: "hlsFragBuffered",
                FRAG_CHANGED: "hlsFragChanged",
                FPS_DROP: "hlsFpsDrop",
                FPS_DROP_LEVEL_CAPPING: "hlsFpsDropLevelCapping",
                ERROR: "hlsError",
                DESTROYING: "hlsDestroying",
                KEY_LOADING: "hlsKeyLoading",
                KEY_LOADED: "hlsKeyLoaded",
                STREAM_STATE_TRANSITION: "hlsStreamStateTransition"
            }
        }
            , {}],
        34: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = function () {
                    function e() {
                        i(this, e)
                    }
                    return a(e, null, [{
                        key: "getSilentFrame",
                        value: function (e, t) {
                            switch (e) {
                                case "mp4a.40.2":
                                    if (1 === t)
                                        return new Uint8Array([0, 200, 0, 128, 35, 128]);
                                    if (2 === t)
                                        return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
                                    if (3 === t)
                                        return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
                                    if (4 === t)
                                        return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
                                    if (5 === t)
                                        return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
                                    if (6 === t)
                                        return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
                                    break;
                                default:
                                    if (1 === t)
                                        return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                                    if (2 === t)
                                        return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                                    if (3 === t)
                                        return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94])
                            }
                            return null
                        }
                    }]),
                        e
                }();
            r.default = n
        }
            , {}],
        35: [function (e, t, r) {
            "use strict";
            var i = {
                isBuffered: function (e, t) {
                    if (e)
                        for (var r = e.buffered, i = 0; i < r.length; i++)
                            if (t >= r.start(i) && t <= r.end(i))
                                return !0;
                    return !1
                },
                bufferInfo: function (e, t, r) {
                    if (e) {
                        var i, a = e.buffered, n = [];
                        for (i = 0; i < a.length; i++)
                            n.push({
                                start: a.start(i),
                                end: a.end(i)
                            });
                        return this.bufferedInfo(n, t, r)
                    }
                    return {
                        len: 0,
                        start: t,
                        end: t,
                        nextStart: void 0
                    }
                },
                bufferedInfo: function (e, t, r) {
                    var i, a, n, s, o, l = [];
                    for (e.sort(function (e, t) {
                        var r = e.start - t.start;
                        return r ? r : t.end - e.end
                    }),
                        o = 0; o < e.length; o++) {
                        var u = l.length;
                        if (u) {
                            var d = l[u - 1].end;
                            e[o].start - d < r ? e[o].end > d && (l[u - 1].end = e[o].end) : l.push(e[o])
                        } else
                            l.push(e[o])
                    }
                    for (o = 0,
                        i = 0,
                        a = n = t; o < l.length; o++) {
                        var f = l[o].start
                            , c = l[o].end;
                        if (t + r >= f && t < c)
                            a = f,
                                n = c,
                                i = n - t;
                        else if (t + r < f) {
                            s = f;
                            break
                        }
                    }
                    return {
                        len: i,
                        start: a,
                        end: n,
                        nextStart: s
                    }
                }
            };
            t.exports = i
        }
            , {}],
        36: [function (e, t, r) {
            "use strict";
            var i = e(51)
                , a = {
                    mergeDetails: function (e, t) {
                        var r, n = Math.max(e.startSN, t.startSN) - t.startSN, s = Math.min(e.endSN, t.endSN) - t.startSN, o = t.startSN - e.startSN, l = e.fragments, u = t.fragments, d = 0;
                        if (s < n)
                            return void (t.PTSKnown = !1);
                        for (var f = n; f <= s; f++) {
                            var c = l[o + f]
                                , h = u[f];
                            h && c && (d = c.cc - h.cc,
                                isNaN(c.startPTS) || (h.start = h.startPTS = c.startPTS,
                                    h.endPTS = c.endPTS,
                                    h.duration = c.duration,
                                    r = h))
                        }
                        if (d)
                            for (i.logger.log("discontinuity sliding from playlist, take drift into account"),
                                f = 0; f < u.length; f++)
                                u[f].cc += d;
                        if (r)
                            a.updateFragPTSDTS(t, r, r.startPTS, r.endPTS, r.startDTS, r.endDTS);
                        else if (o >= 0 && o < l.length) {
                            var g = l[o].start;
                            for (f = 0; f < u.length; f++)
                                u[f].start += g
                        }
                        t.PTSKnown = e.PTSKnown
                    },
                    updateFragPTSDTS: function (e, t, r, i, n, s) {
                        if (!isNaN(t.startPTS)) {
                            var o = Math.abs(t.startPTS - r);
                            isNaN(t.deltaPTS) ? t.deltaPTS = o : t.deltaPTS = Math.max(o, t.deltaPTS),
                                r = Math.min(r, t.startPTS),
                                i = Math.max(i, t.endPTS),
                                n = Math.min(n, t.startDTS),
                                s = Math.max(s, t.endDTS)
                        }
                        var l = r - t.start;
                        t.start = t.startPTS = r,
                            t.endPTS = i,
                            t.startDTS = n,
                            t.endDTS = s,
                            t.duration = i - r;
                        var u = t.sn;
                        if (!e || u < e.startSN || u > e.endSN)
                            return 0;
                        var d, f, c;
                        for (d = u - e.startSN,
                            f = e.fragments,
                            t = f[d],
                            c = d; c > 0; c--)
                            a.updatePTS(f, c, c - 1);
                        for (c = d; c < f.length - 1; c++)
                            a.updatePTS(f, c, c + 1);
                        return e.PTSKnown = !0,
                            l
                    },
                    updatePTS: function (e, t, r) {
                        var a = e[t]
                            , n = e[r]
                            , s = n.startPTS;
                        isNaN(s) ? n.start = r > t ? a.start + a.duration : Math.max(a.start - n.duration, 0) : r > t ? (a.duration = s - a.start,
                            a.duration < 0 && i.logger.warn("negative duration computed for frag " + a.sn + ",level " + a.level + ", there should be some duration drift between playlist and fragment!")) : (n.duration = a.start - s,
                                n.duration < 0 && i.logger.warn("negative duration computed for frag " + n.sn + ",level " + n.level + ", there should be some duration drift between playlist and fragment!"))
                    }
                };
            t.exports = a
        }
            , {
            51: 51
        }],
        37: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , s = e(2)
                , o = i(s)
                , l = e(33)
                , u = i(l)
                , d = e(31)
                , f = e(41)
                , c = i(f)
                , h = e(39)
                , g = i(h)
                , v = e(40)
                , p = i(v)
                , y = e(13)
                , m = i(y)
                , E = e(12)
                , b = i(E)
                , T = e(11)
                , _ = i(T)
                , k = e(51)
                , R = e(1)
                , A = i(R)
                , S = e(4)
                , L = function () {
                    function e() {
                        var t = this
                            , r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        a(this, e);
                        var i = e.DefaultConfig;
                        if ((r.liveSyncDurationCount || r.liveMaxLatencyDurationCount) && (r.liveSyncDuration || r.liveMaxLatencyDuration))
                            throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
                        for (var n in i)
                            n in r || (r[n] = i[n]);
                        if (void 0 !== r.liveMaxLatencyDurationCount && r.liveMaxLatencyDurationCount <= r.liveSyncDurationCount)
                            throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"');
                        if (void 0 !== r.liveMaxLatencyDuration && (r.liveMaxLatencyDuration <= r.liveSyncDuration || void 0 === r.liveSyncDuration))
                            throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"');
                        (0,
                            k.enableLogs)(r.debug),
                            this.config = r,
                            this._autoLevelCapping = -1;
                        var s = this.observer = new A.default;
                        s.trigger = function (e) {
                            for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                                r[i - 1] = arguments[i];
                            s.emit.apply(s, [e, e].concat(r))
                        }
                            ,
                            s.off = function (e) {
                                for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                                    r[i - 1] = arguments[i];
                                s.removeListener.apply(s, [e].concat(r))
                            }
                            ,
                            this.on = s.on.bind(s),
                            this.off = s.off.bind(s),
                            this.trigger = s.trigger.bind(s);
                        var o = this.abrController = new r.abrController(this)
                            , l = new r.bufferController(this)
                            , u = new r.capLevelController(this)
                            , d = new r.fpsController(this)
                            , f = new c.default(this)
                            , h = new g.default(this)
                            , v = new p.default(this)
                            , y = new _.default(this)
                            , E = this.levelController = new b.default(this)
                            , T = this.streamController = new m.default(this)
                            , R = [E, T]
                            , S = r.audioStreamController;
                        S && R.push(new S(this)),
                            this.networkControllers = R;
                        var L = [f, h, v, o, l, u, d, y];
                        if (S = r.audioTrackController) {
                            var w = new S(this);
                            this.audioTrackController = w,
                                L.push(w)
                        }
                        if (S = r.subtitleTrackController) {
                            var D = new S(this);
                            this.subtitleTrackController = D,
                                L.push(D)
                        }
                        [r.subtitleStreamController, r.timelineController].forEach(function (e) {
                            e && L.push(new e(t))
                        }),
                            this.coreComponents = L
                    }
                    return n(e, null, [{
                        key: "isSupported",
                        value: function () {
                            return window.MediaSource = window.MediaSource || window.WebKitMediaSource,
                                window.MediaSource && "function" == typeof window.MediaSource.isTypeSupported && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
                        }
                    }, {
                        key: "version",
                        get: function () {
                            return "0.7.6"
                        }
                    }, {
                        key: "Events",
                        get: function () {
                            return u.default
                        }
                    }, {
                        key: "ErrorTypes",
                        get: function () {
                            return d.ErrorTypes
                        }
                    }, {
                        key: "ErrorDetails",
                        get: function () {
                            return d.ErrorDetails
                        }
                    }, {
                        key: "DefaultConfig",
                        get: function () {
                            return e.defaultConfig ? e.defaultConfig : S.hlsDefaultConfig
                        },
                        set: function (t) {
                            e.defaultConfig = t
                        }
                    }]),
                        n(e, [{
                            key: "destroy",
                            value: function () {
                                k.logger.log("destroy"),
                                    this.trigger(u.default.DESTROYING),
                                    this.detachMedia(),
                                    this.coreComponents.concat(this.networkControllers).forEach(function (e) {
                                        e.destroy()
                                    }),
                                    this.url = null,
                                    this.observer.removeAllListeners(),
                                    this._autoLevelCapping = -1
                            }
                        }, {
                            key: "attachMedia",
                            value: function (e) {
                                k.logger.log("attachMedia"),
                                    this.media = e,
                                    this.trigger(u.default.MEDIA_ATTACHING, {
                                        media: e
                                    })
                            }
                        }, {
                            key: "detachMedia",
                            value: function () {
                                k.logger.log("detachMedia"),
                                    this.trigger(u.default.MEDIA_DETACHING),
                                    this.media = null
                            }
                        }, {
                            key: "loadSource",
                            value: function (e) {
                                e = o.default.buildAbsoluteURL(window.location.href, e, {
                                    alwaysNormalize: !0
                                }),
                                    k.logger.log("loadSource:" + e),
                                    this.url = e,
                                    this.trigger(u.default.MANIFEST_LOADING, {
                                        url: e
                                    })
                            }
                        }, {
                            key: "startLoad",
                            value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
                                k.logger.log("startLoad(" + e + ")"),
                                    this.networkControllers.forEach(function (t) {
                                        t.startLoad(e)
                                    })
                            }
                        }, {
                            key: "stopLoad",
                            value: function () {
                                k.logger.log("stopLoad"),
                                    this.networkControllers.forEach(function (e) {
                                        e.stopLoad()
                                    })
                            }
                        }, {
                            key: "swapAudioCodec",
                            value: function () {
                                k.logger.log("swapAudioCodec"),
                                    this.streamController.swapAudioCodec()
                            }
                        }, {
                            key: "recoverMediaError",
                            value: function () {
                                k.logger.log("recoverMediaError");
                                var e = this.media;
                                this.detachMedia(),
                                    this.attachMedia(e)
                            }
                        }, {
                            key: "levels",
                            get: function () {
                                return this.levelController.levels
                            }
                        }, {
                            key: "currentLevel",
                            get: function () {
                                return this.streamController.currentLevel
                            },
                            set: function (e) {
                                k.logger.log("set currentLevel:" + e),
                                    this.loadLevel = e,
                                    this.streamController.immediateLevelSwitch()
                            }
                        }, {
                            key: "nextLevel",
                            get: function () {
                                return this.streamController.nextLevel
                            },
                            set: function (e) {
                                k.logger.log("set nextLevel:" + e),
                                    this.levelController.manualLevel = e,
                                    this.streamController.nextLevelSwitch()
                            }
                        }, {
                            key: "loadLevel",
                            get: function () {
                                return this.levelController.level
                            },
                            set: function (e) {
                                k.logger.log("set loadLevel:" + e),
                                    this.levelController.manualLevel = e
                            }
                        }, {
                            key: "nextLoadLevel",
                            get: function () {
                                return this.levelController.nextLoadLevel
                            },
                            set: function (e) {
                                this.levelController.nextLoadLevel = e
                            }
                        }, {
                            key: "firstLevel",
                            get: function () {
                                return Math.max(this.levelController.firstLevel, this.minAutoLevel)
                            },
                            set: function (e) {
                                k.logger.log("set firstLevel:" + e),
                                    this.levelController.firstLevel = e
                            }
                        }, {
                            key: "startLevel",
                            get: function () {
                                return this.levelController.startLevel
                            },
                            set: function (e) {
                                k.logger.log("set startLevel:" + e);
                                var t = this;
                                e !== -1 && (e = Math.max(e, t.minAutoLevel)),
                                    t.levelController.startLevel = e
                            }
                        }, {
                            key: "autoLevelCapping",
                            get: function () {
                                return this._autoLevelCapping
                            },
                            set: function (e) {
                                k.logger.log("set autoLevelCapping:" + e),
                                    this._autoLevelCapping = e
                            }
                        }, {
                            key: "autoLevelEnabled",
                            get: function () {
                                return this.levelController.manualLevel === -1
                            }
                        }, {
                            key: "manualLevel",
                            get: function () {
                                return this.levelController.manualLevel
                            }
                        }, {
                            key: "minAutoLevel",
                            get: function () {
                                for (var e = this, t = e.levels, r = e.config.minAutoBitrate, i = t ? t.length : 0, a = 0; a < i; a++) {
                                    if ((t[a].realBitrate ? Math.max(t[a].realBitrate, t[a].bitrate) : t[a].bitrate) > r)
                                        return a
                                }
                                return 0
                            }
                        }, {
                            key: "maxAutoLevel",
                            get: function () {
                                var e = this
                                    , t = e.levels
                                    , r = e.autoLevelCapping;
                                return r === -1 && t && t.length ? t.length - 1 : r
                            }
                        }, {
                            key: "nextAutoLevel",
                            get: function () {
                                var e = this;
                                return Math.min(Math.max(e.abrController.nextAutoLevel, e.minAutoLevel), e.maxAutoLevel)
                            },
                            set: function (e) {
                                var t = this;
                                t.abrController.nextAutoLevel = Math.max(t.minAutoLevel, e)
                            }
                        }, {
                            key: "audioTracks",
                            get: function () {
                                var e = this.audioTrackController;
                                return e ? e.audioTracks : []
                            }
                        }, {
                            key: "audioTrack",
                            get: function () {
                                var e = this.audioTrackController;
                                return e ? e.audioTrack : -1
                            },
                            set: function (e) {
                                var t = this.audioTrackController;
                                t && (t.audioTrack = e)
                            }
                        }, {
                            key: "liveSyncPosition",
                            get: function () {
                                return this.streamController.liveSyncPosition
                            }
                        }, {
                            key: "subtitleTracks",
                            get: function () {
                                var e = this.subtitleTrackController;
                                return e ? e.subtitleTracks : []
                            }
                        }, {
                            key: "subtitleTrack",
                            get: function () {
                                var e = this.subtitleTrackController;
                                return e ? e.subtitleTrack : -1
                            },
                            set: function (e) {
                                var t = this.subtitleTrackController;
                                t && (t.subtitleTrack = e)
                            }
                        }]),
                        e
                }();
            r.default = L
        }
            , {
            1: 1,
            11: 11,
            12: 12,
            13: 13,
            2: 2,
            31: 31,
            33: 33,
            39: 39,
            4: 4,
            40: 40,
            41: 41,
            51: 51
        }],
        38: [function (e, t, r) {
            "use strict";
            t.exports = e(37).default
        }
            , {
            37: 37
        }],
        39: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , l = e(33)
                , u = i(l)
                , d = e(32)
                , f = i(d)
                , c = e(31)
                , h = e(51)
                , g = function (e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.FRAG_LOADING));
                        return r.loaders = {},
                            r
                    }
                    return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function () {
                                var e = this.loaders;
                                for (var t in e) {
                                    var r = e[t];
                                    r && r.destroy()
                                }
                                this.loaders = {},
                                    f.default.prototype.destroy.call(this)
                            }
                        }, {
                            key: "onFragLoading",
                            value: function (e) {
                                var t = e.frag
                                    , r = t.type
                                    , i = this.loaders[r]
                                    , a = this.hls.config;
                                t.loaded = 0,
                                    i && (h.logger.warn("abort previous fragment loader for type:" + r),
                                        i.abort()),
                                    i = this.loaders[r] = t.loader = void 0 !== a.fLoader ? new a.fLoader(a) : new a.loader(a);
                                var n = void 0
                                    , s = void 0
                                    , o = void 0;
                                n = {
                                    url: t.url,
                                    frag: t,
                                    responseType: "arraybuffer",
                                    progressData: !1
                                };
                                var l = t.byteRangeStartOffset
                                    , u = t.byteRangeEndOffset;
                                isNaN(l) || isNaN(u) || (n.rangeStart = l,
                                    n.rangeEnd = u),
                                    s = {
                                        timeout: a.fragLoadingTimeOut,
                                        maxRetry: 0,
                                        retryDelay: 0,
                                        maxRetryDelay: a.fragLoadingMaxRetryTimeout
                                    },
                                    o = {
                                        onSuccess: this.loadsuccess.bind(this),
                                        onError: this.loaderror.bind(this),
                                        onTimeout: this.loadtimeout.bind(this),
                                        onProgress: this.loadprogress.bind(this)
                                    },
                                    i.load(n, s, o)
                            }
                        }, {
                            key: "loadsuccess",
                            value: function (e, t, r) {
                                var i = e.data
                                    , a = r.frag;
                                a.loader = void 0,
                                    this.loaders[a.type] = void 0,
                                    this.hls.trigger(u.default.FRAG_LOADED, {
                                        payload: i,
                                        frag: a,
                                        stats: t
                                    })
                            }
                        }, {
                            key: "loaderror",
                            value: function (e, t) {
                                var r = t.loader;
                                r && r.abort(),
                                    this.loaders[t.type] = void 0,
                                    this.hls.trigger(u.default.ERROR, {
                                        type: c.ErrorTypes.NETWORK_ERROR,
                                        details: c.ErrorDetails.FRAG_LOAD_ERROR,
                                        fatal: !1,
                                        frag: t.frag,
                                        response: e
                                    })
                            }
                        }, {
                            key: "loadtimeout",
                            value: function (e, t) {
                                var r = t.loader;
                                r && r.abort(),
                                    this.loaders[t.type] = void 0,
                                    this.hls.trigger(u.default.ERROR, {
                                        type: c.ErrorTypes.NETWORK_ERROR,
                                        details: c.ErrorDetails.FRAG_LOAD_TIMEOUT,
                                        fatal: !1,
                                        frag: t.frag
                                    })
                            }
                        }, {
                            key: "loadprogress",
                            value: function (e, t, r) {
                                var i = t.frag;
                                i.loaded = e.loaded,
                                    this.hls.trigger(u.default.FRAG_LOAD_PROGRESS, {
                                        frag: i,
                                        stats: e
                                    })
                            }
                        }]),
                        t
                }(f.default);
            r.default = g
        }
            , {
            31: 31,
            32: 32,
            33: 33,
            51: 51
        }],
        40: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            function n(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function s(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , l = e(33)
                , u = i(l)
                , d = e(32)
                , f = i(d)
                , c = e(31)
                , h = e(51)
                , g = function (e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.KEY_LOADING));
                        return r.loaders = {},
                            r.decryptkey = null,
                            r.decrypturl = null,
                            r
                    }
                    return s(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function () {
                                for (var e in this.loaders) {
                                    var t = this.loaders[e];
                                    t && t.destroy()
                                }
                                this.loaders = {},
                                    f.default.prototype.destroy.call(this)
                            }
                        }, {
                            key: "onKeyLoading",
                            value: function (e) {
                                var t = e.frag
                                    , r = t.type
                                    , i = this.loaders[r]
                                    , a = t.decryptdata
                                    , n = a.uri;
                                if (n !== this.decrypturl || null === this.decryptkey) {
                                    var s = this.hls.config;
                                    i && (h.logger.warn("abort previous key loader for type:" + r),
                                        i.abort()),
                                        t.loader = this.loaders[r] = new s.loader(s),
                                        this.decrypturl = n,
                                        this.decryptkey = null;
                                    var o = void 0
                                        , l = void 0
                                        , d = void 0;
                                    o = {
                                        url: n,
                                        frag: t,
                                        responseType: "arraybuffer"
                                    },
                                        l = {
                                            timeout: s.fragLoadingTimeOut,
                                            maxRetry: s.fragLoadingMaxRetry,
                                            retryDelay: s.fragLoadingRetryDelay,
                                            maxRetryDelay: s.fragLoadingMaxRetryTimeout
                                        },
                                        d = {
                                            onSuccess: this.loadsuccess.bind(this),
                                            onError: this.loaderror.bind(this),
                                            onTimeout: this.loadtimeout.bind(this)
                                        },
                                        t.loader.load(o, l, d)
                                } else
                                    this.decryptkey && (a.key = this.decryptkey,
                                        this.hls.trigger(u.default.KEY_LOADED, {
                                            frag: t
                                        }))
                            }
                        }, {
                            key: "loadsuccess",
                            value: function (e, t, r) {
                                var i = r.frag;
                                this.decryptkey = i.decryptdata.key = new Uint8Array(e.data),
                                    i.loader = void 0,
                                    this.loaders[i.type] = void 0,
                                    this.hls.trigger(u.default.KEY_LOADED, {
                                        frag: i
                                    })
                            }
                        }, {
                            key: "loaderror",
                            value: function (e, t) {
                                var r = t.frag
                                    , i = r.loader;
                                i && i.abort(),
                                    this.loaders[t.type] = void 0,
                                    this.hls.trigger(u.default.ERROR, {
                                        type: c.ErrorTypes.NETWORK_ERROR,
                                        details: c.ErrorDetails.KEY_LOAD_ERROR,
                                        fatal: !1,
                                        frag: r,
                                        response: e
                                    })
                            }
                        }, {
                            key: "loadtimeout",
                            value: function (e, t) {
                                var r = t.frag
                                    , i = r.loader;
                                i && i.abort(),
                                    this.loaders[t.type] = void 0,
                                    this.hls.trigger(u.default.ERROR, {
                                        type: c.ErrorTypes.NETWORK_ERROR,
                                        details: c.ErrorDetails.KEY_LOAD_TIMEOUT,
                                        fatal: !1,
                                        frag: r
                                    })
                            }
                        }]),
                        t
                }(f.default);
            r.default = g
        }
            , {
            31: 31,
            32: 32,
            33: 33,
            51: 51
        }],
        41: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            function n(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            function s(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , l = e(2)
                , u = i(l)
                , d = e(33)
                , f = i(d)
                , c = e(32)
                , h = i(c)
                , g = e(31)
                , v = e(45)
                , p = i(v)
                , y = e(51)
                , m = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g
                , E = /#EXT-X-MEDIA:(.*)/g
                , b = /#EXTINF:(\d*(?:\.\d+)?)(?:,(.*))?|(?!#)(\S.+)|#EXT-X-BYTERANGE: *(.+)|#EXT-X-PROGRAM-DATE-TIME:(.+)|#.*/g
                , T = function () {
                    function e() {
                        s(this, e),
                            this.method = null,
                            this.key = null,
                            this.iv = null,
                            this._uri = null
                    }
                    return o(e, [{
                        key: "uri",
                        get: function () {
                            return !this._uri && this.reluri && (this._uri = u.default.buildAbsoluteURL(this.baseuri, this.reluri, {
                                alwaysNormalize: !0
                            })),
                                this._uri
                        }
                    }]),
                        e
                }()
                , _ = function () {
                    function e() {
                        s(this, e),
                            this._url = null,
                            this._byteRange = null,
                            this._decryptdata = null,
                            this.tagList = []
                    }
                    return o(e, [{
                        key: "createInitializationVector",
                        value: function (e) {
                            for (var t = new Uint8Array(16), r = 12; r < 16; r++)
                                t[r] = e >> 8 * (15 - r) & 255;
                            return t
                        }
                    }, {
                        key: "fragmentDecryptdataFromLevelkey",
                        value: function (e, t) {
                            var r = e;
                            return e && e.method && e.uri && !e.iv && (r = new T,
                                r.method = e.method,
                                r.baseuri = e.baseuri,
                                r.reluri = e.reluri,
                                r.iv = this.createInitializationVector(t)),
                                r
                        }
                    }, {
                        key: "cloneObj",
                        value: function (e) {
                            return JSON.parse(JSON.stringify(e))
                        }
                    }, {
                        key: "url",
                        get: function () {
                            return !this._url && this.relurl && (this._url = u.default.buildAbsoluteURL(this.baseurl, this.relurl, {
                                alwaysNormalize: !0
                            })),
                                this._url
                        },
                        set: function (e) {
                            this._url = e
                        }
                    }, {
                        key: "programDateTime",
                        get: function () {
                            return !this._programDateTime && this.rawProgramDateTime && (this._programDateTime = new Date(Date.parse(this.rawProgramDateTime))),
                                this._programDateTime
                        }
                    }, {
                        key: "byteRange",
                        get: function () {
                            if (!this._byteRange) {
                                var e = this._byteRange = [];
                                if (this.rawByteRange) {
                                    var t = this.rawByteRange.split("@", 2);
                                    if (1 === t.length) {
                                        var r = this.lastByteRangeEndOffset;
                                        e[0] = r ? r : 0
                                    } else
                                        e[0] = parseInt(t[1]);
                                    e[1] = parseInt(t[0]) + e[0]
                                }
                            }
                            return this._byteRange
                        }
                    }, {
                        key: "byteRangeStartOffset",
                        get: function () {
                            return this.byteRange[0]
                        }
                    }, {
                        key: "byteRangeEndOffset",
                        get: function () {
                            return this.byteRange[1]
                        }
                    }, {
                        key: "decryptdata",
                        get: function () {
                            return this._decryptdata || (this._decryptdata = this.fragmentDecryptdataFromLevelkey(this.levelkey, this.sn)),
                                this._decryptdata
                        }
                    }]),
                        e
                }()
                , k = function (e) {
                    function t(e) {
                        s(this, t);
                        var r = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, f.default.MANIFEST_LOADING, f.default.LEVEL_LOADING, f.default.AUDIO_TRACK_LOADING, f.default.SUBTITLE_TRACK_LOADING));
                        return r.loaders = {},
                            r
                    }
                    return n(t, e),
                        o(t, [{
                            key: "destroy",
                            value: function () {
                                for (var e in this.loaders) {
                                    var t = this.loaders[e];
                                    t && t.destroy()
                                }
                                this.loaders = {},
                                    h.default.prototype.destroy.call(this)
                            }
                        }, {
                            key: "onManifestLoading",
                            value: function (e) {
                                this.load(e.url, {
                                    type: "manifest"
                                })
                            }
                        }, {
                            key: "onLevelLoading",
                            value: function (e) {
                                this.load(e.url, {
                                    type: "level",
                                    level: e.level,
                                    id: e.id
                                })
                            }
                        }, {
                            key: "onAudioTrackLoading",
                            value: function (e) {
                                this.load(e.url, {
                                    type: "audioTrack",
                                    id: e.id
                                })
                            }
                        }, {
                            key: "onSubtitleTrackLoading",
                            value: function (e) {
                                this.load(e.url, {
                                    type: "subtitleTrack",
                                    id: e.id
                                })
                            }
                        }, {
                            key: "load",
                            value: function (e, t) {
                                var r = this.loaders[t.type];
                                if (r) {
                                    var i = r.context;
                                    if (i && i.url === e)
                                        return void y.logger.trace("playlist request ongoing");
                                    y.logger.warn("abort previous loader for type:" + t.type),
                                        r.abort()
                                }
                                var a = this.hls.config
                                    , n = void 0
                                    , s = void 0
                                    , o = void 0
                                    , l = void 0;
                                "manifest" === t.type ? (n = a.manifestLoadingMaxRetry,
                                    s = a.manifestLoadingTimeOut,
                                    o = a.manifestLoadingRetryDelay,
                                    l = a.manifestLoadingMaxRetryTimeout) : (n = a.levelLoadingMaxRetry,
                                        s = a.levelLoadingTimeOut,
                                        o = a.levelLoadingRetryDelay,
                                        l = a.levelLoadingMaxRetryTimeout,
                                        y.logger.log("loading playlist for " + t.type + " " + (t.level || t.id))),
                                    r = this.loaders[t.type] = t.loader = void 0 !== a.pLoader ? new a.pLoader(a) : new a.loader(a),
                                    t.url = e,
                                    t.responseType = "";
                                var u = void 0
                                    , d = void 0;
                                u = {
                                    timeout: s,
                                    maxRetry: n,
                                    retryDelay: o,
                                    maxRetryDelay: l
                                },
                                    d = {
                                        onSuccess: this.loadsuccess.bind(this),
                                        onError: this.loaderror.bind(this),
                                        onTimeout: this.loadtimeout.bind(this)
                                    },
                                    r.load(t, u, d)
                            }
                        }, {
                            key: "resolve",
                            value: function (e, t) {
                                return u.default.buildAbsoluteURL(t, e, {
                                    alwaysNormalize: !0
                                })
                            }
                        }, {
                            key: "parseMasterPlaylist",
                            value: function (e, t) {
                                var r = []
                                    , i = void 0;
                                for (m.lastIndex = 0; null != (i = m.exec(e));) {
                                    var a = {}
                                        , n = a.attrs = new p.default(i[1]);
                                    a.url = this.resolve(i[2], t);
                                    var s = n.decimalResolution("RESOLUTION");
                                    s && (a.width = s.width,
                                        a.height = s.height),
                                        a.bitrate = n.decimalInteger("AVERAGE-BANDWIDTH") || n.decimalInteger("BANDWIDTH"),
                                        a.name = n.NAME;
                                    var o = n.CODECS;
                                    if (o) {
                                        o = o.split(/[ ,]+/);
                                        for (var l = 0; l < o.length; l++) {
                                            var u = o[l];
                                            u.indexOf("avc1") !== -1 ? a.videoCodec = this.avc1toavcoti(u) : a.audioCodec = u
                                        }
                                    }
                                    r.push(a)
                                }
                                return r
                            }
                        }, {
                            key: "parseMasterPlaylistMedia",
                            value: function (e, t, r) {
                                var i = void 0
                                    , a = []
                                    , n = 0;
                                for (E.lastIndex = 0; null != (i = E.exec(e));) {
                                    var s = {}
                                        , o = new p.default(i[1]);
                                    o.TYPE === r && (s.groupId = o["GROUP-ID"],
                                        s.name = o.NAME,
                                        s.type = r,
                                        s.default = "YES" === o.DEFAULT,
                                        s.autoselect = "YES" === o.AUTOSELECT,
                                        s.forced = "YES" === o.FORCED,
                                        o.URI && (s.url = this.resolve(o.URI, t)),
                                        s.lang = o.LANGUAGE,
                                        s.name || (s.name = s.lang),
                                        s.id = n++,
                                        a.push(s))
                                }
                                return a
                            }
                        }, {
                            key: "avc1toavcoti",
                            value: function (e) {
                                var t, r = e.split(".");
                                return r.length > 2 ? (t = r.shift() + ".",
                                    t += parseInt(r.shift()).toString(16),
                                    t += ("000" + parseInt(r.shift()).toString(16)).substr(-4)) : t = e,
                                    t
                            }
                        }, {
                            key: "parseLevelPlaylist",
                            value: function (e, t, r, i) {
                                var a, n, s = 0, o = 0, l = {
                                    type: null,
                                    version: null,
                                    url: t,
                                    fragments: [],
                                    live: !0,
                                    startSN: 0
                                }, u = new T, d = 0, f = null, c = new _;
                                for (b.lastIndex = 0; null !== (a = b.exec(e));) {
                                    var h = a[1];
                                    if (h) {
                                        c.duration = parseFloat(h);
                                        var g = (" " + a[2]).slice(1);
                                        c.title = g ? g : null,
                                            c.tagList.push(g ? ["INF", h, g] : ["INF", h])
                                    } else if (a[3]) {
                                        if (!isNaN(c.duration)) {
                                            var v = s++;
                                            c.type = i,
                                                c.start = o,
                                                c.levelkey = u,
                                                c.sn = v,
                                                c.level = r,
                                                c.cc = d,
                                                c.baseurl = t,
                                                c.relurl = (" " + a[3]).slice(1),
                                                l.fragments.push(c),
                                                f = c,
                                                o += c.duration,
                                                c = new _
                                        }
                                    } else if (a[4]) {
                                        if (c.rawByteRange = (" " + a[4]).slice(1),
                                            f) {
                                            var m = f.byteRangeEndOffset;
                                            m && (c.lastByteRangeEndOffset = m)
                                        }
                                    } else if (a[5])
                                        c.rawProgramDateTime = (" " + a[5]).slice(1),
                                            c.tagList.push(["PROGRAM-DATE-TIME", c.rawProgramDateTime]);
                                    else {
                                        for (a = a[0].match(/(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)(.*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/),
                                            n = 1; n < a.length && void 0 === a[n]; n++)
                                            ;
                                        var E = (" " + a[n + 1]).slice(1)
                                            , k = (" " + a[n + 2]).slice(1);
                                        switch (a[n]) {
                                            case "#":
                                                c.tagList.push(k ? [E, k] : [E]);
                                                break;
                                            case "PLAYLIST-TYPE":
                                                l.type = E.toUpperCase();
                                                break;
                                            case "MEDIA-SEQUENCE":
                                                s = l.startSN = parseInt(E);
                                                break;
                                            case "TARGETDURATION":
                                                l.targetduration = parseFloat(E);
                                                break;
                                            case "VERSION":
                                                l.version = parseInt(E);
                                                break;
                                            case "EXTM3U":
                                                break;
                                            case "ENDLIST":
                                                l.live = !1;
                                                break;
                                            case "DIS":
                                                d++,
                                                    c.tagList.push(["DIS"]);
                                                break;
                                            case "DISCONTINUITY-SEQ":
                                                d = parseInt(E);
                                                break;
                                            case "KEY":
                                                var R = E
                                                    , A = new p.default(R)
                                                    , S = A.enumeratedString("METHOD")
                                                    , L = A.URI
                                                    , w = A.hexadecimalInteger("IV");
                                                S && (u = new T,
                                                    L && ["AES-128", "SAMPLE-AES"].indexOf(S) >= 0 && (u.method = S,
                                                        u.baseuri = t,
                                                        u.reluri = L,
                                                        u.key = null,
                                                        u.iv = w));
                                                break;
                                            case "START":
                                                var D = E
                                                    , O = new p.default(D)
                                                    , I = O.decimalFloatingPoint("TIME-OFFSET");
                                                isNaN(I) || (l.startTimeOffset = I);
                                                break;
                                            case "MAP":
                                                var P = new p.default(E);
                                                c.relurl = P.URI,
                                                    c.rawByteRange = P.BYTERANGE,
                                                    c.baseurl = t,
                                                    c.level = r,
                                                    c.type = i,
                                                    c.sn = "initSegment",
                                                    l.initSegment = c,
                                                    c = new _;
                                                break;
                                            default:
                                                y.logger.warn("line parsed but not handled: " + a)
                                        }
                                    }
                                }
                                return c = f,
                                    c && !c.relurl && (l.fragments.pop(),
                                        o -= c.duration),
                                    l.totalduration = o,
                                    l.averagetargetduration = o / l.fragments.length,
                                    l.endSN = s - 1,
                                    l
                            }
                        }, {
                            key: "loadsuccess",
                            value: function (e, t, r) {
                                var i = e.data
                                    , a = e.url
                                    , n = r.type
                                    , s = r.id
                                    , o = r.level
                                    , l = this.hls;
                                if (this.loaders[n] = void 0,
                                    void 0 !== a && 0 !== a.indexOf("data:") || (a = r.url),
                                    t.tload = performance.now(),
                                    0 === i.indexOf("#EXTM3U"))
                                    if (i.indexOf("#EXTINF:") > 0) {
                                        var u = "audioTrack" !== n && "subtitleTrack" !== n
                                            , d = isNaN(o) ? isNaN(s) ? 0 : s : o
                                            , c = this.parseLevelPlaylist(i, a, d, "audioTrack" === n ? "audio" : "subtitleTrack" === n ? "subtitle" : "main");
                                        c.tload = t.tload,
                                            "manifest" === n && l.trigger(f.default.MANIFEST_LOADED, {
                                                levels: [{
                                                    url: a,
                                                    details: c
                                                }],
                                                audioTracks: [],
                                                url: a,
                                                stats: t
                                            }),
                                            t.tparsed = performance.now(),
                                            c.targetduration ? u ? l.trigger(f.default.LEVEL_LOADED, {
                                                details: c,
                                                level: o || 0,
                                                id: s || 0,
                                                stats: t
                                            }) : "audioTrack" === n ? l.trigger(f.default.AUDIO_TRACK_LOADED, {
                                                details: c,
                                                id: s,
                                                stats: t
                                            }) : "subtitleTrack" === n && l.trigger(f.default.SUBTITLE_TRACK_LOADED, {
                                                details: c,
                                                id: s,
                                                stats: t
                                            }) : l.trigger(f.default.ERROR, {
                                                type: g.ErrorTypes.NETWORK_ERROR,
                                                details: g.ErrorDetails.MANIFEST_PARSING_ERROR,
                                                fatal: !0,
                                                url: a,
                                                reason: "invalid targetduration"
                                            })
                                    } else {
                                        var h = this.parseMasterPlaylist(i, a);
                                        if (h.length) {
                                            var v = this.parseMasterPlaylistMedia(i, a, "AUDIO")
                                                , p = this.parseMasterPlaylistMedia(i, a, "SUBTITLES");
                                            if (v.length) {
                                                var m = !1;
                                                v.forEach(function (e) {
                                                    e.url || (m = !0)
                                                }),
                                                    m === !1 && h[0].audioCodec && !h[0].attrs.AUDIO && (y.logger.log("audio codec signaled in quality level, but no embedded audio track signaled, create one"),
                                                        v.unshift({
                                                            type: "main",
                                                            name: "main"
                                                        }))
                                            }
                                            l.trigger(f.default.MANIFEST_LOADED, {
                                                levels: h,
                                                audioTracks: v,
                                                subtitles: p,
                                                url: a,
                                                stats: t
                                            })
                                        } else
                                            l.trigger(f.default.ERROR, {
                                                type: g.ErrorTypes.NETWORK_ERROR,
                                                details: g.ErrorDetails.MANIFEST_PARSING_ERROR,
                                                fatal: !0,
                                                url: a,
                                                reason: "no level found in manifest"
                                            })
                                    }
                                else
                                    l.trigger(f.default.ERROR, {
                                        type: g.ErrorTypes.NETWORK_ERROR,
                                        details: g.ErrorDetails.MANIFEST_PARSING_ERROR,
                                        fatal: !0,
                                        url: a,
                                        reason: "no EXTM3U delimiter"
                                    })
                            }
                        }, {
                            key: "loaderror",
                            value: function (e, t) {
                                var r, i, a = t.loader;
                                switch (t.type) {
                                    case "manifest":
                                        r = g.ErrorDetails.MANIFEST_LOAD_ERROR,
                                            i = !0;
                                        break;
                                    case "level":
                                        r = g.ErrorDetails.LEVEL_LOAD_ERROR,
                                            i = !1;
                                        break;
                                    case "audioTrack":
                                        r = g.ErrorDetails.AUDIO_TRACK_LOAD_ERROR,
                                            i = !1
                                }
                                a && (a.abort(),
                                    this.loaders[t.type] = void 0),
                                    this.hls.trigger(f.default.ERROR, {
                                        type: g.ErrorTypes.NETWORK_ERROR,
                                        details: r,
                                        fatal: i,
                                        url: a.url,
                                        loader: a,
                                        response: e,
                                        context: t
                                    })
                            }
                        }, {
                            key: "loadtimeout",
                            value: function (e, t) {
                                var r, i, a = t.loader;
                                switch (t.type) {
                                    case "manifest":
                                        r = g.ErrorDetails.MANIFEST_LOAD_TIMEOUT,
                                            i = !0;
                                        break;
                                    case "level":
                                        r = g.ErrorDetails.LEVEL_LOAD_TIMEOUT,
                                            i = !1;
                                        break;
                                    case "audioTrack":
                                        r = g.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT,
                                            i = !1
                                }
                                a && (a.abort(),
                                    this.loaders[t.type] = void 0),
                                    this.hls.trigger(f.default.ERROR, {
                                        type: g.ErrorTypes.NETWORK_ERROR,
                                        details: r,
                                        fatal: i,
                                        url: a.url,
                                        loader: a,
                                        context: t
                                    })
                            }
                        }]),
                        t
                }(h.default);
            r.default = k
        }
            , {
            2: 2,
            31: 31,
            32: 32,
            33: 33,
            45: 45,
            51: 51
        }],
        42: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = Math.pow(2, 32) - 1
                , s = function () {
                    function e() {
                        i(this, e)
                    }
                    return a(e, null, [{
                        key: "init",
                        value: function () {
                            e.types = {
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
                            var t;
                            for (t in e.types)
                                e.types.hasOwnProperty(t) && (e.types[t] = [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3)]);
                            var r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0])
                                , i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]);
                            e.HDLR_TYPES = {
                                video: r,
                                audio: i
                            };
                            var a = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1])
                                , n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
                            e.STTS = e.STSC = e.STCO = n,
                                e.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                e.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]),
                                e.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
                                e.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
                            var s = new Uint8Array([105, 115, 111, 109])
                                , o = new Uint8Array([97, 118, 99, 49])
                                , l = new Uint8Array([0, 0, 0, 1]);
                            e.FTYP = e.box(e.types.ftyp, s, l, s, o),
                                e.DINF = e.box(e.types.dinf, e.box(e.types.dref, a))
                        }
                    }, {
                        key: "box",
                        value: function (e) {
                            for (var t, r = Array.prototype.slice.call(arguments, 1), i = 8, a = r.length, n = a; a--;)
                                i += r[a].byteLength;
                            for (t = new Uint8Array(i),
                                t[0] = i >> 24 & 255,
                                t[1] = i >> 16 & 255,
                                t[2] = i >> 8 & 255,
                                t[3] = 255 & i,
                                t.set(e, 4),
                                a = 0,
                                i = 8; a < n; a++)
                                t.set(r[a], i),
                                    i += r[a].byteLength;
                            return t
                        }
                    }, {
                        key: "hdlr",
                        value: function (t) {
                            return e.box(e.types.hdlr, e.HDLR_TYPES[t])
                        }
                    }, {
                        key: "mdat",
                        value: function (t) {
                            return e.box(e.types.mdat, t)
                        }
                    }, {
                        key: "mdhd",
                        value: function (t, r) {
                            r *= t;
                            var i = Math.floor(r / (n + 1))
                                , a = Math.floor(r % (n + 1));
                            return e.box(e.types.mdhd, new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a, 85, 196, 0, 0]))
                        }
                    }, {
                        key: "mdia",
                        value: function (t) {
                            return e.box(e.types.mdia, e.mdhd(t.timescale, t.duration), e.hdlr(t.type), e.minf(t))
                        }
                    }, {
                        key: "mfhd",
                        value: function (t) {
                            return e.box(e.types.mfhd, new Uint8Array([0, 0, 0, 0, t >> 24, t >> 16 & 255, t >> 8 & 255, 255 & t]))
                        }
                    }, {
                        key: "minf",
                        value: function (t) {
                            return "audio" === t.type ? e.box(e.types.minf, e.box(e.types.smhd, e.SMHD), e.DINF, e.stbl(t)) : e.box(e.types.minf, e.box(e.types.vmhd, e.VMHD), e.DINF, e.stbl(t))
                        }
                    }, {
                        key: "moof",
                        value: function (t, r, i) {
                            return e.box(e.types.moof, e.mfhd(t), e.traf(i, r))
                        }
                    }, {
                        key: "moov",
                        value: function (t) {
                            for (var r = t.length, i = []; r--;)
                                i[r] = e.trak(t[r]);
                            return e.box.apply(null, [e.types.moov, e.mvhd(t[0].timescale, t[0].duration)].concat(i).concat(e.mvex(t)))
                        }
                    }, {
                        key: "mvex",
                        value: function (t) {
                            for (var r = t.length, i = []; r--;)
                                i[r] = e.trex(t[r]);
                            return e.box.apply(null, [e.types.mvex].concat(i))
                        }
                    }, {
                        key: "mvhd",
                        value: function (t, r) {
                            r *= t;
                            var i = Math.floor(r / (n + 1))
                                , a = Math.floor(r % (n + 1))
                                , s = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
                            return e.box(e.types.mvhd, s)
                        }
                    }, {
                        key: "sdtp",
                        value: function (t) {
                            var r, i, a = t.samples || [], n = new Uint8Array(4 + a.length);
                            for (i = 0; i < a.length; i++)
                                r = a[i].flags,
                                    n[i + 4] = r.dependsOn << 4 | r.isDependedOn << 2 | r.hasRedundancy;
                            return e.box(e.types.sdtp, n)
                        }
                    }, {
                        key: "stbl",
                        value: function (t) {
                            return e.box(e.types.stbl, e.stsd(t), e.box(e.types.stts, e.STTS), e.box(e.types.stsc, e.STSC), e.box(e.types.stsz, e.STSZ), e.box(e.types.stco, e.STCO))
                        }
                    }, {
                        key: "avc1",
                        value: function (t) {
                            var r, i, a, n = [], s = [];
                            for (r = 0; r < t.sps.length; r++)
                                i = t.sps[r],
                                    a = i.byteLength,
                                    n.push(a >>> 8 & 255),
                                    n.push(255 & a),
                                    n = n.concat(Array.prototype.slice.call(i));
                            for (r = 0; r < t.pps.length; r++)
                                i = t.pps[r],
                                    a = i.byteLength,
                                    s.push(a >>> 8 & 255),
                                    s.push(255 & a),
                                    s = s.concat(Array.prototype.slice.call(i));
                            var o = e.box(e.types.avcC, new Uint8Array([1, n[3], n[4], n[5], 255, 224 | t.sps.length].concat(n).concat([t.pps.length]).concat(s)))
                                , l = t.width
                                , u = t.height
                                , d = t.pixelRatio[0]
                                , f = t.pixelRatio[1];
                            return e.box(e.types.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l >> 8 & 255, 255 & l, u >> 8 & 255, 255 & u, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), o, e.box(e.types.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])), e.box(e.types.pasp, new Uint8Array([d >> 24, d >> 16 & 255, d >> 8 & 255, 255 & d, f >> 24, f >> 16 & 255, f >> 8 & 255, 255 & f])))
                        }
                    }, {
                        key: "esds",
                        value: function (e) {
                            var t = e.config.length;
                            return new Uint8Array([0, 0, 0, 0, 3, 23 + t, 0, 1, 0, 4, 15 + t, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([t]).concat(e.config).concat([6, 1, 2]))
                        }
                    }, {
                        key: "mp4a",
                        value: function (t) {
                            var r = t.samplerate;
                            return e.box(e.types.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]), e.box(e.types.esds, e.esds(t)))
                        }
                    }, {
                        key: "mp3",
                        value: function (t) {
                            var r = t.samplerate;
                            return e.box(e.types[".mp3"], new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]))
                        }
                    }, {
                        key: "stsd",
                        value: function (t) {
                            return "audio" === t.type ? t.isAAC || "mp3" !== t.codec ? e.box(e.types.stsd, e.STSD, e.mp4a(t)) : e.box(e.types.stsd, e.STSD, e.mp3(t)) : e.box(e.types.stsd, e.STSD, e.avc1(t))
                        }
                    }, {
                        key: "tkhd",
                        value: function (t) {
                            var r = t.id
                                , i = t.duration * t.timescale
                                , a = t.width
                                , s = t.height
                                , o = Math.floor(i / (n + 1))
                                , l = Math.floor(i % (n + 1));
                            return e.box(e.types.tkhd, new Uint8Array([1, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 0, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o, l >> 24, l >> 16 & 255, l >> 8 & 255, 255 & l, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, a >> 8 & 255, 255 & a, 0, 0, s >> 8 & 255, 255 & s, 0, 0]))
                        }
                    }, {
                        key: "traf",
                        value: function (t, r) {
                            var i = e.sdtp(t)
                                , a = t.id
                                , s = Math.floor(r / (n + 1))
                                , o = Math.floor(r % (n + 1));
                            return e.box(e.types.traf, e.box(e.types.tfhd, new Uint8Array([0, 0, 0, 0, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a])), e.box(e.types.tfdt, new Uint8Array([1, 0, 0, 0, s >> 24, s >> 16 & 255, s >> 8 & 255, 255 & s, o >> 24, o >> 16 & 255, o >> 8 & 255, 255 & o])), e.trun(t, i.length + 16 + 20 + 8 + 16 + 8 + 8), i)
                        }
                    }, {
                        key: "trak",
                        value: function (t) {
                            return t.duration = t.duration || 4294967295,
                                e.box(e.types.trak, e.tkhd(t), e.mdia(t))
                        }
                    }, {
                        key: "trex",
                        value: function (t) {
                            var r = t.id;
                            return e.box(e.types.trex, new Uint8Array([0, 0, 0, 0, r >> 24, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]))
                        }
                    }, {
                        key: "trun",
                        value: function (t, r) {
                            var i, a, n, s, o, l, u = t.samples || [], d = u.length, f = 12 + 16 * d, c = new Uint8Array(f);
                            for (r += 8 + f,
                                c.set([0, 0, 15, 1, d >>> 24 & 255, d >>> 16 & 255, d >>> 8 & 255, 255 & d, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r], 0),
                                i = 0; i < d; i++)
                                a = u[i],
                                    n = a.duration,
                                    s = a.size,
                                    o = a.flags,
                                    l = a.cts,
                                    c.set([n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, s >>> 24 & 255, s >>> 16 & 255, s >>> 8 & 255, 255 & s, o.isLeading << 2 | o.dependsOn, o.isDependedOn << 6 | o.hasRedundancy << 4 | o.paddingValue << 1 | o.isNonSync, 61440 & o.degradPrio, 15 & o.degradPrio, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, 255 & l], 12 + 16 * i);
                            return e.box(e.types.trun, c)
                        }
                    }, {
                        key: "initSegment",
                        value: function (t) {
                            e.types || e.init();
                            var r, i = e.moov(t);
                            return r = new Uint8Array(e.FTYP.byteLength + i.byteLength),
                                r.set(e.FTYP),
                                r.set(i, e.FTYP.byteLength),
                                r
                        }
                    }]),
                        e
                }();
            r.default = s
        }
            , {}],
        43: [function (e, t, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function a(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , s = e(34)
                , o = i(s)
                , l = e(33)
                , u = i(l)
                , d = e(51)
                , f = e(42)
                , c = i(f)
                , h = e(31)
                , g = function () {
                    function e(t, r, i, n) {
                        a(this, e),
                            this.observer = t,
                            this.config = r,
                            this.typeSupported = i;
                        var s = navigator.userAgent;
                        this.isSafari = n && n.indexOf("Apple") > -1 && s && !s.match("CriOS"),
                            this.ISGenerated = !1
                    }
                    return n(e, [{
                        key: "destroy",
                        value: function () { }
                    }, {
                        key: "resetTimeStamp",
                        value: function (e) {
                            this._initPTS = this._initDTS = e
                        }
                    }, {
                        key: "resetInitSegment",
                        value: function () {
                            this.ISGenerated = !1
                        }
                    }, {
                        key: "remux",
                        value: function (e, t, r, i, a, n, s) {
                            if (this.ISGenerated || this.generateIS(e, t, a),
                                this.ISGenerated)
                                if (e.samples.length) {
                                    e.timescale || (d.logger.warn("regenerate InitSegment as audio detected"),
                                        this.generateIS(e, t, a));
                                    var o = this.remuxAudio(e, a, n, s);
                                    if (t.samples.length) {
                                        var l = void 0;
                                        o && (l = o.endPTS - o.startPTS),
                                            t.timescale || (d.logger.warn("regenerate InitSegment as video detected"),
                                                this.generateIS(e, t, a)),
                                            this.remuxVideo(t, a, n, l)
                                    }
                                } else {
                                    var f = void 0;
                                    t.samples.length && (f = this.remuxVideo(t, a, n)),
                                        f && e.codec && this.remuxEmptyAudio(e, a, n, f)
                                }
                            r.samples.length && this.remuxID3(r, a),
                                i.samples.length && this.remuxText(i, a),
                                this.observer.trigger(u.default.FRAG_PARSED)
                        }
                    }, {
                        key: "generateIS",
                        value: function (e, t, r) {
                            var i, a, n = this.observer, s = e.samples, o = t.samples, l = this.typeSupported, f = "audio/mp4", g = {}, v = {
                                tracks: g
                            }, p = void 0 === this._initPTS;
                            if (p && (i = a = 1 / 0),
                                e.config && s.length && (e.timescale = e.samplerate,
                                    d.logger.log("audio sampling rate : " + e.samplerate),
                                    e.isAAC || (l.mpeg ? (f = "audio/mpeg",
                                        e.codec = "") : l.mp3 && (e.codec = "mp3")),
                                    g.audio = {
                                        container: f,
                                        codec: e.codec,
                                        initSegment: !e.isAAC && l.mpeg ? new Uint8Array : c.default.initSegment([e]),
                                        metadata: {
                                            channelCount: e.channelCount
                                        }
                                    },
                                    p && (i = a = s[0].pts - e.inputTimeScale * r)),
                                t.sps && t.pps && o.length) {
                                var y = t.inputTimeScale;
                                t.timescale = y,
                                    g.video = {
                                        container: "video/mp4",
                                        codec: t.codec,
                                        initSegment: c.default.initSegment([t]),
                                        metadata: {
                                            width: t.width,
                                            height: t.height
                                        }
                                    },
                                    p && (i = Math.min(i, o[0].pts - y * r),
                                        a = Math.min(a, o[0].dts - y * r),
                                        this.observer.trigger(u.default.INIT_PTS_FOUND, {
                                            initPTS: i
                                        }))
                            }
                            Object.keys(g).length ? (n.trigger(u.default.FRAG_PARSING_INIT_SEGMENT, v),
                                this.ISGenerated = !0,
                                p && (this._initPTS = i,
                                    this._initDTS = a)) : n.trigger(u.default.ERROR, {
                                        type: h.ErrorTypes.MEDIA_ERROR,
                                        details: h.ErrorDetails.FRAG_PARSING_ERROR,
                                        fatal: !1,
                                        reason: "no audio/video samples found"
                                    })
                        }
                    }, {
                        key: "remuxVideo",
                        value: function (e, t, r, i) {
                            var a, n, s, o, l, f, g, v = 8, p = e.timescale, y = e.samples, m = [], E = y.length, b = this._PTSNormalize, T = this._initDTS;
                            y.sort(function (e, t) {
                                var r = e.dts - t.dts
                                    , i = e.pts - t.pts;
                                return r ? r : i ? i : e.id - t.id
                            });
                            var _ = y.reduce(function (e, t) {
                                return Math.max(Math.min(e, t.pts - t.dts), -18e3)
                            }, 0);
                            if (_ < 0) {
                                d.logger.warn("PTS < DTS detected in video samples, shifting DTS by " + Math.round(_ / 90) + " ms to overcome this issue");
                                for (var k = 0; k < y.length; k++)
                                    y[k].dts += _
                            }
                            var R = void 0;
                            R = r ? this.nextAvcDts : t * p;
                            var A = y[0];
                            l = Math.max(b(A.dts - T, R), 0),
                                o = Math.max(b(A.pts - T, R), 0);
                            var S = Math.round((l - R) / 90);
                            r && S && (S > 1 ? d.logger.log("AVC:" + S + " ms hole between fragments detected,filling it") : S < -1 && d.logger.log("AVC:" + -S + " ms overlapping between fragments detected"),
                                l = R,
                                y[0].dts = l + T,
                                o = Math.max(o - S, R),
                                y[0].pts = o + T,
                                d.logger.log("Video/PTS/DTS adjusted: " + Math.round(o / 90) + "/" + Math.round(l / 90) + ",delta:" + S + " ms")),
                                A = y[y.length - 1],
                                g = Math.max(b(A.dts - T, R), 0),
                                f = Math.max(b(A.pts - T, R), 0),
                                f = Math.max(f, g);
                            var L = this.isSafari;
                            L && (a = Math.round((g - l) / (y.length - 1)));
                            for (var w = 0, D = 0, O = 0; O < E; O++) {
                                for (var I = y[O], P = I.units, C = P.length, x = 0, F = 0; F < C; F++)
                                    x += P[F].data.length;
                                D += x,
                                    w += C,
                                    I.length = x,
                                    I.dts = L ? l + O * a : Math.max(b(I.dts - T, R), l),
                                    I.pts = Math.max(b(I.pts - T, R), I.dts)
                            }
                            var M = D + 4 * w + 8;
                            try {
                                n = new Uint8Array(M)
                            } catch (e) {
                                return void this.observer.trigger(u.default.ERROR, {
                                    type: h.ErrorTypes.MUX_ERROR,
                                    details: h.ErrorDetails.REMUX_ALLOC_ERROR,
                                    fatal: !1,
                                    bytes: M,
                                    reason: "fail allocating video mdat " + M
                                })
                            }
                            var N = new DataView(n.buffer);
                            N.setUint32(0, M),
                                n.set(c.default.types.mdat, 4);
                            for (var U = 0; U < E; U++) {
                                for (var B = y[U], G = B.units, j = 0, K = void 0, W = 0, H = G.length; W < H; W++) {
                                    var V = G[W]
                                        , Y = V.data
                                        , X = V.data.byteLength;
                                    N.setUint32(v, X),
                                        v += 4,
                                        n.set(Y, v),
                                        v += X,
                                        j += 4 + X
                                }
                                if (L)
                                    K = Math.max(0, a * Math.round((B.pts - B.dts) / a));
                                else {
                                    if (U < E - 1)
                                        a = y[U + 1].dts - B.dts;
                                    else {
                                        var z = this.config
                                            , q = B.dts - y[U > 0 ? U - 1 : U].dts;
                                        if (z.stretchShortVideoTrack) {
                                            var Q = z.maxBufferHole
                                                , J = z.maxSeekHole
                                                , Z = Math.floor(Math.min(Q, J) * p)
                                                , $ = (i ? o + i * p : this.nextAudioPts) - B.pts;
                                            $ > Z ? (a = $ - q,
                                                a < 0 && (a = q),
                                                d.logger.log("It is approximately " + $ / 90 + " ms to the next segment; using duration " + a / 90 + " ms for the last video frame.")) : a = q
                                        } else
                                            a = q
                                    }
                                    K = Math.round(B.pts - B.dts)
                                }
                                m.push({
                                    size: j,
                                    duration: a,
                                    cts: K,
                                    flags: {
                                        isLeading: 0,
                                        isDependedOn: 0,
                                        hasRedundancy: 0,
                                        degradPrio: 0,
                                        dependsOn: B.key ? 2 : 1,
                                        isNonSync: B.key ? 0 : 1
                                    }
                                })
                            }
                            this.nextAvcDts = g + a;
                            var ee = e.dropped;
                            if (e.len = 0,
                                e.nbNalu = 0,
                                e.dropped = 0,
                                m.length && navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                                var te = m[0].flags;
                                te.dependsOn = 2,
                                    te.isNonSync = 0
                            }
                            e.samples = m,
                                s = c.default.moof(e.sequenceNumber++, l, e),
                                e.samples = [];
                            var re = {
                                data1: s,
                                data2: n,
                                startPTS: o / p,
                                endPTS: (f + a) / p,
                                startDTS: l / p,
                                endDTS: this.nextAvcDts / p,
                                type: "video",
                                nb: m.length,
                                dropped: ee
                            };
                            return this.observer.trigger(u.default.FRAG_PARSING_DATA, re),
                                re
                        }
                    }, {
                        key: "remuxAudio",
                        value: function (e, t, r, i) {
                            var a, n, s, l, f, g, v, p, y, m, E, b, T, _, k, R, A = e.inputTimeScale, S = e.timescale, L = A / S, w = e.isAAC ? 1024 : 1152, D = w * L, O = this._PTSNormalize, I = this._initDTS, P = !e.isAAC && this.typeSupported.mpeg, C = P ? 0 : 8, x = [], F = [];
                            if (e.samples.sort(function (e, t) {
                                return e.pts - t.pts
                            }),
                                F = e.samples,
                                R = this.nextAudioPts,
                                r |= F.length && R && (i && Math.abs(t - R / A) < .1 || Math.abs(F[0].pts - R - I) < 20 * D),
                                r || (R = t * A),
                                i && e.isAAC)
                                for (var M = 0, N = R; M < F.length;) {
                                    var U = F[M]
                                        , B = O(U.pts - I, R)
                                        , G = B - N;
                                    if (G <= -D)
                                        d.logger.warn("Dropping 1 audio frame @ " + (N / A).toFixed(3) + "s due to " + Math.abs(1e3 * G / A) + " ms overlap."),
                                            F.splice(M, 1),
                                            e.len -= U.unit.length;
                                    else if (G >= D && N) {
                                        var j = Math.round(G / D);
                                        d.logger.warn("Injecting " + j + " audio frame @ " + (N / A).toFixed(3) + "s due to " + 1e3 * G / A + " ms gap.");
                                        for (var K = 0; K < j; K++)
                                            k = N + I,
                                                k = Math.max(k, I),
                                                _ = o.default.getSilentFrame(e.manifestCodec || e.codec, e.channelCount),
                                                _ || (d.logger.log("Unable to get silent frame for given audio codec; duplicating last frame instead."),
                                                    _ = U.unit.subarray()),
                                                F.splice(M, 0, {
                                                    unit: _,
                                                    pts: k,
                                                    dts: k
                                                }),
                                                e.len += _.length,
                                                N += D,
                                                M += 1;
                                        U.pts = U.dts = N + I,
                                            N += D,
                                            M += 1
                                    } else
                                        Math.abs(G),
                                            N += D,
                                            U.pts = U.dts = 0 === M ? I + R : F[M - 1].pts + D,
                                            M += 1
                                }
                            for (var W = 0, H = F.length; W < H; W++) {
                                if (n = F[W],
                                    l = n.unit,
                                    m = n.pts - I,
                                    E = n.dts - I,
                                    void 0 !== y)
                                    b = O(m, y),
                                        T = O(E, y),
                                        s.duration = Math.round((T - y) / L);
                                else {
                                    b = O(m, R),
                                        T = O(E, R);
                                    var V = Math.round(1e3 * (b - R) / A)
                                        , Y = 0;
                                    if (r && e.isAAC && V) {
                                        if (V > 0)
                                            Y = Math.round((b - R) / D),
                                                d.logger.log(V + " ms hole between AAC samples detected,filling it"),
                                                Y > 0 && (_ = o.default.getSilentFrame(e.manifestCodec || e.codec, e.channelCount),
                                                    _ || (_ = l.subarray()),
                                                    e.len += Y * _.length);
                                        else if (V < -12) {
                                            d.logger.log("drop overlapping AAC sample, expected/parsed/delta:" + (R / A).toFixed(3) + "s/" + (b / A).toFixed(3) + "s/" + -V + "ms"),
                                                e.len -= l.byteLength;
                                            continue
                                        }
                                        b = T = R
                                    }
                                    if (v = Math.max(0, b),
                                        p = Math.max(0, T),
                                        !(e.len > 0))
                                        return;
                                    var X = P ? e.len : e.len + 8;
                                    try {
                                        f = new Uint8Array(X)
                                    } catch (e) {
                                        return void this.observer.trigger(u.default.ERROR, {
                                            type: h.ErrorTypes.MUX_ERROR,
                                            details: h.ErrorDetails.REMUX_ALLOC_ERROR,
                                            fatal: !1,
                                            bytes: X,
                                            reason: "fail allocating audio mdat " + X
                                        })
                                    }
                                    P || (a = new DataView(f.buffer),
                                        a.setUint32(0, X),
                                        f.set(c.default.types.mdat, 4));
                                    for (var z = 0; z < Y; z++)
                                        k = b - (Y - z) * D,
                                            _ = o.default.getSilentFrame(e.manifestCodec || e.codec, e.channelCount),
                                            _ || (d.logger.log("Unable to get silent frame for given audio codec; duplicating this frame instead."),
                                                _ = l.subarray()),
                                            f.set(_, C),
                                            C += _.byteLength,
                                            s = {
                                                size: _.byteLength,
                                                cts: 0,
                                                duration: 1024,
                                                flags: {
                                                    isLeading: 0,
                                                    isDependedOn: 0,
                                                    hasRedundancy: 0,
                                                    degradPrio: 0,
                                                    dependsOn: 1
                                                }
                                            },
                                            x.push(s)
                                }
                                f.set(l, C);
                                var q = l.byteLength;
                                C += q,
                                    s = {
                                        size: q,
                                        cts: 0,
                                        duration: 0,
                                        flags: {
                                            isLeading: 0,
                                            isDependedOn: 0,
                                            hasRedundancy: 0,
                                            degradPrio: 0,
                                            dependsOn: 1
                                        }
                                    },
                                    x.push(s),
                                    y = T
                            }
                            var Q = 0
                                , J = x.length;
                            if (J >= 2 && (Q = x[J - 2].duration,
                                s.duration = Q),
                                J) {
                                this.nextAudioPts = b + L * Q,
                                    e.len = 0,
                                    e.samples = x,
                                    g = P ? new Uint8Array : c.default.moof(e.sequenceNumber++, p / L, e),
                                    e.samples = [];
                                var Z = {
                                    data1: g,
                                    data2: f,
                                    startPTS: v / A,
                                    endPTS: this.nextAudioPts / A,
                                    startDTS: p / A,
                                    endDTS: (T + L * Q) / A,
                                    type: "audio",
                                    nb: J
                                };
                                return this.observer.trigger(u.default.FRAG_PARSING_DATA, Z),
                                    Z
                            }
                            return null
                        }
                    }, {
                        key: "remuxEmptyAudio",
                        value: function (e, t, r, i) {
                            var a = e.inputTimeScale
                                , n = e.samplerate ? e.samplerate : a
                                , s = a / n
                                , l = this.nextAudioPts
                                , u = (void 0 !== l ? l : i.startDTS * a) + this._initDTS
                                , f = i.endDTS * a + this._initDTS
                                , c = 1024 * s
                                , h = Math.ceil((f - u) / c)
                                , g = o.default.getSilentFrame(e.manifestCodec || e.codec, e.channelCount);
                            if (d.logger.warn("remux empty Audio"),
                                !g)
                                return void d.logger.trace("Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!");
                            for (var v = [], p = 0; p < h; p++) {
                                var y = u + p * c;
                                v.push({
                                    unit: g,
                                    pts: y,
                                    dts: y
                                }),
                                    e.len += g.length
                            }
                            e.samples = v,
                                this.remuxAudio(e, t, r)
                        }
                    }, {
                        key: "remuxID3",
                        value: function (e, t) {
                            var r, i = e.samples.length, a = e.inputTimeScale, n = this._initPTS, s = this._initDTS;
                            if (i) {
                                for (var o = 0; o < i; o++)
                                    r = e.samples[o],
                                        r.pts = (r.pts - n) / a,
                                        r.dts = (r.dts - s) / a;
                                this.observer.trigger(u.default.FRAG_PARSING_METADATA, {
                                    samples: e.samples
                                })
                            }
                            e.samples = [],
                                t = t
                        }
                    }, {
                        key: "remuxText",
                        value: function (e, t) {
                            e.samples.sort(function (e, t) {
                                return e.pts - t.pts
                            });
                            var r, i = e.samples.length, a = e.inputTimeScale, n = this._initPTS;
                            if (i) {
                                for (var s = 0; s < i; s++)
                                    r = e.samples[s],
                                        r.pts = (r.pts - n) / a;
                                this.observer.trigger(u.default.FRAG_PARSING_USERDATA, {
                                    samples: e.samples
                                })
                            }
                            e.samples = [],
                                t = t
                        }
                    }, {
                        key: "_PTSNormalize",
                        value: function (e, t) {
                            var r;
                            if (void 0 === t)
                                return e;
                            for (r = t < e ? -8589934592 : 8589934592; Math.abs(e - t) > 4294967296;)
                                e += r;
                            return e
                        }
                    }]),
                        e
                }();
            r.default = g
        }
            , {
            31: 31,
            33: 33,
            34: 34,
            42: 42,
            51: 51
        }],
        44: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = e(33)
                , s = function (e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n)
                , o = function () {
                    function e(t) {
                        i(this, e),
                            this.observer = t
                    }
                    return a(e, [{
                        key: "destroy",
                        value: function () { }
                    }, {
                        key: "resetTimeStamp",
                        value: function () { }
                    }, {
                        key: "resetInitSegment",
                        value: function () { }
                    }, {
                        key: "remux",
                        value: function (e, t, r, i, a, n, o, l) {
                            var u = this.observer
                                , d = "";
                            e && (d += "audio"),
                                t && (d += "video"),
                                u.trigger(s.default.FRAG_PARSING_DATA, {
                                    data1: l,
                                    startPTS: a,
                                    startDTS: a,
                                    type: d,
                                    nb: 1,
                                    dropped: 0
                                }),
                                u.trigger(s.default.FRAG_PARSED)
                        }
                    }]),
                        e
                }();
            r.default = o
        }
            , {
            33: 33
        }],
        45: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = /^(\d+)x(\d+)$/
                , s = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g
                , o = function () {
                    function e(t) {
                        i(this, e),
                            "string" == typeof t && (t = e.parseAttrList(t));
                        for (var r in t)
                            t.hasOwnProperty(r) && (this[r] = t[r])
                    }
                    return a(e, [{
                        key: "decimalInteger",
                        value: function (e) {
                            var t = parseInt(this[e], 10);
                            return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t
                        }
                    }, {
                        key: "hexadecimalInteger",
                        value: function (e) {
                            if (this[e]) {
                                var t = (this[e] || "0x").slice(2);
                                t = (1 & t.length ? "0" : "") + t;
                                for (var r = new Uint8Array(t.length / 2), i = 0; i < t.length / 2; i++)
                                    r[i] = parseInt(t.slice(2 * i, 2 * i + 2), 16);
                                return r
                            }
                            return null
                        }
                    }, {
                        key: "hexadecimalIntegerAsNumber",
                        value: function (e) {
                            var t = parseInt(this[e], 16);
                            return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t
                        }
                    }, {
                        key: "decimalFloatingPoint",
                        value: function (e) {
                            return parseFloat(this[e])
                        }
                    }, {
                        key: "enumeratedString",
                        value: function (e) {
                            return this[e]
                        }
                    }, {
                        key: "decimalResolution",
                        value: function (e) {
                            var t = n.exec(this[e]);
                            if (null !== t)
                                return {
                                    width: parseInt(t[1], 10),
                                    height: parseInt(t[2], 10)
                                }
                        }
                    }], [{
                        key: "parseAttrList",
                        value: function (e) {
                            var t, r = {};
                            for (s.lastIndex = 0; null !== (t = s.exec(e));) {
                                var i = t[2];
                                0 === i.indexOf('"') && i.lastIndexOf('"') === i.length - 1 && (i = i.slice(1, -1)),
                                    r[t[1]] = i
                            }
                            return r
                        }
                    }]),
                        e
                }();
            r.default = o
        }
            , {}],
        46: [function (e, t, r) {
            "use strict";
            var i = {
                search: function (e, t) {
                    for (var r = 0, i = e.length - 1, a = null, n = null; r <= i;) {
                        a = (r + i) / 2 | 0,
                            n = e[a];
                        var s = t(n);
                        if (s > 0)
                            r = a + 1;
                        else {
                            if (!(s < 0))
                                return n;
                            i = a - 1
                        }
                    }
                    return null
                }
            };
            t.exports = i
        }
            , {}],
        47: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = {
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
                }
                , s = function (e) {
                    var t = e;
                    return n.hasOwnProperty(e) && (t = n[e]),
                        String.fromCharCode(t)
                }
                , o = 15
                , l = 100
                , u = {
                    17: 1,
                    18: 3,
                    21: 5,
                    22: 7,
                    23: 9,
                    16: 11,
                    19: 12,
                    20: 14
                }
                , d = {
                    17: 2,
                    18: 4,
                    21: 6,
                    22: 8,
                    23: 10,
                    19: 13,
                    20: 15
                }
                , f = {
                    25: 1,
                    26: 3,
                    29: 5,
                    30: 7,
                    31: 9,
                    24: 11,
                    27: 12,
                    28: 14
                }
                , c = {
                    25: 2,
                    26: 4,
                    29: 6,
                    30: 8,
                    31: 10,
                    27: 13,
                    28: 15
                }
                , h = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent"]
                , g = {
                    verboseFilter: {
                        DATA: 3,
                        DEBUG: 3,
                        INFO: 2,
                        WARNING: 2,
                        TEXT: 1,
                        ERROR: 0
                    },
                    time: null,
                    verboseLevel: 0,
                    setTime: function (e) {
                        this.time = e
                    },
                    log: function (e, t) {
                        this.verboseFilter[e];
                        this.verboseLevel
                    }
                }
                , v = function (e) {
                    for (var t = [], r = 0; r < e.length; r++)
                        t.push(e[r].toString(16));
                    return t
                }
                , p = function () {
                    function e(t, r, a, n, s) {
                        i(this, e),
                            this.foreground = t || "white",
                            this.underline = r || !1,
                            this.italics = a || !1,
                            this.background = n || "black",
                            this.flash = s || !1
                    }
                    return a(e, [{
                        key: "reset",
                        value: function () {
                            this.foreground = "white",
                                this.underline = !1,
                                this.italics = !1,
                                this.background = "black",
                                this.flash = !1
                        }
                    }, {
                        key: "setStyles",
                        value: function (e) {
                            for (var t = ["foreground", "underline", "italics", "background", "flash"], r = 0; r < t.length; r++) {
                                var i = t[r];
                                e.hasOwnProperty(i) && (this[i] = e[i])
                            }
                        }
                    }, {
                        key: "isDefault",
                        value: function () {
                            return "white" === this.foreground && !this.underline && !this.italics && "black" === this.background && !this.flash
                        }
                    }, {
                        key: "equals",
                        value: function (e) {
                            return this.foreground === e.foreground && this.underline === e.underline && this.italics === e.italics && this.background === e.background && this.flash === e.flash
                        }
                    }, {
                        key: "copy",
                        value: function (e) {
                            this.foreground = e.foreground,
                                this.underline = e.underline,
                                this.italics = e.italics,
                                this.background = e.background,
                                this.flash = e.flash
                        }
                    }, {
                        key: "toString",
                        value: function () {
                            return "color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics + ", background=" + this.background + ", flash=" + this.flash
                        }
                    }]),
                        e
                }()
                , y = function () {
                    function e(t, r, a, n, s, o) {
                        i(this, e),
                            this.uchar = t || " ",
                            this.penState = new p(r, a, n, s, o)
                    }
                    return a(e, [{
                        key: "reset",
                        value: function () {
                            this.uchar = " ",
                                this.penState.reset()
                        }
                    }, {
                        key: "setChar",
                        value: function (e, t) {
                            this.uchar = e,
                                this.penState.copy(t)
                        }
                    }, {
                        key: "setPenState",
                        value: function (e) {
                            this.penState.copy(e)
                        }
                    }, {
                        key: "equals",
                        value: function (e) {
                            return this.uchar === e.uchar && this.penState.equals(e.penState)
                        }
                    }, {
                        key: "copy",
                        value: function (e) {
                            this.uchar = e.uchar,
                                this.penState.copy(e.penState)
                        }
                    }, {
                        key: "isEmpty",
                        value: function () {
                            return " " === this.uchar && this.penState.isDefault()
                        }
                    }]),
                        e
                }()
                , m = function () {
                    function e() {
                        i(this, e),
                            this.chars = [];
                        for (var t = 0; t < l; t++)
                            this.chars.push(new y);
                        this.pos = 0,
                            this.currPenState = new p
                    }
                    return a(e, [{
                        key: "equals",
                        value: function (e) {
                            for (var t = !0, r = 0; r < l; r++)
                                if (!this.chars[r].equals(e.chars[r])) {
                                    t = !1;
                                    break
                                }
                            return t
                        }
                    }, {
                        key: "copy",
                        value: function (e) {
                            for (var t = 0; t < l; t++)
                                this.chars[t].copy(e.chars[t])
                        }
                    }, {
                        key: "isEmpty",
                        value: function () {
                            for (var e = !0, t = 0; t < l; t++)
                                if (!this.chars[t].isEmpty()) {
                                    e = !1;
                                    break
                                }
                            return e
                        }
                    }, {
                        key: "setCursor",
                        value: function (e) {
                            this.pos !== e && (this.pos = e),
                                this.pos < 0 ? (g.log("ERROR", "Negative cursor position " + this.pos),
                                    this.pos = 0) : this.pos > l && (g.log("ERROR", "Too large cursor position " + this.pos),
                                        this.pos = l)
                        }
                    }, {
                        key: "moveCursor",
                        value: function (e) {
                            var t = this.pos + e;
                            if (e > 1)
                                for (var r = this.pos + 1; r < t + 1; r++)
                                    this.chars[r].setPenState(this.currPenState);
                            this.setCursor(t)
                        }
                    }, {
                        key: "backSpace",
                        value: function () {
                            this.moveCursor(-1),
                                this.chars[this.pos].setChar(" ", this.currPenState)
                        }
                    }, {
                        key: "insertChar",
                        value: function (e) {
                            e >= 144 && this.backSpace();
                            var t = s(e);
                            if (this.pos >= l)
                                return void g.log("ERROR", "Cannot insert " + e.toString(16) + " (" + t + ") at position " + this.pos + ". Skipping it!");
                            this.chars[this.pos].setChar(t, this.currPenState),
                                this.moveCursor(1)
                        }
                    }, {
                        key: "clearFromPos",
                        value: function (e) {
                            var t;
                            for (t = e; t < l; t++)
                                this.chars[t].reset()
                        }
                    }, {
                        key: "clear",
                        value: function () {
                            this.clearFromPos(0),
                                this.pos = 0,
                                this.currPenState.reset()
                        }
                    }, {
                        key: "clearToEndOfRow",
                        value: function () {
                            this.clearFromPos(this.pos)
                        }
                    }, {
                        key: "getTextString",
                        value: function () {
                            for (var e = [], t = !0, r = 0; r < l; r++) {
                                var i = this.chars[r].uchar;
                                " " !== i && (t = !1),
                                    e.push(i)
                            }
                            return t ? "" : e.join("")
                        }
                    }, {
                        key: "setPenStyles",
                        value: function (e) {
                            this.currPenState.setStyles(e),
                                this.chars[this.pos].setPenState(this.currPenState)
                        }
                    }]),
                        e
                }()
                , E = function () {
                    function e() {
                        i(this, e),
                            this.rows = [];
                        for (var t = 0; t < o; t++)
                            this.rows.push(new m);
                        this.currRow = o - 1,
                            this.nrRollUpRows = null,
                            this.reset()
                    }
                    return a(e, [{
                        key: "reset",
                        value: function () {
                            for (var e = 0; e < o; e++)
                                this.rows[e].clear();
                            this.currRow = o - 1
                        }
                    }, {
                        key: "equals",
                        value: function (e) {
                            for (var t = !0, r = 0; r < o; r++)
                                if (!this.rows[r].equals(e.rows[r])) {
                                    t = !1;
                                    break
                                }
                            return t
                        }
                    }, {
                        key: "copy",
                        value: function (e) {
                            for (var t = 0; t < o; t++)
                                this.rows[t].copy(e.rows[t])
                        }
                    }, {
                        key: "isEmpty",
                        value: function () {
                            for (var e = !0, t = 0; t < o; t++)
                                if (!this.rows[t].isEmpty()) {
                                    e = !1;
                                    break
                                }
                            return e
                        }
                    }, {
                        key: "backSpace",
                        value: function () {
                            this.rows[this.currRow].backSpace()
                        }
                    }, {
                        key: "clearToEndOfRow",
                        value: function () {
                            this.rows[this.currRow].clearToEndOfRow()
                        }
                    }, {
                        key: "insertChar",
                        value: function (e) {
                            this.rows[this.currRow].insertChar(e)
                        }
                    }, {
                        key: "setPen",
                        value: function (e) {
                            this.rows[this.currRow].setPenStyles(e)
                        }
                    }, {
                        key: "moveCursor",
                        value: function (e) {
                            this.rows[this.currRow].moveCursor(e)
                        }
                    }, {
                        key: "setCursor",
                        value: function (e) {
                            g.log("INFO", "setCursor: " + e),
                                this.rows[this.currRow].setCursor(e)
                        }
                    }, {
                        key: "setPAC",
                        value: function (e) {
                            g.log("INFO", "pacData = " + JSON.stringify(e));
                            var t = e.row - 1;
                            if (this.nrRollUpRows && t < this.nrRollUpRows - 1 && (t = this.nrRollUpRows - 1),
                                this.nrRollUpRows && this.currRow !== t) {
                                for (var r = 0; r < o; r++)
                                    this.rows[r].clear();
                                var i = this.currRow + 1 - this.nrRollUpRows
                                    , a = this.lastOutputScreen;
                                if (a) {
                                    var n = a.rows[i].cueStartTime;
                                    if (n && n < g.time)
                                        for (var s = 0; s < this.nrRollUpRows; s++)
                                            this.rows[t - this.nrRollUpRows + s + 1].copy(a.rows[i + s])
                                }
                            }
                            this.currRow = t;
                            var l = this.rows[this.currRow];
                            if (null !== e.indent) {
                                var u = e.indent
                                    , d = Math.max(u - 1, 0);
                                l.setCursor(e.indent),
                                    e.color = l.chars[d].penState.foreground
                            }
                            var f = {
                                foreground: e.color,
                                underline: e.underline,
                                italics: e.italics,
                                background: "black",
                                flash: !1
                            };
                            this.setPen(f)
                        }
                    }, {
                        key: "setBkgData",
                        value: function (e) {
                            g.log("INFO", "bkgData = " + JSON.stringify(e)),
                                this.backSpace(),
                                this.setPen(e),
                                this.insertChar(32)
                        }
                    }, {
                        key: "setRollUpRows",
                        value: function (e) {
                            this.nrRollUpRows = e
                        }
                    }, {
                        key: "rollUp",
                        value: function () {
                            if (null === this.nrRollUpRows)
                                return void g.log("DEBUG", "roll_up but nrRollUpRows not set yet");
                            g.log("TEXT", this.getDisplayText());
                            var e = this.currRow + 1 - this.nrRollUpRows
                                , t = this.rows.splice(e, 1)[0];
                            t.clear(),
                                this.rows.splice(this.currRow, 0, t),
                                g.log("INFO", "Rolling up")
                        }
                    }, {
                        key: "getDisplayText",
                        value: function (e) {
                            e = e || !1;
                            for (var t = [], r = "", i = -1, a = 0; a < o; a++) {
                                var n = this.rows[a].getTextString();
                                n && (i = a + 1,
                                    e ? t.push("Row " + i + ": '" + n + "'") : t.push(n.trim()))
                            }
                            return t.length > 0 && (r = e ? "[" + t.join(" | ") + "]" : t.join("\n")),
                                r
                        }
                    }, {
                        key: "getTextAndFormat",
                        value: function () {
                            return this.rows
                        }
                    }]),
                        e
                }()
                , b = function () {
                    function e(t, r) {
                        i(this, e),
                            this.chNr = t,
                            this.outputFilter = r,
                            this.mode = null,
                            this.verbose = 0,
                            this.displayedMemory = new E,
                            this.nonDisplayedMemory = new E,
                            this.lastOutputScreen = new E,
                            this.currRollUpRow = this.displayedMemory.rows[o - 1],
                            this.writeScreen = this.displayedMemory,
                            this.mode = null,
                            this.cueStartTime = null
                    }
                    return a(e, [{
                        key: "reset",
                        value: function () {
                            this.mode = null,
                                this.displayedMemory.reset(),
                                this.nonDisplayedMemory.reset(),
                                this.lastOutputScreen.reset(),
                                this.currRollUpRow = this.displayedMemory.rows[o - 1],
                                this.writeScreen = this.displayedMemory,
                                this.mode = null,
                                this.cueStartTime = null,
                                this.lastCueEndTime = null
                        }
                    }, {
                        key: "getHandler",
                        value: function () {
                            return this.outputFilter
                        }
                    }, {
                        key: "setHandler",
                        value: function (e) {
                            this.outputFilter = e
                        }
                    }, {
                        key: "setPAC",
                        value: function (e) {
                            this.writeScreen.setPAC(e)
                        }
                    }, {
                        key: "setBkgData",
                        value: function (e) {
                            this.writeScreen.setBkgData(e)
                        }
                    }, {
                        key: "setMode",
                        value: function (e) {
                            e !== this.mode && (this.mode = e,
                                g.log("INFO", "MODE=" + e),
                                "MODE_POP-ON" === this.mode ? this.writeScreen = this.nonDisplayedMemory : (this.writeScreen = this.displayedMemory,
                                    this.writeScreen.reset()),
                                "MODE_ROLL-UP" !== this.mode && (this.displayedMemory.nrRollUpRows = null,
                                    this.nonDisplayedMemory.nrRollUpRows = null),
                                this.mode = e)
                        }
                    }, {
                        key: "insertChars",
                        value: function (e) {
                            for (var t = 0; t < e.length; t++)
                                this.writeScreen.insertChar(e[t]);
                            var r = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
                            g.log("INFO", r + ": " + this.writeScreen.getDisplayText(!0)),
                                "MODE_PAINT-ON" !== this.mode && "MODE_ROLL-UP" !== this.mode || (g.log("TEXT", "DISPLAYED: " + this.displayedMemory.getDisplayText(!0)),
                                    this.outputDataUpdate())
                        }
                    }, {
                        key: "ccRCL",
                        value: function () {
                            g.log("INFO", "RCL - Resume Caption Loading"),
                                this.setMode("MODE_POP-ON")
                        }
                    }, {
                        key: "ccBS",
                        value: function () {
                            g.log("INFO", "BS - BackSpace"),
                                "MODE_TEXT" !== this.mode && (this.writeScreen.backSpace(),
                                    this.writeScreen === this.displayedMemory && this.outputDataUpdate())
                        }
                    }, {
                        key: "ccAOF",
                        value: function () { }
                    }, {
                        key: "ccAON",
                        value: function () { }
                    }, {
                        key: "ccDER",
                        value: function () {
                            g.log("INFO", "DER- Delete to End of Row"),
                                this.writeScreen.clearToEndOfRow(),
                                this.outputDataUpdate()
                        }
                    }, {
                        key: "ccRU",
                        value: function (e) {
                            g.log("INFO", "RU(" + e + ") - Roll Up"),
                                this.writeScreen = this.displayedMemory,
                                this.setMode("MODE_ROLL-UP"),
                                this.writeScreen.setRollUpRows(e)
                        }
                    }, {
                        key: "ccFON",
                        value: function () {
                            g.log("INFO", "FON - Flash On"),
                                this.writeScreen.setPen({
                                    flash: !0
                                })
                        }
                    }, {
                        key: "ccRDC",
                        value: function () {
                            g.log("INFO", "RDC - Resume Direct Captioning"),
                                this.setMode("MODE_PAINT-ON")
                        }
                    }, {
                        key: "ccTR",
                        value: function () {
                            g.log("INFO", "TR"),
                                this.setMode("MODE_TEXT")
                        }
                    }, {
                        key: "ccRTD",
                        value: function () {
                            g.log("INFO", "RTD"),
                                this.setMode("MODE_TEXT")
                        }
                    }, {
                        key: "ccEDM",
                        value: function () {
                            g.log("INFO", "EDM - Erase Displayed Memory"),
                                this.displayedMemory.reset(),
                                this.outputDataUpdate()
                        }
                    }, {
                        key: "ccCR",
                        value: function () {
                            g.log("CR - Carriage Return"),
                                this.writeScreen.rollUp(),
                                this.outputDataUpdate()
                        }
                    }, {
                        key: "ccENM",
                        value: function () {
                            g.log("INFO", "ENM - Erase Non-displayed Memory"),
                                this.nonDisplayedMemory.reset()
                        }
                    }, {
                        key: "ccEOC",
                        value: function () {
                            if (g.log("INFO", "EOC - End Of Caption"),
                                "MODE_POP-ON" === this.mode) {
                                var e = this.displayedMemory;
                                this.displayedMemory = this.nonDisplayedMemory,
                                    this.nonDisplayedMemory = e,
                                    this.writeScreen = this.nonDisplayedMemory,
                                    g.log("TEXT", "DISP: " + this.displayedMemory.getDisplayText())
                            }
                            this.outputDataUpdate()
                        }
                    }, {
                        key: "ccTO",
                        value: function (e) {
                            g.log("INFO", "TO(" + e + ") - Tab Offset"),
                                this.writeScreen.moveCursor(e)
                        }
                    }, {
                        key: "ccMIDROW",
                        value: function (e) {
                            var t = {
                                flash: !1
                            };
                            if (t.underline = e % 2 == 1,
                                t.italics = e >= 46,
                                t.italics)
                                t.foreground = "white";
                            else {
                                var r = Math.floor(e / 2) - 16
                                    , i = ["white", "green", "blue", "cyan", "red", "yellow", "magenta"];
                                t.foreground = i[r]
                            }
                            g.log("INFO", "MIDROW: " + JSON.stringify(t)),
                                this.writeScreen.setPen(t)
                        }
                    }, {
                        key: "outputDataUpdate",
                        value: function () {
                            var e = g.time;
                            null !== e && this.outputFilter && (this.outputFilter.updateData && this.outputFilter.updateData(e, this.displayedMemory),
                                null !== this.cueStartTime || this.displayedMemory.isEmpty() ? this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, e, this.lastOutputScreen),
                                    this.cueStartTime = this.displayedMemory.isEmpty() ? null : e) : this.cueStartTime = e,
                                this.lastOutputScreen.copy(this.displayedMemory))
                        }
                    }, {
                        key: "cueSplitAtTime",
                        value: function (e) {
                            this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, e, this.displayedMemory),
                                this.cueStartTime = e))
                        }
                    }]),
                        e
                }()
                , T = function () {
                    function e(t, r, a) {
                        i(this, e),
                            this.field = t || 1,
                            this.outputs = [r, a],
                            this.channels = [new b(1, r), new b(2, a)],
                            this.currChNr = -1,
                            this.lastCmdA = null,
                            this.lastCmdB = null,
                            this.bufferedData = [],
                            this.startTime = null,
                            this.lastTime = null,
                            this.dataCounters = {
                                padding: 0,
                                char: 0,
                                cmd: 0,
                                other: 0
                            }
                    }
                    return a(e, [{
                        key: "getHandler",
                        value: function (e) {
                            return this.channels[e].getHandler()
                        }
                    }, {
                        key: "setHandler",
                        value: function (e, t) {
                            this.channels[e].setHandler(t)
                        }
                    }, {
                        key: "addData",
                        value: function (e, t) {
                            var r, i, a, n = !1;
                            this.lastTime = e,
                                g.setTime(e);
                            for (var s = 0; s < t.length; s += 2)
                                if (i = 127 & t[s],
                                    a = 127 & t[s + 1],
                                    0 !== i || 0 !== a) {
                                    if (g.log("DATA", "[" + v([t[s], t[s + 1]]) + "] -> (" + v([i, a]) + ")"),
                                        r = this.parseCmd(i, a),
                                        r || (r = this.parseMidrow(i, a)),
                                        r || (r = this.parsePAC(i, a)),
                                        r || (r = this.parseBackgroundAttributes(i, a)),
                                        !r && (n = this.parseChars(i, a)))
                                        if (this.currChNr && this.currChNr >= 0) {
                                            var o = this.channels[this.currChNr - 1];
                                            o.insertChars(n)
                                        } else
                                            g.log("WARNING", "No channel found yet. TEXT-MODE?");
                                    r ? this.dataCounters.cmd += 2 : n ? this.dataCounters.char += 2 : (this.dataCounters.other += 2,
                                        g.log("WARNING", "Couldn't parse cleaned data " + v([i, a]) + " orig: " + v([t[s], t[s + 1]])))
                                } else
                                    this.dataCounters.padding += 2
                        }
                    }, {
                        key: "parseCmd",
                        value: function (e, t) {
                            var r = null
                                , i = (20 === e || 28 === e) && 32 <= t && t <= 47
                                , a = (23 === e || 31 === e) && 33 <= t && t <= 35;
                            if (!i && !a)
                                return !1;
                            if (e === this.lastCmdA && t === this.lastCmdB)
                                return this.lastCmdA = null,
                                    this.lastCmdB = null,
                                    g.log("DEBUG", "Repeated command (" + v([e, t]) + ") is dropped"),
                                    !0;
                            r = 20 === e || 23 === e ? 1 : 2;
                            var n = this.channels[r - 1];
                            return 20 === e || 28 === e ? 32 === t ? n.ccRCL() : 33 === t ? n.ccBS() : 34 === t ? n.ccAOF() : 35 === t ? n.ccAON() : 36 === t ? n.ccDER() : 37 === t ? n.ccRU(2) : 38 === t ? n.ccRU(3) : 39 === t ? n.ccRU(4) : 40 === t ? n.ccFON() : 41 === t ? n.ccRDC() : 42 === t ? n.ccTR() : 43 === t ? n.ccRTD() : 44 === t ? n.ccEDM() : 45 === t ? n.ccCR() : 46 === t ? n.ccENM() : 47 === t && n.ccEOC() : n.ccTO(t - 32),
                                this.lastCmdA = e,
                                this.lastCmdB = t,
                                this.currChNr = r,
                                !0
                        }
                    }, {
                        key: "parseMidrow",
                        value: function (e, t) {
                            var r = null;
                            if ((17 === e || 25 === e) && 32 <= t && t <= 47) {
                                if ((r = 17 === e ? 1 : 2) !== this.currChNr)
                                    return g.log("ERROR", "Mismatch channel in midrow parsing"),
                                        !1;
                                return this.channels[r - 1].ccMIDROW(t),
                                    g.log("DEBUG", "MIDROW (" + v([e, t]) + ")"),
                                    !0
                            }
                            return !1
                        }
                    }, {
                        key: "parsePAC",
                        value: function (e, t) {
                            var r = null
                                , i = null
                                , a = (17 <= e && e <= 23 || 25 <= e && e <= 31) && 64 <= t && t <= 127
                                , n = (16 === e || 24 === e) && 64 <= t && t <= 95;
                            if (!a && !n)
                                return !1;
                            if (e === this.lastCmdA && t === this.lastCmdB)
                                return this.lastCmdA = null,
                                    this.lastCmdB = null,
                                    !0;
                            r = e <= 23 ? 1 : 2,
                                i = 64 <= t && t <= 95 ? 1 === r ? u[e] : f[e] : 1 === r ? d[e] : c[e];
                            var s = this.interpretPAC(i, t);
                            return this.channels[r - 1].setPAC(s),
                                this.lastCmdA = e,
                                this.lastCmdB = t,
                                this.currChNr = r,
                                !0
                        }
                    }, {
                        key: "interpretPAC",
                        value: function (e, t) {
                            var r = t
                                , i = {
                                    color: null,
                                    italics: !1,
                                    indent: null,
                                    underline: !1,
                                    row: e
                                };
                            return r = t > 95 ? t - 96 : t - 64,
                                i.underline = 1 == (1 & r),
                                r <= 13 ? i.color = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "white"][Math.floor(r / 2)] : r <= 15 ? (i.italics = !0,
                                    i.color = "white") : i.indent = 4 * Math.floor((r - 16) / 2),
                                i
                        }
                    }, {
                        key: "parseChars",
                        value: function (e, t) {
                            var r = null
                                , i = null
                                , a = null;
                            if (e >= 25 ? (r = 2,
                                a = e - 8) : (r = 1,
                                    a = e),
                                17 <= a && a <= 19) {
                                var n = t;
                                n = 17 === a ? t + 80 : 18 === a ? t + 112 : t + 144,
                                    g.log("INFO", "Special char '" + s(n) + "' in channel " + r),
                                    i = [n]
                            } else
                                32 <= e && e <= 127 && (i = 0 === t ? [e] : [e, t]);
                            if (i) {
                                var o = v(i);
                                g.log("DEBUG", "Char codes =  " + o.join(",")),
                                    this.lastCmdA = null,
                                    this.lastCmdB = null
                            }
                            return i
                        }
                    }, {
                        key: "parseBackgroundAttributes",
                        value: function (e, t) {
                            var r, i, a, n, s = (16 === e || 24 === e) && 32 <= t && t <= 47, o = (23 === e || 31 === e) && 45 <= t && t <= 47;
                            return !(!s && !o) && (r = {},
                                16 === e || 24 === e ? (i = Math.floor((t - 32) / 2),
                                    r.background = h[i],
                                    t % 2 == 1 && (r.background = r.background + "_semi")) : 45 === t ? r.background = "transparent" : (r.foreground = "black",
                                        47 === t && (r.underline = !0)),
                                a = e < 24 ? 1 : 2,
                                n = this.channels[a - 1],
                                n.setBkgData(r),
                                this.lastCmdA = null,
                                this.lastCmdB = null,
                                !0)
                        }
                    }, {
                        key: "reset",
                        value: function () {
                            for (var e = 0; e < this.channels.length; e++)
                                this.channels[e] && this.channels[e].reset();
                            this.lastCmdA = null,
                                this.lastCmdB = null
                        }
                    }, {
                        key: "cueSplitAtTime",
                        value: function (e) {
                            for (var t = 0; t < this.channels.length; t++)
                                this.channels[t] && this.channels[t].cueSplitAtTime(e)
                        }
                    }]),
                        e
                }();
            r.default = T
        }
            , {}],
        48: [function (e, t, r) {
            "use strict";
            var i = e(54)
                , a = {
                    newCue: function (e, t, r, a) {
                        for (var n, s, o, l, u, d = window.VTTCue || window.TextTrackCue, f = 0; f < a.rows.length; f++)
                            if (n = a.rows[f],
                                o = !0,
                                l = 0,
                                u = "",
                                !n.isEmpty()) {
                                for (var c = 0; c < n.chars.length; c++)
                                    n.chars[c].uchar.match(/\s/) && o ? l++ : (u += n.chars[c].uchar,
                                        o = !1);
                                n.cueStartTime = t,
                                    t === r && (r += 1e-4),
                                    s = new d(t, r, (0,
                                        i.fixLineBreaks)(u.trim())),
                                    l >= 16 ? l-- : l++,
                                    navigator.userAgent.match(/Firefox\//) ? s.line = f + 1 : s.line = f > 7 ? f - 2 : f + 1,
                                    s.align = "left",
                                    s.position = Math.max(0, Math.min(100, l / 32 * 100 + (navigator.userAgent.match(/Firefox\//) ? 50 : 0))),
                                    e.addCue(s)
                            }
                    }
                };
            t.exports = a
        }
            , {
            54: 54
        }],
        49: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = e(50)
                , s = function (e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(n)
                , o = function () {
                    function e(t, r, a, n) {
                        i(this, e),
                            this.hls = t,
                            this.defaultEstimate_ = n,
                            this.minWeight_ = .001,
                            this.minDelayMs_ = 50,
                            this.slow_ = new s.default(r),
                            this.fast_ = new s.default(a)
                    }
                    return a(e, [{
                        key: "sample",
                        value: function (e, t) {
                            e = Math.max(e, this.minDelayMs_);
                            var r = 8e3 * t / e
                                , i = e / 1e3;
                            this.fast_.sample(i, r),
                                this.slow_.sample(i, r)
                        }
                    }, {
                        key: "canEstimate",
                        value: function () {
                            var e = this.fast_;
                            return e && e.getTotalWeight() >= this.minWeight_
                        }
                    }, {
                        key: "getEstimate",
                        value: function () {
                            return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_
                        }
                    }, {
                        key: "destroy",
                        value: function () { }
                    }]),
                        e
                }();
            r.default = o
        }
            , {
            50: 50
        }],
        50: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = function () {
                    function e(t) {
                        i(this, e),
                            this.alpha_ = t ? Math.exp(Math.log(.5) / t) : 0,
                            this.estimate_ = 0,
                            this.totalWeight_ = 0
                    }
                    return a(e, [{
                        key: "sample",
                        value: function (e, t) {
                            var r = Math.pow(this.alpha_, e);
                            this.estimate_ = t * (1 - r) + r * this.estimate_,
                                this.totalWeight_ += e
                        }
                    }, {
                        key: "getTotalWeight",
                        value: function () {
                            return this.totalWeight_
                        }
                    }, {
                        key: "getEstimate",
                        value: function () {
                            if (this.alpha_) {
                                var e = 1 - Math.pow(this.alpha_, this.totalWeight_);
                                return this.estimate_ / e
                            }
                            return this.estimate_
                        }
                    }]),
                        e
                }();
            r.default = n
        }
            , {}],
        51: [function (e, t, r) {
            "use strict";
            function i() { }
            function a(e, t) {
                return t = "[" + e + "] > " + t
            }
            function n(e) {
                var t = self.console[e];
                return t ? function () {
                    for (var r = arguments.length, i = Array(r), n = 0; n < r; n++)
                        i[n] = arguments[n];
                    i[0] && (i[0] = a(e, i[0])),
                        t.apply(self.console, i)
                }
                    : i
            }
            function s(e) {
                for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                    r[i - 1] = arguments[i];
                r.forEach(function (t) {
                    u[t] = e[t] ? e[t].bind(e) : n(t)
                })
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            }
                : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                , l = {
                    trace: i,
                    debug: i,
                    log: i,
                    warn: i,
                    info: i,
                    error: i
                }
                , u = l;
            r.enableLogs = function (e) {
                if (e === !0 || "object" === (void 0 === e ? "undefined" : o(e))) {
                    s(e, "debug", "log", "info", "warn", "error");
                    try {
                        u.log()
                    } catch (e) {
                        u = l
                    }
                } else
                    u = l
            }
                ,
                r.logger = u
        }
            , {}],
        52: [function (e, t, r) {
            "use strict";
            var i = {
                toString: function (e) {
                    for (var t = "", r = e.length, i = 0; i < r; i++)
                        t += "[" + e.start(i).toFixed(3) + "," + e.end(i).toFixed(3) + "]";
                    return t
                }
            };
            t.exports = i
        }
            , {}],
        53: [function (e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
                r.default = function () {
                    function e(e) {
                        return "string" == typeof e && (!!n[e.toLowerCase()] && e.toLowerCase())
                    }
                    function t(e) {
                        return "string" == typeof e && (!!s[e.toLowerCase()] && e.toLowerCase())
                    }
                    function r(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var r = arguments[t];
                            for (var i in r)
                                e[i] = r[i]
                        }
                        return e
                    }
                    function i(i, n, s) {
                        var o = this
                            , l = function () {
                                if ("undefined" != typeof navigator)
                                    return /MSIE\s8\.0/.test(navigator.userAgent)
                            }()
                            , u = {};
                        l ? o = document.createElement("custom") : u.enumerable = !0,
                            o.hasBeenReset = !1;
                        var d = ""
                            , f = !1
                            , c = i
                            , h = n
                            , g = s
                            , v = null
                            , p = ""
                            , y = !0
                            , m = "auto"
                            , E = "start"
                            , b = 50
                            , T = "middle"
                            , _ = 50
                            , k = "middle";
                        if (Object.defineProperty(o, "id", r({}, u, {
                            get: function () {
                                return d
                            },
                            set: function (e) {
                                d = "" + e
                            }
                        })),
                            Object.defineProperty(o, "pauseOnExit", r({}, u, {
                                get: function () {
                                    return f
                                },
                                set: function (e) {
                                    f = !!e
                                }
                            })),
                            Object.defineProperty(o, "startTime", r({}, u, {
                                get: function () {
                                    return c
                                },
                                set: function (e) {
                                    if ("number" != typeof e)
                                        throw new TypeError("Start time must be set to a number.");
                                    c = e,
                                        this.hasBeenReset = !0
                                }
                            })),
                            Object.defineProperty(o, "endTime", r({}, u, {
                                get: function () {
                                    return h
                                },
                                set: function (e) {
                                    if ("number" != typeof e)
                                        throw new TypeError("End time must be set to a number.");
                                    h = e,
                                        this.hasBeenReset = !0
                                }
                            })),
                            Object.defineProperty(o, "text", r({}, u, {
                                get: function () {
                                    return g
                                },
                                set: function (e) {
                                    g = "" + e,
                                        this.hasBeenReset = !0
                                }
                            })),
                            Object.defineProperty(o, "region", r({}, u, {
                                get: function () {
                                    return v
                                },
                                set: function (e) {
                                    v = e,
                                        this.hasBeenReset = !0
                                }
                            })),
                            Object.defineProperty(o, "vertical", r({}, u, {
                                get: function () {
                                    return p
                                },
                                set: function (t) {
                                    var r = e(t);
                                    if (r === !1)
                                        throw new SyntaxError("An invalid or illegal string was specified.");
                                    p = r,
                                        this.hasBeenReset = !0
                                }
                            })),
                            Object.defineProperty(o, "snapToLines", r({}, u, {
                                get: function () {
                                    return y
                                },
                                set: function (e) {
                                    y = !!e,
                                        this.hasBeenReset = !0
                                }
                            })),
                            Object.defineProperty(o, "line", r({}, u, {
                                get: function () {
                                    return m
                                },
                                set: function (e) {
                                    if ("number" != typeof e && e !== a)
                                        throw new SyntaxError("An invalid number or illegal string was specified.");
                                    m = e,
                                        this.hasBeenReset = !0
                                }
                            })),
                            Object.defineProperty(o, "lineAlign", r({}, u, {
                                get: function () {
                                    return E
                                },
                                set: function (e) {
                                    var r = t(e);
                                    if (!r)
                                        throw new SyntaxError("An invalid or illegal string was specified.");
                                    E = r,
                                        this.hasBeenReset = !0
                                }
                            })),
                            Object.defineProperty(o, "position", r({}, u, {
                                get: function () {
                                    return b
                                },
                                set: function (e) {
                                    if (e < 0 || e > 100)
                                        throw new Error("Position must be between 0 and 100.");
                                    b = e,
                                        this.hasBeenReset = !0
                                }
                            })),
                            Object.defineProperty(o, "positionAlign", r({}, u, {
                                get: function () {
                                    return T
                                },
                                set: function (e) {
                                    var r = t(e);
                                    if (!r)
                                        throw new SyntaxError("An invalid or illegal string was specified.");
                                    T = r,
                                        this.hasBeenReset = !0
                                }
                            })),
                            Object.defineProperty(o, "size", r({}, u, {
                                get: function () {
                                    return _
                                },
                                set: function (e) {
                                    if (e < 0 || e > 100)
                                        throw new Error("Size must be between 0 and 100.");
                                    _ = e,
                                        this.hasBeenReset = !0
                                }
                            })),
                            Object.defineProperty(o, "align", r({}, u, {
                                get: function () {
                                    return k
                                },
                                set: function (e) {
                                    var r = t(e);
                                    if (!r)
                                        throw new SyntaxError("An invalid or illegal string was specified.");
                                    k = r,
                                        this.hasBeenReset = !0
                                }
                            })),
                            o.displayState = void 0,
                            l)
                            return o
                    }
                    if ("undefined" != typeof window && window.VTTCue)
                        return window.VTTCue;
                    var a = "auto"
                        , n = {
                            "": !0,
                            lr: !0,
                            rl: !0
                        }
                        , s = {
                            start: !0,
                            middle: !0,
                            end: !0,
                            left: !0,
                            right: !0
                        };
                    return i.prototype.getCueAsHTML = function () {
                        return window.WebVTT.convertCueToDOMTree(window, this.text)
                    }
                        ,
                        i
                }()
        }
            , {}],
        54: [function (e, t, r) {
            "use strict";
            function i() {
                this.window = window,
                    this.state = "INITIAL",
                    this.buffer = "",
                    this.decoder = new f,
                    this.regionList = []
            }
            function a(e) {
                function t(e, t, r, i) {
                    return 3600 * (0 | e) + 60 * (0 | t) + (0 | r) + (0 | i) / 1e3
                }
                var r = e.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
                return r ? r[3] ? t(r[1], r[2], r[3].replace(":", ""), r[4]) : r[1] > 59 ? t(r[1], r[2], 0, r[4]) : t(0, r[1], r[2], r[4]) : null
            }
            function n() {
                this.values = Object.create(null)
            }
            function s(e, t, r, i) {
                var a = i ? e.split(i) : [e];
                for (var n in a)
                    if ("string" == typeof a[n]) {
                        var s = a[n].split(r);
                        if (2 === s.length) {
                            var o = s[0]
                                , l = s[1];
                            t(o, l)
                        }
                    }
            }
            function o(e, t, r) {
                function i() {
                    var t = a(e);
                    if (null === t)
                        throw new Error("Malformed timestamp: " + l);
                    return e = e.replace(/^[^\sa-zA-Z-]+/, ""),
                        t
                }
                function o() {
                    e = e.replace(/^\s+/, "")
                }
                var l = e;
                if (o(),
                    t.startTime = i(),
                    o(),
                    "-->" !== e.substr(0, 3))
                    throw new Error("Malformed time stamp (time stamps must be separated by '-->'): " + l);
                e = e.substr(3),
                    o(),
                    t.endTime = i(),
                    o(),
                    function (e, t) {
                        var i = new n;
                        s(e, function (e, t) {
                            switch (e) {
                                case "region":
                                    for (var a = r.length - 1; a >= 0; a--)
                                        if (r[a].id === t) {
                                            i.set(e, r[a].region);
                                            break
                                        }
                                    break;
                                case "vertical":
                                    i.alt(e, t, ["rl", "lr"]);
                                    break;
                                case "line":
                                    var n = t.split(",")
                                        , s = n[0];
                                    i.integer(e, s),
                                        i.percent(e, s) && i.set("snapToLines", !1),
                                        i.alt(e, s, ["auto"]),
                                        2 === n.length && i.alt("lineAlign", n[1], ["start", h, "end"]);
                                    break;
                                case "position":
                                    n = t.split(","),
                                        i.percent(e, n[0]),
                                        2 === n.length && i.alt("positionAlign", n[1], ["start", h, "end", "line-left", "line-right", "auto"]);
                                    break;
                                case "size":
                                    i.percent(e, t);
                                    break;
                                case "align":
                                    i.alt(e, t, ["start", h, "end", "left", "right"])
                            }
                        }, /:/, /\s/),
                            t.region = i.get("region", null),
                            t.vertical = i.get("vertical", "");
                        var a = i.get("line", "auto");
                        "auto" === a && c.line === -1 && (a = -1),
                            t.line = a,
                            t.lineAlign = i.get("lineAlign", "start"),
                            t.snapToLines = i.get("snapToLines", !0),
                            t.size = i.get("size", 100),
                            t.align = i.get("align", h);
                        var o = i.get("position", "auto");
                        "auto" === o && 50 === c.position && (o = "start" === t.align || "left" === t.align ? 0 : "end" === t.align || "right" === t.align ? 100 : 50),
                            t.position = o
                    }(e, t)
            }
            function l(e) {
                return e.replace(/<br(?: \/)?>/gi, "\n")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
                r.fixLineBreaks = void 0;
            var u = e(53)
                , d = function (e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(u)
                , f = function () {
                    return {
                        decode: function (e) {
                            if (!e)
                                return "";
                            if ("string" != typeof e)
                                throw new Error("Error - expected string data.");
                            return decodeURIComponent(encodeURIComponent(e))
                        }
                    }
                };
            n.prototype = {
                set: function (e, t) {
                    this.get(e) || "" === t || (this.values[e] = t)
                },
                get: function (e, t, r) {
                    return r ? this.has(e) ? this.values[e] : t[r] : this.has(e) ? this.values[e] : t
                },
                has: function (e) {
                    return e in this.values
                },
                alt: function (e, t, r) {
                    for (var i = 0; i < r.length; ++i)
                        if (t === r[i]) {
                            this.set(e, t);
                            break
                        }
                },
                integer: function (e, t) {
                    /^-?\d+$/.test(t) && this.set(e, parseInt(t, 10))
                },
                percent: function (e, t) {
                    return !!(t.match(/^([\d]{1,3})(\.[\d]*)?%$/) && (t = parseFloat(t)) >= 0 && t <= 100) && (this.set(e, t),
                        !0)
                }
            };
            var c = new d.default(0, 0, 0)
                , h = "middle" === c.align ? "middle" : "center";
            i.prototype = {
                parse: function (e) {
                    function t() {
                        var e = r.buffer
                            , t = 0;
                        for (e = l(e); t < e.length && "\r" !== e[t] && "\n" !== e[t];)
                            ++t;
                        var i = e.substr(0, t);
                        return "\r" === e[t] && ++t,
                            "\n" === e[t] && ++t,
                            r.buffer = e.substr(t),
                            i
                    }
                    var r = this;
                    e && (r.buffer += r.decoder.decode(e, {
                        stream: !0
                    }));
                    try {
                        var i;
                        if ("INITIAL" === r.state) {
                            if (!/\r\n|\n/.test(r.buffer))
                                return this;
                            i = t();
                            var a = i.match(/^WEBVTT([ \t].*)?$/);
                            if (!a || !a[0])
                                throw new Error("Malformed WebVTT signature.");
                            r.state = "HEADER"
                        }
                        for (var n = !1; r.buffer;) {
                            if (!/\r\n|\n/.test(r.buffer))
                                return this;
                            switch (n ? n = !1 : i = t(),
                            r.state) {
                                case "HEADER":
                                    /:/.test(i) ? function (e) {
                                        s(e, function (e, t) {
                                            switch (e) {
                                                case "Region":
                                            }
                                        }, /:/)
                                    }(i) : i || (r.state = "ID");
                                    continue;
                                case "NOTE":
                                    i || (r.state = "ID");
                                    continue;
                                case "ID":
                                    if (/^NOTE($|[ \t])/.test(i)) {
                                        r.state = "NOTE";
                                        break
                                    }
                                    if (!i)
                                        continue;
                                    if (r.cue = new d.default(0, 0, ""),
                                        r.state = "CUE",
                                        i.indexOf("-->") === -1) {
                                        r.cue.id = i;
                                        continue
                                    }
                                case "CUE":
                                    try {
                                        o(i, r.cue, r.regionList)
                                    } catch (e) {
                                        r.cue = null,
                                            r.state = "BADCUE";
                                        continue
                                    }
                                    r.state = "CUETEXT";
                                    continue;
                                case "CUETEXT":
                                    var u = i.indexOf("-->") !== -1;
                                    if (!i || u && (n = !0)) {
                                        r.oncue && r.oncue(r.cue),
                                            r.cue = null,
                                            r.state = "ID";
                                        continue
                                    }
                                    r.cue.text && (r.cue.text += "\n"),
                                        r.cue.text += i;
                                    continue;
                                case "BADCUE":
                                    i || (r.state = "ID");
                                    continue
                            }
                        }
                    } catch (e) {
                        "CUETEXT" === r.state && r.cue && r.oncue && r.oncue(r.cue),
                            r.cue = null,
                            r.state = "INITIAL" === r.state ? "BADWEBVTT" : "BADCUE"
                    }
                    return this
                },
                flush: function () {
                    var e = this;
                    try {
                        if (e.buffer += e.decoder.decode(),
                            (e.cue || "HEADER" === e.state) && (e.buffer += "\n\n",
                                e.parse()),
                            "INITIAL" === e.state)
                            throw new Error("Malformed WebVTT signature.")
                    } catch (e) {
                        throw e
                    }
                    return e.onflush && e.onflush(),
                        this
                }
            },
                r.fixLineBreaks = l,
                r.default = i
        }
            , {
            53: 53
        }],
        55: [function (e, t, r) {
            "use strict";
            var i = e(54)
                , a = function (e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(i)
                , n = function (e) {
                    var t = parseInt(e.substr(-3))
                        , r = parseInt(e.substr(-6, 2))
                        , i = parseInt(e.substr(-9, 2))
                        , a = e.length > 9 ? parseInt(e.substr(0, e.indexOf(":"))) : 0;
                    return isNaN(t) || isNaN(r) || isNaN(i) || isNaN(a) ? -1 : (t += 1e3 * r,
                        t += 6e4 * i,
                        t += 36e5 * a)
                }
                , s = function (e, t, r) {
                    var i = e[t]
                        , a = e[i.prevCC];
                    if (!a || !a.new && i.new)
                        return e.ccOffset = e.presentationOffset = i.start,
                            void (i.new = !1);
                    for (; a && a.new;)
                        e.ccOffset += i.start - a.start,
                            i.new = !1,
                            i = a,
                            a = e[i.prevCC];
                    e.presentationOffset = r
                }
                , o = {
                    parse: function (e, t, r, i, o, l) {
                        var u = String.fromCharCode.apply(null, new Uint8Array(e)).trim().replace(/\r\n|\n\r|\n|\r/g, "\n").split("\n")
                            , d = "00:00.000"
                            , f = 0
                            , c = 0
                            , h = 0
                            , g = []
                            , v = void 0
                            , p = !0
                            , y = new a.default;
                        y.oncue = function (e) {
                            var t = r[i]
                                , a = r.ccOffset;
                            t && t.new && (c ? a = r.ccOffset = t.start : s(r, i, h)),
                                h && !c && (a = h + r.ccOffset - r.presentationOffset),
                                e.startTime += a - c,
                                e.endTime += a - c,
                                e.text = decodeURIComponent(escape(e.text)),
                                e.endTime > 0 && g.push(e)
                        }
                            ,
                            y.onparsingerror = function (e) {
                                v = e
                            }
                            ,
                            y.onflush = function () {
                                if (v && l)
                                    return void l(v);
                                o(g)
                            }
                            ,
                            u.forEach(function (e) {
                                if (p) {
                                    if (e.startsWith("X-TIMESTAMP-MAP=")) {
                                        p = !1,
                                            e.substr(16).split(",").forEach(function (e) {
                                                e.startsWith("LOCAL:") ? d = e.substr(6) : e.startsWith("MPEGTS:") && (f = parseInt(e.substr(7)))
                                            });
                                        try {
                                            t = t < 0 ? t + 8589934592 : t,
                                                f -= t,
                                                c = n(d) / 1e3,
                                                h = f / 9e4,
                                                c === -1 && (v = new Error("Malformed X-TIMESTAMP-MAP: " + e))
                                        } catch (t) {
                                            v = new Error("Malformed X-TIMESTAMP-MAP: " + e)
                                        }
                                        return
                                    }
                                    "" === e && (p = !1)
                                }
                                y.parse(e + "\n")
                            }),
                            y.flush()
                    }
                };
            t.exports = o
        }
            , {
            54: 54
        }],
        56: [function (e, t, r) {
            "use strict";
            function i(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function () {
                function e(e, t) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }
                return function (t, r, i) {
                    return r && e(t.prototype, r),
                        i && e(t, i),
                        t
                }
            }()
                , n = e(51)
                , s = function () {
                    function e(t) {
                        i(this, e),
                            t && t.xhrSetup && (this.xhrSetup = t.xhrSetup)
                    }
                    return a(e, [{
                        key: "destroy",
                        value: function () {
                            this.abort(),
                                this.loader = null
                        }
                    }, {
                        key: "abort",
                        value: function () {
                            var e = this.loader;
                            e && 4 !== e.readyState && (this.stats.aborted = !0,
                                e.abort()),
                                window.clearTimeout(this.requestTimeout),
                                this.requestTimeout = null,
                                window.clearTimeout(this.retryTimeout),
                                this.retryTimeout = null
                        }
                    }, {
                        key: "load",
                        value: function (e, t, r) {
                            this.context = e,
                                this.config = t,
                                this.callbacks = r,
                                this.stats = {
                                    trequest: performance.now(),
                                    retry: 0
                                },
                                this.retryDelay = t.retryDelay,
                                this.loadInternal()
                        }
                    }, {
                        key: "loadInternal",
                        value: function () {
                            var e, t = this.context;
                            e = "undefined" != typeof XDomainRequest ? this.loader = new XDomainRequest : this.loader = new XMLHttpRequest;
                            var r = this.stats;
                            r.tfirst = 0,
                                r.loaded = 0;
                            var i = this.xhrSetup;
                            if (i)
                                try {
                                    i(e, t.url)
                                } catch (r) {
                                    e.open("GET", t.url, !0),
                                        i(e, t.url)
                                }
                            e.readyState || e.open("GET", t.url, !0),
                                t.rangeEnd && e.setRequestHeader("Range", "bytes=" + t.rangeStart + "-" + (t.rangeEnd - 1)),
                                e.onreadystatechange = this.readystatechange.bind(this),
                                e.onprogress = this.loadprogress.bind(this),
                                e.responseType = t.responseType,
                                this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), this.config.timeout),
                                e.send()
                        }
                    }, {
                        key: "readystatechange",
                        value: function (e) {
                            var t = e.currentTarget
                                , r = t.readyState
                                , i = this.stats
                                , a = this.context
                                , s = this.config;
                            if (!i.aborted && r >= 2)
                                if (window.clearTimeout(this.requestTimeout),
                                    0 === i.tfirst && (i.tfirst = Math.max(performance.now(), i.trequest)),
                                    4 === r) {
                                    var o = t.status;
                                    if (o >= 200 && o < 300) {
                                        i.tload = Math.max(i.tfirst, performance.now());
                                        var l = void 0
                                            , u = void 0;
                                        "arraybuffer" === a.responseType ? (l = t.response,
                                            u = l.byteLength) : (l = t.responseText,
                                                u = l.length),
                                            i.loaded = i.total = u;
                                        var d = {
                                            url: t.responseURL,
                                            data: l
                                        };
                                        this.callbacks.onSuccess(d, i, a)
                                    } else
                                        i.retry >= s.maxRetry || o >= 400 && o < 499 ? (n.logger.error(o + " while loading " + a.url),
                                            this.callbacks.onError({
                                                code: o,
                                                text: t.statusText
                                            }, a)) : (n.logger.warn(o + " while loading " + a.url + ", retrying in " + this.retryDelay + "..."),
                                                this.destroy(),
                                                this.retryTimeout = window.setTimeout(this.loadInternal.bind(this), this.retryDelay),
                                                this.retryDelay = Math.min(2 * this.retryDelay, s.maxRetryDelay),
                                                i.retry++)
                                } else
                                    this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), s.timeout)
                        }
                    }, {
                        key: "loadtimeout",
                        value: function () {
                            n.logger.warn("timeout while loading " + this.context.url),
                                this.callbacks.onTimeout(this.stats, this.context)
                        }
                    }, {
                        key: "loadprogress",
                        value: function (e) {
                            var t = this.stats;
                            t.loaded = e.loaded,
                                e.lengthComputable && (t.total = e.total);
                            var r = this.callbacks.onProgress;
                            r && r(t, this.context, null)
                        }
                    }]),
                        e
                }();
            r.default = s
        }
            , {
            51: 51
        }]
    }, {}, [38])(38)
});
