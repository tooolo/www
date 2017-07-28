// 用于修改安卓 tab居下
.config(function($stateProvider, $urlRouterProvider, 
$ionicConfigProvider) { 
/*用于修改安卓 tab居下 （在参数里要加入$ionicConfigProvider）*/
$ionicConfigProvider.platform.ios.tabs.style('standard'); 
  $ionicConfigProvider.platform.ios.tabs.position('bottom'); 
  $ionicConfigProvider.platform.android.tabs.style('standard'); 
  $ionicConfigProvider.platform.android.tabs.position('standard'); 
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
  $ionicConfigProvider.platform.android.navBar.alignTitle('left'); 
$ionicConfigProvider.platform.ios.backButton.previousTitleText(''
).icon('ion-ios-arrow-thin-left'); 
$ionicConfigProvider.platform.android.backButton.previousTitleTex
t('').icon('ion-android-arrow-back'); 
  $ionicConfigProvider.platform.ios.views.transition('ios'); 
$ionicConfigProvider.platform.android.views.transition('android')
; 





// 实现安卓物理返回键处理
.run(['$ionicPlatform', '$rootScope','$location','$ionicHistory', 
function($ionicPlatform, $rootScope, $location,$ionicHistory) { 
  $ionicPlatform.ready(function() { 
    // Hide the accessory bar by default (remove this to show the accessory bar 
above the keyboard 
    // for form inputs) 
    if (window.cordova && window.cordova.plugins && 
window.cordova.plugins.Keyboard) { 
cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true); 
cordova.plugins.Keyboard.disableScroll(true); 
    } 
    if (window.StatusBar) { 
// org.apache.cordova.statusbar required 
StatusBar.styleDefault(); 
    } 
  }); 
  //安卓物理按键返回，以及双击退出 
  $ionicPlatform.registerBackButtonAction(function (e) { 
    //判断处于哪个页面时双击退出 
    if ($location.path() == '/tab/home') { 
if ($rootScope.backButtonPressedOnceToExit) { 
ionic.Platform.exitApp(); 
} else { 
$rootScope.backButtonPressedOnceToExit = true; 
setTimeout(function () { 
  $rootScope.backButtonPressedOnceToExit = false; 
}, 2000); 
} 
    } 
    else if ($ionicHistory.backView()) { 
$ionicHistory.goBack(); 
    } else { 
$rootScope.backButtonPressedOnceToExit = true; 
setTimeout(function () { 
$rootScope.backButtonPressedOnceToExit = false; 
  }, 2000); 
    } 
    $ionicHistory.backView.go(); 
e.preventDefault();
    return false; 
  }, 101); 
}])


// 安装视频播放插件
cordova plugin add https://github.com/jaeger25/Html5Video.git
// 安装支付插件
cordova plugin add co.airsia.cordova.pingpp --variable URL_SCHEME=fenghauliusha 
