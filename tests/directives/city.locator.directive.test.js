describe('Unit testing city locator', function() {
    var $compile,
        $rootScope;

    beforeEach(module('meteoApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function() {
        var element = $compile("<city-locator></city-locator>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("");
    });
});