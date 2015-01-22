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