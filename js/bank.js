var bank = angular.module('bank', ['ngRoute']);

bank.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$locationProvider.html5Mode({
		enable: true,
		requireBase: false
	}).hashPrefix('!');
	$routeProvider
		.when('/', {
			controller: 'showJobsListCtrl',
			templateUrl: 'js/view/showJobsList.html',
			name: 'Index'
		})
		.when('/register/boss', {
			controller: 'bossRegisterCtrl',
			templateUrl: 'js/view/bossRegister.html',
			name: 'Boss Register'
		})
		.when('/login', {
			controller: 'loginCtrl',
			templateUrl: 'js/view/login.html',
			name: 'Login'
		})
		.when('/logout', {
			controller: 'logoutCtrl',
			template: '',
			name: 'Logout'
		})
		.when('/error', {
			template: '<h1>404 Not Found!!!</h1>',
			name: 'Error'
		})
		.otherwise({
			redirectTo: '/error'
		});
}]);
