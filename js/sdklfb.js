if (typeof sdk === "undefined") sdk = {};

sdk.fb = (function () {
    var root = {};

    root.setItem = function (name, v) {
        Laya.LocalStorage.setItem(name, JSON.stringify(v));
    }
    root.getItem = function (name, f) {
        f(JSON.parse(Laya.LocalStorage.getItem(name)));
    }

    ///广告
    //激励视频广告
    var ads = [
        "948857812611278_949286899235036"
    ];

    //插屏广告
    var ad2 = "948857812611278_949287499234976";

    var pAds = [];
    var loaded = [];
    var pad2;
    var loaded2;


    root.debug = function (msg) {

    }


    function initAD2() {
        root.debug("ad2init!");
        if (FBInstant.getSupportedAPIs().indexOf("getInterstitialAdAsync") == -1) return;
        FBInstant.getInterstitialAdAsync(ad2).then(function (rewarded) {

            root.debug("ad2inited!")
            pad2 = rewarded;
            preLoad2();
        }).catch(function (er) {
            //initAD(n);
            ;
        });
    }

    function preLoad2() {
        pad2.loadAsync().then(function () {
            loaded2 = true;
        }).catch(function (er) {
            Laya.timer.once(30000, null, initAD2);
        });
    }


    function initAD(n) {
        console.log('initAd' + n);
        if (FBInstant.getSupportedAPIs().indexOf("getRewardedVideoAsync") == -1) return;
        FBInstant.getRewardedVideoAsync(ads[n]).then(function (rewarded) {
            console.log('initAd11111' + n);
            pAds[n] = rewarded;
            preLoad(n);
            console.log('成功')
        }).catch(function (er) {
            //initAD(n);
            console.log(er)
            console.log('失败')
            ;
        });
    }

    function preLoad(n) {
        pAds[n].loadAsync().then(function () {
            loaded[n] = true;
            console.log('成2功')
        }).catch(function (er) {
            console.log(er)
            Laya.timer.once(30000, null, function () {
                initAD(n);
            });
        });
    }


    root.playAD2 = function () {
        console.log('playAd1');
        if (FBInstant.getSupportedAPIs().indexOf("getInterstitialAdAsync") == -1) {
            // f();
            return;
        }
        console.log('playAd2');
        function play() {
            loaded2 = false;
            root.debug("ad2Play!!")
            pad2.showAsync().then(function () {
                // if (f) f();
                root.debug("ad2Play!!")
                Laya.timer.once(30000, null, function () {
                    initAD2();
                });
            }).catch(function (e) {
                root.debug(e.message);
            })
        }
        if (loaded2 === true) {
            play();
        } else {
            // f();
        }
    }



    root.playAD = function (n, f) {
        if (FBInstant.getSupportedAPIs().indexOf("getRewardedVideoAsync") == -1) {
            return;
        }

        function play() {
            loaded[0] = false;
            pAds[0].showAsync().then(function () {
                if (f){
                    f();
                }
                console.log('播放成功');  
                initAD(0);
            }).catch(function (e) {
                console.log('播放失败');  
                root.debug(e.message);
                initAD(0);
            })
        }
        if (loaded[0] === true) {
            play();
        }
    }

    //
    root.playVideo = function (f) {
        console.log('playVideo')
        window.uleeSDK.getIns.showVideoAD(f,null)
        // for (var i = 0; i < loaded.length; i++) {
        //     if (loaded[i] === true) {
        //         root.playAD(i, f);
        //         return;
        //     }
        // };
    }
    root.playInterstitial = function () {
        // root.playAD2();
        console.log('播放插屏')
        window.uleeSDK.getIns.showInterstitial();
    }


    root.getName = function () {
        return FBInstant.player.getName();
    }
    root.getPhoto = function () {
        return FBInstant.player.getPhoto();
    }

    root.switchGame = function (n) {
        FBInstant.switchGameAsync("324885334739659", {
            from: "bump"
        }).then(function () {

        });
    }


    root.share = function (f) {

        FBInstant.context.chooseAsync().then(function () {
            FBInstant.updateAsync({
                action: "CUSTOM",
                cta: "Play",
                image: img64,
                text: {
                    default: "Come on,let`s have fun!",
                    localizations: {
                        en_US: "Come on,let`s have fun!",
                        es_LA: "Come on,let`s have fun!"
                    }
                },
                template: 'play_turn',
                data: {
                    type: "share2"
                },
                strategy: 'IMMEDIATE',
                notification: 'NO_PUSH'
            })
        }).then(function (e) {
            f();
            // root.debug(e);
        }).catch(function (e) {
            // root.debug(e)
        });
    }

    //榜单相关
    root.getFriendRankList = function (f) {
        rank.getConnectedPlayerEntriesAsync(20, 0).then(function (entries) {
            var nEntries = [];
            for (var i = 0; i < entries.length; i++) {
                var e = entries[i];
                var n = {};
                n.rank = e.getRank();
                n.score = e.getScore();
                n.info = JSON.parse(e.getExtraData());
                n.name = e.getPlayer().getName();
                n.photo = e.getPlayer().getPhoto();
                nEntries.push(n);
            };
            f(nEntries);
        });
    }

    root.getGlobalRankList = function (f) {
        rank.getEntriesAsync(20, 0).then(function (entries) {
            var nEntries = [];
            for (var i = 0; i < entries.length; i++) {
                var e = entries[i];
                var n = {};
                n.rank = e.getRank();
                n.score = e.getScore();
                n.info = JSON.parse(e.getExtraData());
                n.name = e.getPlayer().getName();
                n.photo = e.getPlayer().getPhoto();
                nEntries.push(n);
            };
            f(nEntries);
        });
    }

    root.setRank = function (obj) {
        rank.setScoreAsync(obj.score, JSON.stringify(obj.info)).then(
            function (e) {
                if (obj.f) {
                    obj.f(e);
                }
            });
    }

    var rank = null;
    root.initRank = function (f) {
        FBInstant.getLeaderboardAsync("rank0").then(function (leaderBoard) {
            rank = leaderBoard;
            if (f) f();
        });
    }



    //游戏进程相关

    root.setLoadingProgress = function (n) {
        // FBInstant.setLoadingProgress(n);
    }

    function afterInit(f) {
        // if (FBInstant.getSupportedAPIs().indexOf("getRewardedVideoAsync") == -1) { } else {
        //     initAD(0);
        // }
        // if (FBInstant.getSupportedAPIs().indexOf("getInterstitialAdAsync") == -1) { } else {
        //     initAD2();
        // }
        f && f();
        // User.init(f);
    }


    root.afterInit = function (f) {
        // FBInstant.startGameAsync().then(function () {
            afterInit(f);
        // });
    }


    root.init = function (f) {
        // FBInstant.initializeAsync().then(function () {
        //     FBInstant.setLoadingProgress(10);
            f();
        // });
    }
    root.logEvent = function (e) {
        FBInstant.logEvent(e);
    }

    root.subscribe = function () {
        FBInstant.player.canSubscribeBotAsync().then(function (s) {
            if (s) {
                FBInstant.player.canSubscribeBotAsync().then().catch(function (e) {

                })
            }
        })
    }

    return root;
})();


