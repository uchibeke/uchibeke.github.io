var myApp = angular.module('myApp', ['ngRoute', 'majControllers']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/photography', {
		templateUrl : 'partials/photography.html',
		controller : 'MainController'
	}).when('/details/:itemId', {
		templateUrl : 'partials/details.html',
		controller : 'MainController'
	}).when('/about', {
		templateUrl : 'partials/about.html',
		controller : 'MainController'
	}).when('/home', {
		templateUrl : 'partials/home.html',
		controller : 'MainController'
	}).when('/contact', {
		templateUrl : 'partials/contact.html',
		controller : 'MainController'
	}).when('/filmography', {
		templateUrl : 'partials/filmography.html',
		controller : 'MainController'
	}).when('/hUp', {
		templateUrl : 'partials/hUp.html',
		controller : 'MainController'
	}).when('/uEven', {
		templateUrl : 'partials/uEven.html',
		controller : 'MainController'
	}).otherwise({
		redirectTo : '/home'
	});
}]);

