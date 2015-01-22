angular.module('Platform.directives')
	.directive('money', ['levelObjects'
		, function (levelObjects) {
			return {
				restrict: 'E',
				require:'^screen',
				replace: true,
				scope: {
					x: '=',
					y: '='
				},
				templateUrl: '/AppJs/Platform/views/directives/moneyDirective.html',
				link: function ($scope, element, attrs, screenCtrl) {

					$scope.screenBottom = $scope.y * screenCtrl.getTileDimension().height + 20 + element.height() / 2;
					$scope.screenLeft = $scope.x * screenCtrl.getTileDimension().width;

					levelObjects.addMoney(element, {
						x: $scope.x,
						y: $scope.y,
						screenBottom: $scope.screenBottom,
						screenLeft: $scope.screenLeft
					});
				}
			};
		}]);