var guestControllers = angular.module('guestControllers', ['ngStorage'])

guestControllers.controller('ListController', ['$scope', '$http', '$localStorage',
function($scope, $http, $localStorage) {
	$http.get('js/data.json').success(function(data) {
		// Data from json file
		$scope.guests = data;

		$scope.guestOrder = 'name';
		$scope.guestSearch = '';
		$scope.instruction = 'Please, start typing';

		// To store the string from user input
		$scope.dataField = '';

		$scope.$storage = $localStorage.$default({
			guestsList : $scope.guests,
		});

		$scope.s = {
			style : {
				bg : "{'background-color' : 'red'}",
				lastName : "Doe",
				id : 5566,
				bgColor : function() {
					return this.bg;
				}
			}
		}

		$scope.$storage.x = '';

		$scope.splitLines = function(field) {
			var arrOfAlph = field.split("\n");
			$scope.clearField(field);
			return arrOfAlph;
		};

		$scope.generateSheet = function() {
			var arr = $scope.splitLines($scope.dataField.field);
			var newA = [];
			var length = arr.length;
			if ((arr[arr.length - 1]).length === 0) {
				length = arr.length - 1;
			}
			var prefix = ' ';
			var splicedA = {};
			$scope.$storage.xx = '';
			$scope.switchView = true;
			for (var i = 0; i < length; i++) {
				if ((arr[i].slice(0, prefix.length)) == prefix) {
					splicedA = arr[i].slice(1, arr[i].length);
				} else {
					splicedA = arr[i];
				}
				newA.push({
					item : splicedA,
					sept : '|'
				});
				$scope.$storage.xx = $scope.$storage.xx + splicedA + $scope.delim;
			}

			$scope.$storage.dashed = {};
			if ($scope.$storage.dashed.length <= 1) {
				$scope.$storage.dashed = '';
			}
			Array.prototype.push.apply($scope.$storage.dashed, newA);

		};

		$scope.delim = ' || ';

		// $scope.printpage = function() {
			// var originalContents = document.body.innerHTML;
			// var printReport = document.getElementById('content').innerHTML;
			// document.body.innerHTML = printReport;
			// window.print();
			// document.body.innerHTML = originalContents;
		// }

		$scope.printSetup = function() {
			$scope.$storage.toPrint = $scope.$storage.xx;
		}

		$scope.printFile = function() {
			var printContents = document.getElementById("content").innerHTML;
			var popupWin = window.open('', '_blank', 'width=1700,height=2200');
			popupWin.document.open();
			popupWin.document.write('<html><link rel="stylesheet" media="all" href="css/style.css"><link href="css/limestone.css" rel="stylesheet"  media="all"></head><body onload="window.print()" style="padding-top: 7% !important;">' + printContents + '</html>');
			popupWin.document.close();
		};

		$scope.slides = [{
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
		}]

		$scope.clearField = function(field) {
			field = '';
		}

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

		$scope.link = 'http://1drv.ms/1m9z5RB';
		$scope.slides = [{
			image : '../images/sheet/DependencyGraph.png',
		}, {
			image : 'frame.png'
		}]

	});
}]);
