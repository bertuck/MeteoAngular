$app.controller('contactController', ['$scope', '$log', '$interval', 'meteoService', 'twitterService', function($scope, $log, $interval, meteoService, twitterService) {
    meteoService.getCurrentWeatherGeolocation().then(function(currentWeather) {
        $scope.nw = {
            options : currentWeather
        };
    });
}]);
