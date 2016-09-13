var register = require('../register.js');

register.factory('UserRegisterService', ['$http', function($http) {
	var self = this;

	self.getSelectionData = function() {
		return $http.get('api/getSpecialty.php')
				.then(function(response) {
					return {
						gender: ['Male', 'Female', 'Others'],
						level: ['SSS', 'SS', 'S', 'A', 'B', 'C', 'D', 'E'],
						specialty: response.data
					};
				});
	};

	self.register = function(data) {
		return $http({
					method: 'POST',
					url: 'api/userRegister.php',
					data: data,
					headers: {'Content-Type': 'application/json'}
				})
				.then(function(response) {
					return response.data.success;
				});
	};

	return self;
}]);
