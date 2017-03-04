

$app.controller('meteoController', ['$scope', '$log', '$interval', 'meteoService', 'twitterService', function($scope, $log, $interval, meteoService, twitterService) {

    var self = this;

    $scope.map = meteoService.getMapConfig();

    $scope.windowOption = twitterService.getWindowInfo();

    this.updateMarkers = function () {
        meteoService.getCityMarkers($scope).then(function(markers) {
            $scope.markers = markers;
        });
    };

    var theInterval = $interval(function(){
        this.updateMarkers();
    }.bind(this), 1000000);

    $scope.$on('$destroy', function () {
        $interval.cancel(theInterval)
    });
    $scope.onClick = function (data) {
        $scope.windowOptions.show = !$scope.windowOptions.show;
        console.log('$scope.windowOptions.show: ', $scope.windowOptions.show);
        console.log('This is a ' + data);
    };
    $scope.closeClick = function () {
        $scope.windowOptions.show = false;
    };

    this.updateMarkers();
}]);
