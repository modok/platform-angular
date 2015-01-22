///#source 1 1 /AppJs/Platform/_modules.js
angular.module('Platform', [
	'Platform.directives',
	'Platform.controllers',
	'Platform.services',
'ngRoute']);
angular.module('Platform.directives', []);
angular.module('Platform.controllers', []);
angular.module('Platform.services', []);
///#source 1 1 /AppJs/Platform/directives/playerDirective.js
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
///#source 1 1 /AppJs/Platform/directives/floorDirective.js
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
///#source 1 1 /AppJs/Platform/directives/screenDirective.js
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
///#source 1 1 /AppJs/Platform/directives/platformDirective.js
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
///#source 1 1 /AppJs/Platform/directives/moneyDirective.js
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
///#source 1 1 /AppJs/Platform/directives/scoreDirective.js
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
///#source 1 1 /AppJs/Platform/directives/startDirective.js
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
///#source 1 1 /AppJs/Platform/services/screenService.js
angular.module('Platform.services')
	.factory('screenService', ['$log', '$document', 'levelObjects', '$window', 'inputs'
		, function ($log, $document, levelObjects, $window, inputs) {
			return new function () {
				var t = this;

				this._config = {
					dimension: { width: 1, height: 1 },
					tileDimension: {
						width: 0,
						height: 0
					}
				};
				this.setGridDimension = function (width, height) {
					t._config.dimension.width = width;
					t._config.dimension.height = height;

					t._config.tileDimension.width = $window.innerWidth / width;
					t._config.tileDimension.height = $window.innerHeight / height;
				};
				this.getTileDimension = function () {
					return t._config.tileDimension;
				};
				this.getGridDimension = function () {
					return t._config.dimension;
				};
				this.getScreenDimension = function () {
					return { width: $window.innerWidth, height: $window.innerHeight };
				};
				this.run = function () {
					$document.keydown(function (event) {
						if (event.keyCode === 39) {
							inputs.right = true;
						} else if (event.keyCode === 37) {
							inputs.left = true;
						} else if (event.keyCode === 38) {
							inputs.up = true;
						}
					});

					$document.keyup(function (event) {
						if (event.keyCode === 39) {
							inputs.right = false;
						} else if (event.keyCode === 37) {
							inputs.left = false;
						} else if (event.keyCode === 38) {
							inputs.up = false;
						}
					});
				};
			};
		}]);
///#source 1 1 /AppJs/Platform/services/levelObjects.js
angular.module('Platform')
	.factory('levelObjects', ['platformFactory', 'playerFactory', 'moneyFactory'
		, function (platformFactory, ballFactory, moneyFactory) {

		return new function () {
			var t = this;
			t._objects = [];
			t._player = null;
			t._floor = null;
			t.addPlayer = function(el, config) {
				t._player = ballFactory.create(el, config);
			};
			t.addPlatform = function(el, config) {
				t._objects.push(platformFactory.create(el, config));
			};
			t.addMoney = function (el, config) {
				t._objects.push(moneyFactory.create(el, config));
			};
			t.setFloor = function(el) {
				t._floor = el;
			};
		};
	}]);
///#source 1 1 /AppJs/Platform/services/physicService.js
angular.module('Platform.services')
	.factory('physicService', ['$log', 'inputs', 'levelObjects', '$window', 'collideService'
		, function ($log, inputs, levelObjects, $window, collideService) {
			return new function () {
				var t = this;
				var speed = 4;
				var player = null;

				this.activate = function () {
					player = levelObjects._player;
					loop();
				}

				function loop() {
					$window.requestAnimationFrame(function () {
						if (inputs.left) {
							player.left();
						}

						if (inputs.right) {
							player.right();
						}

						if (inputs.up) {
							player.jump();
						} else {
							player.stopJumping = true;
						}

						var top = player._el.position().top;
						if (!collideService.hitTheFloor(player, speed)) {
							player._el.css({
								bottom: $window.innerHeight - top - player._el.height() - speed * 1.5
							});
							player.y -= speed;
						} else {
							player.y = 0;
							player.isJumping = false;
							player.stopJumping = false;
						}

						loop();
					});
				}
			};
		}]);
///#source 1 1 /AppJs/Platform/services/collideService.js
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
///#source 1 1 /AppJs/Platform/services/scoreService.js
angular.module('Platform.services')
	.factory('scoreService', ['$log'
		, function ($log) {
			return new function () {
				var t = this;

				t.value = 0;
			};
		}]);
///#source 1 1 /AppJs/Platform/services/platformFactory.js
angular.module('Platform.services')
	.factory('platformFactory', [function() {
		var f = function() {

			var platform = function(element, config) {
				var t = this;
				t._el = element;
				t._config = config;
				t.type = "wall";
			};

			this.create = function (element, config) {
				return new platform(element, config);
			};
		};

	return new f();
}]);
///#source 1 1 /AppJs/Platform/services/playerFactory.js
angular.module('Platform.services')
	.factory('playerFactory', ['collideService'
		, function (collideService) {
			var f = function () {

				var player = function (element, config, collideService) {
					var t = this;
					t.collideService = collideService;
					t.isJumping = false;
					t.stopJumping = false;
					t.y = 0;
					t._el = element;
					t._config = config;
					t.left = function () {
						if (!collideService.hitTheObject(t, t._config.speed)) {
							t._el.css({
								left: t._el.position().left - t._config.speed
							});
						}
					};
					t.right = function () {
						if (!collideService.hitTheObject(t, t._config.speed)) {
							t._el.css({
								left: t._el.position().left + t._config.speed
							});
						}
					};
					t.jump = function () {

						if (!collideService.hitTheObject(t, t._config.speed * 3) && t.y < t._config.jump && !t.stopJumping) {
							t._el.css({
								bottom: calculateJump()
							});
						} else {
							t.stopJumping = true;
						}
					};

					function calculateJump() {
						var top = t._el.position().top;
						t.y += t._config.speed * 3;
						return window.innerHeight - top - t._el.height() + t._config.speed * 3;
					}
				};

				this.collideService = collideService;
				this.create = function (element, config) {
					return new player(element, config, this.collideService);
				};
			};

			return new f();
		}]);
///#source 1 1 /AppJs/Platform/services/moneyFactory.js
angular.module('Platform.services')
	.factory('moneyFactory', [function() {
		var f = function() {

			var money = function (element, config) {
				var t = this;
				t._el = element;
				t._config = config;
				t.type = "point";
			};

			this.create = function (element, config) {
				return new money(element, config);
			};
		};

	return new f();
}]);
///#source 1 1 /AppJs/Platform/controllers/mainController.js
angular.module('Platform.controllers')
	.controller('main', ['$scope', 'screenService'
		, function ($scope, screenService) {
		
		}]);
///#source 1 1 /AppJs/Platform/run.js
angular.module('Platform')
	.value('inputs', {
		up: false,
		down: false,
		right: false,
		left: false
	})
	.run(['$log', '$rootScope'
		, function ($log, $rootScope) {

		}]);
