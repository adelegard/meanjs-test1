'use strict';

angular.module('wikiline').controller('WikilineController', ['$scope', '$sce', 'Wikiline',
	function($scope, $sce, Wikiline) {
		$scope.started = false;
		$scope.wikilines = [];
		var addWikiline = function(name, srcName, imageUrl, wikihtml) {
			var wikiline = _.find($scope.wikilines, function(wikiline) {
				return wikiline.name === name;
			});
			if (!wikiline) {
				wikiline = {
					name: name
				};
				$scope.wikilines.push(wikiline);
			}
			var linkedToNames = null;
			if (wikihtml) {
				var linkedTo = _.filter($scope.wikilines, function(wikiline) {
					return wikihtml.search('/wiki/' + wikiline.name) >= 0;
				});
				linkedToNames = _.map(linkedTo, function(link) {
					return link.name;
				});
			}
			if (!wikiline.imageUrl && imageUrl) {
				wikiline.imageUrl = imageUrl;
			}
			if (!wikiline.srcName && srcName) {
				wikiline.srcName = srcName;
			}
			if (!wikiline.links && linkedToNames && linkedToNames.length > 0) {
				wikiline.links = linkedToNames;
			}
			console.log($scope.wikilines);
		};
		var doSearchWiki = function(query) {
			Wikiline.searchArticle(query).success(function (response) {
			    //Dig into the responde to get the relevant data
				if (response && response.length > 0) {
					// for some reason the response is including
					// a starting double quote and an ending \n' ---   '<p></p>\n'
					response = response.replace(/\\n/g, '').replace(/\\"/g, '\"');
					response = response.substring(1, response.length-1);
			        $scope.wikihtml = $sce.trustAsHtml(response);
					addWikiline($scope.query, $scope.searchedQuery, null, response);
					$scope.searchedQuery = $scope.query;
				}
			});
			Wikiline.searchArticleImage(query).success(function(response) {
				var obj = JSON.parse(JSON.parse(response));
				var firstPage = _.first(_.values(obj.query.pages));
				if (!(firstPage && firstPage.thumbnail && firstPage.thumbnail.source)) {
					$scope.imageSrc = null;
					return;
				}
				$scope.imageSrc = firstPage.thumbnail.source;
				addWikiline(query, null, $scope.imageSrc);
			});
		};
		$scope.searchWiki = function() {
			$scope.started = true;
			doSearchWiki($scope.query);
		};
		$scope.doClick = function(e) {
			e.preventDefault();
			var href = e.target.getAttribute('href');
			if (!href) return;
			$scope.query = href.replace('http://en.wikipedia.org/wiki/', '');
			doSearchWiki($scope.query);
		};
		$scope.wikihtml = '';
	}
]);