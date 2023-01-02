(() => {
    "use strict";
    var e,
        n,
        t,
        r,
        o,
        a,
        i,
        s,
        c,
        u,
        d,
        l,
        p,
        f,
        v,
        y,
        h = {
            771: (e, n, t) => {
                t.d(n, { Z: () => s });
                var r = t(81),
                    o = t.n(r),
                    a = t(645),
                    i = t.n(a)()(o());
                i.push([
                    e.id,
                    "* {\r\n    box-sizing: border-box;\r\n}\r\n\r\nhtml, body {\r\n    margin: 0;\r\n    padding: 0;\r\n    color: red;\r\n}\r\n\r\n.canvas {\r\n    border: 3px solid black;\r\n    width: 100%;\r\n    position: absolute;\r\n    transform: translateY(-50%);\r\n    top: 50%;\r\n    left: 0;\r\n}\r\n\r\n",
                    "",
                ]);
                const s = i;
            },
            645: (e) => {
                e.exports = function (e) {
                    var n = [];
                    return (
                        (n.toString = function () {
                            return this.map(function (n) {
                                var t = "",
                                    r = void 0 !== n[5];
                                return (
                                    n[4] &&
                                        (t += "@supports (".concat(
                                            n[4],
                                            ") {"
                                        )),
                                    n[2] && (t += "@media ".concat(n[2], " {")),
                                    r &&
                                        (t += "@layer".concat(
                                            n[5].length > 0
                                                ? " ".concat(n[5])
                                                : "",
                                            " {"
                                        )),
                                    (t += e(n)),
                                    r && (t += "}"),
                                    n[2] && (t += "}"),
                                    n[4] && (t += "}"),
                                    t
                                );
                            }).join("");
                        }),
                        (n.i = function (e, t, r, o, a) {
                            "string" == typeof e && (e = [[null, e, void 0]]);
                            var i = {};
                            if (r)
                                for (var s = 0; s < this.length; s++) {
                                    var c = this[s][0];
                                    null != c && (i[c] = !0);
                                }
                            for (var u = 0; u < e.length; u++) {
                                var d = [].concat(e[u]);
                                (r && i[d[0]]) ||
                                    (void 0 !== a &&
                                        (void 0 === d[5] ||
                                            (d[1] = "@layer"
                                                .concat(
                                                    d[5].length > 0
                                                        ? " ".concat(d[5])
                                                        : "",
                                                    " {"
                                                )
                                                .concat(d[1], "}")),
                                        (d[5] = a)),
                                    t &&
                                        (d[2]
                                            ? ((d[1] = "@media "
                                                  .concat(d[2], " {")
                                                  .concat(d[1], "}")),
                                              (d[2] = t))
                                            : (d[2] = t)),
                                    o &&
                                        (d[4]
                                            ? ((d[1] = "@supports ("
                                                  .concat(d[4], ") {")
                                                  .concat(d[1], "}")),
                                              (d[4] = o))
                                            : (d[4] = "".concat(o))),
                                    n.push(d));
                            }
                        }),
                        n
                    );
                };
            },
            81: (e) => {
                e.exports = function (e) {
                    return e[1];
                };
            },
            379: (e) => {
                var n = [];
                function t(e) {
                    for (var t = -1, r = 0; r < n.length; r++)
                        if (n[r].identifier === e) {
                            t = r;
                            break;
                        }
                    return t;
                }
                function r(e, r) {
                    for (var a = {}, i = [], s = 0; s < e.length; s++) {
                        var c = e[s],
                            u = r.base ? c[0] + r.base : c[0],
                            d = a[u] || 0,
                            l = "".concat(u, " ").concat(d);
                        a[u] = d + 1;
                        var p = t(l),
                            f = {
                                css: c[1],
                                media: c[2],
                                sourceMap: c[3],
                                supports: c[4],
                                layer: c[5],
                            };
                        if (-1 !== p) n[p].references++, n[p].updater(f);
                        else {
                            var v = o(f, r);
                            (r.byIndex = s),
                                n.splice(s, 0, {
                                    identifier: l,
                                    updater: v,
                                    references: 1,
                                });
                        }
                        i.push(l);
                    }
                    return i;
                }
                function o(e, n) {
                    var t = n.domAPI(n);
                    return (
                        t.update(e),
                        function (n) {
                            if (n) {
                                if (
                                    n.css === e.css &&
                                    n.media === e.media &&
                                    n.sourceMap === e.sourceMap &&
                                    n.supports === e.supports &&
                                    n.layer === e.layer
                                )
                                    return;
                                t.update((e = n));
                            } else t.remove();
                        }
                    );
                }
                e.exports = function (e, o) {
                    var a = r((e = e || []), (o = o || {}));
                    return function (e) {
                        e = e || [];
                        for (var i = 0; i < a.length; i++) {
                            var s = t(a[i]);
                            n[s].references--;
                        }
                        for (var c = r(e, o), u = 0; u < a.length; u++) {
                            var d = t(a[u]);
                            0 === n[d].references &&
                                (n[d].updater(), n.splice(d, 1));
                        }
                        a = c;
                    };
                };
            },
            569: (e) => {
                var n = {};
                e.exports = function (e, t) {
                    var r = (function (e) {
                        if (void 0 === n[e]) {
                            var t = document.querySelector(e);
                            if (
                                window.HTMLIFrameElement &&
                                t instanceof window.HTMLIFrameElement
                            )
                                try {
                                    t = t.contentDocument.head;
                                } catch (e) {
                                    t = null;
                                }
                            n[e] = t;
                        }
                        return n[e];
                    })(e);
                    if (!r)
                        throw new Error(
                            "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
                        );
                    r.appendChild(t);
                };
            },
            216: (e) => {
                e.exports = function (e) {
                    var n = document.createElement("style");
                    return (
                        e.setAttributes(n, e.attributes),
                        e.insert(n, e.options),
                        n
                    );
                };
            },
            565: (e, n, t) => {
                e.exports = function (e) {
                    var n = t.nc;
                    n && e.setAttribute("nonce", n);
                };
            },
            795: (e) => {
                e.exports = function (e) {
                    var n = e.insertStyleElement(e);
                    return {
                        update: function (t) {
                            !(function (e, n, t) {
                                var r = "";
                                t.supports &&
                                    (r += "@supports (".concat(
                                        t.supports,
                                        ") {"
                                    )),
                                    t.media &&
                                        (r += "@media ".concat(t.media, " {"));
                                var o = void 0 !== t.layer;
                                o &&
                                    (r += "@layer".concat(
                                        t.layer.length > 0
                                            ? " ".concat(t.layer)
                                            : "",
                                        " {"
                                    )),
                                    (r += t.css),
                                    o && (r += "}"),
                                    t.media && (r += "}"),
                                    t.supports && (r += "}");
                                var a = t.sourceMap;
                                a &&
                                    "undefined" != typeof btoa &&
                                    (r +=
                                        "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                                            btoa(
                                                unescape(
                                                    encodeURIComponent(
                                                        JSON.stringify(a)
                                                    )
                                                )
                                            ),
                                            " */"
                                        )),
                                    n.styleTagTransform(r, e, n.options);
                            })(n, e, t);
                        },
                        remove: function () {
                            !(function (e) {
                                if (null === e.parentNode) return !1;
                                e.parentNode.removeChild(e);
                            })(n);
                        },
                    };
                };
            },
            589: (e) => {
                e.exports = function (e, n) {
                    if (n.styleSheet) n.styleSheet.cssText = e;
                    else {
                        for (; n.firstChild; ) n.removeChild(n.firstChild);
                        n.appendChild(document.createTextNode(e));
                    }
                };
            },
        },
        m = {};
    function b(e) {
        var n = m[e];
        if (void 0 !== n) return n.exports;
        var t = (m[e] = { id: e, exports: {} });
        return h[e](t, t.exports, b), t.exports;
    }
    (b.n = (e) => {
        var n = e && e.__esModule ? () => e.default : () => e;
        return b.d(n, { a: n }), n;
    }),
        (b.d = (e, n) => {
            for (var t in n)
                b.o(n, t) &&
                    !b.o(e, t) &&
                    Object.defineProperty(e, t, { enumerable: !0, get: n[t] });
        }),
        (b.o = (e, n) => Object.prototype.hasOwnProperty.call(e, n)),
        (b.nc = void 0),
        (e = function () {}),
        (n = function () {
            var e = this;
            (this.keys = []),
                window.addEventListener("keydown", function (n) {
                    ("ArrowDown" !== n.key && "s" !== n.key) ||
                        -1 !== e.keys.indexOf(n.key) ||
                        (e.keys.push(n.key), console.log(e.keys));
                }),
                window.addEventListener("keyup", function (n) {
                    e.keys.includes(n.key) &&
                        (e.keys.splice(e.keys.indexOf(n.key), 1),
                        console.log(e.keys));
                });
        }),
        (t = b(379)),
        (r = b.n(t)),
        (o = b(795)),
        (a = b.n(o)),
        (i = b(569)),
        (s = b.n(i)),
        (c = b(565)),
        (u = b.n(c)),
        (d = b(216)),
        (l = b.n(d)),
        (p = b(589)),
        (f = b.n(p)),
        (v = b(771)),
        ((y = {}).styleTagTransform = f()),
        (y.setAttributes = u()),
        (y.insert = s().bind(null, "head")),
        (y.domAPI = a()),
        (y.insertStyleElement = l()),
        r()(v.Z, y),
        v.Z && v.Z.locals && v.Z.locals,
        document.getElementById("canvas").getContext("2d"),
        new (function (t) {
            (this.isStarted = t),
                (this.player = new e()),
                (this.input = new n());
        })(!1);
})();
