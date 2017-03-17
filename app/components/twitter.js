(function() {
    'use strict';

    angular.module('meteoApp.twitter', [
        'meteoApp.constants'
    ])
        .service('twitterService', ['MeteoConstants', function(MeteoConstants) {

            var window = {
                id: '',
                marker: 0,
                show: false,
                closeClick: function () {
                    this.show = false;
                },
                options: {
                    closeBoxURL: "images/icons/close-button.png",
                    boxClass: "infobox",
                    boxStyle: {
                        backgroundColor: "white",
                        border: "0px",
                        padding: 0,
                        width: "300px",
                        height: "320px",
                        borderRadius: '8px',
                        backgroundImage: 'url("images/icons/load.gif")',
                        backgroundPosition: 'center',
                        backgroundSize: '300px',
                        backgroundReapeat: 'no-repeat'
                    },
                    buttons: { close: { visible: false }},
                    ids: MeteoConstants.citiesWidget
                }
            };

            this.getWindow = function() {
                return window;
            };
        }])

})();
