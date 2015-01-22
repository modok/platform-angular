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