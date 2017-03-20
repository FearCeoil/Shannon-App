var API_KEY = 'ed23f1a18194a7957a0a705f51fbd047';
var loughReeForcast = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=53.474880&lon=-7.937825&appid=' + API_KEY + '&units=metric&cnt=3';
var hourlyRee = 'http://api.openweathermap.org/data/2.5/forecast?lat=53.474880&lon=-7.937825&appid=ed23f1a18194a7957a0a705f51fbd047';
var loughAllenForcast = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=54.0963853&lon=-8.0902104&appid=' + API_KEY + '&units=metric&cnt=3';
var hourlyAllen = 'http://api.openweathermap.org/data/2.5/forecast?lat=54.0963853&lon=-8.0902104&appid=ed23f1a18194a7957a0a705f51fbd047';
var loughDergForcast = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=52.9316733&lon=-8.3092759&appid=' + API_KEY + '&units=metric&cnt=3';
var hourlyDerg = 'http://api.openweathermap.org/data/2.5/forecast?lat=52.9316733&lon=-8.3092759&appid=ed23f1a18194a7957a0a705f51fbd047';
var blog = 'http://we40team26.webelevate.net/blog/api/node/';

angular.module('starter.services', [])

.factory('loughReeWeather', function ($http, $rootScope) {

    return {
        all: function () {
            return $http.get(loughReeForcast)
        }

    };
})

.factory('loughAllenWeather', function ($http, $rootScope) {

    return {
        all: function () {
            return $http.get(loughAllenForcast)
        }

    };
})

.factory('loughDergWeather', function ($http, $rootScope) {

    return {
        all: function () {
            return $http.get(loughDergForcast)
        }

    };
})

.factory('Beaufort', function ($http, $rootScope) {

    return {
        all: function () {
            return $http.get('js/data.json')
        }

    };
})

.factory('HourlyRee', function ($http, $rootScope) {

    return {
        all: function () {
            return $http.get(hourlyRee)
        }

    };
})

.factory('HourlyAllen', function ($http, $rootScope) {

    return {
        all: function () {
            return $http.get(hourlyAllen)
        }

    };
})

.factory('HourlyDerg', function ($http, $rootScope) {

    return {
        all: function () {
            return $http.get(hourlyDerg)
        }

    };
})

.factory('Blog', function ($http, $rootScope, $stateParams) {

    return {
        all: function () {
            return  $http.get(blog)
        }

    };
})


;


