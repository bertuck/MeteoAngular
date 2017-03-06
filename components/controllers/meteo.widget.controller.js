'use strict';

$app.controller('meteoWidgetController', ['$scope', '$log', '$interval', 'meteoService', function($scope, $log, $interval, meteoService) {
    $scope.weather = {
        icon: 'images/icons/load-min.gif',
        display: 'block',
    };
    $scope.date = new Date();
    meteoService.getCurrentWeatherGeolocation().then(function(currentWeather) {
        $scope.weather = currentWeather;
    });
    $scope.openWeatherWidget = function() {
        $scope.weather.display  = ($scope.weather.display == 'none' ? 'block' : 'none');
    };
    meteoService.setCurrentPostionInfo($scope);
}]);


