//Articles service used for articles REST endpoint
window.app.factory("Stacks", function($resource){
	return $resource('stacks/:stackId', {stackId:'@_id'}, {update: {method: 'PUT'}});
});