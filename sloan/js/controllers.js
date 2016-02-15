var guestControllers = angular.module('guestControllers', [])

guestControllers.controller('ListController', ['$scope', '$http', '$timeout',
function($scope, $http, $timeout, analytics) {
	$http.get('js/old_data.json').success(function(data) {
		// Data from json file
		$scope.crops = data;

		$scope.dateString = function() {
			var d = new Date();
			return d.getFullYear() + "" + ('0' + (d.getMonth() + 1)).slice(-2) + "" + ('0' + d.getDate()).slice(-2);
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

		$scope.printpage = function() {
			var originalContents = document.body.innerHTML;
			var printReport = document.getElementById('content').innerHTML;
			document.body.innerHTML = printReport;
			window.print();
			document.body.innerHTML = originalContents;
		};

		var str1 = ` **This song is specially for you. On this day, wish you the best**
		<br/><br/>  You fill up my senses like a night in the forest,
				like the mountains in springtime, like a walk in the rain,
				like a storm in the desert, like a sleepy blue ocean.
				You fill up my senses, come fill me again. `;
				

		var str2 = ` Come let me love you, let me give my life to you,
				let me drown in your laughter, let me die in your arms,
				let me lay down beside you, let me always be with you.
				Come let me love you, come love me again. `;
				

		var str3 = `  You fill up my senses like a night in the forest,
				like the mountains in springtime, like a walk in the rain,
				like a storm in the desert, like a sleepy blue ocean.
				You fill up my senses, come fill me again `;
				
		$scope.arr1 = str1.split("");
		$scope.arr2 = str2.split("");
		$scope.arr3 = str3.split("");

		$scope.liveMsgStatus = "";
		var i = 0;
		var j = 0;
		var k = 0;
		
		$scope.init = function() {
			function startTime() {
				
				if (i < $scope.arr1.length - 1) {
					$scope.liveMsgStatus = $scope.liveMsgStatus + $scope.arr1[i];
					i++;
					if ( i == $scope.arr1.length - 1) {
						 $scope.liveMsgStatus = $scope.liveMsgStatus + "<br /><br />";
					}
				} else if (j < $scope.arr2.length - 1) {
					 $scope.liveMsgStatus = $scope.liveMsgStatus + $scope.arr2[j];
					 j++;
					if ( j == $scope.arr2.length - 1) {
						 $scope.liveMsgStatus = $scope.liveMsgStatus + "<br /><br />";
					}
				 } else if (k < $scope.arr3.length - 1) {
					 $scope.liveMsgStatus = $scope.liveMsgStatus + $scope.arr3[k];
					 k++;
					if ( k == $scope.arr3.length - 1) {
						 $scope.liveMsgStatus = $scope.liveMsgStatus + "<br /><br />";
					}
				 }
				document.getElementById('txt').innerHTML = $scope.liveMsgStatus;
				var t = setTimeout(startTime, (Math.random() * (600 - 1500) + 600));
			}

			startTime();
		};
		$timeout($scope.init);
	});
}]);
