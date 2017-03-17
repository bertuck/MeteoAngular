(function() {
    'use strict';
    angular.module('meteoApp.cityLocator', [
        'meteoApp.meteo',
        'meteoApp.twitter',
        'meteoApp.geolocation'
    ])
        .directive('cityLocator', function() {
            return {
                restrict: 'E',
                templateUrl: '/app/html/blocks/city-locator.html',
                controller: 'CityLocatorController'
            };
        })

        .controller('CityLocatorController', ['$scope', '$log', 'geolocationService', function($scope, $log, geolocationService) {
            var init = function() {
                geolocationService.getGeolocation().then(function(position) {
                    geolocationService.getCurrentPositionInfo(position).then(function (positionInfo) {
                        $scope.position = positionInfo;
                    }).catch(function(error) {
                        $log.debug(error);
                    });
                }).catch(function(error) {
                    $log.debug(error);
                });
            };

            init();

        }]);
})();
