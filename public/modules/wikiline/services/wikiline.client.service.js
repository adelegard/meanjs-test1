'use strict';


angular.module('wikiline').factory('Wikiline', ['$http',
	function($http) {
		// Public API
		return {
			searchArticle: function(query) {
				return $http({method: 'GET', url: '/wikiline/query/' + query});
			},
			searchArticleImage: function(query) {
				return $http({method: 'GET', url: '/wikiline/queryImage/' + query});
			}
		};
	}
]);