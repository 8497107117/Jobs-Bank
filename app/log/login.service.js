var log = require('./log.js');

log.factory('LoginService', ['$http', function($http) {
	var status = {isLogin: false, id: '', name: '', type: ''};

	var self = this;

	self.getStatus = function() {
		return status;
	};

	self.session = function() {
		return $http.get('api/status.php')
				.then(function(response) {
					status = response.data;
					return status;
				});
	};

	self.login = function(data) {
		return $http({
					method: 'POST',
					url: 'api/login.php',
					data: data,
					headers: {'Content-Type': 'application/json'}
				})
				.then(function(response) {
					if(response.data.success) {
						return true;
					}
					else {
						return false;
					}
				});
	};

	self.logout = function() {
		$http.get('api/logout.php')
		.then(function(response) {
			status = angular.copy({isLogin: false, id: '', name: '', type: ''});
		});
	};

	return self;
}]);
