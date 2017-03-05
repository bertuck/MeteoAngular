/**
 *
 * AngularJS Boilerplate
 * @description           Description
 * @author                Jozef Butko // www.jozefbutko.com/resume
 * @url                   www.jozefbutko.com
 * @version               1.1.7
 * @date                  March 2015
 * @license               MIT
 *
 */


/**
 * Definition of the main app module and its dependencies
 */
$app = angular.module('boilerplate', ['ngRoute', 'uiGmapgoogle-maps', 'nemLogging', 'ngtweet', 'geolocation']).config(config);


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

  // routes
  $routeProvider
      .when('/', {
        templateUrl: 'components/pages/home.html',
        controller: 'meteoController',
        controllerAs: 'main'
      })
      .when('/contact', {
        templateUrl: 'components/pages/contact.html',
        controller: 'contactController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

  $httpProvider.interceptors.push('authInterceptor');

  uiGmapGoogleMapApi.configure({
    key: 'AIzaSyBa3or80gCxG72U84RpCujD59sPOGJpPsw',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
}


/**
 * You can intercept any request or response inside authInterceptor
 * or handle what should happend on 40x, 50x errors
 *
 */
angular.module('boilerplate').factory('authInterceptor', authInterceptor);
authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

function authInterceptor($rootScope, $q, LocalStorage, $location) {

  return {
    // intercept every request
    request: function(config) {
      config.headers = config.headers || {};
      return config;
    },

    // Catch 404 errors
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
