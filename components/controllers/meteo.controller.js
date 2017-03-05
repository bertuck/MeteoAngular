

$app.controller('meteoController', ['$scope', '$log', '$interval', 'meteoService', 'twitterService', function($scope, $log, $interval, meteoService, twitterService) {
    $scope.map = meteoService.getMapConfig();

    $scope.map.window = twitterService.getWindowConfig();

    meteoService.startCitiesWeather($scope, $interval);

}]);
