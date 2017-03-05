describe('meteoController', function() {
    beforeEach(module('meteoApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.map', function() {
        it('set Map config', function() {
            var $scope = {};
            var controller = $controller('meteoController', { $scope: $scope });
            $scope.map = meteoService.getMapConfig();
            $scope.map.window = twitterService.getWindow();
            meteoService.startCitiesWeather($scope, $interval);
            expect($scope.map).toEqual('');
        });
    });
});