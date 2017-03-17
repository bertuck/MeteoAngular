(function() {
    'use strict';
    angular.module('meteoApp.geolocation', [])

        .service('geolocationService', [
            '$http',
            '$q', function($http, $q) {

            this.getGeolocation = function() {
                var deferred = $q.defer();
                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };
                navigator.geolocation.getCurrentPosition(function(position) {
                        deferred.resolve(position.coords);
                    },
                    function(err) {
                        var url = 'http://ipinfo.io/geo';
                        $http.get(url).then(function(response) {
                            var loc = response.data.loc.split(',');
                            deferred.resolve({
                                latitude: loc[0],
                                longitude: loc[1]
                            });
                        }).catch(function(error){
                            return deferred.reject(error);
                        });
                    },
                    options
                );
                return deferred.promise;
            };

            this.getCurrentPositionInfo = function(position) {
                var deferred = $q.defer();
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(position.latitude, position.longitude);
                geocoder.geocode({latLng: latlng}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK && results[0] && results[1]) {
                        position.street = results[0].formatted_address;
                        results.forEach(function (address_component, i) {
                            if (address_component.types[0] == "locality") {
                                position.region = address_component.address_components[2].long_name;
                                position.country = address_component.address_components[3].long_name;
                                position.city = address_component.address_components[0].long_name;
                            }
                        });
                        deferred.resolve(position);
                    } else {
                        deferred.reject('Error');
                    }
                });
                return deferred.promise;
            };
        }])

})();
