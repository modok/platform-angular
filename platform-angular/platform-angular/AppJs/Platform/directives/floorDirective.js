angular.module('Platform.directives')
	.directive('floor', ['levelObjects'
		, function (levelObjects) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
			},
			templateUrl: '/AppJs/Platform/views/directives/floorDirective.html',
			link: function ($scope, element) {
				levelObjects.setFloor(element);
			}
		};
	}]);