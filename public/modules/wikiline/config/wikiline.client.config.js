'use strict';

// Wikiline module config
angular.module('wikiline').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Wikilines', 'wikiline');
		Menus.addMenuItem('topbar', 'New Wikiline', 'wikiline/create');
	}
]);