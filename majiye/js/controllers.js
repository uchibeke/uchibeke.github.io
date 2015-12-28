var majControllers = angular.module('majControllers', ['ngStorage']);

majControllers.controller('MainController', ['$scope', '$http', '$localStorage',
function($scope, $http, $localStorage) {
	$scope.dataField = '';

	$scope.listBtnText = 'Add Guests';
	// $scope.$storage = $localStorage.$default({
		// guestsList : {hey : h, when : w}
	// });
	// $scope.s=10;
// 
	// $scope.$storage.x = '';

	// $scope.image = [{
	// home : {
	// src : '../img/home/carousel1.jpg',
	// },
	// photography : {
	// src : 'image/source/image.png'
	// },
	// filmography : {
	// src : 'image/source/image.png'
	// },
	// hUp : {
	// src : 'image/source/image.png'
	// },
	// uEven : {
	// src : 'image/source/image.png'
	// }
	// }];

	// List of all user events
	$scope.visualize = function() {
		var showGuest = true;
		if ($scope.guestSearch.length > 0) {
			showGuest = false;
		}
		return showGuest;
	};
	
	$scope.s = "Hey";

	$scope.clearField = function(field) {
		field = '';
	}

	$scope.userInputToArray = function() {
		var arrOfAlph = $scope.dataField.split(",");
		$scope.clearField($scope.dataField);
		return arrOfAlph;
	};

	$scope.submitUserInput = function() {
		var arr = $scope.userInputToArray();
		var newA = [];
		var length = arr.length;
		if ((arr[arr.length - 1]).length === 0) {
			length = arr.length - 1;
		}
		var prefix = '\n';
		var splicedA = {};
		for (var i = 0; i < length; i++) {
			if ((arr[i].slice(0, prefix.length)) == prefix) {
				splicedA = arr[i].slice(1, arr[i].length);
			} else {
				splicedA = arr[i];
			}
			newA.push({
				name : splicedA,
				icon : 'x',
				id : $scope.dateString(),
				checkedIn : false,
				btnText : 'Check-in',
				guestStatus : 'Not checked-in'
			});
		}
		if ($scope.$storage.guestsList.length <= 1) {
			$scope.$storage.guestsList = '';
		}
		Array.prototype.push.apply($scope.$storage.guestsList, newA);
		$scope.$storage.guestsList.sort();

	};

	// $scope.$storage.xx = "";

	$scope.dateString = function() {
		var d = new Date();
		return d.getFullYear() + "" + ('0' + (d.getMonth() + 1)).slice(-2) + "" + ('0' + d.getDate()).slice(-2);
	}

	$scope.printpage = function() {
		var originalContents = document.body.innerHTML;
		var printReport = document.getElementById('content').innerHTML;
		document.body.innerHTML = printReport;
		window.print();
		document.body.innerHTML = originalContents;
	};

}]);

	//
	// majControllers.controller('otherController', ['$scope', '$http', '$routeParams', '$localStorage',
	// function($scope, $http, $routeParams, $localStorage) {
	// $http.get('js/data.json').success(function(data) {
	// $scope.guests = data;
	// $scope.$storage = $localStorage.$default({
	// guestsList : $scope.guests
	// });
	//
	// $scope.whichItem = $routeParams.itemId;
	//
	// if ($routeParams.itemId > 0) {
	// $scope.prevItem = Number($routeParams.itemId) - 1;
	// } else {
	// $scope.prevItem = $scope.$storage.guestsList.length - 1;
	// }
	//
	// if ($routeParams.itemId < $scope.$storage.guestsList.length - 1) {
	// $scope.nextItem = Number($routeParams.itemId) + 1;
	// } else {
	// $scope.nextItem = 0;
	// }
	//
	// });
	// }]);

