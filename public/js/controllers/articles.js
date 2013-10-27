angular.module('mean.articles').controller('ArticlesController', ['$scope', '$routeParams', '$location', 'Global', 'Articles', 'Stacks', 'StacksByUser',
    function($scope, $routeParams, $location, Global, Articles, Stacks, StacksByUser) {

        $scope.global = Global;


        $scope.create = function() {
            var article = new Articles({
                title: this.title,
                side1: this.side1,
                side2: this.side2,
                stack: $scope.stack._id
            });
            article.$save(function(response) {
                $location.path("articles/" + response._id);
            });

            this.title = "";
            this.side1 = "";
            this.side2 = "";
            this.stack = "";
        };

        $scope.remove = function(article) {
            article.$remove();

            for (var i in $scope.articles) {
                if ($scope.articles[i] == article) {
                    $scope.articles.splice(i, 1);
                }
            }
        };

        $scope.update = function() {
            var article = $scope.article;
            if (!article.updated) {
                article.updated = [];
            }
            article.updated.push(new Date().getTime());

            article.$update(function() {
                $location.path('articles/' + article._id);
            });
        };

        $scope.find = function(query) {
            Articles.query(query, function(articles) {
                $scope.articles = articles;
            });
        };

        $scope.findOne = function() {
            Articles.get({
                articleId: $routeParams.articleId
            }, function(article) {
                $scope.article = article;
                $scope.findStacks();
            });
        };

        $scope.findStacks = function(query) {

            // do you have an article as coming from edit view? 
            if (typeof $scope.article !== 'undefined' && typeof $scope.article.stack !== 'undefined') {
                // yes, get the stack it belongs to
                Stacks.get({
                    stackId: $scope.article.stack
                }, function(stack) {
                    $scope.stack = stack;
                });
            } else {
                // comes from view stack
                // no, check for params, has a stack id been passed? if yes get that stack
                if ($routeParams.stackId.trim() !== "") {
                    // yes, get that stack 
                    Stacks.get({
                        stackId: $routeParams.stackId
                    }, function(stack) {
                        $scope.stack = stack;
                    });
                } else {
                    //comes from top nav or other quicklinks in the future
                    // no, get possible stacks by user
                    StacksByUser.query({
                        userId: $scope.global.user._id
                    }, function(stacks) {
                        $scope.stacks = stacks;
                    });
                }
            }
        };
    }
]);