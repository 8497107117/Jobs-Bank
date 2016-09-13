var jobsList = require('./jobsList.js');

jobsList.factory('JobsListService', ['$http', function($http) {
	var self = this;

	self.getJobs = function(){
		return $http.get('api/jobsList.php')
				.then(function(response) {
					return response.data;
				});
	};

	self.getFavoriteJobs = function(){
		return $http.get('api/favoriteList.php')
				.then(function(response) {
					return response.data;
				});
	};

	self.getSelectionData = function() {
		return $http.get('api/getOccLoc.php')
				.then(function(response) {
					return {
						workingTime: ['Morning', 'Afternoon', 'Night'],
						level: ['SSS', 'SS', 'S', 'A', 'B', 'C', 'D', 'E'],
						occupation: response.data.occupation,
						location: response.data.location
					};
				});
	};

	self.setFavorite = function(data) {
		return $http({
					method: 'POST',
					url: 'api/changeFavorite.php',
					data: data,
					headers: {'Content-Type': 'application/json'}
				})
				.then(function(response) {
					return response.data;
				});
	};

	self.setApply = function(data) {
		return $http({
					method: 'post',
					url: 'api/apply.php',
					data: data,
					headers: {'Content-type': 'application/json'}
				})
				.then(function(response) {
					return response.data;
				});
	};

	self.editJob = function(data) {
		return $http({
					method: 'POST',
					url: 'api/editJob.php',
					data: data,
					headers: {'Content-Type': 'application/json'}
				})
				.then(function(response) {
					return response.data.success;
				});
	};

	self.deleteJob = function(data) {
		return $http({
					method: 'POST',
					url: 'api/deleteJob.php',
					data: data,
					headers: {'Content-Type': 'application/json'}
				})
				.then(function(response) {
					return response.data.success;
				});
	};

	self.postJob = function(data) {
		return $http({
					method: 'POST',
					url: 'api/postJob.php',
					data: data,
					headers: {'Content-Type': 'application/json'}
				})
				.then(function(response) {
					return response.data;
				});
	};

	return self;
}]);
