var page = require('./page.js');

page.directive('onFinishRender', function($timeout) {
	return {
		restrict: 'A',
		link: function($scope, $element, $attrs) {
			$timeout(function() {
				$scope.$emit($attrs.onFinishRender, $element);
				/*For minifize
				  $scope.$emit('triggerDropdown', $element);*/
			});
		}
	};
});
