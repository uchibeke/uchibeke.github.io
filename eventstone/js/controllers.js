var guestControllers = angular.module('guestControllers', ['ngStorage', 'ngSanitize']);

guestControllers.controller('GuestController', ['$scope', '$http', '$localStorage', '$timeout', '$sce', 'analytics', '$firebaseObject',
function($scope, $http, $localStorage, $timeout, $sce, analytics, $firebaseObject) {
	$http.get('js/data.json').success(function(data) {
		// Data from json file
		$scope.guests = [];

		$scope.guestOrder = 'name';
		$scope.guestSearch = '';
		$scope.instruction = 'Please, start typing';

		// To store the string from user input
		$scope.dataField = '';

		$scope.listBtnText = 'Add';
		$scope.$storage = $localStorage.$default({
			guestsList : $scope.guests
		});

		// $scope.ref = new Firebase("https://eventstone.firebaseio.com");
		// var fbObj = $firebaseObject(ref);
		// $scope.fbObject = $firebaseObject($scope.ref);


		// function to set the default data
		$scope.reset = function() {

			// fb.$set({
			// monday : {
			// name : 'Monday',
			// slots : {
			// 0900 : {
			// time : '9:00am',
			// booked : false
			// },
			// 0110 : {
			// time : '11:00am',
			// booked : false
			// }
			// }
			// },
			// tuesday : {
			// name : 'Tuesday',
			// slots : {
			// 0900 : {
			// time : '9:00am',
			// booked : false
			// },
			// 0110 : {
			// time : '11:00am',
			// booked : false
			// }
			// }
			// }
			// });
			$scope.hey = "Hey" + (numb++);
		};
		var numb = 0;
		$scope.hey = "___";

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
			var arr = field.split("+");
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
					0 : splicedA,
					// icon : 'x',
					// checkedIn : false,
					// btnText : 'Check-in',
					guestStatus : 'Not checked-in'
				});
			}

			// Two test guests always in the system. Check for them
			if ($scope.$storage.guestsList.length <= 1) {
				$scope.$storage.guestsList = '';
			}
			Array.prototype.push.apply($scope.$storage.guestsList, newA);
			$scope.$storage.guestsList.sort();
			// field= "";
		};

		$scope.$storage.xx = "";

		$scope.deleteStored = function() {
			if (!(angular.equals($scope.$storage.guestsList, $scope.guests))) {
				$scope.$storage.backUpGuestList = [];
				$scope.$storage.backUpGuestList = $scope.$storage.guestsList;
				$scope.$storage.guestsList = [];
				$scope.$storage.guestsList = $scope.guests;
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
			if ((($scope.$storage.guestsList[x].guestStatus.toLowerCase().replace(/\W+/g, " ")).indexOf('Not checked-in')) > -1) {
			} else if (($scope.$storage.guestsList[x].guestStatus) == 'Not checked-in') {
				var d = new Date();
				var ds = d.toLocaleTimeString();
				$scope.$storage.guestsList[x].guestStatus = 'Signed in ' + ds;
			}
		};

		$scope.$storage.titleArr = ["Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading", "Heading"];

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

		// Generate ticket numbers sequencially
		$scope.generateTicketNums = function() {
			if ($scope.$storage.totalTickets.length <= 0) {
				alert("You must enter the number of tickets to generate");
			} else {
				var numbDigits = 10 - 6;
				var firstNum = "";
				while (firstNum.length > numbDigits || firstNum.length < numbDigits) {
					firstNum = parseInt(Math.random().toString().slice(2, numbDigits + 2));
				}
				var obj = [];
				for (var i = 0; i < $scope.$storage.totalTickets; i++) {
					var element = {};
					element[0] = (stringGen(3) + "" + (firstNum + 1) + stringGen(3)).toUpperCase();
					element.guestStatus = 'Not checked-in';
					obj.push(element);
					firstNum--;
				}
				$scope.$storage.guestsList = Object.assign([], obj);
				$scope.$storage.prefix = '';
				$scope.$storage.totalTickets = '';
			}
		};

		function stringGen(len) {
			var text = "";
			var charset = "abcdefghijklmnopqrstuvwxyz";
			for (var i = 0; i < len; i++)
				text += charset.charAt(Math.floor(Math.random() * charset.length));
			return text;
		}

		// $scope.addGTab = true;

		$scope.init = function() {
			function startTime() {
				var today = new Date();
				var h = today.getHours();
				var m = today.getMinutes();
				var s = today.getSeconds();
				m = checkTime(m);
				s = checkTime(s);
				document.getElementById('txt').innerHTML = h + ":" + m + ":" + s;
				var t = setTimeout(startTime, 500);
			}

			function checkTime(i) {
				if (i < 10) {
					i = "0" + i
				};// add zero in front of numbers < 10
				return i;
			}

			startTime();
		}
		$timeout($scope.init);

		// Paste from excel file
		$scope.addPastedExcel = function() {
			var rows = $scope.dataFieldExcel.split('\n');
			var obj = [];
			cart = [];
			for (var i = 0; i < rows.length; i++) {
				var arr = rows[i].split('\t');
				function a() {
					var wholeRow = "";
					var element = {};
					for (var i = 0; i < arr.length; i++) {
						wholeRow = wholeRow + arr[i] + "     ";
						element[i] = arr[i];
					}
					element.guestStatus = 'Not checked-in';
					cart.push(element);
					return wholeRow;
				}


				obj.push(a());
			}
			$scope.testObj = cart;
			$scope.$storage.guestsList = Object.assign([], $scope.testObj);

			$scope.$storage.showExcelList = true;
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

		$scope.addByPasting = true;

		$scope.restoreFromBackUp = function() {
			if ($scope.$storage.backUpGuestList.length > 0) {
				$scope.$storage.guestsList = [];
				$scope.$storage.guestsList = $scope.$storage.backUpGuestList;
			} else {

			}
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
			var theTime = 5000;
			$timeout(function() {
				$scope.liveMsgStatus = false;
				$scope.showAddField = false;
			}, theTime);
		};

		$scope.checkIns = function() {
			var checkIns = 0;
			for (var i = 0; i < $scope.$storage.guestsList.length; i++) {
				if (($scope.$storage.guestsList[i].guestStatus) != 'Not checked-in') {
					checkIns = checkIns + 1;
				}
			}
			return checkIns;
		};

		$scope.noCheckIns = function() {
			return $scope.$storage.guestsList.length - $scope.checkIns();
		};

		$scope.sessionTotal = function(sess, column) {
			var totReg = 0;
			var col = column - 1;
			for (var i = 0; i < $scope.$storage.guestsList.length; i++) {
				if ((($scope.$storage.guestsList[i][col]).toLowerCase().replace(/\W+/g, " ")).indexOf(sess.toLowerCase().replace(/\W+/g, " ")) > -1) {
					totReg = totReg + 1;
				}
			}
			return totReg;
		};
		
		
		gapi.load("auth:client,drive-realtime,drive-share", callback);


		// $scope.itemsSummary = function(column) {
		// var totReg = 0;
		// var col = column - 1;
		// for (var i = 0; i < $scope.$storage.guestsList.length; i++) {
		// var sess = $scope.$storage.guestsList[i][col];
		// if ((($scope.$storage.guestsList[i][col]).toLowerCase().replace(/\W+/g, " ")).indexOf(sess.toLowerCase().replace(/\W+/g, " ")) > -1) {
		// totReg = totReg + 1;
		// }
		// }
		// return totReg;
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
