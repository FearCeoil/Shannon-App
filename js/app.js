// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

      //If no internet connection, diplay alert and close app.
    if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {

            alert("No Network Connection");
            navigator.app.exitApp();
        }
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

 .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
       templateUrl: 'templates/home.html',
       controller: ''
       }
    }
 })

      .state('app.weather', {
          url: '/weather',
          views: {
            'menuContent': {
              templateUrl: 'templates/weather.html'
            }
          }
      })

     .state('app.loughRee', {
         url: '/loughRee',
          views: {
            'menuContent': {
                templateUrl: 'templates/loughRee.html',
                controller: 'LoughReeCtrl'
            }
          }
     })

    .state('app.loughAllen', {
        url: '/loughAllen',
        views: {
            'menuContent': {
                templateUrl: 'templates/loughAllen.html',
                controller: 'LoughAllenCtrl'
            }
        }
    })

    .state('app.loughDerg', {
        url: '/loughDerg',
        views: {
            'menuContent': {
                templateUrl: 'templates/loughDerg.html',
                controller: 'LoughDergCtrl'
            }
        }
    })


    .state('app.journeyTime', {
      url: '/journeyTime',
      views: {
        'menuContent': {
          templateUrl: 'templates/journeyTime.html',
          controller: 'journeyCtrl'
        }
      }
    })

 .state('app.checkList', {
     url: '/checkList',
     views: {
         'menuContent': {
             templateUrl: 'templates/checkList.html',
             controller: ''
         }
     }
 })

      .state('app.Info', {
          url: '/Info',
          views: {
              'menuContent': {
                  templateUrl: 'templates/Info.html',
                  controller: ''
              }
          }
      })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
