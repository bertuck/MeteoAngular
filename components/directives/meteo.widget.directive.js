
$app.directive('meteoWidget', ['meteoService', function(meteoService) {
    return {
        restrict: 'E',
        controller: function($scope) {
            $scope.parameter = {
                icon: 'images/icons/load-min.gif'
            };
            $scope.date = new Date();
            meteoService.getCurrentWeatherGeolocation().then(function (currentWeather) {
                $scope.parameter = currentWeather;
            });
        },
        templateUrl: function(elem, attrs) {
            return attrs.templateUrl || 'components/blocks/meteo-widget.html'
        }
    };
}]);