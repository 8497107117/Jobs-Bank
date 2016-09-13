var jobsList = require('./jobsList.js');

jobsList.controller('JobsListCtrl', ['LoginService', 'JobsListService', function(LoginService, JobsListService) {
	var self = this;

	self.Auth = LoginService;

	JobsListService.getJobs()
	.then(function(response) {
		self.jobs = response;
	});

	self.postPattern = false;
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

	self.changeEditPattern = function(index) {
		if(self.jobs[index].editPattern) {
			self.jobs[index].editPattern = false;
		}
		else {
			self.eJob = angular.copy(self.jobs[index]);
			//Do one operation in one time
			angular.forEach(self.jobs, function(j, i) {
				self.jobs[i].editPattern = false;
			});
			self.postPattern = false;
			self.jobs[index].editPattern = true;
		}
	};

	self.changePostPattern = function(form) {
		if(self.postPattern) {
			self.postPattern = false;
		}
		else {
			if(form) {
				form.$setPristine();
				form.$setUntouched();
			}
			self.pJob = angular.copy({occupation: '', location: '', workingTime: '', level: '',
										experience: '', salary: ''});
			$('.ui.selection.dropdown').dropdown('clear');
			self.postPattern = true;
			//Do one operation in one time
			angular.forEach(self.jobs, function(j, i) {
				self.jobs[i].editPattern = false;
			});
		}
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
				self.jobs[index].favorite = response.favorite;
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

	self.editJob = function(index, id) {
		JobsListService.editJob({recruit: id, data: self.eJob})
		.then(function(response) {
			if(response) {
				console.log(self.eJob);
				self.jobs[index] = self.eJob;
				self.jobs[index].editPattern = false;
			}
		});
	};

	self.deleteJob = function(index, id) {
		JobsListService.deleteJob({recruit: id})
		.then(function(response) {
			if(response) {
				//remove deleted job
				self.jobs.splice(index, 1);
			}
		});
	};

	self.initPost = function() {
		self.pJob = angular.copy({occupation: '', location: '', workingTime: '', level: '',
								experience: '', salary: ''});
		$('.ui.selection.dropdown').dropdown('clear');
	};

	self.postJob = function() {
		JobsListService.postJob({data: self.pJob})
		.then(function(response) {
			if(response.success) {
				self.pJob.id = response.id;
				self.pJob.edit = true;
				self.pJob.editPattern = false;
				self.jobs.push(self.pJob);
				self.postPattern = false;
			}
		});
	};
}]);
