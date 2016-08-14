var myApp = angular.module('myApp', ['ngRoute', 'guestControllers', 'ticketControllers', 'analytics', 'firebase']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/list', {
		templateUrl : 'partials/list.html',
		controller : 'GuestController'
	}).when('/populate', {
		templateUrl : 'partials/setup/populate.html',
		controller : 'GuestController'
	}).when('/addticket', {
		templateUrl : 'partials/setup/addticket.html',
		controller : 'GuestController'
	}).when('/home', {
		templateUrl : 'partials/home.html',
		controller : 'GuestController'
	}).when('/live', {
		templateUrl : 'partials/live.html',
		controller : 'GuestController'
	}).when('/guestList', {
		templateUrl : 'partials/guestList.html',
		controller : 'GuestController'
	}).when('/tickets', {
		templateUrl : 'partials/design/makeTicket.html',
		controller : 'TicketController'
	}).when('/nameBadge', {
		templateUrl : 'partials/design/makeNameBadge.html',
		controller : 'TicketController'
	}).when('/aboutconf', {
		templateUrl : 'partials/about_conf.html',
		controller : 'TicketController'
	}).when('/aboutparty', {
		templateUrl : 'partials/about_party.html',
		controller : 'TicketController'
	}).when('/aboutlive', {
		templateUrl : 'partials/about_live.html',
		controller : 'TicketController'
	}).when('', {
		templateUrl : 'partials/home.html',
		controller : 'GuestController'
	}).otherwise({
		redirectTo : '/home'
	});
}]);

myApp.run(['$rootScope', '$location', '$firebaseAuth', 'shareDataService',
function($rootScope, $location, $firebaseAuth, shareDataService) {
	var auth = $firebaseAuth();
	var user = firebase.auth().currentUser;
	$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {

		if (firebase.auth().currentUser == null) {
			// auth.$signInWithPopup("twitter").then(function(firebaseUser) {
			// auth.$signInWithPopup("google").then(function(firebaseUser) {
			auth.$signInWithPopup("facebook").then(function(firebaseUser) {
				if (firebase.auth().currentUser) {
					// console.log("Signed in as:", firebaseUser.user.displayName);
					// console.log('ALLOW');
					// console.log(logged.uid);
					// console.log(currRoute.originalPath);
					$location.path(currRoute.originalPath);
				} else {
					// console.log('DENY ');
					// console.log(logged);
					event.preventDefault();
					$location.path('/home');
				}
			}).catch(function(error) {
				console.log("Authentication failed:", error);
			});
		}
		var logged = firebase.auth().currentUser;
		shareDataService.setProperty('signedInUser', firebase.auth().currentUser);
	});
}]);
