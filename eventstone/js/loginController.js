var loginControllers = angular.module('loginControllers', ['ngStorage', 'ngSanitize', "firebase"]);

loginControllers.controller('LoginController', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', 'analytics', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'shareDataService', '$location',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, analytics, $firebaseObject, $firebaseArray, $firebaseAuth, shareDataService, $location) {

	$scope.$storage = $localStorage.$default({
		guestsList : $scope.guests
	});

	// Accepts twiter, facebook or google
	$scope.login = function(loginMethod) {

		var auth = $firebaseAuth();

		auth.$signInWithPopup(loginMethod).then(function(firebaseUser) {
			if (firebase.auth().currentUser) {
				console.log('FB User in login:');
				console.log(firebaseUser);
				$rootScope.$storage.user = firebaseUser;
				$rootScope.$storage.user.token = firebaseUser.credential.accessToken;
				var user = firebaseUser.user;
				$rootScope.$storage.user.signInUser = user;
				var allRef = firebase.database().ref().child("/users/" + user.uid + "/");
				$scope.$storage.allEvents = $firebaseArray(allRef);

				var ref = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/");
				$scope.$storage.currentEvent = $firebaseArray(ref);

				var guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/guests");
				$scope.$storage.guestsList = $firebaseArray(guestRef);
				$location.path('/home')
				location.reload();
			} else {
				event.preventDefault();
				$location.path('/login');
			}
		}).catch(function(error) {
			console.log("Authentication failed:", error);
		});
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

	$scope.logOut = function() {
		var auth = $firebaseAuth();
		console.log(firebase.auth() + " logging out");
		firebase.auth().signOut().then(function(result) {
			// Sign-out successful.
			if (isChrome) {
				delete $localStorage.user;
			} else {
				$localStorage.$reset($scope.$storage.user);
			}

		}, function(error) {
			console.log(error);
		});
		if ($location.path('/login')) {
			location.reload();
		}
	};
}]);

myApp.service('shareDataService', function() {
	var property = [];

	return {
		getProperty : function(key) {
			return property[key];
		},
		setProperty : function(key, value) {
			property[key] = value;
		}
	};
});
