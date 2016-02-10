var myApp = angular.module('myApp', ['ngRoute', 'guestControllers','analytics']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/eventstone', {
		templateUrl : 'views/projEventstone.html',
		controller : 'ListController'
	}).when('/home', {
		templateUrl : 'views/home.html',
		controller : 'ListController'
	}).when('/tranxi', {
		templateUrl : 'views/projTranxi.html',
		controller : 'ListController'
	}).when('/onFarm', {
		templateUrl : 'views/projOnFarm.html',
		controller : 'ListController'
	}).when('/about', {
		templateUrl : 'views/about.html',
		controller : 'ListController'
	}).otherwise({
		redirectTo : '/home'
	});
}]);
