var API_KEY = 'ed23f1a18194a7957a0a705f51fbd047';
var forcast = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=53.474880&lon=-7.937825&appid=' + API_KEY + '&units=metric&cnt=3';
var hourly = 'http://api.openweathermap.org/data/2.5/forecast?lat=53.474880&lon=-7.937825&appid=ed23f1a18194a7957a0a705f51fbd047';

angular.module('starter.services', [])

.factory('Weather', function ($http, $rootScope, $stateParams) {

    return {
        all: function () {
            return $http.get(forcast, { params: { user_id: $rootScope.session } })
        }

    };
})

.factory('Beaufort', function ($http, $rootScope, $stateParams) {

    return {
        all: function () {
            return $http.get('js/data.json', { params: { user_id: $rootScope.session } })
        }

    };
})

.factory('Hourly', function ($http, $rootScope, $stateParams) {

    return {
        all: function () {
            return $http.get(hourly, { params: { user_id: $rootScope.session } })
        }

    };
})



;


