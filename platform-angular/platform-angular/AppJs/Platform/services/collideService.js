angular.module('Platform.services')
	.factory('collideService', ['$log', 'inputs', '$window', '$rootScope'
		, function ($log, inputs, $window, $rootScope) {
			return new function () {
				var t = this;
				this.init = function (levelObjects) {
					this._levelObjects = levelObjects;
				};
				this.hitTheObject = function (player, speed) {
					for (var i = 0, l = t._levelObjects._objects.length; i < l; i++) {
						var obj = t._levelObjects._objects[i];
						var playerRightSide = getRightSide(player);
						var playerLeftSide = getLeftSide(player);
						var playerTopSide = getTopSide(player);
						var playerBottomSide = getBottomSide(player);

						var objRightSide = getRightSide(obj);
						var objLeftSide = getLeftSide(obj);
						var objTopSide = getTopSide(obj);
						var objBottomSide = getBottomSide(obj);

						if (inputs.right) {
							if ((playerRightSide + speed > objLeftSide && playerLeftSide + speed < objRightSide) && (playerBottomSide > objTopSide && playerTopSide < objBottomSide) || playerRightSide + speed > $window.innerWidth) {
								if (obj.type == 'point') {
									removeObjects(i);
									return false;
								}
								return true;
							}
						}
						if (inputs.left) {
							if ((playerLeftSide - speed > objLeftSide && playerLeftSide - speed < objRightSide) && (playerBottomSide > objTopSide && playerTopSide < objBottomSide) || playerLeftSide - speed < 0) {
								if (obj.type == 'point') {
									removeObjects(i);
									return false;
								}
								return true;
							}
						}
						if (inputs.up) {
							if ((playerTopSide - speed < objBottomSide && playerRightSide > objLeftSide && playerLeftSide < objRightSide && playerBottomSide > objTopSide) || playerTopSide - speed < 0) {
								if (obj.type == 'point') {
									removeObjects(i);
									return false;
								}
								return true;
							}
						}
					}
					return false;
				}

				this.hitTheFloor = function (player, speed) {
					for (var i = 0, l = t._levelObjects._objects.length; i < l; i++) {
						var obj = t._levelObjects._objects[i];
						var playerRightSide = getRightSide(player);
						var playerLeftSide = getLeftSide(player);
						var playerTopSide = getTopSide(player);
						var playerBottomSide = getBottomSide(player);

						var objRightSide = getRightSide(obj);
						var objLeftSide = getLeftSide(obj);
						var objTopSide = getTopSide(obj);
						var objBottomSide = getBottomSide(obj);

						if ((playerBottomSide + speed > objTopSide && playerTopSide + speed < objBottomSide && playerRightSide > objLeftSide && playerLeftSide < objRightSide) || playerBottomSide + speed > $window.innerHeight - 20) {
							if (obj.type == 'point') {
								removeObjects(i);
								return false;
							}
							return true;
						}
					}
					return false;
				};

				function removeObjects(objToRemove) {
					$rootScope.$broadcast('score');
					t._levelObjects._objects[objToRemove]._el.remove();
				}

				function getRightSide(asset) {
					return asset._el.width() + asset._el.position().left;
				}

				function getLeftSide(asset) {
					return asset._el.position().left;
				}

				function getTopSide(asset) {
					return asset._el.position().top;
				}

				function getBottomSide(asset) {
					return asset._el.height() + asset._el.position().top;
				}
			};
		}]);