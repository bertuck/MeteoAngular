'use strict';
(function() {
    $app.controller('meteoController', ['$scope', '$log', 'meteoService', 'twitterService', 'uiGmapGoogleMapApi', function($scope, $log, meteoService, twitterService, GoogleMapApi) {
        var init = function() {
            $scope.map = meteoService.getMapConfig();
            var bounds = new google.maps.LatLngBounds();
            var myLatLng = new google.maps.LatLng($scope.map.bounds.northeast, $scope.map.bounds.southwest)
            bounds.extend(myLatLng);
            $scope.map.bounds = bounds;
            $scope.map.events = {
                click: function(map, eventName, model) {
                    $scope.map.window.id = $scope.map.window.options.ids[model.name.toLowerCase()];
                    $scope.map.window.model = model;
                    $scope.map.window.show = true;
                    $scope.map.center.latitude = model.latitude;
                    $scope.map.center.longitude = model.longitude;

                }
            };
            $scope.map.window = twitterService.getWindow();
        };
        var run = function($scope) {
            meteoService.startCitiesWeather($scope).then(function(markers){
                $scope.map.markers = markers;
            });
        };
        init($scope);
        run($scope);
    }]);
})();