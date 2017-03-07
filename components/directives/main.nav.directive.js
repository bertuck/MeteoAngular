'use strict';
(function() {
    /**
     * Responsive navigation
     *
     * Usage:
     * <responsive-nav></responsive-nav>
     *
     * Example in main-nav.html file
     *
     */

    $app.directive('mainNav', function() {
            return {
                restrict: 'E',
                templateUrl: 'components/blocks/main-nav.html',
                controller: function($scope) {
                    $scope.menuClass = 'collapse navbar-collapse';
                    $scope.openMenu = function() {
                        $scope.menuClass = ($scope.menuClass == 'collapse navbar-collapse' ? '' : 'collapse navbar-collapse');

                    };
                }
            }
        }
    );
})();