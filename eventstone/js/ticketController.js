guestControllers.controller('TicketController', ['$scope', '$http', '$localStorage',
function($scope, $http, $localStorage) {
	$http.get('js/tickets.json').success(function(tdata) {
		// Data from json file
		$scope.ticketdata = tdata;

		$http.get('js/styles.json').success(function(st) {
			$scope.styles = st;

			$scope.ticketOrder = 'ticketTitle';
			$scope.ticketSearch = '';

			$scope.$storage = $localStorage.$default({
				ticket : $scope.ticketdata,
				style : $scope.styles
			});

			// $scope.style = $scope.styles;

			// $scope.$storage.x = '';
			//
			// $scope.clearField = function(field) {
			// field = '';
			// }

			$scope.bc = 10;

			$scope.showTicket = function(ind) {
				for (var i; i < $scope.$storage.length; i++) {
					if (i == ind) {
						$scope.show = true;
					} else {
						$scope.show = false;
					}
				}
			};
			$(function() {
				$('#datepicker').datepicker({
					showAnim : "fadeIn",
					onSelect : function(dateText, inst) {
						var date = $(this).val();
						$scope.$storage.ticket[0].eventDate = date;
						// alert();
					}
				});
			});

			$scope.ticketBackground = function(ind) {
				$scope.$storage.ticketText = $scope.$storage.ticketText;
				$scope.$storage.ticketBgColor = ind;
			};

			$scope.ticketTxtColor = function(ind) {
				$scope.$storage.ticketBgColor = $scope.$storage.ticketBgColor;
				$scope.$storage.ticketText = ind;
			}

			$scope.isModel = true;

			$scope.previewStyle = function() {
				if ($scope.isModel) {
					return {
						'background-color' : $scope.$storage.ticketBgColor,
						'color' : $scope.$storage.ticketText
					}
				}
			}
			$(function() {
				$("#btnSave").click(function() {
					html2canvas($("#widget"), {
						onrendered : function(canvas) {
							theCanvas = canvas;
							document.body.appendChild(canvas);

							canvas.toBlob(function(blob) {
								saveAs(blob, "Dashboard.png");
							});
						}
					});
				});
			});

			$scope.textBtnStyle = function(bg) {
				if ($scope.isModel) {
					return {
						'background-color' : bg
					}
				}
			}
			// $scope.userInputToArray = function() {
			// var arrOfAlph = $scope.dataField.split(",");
			// $scope.clearField($scope.dataField);
			// return arrOfAlph;
			// };

			// $scope.submitUserInput = function() {
			// var arr = $scope.userInputToArray();
			// var newA = [];
			// var length = arr.length;
			// if ((arr[arr.length - 1]).length === 0) {
			// length = arr.length - 1;
			// }
			// var prefix = '\n';
			// var splicedA = {};
			// for (var i = 0; i < length; i++) {
			// if ((arr[i].slice(0, prefix.length)) == prefix) {
			// splicedA = arr[i].slice(1, arr[i].length);
			// } else {
			// splicedA = arr[i];
			// }
			// newA.push({
			// name : splicedA,
			// icon : 'x',
			// id : $scope.dateString(),
			// checkedIn : false,
			// btnText : 'Check-in',
			// guestStatus : 'Not checked-in'
			// });
			// }
			// if ($scope.$storage.guestsList.length <= 1) {
			// $scope.$storage.guestsList = '';
			// }
			// Array.prototype.push.apply($scope.$storage.guestsList, newA);
			// $scope.$storage.guestsList.sort();
			//
			// };

			// $scope.$storage.xx = "";

			// $scope.deleteStored = function() {
			// if (!(angular.equals($scope.$storage.guestsList, data))) {
			// $scope.$storage.backUpGuestList = {};
			// $scope.$storage.backUpGuestList = $scope.$storage.guestsList;
			// $scope.$storage.guestsList = {};
			// $scope.$storage.guestsList = data;
			// }
			// };
			//
			// $scope.removeElement = function(list, idx) {
			// if (list.length <= 2) {
			// } else {
			// if (idx > list.length - 1) {
			// } else {
			// if (isNaN(idx)) {
			// } else {
			// delete list[idx];
			// for (var i = idx; i < list.length; i++) {
			// list[i] = list[i + 1];
			// }
			// list.length = list.length - 1;
			// }
			// }
			// }
			// };
			//
			// $scope.dateString = function() {
			// var d = new Date();
			// return d.getFullYear() + "" + ('0' + (d.getMonth() + 1)).slice(-2) + "" + ('0' + d.getDate()).slice(-2);
			// }
			//
			// $scope.backUpTxt = function() {
			// if ($scope.backUp) {
			// return 'Hide Backed Guest List';
			// ;
			// } else {
			// return 'View Backed up Guest List';
			// }
			// }

			// $scope.backUp = false;
			// $scope.backUpBtn = function() {
			// $scope.backUp = !$scope.backUp;
			// }
			//
			// $scope.printpage = function() {
			// var originalContents = document.body.innerHTML;
			// var printReport = document.getElementById('content').innerHTML;
			// document.body.innerHTML = printReport;
			// window.print();
			// document.body.innerHTML = originalContents;
			// }
			//
			// $scope.slides = [{
			// image : 'https://rawgit.com/uchibeke/uchibeke.github.io/master/eventstone/images/sheet/DependencyGraph.png',
			// }, {
			// image : 'https://rawgit.com/uchibeke/uchibeke.github.io/master/eventstone/images/sheet/frame.png'
			// }, {
			// image : 'https://rawgit.com/uchibeke/uchibeke.github.io/master/eventstone/images/sheet/memoryLayout.png'
			// }, {
			// image : 'https://rawgit.com/uchibeke/uchibeke.github.io/master/eventstone/images/sheet/repoStructure.png'
			// }, {
			// image : 'https://rawgit.com/uchibeke/uchibeke.github.io/master/eventstone/images/sheet/stackFrame.png'
			// }, {
			// image : 'https://rawgit.com/uchibeke/uchibeke.github.io/master/eventstone/images/sheet/stepsSoftwareBuild.png'
			// }]

			// $scope.randomName = function() {
			// var arrOfNames1 = ["Jason", "Jim", "Bird", "Shari", "Lily", "Shukla", "Jake", "Kurt", "Sylvia", "Smith", "Luke", "Brent", "Tony", "Chi", "Chen", "Yang", "Ada", "Oluchi", "Maj"];
			//
			// var arrOfNames2 = ["Rachel", "Neal", "Miller", "Heidecker", "Gill", "Gina", "Eva", "Sam", "John", "Bob", "Ben", "Sonita", "Brenda", "Ahmed", "Musa", "Oraye", "Ade", "Tito", "Itoro"];
			//
			// var arrOfNames3 = ["Monisha", "Peter", "Baraniuk", "Michael", "Linda", "Beni", "Asya", "Charlse", "Russel", "Brian", "Tim", "Ken", "Ugo", "Uche", "Uchi", "Zhed", "Luois", "Riel", "Emma"];
			//
			// var arrOfNames4 = ["Yan", "Chan", "Feng", "Stewart", "Raymond", "Vincent", "Zhang", "Lv", "Uchibeke", "Shirley", "Kun", "Myers", "Jimmy", "Luo", "Silong", "Kiki", "Todd", "Sloan"];
			//
			// // To lazy to count the array with the least number of names
			// var sz = Math.min(arrOfNames1.length, arrOfNames2.length, arrOfNames3.length, arrOfNames4.length);
			//
			// var arrOfArrs = [arrOfNames1, arrOfNames2, arrOfNames3, arrOfNames4];
			//
			// var randomArr = Math.floor((Math.random() * (arrOfArrs.length)) + 0);
			// var randomIndex = Math.floor((Math.random() * (sz - 1)) + 0);
			// var arrToUse = arrOfArrs[randomArr];
			// var name = arrToUse[randomIndex] + " ";
			// randomArr = Math.floor((Math.random() * (arrOfArrs.length - 1)) + 0);
			// randomIndex = Math.floor((Math.random() * (sz - 1)) + 0);
			// arrToUse = arrOfArrs[randomArr];
			// name = name + arrToUse[randomIndex];
			// $scope.dataField = $scope.dataField + name + ",";
			// };

		});
	});
}]);

