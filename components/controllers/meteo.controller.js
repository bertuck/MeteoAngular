'use strict';

$app.controller('meteoController', ['$scope', '$log', '$interval', 'meteoService', 'twitterService', function($scope, $log, $interval, meteoService, twitterService) {
    $scope.map = meteoService.getMapConfig();
    $scope.map.window = twitterService.getWindow();
    meteoService.startCitiesWeather($scope, $interval);
}]);
