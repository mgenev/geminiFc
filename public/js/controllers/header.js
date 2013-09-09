function HeaderController($scope, $location, Global) {
	$scope.global = Global;
	$scope.menu = [
		{
			"title": "Articles",
			"link": "articles"
		},
		{
			"title": "Create New Article",
			"link": "articles/create/"
		},
		{
			"title": "Stacks",
			"link": "stacks"
		},
		{
			"title": "Create New Stack",
			"link": "stacks/create/"
		}
	];

	$scope.init = function() {

	};
}