'use strict';
(function() {
    $app.controller('meteoWidgetController', ['$scope', '$log', '$interval', 'meteoService', function($scope, $log, $interval, meteoService) {
        var init = function($scope) {
            $scope.weather = {
                icon: 'images/icons/load-min.gif',
                display: 'block'
            };
            $scope.date = new Date();
            navigator.geolocation.getCurrentPosition(function(position) {                console.log(position);
                meteoService.getCurrentWeatherGeolocation(position).then(function(weather) {
                    $scope.weather = weather;
                });
            });
            meteoService.getCurrentPositionInfo().then(function(position) {
                $scope.position = position;
            });
        };
        var setEvents = function($scope) {
            $scope.openWeatherWidget = function() {
                $scope.weather.display = ($scope.weather.display == 'none' ? 'block' : 'none');
            };
        };
        init($scope);
        setEvents($scope);
    }]);
})();