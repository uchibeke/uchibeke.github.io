var guestControllers = angular.module('guestControllers', ['ngStorage'])

guestControllers.controller('ListController', ['$scope', '$http', '$localStorage',
function($scope, $http, $localStorage) {
	$http.get('js/data.json').success(function(data) {
		// Data from json file
		$scope.guests = data;

		$scope.guestOrder = 'name';
		$scope.guestSearch = '';
		$scope.instruction = 'Please, start typing';

		// To store the string from user input
		$scope.dataField = '';

		$scope.listBtnText = 'Add Guests';
		$scope.$storage = $localStorage.$default({
			guestsList : $scope.guests
		});

		$scope.$storage.x = '';

		// List of all user events
		$scope.visualize = function() {
			var showGuest = true;
			if ($scope.guestSearch.length > 0) {
				showGuest = false;
			}
			return showGuest;
		};

		$scope.clearField = function() {
			$scope.dataField = '';
		}

		$scope.userInputToArray = function() {
			var arrOfAlph = $scope.dataField.split(",");
			$scope.clearField();
			return arrOfAlph;
		};

		$scope.submitUserInput = function() {
			var arr = $scope.userInputToArray();
			var newA = [];
			var length = arr.length;
			if ((arr[arr.length - 1]).length === 0) {
				length = arr.length - 1;
			}
			var prefix = ' ';
			var splicedA = {};
			for (var i = 0; i < length; i++) {
				if ((arr[i].slice(0, prefix.length)) == prefix) {
					splicedA = arr[i].slice(1, arr[i].length);
				} else {
					splicedA = arr[i];
				}
				newA.push({
					name : splicedA,
					icon : 'x',
					id : $scope.dateString(),
					checkedIn : false,
					btnText : 'Check-in',
					guestStatus : 'Not checked-in'
				});
			}
			if ($scope.$storage.guestsList.length <= 1) {
				$scope.$storage.guestsList = '';
			}
			Array.prototype.push.apply($scope.$storage.guestsList, newA);
			$scope.$storage.guestsList.sort();

		};

		$scope.deleteStored = function() {
			if (!(angular.equals($scope.$storage.guestsList, data))) {
				$scope.$storage.backUpGuestList = {};
				$scope.$storage.backUpGuestList = $scope.$storage.guestsList;
				$scope.$storage.guestsList = {};
				$scope.$storage.guestsList = data;
			}
		};

		$scope.removeElement = function(list, idx) {
			if (list.length <= 2) {
			} else {
				if (idx > list.length - 1) {
				} else {
					if (isNaN(idx)) {
					} else {
						delete list[idx];
						for (var i = idx; i < list.length; i++) {
							list[i] = list[i + 1];
						}
						list.length = list.length - 1;
					}
				}
			}
		};

		$scope.dateString = function() {
			var d = new Date();
			return d.getFullYear() + "" + ('0' + d.getMonth()).slice(-2) + "" + ('0' + d.getDate()).slice(-2);
		}

		$scope.checkedIn = function(x) {
			if ($scope.$storage.guestsList[x].checkedIn == true) {
			} else {
				$scope.$storage.guestsList[x].checkedIn = true;
				var d = new Date();
				var ds = d.getHours() + ":" + ('0' + d.getMinutes()).slice(-2) + " on " + d.getMonth() + "/" + d.getDate();
				$scope.$storage.guestsList[x].btnText = 'Checked in ' + ds;
				$scope.$storage.guestsList[x].guestStatus = 'Checked in ' + ds;
			}
		}
		
		$scope.backUpTxt = function() {
			if ($scope.backUp) {
				return 'Hide Backed Guest List';
				;
			} else {
				return 'View Backed up Guest List';
			}
		}

		$scope.backUp = false;
		$scope.backUpBtn = function() {
			$scope.backUp = !$scope.backUp;
		}

		$scope.restoreFromBackUp = function() {
			$scope.$storage.guestsList = {};
			Array.prototype.push.apply($scope.$storage.guestsList, $scope.$storage.backUpGuestList);

		}

		$scope.listreplace = true;
		$scope.replaceList = function() {
			$scope.listreplace = !$scope.listreplace;
		}

		$scope.popolateReplace = true;
		$scope.replacePop = function() {
			$scope.popolateReplace = !$scope.popolateReplace;
		}

		$scope.randomName = function() {
			var arrOfNames1 = ["Jason", "Jim", "Bird", "Shari", "Lily", "Shukla", "Jake", "Kurt", "Sylvia", "Smith", "Luke", "Brent", "Tony", "Chi", "Chen", "Yang", "Ada", "Oluchi", "Maj"];

			var arrOfNames2 = ["Rachel", "Neal", "Miller", "Heidecker", "Gill", "Gina", "Eva", "Sam", "John", "Bob", "Ben", "Sonita", "Brenda", "Ahmed", "Musa", "Oraye", "Ade", "Tito", "Itoro"];

			var arrOfNames3 = ["Monisha", "Peter", "Baraniuk", "Michael", "Linda", "Beni", "Asya", "Charlse", "Russel", "Brian", "Tim", "Ken", "Ugo", "Uche", "Uchi", "Zhed", "Luois", "Riel", "Emma"];

			var arrOfNames4 = ["Yan", "Chan", "Feng", "Stewart", "Raymond", "Vincent", "Zhang", "Lv", "Uchibeke", "Shirley", "Kun", "Myers" , "Jimmy", "Luo" , "Silong", "Kiki", "Todd", "Sloan"];
			
			// To lazy to count the array with the least number of names
			var sz = Math.min(arrOfNames1.length, arrOfNames2.length, arrOfNames3.length, arrOfNames4.length); 
			
			var arrOfArrs = [arrOfNames1, arrOfNames2, arrOfNames3, arrOfNames4];

			var randomArr = Math.floor((Math.random() * (arrOfArrs.length)) + 0);
			var randomIndex = Math.floor((Math.random() * (sz - 1)) + 0);
			var arrToUse = arrOfArrs[randomArr];
			var name = arrToUse[randomIndex] + " ";
			randomArr = Math.floor((Math.random() * (arrOfArrs.length - 1)) + 0);
			randomIndex = Math.floor((Math.random() * (sz - 1)) + 0);
			arrToUse = arrOfArrs[randomArr];
			name = name + arrToUse[randomIndex];
			$scope.dataField = $scope.dataField + name + ",";
		};

	});
}]);

guestControllers.controller('DetailsController', ['$scope', '$http', '$routeParams', '$localStorage',
function($scope, $http, $routeParams, $localStorage) {
	$http.get('js/data.json').success(function(data) {
		$scope.guests = data;
		$scope.$storage = $localStorage.$default({
			guestsList : $scope.guests
		});

		$scope.whichItem = $routeParams.itemId;

		if ($routeParams.itemId > 0) {
			$scope.prevItem = Number($routeParams.itemId) - 1;
		} else {
			$scope.prevItem = $scope.$storage.guestsList.length - 1;
		}

		if ($routeParams.itemId < $scope.$storage.guestsList.length - 1) {
			$scope.nextItem = Number($routeParams.itemId) + 1;
		} else {
			$scope.nextItem = 0;
		}

	});
}]);
