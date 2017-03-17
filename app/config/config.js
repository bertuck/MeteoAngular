(function() {
  'use strict';

  angular.module('meteoApp.constants', [])

  .constant('ApiConstants', {
    'googleKey': "AIzaSyD24iOs_0kKx-no8hP_r6fiaMjdPtKDNWA",
    'openWeatherMapKey' : "51a602771f7353caa9e33b9811d365ef"
  })

  .constant('MeteoConstants', {
      'cities' : {
        'paris': 2988507,
        'bordeaux': 3031582,
        'marseille': 2995469,
        'lyon': 2996944,
        'toulouse': 2972315,
        'strasbourg': 2973783
      },
      'refreshTimeout' : 1000000,
      'citiesWidget' : {
        'paris': '838059003909390336',
        'bordeaux': '838060842629353473',
        'marseille': '838061648191553536',
        'lyon': '838062002643812354',
        'toulouse': '838062298681991170',
        'strasbourg': '838063366937665537'
      }
  })

})();
