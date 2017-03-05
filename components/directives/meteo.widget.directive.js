
$app.directive('meteoWidget', ['meteoService', function(meteoService) {
    return {
        restrict: 'E',
        controller: function($scope) {
            $scope.parameter = {
                icon: 'images/icons/load-min.gif',
            };
            $scope.date = new Date();
            meteoService.getCurrentWeatherGeolocation().then(function (currentWeather) {
                $scope.parameter = currentWeather;
            });
        },
        templateUrl: function(elem, attrs) {
            return attrs.templateUrl || 'components/html/meteo-widget.html'
        },
        parameters: function(scope, element, $attr) {
            scope.templateParameter
        },
        link: function (scope, element, attrs) {
            $scope.parameter = {
                options: {
                    icon: 'images/icons/load.gif',
                }
            };
            scope.parameters = attrs.templateParameter;
        }
    };
}]);