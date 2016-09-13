'use strict';

angular.module('myApp.home', ['ngRoute', 'ngStorage', "firebase"]).config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'home/home.html',
		controller : 'HomeCtrl'
	});
}]).controller('HomeCtrl', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', '$firebaseObject', '$firebaseArray', '$firebaseAuth',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, $firebaseObject, $firebaseArray, $firebaseAuth) {

	$scope.$storage = $localStorage;
	$scope.$storage.userData = {};
	$scope.$storage.options = {};
	$scope.$storage.api = {};

	$scope.$storage.api.baseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/';

	$scope.$storage.api.responses = {};
	$scope.$storage.api.questions = {};

	$scope.getQuickAnswer = function(str) {
		console.log(str);
		str = str.split(' ').join('+');
		console.log(str);
		$http({
			url : $scope.$storage.api.baseUrl + 'quickAnswer?q=' + str + '%3F',
			headers : {
				'X-Mashape-Authorization' : '4ZN4cDI4J9mshHSMwb0APK9NGjJEp1rbTaAjsnEPWabILxb9nl'
			},
			method : 'GET',
			dataType : 'application/json',
		}).success(function(data) {
			console.log('got....');
			console.log(data);
			$scope.$storage.api.responses.natLangAnswer = data;
			$scope.$storage.api.questions.natLang = '';
		}).error(function(data, status) {
			// Handle HTTP error
		}).finally(function() {
			// Execute logic independent of success/error
		}).catch(function(error) {
			// Catch and handle exceptions from success/error/finally functions
		});
	};

	$scope.getRecipeForIngredient = function(ingredients) {
		console.log(ingredients);
		ingredients = ingredients.match(/\S+/g) || [];
		console.log(ingredients);
		$http({
			url : $scope.$storage.api.baseUrl + 'findByIngredients?fillIngredients=false&ingredients=' + ingredients + '&limitLicense=false&number=20&ranking=1',
			headers : {
				'X-Mashape-Authorization' : '4ZN4cDI4J9mshHSMwb0APK9NGjJEp1rbTaAjsnEPWabILxb9nl'
			},
			method : 'GET',
			dataType : 'application/json',
		}).success(function(data) {
			console.log('got....');
			console.log(data);
			$scope.$storage.api.responses.ingAnswer = data;
			$scope.$storage.api.questions.ing = '';
		}).error(function(data, status) {
			// Handle HTTP error
		}).finally(function() {
			// Execute logic independent of success/error
		}).catch(function(error) {
			// Catch and handle exceptions from success/error/finally functions
		});
	};

	$scope.getAnalyzedRecipe = function(id, name) {
		console.log(id);
		$http({
			url : $scope.$storage.api.baseUrl + id + '/analyzedInstructions?stepBreakdown=true',
			headers : {
				'X-Mashape-Authorization' : '4ZN4cDI4J9mshHSMwb0APK9NGjJEp1rbTaAjsnEPWabILxb9nl'
			},
			method : 'GET',
			dataType : 'application/json',
		}).success(function(data) {
			console.log('got....');
			console.log(data);
			$scope.$storage.api.responses.preview = data;
			$scope.$storage.api.responses.preview.recipeName = name;
		}).error(function(data, status) {
			// Handle HTTP error
		}).finally(function() {
			// Execute logic independent of success/error
		}).catch(function(error) {
			// Catch and handle exceptions from success/error/finally functions
		});
	};
	// [request setUrl:@"https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?diet=vegetarian&excludeIngredients=coconut&intolerances=egg%2C+gluten&limitLicense=false&number=10&offset=0&query=burger&type=main+course"];
	// [request setUrl:@"https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?kind=spanish%2Camerican%2Ckorean%2Cindian&diet=vegan&intolerances=egg&limitLicense=false&number=10&offset=0&query=burger"];

	$scope.searchRecipes = function(fullStr) {

		var url = $scope.$storage.api.baseUrl;
		if (fullStr.kind != undefined && fullStr.kind ) {
			fullStr.kind = fullStr.kind.match(/\S+/g) || [];
			url = url + 'search?kind=' + fullStr.kind;
		}
		if (fullStr.diet != undefined && fullStr.diet) {
			fullStr.diet = fullStr.diet.match(/\S+/g) || [];
			url = url + '&diet=' + fullStr.diet;
		}
		if (fullStr.exlude != undefined && fullStr.exlude) {
			fullStr.exlude = fullStr.exlude.match(/\S+/g) || [];
			url = +'&excludeIngredients=' + fullStr.exlude;
		}
		if (fullStr.allergic != undefined && fullStr.allergic) {
			fullStr.allergic = fullStr.allergic.match(/\S+/g) || [];
			url = url + '&intolerances=' + fullStr.allergic;
		}
		url = url + '&limitLicense=false&number=50&offset=0';
		console.log(url);
		$http({
			url : url,
			headers : {
				'X-Mashape-Authorization' : '4ZN4cDI4J9mshHSMwb0APK9NGjJEp1rbTaAjsnEPWabILxb9nl'
			},
			method : 'GET',
			dataType : 'application/json',
		}).success(function(data) {
			console.log('got....');
			console.log(data);
			$scope.$storage.api.responses.fullStrAnswer = data;
			$scope.$storage.api.questions.fullStr = '';
		}).error(function(data, status) {
			// Handle HTTP error
		}).finally(function() {
			// Execute logic independent of success/error
		}).catch(function(error) {
			// Catch and handle exceptions from success/error/finally functions
		});
	};
}])