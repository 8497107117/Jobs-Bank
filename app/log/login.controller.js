var log = require('./log.js');

log.controller('LoginCtrl', ['$scope', 'LoginService', function($scope, LoginService) {
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

	self.login = function() {
		LoginService.login(self.lForm)
		.then(function(response){
			self.fail = !response;
			if(!self.fail) {
				LoginService.session();
				$scope.$emit('redirect', '/');
			}
		});
	};

	self.init = function(form) {
		if(form) {
			form.$setPristine();
			form.$setUntouched();
		}
		self.lForm = angular.copy({name: '', password: ''});
		self.fail = false;
	};
}]);
