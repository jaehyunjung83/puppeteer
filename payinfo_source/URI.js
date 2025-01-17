/*! URI.js v1.14.0 http://medialize.github.io/URI.js/ */
/* build contains: URI.js */
(function (q, w) {
  "object" === typeof exports
    ? (module.exports = w(
        require("./punycode"),
        require("./IPv6"),
        require("./SecondLevelDomains")
      ))
    : "function" === typeof define && define.amd
    ? define(["./punycode", "./IPv6", "./SecondLevelDomains"], w)
    : (q.URI = w(q.punycode, q.IPv6, q.SecondLevelDomains, q));
})(this, function (q, w, v, p) {
  function e(a, b) {
    if (!(this instanceof e)) return new e(a, b);
    void 0 === a &&
      (a = "undefined" !== typeof location ? location.href + "" : "");
    this.href(a);
    return void 0 !== b ? this.absoluteTo(b) : this;
  }
  function s(a) {
    return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
  }
  function y(a) {
    return void 0 === a
      ? "Undefined"
      : String(Object.prototype.toString.call(a)).slice(8, -1);
  }
  function l(a) {
    return "Array" === y(a);
  }
  function x(a, b) {
    var c, e;
    if (l(b)) {
      c = 0;
      for (e = b.length; c < e; c++) if (!x(a, b[c])) return !1;
      return !0;
    }
    var g = y(b);
    c = 0;
    for (e = a.length; c < e; c++)
      if ("RegExp" === g) {
        if ("string" === typeof a[c] && a[c].match(b)) return !0;
      } else if (a[c] === b) return !0;
    return !1;
  }
  function A(a, b) {
    if (!l(a) || !l(b) || a.length !== b.length) return !1;
    a.sort();
    b.sort();
    for (var c = 0, e = a.length; c < e; c++) if (a[c] !== b[c]) return !1;
    return !0;
  }
  function B(a) {
    return escape(a);
  }
  function z(a) {
    return encodeURIComponent(a)
      .replace(/[!'()*]/g, B)
      .replace(/\*/g, "%2A");
  }
  var C = p && p.URI;
  e.version = "1.14.0";
  var d = e.prototype,
    t = Object.prototype.hasOwnProperty;
  e._parts = function () {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      duplicateQueryParameters: e.duplicateQueryParameters,
      escapeQuerySpace: e.escapeQuerySpace,
    };
  };
  e.duplicateQueryParameters = !1;
  e.escapeQuerySpace = !0;
  e.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  e.idn_expression = /[^a-z0-9\.-]/i;
  e.punycode_expression = /(xn--)/i;
  e.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  e.ip6_expression =
    /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  e.find_uri_expression =
    /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/gi;
  e.findUri = {
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    end: /[\s\r\n]|$/,
    trim: /[`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u201e\u2018\u2019]+$/,
  };
  e.defaultPorts = {
    http: "80",
    https: "443",
    ftp: "21",
    gopher: "70",
    ws: "80",
    wss: "443",
  };
  e.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
  e.domAttributes = {
    a: "href",
    blockquote: "cite",
    link: "href",
    base: "href",
    script: "src",
    form: "action",
    img: "src",
    area: "href",
    iframe: "src",
    embed: "src",
    source: "src",
    track: "src",
    input: "src",
    audio: "src",
    video: "src",
  };
  e.getDomAttribute = function (a) {
    if (a && a.nodeName) {
      var b = a.nodeName.toLowerCase();
      return "input" === b && "image" !== a.type ? void 0 : e.domAttributes[b];
    }
  };
  e.encode = z;
  e.decode = decodeURIComponent;
  e.iso8859 = function () {
    e.encode = escape;
    e.decode = unescape;
  };
  e.unicode = function () {
    e.encode = z;
    e.decode = decodeURIComponent;
  };
  e.characters = {
    pathname: {
      encode: {
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/gi,
        map: {
          "%24": "$",
          "%26": "&",
          "%2B": "+",
          "%2C": ",",
          "%3B": ";",
          "%3D": "=",
          "%3A": ":",
          "%40": "@",
        },
      },
      decode: {
        expression: /[\/\?#]/g,
        map: { "/": "%2F", "?": "%3F", "#": "%23" },
      },
    },
    reserved: {
      encode: {
        expression:
          /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/gi,
        map: {
          "%3A": ":",
          "%2F": "/",
          "%3F": "?",
          "%23": "#",
          "%5B": "[",
          "%5D": "]",
          "%40": "@",
          "%21": "!",
          "%24": "$",
          "%26": "&",
          "%27": "'",
          "%28": "(",
          "%29": ")",
          "%2A": "*",
          "%2B": "+",
          "%2C": ",",
          "%3B": ";",
          "%3D": "=",
        },
      },
    },
  };
  e.encodeQuery = function (a, b) {
    var c = e.encode(a + "");
    void 0 === b && (b = e.escapeQuerySpace);
    return b ? c.replace(/%20/g, "+") : c;
  };
  e.decodeQuery = function (a, b) {
    a += "";
    void 0 === b && (b = e.escapeQuerySpace);
    try {
      return e.decode(b ? a.replace(/\+/g, "%20") : a);
    } catch (c) {
      return a;
    }
  };
  e.recodePath = function (a) {
    a = (a + "").split("/");
    for (var b = 0, c = a.length; b < c; b++)
      a[b] = e.encodePathSegment(e.decode(a[b]));
    return a.join("/");
  };
  e.decodePath = function (a) {
    a = (a + "").split("/");
    for (var b = 0, c = a.length; b < c; b++) a[b] = e.decodePathSegment(a[b]);
    return a.join("/");
  };
  var r = { encode: "encode", decode: "decode" },
    m,
    u = function (a, b) {
      return function (c) {
        try {
          return e[b](c + "").replace(
            e.characters[a][b].expression,
            function (c) {
              return e.characters[a][b].map[c];
            }
          );
        } catch (f) {
          return c;
        }
      };
    };
  for (m in r) e[m + "PathSegment"] = u("pathname", r[m]);
  e.encodeReserved = u("reserved", "encode");
  e.parse = function (a, b) {
    var c;
    b || (b = {});
    c = a.indexOf("#");
    -1 < c &&
      ((b.fragment = a.substring(c + 1) || null), (a = a.substring(0, c)));
    c = a.indexOf("?");
    -1 < c && ((b.query = a.substring(c + 1) || null), (a = a.substring(0, c)));
    "//" === a.substring(0, 2)
      ? ((b.protocol = null),
        (a = a.substring(2)),
        (a = e.parseAuthority(a, b)))
      : ((c = a.indexOf(":")),
        -1 < c &&
          ((b.protocol = a.substring(0, c) || null),
          b.protocol && !b.protocol.match(e.protocol_expression)
            ? (b.protocol = void 0)
            : "//" === a.substring(c + 1, c + 3)
            ? ((a = a.substring(c + 3)), (a = e.parseAuthority(a, b)))
            : ((a = a.substring(c + 1)), (b.urn = !0))));
    b.path = a;
    return b;
  };
  e.parseHost = function (a, b) {
    var c = a.indexOf("/"),
      e;
    -1 === c && (c = a.length);
    "[" === a.charAt(0)
      ? ((e = a.indexOf("]")),
        (b.hostname = a.substring(1, e) || null),
        (b.port = a.substring(e + 2, c) || null),
        "/" === b.port && (b.port = null))
      : a.indexOf(":") !== a.lastIndexOf(":")
      ? ((b.hostname = a.substring(0, c) || null), (b.port = null))
      : ((e = a.substring(0, c).split(":")),
        (b.hostname = e[0] || null),
        (b.port = e[1] || null));
    b.hostname && "/" !== a.substring(c).charAt(0) && (c++, (a = "/" + a));
    return a.substring(c) || "/";
  };
  e.parseAuthority = function (a, b) {
    a = e.parseUserinfo(a, b);
    return e.parseHost(a, b);
  };
  e.parseUserinfo = function (a, b) {
    var c = a.indexOf("/"),
      f = a.lastIndexOf("@", -1 < c ? c : a.length - 1);
    -1 < f && (-1 === c || f < c)
      ? ((c = a.substring(0, f).split(":")),
        (b.username = c[0] ? e.decode(c[0]) : null),
        c.shift(),
        (b.password = c[0] ? e.decode(c.join(":")) : null),
        (a = a.substring(f + 1)))
      : ((b.username = null), (b.password = null));
    return a;
  };
  e.parseQuery = function (a, b) {
    if (!a) return {};
    a = a.replace(/&+/g, "&").replace(/^\?*&*|&+$/g, "");
    if (!a) return {};
    for (var c = {}, f = a.split("&"), g = f.length, d, h, n = 0; n < g; n++)
      (d = f[n].split("=")),
        (h = e.decodeQuery(d.shift(), b)),
        (d = d.length ? e.decodeQuery(d.join("="), b) : null),
        c[h]
          ? ("string" === typeof c[h] && (c[h] = [c[h]]), c[h].push(d))
          : (c[h] = d);
    return c;
  };
  e.build = function (a) {
    var b = "";
    a.protocol && (b += a.protocol + ":");
    a.urn || (!b && !a.hostname) || (b += "//");
    b += e.buildAuthority(a) || "";
    "string" === typeof a.path &&
      ("/" !== a.path.charAt(0) && "string" === typeof a.hostname && (b += "/"),
      (b += a.path));
    "string" === typeof a.query && a.query && (b += "?" + a.query);
    "string" === typeof a.fragment && a.fragment && (b += "#" + a.fragment);
    return b;
  };
  e.buildHost = function (a) {
    var b = "";
    if (a.hostname)
      b = e.ip6_expression.test(a.hostname)
        ? b + ("[" + a.hostname + "]")
        : b + a.hostname;
    else return "";
    a.port && (b += ":" + a.port);
    return b;
  };
  e.buildAuthority = function (a) {
    return e.buildUserinfo(a) + e.buildHost(a);
  };
  e.buildUserinfo = function (a) {
    var b = "";
    a.username &&
      ((b += e.encode(a.username)),
      a.password && (b += ":" + e.encode(a.password)),
      (b += "@"));
    return b;
  };
  e.buildQuery = function (a, b, c) {
    var f = "",
      g,
      d,
      h,
      n;
    for (d in a)
      if (t.call(a, d) && d)
        if (l(a[d]))
          for (g = {}, h = 0, n = a[d].length; h < n; h++)
            void 0 !== a[d][h] &&
              void 0 === g[a[d][h] + ""] &&
              ((f += "&" + e.buildQueryParameter(d, a[d][h], c)),
              !0 !== b && (g[a[d][h] + ""] = !0));
        else void 0 !== a[d] && (f += "&" + e.buildQueryParameter(d, a[d], c));
    return f.substring(1);
  };
  e.buildQueryParameter = function (a, b, c) {
    return e.encodeQuery(a, c) + (null !== b ? "=" + e.encodeQuery(b, c) : "");
  };
  e.addQuery = function (a, b, c) {
    if ("object" === typeof b)
      for (var f in b) t.call(b, f) && e.addQuery(a, f, b[f]);
    else if ("string" === typeof b)
      void 0 === a[b]
        ? (a[b] = c)
        : ("string" === typeof a[b] && (a[b] = [a[b]]),
          l(c) || (c = [c]),
          (a[b] = a[b].concat(c)));
    else
      throw new TypeError(
        "URI.addQuery() accepts an object, string as the name parameter"
      );
  };
  e.removeQuery = function (a, b, c) {
    var f;
    if (l(b)) for (c = 0, f = b.length; c < f; c++) a[b[c]] = void 0;
    else if ("object" === typeof b)
      for (f in b) t.call(b, f) && e.removeQuery(a, f, b[f]);
    else if ("string" === typeof b)
      if (void 0 !== c)
        if (a[b] === c) a[b] = void 0;
        else {
          if (l(a[b])) {
            f = a[b];
            var g = {},
              d,
              h;
            if (l(c)) for (d = 0, h = c.length; d < h; d++) g[c[d]] = !0;
            else g[c] = !0;
            d = 0;
            for (h = f.length; d < h; d++)
              void 0 !== g[f[d]] && (f.splice(d, 1), h--, d--);
            a[b] = f;
          }
        }
      else a[b] = void 0;
    else
      throw new TypeError(
        "URI.addQuery() accepts an object, string as the first parameter"
      );
  };
  e.hasQuery = function (a, b, c, f) {
    if ("object" === typeof b) {
      for (var d in b) if (t.call(b, d) && !e.hasQuery(a, d, b[d])) return !1;
      return !0;
    }
    if ("string" !== typeof b)
      throw new TypeError(
        "URI.hasQuery() accepts an object, string as the name parameter"
      );
    switch (y(c)) {
      case "Undefined":
        return b in a;
      case "Boolean":
        return (a = Boolean(l(a[b]) ? a[b].length : a[b])), c === a;
      case "Function":
        return !!c(a[b], b, a);
      case "Array":
        return l(a[b]) ? (f ? x : A)(a[b], c) : !1;
      case "RegExp":
        return l(a[b]) ? (f ? x(a[b], c) : !1) : Boolean(a[b] && a[b].match(c));
      case "Number":
        c = String(c);
      case "String":
        return l(a[b]) ? (f ? x(a[b], c) : !1) : a[b] === c;
      default:
        throw new TypeError(
          "URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter"
        );
    }
  };
  e.commonPath = function (a, b) {
    var c = Math.min(a.length, b.length),
      e;
    for (e = 0; e < c; e++)
      if (a.charAt(e) !== b.charAt(e)) {
        e--;
        break;
      }
    if (1 > e)
      return a.charAt(0) === b.charAt(0) && "/" === a.charAt(0) ? "/" : "";
    if ("/" !== a.charAt(e) || "/" !== b.charAt(e))
      e = a.substring(0, e).lastIndexOf("/");
    return a.substring(0, e + 1);
  };
  e.withinString = function (a, b, c) {
    c || (c = {});
    var f = c.start || e.findUri.start,
      d = c.end || e.findUri.end,
      k = c.trim || e.findUri.trim,
      h = /[a-z0-9-]=["']?$/i;
    for (f.lastIndex = 0; ; ) {
      var n = f.exec(a);
      if (!n) break;
      n = n.index;
      if (c.ignoreHtml) {
        var l = a.slice(Math.max(n - 3, 0), n);
        if (l && h.test(l)) continue;
      }
      var l = n + a.slice(n).search(d),
        m = a.slice(n, l).replace(k, "");
      (c.ignore && c.ignore.test(m)) ||
        ((l = n + m.length),
        (m = b(m, n, l, a)),
        (a = a.slice(0, n) + m + a.slice(l)),
        (f.lastIndex = n + m.length));
    }
    f.lastIndex = 0;
    return a;
  };
  e.ensureValidHostname = function (a) {
    if (a.match(e.invalid_hostname_characters)) {
      if (!q)
        throw new TypeError(
          'Hostname "' +
            a +
            '" contains characters other than [A-Z0-9.-] and Punycode.js is not available'
        );
      if (q.toASCII(a).match(e.invalid_hostname_characters))
        throw new TypeError(
          'Hostname "' + a + '" contains characters other than [A-Z0-9.-]'
        );
    }
  };
  e.noConflict = function (a) {
    if (a)
      return (
        (a = { URI: this.noConflict() }),
        p.URITemplate &&
          "function" === typeof p.URITemplate.noConflict &&
          (a.URITemplate = p.URITemplate.noConflict()),
        p.IPv6 &&
          "function" === typeof p.IPv6.noConflict &&
          (a.IPv6 = p.IPv6.noConflict()),
        p.SecondLevelDomains &&
          "function" === typeof p.SecondLevelDomains.noConflict &&
          (a.SecondLevelDomains = p.SecondLevelDomains.noConflict()),
        a
      );
    p.URI === this && (p.URI = C);
    return this;
  };
  d.build = function (a) {
    if (!0 === a) this._deferred_build = !0;
    else if (void 0 === a || this._deferred_build)
      (this._string = e.build(this._parts)), (this._deferred_build = !1);
    return this;
  };
  d.clone = function () {
    return new e(this);
  };
  d.valueOf = d.toString = function () {
    return this.build(!1)._string;
  };
  r = {
    protocol: "protocol",
    username: "username",
    password: "password",
    hostname: "hostname",
    port: "port",
  };
  u = function (a) {
    return function (b, c) {
      if (void 0 === b) return this._parts[a] || "";
      this._parts[a] = b || null;
      this.build(!c);
      return this;
    };
  };
  for (m in r) d[m] = u(r[m]);
  r = { query: "?", fragment: "#" };
  u = function (a, b) {
    return function (c, e) {
      if (void 0 === c) return this._parts[a] || "";
      null !== c && ((c += ""), c.charAt(0) === b && (c = c.substring(1)));
      this._parts[a] = c;
      this.build(!e);
      return this;
    };
  };
  for (m in r) d[m] = u(m, r[m]);
  r = { search: ["?", "query"], hash: ["#", "fragment"] };
  u = function (a, b) {
    return function (c, e) {
      var d = this[a](c, e);
      return "string" === typeof d && d.length ? b + d : d;
    };
  };
  for (m in r) d[m] = u(r[m][1], r[m][0]);
  d.pathname = function (a, b) {
    if (void 0 === a || !0 === a) {
      var c = this._parts.path || (this._parts.hostname ? "/" : "");
      return a ? e.decodePath(c) : c;
    }
    this._parts.path = a ? e.recodePath(a) : "/";
    this.build(!b);
    return this;
  };
  d.path = d.pathname;
  d.href = function (a, b) {
    var c;
    if (void 0 === a) return this.toString();
    this._string = "";
    this._parts = e._parts();
    var f = a instanceof e,
      d = "object" === typeof a && (a.hostname || a.path || a.pathname);
    a.nodeName && ((d = e.getDomAttribute(a)), (a = a[d] || ""), (d = !1));
    !f && d && void 0 !== a.pathname && (a = a.toString());
    if ("string" === typeof a) this._parts = e.parse(a, this._parts);
    else if (f || d)
      for (c in ((f = f ? a._parts : a), f))
        t.call(this._parts, c) && (this._parts[c] = f[c]);
    else throw new TypeError("invalid input");
    this.build(!b);
    return this;
  };
  d.is = function (a) {
    var b = !1,
      c = !1,
      f = !1,
      d = !1,
      k = !1,
      h = !1,
      l = !1,
      m = !this._parts.urn;
    this._parts.hostname &&
      ((m = !1),
      (c = e.ip4_expression.test(this._parts.hostname)),
      (f = e.ip6_expression.test(this._parts.hostname)),
      (b = c || f),
      (k = (d = !b) && v && v.has(this._parts.hostname)),
      (h = d && e.idn_expression.test(this._parts.hostname)),
      (l = d && e.punycode_expression.test(this._parts.hostname)));
    switch (a.toLowerCase()) {
      case "relative":
        return m;
      case "absolute":
        return !m;
      case "domain":
      case "name":
        return d;
      case "sld":
        return k;
      case "ip":
        return b;
      case "ip4":
      case "ipv4":
      case "inet4":
        return c;
      case "ip6":
      case "ipv6":
      case "inet6":
        return f;
      case "idn":
        return h;
      case "url":
        return !this._parts.urn;
      case "urn":
        return !!this._parts.urn;
      case "punycode":
        return l;
    }
    return null;
  };
  var D = d.protocol,
    E = d.port,
    F = d.hostname;
  d.protocol = function (a, b) {
    if (
      void 0 !== a &&
      a &&
      ((a = a.replace(/:(\/\/)?$/, "")), !a.match(e.protocol_expression))
    )
      throw new TypeError(
        'Protocol "' +
          a +
          "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]"
      );
    return D.call(this, a, b);
  };
  d.scheme = d.protocol;
  d.port = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (
      void 0 !== a &&
      (0 === a && (a = null),
      a &&
        ((a += ""),
        ":" === a.charAt(0) && (a = a.substring(1)),
        a.match(/[^0-9]/)))
    )
      throw new TypeError(
        'Port "' + a + '" contains characters other than [0-9]'
      );
    return E.call(this, a, b);
  };
  d.hostname = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 !== a) {
      var c = {};
      e.parseHost(a, c);
      a = c.hostname;
    }
    return F.call(this, a, b);
  };
  d.host = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 === a)
      return this._parts.hostname ? e.buildHost(this._parts) : "";
    e.parseHost(a, this._parts);
    this.build(!b);
    return this;
  };
  d.authority = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 === a)
      return this._parts.hostname ? e.buildAuthority(this._parts) : "";
    e.parseAuthority(a, this._parts);
    this.build(!b);
    return this;
  };
  d.userinfo = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 === a) {
      if (!this._parts.username) return "";
      var c = e.buildUserinfo(this._parts);
      return c.substring(0, c.length - 1);
    }
    "@" !== a[a.length - 1] && (a += "@");
    e.parseUserinfo(a, this._parts);
    this.build(!b);
    return this;
  };
  d.resource = function (a, b) {
    var c;
    if (void 0 === a) return this.path() + this.search() + this.hash();
    c = e.parse(a);
    this._parts.path = c.path;
    this._parts.query = c.query;
    this._parts.fragment = c.fragment;
    this.build(!b);
    return this;
  };
  d.subdomain = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 === a) {
      if (!this._parts.hostname || this.is("IP")) return "";
      var c = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, c) || "";
    }
    c = this._parts.hostname.length - this.domain().length;
    c = this._parts.hostname.substring(0, c);
    c = new RegExp("^" + s(c));
    a && "." !== a.charAt(a.length - 1) && (a += ".");
    a && e.ensureValidHostname(a);
    this._parts.hostname = this._parts.hostname.replace(c, a);
    this.build(!b);
    return this;
  };
  d.domain = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    "boolean" === typeof a && ((b = a), (a = void 0));
    if (void 0 === a) {
      if (!this._parts.hostname || this.is("IP")) return "";
      var c = this._parts.hostname.match(/\./g);
      if (c && 2 > c.length) return this._parts.hostname;
      c = this._parts.hostname.length - this.tld(b).length - 1;
      c = this._parts.hostname.lastIndexOf(".", c - 1) + 1;
      return this._parts.hostname.substring(c) || "";
    }
    if (!a) throw new TypeError("cannot set domain empty");
    e.ensureValidHostname(a);
    !this._parts.hostname || this.is("IP")
      ? (this._parts.hostname = a)
      : ((c = new RegExp(s(this.domain()) + "$")),
        (this._parts.hostname = this._parts.hostname.replace(c, a)));
    this.build(!b);
    return this;
  };
  d.tld = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    "boolean" === typeof a && ((b = a), (a = void 0));
    if (void 0 === a) {
      if (!this._parts.hostname || this.is("IP")) return "";
      var c = this._parts.hostname.lastIndexOf("."),
        c = this._parts.hostname.substring(c + 1);
      return !0 !== b && v && v.list[c.toLowerCase()]
        ? v.get(this._parts.hostname) || c
        : c;
    }
    if (a)
      if (a.match(/[^a-zA-Z0-9-]/))
        if (v && v.is(a))
          (c = new RegExp(s(this.tld()) + "$")),
            (this._parts.hostname = this._parts.hostname.replace(c, a));
        else
          throw new TypeError(
            'TLD "' + a + '" contains characters other than [A-Z0-9]'
          );
      else {
        if (!this._parts.hostname || this.is("IP"))
          throw new ReferenceError("cannot set TLD on non-domain host");
        c = new RegExp(s(this.tld()) + "$");
        this._parts.hostname = this._parts.hostname.replace(c, a);
      }
    else throw new TypeError("cannot set TLD empty");
    this.build(!b);
    return this;
  };
  d.directory = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 === a || !0 === a) {
      if (!this._parts.path && !this._parts.hostname) return "";
      if ("/" === this._parts.path) return "/";
      var c = this._parts.path.length - this.filename().length - 1,
        c =
          this._parts.path.substring(0, c) || (this._parts.hostname ? "/" : "");
      return a ? e.decodePath(c) : c;
    }
    c = this._parts.path.length - this.filename().length;
    c = this._parts.path.substring(0, c);
    c = new RegExp("^" + s(c));
    this.is("relative") ||
      (a || (a = "/"), "/" !== a.charAt(0) && (a = "/" + a));
    a && "/" !== a.charAt(a.length - 1) && (a += "/");
    a = e.recodePath(a);
    this._parts.path = this._parts.path.replace(c, a);
    this.build(!b);
    return this;
  };
  d.filename = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 === a || !0 === a) {
      if (!this._parts.path || "/" === this._parts.path) return "";
      var c = this._parts.path.lastIndexOf("/"),
        c = this._parts.path.substring(c + 1);
      return a ? e.decodePathSegment(c) : c;
    }
    c = !1;
    "/" === a.charAt(0) && (a = a.substring(1));
    a.match(/\.?\//) && (c = !0);
    var d = new RegExp(s(this.filename()) + "$");
    a = e.recodePath(a);
    this._parts.path = this._parts.path.replace(d, a);
    c ? this.normalizePath(b) : this.build(!b);
    return this;
  };
  d.suffix = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 === a || !0 === a) {
      if (!this._parts.path || "/" === this._parts.path) return "";
      var c = this.filename(),
        d = c.lastIndexOf(".");
      if (-1 === d) return "";
      c = c.substring(d + 1);
      c = /^[a-z0-9%]+$/i.test(c) ? c : "";
      return a ? e.decodePathSegment(c) : c;
    }
    "." === a.charAt(0) && (a = a.substring(1));
    if ((c = this.suffix()))
      d = a ? new RegExp(s(c) + "$") : new RegExp(s("." + c) + "$");
    else {
      if (!a) return this;
      this._parts.path += "." + e.recodePath(a);
    }
    d &&
      ((a = e.recodePath(a)),
      (this._parts.path = this._parts.path.replace(d, a)));
    this.build(!b);
    return this;
  };
  d.segment = function (a, b, c) {
    var e = this._parts.urn ? ":" : "/",
      d = this.path(),
      k = "/" === d.substring(0, 1),
      d = d.split(e);
    void 0 !== a && "number" !== typeof a && ((c = b), (b = a), (a = void 0));
    if (void 0 !== a && "number" !== typeof a)
      throw Error('Bad segment "' + a + '", must be 0-based integer');
    k && d.shift();
    0 > a && (a = Math.max(d.length + a, 0));
    if (void 0 === b) return void 0 === a ? d : d[a];
    if (null === a || void 0 === d[a])
      if (l(b)) {
        d = [];
        a = 0;
        for (var h = b.length; a < h; a++)
          if (b[a].length || (d.length && d[d.length - 1].length))
            d.length && !d[d.length - 1].length && d.pop(), d.push(b[a]);
      } else {
        if (b || "string" === typeof b)
          "" === d[d.length - 1] ? (d[d.length - 1] = b) : d.push(b);
      }
    else b || ("string" === typeof b && b.length) ? (d[a] = b) : d.splice(a, 1);
    k && d.unshift("");
    return this.path(d.join(e), c);
  };
  d.segmentCoded = function (a, b, c) {
    var d, g;
    "number" !== typeof a && ((c = b), (b = a), (a = void 0));
    if (void 0 === b) {
      a = this.segment(a, b, c);
      if (l(a)) for (d = 0, g = a.length; d < g; d++) a[d] = e.decode(a[d]);
      else a = void 0 !== a ? e.decode(a) : void 0;
      return a;
    }
    if (l(b)) for (d = 0, g = b.length; d < g; d++) b[d] = e.decode(b[d]);
    else b = "string" === typeof b ? e.encode(b) : b;
    return this.segment(a, b, c);
  };
  var G = d.query;
  d.query = function (a, b) {
    if (!0 === a)
      return e.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    if ("function" === typeof a) {
      var c = e.parseQuery(this._parts.query, this._parts.escapeQuerySpace),
        d = a.call(this, c);
      this._parts.query = e.buildQuery(
        d || c,
        this._parts.duplicateQueryParameters,
        this._parts.escapeQuerySpace
      );
      this.build(!b);
      return this;
    }
    return void 0 !== a && "string" !== typeof a
      ? ((this._parts.query = e.buildQuery(
          a,
          this._parts.duplicateQueryParameters,
          this._parts.escapeQuerySpace
        )),
        this.build(!b),
        this)
      : G.call(this, a, b);
  };
  d.setQuery = function (a, b, c) {
    var d = e.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    if ("object" === typeof a) for (var g in a) t.call(a, g) && (d[g] = a[g]);
    else if ("string" === typeof a) d[a] = void 0 !== b ? b : null;
    else
      throw new TypeError(
        "URI.addQuery() accepts an object, string as the name parameter"
      );
    this._parts.query = e.buildQuery(
      d,
      this._parts.duplicateQueryParameters,
      this._parts.escapeQuerySpace
    );
    "string" !== typeof a && (c = b);
    this.build(!c);
    return this;
  };
  d.addQuery = function (a, b, c) {
    var d = e.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    e.addQuery(d, a, void 0 === b ? null : b);
    this._parts.query = e.buildQuery(
      d,
      this._parts.duplicateQueryParameters,
      this._parts.escapeQuerySpace
    );
    "string" !== typeof a && (c = b);
    this.build(!c);
    return this;
  };
  d.removeQuery = function (a, b, c) {
    var d = e.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    e.removeQuery(d, a, b);
    this._parts.query = e.buildQuery(
      d,
      this._parts.duplicateQueryParameters,
      this._parts.escapeQuerySpace
    );
    "string" !== typeof a && (c = b);
    this.build(!c);
    return this;
  };
  d.hasQuery = function (a, b, c) {
    var d = e.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return e.hasQuery(d, a, b, c);
  };
  d.setSearch = d.setQuery;
  d.addSearch = d.addQuery;
  d.removeSearch = d.removeQuery;
  d.hasSearch = d.hasQuery;
  d.normalize = function () {
    return this._parts.urn
      ? this.normalizeProtocol(!1)
          .normalizeQuery(!1)
          .normalizeFragment(!1)
          .build()
      : this.normalizeProtocol(!1)
          .normalizeHostname(!1)
          .normalizePort(!1)
          .normalizePath(!1)
          .normalizeQuery(!1)
          .normalizeFragment(!1)
          .build();
  };
  d.normalizeProtocol = function (a) {
    "string" === typeof this._parts.protocol &&
      ((this._parts.protocol = this._parts.protocol.toLowerCase()),
      this.build(!a));
    return this;
  };
  d.normalizeHostname = function (a) {
    this._parts.hostname &&
      (this.is("IDN") && q
        ? (this._parts.hostname = q.toASCII(this._parts.hostname))
        : this.is("IPv6") &&
          w &&
          (this._parts.hostname = w.best(this._parts.hostname)),
      (this._parts.hostname = this._parts.hostname.toLowerCase()),
      this.build(!a));
    return this;
  };
  d.normalizePort = function (a) {
    "string" === typeof this._parts.protocol &&
      this._parts.port === e.defaultPorts[this._parts.protocol] &&
      ((this._parts.port = null), this.build(!a));
    return this;
  };
  d.normalizePath = function (a) {
    if (this._parts.urn || !this._parts.path || "/" === this._parts.path)
      return this;
    var b,
      c = this._parts.path,
      d = "",
      g,
      k;
    "/" !== c.charAt(0) && ((b = !0), (c = "/" + c));
    c = c.replace(/(\/(\.\/)+)|(\/\.$)/g, "/").replace(/\/{2,}/g, "/");
    b && (d = c.substring(1).match(/^(\.\.\/)+/) || "") && (d = d[0]);
    for (;;) {
      g = c.indexOf("/..");
      if (-1 === g) break;
      else if (0 === g) {
        c = c.substring(3);
        continue;
      }
      k = c.substring(0, g).lastIndexOf("/");
      -1 === k && (k = g);
      c = c.substring(0, k) + c.substring(g + 3);
    }
    b && this.is("relative") && (c = d + c.substring(1));
    c = e.recodePath(c);
    this._parts.path = c;
    this.build(!a);
    return this;
  };
  d.normalizePathname = d.normalizePath;
  d.normalizeQuery = function (a) {
    "string" === typeof this._parts.query &&
      (this._parts.query.length
        ? this.query(
            e.parseQuery(this._parts.query, this._parts.escapeQuerySpace)
          )
        : (this._parts.query = null),
      this.build(!a));
    return this;
  };
  d.normalizeFragment = function (a) {
    this._parts.fragment || ((this._parts.fragment = null), this.build(!a));
    return this;
  };
  d.normalizeSearch = d.normalizeQuery;
  d.normalizeHash = d.normalizeFragment;
  d.iso8859 = function () {
    var a = e.encode,
      b = e.decode;
    e.encode = escape;
    e.decode = decodeURIComponent;
    this.normalize();
    e.encode = a;
    e.decode = b;
    return this;
  };
  d.unicode = function () {
    var a = e.encode,
      b = e.decode;
    e.encode = z;
    e.decode = unescape;
    this.normalize();
    e.encode = a;
    e.decode = b;
    return this;
  };
  d.readable = function () {
    var a = this.clone();
    a.username("").password("").normalize();
    var b = "";
    a._parts.protocol && (b += a._parts.protocol + "://");
    a._parts.hostname &&
      (a.is("punycode") && q
        ? ((b += q.toUnicode(a._parts.hostname)),
          a._parts.port && (b += ":" + a._parts.port))
        : (b += a.host()));
    a._parts.hostname &&
      a._parts.path &&
      "/" !== a._parts.path.charAt(0) &&
      (b += "/");
    b += a.path(!0);
    if (a._parts.query) {
      for (
        var c = "", d = 0, g = a._parts.query.split("&"), k = g.length;
        d < k;
        d++
      ) {
        var h = (g[d] || "").split("="),
          c =
            c +
            ("&" +
              e
                .decodeQuery(h[0], this._parts.escapeQuerySpace)
                .replace(/&/g, "%26"));
        void 0 !== h[1] &&
          (c +=
            "=" +
            e
              .decodeQuery(h[1], this._parts.escapeQuerySpace)
              .replace(/&/g, "%26"));
      }
      b += "?" + c.substring(1);
    }
    return (b += e.decodeQuery(a.hash(), !0));
  };
  d.absoluteTo = function (a) {
    var b = this.clone(),
      c = ["protocol", "username", "password", "hostname", "port"],
      d,
      g;
    if (this._parts.urn)
      throw Error(
        "URNs do not have any generally defined hierarchical components"
      );
    a instanceof e || (a = new e(a));
    b._parts.protocol || (b._parts.protocol = a._parts.protocol);
    if (this._parts.hostname) return b;
    for (d = 0; (g = c[d]); d++) b._parts[g] = a._parts[g];
    b._parts.path
      ? ".." === b._parts.path.substring(-2) && (b._parts.path += "/")
      : ((b._parts.path = a._parts.path),
        b._parts.query || (b._parts.query = a._parts.query));
    "/" !== b.path().charAt(0) &&
      ((a = a.directory()),
      (b._parts.path = (a ? a + "/" : "") + b._parts.path),
      b.normalizePath());
    b.build();
    return b;
  };
  d.relativeTo = function (a) {
    var b = this.clone().normalize(),
      c,
      d,
      g,
      k;
    if (b._parts.urn)
      throw Error(
        "URNs do not have any generally defined hierarchical components"
      );
    a = new e(a).normalize();
    c = b._parts;
    d = a._parts;
    g = b.path();
    k = a.path();
    if ("/" !== g.charAt(0)) throw Error("URI is already relative");
    if ("/" !== k.charAt(0))
      throw Error("Cannot calculate a URI relative to another relative URI");
    c.protocol === d.protocol && (c.protocol = null);
    if (
      c.username === d.username &&
      c.password === d.password &&
      null === c.protocol &&
      null === c.username &&
      null === c.password &&
      c.hostname === d.hostname &&
      c.port === d.port
    )
      (c.hostname = null), (c.port = null);
    else return b.build();
    if (g === k) return (c.path = ""), b.build();
    a = e.commonPath(b.path(), a.path());
    if (!a) return b.build();
    d = d.path
      .substring(a.length)
      .replace(/[^\/]*$/, "")
      .replace(/.*?\//g, "../");
    c.path = d + c.path.substring(a.length);
    return b.build();
  };
  d.equals = function (a) {
    var b = this.clone();
    a = new e(a);
    var c = {},
      d = {},
      g = {},
      k;
    b.normalize();
    a.normalize();
    if (b.toString() === a.toString()) return !0;
    c = b.query();
    d = a.query();
    b.query("");
    a.query("");
    if (b.toString() !== a.toString() || c.length !== d.length) return !1;
    c = e.parseQuery(c, this._parts.escapeQuerySpace);
    d = e.parseQuery(d, this._parts.escapeQuerySpace);
    for (k in c)
      if (t.call(c, k)) {
        if (!l(c[k])) {
          if (c[k] !== d[k]) return !1;
        } else if (!A(c[k], d[k])) return !1;
        g[k] = !0;
      }
    for (k in d) if (t.call(d, k) && !g[k]) return !1;
    return !0;
  };
  d.duplicateQueryParameters = function (a) {
    this._parts.duplicateQueryParameters = !!a;
    return this;
  };
  d.escapeQuerySpace = function (a) {
    this._parts.escapeQuerySpace = !!a;
    return this;
  };
  return e;
});


