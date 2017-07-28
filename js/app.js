
angular.module('starter', ['ionic', 'starter.controllers','starter.services'], function($httpProvider) {
  //此方法用于修改$http请求的数据格式，让后台可以按照 ajax，传输数据的方式接收
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded;charset=utf-8';
  /**
   * The workhorse; converts an object to x-www-form-urlencoded
   serialization.
   * @param {Object} obj
   * @return {String}
   */
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj,
      i;
    for(name in obj) {
      value = obj[name];
      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value)
          + '&';
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  };
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ?
      param(data) : data;
  }];
})

//.run(function($ionicPlatform) {
//$ionicPlatform.ready(function() {
//  // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//  // for form inputs)
//  if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
//    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//    cordova.plugins.Keyboard.disableScroll(true);
//
//  }
//  if (window.StatusBar) {
//    // org.apache.cordova.statusbar required
//    StatusBar.styleDefault();
//  }
//});
//})



// 实现安卓物理返回键处理
.run(['$ionicPlatform', '$rootScope','$location','$ionicHistory', 
function($ionicPlatform, $rootScope, $location,$ionicHistory) { 
  $ionicPlatform.ready(function() { 
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard 
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



.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
	/*用于修改安卓 tab居下 （在参数里要加入$ionicConfigProvider）*/
$ionicConfigProvider.platform.ios.tabs.style('standard'); 
  $ionicConfigProvider.platform.ios.tabs.position('bottom'); 
  $ionicConfigProvider.platform.android.tabs.style('standard'); 
  $ionicConfigProvider.platform.android.tabs.position('standard'); 
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
  $ionicConfigProvider.platform.android.navBar.alignTitle('left'); 
$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left'); 
$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back'); 
  $ionicConfigProvider.platform.ios.views.transition('ios'); 
$ionicConfigProvider.platform.android.views.transition('android'); 

	

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
     cache:'false',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('tab.study', {
    url: '/home/:id',
     cache:'false',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-study.html',
        controller: 'StudyCtrl'
      }
    }
  })

  .state('tab.curselist', {
      url: '/curselist',
      cache:'false',
      views: {
        'tab-curselist': {
          templateUrl: 'templates/tab-curselist.html',
          controller: 'CurselistCtrl'
        }
      }
    })
    .state('tab.mycourse', {
      url: '/mycourse',
      cache:'false',
      views: {
        'tab-mycourse': {
          templateUrl: 'templates/tab-mycourse.html',
          controller: 'MycourseCtrl'
        }
      }
    })

  .state('tab.personal', {
    url: '/personal',
    cache:'false',
    views: {
      'tab-personal': {
        templateUrl: 'templates/tab-personal.html',
        controller: 'PersonalCtrl'
      }
    }
  })
  
  .state('tab.register', {
    url: '/register',
    cache:'false',
    views: {
      'tab-personal': {
        templateUrl: 'templates/tab-register.html',
        controller: 'RegisterCtrl'
      }
    }
  })
   .state('tab.enter', {
    url: '/enter',
    cache:'false',
    views: {
      'tab-personal': {
        templateUrl: 'templates/tab-enter.html',
        controller: 'EnterCtrl'
      }
    }
  });
  

  $urlRouterProvider.otherwise('/tab/home');

});
