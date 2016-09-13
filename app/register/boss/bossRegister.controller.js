var register = require('../register.js');

register.controller('BossRegisterCtrl', ['$scope', 'LoginService', 'BossRegisterService', function($scope, LoginService, BossRegisterService) {
	if(LoginService.getStatus().isLogin) {
		$scope.$emit('redirect', '/');
	}

	var self = this;

	self.setError = function(status) {
		return {
			error: status,
			positive: !status
		};
	};

	self.register = function() {
		BossRegisterService.register(self.rForm)
		.then(function(response) {
			if(response) {
				$scope.$emit('redirect', '/');
			}
		});
	}

	self.init = function(form) {
		if(form) {
			form.$setPristine();
			form.$setUntouched();
		}
		self.rForm = angular.copy({name: '', password: '', verify: '', phone: '', email: ''});
	}
}]);
