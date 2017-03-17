(function() {
  'use strict';

  angular.module('meteoApp.query', [])

      .service('QueryService', ['$http', '$log', '$q', function($http, $log, $q) {

        this.query = function(method, url, params, data) {

          var deferred = $q.defer();

          $http({
            method: method,
            //url: CONSTANTS.API_URL + url,
            params: params,
            data: data
          }).then(function(data) {
            if (!data.config) {
              $log.debug('Server error occured.');
            }
            deferred.resolve(data);
          }, function(error) {
            deferred.reject(error);
          });

          return deferred.promise;
        }
      }])
})();