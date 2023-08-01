window.TDGA = {};

(function(){

var isInited = false;

function init(args) {
    if (isInited) {
        console.error('TDGA SDK was initialized!');
        return;
    }

    if (!args || !args.sequenceNumber || !args.appDisplayName || !args.requestUrl || !args.channelID || !args.deviceID) {
        console.error('invalid arguments passed to TDGA.init ...');
        return;
    }

    var __sequenceNumber = args.sequenceNumber;
    var __appDisplayName = args.appDisplayName;
    var __DTGARequestUrl = args.requestUrl;
    var __channelID = args.channelID;
    var __deviceID = args.deviceID;

    function e(e) {
        return e.replace(/(^\s*)|(\s*$)/g, "")
    }
    function t(e) {
        h.addLoginCache("logout")
    }
    function n() {
        this.element = null,
        this.url = __DTGARequestUrl,
        this.create(),
        this.opts = {}
    }
    var i = {
        sdkVersion: "1.0.5",
        sdkType: "mobile_web",
        installationTime: "",
        appDisplayName: "",
        sequenceNumber: ""
    },
    a = {
        deviceId: "",
        pixel: "",
        language: navigator.language
    },
    s = {},
    o = null,
    r = (new Date).getTime(),
    c = {
        level: null,
        time: null
    },
    u = {},
    l = (location.hostname, {
        addEventListener: function(e, t, n) {
            e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n
        }
    }),
    v = [];
    l.addEventListener(window, "pagehide", t),
    l.addEventListener(window, "beforeunload", t),
    function(e, t, n) {
        "undefined" != typeof module && module.exports ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : t.Fingerprint = n()
    } (0, u,
    function() {
        "use strict";
        var e = function(e) {
            var t, n;
            t = Array.prototype.forEach,
            n = Array.prototype.map,
            this.each = function(e, n, i) {
                if (null !== e) if (t && e.forEach === t) e.forEach(n, i);
                else if (e.length === +e.length) {
                    for (var a = 0,
                    s = e.length; a < s; a++) if (n.call(i, e[a], a, e) === {}) return
                } else for (var o in e) if (e.hasOwnProperty(o) && n.call(i, e[o], o, e) === {}) return
            },
            this.map = function(e, t, i) {
                var a = [];
                return null == e ? a: n && e.map === n ? e.map(t, i) : (this.each(e,
                function(e, n, s) {
                    a[a.length] = t.call(i, e, n, s)
                }), a)
            },
            "object" == typeof e ? (this.hasher = e.hasher, this.screen_resolution = e.screen_resolution, this.screen_orientation = e.screen_orientation, this.canvas = e.canvas, this.ie_activex = e.ie_activex) : "function" == typeof e && (this.hasher = e)
        };
        return e.prototype = {
            get: function() {
                var e = [];
                if (e.push(navigator.userAgent), e.push(navigator.language), e.push(screen.colorDepth), this.screen_resolution) {
                    void 0 !== this.getScreenResolution() && e.push(this.getScreenResolution().join("x"))
                }
                return e.push((new Date).getTimezoneOffset()),
                e.push(this.hasSessionStorage()),
                e.push(this.hasLocalStorage()),
                e.push( !! window.indexedDB),
                document.body ? e.push(typeof document.body.addBehavior) : e.push("undefined"),
                e.push(typeof window.openDatabase),
                e.push(navigator.cpuClass),
                e.push(navigator.platform),
                e.push(navigator.doNotTrack),
                e.push(this.getPluginsString()),
                this.canvas && this.isCanvasSupported() && e.push(this.getCanvasFingerprint()),
                this.hasher ? this.hasher(e.join("###"), 31) : this.murmurhash3_32_gc(e.join("###"), 31)
            },
            murmurhash3_32_gc: function(e, t) {
                var n, i, a, s, o, r, c, u;
                for (n = 3 & e.length, i = e.length - n, a = t, o = 3432918353, r = 461845907, u = 0; u < i;) c = 255 & e.charCodeAt(u) | (255 & e.charCodeAt(++u)) << 8 | (255 & e.charCodeAt(++u)) << 16 | (255 & e.charCodeAt(++u)) << 24,
                ++u,
                c = (65535 & c) * o + (((c >>> 16) * o & 65535) << 16) & 4294967295,
                c = c << 15 | c >>> 17,
                c = (65535 & c) * r + (((c >>> 16) * r & 65535) << 16) & 4294967295,
                a ^= c,
                a = a << 13 | a >>> 19,
                s = 5 * (65535 & a) + ((5 * (a >>> 16) & 65535) << 16) & 4294967295,
                a = 27492 + (65535 & s) + ((58964 + (s >>> 16) & 65535) << 16);
                switch (c = 0, n) {
                case 3:
                    c ^= (255 & e.charCodeAt(u + 2)) << 16;
                case 2:
                    c ^= (255 & e.charCodeAt(u + 1)) << 8;
                case 1:
                    c ^= 255 & e.charCodeAt(u),
                    c = (65535 & c) * o + (((c >>> 16) * o & 65535) << 16) & 4294967295,
                    c = c << 15 | c >>> 17,
                    c = (65535 & c) * r + (((c >>> 16) * r & 65535) << 16) & 4294967295,
                    a ^= c
                }
                return a ^= e.length,
                a ^= a >>> 16,
                a = 2246822507 * (65535 & a) + ((2246822507 * (a >>> 16) & 65535) << 16) & 4294967295,
                a ^= a >>> 13,
                a = 3266489909 * (65535 & a) + ((3266489909 * (a >>> 16) & 65535) << 16) & 4294967295,
                (a ^= a >>> 16) >>> 0
            },
            hasLocalStorage: function() {
                try {
                    return !! window.localStorage
                } catch(e) {
                    return ! 0
                }
            },
            hasSessionStorage: function() {
                var ret = false;
                try {
                    ret = !! window.sessionStorage
                } catch(e) {
                }
                console.log('hasSessionStorage: ' + ret);
                return ret;
            },
            isCanvasSupported: function() {
                var e = document.createElement("canvas");
                return ! (!e.getContext || !e.getContext("2d"))
            },
            isIE: function() {
                return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent))
            },
            getPluginsString: function() {
                return this.isIE() && this.ie_activex ? this.getIEPluginsString() : this.getRegularPluginsString()
            },
            getRegularPluginsString: function() {
                return this.map(navigator.plugins,
                function(e) {
                    var t = this.map(e,
                    function(e) {
                        return [e.type, e.suffixes].join("~")
                    }).join(",");
                    return [e.name, e.description, t].join("::")
                },
                this).join(";")
            },
            getIEPluginsString: function() {
                if (window.ActiveXObject) {
                    var e = ["ShockwaveFlash.ShockwaveFlash", "AcroPDF.PDF", "PDF.PdfCtrl", "QuickTime.QuickTime", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "RealPlayer", "SWCtl.SWCtl", "WMPlayer.OCX", "AgControl.AgControl", "Skype.Detection"];
                    return this.map(e,
                    function(e) {
                        try {
                            return new ActiveXObject(e),
                            e
                        } catch(e) {
                            return null
                        }
                    }).join(";")
                }
                return ""
            },
            getScreenResolution: function() {
                return this.screen_orientation ? screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height] : [screen.height, screen.width]
            },
            getCanvasFingerprint: function() {
                var e = document.createElement("canvas"),
                t = e.getContext("2d"),
                n = "https://www.talkingdata.com";
                return t.textBaseline = "top",
                t.font = "14px 'Arial'",
                t.textBaseline = "alphabetic",
                t.fillStyle = "#f60",
                t.fillRect(125, 1, 62, 20),
                t.fillStyle = "#069",
                t.fillText(n, 2, 15),
                t.fillStyle = "rgba(102, 204, 0, 0.7)",
                t.fillText(n, 4, 17),
                e.toDataURL()
            }
        },
        e
    });
    var g = function(t, n, i) {
        if (void 0 === n) {
            var a = null;
            if (document.cookie && "" != document.cookie) for (var s = document.cookie.split(";"), o = 0; o < s.length; o++) {
                var r = e(s[o]);
                if (r.substring(0, t.length + 1) == t + "=") {
                    a = decodeURIComponent(r.substring(t.length + 1));
                    break
                }
            }
            return a
        }
        i = i || {},
        null === n && (n = "", i.expires = -1);
        var c = "";
        if (i.expires && ("number" == typeof i.expires || i.expires.toUTCString)) {
            var u;
            "number" == typeof i.expires ? (u = new Date, u.setTime(u.getTime() + 24 * i.expires * 60 * 60 * 1e3)) : u = i.expires,
            c = "; expires=" + u.toUTCString()
        }
        var l = i.path ? "; path=" + i.path: "",
        v = i.domain ? "; domain=" + i.domain: "",
        g = i.secure ? "; secure": "";
        document.cookie = [t, "=", encodeURIComponent(n), c, l, v, g].join("")
    };
    u.supportStore = {
        local: !0,
        session: !0,
        verifyStorage: function() {
            try {
                localStorage.setItem("__TD_localStorage", 1),
                localStorage.removeItem("__TD_localStorage"),
                this.local = !0
            } catch(e) {
                this.local = !1
            }
            try {
                sessionStorage.setItem("__TD_sessionStorage", 1),
                sessionStorage.removeItem("__TD_sessionStorage"),
                this.session = !0
            } catch(e) {
                this.session = !1
            }
        }
    },
    u.supportStore.verifyStorage(),
    u.localStorage = {
        add: function(e, t) {
            this.addLocalStorage(e, t),
            "sessionId" != e && this.addCookie(e, t)
        },
        remove: function(e) {
            for (var t = e.split(","), n = 0, i = t.length; n < i; n++) t[n] && this.delLocalStorage(t[n])
        },
        get: function(e) {
            var t = this.getLocalStorage(e);
            return t || this._getCookie(e)
        },
        create: function() {
            g("__TD_LOCAL") || (this._addCookie(""), u.supportStore.local)
        },
        addCookie: function(e, t) {
            if (!u.supportStore.local) {
                this.create();
                var n = this.cookieList();
                n[e] = t;
                var i = [];
                for (var a in n) i.push(a + "=" + n[a]);
                this._addCookie(i.join(";"))
            }
        },
        _setCookie: function() {
            this.cookieList();
            g("__TD_LOCAL", "", {
                expires: 1095,
                path: "/",
                domain: location.hostname
            })
        },
        _addCookie: function(e) {
            g("__TD_LOCAL", e, {
                expires: 1095,
                path: "/",
                domain: location.hostname
            })
        },
        _getCookie: function(e) {
            var t = this.cookieList();
            if (t && t[e]) return t[e]
        },
        delCookie: function(e) {},
        cookieList: function() {
            var e = g("__TD_LOCAL");
            return this.format(e)
        },
        addLocalStorage: function(e, t) {
            u.supportStore.local && ("sessionId" == e && u.supportStore.session ? sessionStorage.setItem("__TD_" + e, t) : localStorage["__TD_" + e] = t)
        },
        delLocalStorage: function(e) {
            u.supportStore.local && ("sessionId" == e && u.supportStore.session ? sessionStorage.removeItem("__TD_" + e) : localStorage.removeItem("__TD_" + e))
        },
        getLocalStorage: function(e) {
            if (u.supportStore.local) return "sessionId" == e && u.supportStore.session ? sessionStorage.getItem("__TD_" + e) : localStorage["__TD_" + e]
        },
        format: function(e) {
            var t = {};
            if (!e) return t;
            for (var n = e.split(";"), i = n.length, a = 0; a < i; a++) {
                var s = n[a].split("=");
                2 == s.length && (t[s[0]] = s[1])
            }
            return t
        }
    },
    u.sessionStorage = {
        add: function(e, t) {
            u.supportStore.session && sessionStorage.setItem("__TD_" + e, t)
        },
        get: function(e) {
            if (u.supportStore.session) {
                return sessionStorage.getItem("__TD_" + e);
            }
            console.warn('get, window.sessionStorage is not supported!');
            return null; 
        },
        remove: function(e) {
            if (u.supportStore.session) {
                sessionStorage.removeItem("__TD_" + e);
            }
            else {
                console.warn('remove, window.sessionStorage is not supported!');
            }
        }
    },
    n.prototype = {
        create: function() {},
        scriptCallback: function(e) {},
        set: function(e) {
            this.opts = e,
            this.send()
        },
        getConfig: function() {},
        send: function() {
            var e = window.XMLHttpRequest ? new XMLHttpRequest: new ActiveXObject("Microsoft.XMLHTTP");
            e.open("POST", this.url, !0),
            e.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            e.onreadystatechange = function() {
                4 == e.readyState && e.status
            },
            e.send(JSON.stringify(this.opts))
        }
    },
    (new n).create();
    var d = {};
    d.userInfo = {
        userID: 0,
        gameServer: "",
        level: -1
    },
    d.index = {
        G2: "gameInit",
        G3: "Login",
        G4: "Logout",
        G5: "Levelup",
        G7: "UpdateUserProfile",
        G8: "CustomEvent",
        "G9.1": "Charge",
        "G9.2": "Charge",
        G15: "Reward"
    },
    d.getEventData = function(e) {
        d.index;
        if (d.index[e]) return d[d.index[e]].getData(e)
    },
    d.getCommon = function() {
        return {
            appProfile: i,
            deviceProfile: a,
            events: []
        }
    },
    d.gameInit = {
        getData: function() {
            return {
                eventOccurTime: (new Date).getTime(),
                eventData: {},
                eventID: "G2"
            }
        }
    },
    d.Login = {
        getData: function() {
            var e = {
                eventOccurTime: (new Date).getTime(),
                eventData: {},
                eventID: "G3"
            };
            e.eventData = s;
            var t = d.getUserStateTime("logout");
            return t && (e.eventData.interval = t),
            e
        }
    },
    d.Logout = {
        getData: function() {
            var e = {
                eventOccurTime: (new Date).getTime(),
                eventData: {},
                eventID: "G4"
            },
            t = o || s;
            t.gameSessionID && (e.eventData.gameSessionID = t.gameSessionID),
            t.userID && (e.eventData.userID = t.userID),
            t.level && (e.eventData.level = t.level),
            t.gameServer && (e.eventData.gameServer = t.gameServer),
            e.eventData.gameSessionStart = r;
            var n = d.getUserStateTime("login");
            return n && (e.eventData.duration = n),
            e
        }
    },
    d.getUserStateTime = function(e) {
        if (v.length > 0) for (var t = v.length - 1; t >= 0; t--) {
            var n = v[t];
            if (n[1] == e) {
                var i = n[2];
                return parseInt(((new Date).getTime() - i) / 1e3)
            }
        }
    },
    d.Levelup = {
        getData: function() {
            var e = {
                eventOccurTime: (new Date).getTime(),
                eventData: {},
                eventID: "G5"
            },
            t = s || o;
            e.eventData.gameSessionID = t.gameSessionID || s.gameSessionID,
            t.userID && (e.eventData.userID = t.userID),
            t.level && (e.eventData.level = t.level),
            t.gameServer && (e.eventData.gameServer = t.gameServer),
            c.level && (e.eventData.preLevel = c.level),
            c.time && (e.eventData.timeConsuming = parseInt(((new Date).getTime() - c.time) / 1e3)),
            e.eventData.gameSessionStart = r;
            var n = h.Mission.getMission();
            return n && (e.eventData.mission = n),
            e
        }
    },
    d.UpdateUserProfile = {
        getData: function() {
            var e = d.Login.getData();
            return e.eventID = "G7",
            e
        }
    },
    d.CustomEvent = {
        getData: function() {
            var e = {
                eventOccurTime: (new Date).getTime(),
                eventData: {},
                eventID: "G8"
            },
            t = s;
            t.gameSessionID && (e.eventData.gameSessionID = t.gameSessionID),
            t.userID && (e.eventData.userID = t.userID),
            t.level && (e.eventData.level = t.level),
            t.gameServer && (e.eventData.gameServer = t.gameServer);
            var n = h.CustomEvent.info;
            return n.actionID && (e.eventData.actionID = n.actionID),
            n.actionData && (e.eventData.actionData = n.actionData),
            e
        }
    },
    d.Charge = {
        getData: function(e) {
            var t = {
                eventOccurTime: (new Date).getTime(),
                eventData: {},
                eventID: "G9"
            };
            t.eventData = h.Charge.info;
            var n = h.Mission.getMission(),
            i = s;
            return i.gameSessionID && (t.eventData.gameSessionID = i.gameSessionID),
            i.userID && (t.eventData.userID = i.userID),
            i.level && (t.eventData.level = i.level),
            i.gameServer && (t.eventData.gameServer = i.gameServer),
            n && (t.eventData.mission = n),
            t
        }
    },
    d.Reward = {
        getData: function() {
            var e = {
                eventOccurTime: (new Date).getTime(),
                eventData: {},
                eventID: "G15"
            },
            t = s;
            t.gameSessionID && (e.eventData.gameSessionID = t.gameSessionID),
            t.userID && (e.eventData.userID = t.userID),
            t.level && (e.eventData.level = t.level),
            t.gameServer && (e.eventData.gameServer = t.gameServer);
            var n = h.Reward.info;
            return n.virtualCurrencyAmount && (e.eventData.virtualCurrencyAmount = n.virtualCurrencyAmount),
            n.reason && (e.eventData.reason = n.reason),
            n.mission && (e.eventData.mission = n.mission),
            e
        }
    },
    d.Account = function(e, t) { ({}).gameSessionId = sessionId
    },
    d.Account.prototype = {
        getData: function() {}
    },
    d.formatOpts = function(e) {
        var t = {};
        for (var n in e) t.key = e[n]
    },
    d.loginCache = function() {
        s.userID || a.deviceId
    };
    var m = u.localStorage,
    h = {
        deviceId: 0,
        sessionId: 0,
        isSendG2: !1,
        changeSessionId: !1,
        isNewApp: !1,
        userInfoArr: ["userID", "account", "sex", "age", "accountType", "level", "gameServer"],
        installationTime: 0,
        init: function() {
            this.setDeviceId(),
            this.setPixel(),
            this.getAppFlag(),
            this.setSession(),
            this.setUser(),
            this.setLoginCache(),
            this.getLocalProfile(),
            this.isNewApp && (this.lastLogout(!0), this.resetLocalInfo(), this.setAppProfile()),
            this.sendGameInit(),
            this.setPartner(),
            this.isNewApp || this.lastLogout(),
            this.sendLogin(),
            this.addLoginCache("login")
        },
        resetLocalInfo: function() {
            for (var e = this.userInfoArr,
            t = 0,
            n = e.length; t < n; t++) delete s[e[t]],
            m.remove(e[t]);
            m.remove("login"),
            m.remove("leveluptime")
        },
        setDeviceId: function() {
            a.deviceId = this.deviceId = __deviceID; //cjh added
            //cjh commented if (m.get("deviceId")) {
            //     this.deviceId = m.get("deviceId");
            //     console.log('cjh setDeviceId, get in localStorage: ' + this.deviceId);
            //     this.isSendG2 = !1;
            // }
            // else {
            //     this.isSendG2 = !0;
            //     var e = new u.Fingerprint,
            //     t = new u.Fingerprint({
            //         screen_resolution: !0
            //     }),
            //     n = e.get() + "" + t.get();
            //     NaN == parseInt(n) ? this.deviceId = n: this.deviceId = parseInt(n).toString(16),
            //     m.add("deviceId", this.deviceId);
            // }
            // a.deviceId = this.deviceId;
        },
        setAppProfile: function() {
            var e = this.installationTime || (new Date).getTime();
            i.appDisplayName = __appDisplayName,
            i.sequenceNumber = __sequenceNumber,
            m.add("appDisplayName", __appDisplayName),
            m.add("appKey", __sequenceNumber),
            m.add("installationTime", e)
        },
        getLocalProfile: function() {
            var e = m.get("appDisplayName"),
            t = m.get("appKey");
            if (i.appDisplayName = e || "", i.sequenceNumber = t, m.get("installationTime")) i.installationTime = m.get("installationTime");
            else {
                var n = (new Date).getTime();
                this.installationTime = n,
                i.installationTime = n
            }
        },
        setSession: function() {
            var e, t = this.deviceId;
            parseInt(t, 16);
            e = this.deviceId + "" + (new Date).getTime(),
            !u.sessionStorage.get("sessionId") || this.isNewApp ? (h.changeSessionId = !0, u.sessionStorage.add("sessionId", e)) : e = u.sessionStorage.get("sessionId"),
            s.gameSessionID = this.sessionId = e
        },
        setPixel: function() {
            var e = [window.screen.width, window.screen.height];
            window.devicePixelRatio && e.push(window.devicePixelRatio),
            a.pixel = e.join("*")
        },
        getAppFlag: function() {
            var e = m.get("appKey");
            __sequenceNumber !== e ? (this.isNewApp = !0, this.isSendG2 = !0) : (this.isNewApp = !1, this.isSendG2 = !1)
        },
        sendLastApp: function() {},
        setUser: function() {
            var e = m.get("userID");
            o = o || {},
            e && (s.userID = e, o.userID = e);
            var t = m.get("gameServer");
            t && (s.gameServer = o.gameServer = t);
            var n = m.get("level");
            n && (s.level = o.level = n);
            var i = m.get("accountType");
            i && (s.accountType = o.accountType = i);
            var a = m.get("age");
            a && (s.age = o.age = a);
            var r = m.get("account");
            r && (s.account = o.account = r);
            var c = m.get("sex");
            c && (s.sex = o.sex = c)
        },
        setPartner: function() {
            i.partner = __channelID; //cjh added
            //cjh commented
            //     var e = location.search;
            //     if (e.indexOf("td_channelid") > -1)
            //         for (var t = e.replace("?", "").split("&"), n = 0; n < t.length; n++)
            //             t[n].indexOf("td_channelid=") > -1 && (i.partner = t[n].replace("td_channelid=", ""))
        },
        setLoginCache: function() {
            var e = m.get("login");
            e && (v = JSON.parse(e))
        },
        addLoginCache: function(e) {
            var t = s.userID || a.deviceId,
            n = [];
            n.push(t),
            n.push(e),
            n.push((new Date).getTime()),
            n.push(s.gameSessionID),
            v.push(n),
            v.length > 30 && (v = v.splice(1, v.length - 1)),
            m.add("login", JSON.stringify(v))
        },
        sendGameInit: function() {
            this.isSendG2 && h.EventBox.add("G2")
        },
        lastLogout: function(e) {
            if (v && h.changeSessionId) {
                for (var t = v,
                i = t.length,
                a = [], o = [], r = i - 1; r >= 0; r--) t[r].length < 3 || (0 == a.length && "logout" == t[r][1] ? a = t[r] : "login" == t[r][1] && t[r][3] == a[3] && (o = t[r]));
                var c, u;
                if (o.length > 0) {
                    c = o[2],
                    u = parseInt((a[2] - c) / 1e3);
                    var l = {
                        eventOccurTime: a[2],
                        eventData: {},
                        eventID: "G4"
                    },
                    g = e ? m.get("level") : s.level,
                    f = e ? m.get("gameServer") : s.gameServer;
                    l.eventData = {
                        gameSessionID: a[3],
                        userID: a[0],
                        level: g,
                        gameServer: f,
                        gameSessionStart: c,
                        duration: u
                    };
                    var p = d.getCommon();
                    p.events.push(l); (new n).set(p)
                }
            }
        },
        sendLogin: function() {
            h.changeSessionId && h.EventBox.add("G3")
        }
    };
    h.EventBox = {
        eventNames: [],
        timer: null,
        add: function(e) {
            for (var t = "," + this.eventNames.join() + ",", n = e.split(","), i = 0; i < n.length; i++) - 1 == t.indexOf("," + n[i]) && this.eventNames.push(n[i]);
            this.send()
        },
        send: function() {
            var e = this;
            clearTimeout(e.timer),
            e.timer = setTimeout(function() {
                if (("," + e.eventNames.join() + ",").indexOf("G3,") > -1) {
                    for (var t = [], i = 0; i < e.eventNames.length; i++)"G7" != e.eventNames[i] && "G5" != e.eventNames[i] && t.push(e.eventNames[i]);
                    e.eventNames = t
                }
                for (var a = d.getCommon(), i = 0; i < e.eventNames.length; i++) {
                    var s = e.eventNames[i];
                    d.index[s] && a.events.push(d[d.index[s]].getData(s))
                }
                if (0 != a.events.length) { (new n).set(a),
                    e.eventNames = []
                }
            },
            20)
        }
    },
    h.setUserInfo = function(e) {
        var t = s;
        return s.gameSessionID && (e.gameSessionID = s.gameSessionID),
        t.userID && (e.userID = t.userID),
        t.level && (e.level = parseInt(t.level)),
        t.gameServer && (e.gameServer = t.gameServer),
        e
    },
    h.init(),
    TDGA.onPageLeave = function() {
        h.EventBox.add("G4")
    },
    TDGA.getDeviceId = function() {
        return a.deviceId
    },
    h.Account = {
        eventList: [],
        delInfo: [],
        set: function(e) {
            var t = "accountType,account,level,gender,age,gameServer,",
            n = null;
            for (var i in e) h.Account["set_" + i] && (e[i] || 0 === e[i]) && (i = "accountName" === i ? "account": i, n = new RegExp(i + ",", "g"), t = t.replace(n, ""));
            h.Account.delInfo = t.split(","),
            h.Account.clearOtherInfo(t);
            for (var a in e) h.Account["set_" + a] && (e[a] || 0 === e[a]) && h.Account["set_" + a](e[a])
        },
        clearOtherInfo: function(e) {
            m.remove(e)
        },
        set_accountId: function(e) {
            var t = h.Account.delInfo;
            if (s.userID) if (s.userID == e);
            else {
                o.gameSessionID = s.gameSessionID,
                u.sessionStorage.remove("sessionId"),
                h.setSession(),
                o.userID = s.userID;
                for (var n = 0,
                i = t.length; n < i; n++) {
                    const a = t[n];
                    delete s[a]
                }
                m.add("userID", e),
                h.EventBox.add("G4,G3"),
                s.userID = e,
                h.addLoginCache("login")
            } else m.add("userID", e),
            s.userID = e,
            h.EventBox.add("G7")
        },
        set_accountType: function(e) {
            s.accountType != e && (m.add("accountType", e), s.accountType = e, h.EventBox.add("G7"))
        },
        set_accountName: function(e) {
            s.account != e && (m.add("account", e), s.account = e, h.EventBox.add("G7"))
        },
        set_level: function(e) {
            if (s.level && (o.level = s.level), s.level != e) {
                c.level = s.level,
                m.get("level");
                var t = m.get("leveluptime");
                t && (c.time = t),
                m.add("level", e),
                m.add("leveluptime", (new Date).getTime()),
                s.level = e,
                h.EventBox.add("G5")
            }
        },
        set_gender: function(e) {
            s.sex != e && (m.add("sex", e), s.sex = e, h.EventBox.add("G7"))
        },
        set_age: function(e) {
            s.age != e && (m.add("age", e), s.age = e, h.EventBox.add("G7"))
        },
        set_gameServer: function(e) {
            s.gameServer ? (o.gameServer = s.gameServer, s.gameServer != e && (u.sessionStorage.remove("sessionId"), h.setSession(), o.userID = s.userID, m.add("gameServer", e), s.gameServer = e, h.EventBox.add("G4,G3"), h.addLoginCache("login"))) : (m.add("gameServer", e), s.gameServer = e, h.EventBox.add("G7"))
        }
    },
    TDGA.Account = h.Account.set,
    TDGA.Account.setAccount = h.Account.set_userID,
    TDGA.Account.setAccountType = h.Account.set_accountType,
    TDGA.Account.setAccountName = h.Account.set_accountName,
    TDGA.Account.setLevel = h.Account.set_level,
    TDGA.Account.setGender = h.Account.set_gender,
    TDGA.Account.setAge = h.Account.set_age,
    TDGA.Account.setGameServer = h.Account.set_gameServer,
    TDGA.AccountType = {
        ANONYMOUS: 0,
        REGISTERED: 1,
        SINA_WEIBO: 2,
        QQ: 3,
        TENCENT_WEIBO: 4,
        ND91: 5
    },
    TDGA.Gender = {
        UNKNOWN: -1,
        MALE: 1,
        FEMALE: 2
    },
    h.Mission = {
        info: {},
        MissionNum: {},
        list: {},
        selKey: "_key",
        begin: function(e) {
            if (e && "" != e) {
                var t = {};
                t = h.setUserInfo(t),
                t.mission = e,
                t.status = 1,
                h.Mission.add(t),
                h.Mission.send(t)
            }
        },
        completed: function(e) {
            if (e && "" != e) {
                var t = {
                    mission: e
                };
                t = h.setUserInfo(t),
                t.mission = e,
                t.status = 2;
                var n = h.Mission,
                i = n.list[t.mission + "_" + t.userID];
                if (i && i.length > 0) for (var a = i.length,
                s = a - 1; s >= 0; s--) if (1 == i[s].status && i[s].time) {
                    var o = i[s].time,
                    r = parseInt(((new Date).getTime() - o) / 1e3);
                    t.timeConsuming = r;
                    break
                }
                var n = h.Mission;
                n.add(t),
                n.send(t)
            }
        },
        failed: function(e, t) {
            if (e && "" != e) {
                var n = {
                    mission: e
                };
                n = h.setUserInfo(n),
                n.mission = e,
                n.cause = t,
                n.status = 3;
                var i = h.Mission;
                i.add(n),
                i.send(n)
            }
        },
        init: function() {
            var e = m.get("mission");
            if (e) {
                var t = JSON.parse(e);
                this.list = t;
                var n = m.get("mission_Num");
                n && (this.MissionNum = JSON.parse(n))
            }
        },
        add: function(e) {
            e.time = (new Date).getTime(),
            this.list[e.mission + "_" + e.userID] || (this.list[e.mission + "_" + e.userID] = []),
            this.list[e.mission + "_" + e.userID].push(e),
            m.add("mission", JSON.stringify(this.list))
        },
        send: function(e) {
            var t = {
                eventOccurTime: (new Date).getTime(),
                eventData: {},
                eventID: "G6"
            };
            delete e.time;
            var i = e.userID;
            this.MissionNum["uid_" + i] = e.mission,
            m.add("mission_Num", JSON.stringify(this.MissionNum)),
            t.eventData = e;
            var a = d.getCommon();
            a.events.push(t),
            (new n).set(a)
        },
        getMission: function() {
            return this.MissionNum["uid_" + s.userID]
        }
    },
    h.Mission.init(),
    TDGA.onMissionBegin = h.Mission.begin,
    TDGA.onMissionCompleted = h.Mission.completed,
    TDGA.onMissionFailed = h.Mission.failed,
    h.Reward = {
        info: {},
        send: function(e, t) {
            h.Reward.info = {};
            var n = {};
            e && (n.virtualCurrencyAmount = e),
            t && (n.reason = t);
            var i = h.Mission.getMission();
            i && (n.mission = i),
            h.Reward.info = n,
            h.EventBox.add("G15")
        }
    },
    TDGA.onReward = h.Reward.send,
    h.CustomEvent = {
        info: {},
        send: function(e, t) {
            h.CustomEvent.info = {};
            var n = {};
            e && (n.actionID = e),
            t && (n.actionData = t),
            h.CustomEvent.info = n,
            h.EventBox.add("G8")
        }
    },
    TDGA.onEvent = h.CustomEvent.send,
    h.Item = {
        purchase: function(e) {
            if (e && e.item) {
                var t = {};
                t.itemid = e.item,
                e.itemNumber && (t.itemnumber = parseInt(e.itemNumber)),
                e.priceInVirtualCurrency && (t.virtualCurrencyAmount = parseFloat(e.priceInVirtualCurrency));
                var n = h.Mission.getMission();
                n && (t.mission = n),
                t = h.setUserInfo(t),
                h.Item.send(t, "G10")
            }
        },
        use: function(e) {
            if (e && e.item) {
                var t = {};
                t.itemid = e.item,
                e.itemNumber && (t.itemnumber = e.itemNumber);
                var n = h.Mission.getMission();
                n && (t.mission = n),
                t = h.setUserInfo(t),
                h.Item.send(t, "G12")
            }
        },
        send: function(e, t) {
            var i = {
                eventOccurTime: (new Date).getTime(),
                eventData: {},
                eventID: t
            };
            i.eventData = e;
            var a = d.getCommon();
            a.events.push(i),
            (new n).set(a)
        }
    },
    TDGA.onItemPurchase = h.Item.purchase,
    TDGA.onItemUse = h.Item.use,
    h.Charge = {
        info: {},
        orderList: {},
        selKey: "_key",
        request: function(e) {
            if (e.orderId && "" != e.orderId) {
                var t = this;
                t.info = {};
                for (var n = ["orderId", "iapId", "currencyAmount", "currencyType", "virtualCurrencyAmount", "paymentType"], i = 0; i < n.length; i++) e[n[i]] && (t.info[n[i]] = e[n[i]]);
                t.info.status = 1,
                h.Charge.info = t.info,
                h.EventBox.add("G9.1")
            }
        },
        successt: function(e) {
            if (e.orderId && "" != e.orderId) {
                var t = this;
                t.info = {};
                for (var n = ["orderId", "iapId", "currencyAmount", "currencyType", "virtualCurrencyAmount", "paymentType"], i = 0; i < n.length; i++) e[n[i]] && (t.info[n[i]] = e[n[i]]);
                t.info.status = 2,
                h.Charge.info = t.info,
                h.EventBox.add("G9.2")
            }
        },
        init: function() {
            var e = m.get("order");
            if (e && "undefined" != e) {
                var t = JSON.parse(e);
                this.addOrder(t)
            }
        },
        addOrder: function(e) {
            this.orderList[e.orderId + this.selKey] = e
        }
    };
    h.Charge.init();
    TDGA.onChargeRequest = h.Charge.request;
    TDGA.onChargeSuccess = h.Charge.successt;

    isInited = true;
};

TDGA.init = init;

})();
