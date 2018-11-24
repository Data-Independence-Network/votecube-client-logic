!function (e) {
    function n(n) {
        for (var t, r, u = n[0], i = n[1], c = 0, a = []; c < u.length; c++) r = u[c], o[r] && a.push(o[r][0]), o[r] = 0;
        for (t in i) Object.prototype.hasOwnProperty.call(i, t) && (e[t] = i[t]);
        for (l && l(n); a.length;) a.shift()()
    }

    var t = {}, o = {0: 0};

    function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = {i: n, l: !1, exports: {}};
        return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }

    r.e = function (e) {
        var n = [], t = o[e];
        if (0 !== t) if (t) n.push(t[2]); else {
            var u = new Promise(function (n, r) {
                t = o[e] = [n, r]
            });
            n.push(t[2] = u);
            var i, c = document.getElementsByTagName("head")[0],
                l = document.createElement("script");
            l.charset = "utf-8", l.timeout = 120, r.nc && l.setAttribute("nonce", r.nc), l.src = function (e) {
                return r.p + "" + ({}[e] || e) + ".bundle.js"
            }(e), i = function (n) {
                l.onerror = l.onload = null, clearTimeout(a);
                var t = o[e];
                if (0 !== t) {
                    if (t) {
                        var r = n && ("load" === n.type ? "missing" : n.type),
                            u = n && n.target && n.target.src,
                            i = new Error("Loading chunk " + e + " failed.\n(" + r + ": " + u + ")");
                        i.type = r, i.request = u, t[1](i)
                    }
                    o[e] = void 0
                }
            };
            var a = setTimeout(function () {
                i({type: "timeout", target: l})
            }, 12e4);
            l.onerror = l.onload = i, c.appendChild(l)
        }
        return Promise.all(n)
    }, r.m = e, r.c = t, r.d = function (e, n, t) {
        r.o(e, n) || Object.defineProperty(e, n, {enumerable: !0, get: t})
    }, r.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, r.t = function (e, n) {
        if (1 & n && (e = r(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var t = Object.create(null);
        if (r.r(t), Object.defineProperty(t, "default", {
            enumerable: !0,
            value: e
        }), 2 & n && "string" != typeof e) for (var o in e) r.d(t, o, function (n) {
            return e[n]
        }.bind(null, o));
        return t
    }, r.n = function (e) {
        var n = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return r.d(n, "a", n), n
    }, r.o = function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }, r.p = "", r.oe = function (e) {
        throw console.error(e), e
    };
    var u = window.webpackJsonp = window.webpackJsonp || [], i = u.push.bind(u);
    u.push = n, u = u.slice();
    for (var c = 0; c < u.length; c++) n(u[c]);
    var l = i;
    r(r.s = 0)
}([function (e, n, t) {
    "use strict";
    t.r(n);
    var o = function (e, n, t, o) {
        return new (t || (t = Promise))(function (r, u) {
            function i(e) {
                try {
                    l(o.next(e))
                } catch (e) {
                    u(e)
                }
            }

            function c(e) {
                try {
                    l(o.throw(e))
                } catch (e) {
                    u(e)
                }
            }

            function l(e) {
                e.done ? r(e.value) : new t(function (n) {
                    n(e.value)
                }).then(i, c)
            }

            l((o = o.apply(e, n || [])).next())
        })
    };

    class r {
        helloFromLazyModule() {
            return o(this, void 0, void 0, function* () {
                console.log("before dynamic import");
                const e = yield t.e(1).then(t.bind(null, 1));
                console.log("after dynamic import");
                const n = e.helloDynamicImport();
                return console.log("value:"), console.log(n), n
            })
        }
    }

    t.d(n, "HelloClass", function () {
        return r
    })
}]);
//# sourceMappingURL=bundle.js.map