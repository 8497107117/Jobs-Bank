var register = require('./register.js');

register.directive('checkName', ['$http', function($http) {
	return {
		require: 'ngModel',
		link: function($scope, $element, $attrs, ctrl) {
			function check(value) {
				var request = {name: value};
				$http({
					method: 'POST',
					url: 'api/checkName.php',
					data: request,
					headers: {'Content-Type': 'application/json'}
				})
				.then(function(response) {
					if(response.data.exist == false) {
						ctrl.$setValidity('nameExist', true);
					}
					else{
						ctrl.$setValidity('nameExist', false);
					}
				});
				return value;
			}
			ctrl.$parsers.push(check);
		}
	};
}])
.directive('checkVerify', function() {
	return {
		require: 'ngModel',
		link: function($scope, $element, $attrs, ctrl) {
			function check(value){
				if(angular.isDefined($scope.bossRegister)) {
					var tmp = $scope.bossRegister.rForm.password;
				}
				else if(angular.isDefined($scope.userRegister)) {
					var tmp = $scope.userRegister.rForm.password;
				}
				if(tmp == value) {
					ctrl.$setValidity('samePass', true);
				}
				else {
					ctrl.$setValidity('samePass', false);
				}
				return value;
			}
			ctrl.$parsers.push(check);
		}
	};
});
