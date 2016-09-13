var boss = require('../boss.js');


boss.controller('MyJobsCtrl', ['$scope', 'LoginService', 'JobsListService', 'MyJobsService', function($scope, LoginService, JobsListService, MyJobsService) {
	if(!LoginService.getStatus().isLogin || LoginService.getStatus().type != 'boss') {
		$scope.$emit('redirect', '/');
	}

	var self = this;

	MyJobsService.getMyJobs()
	.then(function(response) {
		self.jobs = response;
	});

	self.showAttr = function(k) {
		return k != 'boss' && k != 'whoApply' && k != 'specialty';
	};

	self.isNull = function(v) {
		return angular.equals(v, null);
	};

	self.deleteJob = function(index, id) {
		JobsListService.deleteJob({recruit: id})
		.then(function(response) {
			if(response) {
				//remove deleted job
				delete self.jobs[index];
			}
		});
	};
}]);
