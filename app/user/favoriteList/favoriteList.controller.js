var user = require('../user.js');

user.controller('FavoriteListCtrl', ['$scope', 'LoginService', 'JobsListService', function($scope, LoginService, JobsListService) {
	if(!LoginService.getStatus().isLogin || LoginService.getStatus().type != 'user') {
		$scope.$emit('redirect', '/');
	}

	var self = this;

	JobsListService.getFavoriteJobs()
	.then(function(response) {
		self.jobs = response;
	});

	JobsListService.getSelectionData()
	.then(function(response) {
		self.selectionData = response;
	});

	self.setError = function(status) {
		return {
			error: status,
			positive: !status
		};
	};

	self.divide = function(k) {
		//Divide jobs data & operation data
		return k != 'id' && k != 'boss' && k != 'favorite' && k != 'apply' && k != 'edit' && k != 'editPattern';
	};

	self.setToggle = function(status) {
		return {
			yellow: status,
			white: !status
		};
	};

	self.divideType = function(k) {
		//Divide input data
		return k == 'experience' || k == 'salary';
	};

	self.searchOptions = ['occupation', 'location', 'workingTime', 'level'];
	self.sortOrder = ['+id'];

	self.changeSortOrder = function(option) {
		self.sortOrder = option ? ['+salary', '+id'] : ['-salary', '+id'];
	};

	self.search = function(sJob) {
		return function(job) {
			return (job.occupation === sJob.occupation || sJob.occupation === '') &&
					(job.location === sJob.location || sJob.location === '') &&
					(job.workingTime === sJob.workingTime || sJob.workingTime === '') &&
					(job.level === sJob.level || sJob.level === '') &&
					(job.experience <= sJob.experience || sJob.experience === '' || sJob.experience === null) &&
					(job.salary >= sJob.salary || sJob.salary === '' || sJob.salary === null);
		};
	};

	self.initSearch = function() {
		self.sJob = angular.copy({occupation: '', location: '', workingTime: '', level: '',
								experience: '', salary: ''});
		self.sortOrder = ['+id'];
		$('.ui.selection.dropdown').dropdown('clear');
	};

	self.setStep = function(k) {
		return k == 'experience' ? 1 : 1000;
	};

	self.getSelectValue = function(type, k, data) {
		if(type == 'edit') {
			self.eJob[k] = data;
		}
		else if(type == 'post') {
			self.pJob[k] = data;
		}
		else if(type == 'search') {
			self.sJob[k] = data;
		}
	}

	self.setFavorite = function(index, id) {
		JobsListService.setFavorite({recruit: id})
		.then(function(response) {
			if(response.success) {
				//remove unFavorite
				self.jobs.splice(index, 1);
			}
		});
	};

	self.setApply = function(index, id) {
		JobsListService.setApply({recruit: id})
		.then(function(response) {
			if(response.success) {
				self.jobs[index].apply = response.apply;
			}
		});
	};
}]);
