var myApp = angular.module('myApp', ['ngRoute', 'guestControllers']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/list', {
		templateUrl : 'partials/list.html',
		controller : 'ListController'
	}).when('/details/:itemId', {
		templateUrl : 'partials/details.html',
		controller : 'DetailsController'
	}).when('/populate', {
		templateUrl : 'partials/populate.html',
		controller : 'ListController'
	}).when('/home', {
		templateUrl : 'partials/home.html',
		controller : 'ListController'
	}).when('/live', {
		templateUrl : 'partials/live.html',
		controller : 'ListController'
	}).when('/guestList', {
		templateUrl : 'partials/guestList.html',
		controller : 'ListController'
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
