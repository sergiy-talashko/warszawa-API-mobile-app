angular.module('roms.service', [])

  .factory('apiService', function(Restangular, $base64) {

    var thisFactory = {
      getWifi: getWifi,
      getWifiDomain: getWifiDomain,
      getHotelDomain: getHotelDomain
    };

    return thisFactory;

    function getWifiDomain(){

      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('https://api.bihapi.pl');
      });
    }

    function getHotelDomain(){
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer
      });
    }

    function getWifi(){

      var token = 'Basic ' + $base64.encode("ute:ute!2016");
      console.log(token);
      return Restangular.one('/dane/warszawa').get({resource: "53ef6c4b-8025-4008-a268-916a66de4cfc", Authorization: token}, false, false, {Authorization: token}).then(function(){
        console.log(resp);
        return resp;
      });
    }

  });
