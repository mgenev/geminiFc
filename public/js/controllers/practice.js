angular.module('mean.articles').controller('PracticeController', ['$rootScope', '$scope', '$routeParams', '$location', 'Global', 'ArticlesByStack', 'Stacks', 'StacksByUser', 'OrderedObjectArray',
    function($rootScope, $scope, $routeParams, $location, Global, ArticlesByStack, Stacks, StacksByUser, OrderedObjectArray) {
        $scope.global = Global;
        $scope.orderedCards = new OrderedObjectArray();

        $scope.word = '';
        $scope.annyangOn = false;
        $scope.feedback = '';
        
        //todo store real gauge in db
        $scope.learnedGauge = {};
        $scope.learnedGauge.value = 50;

        $('body').keydown(function(e) {
            $scope.keydownHandler(e);
        });

        $scope.$on("$destroy", function() {
            $('body').unbind();
        });

        // KeyboardJS.on('right', function() {
        //    $scope.$apply(function () {
        //         $scope.nextCard();
        //    })            
        // });

        // KeyboardJS.on('left', function() {
        //    $scope.$apply(function () {
        //         $scope.prevCard();
        //    })            
        // });

        $scope.loadCards = function() {
            ArticlesByStack.query({
                stackId: $routeParams.stackId
            }, function(articles) {
                $scope.articles = articles;


                angular.forEach($scope.articles, function(value, key) {
                    $scope.orderedCards.put(key, value);
                });

                $scope.annyangInit();

                console.log($scope.orderedCards.current());
            });
        };


        $scope.nextCard = function() {

            $('.flip').animate({
                'right':'-200px',
                'opacity': '0'
              }, {
                duration: 200,
                specialEasing: {
                  width: "linear",
                  height: "easeOutBounce"
                }, 
                complete: function() {
                    $scope.$apply(function () {$scope.orderedCards.next()});
                    
                    $('.flip').css({"right": "0px","left": "-200px"}).animate({'left':'0px', 'opacity': '1'}, 200);
                }
              });

            $scope.annyangInit();
        }

        $scope.prevCard = function() {
            $scope.orderedCards.prev();
            $scope.annyangInit();
        }


        $scope.flip = function() {
            $('.card').toggleClass('flipped');
        };

        $scope.guessWord = function(e) {
            
            $scope.word += String.fromCharCode(e.keyCode);    
            

            if ($scope.word == $scope.orderedCards.current().value.side2.toUpperCase()) {                
                // UI response, then next
                $scope.feedback = "youve guessed it";
            }
        };

        $scope.moveProgress = function(e) {
            var value = $scope.learnedGauge.value;
            var type;

            if (e == "up") value += 10;
            if (e == "down") value -= 10;

            if (value < 25) {
                type = 'danger';
            } else if (value < 50) {
                type = 'warning';
            } else if (value < 85) {
                type = 'info';
            } else {
                type = 'success';
            }

            $scope.learnedGauge = {
                value: value,
                type: type
            };

            // if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            //     $scope.$apply();
            // }
        };

        $scope.keydownHandler = function(e) {
            $scope.$apply(function () {
                // check for arrows, if up or down, move index, if left or right, move next, prev
                var regex = /[a-zA-Z]/;

                if (regex.test(String.fromCharCode(e.keyCode | e.charCode))) $scope.guessWord(e);

                switch (e.which) {
                    // "up arrow"
                    case 38:
                        $scope.moveProgress("up");
                        break;
                        // "down arrow"
                    case 40:
                        $scope.moveProgress("down");
                        break;
                        // "left arrow"
                    case 37:
                        // TODO previousCard();                        
                            $scope.prevCard();
                        break;
                        // "right arrow - prev"
                    case 39:
                        // "left arrow - next
                            $scope.nextCard();
                        break;
                    case 32:
                        // space flips
                        $scope.flip();
                        break;
                }
            });
        };

        $scope.annyangInit = function() {
            var article = ""
            if (annyang) {
                // define the functions our commands will run
                article = $scope.orderedCards.current().value;
                console.log(article.side2);

                var evalAnswer = function(term) {
                    console.log(term == article.side2, term, article.side2);
                    if (term == article.side2) {
                        $scope.feedback = "You correctly answered: " + term ;
                        // .fadeIn();
                    } else {
                        $scope.feedback = "You wrongly answered: " + term;
                        // .fadeIn();
                    }
                };
             
                // define our commands.
                // * The key is what you want your users to say say.
                // * The value is the action to do.
                //   You can pass a function, a function name (as a string), or write your function as part of the commands object.
                var commands = {
                    'answer :term': evalAnswer,
                    'it is :term': evalAnswer,
                    'its :term': evalAnswer
                };

                // OPTIONAL: activate debug mode for detailed logging in the console
                annyang.debug();

                // Initialize annyang
                annyang.init(commands);

                // OPTIONAL: Set a language for speech recognition (defaults to English)
                annyang.setLanguage('en');

                // Start listening. You can call this here, or attach this call to an event, button, etc.
                // annyang.start();
            } else {
                $(document).ready(function() {
                    $('#unsupported').fadeIn('fast');
                });
            }
        };

        $scope.annyang = function() {
            if (!$scope.annyangOn) {
                annyang.start();
                $scope.annyangOn = true;
            } else {
                annyang.abort();
                $scope.annyangOn = false;
            }
        };

    }
]);