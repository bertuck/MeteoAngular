describe('Unit testing meteo widget', function() {
    var $compile,
        $rootScope;
    beforeEach(module('myApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function() {
        var element = $compile("<meteo-widget></meteo-widget>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("");
    });
});