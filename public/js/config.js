//Setting up route
window.app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/articles', { templateUrl: 'views/articles/list.html' }).
	when('/articles/create/:stackId', { templateUrl: 'views/articles/create.html' }).
	when('/articles/:articleId/edit', { templateUrl: 'views/articles/edit.html' }).
	when('/articles/:articleId', { templateUrl: 'views/articles/view.html' }).
	when('/stacks', { templateUrl: 'views/stacks/list.html' }).
	when('/stacks/create', { templateUrl: 'views/stacks/create.html' }).
	when('/stacks/:stackId/edit', { templateUrl: 'views/stacks/edit.html' }).
	when('/stacks/:stackId', { templateUrl: 'views/stacks/view.html' }).
	when('/', { templateUrl: 'views/index.html' }).
	otherwise({redirectTo: '/'});
}]);

//Removing tomcat unspported headers
window.app.config(['$httpProvider', function($httpProvider, Configuration) {
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider', function($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);