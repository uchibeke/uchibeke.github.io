var myApp = angular.module('myApp', ['ngRoute', 'mainController']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'views/home.html',
		controller : 'BvbController'
	}).when('/about', {
		templateUrl : 'views/about.html',
		controller : 'BvbController'
	}).when('/animation', {
		templateUrl : 'views/photography.html',
		controller : 'BvbController'
	}).when('/videography', {
		templateUrl : 'views/videography.html',
		controller : 'BvbController'
	}).otherwise({
		redirectTo : '/home'
	});
}]);
