var ticketControllers = angular.module('ticketControllers', ['ngStorage', 'ngSanitize', 'ngFileUpload', 'ngImgCrop']);

ticketControllers.controller('TicketController', ['$rootScope', '$scope', '$http', '$localStorage', '$sce', 'Upload', '$timeout', 'analytics', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'shareDataService',
function($rootScope, $scope, $http, $localStorage, $sce, Upload, $timeout, analytics, $firebaseObject, $firebaseArray, $firebaseAuth, shareDataService) {
	
	delete $scope.$storage.style;
	$http.get('js/crayola.json').then(function(result) {
		var xx = result.data;
				
		$http.get('js/styles.json').then(function(result2) {
			$scope.$storage.style = Object.assign(xx, result2.data);
		}, function(error) {
			console.log(error);
		}).finally(function() {
		});
		
		
	}, function(error) {
		console.log(error);
	}).finally(function() {
	});
	
	
	$http.get('js/ticketVariants.json').then(function(result) {
		$scope.ticketVariants = result.data;
	}, function(result) {
		console.log(result);
	}).finally(function() {
		console.log("finally finished repos");
	});


	$scope.$storage = $localStorage.$default({
		ticket : $scope.ticketdata,
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
		return "background-color: " +  $scope.$storage.ticketBgColor + "!important;" + "color: " + $scope.$storage.ticketText + "!important;";
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
		var top = `
		<html>
			<head>
				<link rel="stylesheet" media="all"  href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed">
				<link rel="stylesheet" media="all" href="css/style.css">
				<link rel="stylesheet" media="all" href="css/tStyles/t1Style.css">
				<link rel="stylesheet" media="all" href="css/tStyles/t2Style.css">
				<link rel="stylesheet" media="all" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
			</head>
			<body onload="window.print()" 
			style="print-color-adjust: exact !important;
			-moz-print-color-adjust: exact !important;
			-webkit-print-color-adjust: exact !important;
			font-family: "Roboto Condensed",  monospace, sans-serif !important;">`;
		
		var bottom = `
			</body>
		</html>`
		
		popupWin.document.write(top + printContents + bottom);
		popupWin.document.close();
	};

	// For security reasons, get IP address, time and location of user at time of generating ticket
	// and add it to each printed ticket.
	$.get("http://ipinfo.io", function(r) {
		var d = new Date().toLocaleDateString();
		$scope.$storage.secEncoding = r.ip + "|" + d;
	}, "jsonp");

	$scope.guestRole = "Participant";

	$scope.$storage.user.styles = {};
	if ($scope.$storage.user.styles.selectedTicFormat == undefined && $scope.$storage.user.styles.selectedTicFormatPre == undefined) {
		$scope.$storage.user.styles.selectedTicFormat = 'partials/tickets/t1.html';
		$scope.$storage.user.styles.selectedTicFormatPre = 'partials/tickets/t1Preview.html';
	}
	$scope.setTicketFormat = function(index) {
		var ticketFormats = {
			'formats' : ['partials/tickets/t1.html', 'partials/tickets/t2.html'],
			'preview' : ['partials/tickets/t1Preview.html', 'partials/tickets/t2Preview.html']
		};
		$scope.$storage.user.styles.selectedTicFormat = ticketFormats.formats[index];
		$scope.$storage.user.styles.selectedTicFormatPre = ticketFormats.preview[index];
	};
}]);

