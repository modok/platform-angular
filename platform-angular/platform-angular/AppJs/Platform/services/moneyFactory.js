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