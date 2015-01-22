angular.module('Platform.directives')
	.directive('start', ['screenService', 'physicService', 'collideService', 'levelObjects'
		, function (screenService, physicService, collideService, levelObjects) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
			},
			templateUrl: '/AppJs/Platform/views/directives/startDirective.html',
			link: function ($scope) {
				$scope.isStarted = false;
				$scope.start = function () {
					collideService.init(levelObjects);
					screenService.run();
					physicService.activate();
					
					$scope.isStarted = true;
				};

			}
		};
	}]);