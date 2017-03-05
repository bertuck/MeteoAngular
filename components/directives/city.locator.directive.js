'use strict';

/**
 * Responsive navigation
 *
 * Usage:
 * <city-localtor></city-localtor>
 *
 * Example in footer.html file
 *
 */

$app.directive('cityLocator',  ['meteoService', function(meteoService) {
    return {
        restrict: 'E',
        templateUrl: 'components/blocks/city-locator.html',
        controller: function($scope) {
            meteoService.setCurrentPostionInfo($scope);
        }
    };
}]);
