var guestControllers = angular.module('guestControllers', ['ngStorage', 'firebase', 'ngSanitize'])

guestControllers.controller('ListController', ['$scope', '$http', '$localStorage', '$timeout', '$firebaseObject', '$firebaseArray', '$firebaseAuth', '$sce',
function($scope, $http, $localStorage, $timeout, $firebaseObject, $firebaseArray, $firebaseAuth, $sce) {
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
		// $scope.g = $firebaseObject(ref);
		// $scope.g.$bindTo($scope, "$storage.guestsList");

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

		$scope.checkedIn = function(x) {
			if ($scope.$storage.guestsList[x].checkedIn == true) {
			} else {
				$scope.$storage.guestsList[x].checkedIn = true;
				var d = new Date();
				// var ds = d.getHours() + ":" + ('0' + d.getMinutes()).slice(-2) + " on " + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
				var ds = d.toLocaleTimeString() + " on " + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
				$scope.$storage.guestsList[x].btnText = 'Checked in ' + ds;
				$scope.$storage.guestsList[x].guestStatus = 'Checked in ' + ds;
			}
		};

		$scope.backUpTxt = function() {
			if ($scope.backUp) {
				return 'Hide Backup list';
				;
			} else {
				return 'View Backup list';
			}
		};

		$scope.backUp = false;
		$scope.backUpBtn = function() {
			$scope.backUp = !$scope.backUp;
		};
		//
		// Import/Export
		// All event lists: Previous list

		// Generate ticket numbers either randomly or sequencially
		$scope.generateTicketNums = function() {
			if ($scope.$storage.totalTickets.length <= 0) {
				alert("You must enter the number of tickets to generate");
			} else {
				$scope.dataFieldNum = "";
				if ($scope.$storage.prefix.length <= 0) {
					$scope.$storage.prefix = "";
				}
				if ($scope.$storage.ticketDigits.length <= 0) {
					$scope.$storage.ticketDigits = 5;
				}
				var numbDigits = $scope.$storage.ticketDigits - $scope.$storage.prefix.length;
				if ($scope.$storage.ticketDigits.length > 0) {
					if ($scope.$storage.ticketDigits.length >= 10) {
						numbDigits = 10 - $scope.$storage.prefix.length;
					} else {
						numbDigits = $scope.$storage.ticketDigits - $scope.$storage.prefix.length;
					}
				}
				var temp = "";
				if ($scope.$storage.rand && (!($scope.$storage.seq))) {
					var a = [];
					for (var i = 0; i < $scope.$storage.totalTickets; i++) {
						// magic number 2 used in slice to remove decimal place and move two indexes forward
						temp = $scope.$storage.prefix + "" + (Math.random().toString().slice(2, numbDigits + 2));
						// recursively check if element already exists in array a
						var checkRepeat = function() {
							if (a.indexOf(temp) > -1) {
								temp = $scope.$storage.prefix + "" + (Math.random().toString().slice(2, numbDigits + 2));
								checkRepeat();
							}
						};
						checkRepeat();
						a.push(temp);
						$scope.dataFieldNum = temp + " ," + $scope.dataFieldNum;
					}
					a = [];
				} else if ((!($scope.$storage.rand)) && ($scope.$storage.seq)) {
					var firstNum = " ";
					while (firstNum.length > numbDigits || firstNum.length < numbDigits) {
						firstNum = parseInt(Math.random().toString().slice(2, numbDigits + 2));
					}
					for (var i = 0; i < $scope.$storage.totalTickets; i++) {
						$scope.dataFieldNum = ($scope.$storage.prefix + "" + (firstNum + 1)) + " ," + $scope.dataFieldNum;
						firstNum--;
					}
				}
				// Clear data inputted by user
				$scope.$storage.ticketDigits = '';
				$scope.$storage.prefix = '';
				$scope.$storage.totalTickets = '';
			}
		};

		$scope.addPastedExcel = function() {
			var rows = $scope.dataFieldExcel.split('\n');
			var obj = [];
			// var val;
			for (var i = 0; i < rows.length; i++) {
				var o = rows[i].split('\t');
				obj.push({
					r1 : o[0],
					r2 : o[1],
				});
			}
			$scope.$storage.ExcelOutput = obj;
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

		$scope.ran = function() {
			$scope.rand = Math.random().toString().slice(2, 7);
		};

		$scope.addWithNum = true;

		$scope.restoreFromBackUp = function() {
			$scope.$storage.guestsList = {};
			Array.prototype.push.apply($scope.$storage.guestsList, $scope.$storage.backUpGuestList);

		};

		$scope.listreplace = true;
		$scope.replaceList = function() {
			$scope.listreplace = !$scope.listreplace;
		};

		$scope.popolateReplace = true;
		$scope.replacePop = function() {
			$scope.popolateReplace = !$scope.popolateReplace;
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

		$scope.checkIns = "0";
		$scope.noCheckIns = "0";

		// $scope.summary = function() {
		// $scope.totalGuests = $scope.$storage.guestsList.length - 2;
		// for (var i = 0; i < $scope.$storage.guestsList.length; i++) {
		// if ($scope.$storage.guestsList[i].checkedIn == true) {
		// $scope.checkIns = $scope.checkIns + 1;
		// } else if (($scope.$storage.guestsList[i].checkedIn) != true) {
		// $scope.noCheckIns = $scope.checkIns + 1;
		// }
		// }
		// $scope.noCheckIns = $scope.noCheckIns -2;
		// };

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