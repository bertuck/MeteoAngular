'use strict';

$app.factory('twitterService', ['$http', '$q', '$log', function($http, $q, $log) {

    var citiesWidget = {
        paris: '838059003909390336',
        bordeaux: '838060842629353473',
        marseille: '838061648191553536',
        lyon: '838062002643812354',
        toulouse: '838062298681991170',
        strasbourg: '838063366937665537'
    };

    function getWindow() {
        return {
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
                ids: citiesWidget,
            }
        }
    }
    return {
        getWindow: getWindow,
    }
}]);