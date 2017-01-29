var myApp = angular.module('myApp', ['ngRoute', 'guestControllers', 'analytics']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/eventstone', {
		templateUrl : 'views/projEventstone.html',
		controller : 'ListController'
	}).when('/portfolio', {
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
	}).when('/resume', {
		templateUrl : 'views/resume.html',
		controller : 'ListController'
	}).otherwise({
		redirectTo : '/about'
	});
}]);
myApp.run(['$rootScope', '$location',
function($rootScope, $location) {

	$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
		if (currRoute.originalPath == '/about') {
			$rootScope.tog = 1;
		} else if (currRoute.originalPath == '/portfolio') {
			$rootScope.tog = 2;
		} else {
		}
	});
}]);
