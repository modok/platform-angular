angular.module('Platform.directives')
	.directive('platform', ['levelObjects'
		, function (levelObjects) {
			return {
				restrict: 'E',
				require:'^screen',
				replace: true,
				scope: {
					x: '=',
					y: '=',
					width: '=',
					height: '='
				},
				templateUrl: '/AppJs/Platform/views/directives/platformDirective.html',
				link: function ($scope, element, attrs, screenCtrl) {
					$scope.screenWidth = $scope.width * screenCtrl.getTileDimension().width;
					$scope.screenHeight = $scope.height * screenCtrl.getTileDimension().height;
					$scope.screenBottom = $scope.y * screenCtrl.getTileDimension().height + 20;
					$scope.screenLeft = $scope.x * screenCtrl.getTileDimension().width;

					levelObjects.addPlatform(element, {
						x: $scope.x,
						y: $scope.y,
						width: $scope.width,
						height: $scope.height,
						screenWidth: $scope.screenWidth,
						screenHeight: $scope.screenHeight,
						screenBottom: $scope.screenBottom,
						screenLeft: $scope.screenLeft
					});
				}
			};
		}]);