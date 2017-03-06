'use strict';

$app.controller('cityLocatorController', ['$scope', '$interval', 'meteoService', function($scope, $log, meteoService) {
    meteoService.setCurrentPositionInfo($scope).then(function(position) {
        $scope.position = position;
    });
}]);