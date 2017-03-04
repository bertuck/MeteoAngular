$app.factory('meteoService', ['$http', '$q', '$log', function($http, $q, $log) {

    var country = "FR";

    var markerIndex = 0;
    var cities = [
        "paris", "montpellier", "bordeaux", "marseille", "perpignan", "lyon", "toulouse"
    ];

    function getCityWeather(city) {
        var deferred = $q.defer();
        deferred.resolve($http.get("http://api.openweathermap.org/data/2.5/weather?q="+city+","+country+"&appid=51a602771f7353caa9e33b9811d365ef"));
        return deferred.promise;
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

    function getCityMarkers($scope) {
        var deferred = $q.defer();
        var markers = [];
        var id = 0;
        $scope = this;
        cities.forEach(function (city) {
           $scope.getCityWeather(city).then(function(response) {
               markers.push({
                   id:  id++,
                   coords: {
                       latitude: response.data.coord.lat,
                       longitude: response.data.coord.lon
                   },
                   options: {draggable: false, icon: { url: $scope.getWeatherIcon(response.data.weather[0].icon) }},
                   onClick : function(marker, eventName, model) {
                       console.log(model);
                       model.show = !model.show;
                       $scope.activeModel = model.coords;
                       $scope.activeModel.show = true;
                   }
               });
               if(id == cities.length){
                   deferred.resolve(markers);
               }
               console.log('meteoService : ' + city + " marker is updated.");
           });
        });
        return deferred.promise;
    }

    function getMapConfig() {
        return {
            center: {
                latitude: 47.4596656,
                longitude: 2.4609375
            },
            zoom: 6,
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
    return {
        getCityWeather: getCityWeather,
        getWeatherIcon: getWeatherIcon,
        getMapConfig: getMapConfig,
        getCityMarkers: getCityMarkers
    }
}]);