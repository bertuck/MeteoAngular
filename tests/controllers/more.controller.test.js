describe('moreController', function() {
    beforeEach(module('meteoApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.more', function() {
        it('set the more config', function() {
            var $scope = {};
            var controller = $controller('moreController', { $scope: $scope });
            //$scope.grade();
            //expect($scope.window).toEqual('');
        });
    });
});