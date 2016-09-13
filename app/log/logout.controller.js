var log = require('./log.js');

log.controller('LogoutCtrl', ['$scope', 'LoginService', function($scope, LoginService) {
	var self = this;

	self.logout = function() {
		LoginService.logout();
		LoginService.session();
	};

	if(LoginService.getStatus().isLogin) {
		self.logout();
	}
	$scope.$emit('redirect', '/');
}]);
