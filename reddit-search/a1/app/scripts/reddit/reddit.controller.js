(function () {
	'use strict';

	angular.module('reddit')
		.controller('RedditController', RedditController);

	function RedditController ($scope, redditService) {
		$scope.posts = [];
		redditService.query(updateList);

		function updateList(response) {
			angular.forEach(response.data.children, function(post){
				$scope.posts.push(post.data);
			});
		}
	}
})();