/*global $, jQuery, ga*/

/* jshint ignore:start */
;
/* jshint ignore:end */

(function(window, undefined) {

    var campaignTools = {};

    /*
     * GA 事件统计
     */
    campaignTools.pushGaEvent = function(category, action, label, value) {

        // TODO: 兼容旧版 ga，做 value 转换
        if (typeof ga !== 'undefined' && ga) {
            category = category || '';
            action = action || '';
            label = label || '';
            value = value || 0;
            ga('send', 'event', category, action, label, value);
        }
    };

    /*
     * body 高设置为屏幕显示区域高度
     * @notice Webview 有时屏幕初始高度会有 bug，此方法为解决此 bug
     */
    campaignTools.setFullScreenHeight = function(minHeight) {

        var height = window.innerHeight;
        minHeight = minHeight || 480; // 根据页面需求变化，默认 480px

        if (height < minHeight) {
            setTimeout(function() {
                height = window.innerHeight;
                if (height < minHeight) {
                    height = minHeight;
                }
                document.body.style.height = height + 'px';
            }, 1000);
        } else {
            document.body.style.height = height + 'px';
        }
    };


    /*
     * 判断是否在 P4 Webview 中
     * @return {boolean} true || false
     */
    // TODO: in others app
    campaignTools.inWdj = function() {
        if (typeof window.campaignPlugin !== 'undefined' && window.campaignPlugin) {
            return true;
        } else {
            return false;
        }
    };

    /*
     * 判断是否在微信中
     * @return {boolean} true || false
     */
    campaignTools.inWechat = function() {
        if (navigator.userAgent.toLowerCase().match(/micromessenger/)) {
            return true;
        } else {
            return false;
        }
    };

    /*
     * 判断是否在 iOS 中
     * @return {boolean} true || false
     */
    campaignTools.iniOS = function() {
        if (navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/)) {
            return true;
        } else {
            return false;
        }
    };

    /*
     * 判断是否在 android 中
     * @return {boolean} true || false
     */
    campaignTools.inAndroid = function() {
        if (navigator.userAgent.toLowerCase().match(/(android)/)) {
            return true;
        } else {
            return false;
        }
    };


    /*
     * 判断是否是 Retina
     * @return {boolean} true || false
     */
    campaignTools.isRetina = function() {
        if (window.devicePixelRatio && window.devicePixelRatio > 1) {
            return true;
        } else {
            return false;
        }
    };

    if (typeof window.campaignPlugin !== 'undefined' && window.campaignPlugin) {

        var campaignPlugin = window.campaignPlugin;

        /*
         * 调起安卓系统级别分享
         * @param title {string} 分享标题
         * @param content {string} 分享内容
         * @notice 只可分享文字，如需带有图片的分享请使用 shareTo 方法
         */
        campaignTools.runSystemShare = function(title, content) {
            campaignPlugin.share(title, content);
        };

        /*
         * 调起应用级别分享
         * @param title {string} 分享标题
         * @param content {string} 分享内容
         * @param imgUrl {string} 分享图片的地址(不建议过大)
         * @param shareUrl {string} 分享 URL
         * @param appType {string} SINA_WEIBO || WECHAT || WECHAT_TIMELINE
         * @notice 目前只支持新浪微博，微信对话框，微信朋友圈
         */
        // 增加参数判断
        campaignTools.runAppShare = function(title, content, imgUrl, shareUrl, appType) {
            campaignPlugin.shareTo(title, content, imgUrl, shareUrl, appType);
        };

        /*
         * 在外部浏览器中打开链接
         * @param {string} URL
         */
        campaignTools.openInBrowser = function(url) {
            campaignPlugin.openInBrowser(url);
        };

        /*
         * 获取手机 UDID
         * @return {string} UDID
         */
        campaignTools.getUDID = function() {
            return campaignPlugin.getUDID();
        };

        /*
         * 获取应用安装状态
         * @param packageName {string} 应用包名
         * @return {boolean} true || false
         */
        // TODO: interval
        campaignTools.isInstalled = function(packageName) {
            return campaignPlugin.isInstalled(packageName);
        };

        /*
         * 获取应用版本号
         * @param packageName {string} 应用包名
         * @return {string} 版本号
         */
        // TODO: to an object
        campaignTools.getAppVersionCode = function(packageName) {
            return campaignPlugin.getAppVersionCode(packageName);
        };

        /*
         * 打开其他应用
         * @param packageName {string} 应用包名
         */
        campaignTools.openApp = function(packageName) {
            campaignPlugin.openApp(packageName);
        };

        /*
         * 打开应用在 P4 内的详情页
         * @param packageName {string} 应用包名
         */
        campaignTools.openAppDetail = function(packageName) {
            campaignPlugin.openAppDetail(packageName);
        };

        /*
         * 打开非设计奖的详情页
         * @param packageName {string} 应用包名
         */
        campaignTools.openAppDetailWithoutAward = function(packageName) {
            campaignPlugin.openAppDetailWithoutAward(packageName);
        };

        /*
         * 打开其他应用内某页面
         * @param serializedIntent {string} 应用内搜索协议地址
         * @example meituanmovie://www.meituan.com/movie?id=78379&nm=后会无期
         */
        // TODO: 包装
        campaignTools.sendIntent = function(serializedIntent) {
            campaignPlugin.startActivity(serializedIntent);
        };

        /*
         * !ABANDON! *
         * 安装应用
         * @param packageName {string} 应用包名
         * @param downloadUrl {string} 下载链接
         * @param appName {string} 应用名称（用于显示在 P4 下载任务列表中）
         * @param iconUrl {string} 图标 URL（用于显示在 P4 下载任务列表中）
         * @param size {number} 应用大小（请访问 http://apps.wandoujia.com/api/v1/apps/ + packageName 查询 bytes 字段）
            campaignTools.installApp = function (packageName, downloadUrl, appName, iconUrl, size) {
                campaignPlugin.install(packageName, downloadUrl, appName, iconUrl, size);
            };
         */

        /*
         * 打开一个新的 Webview
         * @param url {string} Webview 加载的 URL
         * @param title {string} Webview 顶部的标题
         * @param showActionBar {boolean} 是否显示顶部系统状态栏（时间，电量，运营商那栏）
         * @param isPortrait {boolean} 竖屏(true) or 横屏(false)
         * @param isFullScreen {boolean} 是否隐藏掉底部虚拟按钮栏（特定机型才有）
         */
        // TODO: set default
        campaignTools.openNewWebView = function(url, title, showActionBar, isPortrait, isFullScreen) {
            campaignPlugin.openNewWebView(url, title, showActionBar, isPortrait, isFullScreen);
        };

        /*
         * 安装应用
         * @param packageName {string} 要安装的应用包名
         * @notice 不带 POS 信息，如需 POS 信息请使用废弃的老方法，把 POS 信息写进 URL 中，
                   此接口已经开始 Polish，下一版本会加上 POS 参数
         */
        // TODO: add callback
        campaignTools.installApp = function(packageName) {
            campaignPlugin.installByPackage(packageName);
        };

        /*
         * 打开应用在 P4 内的用户个人主页
         * @param uid {string} 用户的 UID
         * @example '4383987'
         */
        campaignTools.openUserDetail = function(uid) {
            campaignPlugin.openUserDetail(uid);
        };

        /*
         * 关闭当前 WebView
         */
        campaignTools.closeWebView = function() {
            campaignPlugin.closeWebView();
        };

        /*
         * toast
         */
        campaignTools.toast = function(string) {
            campaignPlugin.toast(string);
        };

        /*
         * 获得当前 P4 版本号
         */
        campaignTools.getVersionName = function() {
            return campaignPlugin.getVersionName();
        };
    }

    var _campaignTools = window.campaignTools;
    window.campaignTools = campaignTools;

    campaignTools.noConflict = function() {
        window.campaignTools = _campaignTools;
        return campaignTools;
    };
})(this);