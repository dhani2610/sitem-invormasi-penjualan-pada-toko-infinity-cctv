/* esri-leaflet - v2.5.3 - Wed Jan 06 2021 13:19:10 GMT-0600 (Central Standard Time)
 * Copyright (c) 2021 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("leaflet")) : "function" == typeof define && define.amd ? define(["exports", "leaflet"], e) : e(((t = t || self).L = t.L || {}, t.L.esri = {}), t.L)
}(this, function (t, g) {
    "use strict";
    var e = window.XMLHttpRequest && "withCredentials" in new window.XMLHttpRequest,
        i = "" === document.documentElement.style.pointerEvents,
        a = {
            cors: e,
            pointerEvents: i
        },
        s = {
            attributionWidthOffset: 55
        },
        n = 0;

    function l(t) {
        var e, i, s, r = "";
        for (var o in t.f = t.f || "json", t) {
            t.hasOwnProperty(o) && (e = t[o], i = Object.prototype.toString.call(e), r.length && (r += "&"), s = "[object Array]" === i ? "[object Object]" === Object.prototype.toString.call(e[0]) ? JSON.stringify(e) : e.join(",") : "[object Object]" === i ? JSON.stringify(e) : "[object Date]" === i ? e.valueOf() : e, r += encodeURIComponent(o) + "=" + encodeURIComponent(s))
        }
        return r
    }

    function u(s, r) {
        var o = new window.XMLHttpRequest;
        return o.onerror = function (t) {
            o.onreadystatechange = g.Util.falseFn, s.call(r, {
                error: {
                    code: 500,
                    message: "XMLHttpRequest error"
                }
            }, null)
        }, o.onreadystatechange = function () {
            var e, i;
            if (4 === o.readyState) {
                try {
                    e = JSON.parse(o.responseText)
                } catch (t) {
                    e = null, i = {
                        code: 500,
                        message: "Could not parse response as JSON. This could also be caused by a CORS or XMLHttpRequest error."
                    }
                }!i && e.error && (i = e.error, e = null), o.onerror = g.Util.falseFn, s.call(r, i, e)
            }
        }, o.ontimeout = function () {
            this.onerror()
        }, o
    }

    function r(t, e, i, s) {
        var r = u(i, s);
        return r.open("POST", t), null != s && void 0 !== s.options && (r.timeout = s.options.timeout), r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), r.send(l(e)), r
    }

    function o(t, e, i, s) {
        var r = u(i, s);
        return r.open("GET", t + "?" + l(e), !0), null != s && void 0 !== s.options && (r.timeout = s.options.timeout, s.options.withCredentials && (r.withCredentials = !0)), r.send(null), r
    }

    function h(t, e, i, s) {
        var r = l(e),
            o = u(i, s),
            n = (t + "?" + r).length;
        if (n <= 2e3 && a.cors ? o.open("GET", t + "?" + r) : 2e3 < n && a.cors && (o.open("POST", t), o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")), null != s && void 0 !== s.options && (o.timeout = s.options.timeout, s.options.withCredentials && (o.withCredentials = !0)), n <= 2e3 && a.cors) o.send(null);
        else {
            if (!(2e3 < n && a.cors)) return n <= 2e3 && !a.cors ? c(t, e, i, s) : void d("a request to " + t + " was longer then 2000 characters and this browser cannot make a cross-domain post request. Please use a proxy http://esri.github.io/esri-leaflet/api-reference/request.html");
            o.send(r)
        }
        return o
    }

    function c(t, e, s, r) {
        window._EsriLeafletCallbacks = window._EsriLeafletCallbacks || {};
        var o = "c" + n;
        e.callback = "window._EsriLeafletCallbacks." + o, window._EsriLeafletCallbacks[o] = function (t) {
            var e, i;
            !0 !== window._EsriLeafletCallbacks[o] && ("[object Object]" !== (i = Object.prototype.toString.call(t)) && "[object Array]" !== i && (e = {
                error: {
                    code: 500,
                    message: "Expected array or object as JSONP response"
                }
            }, t = null), !e && t.error && (e = t, t = null), s.call(r, e, t), window._EsriLeafletCallbacks[o] = !0)
        };
        var i = g.DomUtil.create("script", null, document.body);
        return i.type = "text/javascript", i.src = t + "?" + l(e), i.id = o, i.onerror = function (t) {
            t && !0 !== window._EsriLeafletCallbacks[o] && (s.call(r, {
                error: {
                    code: 500,
                    message: "An unknown error occurred"
                }
            }), window._EsriLeafletCallbacks[o] = !0)
        }, g.DomUtil.addClass(i, "esri-leaflet-jsonp"), n++, {
            id: o,
            url: i.src,
            abort: function () {
                window._EsriLeafletCallbacks._callback[o]({
                    code: 0,
                    message: "Request aborted."
                })
            }
        }
    }
    var p = a.cors ? o : c;

    function d() {
        console && console.warn && console.warn.apply(console, arguments)
    }
    p.CORS = o, p.JSONP = c;

    function y(t, e) {
        for (var i = 0; i < t.length - 1; i++)
            for (var s = 0; s < e.length - 1; s++)
                if (function (t, e, i, s) {
                        var r = (s[0] - i[0]) * (t[1] - i[1]) - (s[1] - i[1]) * (t[0] - i[0]),
                            o = (e[0] - t[0]) * (t[1] - i[1]) - (e[1] - t[1]) * (t[0] - i[0]),
                            n = (s[1] - i[1]) * (e[0] - t[0]) - (s[0] - i[0]) * (e[1] - t[1]);
                        if (0 != n) {
                            var a = r / n,
                                l = o / n;
                            if (0 <= a && a <= 1 && 0 <= l && l <= 1) return !0
                        }
                        return !1
                    }(t[i], t[i + 1], e[s], e[s + 1])) return !0;
        return !1
    }

    function _(t) {
        return function (t, e) {
            for (var i = 0; i < t.length; i++)
                if (t[i] !== e[i]) return !1;
            return !0
        }(t[0], t[t.length - 1]) || t.push(t[0]), t
    }

    function v(t) {
        for (var e, i = 0, s = 0, r = t.length, o = t[s]; s < r - 1; s++) i += ((e = t[s + 1])[0] - o[0]) * (e[1] + o[1]), o = e;
        return 0 <= i
    }

    function m(t) {
        var e = {};
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
        return e
    }

    function f(t) {
        for (var e, i, s = [], r = [], o = 0; o < t.length; o++) {
            var n, a = _(t[o].slice(0));
            a.length < 4 || (v(a) ? (n = [a.slice().reverse()], s.push(n)) : r.push(a.slice().reverse()))
        }
        for (var l, u, h, c, p = []; r.length;) {
            i = r.pop();
            for (var d = !1, m = s.length - 1; 0 <= m; m--)
                if (e = s[m][0], h = void 0, h = y(l = e, u = i), c = function (t, e) {
                        for (var i = !1, s = -1, r = t.length, o = r - 1; ++s < r; o = s)(t[s][1] <= e[1] && e[1] < t[o][1] || t[o][1] <= e[1] && e[1] < t[s][1]) && e[0] < (t[o][0] - t[s][0]) * (e[1] - t[s][1]) / (t[o][1] - t[s][1]) + t[s][0] && (i = !i);
                        return i
                    }(l, u[0]), !h && c) {
                    s[m].push(i), d = !0;
                    break
                } d || p.push(i)
        }
        for (; p.length;) {
            i = p.pop();
            var f = !1;
            for (m = s.length - 1; 0 <= m; m--)
                if (e = s[m][0], y(e, i)) {
                    s[m].push(i), f = !0;
                    break
                } f || s.push([i.reverse()])
        }
        return 1 === s.length ? {
            type: "Polygon",
            coordinates: s[0]
        } : {
            type: "MultiPolygon",
            coordinates: s
        }
    }

    function b(t) {
        var e = [],
            i = t.slice(0),
            s = _(i.shift().slice(0));
        if (4 <= s.length) {
            v(s) || s.reverse(), e.push(s);
            for (var r = 0; r < i.length; r++) {
                var o = _(i[r].slice(0));
                4 <= o.length && (v(o) && o.reverse(), e.push(o))
            }
        }
        return e
    }
    var x = {
            request: h,
            get: p,
            post: r
        },
        S = function t(e, i) {
            var s = {};
            if (e.features) {
                s.type = "FeatureCollection", s.features = [];
                for (var r = 0; r < e.features.length; r++) s.features.push(t(e.features[r], i))
            }
            if ("number" == typeof e.x && "number" == typeof e.y && (s.type = "Point", s.coordinates = [e.x, e.y], "number" == typeof e.z && s.coordinates.push(e.z)), e.points && (s.type = "MultiPoint", s.coordinates = e.points.slice(0)), e.paths && (1 === e.paths.length ? (s.type = "LineString", s.coordinates = e.paths[0].slice(0)) : (s.type = "MultiLineString", s.coordinates = e.paths.slice(0))), e.rings && (s = f(e.rings.slice(0))), "number" == typeof e.xmin && "number" == typeof e.ymin && "number" == typeof e.xmax && "number" == typeof e.ymax && (s.type = "Polygon", s.coordinates = [
                    [
                        [e.xmax, e.ymax],
                        [e.xmin, e.ymax],
                        [e.xmin, e.ymin],
                        [e.xmax, e.ymin],
                        [e.xmax, e.ymax]
                    ]
                ]), (e.geometry || e.attributes) && (s.type = "Feature", s.geometry = e.geometry ? t(e.geometry) : null, s.properties = e.attributes ? m(e.attributes) : null, e.attributes)) try {
                s.id = function (t, e) {
                    for (var i = e ? [e, "OBJECTID", "FID"] : ["OBJECTID", "FID"], s = 0; s < i.length; s++) {
                        var r = i[s];
                        if (r in t && ("string" == typeof t[r] || "number" == typeof t[r])) return t[r]
                    }
                    throw Error("No valid id attribute found")
                }(e.attributes, i)
            } catch (t) {}
            return JSON.stringify(s.geometry) === JSON.stringify({}) && (s.geometry = null), e.spatialReference && e.spatialReference.wkid && 4326 !== e.spatialReference.wkid && console.warn("Object converted in non-standard crs - " + JSON.stringify(e.spatialReference)), s
        },
        L = function t(e, i) {
            i = i || "OBJECTID";
            var s, r = {
                    wkid: 4326
                },
                o = {};
            switch (e.type) {
                case "Point":
                    o.x = e.coordinates[0], o.y = e.coordinates[1], o.spatialReference = r;
                    break;
                case "MultiPoint":
                    o.points = e.coordinates.slice(0), o.spatialReference = r;
                    break;
                case "LineString":
                    o.paths = [e.coordinates.slice(0)], o.spatialReference = r;
                    break;
                case "MultiLineString":
                    o.paths = e.coordinates.slice(0), o.spatialReference = r;
                    break;
                case "Polygon":
                    o.rings = b(e.coordinates.slice(0)), o.spatialReference = r;
                    break;
                case "MultiPolygon":
                    o.rings = function (t) {
                        for (var e = [], i = 0; i < t.length; i++)
                            for (var s = b(t[i]), r = s.length - 1; 0 <= r; r--) {
                                var o = s[r].slice(0);
                                e.push(o)
                            }
                        return e
                    }(e.coordinates.slice(0)), o.spatialReference = r;
                    break;
                case "Feature":
                    e.geometry && (o.geometry = t(e.geometry, i)), o.attributes = e.properties ? m(e.properties) : {}, e.id && (o.attributes[i] = e.id);
                    break;
                case "FeatureCollection":
                    for (o = [], s = 0; s < e.features.length; s++) o.push(t(e.features[s], i));
                    break;
                case "GeometryCollection":
                    for (o = [], s = 0; s < e.geometries.length; s++) o.push(t(e.geometries[s], i))
            }
            return o
        },
        A = '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>';
    /* @preserve
     * @terraformer/arcgis - v2.0.6 - MIT
     * Copyright (c) 2012-2020 Environmental Systems Research Institute, Inc.
     * Mon May 18 2020 14:30:35 GMT-0700 (Pacific Daylight Time)
     */
    /* Copyright (c) 2012-2019 Environmental Systems Research Institute, Inc.
     * Apache-2.0 */
    function I(t, e) {
        return L(t, e)
    }

    function T(t, e) {
        return S(t, e)
    }

    function C(t) {
        if ("NaN" === t.xmin || "NaN" === t.ymin || "NaN" === t.xmax || "NaN" === t.ymax) return null;
        var e = g.latLng(t.ymin, t.xmin),
            i = g.latLng(t.ymax, t.xmax);
        return g.latLngBounds(e, i)
    }

    function w(t) {
        return {
            xmin: (t = g.latLngBounds(t)).getSouthWest().lng,
            ymin: t.getSouthWest().lat,
            xmax: t.getNorthEast().lng,
            ymax: t.getNorthEast().lat,
            spatialReference: {
                wkid: 4326
            }
        }
    }
    var R = /^(OBJECTID|FID|OID|ID)$/i;

    function P(t) {
        var e;
        if (t.objectIdFieldName) e = t.objectIdFieldName;
        else if (t.fields) {
            for (var i = 0; i <= t.fields.length - 1; i++)
                if ("esriFieldTypeOID" === t.fields[i].type) {
                    e = t.fields[i].name;
                    break
                } if (!e)
                for (i = 0; i <= t.fields.length - 1; i++)
                    if (t.fields[i].name.match(R)) {
                        e = t.fields[i].name;
                        break
                    }
        }
        return e
    }

    function F(t) {
        for (var e in t.attributes)
            if (e.match(R)) return e
    }

    function O(t, e) {
        var i = t.features || t.results,
            s = i && i.length,
            r = e || P(t),
            o = {
                type: "FeatureCollection",
                features: []
            };
        if (s)
            for (var n = i.length - 1; 0 <= n; n--) {
                var a = T(i[n], r || F(i[n]));
                o.features.push(a)
            }
        return o
    }

    function M(t) {
        return "/" !== (t = g.Util.trim(t))[t.length - 1] && (t += "/"), t
    }

    function k(t) {
        var e;
        return -1 !== t.url.indexOf("?") && (t.requestParams = t.requestParams || {}, e = t.url.substring(t.url.indexOf("?") + 1), t.url = t.url.split("?")[0], t.requestParams = JSON.parse('{"' + decodeURI(e).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')), t.url = M(t.url.split("?")[0]), t
    }

    function U(t) {
        return /^(?!.*utility\.arcgis\.com).*\.arcgis\.com.*FeatureServer/i.test(t)
    }

    function G(t) {
        var e;
        switch (t) {
            case "Point":
                e = "esriGeometryPoint";
                break;
            case "MultiPoint":
                e = "esriGeometryMultipoint";
                break;
            case "LineString":
            case "MultiLineString":
                e = "esriGeometryPolyline";
                break;
            case "Polygon":
            case "MultiPolygon":
                e = "esriGeometryPolygon"
        }
        return e
    }

    function D(t) {
        return t.getSize().x - s.attributionWidthOffset + "px"
    }

    function q(e) {
        var t, i;
        e.attributionControl && (e.attributionControl._esriAttributionLayerCount || (e.attributionControl._esriAttributionLayerCount = 0), 0 === e.attributionControl._esriAttributionLayerCount && (e.attributionControl._esriAttributionAddedOnce || ((t = document.createElement("style")).type = "text/css", t.innerHTML = ".esri-truncated-attribution:hover {white-space: normal;}", document.getElementsByTagName("head")[0].appendChild(t), (i = document.createElement("style")).type = "text/css", i.innerHTML = ".esri-truncated-attribution {vertical-align: -3px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;transition: 0s white-space;transition-delay: 1s;max-width: " + D(e) + ";}", document.getElementsByTagName("head")[0].appendChild(i), e.on("resize", function (t) {
            e.attributionControl && (e.attributionControl._container.style.maxWidth = D(t.target))
        }), e.attributionControl._esriAttributionAddedOnce = !0), e.attributionControl.setPrefix(A + ' | Powered by <a href="https://www.esri.com">Esri</a>'), g.DomUtil.addClass(e.attributionControl._container, "esri-truncated-attribution:hover"), g.DomUtil.addClass(e.attributionControl._container, "esri-truncated-attribution")), e.attributionControl._esriAttributionLayerCount = e.attributionControl._esriAttributionLayerCount + 1)
    }

    function E(t) {
        t.attributionControl && (t.attributionControl._esriAttributionLayerCount && 1 === t.attributionControl._esriAttributionLayerCount && (t.attributionControl.setPrefix(A), g.DomUtil.removeClass(t.attributionControl._container, "esri-truncated-attribution:hover"), g.DomUtil.removeClass(t.attributionControl._container, "esri-truncated-attribution")), t.attributionControl._esriAttributionLayerCount = t.attributionControl._esriAttributionLayerCount - 1)
    }

    function B(t) {
        var e = {
            geometry: null,
            geometryType: null
        };
        return t instanceof g.LatLngBounds ? (e.geometry = w(t), e.geometryType = "esriGeometryEnvelope", e) : (t.getLatLng && (t = t.getLatLng()), t instanceof g.LatLng && (t = {
            type: "Point",
            coordinates: [t.lng, t.lat]
        }), t instanceof g.GeoJSON && (t = t.getLayers()[0].feature.geometry, e.geometry = I(t), e.geometryType = G(t.type)), t.toGeoJSON && (t = t.toGeoJSON()), "Feature" === t.type && (t = t.geometry), "Point" === t.type || "LineString" === t.type || "Polygon" === t.type || "MultiPolygon" === t.type ? (e.geometry = I(t), e.geometryType = G(t.type), e) : void d("invalid geometry passed to spatial query. Should be L.LatLng, L.LatLngBounds, L.Marker or a GeoJSON Point, Line, Polygon or MultiPolygon object"))
    }

    function z(t, l) {
        a.cors && h(t, {}, g.Util.bind(function (t, e) {
            if (!t) {
                l._esriAttributions = [];
                for (var i = 0; i < e.contributors.length; i++)
                    for (var s = e.contributors[i], r = 0; r < s.coverageAreas.length; r++) {
                        var o = s.coverageAreas[r],
                            n = g.latLng(o.bbox[0], o.bbox[1]),
                            a = g.latLng(o.bbox[2], o.bbox[3]);
                        l._esriAttributions.push({
                            attribution: s.attribution,
                            score: o.score,
                            bounds: g.latLngBounds(n, a),
                            minZoom: o.zoomMin,
                            maxZoom: o.zoomMax
                        })
                    }
                l._esriAttributions.sort(function (t, e) {
                    return e.score - t.score
                }), Z({
                    target: l
                })
            }
        }, this))
    }

    function Z(t) {
        var e = t.target,
            i = e._esriAttributions;
        if (e && e.attributionControl) {
            var s = e.attributionControl._container.querySelector(".esri-dynamic-attribution");
            if (s && i) {
                for (var r = "", o = e.getBounds(), n = g.latLngBounds(o.getSouthWest().wrap(), o.getNorthEast().wrap()), a = e.getZoom(), l = 0; l < i.length; l++) {
                    var u = i[l],
                        h = u.attribution;
                    !r.match(h) && u.bounds.intersects(n) && a >= u.minZoom && a <= u.maxZoom && (r += ", " + h)
                }
                r = r.substr(2), s.innerHTML = r, s.style.maxWidth = D(e), e.fire("attributionupdated", {
                    attribution: r
                })
            }
        }
    }
    var N = {
            warn: d,
            cleanUrl: M,
            getUrlParams: k,
            isArcgisOnline: U,
            geojsonTypeToArcGIS: G,
            responseToFeatureCollection: O,
            geojsonToArcGIS: I,
            arcgisToGeoJSON: T,
            boundsToExtent: w,
            extentToBounds: C,
            calcAttributionWidth: D,
            setEsriAttribution: q,
            _setGeometry: B,
            _getAttributionData: z,
            _updateMapAttribution: Z,
            _findIdAttributeFromFeature: F,
            _findIdAttributeFromResponse: P
        },
        j = g.Class.extend({
            options: {
                proxy: !1,
                useCors: e
            },
            generateSetter: function (e, t) {
                return g.Util.bind(function (t) {
                    return this.params[e] = t, this
                }, t)
            },
            initialize: function (t) {
                if (t.request && t.options ? (this._service = t, g.Util.setOptions(this, t.options)) : (g.Util.setOptions(this, t), this.options.url = M(t.url)), this.params = g.Util.extend({}, this.params || {}), this.setters)
                    for (var e in this.setters) {
                        var i = this.setters[e];
                        this[e] = this.generateSetter(i, this)
                    }
            },
            token: function (t) {
                return this._service ? this._service.authenticate(t) : this.params.token = t, this
            },
            format: function (t) {
                return this.params.returnUnformattedValues = !t, this
            },
            request: function (t, e) {
                return this.options.requestParams && g.Util.extend(this.params, this.options.requestParams), this._service ? this._service.request(this.path, this.params, t, e) : this._request("request", this.path, this.params, t, e)
            },
            _request: function (t, e, i, s, r) {
                var o = this.options.proxy ? this.options.proxy + "?" + this.options.url + e : this.options.url + e;
                return "get" !== t && "request" !== t || this.options.useCors ? x[t](o, i, s, r) : x.get.JSONP(o, i, s, r)
            }
        });
    var W = j.extend({
        setters: {
            offset: "resultOffset",
            limit: "resultRecordCount",
            fields: "outFields",
            precision: "geometryPrecision",
            featureIds: "objectIds",
            returnGeometry: "returnGeometry",
            returnM: "returnM",
            transform: "datumTransformation",
            token: "token"
        },
        path: "query",
        params: {
            returnGeometry: !0,
            where: "1=1",
            outSR: 4326,
            outFields: "*"
        },
        within: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelContains", this
        },
        intersects: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelIntersects", this
        },
        contains: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelWithin", this
        },
        crosses: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelCrosses", this
        },
        touches: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelTouches", this
        },
        overlaps: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelOverlaps", this
        },
        bboxIntersects: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelEnvelopeIntersects", this
        },
        indexIntersects: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelIndexIntersects", this
        },
        nearby: function (t, e) {
            return t = g.latLng(t), this.params.geometry = [t.lng, t.lat], this.params.geometryType = "esriGeometryPoint", this.params.spatialRel = "esriSpatialRelIntersects", this.params.units = "esriSRUnit_Meter", this.params.distance = e, this.params.inSR = 4326, this
        },
        where: function (t) {
            return this.params.where = t, this
        },
        between: function (t, e) {
            return this.params.time = [t.valueOf(), e.valueOf()], this
        },
        simplify: function (t, e) {
            var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
            return this.params.maxAllowableOffset = i / t.getSize().y * e, this
        },
        orderBy: function (t, e) {
            return e = e || "ASC", this.params.orderByFields = this.params.orderByFields ? this.params.orderByFields + "," : "", this.params.orderByFields += [t, e].join(" "), this
        },
        run: function (i, s) {
            return this._cleanParams(), this.options.isModern || U(this.options.url) && void 0 === this.options.isModern ? (this.params.f = "geojson", this.request(function (t, e) {
                this._trapSQLerrors(t), i.call(s, t, e, e)
            }, this)) : this.request(function (t, e) {
                this._trapSQLerrors(t), i.call(s, t, e && O(e), e)
            }, this)
        },
        count: function (i, t) {
            return this._cleanParams(), this.params.returnCountOnly = !0, this.request(function (t, e) {
                i.call(this, t, e && e.count, e)
            }, t)
        },
        ids: function (i, t) {
            return this._cleanParams(), this.params.returnIdsOnly = !0, this.request(function (t, e) {
                i.call(this, t, e && e.objectIds, e)
            }, t)
        },
        bounds: function (i, s) {
            return this._cleanParams(), this.params.returnExtentOnly = !0, this.request(function (t, e) {
                e && e.extent && C(e.extent) ? i.call(s, t, C(e.extent), e) : (t = {
                    message: "Invalid Bounds"
                }, i.call(s, t, null, e))
            }, s)
        },
        distinct: function () {
            return this.params.returnGeometry = !1, this.params.returnDistinctValues = !0, this
        },
        pixelSize: function (t) {
            var e = g.point(t);
            return this.params.pixelSize = [e.x, e.y], this
        },
        layer: function (t) {
            return this.path = t + "/query", this
        },
        _trapSQLerrors: function (t) {
            t && "400" === t.code && d("one common syntax error in query requests is encasing string values in double quotes instead of single quotes")
        },
        _cleanParams: function () {
            delete this.params.returnIdsOnly, delete this.params.returnExtentOnly, delete this.params.returnCountOnly
        },
        _setGeometryParams: function (t) {
            this.params.inSR = 4326;
            var e = B(t);
            this.params.geometry = e.geometry, this.params.geometryType = e.geometryType
        }
    });

    function J(t) {
        return new W(t)
    }
    var V = j.extend({
        setters: {
            contains: "contains",
            text: "searchText",
            fields: "searchFields",
            spatialReference: "sr",
            sr: "sr",
            layers: "layers",
            returnGeometry: "returnGeometry",
            maxAllowableOffset: "maxAllowableOffset",
            precision: "geometryPrecision",
            dynamicLayers: "dynamicLayers",
            returnZ: "returnZ",
            returnM: "returnM",
            gdbVersion: "gdbVersion",
            token: "token"
        },
        path: "find",
        params: {
            sr: 4326,
            contains: !0,
            returnGeometry: !0,
            returnZ: !0,
            returnM: !1
        },
        layerDefs: function (t, e) {
            return this.params.layerDefs = this.params.layerDefs ? this.params.layerDefs + ";" : "", this.params.layerDefs += [t, e].join(":"), this
        },
        simplify: function (t, e) {
            var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
            return this.params.maxAllowableOffset = i / t.getSize().y * e, this
        },
        run: function (i, s) {
            return this.request(function (t, e) {
                i.call(s, t, e && O(e), e)
            }, s)
        }
    });

    function Q(t) {
        return new V(t)
    }
    var K = j.extend({
        path: "identify",
        between: function (t, e) {
            return this.params.time = [t.valueOf(), e.valueOf()], this
        }
    });
    var H = K.extend({
        setters: {
            layers: "layers",
            precision: "geometryPrecision",
            tolerance: "tolerance",
            returnGeometry: "returnGeometry"
        },
        params: {
            sr: 4326,
            layers: "all",
            tolerance: 3,
            returnGeometry: !0
        },
        on: function (t) {
            var e = w(t.getBounds()),
                i = t.getSize();
            return this.params.imageDisplay = [i.x, i.y, 96], this.params.mapExtent = [e.xmin, e.ymin, e.xmax, e.ymax], this
        },
        at: function (t) {
            return 2 === t.length && (t = g.latLng(t)), this._setGeometryParams(t), this
        },
        layerDef: function (t, e) {
            return this.params.layerDefs = this.params.layerDefs ? this.params.layerDefs + ";" : "", this.params.layerDefs += [t, e].join(":"), this
        },
        simplify: function (t, e) {
            var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
            return this.params.maxAllowableOffset = i / t.getSize().y * e, this
        },
        run: function (r, o) {
            return this.request(function (t, e) {
                if (t) r.call(o, t, void 0, e);
                else {
                    var i = O(e);
                    e.results = e.results.reverse();
                    for (var s = 0; s < i.features.length; s++) {
                        i.features[s].layerId = e.results[s].layerId
                    }
                    r.call(o, void 0, i, e)
                }
            })
        },
        _setGeometryParams: function (t) {
            var e = B(t);
            this.params.geometry = e.geometry, this.params.geometryType = e.geometryType
        }
    });

    function X(t) {
        return new H(t)
    }
    var Y = K.extend({
        setters: {
            setMosaicRule: "mosaicRule",
            setRenderingRule: "renderingRule",
            setPixelSize: "pixelSize",
            returnCatalogItems: "returnCatalogItems",
            returnGeometry: "returnGeometry"
        },
        params: {
            returnGeometry: !1
        },
        at: function (t) {
            return t = g.latLng(t), this.params.geometry = JSON.stringify({
                x: t.lng,
                y: t.lat,
                spatialReference: {
                    wkid: 4326
                }
            }), this.params.geometryType = "esriGeometryPoint", this
        },
        getMosaicRule: function () {
            return this.params.mosaicRule
        },
        getRenderingRule: function () {
            return this.params.renderingRule
        },
        getPixelSize: function () {
            return this.params.pixelSize
        },
        run: function (i, s) {
            return this.request(function (t, e) {
                i.call(s, t, e && this._responseToGeoJSON(e), e)
            }, this)
        },
        _responseToGeoJSON: function (t) {
            var e = t.location,
                i = t.catalogItems,
                s = t.catalogItemVisibilities,
                r = {
                    pixel: {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [e.x, e.y]
                        },
                        crs: {
                            type: "EPSG",
                            properties: {
                                code: e.spatialReference.wkid
                            }
                        },
                        properties: {
                            OBJECTID: t.objectId,
                            name: t.name,
                            value: t.value
                        },
                        id: t.objectId
                    }
                };
            if (t.properties && t.properties.Values && (r.pixel.properties.values = t.properties.Values), i && i.features && (r.catalogItems = O(i), s && s.length === r.catalogItems.features.length))
                for (var o = s.length - 1; 0 <= o; o--) r.catalogItems.features[o].properties.catalogItemVisibility = s[o];
            return r
        }
    });

    function $(t) {
        return new Y(t)
    }
    var tt = g.Evented.extend({
        options: {
            proxy: !1,
            useCors: e,
            timeout: 0
        },
        initialize: function (t) {
            t = t || {}, this._requestQueue = [], this._authenticating = !1, g.Util.setOptions(this, t), this.options.url = M(this.options.url)
        },
        get: function (t, e, i, s) {
            return this._request("get", t, e, i, s)
        },
        post: function (t, e, i, s) {
            return this._request("post", t, e, i, s)
        },
        request: function (t, e, i, s) {
            return this._request("request", t, e, i, s)
        },
        metadata: function (t, e) {
            return this._request("get", "", {}, t, e)
        },
        authenticate: function (t) {
            return this._authenticating = !1, this.options.token = t, this._runQueue(), this
        },
        getTimeout: function () {
            return this.options.timeout
        },
        setTimeout: function (t) {
            this.options.timeout = t
        },
        _request: function (t, e, i, s, r) {
            this.fire("requeststart", {
                url: this.options.url + e,
                params: i,
                method: t
            }, !0);
            var o = this._createServiceCallback(t, e, i, s, r);
            if (this.options.token && (i.token = this.options.token), this.options.requestParams && g.Util.extend(i, this.options.requestParams), !this._authenticating) {
                var n = this.options.proxy ? this.options.proxy + "?" + this.options.url + e : this.options.url + e;
                return "get" !== t && "request" !== t || this.options.useCors ? x[t](n, i, o, r) : x.get.JSONP(n, i, o, r)
            }
            this._requestQueue.push([t, e, i, s, r])
        },
        _createServiceCallback: function (i, s, r, o, n) {
            return g.Util.bind(function (t, e) {
                !t || 499 !== t.code && 498 !== t.code || (this._authenticating = !0, this._requestQueue.push([i, s, r, o, n]), this.fire("authenticationrequired", {
                    authenticate: g.Util.bind(this.authenticate, this)
                }, !0), t.authenticate = g.Util.bind(this.authenticate, this)), o.call(n, t, e), t ? this.fire("requesterror", {
                    url: this.options.url + s,
                    params: r,
                    message: t.message,
                    code: t.code,
                    method: i
                }, !0) : this.fire("requestsuccess", {
                    url: this.options.url + s,
                    params: r,
                    response: e,
                    method: i
                }, !0), this.fire("requestend", {
                    url: this.options.url + s,
                    params: r,
                    method: i
                }, !0)
            }, this)
        },
        _runQueue: function () {
            for (var t = this._requestQueue.length - 1; 0 <= t; t--) {
                var e = this._requestQueue[t];
                this[e.shift()].apply(this, e)
            }
            this._requestQueue = []
        }
    });
    var et = tt.extend({
        identify: function () {
            return X(this)
        },
        find: function () {
            return Q(this)
        },
        query: function () {
            return J(this)
        }
    });

    function it(t) {
        return new et(t)
    }
    var st = tt.extend({
        query: function () {
            return J(this)
        },
        identify: function () {
            return $(this)
        }
    });

    function rt(t) {
        return new st(t)
    }
    var ot = tt.extend({
        options: {
            idAttribute: "OBJECTID"
        },
        query: function () {
            return J(this)
        },
        addFeature: function (t, e, i) {
            this.addFeatures(t, e, i)
        },
        addFeatures: function (t, s, r) {
            for (var e = t.features ? t.features : [t], i = e.length - 1; 0 <= i; i--) delete e[i].id;
            return t = I(t), t = 1 < e.length ? t : [t], this.post("addFeatures", {
                features: t
            }, function (t, e) {
                var i = e && e.addResults ? 1 < e.addResults.length ? e.addResults : e.addResults[0] : void 0;
                s && s.call(r, t || e.addResults[0].error, i)
            }, r)
        },
        updateFeature: function (t, e, i) {
            this.updateFeatures(t, e, i)
        },
        updateFeatures: function (t, s, r) {
            var e = t.features ? t.features : [t];
            return t = I(t, this.options.idAttribute), t = 1 < e.length ? t : [t], this.post("updateFeatures", {
                features: t
            }, function (t, e) {
                var i = e && e.updateResults ? 1 < e.updateResults.length ? e.updateResults : e.updateResults[0] : void 0;
                s && s.call(r, t || e.updateResults[0].error, i)
            }, r)
        },
        deleteFeature: function (t, e, i) {
            this.deleteFeatures(t, e, i)
        },
        deleteFeatures: function (t, s, r) {
            return this.post("deleteFeatures", {
                objectIds: t
            }, function (t, e) {
                var i = e && e.deleteResults ? 1 < e.deleteResults.length ? e.deleteResults : e.deleteResults[0] : void 0;
                s && s.call(r, t || e.deleteResults[0].error, i)
            }, r)
        }
    });

    function nt(t) {
        return new ot(t)
    }
    var at = "https:" !== window.location.protocol ? "http:" : "https:",
        lt = g.TileLayer.extend({
            statics: {
                TILES: {
                    Streets: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 19,
                            subdomains: ["server", "services"],
                            attribution: "USGS, NOAA",
                            attributionUrl: "https://static.arcgis.com/attribution/World_Street_Map"
                        }
                    },
                    Topographic: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 19,
                            subdomains: ["server", "services"],
                            attribution: "USGS, NOAA",
                            attributionUrl: "https://static.arcgis.com/attribution/World_Topo_Map"
                        }
                    },
                    Oceans: {
                        urlTemplate: at + "//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 16,
                            subdomains: ["server", "services"],
                            attribution: "USGS, NOAA",
                            attributionUrl: "https://static.arcgis.com/attribution/Ocean_Basemap"
                        }
                    },
                    OceansLabels: {
                        urlTemplate: at + "//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 16,
                            subdomains: ["server", "services"],
                            pane: i ? "esri-labels" : "tilePane",
                            attribution: ""
                        }
                    },
                    NationalGeographic: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 16,
                            subdomains: ["server", "services"],
                            attribution: "National Geographic, DeLorme, HERE, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, increment P Corp."
                        }
                    },
                    DarkGray: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 16,
                            subdomains: ["server", "services"],
                            attribution: "HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors"
                        }
                    },
                    DarkGrayLabels: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 16,
                            subdomains: ["server", "services"],
                            pane: i ? "esri-labels" : "tilePane",
                            attribution: ""
                        }
                    },
                    Gray: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 16,
                            subdomains: ["server", "services"],
                            attribution: "HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors"
                        }
                    },
                    GrayLabels: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 16,
                            subdomains: ["server", "services"],
                            pane: i ? "esri-labels" : "tilePane",
                            attribution: ""
                        }
                    },
                    Imagery: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 19,
                            subdomains: ["server", "services"],
                            attribution: "DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community",
                            attributionUrl: "https://static.arcgis.com/attribution/World_Imagery"
                        }
                    },
                    ImageryLabels: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 19,
                            subdomains: ["server", "services"],
                            pane: i ? "esri-labels" : "tilePane",
                            attribution: ""
                        }
                    },
                    ImageryTransportation: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 19,
                            subdomains: ["server", "services"],
                            pane: i ? "esri-labels" : "tilePane",
                            attribution: ""
                        }
                    },
                    ShadedRelief: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 13,
                            subdomains: ["server", "services"],
                            attribution: "USGS"
                        }
                    },
                    ShadedReliefLabels: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 12,
                            subdomains: ["server", "services"],
                            pane: i ? "esri-labels" : "tilePane",
                            attribution: ""
                        }
                    },
                    Terrain: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 13,
                            subdomains: ["server", "services"],
                            attribution: "USGS, NOAA"
                        }
                    },
                    TerrainLabels: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 13,
                            subdomains: ["server", "services"],
                            pane: i ? "esri-labels" : "tilePane",
                            attribution: ""
                        }
                    },
                    USATopo: {
                        urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 15,
                            subdomains: ["server", "services"],
                            attribution: "USGS, National Geographic Society, i-cubed"
                        }
                    },
                    ImageryClarity: {
                        urlTemplate: at + "//clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 19,
                            attribution: "Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community"
                        }
                    },
                    Physical: {
                        urlTemplate: at + "//{s}.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 8,
                            subdomains: ["server", "services"],
                            attribution: "U.S. National Park Service"
                        }
                    },
                    ImageryFirefly: {
                        urlTemplate: at + "//fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 19,
                            attribution: "Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community",
                            attributionUrl: "https://static.arcgis.com/attribution/World_Imagery"
                        }
                    }
                }
            },
            initialize: function (t, e) {
                var i;
                if ("object" == typeof t && t.urlTemplate && t.options) i = t;
                else {
                    if ("string" != typeof t || !lt.TILES[t]) throw new Error('L.esri.BasemapLayer: Invalid parameter. Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Physical", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ImageryClarity", "ImageryFirefly", ShadedRelief", "ShadedReliefLabels", "Terrain", "TerrainLabels" or "USATopo"');
                    i = lt.TILES[t]
                }
                var s = g.Util.extend(i.options, e);
                g.Util.setOptions(this, s), this.options.token && -1 === i.urlTemplate.indexOf("token=") && (i.urlTemplate += "?token=" + this.options.token), this.options.proxy && (i.urlTemplate = this.options.proxy + "?" + i.urlTemplate), g.TileLayer.prototype.initialize.call(this, i.urlTemplate, s)
            },
            onAdd: function (t) {
                q(t), "esri-labels" === this.options.pane && this._initPane(), this.options.attributionUrl && z((this.options.proxy ? this.options.proxy + "?" : "") + this.options.attributionUrl, t), t.on("moveend", Z), g.TileLayer.prototype.onAdd.call(this, t)
            },
            onRemove: function (t) {
                E(t), t.off("moveend", Z), g.TileLayer.prototype.onRemove.call(this, t)
            },
            _initPane: function () {
                var t;
                this._map.getPane(this.options.pane) || ((t = this._map.createPane(this.options.pane)).style.pointerEvents = "none", t.style.zIndex = 500)
            },
            getAttribution: function () {
                var t;
                return this.options.attribution && (t = '<span class="esri-dynamic-attribution">' + this.options.attribution + "</span>"), t
            }
        });
    var ut = g.TileLayer.extend({
        options: {
            zoomOffsetAllowance: .1,
            errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAA1BMVEUzNDVszlHHAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAAAAAAAAAB6mUWpAAAADZJREFUeJztwQEBAAAAgiD/r25IQAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7waBAAABw08RwAAAAABJRU5ErkJggg=="
        },
        statics: {
            MercatorZoomLevels: {
                0: 156543.033928,
                1: 78271.5169639999,
                2: 39135.7584820001,
                3: 19567.8792409999,
                4: 9783.93962049996,
                5: 4891.96981024998,
                6: 2445.98490512499,
                7: 1222.99245256249,
                8: 611.49622628138,
                9: 305.748113140558,
                10: 152.874056570411,
                11: 76.4370282850732,
                12: 38.2185141425366,
                13: 19.1092570712683,
                14: 9.55462853563415,
                15: 4.77731426794937,
                16: 2.38865713397468,
                17: 1.19432856685505,
                18: .597164283559817,
                19: .298582141647617,
                20: .14929107082381,
                21: .07464553541191,
                22: .0373227677059525,
                23: .0186613838529763
            }
        },
        initialize: function (t) {
            t = k(t = g.Util.setOptions(this, t)), this.tileUrl = (t.proxy ? t.proxy + "?" : "") + t.url + "tile/{z}/{y}/{x}" + (t.requestParams && 0 < Object.keys(t.requestParams).length ? g.Util.getParamString(t.requestParams) : ""), -1 !== t.url.indexOf("{s}") && t.subdomains && (t.url = t.url.replace("{s}", t.subdomains[0])), this.service = it(t), this.service.addEventParent(this), new RegExp(/tiles.arcgis(online)?\.com/g).test(t.url) && (this.tileUrl = this.tileUrl.replace("://tiles", "://tiles{s}"), t.subdomains = ["1", "2", "3", "4"]), this.options.token && (this.tileUrl += "?token=" + this.options.token), g.TileLayer.prototype.initialize.call(this, this.tileUrl, t)
        },
        getTileUrl: function (t) {
            var e = this._getZoomForUrl();
            return g.Util.template(this.tileUrl, g.Util.extend({
                s: this._getSubdomain(t),
                x: t.x,
                y: t.y,
                z: this._lodMap && this._lodMap[e] ? this._lodMap[e] : e
            }, this.options))
        },
        createTile: function (t, e) {
            var i = document.createElement("img");
            return g.DomEvent.on(i, "load", g.Util.bind(this._tileOnLoad, this, e, i)), g.DomEvent.on(i, "error", g.Util.bind(this._tileOnError, this, e, i)), this.options.crossOrigin && (i.crossOrigin = ""), i.alt = "", !this._lodMap || this._lodMap && this._lodMap[this._getZoomForUrl()] ? i.src = this.getTileUrl(t) : this.once("lodmap", function () {
                i.src = this.getTileUrl(t)
            }, this), i
        },
        onAdd: function (u) {
            q(u), this._lodMap || this.metadata(function (t, e) {
                if (!t && e.spatialReference) {
                    var i = e.spatialReference.latestWkid || e.spatialReference.wkid;
                    if (!this.options.attribution && u.attributionControl && e.copyrightText && (this.options.attribution = e.copyrightText, u.attributionControl.addAttribution(this.getAttribution())), u.options.crs !== g.CRS.EPSG3857 || 102100 !== i && 3857 !== i) u.options.crs && u.options.crs.code && -1 < u.options.crs.code.indexOf(i) || d("L.esri.TiledMapLayer is using a non-mercator spatial reference. Support may be available through Proj4Leaflet http://esri.github.io/esri-leaflet/examples/non-mercator-projection.html");
                    else {
                        this._lodMap = {};
                        for (var s = e.tileInfo.lods, r = ut.MercatorZoomLevels, o = 0; o < s.length; o++) {
                            var n = s[o];
                            for (var a in r) {
                                var l = r[a];
                                if (this._withinPercentage(n.resolution, l, this.options.zoomOffsetAllowance)) {
                                    this._lodMap[a] = n.level;
                                    break
                                }
                            }
                        }
                        this.fire("lodmap")
                    }
                }
            }, this), g.TileLayer.prototype.onAdd.call(this, u)
        },
        onRemove: function (t) {
            E(t)
        },
        metadata: function (t, e) {
            return this.service.metadata(t, e), this
        },
        identify: function () {
            return this.service.identify()
        },
        find: function () {
            return this.service.find()
        },
        query: function () {
            return this.service.query()
        },
        authenticate: function (t) {
            var e = "?token=" + t;
            return this.tileUrl = this.options.token ? this.tileUrl.replace(/\?token=(.+)/g, e) : this.tileUrl + e, this.options.token = t, this.service.authenticate(t), this
        },
        _withinPercentage: function (t, e, i) {
            return Math.abs(t / e - 1) < i
        }
    });
    var ht = g.ImageOverlay.extend({
            onAdd: function (t) {
                this._topLeft = t.getPixelBounds().min, g.ImageOverlay.prototype.onAdd.call(this, t)
            },
            _reset: function () {
                this._map.options.crs === g.CRS.EPSG3857 ? g.ImageOverlay.prototype._reset.call(this) : g.DomUtil.setPosition(this._image, this._topLeft.subtract(this._map.getPixelOrigin()))
            }
        }),
        ct = g.Layer.extend({
            options: {
                opacity: 1,
                position: "front",
                f: "image",
                useCors: e,
                attribution: null,
                interactive: !1,
                alt: ""
            },
            onAdd: function (i) {
                q(i), this.options.zIndex && (this.options.position = null), this._update = g.Util.throttle(this._update, this.options.updateInterval, this), i.on("moveend", this._update, this), this._currentImage && this._currentImage._bounds.equals(this._map.getBounds()) ? i.addLayer(this._currentImage) : this._currentImage && (this._map.removeLayer(this._currentImage), this._currentImage = null), this._update(), this._popup && (this._map.on("click", this._getPopupData, this), this._map.on("dblclick", this._resetPopupState, this)), this.metadata(function (t, e) {
                    !t && !this.options.attribution && i.attributionControl && e.copyrightText && (this.options.attribution = e.copyrightText, i.attributionControl.addAttribution(this.getAttribution()))
                }, this)
            },
            onRemove: function (t) {
                E(t), this._currentImage && this._map.removeLayer(this._currentImage), this._popup && (this._map.off("click", this._getPopupData, this), this._map.off("dblclick", this._resetPopupState, this)), this._map.off("moveend", this._update, this)
            },
            bindPopup: function (t, e) {
                return this._shouldRenderPopup = !1, this._lastClick = !1, this._popup = g.popup(e), this._popupFunction = t, this._map && (this._map.on("click", this._getPopupData, this), this._map.on("dblclick", this._resetPopupState, this)), this
            },
            unbindPopup: function () {
                return this._map && (this._map.closePopup(this._popup), this._map.off("click", this._getPopupData, this), this._map.off("dblclick", this._resetPopupState, this)), this._popup = !1, this
            },
            bringToFront: function () {
                return this.options.position = "front", this._currentImage && (this._currentImage.bringToFront(), this._setAutoZIndex(Math.max)), this
            },
            bringToBack: function () {
                return this.options.position = "back", this._currentImage && (this._currentImage.bringToBack(), this._setAutoZIndex(Math.min)), this
            },
            setZIndex: function (t) {
                return this.options.zIndex = t, this._currentImage && this._currentImage.setZIndex(t), this
            },
            _setAutoZIndex: function (t) {
                if (this._currentImage) {
                    for (var e, i = this._currentImage.getPane().children, s = -t(-1 / 0, 1 / 0), r = 0, o = i.length; r < o; r++) e = i[r].style.zIndex, i[r] !== this._currentImage._image && e && (s = t(s, +e));
                    isFinite(s) && (this.options.zIndex = s + t(-1, 1), this.setZIndex(this.options.zIndex))
                }
            },
            getAttribution: function () {
                return this.options.attribution
            },
            getOpacity: function () {
                return this.options.opacity
            },
            setOpacity: function (t) {
                return this.options.opacity = t, this._currentImage && this._currentImage.setOpacity(t), this
            },
            getTimeRange: function () {
                return [this.options.from, this.options.to]
            },
            setTimeRange: function (t, e) {
                return this.options.from = t, this.options.to = e, this._update(), this
            },
            metadata: function (t, e) {
                return this.service.metadata(t, e), this
            },
            authenticate: function (t) {
                return this.service.authenticate(t), this
            },
            redraw: function () {
                this._update()
            },
            _renderImage: function (t, s, e) {
                if (this._map) {
                    if (e && (t = "data:" + e + ";base64," + t), !t) return;
                    var r = new ht(t, s, {
                            opacity: 0,
                            crossOrigin: this.options.withCredentials ? "use-credentials" : this.options.useCors,
                            alt: this.options.alt,
                            pane: this.options.pane || this.getPane(),
                            interactive: this.options.interactive
                        }).addTo(this._map),
                        o = function (t) {
                            var e, i;
                            r.off("error", o, this), this._map && (e = t.target, i = this._currentImage, e._bounds.equals(s) && e._bounds.equals(this._map.getBounds()) ? (this._currentImage = e, "front" === this.options.position ? this.bringToFront() : "back" === this.options.position && this.bringToBack(), this.options.zIndex && this.setZIndex(this.options.zIndex), this._map && this._currentImage._map ? this._currentImage.setOpacity(this.options.opacity) : this._currentImage._map.removeLayer(this._currentImage), i && this._map && this._map.removeLayer(i), i && i._map && i._map.removeLayer(i)) : this._map.removeLayer(e)), this.fire("load", {
                                bounds: s
                            })
                        };
                    r.once("error", function () {
                        this._map.removeLayer(r), this.fire("error"), r.off("load", o, this)
                    }, this), r.once("load", o, this)
                }
            },
            _update: function () {
                var t, e, i;
                this._map && (t = this._map.getZoom(), e = this._map.getBounds(), this._animatingZoom || this._map._panTransition && this._map._panTransition._inProgress || (t > this.options.maxZoom || t < this.options.minZoom ? this._currentImage && (this._currentImage._map.removeLayer(this._currentImage), this._currentImage = null) : (i = this._buildExportParams(), g.Util.extend(i, this.options.requestParams), i ? (this._requestExport(i, e), this.fire("loading", {
                    bounds: e
                })) : this._currentImage && (this._currentImage._map.removeLayer(this._currentImage), this._currentImage = null))))
            },
            _renderPopup: function (t, e, i, s) {
                var r;
                t = g.latLng(t), this._shouldRenderPopup && this._lastClick.equals(t) && ((r = this._popupFunction(e, i, s)) && this._popup.setLatLng(t).setContent(r).openOn(this._map))
            },
            _resetPopupState: function (t) {
                this._shouldRenderPopup = !1, this._lastClick = t.latlng
            },
            _calculateBbox: function () {
                var t = this._map.getPixelBounds(),
                    e = this._map.unproject(t.getBottomLeft()),
                    i = this._map.unproject(t.getTopRight()),
                    s = this._map.options.crs.project(i),
                    r = this._map.options.crs.project(e),
                    o = g.bounds(s, r);
                return [o.getBottomLeft().x, o.getBottomLeft().y, o.getTopRight().x, o.getTopRight().y].join(",")
            },
            _calculateImageSize: function () {
                var t = this._map.getPixelBounds(),
                    e = this._map.getSize(),
                    i = this._map.unproject(t.getBottomLeft()),
                    s = this._map.unproject(t.getTopRight()),
                    r = this._map.latLngToLayerPoint(s).y,
                    o = this._map.latLngToLayerPoint(i).y;
                return (0 < r || o < e.y) && (e.y = o - r), e.x + "," + e.y
            }
        }),
        pt = ct.extend({
            options: {
                updateInterval: 150,
                format: "jpgpng",
                transparent: !0,
                f: "image"
            },
            query: function () {
                return this.service.query()
            },
            identify: function () {
                return this.service.identify()
            },
            initialize: function (t) {
                t = k(t), this.service = rt(t), this.service.addEventParent(this), g.Util.setOptions(this, t)
            },
            setPixelType: function (t) {
                return this.options.pixelType = t, this._update(), this
            },
            getPixelType: function () {
                return this.options.pixelType
            },
            setBandIds: function (t) {
                return g.Util.isArray(t) ? this.options.bandIds = t.join(",") : this.options.bandIds = t.toString(), this._update(), this
            },
            getBandIds: function () {
                return this.options.bandIds
            },
            setNoData: function (t, e) {
                return g.Util.isArray(t) ? this.options.noData = t.join(",") : this.options.noData = t.toString(), e && (this.options.noDataInterpretation = e), this._update(), this
            },
            getNoData: function () {
                return this.options.noData
            },
            getNoDataInterpretation: function () {
                return this.options.noDataInterpretation
            },
            setRenderingRule: function (t) {
                this.options.renderingRule = t, this._update()
            },
            getRenderingRule: function () {
                return this.options.renderingRule
            },
            setMosaicRule: function (t) {
                this.options.mosaicRule = t, this._update()
            },
            getMosaicRule: function () {
                return this.options.mosaicRule
            },
            _getPopupData: function (s) {
                var t = g.Util.bind(function (t, e, i) {
                        t || setTimeout(g.Util.bind(function () {
                            this._renderPopup(s.latlng, t, e, i)
                        }, this), 300)
                    }, this),
                    e = this.identify().at(s.latlng);
                this.options.mosaicRule && e.setMosaicRule(this.options.mosaicRule), e.run(t), this._shouldRenderPopup = !0, this._lastClick = s.latlng
            },
            _buildExportParams: function () {
                var t = parseInt(this._map.options.crs.code.split(":")[1], 10),
                    e = {
                        bbox: this._calculateBbox(),
                        size: this._calculateImageSize(),
                        format: this.options.format,
                        transparent: this.options.transparent,
                        bboxSR: t,
                        imageSR: t
                    };
                return this.options.from && this.options.to && (e.time = this.options.from.valueOf() + "," + this.options.to.valueOf()), this.options.pixelType && (e.pixelType = this.options.pixelType), this.options.interpolation && (e.interpolation = this.options.interpolation), this.options.compressionQuality && (e.compressionQuality = this.options.compressionQuality), this.options.bandIds && (e.bandIds = this.options.bandIds), 0 !== this.options.noData && !this.options.noData || (e.noData = this.options.noData), this.options.noDataInterpretation && (e.noDataInterpretation = this.options.noDataInterpretation), this.service.options.token && (e.token = this.service.options.token), this.options.renderingRule && (e.renderingRule = JSON.stringify(this.options.renderingRule)), this.options.mosaicRule && (e.mosaicRule = JSON.stringify(this.options.mosaicRule)), e
            },
            _requestExport: function (t, i) {
                var e;
                "json" === this.options.f ? this.service.request("exportImage", t, function (t, e) {
                    t || (this.options.token && (e.href += "?token=" + this.options.token), this.options.proxy && (e.href = this.options.proxy + "?" + e.href), this._renderImage(e.href, i))
                }, this) : (t.f = "image", e = this.options.url + "exportImage" + g.Util.getParamString(t), this.options.proxy && (e = this.options.proxy + "?" + e), this._renderImage(e, i))
            }
        });
    var dt = ct.extend({
        options: {
            updateInterval: 150,
            layers: !1,
            layerDefs: !1,
            timeOptions: !1,
            format: "png32",
            transparent: !0,
            f: "json"
        },
        initialize: function (t) {
            t = k(t), this.service = it(t), this.service.addEventParent(this), g.Util.setOptions(this, t)
        },
        getDynamicLayers: function () {
            return this.options.dynamicLayers
        },
        setDynamicLayers: function (t) {
            return this.options.dynamicLayers = t, this._update(), this
        },
        getLayers: function () {
            return this.options.layers
        },
        setLayers: function (t) {
            return this.options.layers = t, this._update(), this
        },
        getLayerDefs: function () {
            return this.options.layerDefs
        },
        setLayerDefs: function (t) {
            return this.options.layerDefs = t, this._update(), this
        },
        getTimeOptions: function () {
            return this.options.timeOptions
        },
        setTimeOptions: function (t) {
            return this.options.timeOptions = t, this._update(), this
        },
        query: function () {
            return this.service.query()
        },
        identify: function () {
            return this.service.identify()
        },
        find: function () {
            return this.service.find()
        },
        _getPopupData: function (s) {
            var t = g.Util.bind(function (t, e, i) {
                    t || setTimeout(g.Util.bind(function () {
                        this._renderPopup(s.latlng, t, e, i)
                    }, this), 300)
                }, this),
                e = this.options.popup ? this.options.popup.on(this._map).at(s.latlng) : this.identify().on(this._map).at(s.latlng);
            if (e.params.maxAllowableOffset || e.simplify(this._map, .5), this.options.popup && this.options.popup.params && this.options.popup.params.layers || (this.options.layers ? e.layers("visible:" + this.options.layers.join(",")) : e.layers("visible")), this.options.layerDefs && "string" != typeof this.options.layerDefs && !e.params.layerDefs)
                for (var i in this.options.layerDefs) this.options.layerDefs.hasOwnProperty(i) && e.layerDef(i, this.options.layerDefs[i]);
            e.run(t), this._shouldRenderPopup = !0, this._lastClick = s.latlng
        },
        _buildExportParams: function () {
            var t = parseInt(this._map.options.crs.code.split(":")[1], 10),
                e = {
                    bbox: this._calculateBbox(),
                    size: this._calculateImageSize(),
                    dpi: 96,
                    format: this.options.format,
                    transparent: this.options.transparent,
                    bboxSR: t,
                    imageSR: t
                };
            if (this.options.dynamicLayers && (e.dynamicLayers = this.options.dynamicLayers), this.options.layers) {
                if (0 === this.options.layers.length) return;
                e.layers = "show:" + this.options.layers.join(",")
            }
            return this.options.layerDefs && (e.layerDefs = "string" == typeof this.options.layerDefs ? this.options.layerDefs : JSON.stringify(this.options.layerDefs)), this.options.timeOptions && (e.timeOptions = JSON.stringify(this.options.timeOptions)), this.options.from && this.options.to && (e.time = this.options.from.valueOf() + "," + this.options.to.valueOf()), this.service.options.token && (e.token = this.service.options.token), this.options.proxy && (e.proxy = this.options.proxy), this.options.disableCache && (e._ts = Date.now()), e
        },
        _requestExport: function (t, i) {
            var e;
            "json" === this.options.f ? this.service.request("export", t, function (t, e) {
                t || (this.options.token && e.href && (e.href += "?token=" + this.options.token), this.options.proxy && e.href && (e.href = this.options.proxy + "?" + e.href), e.href ? this._renderImage(e.href, i) : this._renderImage(e.imageData, i, e.contentType))
            }, this) : (t.f = "image", e = this.options.url + "export" + g.Util.getParamString(t), this.options.proxy && (e = this.options.proxy + "?" + e), this._renderImage(e, i))
        }
    });
    var mt = g.Layer.extend({
        options: {
            cellSize: 512,
            updateWhenIdle: g.Browser.mobile,
            updateInterval: 150,
            noWrap: !1,
            keepBuffer: 1.5
        },
        initialize: function (t) {
            g.Util.setOptions(this, t)
        },
        onAdd: function (t) {
            this._cells = {}, this._activeCells = {}, this._resetView(), this._update()
        },
        onRemove: function (t) {
            this._removeAllCells(), this._cellZoom = void 0
        },
        isLoading: function () {
            return this._loading
        },
        redraw: function () {
            return this._map && (this._removeAllCells(), this._update()), this
        },
        getEvents: function () {
            var t = {
                viewprereset: this._invalidateAll,
                viewreset: this._resetView,
                zoom: this._resetView,
                moveend: this._onMoveEnd
            };
            return this.options.updateWhenIdle || (this._onMove || (this._onMove = g.Util.throttle(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), t
        },
        createCell: function () {
            return document.createElement("div")
        },
        removeCell: function () {},
        reuseCell: function () {},
        cellLeave: function () {},
        cellEnter: function () {},
        getCellSize: function () {
            var t = this.options.cellSize;
            return t instanceof g.Point ? t : new g.Point(t, t)
        },
        _pruneCells: function () {
            if (this._map) {
                var t, e, i;
                for (t in this._cells)(i = this._cells[t]).retain = i.current;
                for (t in this._cells) {
                    (i = this._cells[t]).current && !i.active && (e = i.coords, this._retainParent(e.x, e.y, e.z, e.z - 5) || this._retainChildren(e.x, e.y, e.z, e.z + 2))
                }
                for (t in this._cells) this._cells[t].retain || this._removeCell(t)
            }
        },
        _removeAllCells: function () {
            for (var t in this._cells) this._removeCell(t)
        },
        _invalidateAll: function () {
            this._removeAllCells(), this._cellZoom = void 0
        },
        _retainParent: function (t, e, i, s) {
            var r = Math.floor(t / 2),
                o = Math.floor(e / 2),
                n = i - 1,
                a = new g.Point(+r, +o);
            a.z = +n;
            var l = this._cellCoordsToKey(a),
                u = this._cells[l];
            return u && u.active ? u.retain = !0 : (u && u.loaded && (u.retain = !0), s < n && this._retainParent(r, o, n, s))
        },
        _retainChildren: function (t, e, i, s) {
            for (var r = 2 * t; r < 2 * t + 2; r++)
                for (var o = 2 * e; o < 2 * e + 2; o++) {
                    var n = new g.Point(r, o);
                    n.z = i + 1;
                    var a = this._cellCoordsToKey(n),
                        l = this._cells[a];
                    l && l.active ? l.retain = !0 : (l && l.loaded && (l.retain = !0), i + 1 < s && this._retainChildren(r, o, i + 1, s))
                }
        },
        _resetView: function (t) {
            var e = t && (t.pinch || t.flyTo);
            e || this._setView(this._map.getCenter(), this._map.getZoom(), e, e)
        },
        _setView: function (t, e, i, s) {
            var r = Math.round(e);
            s || (this._cellZoom = r, this._abortLoading && this._abortLoading(), this._resetGrid(), void 0 !== r && this._update(t), i || this._pruneCells(), this._noPrune = !!i)
        },
        _resetGrid: function () {
            var t = this._map,
                e = t.options.crs,
                i = this._cellSize = this.getCellSize(),
                s = this._cellZoom,
                r = this._map.getPixelWorldBounds(this._cellZoom);
            r && (this._globalCellRange = this._pxBoundsToCellRange(r)), this._wrapX = e.wrapLng && !this.options.noWrap && [Math.floor(t.project([0, e.wrapLng[0]], s).x / i.x), Math.ceil(t.project([0, e.wrapLng[1]], s).x / i.y)], this._wrapY = e.wrapLat && !this.options.noWrap && [Math.floor(t.project([e.wrapLat[0], 0], s).y / i.x), Math.ceil(t.project([e.wrapLat[1], 0], s).y / i.y)]
        },
        _onMoveEnd: function (t) {
            t && (t.pinch || t.flyTo) || !this._map || this._map._animatingZoom || this._update()
        },
        _getCelldPixelBounds: function (t) {
            var e = this._map,
                i = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(),
                s = e.getZoomScale(i, this._cellZoom),
                r = e.project(t, this._cellZoom).floor(),
                o = e.getSize().divideBy(2 * s);
            return new g.Bounds(r.subtract(o), r.add(o))
        },
        _update: function (t) {
            var e = this._map;
            if (e) {
                var i = Math.round(e.getZoom());
                void 0 === t && (t = e.getCenter());
                var s = this._getCelldPixelBounds(t),
                    r = this._pxBoundsToCellRange(s),
                    o = r.getCenter(),
                    n = [],
                    a = this.options.keepBuffer,
                    l = new g.Bounds(r.getBottomLeft().subtract([a, -a]), r.getTopRight().add([a, -a]));
                if (!(isFinite(r.min.x) && isFinite(r.min.y) && isFinite(r.max.x) && isFinite(r.max.y))) throw new Error("Attempted to load an infinite number of cells");
                for (var u in this._cells) {
                    var h = this._cells[u].coords;
                    h.z === this._cellZoom && l.contains(new g.Point(h.x, h.y)) || (this._cells[u].current = !1)
                }
                if (1 < Math.abs(i - this._cellZoom)) this._setView(t, i);
                else {
                    for (var c = r.min.y; c <= r.max.y; c++)
                        for (var p = r.min.x; p <= r.max.x; p++) {
                            var d, m = new g.Point(p, c);
                            m.z = this._cellZoom, this._isValidCell(m) && ((d = this._cells[this._cellCoordsToKey(m)]) ? d.current = !0 : n.push(m))
                        }
                    if (n.sort(function (t, e) {
                            return t.distanceTo(o) - e.distanceTo(o)
                        }), 0 !== n.length)
                        for (this._loading || (this._loading = !0), p = 0; p < n.length; p++) {
                            var f = this._cellCoordsToKey(n[p]),
                                y = this._keyToCellCoords(f);
                            this._activeCells[y] ? this._reuseCell(n[p]) : this._createCell(n[p])
                        }
                }
            }
        },
        _isValidCell: function (t) {
            var e = this._map.options.crs;
            if (!e.infinite) {
                var i = this._globalCellRange;
                if (!e.wrapLng && (t.x < i.min.x || t.x > i.max.x) || !e.wrapLat && (t.y < i.min.y || t.y > i.max.y)) return !1
            }
            if (!this.options.bounds) return !0;
            var s = this._cellCoordsToBounds(t);
            return g.toLatLngBounds(this.options.bounds).overlaps(s)
        },
        _keyToBounds: function (t) {
            return this._cellCoordsToBounds(this._keyToCellCoords(t))
        },
        _cellCoordsToNwSe: function (t) {
            var e = this._map,
                i = this.getCellSize(),
                s = t.scaleBy(i),
                r = s.add(i);
            return [e.unproject(s, t.z), e.unproject(r, t.z)]
        },
        _cellCoordsToBounds: function (t) {
            var e = this._cellCoordsToNwSe(t),
                i = new g.LatLngBounds(e[0], e[1]);
            return this.options.noWrap || (i = this._map.wrapLatLngBounds(i)), i
        },
        _cellCoordsToKey: function (t) {
            return t.x + ":" + t.y + ":" + t.z
        },
        _keyToCellCoords: function (t) {
            var e = t.split(":"),
                i = new g.Point(+e[0], +e[1]);
            return i.z = +e[2], i
        },
        _removeCell: function (t) {
            var e, i, s, r = this._cells[t];
            r && (e = this._keyToCellCoords(t), i = this._wrapCoords(e), s = this._cellCoordsToBounds(this._wrapCoords(e)), r.current = !1, delete this._cells[t], this._activeCells[t] = r, this.cellLeave(s, i, t), this.fire("cellleave", {
                key: t,
                coords: i,
                bounds: s
            }))
        },
        _reuseCell: function (t) {
            var e = this._cellCoordsToKey(t);
            this._cells[e] = this._activeCells[e], this._cells[e].current = !0;
            var i = this._wrapCoords(t),
                s = this._cellCoordsToBounds(this._wrapCoords(t));
            this.cellEnter(s, i, e), this.fire("cellenter", {
                key: e,
                coords: i,
                bounds: s
            })
        },
        _createCell: function (t) {
            var e = this._cellCoordsToKey(t),
                i = this._wrapCoords(t),
                s = this._cellCoordsToBounds(this._wrapCoords(t));
            this.createCell(s, i, e), this.fire("cellcreate", {
                key: e,
                coords: i,
                bounds: s
            }), this._cells[e] = {
                coords: t,
                current: !0
            }, g.Util.requestAnimFrame(this._pruneCells, this)
        },
        _cellReady: function (t, e, i) {
            var s = this._cellCoordsToKey(t);
            (i = this._cells[s]) && (i.loaded = +new Date, i.active = !0)
        },
        _getCellPos: function (t) {
            return t.scaleBy(this.getCellSize())
        },
        _wrapCoords: function (t) {
            var e = new g.Point(this._wrapX ? g.Util.wrapNum(t.x, this._wrapX) : t.x, this._wrapY ? g.Util.wrapNum(t.y, this._wrapY) : t.y);
            return e.z = t.z, e
        },
        _pxBoundsToCellRange: function (t) {
            var e = this.getCellSize();
            return new g.Bounds(t.min.unscaleBy(e).floor(), t.max.unscaleBy(e).ceil().subtract([1, 1]))
        }
    });

    function ft(t) {
        this.values = [].concat(t || [])
    }
    ft.prototype.query = function (t) {
        var e = this.getIndex(t);
        return this.values[e]
    }, ft.prototype.getIndex = function (t) {
        this.dirty && this.sort();
        for (var e, i, s = 0, r = this.values.length - 1; s <= r;)
            if (e = (s + r) / 2 | 0, +(i = this.values[Math.round(e)]).value < +t) s = 1 + e;
            else {
                if (!(+i.value > +t)) return e;
                r = e - 1
            } return Math.abs(~r)
    }, ft.prototype.between = function (t, e) {
        var i = this.getIndex(t),
            s = this.getIndex(e);
        if (0 === i && 0 === s) return [];
        for (; this.values[i - 1] && this.values[i - 1].value === t;) i--;
        for (; this.values[s + 1] && this.values[s + 1].value === e;) s++;
        return this.values[s] && this.values[s].value === e && this.values[s + 1] && s++, this.values.slice(i, s)
    }, ft.prototype.insert = function (t) {
        return this.values.splice(this.getIndex(t.value), 0, t), this
    }, ft.prototype.bulkAdd = function (t, e) {
        return this.values = this.values.concat([].concat(t || [])), e ? this.sort() : this.dirty = !0, this
    }, ft.prototype.sort = function () {
        return this.values.sort(function (t, e) {
            return e.value - t.value
        }).reverse(), this.dirty = !1, this
    };
    var yt = mt.extend({
            options: {
                attribution: null,
                where: "1=1",
                fields: ["*"],
                from: !1,
                to: !1,
                timeField: !1,
                timeFilterMode: "server",
                simplifyFactor: 0,
                precision: 6,
                fetchAllFeatures: !1
            },
            initialize: function (t) {
                if (mt.prototype.initialize.call(this, t), t = k(t), t = g.Util.setOptions(this, t), this.service = nt(t), this.service.addEventParent(this), "*" !== this.options.fields[0]) {
                    for (var e = !1, i = 0; i < this.options.fields.length; i++) this.options.fields[i].match(/^(OBJECTID|FID|OID|ID)$/i) && (e = !0);
                    !1 === e && d("no known esriFieldTypeOID field detected in fields Array.  Please add an attribute field containing unique IDs to ensure the layer can be drawn correctly.")
                }
                this.options.timeField.start && this.options.timeField.end ? (this._startTimeIndex = new ft, this._endTimeIndex = new ft) : this.options.timeField && (this._timeIndex = new ft), this._cache = {}, this._currentSnapshot = [], this._activeRequests = 0
            },
            onAdd: function (r) {
                return q(r), this.service.metadata(function (t, e) {
                    var i, s;
                    t || (i = e.supportedQueryFormats, (s = !1) !== this.service.options.isModern && !this.options.fetchAllFeatures || (s = !0), !s && i && -1 !== i.indexOf("geoJSON") && (this.service.options.isModern = !0), e.objectIdField && (this.service.options.idAttribute = e.objectIdField), !this.options.attribution && r.attributionControl && e.copyrightText && (this.options.attribution = e.copyrightText, r.attributionControl.addAttribution(this.getAttribution())))
                }, this), r.on("zoomend", this._handleZoomChange, this), mt.prototype.onAdd.call(this, r)
            },
            onRemove: function (t) {
                return E(t), t.off("zoomend", this._handleZoomChange, this), mt.prototype.onRemove.call(this, t)
            },
            getAttribution: function () {
                return this.options.attribution
            },
            createCell: function (t, e) {
                this._visibleZoom() && this._requestFeatures(t, e)
            },
            _requestFeatures: function (s, r, o, n) {
                this._activeRequests++, n = n || 0;
                var a = this.options.where;
                return 1 === this._activeRequests && this.fire("loading", {
                    bounds: s
                }, !0), this._buildQuery(s, n).run(function (t, e, i) {
                    i && i.exceededTransferLimit && this.fire("drawlimitexceeded"), this.options.where === a && (!t && e && e.features.length && g.Util.requestAnimFrame(g.Util.bind(function () {
                        this._addFeatures(e.features, r), this._postProcessFeatures(s)
                    }, this)), t || !e || e.features.length || this._postProcessFeatures(s), t && this._postProcessFeatures(s), o && o.call(this, t, e), i && (i.exceededTransferLimit || i.properties && i.properties.exceededTransferLimit) && this.options.fetchAllFeatures && this._requestFeatures(s, r, o, n + e.features.length))
                }, this)
            },
            _postProcessFeatures: function (t) {
                this._activeRequests--, this._activeRequests <= 0 && this.fire("load", {
                    bounds: t
                })
            },
            _cacheKey: function (t) {
                return t.z + ":" + t.x + ":" + t.y
            },
            _addFeatures: function (t, e) {
                var i;
                e && (i = this._cacheKey(e), this._cache[i] = this._cache[i] || []);
                for (var s = t.length - 1; 0 <= s; s--) {
                    var r = t[s].id; - 1 === this._currentSnapshot.indexOf(r) && this._currentSnapshot.push(r), void 0 !== i && -1 === this._cache[i].indexOf(r) && this._cache[i].push(r)
                }
                this.options.timeField && this._buildTimeIndexes(t), this.createLayers(t)
            },
            _buildQuery: function (t, e) {
                var i = this.service.query().intersects(t).where(this.options.where).fields(this.options.fields).precision(this.options.precision);
                return this.options.fetchAllFeatures && !isNaN(parseInt(e)) && (i = i.offset(e)), i.params.resultType = "tile", this.options.requestParams && g.Util.extend(i.params, this.options.requestParams), this.options.simplifyFactor && i.simplify(this._map, this.options.simplifyFactor), "server" === this.options.timeFilterMode && this.options.from && this.options.to && i.between(this.options.from, this.options.to), i
            },
            setWhere: function (s, r, o) {
                this.options.where = s && s.length ? s : "1=1";
                for (var n = [], a = [], l = 0, u = null, t = g.Util.bind(function (t, e) {
                        if (t && (u = t), e)
                            for (var i = e.features.length - 1; 0 <= i; i--) a.push(e.features[i].id);
                        --l <= 0 && this._visibleZoom() && s === this.options.where && (this._currentSnapshot = a, g.Util.requestAnimFrame(g.Util.bind(function () {
                            this.removeLayers(n), this.addLayers(a), r && r.call(o, u)
                        }, this)))
                    }, this), e = this._currentSnapshot.length - 1; 0 <= e; e--) n.push(this._currentSnapshot[e]);
                for (var i in this._cache = {}, this._cells) {
                    l++;
                    var h = this._keyToCellCoords(i),
                        c = this._cellCoordsToBounds(h);
                    this._requestFeatures(c, h, t)
                }
                return this
            },
            getWhere: function () {
                return this.options.where
            },
            getTimeRange: function () {
                return [this.options.from, this.options.to]
            },
            setTimeRange: function (e, i, s, r) {
                var o = this.options.from,
                    n = this.options.to,
                    a = 0,
                    l = null,
                    t = g.Util.bind(function (t) {
                        t && (l = t), this._filterExistingFeatures(o, n, e, i), a--, s && a <= 0 && s.call(r, l)
                    }, this);
                if (this.options.from = e, this.options.to = i, this._filterExistingFeatures(o, n, e, i), "server" === this.options.timeFilterMode)
                    for (var u in this._cells) {
                        a++;
                        var h = this._keyToCellCoords(u),
                            c = this._cellCoordsToBounds(h);
                        this._requestFeatures(c, h, t)
                    }
                return this
            },
            refresh: function () {
                this.setWhere(this.options.where)
            },
            _filterExistingFeatures: function (t, e, i, s) {
                var r = t && e ? this._getFeaturesInTimeRange(t, e) : this._currentSnapshot,
                    o = this._getFeaturesInTimeRange(i, s);
                if (o.indexOf)
                    for (var n = 0; n < o.length; n++) {
                        var a = r.indexOf(o[n]);
                        0 <= a && r.splice(a, 1)
                    }
                g.Util.requestAnimFrame(g.Util.bind(function () {
                    this.removeLayers(r), this.addLayers(o)
                }, this))
            },
            _getFeaturesInTimeRange: function (t, e) {
                var i = [];
                if (this.options.timeField.start && this.options.timeField.end) var s = this._startTimeIndex.between(t, e),
                    r = this._endTimeIndex.between(t, e),
                    o = s.concat(r);
                else {
                    if (!this._timeIndex) return d("You must set timeField in the layer constructor in order to manipulate the start and end time filter."), [];
                    o = this._timeIndex.between(t, e)
                }
                for (var n = o.length - 1; 0 <= n; n--) i.push(o[n].id);
                return i
            },
            _buildTimeIndexes: function (t) {
                var e;
                if (this.options.timeField.start && this.options.timeField.end) {
                    for (var i = [], s = [], r = t.length - 1; 0 <= r; r--) e = t[r], i.push({
                        id: e.id,
                        value: new Date(e.properties[this.options.timeField.start])
                    }), s.push({
                        id: e.id,
                        value: new Date(e.properties[this.options.timeField.end])
                    });
                    this._startTimeIndex.bulkAdd(i), this._endTimeIndex.bulkAdd(s)
                } else {
                    var o = [];
                    for (r = t.length - 1; 0 <= r; r--) e = t[r], o.push({
                        id: e.id,
                        value: new Date(e.properties[this.options.timeField])
                    });
                    this._timeIndex.bulkAdd(o)
                }
            },
            _featureWithinTimeRange: function (t) {
                if (!this.options.from || !this.options.to) return !0;
                var e = +this.options.from.valueOf(),
                    i = +this.options.to.valueOf();
                if ("string" == typeof this.options.timeField) {
                    var s = +t.properties[this.options.timeField];
                    return e <= s && s <= i
                }
                if (this.options.timeField.start && this.options.timeField.end) {
                    var r = +t.properties[this.options.timeField.start],
                        o = +t.properties[this.options.timeField.end];
                    return e <= r && r <= i || e <= o && o <= i || r <= e && i <= o
                }
            },
            _visibleZoom: function () {
                if (!this._map) return !1;
                var t = this._map.getZoom();
                return !(t > this.options.maxZoom || t < this.options.minZoom)
            },
            _handleZoomChange: function () {
                if (this._visibleZoom())
                    for (var t in this._cells) {
                        var e = this._cells[t].coords,
                            i = this._cacheKey(e);
                        this._cache[i] && this.addLayers(this._cache[i])
                    } else this.removeLayers(this._currentSnapshot)
            },
            authenticate: function (t) {
                return this.service.authenticate(t), this
            },
            metadata: function (t, e) {
                return this.service.metadata(t, e), this
            },
            query: function () {
                return this.service.query()
            },
            _getMetadata: function (i) {
                this._metadata ? i(void 0, this._metadata) : this.metadata(g.Util.bind(function (t, e) {
                    this._metadata = e, i(t, this._metadata)
                }, this))
            },
            addFeature: function (t, e, i) {
                this.addFeatures(t, e, i)
            },
            addFeatures: function (e, o, n) {
                this._getMetadata(g.Util.bind(function (t, s) {
                    var r;
                    t ? o && o.call(this, t, null) : (r = e.features ? e.features : [e], this.service.addFeatures(e, g.Util.bind(function (t, e) {
                        if (!t) {
                            for (var i = r.length - 1; 0 <= i; i--) r[i].properties[s.objectIdField] = 1 < r.length ? e[i].objectId : e.objectId, r[i].id = 1 < r.length ? e[i].objectId : e.objectId;
                            this._addFeatures(r)
                        }
                        o && o.call(n, t, e)
                    }, this)))
                }, this))
            },
            updateFeature: function (t, e, i) {
                this.updateFeatures(t, e, i)
            },
            updateFeatures: function (t, s, r) {
                var o = t.features ? t.features : [t];
                this.service.updateFeatures(t, function (t, e) {
                    if (!t) {
                        for (var i = o.length - 1; 0 <= i; i--) this.removeLayers([o[i].id], !0);
                        this._addFeatures(o)
                    }
                    s && s.call(r, t, e)
                }, this)
            },
            deleteFeature: function (t, e, i) {
                this.deleteFeatures(t, e, i)
            },
            deleteFeatures: function (t, r, o) {
                return this.service.deleteFeatures(t, function (t, e) {
                    var i = e.length ? e : [e];
                    if (!t && 0 < i.length)
                        for (var s = i.length - 1; 0 <= s; s--) this.removeLayers([i[s].objectId], !0);
                    r && r.call(o, t, e)
                }, this)
            }
        }),
        gt = yt.extend({
            options: {
                cacheLayers: !0
            },
            initialize: function (t) {
                yt.prototype.initialize.call(this, t), this._originalStyle = this.options.style, this._layers = {}
            },
            onRemove: function (t) {
                for (var e in this._layers) t.removeLayer(this._layers[e]), this.fire("removefeature", {
                    feature: this._layers[e].feature,
                    permanent: !1
                }, !0);
                return yt.prototype.onRemove.call(this, t)
            },
            createNewLayer: function (t) {
                var e = g.GeoJSON.geometryToLayer(t, this.options);
                return e && (e.defaultOptions = e.options), e
            },
            _updateLayer: function (t, e) {
                var i = [],
                    s = this.options.coordsToLatLng || g.GeoJSON.coordsToLatLng;
                switch (e.properties && (t.feature.properties = e.properties), e.geometry.type) {
                    case "Point":
                        i = g.GeoJSON.coordsToLatLng(e.geometry.coordinates), t.setLatLng(i);
                        break;
                    case "LineString":
                        i = g.GeoJSON.coordsToLatLngs(e.geometry.coordinates, 0, s), t.setLatLngs(i);
                        break;
                    case "MultiLineString":
                    case "Polygon":
                        i = g.GeoJSON.coordsToLatLngs(e.geometry.coordinates, 1, s), t.setLatLngs(i);
                        break;
                    case "MultiPolygon":
                        i = g.GeoJSON.coordsToLatLngs(e.geometry.coordinates, 2, s), t.setLatLngs(i)
                }
            },
            createLayers: function (t) {
                for (var e = t.length - 1; 0 <= e; e--) {
                    var i, s = t[e],
                        r = this._layers[s.id];
                    !this._visibleZoom() || !r || this._map.hasLayer(r) || this.options.timeField && !this._featureWithinTimeRange(s) || (this._map.addLayer(r), this.fire("addfeature", {
                        feature: r.feature
                    }, !0)), r && 0 < this.options.simplifyFactor && (r.setLatLngs || r.setLatLng) && this._updateLayer(r, s), r || ((i = this.createNewLayer(s)) ? (i.feature = s, i.addEventParent(this), this.options.onEachFeature && this.options.onEachFeature(i.feature, i), this._layers[i.feature.id] = i, this.setFeatureStyle(i.feature.id, this.options.style), this.fire("createfeature", {
                        feature: i.feature
                    }, !0), this._visibleZoom() && (!this.options.timeField || this.options.timeField && this._featureWithinTimeRange(s)) && this._map.addLayer(i)) : d("invalid GeoJSON encountered"))
                }
            },
            addLayers: function (t) {
                for (var e = t.length - 1; 0 <= e; e--) {
                    var i = this._layers[t[e]];
                    !i || this.options.timeField && !this._featureWithinTimeRange(i.feature) || this._map.addLayer(i)
                }
            },
            removeLayers: function (t, e) {
                for (var i = t.length - 1; 0 <= i; i--) {
                    var s = t[i],
                        r = this._layers[s];
                    r && (this.fire("removefeature", {
                        feature: r.feature,
                        permanent: e
                    }, !0), this._map.removeLayer(r)), r && e && delete this._layers[s]
                }
            },
            cellEnter: function (t, s) {
                this._visibleZoom() && !this._zooming && this._map && g.Util.requestAnimFrame(g.Util.bind(function () {
                    var t = this._cacheKey(s),
                        e = this._cellCoordsToKey(s),
                        i = this._cache[t];
                    this._activeCells[e] && i && this.addLayers(i)
                }, this))
            },
            cellLeave: function (t, a) {
                this._zooming || g.Util.requestAnimFrame(g.Util.bind(function () {
                    if (this._map) {
                        var t = this._cacheKey(a),
                            e = this._cellCoordsToKey(a),
                            i = this._cache[t],
                            s = this._map.getBounds();
                        if (!this._activeCells[e] && i) {
                            for (var r = !0, o = 0; o < i.length; o++) {
                                var n = this._layers[i[o]];
                                n && n.getBounds && s.intersects(n.getBounds()) && (r = !1)
                            }
                            r && this.removeLayers(i, !this.options.cacheLayers), !this.options.cacheLayers && r && (delete this._cache[t], delete this._cells[e], delete this._activeCells[e])
                        }
                    }
                }, this))
            },
            resetStyle: function () {
                return this.options.style = this._originalStyle, this.eachFeature(function (t) {
                    this.resetFeatureStyle(t.feature.id)
                }, this), this
            },
            setStyle: function (e) {
                return this.options.style = e, this.eachFeature(function (t) {
                    this.setFeatureStyle(t.feature.id, e)
                }, this), this
            },
            resetFeatureStyle: function (t) {
                var e = this._layers[t],
                    i = this._originalStyle || g.Path.prototype.options;
                return e && (g.Util.extend(e.options, e.defaultOptions), this.setFeatureStyle(t, i)), this
            },
            setFeatureStyle: function (t, e) {
                var i = this._layers[t];
                return "function" == typeof e && (e = e(i.feature)), i.setStyle && i.setStyle(e), this
            },
            eachActiveFeature: function (t, e) {
                if (this._map) {
                    var i = this._map.getBounds();
                    for (var s in this._layers) - 1 !== this._currentSnapshot.indexOf(this._layers[s].feature.id) && ("function" == typeof this._layers[s].getLatLng && i.contains(this._layers[s].getLatLng()) || "function" == typeof this._layers[s].getBounds && i.intersects(this._layers[s].getBounds())) && t.call(e, this._layers[s])
                }
                return this
            },
            eachFeature: function (t, e) {
                for (var i in this._layers) t.call(e, this._layers[i]);
                return this
            },
            getFeature: function (t) {
                return this._layers[t]
            },
            bringToBack: function () {
                this.eachFeature(function (t) {
                    t.bringToBack && t.bringToBack()
                })
            },
            bringToFront: function () {
                this.eachFeature(function (t) {
                    t.bringToFront && t.bringToFront()
                })
            },
            redraw: function (t) {
                return t && this._redraw(t), this
            },
            _redraw: function (t) {
                var e, i, s = this._layers[t],
                    r = s.feature;
                s && s.setIcon && this.options.pointToLayer && this.options.pointToLayer && (e = this.options.pointToLayer(r, g.latLng(r.geometry.coordinates[1], r.geometry.coordinates[0])).options.icon, s.setIcon(e)), s && s.setStyle && this.options.pointToLayer && (i = this.options.pointToLayer(r, g.latLng(r.geometry.coordinates[1], r.geometry.coordinates[0])).options, this.setFeatureStyle(r.id, i)), s && s.setStyle && this.options.style && this.resetStyle(r.id)
            }
        });
    t.BasemapLayer = lt, t.DynamicMapLayer = dt, t.FeatureLayer = gt, t.FeatureLayerService = ot, t.FeatureManager = yt, t.Find = V, t.Identify = K, t.IdentifyFeatures = H, t.IdentifyImage = Y, t.ImageMapLayer = pt, t.ImageService = st, t.MapService = et, t.Query = W, t.RasterLayer = ct, t.Service = tt, t.Support = a, t.Task = j, t.TiledMapLayer = ut, t.Util = N, t.VERSION = "2.5.3", t.basemapLayer = function (t, e) {
        return new lt(t, e)
    }, t.dynamicMapLayer = function (t, e) {
        return new dt(t, e)
    }, t.featureLayer = function (t) {
        return new gt(t)
    }, t.featureLayerService = nt, t.find = Q, t.get = p, t.identify = function (t) {
        return new K(t)
    }, t.identifyFeatures = X, t.identifyImage = $, t.imageMapLayer = function (t, e) {
        return new pt(t, e)
    }, t.imageService = rt, t.mapService = it, t.options = s, t.post = r, t.query = J, t.request = h, t.service = function (t) {
        return t = k(t), new tt(t)
    }, t.task = function (t) {
        return t = k(t), new j(t)
    }, t.tiledMapLayer = function (t, e) {
        return new ut(t, e)
    }, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});
//# sourceMappingURL=esri-leaflet.js.map
