var mainControllers = angular.module('mainControllers', ['ngStorage', 'ngSanitize', "firebase", "ui.bootstrap",'ngAnimate']);

mainControllers.controller('MainController', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', 'analytics', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'shareDataService',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, analytics, $firebaseObject, $firebaseArray, $firebaseAuth, shareDataService) {
	$scope.guests = [];

	$scope.guestOrder = 'name';
	$scope.guestSearch = '';
	$scope.instruction = 'Please, start typing';

	// To store the string from user input
	$scope.dataField = '';
	$scope.listBtnText = 'Add';
	$scope.$storage = $localStorage;
	// $scope.$storage = $localStorage.$default({
		// guestsList : $scope.guests
	// });

	var ss = $scope.$storage;

	$scope.hide_logo = false;

	// function to set the default data
	$scope.reset = function() {

		$scope.hey = "Hey" + (numb++);
	};
	var numb = 0;
	$scope.hey = "___";

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

	ss.options = {
	};
	ss.options.hideCheckin = [];

	$scope.deleteStored = function() {
		if (!(angular.equals(ss.guestsList, $scope.guests))) {
			ss.backUpGuestList = [];
			ss.backUpGuestList = ss.guestsList;
			ss.guestsList = [];
			ss.guestsList = $scope.guests;
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
		ss.eventName = eventName;
		ss.eventType = type;
		guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + ss.eventName + "/guests/");
		ss.guestsList = $firebaseArray(guestRef);
		eventRef = firebase.database().ref().child("/users/" + user.uid + "/" + ss.eventName + "/");
		ss.currentEvent = $firebaseArray(eventRef);

	};

	var user,
	    allRef,
	    ref,
	    guestRef;
	if (firebase.auth().currentUser) {
		user = firebase.auth().currentUser;
		allRef = firebase.database().ref().child("/users/" + user.uid + "/");
		ss.allEvents = $firebaseArray(allRef);

		ref = firebase.database().ref().child("/users/" + user.uid + "/" + ss.eventName + "/");
		ss.currentEvent = $firebaseArray(ref);

		guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + ss.eventName + "/guests");
		ss.guestsList = $firebaseArray(guestRef);

	}

	function ticketOp() {
		if (ss.totalTickets.length <= 0) {
			alert("You must enter the number of tickets to generate");
		} else {
			var numbDigits = 4;
			var obj = [];
			for (var i = 0; i < ss.totalTickets; i++) {
				var element = {};
				var firstNum = "";
				element.guestStatus = false;
				while (firstNum.length > numbDigits || firstNum.length < numbDigits) {
					firstNum = parseInt(Math.random().toString().slice(2, numbDigits + 2));
				}
				element.id = (stringGen(3) + "" + firstNum + stringGen(3)).toUpperCase();
				obj.push(element);
			}
			ss.guestsList = Object.assign([], obj);
			guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + ss.eventName + "/guests");
			guestRef.set(ss.guestsList);
			ref = firebase.database().ref().child("/users/" + user.uid + "/" + ss.eventName + "/");
			ref.child("/eventName/").set(ss.eventName);
			ref.child("/eventType/").set(ss.eventType);
			ss.totalTickets = '';
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
		ref = firebase.database().ref().child("/users/" + user.uid + "/" + ss.eventName + "");
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
		ss.guestsList = Object.assign([], obj);
		ss.showExcelList = true;

		guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + ss.eventName + "/guests");
		guestRef.set(ss.guestsList);
		ref = firebase.database().ref().child("/users/" + user.uid + "/" + ss.eventName + "/");
		ref.child("/eventName/").set(ss.eventName);
		ref.child("/eventType/").set(ss.eventType);
	};

	ss.eventType = ss.eventType ? ss.eventType : "ticket";

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
		if (!(ss.guestsList[x].guestStatus)) {
			var d = new Date();
			var ds = d.toLocaleTimeString();
			ss.guestsList[x].guestStatus = "" + ds;
			var toPush = {
				guestStatus : ss.guestsList[x].guestStatus,
			};
			guestRef.child(x + "/").update(toPush);
		}
	};

	$scope.removeElement = function(item) {

		ss.guestsList = $firebaseArray(guestRef);
		// var item = ss.guestsList[idx];
		console.log(ss.guestsList);
		console.log(item);
		ss.guestsList.$remove(item).then(function(guestRef) {
			guestRef.key === item.$id;
			// true
			console.log(guestRef.key === item.$id);
		});
	};

	$scope.checkInSingle = function(i) {
		var el = [];
		var itemToAdd = i.split(" ");
		for (var i = 0; i < ss.guestsList[0].length; i++) {
			el[i] = itemToAdd[i] ? itemToAdd[i] : "-";
		}
		$scope.userRegInfo = "";
		var d = new Date();
		var ds = d.toLocaleTimeString();
		el.guestStatus = "" + ds;
		el.id = el[0];
		ss.guestsList = $firebaseArray(guestRef);
		ss.guestsList.$add(el).then(function(guestRef) {
			var id = guestRef.key;
			console.log("added record with id " + id);
			ss.guestsList.$indexFor(id);
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
		if (ss.backUpGuestList.length > 0) {
			ss.guestsList = [];
			ss.guestsList = ss.backUpGuestList;
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
		var theTime = 10000;
		$timeout(function() {
			if ($scope.userRegInfo.length < 1) {
				$scope.liveMsgStatus = false;
				$scope.showAddField = false;
			}
		}, theTime);
	};

	$scope.checkIns = function() {
		var checkIns = 0;
		for (var i = 0; i < ss.guestsList.length; i++) {
			if ((ss.guestsList[i].guestStatus) != false) {
				checkIns = checkIns + 1;
			}
		}
		return checkIns;
	};

	$scope.noCheckIns = function() {
		return ss.guestsList.length - $scope.checkIns();
	};

	$scope.sessionTotal = function(sess, column) {
		var totReg = 0;
		var col = column - 1;
		for (var i = 0; i < ss.guestsList.length; i++) {
			if ( typeof ss.guestsList[i][col] === 'undefined') {
				return 0;
			} else {
				if (((ss.guestsList[i][col]).toLowerCase().replace(/\W+/g, " ")).indexOf(sess.toLowerCase().replace(/\W+/g, " ")) > -1) {
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
		saveAs(blob, name ? name : ss.eventName + "-" + ss.eventType + "-event" + "." + ext);
	};

	ss.user = ss.user ? ss.user : {};
	ss.user.print = ss.user.print ? ss.user.print : {};

	ss.user.print.BNumPerPg = 6;
	ss.user.print.BToPrint = {};
	ss.user.print.BNextToPrint = {};
	ss.user.print.BLastPrinted = {};

	$scope.addToPrintQ = function(el, customSelection) {
		if (customSelection) {
			ss.user.print.BNextToPrint.push(el);
		} else if (ss.user.print.BNextToPrint.length < ss.user.print.BNumPerPg) {
			ss.user.print.BNextToPrint.push(el);
		} else {
			ss.user.print.BNextToPrint.shift().push(el);
		}
	};

	$scope.clearAfterPrint = function() {
		ss.user.print.BLastPrinted = ss.user.print.BNextToPrint;
		ss.user.print.BNextToPrint = {};
	};

	ss.user.print = ss.user.print != undefined ? ss.user.print : {};

	$scope.setListToPrint = function(list) {
		if (list.constructor === Array) {
			ss.user.print.BToPrint = list;
		} else {
			ss.user.print.BToPrint = [list];
		}
	};
}]);
