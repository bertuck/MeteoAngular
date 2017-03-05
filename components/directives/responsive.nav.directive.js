'use strict';

/**
 * Responsive navigation
 *
 * Usage:
 * <responsive-nav></responsive-nav>
 *
 * Example in main-nav.html file
 *
 */

$app.directive('responsiveNav', ['responsiveNav', function(responsiveNav) {
  return {
    restrict: 'E',
    templateUrl: 'components/blocks/responsive-nav.html',
    link: function(scope, elem, attrs, ctrl) {
      elem.on('click', function(e) {
        $('.responsive-wrapper').slideToggle( 150, 'swing');
        e.preventDefault();
      });
    }
  };
}]);
