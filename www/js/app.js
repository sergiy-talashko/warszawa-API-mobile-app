
angular.module('roms', [
  'ionic',
  'ngCordova',
  'roms.controllers',
  'roms.service'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('root', {
      url: '/root',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'RootCtrl'
    })
    .state('root.main', {
      url: '/main',
      templateUrl: 'templates/main.html',
      controller: 'MainCtrl'
    })
    .state('root.wifi', {
      url: '/wifi',
      templateUrl: 'templates/wifi.html',
      controller: 'WifiCtrl'
    })
    .state('root.number', {
      url: '/number',
      templateUrl: 'templates/number.html',
      controller: 'NumberCtrl'
    }
  );

  $urlRouterProvider.otherwise('/root/main');
});
