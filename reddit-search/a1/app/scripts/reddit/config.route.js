(function() {
	'use strict';

	angular.module('reddit')
		.config(config);

		function config($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'views/main.html',
					controller: 'RedditController'
				})
				.when('/about', {
					templateUrl: 'views/about.html',
					controller: 'AboutCtrl'
				})
				.otherwise({
					redirectTo: '/'
				});
		}
})();