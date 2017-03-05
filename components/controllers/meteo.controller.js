'use strict';

$app.controller('meteoController', ['$scope', '$log', '$interval', 'meteoService', 'twitterService', 'uiGmapGoogleMapApi', function($scope, $log, $interval, meteoService, twitterService, GoogleMapApi) {

    $scope.map = meteoService.getMapConfig();

    $scope.map.window = twitterService.getWindow();
    meteoService.startCitiesWeather($scope, $interval);
}]);
