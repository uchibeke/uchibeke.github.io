var mainControllers = angular.module('mainControllers', ['ngStorage', 'ngSanitize', "firebase"]);

mainControllers.controller('MainController', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', 'analytics', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'shareDataService',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, analytics, $firebaseObject, $firebaseArray, $firebaseAuth, shareDataService) {
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

	$scope.hide_logo = false;

	// function to set the default data
	$scope.reset = function() {

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

	$scope.$storage.xx = "";

	$scope.$storage.options = {
	};
	$scope.$storage.options.hideCheckin = [];

	$scope.deleteStored = function() {
		if (!(angular.equals($scope.$storage.guestsList, $scope.guests))) {
			$scope.$storage.backUpGuestList = [];
			$scope.$storage.backUpGuestList = $scope.$storage.guestsList;
			$scope.$storage.guestsList = [];
			$scope.$storage.guestsList = $scope.guests;
		}
	};

	$scope.dateString = function() {
		var d = new Date();
		return d.getFullYear() + "" + ('0' + (d.getMonth() + 1)).slice(-2) + "" + ('0' + d.getDate()).slice(-2);
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

	function stringGen(len) {
		var text = "";
		var charset = "abcdefghijklmnopqrstuvwxyz";
		for (var i = 0; i < len; i++)
			text += charset.charAt(Math.floor(Math.random() * charset.length));
		return text;
	}


	$scope.setEvent = function(eventName) {
		$scope.$storage.eventName = eventName;
		guestRef = firebase.database().ref().child("/users/" + firebase.auth().currentUser.uid + "/" + $scope.$storage.eventName + "/guests");
		$scope.$storage.guestsList = $firebaseArray(guestRef);

	};
	var user = firebase.auth().currentUser;
	console.log(user);

	var allRef = firebase.database().ref().child("/users/" + user.uid + "/");
	$scope.$storage.allEvents = $firebaseArray(allRef);

	var ref = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/");
	$scope.$storage.currentEvent = $firebaseArray(ref);

	var guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/guests");
	$scope.$storage.guestsList = $firebaseArray(guestRef);

	function ticketOp() {
		if ($scope.$storage.totalTickets.length <= 0) {
			alert("You must enter the number of tickets to generate");
		} else {
			var numbDigits = 4;
			var obj = [];
			for (var i = 0; i < $scope.$storage.totalTickets; i++) {
				var element = {};
				var firstNum = "";
				while (firstNum.length > numbDigits || firstNum.length < numbDigits) {
					firstNum = parseInt(Math.random().toString().slice(2, numbDigits + 2));
				}
				element.ticketNumber = (stringGen(3) + "" + firstNum + stringGen(3)).toUpperCase();
				element.guestStatus = 'Not checked-in';
				obj.push(element);
			}
			$scope.$storage.guestsList = Object.assign([], obj);
			guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/guests");
			guestRef.set($scope.$storage.guestsList);
			ref = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/");
			ref.child("/eventName/").set($scope.$storage.eventName);
			$scope.$storage.totalTickets = '';
		}
	};

	$scope.loading = [];

	$scope.generateTicketNums = function() {
		$scope.loading.generatingTicket = true;
		$('#test').html($scope.loading.generatingTicket);
		try {
			ticketOp();
		} catch(err) {
			// message.innerHTML = "Error: " + err + ".";
		} finally {
			$scope.loading.generatingTicket = false;
		}
	};

	$interval(function() {
		var theTime = new Date().toLocaleTimeString();
		$('#txt').html(theTime);
	}, 1000);

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
		guestRef.set($scope.$storage.guestsList);
		ref.child("/eventName/").set($scope.$storage.eventName);
		$scope.$storage.showExcelList = true;
	};

	$scope.checkedIn = function(x) {
		if ((($scope.$storage.guestsList[x].guestStatus.toLowerCase().replace(/\W+/g, " ")).indexOf('Not checked-in')) > -1) {
		} else if (($scope.$storage.guestsList[x].guestStatus) == 'Not checked-in') {
			var d = new Date();
			var ds = d.toLocaleTimeString();
			$scope.$storage.guestsList[x].guestStatus = "" + ds;
		}
		var toPush = {
			guestStatus : $scope.$storage.guestsList[x].guestStatus,
		};
		guestRef.child(x + "/").update(toPush);
	};

	$scope.removeElement = function(list, idx) {
		if (list.length <= 2) {
			alert("Delete All elements from the guestlist page instead");
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
					// ref.child(idx + "/").remove();
					// ref.once('value', function(s) {
					// $scope.$storage.guestsList = JSON.parse(JSON.stringify(s.val()));
					// console.log($scope.$storage.guestsList);
					// console.log(s.val());
					// console.log($scope.$storage.guestsList);
					// }, function(e) {
					// console.error(e);
					// })
					// for (var i = idx; i < $scope.$storage.guestsList.length; i++) {
					// $scope.$storage.guestsList[i] = $scope.$storage.guestsList[i + 1];
					// }
					// $scope.$storage.guestsList.length = $scope.$storage.guestsList.length - 1;
				}
			}
		}
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
			if ( typeof $scope.$storage.guestsList[i][col] === 'undefined') {
				return 0;
			} else {
				if ((($scope.$storage.guestsList[i][col]).toLowerCase().replace(/\W+/g, " ")).indexOf(sess.toLowerCase().replace(/\W+/g, " ")) > -1) {
					totReg = totReg + 1;
				}
			}
		}
		return totReg;
	};
}]);
