'use strict';

angular.module('wikiline').controller('WikilineController', ['$scope', '$sce', 'Wikiline',
	function($scope, $sce, Wikiline) {
		$scope.started = false;
		$scope.wikiline = [];
		var doSearchWiki = function(query) {
			Wikiline.searchArticle(query).success(function (response) {
			    //Dig into the responde to get the relevant data
				if (response && response.length > 0) {
					// for some reason the response is including
					// a starting double quote and an ending \n" ---   "<p></p>\n"
					response = response.replace(/\\n/g, "").replace(/\\"/g, "\"");
			        $scope.wikihtml = $sce.trustAsHtml(response.substring(1, response.length-1));
					$scope.searchedQuery = $scope.query;
					$scope.wikiline.push($scope.query);
					console.log($scope.wikiline);
				}
			});
			Wikiline.searchArticleImage(query).success(function(response) {
				var obj = JSON.parse(JSON.parse(response));
				var firstPage = _.first(_.values(obj.query.pages));
				$scope.imageSrc = firstPage && firstPage.thumbnail && firstPage.thumbnail.source ? firstPage.thumbnail.source: null;
			});
		};
		$scope.searchWiki = function() {
			$scope.started = true;
			doSearchWiki($scope.query);
		};
		$scope.doClick = function(e) {
			e.preventDefault();
			var href = e.target.getAttribute("href");
			if (!href) return;
			$scope.query = href.replace("http://en.wikipedia.org/wiki/", "");
			doSearchWiki($scope.query);
		};
		$scope.wikihtml = '';
	}
]);