angular.module('roms.controllers', [])

.controller('RootCtrl', function($scope, $ionicModal, $timeout) {

  //$scope.loginData = {};
  //
  //$ionicModal.fromTemplateUrl('templates/login.html', {
  //  scope: $scope
  //}).then(function(modal) {
  //  $scope.modal = modal;
  //});
  //
  //$scope.closeLogin = function() {
  //  $scope.modal.hide();
  //};
  //
  //
  //$scope.login = function(){
  //  $scope.modal.show();
  //};
  //
  //
  //$scope.doLogin = function() {
  //  console.log('Doing login', $scope.loginData);
  //
  //  $timeout(function() {
  //    $scope.closeLogin();
  //  }, 1000);
  //};
})

.controller('MainCtrl', function() {

})

.controller('WifiCtrl', function($scope, apiService, $cordovaGeolocation, $ionicPopup) {

    $scope.openPhonePopup = openPhonePopup;

    init();

    function init(){
      apiService.getWifi().then(function(resp){
        $scope.wifiList = resp;
        loadMaps();
      })
    }

    function changeMarkerPosition(marker, lat, lng) {
      var latlng = new google.maps.LatLng(-24.397, 140.644);
      marker.setPosition(latlng);
    }

    function initialise() {
      var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("wifi-map"), mapOptions);
      // Geo Location /

      var infoWindow = new google.maps.InfoWindow();
      if (ionic.Platform.isWebView()){
        $cordovaGeolocation
          .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
          .then(function (position) {
            map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            var myLocation = new google.maps.Marker({
              position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              map: map,
              animation: google.maps.Animation.DROP,
              title: "My Location by GPS"
            });
            google.maps.event.addListener(myLocation, 'click', function(){
              infoWindow.setContent('<h2>' + myLocation.title + '</h2>');
              infoWindow.open(map, myLocation);
            });
          }, function(err) {});

      }else{
        navigator.geolocation.getCurrentPosition(function(pos) {
          map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: map,
            animation: google.maps.Animation.DROP,
            title: "My Location by GPS"
          });
          google.maps.event.addListener(myLocation, 'click', function(){
            infoWindow.setContent('<h2>' + myLocation.title + '</h2>');
            infoWindow.open(map, myLocation);
          });
        });

      }

      $scope.map = map;

      // Additional Markers //
      $scope.markers = [];
      var createMarker = function (info){
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(info.properties[0].value, info.properties[1].value),
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          title: info.properties[3].value,
          description: "ID: " + info.properties[2].value,
          icon: "img/wifi.png"
        });
        marker.content = '<div class="infoWindowContent"></div>';
        google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.description);
          infoWindow.open($scope.map, marker);
        });
        $scope.markers.push(marker);
      };

      if ($scope.wifiList.results){
        for (var i = 0; i < $scope.wifiList.results.length; i++){
          createMarker($scope.wifiList.results[i]);
        }
      }

    }

    function loadMaps(){
      google.maps.event.addDomListener(document.getElementById("wifi-map"), 'load', initialise());
    }

    function openPhonePopup(){
      $scope.data = {};
      var myPopup = $ionicPopup.show({
        template: '<input type="number" ng-model="data.number">',
        title: 'Enter you phone number for getting your position',
        subTitle: 'By entering number, you agree to using this number in API request',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Enter</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data && $scope.data.number) {
                e.preventDefault();
              } else {
                return $scope.data.number;
              }
            }
          }
        ]
      });

      myPopup.then(function(number) {
        if (number){
          getPositionByPhone(number);
        }

      });
    }

    function getPositionByPhone(number){
      apiService.getPositionByTelephone(number).then(function(resp){
        if (resp){
          var infoWindow = new google.maps.InfoWindow();
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(resp.result.latitude, resp.result.longitude),
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            title: "My Location by SIM",
            icon: "img/marker-sim.png"
          });
          google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>');
            infoWindow.open($scope.map, marker);
          });
        }
      })
    }
})

.controller('NumberCtrl', function($scope, apiService, $ionicPopup) {

    init();

    function init(){

      $scope.data = {};

      var myPopup = $ionicPopup.show({
        template: '<input type="number" ng-model="data.number">',
        title: 'Enter you phone number',
        subTitle: 'By entering number, you agree to using this number in API request',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Enter</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data && $scope.data.number) {
                e.preventDefault();
              } else {
                return $scope.data.number;
              }
            }
          }
        ]
      });

      myPopup.then(function(number) {
        if (number){
          apiService.getNumberInfo(number).then(function(resp){
            $scope.numberData = resp;
          });
        }

      });

    }

});
