

$app.controller('meteoController', ['$scope', '$log', '$interval', 'meteoService', 'twitterService', function($scope, $log, $interval, meteoService, twitterService) {

    var self = this;

    $scope.map = meteoService.getMapConfig();


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
    this.updateMarkers();

    $scope.windowOption = twitterService.getWindowInfo();

    $scope.onClick = function (data) {
        $scope.show = !$scope.show;
        console.log('$scope.windowOptions.show: ', $scope.show);
        console.log('This is a ' + data);
    };

}]);
