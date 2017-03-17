(function() {
  'use strict';

  angular.module('meteoApp.responsiveNav', [])

    /**
     * Responsive navigation
     *
     * Usage:
     * <responsive-nav></responsive-nav>
     *
     * Example in main-nav.html file
     *
     */
      .directive('responsiveNav', ['responsiveNav', function(responsiveNav) {
        return {
          restrict: 'E',
          templateUrl: 'app/html/blocks/responsive-nav.html',
          link: function(scope, elem, attrs, ctrl) {
            elem.on('click', function(e) {
              $('.responsive-wrapper').slideToggle( 150, 'swing');
              e.preventDefault();
            });
          }
        };
      }])

})();