function namebadgeOps($rootScope, $scope, $http, $localStorage) {

	var ss = $scope.$storage;

	console.log(ss);

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
	
	

}
