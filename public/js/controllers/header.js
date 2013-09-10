function HeaderController($scope, $location, Global) {
	$scope.global = Global;
	$scope.menu = [
		{
			"title": "Flash Cards",
			"link": "articles"
		},
		{
			"title": "Create New Flash Card",
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