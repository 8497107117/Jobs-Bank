var angular = require('angular');
var ngRoute = require('angular-route');
var ngMessages = require('angular-messages');
var bankApp = angular.module('Bank', ['ngRoute', 'ngMessages', 'Page', 'JobsList', 'Boss', 'User', 'Register', 'Log']);

bankApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({
		enable: true,
		requireBase: false
	}).hashPrefix('!');

	$routeProvider
		.when('/', {
			controller: 'JobsListCtrl',
			controllerAs: 'JobsList',
			templateUrl: 'app/jobsList/jobsList.html',
			name: 'Index'
		})
		.when('/jobsList', {
			controller: 'JobsListCtrl',
			controllerAs: 'JobsList',
			templateUrl: 'app/jobsList/jobsList.html',
			name: 'Jobs List'
		})
		.when('/myJobs', {
			controller: 'MyJobsCtrl',
			controllerAs: 'MyJobs',
			templateUrl: 'app/boss/myJobs/myJobs.html',
			name: 'My Jobs'
		})
		.when('/usersList', {
			controller: 'UsersListCtrl',
			controllerAs: 'UsersList',
			templateUrl: 'app/boss/usersList/usersList.html',
			name: 'Users List'
		})
		.when('/favoriteList', {
			controller: 'FavoriteListCtrl',
			controllerAs: 'FavoriteList',
			templateUrl: 'app/user/favoriteList/favoriteList.html',
			name: 'Favorite List'
		})
		.when('/register/boss', {
			controller: 'BossRegisterCtrl',
			controllerAs: 'BossRegister',
			templateUrl: 'app/register/boss/bossRegister.html',
			name: 'Boss Register'
		})
		.when('/register/user', {
			controller: 'UserRegisterCtrl',
			controllerAs: 'UserRegister',
			templateUrl: 'app/register/user/userRegister.html',
			name: 'User Register'
		})
		.when('/login', {
			controller: 'LoginCtrl',
			controllerAs: 'Login',
			templateUrl: 'app/log/login.html',
			name: 'Login'
		})
		.when('/logout', {
			controller: 'LogoutCtrl',
			controllerAs: 'Logout',
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
}])
.run(['LoginService', function(LoginService) {
	LoginService.session();
}]);

module.exports = bankApp;
