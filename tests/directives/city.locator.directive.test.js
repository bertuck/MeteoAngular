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
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
    });
});