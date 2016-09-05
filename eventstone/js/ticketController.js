var ticketControllers = angular.module('ticketControllers', ['ngStorage', 'ngSanitize', 'ngFileUpload', 'ngImgCrop']);

ticketControllers.controller('TicketController', ['$rootScope', '$scope', '$http', '$localStorage', '$sce', 'Upload', '$timeout', 'analytics', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'shareDataService',
function($rootScope, $scope, $http, $localStorage, $sce, Upload, $timeout, analytics, $firebaseObject, $firebaseArray, $firebaseAuth, shareDataService) {
	$http.get('js/crayola.json').success(function(st) {
		$scope.$storage = $localStorage.$default({
			ticket : $scope.ticketdata,
		});

		$scope.$storage.style = st;

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

		$scope.previewStyle = function() {
			return {
				'background-color' : $scope.$storage.ticketBgColor,
				'color' : $scope.$storage.ticketText
			}
		}
		var ticketColorFilter = function(givenCol) {
			var col = givenCol;
			if (col != undefined) {
				col = col.replace('#', '');
			}
			return col;
		};

		$scope.barcodeSrc = function(tNum, bColor, tColor) {
			var useQR = true;
			var userBarcode = false;
			bColor = ticketColorFilter(bColor);
			tColor = ticketColorFilter(tColor);
			var final = "";
			var base = "";
			if (useQR) {
				var foreGroundColor = tColor;
				base = "http://generator.barcodetools.com/barcode.png?gen=3";
				final = base + "&data=" + tNum + "&bcolor=" + bColor + "&fcolor=" + foreGroundColor;
			}
			if (userBarcode) {
				base = "http://api-bwipjs.rhcloud.com/?bcid=code128";
				final = base + "&text=" + tNum + "&includetext" + "&scale=1";
			}
			return final;
		};

		$scope.$storage.sampleView = false;

		$scope.textBtnStyle = function(bg) {
			return {
				'background' : bg
			};
		};

		$scope.printTickets = function() {
			var printContents = document.getElementById("printable").innerHTML;
			var popupWin = window.open('', '_blank', 'width=1700,height=2200');
			popupWin.document.open();
			popupWin.document.write('<html><link rel="stylesheet" media="all" href="css/style.css"><link rel="stylesheet" media="all" href="css/tStyles/t1Style.css"><link href="css/limestone.css" rel="stylesheet"  media="all"></head><body onload="window.print()" style="padding-top: 5% !important;font-family: "Roboto Condensed",  monospace, sans-serif !important;">' + printContents + '</html>');
			popupWin.document.close();
		};

		// For security reasons, get IP address, time and location of user at time of generating ticket
		// and add it to each printed ticket.

		$.get("http://ipinfo.io", function(r) {
			var d = new Date().toLocaleDateString();
			$scope.$storage.secEncoding = r.ip + "|" + d;
		}, "jsonp");

		$scope.guestRole = "Participant";
		var ticketFormats = {
			'formats' : ['partials/tickets/t1.html', 'partials/tickets/t2.html'],
			'preview' : ['partials/tickets/t1Preview.html', 'partials/tickets/t2Preview.html']
		};

		$scope.$storage.user.styles = {};
		$scope.setTicketFormat = function(index) {
			$scope.$storage.user.styles.selectedTicFormat = ticketFormats.formats[index];
			$scope.$storage.user.styles.selectedTicFormatPre = ticketFormats.preview[index];
		};
	});
}]);

