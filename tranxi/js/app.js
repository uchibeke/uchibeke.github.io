angular.module('starter', ['ionic', 'td.easySocialShare']).run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
}).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('tabs', {
		url : '/tab',
		abstract : true,
		templateUrl : 'templates/tabs.html'
	}).state('tabs.home', {
		url : '/home',
		views : {
			'home-tab' : {
				templateUrl : 'templates/home.html'
				// controller: 'TranslatorController'
			}
		}
	}).state('tabs.list', {
		url : '/list',
		views : {
			'list-tab' : {
				templateUrl : 'templates/list.html',
				controller : 'CalendarController'
			}
		}
	}).state('tabs.detail', {
		url : '/list/:aId',
		views : {
			'list-tab' : {
				templateUrl : 'templates/detail.html',
				controller : 'CalendarController'
			}
		}
	}).state('tabs.calendar', {
		url : '/calendar',
		views : {
			'calendar-tab' : {
				templateUrl : 'templates/calendar.html',
				controller : 'CalendarController'
			}
		}
	})

	$urlRouterProvider.otherwise('/tab/calendar');
}).controller('CalendarController', ['$scope', '$http', '$state',
function($scope, $http, $state) {
	$http.get('js/data.json').success(function(data) {
		$scope.calendar = data.calendar;

		$scope.onItemDelete = function(dayIndex, item) {
			$scope.calendar[dayIndex].schedule.splice
			($scope.calendar[dayIndex].schedule.indexOf(item), 1);
		}

		$scope.doRefresh = function() {
			$http.get('js/data.json').success(function(data) {
				$scope.calendar = data.calendar;
				$scope.$broadcast('scroll.refreshComplete');
			});
		}

		$scope.toggleStar = function(item) {
			item.star = !item.star;
		}
		
		
          $scope.post = {
            title: 'AngularJS Easy Social Share'
          };
		
		// Empty model where user input would be stored
		$scope.str = {
			input : "",
			customStr : "Hi"
		};
		
		// custom array
		$scope.customLanguage = [{
			equiv : "A"
		}, {
			equiv : "B"
		}, {
			equiv : "C"
		}, {
			equiv : "D"
		}, {
			equiv : "E"
		}, {
			equiv : "F"
		}, {
			equiv : "G"
		}, {
			equiv : "H"
		}, {
			equiv : "I"
		}, {
			equiv : "J"
		}, {
			equiv : "K"
		}, {
			equiv : "L"
		}, {
			equiv : "M"
		}, {
			equiv : "N"
		}, {
			equiv : "O"
		}, {
			equiv : "P"
		}, {
			equiv : "Q"
		}, {
			equiv : "R"
		}, {
			equiv : "S"
		}, {
			equiv : "T"
		}, {
			equiv : "U"
		}, {
			equiv : "V"
		}, {
			equiv : "W"
		}, {
			equiv : "X"
		}, {
			equiv : "Y"
		}, {
			equiv : "Z"
		}];

		// The default language Array
		$scope.upperConv = [{
			equiv : "1"
		}, {
			equiv : "Ba"
		}, {
			equiv : "Ca"
		}, {
			equiv : "Da"
		}, {
			equiv : "2"
		}, {
			equiv : "Fa"
		}, {
			equiv : "Ga"
		}, {
			equiv : "Ha"
		}, {
			equiv : "3"
		}, {
			equiv : "Ja"
		}, {
			equiv : "Ka"
		}, {
			equiv : "La"
		}, {
			equiv : "Ma"
		}, {
			equiv : "Na"
		}, {
			equiv : "4"
		}, {
			equiv : "Pa"
		}, {
			equiv : "Qa"
		}, {
			equiv : "Ra"
		}, {
			equiv : "Sa"
		}, {
			equiv : "Ta"
		}, {
			equiv : "5"
		}, {
			equiv : "Va"
		}, {
			equiv : "Wa"
		}, {
			equiv : "Xa"
		}, {
			equiv : "Ya"
		}, {
			equiv : "Za"
		}];

		// The object to hold language that is being tranlated to
		$scope.arrToUse = [{
			equiv : "1"
		}, {
			equiv : "Ba"
		}, {
			equiv : "Ca"
		}, {
			equiv : "Da"
		}, {
			equiv : "2"
		}, {
			equiv : "Fa"
		}, {
			equiv : "Ga"
		}, {
			equiv : "Ha"
		}, {
			equiv : "3"
		}, {
			equiv : "Ja"
		}, {
			equiv : "Ka"
		}, {
			equiv : "La"
		}, {
			equiv : "Ma"
		}, {
			equiv : "Na"
		}, {
			equiv : "4"
		}, {
			equiv : "Pa"
		}, {
			equiv : "Qa"
		}, {
			equiv : "Ra"
		}, {
			equiv : "Sa"
		}, {
			equiv : "Ta"
		}, {
			equiv : "5"
		}, {
			equiv : "Va"
		}, {
			equiv : "Wa"
		}, {
			equiv : "Xa"
		}, {
			equiv : "Ya"
		}, {
			equiv : "Za"
		}];
		
		// When false, translation is to default language.
		$scope.changeVal = false;
		
		// A function used to change the current language when
		// a checkbox is selected or deselected
		$scope.change = function() {
			$scope.changeVal = !$scope.changeVal;
		}

		// Prompts the user to translate to a langauge
		$scope.prompt

		// A function that changes the prompt on the screen to match
		// the language that is being translated
		$scope.defaultLan = function() {
			var currentLan;
			if ($scope.changeVal) {
				currentLan = "Translating to your custom Language";
				$scope.prompt = "Deactivate custom language";
			} else {
				currentLan = "Translating to Jungle Language";
				$scope.prompt = "Activate custom language" ;
			}
			return currentLan;
		}

		// Used to activate the modal for the language change
		$scope.mainModal = false;
		$scope.modalButton = true;
		$scope.theTrue = true;

		// Triggers the modal used to define a custom langauge.
		$scope.triggerModal = function() {
			if ($scope.mainModal) {
				$scope.mainModal = false;
			} else {
				$scope.mainModal = true;
			}
		}

		// Switchs between the two langauges, default language and user defined
		// language.
		$scope.changeLanguage = function() {
			if (!$scope.changeVal) {
				$scope.arrToUse.length = 0;
				$scope.arrToUse.push.apply($scope.arrToUse, $scope.upperConv);
			} else {
				$scope.arrToUse.length = 0;
				$scope.arrToUse.push.apply($scope.arrToUse, 
					$scope.customLanguage);
			}
			return $scope.arrToUse;
		}

		// BROCCOLI / MEAT OF THE APP
		// Returns the converted string
		$scope.translated = function() {

			var walkerArr = [];
			Array.prototype.push.apply($scope.arrToUse, walkerArr);
			
			// To be used for checking if a user input is a letter of the
			// Alphabet
			var myStr = "abcdefghijklmnopqrstuvwxyz";
			
			// Array of aphabets containing all alphabets with each character 
			// as an index of the array
			var arrOfAlph = myStr.split("");
			
			// Array of upper case aphabets containing all alphabets with each 
			// character as an index of the array
			var arrOfAlphUpper = myStr.toUpperCase().split("");
			
			var userStr = $scope.str.input;
			
			// Array of aphabets containing user input
			var userInputAsArr = userStr.split("");
			
			var finalArr = [];
			var theChar;
			
			for ( i = 0; i < userInputAsArr.length; i++) {
				
				// Sets the currentEl variable to the index of the array
				var currentEl = userInputAsArr[i].toString();

				// Checks if the current element is an alphabet 
				var n = arrOfAlph.indexOf(currentEl);
				if (n == -1) {
					n = arrOfAlphUpper.indexOf(currentEl);
				}
				
				// Translate the character to user defined value if an alphabet
				if (n != -1) {
					theChar = $scope.arrToUse[n].equiv;
				} else {
					theChar = currentEl;
				}
				// Add processed element to the front of final array
				finalArr.push(theChar);
			}
			// Covert array to a string without a delimeter
			return finalArr.join("");
		}
	});
}]);

