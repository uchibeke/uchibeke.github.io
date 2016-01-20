var myApp = angular.module('myApp', ['ngRoute', 'guestControllers']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/eventstone', {
		templateUrl : 'partials/projEventstone.html',
		controller : 'ListController'
	}).when('/home', {
		templateUrl : 'partials/home.html',
		controller : 'ListController'
	}).when('/tranxi', {
		templateUrl : 'partials/projTranxi.html',
		controller : 'ListController'
	}).when('/onFarm', {
		templateUrl : 'partials/projOnFarm.html',
		controller : 'ListController'
	}).when('/about', {
		templateUrl : 'partials/about.html',
		controller : 'ListController'
	}).otherwise({
		redirectTo : '/home'
	});
}]);
