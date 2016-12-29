var myApp = angular.module('myApp', ['ngRoute', 'mainControllers', 'ticketControllers', 'loginControllers', 'analytics', 'firebase']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/list', {
		templateUrl : 'partials/list.html',
		controller : 'MainController'
	}).when('/populate', {
		templateUrl : 'partials/setup/populate.html',
		controller : 'MainController'
	}).when('/newevent', {
		templateUrl : 'partials/setup/newevent.html',
		controller : 'MainController'
	}).when('/home', {
		templateUrl : 'partials/home.html',
		controller : 'MainController'
	}).when('/live', {
		templateUrl : 'partials/live.html',
		controller : 'MainController'
	}).when('/guestList', {
		templateUrl : 'partials/guestList.html',
		controller : 'MainController'
	}).when('/tickets', {
		templateUrl : 'partials/design/makeTicket.html',
		controller : 'TicketController'
	}).when('/namebadge', {
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
		controller : 'MainController'
	}).when('/dashboard', {
		templateUrl : 'partials/dashboard.html',
		controller : 'MainController'
	}).when('/login', {
		templateUrl : 'partials/login.html',
		controller : 'LoginController'
	}).when('/register', {
		templateUrl : 'partials/register.html',
		controller : 'LoginController'
	}).when('/new', {
		templateUrl : 'partials/setup/new.html',
		controller : 'MainController'
	}).otherwise({
		redirectTo : '/home'
	});
}]);
// Condition base:
// http://stackoverflow.com/questions/11541695/redirecting-to-a-certain-route-based-on-condition

myApp.run(['$rootScope', '$location', '$firebaseAuth', '$localStorage', 'shareDataService',
function($rootScope, $location, $firebaseAuth, $localStorage, shareDataService) {
	$rootScope.$storage = $localStorage.$default({
		g : $rootScope.guests
	});
	$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
		var isAuth = $firebaseAuth().$getAuth();
		if ($rootScope.$storage.hasOwnProperty('user') && $rootScope.$storage.user.hasOwnProperty('token') && $rootScope.$storage.user.token != undefined) {
			$location.path(currRoute.originalPath);
			$rootScope.selectedPage = highlightedNav[$location.path()] ? highlightedNav[$location.path()] : "";
			console.log($rootScope.selectedPage);
		} else {
			console.log('DENY ');
			if (currRoute.originalPath == '/login') {
				$location.path('/login');
			} else {
				$location.path('/home');
			}
		}
		shareDataService.setProperty('signedInUser', firebase.auth().currentUser);
	});
}]);

var highlightedNav = {
	'/' : 'home',
	'/login' : 'login',
	'/new' : 'new',
	'/dashboard' : 'dash',
	'/live' : 'live',
	'/about' : 'about',
};
