window.ShareWXText = ['Deemo 这个游戏的剧情太感人了，我的眼泪哗哗的！', '白雪公主居然是一个警探，这个游戏的脑洞开得太大了吧！',
    '「愤怒的小鸟」的游戏公司出了一款新游戏，你值得来玩一把。'
];
window.ShareWeiboText = ['豌豆荚推荐了「Deemo」这款游戏。小女孩和 Deemo 的故事超感人，里面的歌都好好听！', '豌豆荚推荐了「与狼同行」这款游戏。居然白雪公主变成了一名女警探，这个脑洞开得太大了！', '豌豆荚推荐了「小小盗贼」这款游戏。小盗贼好卡哇伊捏，动作都超级搞笑的哈哈！'];
window.ShareWXTitle = '必玩的三款剧情强大的游戏';
window.ShareImgBaseUrl = 'http://t.wdjcdn.com/upload/mkt-campaign/goodgames/';
window.ShareImgUrl = [ShareImgBaseUrl + 'deemo.png', ShareImgBaseUrl + 'twau.png', ShareImgBaseUrl + 'tt.png'];

// 分享的逻辑处理
(function() {
    $shareWrap = $('.share_block');
    var currentGameId = 0;
    var shareData = {};
    var path = window.location.protocol + "//" + window.location.host + window.location.pathname;
    // hide weixin-friend, wx-timeline when outside of wx, p4
    // at p4 check weixin/weibo installed, use native
    // at wx, using popup tip?!
    function buildUTM(type) {
        shareData.UTM = [path, '?utm_source=', type, '&utm_medium=sns&utm_campaign=goodgames'].join('');
    }

    function setupShareData(gameId) {
        // check GameId -1, -2
        shareData = {
            title: ShareWXTitle || ShareWXTitle,
            desc: ShareWXText[gameId] || ShareWXTitle,
            image: ShareImgUrl[gameId] || ShareImgUrl[0],
            UTM: path
        };
    }

    function nativeWxFriendHandler(e) {
        if (!canShared) return;
        buildUTM('wechatfriend');
        campaignTools.toast('正在分享，请稍候...');
        _pushGaEvent('share_' + GAMENAMEARR[currentGameId], 'wechat_friend');
        campaignTools.runAppShare(shareData.title, shareData.desc, shareData.image, shareData.UTM, 'WECHAT');
    }

    function nativeWxTimelineHandler(e) {
        if (!canShared) return;
        buildUTM('wechattimeline');
        campaignTools.toast('正在分享，请稍候...');
        _pushGaEvent('share_' + GAMENAMEARR[currentGameId], 'wechat_timeline');
        campaignTools.runAppShare(shareData.title, shareData.desc, shareData.image, shareData.UTM, 'WECHAT_TIMELINE');
    }

    function nativeWeiboHandler(e) {
        if (!canShared) return;
        buildUTM('weibo');
        campaignTools.toast('正在分享，请稍候...');
        _pushGaEvent('share_' + GAMENAMEARR[currentGameId], 'weibo');
        campaignTools.runAppShare(shareData.desc, shareData.desc, shareData.image, shareData.UTM, 'SINA_WEIBO');
    }

    function webWeiboHandler(e) {
        if (!canShared) return;
        buildUTM('weibo');
        var weiboURL = 'http://service.weibo.com/share/share.php?appkey=1483181040&relateUid=1727978503&url=' + encodeURIComponent(shareData.UTM) + '&title=' + encodeURIComponent(shareData.desc) + '&pic=' + shareData.image;
        _pushGaEvent('share_' + GAMENAMEARR[currentGameId], 'weibo');
        location.href = weiboURL;
    }

    function wxInvokeShareTip(e) {
        // build html and inject to body with close handler
        $('.wechat-share-wrap').show();
    }

    $('.dialog-close').click(function() {
        $('.wechat-share-wrap').hide();
    });

    function initShareHandler() {
        var _weiboHandler = webWeiboHandler;
        $shareWrap.find('.weixin').hide();
        $shareWrap.find('.quan').hide();

        if (campaignTools.inWechat()) {
            $shareWrap.find('.weixin, .quan').show().click(wxInvokeShareTip);
        }

        if (campaignTools.inWdj()) {
            if (campaignTools.isInstalled('com.tencent.mm')) {
                $shareWrap.find('.weixin').show().click(nativeWxFriendHandler);

                $shareWrap.find('.quan').show().click(nativeWxTimelineHandler);
            }

            if (campaignTools.isInstalled('com.sina.weibo')) {
                // 分享到微博
                _weiboHandler = nativeWeiboHandler;
            }
        }

        $shareWrap.find('.weibo').click(_weiboHandler);

        $win.on('page:changed', function(e, pageId) {
            setupShareData(pageId);
            currentGameId = pageId;
        });
    }
    initShareHandler();
})();