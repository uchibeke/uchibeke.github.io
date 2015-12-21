var myApp = angular.module('myApp', ['ngRoute', 'guestControllers']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/list', {
		templateUrl : 'partials/list.html',
		controller : 'ListController'
	}).when('/cheatcheat', {
		templateUrl : 'partials/cheatcheat.html',
		controller : 'ListController'
	}).otherwise({
		redirectTo : '/cheatcheat'
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
