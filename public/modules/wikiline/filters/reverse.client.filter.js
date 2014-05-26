'use strict';

angular.module('wikiline').filter('reverse', [
	function() {
		return function(items) {
			return items.slice().reverse();
		};
	}
]);