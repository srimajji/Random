'use strict';

/**
 * @ngdoc overview
 * @name a1App
 * @description
 * # a1App
 *
 * Main module of the application.
 */
angular
  .module('a1App', [
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
