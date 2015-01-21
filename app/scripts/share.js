window.ShareWXText = ['Deemo 这个游戏的剧情太感人了，我的眼泪哗哗的！', '白雪公主居然是一个警探，这个游戏的脑洞开得太大了吧！',
    '「愤怒的小鸟」的游戏公司出了一款新游戏，你值得来玩一把。'
];
window.ShareWeiboText = ['豌豆荚推荐了「Deemo」这款游戏。小女孩和 Deemo 的故事超感人，里面的歌都好好听！', '豌豆荚推荐了「与狼同行」这款游戏。居然白雪公主变成了一名女警探，这个脑洞开得太大了！', '豌豆荚推荐了「小小盗贼」这款游戏。小盗贼好卡哇伊捏，动作都超级搞笑的哈哈！'];
window.ShareWXTitle = '必玩的三款剧情强大的游戏';

// 分享的逻辑处理
function shareControlSetup(element) {
    $shareWrap = $('.share_block');
    // hide weixin-friend, wx-timeline when outside of wx, p4

    // at p4 check weixin/weibo installed, use native

    // at wx, using popup tip?!

    function setupShareData(type, e) {

    }

    function nativeWxFriendHandler(e) {
        campaignTools.toast('正在分享，请稍候...');
        // trackEvent({category: 'follow2014', action: 'share_home', label: 'wechat_friend'});
        campaignTools.runAppShare(shareData.wechatFriend.title, shareData.wechatFriend.desc, shareData.wechatFriend.image, shareData.wechatFriend.UTM, 'WECHAT');
    }

    function nativeWxTimelineHandler(e) {
        campaignTools.toast('正在分享，请稍候...');
        campaignTools.runAppShare(shareData.wechatTimeline.title, shareData.wechatTimeline.desc, shareData.wechatTimeline.image, shareData.wechatTimeline.UTM, 'WECHAT_TIMELINE');
    }

    function nativeWeiboHandler(e) {
        // 之前已经给微博链接加上 url 了
        // 这里需要先阻止链接跳转
        e.preventDefault();
        campaignTools.toast('正在分享，请稍候...');

        campaignTools.runAppShare(shareData.weibo.desc, shareData.weibo.desc, shareData.weibo.image, shareData.weibo.UTM, 'SINA_WEIBO');
    }

    function webWeiboHandler(e) {

    }

    function wxInvokeShareTip(e) {
        // build html and inject to body with close handler
    }

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
    }

    // // 启动微信分享
    // // if (device.isWechat) {
    // //     wechatShareApiInit();
    // // }

    // // 分享到微博
    // var weiboURL = 'http://service.weibo.com/share/share.php?appkey=1483181040&relateUid=1727978503&url=' + encodeURIComponent(shareData.weibo.UTM) + '&title=' + encodeURIComponent(shareData.weibo.desc) + '&pic=' + shareData.weibo.image;

    // element.find('.share-weibo').attr('href', weiboURL).attr('target', '_default').click(function() {
    //     // trackEvent({category: 'follow2014', action: 'share_home', label: 'weibo'});
    // });

    // // 如果是 P4 ，则调用 P4 的分享接口
    // // 目前 P4 的分享接口只支持 微信好友 微信朋友圈 新浪微博
    // if (device.isP4) {
    //     $('html').addClass('p4');

    //     // P4 外的所有情况
    //     // 因为网页中没法直接分享到朋友圈和微信好友
    //     // 所以这时候朋友圈的 icon 已经通过 css 隐藏
    //     // 点击微信 icon , 弹出提示框
    // } else {
    //     // 点击分享到微信时
    //     element.find('.share-wechat').click(function() {
    //         // GA event track
    //         // trackEvent({category: 'follow2014', action: 'share_home', label: 'wechat'});

    //         // 如果是在微信中
    //         // 弹出专门针对微信的提示框
    //         if (device.isWechat) {
    //             // 防止二次弹出
    //             if (!shareDialogRendered) {
    //                 renderWechatShareTpl();
    //                 shareDialogRendered = true;
    //             }
    //             // 弹出二维码提示框
    //         } else {
    //             if (!shareDialogRendered) {
    //                 renderQRCodeShareTpl();
    //                 shareDialogRendered = true;
    //             }
    //         }

    //     });
    // }
}