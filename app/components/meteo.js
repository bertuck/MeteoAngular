(function() {
    'use strict';
    angular.module('meteoApp.meteo', [
        'meteoApp.twitter',
        'meteoApp.constants',
    ])
        .directive('meteoDirective', function() {
            return {
                restrict: 'E',
                controller: 'MeteoWidgetController',
                templateUrl: function(elem, attrs) {
                    return attrs.templateUrl || 'app/html/blocks/meteo-widget.html'
                }
            };
        })
        .service('meteoService', [
            '$http',
            '$q',
            "$log",
            '$interval',
            'ApiConstants',
            'MeteoConstants',
            function($http, $q, $log, $interval, ApiConstants, MeteoConstants) {

                var weather = {
                    icon: '/images/icons/load-min.gif',
                    display: 'block'
                };

                this.getWeather = function() {
                    return weather;
                };

                this.refreshWeather = function(position) {
                    var deferred = $q.defer();
                    this.getCurrentWeatherGeolocation(position).then(function(weatherResponse) {
                        weather = weatherResponse;
                        deferred.resolve(weather);
                    }).catch(function(error) {
                        return deferred.reject(error);
                    });
                    return deferred.promise;
                };

                this.startCitiesWeather = function() {
                    var deferred = $q.defer();
                    var interval = $interval(function(){
                        this.getCitiesWeather();
                    }.bind(this), MeteoConstants.refreshTimeout);
                    this.getCitiesWeather().then(function(weather) {
                        deferred.resolve(weather);
                    }).catch(function(error) {
                        return deferred.reject(error);
                    });
                    return deferred.promise;
                };

                this.getCitiesWeather = function() {
                    var deferred = $q.defer();
                    var self = this;
                    var ids = Object.keys(MeteoConstants.cities).map(function(key) {
                        return MeteoConstants.cities[key];
                    }).join(',');
                    var url = "http://api.openweathermap.org/data/2.5/group?id="+ids+"&units=metric&appid="+ApiConstants.openWeatherMapKey;
                    $http.get(url).then(function(weather) {
                        deferred.resolve(self.getMarkersConfig(weather));
                    }).catch(function(error) {
                        return deferred.reject(error);
                    });
                    return deferred.promise;
                };

                this.getMarkersConfig = function(weather) {
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
                };

                this.getWeatherIcon = function(defaultIconFileName) {
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
                };

                this.getCurrentWeatherGeolocation = function(position) {
                    var deferred = $q.defer();
                    var self = this;
                    var url = "http://api.openweathermap.org/data/2.5/weather?lat="+position.latitude+"&lon="+position.longitude+ "&units=metric&appid=" + ApiConstants.openWeatherMapKey;
                    $http.get(url).then(function (response){
                        deferred.resolve({
                            icon : self.getWeatherIcon(response.data.weather[0].icon),
                            name : response.data.name,
                            temp : response.data.main.temp+' °C',
                            show : false
                        });
                    }).catch(function (error){
                        return deferred.reject(error);
                    });
                    return deferred.promise;
                };
            }])


        .controller('MeteoController', [
            '$scope',
            '$log',
            'meteoService',
            'mapService',
            'twitterService',
            function($scope, $log, meteoService, mapService, twitterService) {

                var init = function() {
                    $scope.map = mapService.getMap();
                    var bounds = new google.maps.LatLngBounds();
                    var myLatLng = new google.maps.LatLng($scope.map.bounds.northeast, $scope.map.bounds.southwest)
                    bounds.extend(myLatLng);
                    $scope.map.bounds = bounds;
                    $scope.map.events = {
                        click: function(map, eventName, model) {
                            $scope.map.window.id = $scope.map.window.options.ids[model.name.toLowerCase()];
                            $scope.map.window.model = model;
                            $scope.map.window.show = true;
                            $scope.map.center.latitude = model.latitude;
                            $scope.map.center.longitude = model.longitude;
                        }
                    };
                    $scope.map.window = twitterService.getWindow();
                };

                var run = function() {
                    meteoService.startCitiesWeather().then(function(markers){
                        $scope.map.markers = markers;
                    }).catch(function(error) {
                        $log.debug(error);
                    });
                };

                init();
                run();
            }]);

})();