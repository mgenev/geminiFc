//Stacks service used for articles REST endpoint
angular.module('mean.stacks').factory("Stacks", ['$resource', function($resource) {
	return $resource('stacks/:stackId', {stackId:'@_id'}, {update: {method: 'PUT'}});
}]);

angular.module('mean.stacks').factory("StacksByUser", ['$resource', function($resource) {
	return $resource('stacksbyuser/:userId', {userId:'@_id'}, {update: {method: 'PUT'}});
}]);