'use strict';

var wikiline = require('../../app/controllers/wikiline');

module.exports = function(app) {
	app.route('/wikiline/query/:query')
		.get(wikiline.searchArticle);
	app.route('/wikiline/queryImage/:query')
		.get(wikiline.searchArticleImage);
};