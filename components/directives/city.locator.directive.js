'use strict';
(function() {
    /**
     * Responsive navigation
     *
     * Usage:
     * <city-localtor></city-localtor>
     *
     * Example in footer.html file
     *
     */

    $app.directive('cityLocator', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/blocks/city-locator.html',
            controller: 'cityLocatorController'
        };
    });
})();