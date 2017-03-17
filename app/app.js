(function() {
    /**
     * Definition of the main app module and its dependencies
     */
    angular.module('meteoApp', [
        'ngRoute',
        'nemLogging',
        'ngtweet',
        'uiGmapgoogle-maps',
        'meteoApp.constants',
        'meteoApp.more',
        'meteoApp.responsiveNav',
        'meteoApp.query',
        'meteoApp.twitter',
        'meteoApp.geolocation',
        'meteoApp.map',
        'meteoApp.meteo',
        'meteoApp.mainNav',
        'meteoApp.more',
        'meteoApp.responsiveNav',
        'meteoApp.cityLocator',
        'meteoApp.meteoWidget'
    ])

        .config([
            '$routeProvider',
            '$locationProvider',
            'uiGmapGoogleMapApiProvider',

            function ($routeProvider, $locationProvider, uiGmapGoogleMapApi) {
                $routeProvider
                    .when('/', {
                        templateUrl: '/app/html/pages/home.html',
                        controller: 'MeteoController',
                        controllerAs: 'main'
                    })
                    .when('/more', {
                        templateUrl: '/app/html/pages/more.html',
                        controller: 'MoreController',
                        controllerAs: 'main'
                    })
                    .otherwise({
                        templateUrl: '/app/html/pages/404.html',
                    });

                $locationProvider.html5Mode(true).hashPrefix('');
                uiGmapGoogleMapApi.configure({
                    libraries: 'weather,geometry,visualization'
                });
            }])
})();