angular.module('Platform.directives')
	.directive('player', ['levelObjects'
		, function (levelObjects) {
			return {
				restrict: 'E',
				require:'^screen',
				replace: true,
				scope: {
					x: '=',
					y: '=',
					speed: '=',
					jump: '='
				},
				templateUrl: '/AppJs/Platform/views/directives/playerDirective.html',
				link: function ($scope, element, attrs, screenCtrl) {
					$scope.screenBottom = $scope.y * screenCtrl.getTileDimension().height + 20;
					$scope.screenLeft = $scope.x * screenCtrl.getTileDimension().width;

					levelObjects.addPlayer(element, { x: $scope.x, y: $scope.y, speed: $scope.speed, jump: $scope.jump * (screenCtrl.getTileDimension().height) + element.height() * 2, scope: $scope });
				}
			};
		}]);