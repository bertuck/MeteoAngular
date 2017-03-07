'use strict';
(function() {
    /**
     * Responsive navigation
     *
     * Usage:
     * <meteo-widget></meteo-widget>
     *
     * Example in meteo-widget.html file
     *
     */

    $app.directive('meteoWidget', ['meteoService', function(meteoService) {
        return {
            restrict: 'E',
            controller: 'meteoWidgetController',
            templateUrl: function(elem, attrs) {
                return attrs.templateUrl || 'components/blocks/meteo-widget.html'
            }
        };
    }]);
})();