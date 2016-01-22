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

    function getPositionByTelephone(){

      return $http({
        method: 'GET',
        url: '',
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
