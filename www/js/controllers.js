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
  //$scope.login = function() {
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

.controller('WifiCtrl', function($scope, apiService) {

    init();

    function init(){
      apiService.getWifi().then(function(resp){
        console.log(resp);
        $scope.wifiList = FIWI_LIST;
        loadMaps();
      })
    }

    function changeMarkerPosition(marker, lat, lng) {
      var latlng = new google.maps.LatLng(-24.397, 140.644);
      marker.setPosition(latlng);
    }

    $scope.initialise = function() {
      console.log(123123);
      var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("google-map"), mapOptions);
      // Geo Location /
      navigator.geolocation.getCurrentPosition(function(pos) {
        map.setCenter(new google.maps.LatLng("52.2418745998732", "21.024118173786"));
        var myLocation = new google.maps.Marker({
          position: new google.maps.LatLng("52.2418745998732", "21.024118173786"),
          map: map,
          animation: google.maps.Animation.DROP,
          title: "My Location"
        });
      });

      $scope.map = map;

      // Additional Markers //
      $scope.markers = [];
      var infoWindow = new google.maps.InfoWindow();
      var createMarker = function (info){
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(info.properties[0].value, info.properties[1].value),
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          title: info.properties[3].value,
          description: "ID: " + info.properties[2].value,
          icon: "/img/wifi.png"
        });
        marker.content = '<div class="infoWindowContent">123</div>';
        google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.description);
          infoWindow.open($scope.map, marker);
        });
        $scope.markers.push(marker);
      };

      console.log($scope.wifiList);
      for (var i = 0; i < $scope.wifiList.results.length; i++){
        createMarker($scope.wifiList.results[i]);
      }

    };

    function loadMaps(){
      google.maps.event.addDomListener(document.getElementById("google-map"), 'load', $scope.initialise());
    }
})

.controller('HotelCtrl', function($scope, $stateParams) {
});


