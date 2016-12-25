var myApp = angular.module('myApp', ['ngRoute', 'mainController']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/eventstone', {
		templateUrl : 'views/projEventstone.html',
		controller : 'BvbController'
	}).when('/home', {
		templateUrl : 'views/home.html',
		controller : 'BvbController'
	}).when('/tranxi', {
		templateUrl : 'views/projTranxi.html',
		controller : 'BvbController'
	}).when('/onFarm', {
		templateUrl : 'views/projOnFarm.html',
		controller : 'BvbController'
	}).when('/about', {
		templateUrl : 'views/about.html',
		controller : 'BvbController'
	}).when('/photography', {
		templateUrl : 'views/photography.html',
		controller : 'BvbController'
	}).when('/videography', {
		templateUrl : 'views/videography.html',
		controller : 'BvbController'
	}).otherwise({
		redirectTo : '/home'
	});
}]);
