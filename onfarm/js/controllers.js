var guestControllers = angular.module('guestControllers', ['ngStorage', 'firebase', 'ngSanitize'])

guestControllers.controller('ListController', ['$scope', '$http', '$localStorage', '$timeout', '$firebaseObject', '$firebaseArray', '$firebaseAuth', '$sce',
function($scope, $http, $localStorage, $timeout, $firebaseObject, $firebaseArray, $firebaseAuth, $sce) {
	$http.get('js/old_data.json').success(function(data) {
		// Data from json file
		$scope.crops = data;

		$scope.canola = $scope.crops[0];

		$scope.lentils = $scope.crops[1];

		$scope.barley = $scope.crops[2];

		$scope.canolaName = {
			"canola" : "Canola",
		};

		$scope.alphas = [{
			char : "A"
		}, {
			char : "B"
		}, {
			char : "C"
		}, {
			char : "D"
		}, {
			char : "E"
		}, {
			char : "F"
		}, {
			char : "G"
		}, {
			char : "H"
		}, {
			char : "I"
		}, {
			char : "J"
		}, {
			char : "K"
		}, {
			char : "L"
		}, {
			char : "M"
		}, {
			char : "N"
		}, {
			char : "O"
		}, {
			char : "P"
		}, {
			char : "Q"
		}, {
			char : "R"
		}, {
			char : "S"
		}, {
			char : "T"
		}, {
			char : "U"
		}, {
			char : "V"
		}, {
			char : "W"
		}, {
			char : "X"
		}, {
			char : "Y"
		}, {
			char : "Z"
		}];

		$scope.showEl = function(ind) {
			ind = true;
		}
		$scope.revItem = "";
		$scope.revItemSet = function(ind) {
			$scope.revItem = $scope.canola.LibertyLink[ind];
		}
		$scope.guestOrder = 'name';
		$scope.guestSearch = '';
		$scope.instruction = 'Please, start typing';

		// To store the string from user input
		$scope.dataField = '';

		$scope.listBtnText = 'Add Guests';
		$scope.$storage = $localStorage.$default({
			guestsList : $scope.guests
		});

		var ref = new Firebase("https://eventstone.firebaseio.com");

		$scope.$storage.x = '';

		// List of all user events
		$scope.visualize = function() {
			var showGuest = true;
			if ($scope.guestSearch.length > 0) {
				showGuest = false;
			}
			return showGuest;
		};

		$scope.clearField = function(field) {
			field = '';
		};

		$scope.submitUserInput = function(field) {
			var arr = field.split(",");
			var newA = [];
			var length = arr.length;

			// Check if last element is empty and remove it
			if ((arr[arr.length - 1]).length === 0) {
				length = arr.length - 1;
			}
			// Check if name/ticket number starts with a space and remove space
			var prefix = '\n';
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
					// id : $scope.dateString(),
					checkedIn : false,
					btnText : 'Check-in',
					guestStatus : 'Not checked-in'
				});
			}

			// Two test guests always in the system. Check for them
			if ($scope.$storage.guestsList.length <= 1) {
				$scope.$storage.guestsList = '';
			}
			Array.prototype.push.apply($scope.$storage.guestsList, newA);
			$scope.$storage.guestsList.sort();
		};

		$scope.$storage.xx = "";

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
			return d.getFullYear() + "" + ('0' + (d.getMonth() + 1)).slice(-2) + "" + ('0' + d.getDate()).slice(-2);
		};

		// To be used to hide the side icon before printing
		$scope.showListIcon = true;
		$scope.printGuestList = function() {
			var printContents = document.getElementById("GList").innerHTML;
			var popupWin = window.open('', '_blank', 'width=1700,height=2200');
			popupWin.document.open();
			popupWin.document.write('<html><link rel="stylesheet" media="all" href="css/style.css"><link href="css/limestone.css" rel="stylesheet"  media="all"></head><body onload="window.print()">' + printContents + '</html>');
			popupWin.document.close();
		};

		$scope.printpage = function() {
			var originalContents = document.body.innerHTML;
			var printReport = document.getElementById('content').innerHTML;
			document.body.innerHTML = printReport;
			window.print();
			document.body.innerHTML = originalContents;
		};

		// Live screens
		$scope.firstLiveScreen = true;
		$scope.secondLiveScreen, $scope.thirdLiveScreen, $scope.fourthLiveScreen = false;

		// Live screen check in message
		$scope.liveMsgStatus = false;
		$scope.liveMsg = function() {
			$timeout(function() {
				$scope.liveMsgStatus = false;
			}, 5000);
		};

		// Live screen check in message
		$scope.guestAddFeedback = false;
		$scope.guestAddMsg = function() {
			$timeout(function() {
				$scope.guestAddFeedback = false;
			}, 5000);
		};

		$scope.el = {
			"employees" : [{
				"firstName" : "John",
				"lastName" : "Doe"
			}, {
				"firstName" : "Anna",
				"lastName" : "Smith"
			}, {
				"firstName" : "Peter",
				"lastName" : "Jones"
			}]
		};

		$scope.canolaRoundUpYield = function() {
			var tot = 0;
			for (var i = 0; i < canola.RoundupReady.length; i++) {
				tot = parseInt(canola.RoundupReady[i].yield) + tot;
			}
			return tot;
		};
		canolaRoundUpYield();

		$scope.randomName = function() {
			var arrOfNames1 = ["Jason", "Jim", "Bird", "Shari", "Lily", "Shukla", "Jake", "Kurt", "Sylvia", "Smith", "Luke", "Brent", "Tony", "Chi", "Chen", "Yang", "Ada", "Oluchi", "Maj"];

			var arrOfNames2 = ["Rachel", "Neal", "Miller", "Heidecker", "Gill", "Gina", "Eva", "Sam", "John", "Bob", "Ben", "Sonita", "Brenda", "Ahmed", "Musa", "Oraye", "Ade", "Tito", "Itoro"];

			var arrOfNames3 = ["Monisha", "Peter", "Baraniuk", "Michael", "Linda", "Beni", "Asya", "Charlse", "Russel", "Brian", "Tim", "Ken", "Ugo", "Uche", "Uchi", "Zhed", "Luois", "Riel", "Emma"];

			var arrOfNames4 = ["Yan", "Chan", "Feng", "Stewart", "Raymond", "Vincent", "Zhang", "Lv", "Uchibeke", "Shirley", "Kun", "Myers", "Jimmy", "Luo", "Silong", "Kiki", "Todd", "Sloan"];

			// To lazy to count the array with the least number of names. Writes code to do it
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
