angular.module('Platform.services')
	.factory('scoreService', ['$log'
		, function ($log) {
			return new function () {
				var t = this;

				t.value = 0;
			};
		}]);