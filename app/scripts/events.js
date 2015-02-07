function install (argument) {
  // body...
  if (bodu.device.iOS && bodu.device.isWechat) {
    e.preventDefault();
    // 微信里会屏蔽 appstore 的链接 所以这里需要做一个跳转
    window.open('http://mp.weixin.qq.com/mp/redirect?url= ' + encodeURIComponent(url));
    bodu.trackEvent({category: goodgames, action: 'install_ios_wechat', label: 'deemo'});
    // iOS
  } else if (bodu.device.iOS) {
    e.preventDefault();
    window.open(url);
    bodu.trackEvent({category: goodgames, action: 'install_ios', label: 'deemo'});
    // P4
  } else if (bodu.device.isP4) {
    e.preventDefault();
    $t.find('span').html('安装中');
    bodu.install(packageName, downloadUrl, title, icon, bytes);
    var timer = setInterval(function () {
      if (bodu.isInstalled(packageName)) {
        clearInterval(timer);
        $t.hide().after('<a href=" " class="button open"><i></i><span>打开<span></a >');
      }
    }, 5000);
    bodu.trackEvent({category: goodgames, action: 'install_p4', label: 'deemo'});

    // android + wechat
  } else if (bodu.device.isAndroid && bodu.device.isWechat) {
    e.preventDefault();
    window.open('http://www.wandoujia.com/apps/' + packageName);
    bodu.trackEvent({category: goodgames, action: 'install_android_wechat', label: 'deemo'});

    // android
  } else if (bodu.device.isAndroid) {
    e.preventDefault();
    window.open('http://www.wandoujia.com/apps/' + packageName + '/binding');

    bodu.trackEvent({category: goodgames, action: 'install_android', label: 'deemo'});

    // mac
  } else if (bodu.device.isMac) {
    e.preventDefault();
    window.open('http://www.wandoujia.com/apps/' + packageName + '/binding');
    bodu.trackEvent({category: goodgames, action: 'install_mac', label: 'deemo'});

    // win
  } else if (bodu.device.isWin) {
    e.preventDefault();
    window.open('http://www.wandoujia.com/apps/' + packageName + '/binding');
    bodu.trackEvent({category: goodgames, action: 'install_win', label: 'deemo'});

    // other
  } else {
    e.preventDefault();
    window.open('http://www.wandoujia.com/apps/' + packageName + '/binding');
    bodu.trackEvent({category: goodgames, action: 'install_other', label: 'demo'});
  }
}
