var myApp = angular.module('myApp', ['ngRoute', 'guestControllers', 'ticketControllers']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/add', {
		templateUrl : 'partials/addReview.html',
		controller : 'ListController'
	}).when('/login', {
		templateUrl : 'partials/login.html',
		controller : 'ListController'
	}).when('/register', {
		templateUrl : 'partials/register.html',
		controller : 'ListController'
	}).when('/main', {
		templateUrl : 'partials/mainPage.html',
		controller : 'ListController'
	}).when('/home', {
		templateUrl : 'partials/home.html',
		controller : 'ListController'
	}).when('/tickets', {
		templateUrl : 'partials/makeTicket.html',
		controller : 'TicketController'
	}).when('/nameBadge', {
		templateUrl : 'partials/makeNameBadge.html',
		controller : 'TicketController'
	}).when('/about', {
		templateUrl : 'partials/about.html',
		controller : 'TicketController'
	}).otherwise({
		redirectTo : '/home'
	});
}]);

//
// $scope.randomNum = function() {
// return (Math.floor((Math.random() * 9) + 0) );
// };
//
// $scope.randomLetter = function() {
// var alpas = "abcdefghijklmnopqrstuvwxyz";
// var arrOfAlph = alpas.split("");
// var randomIndex = Math.floor((Math.random() * (alpas.length - 1)) + 0);
// return arrOfAlph[randomIndex];
// };
//
// $scope.generatedNSID = function() {
// var ranNUm = $scope.randomLetter() + $scope.randomLetter() + $scope.randomLetter() + ($scope.randomNum()) + ($scope.randomNum()) + ($scope.randomNum());
// return ranNUm;
// };
