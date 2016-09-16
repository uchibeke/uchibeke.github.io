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
			url : $scope.$storage.api.baseUrl + 'findByIngredients?fillIngredients=false&ingredients=' + ingredients + '&limitLicense=false&number=100&ranking=1',
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
	$scope.matchRecipeToCalories = function(target, dayORweek) {
		console.log('matchRecipeToCalories');
		console.log(target);
		console.log(dayORweek);
		$http({
			url : $scope.$storage.api.baseUrl + 'mealplans/generate?targetCalories=' + target + '&timeFrame=' + dayORweek,
			headers : {
				'X-Mashape-Authorization' : '4ZN4cDI4J9mshHSMwb0APK9NGjJEp1rbTaAjsnEPWabILxb9nl'
			},
			method : 'GET',
			dataType : 'application/json',
		}).success(function(data) {
			console.log('got....');
			$scope.$storage.api.responses.preview = data;
			console.log($scope.$storage.api.responses.preview);
			$scope.$storage.api.responses.preview.recipeName = name;
		}).error(function(data, status) {
			// Handle HTTP error
		}).finally(function() {
			// Execute logic independent of success/error
		}).catch(function(error) {
			// Catch and handle exceptions from success/error/finally functions
		});
	};
	$scope.getFoodGuide = function(target, dayORweek) {
		console.log('matchRecipeToCalories');
		console.log(target);
		console.log(dayORweek);
		$http({
			url : 'http://open.canada.ca/data/api/action/package_show?id=e5f4a98e-0ccf-4e5e-9912-d308b46c5a7f',
			method : 'GET',
			dataType : 'application/json',
		}).success(function(data) {
			console.log('got....');
			$scope.$storage.api.responses.preview = data;
			console.log($scope.$storage.api.responses.preview);
			$scope.$storage.api.responses.preview.recipeName = name;
		}).error(function(data, status) {
			// Handle HTTP error
		}).finally(function() {
			// Execute logic independent of success/error
		}).catch(function(error) {
			// Catch and handle exceptions from success/error/finally functions
		});
	};
	$scope.summaryModalLink = 'home/modalForAnalyzed.html';

	$scope.getAnalyzedRecipe = function(id, name) {
		console.log('getAnalyzedRecipe');
		console.log(id);
		console.log(name);
		// $scope.summaryModalLink = 'home/modalForAnalyzed.html';
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
			$scope.$storage.api.responses.preview = {};
			$scope.$storage.api.responses.preview.recipeName = name;
			var stepInd = 0;
			$scope.$storage.api.responses.preview.steps = [];
			angular.forEach(data[0].steps, function(value, key) {
				var arr = [];
				var ind = 0;
				$scope.$storage.api.responses.preview.steps[stepInd] = {};
				$scope.$storage.api.responses.preview.steps[stepInd].step = value.step;
				angular.forEach(value.ingredients, function(ing, index) {
					arr[ind] = {};
					// console.log(steps);
					arr[ind].name = ing.name;
					arr[ind].image = ing.image;
					arr[ind].id = ing.id;
					ind++;
				});
				$scope.$storage.api.responses.preview.steps[stepInd].ingredients = arr;
				stepInd++;
			});
			console.log($scope.$storage.api.responses.preview);
		}).error(function(data, status) {
			// Handle HTTP error
		}).finally(function() {
			// Execute logic independent of success/error
		}).catch(function(error) {
			// Catch and handle exceptions from success/error/finally functions
		});
	};
	$scope.getRecipeInfo = function(id, name) {
		console.log('getRecipeInfo');
		console.log(id);
		console.log(name);
		$http({
			url : $scope.$storage.api.baseUrl + id + '/information?includeNutrition=true',
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
	$scope.$storage.api.responses.UrlAnswer = {};
	$scope.extraxtRecipeFromUrl = function(url) {
		console.log(url);
		$http({
			url : $scope.$storage.api.baseUrl + "extract?forceExtraction=false&url=http%3A%2F%2F" + url.replace(/.*?:\/\//g, ""),
			headers : {
				'X-Mashape-Authorization' : '4ZN4cDI4J9mshHSMwb0APK9NGjJEp1rbTaAjsnEPWabILxb9nl'
			},
			method : 'GET',
			dataType : 'application/json',
		}).success(function(data) {
			console.log('got....');
			console.log(data);
			$scope.$storage.api.responses.UrlAnswer = data;
			var imgLnk = $scope.$storage.api.responses.UrlAnswer.image;
			if (imgLnk.substr(0, 'https://'.length) !== 'https://' && imgLnk.substr(0, 'http://'.length) !== 'http://') {
				$scope.$storage.api.responses.UrlAnswer.image = "https://spoonacular.com/recipeImages/" + imgLnk;
			}
			$scope.$storage.api.questions.Url = "";
		}).error(function(data, status) {
			// Handle HTTP error
		}).finally(function() {
			// Execute logic independent of success/error
		}).catch(function(error) {
			// Catch and handle exceptions from success/error/finally functions
		});
	};

	$scope.searchRecipes = function(fullStr) {

		var url = $scope.$storage.api.baseUrl;
		if (fullStr.kind != undefined && fullStr.kind) {
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
		url = url + '&limitLicense=false&number=100&offset=0';
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

	// Yummly

	$scope.$storage.api.yummlyBaseUrl = 'http://api.yummly.com/v1/api/recipes?_app_id=d695baf7&_app_key=4d32ff3ecd9fedb69326f94ad62d1d5a&q=';
	$scope.searchWithPhrase = function(str) {
		console.log(str);
		str = str.split(' ').join('+');
		console.log(str);
		$http({
			url : $scope.$storage.api.yummlyBaseUrl + str.match(/\S+/g) || [] + '&requirePictures=true',
			method : 'GET',
			dataType : 'application/json',
		}).success(function(data) {
			console.log('got....');
			console.log(data);
			$scope.$storage.api.responses.searchAnswer = data;
			$scope.$storage.api.questions.search = "";
		}).error(function(data, status) {
			// Handle HTTP error
		}).finally(function() {
			// Execute logic independent of success/error
		}).catch(function(error) {
			// Catch and handle exceptions from success/error/finally functions
		});
	};

	$scope.getYummlyRecipe = function(id, name) {
		console.log('getYummlyRecipe');
		console.log(id);
		console.log(name);
		$http({
			url : 'http://api.yummly.com/v1/api/recipe/' + id + '?_app_id=d695baf7&_app_key=4d32ff3ecd9fedb69326f94ad62d1d5a',
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

	}
	// http://api.yummly.com/v1/api/recipe/recipe-id?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY
}])