angular.module('Platform.directives')
	.directive('screen', ['screenService', function (screenService) {
		return {
			restrict: 'E',
			replace: true,
			priority: 1,
			transclude: true,
			scope: {
				width: '=',
				height: '='
			},
			controller: function ($scope) {
				this.getTileDimension = function () {
					return $scope.tileDimension;
				}
			},
			templateUrl: '/AppJs/Platform/views/directives/screenDirective.html',
			link: {
				pre: function (scope) {
					screenService.setGridDimension(scope.width, scope.height);
					scope.tileDimension = screenService.getTileDimension();
				}
			}
		};
	}]);