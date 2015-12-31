var ticketControllers = angular.module('ticketControllers', ['ngStorage'])

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

			$scope.$storage.sampleView = false;

			$scope.textBtnStyle = function(bg) {
				if ($scope.isModel) {
					return {
						'background-color' : bg
					};
				};
			};

			$(function() {
				$(".btnSave").click(function() {
					html2canvas($("#layout1"), {
						onrendered : function(canvas) {
							theCanvas = canvas;
							// $(".compare").appendChild(canvas).className = "screen";
							document.getElementById("compare").appendChild(canvas);
							// document.body.appendChild(canvas).className = "screen";
							// var input = document.createElement("input");
							// input.className = 'class_to_add';
							// document.forms[0].appendChild(input);

							//Pops up new window compare
							// canvas.toBlob(function(blob) {
							// saveAs(blob, "Card.png");
							// });
						}
					});
				});
			});

			$scope.printDiv = function() {
				var printContents = document.getElementById("printable").innerHTML;
				var popupWin = window.open('', '_blank', 'width=1700,height=2200');
				popupWin.document.open()
				popupWin.document.write('<html><link rel="stylesheet" media="all" href="css/style.css"><link href="css/limestone.css" rel="stylesheet"  media="all"></head><body onload="window.print()">' + printContents + '</html>');
				popupWin.document.close();
			}

			$.get("http://ipinfo.io", function(response) {
				$("#ip").html("IP: " + response.ip);
				$("#address").html("Location: " + response.city + ", " + response.postal + ", " + response.region);
				// $("#details").html(JSON.stringify(response, null, 4));
			}, "jsonp");
		});
	});
}]);

