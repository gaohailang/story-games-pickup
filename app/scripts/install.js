function install(id, evt) {
    var i = {
        packageName: AppPackageNameArr[id],
        appAlias: GAMENAMEARR[id],
        appstoreUrl: AppStoreUrlArr[id]
    };

    if (campaignTools.iniOS() && campaignTools.inWechat()) {
        // 微信里会屏蔽 appstore 的链接 所以这里需要做一个跳转
        window.open('http://mp.weixin.qq.com/mp/redirect?url=' + encodeURIComponent(i.appstoreUrl));
        _pushGaEvent('install_ios_wechat', i.appAlias);
        // iOS
    } else if (campaignTools.iniOS()) {
        window.open(i.appstoreUrl);
        _pushGaEvent('install_ios', i.appAlias);
        // P4
    } else if (campaignTools.inWdj()) {
        var $btns = $(evt.target).parents('.game').find('.js-install-btn');
        $btns.html('安装中');
        campaignTools.installApp(i.packageName);
        var timer = setInterval(function() {
            if (campaignTools.isInstalled(i.packageName)) {
                clearInterval(timer);
                // Todo: btn annotate with open/install
                $btns.addClass('js-installed');
                $btns.html('打开');
            }
        }, 5000);
        _pushGaEvent('install_p4', i.appAlias);
        // android + wechat
    } else if (campaignTools.inAndroid() && campaignTools.inWechat()) {
        location.href = 'http://www.wandoujia.com/apps/' + i.packageName;
        _pushGaEvent('install_android_wechat', i.appAlias);
        // android
    } else if (campaignTools.inAndroid()) {
        location.href = 'http://www.wandoujia.com/apps/' + packageName + '/binding';
        _pushGaEvent('install_android', i.appAlias);
        // other
    } else {
        location.href = 'http://www.wandoujia.com/apps/' + packageName + '/binding';
        _pushGaEvent('install_other', i.appAlias);
    }
}

function openApp(id, evt) {
    var i = {
        packageName: AppPackageNameArr[id],
        appAlias: GAMENAMEARR[id]
    };
    campaignTools.openApp(i.packageName);
    _pushGaEvent('open_p4', i.appAlias);
}