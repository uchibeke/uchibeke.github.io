function namebadgeOps($rootScope, $scope, $http, $localStorage) {

	var ss = $scope.$storage;

	ss.options.badge = {};

	ss.options.badge.fNameCol = 1;
	ss.options.badge.lNameCol = 2;
	ss.options.badge.emailCol = 3; 
	ss.options.badge.titleCol = 4;
	ss.options.badge.companyCol = 5;
	ss.options.badge.firstTxt = "Follow us on Twitter"; 
	ss.options.badge.secondTxt = "Learn how to make yours at eventstone.io"; 
	
	$scope.printBadges = function() {
		console.log("Called");
		var printContents = document.getElementById("printableBadge").innerHTML;
		var popupWin = window.open('', '_blank', 'width=1700,height=2200');
		popupWin.document.open();
		var top = `
		<html>
			<head>
				<link rel="stylesheet" media="all"  href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed">
				<link rel="stylesheet" media="all" href="css/style.css">
				<link rel="stylesheet" media="all" href="css/bStyles.css">
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
	
	
	
	if (ss.user.styles.selectedBFormat == undefined && ss.user.styles.selectedBFormatPre == undefined) {
		ss.user.styles.selectedBFormat = 'partials/badges/b1.html';
		ss.user.styles.selectedBFormatPre = 'partials/badges/b1Preview.html';
	}
	
	ss.user.styles.badgeFormats = {
		'formats' : ['partials/badges/b3.html', 'partials/badges/b2.html', 'partials/badges/b1.html'],
		'preview' : ['partials/badges/b3Preview.html', 'partials/badges/b2Preview.html', 'partials/badges/b1Preview.html']
	};
	
	$scope.setBadgeFormat = function(index) {
		ss.user.styles.selectedBFormat = ss.user.styles.badgeFormats.formats[index];
		ss.user.styles.selectedBFormatPre = ss.user.styles.badgeFormats.preview[index];
	};
	
	

}
