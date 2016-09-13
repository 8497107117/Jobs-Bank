var register = require('../register.js');

register.factory('BossRegisterService', ['$http', function($http) {
	var self = this;

	self.register = function(data) {
		return $http({
					method: 'POST',
					url: 'api/bossRegister.php',
					data: data,
					headers: {'Content-Type': 'application/json'}
				})
				.then(function(response) {
					return response.data.success;
				});
	};

	return self;
}]);
