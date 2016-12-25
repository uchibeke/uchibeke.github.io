var myApp = angular.module('myApp', ['ngRoute', 'uchiApp']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/eventstone', {
		templateUrl : 'views/projEventstone.html',
		controller : 'uchisController'
	}).when('/home', {
		templateUrl : 'views/home.html',
		controller : 'uchisController'
	}).when('/tranxi', {
		templateUrl : 'views/projTranxi.html',
		controller : 'uchisController'
	}).when('/onFarm', {
		templateUrl : 'views/projOnFarm.html',
		controller : 'uchisController'
	}).when('/about', {
		templateUrl : 'views/about.html',
		controller : 'uchisController'
	}).otherwise({
		redirectTo : '/home'
	});
}]);
