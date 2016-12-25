var uchiApp = angular.module('uchiApp', []);

uchiApp.controller('uchisController', ['$scope', '$http', '$timeout',
function($scope, $http, $timeout) {

	$scope.data = {};
	d = $scope.data;

	d.convo = [];
	d.dialog = allTExt;
	console.log(d.dialog);

	d.current = {};

	$scope.actions = {};
	a = $scope.actions;

	$scope.view = {};
	v = $scope.view;
	v.showing = {};

	a.respond = function(key) {
		d.current = d.convo[key];
		var aSize = d.current.opts.length;
		console.log(d.current);
	};

	a.ask = function(key) {
		var toshow = d.dialog[key];
		v.showing.q = toshow.q[Math.floor(Math.random() * toshow.q.length)];
		v.showing.opts = toshow.opts;
		console.log(v.showing.opts);
	};

	a.updateConvo = function(key) {
		d.convo.push({
			"text" : v.showing.q,
			type : "q"
		});
		d.convo.push({
			"text" : key,
			"type" : "a"
		});
		a.ask(key);
	};
	a.ask("welcome");
	a.updateConvo("-");

}]);
