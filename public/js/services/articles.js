//Articles service used for articles REST endpoint
angular.module('mean.articles').factory("Articles", ['$resource', function($resource) {
    return $resource('articles/:articleId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

angular.module('mean.articles').factory("ArticlesByStack", ['$resource', function($resource) {
	return $resource('articles/stack/:stackId', {
		stackId:'@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);