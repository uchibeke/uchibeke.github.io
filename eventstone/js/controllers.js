var mainControllers = angular.module('mainControllers', ['ngStorage', 'ngSanitize', "firebase", "ui.bootstrap"]);

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


	$scope.setEvent = function(eventName, type) {
		$scope.$storage.eventName = eventName;
		$scope.$storage.eventType = type;
		guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/guests/");
		$scope.$storage.guestsList = $firebaseArray(guestRef);
		eventRef = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/");
		$scope.$storage.currentEvent = $firebaseArray(eventRef);

	};

	console.log($scope.$storage.eventType);

	var user,
	    allRef,
	    ref,
	    guestRef;
	if (firebase.auth().currentUser) {
		user = firebase.auth().currentUser;
		allRef = firebase.database().ref().child("/users/" + user.uid + "/");
		$scope.$storage.allEvents = $firebaseArray(allRef);

		ref = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/");
		$scope.$storage.currentEvent = $firebaseArray(ref);

		guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/guests");
		$scope.$storage.guestsList = $firebaseArray(guestRef);

	}

	function ticketOp() {
		if ($scope.$storage.totalTickets.length <= 0) {
			alert("You must enter the number of tickets to generate");
		} else {
			var numbDigits = 4;
			var obj = [];
			for (var i = 0; i < $scope.$storage.totalTickets; i++) {
				var element = {};
				var firstNum = "";
				element.guestStatus = false;
				while (firstNum.length > numbDigits || firstNum.length < numbDigits) {
					firstNum = parseInt(Math.random().toString().slice(2, numbDigits + 2));
				}
				element.id = (stringGen(3) + "" + firstNum + stringGen(3)).toUpperCase();
				obj.push(element);
			}
			$scope.$storage.guestsList = Object.assign([], obj);
			guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/guests");
			guestRef.set($scope.$storage.guestsList);
			ref = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/");
			ref.child("/eventName/").set($scope.$storage.eventName);
			ref.child("/eventType/").set($scope.$storage.eventType);
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

	$scope.deleteEvent = function(eventName) {
		ref = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "");
		var list = $firebaseArray(ref);
		var item = list[eventName];
		var obj = $firebaseObject(ref);
		obj.$remove().then(function(ref) {
		}, function(error) {
			console.log("Error:", error);
		});
	};

	$interval(function() {
		var theTime = new Date().toLocaleTimeString();
		$('#txt').html(theTime);
	}, 1000);

	// Paste from excel file
	$scope.addPastedExcel = function(dataFieldExcel) {
		var rows = dataFieldExcel ? dataFieldExcel.split('\n') : $scope.dataFieldExcel.split('\n');
		var obj = [];
		for (var i = 0; i < rows.length; i++) {
			var arr = rows[i].split("\t");
			obj.push(processRow(arr));
		}
		$scope.$storage.guestsList = Object.assign([], obj);
		$scope.$storage.showExcelList = true;

		guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/guests");
		guestRef.set($scope.$storage.guestsList);
		ref = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/");
		ref.child("/eventName/").set($scope.$storage.eventName);
		ref.child("/eventType/").set($scope.$storage.eventType);
	};

	$scope.$storage.eventType = $scope.$storage.eventType ? $scope.$storage.eventType : "ticket";

	function processRow(row) {
		var item = {};
		item.guestStatus = false;
		for (var i = 0; i < row.length; i++) {
			item[i] = row[i];
		}
		item.id = item[0];
		return item;
	}


	$scope.limitDisplay = function(item, lim) {
		for (var i = 0; i < lim; i++) {
			item[i] = item[i] ? item[i] : "-";
		}
		if (item.length != undefined && length > 0) {
			return item;
		} else {
			// 30 because a list will always be less than 30 fields
			item.length = 10;
			item = Array.prototype.slice.call(item, 0, lim);
			return item;
		}
	};
	$scope.handleNull = function(item) {
		for (var i = 0; i < item.length; i++) {
			item[i] = item[i] ? item[i] : "-";
		}
		return item;
	};

	$scope.checkedIn = function(x) {
		if (!($scope.$storage.guestsList[x].guestStatus)) {
			var d = new Date();
			var ds = d.toLocaleTimeString();
			$scope.$storage.guestsList[x].guestStatus = "" + ds;
			var toPush = {
				guestStatus : $scope.$storage.guestsList[x].guestStatus,
			};
			guestRef.child(x + "/").update(toPush);
		}
	};

	$scope.removeElement = function(item) {

		$scope.$storage.guestsList = $firebaseArray(guestRef);
		// var item = $scope.$storage.guestsList[idx];
		console.log($scope.$storage.guestsList);
		console.log(item);
		$scope.$storage.guestsList.$remove(item).then(function(guestRef) {
			guestRef.key === item.$id;
			// true
			console.log(guestRef.key === item.$id);
		});
	};

	$scope.checkInSingle = function(i) {
		var el = [];
		var itemToAdd = i.split(" ");
		for (var i = 0; i < itemToAdd.length; i++) {
			el[i] = (itemToAdd[i]);
		}
		var d = new Date();
		var ds = d.toLocaleTimeString();
		el.guestStatus = "" + ds;
		el.id = el[0];
		$scope.$storage.guestsList = $firebaseArray(guestRef);
		$scope.$storage.guestsList.$add(el).then(function(guestRef) {
			var id = guestRef.key;
			console.log("added record with id " + id);
			theList.$indexFor(id);
		});

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
			if (($scope.$storage.guestsList[i].guestStatus) != false) {
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

	$scope.exportData = function(id, ext, name) {
		var types = {
			pdf : "application/pdf",
			word : "",
			xls : "application.vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
			txt : "text/plain",
			png : "image/png",
			jpeg : "image/jpeg",
			gif : "image/gif"

		};
		var blob = new Blob([document.getElementById(id).innerHTML], {
			type : types[ext] ? types[ext] + ";charset=utf-8" : types.pdf + ";charset=utf-8"
		});
		saveAs(blob, name ? name : $scope.$storage.eventName + "-" + $scope.$storage.eventType + "-event" + "." + ext);
	};
}]);
