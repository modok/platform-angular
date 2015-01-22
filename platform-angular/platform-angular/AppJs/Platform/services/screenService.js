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