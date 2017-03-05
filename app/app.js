/**
 * Definition of the main app module and its dependencies
 */
$app = angular.module('meteoApp', ['ngRoute', 'nemLogging', 'ngtweet', 'geolocation','uiGmapgoogle-maps']).config(config);

$app.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
  GoogleMapApi.configure({
    key: 'AIzaSyD24iOs_0kKx-no8hP_r6fiaMjdPtKDNWA',
    v: '3.20',
    libraries: 'weather,geometry,visualization'
  });
}]);

config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider', 'uiGmapGoogleMapApiProvider'];

/**
 * App routing
 *
 * You can leave it here in the config section or take it out
 * into separate file
 *
 */
function config($routeProvider, $locationProvider, $httpProvider, $compileProvider, uiGmapGoogleMapApi) {

  $locationProvider.html5Mode(false);

  $httpProvider.interceptors.push('authInterceptor');

  $routeProvider
      .when('/', {
        templateUrl: 'components/pages/home.html',
        controller: 'meteoController',
        controllerAs: 'main'
      })
      .when('/more', {
        templateUrl: 'components/pages/more.html',
        controller: 'moreController',
        controllerAs: 'main'
      })
      .otherwise({
        templateUrl: 'components/pages/404.html',
      });
}


/**
 * You can intercept any request or response inside authInterceptor
 * or handle what should happend on 40x, 50x errors
 *
 */
angular.module('meteoApp').factory('authInterceptor', authInterceptor);
authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

function authInterceptor($rootScope, $q, LocalStorage, $location) {

  return {
    request: function(config) {
      config.headers = config.headers || {};
      return config;
    },
    responseError: function(response) {
      if (response.status === 404) {
        $location.path('/');
        return $q.reject(response);
      } else {
        return $q.reject(response);
      }
    }
  };
}
