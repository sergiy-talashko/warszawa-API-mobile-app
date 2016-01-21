
angular.module('roms', [
  'ionic',
  'restangular',
  'base64',
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
    .state('root.hotel', {
      url: '/hotel',
      templateUrl: 'templates/hotel.html',
      controller: 'HotelCtrl'
    }
  );

  $urlRouterProvider.otherwise('/root/main');
})
.config(function(RestangularProvider, $base64) {
    var token = 'Basic ' + $base64.encode("ute:ute!2016");
  RestangularProvider.setBaseUrl('https://api.bihapi.pl').setDefaultHeaders({Authorization: token});
});
