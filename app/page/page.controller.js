var page = require('./page.js');

page.controller('PageCtrl', ['$scope', '$location', 'LoginService', function($scope, $location, LoginService) {
	var self = this;

	self.currentPage = {name: 'Index'};
	self.config = {title: '404 Not Found Bank'};

	self.Auth = LoginService;

	$scope.$on('$routeChangeSuccess', function(event, current) {
		self.currentPage.name = current.name || 'Index';
		self.currentPage.path = $location.path();
	});

	$scope.$on('redirect', function(event, dir){
		$location.path(dir).replace();
	});

	$scope.$on('triggerDropdown', function(attr, element) {
		if(element) {
			var $element = $(element);
			if($element.hasClass('ui dropdown')) {
				$element.dropdown();
			}
			else {
				$element.closest('.ui.dropdown').dropdown();
			}
		}
		else {
			$('.ui.dropdown').dropdown();
		}
	});
}]);
