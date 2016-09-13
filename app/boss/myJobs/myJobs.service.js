var boss = require('../boss.js');

boss.factory('MyJobsService', ['$http', function($http){
	var self = this;

	self.getMyJobs = function() {
		return $http.get('api/myJobs.php')
				.then(function(response) {
					if(response.data.success) {
						return response.data;
					}
				});
	};

	return self;
}]);
