(function() {
    'use strict';
    angular.module('meteoApp.meteoWidget', [
        'meteoApp.meteo',
        'meteoApp.geolocation'
    ])

        .directive('meteoWidget', function() {
            return {
                restrict: 'E',
                controller: 'MeteoWidgetController',
                bindToController : {
                    display : '='
                },
                templateUrl: function(elem, attrs) {
                    return attrs.templateUrl || 'app/html/blocks/meteo-widget.html'
                }
            };
        })

        .controller('MeteoWidgetController', ['$scope', '$log', 'meteoService', 'geolocationService', function($scope, $log, meteoService, geolocationService) {
            var init = function() {
                $scope.weather = meteoService.getWeather();
                $scope.date = new Date();
                geolocationService.getGeolocation().then(function(position) {
                    meteoService.refreshWeather(position).then(function(weather) {
                        $scope.weather = weather;
                    }).catch(function(error) {
                        $log.debug(error);
                    });
                    $scope.weather = meteoService.getWeather();
                    geolocationService.getCurrentPositionInfo(position).then(function(positionInfo) {
                        $scope.position = positionInfo;
                    }).catch(function(error) {
                        $log.debug(error);
                    });
                });
            };
            init();
        }])

})();