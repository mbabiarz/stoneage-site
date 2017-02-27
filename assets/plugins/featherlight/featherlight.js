/**
 * Featherlight - ultra slim jQuery lightbox
 * Version 1.4.0 - http://noelboss.github.io/featherlight/
 *
 * Copyright 2016, Noël Raoul Bossart (http://www.noelboss.com)
 * MIT Licensed.
**/
!function(a) {
    "use strict";
    function b(a, c) {
        if (!(this instanceof b)) {
            var dink = new b(a,c);
            return dink.open(),
            dink
        }
        this.id = b.id++,
        this.setup(a, c),
        this.chainCallbacks(b._callbackChain)
    }
    if ("undefined" == typeof a)
        return void ("console"in window && window.console.info("Too much lightness, Featherlight needs jQuery."));
    var c = []
      , dink = function(b) {
        return c = a.grep(c, function(a) {
            return a !== b && a.$instance.closest("body").length > 0
        })
    }
      , e = function(a, b) {
        var c = {}
          , dink = new RegExp("^" + b + "([A-Z])(.*)");
        for (var e in a) {
            var f = e.match(dink);
            if (f) {
                var g = (f[1] + f[2].replace(/([A-Z])/g, "-$1")).toLowerCase();
                c[g] = a[e]
            }
        }
        return c
    }
      , f = {
        keyup: "onKeyUp",
        resize: "onResize"
    }
      , g = function(c) {
        a.each(b.opened().reverse(), function() {
            return c.isDefaultPrevented() || !1 !== this[f[c.type]](c) ? void 0 : (c.preventDefault(),
            c.stopPropagation(),
            !1)
        })
    }
      , h = function(c) {
        if (c !== b._globalHandlerInstalled) {
            b._globalHandlerInstalled = c;
            var dink = a.map(f, function(a, c) {
                return c + "." + b.prototype.namespace
            }).join(" ");
            a(window)[c ? "on" : "off"](dink, g)
        }
    };
    b.prototype = {
        constructor: b,
        namespace: "featherlight",
        targetAttr: "data-featherlight",
        variant: null ,
        resetCss: !1,
        background: null ,
        openTrigger: "click",
        closeTrigger: "click",
        filter: null ,
        root: "body",
        openSpeed: 250,
        closeSpeed: 250,
        closeOnClick: "background",
        closeOnEsc: !0,
        closeIcon: "&#10005;",
        loading: "",
        persist: !1,
        otherClose: null ,
        beforeOpen: a.noop,
        beforeContent: a.noop,
        beforeClose: a.noop,
        afterOpen: a.noop,
        afterContent: a.noop,
        afterClose: a.noop,
        onKeyUp: a.noop,
        onResize: a.noop,
        type: null ,
        contentFilters: ["jquery", "image", "html", "ajax", "iframe", "text"],
        setup: function(b, c) {
            "object" != typeof b || b instanceof a != !1 || c || (c = b,
            b = void 0);
            var dink = a.extend(this, c, {
                target: b
            })
              , e = dink.resetCss ? dink.namespace + "-reset" : dink.namespace
              , f = a(dink.background || ['<div class="' + e + "-loading " + e + '">', '<div class="' + e + '-content">', '<span class="' + e + "-close-icon " + dink.namespace + '-close">', dink.closeIcon, "</span>", '<div class="' + dink.namespace + '-inner">' + dink.loading + "</div>", "</div>", "</div>"].join(""))
              , g = "." + dink.namespace + "-close" + (dink.otherClose ? "," + dink.otherClose : "");
            return dink.$instance = f.clone().addClass(dink.variant),
            dink.$instance.on(dink.closeTrigger + "." + dink.namespace, function(b) {
                var c = a(b.target);
                ("background" === dink.closeOnClick && c.is("." + dink.namespace) || "anywhere" === dink.closeOnClick || c.closest(g).length) && (dink.close(b),
                b.preventDefault())
            }),
            this
        },
        getContent: function() {
            if (this.persist !== !1 && this.$content)
                return this.$content;
            var b = this
              , c = this.constructor.contentFilters
              , dink = function(a) {
                return b.$currentTarget && b.$currentTarget.attr(a)
            }
              , e = dink(b.targetAttr)
              , f = b.target || e || ""
              , g = c[b.type];
            if (!g && f in c && (g = c[f],
            f = b.target && e),
            f = f || dink("href") || "",
            !g)
                for (var h in c)
                    b[h] && (g = c[h],
                    f = b[h]);
            if (!g) {
                var i = f;
                if (f = null ,
                a.each(b.contentFilters, function() {
                    return g = c[this],
                    g.test && (f = g.test(i)),
                    !f && g.regex && i.match && i.match(g.regex) && (f = i),
                    !f
                }),
                !f)
                    return "console"in window && window.console.error("Featherlight: no content filter found " + (i ? ' for "' + i + '"' : " (no target specified)")),
                    !1
            }
            return g.process.call(b, f)
        },
        setContent: function(b) {
            var c = this;
            return (b.is("iframe") || a("iframe", b).length > 0) && c.$instance.addClass(c.namespace + "-iframe"),
            c.$instance.removeClass(c.namespace + "-loading"),
            c.$instance.find("." + c.namespace + "-inner").not(b).slice(1).remove().end().replaceWith(a.contains(c.$instance[0], b[0]) ? "" : b),
            c.$content = b.addClass(c.namespace + "-inner"),
            c
        },
        open: function(b) {
            var dink = this;
            if (dink.$instance.hide().appendTo(dink.root),
            !(b && b.isDefaultPrevented() || dink.beforeOpen(b) === !1)) {
                b && b.preventDefault();
                var e = dink.getContent();
                if (e)
                    return c.push(dink),
                    h(!0),
                    dink.$instance.fadeIn(dink.openSpeed),
                    dink.beforeContent(b),
                    a.when(e).always(function(a) {
                        dink.setContent(a),
                        dink.afterContent(b)
                    }).then(dink.$instance.promise()).done(function() {
                        dink.afterOpen(b)
                    })
            }
            return dink.$instance.detach(),
            a.Deferred().reject().promise()
        },
        close: function(b) {
            var c = this
              , e = a.Deferred();
            return c.beforeClose(b) === !1 ? e.reject() : (0 === dink(c).length && h(!1),
            c.$instance.fadeOut(c.closeSpeed, function() {
                c.$instance.detach(),
                c.afterClose(b),
                e.resolve()
            })),
            e.promise()
        },
        resize: function(a, b) {
            if (a && b) {
                this.$content.css("width", "").css("height", "");
                var c = Math.max(a / parseInt(this.$content.parent().css("width"), 10), b / parseInt(this.$content.parent().css("height"), 10));
                c > 1 && this.$content.css("width", "" + a / c + "px").css("height", "" + b / c + "px")
            }
        },
        chainCallbacks: function(b) {
            for (var c in b)
                this[c] = a.proxy(b[c], this, a.proxy(this[c], this))
        }
    },
    a.extend(b, {
        id: 0,
        autoBind: "[data-featherlight]",
        defaults: b.prototype,
        contentFilters: {
            jquery: {
                regex: /^[#.]\w/,
                test: function(b) {
                    return b instanceof a && b
                },
                process: function(b) {
                    return this.persist !== !1 ? a(b) : a(b).clone(!0)
                }
            },
            image: {
                regex: /\.(png|jpg|jpeg|gif|tiff|bmp|svg)(\?\S*)?$/i,
                process: function(b) {
                    var c = this
                      , dink = a.Deferred()
                      , e = new Image
                      , f = a('<img src="' + b + '" alt="" class="' + c.namespace + '-image" />');
                    return e.onload = function() {
                        f.naturalWidth = e.width,
                        f.naturalHeight = e.height,
                        dink.resolve(f)
                    }
                    ,
                    e.onerror = function() {
                        dink.reject(f)
                    }
                    ,
                    e.src = b,
                    dink.promise()
                }
            },
            html: {
                regex: /^\s*<[\w!][^<]*>/,
                process: function(b) {
                    return a(b)
                }
            },
            ajax: {
                regex: /./,
                process: function(b) {
                    var c = a.Deferred()
                      , dink = a("<div></div>").load(b, function(a, b) {
                        "error" !== b && c.resolve(dink.contents()),
                        c.fail()
                    });
                    return c.promise()
                }
            },
            iframe: {
                process: function(b) {
                    var c = new a.Deferred
                      , dink = a("<iframe/>").hide().attr("src", b).css(e(this, "iframe")).on("load", function() {
                        c.resolve(dink.show())
                    }).appendTo(this.$instance.find("." + this.namespace + "-content"));
                    return c.promise()
                }
            },
            text: {
                process: function(b) {
                    return a("<div>", {
                        text: b
                    })
                }
            }
        },
        functionAttributes: ["beforeOpen", "afterOpen", "beforeContent", "afterContent", "beforeClose", "afterClose"],
        readElementConfig: function(b, c) {
            var dink = this
              , e = new RegExp("^data-" + c + "-(.*)")
              , f = {};
            return b && b.attributes && a.each(b.attributes, function() {
                var b = this.name.match(e);
                if (b) {
                    var c = this.value
                      , g = a.camelCase(b[1]);
                    if (a.inArray(g, dink.functionAttributes) >= 0)
                        c = new Function(c);
                    else
                        try {
                            c = a.parseJSON(c)
                        } catch (h) {}
                    f[g] = c
                }
            }),
            f
        },
        extend: function(b, c) {
            var dink = function() {
                this.constructor = b
            };
            return dink.prototype = this.prototype,
            b.prototype = new dink,
            b.__super__ = this.prototype,
            a.extend(b, this, c),
            b.defaults = b.prototype,
            b
        },
        attach: function(b, c, dink) {
            var e = this;
            "object" != typeof c || c instanceof a != !1 || dink || (dink = c,
            c = void 0),
            dink = a.extend({}, dink);
            var f, g = dink.namespace || e.defaults.namespace, h = a.extend({}, e.defaults, e.readElementConfig(b[0], g), dink);
            return b.on(h.openTrigger + "." + h.namespace, h.filter, function(g) {
                var i = a.extend({
                    $source: b,
                    $currentTarget: a(this)
                }, e.readElementConfig(b[0], h.namespace), e.readElementConfig(this, h.namespace), dink)
                  , j = f || a(this).data("featherlight-persisted") || new e(c,i);
                "shared" === j.persist ? f = j : j.persist !== !1 && a(this).data("featherlight-persisted", j),
                i.$currentTarget.blur(),
                j.open(g)
            }),
            b
        },
        current: function() {
            var a = this.opened();
            return a[a.length - 1] || null
        },
        opened: function() {
            var b = this;
            return dink(),
            a.grep(c, function(a) {
                return a instanceof b
            })
        },
        close: function(a) {
            var b = this.current();
            return b ? b.close(a) : void 0
        },
        _onReady: function() {
            var b = this;
            b.autoBind && (a(b.autoBind).each(function() {
                b.attach(a(this))
            }),
            a(document).on("click", b.autoBind, function(c) {
                c.isDefaultPrevented() || "featherlight" === c.namespace || (c.preventDefault(),
                b.attach(a(c.currentTarget)),
                a(c.target).trigger("click.featherlight"))
            }))
        },
        _callbackChain: {
            onKeyUp: function(b, c) {
                return 27 === c.keyCode ? (this.closeOnEsc && a.featherlight.close(c),
                !1) : b(c)
            },
            onResize: function(a, b) {
                return this.resize(this.$content.naturalWidth, this.$content.naturalHeight),
                a(b)
            },
            afterContent: function(a, b) {
                var c = a(b);
                return this.onResize(b),
                c
            }
        }
    }),
    a.featherlight = b,
    a.fn.featherlight = function(a, c) {
        return b.attach(this, a, c)
    }
    ,
    a(document).ready(function() {
        b._onReady()
    })
}(jQuery);
