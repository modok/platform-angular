angular.module('Platform.directives')
	.directive('score', [function () {
		return {
			restrict: 'E',
			replace: true,
			scope: {
			},
			templateUrl: '/AppJs/Platform/views/directives/scoreDirective.html',
			link: function ($scope) {
				$scope.score = 0;

				$scope.$on('score', function () {
					$scope.score = $scope.score + 1;
					$scope.$digest();
				});
			}
		};
	}]);