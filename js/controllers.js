var guestControllers = angular.module('guestControllers', [])

guestControllers.controller('ListController', ['$scope', '$http', '$timeout',
function($scope, $http, $timeout, analytics) {

	$scope.data = $scope.data ? $scope.data : {};
	$scope.actions = $scope.actions ? $scope.actions : {};
	let
	d = $scope.data;
	let
	a = $scope.actions;

	d.portfolioItems = [];

	$http.get("js/projects/projects.json").then(function(response) {
		d.portfolioItems = response.data;
		

		d.dateString = function() {
			var d = new Date();
			return d.getFullYear();
		};

		a.selectProj = function(ind) {
			d.selectedProj = d.portfolioItems[ind];
			d.loadedProj = true;
		};

		a.scrollTo = function(section) {
			$('html, body').animate({
				scrollTop : $("#" + section).offset().top
			}, 500);
		};
		
		$scope.showListIcon = true;

		$scope.go_back = function() {
			window.history.back();
		};
	});
}]);
