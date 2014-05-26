'use strict';

//Setting up route
angular.module('wikiline').config(['$stateProvider',
	function($stateProvider) {
		// Wikiline state routing
		$stateProvider.
		state('wikiline', {
			url: '/wikiline',
			templateUrl: 'modules/wikiline/views/wikiline.client.view.html'
		});
	}
]);