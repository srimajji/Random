(function () {
	'use strict';

	angular.module('reddit')
		.controller('RedditController', RedditController);

	function RedditController ($scope) {
		$scope.items = ['Russell', 'Curry', 'Cp3'];
	}
})();