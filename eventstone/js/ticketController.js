var ticketControllers = angular.module('ticketControllers', ['ngStorage', 'ngSanitize', 'ngFileUpload', 'ngImgCrop', 'slick','ngAnimate']);

ticketControllers.controller('TicketController', ['$rootScope', '$scope', '$http', '$localStorage', '$sce', 'Upload', '$timeout', 'analytics', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'shareDataService',
function($rootScope, $scope, $http, $localStorage, $sce, Upload, $timeout, analytics, $firebaseObject, $firebaseArray, $firebaseAuth, shareDataService) {
	
	
	$scope.$storage = $localStorage.$default({
		ticket : $scope.ticketdata,
	});
	
	var ss = $scope.$storage;
	
	$http.get('js/resources/crayola.json').then(function(result) {
		var xx = result.data;
				
		$http.get('js/resources/styles.json').then(function(result2) {
			ss.style = result2.data.concat(xx).concat(manyColors);
		}, function(error) {
			console.log(error);
		}).finally(function() {
		});
		
		
	}, function(error) {
		console.log(error);
	}).finally(function() {
	});
	
	
	$http.get('js/resources/ticketVariants.json').then(function(result) {
		$scope.ticketVariants = result.data;
	}, function(result) {
	}).finally(function() {
		console.log("finally finished repos");
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
		for (var i; i < ss.length; i++) {
			if (i == ind) {
				$scope.show = true;
			} else {
				$scope.show = false;
			}
		}
	};

	$scope.ticketBackground = function(ind) {
		ss.ticketText = ss.ticketText;
		ss.ticketBgColor = ind;
		$scope.userFillColor = ss.ticketBgColor;
	};

	$scope.ticketTxtColor = function(ind) {
		ss.ticketBgColor = ss.ticketBgColor;
		ss.ticketText = ind;
		$scope.userTextColor = ss.ticketText;
	}

	$scope.previewStyle = function() {
		return "background-color: " +  ss.ticketBgColor + "!important;" + "color: " + ss.ticketText + "!important;";
	}

	$scope.previewStyleInverse = function() {
		return "color: " +  ss.ticketBgColor + "!important;" + "background-color: " + ss.ticketText + "!important;";
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

	ss.sampleView = false;

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
		ss.secEncoding = r.ip + "|" + d;
	}, "jsonp");

	ss.user = ss.user != undefined ? ss.user : {};
	ss.user.styles = ss.user.styles != undefined ? ss.user.styles : {};
	if (ss.user.styles.selectedTicFormat == undefined && ss.user.styles.selectedTicFormatPre == undefined) {
		ss.user.styles.selectedTicFormat = 'partials/tickets/t1.html';
		ss.user.styles.selectedTicFormatPre = 'partials/tickets/t1Preview.html';
	}
	
	ss.user.styles.ticketFormats = {
		'formats' : ['partials/tickets/t1.html', 'partials/tickets/t2.html', 'partials/tickets/t3.html'],
		'preview' : ['partials/tickets/t1Preview.html', 'partials/tickets/t2Preview.html', 'partials/tickets/t3Preview.html']
	};
	
	
	// Limit number of badges and tickets to 10 because of the way this works
	ss.user.styles.setSelectedInd = function() {
		ss.user.styles.selectedInd = undefined;
		if ($('.choices').find('.slick-active')[1] != undefined) {
			ss.user.styles.selectedInd  = Number($('.choices').find('.slick-active')[1].getAttribute('id').slice(-1));
		}
	};

	$scope.setListToPrint = function(list) {
		if (list.constructor === Array) {
			ss.user.print.BToPrint = list;
		} else {
			ss.user.print.BToPrint = [list];
		}
	};
	
	$scope.changeLan = function (lan) {
		console.log("lan");
		$rootScope.$storage.lan = lan;
		location.reload();
	};
	
	
	namebadgeOps($rootScope, $scope, $http,  $localStorage);
}]);

