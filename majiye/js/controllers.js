var majControllers = angular.module('majControllers', ['ngStorage'])

majControllers.controller('MainController', ['$scope', '$http', '$localStorage',
function($scope, $http, $localStorage) {
	$http.get('js/data.json').success(function(data) {
		// Data from json file
		$scope.guests = data;

		$scope.guestOrder = 'name';
		$scope.guestSearch = '';
		$scope.instruction = 'Please, start typing';

		// To store the string from user input
		$scope.dataField = '';

		$scope.listBtnText = 'Add Guests';
		$scope.$storage = $localStorage.$default({
			guestsList : $scope.guests
		});

		$scope.$storage.x = '';

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

		$scope.img = [{
			image : 'https://rawgit.com/uchibeke/uchibeke.github.io/master/eventstone/images/sheet/DependencyGraph.png',
		}, {
			image : 'https://rawgit.com/uchibeke/uchibeke.github.io/master/eventstone/images/sheet/frame.png'
		}, {
			image : 'https://rawgit.com/uchibeke/uchibeke.github.io/master/eventstone/images/sheet/memoryLayout.png'
		}, {
			image : 'https://rawgit.com/uchibeke/uchibeke.github.io/master/eventstone/images/sheet/repoStructure.png'
		}, {
			image : 'https://rawgit.com/uchibeke/uchibeke.github.io/master/eventstone/images/sheet/stackFrame.png'
		}, {
			image : 'https://rawgit.com/uchibeke/uchibeke.github.io/master/eventstone/images/sheet/stepsSoftwareBuild.png'
		}];

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
		}

		$scope.userInputToArray = function() {
			var arrOfAlph = $scope.dataField.split(",");
			$scope.clearField($scope.dataField);
			return arrOfAlph;
		};

		$scope.splitLines = function() {
			var arrOfAlph = $scope.cheatField.split("\n");
			$scope.clearField($scope.cheatField);
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

		$scope.outPutwithDash = function() {
			var arr = $scope.splitLines();
			var newA = [];
			var length = arr.length;
			if ((arr[arr.length - 1]).length === 0) {
				length = arr.length - 1;
			}
			var prefix = ' ';
			var splicedA = {};
			$scope.$storage.xx = '';
			for (var i = 0; i < length; i++) {
				if ((arr[i].slice(0, prefix.length)) == prefix) {
					splicedA = arr[i].slice(1, arr[i].length);
				} else {
					splicedA = arr[i];
				}
				newA.push({
					item : splicedA,
					sept : '||'
				});
				$scope.$storage.xx = $scope.$storage.xx + splicedA + " ||| ";
			}

			$scope.$storage.dashed = {};
			if ($scope.$storage.dashed.length <= 1) {
				$scope.$storage.dashed = '';
			}
			Array.prototype.push.apply($scope.$storage.dashed, newA);

		};

		$scope.$storage.xx = "";

		$scope.deleteStored = function() {
			if (!(angular.equals($scope.$storage.guestsList, data))) {
				$scope.$storage.backUpGuestList = {};
				$scope.$storage.backUpGuestList = $scope.$storage.guestsList;
				$scope.$storage.guestsList = {};
				$scope.$storage.guestsList = data;
			}
		};

		$scope.removeElement = function(list, idx) {
			if (list.length <= 2) {
			} else {
				if (idx > list.length - 1) {
				} else {
					if (isNaN(idx)) {
					} else {
						delete list[idx];
						for (var i = idx; i < list.length; i++) {
							list[i] = list[i + 1];
						}
						list.length = list.length - 1;
					}
				}
			}
		};

		$scope.dateString = function() {
			var d = new Date();
			return d.getFullYear() + "" + ('0' + (d.getMonth() + 1)).slice(-2) + "" + ('0' + d.getDate()).slice(-2);
		}

		$scope.checkedIn = function(x) {
			if ($scope.$storage.guestsList[x].checkedIn == true) {
			} else {
				$scope.$storage.guestsList[x].checkedIn = true;
				var d = new Date();
				var ds = d.getHours() + ":" + ('0' + d.getMinutes()).slice(-2) + " on " + (d.getMonth() + 1) + "/" + d.getDate();
				$scope.$storage.guestsList[x].btnText = 'Checked in ' + ds;
				$scope.$storage.guestsList[x].guestStatus = 'Checked in ' + ds;
			}
		}

		$scope.backUpTxt = function() {
			if ($scope.backUp) {
				return 'Hide Backed Guest List';
				;
			} else {
				return 'View Backed up Guest List';
			}
		}

		$scope.backUp = false;
		$scope.backUpBtn = function() {
			$scope.backUp = !$scope.backUp;
		}

		$scope.printpage = function() {
			var originalContents = document.body.innerHTML;
			var printReport = document.getElementById('content').innerHTML;
			document.body.innerHTML = printReport;
			window.print();
			document.body.innerHTML = originalContents;
		}

	});
}]);

majControllers.controller('otherController', ['$scope', '$http', '$routeParams', '$localStorage',
function($scope, $http, $routeParams, $localStorage) {
	$http.get('js/data.json').success(function(data) {
		$scope.guests = data;
		$scope.$storage = $localStorage.$default({
			guestsList : $scope.guests
		});

		$scope.whichItem = $routeParams.itemId;

		if ($routeParams.itemId > 0) {
			$scope.prevItem = Number($routeParams.itemId) - 1;
		} else {
			$scope.prevItem = $scope.$storage.guestsList.length - 1;
		}

		if ($routeParams.itemId < $scope.$storage.guestsList.length - 1) {
			$scope.nextItem = Number($routeParams.itemId) + 1;
		} else {
			$scope.nextItem = 0;
		}

	});
}]);
