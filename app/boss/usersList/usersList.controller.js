var boss = require('../boss.js');

boss.controller('UsersListCtrl', ['$scope', 'LoginService', 'UsersListService', function($scope, LoginService, UsersListService) {
	if(!LoginService.getStatus().isLogin || LoginService.getStatus().type != 'boss') {
		$scope.$emit('redirect', '/');
	}

	var self = this;

	UsersListService.getUsersList()
	.then(function(response) {
		self.users = response;
	});

	self.divide = function(v) {
		return angular.isArray(v) || angular.equals(v, null);
	};

	self.isNull = function(v) {
		return angular.equals(v, null);
	};
}]);
