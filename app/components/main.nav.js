(function() {
    'use strict';
    angular.module('meteoApp.mainNav', [])
        .directive('mainNav', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/html/blocks/main-nav.html',
                controller: 'MainNavController'
            }
        })
        .controller('MainNavController', ['$scope', function($scope) {
            $scope.showWidget = true;
            $scope.menuClass = 'collapse navbar-collapse';
            $scope.openMenu = function () {
                $scope.menuClass = ($scope.menuClass == 'collapse navbar-collapse' ? '' : 'collapse navbar-collapse');
            };
            $scope.openWeatherWidget = function () {
                $scope.showWidget = !$scope.showWidget;
                $scope.menuClass = ($scope.menuClass == 'collapse navbar-collapse' ? '' : 'collapse navbar-collapse');
            };
        }])
})();