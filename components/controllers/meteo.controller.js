

$app.controller('homeController', ['$scope', '$log', '$interval', 'meteoService', 'twitterService', function($scope, $log, $interval, meteoService, twitterService) {

    var self = this;

    $scope.map = meteoService.getMapConfig();

    $scope.map.window = twitterService.getWindowConfig();


    meteoService.getCitiesWeather($scope);

    var theInterval = $interval(function(){
        meteoService.getCitiesWeather($scope);
    }.bind(this), 1000000);

    $scope.$on('$destroy', function () {
        $interval.cancel(theInterval)
    });
    meteoService.getCitiesWeather($scope);

}]);
