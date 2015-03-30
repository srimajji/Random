'use strict';

/**
 * @ngdoc function
 * @name a1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the a1App
 */
angular.module('a1App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
