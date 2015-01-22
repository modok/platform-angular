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