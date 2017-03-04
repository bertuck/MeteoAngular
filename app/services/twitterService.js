$app.factory('twitterService', ['$http', '$q', '$log', function($http, $q, $log) {

    function getWindowInfo() {
        return {
            boxClass: "infobox",
            boxStyle: {
                backgroundColor: "blue",
                border: "1px solid red",
                borderRadius: "5px",
                width: "100px",
                height: "100px"
            },
            content: "Window options box work standalone ------------BUT DOES NOT work on marker click",
            disableAutoPan: true,
            maxWidth: 0,
            show: false,
            zIndex: null,
            closeBoxMargin: "10px",
            closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",

            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false
        };
    }
    return {
        getWindowInfo: getWindowInfo,
    }
}]);