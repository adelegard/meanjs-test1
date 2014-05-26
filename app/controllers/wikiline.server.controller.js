'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	_ = require('lodash'),
	wikipedia = require('wikipedia-js');

exports.searchArticle = function(req, res) {
    wikipedia.searchArticle({query: req.params.query, format: 'html', summaryOnly: true},
	    function(err, htmlWikiText){
      if(err){
        console.log('An error occurred[query=%s, error=%s]', req.params.query, err);
        return;
      }
	  res.jsonp(htmlWikiText);
    });
};


exports.searchArticleImage = function(req, res) {
    wikipedia.searchArticle({query: req.params.query, format: 'json', prop: 'pageimages', pithumbsize: 100},
	    function(err, htmlWikiText){
      if(err){
        console.log('An error occurred[query=%s, error=%s]', req.params.query, err);
        return;
      }
	  res.jsonp(htmlWikiText);
    });
};

/**
 * Create a Wikiline
 */
exports.create = function(req, res) {
	
};

/**
 * Show the current Wikiline
 */
exports.read = function(req, res) {
	
};

/**
 * Update a Wikiline
 */
exports.update = function(req, res) {
	
};

/**
 * Delete an Wikiline
 */
exports.delete = function(req, res) {
	
};

/**
 * List of Wikilines
 */
exports.list = function(req, res) {
	
};
