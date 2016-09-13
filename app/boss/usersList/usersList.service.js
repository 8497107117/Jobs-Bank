var boss = require('../boss.js');

boss.factory('UsersListService', ['$http', function($http) {
	var self = this;

	self.getUsersList = function() {
		return $http.get('api/usersList.php')
				.then(function(response) {
					if(response.data.success) {
						return response.data;
					}
				});
	};

	return self;
}]);
