'use strict';

/**
 * Responsive navigation
 *
 * Usage:
 * <meteo-widget></meteo-widget>
 *
 * Example in meteo-widget.html file
 *
 */

$app.directive('meteoWidget', ['meteoService', function(meteoService) {
    return {
        restrict: 'E',
        controller: function($scope) {
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
        },
        templateUrl: function(elem, attrs) {
            return attrs.templateUrl || 'components/blocks/meteo-widget.html'
        }
    };
}]);