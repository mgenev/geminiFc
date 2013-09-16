angular.module('mean.stacks').controller('StacksController', ['$scope', '$routeParams', '$location', 'Global', 'Stacks', 'ArticlesByStack', 'StacksByUser', 'OrderedObjectArray', function ($scope, $routeParams, $location, Global, Stacks, ArticlesByStack, StacksByUser, OrderedObjectArray) {
	$scope.global = Global;

	$scope.create = function () {
		var stack = new Stacks({ title: this.title, language1: this.language1, language2:  this.language2 });
		stack.$save(function (response) {
			$location.path("stacks/" + response._id);
		});

		this.title = "";
		this.language1 = "";
		this.language2 = "";
	};

	$scope.remove = function (stack) {
		stack.$remove();

		for (var i in $scope.stacks) {
			if ($scope.stacks[i] == stack) {
				$scope.stacks.splice(i, 1);
			}
		}
	};

	$scope.update = function () {
		var stack = $scope.stack;
		if (!stack.updated) {
			stack.updated = [];
		}

		stack.updated.push(new Date().getTime());

		stack.$update(function () {
			$location.path('stacks/' + stack._id);
		});
	};

	$scope.find = function (query) {
		Stacks.query(query, function (stacks) {
			$scope.stacks = stacks;
		});
	};

	$scope.findOne = function () {
		Stacks.get({ stackId: $routeParams.stackId }, function (stack) {
			$scope.stack = stack;
		});
	};
 
	//TODO this flip to flip whole stacks witha  for each
	$scope.flip = function () {
		console.log($scope.stack);
		var side1 = $('.side1'),
			side2 = $('.side2');

		if ($(side1).hasClass('hidden')) {
			side2.addClass('hidden');
			side1.removeClass('hidden');
		} else {
			side1.addClass('hidden');
			side2.removeClass('hidden');
		}
	};

	$scope.findCards = function (query) {
		ArticlesByStack.query({ stackId: $routeParams.stackId }, function (articles) {
			$scope.orderedCards = new OrderedObjectArray();
			console.log($scope.orderedCards);
			$scope.articles = articles;

			angular.forEach(articles, function(value, key){

			  $scope.orderedCards.put(key,value);
			});

			console.log( $scope.orderedCards.getList());
		});
	};

	$scope.findStacksByUser = function (query) {

		StacksByUser.query({ userId: $scope.global.user._id }, function (stacks) {
			$scope.stacks = stacks;
		});
	};

}]);
