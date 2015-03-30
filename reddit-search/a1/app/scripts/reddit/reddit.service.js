(function() {
	'use strict';

	angular.module('reddit')
		.factory('redditService', RedditService);

	function RedditService($resource) {
		var listOptions = {
			method: 'GET',
			isArray: false
		};
		return $resource('http://www.reddit.com/r/nba.json', {}, {'query': listOptions});
	}
})();