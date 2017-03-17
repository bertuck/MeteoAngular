(function() {
    'use strict';
    angular.module('meteoApp.map', [])
        .service('mapService', function() {
            var map = {
                center: {
                    latitude: 47.4596656,
                    longitude: 2.4609375
                },
                zoom: 6,
                window: {
                    marker: {},
                    show: true,
                    closeClick: function () {
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
                },
                bounds: {
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
                        elementType: 'labels',
                        stylers: [{visibility: 'off'}]
                    },
                    {
                        featureType: 'road',
                        stylers: [{visibility: 'off'}]
                    },
                ]
            };

            this.getMap = function() {
                return map;
            }
        })
})();