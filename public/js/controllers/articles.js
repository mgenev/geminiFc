function ArticlesController($scope, $routeParams, $location, Global, Articles, Stacks, StacksByUser) {
	$scope.global = Global;

	$scope.create = function () {
		var article = new Articles({ title: this.title, side1: this.side1, side2:  this.side2, stack: $scope.stack._id });
		article.$save(function (response) {
			$location.path("articles/" + response._id);
		});

		this.title = "";
		this.side1 = "";
		this.side2 = "";
		this.stack = "";
	};

	$scope.remove = function (article) {
		article.$remove();

		for (var i in $scope.articles) {
			if ($scope.articles[i] == article) {
				$scope.articles.splice(i, 1);
			}
		}
	};

	$scope.update = function () {
		var article = $scope.article;
		if (!article.updated) {
			article.updated = [];
		}
		article.updated.push(new Date().getTime());

		article.$update(function () {
			$location.path('articles/' + article._id);
		});
	};

	$scope.find = function (query) {
		Articles.query(query, function (articles) {
			$scope.articles = articles;
		});
	};

	$scope.findOne = function () {
		Articles.get({ articleId: $routeParams.articleId }, function (article) {
			$scope.article = article;
			$scope.findStacks();
		});
	};

	$scope.findStacks = function (query) {
		
		// do you have an article as coming from edit view? 
		if (typeof $scope.article !== 'undefined' && typeof $scope.article.stack !== 'undefined') {
			// yes, get the stack it belongs to
			Stacks.get({ stackId: $scope.article.stack }, function (stack) {
				$scope.stack = stack;
			});
		} else {
			// no check for params, has a stack id been passed? if yes get that stack
			if ($routeParams.stackId.trim() !== "") {
				// yes, get that stack 
				Stacks.get({ stackId: $routeParams.stackId }, function (stack) {
				$scope.stack = stack;
				});
			} else {
				// no, get possible stacks
				StacksByUser.query({ userId: $scope.global.user._id }, function (stacks) {
				$scope.stacks = stacks;
			});
			}
		}		
	};
 
	$scope.flip = function () {

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
}