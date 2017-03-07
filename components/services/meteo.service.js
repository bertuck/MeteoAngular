'use strict';
(function() {
    $app.factory('meteoService', [
        '$http',
        '$q',
        '$log',
        '$interval',

        function($http, $q, $log, $interval) {

            var appId = "51a602771f7353caa9e33b9811d365ef";

            var cities = {
                paris: 2988507,
                bordeaux: 3031582,
                marseille: 2995469,
                lyon: 2996944,
                toulouse: 2972315,
                strasbourg: 2973783
            };

            var refresh_timeout = 1000000;

            function startCitiesWeather($scope) {
                var deferred = $q.defer();
                var interval = $interval(function(){
                    this.getCitiesWeather();
                }.bind(this), refresh_timeout);

                $scope.$on('$destroy', function () {
                    $interval.cancel(interval)
                });
                deferred.resolve(this.getCitiesWeather());
                return deferred.promise;
            }

            function getCitiesWeather() {
                var deferred = $q.defer();
                var self = this;
                var ids = Object.keys(cities).map(function(key) {
                    return cities[key];
                }).join(',');
                var url = "http://api.openweathermap.org/data/2.5/group?id="+ids+"&units=metric&appid="+appId
                deferred.resolve($http.get(url).then(function(weather) {
                    return self.getMarkersConfig(weather);
                }));
                return deferred.promise;
            }

            function getMarkersConfig(weather) {
                var self = this;
                var id = 0;
                var markers = [];
                weather.data.list.forEach(function (city) {
                    markers.push({
                        id:  id++,
                        name: city.name,
                        temp: city.main.temp,
                        latitude: city.coord.lat,
                        longitude: city.coord.lon,
                        options: {draggable: false, icon: { url: self.getWeatherIcon(city.weather[0].icon) }},

                    });
                });
                return markers;
            }

            function getWeatherIcon(defaultIconFileName) {
                var iconName;
                var timeOfDay;
                timeOfDay = 'night';
                if(defaultIconFileName.indexOf('d') != -1) {
                    timeOfDay = 'day';
                }
                if(defaultIconFileName == '01d' || defaultIconFileName == '01n') {
                    iconName = 'clear';
                }
                if(defaultIconFileName == '02d' || defaultIconFileName == '02n' || defaultIconFileName == '03d' || defaultIconFileName == '03n' || defaultIconFileName == '04d' || defaultIconFileName == '04n') {
                    iconName = 'clouds';
                }
                if(defaultIconFileName == '09d' || defaultIconFileName == '09n' || defaultIconFileName == '10d' || defaultIconFileName == '10n') {
                    iconName = 'rain';
                }
                if(defaultIconFileName == '11d' || defaultIconFileName == '11n') {
                    iconName = 'storm';
                }
                if(defaultIconFileName == '13d' || defaultIconFileName == '13n') {
                    iconName = 'snow';
                }
                if(defaultIconFileName == '50d' || defaultIconFileName == '50n') {
                    iconName = 'mist';
                }
                return 'images/icons/weather/'+timeOfDay+'/'+iconName+'.png';
            }

            function getMapConfig() {
                return {
                    center: {
                        latitude: 47.4596656,
                        longitude: 2.4609375
                    },
                    zoom: 6,
                    window: {
                        marker: {},
                        show: true,
                        closeClick: function() {
                            this.show = false;
                        },
                        options: {}
                    },
                    globalEvents: {
                        dblclick: function (map, eventName, originalEventArgs) {
                            var MapBounds = new google.maps.LatLngBounds(
                                new google.maps.LatLng(52.39632350723714, 11.826165039062516),
                                new google.maps.LatLng(40.94189980474191, -6.029371093750001));
                            if (!MapBounds.contains(map.getCenter())) {
                                map.setCenter(new google.maps.LatLng(47.4596656, 2.4609375));
                            }
                        },

                        bounds_changed : function (map, eventName, originalEventArgs) {
                            //console.log(map.getBounds());
                        },
                    },
                    bounds : {
                        northeast: {
                            latitude: -17.75390625,
                            longitude: 22.67578125
                        }
                        ,
                        southwest: {
                            latitude: 52.40409460684838,
                            longitude: 42.00236626553759
                        }
                    },
                    options: {
                        zoomControl: false,
                        streetViewControl: false,
                        scrollwheel: false,
                        drafalsee: false,
                        mapTypeControl: false,
                        navigationControl: false,
                        scaleControl: false,
                        disableDoubleClickZoom: true,
                        mapTypeId: google.maps.MapTypeId.HYBRID
                    },
                    styles: [
                        {
                            featureType: 'all',
                            elementType:'labels',
                            stylers: [ {visibility:'off'} ]
                        },
                        {
                            featureType: 'road',
                            stylers: [ {visibility:'off'} ]
                        },
                    ]
                };
            }

            function getCurrentWeatherGeolocation(position) {
                var deferred = $q.defer();
                var self = this;
                var url = "http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+ "&units=metric&appid=" + appId;
                $http.get(url).success(function (response){
                    deferred.resolve({
                        icon : self.getWeatherIcon(response.weather[0].icon),
                        name :response.name,
                        temp :  response.main.temp+' °C',
                        show : false
                    });
                }).error(function (error){
                    return deferred.reject(error);
                });
                return deferred.promise;
            }

            function getCurrentPositionInfo() {
                var deferred = $q.defer();
                navigator.geolocation.getCurrentPosition(function(position) {
                    var geocoder = new google.maps.Geocoder();
                    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
                        }
                        deferred.reject('Error');
                    });
                });
                return deferred.promise;
            }

            return {
                startCitiesWeather: startCitiesWeather,
                getCitiesWeather: getCitiesWeather,
                getWeatherIcon: getWeatherIcon,
                getMapConfig: getMapConfig,
                getMarkersConfig: getMarkersConfig,
                getCurrentWeatherGeolocation: getCurrentWeatherGeolocation,
                getCurrentPositionInfo: getCurrentPositionInfo
            }
        }]);
})();