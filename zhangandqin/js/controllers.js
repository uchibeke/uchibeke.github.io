'use strict';

var mainController = angular.module('mainController', []);

mainController.controller('BvbController', ['$scope', '$http', '$timeout', '$location', '$route',
function($scope, $http, $timeout, $location, $route) {

	$scope.texts = texts;

	var t = $scope.texts;

	$scope.resources = {};
	var r = $scope.resources;
	r.imageAssets = imageAssets;

	$scope.lifeStyle = r.imageAssets.lifeStyle;
	$scope.about = r.imageAssets.about;
	shuffle($scope.lifeStyle.images);

	$scope.gallery = {};
	$scope.gallery.currentArrInGallery = [];

	$scope.setPreviewImage = function(img, arr) {
		$scope.gallery.previewImage = img;
		$scope.gallery.currentArrInGallery = arr;
		$scope.gallery.currentViewingIndex = arr.indexOf(img);
		$scope.gallery.positionInfo = $scope.gallery.currentViewingIndex + 1 + " of " + $scope.gallery.currentArrInGallery.length;

		if ($scope.gallery.currentViewingIndex <= 0) {
			$scope.gallery.disableBackWard = true;
		} else {
			$scope.gallery.disableBackWard = false;
		}

		if ($scope.gallery.currentViewingIndex >= arr.length - 1) {
			$scope.gallery.disableForward = true;
		} else {
			$scope.gallery.disableForward = false;
		}

	};

	$scope.winWidth = windowW;
	$scope.winHeight = windowH;

	$scope.imageItemWidth = galleryItemSize + "px";
	$scope.bigImageHeight = ($scope.winHeight - 130) + "px";
	$scope.modalImageHeight = ($scope.winHeight - 80) + "px";

	$scope.goToPage = function(path) {
		if ($location.path(path)) {
			if (isChrome || isSafari) {
				location.reload();
			}
		}
	};

	$scope.gallery.advance = function(direction) {
		var arr = $scope.gallery.currentArrInGallery;
		if (direction == "+") {
			if ($scope.gallery.currentViewingIndex < arr.length - 1) {
				$scope.gallery.previewImage = arr[$scope.gallery.currentViewingIndex + 1];
				$scope.gallery.currentViewingIndex = $scope.gallery.currentViewingIndex + 1;
				$scope.gallery.disableBackWard = false;
			}
			if ($scope.gallery.currentViewingIndex >= arr.length - 1) {
				$scope.gallery.disableForward = true;
			}
		} else {
			if ($scope.gallery.currentViewingIndex > 0) {
				$scope.gallery.previewImage = arr[$scope.gallery.currentViewingIndex - 1];
				$scope.gallery.currentViewingIndex = $scope.gallery.currentViewingIndex - 1;
				$scope.gallery.disableForward = false;
			}
			if ($scope.gallery.currentViewingIndex <= 0) {
				$scope.gallery.disableBackWard = true;
			}
		}
		$scope.gallery.positionInfo = $scope.gallery.currentViewingIndex + 1 + " of " + $scope.gallery.currentArrInGallery.length;
	};

	$scope.musicPaused = true;
	$scope.togglePlay = function(id, play) {
		var div = document.getElementById(id);
		var target = div.scrollWidth - div.clientWidth;
		var audio = document.getElementById("linkAudio");
		console.log(audio.paused);
		if (audio.paused && play == true) {
			$("#" + id).animate({
				scrollLeft : target
			}, $scope.lifeStyle.images.length * 3300, 'linear');
			audio.play();
		} else {
			$("#" + id).stop();
			audio.pause();
		}
		$scope.musicPaused = document.getElementById("linkAudio").paused;
	};

	$scope.idFromPath = function(str) {
		return "ls" + str.split('/')[str.split('/').length - 1];
	};
	$scope.goToPhotos = function(path) {
		$location.path(path);
		$timeout(function() {
			$scope.togglePlay('galDiv');
		}, 3000);
	};
}]);
