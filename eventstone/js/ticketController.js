var ticketControllers = angular.module('ticketControllers', ['ngStorage', 'firebase', 'ngSanitize'])

guestControllers.controller('TicketController', ['$scope', '$http', '$localStorage', '$sce' ,
function($scope, $http, $localStorage, $sce) {
	$http.get('js/tickets.json').success(function(tdata) {
		// Guest Data from json file
		$scope.ticketdata = tdata;

		$http.get('js/styles.json').success(function(st) {
			// Ticket Data from json file
			$scope.styles = st;

			$http.get('js/ticketVariants.json').success(function(ticV) {
				// Ticket variant Data from json file
				$scope.ticketVariants = ticV;

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
				$scope.printTickets = function() {
					var printContents = document.getElementById("printable").innerHTML;
					var popupWin = window.open('', '_blank', 'width=1700,height=2200');
					popupWin.document.open();
					popupWin.document.write('<html><link rel="stylesheet" media="all" href="css/style.css"><link href="css/limestone.css" rel="stylesheet"  media="all"></head><body onload="window.print()" style="padding-top: 7% !important;">' + printContents + '</html>');
					popupWin.document.close();
				};

				// For security reasons, get IP address, time and location of user at time of generating ticket
				// and add it to each printed ticket.
				$.get("http://ipinfo.io", function(response) {
					var d = new Date();
					$(".securityEncoding").html(response.ip + "|" + response.city + "|" + d.getHours() + ":" + ('0' + d.getMinutes()).slice(-2));
				}, "jsonp");
			});
		});
	});
}]);

