define([], function(){
	
	var Swapper = function (f, d) {
    function e(h, i, c, b) {
        e._swapper(h, i, c, b)
    }
    if (f && f.fn) {
        f.extend(f.fn, {
            swapper: function (g, c, b) {
                g = f(g)[0];
                this.forEach(function (h) {
                    e._swapper(h, g, c, b)
                });
                return this
            }
        })
    }
    if (d && d.fn) {
        d.fn.swapper = function (g, c, b) {
            g = d(g)[0];
            this.each(function () {
                e._swapper(this, g, c, b)
            });
            return this
        }
    }
    return e
}(window.Zepto, window.jQuery);
Swapper._os = function (i, k) {
    var l, h, g;
    if (g = /\bCPU.*OS (\d+(_\d+)?)/i.exec(i)) {
        l = "ios";
        h = g[1].replace("_", ".")
    } else {
        if (g = /\bAndroid (\d+(\.\d+)?)/.exec(i)) {
            l = "android";
            h = g[1]
        }
    }
    var j = {
        name: l,
        version: h && k(h)
    };
    j[l] = true;
    return j
}(navigator.userAgent, parseFloat);
Swapper._isNode = function (d, c) {
    return function (b) {
        if (!b) {
            return false
        }
        try {
            return (b instanceof d) || (b instanceof c)
        } catch (e) {}
        if (typeof b !== "object") {
            return false
        }
        if (typeof b.nodeType !== "number") {
            return false
        }
        if (typeof b.nodeName !== "string") {
            return false
        }
        return true
    }
}(Node, HTMLElement);
Swapper._isInDOM = function (b) {
    return function (e, d) {
        if (!d && !b(e)) {
            throw TypeError("element must be a DOM node, got " + e)
        }
        while (e = e.parentNode) {
            if (e === document) {
                return true
            }
        }
        return false
    }
}(Swapper._isNode);
Swapper._insertBefore = function () {
    return function (d, c) {
        c.parentNode.insertBefore(d, c)
    }
}();
Swapper._insertAfter = function () {
    return function (e, f) {
        var d = f.parentNode;
        if (d.lastchild === f) {
            d.appendChild(e)
        } else {
            d.insertBefore(e, f.nextSibling)
        }
    }
}();
Swapper._removeNode = function () {
    return function (b) {
        if (b.parentNode) {
            b.parentNode.removeChild(b)
        }
    }
}();
Swapper._setTransform = function () {
    return function (c, d) {
        c.style["-webkit-transform"] = d;
        c.style["-moz-transform"] = d;
        c.style["-ms-transform"] = d;
        c.style["-o-transform"] = d;
        c.style.transform = d
    }
}();
Swapper._setTransition = function () {
    return function (d, c) {
        if (c) {
            d.style["-webkit-transition"] = "-webkit-" + c;
            d.style["-moz-transition"] = "-moz-" + c;
            d.style["-ms-transition"] = "-ms-" + c;
            d.style["-o-transition"] = "-o-" + c;
            d.style.transition = c
        } else {
            d.style["-webkit-transition"] = "";
            d.style["-moz-transition"] = "";
            d.style["-ms-transition"] = "";
            d.style["-o-transition"] = "";
            d.style.transition = ""
        }
    }
}();
Swapper._getStyles = function (b) {
    return function (g, f) {
        var e;
        if (f) {
            e = g.style
        } else {
            e = b.defaultView.getComputedStyle(g, null)
        }
        return {
            "-webkit-transition": e["-webkit-transition"],
            "-moz-transition": e["-moz-transition"],
            "-ms-transition": e["-ms-transition"],
            "-o-transition": e["-o-transition"],
            transition: e.transition,
            display: e.display,
            opacity: e.opacity,
            top: e.top,
            left: e.left,
            height: e.height,
            width: e.width,
            position: e.position
        }
    }
}(document);
Swapper._easings = {
    linear: "linear",
    ease: "ease",
    "ease-in": "ease-in",
    "ease-out": "ease-out",
    "ease-in-out": "ease-in-out",
    "step-start": "step-start",
    "step-end": "step-end"
};
Swapper._transitions = {
    fade: [{
        fade: true
    }, {
        fade: true
    }],
    "fade-on": [{
        fade: true
    }, {}],
    "fade-off": [{}, {
            fade: true
        },
        true
    ],
    "scale-in": [{
        transform: "scale(0.01)"
    }, {}],
    "scale-out": [{}, {
            transform: "scale(0.01)"
        },
        true
    ],
    "rotate-left": [{
        transform: "rotateY(-180deg) perspective(360px)",
        fade: true
    }, {
        transform: "rotateY( 180deg) perspective(360px)",
        fade: true
    }],
    "rotate-right": [{
        transform: "rotateY( 180deg) perspective(360px)",
        fade: true
    }, {
        transform: "rotateY(-180deg) perspective(360px)",
        fade: true
    }],
    "cube-left": [{
        transform: "translate3d( 50%,0,0) rotateY(-90deg) perspective(360px)"
    }, {
        transform: "translate3d(-50%,0,0) rotateY( 90deg) perspective(360px)"
    }],
    "cube-right": [{
        transform: "translate3d(-50%,0,0) rotateY( 90deg) perspective(360px)"
    }, {
        transform: "translate3d( 50%,0,0) rotateY(-90deg) perspective(360px)"
    }],
    "swap-left": [{
        transform: "translate3d( 65%,0,0) rotateY( 90deg) perspective(360px)"
    }, {
        transform: "translate3d(-65%,0,0) rotateY(-90deg) perspective(360px)"
    }],
    "swap-right": [{
        transform: "translate3d(-65%,0,0) rotateY(-90deg) perspective(360px)"
    }, {
        transform: "translate3d( 65%,0,0) rotateY( 90deg) perspective(360px)"
    }],
    "explode-in": [{
        fade: true,
        transform: "scale(1.25)"
    }, {}],
    "explode-out": [{}, {
            fade: true,
            transform: "scale(1.25)"
        },
        true
    ],
    "implode-in": [{}, {
            fade: true,
            transform: "scale(0.60)"
        },
        true
    ],
    "implode-out": [{
        fade: true,
        transform: "scale(0.80)"
    }, {}],
    "slide-left": [{
        transform: "translate3d( 100%,0,0)"
    }, {
        transform: "translate3d(-100%,0,0)"
    }],
    "slide-right": [{
        transform: "translate3d(-100%,0,0)"
    }, {
        transform: "translate3d( 100%,0,0)"
    }],
    "slide-up": [{
        transform: "translate3d(0, 100%,0)"
    }, {
        transform: "translate3d(0,-100%,0)"
    }],
    "slide-down": [{
        transform: "translate3d(0,-100%,0)"
    }, {
        transform: "translate3d(0, 100%,0)"
    }],
    "slideon-left": [{
        transform: "translate3d(-100%,0,0)"
    }, {}],
    "slideoff-left": [{}, {
            transform: "translate3d(-100%,0,0)"
        },
        true
    ],
    "slideon-right": [{
        transform: "translate3d(100%,0,0)"
    }, {}],
    "slideoff-right": [{}, {
            transform: "translate3d(100%,0,0)"
        },
        true
    ],
    "slideon-up": [{
        transform: "translate3d(0,-100%,0)"
    }, {}],
    "slideoff-up": [{}, {
            transform: "translate3d(0,-100%,0)"
        },
        true
    ],
    "slideon-down": [{
        transform: "translate3d(0,100%,0)"
    }, {}],
    "slideoff-down": [{}, {
            transform: "translate3d(0,100%,0)"
        },
        true
    ],
    "glideon-right": [{
        transform: "translate3d(110%,0,0)"
    }, {
        transform: "translate3d(-20%,0,0)"
    }],
    "glideoff-right": [{
            transform: "translate3d(-20%,0,0)"
        }, {
            transform: "translate3d(110%,0,0)"
        },
        true
    ],
    "glideon-left": [{
        transform: "translate3d(-110%,0,0)"
    }, {
        transform: "translate3d(20%,0,0)"
    }],
    "glideoff-left": [{
            transform: "translate3d(20%,0,0)"
        }, {
            transform: "translate3d(-110%,0,0)"
        },
        true
    ],
    "glideon-down": [{
        transform: "translate3d(0,110%,0)"
    }, {
        transform: "translate3d(0,-20%,0)"
    }],
    "glideoff-down": [{
            transform: "translate3d(0,-20%,0)"
        }, {
            transform: "translate3d(0,110%,0)"
        },
        true
    ],
    "glideon-up": [{
        transform: "translate3d(0,-110%,0)"
    }, {
        transform: "translate3d(0,20%,0)"
    }],
    "glideoff-up": [{
            transform: "translate3d(0,20%,0)"
        }, {
            transform: "translate3d(0,-110%,0)"
        },
        true
    ]
};
Swapper._validate = function (j, i, k) {
    return {
        element: l,
        options: g,
        callback: h
    };

    function l(b) {
        if (!j(b)) {
            throw TypeError("element must be a DOM node, got " + b)
        }
    }

    function g(b) {
        switch (typeof b) {
        case "string":
            b = {
                transition: b
            };
            break;
        case "undefined":
            b = {};
            break;
        case "object":
            break;
        default:
            throw TypeError("options must be an object if defined, got " + b)
        }
        switch (typeof b.transition) {
        case "string":
            if (!(b.transition in i) && (b.transition !== "instant")) {
                throw TypeError(b.transition + " is not a valid transition")
            }
            break;
        case "undefined":
            break;
        default:
            throw TypeError("transition must be a string if defined, got " + b.transition)
        }
        switch (typeof b.duration) {
        case "number":
            if (b.duration < 0) {
                throw TypeError("duration must be a non-negative integer, got " + b.duration)
            }
            break;
        case "undefined":
            break;
        default:
            throw TypeError("duration must be a number if defined, got " + b.duration)
        }
        switch (typeof b.easing) {
        case "string":
            if (!(b.easing in k)) {
                throw TypeError(b.easing + " is not a valid easing")
            }
            break;
        case "undefined":
            break;
        default:
            throw TypeError("easing must be a string if defined, got " + b.easing)
        }
        return b
    }

    function h(b) {
        switch (typeof b) {
        case "undefined":
            b = function () {};
            break;
        case "function":
            break;
        default:
            throw TypeError("callback must be a function if defined, got " + b)
        }
        return b
    }
}(Swapper._isNode, Swapper._transitions, Swapper._easings);
Swapper._swapper = function (Z, I, ae, af, U, H, ad, ac, aa, O, Y, S, X, N) {
    var aj = "translate3d(0,0,0) scale(1)",
        M = "fade",
        F = "ease-in-out";
    var T = (Z.ios && (Math.floor(Z.version) === 5));

    function Q(d, e, c, b) {
        S.element(d);
        S.element(e);
        if (typeof c === "function") {
            b = c;
            c = {}
        }
        c = S.options(c);
        b = S.callback(b);
        if (d._swapper) {
            throw Error("elem1 is currently being swapped")
        } else {
            if (e._swapper) {
                throw Error("elem2 is currently being swapped")
            }
        } if (!ae(d, true)) {
            throw Error("elem1 must be in the DOM to be swapped")
        }
        d._swapper = true;
        e._swapper = true;
        H(e);
        V(d, e, c, function () {
            d._swapper = false;
            e._swapper = false;
            b()
        })
    }

    function V(c, d, b, e) {
        if (b.transition === "instant") {
            U(d, c);
            H(c);
            e();
            return
        }
        var f = O[b.transition || M],
            g = Y[b.easing || F],
            h = b.duration || 300;
        U(d, c);
        var i = aa(c),
            j = aa(d),
            k = aa(c, true),
            l = aa(d, true);
        P(c, d, i, j);
        if (f[2]) {
            af(d, c)
        }
        d.style.opacity = "0";
        K(c, d);
        setTimeout(function () {
            d.style.opacity = j.opacity;
            ai(c, d, f);
            setTimeout(function () {
                W(c, d, h, g);
                setTimeout(function () {
                    G(c, d, f);
                    R(c, d, i, j, f, h, function () {
                        H(c);
                        L(c, d, h, g);
                        setTimeout(function () {
                            J(c, d, k, l, f);
                            ag(c, d, k, l);
                            setTimeout(function () {
                                ah(c, d, k, l);
                                e()
                            }, 0)
                        }, 0)
                    })
                }, 0)
            }, 0)
        }, 0)
    }

    function P(e, f, c, d) {
        var b = e.getBoundingClientRect();
        if (c.display !== "none") {
            if (T) {
                f.style.position = "absolute"
            } else {
                f.style.position = "fixed"
            }
            f.style.top = b.top + "px";
            f.style.left = b.left + "px"
        }
        f.style.height = d.height || c.height;
        f.style.width = d.width || c.width
    }

    function ag(d, e, b, c) {
        e.style.position = c.position;
        e.style.top = c.top;
        e.style.left = c.left;
        e.style.height = c.height;
        e.style.width = c.width
    }

    function ai(c, d, b) {
        ad(c, aj);
        ad(d, b[0].transform || aj);
        if (b[0].fade) {
            d.style.opacity = "0"
        }
        if (b[1].fade) {
            c.style.opacity = "1"
        }
    }

    function G(c, d, b) {
        ad(c, b[1].transform || aj);
        ad(d, aj);
        if (b[0].fade) {
            d.style.opacity = "1"
        }
        if (b[1].fade) {
            c.style.opacity = "0"
        }
    }

    function J(e, f, c, d, b) {
        ad(e, "");
        ad(f, "");
        if (b[0].fade) {
            f.style.opacity = d.opacity
        }
        if (b[1].fade) {
            e.style.opacity = c.opacity
        }
    }

    function W(e, f, d, b) {
        var c = "transform " + (d / 1000) + "s " + b + ",opacity " + (d / 1000) + "s " + b;
        ac(e, c);
        ac(f, c)
    }

    function L(d, e, c, b) {
        ac(d, "");
        ac(e, "")
    }

    function K(b, c) {
        ac(b, "");
        ac(c, "")
    }

    function ah(d, e, b, c) {
        d.style["-webkit-transition"] = b["-webkit-transition"];
        d.style["-moz-transition"] = b["-moz-transition"];
        d.style["-ms-transition"] = b["-ms-transition"];
        d.style["-o-transition"] = b["-o-transition"];
        d.style.transition = b.transition;
        e.style["-webkit-transition"] = c["-webkit-transition"];
        e.style["-moz-transition"] = c["-moz-transition"];
        e.style["-ms-transition"] = c["-ms-transition"];
        e.style["-o-transition"] = c["-o-transition"];
        e.style.transition = c.transition
    }

    function ab(c, b) {
        if (c.display === "none") {
            return false
        }
        if (b.fade) {
            return true
        }
        if (!b.transform) {
            return false
        } else {
            if (b.transform === aj) {
                return false
            } else {
                return true
            }
        }
    }

    function R(b, e, k, m, h, j, f) {
        var l;
        if (ab(m, h[0])) {
            l = e;
            c()
        } else {
            if (ab(k, h[1])) {
                l = b;
                c()
            } else {
                setTimeout(g, j)
            }
        }

        function c() {
            l.addEventListener("webkitTransitionEnd", g, false);
            l.addEventListener("transitionend", g, false);
            l.addEventListener("oTransitionEnd", g, false);
            l.addEventListener("otransitionend", g, false);
            l.addEventListener("MSTransitionEnd", g, false);
            l.addEventListener("transitionend", g, false)
        }

        function d() {
            l.removeEventListener("webkitTransitionEnd", g);
            l.removeEventListener("transitionend", g);
            l.removeEventListener("oTransitionEnd", g);
            l.removeEventListener("otransitionend", g);
            l.removeEventListener("MSTransitionEnd", g);
            l.removeEventListener("transitionend", g)
        }
        var i = false;

        function g(n) {
            if (i || (n && n.target && (n.target !== l))) {
                return
            }
            i = true;
            if (l) {
                d()
            }
            f()
        }
    }
    return Q
}(Swapper._os, Swapper._isNode, Swapper._isInDOM, Swapper._insertBefore, Swapper._insertAfter, Swapper._removeNode, Swapper._setTransform, Swapper._setTransition, Swapper._getStyles, Swapper._transitions, Swapper._easings, Swapper._validate, window, document);
var Clickable = function (f, d) {
    function e() {
        e._enableClicking.apply(this, arguments)
    }
    e.touchable = function () {
        return e._os.touchable
    };
    e.sticky = function () {
        e._enableStickyClick.apply(this, arguments)
    };
    if (d && d.fn) {
        d.fn.clickable = function (b) {
            this.each(function () {
                e._enableClicking(this, b)
            });
            return this
        };
        d.fn.stickyClick = function (b) {
            this.each(function () {
                e._enableStickyClick(this, b)
            });
            return this
        }
    }
    if (f && f.fn) {
        f.extend(f.fn, {
            clickable: function (b) {
                this.forEach(function (c) {
                    e._enableClicking(c, b)
                });
                return this
            },
            stickyClick: function (b) {
                this.forEach(function (c) {
                    e._enableStickyClick(c, b)
                });
                return this
            }
        })
    }
    return e
}(window.Zepto, window.jQuery);
Clickable._os = function (i, k) {
    var l, h, g;
    if (g = /\bCPU.*OS (\d+(_\d+)?)/i.exec(i)) {
        l = "ios";
        h = g[1].replace("_", ".")
    } else {
        if (g = /\bAndroid (\d+(\.\d+)?)/.exec(i)) {
            l = "android";
            h = g[1]
        }
    }
    var j = {
        name: l,
        version: h && k(h),
        touchable: !! l
    };
    j[l] = true;
    return j
}(navigator.userAgent, parseFloat);
Clickable._trimString = function (d) {
    var c = /^\s+|\s+$/g;
    return function (b) {
        return d(b).replace(c, "")
    }
}(String);
Clickable._isDOMNode = function (d, c) {
    return function (b) {
        if (!b) {
            return false
        }
        try {
            return (b instanceof d) || (b instanceof c)
        } catch (e) {}
        if (typeof b !== "object") {
            return false
        }
        if (typeof b.nodeType !== "number") {
            return false
        }
        if (typeof b.nodeName !== "string") {
            return false
        }
        return true
    }
}(Node, HTMLElement);
Clickable._isInDOM = function () {
    return function (b) {
        while (b = b.parentNode) {
            if (b === document) {
                return true
            }
        }
        return false
    }
}();
Clickable._bindEvents = function () {
    return function (f, d) {
        for (var e in d) {
            if (f.addEventListener) {
                f.addEventListener(e, d[e], false)
            } else {
                if (f.attachEvent) {
                    f.attachEvent("on" + e, d[e])
                }
            }
        }
    }
}();
Clickable._unbindEvents = function () {
    return function (f, d) {
        for (var e in d) {
            if (f.removeEventListener) {
                f.removeEventListener(e, d[e])
            }
        }
    }
}();
Clickable._addClass = function () {
    return function (c, d) {
        c.className += " " + d
    }
}();
Clickable._removeClass = function (b) {
    return function (e, d) {
        e.className = b(e.className.replace(new RegExp("\\b" + d + "\\b"), ""))
    }
}(Clickable._trimString);
Clickable._enableClicking = function (y, r, F, A, D, v, s) {
    var x = "active",
        t = "data-clickable-class",
        z = 40;
    var q = false,
        u = !! y.ios;

    function E(g, c) {
        if (!r(g)) {
            throw TypeError("element " + g + " must be a DOM element")
        }
        if (g._clickable) {
            return
        }
        g._clickable = true;
        switch (typeof c) {
        case "undefined":
            c = x;
            break;
        case "string":
            break;
        default:
            throw TypeError("active class " + c + " must be a string")
        }
        var Q = false,
            X = false,
            n, P, k, i, T;
        g.setAttribute(t, c);
        g.style["-webkit-tap-highlight-color"] = "rgba(255,255,255,0)";
        o();
        return;

        function e(H, G) {
            Q = true;
            k = +new Date();
            n = H;
            P = G;
            i = w(g);
            if (i) {
                T = i.scrollTop;
                i.addEventListener("scroll", Y, true)
            }
        }

        function m() {
            if (i) {
                i.removeEventListener("scroll", Y)
            }
            i = null;
            T = null;
            n = null;
            P = null;
            Q = false
        }

        function Y() {
            W()
        }

        function b() {
            return Q
        }

        function R() {
            v(g, c)
        }

        function V() {
            s(g, c)
        }

        function o() {
            A(g, {
                click: j
            });
            if (!y.touchable) {
                A(g, {
                    mousedown: U,
                    mousemove: S,
                    mouseout: S,
                    mouseup: f
                });
                return
            }
            if (y.ios) {
                A(g, {
                    DOMNodeInsertedIntoDocument: d,
                    DOMNodeRemovedFromDocument: h
                });
                if (F(g)) {
                    d()
                }
            } else {
                d()
            }
        }

        function d() {
            A(g, {
                touchstart: l,
                touchmove: W,
                touchcancel: W,
                touchend: p
            })
        }

        function h() {
            D(g, {
                touchstart: l,
                touchmove: W,
                touchcancel: W,
                touchend: p
            })
        }

        function j(G) {
            G = G || window.event;
            if (!g.disabled && X) {
                X = false;
                setTimeout(function () {
                    q = false
                }, 0)
            } else {
                if (G.stopImmediatePropagation) {
                    G.stopImmediatePropagation()
                }
                G.preventDefault();
                G.stopPropagation();
                G.cancelBubble = true;
                G.returnValue = false;
                return false
            }
        }

        function U(G) {
            X = false;
            if (g.disabled || !B(G.target, g)) {
                G.preventDefault();
                m();
                return
            }
            e(G.clientX, G.clientY);
            R()
        }

        function S(G) {
            G.preventDefault();
            m();
            X = false;
            V()
        }

        function f(G) {
            if (g.disabled) {
                G.preventDefault();
                m();
                X = false;
                return
            }
            if (!b()) {
                G.preventDefault();
                X = false
            } else {
                X = true
            }
            m();
            V()
        }

        function l(H) {
            X = false;
            if (q || g.disabled || (H.touches.length !== 1) || !B(H.target, g)) {
                m();
                return
            }
            q = true;
            var G = H.changedTouches[0];
            e(G.clientX, G.clientY);
            if (i) {
                if (i._isScrolling || (T < 0) || (i.scrollHeight < T)) {
                    m();
                    return
                }
            }
            var G = k;
            setTimeout(function () {
                if (b() && (G === k)) {
                    R()
                }
            }, z)
        }

        function W(G) {
            X = false;
            m();
            if (G) {
                q = false
            }
            if (g.disabled) {
                return
            }
            V()
        }

        function p(H) {
            var L = b(),
                K = i,
                J = T,
                M = n,
                G = P;
            W();
            if (!L || g.disabled) {
                q = false;
                return
            }
            if (K) {
                if (K._isScrolling || (K.scrollTop !== J)) {
                    return
                }
            }
            if (!H.stopImmediatePropagation) {
                X = true;
                return
            }
            var I = +new Date() - k;
            if (I > z) {
                X = true;
                C(g, M, G)
            } else {
                R();
                setTimeout(function () {
                    V();
                    X = true;
                    C(g, M, G)
                }, 1)
            }
        }
    }

    function B(b, c) {
        do {
            if (b === c) {
                return true
            } else {
                if (b._clickable) {
                    return false
                }
            }
        } while (b = b.parentNode);
        return false
    }

    function C(c, e, b) {
        var d = document.createEvent("MouseEvents");
        d.initMouseEvent("click", true, true, window, 1, e || 0, b || 0, e || 0, b || 0, false, false, false, false, 0, null);
        c.dispatchEvent(d)
    }

    function w(b) {
        if (!y.ios || (y.version < 5)) {
            return
        }
        while (b = b.parentNode) {
            if (b._scrollable) {
                if (b._iScroll) {
                    return
                }
                return b
            }
        }
    }
    return E
}(Clickable._os, Clickable._isDOMNode, Clickable._isInDOM, Clickable._bindEvents, Clickable._unbindEvents, Clickable._addClass, Clickable._removeClass);
Clickable._enableStickyClick = function (h, l, i) {
    var k = "data-clickable-class";

    function j(b, c, d) {
        if (!l(b)) {
            throw TypeError("button must be a DOM element, got " + b)
        }
        switch (typeof c) {
        case "string":
            break;
        case "function":
            d = c;
            c = undefined;
            break;
        default:
            throw TypeError("button active class must be a string if defined, got " + c)
        }
        if (typeof d !== "function") {
            throw TypeError("sticky click handler must be a function, got " + d)
        }
        i(b, c);
        b.addEventListener("click", g(b, d), false)
    }

    function g(b, c) {
        return function () {
            var n = false,
                o = b.getAttribute(k),
                d;
            b.disabled = true;
            b.className += " " + o;
            try {
                d = c(e)
            } catch (f) {
                if (window.console && window.console.error) {
                    if ((typeof f === "object") && f.stack) {
                        window.console.error(f.stack)
                    } else {
                        window.console.error(f + "")
                    }
                }
                e()
            }
            if (d === false) {
                e()
            }

            function e() {
                if (n) {
                    return
                }
                n = true;
                if (b.disabled) {
                    b.disabled = false;
                    b.className = h(b.className.replace(new RegExp("\\b" + o + "\\b", "g"), ""))
                }
            }
        }
    }
    return j
}(Clickable._trimString, Clickable._isDOMNode, Clickable._enableClicking);
var Dialog = function (D, z, x) {
    var F = z.querySelector("head"),
        t = [],
        w, I, s, H;
    if (match = /\bCPU.*OS (\d+(_\d+)?)/i.exec(navigator.userAgent)) {
        s = "ios";
        H = parseFloat(match[1])
    } else {
        if (match = /\bAndroid (\d+(\.\d+(\.\d+)?)?)/.exec(navigator.userAgent)) {
            s = "android";
            H = parseFloat(match[1])
        }
    }

    function C(b) {
        b.preventDefault()
    }

    function J(b) {
        var c = t.splice(0);
        setTimeout(function () {
            c.forEach(function (e) {
                try {
                    F.removeChild(e)
                } catch (d) {}
            })
        }, b || 0)
    }

    function y(b) {
        var e = z.createElement("div");
        e.style.margin = "0 4%";
        e.style.padding = "12px 0";
        e.style.border = "1px solid #060607";
        e.style["-webkit-border-radius"] = "3px";
        e.style["-moz-border-radius"] = "3px";
        e.style["border-radius"] = "3px";
        e.style["-webkit-box-sizing"] = "border-box";
        e.style["-moz-box-sizing"] = "border-box";
        e.style["box-sizing"] = "border-box";
        e.style.color = "#FFF";
        e.style.fontSize = "18px";
        e.style.fontWeight = "bold";
        e.style.lineHeight = "20px";
        e.style.textShadow = "0 -1px 0 #1C1C1C";
        e.style.textAlign = "center";
        var c = "color: #EEE !important;background-image: -webkit-gradient(linear, left top, left bottom, from(#15171D), to(#1D1E25)) !important;background-image: -webkit-linear-gradient(top, #15171D, #1D1E25) !important;background-image: -moz-linear-gradient(top, #15171D, #1D1E25) !important;background-image: -ms-linear-gradient(top, #15171D, #1D1E25) !important;background-image: -o-linear-gradient(top, #15171D, #1D1E25) !important;background-image: linear-gradient(top, #15171D, #1D1E25) !important;";
        if (s === "ios") {
            e.style.backgroundImage = "-webkit-gradient(linear, left top, left bottom, from(#3D3E45), to(#191A22))";
            e.style.backgroundImage = "-webkit-linear-gradient(top, #3D3E45, #191A22)";
            e.style.backgroundImage = "-moz-linear-gradient(top, #3D3E45, #191A22)";
            e.style.backgroundImage = "-ms-linear-gradient(top, #3D3E45, #191A22)";
            e.style.backgroundImage = "-o-linear-gradient(top, #3D3E45, #191A22)";
            e.style.backgroundImage = "linear-gradient(top, #3D3E45, #191A22)";
            e.style["-webkit-box-shadow"] = "inset 0 1px 1px #5C5E63";
            e.style["-moz-box-shadow"] = "inset 0 1px 1px #5C5E63";
            e.style["box-shadow"] = "inset 0 1px 1px #5C5E63";
            e.style["-webkit-border-radius"] = "6px";
            e.style["-moz-border-radius"] = "6px";
            e.style["border-radius"] = "6px";
            c += "-webkit-box-shadow: inset 0 1px 2px #070814 !important;-moz-box-shadow: inset 0 1px 2px #070814 !important;box-shadow: inset 0 1px 2px #070814 !important;"
        } else {
            e.style.backgroundImage = "-webkit-gradient(linear, left top, left bottom, from(#3D3E45), to(#15171D))";
            e.style.backgroundImage = "-webkit-linear-gradient(top, #3D3E45, #15171D)";
            e.style.backgroundImage = "-moz-linear-gradient(top, #3D3E45, #15171D)";
            e.style.backgroundImage = "-ms-linear-gradient(top, #3D3E45, #15171D)";
            e.style.backgroundImage = "-o-linear-gradient(top, #3D3E45, #15171D)";
            e.style.backgroundImage = "linear-gradient(top, #3D3E45, #15171D)"
        }
        e.id = ("x" + Math.random()).replace(/\-|\./g, "");
        var d = z.createElement("link");
        d.rel = "stylesheet";
        d.href = "data:text/css,#" + e.id + ".active{" + c + "}";
        F.appendChild(d);
        t.push(d);
        x && x(e);
        e.addEventListener("click", b, false);
        return e
    }

    function B(b, d) {
        var g = z.createElement("div");
        g.style.position = "fixed";
        g.style.zIndex = "5000";
        g.style.top = "0";
        g.style.left = "0";
        g.style.margin = "0";
        g.style.padding = "0";
        g.style.height = "100%";
        g.style.width = "100%";
        g.style.background = "rgba(0,0,0, 0.8)";
        g.style.overflow = "hidden";
        if ((s === "ios") && (H <= 5)) {
            g.style.position = "absolute"
        }
        if ((s !== "android") || (H >= 4)) {
            g.addEventListener("touchstart", C, false)
        }
        var h = z.createElement("div");
        h.style.position = "absolute";
        h.style.bottom = "0";
        h.style.left = "0";
        h.style.margin = "0";
        h.style.padding = "0";
        h.style.width = "100%";
        h.style.background = "#000";
        h.style.borderTop = "1px solid rgba(124,125,127, 0.2)";
        h.style["-webkit-box-shadow"] = "0 -1px 3px rgba(0,0,0, 0.5)";
        h.style["-moz-box-shadow"] = "0 -1px 3px rgba(0,0,0, 0.5)";
        h.style["box-shadow"] = "0 -1px 3px rgba(0,0,0, 0.5)";
        h.style.color = "#FFF";
        if (s === "android") {
            h.style.fontFamily = '"Roboto", sans-serif'
        } else {
            h.style.fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif'
        }
        g.appendChild(h);
        if (b.title) {
            var e = z.createElement("div");
            e.textContent = b.title;
            e.style.position = "relative";
            e.style.padding = "12px 8px";
            e.style.margin = "0";
            e.style.background = "rgba(26,27,31, 0.97)";
            e.style.borderBottom = "1px solid rgba(18,18,21, 0.97)";
            e.style["-webkit-box-shadow"] = "0 1px 0 rgba(49,50,55, 0.97)";
            e.style["-moz-box-shadow"] = "0 1px 0 rgba(49,50,55, 0.97)";
            e.style["box-shadow"] = "0 1px 0 rgba(49,50,55, 0.97)";
            e.style.fontSize = "17px";
            e.style.fontWeight = "bold";
            e.style.lineHeight = "18px";
            e.style.textAlign = "center";
            h.appendChild(e)
        }
        if (b.text) {
            var c = z.createElement("div");
            c.textContent = b.text;
            c.style.padding = "12px 32px 0";
            c.style.margin = "0";
            c.style.backgroundImage = "-webkit-gradient(linear, left top, left bottom, from(rgba(27,29,34, 0.97)), to(rgba(24,26,31, 0.97)))";
            c.style.backgroundImage = "-webkit-linear-gradient(top, rgba(27,29,34, 0.97), rgba(24,26,31, 0.97))";
            c.style.backgroundImage = "-moz-linear-gradient(top, rgba(27,29,34, 0.97), rgba(24,26,31, 0.97))";
            c.style.backgroundImage = "-ms-linear-gradient(top, rgba(27,29,34, 0.97), rgba(24,26,31, 0.97))";
            c.style.backgroundImage = "-o-linear-gradient(top, rgba(27,29,34, 0.97), rgba(24,26,31, 0.97))";
            c.style.backgroundImage = "linear-gradient(top, rgba(27,29,34, 0.97), rgba(24,26,31, 0.97))";
            c.style.color = "#A6A7A9";
            c.style.fontSize = "16px";
            c.style.lineHeight = "17px";
            c.style.textAlign = "center";
            h.appendChild(c)
        }
        if (b.success || b.cancel) {
            var f = z.createElement("div");
            f.style.padding = "12px 0";
            f.style.margin = "0";
            f.style.backgroundImage = "-webkit-gradient(linear, left top, left bottom, from(rgba(24,26,31, 0.97)), to(rgba(20,22,28, 0.97)))";
            f.style.backgroundImage = "-webkit-linear-gradient(top, rgba(24,26,31, 0.97), rgba(20,22,28, 0.97))";
            f.style.backgroundImage = "-moz-linear-gradient(top, rgba(24,26,31, 0.97), rgba(20,22,28, 0.97))";
            f.style.backgroundImage = "-ms-linear-gradient(top, rgba(24,26,31, 0.97), rgba(20,22,28, 0.97))";
            f.style.backgroundImage = "-o-linear-gradient(top, rgba(24,26,31, 0.97), rgba(20,22,28, 0.97))";
            f.style.backgroundImage = "linear-gradient(top, rgba(24,26,31, 0.97), rgba(20,22,28, 0.97))";
            h.appendChild(f);
            if (b.success) {
                var j = y(function () {
                    d(true)
                });
                j.textContent = b.success || "Ok"
            }
            if (b.cancel) {
                var k = y(function () {
                    d(false)
                });
                k.textContent = b.cancel || "Cancel"
            }
            if (b.success && b.cancel) {
                j.style.width = "44%";
                j.style["float"] = "right";
                j.style.marginLeft = "0";
                k.style.width = "44%";
                k.style["float"] = "left";
                k.style.marginRight = "0"
            }
            if (b.cancel) {
                f.appendChild(k)
            }
            if (b.success) {
                f.appendChild(j)
            }
            var i = z.createElement("div");
            i.style.margin = "0";
            i.style.padding = "0";
            i.style.clear = "both";
            f.appendChild(i)
        }
        return g
    }

    function A(e, h, c) {
        if (!c && I) {
            I.push([e, h]);
            return
        }
        I = I || [];
        var b = false;
        var d = B(e, f);

        function f(i) {
            if (b) {
                return
            }
            b = true;
            w = null;
            if (s === "ios") {
                d.style.background = "rgba(0,0,0, 0)";
                g.style["-webkit-transform"] = "translate3d(0,100%,0)";
                g.style["-moz-transform"] = "translate3d(0,100%,0)";
                g.style["-ms-transform"] = "translate3d(0,100%,0)";
                g.style["-o-transform"] = "translate3d(0,100%,0)";
                g.style.transform = "translate3d(0,100%,0)"
            } else {
                d.style.opacity = "0"
            }
            J(600);
            setTimeout(function () {
                u();
                h(i)
            }, 0);
            setTimeout(function () {
                try {
                    z.body.removeChild(d)
                } catch (j) {}
            }, 600)
        }
        w = f;
        var g = d.firstChild;
        if (s === "ios") {
            d.style.background = "rgba(0,0,0, 0)";
            g.style["-webkit-transform"] = "translate3d(0,100%,0)";
            g.style["-moz-transform"] = "translate3d(0,100%,0)";
            g.style["-ms-transform"] = "translate3d(0,100%,0)";
            g.style["-o-transform"] = "translate3d(0,100%,0)";
            g.style.transform = "translate3d(0,100%,0)"
        } else {
            d.style.opacity = "0"
        }
        z.body.appendChild(d);
        setTimeout(function () {
            if (s === "ios") {
                d.style["-webkit-transition"] = "background 0.2s ease-in-out";
                d.style["-moz-transition"] = "background 0.2s ease-in-out";
                d.style["-ms-transition"] = "background 0.2s ease-in-out";
                d.style["-o-transition"] = "background 0.2s ease-in-out";
                d.style.transition = "background 0.2s ease-in-out";
                g.style["-webkit-transition"] = "-webkit-transform 0.2s ease-in-out";
                g.style["-moz-transition"] = "-moz-transform 0.2s ease-in-out";
                g.style["-ms-transition"] = "-ms-transform 0.2s ease-in-out";
                g.style["-o-transition"] = "-o-transform 0.2s ease-in-out";
                g.style.transition = "transform 0.2s ease-in-out"
            } else {
                d.style["-webkit-transition"] = "opacity 0.2s ease-in-out";
                d.style["-moz-transition"] = "opacity 0.2s ease-in-out";
                d.style["-ms-transition"] = "opacity 0.2s ease-in-out";
                d.style["-o-transition"] = "opacity 0.2s ease-in-out";
                d.style.transition = "opacity 0.2s ease-in-out"
            }
            setTimeout(function () {
                if (s === "ios") {
                    d.style.background = "rgba(0,0,0, 0.8)";
                    setTimeout(function () {
                        g.style["-webkit-transform"] = "translate3d(0,0,0)";
                        g.style["-moz-transform"] = "translate3d(0,0,0)";
                        g.style["-ms-transform"] = "translate3d(0,0,0)";
                        g.style["-o-transform"] = "translate3d(0,0,0)";
                        g.style.transform = "translate3d(0,0,0)"
                    }, 50)
                } else {
                    d.style.opacity = "1"
                }
            }, 10)
        }, 0)
    }

    function v() {
        if (w) {
            w(false)
        }
    }

    function E() {
        return !!w
    }

    function u() {
        if (!I) {
            return
        }
        if (!I.length) {
            I = null;
            return
        }
        var b = I.shift();
        b.push(true);
        A.apply(D, b)
    }

    function G(c, b) {
        switch (typeof c) {
        case "string":
            c = {
                text: c
            };
            break;
        case "object":
            break;
        default:
            throw TypeError("dialog options must be an object, got " + c)
        }
        switch (typeof c.title) {
        case "string":
            break;
        case "undefined":
            c.title = "";
            break;
        default:
            throw TypeError("dialog title must a string if defined, got " + c.title)
        }
        if (typeof c.text !== "string") {
            throw TypeError("dialog text must a string, got " + c.text)
        }
        switch (typeof c.success) {
        case "string":
            break;
        case "undefined":
            c.success = "Ok";
            break;
        default:
            throw TypeError("success button must a string if defined, got " + c.success)
        }
        switch (typeof c.cancel) {
        case "string":
            break;
        case "undefined":
            c.cancel = "";
            break;
        default:
            throw TypeError("cancel button must a string if defined, got " + c.cancel)
        }
        switch (typeof b) {
        case "undefined":
            b = function () {};
            break;
        case "function":
            break;
        default:
            throw TypeError("callback must be a function if defined, got " + b)
        }
        return A(c, b)
    }
    G.close = function () {
        v()
    };
    G.status = function () {
        return E()
    };
    return G
}(window, document, window.Clickable);
var iScroll = function (u, f) {
    function C(b) {
        if ("" === v) {
            return b
        }
        b = b.charAt(0).toUpperCase() + b.substr(1);
        return v + b
    }
    var t = Math,
        s = f.createElement("div").style,
        v;
    a: {
        for (var z = ["t", "webkitT", "MozT", "msT", "OT"], h, j = 0, x = z.length; j < x; j++) {
            if (h = z[j] + "ransform", h in s) {
                v = z[j].substr(0, z[j].length - 1);
                break a
            }
        }
        v = !1
    }
    var y = v ? "-" + v.toLowerCase() + "-" : "",
        B = C("transform"),
        D = C("transitionProperty"),
        K = C("transitionDuration"),
        G = C("transformOrigin"),
        I = C("transitionTimingFunction"),
        A = C("transitionDelay"),
        E = /android/gi.test(navigator.appVersion),
        l = /iphone|ipad/gi.test(navigator.appVersion),
        z = /hp-tablet/gi.test(navigator.appVersion),
        m = C("perspective") in s,
        w = "ontouchstart" in u && !z,
        o = !! v,
        J = C("transition") in s,
        F = "onorientationchange" in u ? "orientationchange" : "resize",
        M = w ? "touchstart" : "mousedown",
        n = w ? "touchmove" : "mousemove",
        p = w ? "touchend" : "mouseup",
        q = w ? "touchcancel" : "mouseup",
        N = "Moz" == v ? "DOMMouseScroll" : "mousewheel",
        O;
    O = !1 === v ? !1 : {
        "": "transitionend",
        webkit: "webkitTransitionEnd",
        Moz: "transitionend",
        O: "oTransitionEnd",
        ms: "MSTransitionEnd"
    }[v];
    var L = u.requestAnimationFrame || u.webkitRequestAnimationFrame || u.mozRequestAnimationFrame || u.oRequestAnimationFrame || u.msRequestAnimationFrame || function (b) {
            return setTimeout(b, 1)
        }, r = u.cancelRequestAnimationFrame || u.webkitCancelAnimationFrame || u.webkitCancelRequestAnimationFrame || u.mozCancelRequestAnimationFrame || u.oCancelRequestAnimationFrame || u.msCancelRequestAnimationFrame || clearTimeout,
        H = m ? " translateZ(0)" : "",
        z = function (e, d) {
            var b = this,
                c;
            b.wrapper = "object" == typeof e ? e : f.getElementById(e);
            b.wrapper.style.overflow = "hidden";
            b.scroller = b.wrapper.children[0];
            b.options = {
                hScroll: !0,
                vScroll: !0,
                x: 0,
                y: 0,
                bounce: !0,
                bounceLock: !1,
                momentum: !0,
                lockDirection: !0,
                useTransform: !0,
                useTransition: !1,
                topOffset: 0,
                checkDOMChanges: !1,
                handleClick: !0,
                hScrollbar: !0,
                vScrollbar: !0,
                fixedScrollbar: E,
                hideScrollbar: l,
                fadeScrollbar: l && m,
                scrollbarClass: "",
                zoom: !1,
                zoomMin: 1,
                zoomMax: 4,
                doubleTapZoom: 2,
                wheelAction: "scroll",
                snap: !1,
                snapThreshold: 1,
                onRefresh: null,
                onBeforeScrollStart: function (g) {
                    g.preventDefault()
                },
                onScrollStart: null,
                onBeforeScrollMove: null,
                onScrollMove: null,
                onBeforeScrollEnd: null,
                onScrollEnd: null,
                onTouchEnd: null,
                onDestroy: null,
                onZoomStart: null,
                onZoom: null,
                onZoomEnd: null
            };
            for (c in d) {
                b.options[c] = d[c]
            }
            b.x = b.options.x;
            b.y = b.options.y;
            b.options.useTransform = o && b.options.useTransform;
            b.options.hScrollbar = b.options.hScroll && b.options.hScrollbar;
            b.options.vScrollbar = b.options.vScroll && b.options.vScrollbar;
            b.options.zoom = b.options.useTransform && b.options.zoom;
            b.options.useTransition = J && b.options.useTransition;
            b.options.zoom && E && (H = "");
            b.scroller.style[D] = b.options.useTransform ? y + "transform" : "top left";
            b.scroller.style[K] = "0";
            b.scroller.style[G] = "0 0";
            b.options.useTransition && (b.scroller.style[I] = "cubic-bezier(0.33,0.66,0.66,1)");
            b.options.useTransform ? b.scroller.style[B] = "translate(" + b.x + "px," + b.y + "px)" + H : b.scroller.style.cssText += ";position:absolute;top:" + b.y + "px;left:" + b.x + "px";
            b.options.useTransition && (b.options.fixedScrollbar = !0);
            b.refresh();
            b._bind(F, u);
            b._bind(M);
            w || (b._bind("mouseout", b.wrapper), "none" != b.options.wheelAction && b._bind(N));
            b.options.checkDOMChanges && (b.checkDOMTime = setInterval(function () {
                b._checkDOMChanges()
            }, 500))
        };
    z.prototype = {
        enabled: !0,
        x: 0,
        y: 0,
        steps: [],
        scale: 1,
        currPageX: 0,
        currPageY: 0,
        pagesX: [],
        pagesY: [],
        aniTime: null,
        wheelZoomCount: 0,
        handleEvent: function (b) {
            switch (b.type) {
            case M:
                if (!w && 0 !== b.button) {
                    break
                }
                this._start(b);
                break;
            case n:
                this._move(b);
                break;
            case p:
            case q:
                this._end(b);
                break;
            case F:
                this._resize();
                break;
            case N:
                this._wheel(b);
                break;
            case "mouseout":
                this._mouseout(b);
                break;
            case O:
                this._transitionEnd(b)
            }
        },
        _checkDOMChanges: function () {
            !this.moved && (!this.zoomed && !(this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) && this.refresh()
        },
        _scrollbar: function (c) {
            var b;
            this[c + "Scrollbar"] ? (this[c + "ScrollbarWrapper"] || (b = f.createElement("div"), this.options.scrollbarClass ? b.className = this.options.scrollbarClass + c.toUpperCase() : b.style.cssText = "position:absolute;z-index:100;" + ("h" == c ? "height:7px;bottom:1px;left:2px;right:" + (this.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (this.hScrollbar ? "7" : "2") + "px;top:2px;right:1px"), b.style.cssText += ";pointer-events:none;" + y + "transition-property:opacity;" + y + "transition-duration:" + (this.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (this.options.hideScrollbar ? "0" : "1"), this.wrapper.appendChild(b), this[c + "ScrollbarWrapper"] = b, b = f.createElement("div"), this.options.scrollbarClass || (b.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + y + "background-clip:padding-box;" + y + "box-sizing:border-box;" + ("h" == c ? "height:100%" : "width:100%") + ";" + y + "border-radius:3px;border-radius:3px"), b.style.cssText += ";pointer-events:none;" + y + "transition-property:" + y + "transform;" + y + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + y + "transition-duration:0;" + y + "transform: translate(0,0)" + H, this.options.useTransition && (b.style.cssText += ";" + y + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), this[c + "ScrollbarWrapper"].appendChild(b), this[c + "ScrollbarIndicator"] = b), "h" == c ? (this.hScrollbarSize = this.hScrollbarWrapper.clientWidth, this.hScrollbarIndicatorSize = t.max(t.round(this.hScrollbarSize * this.hScrollbarSize / this.scrollerW), 8), this.hScrollbarIndicator.style.width = this.hScrollbarIndicatorSize + "px", this.hScrollbarMaxScroll = this.hScrollbarSize - this.hScrollbarIndicatorSize, this.hScrollbarProp = this.hScrollbarMaxScroll / this.maxScrollX) : (this.vScrollbarSize = this.vScrollbarWrapper.clientHeight, this.vScrollbarIndicatorSize = t.max(t.round(this.vScrollbarSize * this.vScrollbarSize / this.scrollerH), 8), this.vScrollbarIndicator.style.height = this.vScrollbarIndicatorSize + "px", this.vScrollbarMaxScroll = this.vScrollbarSize - this.vScrollbarIndicatorSize, this.vScrollbarProp = this.vScrollbarMaxScroll / this.maxScrollY), this._scrollbarPos(c, !0)) : this[c + "ScrollbarWrapper"] && (o && (this[c + "ScrollbarIndicator"].style[B] = ""), this[c + "ScrollbarWrapper"].parentNode.removeChild(this[c + "ScrollbarWrapper"]), this[c + "ScrollbarWrapper"] = null, this[c + "ScrollbarIndicator"] = null)
        },
        _resize: function () {
            var b = this;
            setTimeout(function () {
                b.refresh()
            }, E ? 200 : 0)
        },
        _pos: function (c, b) {
            this.zoomed || (c = this.hScroll ? c : 0, b = this.vScroll ? b : 0, this.options.useTransform ? this.scroller.style[B] = "translate(" + c + "px," + b + "px) scale(" + this.scale + ")" + H : (c = t.round(c), b = t.round(b), this.scroller.style.left = c + "px", this.scroller.style.top = b + "px"), this.x = c, this.y = b, this._scrollbarPos("h"), this._scrollbarPos("v"))
        },
        _scrollbarPos: function (d, c) {
            var b = "h" == d ? this.x : this.y;
            this[d + "Scrollbar"] && (b *= this[d + "ScrollbarProp"], 0 > b ? (this.options.fixedScrollbar || (b = this[d + "ScrollbarIndicatorSize"] + t.round(3 * b), 8 > b && (b = 8), this[d + "ScrollbarIndicator"].style["h" == d ? "width" : "height"] = b + "px"), b = 0) : b > this[d + "ScrollbarMaxScroll"] && (this.options.fixedScrollbar ? b = this[d + "ScrollbarMaxScroll"] : (b = this[d + "ScrollbarIndicatorSize"] - t.round(3 * (b - this[d + "ScrollbarMaxScroll"])), 8 > b && (b = 8), this[d + "ScrollbarIndicator"].style["h" == d ? "width" : "height"] = b + "px", b = this[d + "ScrollbarMaxScroll"] + (this[d + "ScrollbarIndicatorSize"] - b))), this[d + "ScrollbarWrapper"].style[A] = "0", this[d + "ScrollbarWrapper"].style.opacity = c && this.options.hideScrollbar ? "0" : "1", this[d + "ScrollbarIndicator"].style[B] = "translate(" + ("h" == d ? b + "px,0)" : "0," + b + "px)") + H)
        },
        _start: function (e) {
            var d = w ? e.touches[0] : e,
                b, c;
            if (this.enabled) {
                this.options.onBeforeScrollStart && this.options.onBeforeScrollStart.call(this, e);
                (this.options.useTransition || this.options.zoom) && this._transitionTime(0);
                this.zoomed = this.animating = this.moved = !1;
                this.dirY = this.dirX = this.absDistY = this.absDistX = this.distY = this.distX = 0;
                this.options.zoom && (w && 1 < e.touches.length) && (c = t.abs(e.touches[0].pageX - e.touches[1].pageX), b = t.abs(e.touches[0].pageY - e.touches[1].pageY), this.touchesDistStart = t.sqrt(c * c + b * b), this.originX = t.abs(e.touches[0].pageX + e.touches[1].pageX - 2 * this.wrapperOffsetLeft) / 2 - this.x, this.originY = t.abs(e.touches[0].pageY + e.touches[1].pageY - 2 * this.wrapperOffsetTop) / 2 - this.y, this.options.onZoomStart && this.options.onZoomStart.call(this, e));
                if (this.options.momentum && (this.options.useTransform ? (b = getComputedStyle(this.scroller, null)[B].replace(/[^0-9\-.,]/g, "").split(","), c = 1 * b[4], b = 1 * b[5]) : (c = 1 * getComputedStyle(this.scroller, null).left.replace(/[^0-9-]/g, ""), b = 1 * getComputedStyle(this.scroller, null).top.replace(/[^0-9-]/g, "")), c != this.x || b != this.y)) {
                    this.options.useTransition ? this._unbind(O) : r(this.aniTime), this.steps = [], this._pos(c, b)
                }
                this.absStartX = this.x;
                this.absStartY = this.y;
                this.startX = this.x;
                this.startY = this.y;
                this.pointX = d.pageX;
                this.pointY = d.pageY;
                this.startTime = e.timeStamp || Date.now();
                this.options.onScrollStart && this.options.onScrollStart.call(this, e);
                this._bind(n);
                this._bind(p);
                this._bind(q)
            }
        },
        _move: function (g) {
            var e = w ? g.touches[0] : g,
                i = e.pageX - this.pointX,
                k = e.pageY - this.pointY,
                b = this.x + i,
                c = this.y + k,
                d = g.timeStamp || Date.now();
            this.options.onBeforeScrollMove && this.options.onBeforeScrollMove.call(this, g);
            if (this.options.zoom && w && 1 < g.touches.length) {
                b = t.abs(g.touches[0].pageX - g.touches[1].pageX), c = t.abs(g.touches[0].pageY - g.touches[1].pageY), this.touchesDist = t.sqrt(b * b + c * c), this.zoomed = !0, e = 1 / this.touchesDistStart * this.touchesDist * this.scale, e < this.options.zoomMin ? e = 0.5 * this.options.zoomMin * Math.pow(2, e / this.options.zoomMin) : e > this.options.zoomMax && (e = 2 * this.options.zoomMax * Math.pow(0.5, this.options.zoomMax / e)), this.lastScale = e / this.scale, b = this.originX - this.originX * this.lastScale + this.x, c = this.originY - this.originY * this.lastScale + this.y, this.scroller.style[B] = "translate(" + b + "px," + c + "px) scale(" + e + ")" + H, this.options.onZoom && this.options.onZoom.call(this, g)
            } else {
                this.pointX = e.pageX;
                this.pointY = e.pageY;
                if (0 < b || b < this.maxScrollX) {
                    b = this.options.bounce ? this.x + i / 2 : 0 <= b || 0 <= this.maxScrollX ? 0 : this.maxScrollX
                }
                if (c > this.minScrollY || c < this.maxScrollY) {
                    c = this.options.bounce ? this.y + k / 2 : c >= this.minScrollY || 0 <= this.maxScrollY ? this.minScrollY : this.maxScrollY
                }
                this.distX += i;
                this.distY += k;
                this.absDistX = t.abs(this.distX);
                this.absDistY = t.abs(this.distY);
                6 > this.absDistX && 6 > this.absDistY || (this.options.lockDirection && (this.absDistX > this.absDistY + 5 ? (c = this.y, k = 0) : this.absDistY > this.absDistX + 5 && (b = this.x, i = 0)), this.moved = !0, this._pos(b, c), this.dirX = 0 < i ? -1 : 0 > i ? 1 : 0, this.dirY = 0 < k ? -1 : 0 > k ? 1 : 0, 300 < d - this.startTime && (this.startTime = d, this.startX = this.x, this.startY = this.y), this.options.onScrollMove && this.options.onScrollMove.call(this, g))
            }
        },
        _end: function (R) {
            if (!(w && 0 !== R.touches.length)) {
                var Q = this,
                    b = w ? R.changedTouches[0] : R,
                    c, d, e = {
                        dist: 0,
                        time: 0
                    }, i = {
                        dist: 0,
                        time: 0
                    }, g = (R.timeStamp || Date.now()) - Q.startTime,
                    P = Q.x,
                    k = Q.y;
                Q._unbind(n);
                Q._unbind(p);
                Q._unbind(q);
                Q.options.onBeforeScrollEnd && Q.options.onBeforeScrollEnd.call(Q, R);
                if (Q.zoomed) {
                    P = Q.scale * Q.lastScale, P = Math.max(Q.options.zoomMin, P), P = Math.min(Q.options.zoomMax, P), Q.lastScale = P / Q.scale, Q.scale = P, Q.x = Q.originX - Q.originX * Q.lastScale + Q.x, Q.y = Q.originY - Q.originY * Q.lastScale + Q.y, Q.scroller.style[K] = "200ms", Q.scroller.style[B] = "translate(" + Q.x + "px," + Q.y + "px) scale(" + Q.scale + ")" + H, Q.zoomed = !1, Q.refresh(), Q.options.onZoomEnd && Q.options.onZoomEnd.call(Q, R)
                } else {
                    if (Q.moved) {
                        if (300 > g && Q.options.momentum) {
                            e = P ? Q._momentum(P - Q.startX, g, -Q.x, Q.scrollerW - Q.wrapperW + Q.x, Q.options.bounce ? Q.wrapperW : 0) : e;
                            i = k ? Q._momentum(k - Q.startY, g, -Q.y, 0 > Q.maxScrollY ? Q.scrollerH - Q.wrapperH + Q.y - Q.minScrollY : 0, Q.options.bounce ? Q.wrapperH : 0) : i;
                            P = Q.x + e.dist;
                            k = Q.y + i.dist;
                            if (0 < Q.x && 0 < P || Q.x < Q.maxScrollX && P < Q.maxScrollX) {
                                e = {
                                    dist: 0,
                                    time: 0
                                }
                            }
                            if (Q.y > Q.minScrollY && k > Q.minScrollY || Q.y < Q.maxScrollY && k < Q.maxScrollY) {
                                i = {
                                    dist: 0,
                                    time: 0
                                }
                            }
                        }
                        e.dist || i.dist ? (e = t.max(t.max(e.time, i.time), 10), Q.options.snap && (i = P - Q.absStartX, g = k - Q.absStartY, t.abs(i) < Q.options.snapThreshold && t.abs(g) < Q.options.snapThreshold ? Q.scrollTo(Q.absStartX, Q.absStartY, 200) : (i = Q._snap(P, k), P = i.x, k = i.y, e = t.max(i.time, e))), Q.scrollTo(t.round(P), t.round(k), e)) : Q.options.snap ? (i = P - Q.absStartX, g = k - Q.absStartY, t.abs(i) < Q.options.snapThreshold && t.abs(g) < Q.options.snapThreshold ? Q.scrollTo(Q.absStartX, Q.absStartY, 200) : (i = Q._snap(Q.x, Q.y), (i.x != Q.x || i.y != Q.y) && Q.scrollTo(i.x, i.y, i.time))) : Q._resetPos(200)
                    } else {
                        w && (Q.doubleTapTimer && Q.options.zoom ? (clearTimeout(Q.doubleTapTimer), Q.doubleTapTimer = null, Q.options.onZoomStart && Q.options.onZoomStart.call(Q, R), Q.zoom(Q.pointX, Q.pointY, 1 == Q.scale ? Q.options.doubleTapZoom : 1), Q.options.onZoomEnd && setTimeout(function () {
                            Q.options.onZoomEnd.call(Q, R)
                        }, 200)) : this.options.handleClick && (Q.doubleTapTimer = setTimeout(function () {
                            Q.doubleTapTimer = null;
                            for (c = b.target; 1 != c.nodeType;) {
                                c = c.parentNode
                            }
                            "SELECT" != c.tagName && ("INPUT" != c.tagName && "TEXTAREA" != c.tagName) && (d = f.createEvent("MouseEvents"), d.initMouseEvent("click", !0, !0, R.view, 1, b.screenX, b.screenY, b.clientX, b.clientY, R.ctrlKey, R.altKey, R.shiftKey, R.metaKey, 0, null), d._fake = !0, c.dispatchEvent(d))
                        }, Q.options.zoom ? 250 : 0))), Q._resetPos(200)
                    }
                    Q.options.onTouchEnd && Q.options.onTouchEnd.call(Q, R)
                }
            }
        },
        _resetPos: function (d) {
            var c = 0 <= this.x ? 0 : this.x < this.maxScrollX ? this.maxScrollX : this.x,
                b = this.y >= this.minScrollY || 0 < this.maxScrollY ? this.minScrollY : this.y < this.maxScrollY ? this.maxScrollY : this.y;
            if (c == this.x && b == this.y) {
                if (this.moved && (this.moved = !1, this.options.onScrollEnd && this.options.onScrollEnd.call(this)), this.hScrollbar && this.options.hideScrollbar && ("webkit" == v && (this.hScrollbarWrapper.style[A] = "300ms"), this.hScrollbarWrapper.style.opacity = "0"), this.vScrollbar && this.options.hideScrollbar) {
                    "webkit" == v && (this.vScrollbarWrapper.style[A] = "300ms"), this.vScrollbarWrapper.style.opacity = "0"
                }
            } else {
                this.scrollTo(c, b, d || 0)
            }
        },
        _wheel: function (e) {
            var d = this,
                b, c;
            if ("wheelDeltaX" in e) {
                b = e.wheelDeltaX / 12, c = e.wheelDeltaY / 12
            } else {
                if ("wheelDelta" in e) {
                    b = c = e.wheelDelta / 12
                } else {
                    if ("detail" in e) {
                        b = c = 3 * -e.detail
                    } else {
                        return
                    }
                }
            } if ("zoom" == d.options.wheelAction) {
                if (c = d.scale * Math.pow(2, 1 / 3 * (c ? c / Math.abs(c) : 0)), c < d.options.zoomMin && (c = d.options.zoomMin), c > d.options.zoomMax && (c = d.options.zoomMax), c != d.scale) {
                    !d.wheelZoomCount && d.options.onZoomStart && d.options.onZoomStart.call(d, e), d.wheelZoomCount++, d.zoom(e.pageX, e.pageY, c, 400), setTimeout(function () {
                        d.wheelZoomCount--;
                        !d.wheelZoomCount && d.options.onZoomEnd && d.options.onZoomEnd.call(d, e)
                    }, 400)
                }
            } else {
                b = d.x + b, c = d.y + c, 0 < b ? b = 0 : b < d.maxScrollX && (b = d.maxScrollX), c > d.minScrollY ? c = d.minScrollY : c < d.maxScrollY && (c = d.maxScrollY), 0 > d.maxScrollY && d.scrollTo(b, c, 0)
            }
        },
        _mouseout: function (c) {
            var b = c.relatedTarget;
            if (b) {
                for (; b = b.parentNode;) {
                    if (b == this.wrapper) {
                        return
                    }
                }
            }
            this._end(c)
        },
        _transitionEnd: function (b) {
            b.target == this.scroller && (this._unbind(O), this._startAni())
        },
        _startAni: function () {
            var g = this,
                e = g.x,
                i = g.y,
                k = Date.now(),
                b, c, d;
            g.animating || (g.steps.length ? (b = g.steps.shift(), b.x == e && b.y == i && (b.time = 0), g.animating = !0, g.moved = !0, g.options.useTransition) ? (g._transitionTime(b.time), g._pos(b.x, b.y), g.animating = !1, b.time ? g._bind(O) : g._resetPos(0)) : (d = function () {
                var P = Date.now(),
                    Q;
                if (P >= k + b.time) {
                    g._pos(b.x, b.y);
                    g.animating = false;
                    g.options.onAnimationEnd && g.options.onAnimationEnd.call(g);
                    g._startAni()
                } else {
                    P = (P - k) / b.time - 1;
                    c = t.sqrt(1 - P * P);
                    P = (b.x - e) * c + e;
                    Q = (b.y - i) * c + i;
                    g._pos(P, Q);
                    if (g.animating) {
                        g.aniTime = L(d)
                    }
                }
            }, d()) : g._resetPos(400))
        },
        _transitionTime: function (b) {
            b += "ms";
            this.scroller.style[K] = b;
            this.hScrollbar && (this.hScrollbarIndicator.style[K] = b);
            this.vScrollbar && (this.vScrollbarIndicator.style[K] = b)
        },
        _momentum: function (g, e, i, b, c) {
            var e = t.abs(g) / e,
                d = e * e / 0.0012;
            0 < g && d > i ? (i += c / (6 / (0.0006 * (d / e))), e = e * i / d, d = i) : 0 > g && d > b && (b += c / (6 / (0.0006 * (d / e))), e = e * b / d, d = b);
            return {
                dist: d * (0 > g ? -1 : 1),
                time: t.round(e / 0.0006)
            }
        },
        _offset: function (d) {
            for (var c = -d.offsetLeft, b = -d.offsetTop; d = d.offsetParent;) {
                c -= d.offsetLeft, b -= d.offsetTop
            }
            d != this.wrapper && (c *= this.scale, b *= this.scale);
            return {
                left: c,
                top: b
            }
        },
        _snap: function (g, e) {
            var b, c, d;
            d = this.pagesX.length - 1;
            b = 0;
            for (c = this.pagesX.length; b < c; b++) {
                if (g >= this.pagesX[b]) {
                    d = b;
                    break
                }
            }
            d == this.currPageX && (0 < d && 0 > this.dirX) && d--;
            g = this.pagesX[d];
            c = (c = t.abs(g - this.pagesX[this.currPageX])) ? 500 * (t.abs(this.x - g) / c) : 0;
            this.currPageX = d;
            d = this.pagesY.length - 1;
            for (b = 0; b < d; b++) {
                if (e >= this.pagesY[b]) {
                    d = b;
                    break
                }
            }
            d == this.currPageY && (0 < d && 0 > this.dirY) && d--;
            e = this.pagesY[d];
            b = (b = t.abs(e - this.pagesY[this.currPageY])) ? 500 * (t.abs(this.y - e) / b) : 0;
            this.currPageY = d;
            d = t.round(t.max(c, b)) || 200;
            return {
                x: g,
                y: e,
                time: d
            }
        },
        _bind: function (d, c, b) {
            (c || this.scroller).addEventListener(d, this, !! b)
        },
        _unbind: function (d, c, b) {
            (c || this.scroller).removeEventListener(d, this, !! b)
        },
        destroy: function () {
            this.scroller.style[B] = "";
            this.vScrollbar = this.hScrollbar = !1;
            this._scrollbar("h");
            this._scrollbar("v");
            this._unbind(F, u);
            this._unbind(M);
            this._unbind(n);
            this._unbind(p);
            this._unbind(q);
            this.options.hasTouch || (this._unbind("mouseout", this.wrapper), this._unbind(N));
            this.options.useTransition && this._unbind(O);
            this.options.checkDOMChanges && clearInterval(this.checkDOMTime);
            this.options.onDestroy && this.options.onDestroy.call(this)
        },
        refresh: function () {
            var e, d, b, c = 0;
            d = 0;
            this.scale < this.options.zoomMin && (this.scale = this.options.zoomMin);
            this.wrapperW = this.wrapper.clientWidth || 1;
            this.wrapperH = this.wrapper.clientHeight || 1;
            this.minScrollY = -this.options.topOffset || 0;
            this.scrollerW = t.round(this.scroller.offsetWidth * this.scale);
            this.scrollerH = t.round((this.scroller.offsetHeight + this.minScrollY) * this.scale);
            this.maxScrollX = this.wrapperW - this.scrollerW;
            this.maxScrollY = this.wrapperH - this.scrollerH + this.minScrollY;
            this.dirY = this.dirX = 0;
            this.options.onRefresh && this.options.onRefresh.call(this);
            this.hScroll = this.options.hScroll && 0 > this.maxScrollX;
            this.vScroll = this.options.vScroll && (!this.options.bounceLock && !this.hScroll || this.scrollerH > this.wrapperH);
            this.hScrollbar = this.hScroll && this.options.hScrollbar;
            this.vScrollbar = this.vScroll && this.options.vScrollbar && this.scrollerH > this.wrapperH;
            e = this._offset(this.wrapper);
            this.wrapperOffsetLeft = -e.left;
            this.wrapperOffsetTop = -e.top;
            if ("string" == typeof this.options.snap) {
                this.pagesX = [];
                this.pagesY = [];
                b = this.scroller.querySelectorAll(this.options.snap);
                e = 0;
                for (d = b.length; e < d; e++) {
                    c = this._offset(b[e]), c.left += this.wrapperOffsetLeft, c.top += this.wrapperOffsetTop, this.pagesX[e] = c.left < this.maxScrollX ? this.maxScrollX : c.left * this.scale, this.pagesY[e] = c.top < this.maxScrollY ? this.maxScrollY : c.top * this.scale
                }
            } else {
                if (this.options.snap) {
                    for (this.pagesX = []; c >= this.maxScrollX;) {
                        this.pagesX[d] = c, c -= this.wrapperW, d++
                    }
                    this.maxScrollX % this.wrapperW && (this.pagesX[this.pagesX.length] = this.maxScrollX - this.pagesX[this.pagesX.length - 1] + this.pagesX[this.pagesX.length - 1]);
                    d = c = 0;
                    for (this.pagesY = []; c >= this.maxScrollY;) {
                        this.pagesY[d] = c, c -= this.wrapperH, d++
                    }
                    this.maxScrollY % this.wrapperH && (this.pagesY[this.pagesY.length] = this.maxScrollY - this.pagesY[this.pagesY.length - 1] + this.pagesY[this.pagesY.length - 1])
                }
            }
            this._scrollbar("h");
            this._scrollbar("v");
            this.zoomed || (this.scroller.style[K] = "0", this._resetPos(200))
        },
        scrollTo: function (g, e, b, c) {
            var d = g;
            this.stop();
            d.length || (d = [{
                x: g,
                y: e,
                time: b,
                relative: c
            }]);
            g = 0;
            for (e = d.length; g < e; g++) {
                d[g].relative && (d[g].x = this.x - d[g].x, d[g].y = this.y - d[g].y), this.steps.push({
                    x: d[g].x,
                    y: d[g].y,
                    time: d[g].time || 0
                })
            }
            this._startAni()
        },
        scrollToElement: function (d, c) {
            var b;
            if (d = d.nodeType ? d : this.scroller.querySelector(d)) {
                b = this._offset(d), b.left += this.wrapperOffsetLeft, b.top += this.wrapperOffsetTop, b.left = 0 < b.left ? 0 : b.left < this.maxScrollX ? this.maxScrollX : b.left, b.top = b.top > this.minScrollY ? this.minScrollY : b.top < this.maxScrollY ? this.maxScrollY : b.top, c = void 0 === c ? t.max(2 * t.abs(b.left), 2 * t.abs(b.top)) : c, this.scrollTo(b.left, b.top, c)
            }
        },
        scrollToPage: function (d, c, b) {
            b = void 0 === b ? 400 : b;
            this.options.onScrollStart && this.options.onScrollStart.call(this);
            if (this.options.snap) {
                d = "next" == d ? this.currPageX + 1 : "prev" == d ? this.currPageX - 1 : d, c = "next" == c ? this.currPageY + 1 : "prev" == c ? this.currPageY - 1 : c, d = 0 > d ? 0 : d > this.pagesX.length - 1 ? this.pagesX.length - 1 : d, c = 0 > c ? 0 : c > this.pagesY.length - 1 ? this.pagesY.length - 1 : c, this.currPageX = d, this.currPageY = c, d = this.pagesX[d], c = this.pagesY[c]
            } else {
                if (d *= -this.wrapperW, c *= -this.wrapperH, d < this.maxScrollX && (d = this.maxScrollX), c < this.maxScrollY) {
                    c = this.maxScrollY
                }
            }
            this.scrollTo(d, c, b)
        },
        disable: function () {
            this.stop();
            this._resetPos(0);
            this.enabled = !1;
            this._unbind(n);
            this._unbind(p);
            this._unbind(q)
        },
        enable: function () {
            this.enabled = !0
        },
        stop: function () {
            this.options.useTransition ? this._unbind(O) : r(this.aniTime);
            this.steps = [];
            this.animating = this.moved = !1
        },
        zoom: function (g, e, b, c) {
            var d = b / this.scale;
            this.options.useTransform && (this.zoomed = !0, c = void 0 === c ? 200 : c, g = g - this.wrapperOffsetLeft - this.x, e = e - this.wrapperOffsetTop - this.y, this.x = g - g * d + this.x, this.y = e - e * d + this.y, this.scale = b, this.refresh(), this.x = 0 < this.x ? 0 : this.x < this.maxScrollX ? this.maxScrollX : this.x, this.y = this.y > this.minScrollY ? this.minScrollY : this.y < this.maxScrollY ? this.maxScrollY : this.y, this.scroller.style[K] = c + "ms", this.scroller.style[B] = "translate(" + this.x + "px," + this.y + "px) scale(" + b + ")" + H, this.zoomed = !1)
        },
        isReady: function () {
            return !this.moved && !this.zoomed && !this.animating
        }
    };
    s = null;
    return z
}(window, document);
var Scrollable = function (j, k) {
    function i() {
        i._enableScrolling.apply(this, arguments)
    }
    i.node = function () {
        return i._getScrollableNode.apply(this, arguments)
    };
    if (j && j.fn) {
        j.extend(j.fn, {
            scrollable: function (b) {
                this.forEach(function (c) {
                    i._enableScrolling(c, b)
                });
                return this
            },
            scrollableNode: function () {
                return $(this.map(function () {
                    return i._getScrollableNode(this)
                }))
            }
        });
        var n = j.fn.scrollTop,
            l = j.fn.scrollLeft;
        j.fn.scrollTop = function (b) {
            if (typeof b === "undefined") {
                var d = this[0],
                    c = i._isDOMNode(d);
                if (c && d._scrollTop) {
                    return d._scrollTop()
                } else {
                    if (n) {
                        return n.apply(this, arguments)
                    } else {
                        if (c) {
                            return d.scrollTop
                        } else {
                            return null
                        }
                    }
                }
            }
            this.forEach(function (f) {
                var e = i._isDOMNode(f);
                if (e && f._scrollTop) {
                    f._scrollTop(b)
                } else {
                    if (n) {
                        n.call(j(f), b)
                    } else {
                        if (e) {
                            f.scrollTop = b
                        }
                    }
                }
            });
            return this
        };
        j.fn.scrollLeft = function (b) {
            if (typeof b === "undefined") {
                var d = this[0],
                    c = i._isDOMNode(d);
                if (c && d._scrollLeft) {
                    return d._scrollLeft()
                } else {
                    if (n) {
                        return l.apply(this, arguments)
                    } else {
                        if (c) {
                            return d.scrollLeft
                        } else {
                            return null
                        }
                    }
                }
            }
            this.forEach(function (f) {
                var e = i._isDOMNode(f);
                if (e && f._scrollLeft) {
                    f._scrollLeft(b)
                } else {
                    if (l) {
                        l.call(j(f), b)
                    } else {
                        if (e) {
                            f.scrollLeft = b
                        }
                    }
                }
            });
            return this
        }
    }
    if (k && k.fn) {
        k.fn.scrollable = function (b) {
            this.each(function () {
                i._enableScrolling(this, b)
            });
            return this
        };
        k.fn.scrollableNode = function () {
            return $(this.map(function () {
                return i._getScrollableNode(this)
            }))
        };
        var o = k.fn.scrollTop,
            m = k.fn.scrollLeft;
        k.fn.scrollTop = function (b) {
            if (typeof b === "undefined") {
                var c = this[0];
                if (i._isDOMNode(c) && c._scrollTop) {
                    return c._scrollTop()
                } else {
                    return o.apply(this, arguments)
                }
            }
            this.each(function () {
                if (i._isDOMNode(this) && this._scrollTop) {
                    this._scrollTop(b)
                } else {
                    o.call(k(this), b)
                }
            });
            return this
        };
        k.fn.scrollLeft = function (b) {
            if (typeof b === "undefined") {
                var c = this[0];
                if (i._isDOMNode(c) && c._scrollLeft) {
                    return c._scrollLeft()
                } else {
                    return m.apply(this, arguments)
                }
            }
            this.each(function () {
                if (i._isDOMNode(this) && this._scrollLeft) {
                    this._scrollLeft(b)
                } else {
                    m.call(k(this), b)
                }
            });
            return this
        }
    }
    return i
}(window.Zepto, window.jQuery);
Scrollable._os = function (i, k) {
    var l, h, m;
    if (m = /\bCPU.*OS (\d+(_\d+)?)/i.exec(i)) {
        l = "ios";
        h = m[1].replace("_", ".")
    } else {
        if (m = /\bAndroid (\d+(\.\d+)?)/.exec(i)) {
            l = "android";
            h = m[1]
        }
    }
    var j = {
        name: l,
        version: h && k(h),
        mobile: !! l
    };
    j[l] = true;
    return j
}(navigator.userAgent, parseFloat);
Scrollable._isDOMNode = function (d, e) {
    return function (b) {
        if (!b) {
            return false
        }
        try {
            return (b instanceof d) || (b instanceof e)
        } catch (c) {}
        if (typeof b !== "object") {
            return false
        }
        if (typeof b.nodeType !== "number") {
            return false
        }
        if (typeof b.nodeName !== "string") {
            return false
        }
        return true
    }
}(Node, HTMLElement);
Scrollable._findInArray = function (c) {
    return function (j, h, b) {
        if (c) {
            return c.call(j, h, b)
        }
        for (var i = b || 0, k = j.length; i < k; i++) {
            if ((i in j) && (j[i] === h)) {
                return i
            }
        }
        return -1
    }
}(Array.prototype.indexOf);
Scrollable._forEachInArray = function (c) {
    return function (j, b, i) {
        if (c) {
            return c.call(j, b, i)
        }
        for (var h = 0, k = j.length; h < k; h++) {
            if (h in j) {
                b.call(i, j[h], h, j)
            }
        }
    }
}(Array.prototype.forEach);
Scrollable._onReady = function (q, p, k) {
    var l = [],
        m = false;
    o(n);
    return function (b) {
        if (m) {
            setTimeout(b, 0)
        } else {
            l.push(b)
        }
    };

    function n() {
        if (m) {
            return
        }
        m = true;
        k(l, function (b) {
            setTimeout(b, 0)
        })
    }

    function j(b) {
        try {
            q.documentElement.doScroll("left")
        } catch (c) {
            setTimeout(function () {
                j(b)
            }, 1);
            return
        }
        b()
    }

    function o(b) {
        if (q.readyState === "complete") {
            setTimeout(b, 0);
            return
        }
        if (q.addEventListener) {
            q.addEventListener("DOMContentLoaded", b, false);
            p.addEventListener("load", b, false)
        } else {
            if (q.attachEvent) {
                q.attachEvent("onreadystatechange", b);
                p.attachEvent("onload", b);
                var d = false;
                try {
                    d = (p.frameElement === null)
                } catch (c) {}
                if (q.documentElement.doScroll && d) {
                    setTimeout(function () {
                        j(b)
                    }, 0)
                }
            }
        }
    }
}(document, window, Scrollable._forEachInArray);
Scrollable._scrollWatcher = function (d) {
    return e;

    function e(t) {
        var s = false,
            x = false,
            q = t.scrollTop;
        t.addEventListener("touchstart", u);
        t.addEventListener("touchmove", y);
        t.addEventListener("touchcancel", v);
        t.addEventListener("touchend", b);
        t.addEventListener("scroll", r);
        c();
        t._resetScrolling = w;
        return;

        function c() {
            t._isScrolling = (x || s)
        }

        function w() {
            x = false;
            s = false;
            c()
        }

        function p(f, g, h) {
            if ((f.touches.length <= g) && ((typeof h === "undefined") || (f.changedTouches.length <= h))) {
                return false
            }
            f.preventDefault();
            w();
            return true
        }

        function u(f) {
            if (p(f, 1)) {
                return
            }
            w()
        }

        function y(f) {
            if (p(f, 1)) {
                return
            }
            s = true;
            q = t.scrollTop;
            c()
        }

        function v(f) {
            if (p(f, 0, 1)) {
                return
            }
            w()
        }

        function b(g) {
            if (p(g, 0, 1)) {
                return
            }
            var f;
            if (s) {
                f = Math.abs(t.scrollTop - q);
                if (f > 5) {
                    x = true
                }
                s = false;
                c()
            }
        }

        function r() {
            if (!s && x) {
                w()
            }
        }
    }
}(Scrollable._os);
Scrollable._getScrollableNode = function (c) {
    return function (b) {
        if (c(b) && b._iScroll) {
            return b.childNodes[0]
        } else {
            return b
        }
    }
}(Scrollable._isDOMNode);
Scrollable._enableScrolling = function (C, t, x, D, E, s, v, u) {
    var y = z();
    return r;

    function z() {
        if ((C.ios && (C.version >= 5)) || (C.android && (C.version >= 4))) {
            return true
        } else {
            return false
        }
    }

    function r(b, c) {
        if (!t(b)) {
            throw b + " is not a DOM element"
        }
        if (b._scrollable) {
            return
        }
        b._scrollable = true;
        var d;
        b._scrollTop = function (e) {
            if (typeof e === "undefined") {
                return d ? Math.max(parseInt(-d.y), 0) : b.scrollTop
            }
            if (!d && (!C.mobile || y)) {
                b.scrollTop = e;
                return
            }
            x(function () {
                d.scrollTo(d.x, Math.min(-e, 0), 1)
            })
        };
        b._scrollLeft = function (e) {
            if (typeof e === "undefined") {
                return d ? Math.max(parseInt(-d.x), 0) : b.scrollLeft
            }
            if (!d && (!C.mobile || y)) {
                b.scrollLeft = e;
                return
            }
            x(function () {
                d.scrollTo(Math.min(-e, 0), d.y, 1)
            })
        };
        b.style.overflow = "scroll";
        if (!c) {
            if (!C.mobile) {
                return
            }
            if (y) {
                b.style["-webkit-overflow-scrolling"] = "touch";
                if (C.ios) {
                    E(b)
                }
                return
            }
        }
        F(b, function (e) {
            d = e
        })
    }

    function F(c, b) {
        c._iScroll = true;
        w(c);
        var d = B(c);
        x(function () {
            var e = new s(c, {
                checkDOMChanges: true,
                useTransform: true,
                useTransition: true,
                hScrollbar: false,
                vScrollbar: false,
                bounce: !! C.ios,
                onScrollMove: d,
                onBeforeScrollEnd: d,
                onScrollEnd: d,
                onBeforeScrollStart: A
            });
            b(e)
        })
    }

    function w(c) {
        var b = u.createElement("div"),
            d = Array.prototype.slice.call(c.childNodes || []);
        D(d, function (e) {
            var f = c.removeChild(e);
            b.appendChild(f)
        });
        c.appendChild(b);
        c.style.position = "relative";
        b.style["min-height"] = "100%";
        b.style["min-width"] = "100%"
    }

    function B(c) {
        var d, b;
        return function () {
            var e = c._scrollTop(),
                f = c._scrollLeft();
            if ((e === d) && (f === b)) {
                return
            }
            d = e;
            b = f;
            G(c)
        }
    }

    function G(b) {
        if (b.dispatchEvent) {
            var c = u.createEvent("MouseEvents");
            c.initMouseEvent("scroll", false, false, v, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            b.dispatchEvent(c)
        }
    }

    function A(b) {
        var c = b.target;
        while (c.nodeType !== 1) {
            c = c.parentNode
        }
        if ((c.tagName !== "SELECT") && (c.tagName !== "INPUT") && (c.tagName !== "TEXTAREA")) {
            b.preventDefault()
        }
    }
}(Scrollable._os, Scrollable._isDOMNode, Scrollable._onReady, Scrollable._forEachInArray, Scrollable._scrollWatcher, iScroll, window, document);
var App = {};
App._utils = function (j, l, c) {
    var k = function (u) {
        var s = /([^&=]+)=([^&]+)/g,
            q = /\+/g;
        var p = {}, o, r, t;
        if (u) {
            u = u.replace(q, "%20");
            while ((o = s.exec(u))) {
                r = decodeURIComponent(o[1]);
                t = decodeURIComponent(o[2]);
                p[r] = t
            }
        }
        return p
    }(j.location.href.split("?")[1]);
    var e = function (t) {
        var r = false,
            q, o, p;
        if (k._app_platform === "android") {
            r = true;
            q = "android";
            o = "4.2"
        } else {
            if (k._app_platform === "ios") {
                r = true;
                q = "ios";
                o = "6.0"
            } else {
                if (p = /\bCPU.*OS (\d+(_\d+)?)/i.exec(t)) {
                    q = "ios";
                    o = p[1].replace("_", ".")
                } else {
                    if (p = /\bAndroid (\d+(\.\d+)?)/.exec(t)) {
                        q = "android";
                        o = p[1]
                    }
                }
            }
        }
        var s = {
            faked: r,
            name: q,
            versionString: o,
            version: o && parseFloat(o)
        };
        s[q] = true;
        if (s.ios) {
            l.body.className += " app-ios"
        } else {
            if (s.android) {
                l.body.className += " app-android"
            }
        } if (s.faked || (!s.ios && !s.android)) {
            l.body.className += " app-no-scrollbar"
        }
        return s
    }(navigator.userAgent);
    var i = function (o) {
        if (o) {
            return function (p, r, q) {
                return o.call(p, r, q)
            }
        } else {
            return function (q, t, r) {
                for (var s = 0, p = q.length; s < p; s++) {
                    if (s in q) {
                        t.call(r, q[s], s, q)
                    }
                }
            }
        }
    }(Array.prototype.forEach);

    function h(o) {
        if (Array.isArray) {
            return Array.isArray(o)
        } else {
            return Object.prototype.toString.call(o) !== "[object Array]"
        }
    }

    function m(p) {
        if (!p) {
            return false
        }
        try {
            return (p instanceof Node) || (p instanceof HTMLElement)
        } catch (o) {}
        if (typeof p !== "object") {
            return false
        }
        if (typeof p.nodeType !== "number") {
            return false
        }
        if (typeof p.nodeName !== "string") {
            return false
        }
        return true
    }

    function f(p, o) {
        p.style["-webkit-transform"] = o;
        p.style["-moz-transform"] = o;
        p.style["-ms-transform"] = o;
        p.style["-o-transform"] = o;
        p.style.transform = o
    }

    function d(o, p) {
        if (p) {
            o.style["-webkit-transition"] = "-webkit-" + p;
            o.style["-moz-transition"] = "-moz-" + p;
            o.style["-ms-transition"] = "-ms-" + p;
            o.style["-o-transition"] = "-o-" + p;
            o.style.transition = p
        } else {
            o.style["-webkit-transition"] = "";
            o.style["-moz-transition"] = "";
            o.style["-ms-transition"] = "";
            o.style["-o-transition"] = "";
            o.style.transition = ""
        }
    }

    function g(p, q) {
        var o;
        if (q) {
            o = p.style
        } else {
            o = l.defaultView.getComputedStyle(p, null)
        }
        return {
            display: o.display,
            opacity: o.opacity,
            paddingRight: o.paddingRight,
            paddingLeft: o.paddingLeft,
            marginRight: o.marginRight,
            marginLeft: o.marginLeft,
            borderRightWidth: o.borderRightWidth,
            borderLeftWidth: o.borderLeftWidth,
            top: o.top,
            left: o.left,
            height: o.height,
            width: o.width,
            position: o.position
        }
    }

    function n(p) {
        var o = 0;
        o += parseInt(p.width || 0);
        o += parseInt(p.paddingLeft || 0);
        o += parseInt(p.paddingRight || 0);
        o += parseInt(p.borderLeftWidth || 0);
        o += parseInt(p.borderRightWidth || 0);
        o += parseInt(p.marginLeft || 0);
        o += parseInt(p.marginRight || 0);
        return o
    }

    function b(s, r, v, u) {
        if (typeof s.length !== "number") {
            s = [s]
        }
        var q = s.map(function (w) {
            return w.elem.style.opacity
        });
        o(function () {
            t(function () {
                p(function () {
                    u()
                })
            })
        });

        function o(w) {
            s.forEach(function (x) {
                if (typeof x.transitionStart !== "undefined") {
                    f(x.elem, x.transitionStart)
                }
                if (typeof x.opacityStart !== "undefined") {
                    x.elem.style.opacity = x.opacityStart + ""
                }
            });
            setTimeout(function () {
                var x = "transform " + (r / 1000) + "s ease-in-out, opacity " + (r / 1000) + "s ease-in-out";
                s.forEach(function (y) {
                    d(y.elem, x)
                });
                setTimeout(w, 0)
            }, 0)
        }

        function t(z) {
            s.forEach(function (A) {
                if (typeof A.transitionEnd !== "undefined") {
                    f(A.elem, A.transitionEnd)
                }
                if (typeof A.opacityEnd !== "undefined") {
                    A.elem.style.opacity = A.opacityEnd + ""
                }
            });
            s.forEach(function (A) {
                A.elem.addEventListener("webkitTransitionEnd", x, false);
                A.elem.addEventListener("transitionend", x, false);
                A.elem.addEventListener("oTransitionEnd", x, false);
                A.elem.addEventListener("otransitionend", x, false);
                A.elem.addEventListener("MSTransitionEnd", x, false);
                A.elem.addEventListener("transitionend", x, false)
            });
            var w = false;

            function y(C) {
                for (var B = 0, A = s.length; B < A; B++) {
                    if (C === s[B].elem) {
                        return true
                    }
                }
                return false
            }

            function x(A) {
                if (w || !y(A.target)) {
                    return
                }
                w = true;
                s.forEach(function (B) {
                    B.elem.removeEventListener("webkitTransitionEnd", x);
                    B.elem.removeEventListener("transitionend", x);
                    B.elem.removeEventListener("oTransitionEnd", x);
                    B.elem.removeEventListener("otransitionend", x);
                    B.elem.removeEventListener("MSTransitionEnd", x);
                    B.elem.removeEventListener("transitionend", x)
                });
                z()
            }
        }

        function p(w) {
            s.forEach(function (x) {
                d(x.elem, "")
            });
            setTimeout(function () {
                s.forEach(function (y, x) {
                    f(y.elem, "");
                    y.elem.style.opacity = q[x]
                });
                w()
            }, 0)
        }
    }
    c.platform = e.name;
    c.platformVersion = e.version;
    return {
        query: k,
        os: e,
        forEach: i,
        isArray: h,
        isNode: m,
        setTransform: f,
        setTransition: d,
        animate: b,
        getStyles: g,
        getTotalWidth: n
    }
}(window, document, App);
App._metrics = function (f, e) {
    var b = false;
    e.enableGoogleAnalytics = function () {
        g()
    };
    return {
        watchPage: c
    };

    function g() {
        b = true
    }

    function d(h, i) {
        if (!b) {
            return
        }
        var j = "/" + h;
        if (typeof i !== "undefined") {
            j += "/" + i
        }
        if (typeof f.ga === "function") {
            f.ga("send", "pageview", j);
            return
        }
        if (!f._gaq) {
            f._gaq = []
        }
        if (typeof f._gaq.push === "function") {
            f._gaq.push(["_trackPageview", j])
        }
    }

    function c(k, i, h) {
        var j;
        if ((typeof h === "object") && (typeof h.id !== "undefined")) {
            j = h.id + ""
        }
        k.addEventListener("appShow", function () {
            d(i, j)
        }, false)
    }
}(window, App);
App._Pages = function (K, e, o, S, H, U, J) {
    var B = "data-page",
        u = "app-page",
        n = "app-loaded",
        b = {
            SHOW: "appShow",
            HIDE: "appHide",
            BACK: "appBack",
            FORWARD: "appForward",
            LAYOUT: "appLayout",
            ONLINE: "appOnline",
            OFFLINE: "appOffline"
        };
    var y = false,
        s = null,
        F = null,
        G = !! K.APP_FORCE_ISCROLL,
        c = {}, i = [],
        m = [];
    H.add = function (V, W) {
        if (typeof V !== "string") {
            W = V;
            V = undefined
        }
        if (!U.isNode(W)) {
            throw TypeError("page template node must be a DOM node, got " + W)
        }
        t(W, V)
    };
    H.populator = function (V, X, W) {
        if (typeof V !== "string") {
            throw TypeError("page name must be a string, got " + V)
        }
        if (typeof X !== "function") {
            throw TypeError("page populator must be a function, got " + X)
        }
        switch (typeof W) {
        case "undefined":
            W = function () {};
            break;
        case "function":
            break;
        default:
            throw TypeError("page unpopulator must be a function, got " + W)
        }
        if (X) {
            z(V, X)
        }
        if (W) {
            j(V, W)
        }
    };
    H.generate = function (V, W) {
        if (typeof V !== "string") {
            throw TypeError("page name must be a string, got " + V)
        }
        switch (typeof W) {
        case "undefined":
            W = {};
            break;
        case "object":
            break;
        default:
            throw TypeError("page arguments must be an object if defined, got " + W)
        }
        return M(V, W)
    };
    H.destroy = function (V) {
        if (!U.isNode(V)) {
            throw TypeError("page node must be a DOM node, got " + V)
        }
        return f(V)
    };
    return {
        EVENTS: b,
        fire: D,
        has: N,
        startGeneration: d,
        finishGeneration: p,
        startDestruction: E,
        finishDestruction: l,
        fixContent: g,
        saveScrollPosition: I,
        saveScrollStyle: P,
        restoreScrollPosition: q,
        restoreScrollStyle: C
    };

    function w() {
        if (y) {
            return
        }
        y = true;
        var W = e.getElementsByClassName(u);
        for (var V = W.length; V--;) {
            t(W[V])
        }
        e.body.className += " " + n
    }

    function t(W, V) {
        if (!V) {
            V = W.getAttribute(B)
        }
        if (!V) {
            throw TypeError("page name was not specified")
        }
        W.setAttribute(B, V);
        if (W.parentNode) {
            W.parentNode.removeChild(W)
        }
        c[V] = W.cloneNode(true)
    }

    function N(V) {
        w();
        return (V in c)
    }

    function T(V) {
        if (!N(V)) {
            throw TypeError(V + " is not a known page")
        }
        return c[V].cloneNode(true)
    }

    function z(V, W) {
        if (!i[V]) {
            i[V] = [W]
        } else {
            i[V].push(W)
        }
    }

    function j(V, W) {
        if (!m[V]) {
            m[V] = [W]
        } else {
            m[V].push(W)
        }
    }

    function L(V, X, Z, W) {
        var Y = i[V] || [];
        Y.forEach(function (aa) {
            aa.call(X, Z, W)
        })
    }

    function k(V, X, Y, W) {
        var Z = m[V] || [];
        Z.forEach(function (aa) {
            aa.call(X, Y, W)
        })
    }

    function M(V, X) {
        var W = {}, Y = d(V, W, X);
        p(V, W, Y, X);
        return Y
    }

    function f(W) {
        var V = W.getAttribute(B);
        E(V, {}, W, {});
        l(V, {}, W, {})
    }

    function d(V, X, W) {
        var Y = T(V);
        R(Y);
        J.watchPage(Y, V, W);
        g(Y);
        U.forEach(Y.querySelectorAll(".app-button"), function (aa) {
            o(aa);
            var ab = aa.getAttribute("data-target"),
                Z = aa.getAttribute("data-back");
            if (Z) {
                o.sticky(aa, function (ac) {
                    return H.back({}, ac)
                })
            } else {
                if (ab) {
                    o.sticky(aa, function (ac) {
                        return H.load(ab, {}, {}, ac)
                    })
                }
            }
        });
        L(V, X, Y, W);
        D(Y, b.LAYOUT);
        Y.addEventListener("DOMNodeInsertedIntoDocument", function () {
            h(Y);
            D(Y, b.LAYOUT)
        }, false);
        return Y
    }

    function p(V, X, Y, W) {
        Q(Y)
    }

    function E(V, X, Y, W) {
        if (!U.os.ios || U.os.version < 6) {
            v(Y)
        }
    }

    function l(V, X, Y, W) {
        k(V, X, Y, W)
    }

    function g(aa) {
        var X = aa.querySelector(".app-topbar"),
            Y = aa.querySelector(".app-content");
        if (!Y) {
            return
        }
        var V = K.innerHeight;
        if (!X) {
            Y.style.height = V + "px";
            return
        }
        var Z = e.defaultView.getComputedStyle(X, null),
            W = U.os.android ? 48 : 44;
        if (Z.height) {
            W = parseInt(Z.height) || 0
        }
        Y.style.height = (V - W) + "px"
    }

    function h(ab) {
        var X = ab.querySelector(".app-topbar");
        if (!X) {
            return
        }
        var ae = X.querySelector(".app-title");
        if (!ae || !ae.getAttribute("data-autosize")) {
            return
        }
        var Y = 0,
            W = X.querySelector(".left.app-button"),
            ad = X.querySelector(".right.app-button");
        if (W) {
            var ac = U.getStyles(W),
                Z = U.getTotalWidth(ac) + parseInt(ac.left || 0) + 4;
            Y = Math.max(Y, Z)
        }
        if (ad) {
            var V = U.getStyles(ad),
                aa = U.getTotalWidth(V) + parseInt(V.right || 0) + 4;
            Y = Math.max(Y, aa)
        }
        ae.style.width = (K.innerWidth - Y * 2) + "px"
    }

    function Q(V) {
        U.forEach(V.querySelectorAll(".app-content"), function (W) {
            if (!W.getAttribute("data-no-scroll")) {
                A(W)
            }
        });
        U.forEach(V.querySelectorAll("[data-scrollable]"), function (W) {
            A(W)
        })
    }

    function A(V) {
        S(V, G);
        V.className += " app-scrollable";
        if (!G && U.os.ios && U.os.version < 6) {
            V.className += " app-scrollhack"
        }
    }

    function v(V) {
        U.forEach(V.querySelectorAll("*"), function (W) {
            W.style["-webkit-overflow-scrolling"] = ""
        })
    }

    function O(W) {
        var V = [];
        if (W) {
            U.forEach(W.querySelectorAll(".app-scrollable"), function (X) {
                if (X._scrollable) {
                    V.push(X)
                }
            })
        }
        return V
    }

    function I(V) {
        U.forEach(O(V), function (W) {
            if (W._iScroll) {
                return
            }
            var X = W._scrollTop();
            W.setAttribute("data-last-scroll", X + "")
        })
    }

    function P(V) {
        U.forEach(O(V), function (X) {
            if (X._iScroll) {
                return
            }
            var W = X.style["-webkit-overflow-scrolling"] || "";
            X.style["-webkit-overflow-scrolling"] = "";
            X.setAttribute("data-scroll-style", W)
        })
    }

    function q(V, W) {
        U.forEach(O(V), function (X) {
            if (X._iScroll) {
                return
            }
            var Y = parseInt(X.getAttribute("data-last-scroll"));
            if (Y) {
                if (!W) {
                    setTimeout(function () {
                        X._scrollTop(Y)
                    }, 0)
                } else {
                    X._scrollTop(Y)
                }
            }
        })
    }

    function C(V) {
        U.forEach(O(V), function (X) {
            if (X._iScroll) {
                return
            }
            var W = X.getAttribute("data-scroll-style") || "";
            if (W) {
                X.style["-webkit-overflow-scrolling"] = W
            }
        });
        q(V, true)
    }

    function x() {
        if (s === null) {
            try {
                var X = e.createElement("div"),
                    V = e.createEvent("CustomEvent");
                V.initEvent("fooBarFace", false, true);
                X.dispatchEvent(V);
                s = true
            } catch (W) {
                s = false
            }
        }
        return s
    }

    function r() {
        if (!F) {
            F = [];
            for (var V in b) {
                F.push(b[V])
            }
        }
        return F
    }

    function R(W) {
        if (W._brokenEvents || x()) {
            return
        }
        W._brokenEvents = true;
        W._addEventListener = W.addEventListener;
        W._removeEventListener = W.removeEventListener;
        var V = {}, X = r();
        X.forEach(function (Y) {
            V[Y] = []
        });
        W.addEventListener = function (Y, Z) {
            if (X.indexOf(Y) === -1) {
                W._addEventListener.apply(this, arguments);
                return
            }
            var aa = V[Y];
            if (aa.indexOf(Z) === -1) {
                aa.push(Z)
            }
        };
        W.removeEventListener = function (Z, aa) {
            if (X.indexOf(Z) === -1) {
                W._removeEventListener.apply(this, arguments);
                return
            }
            var ab = V[Z],
                Y = ab.indexOf(aa);
            if (Y !== -1) {
                ab.splice(Y, 1)
            }
        };
        W._trigger = function (Y) {
            if (X.indexOf(Y) === -1) {
                return
            }
            V[Y].forEach(function (Z) {
                setTimeout(function () {
                    Z.call(W, {})
                }, 0)
            })
        }
    }

    function D(X, V) {
        if (X._brokenEvents) {
            X._trigger(V);
            return
        }
        var W = e.createEvent("CustomEvent");
        W.initEvent(V, false, true);
        X.dispatchEvent(W)
    }
}(window, document, Clickable, Scrollable, App, App._utils, App._metrics);
App._core = function (H, d, O, p, G, R, L) {
    var b = "__APP_JS_STACK__" + H.location.pathname,
        m = "slide-left",
        P = "implode-out",
        y = "fade-on",
        M = "instant",
        E = {
            instant: "instant",
            fade: "fade",
            "fade-on": "fade-off",
            "fade-off": "fade-on",
            "scale-in": "scale-out",
            "scale-out": "scale-in",
            "rotate-left": "rotate-right",
            "rotate-right": "rotate-left",
            "cube-left": "cube-right",
            "cube-right": "cube-left",
            "swap-left": "swap-right",
            "swap-right": "swap-left",
            "explode-in": "explode-out",
            "explode-out": "explode-in",
            "implode-in": "implode-out",
            "implode-out": "implode-in",
            "slide-left": "slide-right",
            "slide-right": "slide-left",
            "slide-up": "slide-down",
            "slide-down": "slide-up",
            "slideon-left": "slideoff-left",
            "slideon-right": "slideoff-right",
            "slideon-up": "slideoff-up",
            "slideon-down": "slideoff-down",
            "slideoff-left": "slideon-left",
            "slideoff-right": "slideon-right",
            "slideoff-up": "slideon-up",
            "slideoff-down": "slideon-down",
            "glideon-right": "glideoff-right",
            "glideoff-right": "slideon-right",
            "glideon-left": "glideoff-left",
            "glideoff-left": "slideon-left",
            "glideon-down": "glideoff-down",
            "glideoff-down": "slideon-down",
            "glideon-up": "glideoff-up",
            "glideoff-up": "slideon-up"
        };
    var v = [],
        B = [],
        Q = false,
        s, l, q, I;
    if (R.os.ios) {
        x(m)
    } else {
        if (R.os.android) {
            if (R.os.version >= 4) {
                x(P)
            } else {
                if ((R.os.version < 2.3) || /LT15a/i.test(navigator.userAgent)) {
                    x(M)
                } else {
                    x(y)
                }
            }
        }
    }
    G.current = function () {
        return q
    };
    G.load = function (S, U, T, V) {
        if (typeof S !== "string") {
            throw TypeError("page name must be a string, got " + S)
        }
        switch (typeof U) {
        case "function":
            V = U;
            U = {};
            T = {};
            break;
        case "undefined":
            U = {};
            break;
        case "string":
            V = T;
            T = U;
            U = {};
            break;
        case "object":
            break;
        default:
            throw TypeError("page arguments must be an object if defined, got " + U)
        }
        switch (typeof T) {
        case "function":
            V = T;
            T = {};
            break;
        case "undefined":
            T = {};
            break;
        case "string":
            T = {
                transition: T
            };
            break;
        case "object":
            break;
        default:
            throw TypeError("options must be an object if defined, got " + T)
        }
        switch (typeof V) {
        case "undefined":
            V = function () {};
            break;
        case "function":
            break;
        default:
            throw TypeError("callback must be a function if defined, got " + V)
        }
        return o(S, U, T, V)
    };
    G.back = function (S, T) {
        switch (typeof S) {
        case "function":
            T = S;
            S = {};
            break;
        case "undefined":
            S = {};
            break;
        case "string":
            S = {
                transition: S
            };
            break;
        case "object":
            break;
        default:
            throw TypeError("options must be an object if defined, got " + S)
        }
        switch (typeof T) {
        case "undefined":
            T = function () {};
            break;
        case "function":
            break;
        default:
            throw TypeError("callback must be a function if defined, got " + T)
        }
        return K(S, T)
    };
    G.setDefaultTransition = function (S) {
        if (typeof S === "object") {
            switch (R.os.name) {
            case "android":
                if ((R.os.version < 4) && S.androidFallback) {
                    S = S.androidFallback
                } else {
                    S = S.android
                }
                break;
            case "ios":
                if ((R.os.version < 5) && S.iosFallback) {
                    S = S.iosFallback
                } else {
                    S = S.ios
                }
                break;
            default:
                S = S.fallback;
                break
            }
            if (!S) {
                return
            }
        }
        if (typeof S !== "string") {
            throw TypeError("transition must be a string if defined, got " + S)
        }
        if (!(S in E)) {
            throw TypeError("invalid transition type, got " + S)
        }
        x(S)
    };
    G.getDefaultTransition = function () {
        return s
    };
    G.getReverseTransition = function () {
        return l
    };
    G.getStack = function () {
        return t()
    };
    G.getPage = function (S) {
        var T = v.length - 1;
        switch (typeof S) {
        case "undefined":
            S = T;
            break;
        case "number":
            if (Math.abs(S) > T) {
                throw TypeError("absolute index cannot be greater than stack size, got " + S)
            }
            if (S < 0) {
                S = T + S
            }
            break;
        default:
            throw TypeError("page index must be a number if defined, got " + S)
        }
        return h(S)
    };
    G.removeFromStack = function (U, T) {
        var S = v.length - 1;
        switch (typeof U) {
        case "undefined":
            U = 0;
            break;
        case "number":
            if (Math.abs(U) > S) {
                throw TypeError("absolute start index cannot be greater than stack size, got " + U)
            }
            if (U < 0) {
                U = S + U
            }
            break;
        default:
            throw TypeError("start index must be a number if defined, got " + U)
        }
        switch (typeof T) {
        case "undefined":
            T = S;
            break;
        case "number":
            if (Math.abs(T) > S) {
                throw TypeError("absolute end index cannot be greater than stack size, got " + T)
            }
            if (T < 0) {
                T = S + T
            }
            break;
        default:
            throw TypeError("end index must be a number if defined, got " + T)
        }
        if (U > T) {
            throw TypeError("start index cannot be greater than end index")
        }
        A(U, T)
    };
    G.addToStack = function (T, S) {
        var U = v.length - 1;
        switch (typeof T) {
        case "undefined":
            T = 0;
            break;
        case "number":
            if (Math.abs(T) > U) {
                throw TypeError("absolute index cannot be greater than stack size, got " + T)
            }
            if (T < 0) {
                T = U + T
            }
            break;
        default:
            throw TypeError("index must be a number if defined, got " + T)
        }
        if (!R.isArray(S)) {
            throw TypeError("added pages must be an array, got " + S)
        }
        S = S.slice();
        S.forEach(function (W, V) {
            if (typeof W === "string") {
                W = [W, {}]
            } else {
                if (R.isArray(W)) {
                    W = W.slice()
                } else {
                    throw TypeError("page description must be an array (page name, arguments), got " + W)
                }
            } if (typeof W[0] !== "string") {
                throw TypeError("page name must be a string, got " + W[0])
            }
            switch (typeof W[1]) {
            case "undefined":
                W[1] = {};
                break;
            case "object":
                break;
            default:
                throw TypeError("page arguments must be an object if defined, got " + W[1])
            }
            switch (typeof W[2]) {
            case "undefined":
                W[2] = {};
                break;
            case "object":
                break;
            default:
                throw TypeError("page options must be an object if defined, got " + W[2])
            }
            S[V] = W
        });
        n(T, S)
    };
    G.saveStack = function () {
        j()
    };
    G.destroyStack = function () {
        f()
    };
    G.dialog = p;
    G.restore = J();
    G._layout = D();
    return {};

    function x(S) {
        s = S;
        l = E[s]
    }

    function e(S) {
        if (Q) {
            B.push(S);
            return false
        }
        Q = true;
        S(function () {
            Q = false;
            j();
            C()
        });
        return true
    }

    function o(S, U, T, V) {
        e(function (X) {
            var Z = I,
                ad = {}, aa = L.startGeneration(S, ad, U),
                ae = v[v.length - 1],
                ab = ae && ae[1];
            k(aa, Z || ab);
            if (!q) {
                G.restore = null;
                d.body.appendChild(aa);
                Y();
                ac()
            } else {
                L.saveScrollPosition(I);
                var W = {};
                for (var af in T) {
                    W[af] = T[af]
                }
                N(aa, W, ac);
                Y()
            }

            function Y() {
                q = S;
                I = aa;
                v.push([S, aa, T, U, ad]);
                if (Z) {
                    L.fire(Z, L.EVENTS.FORWARD)
                }
            }

            function ac() {
                L.saveScrollStyle(Z);
                L.finishGeneration(S, ad, aa, U);
                X();
                V();
                if (Z) {
                    L.fire(Z, L.EVENTS.HIDE)
                }
                L.fire(aa, L.EVENTS.SHOW)
            }
        });
        if (!L.has(S)) {
            return false
        }
    }

    function K(T, V) {
        if (p.status()) {
            p.close();
            return
        }
        var U = v.length;
        var S = e(function (ad) {
            if (v.length < 2) {
                ad();
                return
            }
            var ac = v.pop(),
                aa = v[v.length - 1],
                W = aa[0],
                Z = aa[1],
                X = ac[2];
            L.fire(ac[1], L.EVENTS.BACK);
            L.fixContent(Z);
            L.startDestruction(ac[0], ac[4], ac[1], ac[3]);
            L.restoreScrollPosition(Z);
            var ab = {};
            for (var Y in X) {
                if (Y === "transition") {
                    ab[Y] = E[X[Y]] || X[Y]
                } else {
                    ab[Y] = X[Y]
                }
            }
            for (var Y in T) {
                ab[Y] = T[Y]
            }
            N(Z, ab, function () {
                L.restoreScrollStyle(Z);
                L.fire(ac[1], L.EVENTS.HIDE);
                L.fire(Z, L.EVENTS.SHOW);
                setTimeout(function () {
                    L.finishDestruction(ac[0], ac[4], ac[1], ac[3]);
                    ad();
                    V()
                }, 0)
            }, true);
            q = W;
            I = Z
        });
        if (S && (U < 2)) {
            return false
        }
    }

    function t() {
        return v.slice().map(function (V) {
            var T = V[0],
                S = {};
            for (var U in V[3]) {
                S[U] = V[3][U]
            }
            return [T, S]
        })
    }

    function h(S) {
        var T = v[S];
        if (T) {
            return T[1]
        }
    }

    function g(T, S) {
        var U = v.splice(T, S - T);
        U.forEach(function (V) {
            L.startDestruction(V[0], V[4], V[1], V[3]);
            L.finishDestruction(V[0], V[4], V[1], V[3])
        })
    }

    function A(T, S) {
        e(function (U) {
            g(T, S);
            U()
        })
    }

    function r(T, S) {
        var V = [],
            U;
        S.forEach(function (X) {
            var W = {}, Y = L.startGeneration(X[0], W, X[1]);
            k(Y, U);
            L.finishGeneration(X[0], W, Y, X[1]);
            L.saveScrollPosition(Y);
            L.saveScrollStyle(Y);
            V.push([X[0], Y, X[2], X[1], W]);
            U = Y
        });
        V.unshift(0);
        V.unshift(T);
        Array.prototype.splice.apply(v, V)
    }

    function n(T, S) {
        e(function (U) {
            r(T, S);
            U()
        })
    }

    function k(W, X) {
        if (!X) {
            return
        }
        var U = W.querySelector(".app-topbar .left.app-button"),
            T = X.querySelector(".app-topbar .app-title");
        if (!U || !T) {
            return
        }
        var S = T.textContent,
            V = U.textContent;
        if (!S || V) {
            return
        }
        if (S.length > 13) {
            S = S.substr(0, 12) + ".."
        }
        U.textContent = S
    }

    function C() {
        if (B.length) {
            e(B.shift())
        }
    }

    function u(S) {
        var U = false;
        var T = d.createElement("div");
        T.className = "app-clickblocker";
        d.body.appendChild(T);
        T.addEventListener("touchstart", function (V) {
            V.preventDefault()
        }, false);
        S(function () {
            if (U) {
                return
            }
            U = true;
            d.body.removeChild(T)
        })
    }

    function F(S) {
        if (!R.os.ios) {
            return false
        }
        if (S.transition === "slide-left") {
            return true
        } else {
            if (S.transition === "slide-right") {
                return true
            } else {
                return false
            }
        }
    }

    function N(U, T, V, S) {
        if (!T.transition) {
            T.transition = (S ? l : s)
        }
        u(function (X) {
            if (F(T)) {
                w(U, T, W)
            } else {
                if (T.transition === "instant") {
                    O(I, U, T, function () {
                        setTimeout(W, 0)
                    })
                } else {
                    O(I, U, T, W)
                }
            }

            function W() {
                L.fixContent(I);
                X();
                V()
            }
        })
    }

    function w(W, ag, ae) {
        var Y = I,
            U = Y.querySelector(".app-topbar"),
            T = Y.querySelector(".app-topbar .left.app-button"),
            Z = Y.querySelector(".app-content"),
            V = W.querySelector(".app-topbar"),
            af = W.querySelector(".app-topbar .left.app-button"),
            X = W.querySelector(".app-content"),
            ad, S;
        if (U) {
            ad = U.querySelector(".app-title")
        }
        if (V) {
            S = V.querySelector(".app-title")
        }
        if (!U || !V || !Z || !X || !c(U) || !c(V)) {
            O(Y, W, ag, ae);
            return
        }
        var ac = (ag.transition === "slide-left"),
            ab = [{
                opacityEnd: 0,
                elem: U
            }, {
                transitionStart: "translate3d(0,0,0)",
                transitionEnd: "translate3d(" + (ac ? -100 : 100) + "%,0,0)",
                elem: Z
            }, {
                transitionStart: "translate3d(" + (ac ? 100 : -100) + "%,0,0)",
                transitionEnd: "translate3d(0,0,0)",
                elem: X
            }];
        if (T && T.getAttribute("data-noslide")) {
            T = undefined
        }
        if (af && af.getAttribute("data-noslide")) {
            af = undefined
        }
        if (ad) {
            ab.push({
                opacityStart: 1,
                opacityEnd: 0,
                transitionStart: "translate3d(0,0,0)",
                transitionEnd: "translate3d(" + z(af, ac) + "px,0,0)",
                elem: ad
            })
        }
        if (S) {
            ab.push({
                opacityStart: 0,
                opacityEnd: 1,
                transitionStart: "translate3d(" + z(T, !ac) + "px,0,0)",
                transitionEnd: "translate3d(0,0,0)",
                elem: S
            })
        }
        if (R.os.version >= 5) {
            if (T) {
                ab.push({
                    transitionStart: "translate3d(0,0,0)",
                    transitionEnd: "translate3d(" + i(T, af, !ac) + "px,0,0)",
                    elem: T
                })
            }
            if (af) {
                ab.push({
                    transitionStart: "translate3d(" + i(af, T, ac) + "px,0,0)",
                    transitionEnd: "translate3d(0,0,0)",
                    elem: af
                })
            }
        }
        var aa = W.style.position;
        W.style.position = "fixed";
        Y.parentNode.insertBefore(W, Y);
        Y.style.background = "none";
        R.animate(ab, 300, "ease-in-out", function () {
            Y.parentNode.removeChild(Y);
            W.style.position = aa;
            ae()
        })
    }

    function i(V, U, T) {
        var W = V.textContent.length * 15,
            S = U ? (U.textContent.length * 15) : 0;
        if (!T) {
            return (S - H.innerWidth) / 2
        } else {
            return (H.innerWidth - W) / 2
        }
    }

    function z(S, T) {
        var U = 0;
        if (S && (R.os.version >= 5)) {
            U = S.textContent.length * 15
        }
        if (!T) {
            return (H.innerWidth / 2)
        } else {
            return (U - H.innerWidth) / 2
        }
    }

    function c(T) {
        var S = R.getStyles(T);
        return (S.display !== "none" && S.opacity !== "0")
    }

    function D() {
        function U() {
            if (I) {
                L.fixContent(I)
            }
        }

        function T() {
            U();
            if (I) {
                L.fire(I, L.EVENTS.LAYOUT)
            }
        }

        function S() {
            T();
            setTimeout(U, 0);
            setTimeout(U, 10);
            setTimeout(U, 100)
        }
        H.addEventListener("orientationchange", S);
        H.addEventListener("resize", S);
        H.addEventListener("load", S);
        setTimeout(S, 0);
        H.addEventListener("online", function () {
            v.forEach(function (V) {
                L.fire(V[1], L.EVENTS.ONLINE)
            })
        }, false);
        H.addEventListener("offline", function () {
            v.forEach(function (V) {
                L.fire(V[1], L.EVENTS.OFFLINE)
            })
        }, false);
        return S
    }

    function j() {
        try {
            var S = v.map(function (U) {
                return [U[0], U[3], U[2]]
            });
            localStorage[b] = JSON.stringify(S)
        } catch (T) {}
    }

    function f() {
        delete localStorage[b]
    }

    function J() {
        var S, U;
        try {
            S = JSON.parse(localStorage[b]);
            U = S.pop()
        } catch (T) {
            return
        }
        return function (W) {
            switch (typeof W) {
            case "undefined":
                W = function () {};
            case "function":
                break;
            default:
                throw TypeError("restore callback must be a function if defined, got " + W)
            }
            if (!L.has(U[0])) {
                throw TypeError(U[0] + " is not a known page")
            }
            S.forEach(function (X) {
                if (!L.has(X[0])) {
                    throw TypeError(X[0] + " is not a known page")
                }
            });
            try {
                r(0, S)
            } catch (V) {
                g(0, v.length);
                throw Error("failed to restore stack")
            }
            j();
            try {
                o(U[0], U[1], U[2], W)
            } catch (V) {
                g(0, v.length);
                throw Error("failed to restore stack")
            }
        }
    }
}(window, document, Swapper, Dialog, App, App._utils, App._Pages);

	return App;
});