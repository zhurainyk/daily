var dat = dat || {};
dat.gui = dat.gui || {};
dat.utils = dat.utils || {};
dat.controllers = dat.controllers || {};
dat.dom = dat.dom || {};
dat.color = dat.color || {};
dat.utils.css = function () {
    return {
        load: function (e, a) {
            a = a || document;
            var b = a.createElement("link");
            b.type = "text/css";
            b.rel = "stylesheet";
            b.href = e;
            a.getElementsByTagName("head")[0].appendChild(b)
        },
        inject: function (e, a) {
            a = a || document;
            var b = document.createElement("style");
            b.type = "text/css";
            b.innerHTML = e;
            a.getElementsByTagName("head")[0].appendChild(b)
        }
    }
}();
dat.utils.common = function () {
    var e = Array.prototype.forEach,
        a = Array.prototype.slice;
    return {
        BREAK: {},
        extend: function (b) {
            this.each(a.call(arguments, 1), function (a) {
                for (var f in a) this.isUndefined(a[f]) || (b[f] = a[f])
            }, this);
            return b
        },
        defaults: function (b) {
            this.each(a.call(arguments, 1), function (a) {
                for (var f in a) this.isUndefined(b[f]) && (b[f] = a[f])
            }, this);
            return b
        },
        compose: function () {
            var b = a.call(arguments);
            return function () {
                for (var d = a.call(arguments), f = b.length - 1; 0 <= f; f--) d = [b[f].apply(this, d)];
                return d[0]
            }
        },
        each: function (a, d, f) {
            if (e && a.forEach === e) a.forEach(d, f);
            else if (a.length === a.length + 0)
                for (var c = 0, p = a.length; c < p && !(c in a && d.call(f, a[c], c) === this.BREAK); c++);
            else
                for (c in a)
                    if (d.call(f, a[c], c) === this.BREAK) break
        },
        defer: function (a) {
            setTimeout(a, 0)
        },
        toArray: function (b) {
            return b.toArray ? b.toArray() : a.call(b)
        },
        isUndefined: function (a) {
            return void 0 === a
        },
        isNull: function (a) {
            return null === a
        },
        isNaN: function (a) {
            return a !== a
        },
        isArray: Array.isArray || function (a) {
            return a.constructor === Array
        },
        isObject: function (a) {
            return a ===
                Object(a)
        },
        isNumber: function (a) {
            return a === a + 0
        },
        isString: function (a) {
            return a === a + ""
        },
        isBoolean: function (a) {
            return !1 === a || !0 === a
        },
        isFunction: function (a) {
            return "[object Function]" === Object.prototype.toString.call(a)
        }
    }
}();
dat.controllers.Controller = function (e) {
    var a = function (a, d) {
        this.initialValue = a[d];
        this.domElement = document.createElement("div");
        this.object = a;
        this.property = d;
        this.__onFinishChange = this.__onChange = void 0
    };
    e.extend(a.prototype, {
        onChange: function (a) {
            this.__onChange = a;
            return this
        },
        onFinishChange: function (a) {
            this.__onFinishChange = a;
            return this
        },
        setValue: function (a) {
            this.object[this.property] = a;
            this.__onChange && this.__onChange.call(this, a);
            this.updateDisplay();
            return this
        },
        getValue: function () {
            return this.object[this.property]
        },
        updateDisplay: function () {
            return this
        },
        isModified: function () {
            return this.initialValue !== this.getValue()
        }
    });
    return a
}(dat.utils.common);
dat.dom.dom = function (e) {
    function a(c) {
        if ("0" === c || e.isUndefined(c)) return 0;
        c = c.match(d);
        return e.isNull(c) ? 0 : parseFloat(c[1])
    }
    var b = {};
    e.each({
        HTMLEvents: ["change"],
        MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
        KeyboardEvents: ["keydown"]
    }, function (c, a) {
        e.each(c, function (c) {
            b[c] = a
        })
    });
    var d = /(\d+(\.\d+)?)px/,
        f = {
            makeSelectable: function (c, a) {
                void 0 !== c && void 0 !== c.style && (c.onselectstart = a ? function () {
                        return !1
                    } : function () {}, c.style.MozUserSelect = a ? "auto" : "none", c.style.KhtmlUserSelect =
                    a ? "auto" : "none", c.unselectable = a ? "on" : "off")
            },
            makeFullscreen: function (c, a, d) {
                e.isUndefined(a) && (a = !0);
                e.isUndefined(d) && (d = !0);
                c.style.position = "absolute";
                a && (c.style.left = 0, c.style.right = 0);
                d && (c.style.top = 0, c.style.bottom = 0)
            },
            fakeEvent: function (c, a, d, f) {
                d = d || {};
                var q = b[a];
                if (!q) throw Error("Event type " + a + " not supported.");
                var n = document.createEvent(q);
                switch (q) {
                    case "MouseEvents":
                        n.initMouseEvent(a, d.bubbles || !1, d.cancelable || !0, window, d.clickCount || 1, 0, 0, d.x || d.clientX || 0, d.y || d.clientY || 0, !1,
                            !1, !1, !1, 0, null);
                        break;
                    case "KeyboardEvents":
                        q = n.initKeyboardEvent || n.initKeyEvent;
                        e.defaults(d, {
                            cancelable: !0,
                            ctrlKey: !1,
                            altKey: !1,
                            shiftKey: !1,
                            metaKey: !1,
                            keyCode: void 0,
                            charCode: void 0
                        });
                        q(a, d.bubbles || !1, d.cancelable, window, d.ctrlKey, d.altKey, d.shiftKey, d.metaKey, d.keyCode, d.charCode);
                        break;
                    default:
                        n.initEvent(a, d.bubbles || !1, d.cancelable || !0)
                }
                e.defaults(n, f);
                c.dispatchEvent(n)
            },
            bind: function (c, a, d, b) {
                c.addEventListener ? c.addEventListener(a, d, b || !1) : c.attachEvent && c.attachEvent("on" + a, d);
                return f
            },
            unbind: function (c, a, d, b) {
                c.removeEventListener ? c.removeEventListener(a, d, b || !1) : c.detachEvent && c.detachEvent("on" + a, d);
                return f
            },
            addClass: function (a, d) {
                if (void 0 === a.className) a.className = d;
                else if (a.className !== d) {
                    var b = a.className.split(/ +/); - 1 == b.indexOf(d) && (b.push(d), a.className = b.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""))
                }
                return f
            },
            removeClass: function (a, d) {
                if (d) {
                    if (void 0 !== a.className)
                        if (a.className === d) a.removeAttribute("class");
                        else {
                            var b = a.className.split(/ +/),
                                e = b.indexOf(d); - 1 !=
                                e && (b.splice(e, 1), a.className = b.join(" "))
                        }
                } else a.className = void 0;
                return f
            },
            hasClass: function (a, d) {
                return RegExp("(?:^|\\s+)" + d + "(?:\\s+|$)").test(a.className) || !1
            },
            getWidth: function (c) {
                c = getComputedStyle(c);
                return a(c["border-left-width"]) + a(c["border-right-width"]) + a(c["padding-left"]) + a(c["padding-right"]) + a(c.width)
            },
            getHeight: function (c) {
                c = getComputedStyle(c);
                return a(c["border-top-width"]) + a(c["border-bottom-width"]) + a(c["padding-top"]) + a(c["padding-bottom"]) + a(c.height)
            },
            getOffset: function (a) {
                var d = {
                    left: 0,
                    top: 0
                };
                if (a.offsetParent) {
                    do d.left += a.offsetLeft, d.top += a.offsetTop; while (a = a.offsetParent)
                }
                return d
            },
            isActive: function (a) {
                return a === document.activeElement && (a.type || a.href)
            }
        };
    return f
}(dat.utils.common);
dat.controllers.OptionController = function (e, a, b) {
    var d = function (f, c, e) {
        d.superclass.call(this, f, c);
        var k = this;
        this.__select = document.createElement("select");
        if (b.isArray(e)) {
            var l = {};
            b.each(e, function (a) {
                l[a] = a
            });
            e = l
        }
        b.each(e, function (a, c) {
            var d = document.createElement("option");
            d.innerHTML = c;
            d.setAttribute("value", a);
            k.__select.appendChild(d)
        });
        this.updateDisplay();
        a.bind(this.__select, "change", function () {
            k.setValue(this.options[this.selectedIndex].value)
        });
        this.domElement.appendChild(this.__select)
    };
    d.superclass = e;
    b.extend(d.prototype, e.prototype, {
        setValue: function (a) {
            a = d.superclass.prototype.setValue.call(this, a);
            this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
            return a
        },
        updateDisplay: function () {
            this.__select.value = this.getValue();
            return d.superclass.prototype.updateDisplay.call(this)
        }
    });
    return d
}(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
dat.controllers.NumberController = function (e, a) {
    var b = function (d, f, c) {
        b.superclass.call(this, d, f);
        c = c || {};
        this.__min = c.min;
        this.__max = c.max;
        this.__step = c.step;
        a.isUndefined(this.__step) ? this.__impliedStep = 0 == this.initialValue ? 1 : Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10 : this.__impliedStep = this.__step;
        d = this.__impliedStep;
        d = d.toString();
        d = -1 < d.indexOf(".") ? d.length - d.indexOf(".") - 1 : 0;
        this.__precision = d
    };
    b.superclass = e;
    a.extend(b.prototype, e.prototype, {
        setValue: function (a) {
            void 0 !==
                this.__min && a < this.__min ? a = this.__min : void 0 !== this.__max && a > this.__max && (a = this.__max);
            void 0 !== this.__step && 0 != a % this.__step && (a = Math.round(a / this.__step) * this.__step);
            return b.superclass.prototype.setValue.call(this, a)
        },
        min: function (a) {
            this.__min = a;
            return this
        },
        max: function (a) {
            this.__max = a;
            return this
        },
        step: function (a) {
            this.__step = a;
            return this
        }
    });
    return b
}(dat.controllers.Controller, dat.utils.common);
dat.controllers.NumberControllerBox = function (e, a, b) {
    var d = function (f, c, e) {
        function k() {
            var a = parseFloat(n.__input.value);
            b.isNaN(a) || n.setValue(a)
        }

        function l(a) {
            var c = r - a.clientY;
            n.setValue(n.getValue() + c * n.__impliedStep);
            r = a.clientY
        }

        function q() {
            a.unbind(window, "mousemove", l);
            a.unbind(window, "mouseup", q)
        }
        this.__truncationSuspended = !1;
        d.superclass.call(this, f, c, e);
        var n = this,
            r;
        this.__input = document.createElement("input");
        this.__input.setAttribute("type", "text");
        a.bind(this.__input, "change", k);
        a.bind(this.__input,
            "blur",
            function () {
                k();
                n.__onFinishChange && n.__onFinishChange.call(n, n.getValue())
            });
        a.bind(this.__input, "mousedown", function (c) {
            a.bind(window, "mousemove", l);
            a.bind(window, "mouseup", q);
            r = c.clientY
        });
        a.bind(this.__input, "keydown", function (a) {
            13 === a.keyCode && (n.__truncationSuspended = !0, this.blur(), n.__truncationSuspended = !1)
        });
        this.updateDisplay();
        this.domElement.appendChild(this.__input)
    };
    d.superclass = e;
    b.extend(d.prototype, e.prototype, {
        updateDisplay: function () {
            var a = this.__input,
                c;
            if (this.__truncationSuspended) c =
                this.getValue();
            else {
                c = this.getValue();
                var b = Math.pow(10, this.__precision);
                c = Math.round(c * b) / b
            }
            a.value = c;
            return d.superclass.prototype.updateDisplay.call(this)
        }
    });
    return d
}(dat.controllers.NumberController, dat.dom.dom, dat.utils.common);
dat.controllers.NumberControllerSlider = function (e, a, b, d, f) {
    function c(a, c, d, b, f) {
        return b + (a - c) / (d - c) * (f - b)
    }
    var p = function (d, b, f, e, r) {
        function y(d) {
            d.preventDefault();
            var b = a.getOffset(h.__background),
                f = a.getWidth(h.__background);
            h.setValue(c(d.clientX, b.left, b.left + f, h.__min, h.__max));
            return !1
        }

        function g() {
            a.unbind(window, "mousemove", y);
            a.unbind(window, "mouseup", g);
            h.__onFinishChange && h.__onFinishChange.call(h, h.getValue())
        }
        p.superclass.call(this, d, b, {
            min: f,
            max: e,
            step: r
        });
        var h = this;
        this.__background =
            document.createElement("div");
        this.__foreground = document.createElement("div");
        a.bind(this.__background, "mousedown", function (c) {
            a.bind(window, "mousemove", y);
            a.bind(window, "mouseup", g);
            y(c)
        });
        a.addClass(this.__background, "slider");
        a.addClass(this.__foreground, "slider-fg");
        this.updateDisplay();
        this.__background.appendChild(this.__foreground);
        this.domElement.appendChild(this.__background)
    };
    p.superclass = e;
    p.useDefaultStyles = function () {
        b.inject(f)
    };
    d.extend(p.prototype, e.prototype, {
        updateDisplay: function () {
            var a =
                (this.getValue() - this.__min) / (this.__max - this.__min);
            this.__foreground.style.width = 100 * a + "%";
            return p.superclass.prototype.updateDisplay.call(this)
        }
    });
    return p
}(dat.controllers.NumberController, dat.dom.dom, dat.utils.css, dat.utils.common, "/**\n * dat-gui JavaScript Controller Library\n * http://code.google.com/p/dat-gui\n *\n * Copyright 2011 Data Arts Team, Google Creative Lab\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n */\n\n.slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");
dat.controllers.FunctionController = function (e, a, b) {
    var d = function (b, c, e) {
        d.superclass.call(this, b, c);
        var k = this;
        this.__button = document.createElement("div");
        this.__button.innerHTML = void 0 === e ? "Fire" : e;
        a.bind(this.__button, "click", function (a) {
            a.preventDefault();
            k.fire();
            return !1
        });
        a.addClass(this.__button, "button");
        this.domElement.appendChild(this.__button)
    };
    d.superclass = e;
    b.extend(d.prototype, e.prototype, {
        fire: function () {
            this.__onChange && this.__onChange.call(this);
            this.__onFinishChange && this.__onFinishChange.call(this,
                this.getValue());
            this.getValue().call(this.object)
        }
    });
    return d
}(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
dat.controllers.BooleanController = function (e, a, b) {
    var d = function (b, c) {
        d.superclass.call(this, b, c);
        var e = this;
        this.__prev = this.getValue();
        this.__checkbox = document.createElement("input");
        this.__checkbox.setAttribute("type", "checkbox");
        a.bind(this.__checkbox, "change", function () {
            e.setValue(!e.__prev)
        }, !1);
        this.domElement.appendChild(this.__checkbox);
        this.updateDisplay()
    };
    d.superclass = e;
    b.extend(d.prototype, e.prototype, {
        setValue: function (a) {
            a = d.superclass.prototype.setValue.call(this, a);
            this.__onFinishChange &&
                this.__onFinishChange.call(this, this.getValue());
            this.__prev = this.getValue();
            return a
        },
        updateDisplay: function () {
            !0 === this.getValue() ? (this.__checkbox.setAttribute("checked", "checked"), this.__checkbox.checked = !0) : this.__checkbox.checked = !1;
            return d.superclass.prototype.updateDisplay.call(this)
        }
    });
    return d
}(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
dat.color.toString = function (e) {
    return function (a) {
        if (1 == a.a || e.isUndefined(a.a)) {
            for (a = a.hex.toString(16); 6 > a.length;) a = "0" + a;
            return "#" + a
        }
        return "rgba(" + Math.round(a.r) + "," + Math.round(a.g) + "," + Math.round(a.b) + "," + a.a + ")"
    }
}(dat.utils.common);
dat.color.interpret = function (e, a) {
    var b, d, f = [{
        litmus: a.isString,
        conversions: {
            THREE_CHAR_HEX: {
                read: function (a) {
                    a = a.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                    return null === a ? !1 : {
                        space: "HEX",
                        hex: parseInt("0x" + a[1].toString() + a[1].toString() + a[2].toString() + a[2].toString() + a[3].toString() + a[3].toString())
                    }
                },
                write: e
            },
            SIX_CHAR_HEX: {
                read: function (a) {
                    a = a.match(/^#([A-F0-9]{6})$/i);
                    return null === a ? !1 : {
                        space: "HEX",
                        hex: parseInt("0x" + a[1].toString())
                    }
                },
                write: e
            },
            CSS_RGB: {
                read: function (a) {
                    a = a.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                    return null === a ? !1 : {
                        space: "RGB",
                        r: parseFloat(a[1]),
                        g: parseFloat(a[2]),
                        b: parseFloat(a[3])
                    }
                },
                write: e
            },
            CSS_RGBA: {
                read: function (a) {
                    a = a.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
                    return null === a ? !1 : {
                        space: "RGB",
                        r: parseFloat(a[1]),
                        g: parseFloat(a[2]),
                        b: parseFloat(a[3]),
                        a: parseFloat(a[4])
                    }
                },
                write: e
            }
        }
    }, {
        litmus: a.isNumber,
        conversions: {
            HEX: {
                read: function (a) {
                    return {
                        space: "HEX",
                        hex: a,
                        conversionName: "HEX"
                    }
                },
                write: function (a) {
                    return a.hex
                }
            }
        }
    }, {
        litmus: a.isArray,
        conversions: {
            RGB_ARRAY: {
                read: function (a) {
                    return 3 !=
                        a.length ? !1 : {
                            space: "RGB",
                            r: a[0],
                            g: a[1],
                            b: a[2]
                        }
                },
                write: function (a) {
                    return [a.r, a.g, a.b]
                }
            },
            RGBA_ARRAY: {
                read: function (a) {
                    return 4 != a.length ? !1 : {
                        space: "RGB",
                        r: a[0],
                        g: a[1],
                        b: a[2],
                        a: a[3]
                    }
                },
                write: function (a) {
                    return [a.r, a.g, a.b, a.a]
                }
            }
        }
    }, {
        litmus: a.isObject,
        conversions: {
            RGBA_OBJ: {
                read: function (c) {
                    return a.isNumber(c.r) && a.isNumber(c.g) && a.isNumber(c.b) && a.isNumber(c.a) ? {
                        space: "RGB",
                        r: c.r,
                        g: c.g,
                        b: c.b,
                        a: c.a
                    } : !1
                },
                write: function (a) {
                    return {
                        r: a.r,
                        g: a.g,
                        b: a.b,
                        a: a.a
                    }
                }
            },
            RGB_OBJ: {
                read: function (c) {
                    return a.isNumber(c.r) &&
                        a.isNumber(c.g) && a.isNumber(c.b) ? {
                            space: "RGB",
                            r: c.r,
                            g: c.g,
                            b: c.b
                        } : !1
                },
                write: function (a) {
                    return {
                        r: a.r,
                        g: a.g,
                        b: a.b
                    }
                }
            },
            HSVA_OBJ: {
                read: function (c) {
                    return a.isNumber(c.h) && a.isNumber(c.s) && a.isNumber(c.v) && a.isNumber(c.a) ? {
                        space: "HSV",
                        h: c.h,
                        s: c.s,
                        v: c.v,
                        a: c.a
                    } : !1
                },
                write: function (a) {
                    return {
                        h: a.h,
                        s: a.s,
                        v: a.v,
                        a: a.a
                    }
                }
            },
            HSV_OBJ: {
                read: function (d) {
                    return a.isNumber(d.h) && a.isNumber(d.s) && a.isNumber(d.v) ? {
                        space: "HSV",
                        h: d.h,
                        s: d.s,
                        v: d.v
                    } : !1
                },
                write: function (a) {
                    return {
                        h: a.h,
                        s: a.s,
                        v: a.v
                    }
                }
            }
        }
    }];
    return function () {
        d = !1;
        var c = 1 < arguments.length ? a.toArray(arguments) : arguments[0];
        a.each(f, function (e) {
            if (e.litmus(c)) return a.each(e.conversions, function (e, f) {
                b = e.read(c);
                if (!1 === d && !1 !== b) return d = b, b.conversionName = f, b.conversion = e, a.BREAK
            }), a.BREAK
        });
        return d
    }
}(dat.color.toString, dat.utils.common);
dat.GUI = dat.gui.GUI = function (e, a, b, d, f, c, p, k, l, q, n, r, y, g, h) {
    function t(a, c, b, e) {
        if (void 0 === c[b]) throw Error("Object " + c + ' has no property "' + b + '"');
        e.color ? c = new n(c, b) : (c = [c, b].concat(e.factoryArgs), c = d.apply(a, c));
        e.before instanceof f && (e.before = e.before.__li);
        v(a, c);
        g.addClass(c.domElement, "c");
        b = document.createElement("span");
        g.addClass(b, "property-name");
        b.innerHTML = c.property;
        var q = document.createElement("div");
        q.appendChild(b);
        q.appendChild(c.domElement);
        e = u(a, q, e.before);
        g.addClass(e, m.CLASS_CONTROLLER_ROW);
        g.addClass(e, typeof c.getValue());
        s(a, e, c);
        a.__controllers.push(c);
        return c
    }

    function u(a, d, c) {
        var b = document.createElement("li");
        d && b.appendChild(d);
        c ? a.__ul.insertBefore(b, params.before) : a.__ul.appendChild(b);
        a.onResize();
        return b
    }

    function s(a, d, b) {
        b.__li = d;
        b.__gui = a;
        h.extend(b, {
            options: function (d) {
                if (1 < arguments.length) return b.remove(), t(a, b.object, b.property, {
                    before: b.__li.nextElementSibling,
                    factoryArgs: [h.toArray(arguments)]
                });
                if (h.isArray(d) || h.isObject(d)) return b.remove(), t(a, b.object, b.property, {
                    before: b.__li.nextElementSibling,
                    factoryArgs: [d]
                })
            },
            name: function (a) {
                b.__li.firstElementChild.firstElementChild.innerHTML = a;
                return b
            },
            listen: function () {
                b.__gui.listen(b);
                return b
            },
            remove: function () {
                b.__gui.remove(b);
                return b
            }
        });
        if (b instanceof l) {
            var e = new k(b.object, b.property, {
                min: b.__min,
                max: b.__max,
                step: b.__step
            });
            h.each(["updateDisplay", "onChange", "onFinishChange"], function (a) {
                var d = b[a],
                    J = e[a];
                b[a] = e[a] = function () {
                    var a = Array.prototype.slice.call(arguments);
                    d.apply(b, a);
                    return J.apply(e, a)
                }
            });
            g.addClass(d, "has-slider");
            b.domElement.insertBefore(e.domElement, b.domElement.firstElementChild)
        } else if (b instanceof k) {
            var f = function (d) {
                return h.isNumber(b.__min) && h.isNumber(b.__max) ? (b.remove(), t(a, b.object, b.property, {
                    before: b.__li.nextElementSibling,
                    factoryArgs: [b.__min, b.__max, b.__step]
                })) : d
            };
            b.min = h.compose(f, b.min);
            b.max = h.compose(f, b.max)
        } else b instanceof c ? (g.bind(d, "click", function () {
                g.fakeEvent(b.__checkbox, "click")
            }), g.bind(b.__checkbox, "click", function (a) {
                a.stopPropagation()
            })) :
            b instanceof p ? (g.bind(d, "click", function () {
                g.fakeEvent(b.__button, "click")
            }), g.bind(d, "mouseover", function () {
                g.addClass(b.__button, "hover")
            }), g.bind(d, "mouseout", function () {
                g.removeClass(b.__button, "hover")
            })) : b instanceof n && (g.addClass(d, "color"), b.updateDisplay = h.compose(function (a) {
                d.style.borderLeftColor = b.__color.toString();
                return a
            }, b.updateDisplay), b.updateDisplay());
        b.setValue = h.compose(function (d) {
            a.getRoot().__preset_select && b.isModified() && D(a.getRoot(), !0);
            return d
        }, b.setValue)
    }

    function v(a,
        d) {
        var b = a.getRoot(),
            c = b.__rememberedObjects.indexOf(d.object);
        if (-1 != c) {
            var e = b.__rememberedObjectIndecesToControllers[c];
            void 0 === e && (e = {}, b.__rememberedObjectIndecesToControllers[c] = e);
            e[d.property] = d;
            if (b.load && b.load.remembered) {
                b = b.load.remembered;
                if (b[a.preset]) b = b[a.preset];
                else if (b[z]) b = b[z];
                else return;
                b[c] && void 0 !== b[c][d.property] && (c = b[c][d.property], d.initialValue = c, d.setValue(c))
            }
        }
    }

    function K(a) {
        var b = a.__save_row = document.createElement("li");
        g.addClass(a.domElement, "has-save");
        a.__ul.insertBefore(b,
            a.__ul.firstChild);
        g.addClass(b, "save-row");
        var d = document.createElement("span");
        d.innerHTML = "&nbsp;";
        g.addClass(d, "button gears");
        var c = document.createElement("span");
        c.innerHTML = "Save";
        g.addClass(c, "button");
        g.addClass(c, "save");
        var e = document.createElement("span");
        e.innerHTML = "New";
        g.addClass(e, "button");
        g.addClass(e, "save-as");
        var f = document.createElement("span");
        f.innerHTML = "Revert";
        g.addClass(f, "button");
        g.addClass(f, "revert");
        var q = a.__preset_select = document.createElement("select");
        a.load &&
            a.load.remembered ? h.each(a.load.remembered, function (b, d) {
                E(a, d, d == a.preset)
            }) : E(a, z, !1);
        g.bind(q, "change", function () {
            for (var b = 0; b < a.__preset_select.length; b++) a.__preset_select[b].innerHTML = a.__preset_select[b].value;
            a.preset = this.value
        });
        b.appendChild(q);
        b.appendChild(d);
        b.appendChild(c);
        b.appendChild(e);
        b.appendChild(f);
        if (w) {
            var b = document.getElementById("dg-save-locally"),
                n = document.getElementById("dg-local-explain");
            b.style.display = "block";
            b = document.getElementById("dg-local-storage");
            "true" ===
            localStorage.getItem(document.location.href + ".isLocal") && b.setAttribute("checked", "checked");
            var k = function () {
                n.style.display = a.useLocalStorage ? "block" : "none"
            };
            k();
            g.bind(b, "change", function () {
                a.useLocalStorage = !a.useLocalStorage;
                k()
            })
        }
        var r = document.getElementById("dg-new-constructor");
        g.bind(r, "keydown", function (a) {
            !a.metaKey || 67 !== a.which && 67 != a.keyCode || A.hide()
        });
        g.bind(d, "click", function () {
            r.innerHTML = JSON.stringify(a.getSaveObject(), void 0, 2);
            A.show();
            r.focus();
            r.select()
        });
        g.bind(c, "click",
            function () {
                a.save()
            });
        g.bind(e, "click", function () {
            var b = prompt("Enter a new preset name.");
            b && a.saveAs(b)
        });
        g.bind(f, "click", function () {
            a.revert()
        })
    }

    function L(a) {
        function b(f) {
            f.preventDefault();
            e = f.clientX;
            g.addClass(a.__closeButton, m.CLASS_DRAG);
            g.bind(window, "mousemove", d);
            g.bind(window, "mouseup", c);
            return !1
        }

        function d(b) {
            b.preventDefault();
            a.width += e - b.clientX;
            a.onResize();
            e = b.clientX;
            return !1
        }

        function c() {
            g.removeClass(a.__closeButton, m.CLASS_DRAG);
            g.unbind(window, "mousemove", d);
            g.unbind(window,
                "mouseup", c)
        }
        a.__resize_handle = document.createElement("div");
        h.extend(a.__resize_handle.style, {
            width: "6px",
            marginLeft: "-3px",
            height: "200px",
            cursor: "ew-resize",
            position: "absolute"
        });
        var e;
        g.bind(a.__resize_handle, "mousedown", b);
        g.bind(a.__closeButton, "mousedown", b);
        a.domElement.insertBefore(a.__resize_handle, a.domElement.firstElementChild)
    }

    function F(a, b) {
        a.domElement.style.width = b + "px";
        a.__save_row && a.autoPlace && (a.__save_row.style.width = b + "px");
        a.__closeButton && (a.__closeButton.style.width = b + "px")
    }

    function B(a, b) {
        var d = {};
        h.each(a.__rememberedObjects, function (c, e) {
            var f = {};
            h.each(a.__rememberedObjectIndecesToControllers[e], function (a, d) {
                f[d] = b ? a.initialValue : a.getValue()
            });
            d[e] = f
        });
        return d
    }

    function E(a, b, d) {
        var c = document.createElement("option");
        c.innerHTML = b;
        c.value = b;
        a.__preset_select.appendChild(c);
        d && (a.__preset_select.selectedIndex = a.__preset_select.length - 1)
    }

    function D(a, b) {
        var d = a.__preset_select[a.__preset_select.selectedIndex];
        d.innerHTML = b ? d.value + "*" : d.value
    }

    function G(a) {
        0 != a.length &&
            r(function () {
                G(a)
            });
        h.each(a, function (a) {
            a.updateDisplay()
        })
    }
    e.inject(b);
    var z = "Default",
        w;
    try {
        w = "localStorage" in window && null !== window.localStorage
    } catch (M) {
        w = !1
    }
    var A, H = !0,
        x, C = !1,
        I = [],
        m = function (a) {
            function b() {
                localStorage.setItem(document.location.href + ".gui", JSON.stringify(c.getSaveObject()))
            }

            function d() {
                var a = c.getRoot();
                a.width += 1;
                h.defer(function () {
                    a.width -= 1
                })
            }
            var c = this;
            this.domElement = document.createElement("div");
            this.__ul = document.createElement("ul");
            this.domElement.appendChild(this.__ul);
            g.addClass(this.domElement, "dg");
            this.__folders = {};
            this.__controllers = [];
            this.__rememberedObjects = [];
            this.__rememberedObjectIndecesToControllers = [];
            this.__listening = [];
            a = a || {};
            a = h.defaults(a, {
                autoPlace: !0,
                width: m.DEFAULT_WIDTH
            });
            a = h.defaults(a, {
                resizable: a.autoPlace,
                hideable: a.autoPlace
            });
            h.isUndefined(a.load) ? a.load = {
                preset: z
            } : a.preset && (a.load.preset = a.preset);
            h.isUndefined(a.parent) && a.hideable && I.push(this);
            a.resizable = h.isUndefined(a.parent) && a.resizable;
            a.autoPlace && h.isUndefined(a.scrollable) &&
                (a.scrollable = !0);
            var e = w && "true" === localStorage.getItem(document.location.href + ".isLocal");
            Object.defineProperties(this, {
                parent: {
                    get: function () {
                        return a.parent
                    }
                },
                scrollable: {
                    get: function () {
                        return a.scrollable
                    }
                },
                autoPlace: {
                    get: function () {
                        return a.autoPlace
                    }
                },
                preset: {
                    get: function () {
                        return c.parent ? c.getRoot().preset : a.load.preset
                    },
                    set: function (b) {
                        c.parent ? c.getRoot().preset = b : a.load.preset = b;
                        for (b = 0; b < this.__preset_select.length; b++) this.__preset_select[b].value == this.preset && (this.__preset_select.selectedIndex =
                            b);
                        c.revert()
                    }
                },
                width: {
                    get: function () {
                        return a.width
                    },
                    set: function (b) {
                        a.width = b;
                        F(c, b)
                    }
                },
                name: {
                    get: function () {
                        return a.name
                    },
                    set: function (b) {
                        a.name = b;
                        q && (q.innerHTML = a.name)
                    }
                },
                closed: {
                    get: function () {
                        return a.closed
                    },
                    set: function (b) {
                        a.closed = b;
                        a.closed ? g.addClass(c.__ul, m.CLASS_CLOSED) : g.removeClass(c.__ul, m.CLASS_CLOSED);
                        this.onResize();
                        c.__closeButton && (c.__closeButton.innerHTML = b ? m.TEXT_OPEN : m.TEXT_CLOSED)
                    }
                },
                load: {
                    get: function () {
                        return a.load
                    }
                },
                useLocalStorage: {
                    get: function () {
                        return e
                    },
                    set: function (a) {
                        w &&
                            ((e = a) ? g.bind(window, "unload", b) : g.unbind(window, "unload", b), localStorage.setItem(document.location.href + ".isLocal", a))
                    }
                }
            });
            if (h.isUndefined(a.parent)) {
                a.closed = !1;
                g.addClass(this.domElement, m.CLASS_MAIN);
                g.makeSelectable(this.domElement, !1);
                if (w && e) {
                    c.useLocalStorage = !0;
                    var f = localStorage.getItem(document.location.href + ".gui");
                    f && (a.load = JSON.parse(f))
                }
                this.__closeButton = document.createElement("div");
                this.__closeButton.innerHTML = m.TEXT_CLOSED;
                g.addClass(this.__closeButton, m.CLASS_CLOSE_BUTTON);
                this.domElement.appendChild(this.__closeButton);
                g.bind(this.__closeButton, "click", function () {
                    c.closed = !c.closed
                })
            } else {
                void 0 === a.closed && (a.closed = !0);
                var q = document.createTextNode(a.name);
                g.addClass(q, "controller-name");
                f = u(c, q);
                g.addClass(this.__ul, m.CLASS_CLOSED);
                g.addClass(f, "title");
                g.bind(f, "click", function (a) {
                    a.preventDefault();
                    c.closed = !c.closed;
                    return !1
                });
                a.closed || (this.closed = !1)
            }
            a.autoPlace && (h.isUndefined(a.parent) && (H && (x = document.createElement("div"), g.addClass(x, "dg"), g.addClass(x, m.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(x),
                H = !1), x.appendChild(this.domElement), g.addClass(this.domElement, m.CLASS_AUTO_PLACE)), this.parent || F(c, a.width));
            g.bind(window, "resize", function () {
                c.onResize()
            });
            g.bind(this.__ul, "webkitTransitionEnd", function () {
                c.onResize()
            });
            g.bind(this.__ul, "transitionend", function () {
                c.onResize()
            });
            g.bind(this.__ul, "oTransitionEnd", function () {
                c.onResize()
            });
            this.onResize();
            a.resizable && L(this);
            c.getRoot();
            a.parent || d()
        };
    m.toggleHide = function () {
        C = !C;
        h.each(I, function (a) {
            a.domElement.style.zIndex = C ? -999 : 999;
            a.domElement.style.opacity =
                C ? 0 : 1
        })
    };
    m.CLASS_AUTO_PLACE = "a";
    m.CLASS_AUTO_PLACE_CONTAINER = "ac";
    m.CLASS_MAIN = "main";
    m.CLASS_CONTROLLER_ROW = "cr";
    m.CLASS_TOO_TALL = "taller-than-window";
    m.CLASS_CLOSED = "closed";
    m.CLASS_CLOSE_BUTTON = "close-button";
    m.CLASS_DRAG = "drag";
    m.DEFAULT_WIDTH = 245;
    m.TEXT_CLOSED = "Close Controls";
    m.TEXT_OPEN = "Open Controls";
    g.bind(window, "keydown", function (a) {
        "text" === document.activeElement.type || 72 !== a.which && 72 != a.keyCode || m.toggleHide()
    }, !1);
    h.extend(m.prototype, {
        add: function (a, b) {
            return t(this, a, b, {
                factoryArgs: Array.prototype.slice.call(arguments,
                    2)
            })
        },
        addColor: function (a, b) {
            return t(this, a, b, {
                color: !0
            })
        },
        remove: function (a) {
            this.__ul.removeChild(a.__li);
            this.__controllers.slice(this.__controllers.indexOf(a), 1);
            var b = this;
            h.defer(function () {
                b.onResize()
            })
        },
        destroy: function () {
            this.autoPlace && x.removeChild(this.domElement)
        },
        addFolder: function (a) {
            if (void 0 !== this.__folders[a]) throw Error('You already have a folder in this GUI by the name "' + a + '"');
            var b = {
                name: a,
                parent: this
            };
            b.autoPlace = this.autoPlace;
            this.load && this.load.folders && this.load.folders[a] &&
                (b.closed = this.load.folders[a].closed, b.load = this.load.folders[a]);
            b = new m(b);
            this.__folders[a] = b;
            a = u(this, b.domElement);
            g.addClass(a, "folder");
            return b
        },
        open: function () {
            this.closed = !1
        },
        close: function () {
            this.closed = !0
        },
        onResize: function () {
            var a = this.getRoot();
            if (a.scrollable) {
                var b = g.getOffset(a.__ul).top,
                    d = 0;
                h.each(a.__ul.childNodes, function (b) {
                    a.autoPlace && b === a.__save_row || (d += g.getHeight(b))
                });
                window.innerHeight - b - 20 < d ? (g.addClass(a.domElement, m.CLASS_TOO_TALL), a.__ul.style.height = window.innerHeight -
                    b - 20 + "px") : (g.removeClass(a.domElement, m.CLASS_TOO_TALL), a.__ul.style.height = "auto")
            }
            a.__resize_handle && h.defer(function () {
                a.__resize_handle.style.height = a.__ul.offsetHeight + "px"
            });
            a.__closeButton && (a.__closeButton.style.width = a.width + "px")
        },
        remember: function () {
            h.isUndefined(A) && (A = new y, A.domElement.innerHTML = a);
            if (this.parent) throw Error("You can only call remember on a top level GUI.");
            var b = this;
            h.each(Array.prototype.slice.call(arguments), function (a) {
                0 == b.__rememberedObjects.length && K(b); - 1 ==
                    b.__rememberedObjects.indexOf(a) && b.__rememberedObjects.push(a)
            });
            this.autoPlace && F(this, this.width)
        },
        getRoot: function () {
            for (var a = this; a.parent;) a = a.parent;
            return a
        },
        getSaveObject: function () {
            var a = this.load;
            a.closed = this.closed;
            0 < this.__rememberedObjects.length && (a.preset = this.preset, a.remembered || (a.remembered = {}), a.remembered[this.preset] = B(this));
            a.folders = {};
            h.each(this.__folders, function (b, d) {
                a.folders[d] = b.getSaveObject()
            });
            return a
        },
        save: function () {
            this.load.remembered || (this.load.remembered = {});
            this.load.remembered[this.preset] = B(this);
            D(this, !1)
        },
        saveAs: function (a) {
            this.load.remembered || (this.load.remembered = {}, this.load.remembered[z] = B(this, !0));
            this.load.remembered[a] = B(this);
            this.preset = a;
            E(this, a, !0)
        },
        revert: function (a) {
            h.each(this.__controllers, function (b) {
                this.getRoot().load.remembered ? v(a || this.getRoot(), b) : b.setValue(b.initialValue)
            }, this);
            h.each(this.__folders, function (a) {
                a.revert(a)
            });
            a || D(this.getRoot(), !1)
        },
        listen: function (a) {
            var b = 0 == this.__listening.length;
            this.__listening.push(a);
            b && G(this.__listening)
        }
    });
    return m
}(dat.utils.css, '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>',
    ".dg {\n  /** Clear list styles */\n  /* Auto-place container */\n  /* Auto-placed GUI's */\n  /* Line items that don't contain folders. */\n  /** Folder names */\n  /** Hides closed items */\n  /** Controller row */\n  /** Name-half (left) */\n  /** Controller-half (right) */\n  /** Controller placement */\n  /** Shorter number boxes when slider is present. */\n  /** Ensure the entire boolean and function row shows a hand */ }\n  .dg ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    clear: both; }\n  .dg.ac {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 0;\n    z-index: 0; }\n  .dg:not(.ac) .main {\n    /** Exclude mains in ac so that we don't hide close button */\n    overflow: hidden; }\n  .dg.main {\n    -webkit-transition: opacity 0.1s linear;\n    -o-transition: opacity 0.1s linear;\n    -moz-transition: opacity 0.1s linear;\n    transition: opacity 0.1s linear; }\n    .dg.main.taller-than-window {\n      overflow-y: auto; }\n      .dg.main.taller-than-window .close-button {\n        opacity: 1;\n        /* TODO, these are style notes */\n        margin-top: -1px;\n        border-top: 1px solid #2c2c2c; }\n    .dg.main ul.closed .close-button {\n      opacity: 1 !important; }\n    .dg.main:hover .close-button,\n    .dg.main .close-button.drag {\n      opacity: 1; }\n    .dg.main .close-button {\n      /*opacity: 0;*/\n      -webkit-transition: opacity 0.1s linear;\n      -o-transition: opacity 0.1s linear;\n      -moz-transition: opacity 0.1s linear;\n      transition: opacity 0.1s linear;\n      border: 0;\n      position: absolute;\n      line-height: 19px;\n      height: 20px;\n      /* TODO, these are style notes */\n      cursor: pointer;\n      text-align: center;\n      background-color: #000; }\n      .dg.main .close-button:hover {\n        background-color: #111; }\n  .dg.a {\n    float: right;\n    margin-right: 15px;\n    overflow-x: hidden; }\n    .dg.a.has-save > ul {\n      margin-top: 27px; }\n      .dg.a.has-save > ul.closed {\n        margin-top: 0; }\n    .dg.a .save-row {\n      position: fixed;\n      top: 0;\n      z-index: 1002; }\n  .dg li {\n    -webkit-transition: height 0.1s ease-out;\n    -o-transition: height 0.1s ease-out;\n    -moz-transition: height 0.1s ease-out;\n    transition: height 0.1s ease-out; }\n  .dg li:not(.folder) {\n    cursor: auto;\n    height: 27px;\n    line-height: 27px;\n    overflow: hidden;\n    padding: 0 4px 0 5px; }\n  .dg li.folder {\n    padding: 0;\n    border-left: 4px solid rgba(0, 0, 0, 0); }\n  .dg li.title {\n    cursor: pointer;\n    margin-left: -4px; }\n  .dg .closed li:not(.title),\n  .dg .closed ul li,\n  .dg .closed ul li > * {\n    height: 0;\n    overflow: hidden;\n    border: 0; }\n  .dg .cr {\n    clear: both;\n    padding-left: 3px;\n    height: 27px; }\n  .dg .property-name {\n    cursor: default;\n    float: left;\n    clear: left;\n    width: 40%;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .dg .c {\n    float: left;\n    width: 60%; }\n  .dg .c input[type=text] {\n    border: 0;\n    margin-top: 4px;\n    padding: 3px;\n    width: 100%;\n    float: right; }\n  .dg .has-slider input[type=text] {\n    width: 30%;\n    /*display: none;*/\n    margin-left: 0; }\n  .dg .slider {\n    float: left;\n    width: 66%;\n    margin-left: -5px;\n    margin-right: 0;\n    height: 19px;\n    margin-top: 4px; }\n  .dg .slider-fg {\n    height: 100%; }\n  .dg .c input[type=checkbox] {\n    margin-top: 9px; }\n  .dg .c select {\n    margin-top: 5px; }\n  .dg .cr.function,\n  .dg .cr.function .property-name,\n  .dg .cr.function *,\n  .dg .cr.boolean,\n  .dg .cr.boolean * {\n    cursor: pointer; }\n  .dg .selector {\n    display: none;\n    position: absolute;\n    margin-left: -9px;\n    margin-top: 23px;\n    z-index: 10; }\n  .dg .c:hover .selector,\n  .dg .selector.drag {\n    display: block; }\n  .dg li.save-row {\n    padding: 0; }\n    .dg li.save-row .button {\n      display: inline-block;\n      padding: 0px 6px; }\n  .dg.dialogue {\n    background-color: #222;\n    width: 460px;\n    padding: 15px;\n    font-size: 13px;\n    line-height: 15px; }\n\n/* TODO Separate style and structure */\n#dg-new-constructor {\n  padding: 10px;\n  color: #222;\n  font-family: Monaco, monospace;\n  font-size: 10px;\n  border: 0;\n  resize: none;\n  box-shadow: inset 1px 1px 1px #888;\n  word-wrap: break-word;\n  margin: 12px 0;\n  display: block;\n  width: 440px;\n  overflow-y: scroll;\n  height: 100px;\n  position: relative; }\n\n#dg-local-explain {\n  display: none;\n  font-size: 11px;\n  line-height: 17px;\n  border-radius: 3px;\n  background-color: #333;\n  padding: 8px;\n  margin-top: 10px; }\n  #dg-local-explain code {\n    font-size: 10px; }\n\n#dat-gui-save-locally {\n  display: none; }\n\n/** Main type */\n.dg {\n  color: #eee;\n  font: 11px 'Lucida Grande', sans-serif;\n  text-shadow: 0 -1px 0 #111;\n  /** Auto place */\n  /* Controller row, <li> */\n  /** Controllers */ }\n  .dg.main {\n    /** Scrollbar */ }\n    .dg.main::-webkit-scrollbar {\n      width: 5px;\n      background: #1a1a1a; }\n    .dg.main::-webkit-scrollbar-corner {\n      height: 0;\n      display: none; }\n    .dg.main::-webkit-scrollbar-thumb {\n      border-radius: 5px;\n      background: #676767; }\n  .dg li:not(.folder) {\n    background: #1a1a1a;\n    border-bottom: 1px solid #2c2c2c; }\n  .dg li.save-row {\n    line-height: 25px;\n    background: #dad5cb;\n    border: 0; }\n    .dg li.save-row select {\n      margin-left: 5px;\n      width: 108px; }\n    .dg li.save-row .button {\n      margin-left: 5px;\n      margin-top: 1px;\n      border-radius: 2px;\n      font-size: 9px;\n      line-height: 7px;\n      padding: 4px 4px 5px 4px;\n      background: #c5bdad;\n      color: #fff;\n      text-shadow: 0 1px 0 #b0a58f;\n      box-shadow: 0 -1px 0 #b0a58f;\n      cursor: pointer; }\n      .dg li.save-row .button.gears {\n        background: #c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;\n        height: 7px;\n        width: 8px; }\n      .dg li.save-row .button:hover {\n        background-color: #bab19e;\n        box-shadow: 0 -1px 0 #b0a58f; }\n  .dg li.folder {\n    border-bottom: 0; }\n  .dg li.title {\n    padding-left: 16px;\n    background: black url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;\n    cursor: pointer;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2); }\n  .dg .closed li.title {\n    background-image: url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==); }\n  .dg .cr.boolean {\n    border-left: 3px solid #806787; }\n  .dg .cr.function {\n    border-left: 3px solid #e61d5f; }\n  .dg .cr.number {\n    border-left: 3px solid #2fa1d6; }\n    .dg .cr.number input[type=text] {\n      color: #2fa1d6; }\n  .dg .cr.string {\n    border-left: 3px solid #1ed36f; }\n    .dg .cr.string input[type=text] {\n      color: #1ed36f; }\n  .dg .cr.function:hover, .dg .cr.boolean:hover {\n    background: #111; }\n  .dg .c input[type=text] {\n    background: #303030;\n    outline: none; }\n    .dg .c input[type=text]:hover {\n      background: #3c3c3c; }\n    .dg .c input[type=text]:focus {\n      background: #494949;\n      color: #fff; }\n  .dg .c .slider {\n    background: #303030;\n    cursor: ew-resize; }\n  .dg .c .slider-fg {\n    background: #2fa1d6; }\n  .dg .c .slider:hover {\n    background: #3c3c3c; }\n    .dg .c .slider:hover .slider-fg {\n      background: #44abda; }\n",
    dat.controllers.factory = function (e, a, b, d, f, c, p) {
        return function (k, l, q, n) {
            var r = k[l];
            if (p.isArray(q) || p.isObject(q)) return new e(k, l, q);
            if (p.isNumber(r)) return p.isNumber(q) && p.isNumber(n) ? new b(k, l, q, n) : new a(k, l, {
                min: q,
                max: n
            });
            if (p.isString(r)) return new d(k, l);
            if (p.isFunction(r)) return new f(k, l, "");
            if (p.isBoolean(r)) return new c(k, l)
        }
    }(dat.controllers.OptionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.StringController = function (e, a, b) {
        var d =
            function (b, c) {
                function e() {
                    k.setValue(k.__input.value)
                }
                d.superclass.call(this, b, c);
                var k = this;
                this.__input = document.createElement("input");
                this.__input.setAttribute("type", "text");
                a.bind(this.__input, "keyup", e);
                a.bind(this.__input, "change", e);
                a.bind(this.__input, "blur", function () {
                    k.__onFinishChange && k.__onFinishChange.call(k, k.getValue())
                });
                a.bind(this.__input, "keydown", function (a) {
                    13 === a.keyCode && this.blur()
                });
                this.updateDisplay();
                this.domElement.appendChild(this.__input)
            };
        d.superclass = e;
        b.extend(d.prototype,
            e.prototype, {
                updateDisplay: function () {
                    a.isActive(this.__input) || (this.__input.value = this.getValue());
                    return d.superclass.prototype.updateDisplay.call(this)
                }
            });
        return d
    }(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.FunctionController, dat.controllers.BooleanController, dat.utils.common), dat.controllers.Controller, dat.controllers.BooleanController, dat.controllers.FunctionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.OptionController,
    dat.controllers.ColorController = function (e, a, b, d, f) {
        function c(a, b, d, c) {
            a.style.background = "";
            f.each(l, function (e) {
                a.style.cssText += "background: " + e + "linear-gradient(" + b + ", " + d + " 0%, " + c + " 100%); "
            })
        }

        function p(a) {
            a.style.background = "";
            a.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);";
            a.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
            a.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
            a.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
            a.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"
        }
        var k = function (e, n) {
            function r(b) {
                t(b);
                a.bind(window, "mousemove", t);
                a.bind(window,
                    "mouseup", l)
            }

            function l() {
                a.unbind(window, "mousemove", t);
                a.unbind(window, "mouseup", l)
            }

            function g() {
                var a = d(this.value);
                !1 !== a ? (s.__color.__state = a, s.setValue(s.__color.toOriginal())) : this.value = s.__color.toString()
            }

            function h() {
                a.unbind(window, "mousemove", u);
                a.unbind(window, "mouseup", h)
            }

            function t(b) {
                b.preventDefault();
                var d = a.getWidth(s.__saturation_field),
                    c = a.getOffset(s.__saturation_field),
                    e = (b.clientX - c.left + document.body.scrollLeft) / d;
                b = 1 - (b.clientY - c.top + document.body.scrollTop) / d;
                1 < b ? b = 1 : 0 >
                    b && (b = 0);
                1 < e ? e = 1 : 0 > e && (e = 0);
                s.__color.v = b;
                s.__color.s = e;
                s.setValue(s.__color.toOriginal());
                return !1
            }

            function u(b) {
                b.preventDefault();
                var d = a.getHeight(s.__hue_field),
                    c = a.getOffset(s.__hue_field);
                b = 1 - (b.clientY - c.top + document.body.scrollTop) / d;
                1 < b ? b = 1 : 0 > b && (b = 0);
                s.__color.h = 360 * b;
                s.setValue(s.__color.toOriginal());
                return !1
            }
            k.superclass.call(this, e, n);
            this.__color = new b(this.getValue());
            this.__temp = new b(0);
            var s = this;
            this.domElement = document.createElement("div");
            a.makeSelectable(this.domElement, !1);
            this.__selector = document.createElement("div");
            this.__selector.className = "selector";
            this.__saturation_field = document.createElement("div");
            this.__saturation_field.className = "saturation-field";
            this.__field_knob = document.createElement("div");
            this.__field_knob.className = "field-knob";
            this.__field_knob_border = "2px solid ";
            this.__hue_knob = document.createElement("div");
            this.__hue_knob.className = "hue-knob";
            this.__hue_field = document.createElement("div");
            this.__hue_field.className = "hue-field";
            this.__input = document.createElement("input");
            this.__input.type = "text";
            this.__input_textShadow = "0 1px 1px ";
            a.bind(this.__input, "keydown", function (a) {
                13 === a.keyCode && g.call(this)
            });
            a.bind(this.__input, "blur", g);
            a.bind(this.__selector, "mousedown", function (b) {
                a.addClass(this, "drag").bind(window, "mouseup", function (b) {
                    a.removeClass(s.__selector, "drag")
                })
            });
            var v = document.createElement("div");
            f.extend(this.__selector.style, {
                width: "122px",
                height: "102px",
                padding: "3px",
                backgroundColor: "#222",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
            });
            f.extend(this.__field_knob.style, {
                position: "absolute",
                width: "12px",
                height: "12px",
                border: this.__field_knob_border + (0.5 > this.__color.v ? "#fff" : "#000"),
                boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
                borderRadius: "12px",
                zIndex: 1
            });
            f.extend(this.__hue_knob.style, {
                position: "absolute",
                width: "15px",
                height: "2px",
                borderRight: "4px solid #fff",
                zIndex: 1
            });
            f.extend(this.__saturation_field.style, {
                width: "100px",
                height: "100px",
                border: "1px solid #555",
                marginRight: "3px",
                display: "inline-block",
                cursor: "pointer"
            });
            f.extend(v.style, {
                width: "100%",
                height: "100%",
                background: "none"
            });
            c(v, "top", "rgba(0,0,0,0)", "#000");
            f.extend(this.__hue_field.style, {
                width: "15px",
                height: "100px",
                display: "inline-block",
                border: "1px solid #555",
                cursor: "ns-resize"
            });
            p(this.__hue_field);
            f.extend(this.__input.style, {
                outline: "none",
                textAlign: "center",
                color: "#fff",
                border: 0,
                fontWeight: "bold",
                textShadow: this.__input_textShadow + "rgba(0,0,0,0.7)"
            });
            a.bind(this.__saturation_field, "mousedown", r);
            a.bind(this.__field_knob, "mousedown", r);
            a.bind(this.__hue_field, "mousedown", function (b) {
                u(b);
                a.bind(window,
                    "mousemove", u);
                a.bind(window, "mouseup", h)
            });
            this.__saturation_field.appendChild(v);
            this.__selector.appendChild(this.__field_knob);
            this.__selector.appendChild(this.__saturation_field);
            this.__selector.appendChild(this.__hue_field);
            this.__hue_field.appendChild(this.__hue_knob);
            this.domElement.appendChild(this.__input);
            this.domElement.appendChild(this.__selector);
            this.updateDisplay()
        };
        k.superclass = e;
        f.extend(k.prototype, e.prototype, {
            updateDisplay: function () {
                var a = d(this.getValue());
                if (!1 !== a) {
                    var e = !1;
                    f.each(b.COMPONENTS, function (b) {
                        if (!f.isUndefined(a[b]) && !f.isUndefined(this.__color.__state[b]) && a[b] !== this.__color.__state[b]) return e = !0, {}
                    }, this);
                    e && f.extend(this.__color.__state, a)
                }
                f.extend(this.__temp.__state, this.__color.__state);
                this.__temp.a = 1;
                var k = 0.5 > this.__color.v || 0.5 < this.__color.s ? 255 : 0,
                    l = 255 - k;
                f.extend(this.__field_knob.style, {
                    marginLeft: 100 * this.__color.s - 7 + "px",
                    marginTop: 100 * (1 - this.__color.v) - 7 + "px",
                    backgroundColor: this.__temp.toString(),
                    border: this.__field_knob_border + "rgb(" +
                        k + "," + k + "," + k + ")"
                });
                this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px";
                this.__temp.s = 1;
                this.__temp.v = 1;
                c(this.__saturation_field, "left", "#fff", this.__temp.toString());
                f.extend(this.__input.style, {
                    backgroundColor: this.__input.value = this.__color.toString(),
                    color: "rgb(" + k + "," + k + "," + k + ")",
                    textShadow: this.__input_textShadow + "rgba(" + l + "," + l + "," + l + ",.7)"
                })
            }
        });
        var l = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
        return k
    }(dat.controllers.Controller, dat.dom.dom, dat.color.Color = function (e, a, b, d) {
        function f(a,
            b, d) {
            Object.defineProperty(a, b, {
                get: function () {
                    if ("RGB" === this.__state.space) return this.__state[b];
                    p(this, b, d);
                    return this.__state[b]
                },
                set: function (a) {
                    "RGB" !== this.__state.space && (p(this, b, d), this.__state.space = "RGB");
                    this.__state[b] = a
                }
            })
        }

        function c(a, b) {
            Object.defineProperty(a, b, {
                get: function () {
                    if ("HSV" === this.__state.space) return this.__state[b];
                    k(this);
                    return this.__state[b]
                },
                set: function (a) {
                    "HSV" !== this.__state.space && (k(this), this.__state.space = "HSV");
                    this.__state[b] = a
                }
            })
        }

        function p(b, c, e) {
            if ("HEX" ===
                b.__state.space) b.__state[c] = a.component_from_hex(b.__state.hex, e);
            else if ("HSV" === b.__state.space) d.extend(b.__state, a.hsv_to_rgb(b.__state.h, b.__state.s, b.__state.v));
            else throw "Corrupted color state";
        }

        function k(b) {
            var c = a.rgb_to_hsv(b.r, b.g, b.b);
            d.extend(b.__state, {
                s: c.s,
                v: c.v
            });
            d.isNaN(c.h) ? d.isUndefined(b.__state.h) && (b.__state.h = 0) : b.__state.h = c.h
        }
        var l = function () {
            this.__state = e.apply(this, arguments);
            if (!1 === this.__state) throw "Failed to interpret color arguments";
            this.__state.a = this.__state.a ||
                1
        };
        l.COMPONENTS = "r g b h s v hex a".split(" ");
        d.extend(l.prototype, {
            toString: function () {
                return b(this)
            },
            toOriginal: function () {
                return this.__state.conversion.write(this)
            }
        });
        f(l.prototype, "r", 2);
        f(l.prototype, "g", 1);
        f(l.prototype, "b", 0);
        c(l.prototype, "h");
        c(l.prototype, "s");
        c(l.prototype, "v");
        Object.defineProperty(l.prototype, "a", {
            get: function () {
                return this.__state.a
            },
            set: function (a) {
                this.__state.a = a
            }
        });
        Object.defineProperty(l.prototype, "hex", {
            get: function () {
                "HEX" !== !this.__state.space && (this.__state.hex =
                    a.rgb_to_hex(this.r, this.g, this.b));
                return this.__state.hex
            },
            set: function (a) {
                this.__state.space = "HEX";
                this.__state.hex = a
            }
        });
        return l
    }(dat.color.interpret, dat.color.math = function () {
        var e;
        return {
            hsv_to_rgb: function (a, b, d) {
                var e = a / 60 - Math.floor(a / 60),
                    c = d * (1 - b),
                    p = d * (1 - e * b);
                b = d * (1 - (1 - e) * b);
                a = [
                    [d, b, c],
                    [p, d, c],
                    [c, d, b],
                    [c, p, d],
                    [b, c, d],
                    [d, c, p]
                ][Math.floor(a / 60) % 6];
                return {
                    r: 255 * a[0],
                    g: 255 * a[1],
                    b: 255 * a[2]
                }
            },
            rgb_to_hsv: function (a, b, d) {
                var e = Math.min(a, b, d),
                    c = Math.max(a, b, d),
                    e = c - e;
                if (0 == c) return {
                    h: NaN,
                    s: 0,
                    v: 0
                };
                a = (a == c ? (b - d) / e : b == c ? 2 + (d - a) / e : 4 + (a - b) / e) / 6;
                0 > a && (a += 1);
                return {
                    h: 360 * a,
                    s: e / c,
                    v: c / 255
                }
            },
            rgb_to_hex: function (a, b, d) {
                a = this.hex_with_component(0, 2, a);
                a = this.hex_with_component(a, 1, b);
                return a = this.hex_with_component(a, 0, d)
            },
            component_from_hex: function (a, b) {
                return a >> 8 * b & 255
            },
            hex_with_component: function (a, b, d) {
                return d << (e = 8 * b) | a & ~(255 << e)
            }
        }
    }(), dat.color.toString, dat.utils.common), dat.color.interpret, dat.utils.common), dat.utils.requestAnimationFrame = function () {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e, a) {
                window.setTimeout(e, 1E3 / 60)
            }
    }(), dat.dom.CenteredDiv = function (e, a) {
        var b = function () {
            this.backgroundElement = document.createElement("div");
            a.extend(this.backgroundElement.style, {
                backgroundColor: "rgba(0,0,0,0.8)",
                top: 0,
                left: 0,
                display: "none",
                zIndex: "1000",
                opacity: 0,
                WebkitTransition: "opacity 0.2s linear"
            });
            e.makeFullscreen(this.backgroundElement);
            this.backgroundElement.style.position = "fixed";
            this.domElement =
                document.createElement("div");
            a.extend(this.domElement.style, {
                position: "fixed",
                display: "none",
                zIndex: "1001",
                opacity: 0,
                WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear"
            });
            document.body.appendChild(this.backgroundElement);
            document.body.appendChild(this.domElement);
            var b = this;
            e.bind(this.backgroundElement, "click", function () {
                b.hide()
            })
        };
        b.prototype.show = function () {
            var b = this;
            this.backgroundElement.style.display = "block";
            this.domElement.style.display = "block";
            this.domElement.style.opacity =
                0;
            this.domElement.style.webkitTransform = "scale(1.1)";
            this.layout();
            a.defer(function () {
                b.backgroundElement.style.opacity = 1;
                b.domElement.style.opacity = 1;
                b.domElement.style.webkitTransform = "scale(1)"
            })
        };
        b.prototype.hide = function () {
            var a = this,
                b = function () {
                    a.domElement.style.display = "none";
                    a.backgroundElement.style.display = "none";
                    e.unbind(a.domElement, "webkitTransitionEnd", b);
                    e.unbind(a.domElement, "transitionend", b);
                    e.unbind(a.domElement, "oTransitionEnd", b)
                };
            e.bind(this.domElement, "webkitTransitionEnd",
                b);
            e.bind(this.domElement, "transitionend", b);
            e.bind(this.domElement, "oTransitionEnd", b);
            this.backgroundElement.style.opacity = 0;
            this.domElement.style.opacity = 0;
            this.domElement.style.webkitTransform = "scale(1.1)"
        };
        b.prototype.layout = function () {
            this.domElement.style.left = window.innerWidth / 2 - e.getWidth(this.domElement) / 2 + "px";
            this.domElement.style.top = window.innerHeight / 2 - e.getHeight(this.domElement) / 2 + "px"
        };
        return b
    }(dat.dom.dom, dat.utils.common), dat.dom.dom, dat.utils.common);