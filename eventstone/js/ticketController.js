var ticketControllers = angular.module('ticketControllers', ['ngStorage', 'ngSanitize', 'ngFileUpload', 'ngImgCrop']);

ticketControllers.controller('TicketController', ['$rootScope', '$scope', '$http', '$localStorage', '$sce', 'Upload', '$timeout', 'analytics', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'shareDataService',
function($rootScope, $scope, $http, $localStorage, $sce, Upload, $timeout, analytics, $firebaseObject, $firebaseArray, $firebaseAuth, shareDataService) {
	// $http.get('js/tickets.json').success(function(tdata) {
	// // Guest Data from json file
	// $scope.ticketdata = tdata;
	// });

	$http.get('js/styles.json').success(function(st) {
		// Ticket Data from json file
		$scope.styles = st;
	});

	$scope.$storage = $localStorage.$default({
		ticket : $scope.ticketdata,
		style : $scope.styles
	});

	$http.get('js/ticketVariants.json').success(function(ticV) {
		// Ticket variant Data from json file
		$scope.ticketVariants = ticV;
	});

	$scope.ticketOrder = 'ticketTitle';
	$scope.ticketSearch = '';

	$scope.bc = 10;

	// File upload
	$scope.upload = function(dataUrl) {
		Upload.upload({
			url : 'https://angular-file-upload-cors-srv.appspot.com/upload',
			data : {
				file : Upload.dataUrltoBlob(dataUrl)
			},
		}).then(function(response) {
			$timeout(function() {
				$scope.result = response.data;
			});
		}, function(response) {
			if (response.status > 0)
				$scope.errorMsg = response.status + ': ' + response.data;
		}, function(evt) {
			$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
		});
	};

	$scope.showTicket = function(ind) {
		for (var i; i < $scope.$storage.length; i++) {
			if (i == ind) {
				$scope.show = true;
			} else {
				$scope.show = false;
			}
		}
	};

	// $(function() {
	// $('#datepicker').datepicker({
	// onSelect : function(dateText, inst) {
	// var date = $(this).val();
	// $scope.$storage.ticket[0].eventDate = date;
	// }
	// });
	// });
	//
	// (function() {
	// document.getElementById('#datepicker').datepicker({
	// onSelect : function(dateText, inst) {
	// var date = $(this).val();
	// $scope.$storage.ticket[0].eventDate = date;
	// }
	// });
	// })();

	$scope.ticketBackground = function(ind) {
		$scope.$storage.ticketText = $scope.$storage.ticketText;
		$scope.$storage.ticketBgColor = ind;
		$scope.userFillColor = $scope.$storage.ticketBgColor;
	};

	$scope.ticketTxtColor = function(ind) {
		$scope.$storage.ticketBgColor = $scope.$storage.ticketBgColor;
		$scope.$storage.ticketText = ind;
		$scope.userTextColor = $scope.$storage.ticketText;
	}

	$scope.isModel = true;

	$scope.previewStyle = function() {
		if ($scope.isModel) {
			return {
				'background' : $scope.$storage.ticketBgColor,
				'color' : $scope.$storage.ticketText
			}
		}
	}

	$scope.ticketBgColorFilter = function() {
		if ($scope.$storage.ticketBgColor != undefined) {
			$scope.$storage.ticketBgColor = $scope.$storage.ticketBgColor.replace('#', '');
		}
		return $scope.$storage.ticketBgColor;
	};

	$scope.$storage.sampleView = false;

	$scope.textBtnStyle = function(bg) {
		if ($scope.isModel) {
			return {
				'background' : bg
			};
		};
	};

	$scope.printTickets = function() {
		var printContents = document.getElementById("printable").innerHTML;
		var popupWin = window.open('', '_blank', 'width=1700,height=2200');
		popupWin.document.open();
		popupWin.document.write('<html><link rel="stylesheet" media="all" href="css/style.css"><link href="css/limestone.css" rel="stylesheet"  media="all"></head><body onload="window.print()" style="padding-top: 7% !important;">' + printContents + '</html>');
		popupWin.document.close();
	};

	// For security reasons, get IP address, time and location of user at time of generating ticket
	// and add it to each printed ticket.
	$.get("http://ipinfo.io", function(r) {
		var d = new Date();
		$(".securityEncoding").html(r.ip + "|" + d.getHours() + ":" + ('0' + d.getMinutes()).slice(-2));
	}, "jsonp");

	$scope.guestRole = "Participant";
}]);

