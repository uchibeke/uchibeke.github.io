var myApp = angular.module('myApp', ['ngRoute', 'guestControllers',  'ticketControllers', 'analytics', 'firebase']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/list', {
		templateUrl : 'partials/list.html',
		controller : 'GuestController'
	}).when('/populate', {
		templateUrl : 'partials/populate.html',
		controller : 'GuestController'
	}).when('/addticket', {
		templateUrl : 'partials/addticket.html',
		controller : 'GuestController'
	}).when('/home', {
		templateUrl : 'partials/home.html',
		controller : 'GuestController'
	}).when('/live', {
		templateUrl : 'partials/live.html',
		controller : 'GuestController'
	}).when('/guestList', {
		templateUrl : 'partials/guestList.html',
		controller : 'GuestController'
	}).when('/tickets', {
		templateUrl : 'partials/makeTicket.html',
		controller : 'TicketController'
	}).when('/nameBadge', {
		templateUrl : 'partials/makeNameBadge.html',
		controller : 'TicketController'
	}).when('/aboutconf', {
		templateUrl : 'partials/about_conf.html',
		controller : 'TicketController'
	}).when('/aboutparty', {
		templateUrl : 'partials/about_party.html',
		controller : 'TicketController'
	}).when('/aboutlive', {
		templateUrl : 'partials/about_live.html',
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
