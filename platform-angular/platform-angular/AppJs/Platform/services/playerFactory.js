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