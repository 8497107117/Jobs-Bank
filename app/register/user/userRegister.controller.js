var register = require('../register.js');

register.controller('UserRegisterCtrl', ['$scope', 'LoginService', 'UserRegisterService', function($scope, LoginService, UserRegisterService) {
	if(LoginService.getStatus().isLogin) {
		$scope.$emit('redirect', '/');
	}

	var self = this;

	UserRegisterService.getSelectionData()
	.then(function(response) {
		self.selectionData = response;
	});

	self.setError = function(status) {
		return {
			error: status,
			positive: !status
		};
	};

	self.getSelectValue = function(a, data) {
		self.rForm[a] = data;
	}

	self.register = function() {
		//get specialty here since dropdown delay
		self.rForm.specialty = $('.ui.multiple.dropdown').dropdown('get value');

		UserRegisterService.register(self.rForm)
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
		self.rForm = angular.copy({name: '', password: '', verify: '', level: '', salary: '',
						phone: '', gender: '', age: '', email: '', specialty: ''});
		$('.ui.selection.dropdown').dropdown('clear');
	}
}]);
