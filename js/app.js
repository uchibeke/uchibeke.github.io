var myApp = angular.module('myApp', ['ngRoute', 'guestControllers', 'analytics']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/portfolio/', {
		templateUrl : 'views/home.html',
		controller : 'ListController'
	}).when('/about/', {
		templateUrl : 'views/about.html',
		controller : 'ListController'
	}).otherwise({
		redirectTo : '/portfolio/'
	});
}]);
myApp.run(['$rootScope', '$location',
function($rootScope, $location) {

	$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
		if (currRoute.originalPath == '/about/') {
			$rootScope.tog = 1;
		} else if (currRoute.originalPath == '/portfolio/') {
			$rootScope.tog = 2;
		}
	});
}]);
