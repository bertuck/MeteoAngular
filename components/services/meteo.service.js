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

    function getCitiesWeather($scope) {
        var self = this;
        var ids = Object.keys(cities).map(function(key) {
            return cities[key];
        }).join(',');
        var url = "http://api.openweathermap.org/data/2.5/group?id="+ids+"&units=metric"+appId
        $http.get(url).then(function(weather) {
            self.setCitiesWeatherConfig($scope, weather);
            $scope.map.markers = markers;
        });
    }

    function setCitiesWeatherConfig($scope, weather) {
        var self = this;
        var id = 0;
        markers = [];
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
                show: false,
                closeClick: function() {
                    this.show = false;
                },
                options: {}
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
                mapTypeId: google.maps.MapTypeId.SATELLITE },
            styles: [
                { featureType: 'all', elementType:'labels', stylers: [ {visibility:'off'} ] },
                { featureType: 'road', stylers: [ {visibility:'off'} ] },
            ]
        };
    }

    function getCurrentWeatherGeolocation() {
        var deferred = $q.defer();
        $self = this;
        geolocation.getLocation().then(function(data){
            var url = "http://api.openweathermap.org/data/2.5/weather?lat="+data.coords.latitude+"&lon="+data.coords.longitude+ "&units=metric" + appId;
            deferred.resolve($http.get(url).then(function(response) {
                return {
                    icon: $self.getWeatherIcon(response.data.weather[0].icon),
                    name: response.data.name,
                    temp: response.data.main.temp+'°',
                    show: false
                };
            }));
        });
        return deferred.promise;
    }

    return {
        getCitiesWeather: getCitiesWeather,
        getWeatherIcon: getWeatherIcon,
        getMapConfig: getMapConfig,
        setCitiesWeatherConfig: setCitiesWeatherConfig,
        getCurrentWeatherGeolocation: getCurrentWeatherGeolocation
    }
}]);