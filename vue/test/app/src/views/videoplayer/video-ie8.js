! function (a, b) {
    "undefined" == typeof a.HTMLVideoElement && (b.createElement("video"), b.createElement("audio"), b.createElement("track")),
        function (a, b) {
            "use strict";
            "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.returnExports = b()
        }(this, function () {
            var b, c = Array,
                d = c.prototype,
                e = Object,
                f = e.prototype,
                g = Function.prototype,
                h = String,
                i = h.prototype,
                j = Number,
                k = j.prototype,
                l = d.slice,
                m = d.splice,
                n = d.push,
                o = d.unshift,
                p = d.concat,
                q = g.call,
                r = g.apply,
                s = Math.max,
                t = Math.min,
                u = f.toString,
                v = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
                w = Function.prototype.toString,
                x = function (a) {
                    try {
                        return w.call(a), !0
                    } catch (b) {
                        return !1
                    }
                },
                y = "[object Function]",
                z = "[object GeneratorFunction]";
            b = function (a) {
                if ("function" != typeof a) return !1;
                if (v) return x(a);
                var b = u.call(a);
                return b === y || b === z
            };
            var A, B = RegExp.prototype.exec,
                C = function (a) {
                    try {
                        return B.call(a), !0
                    } catch (b) {
                        return !1
                    }
                },
                D = "[object RegExp]";
            A = function (a) {
                return "object" != typeof a ? !1 : v ? C(a) : u.call(a) === D
            };
            var E, F = String.prototype.valueOf,
                G = function (a) {
                    try {
                        return F.call(a), !0
                    } catch (b) {
                        return !1
                    }
                },
                H = "[object String]";
            E = function (a) {
                return "string" == typeof a ? !0 : "object" != typeof a ? !1 : v ? G(a) : u.call(a) === H
            };
            var I = e.defineProperty && function () {
                    try {
                        var a = {};
                        e.defineProperty(a, "x", {
                            enumerable: !1,
                            value: a
                        });
                        for (var b in a) return !1;
                        return a.x === a
                    } catch (c) {
                        return !1
                    }
                }(),
                J = function (a) {
                    var b;
                    return b = I ? function (a, b, c, d) {
                            !d && b in a || e.defineProperty(a, b, {
                                configurable: !0,
                                enumerable: !1,
                                writable: !0,
                                value: c
                            })
                        } : function (a, b, c, d) {
                            !d && b in a || (a[b] = c)
                        },
                        function (c, d, e) {
                            for (var f in d) a.call(d, f) && b(c, f, d[f], e)
                        }
                }(f.hasOwnProperty),
                K = function (a) {
                    var b = typeof a;
                    return null === a || "object" !== b && "function" !== b
                },
                L = j.isNaN || function (a) {
                    return a !== a
                },
                M = {
                    ToInteger: function (a) {
                        var b = +a;
                        return L(b) ? b = 0 : 0 !== b && b !== 1 / 0 && b !== -(1 / 0) && (b = (b > 0 || -1) * Math.floor(Math.abs(b))), b
                    },
                    ToPrimitive: function (a) {
                        var c, d, e;
                        if (K(a)) return a;
                        if (d = a.valueOf, b(d) && (c = d.call(a), K(c))) return c;
                        if (e = a.toString, b(e) && (c = e.call(a), K(c))) return c;
                        throw new TypeError
                    },
                    ToObject: function (a) {
                        if (null == a) throw new TypeError("can't convert " + a + " to object");
                        return e(a)
                    },
                    ToUint32: function (a) {
                        return a >>> 0
                    }
                },
                N = function () {};
            J(g, {
                bind: function (a) {
                    var c = this;
                    if (!b(c)) throw new TypeError("Function.prototype.bind called on incompatible " + c);
                    for (var d, f = l.call(arguments, 1), g = function () {
                            if (this instanceof d) {
                                var b = c.apply(this, p.call(f, l.call(arguments)));
                                return e(b) === b ? b : this
                            }
                            return c.apply(a, p.call(f, l.call(arguments)))
                        }, h = s(0, c.length - f.length), i = [], j = 0; h > j; j++) n.call(i, "$" + j);
                    return d = Function("binder", "return function (" + i.join(",") + "){ return binder.apply(this, arguments); }")(g), c.prototype && (N.prototype = c.prototype, d.prototype = new N, N.prototype = null), d
                }
            });
            var O = q.bind(f.hasOwnProperty),
                P = q.bind(f.toString),
                Q = q.bind(l),
                R = r.bind(l),
                S = q.bind(i.slice),
                T = q.bind(i.split),
                U = q.bind(i.indexOf),
                V = q.bind(n),
                W = q.bind(f.propertyIsEnumerable),
                X = q.bind(d.sort),
                Y = c.isArray || function (a) {
                    return "[object Array]" === P(a)
                },
                Z = 1 !== [].unshift(0);
            J(d, {
                unshift: function () {
                    return o.apply(this, arguments), this.length
                }
            }, Z), J(c, {
                isArray: Y
            });
            var $ = e("a"),
                _ = "a" !== $[0] || !(0 in $),
                aa = function (a) {
                    var b = !0,
                        c = !0,
                        d = !1;
                    if (a) try {
                        a.call("foo", function (a, c, d) {
                            "object" != typeof d && (b = !1)
                        }), a.call([1], function () {
                            "use strict";
                            c = "string" == typeof this
                        }, "x")
                    } catch (e) {
                        d = !0
                    }
                    return !!a && !d && b && c
                };
            J(d, {
                forEach: function (a) {
                    var c, d = M.ToObject(this),
                        e = _ && E(this) ? T(this, "") : d,
                        f = -1,
                        g = M.ToUint32(e.length);
                    if (arguments.length > 1 && (c = arguments[1]), !b(a)) throw new TypeError("Array.prototype.forEach callback must be a function");
                    for (; ++f < g;) f in e && ("undefined" == typeof c ? a(e[f], f, d) : a.call(c, e[f], f, d))
                }
            }, !aa(d.forEach)), J(d, {
                map: function (a) {
                    var d, e = M.ToObject(this),
                        f = _ && E(this) ? T(this, "") : e,
                        g = M.ToUint32(f.length),
                        h = c(g);
                    if (arguments.length > 1 && (d = arguments[1]), !b(a)) throw new TypeError("Array.prototype.map callback must be a function");
                    for (var i = 0; g > i; i++) i in f && ("undefined" == typeof d ? h[i] = a(f[i], i, e) : h[i] = a.call(d, f[i], i, e));
                    return h
                }
            }, !aa(d.map)), J(d, {
                filter: function (a) {
                    var c, d, e = M.ToObject(this),
                        f = _ && E(this) ? T(this, "") : e,
                        g = M.ToUint32(f.length),
                        h = [];
                    if (arguments.length > 1 && (d = arguments[1]), !b(a)) throw new TypeError("Array.prototype.filter callback must be a function");
                    for (var i = 0; g > i; i++) i in f && (c = f[i], ("undefined" == typeof d ? a(c, i, e) : a.call(d, c, i, e)) && V(h, c));
                    return h
                }
            }, !aa(d.filter)), J(d, {
                every: function (a) {
                    var c, d = M.ToObject(this),
                        e = _ && E(this) ? T(this, "") : d,
                        f = M.ToUint32(e.length);
                    if (arguments.length > 1 && (c = arguments[1]), !b(a)) throw new TypeError("Array.prototype.every callback must be a function");
                    for (var g = 0; f > g; g++)
                        if (g in e && !("undefined" == typeof c ? a(e[g], g, d) : a.call(c, e[g], g, d))) return !1;
                    return !0
                }
            }, !aa(d.every)), J(d, {
                some: function (a) {
                    var c, d = M.ToObject(this),
                        e = _ && E(this) ? T(this, "") : d,
                        f = M.ToUint32(e.length);
                    if (arguments.length > 1 && (c = arguments[1]), !b(a)) throw new TypeError("Array.prototype.some callback must be a function");
                    for (var g = 0; f > g; g++)
                        if (g in e && ("undefined" == typeof c ? a(e[g], g, d) : a.call(c, e[g], g, d))) return !0;
                    return !1
                }
            }, !aa(d.some));
            var ba = !1;
            d.reduce && (ba = "object" == typeof d.reduce.call("es5", function (a, b, c, d) {
                return d
            })), J(d, {
                reduce: function (a) {
                    var c = M.ToObject(this),
                        d = _ && E(this) ? T(this, "") : c,
                        e = M.ToUint32(d.length);
                    if (!b(a)) throw new TypeError("Array.prototype.reduce callback must be a function");
                    if (0 === e && 1 === arguments.length) throw new TypeError("reduce of empty array with no initial value");
                    var f, g = 0;
                    if (arguments.length >= 2) f = arguments[1];
                    else
                        for (;;) {
                            if (g in d) {
                                f = d[g++];
                                break
                            }
                            if (++g >= e) throw new TypeError("reduce of empty array with no initial value")
                        }
                    for (; e > g; g++) g in d && (f = a(f, d[g], g, c));
                    return f
                }
            }, !ba);
            var ca = !1;
            d.reduceRight && (ca = "object" == typeof d.reduceRight.call("es5", function (a, b, c, d) {
                return d
            })), J(d, {
                reduceRight: function (a) {
                    var c = M.ToObject(this),
                        d = _ && E(this) ? T(this, "") : c,
                        e = M.ToUint32(d.length);
                    if (!b(a)) throw new TypeError("Array.prototype.reduceRight callback must be a function");
                    if (0 === e && 1 === arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
                    var f, g = e - 1;
                    if (arguments.length >= 2) f = arguments[1];
                    else
                        for (;;) {
                            if (g in d) {
                                f = d[g--];
                                break
                            }
                            if (--g < 0) throw new TypeError("reduceRight of empty array with no initial value")
                        }
                    if (0 > g) return f;
                    do g in d && (f = a(f, d[g], g, c)); while (g--);
                    return f
                }
            }, !ca);
            var da = d.indexOf && -1 !== [0, 1].indexOf(1, 2);
            J(d, {
                indexOf: function (a) {
                    var b = _ && E(this) ? T(this, "") : M.ToObject(this),
                        c = M.ToUint32(b.length);
                    if (0 === c) return -1;
                    var d = 0;
                    for (arguments.length > 1 && (d = M.ToInteger(arguments[1])), d = d >= 0 ? d : s(0, c + d); c > d; d++)
                        if (d in b && b[d] === a) return d;
                    return -1
                }
            }, da);
            var ea = d.lastIndexOf && -1 !== [0, 1].lastIndexOf(0, -3);
            J(d, {
                lastIndexOf: function (a) {
                    var b = _ && E(this) ? T(this, "") : M.ToObject(this),
                        c = M.ToUint32(b.length);
                    if (0 === c) return -1;
                    var d = c - 1;
                    for (arguments.length > 1 && (d = t(d, M.ToInteger(arguments[1]))), d = d >= 0 ? d : c - Math.abs(d); d >= 0; d--)
                        if (d in b && a === b[d]) return d;
                    return -1
                }
            }, ea);
            var fa = function () {
                var a = [1, 2],
                    b = a.splice();
                return 2 === a.length && Y(b) && 0 === b.length
            }();
            J(d, {
                splice: function (a, b) {
                    return 0 === arguments.length ? [] : m.apply(this, arguments)
                }
            }, !fa);
            var ga = function () {
                var a = {};
                return d.splice.call(a, 0, 0, 1), 1 === a.length
            }();
            J(d, {
                splice: function (a, b) {
                    if (0 === arguments.length) return [];
                    var c = arguments;
                    return this.length = s(M.ToInteger(this.length), 0), arguments.length > 0 && "number" != typeof b && (c = Q(arguments), c.length < 2 ? V(c, this.length - a) : c[1] = M.ToInteger(b)), m.apply(this, c)
                }
            }, !ga);
            var ha = function () {
                    var a = new c(1e5);
                    return a[8] = "x", a.splice(1, 1), 7 === a.indexOf("x")
                }(),
                ia = function () {
                    var a = 256,
                        b = [];
                    return b[a] = "a", b.splice(a + 1, 0, "b"), "a" === b[a]
                }();
            J(d, {
                splice: function (a, b) {
                    for (var c, d = M.ToObject(this), e = [], f = M.ToUint32(d.length), g = M.ToInteger(a), i = 0 > g ? s(f + g, 0) : t(g, f), j = t(s(M.ToInteger(b), 0), f - i), k = 0; j > k;) c = h(i + k), O(d, c) && (e[k] = d[c]), k += 1;
                    var l, m = Q(arguments, 2),
                        n = m.length;
                    if (j > n) {
                        for (k = i; f - j > k;) c = h(k + j), l = h(k + n), O(d, c) ? d[l] = d[c] : delete d[l], k += 1;
                        for (k = f; k > f - j + n;) delete d[k - 1], k -= 1
                    } else if (n > j)
                        for (k = f - j; k > i;) c = h(k + j - 1), l = h(k + n - 1), O(d, c) ? d[l] = d[c] : delete d[l], k -= 1;
                    k = i;
                    for (var o = 0; o < m.length; ++o) d[k] = m[o], k += 1;
                    return d.length = f - j + n, e
                }
            }, !ha || !ia);
            var ja, ka = d.join;
            try {
                ja = "1,2,3" !== Array.prototype.join.call("123", ",")
            } catch (la) {
                ja = !0
            }
            ja && J(d, {
                join: function (a) {
                    var b = "undefined" == typeof a ? "," : a;
                    return ka.call(E(this) ? T(this, "") : this, b)
                }
            }, ja);
            var ma = "1,2" !== [1, 2].join(void 0);
            ma && J(d, {
                join: function (a) {
                    var b = "undefined" == typeof a ? "," : a;
                    return ka.call(this, b)
                }
            }, ma);
            var na = function (a) {
                    for (var b = M.ToObject(this), c = M.ToUint32(b.length), d = 0; d < arguments.length;) b[c + d] = arguments[d], d += 1;
                    return b.length = c + d, c + d
                },
                oa = function () {
                    var a = {},
                        b = Array.prototype.push.call(a, void 0);
                    return 1 !== b || 1 !== a.length || "undefined" != typeof a[0] || !O(a, 0)
                }();
            J(d, {
                push: function (a) {
                    return Y(this) ? n.apply(this, arguments) : na.apply(this, arguments)
                }
            }, oa);
            var pa = function () {
                var a = [],
                    b = a.push(void 0);
                return 1 !== b || 1 !== a.length || "undefined" != typeof a[0] || !O(a, 0)
            }();
            J(d, {
                push: na
            }, pa), J(d, {
                slice: function (a, b) {
                    var c = E(this) ? T(this, "") : this;
                    return R(c, arguments)
                }
            }, _);
            var qa = function () {
                    try {
                        return [1, 2].sort(null), [1, 2].sort({}), !0
                    } catch (a) {}
                    return !1
                }(),
                ra = function () {
                    try {
                        return [1, 2].sort(/a/), !1
                    } catch (a) {}
                    return !0
                }(),
                sa = function () {
                    try {
                        return [1, 2].sort(void 0), !0
                    } catch (a) {}
                    return !1
                }();
            J(d, {
                sort: function (a) {
                    if ("undefined" == typeof a) return X(this);
                    if (!b(a)) throw new TypeError("Array.prototype.sort callback must be a function");
                    return X(this, a)
                }
            }, qa || !sa || !ra);
            var ta = !{
                    toString: null
                }.propertyIsEnumerable("toString"),
                ua = function () {}.propertyIsEnumerable("prototype"),
                va = !O("x", "0"),
                wa = function (a) {
                    var b = a.constructor;
                    return b && b.prototype === a
                },
                xa = {
                    $window: !0,
                    $console: !0,
                    $parent: !0,
                    $self: !0,
                    $frame: !0,
                    $frames: !0,
                    $frameElement: !0,
                    $webkitIndexedDB: !0,
                    $webkitStorageInfo: !0,
                    $external: !0
                },
                ya = function () {
                    if ("undefined" == typeof a) return !1;
                    for (var b in a) try {
                        !xa["$" + b] && O(a, b) && null !== a[b] && "object" == typeof a[b] && wa(a[b])
                    } catch (c) {
                        return !0
                    }
                    return !1
                }(),
                za = function (b) {
                    if ("undefined" == typeof a || !ya) return wa(b);
                    try {
                        return wa(b)
                    } catch (c) {
                        return !1
                    }
                },
                Aa = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                Ba = Aa.length,
                Ca = function (a) {
                    return "[object Arguments]" === P(a)
                },
                Da = function (a) {
                    return null !== a && "object" == typeof a && "number" == typeof a.length && a.length >= 0 && !Y(a) && b(a.callee)
                },
                Ea = Ca(arguments) ? Ca : Da;
            J(e, {
                keys: function (a) {
                    var c = b(a),
                        d = Ea(a),
                        e = null !== a && "object" == typeof a,
                        f = e && E(a);
                    if (!e && !c && !d) throw new TypeError("Object.keys called on a non-object");
                    var g = [],
                        i = ua && c;
                    if (f && va || d)
                        for (var j = 0; j < a.length; ++j) V(g, h(j));
                    if (!d)
                        for (var k in a) i && "prototype" === k || !O(a, k) || V(g, h(k));
                    if (ta)
                        for (var l = za(a), m = 0; Ba > m; m++) {
                            var n = Aa[m];
                            l && "constructor" === n || !O(a, n) || V(g, n)
                        }
                    return g
                }
            });
            var Fa = e.keys && function () {
                    return 2 === e.keys(arguments).length
                }(1, 2),
                Ga = e.keys && function () {
                    var a = e.keys(arguments);
                    return 1 !== arguments.length || 1 !== a.length || 1 !== a[0]
                }(1),
                Ha = e.keys;
            J(e, {
                keys: function (a) {
                    return Ha(Ea(a) ? Q(a) : a)
                }
            }, !Fa || Ga);
            var Ia, Ja, Ka = 0 !== new Date(-0xc782b5b342b24).getUTCMonth(),
                La = new Date(-0x55d318d56a724),
                Ma = new Date(14496624e5),
                Na = "Mon, 01 Jan -45875 11:59:59 GMT" !== La.toUTCString(),
                Oa = La.getTimezoneOffset(); - 720 > Oa ? (Ia = "Tue Jan 02 -45875" !== La.toDateString(), Ja = !/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/.test(Ma.toString())) : (Ia = "Mon Jan 01 -45875" !== La.toDateString(), Ja = !/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/.test(Ma.toString()));
            var Pa = q.bind(Date.prototype.getFullYear),
                Qa = q.bind(Date.prototype.getMonth),
                Ra = q.bind(Date.prototype.getDate),
                Sa = q.bind(Date.prototype.getUTCFullYear),
                Ta = q.bind(Date.prototype.getUTCMonth),
                Ua = q.bind(Date.prototype.getUTCDate),
                Va = q.bind(Date.prototype.getUTCDay),
                Wa = q.bind(Date.prototype.getUTCHours),
                Xa = q.bind(Date.prototype.getUTCMinutes),
                Ya = q.bind(Date.prototype.getUTCSeconds),
                Za = q.bind(Date.prototype.getUTCMilliseconds),
                $a = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
                _a = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                ab = function (a, b) {
                    return Ra(new Date(b, a, 0))
                };
            J(Date.prototype, {
                getFullYear: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var a = Pa(this);
                    return 0 > a && Qa(this) > 11 ? a + 1 : a
                },
                getMonth: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var a = Pa(this),
                        b = Qa(this);
                    return 0 > a && b > 11 ? 0 : b
                },
                getDate: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var a = Pa(this),
                        b = Qa(this),
                        c = Ra(this);
                    if (0 > a && b > 11) {
                        if (12 === b) return c;
                        var d = ab(0, a + 1);
                        return d - c + 1
                    }
                    return c
                },
                getUTCFullYear: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var a = Sa(this);
                    return 0 > a && Ta(this) > 11 ? a + 1 : a
                },
                getUTCMonth: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var a = Sa(this),
                        b = Ta(this);
                    return 0 > a && b > 11 ? 0 : b
                },
                getUTCDate: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var a = Sa(this),
                        b = Ta(this),
                        c = Ua(this);
                    if (0 > a && b > 11) {
                        if (12 === b) return c;
                        var d = ab(0, a + 1);
                        return d - c + 1
                    }
                    return c
                }
            }, Ka), J(Date.prototype, {
                toUTCString: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var a = Va(this),
                        b = Ua(this),
                        c = Ta(this),
                        d = Sa(this),
                        e = Wa(this),
                        f = Xa(this),
                        g = Ya(this);
                    return $a[a] + ", " + (10 > b ? "0" + b : b) + " " + _a[c] + " " + d + " " + (10 > e ? "0" + e : e) + ":" + (10 > f ? "0" + f : f) + ":" + (10 > g ? "0" + g : g) + " GMT"
                }
            }, Ka || Na), J(Date.prototype, {
                toDateString: function () {
                    if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                    var a = this.getDay(),
                        b = this.getDate(),
                        c = this.getMonth(),
                        d = this.getFullYear();
                    return $a[a] + " " + _a[c] + " " + (10 > b ? "0" + b : b) + " " + d
                }
            }, Ka || Ia), (Ka || Ja) && (Date.prototype.toString = function () {
                if (!(this && this instanceof Date)) throw new TypeError("this is not a Date object.");
                var a = this.getDay(),
                    b = this.getDate(),
                    c = this.getMonth(),
                    d = this.getFullYear(),
                    e = this.getHours(),
                    f = this.getMinutes(),
                    g = this.getSeconds(),
                    h = this.getTimezoneOffset(),
                    i = Math.floor(Math.abs(h) / 60),
                    j = Math.floor(Math.abs(h) % 60);
                return $a[a] + " " + _a[c] + " " + (10 > b ? "0" + b : b) + " " + d + " " + (10 > e ? "0" + e : e) + ":" + (10 > f ? "0" + f : f) + ":" + (10 > g ? "0" + g : g) + " GMT" + (h > 0 ? "-" : "+") + (10 > i ? "0" + i : i) + (10 > j ? "0" + j : j)
            }, I && e.defineProperty(Date.prototype, "toString", {
                configurable: !0,
                enumerable: !1,
                writable: !0
            }));
            var bb = -621987552e5,
                cb = "-000001",
                db = Date.prototype.toISOString && -1 === new Date(bb).toISOString().indexOf(cb),
                eb = Date.prototype.toISOString && "1969-12-31T23:59:59.999Z" !== new Date(-1).toISOString();
            J(Date.prototype, {
                toISOString: function () {
                    if (!isFinite(this)) throw new RangeError("Date.prototype.toISOString called on non-finite value.");
                    var a = Sa(this),
                        b = Ta(this);
                    a += Math.floor(b / 12), b = (b % 12 + 12) % 12;
                    var c = [b + 1, Ua(this), Wa(this), Xa(this), Ya(this)];
                    a = (0 > a ? "-" : a > 9999 ? "+" : "") + S("00000" + Math.abs(a), a >= 0 && 9999 >= a ? -4 : -6);
                    for (var d = 0; d < c.length; ++d) c[d] = S("00" + c[d], -2);
                    return a + "-" + Q(c, 0, 2).join("-") + "T" + Q(c, 2).join(":") + "." + S("000" + Za(this), -3) + "Z"
                }
            }, db || eb);
            var fb = function () {
                try {
                    return Date.prototype.toJSON && null === new Date(NaN).toJSON() && -1 !== new Date(bb).toJSON().indexOf(cb) && Date.prototype.toJSON.call({
                        toISOString: function () {
                            return !0
                        }
                    })
                } catch (a) {
                    return !1
                }
            }();
            fb || (Date.prototype.toJSON = function (a) {
                var c = e(this),
                    d = M.ToPrimitive(c);
                if ("number" == typeof d && !isFinite(d)) return null;
                var f = c.toISOString;
                if (!b(f)) throw new TypeError("toISOString property is not callable");
                return f.call(c)
            });
            var gb = 1e15 === Date.parse("+033658-09-27T01:46:40.000Z"),
                hb = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")) || !isNaN(Date.parse("2012-12-31T23:59:60.000Z")),
                ib = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
            if (ib || hb || !gb) {
                var jb = Math.pow(2, 31) - 1,
                    kb = L(new Date(1970, 0, 1, 0, 0, 0, jb + 1).getTime());
                Date = function (a) {
                    var b = function (c, d, e, f, g, i, j) {
                            var k, l = arguments.length;
                            if (this instanceof a) {
                                var m = i,
                                    n = j;
                                if (kb && l >= 7 && j > jb) {
                                    var o = Math.floor(j / jb) * jb,
                                        p = Math.floor(o / 1e3);
                                    m += p, n -= 1e3 * p
                                }
                                k = 1 === l && h(c) === c ? new a(b.parse(c)) : l >= 7 ? new a(c, d, e, f, g, m, n) : l >= 6 ? new a(c, d, e, f, g, m) : l >= 5 ? new a(c, d, e, f, g) : l >= 4 ? new a(c, d, e, f) : l >= 3 ? new a(c, d, e) : l >= 2 ? new a(c, d) : l >= 1 ? new a(c) : new a
                            } else k = a.apply(this, arguments);
                            return K(k) || J(k, {
                                constructor: b
                            }, !0), k
                        },
                        c = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),
                        d = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
                        e = function (a, b) {
                            var c = b > 1 ? 1 : 0;
                            return d[b] + Math.floor((a - 1969 + c) / 4) - Math.floor((a - 1901 + c) / 100) + Math.floor((a - 1601 + c) / 400) + 365 * (a - 1970)
                        },
                        f = function (b) {
                            var c = 0,
                                d = b;
                            if (kb && d > jb) {
                                var e = Math.floor(d / jb) * jb,
                                    f = Math.floor(e / 1e3);
                                c += f, d -= 1e3 * f
                            }
                            return j(new a(1970, 0, 1, 0, 0, c, d))
                        };
                    for (var g in a) O(a, g) && (b[g] = a[g]);
                    J(b, {
                        now: a.now,
                        UTC: a.UTC
                    }, !0), b.prototype = a.prototype, J(b.prototype, {
                        constructor: b
                    }, !0);
                    var i = function (b) {
                        var d = c.exec(b);
                        if (d) {
                            var g, h = j(d[1]),
                                i = j(d[2] || 1) - 1,
                                k = j(d[3] || 1) - 1,
                                l = j(d[4] || 0),
                                m = j(d[5] || 0),
                                n = j(d[6] || 0),
                                o = Math.floor(1e3 * j(d[7] || 0)),
                                p = Boolean(d[4] && !d[8]),
                                q = "-" === d[9] ? 1 : -1,
                                r = j(d[10] || 0),
                                s = j(d[11] || 0),
                                t = m > 0 || n > 0 || o > 0;
                            return (t ? 24 : 25) > l && 60 > m && 60 > n && 1e3 > o && i > -1 && 12 > i && 24 > r && 60 > s && k > -1 && k < e(h, i + 1) - e(h, i) && (g = 60 * (24 * (e(h, i) + k) + l + r * q), g = 1e3 * (60 * (g + m + s * q) + n) + o, p && (g = f(g)), g >= -864e13 && 864e13 >= g) ? g : NaN
                        }
                        return a.parse.apply(this, arguments)
                    };
                    return J(b, {
                        parse: i
                    }), b
                }(Date)
            }
            Date.now || (Date.now = function () {
                return (new Date).getTime()
            });
            var lb = k.toFixed && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)),
                mb = {
                    base: 1e7,
                    size: 6,
                    data: [0, 0, 0, 0, 0, 0],
                    multiply: function (a, b) {
                        for (var c = -1, d = b; ++c < mb.size;) d += a * mb.data[c], mb.data[c] = d % mb.base, d = Math.floor(d / mb.base)
                    },
                    divide: function (a) {
                        for (var b = mb.size, c = 0; --b >= 0;) c += mb.data[b], mb.data[b] = Math.floor(c / a), c = c % a * mb.base
                    },
                    numToString: function () {
                        for (var a = mb.size, b = ""; --a >= 0;)
                            if ("" !== b || 0 === a || 0 !== mb.data[a]) {
                                var c = h(mb.data[a]);
                                "" === b ? b = c : b += S("0000000", 0, 7 - c.length) + c
                            } return b
                    },
                    pow: function Gb(a, b, c) {
                        return 0 === b ? c : b % 2 === 1 ? Gb(a, b - 1, c * a) : Gb(a * a, b / 2, c)
                    },
                    log: function (a) {
                        for (var b = 0, c = a; c >= 4096;) b += 12, c /= 4096;
                        for (; c >= 2;) b += 1, c /= 2;
                        return b
                    }
                },
                nb = function (a) {
                    var b, c, d, e, f, g, i, k;
                    if (b = j(a), b = L(b) ? 0 : Math.floor(b), 0 > b || b > 20) throw new RangeError("Number.toFixed called with invalid number of decimals");
                    if (c = j(this), L(c)) return "NaN";
                    if (-1e21 >= c || c >= 1e21) return h(c);
                    if (d = "", 0 > c && (d = "-", c = -c), e = "0", c > 1e-21)
                        if (f = mb.log(c * mb.pow(2, 69, 1)) - 69, g = 0 > f ? c * mb.pow(2, -f, 1) : c / mb.pow(2, f, 1), g *= 4503599627370496, f = 52 - f, f > 0) {
                            for (mb.multiply(0, g), i = b; i >= 7;) mb.multiply(1e7, 0), i -= 7;
                            for (mb.multiply(mb.pow(10, i, 1), 0), i = f - 1; i >= 23;) mb.divide(1 << 23), i -= 23;
                            mb.divide(1 << i), mb.multiply(1, 1), mb.divide(2), e = mb.numToString()
                        } else mb.multiply(0, g), mb.multiply(1 << -f, 0), e = mb.numToString() + S("0.00000000000000000000", 2, 2 + b);
                    return b > 0 ? (k = e.length, e = b >= k ? d + S("0.0000000000000000000", 0, b - k + 2) + e : d + S(e, 0, k - b) + "." + S(e, k - b)) : e = d + e, e
                };
            J(k, {
                toFixed: nb
            }, lb);
            var ob = function () {
                    try {
                        return "1" === 1..toPrecision(void 0)
                    } catch (a) {
                        return !0
                    }
                }(),
                pb = k.toPrecision;
            J(k, {
                toPrecision: function (a) {
                    return "undefined" == typeof a ? pb.call(this) : pb.call(this, a)
                }
            }, ob), 2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 4 !== "test".split(/(?:)/, -1).length || "".split(/.?/).length || ".".split(/()()/).length > 1 ? ! function () {
                var a = "undefined" == typeof /()??/.exec("")[1],
                    b = Math.pow(2, 32) - 1;
                i.split = function (c, d) {
                    var e = String(this);
                    if ("undefined" == typeof c && 0 === d) return [];
                    if (!A(c)) return T(this, c, d);
                    var f, g, h, i, j = [],
                        k = (c.ignoreCase ? "i" : "") + (c.multiline ? "m" : "") + (c.unicode ? "u" : "") + (c.sticky ? "y" : ""),
                        l = 0,
                        m = new RegExp(c.source, k + "g");
                    a || (f = new RegExp("^" + m.source + "$(?!\\s)", k));
                    var o = "undefined" == typeof d ? b : M.ToUint32(d);
                    for (g = m.exec(e); g && (h = g.index + g[0].length, !(h > l && (V(j, S(e, l, g.index)), !a && g.length > 1 && g[0].replace(f, function () {
                            for (var a = 1; a < arguments.length - 2; a++) "undefined" == typeof arguments[a] && (g[a] = void 0)
                        }), g.length > 1 && g.index < e.length && n.apply(j, Q(g, 1)), i = g[0].length, l = h, j.length >= o)));) m.lastIndex === g.index && m.lastIndex++, g = m.exec(e);
                    return l === e.length ? (i || !m.test("")) && V(j, "") : V(j, S(e, l)), j.length > o ? S(j, 0, o) : j
                }
            }() : "0".split(void 0, 0).length && (i.split = function (a, b) {
                return "undefined" == typeof a && 0 === b ? [] : T(this, a, b)
            });
            var qb = i.replace,
                rb = function () {
                    var a = [];
                    return "x".replace(/x(.)?/g, function (b, c) {
                        V(a, c)
                    }), 1 === a.length && "undefined" == typeof a[0]
                }();
            rb || (i.replace = function (a, c) {
                var d = b(c),
                    e = A(a) && /\)[*?]/.test(a.source);
                if (d && e) {
                    var f = function (b) {
                        var d = arguments.length,
                            e = a.lastIndex;
                        a.lastIndex = 0;
                        var f = a.exec(b) || [];
                        return a.lastIndex = e, V(f, arguments[d - 2], arguments[d - 1]), c.apply(this, f)
                    };
                    return qb.call(this, a, f)
                }
                return qb.call(this, a, c)
            });
            var sb = i.substr,
                tb = "".substr && "b" !== "0b".substr(-1);
            J(i, {
                substr: function (a, b) {
                    var c = a;
                    return 0 > a && (c = s(this.length + a, 0)), sb.call(this, c, b)
                }
            }, tb);
            var ub = "	\n\f\r   ᠎             　\u2028\u2029\ufeff",
                vb = "​",
                wb = "[" + ub + "]",
                xb = new RegExp("^" + wb + wb + "*"),
                yb = new RegExp(wb + wb + "*$"),
                zb = i.trim && (ub.trim() || !vb.trim());
            J(i, {
                trim: function () {
                    if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
                    return h(this).replace(xb, "").replace(yb, "")
                }
            }, zb);
            var Ab = q.bind(String.prototype.trim),
                Bb = i.lastIndexOf && -1 !== "abcあい".lastIndexOf("あい", 2);
            J(i, {
                lastIndexOf: function (a) {
                    if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
                    for (var b = h(this), c = h(a), d = arguments.length > 1 ? j(arguments[1]) : NaN, e = L(d) ? 1 / 0 : M.ToInteger(d), f = t(s(e, 0), b.length), g = c.length, i = f + g; i > 0;) {
                        i = s(0, i - g);
                        var k = U(S(b, i, f + g), c);
                        if (-1 !== k) return i + k
                    }
                    return -1
                }
            }, Bb);
            var Cb = i.lastIndexOf;
            if (J(i, {
                    lastIndexOf: function (a) {
                        return Cb.apply(this, arguments)
                    }
                }, 1 !== i.lastIndexOf.length), (8 !== parseInt(ub + "08") || 22 !== parseInt(ub + "0x16")) && (parseInt = function (a) {
                    var b = /^[\-+]?0[xX]/;
                    return function (c, d) {
                        var e = Ab(c),
                            f = j(d) || (b.test(e) ? 16 : 10);
                        return a(e, f)
                    }
                }(parseInt)), 1 / parseFloat("-0") !== -(1 / 0) && (parseFloat = function (a) {
                    return function (b) {
                        var c = Ab(b),
                            d = a(c);
                        return 0 === d && "-" === S(c, 0, 1) ? -0 : d
                    }
                }(parseFloat)), "RangeError: test" !== String(new RangeError("test"))) {
                var Db = function () {
                    if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
                    var a = this.name;
                    "undefined" == typeof a ? a = "Error" : "string" != typeof a && (a = h(a));
                    var b = this.message;
                    return "undefined" == typeof b ? b = "" : "string" != typeof b && (b = h(b)), a ? b ? a + ": " + b : a : b
                };
                Error.prototype.toString = Db
            }
            if (I) {
                var Eb = function (a, b) {
                    if (W(a, b)) {
                        var c = Object.getOwnPropertyDescriptor(a, b);
                        c.enumerable = !1, Object.defineProperty(a, b, c)
                    }
                };
                Eb(Error.prototype, "message"), "" !== Error.prototype.message && (Error.prototype.message = ""), Eb(Error.prototype, "name")
            }
            if ("/a/gim" !== String(/a/gim)) {
                var Fb = function () {
                    var a = "/" + this.source + "/";
                    return this.global && (a += "g"), this.ignoreCase && (a += "i"), this.multiline && (a += "m"), a
                };
                RegExp.prototype.toString = Fb
            }
        }),
        function (a, b) {
            "use strict";
            "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.returnExports = b()
        }(this, function () {
            var a, c, d, e, f = Function.call,
                g = Object.prototype,
                h = f.bind(g.hasOwnProperty),
                i = f.bind(g.propertyIsEnumerable),
                j = f.bind(g.toString),
                k = h(g, "__defineGetter__");
            k && (a = f.bind(g.__defineGetter__), c = f.bind(g.__defineSetter__), d = f.bind(g.__lookupGetter__), e = f.bind(g.__lookupSetter__)), Object.getPrototypeOf || (Object.getPrototypeOf = function (a) {
                var b = a.__proto__;
                return b || null === b ? b : "[object Function]" === j(a.constructor) ? a.constructor.prototype : a instanceof Object ? g : null
            });
            var l = function (a) {
                try {
                    return a.sentinel = 0, 0 === Object.getOwnPropertyDescriptor(a, "sentinel").value
                } catch (b) {
                    return !1
                }
            };
            if (Object.defineProperty) {
                var m = l({}),
                    n = "undefined" == typeof b || l(b.createElement("div"));
                if (!n || !m) var o = Object.getOwnPropertyDescriptor
            }
            if (!Object.getOwnPropertyDescriptor || o) {
                var p = "Object.getOwnPropertyDescriptor called on a non-object: ";
                Object.getOwnPropertyDescriptor = function (a, b) {
                    if ("object" != typeof a && "function" != typeof a || null === a) throw new TypeError(p + a);
                    if (o) try {
                        return o.call(Object, a, b)
                    } catch (c) {}
                    var f;
                    if (!h(a, b)) return f;
                    if (f = {
                            enumerable: i(a, b),
                            configurable: !0
                        }, k) {
                        var j = a.__proto__,
                            l = a !== g;
                        l && (a.__proto__ = g);
                        var m = d(a, b),
                            n = e(a, b);
                        if (l && (a.__proto__ = j), m || n) return m && (f.get = m), n && (f.set = n), f
                    }
                    return f.value = a[b], f.writable = !0, f
                }
            }
            if (Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function (a) {
                    return Object.keys(a)
                }), !Object.create) {
                var q, r = !({
                            __proto__: null
                        }
                        instanceof Object),
                    s = function () {
                        if (!b.domain) return !1;
                        try {
                            return !!new ActiveXObject("htmlfile")
                        } catch (a) {
                            return !1
                        }
                    },
                    t = function () {
                        var a, b;
                        return b = new ActiveXObject("htmlfile"), b.write("<script></script>"), b.close(), a = b.parentWindow.Object.prototype, b = null, a
                    },
                    u = function () {
                        var a, c = b.createElement("iframe"),
                            d = b.body || b.documentElement;
                        return c.style.display = "none", d.appendChild(c), c.src = "javascript:", a = c.contentWindow.Object.prototype, d.removeChild(c), c = null, a
                    };
                q = r || "undefined" == typeof b ? function () {
                    return {
                        __proto__: null
                    }
                } : function () {
                    var a = s() ? t() : u();
                    delete a.constructor, delete a.hasOwnProperty, delete a.propertyIsEnumerable, delete a.isPrototypeOf, delete a.toLocaleString, delete a.toString, delete a.valueOf;
                    var b = function () {};
                    return b.prototype = a, q = function () {
                        return new b
                    }, new b
                }, Object.create = function (a, b) {
                    var c, d = function () {};
                    if (null === a) c = q();
                    else {
                        if ("object" != typeof a && "function" != typeof a) throw new TypeError("Object prototype may only be an Object or null");
                        d.prototype = a, c = new d, c.__proto__ = a
                    }
                    return void 0 !== b && Object.defineProperties(c, b), c
                }
            }
            var v = function (a) {
                try {
                    return Object.defineProperty(a, "sentinel", {}), "sentinel" in a
                } catch (b) {
                    return !1
                }
            };
            if (Object.defineProperty) {
                var w = v({}),
                    x = "undefined" == typeof b || v(b.createElement("div"));
                if (!w || !x) var y = Object.defineProperty,
                    z = Object.defineProperties
            }
            if (!Object.defineProperty || y) {
                var A = "Property description must be an object: ",
                    B = "Object.defineProperty called on non-object: ",
                    C = "getters & setters can not be defined on this javascript engine";
                Object.defineProperty = function (b, f, h) {
                    if ("object" != typeof b && "function" != typeof b || null === b) throw new TypeError(B + b);
                    if ("object" != typeof h && "function" != typeof h || null === h) throw new TypeError(A + h);
                    if (y) try {
                        return y.call(Object, b, f, h)
                    } catch (i) {}
                    if ("value" in h)
                        if (k && (d(b, f) || e(b, f))) {
                            var j = b.__proto__;
                            b.__proto__ = g, delete b[f], b[f] = h.value, b.__proto__ = j
                        } else b[f] = h.value;
                    else {
                        if (!k && ("get" in h || "set" in h)) throw new TypeError(C);
                        "get" in h && a(b, f, h.get), "set" in h && c(b, f, h.set)
                    }
                    return b
                }
            }(!Object.defineProperties || z) && (Object.defineProperties = function (a, b) {
                if (z) try {
                    return z.call(Object, a, b)
                } catch (c) {}
                return Object.keys(b).forEach(function (c) {
                    "__proto__" !== c && Object.defineProperty(a, c, b[c])
                }), a
            }), Object.seal || (Object.seal = function (a) {
                if (Object(a) !== a) throw new TypeError("Object.seal can only be called on Objects.");
                return a
            }), Object.freeze || (Object.freeze = function (a) {
                if (Object(a) !== a) throw new TypeError("Object.freeze can only be called on Objects.");
                return a
            });
            try {
                Object.freeze(function () {})
            } catch (D) {
                Object.freeze = function (a) {
                    return function (b) {
                        return "function" == typeof b ? b : a(b)
                    }
                }(Object.freeze)
            }
            Object.preventExtensions || (Object.preventExtensions = function (a) {
                if (Object(a) !== a) throw new TypeError("Object.preventExtensions can only be called on Objects.");
                return a
            }), Object.isSealed || (Object.isSealed = function (a) {
                if (Object(a) !== a) throw new TypeError("Object.isSealed can only be called on Objects.");
                return !1
            }), Object.isFrozen || (Object.isFrozen = function (a) {
                if (Object(a) !== a) throw new TypeError("Object.isFrozen can only be called on Objects.");
                return !1
            }), Object.isExtensible || (Object.isExtensible = function (a) {
                if (Object(a) !== a) throw new TypeError("Object.isExtensible can only be called on Objects.");
                for (var b = ""; h(a, b);) b += "?";
                a[b] = !0;
                var c = h(a, b);
                return delete a[b], c
            })
        })
}(window, document);