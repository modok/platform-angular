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