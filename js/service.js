angular.module('roms.service', [])

  .factory('apiService', function($http) {

    var thisFactory = {
      getWifi: getWifi,
      getPositionByTelephone: getPositionByTelephone,
      getNumberInfo: getNumberInfo
    };

    return thisFactory;

    function getWifi(){

      return $http({
        method: 'GET',
        url: 'https://api.bihapi.pl/dane/warszawa?resource=53ef6c4b-8025-4008-a268-916a66de4cfc',
        headers: {
          Authorization: "Basic dXRlOnV0ZSEyMDE2"
        }
      }).then(function(res){
        return res.data;
      }).catch(function(){
        alert("Can't get data from API");
      })
    }

    function getPositionByTelephone(phone){

      return $http({
        method: 'GET',
        url: 'https://api.bihapi.pl/v2/rest/terminal_location/location?query={"acceptableAccuracy":"10","address":"tel:'+phone+'","requestedAccuracy":"10","tolerance":"DelayTolerant"}',
        headers: {
          Authorization: "Basic dXRlOnV0ZSEyMDE2"
        }
      }).then(function(res){
        return res.data;
      }).catch(function(){
        alert("Can't get data from API");
      })
    }

    function getNumberInfo(number){

      return $http({
        method: 'GET',
        url: 'https://api.bihapi.pl/orange/oracle/imei?msisdn='+number,
        headers: {
          Authorization: "Basic dXRlOnV0ZSEyMDE2"
        }
      }).then(function(res){
        return res.data;
      }).catch(function(){
        alert("Can't get data from API");
      })
    }

  });