class FBPlatform {
    createRewardedVideoAd(_adUnitId, _callback, preload) {
        if (preload) return;

        // //TEST
        // if(_callback) {
        //     _callback(true);
        //     return;
        // }
        sdk.fb.playVideo(function () {
            _callback(true);
        });
    }

    playInterstitial(){
       
    }


    getSystemInfoSync() {
        return { brand: "fb", model: "fb", benchmarkLevel: 100, system: "fb", language: "en-us" };
    }

    login(cb) {
        UserData.instance.account_id = "1";//PC测试账号68335
        cb && cb({ code: 0, wxcode: 'fb' });
    }

    getUserInfo(cb) {
        cb && cb({ nickName: 'fb11', openid: 1000, gender: 1, avatarUrl: "" });
    }

    launchInfo() {
        return {};
    }

    logout() { }

    startLoading(_callback) {
        return true;
    }
    onLoading(_percent) {
    }

    authenticLogin(_callback, _btnVect, _statusCallback) {
        if (typeof (_callback) != "undefined")
            _callback(true)
    }
    hideAuthenticLoginBtn() { }
    createFeedbackButton(_btnVect) { }
    showFeedbackButton(visible) { }
    openCustomerServiceConversation(obj) { }

    //授权
    authorize(cb, parent) {
    }
    //是否授权
    isAuthorize(cb) {
        cb && cb(true);
    }
    destroyButton() {

    }
    onShow(_callback) {
        this.$calls.push(_callback);
    }
    onHide(_callback) { }
    exitMiniProgram() { }
    onShare(_data) { _data.success(true) }
    isSharing() { }

    navigateToMiniProgram(_data) {
        if (_data) {
            let suc = _data.success;
            if (suc instanceof Function)
                suc();
        }
    }

    createBannerAd(_adUnitId, func) { sdk.fb.playInterstitial();}
    closeBannerAd() { }
    setBannerVisible(val) { }

    vibrateShort() { }
    vibrateLong() { }

    setUserCloudStorage(_kvDataList) { }
    getOpenDataContext() { }
    postMessage(_data) { }
    getMenuButtonBoundingClientRect() { }

    checkUpdate() { }

    haveVideo() {
        return true;
    }

    createVideo() { }
    gameLoadResult() { }
}

window.platform = new FBPlatform();