'use strict';
(function() {
    $app.controller('cityLocatorController', ['$scope', '$interval', 'meteoService', function($scope, $log, meteoService) {
        meteoService.getCurrentPositionInfo().then(function(position) {
            $scope.position = position;
        });
    }]);
})();
