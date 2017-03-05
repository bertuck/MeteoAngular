describe('meteoController', function() {
    beforeEach(module('meteoApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.grade', function() {

        it('sets the strength to "strong" if the password length is >8 chars', function() {
            var $scope = {};
            var controller = $controller('meteoController', { $scope: $scope });
            $scope.password = 'longerthaneightchars';

            $scope.map = meteoService.getMapConfig();
            $scope.map.window = twitterService.getWindow();

            meteoService.startCitiesWeather($scope, $interval);
            expect($scope.strength).toEqual('strong');
        });
    });
});