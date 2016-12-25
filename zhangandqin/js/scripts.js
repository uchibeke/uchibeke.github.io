'use strict';

var imageAssets = {};
$.getJSON("js/imageInfo.json", function(imgInfoArray) {
	console.log(imgInfoArray);
	for (var i = 0; i < imgInfoArray.length; i++) {
		var asset = imgInfoArray[i];
		imageAssets[asset.itemName] = {};
		imageAssets[asset.itemName].name = asset.itemName;
		imageAssets[asset.itemName].images = getAsset(asset.path, asset.imgType, asset.numOfItems);
	}
	console.log(imageAssets);
});

function getAsset(dir, imgFormat, numOfItems) {
	var assetArrName = [];
	var ind = 0;
	while (ind <= numOfItems) {
		assetArrName.push(dir + "/" + ind + "." + imgFormat);
		ind++;
	}
	return assetArrName;
}

var windowW = window.innerWidth;
var windowH = window.innerHeight;

$(window).resize(function() {
	windowW = window.innerWidth;
	windowH = window.innerHeight;
	setGallerySize();
});

// Substract width of window padding and with of margin
var galleryItemSize = (window.innerWidth - 30);
setGallerySize();

function setGallerySize() {
	if (window.innerWidth < 480) {
		galleryItemSize = galleryItemSize;
	} else if (window.innerWidth < 992) {
		galleryItemSize = galleryItemSize / 2;
	} else {
		galleryItemSize = galleryItemSize / 3;
	}
}

$(function() {
	var $container = $('#aboutContainer').masonry({
		itemSelector : '.aboutItem',
		columnWidth : galleryItemSize
	});

	// reveal initial images
	$container.masonryImagesReveal($('#aboutImages').find('.aboutItem'));
});

$.fn.masonryImagesReveal = function($items) {
	var msnry = this.data('masonry');
	var itemSelector = msnry.options.itemSelector;
	// hide by default
	$items.hide();
	// append to container
	this.append($items);
	$items.imagesLoaded().progress(function(imgLoad, image) {
		// get item
		// image is imagesLoaded class, not <img>, <img> is image.img
		var $item = $(image.img).parents(itemSelector);
		// un-hide item
		$item.show();
		// masonry does its thing
		msnry.appended($item);
	});

	return this;
};
// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
// At least Safari 3+: "[object HTMLElementConstructor]"
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;