var FIWI_LIST = {"results":[{"properties":[{"key":"y_wgs84","value":"52.2399039150103"},{"key":"x_wgs84","value":"20.9878396314438"},{"key":"_id","value":"1"},{"key":"nazwa","value":"awol-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2313849265924"},{"key":"x_wgs84","value":"20.9553082777262"},{"key":"_id","value":"2"},{"key":"nazwa","value":"awol-pso-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2344073124796"},{"key":"x_wgs84","value":"20.945101174546"},{"key":"_id","value":"3"},{"key":"nazwa","value":"awol-pso-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.2344073124796"},{"key":"x_wgs84","value":"20.945101174546"},{"key":"_id","value":"4"},{"key":"nazwa","value":"awol-pso-e03"}]},{"properties":[{"key":"y_wgs84","value":"52.2321465593703"},{"key":"x_wgs84","value":"20.94850638737"},{"key":"_id","value":"5"},{"key":"nazwa","value":"awol-pso-e04"}]},{"properties":[{"key":"y_wgs84","value":"52.2268155171527"},{"key":"x_wgs84","value":"20.9355683093524"},{"key":"_id","value":"6"},{"key":"nazwa","value":"awol-ppo-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2331563908208"},{"key":"x_wgs84","value":"20.9489329996608"},{"key":"_id","value":"7"},{"key":"nazwa","value":"awol-psz-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2371277479732"},{"key":"x_wgs84","value":"21.095639464933"},{"key":"_id","value":"8"},{"key":"nazwa","value":"appl-obr-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2319842506413"},{"key":"x_wgs84","value":"21.0561118722409"},{"key":"_id","value":"9"},{"key":"nazwa","value":"appl-zwy-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2364598715067"},{"key":"x_wgs84","value":"21.0036971129144"},{"key":"_id","value":"10"},{"key":"nazwa","value":"acen-grz-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2356220613828"},{"key":"x_wgs84","value":"21.0036893381413"},{"key":"_id","value":"11"},{"key":"nazwa","value":"acen-grz-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.2558097607581"},{"key":"x_wgs84","value":"21.1628424530418"},{"key":"_id","value":"12"},{"key":"nazwa","value":"arem-kom-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2492293104185"},{"key":"x_wgs84","value":"21.0126288364456"},{"key":"_id","value":"13"},{"key":"nazwa","value":"acen-ryn-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2480365266694"},{"key":"x_wgs84","value":"21.0108249839863"},{"key":"_id","value":"14"},{"key":"nazwa","value":"acen-pod-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2496636095789"},{"key":"x_wgs84","value":"21.0123676098268"},{"key":"_id","value":"15"},{"key":"nazwa","value":"acen-ryn-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.2503924341223"},{"key":"x_wgs84","value":"21.0108109115976"},{"key":"_id","value":"16"},{"key":"nazwa","value":"acen-pod-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.2418810339485"},{"key":"x_wgs84","value":"21.0163376052737"},{"key":"_id","value":"17"},{"key":"nazwa","value":"acen-kra-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.2409285426416"},{"key":"x_wgs84","value":"21.0138933224773"},{"key":"_id","value":"18"},{"key":"nazwa","value":"acen-ppi-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2475338548815"},{"key":"x_wgs84","value":"21.0133075891931"},{"key":"_id","value":"19"},{"key":"nazwa","value":"acen-zam-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2386755029599"},{"key":"x_wgs84","value":"21.017656699334"},{"key":"_id","value":"20"},{"key":"nazwa","value":"acen-kra-e03"}]},{"properties":[{"key":"y_wgs84","value":"52.2457066890324"},{"key":"x_wgs84","value":"21.0139404638318"},{"key":"_id","value":"21"},{"key":"nazwa","value":"acen-kra-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2435051853617"},{"key":"x_wgs84","value":"21.009611087991"},{"key":"_id","value":"22"},{"key":"nazwa","value":"acen-pte-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2429926168012"},{"key":"x_wgs84","value":"21.001527389591"},{"key":"_id","value":"23"},{"key":"nazwa","value":"acen-rat-i08"}]},{"properties":[{"key":"y_wgs84","value":"52.2373020752604"},{"key":"x_wgs84","value":"21.0197762855424"},{"key":"_id","value":"24"},{"key":"nazwa","value":"acen-swi-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2373993684261"},{"key":"x_wgs84","value":"21.0179894266743"},{"key":"_id","value":"25"},{"key":"nazwa","value":"acen-swi-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.2363876362426"},{"key":"x_wgs84","value":"21.0182544296715"},{"key":"_id","value":"26"},{"key":"nazwa","value":"acen-nsw-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2331972593063"},{"key":"x_wgs84","value":"21.0195113826307"},{"key":"_id","value":"27"},{"key":"nazwa","value":"acen-nsw-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.2322194783578"},{"key":"x_wgs84","value":"21.0163911730718"},{"key":"_id","value":"28"},{"key":"nazwa","value":"acen-bra-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2293102482486"},{"key":"x_wgs84","value":"21.0215008270229"},{"key":"_id","value":"29"},{"key":"nazwa","value":"acen-ptk-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.2314734749301"},{"key":"x_wgs84","value":"21.0206877789064"},{"key":"_id","value":"30"},{"key":"nazwa","value":"acen-nsw-e03"}]},{"properties":[{"key":"y_wgs84","value":"52.2282019425724"},{"key":"x_wgs84","value":"21.0231309383166"},{"key":"_id","value":"31"},{"key":"nazwa","value":"acen-ptk-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2197774890632"},{"key":"x_wgs84","value":"21.0179320834166"},{"key":"_id","value":"32"},{"key":"nazwa","value":"acen-pzb-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2198339288245"},{"key":"x_wgs84","value":"21.0257916244052"},{"key":"_id","value":"33"},{"key":"nazwa","value":"acen-pnr-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2252821919115"},{"key":"x_wgs84","value":"21.0442695495593"},{"key":"_id","value":"34"},{"key":"nazwa","value":"acen-zar-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2255047408434"},{"key":"x_wgs84","value":"21.0441261861947"},{"key":"_id","value":"35"},{"key":"nazwa","value":"acen-zar-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.2214703868381"},{"key":"x_wgs84","value":"21.0480455052153"},{"key":"_id","value":"36"},{"key":"nazwa","value":"acen-zar-e03"}]},{"properties":[{"key":"y_wgs84","value":"52.2221954881096"},{"key":"x_wgs84","value":"21.0469554705484"},{"key":"_id","value":"37"},{"key":"nazwa","value":"acen-zar-e04"}]},{"properties":[{"key":"y_wgs84","value":"52.2207246835383"},{"key":"x_wgs84","value":"21.0470729197687"},{"key":"_id","value":"38"},{"key":"nazwa","value":"acen-zar-e05"}]},{"properties":[{"key":"y_wgs84","value":"52.2416707248207"},{"key":"x_wgs84","value":"21.0232906294295"},{"key":"_id","value":"39"},{"key":"nazwa","value":"acen-lip-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2418745998732"},{"key":"x_wgs84","value":"21.024118173786"},{"key":"_id","value":"40"},{"key":"nazwa","value":"acen-dob-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2323692371693"},{"key":"x_wgs84","value":"21.0098130156077"},{"key":"_id","value":"41"},{"key":"nazwa","value":"acen-def-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2320457799526"},{"key":"x_wgs84","value":"21.0117763581405"},{"key":"_id","value":"42"},{"key":"nazwa","value":"acen-wie-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2299491907162"},{"key":"x_wgs84","value":"21.0123243661451"},{"key":"_id","value":"43"},{"key":"nazwa","value":"acen-mar-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2337155529186"},{"key":"x_wgs84","value":"21.0107393151175"},{"key":"_id","value":"44"},{"key":"nazwa","value":"acen-sie-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2328317473834"},{"key":"x_wgs84","value":"21.0080575807946"},{"key":"_id","value":"45"},{"key":"nazwa","value":"acen-def-e04"}]},{"properties":[{"key":"y_wgs84","value":"52.23337714092"},{"key":"x_wgs84","value":"21.0071048424376"},{"key":"_id","value":"46"},{"key":"nazwa","value":"acen-def-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.2330837814658"},{"key":"x_wgs84","value":"21.0056817092279"},{"key":"_id","value":"47"},{"key":"nazwa","value":"acen-def-e05"}]},{"properties":[{"key":"y_wgs84","value":"52.2545161514707"},{"key":"x_wgs84","value":"21.0115926093468"},{"key":"_id","value":"48"},{"key":"nazwa","value":"asro-san-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2535250835887"},{"key":"x_wgs84","value":"21.0121974657335"},{"key":"_id","value":"49"},{"key":"nazwa","value":"asro-san-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.2320056611636"},{"key":"x_wgs84","value":"21.0085929507042"},{"key":"_id","value":"50"},{"key":"nazwa","value":"acen-def-e03"}]},{"properties":[{"key":"y_wgs84","value":"52.2285597997252"},{"key":"x_wgs84","value":"21.0063086466757"},{"key":"_id","value":"51"},{"key":"nazwa","value":"acen-epl-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2541438095444"},{"key":"x_wgs84","value":"21.0126375961705"},{"key":"_id","value":"52"},{"key":"nazwa","value":"asro-san-e03"}]},{"properties":[{"key":"y_wgs84","value":"52.2551882553672"},{"key":"x_wgs84","value":"21.0115140371454"},{"key":"_id","value":"53"},{"key":"nazwa","value":"asro-san-e04"}]},{"properties":[{"key":"y_wgs84","value":"52.2398065847636"},{"key":"x_wgs84","value":"21.0232010054835"},{"key":"_id","value":"54"},{"key":"nazwa","value":"acen-obo-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.241826387115"},{"key":"x_wgs84","value":"21.071516748552"},{"key":"_id","value":"55"},{"key":"nazwa","value":"appl-kin-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2350878888535"},{"key":"x_wgs84","value":"21.0545093979877"},{"key":"_id","value":"56"},{"key":"nazwa","value":"appl-wal-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2380440198328"},{"key":"x_wgs84","value":"21.0522790317756"},{"key":"_id","value":"57"},{"key":"nazwa","value":"appl-rwa-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2402986740184"},{"key":"x_wgs84","value":"21.0621072413916"},{"key":"_id","value":"58"},{"key":"nazwa","value":"appl-mie-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2501217947753"},{"key":"x_wgs84","value":"21.0850234221053"},{"key":"_id","value":"59"},{"key":"nazwa","value":"appl-wia-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2243422661061"},{"key":"x_wgs84","value":"21.0714057748503"},{"key":"_id","value":"60"},{"key":"nazwa","value":"appl-egp-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.1561228688733"},{"key":"x_wgs84","value":"21.2033430824376"},{"key":"_id","value":"61"},{"key":"nazwa","value":"awaw-poe-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.1597486875137"},{"key":"x_wgs84","value":"21.2084891882428"},{"key":"_id","value":"62"},{"key":"nazwa","value":"awaw-wlo-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.1641832310704"},{"key":"x_wgs84","value":"21.2008160022766"},{"key":"_id","value":"63"},{"key":"nazwa","value":"awaw-hal-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.1642644835044"},{"key":"x_wgs84","value":"21.2234795550904"},{"key":"_id","value":"64"},{"key":"nazwa","value":"awaw-bar-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2187768430708"},{"key":"x_wgs84","value":"21.1442074802942"},{"key":"_id","value":"65"},{"key":"nazwa","value":"awaw-kor-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.1977070935671"},{"key":"x_wgs84","value":"21.1341765746071"},{"key":"_id","value":"66"},{"key":"nazwa","value":"awaw-prz-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2024464666017"},{"key":"x_wgs84","value":"21.1825569210297"},{"key":"_id","value":"67"},{"key":"nazwa","value":"awaw-poz-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2165067417158"},{"key":"x_wgs84","value":"21.1712950995528"},{"key":"_id","value":"68"},{"key":"nazwa","value":"awaw-alp-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2212646557935"},{"key":"x_wgs84","value":"21.1641733578698"},{"key":"_id","value":"69"},{"key":"nazwa","value":"awaw-kaj-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2191245389798"},{"key":"x_wgs84","value":"21.1628925625121"},{"key":"_id","value":"70"},{"key":"nazwa","value":"awaw-vpo-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.1880365889787"},{"key":"x_wgs84","value":"21.1766691288594"},{"key":"_id","value":"71"},{"key":"nazwa","value":"awaw-baj-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.1861656581686"},{"key":"x_wgs84","value":"21.1947716507838"},{"key":"_id","value":"72"},{"key":"nazwa","value":"awaw-wil-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2128165407662"},{"key":"x_wgs84","value":"21.1114702390143"},{"key":"_id","value":"73"},{"key":"nazwa","value":"awaw-kad-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2380697998433"},{"key":"x_wgs84","value":"21.1434143988682"},{"key":"_id","value":"74"},{"key":"nazwa","value":"awaw-krm-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2382517487374"},{"key":"x_wgs84","value":"21.1469344498904"},{"key":"_id","value":"75"},{"key":"nazwa","value":"awaw-kor-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2430431158517"},{"key":"x_wgs84","value":"21.1022316546246"},{"key":"_id","value":"76"},{"key":"nazwa","value":"appl-sze-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2282720555947"},{"key":"x_wgs84","value":"21.0857278848536"},{"key":"_id","value":"77"},{"key":"nazwa","value":"appl-kap-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.224933275112"},{"key":"x_wgs84","value":"21.0928667821235"},{"key":"_id","value":"78"},{"key":"nazwa","value":"appl-bor-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2002494568701"},{"key":"x_wgs84","value":"20.9243403710629"},{"key":"_id","value":"79"},{"key":"nazwa","value":"awlo-pac-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2002494568701"},{"key":"x_wgs84","value":"20.9243403710629"},{"key":"_id","value":"80"},{"key":"nazwa","value":"awlo-pac-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.2583678860164"},{"key":"x_wgs84","value":"21.1630014718802"},{"key":"_id","value":"81"},{"key":"nazwa","value":"arem-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.257258479865"},{"key":"x_wgs84","value":"21.1624994253404"},{"key":"_id","value":"82"},{"key":"nazwa","value":"arem-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2582580431985"},{"key":"x_wgs84","value":"21.1714141220809"},{"key":"_id","value":"83"},{"key":"nazwa","value":"arem-plu-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2584970312402"},{"key":"x_wgs84","value":"21.1774404919624"},{"key":"_id","value":"84"},{"key":"nazwa","value":"arem-wac-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.263537870599"},{"key":"x_wgs84","value":"21.183917516811"},{"key":"_id","value":"85"},{"key":"nazwa","value":"arem-adm-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2647725025333"},{"key":"x_wgs84","value":"21.1675725091584"},{"key":"_id","value":"86"},{"key":"nazwa","value":"arem-kad-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2627720406095"},{"key":"x_wgs84","value":"21.1563725453076"},{"key":"_id","value":"87"},{"key":"nazwa","value":"arem-pad-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2533218895016"},{"key":"x_wgs84","value":"21.1645291552909"},{"key":"_id","value":"88"},{"key":"nazwa","value":"arem-2mi-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.251222263431"},{"key":"x_wgs84","value":"21.1673197460226"},{"key":"_id","value":"89"},{"key":"nazwa","value":"arem-2mi-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.2465731020666"},{"key":"x_wgs84","value":"21.135534047034"},{"key":"_id","value":"90"},{"key":"nazwa","value":"arem-nie-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.2465731020666"},{"key":"x_wgs84","value":"21.135534047034"},{"key":"_id","value":"91"},{"key":"nazwa","value":"arem-nie-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.2484375713508"},{"key":"x_wgs84","value":"21.128271145107"},{"key":"_id","value":"92"},{"key":"nazwa","value":"arem-kon-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.3209429052353"},{"key":"x_wgs84","value":"20.9717387813771"},{"key":"_id","value":"93"},{"key":"nazwa","value":"abia-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.1620436106828"},{"key":"x_wgs84","value":"21.0875888598598"},{"key":"_id","value":"94"},{"key":"nazwa","value":"awil-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.1669255963629"},{"key":"x_wgs84","value":"21.0855332826973"},{"key":"_id","value":"95"},{"key":"nazwa","value":"awil-prz-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.1738036419706"},{"key":"x_wgs84","value":"21.0696429108191"},{"key":"_id","value":"96"},{"key":"nazwa","value":"awil-gub-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.1733202068546"},{"key":"x_wgs84","value":"21.0698613425105"},{"key":"_id","value":"97"},{"key":"nazwa","value":"awil-gub-e02"}]},{"properties":[{"key":"y_wgs84","value":"52.1593897124274"},{"key":"x_wgs84","value":"21.0965474115998"},{"key":"_id","value":"98"},{"key":"nazwa","value":"awil-vog-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.1689614068015"},{"key":"x_wgs84","value":"21.1157498840287"},{"key":"_id","value":"99"},{"key":"nazwa","value":"awil-zas-e01"}]},{"properties":[{"key":"y_wgs84","value":"52.1282239731901"},{"key":"x_wgs84","value":"21.1043693598618"},{"key":"_id","value":"100"},{"key":"nazwa","value":"awil-gro-e01"}]}],"limit":"0","total":"102"};
