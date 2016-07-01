bank.directive('onFinishRender', function($timeout){
	return{
		restrict: 'A',
		link: function(scope, element, attr){
			$timeout(function(){
				scope.$emit(attr.onFinishRender, element);
			});
		}
	};
});
bank.controller('controller', ['$scope', '$http', '$location', '$sce', function($scope, $http, $location, $sce){
	var load = function(config){
		$scope[config.name] = $scope[config.name] || {};
		$http({url: config.url})
			.then(function successCallback(response){
				if(response.data.success){
					$scope[config.name] = response.data;
					(config.onSuccess || angular.noop)(response.data);
				}
				else {
					(config.onError || angular.noop)(response.data);
				}
			}, function errorCallback(response){
				(config.onError || angular.noop)(response.data);
			});
	};
	$scope.$on('triggerDropdown', function(attr, element){
		if(element){
			var $element = $(element);
			if($element.hasClass('ui dropdown'))
				$element.dropdown();
			else
				$element.closest('.ui.dropdown').dropdown();
		}
		else{
			$('.ui.dropdown').dropdown();
		}
	});
	$scope.$on('$routeChangeSuccess', function(event, current){
		$scope.currentPage.name = current.name || 'Index';
		$scope.currentPage.path = $location.path();
	});
	$scope.$on('$routeChangeError', function (event, current, previous, rejection) {
		$scope.$emit('redirect', '/error');
	});
	$scope.$on('redirect', function(event, dir){
		$location.path(dir).replace();
	});
	$scope.$on('loginStatus', function(event){
		load({
			name: 'status',
			url: 'api/status.php',
			onSuccess: function(data){
				if($scope.check.login() && $scope.check.user()){
					$scope.navInfo =[
						{name: $sce.trustAsHtml('<p>Hi ' + $scope.status.name + '</p>')},
						{name: 'Jobs',
						 menu:[
						 {name: 'List All Jobs', href: '#!/jobsList'},
						 {name: 'My Favorite Jobs', href: '#!/favoriteList'}
						 ],
						 icon: 'List'},
						{name: 'Logout', href: '#!/logout', icon: 'sign out'}
					];
				}
				else if($scope.check.login() && $scope.check.boss()){
					$scope.navInfo =[
						{name: $sce.trustAsHtml('<p>Hi ' + $scope.status.name + '</p>')},
						{name: 'Jobs',
						 menu:[
						 {name: 'List All Jobs', href: '#!/jobsList' },
						 {name: 'List My Jobs', href: '#!/myJobs' }
						 ],
						 icon: 'List'},
						{name: 'Users', href: '#!/userList', icon: 'users' },
						{name: 'Logout', href: '#!/logout', icon: 'sign out'}
					];
				}
				else{
					$scope.navInfo = [
						{name: 'Jobs', href: '#!/jobsList', icon: 'list'},
						{name: 'Join us',
						 menu:[
						 {name: 'user', href: '#!/register/user'},
						 {name: 'boss', href: '#!/register/boss'}
						 ],
						 icon : 'add user'},
						{name: 'Login', href: '#!/login', icon: 'sign in'}
					];
				}
			}
		});
	});
	$scope.check = {
		login: function(){
			return $scope.status.isLogin;
		},
		user: function(){
			return $scope.check.login() && $scope.status.type == 'user';
		},
		boss: function(){
			return $scope.check.login() && $scope.status.type == 'boss';
		}
	};
	$scope.currentPage = { name: 'Index'};
	$scope.config = { title: '404 Not Found Bank'};
	$scope.$emit('loginStatus');
}]);

bank.controller('showJobsListCtrl', ['$scope', function($scope){
	$scope.list = "JobsList";
}]);

bank.controller('bossRegisterCtrl', ['$scope', function($scope){

}]);

bank.controller('loginCtrl', ['$scope', '$http', function($scope, $http){
	$scope.loginForm = {message: '', name: '', password: ''};
	$scope.error = {message: false, name: false, password: false};
	$scope.setError = function(status){
		return {
			error: status,
			positive: !status
		};
	};
	if($scope.check.login())
		$scope.$emit('redirect', '/');
	else{
		$scope.login = function(){
			$http({method: 'POST',
				url:'api/login.php',
				data: {name: $scope.loginForm.name, password: $scope.loginForm.password},
				headers: {'Content-Type': 'application/json'}
			})
			.then(function successCallback(response){
				if(response.data.success){
					$scope.$emit('loginStatus');
					$scope.$emit('redirect', '/');
				}
				else{
					$scope.error.message = true;
					$scope.error.name = ($scope.loginForm.name == "");
					$scope.error.password = ($scope.loginForm.password == "");
					if(!$scope.error.name && !$scope.error.password)
						$scope.loginForm.message = "\"" + $scope.loginForm.name + "\" is not existed or password is wrong.";
					else if($scope.error.name && !$scope.error.password)
						$scope.loginForm.message = "Please enter your name.";
					else if(!$scope.error.name && $scope.error.password)
						$scope.loginForm.message = "Please enter your password.";
					else
						$scope.loginForm.message = "Please enter your name & password.";
				}
			}, function errorCallback(response){
				$scope.error.message = "Request Wrong.";
			});
		}
	}
}]);

bank.controller('logoutCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){
	if($scope.check.login()){
		$http({method: 'GET', url: 'api/logout.php'})
			.then(function successCallback(response){
				if(response.data.success)
					$scope.$emit('loginStatus');
				else
					$window.alert('Logout error!');
			}, function errorCallback(response){
				$window.alert('Logout error!');
			});
	}
	$scope.$emit('redirect', '/');
}]);
