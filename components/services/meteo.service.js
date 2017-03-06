'use strict';

$app.factory('meteoService', ['$http', '$q', '$log', 'geolocation', function($http, $q, $log, geolocation) {

    var appId = "&appid=51a602771f7353caa9e33b9811d365ef";

    var cities = {
        paris: 2988507,
        bordeaux: 3031582,
        marseille: 2995469,
        lyon: 2996944,
        toulouse: 2972315,
        strasbourg: 2973783
    };

    var refresh_timeout = 1000000;

    function startCitiesWeather($scope, $interval) {
        var interval = $interval(function(){
            this.getCitiesWeather($scope);
        }.bind(this), refresh_timeout);

        $scope.$on('$destroy', function () {
            $interval.cancel(interval)
        });
        this.getCitiesWeather($scope);
    }

    function getCitiesWeather($scope) {
        var self = this;
        var ids = Object.keys(cities).map(function(key) {
            return cities[key];
        }).join(',');
        var url = "http://api.openweathermap.org/data/2.5/group?id="+ids+"&units=metric"+appId
        $http.get(url).then(function(weather) {
            self.setCitiesWeatherConfig($scope, weather);
        });
    }

    function setCitiesWeatherConfig($scope, weather) {
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
                events : {
                    click: function(marker, eventName, model) {
                        $scope.map.window.id = $scope.map.window.options.ids[model.name.toLowerCase()];
                        $scope.map.window.model = model;
                        $scope.map.window.marker = marker;
                        $scope.map.window.show = true;
                        $scope.map.center = model;
                    }
                }
            });
        });
        $scope.map.markers = markers;
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

    function getMapConfig(maps) {
        return {
            center: {
                latitude: 47.4596656,
                longitude: 2.4609375
            },
            zoom: 6,
            window: {
                marker: {},
                show: false,
                closeClick: function() {
                    this.show = false;
                },
                options: {}
            },
            bounds : {
                northeast: {
                    latitude: '52.39632350723714',
                    longitude: '11.826165039062516'
                },
                southwest: {
                    latitude: '40.94189980474191',
                    longitude: '-6.029371093750001'
                }
            },
            events: {
                click: function (map, eventName, originalEventArgs) {
                     /*var MapBounds = new google.maps.LatLngBounds(
                     new google.maps.LatLng(52.39632350723714, 11.826165039062516),
                     new google.maps.LatLng(40.94189980474191, -6.029371093750001));
                     if (!MapBounds.contains(map.getCenter())) {
                     map.setCenter(new google.maps.LatLng(47.4596656, 2.4609375));
                    }*/
                }
            },
            options: {
                zoomControl: false,
                streetViewControl: false,
                scrollwheel: false,
                draggable: false,
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

    function getCurrentWeatherGeolocation($scope) {
        var self = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            var url = "http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+ "&units=metric" + appId;
            $http.get(url).success(function (response){
                $scope.weather.icon = self.getWeatherIcon(response.weather[0].icon);
                $scope.weather.name= response.name;
                $scope.weather.temp =  response.main.temp+' °C';
                $scope.weather.show = false;
            }).error(function (error){
                console.log('Error http : getCurrentWeatherGeolocation')
            });
        });
    }

    function setCurrentPositionInfo() {
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
                }
                deferred.resolve(position);
            });
        });
        return deferred.promise;
    }

    return {
        startCitiesWeather: startCitiesWeather,
        getCitiesWeather: getCitiesWeather,
        getWeatherIcon: getWeatherIcon,
        getMapConfig: getMapConfig,
        setCitiesWeatherConfig: setCitiesWeatherConfig,
        getCurrentWeatherGeolocation: getCurrentWeatherGeolocation,
        setCurrentPositionInfo: setCurrentPositionInfo
    }
}]);