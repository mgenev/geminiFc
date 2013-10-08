angular.module('mean.articles').controller('PracticeController', ['$scope', '$routeParams', '$location', 'Global', 'ArticlesByStack', 'Stacks', 'StacksByUser', 'OrderedObjectArray',
    function($scope, $routeParams, $location, Global, ArticlesByStack, Stacks, StacksByUser, OrderedObjectArray) {
        $('body').keypress(function(e) {
            $scope.keyHandler(e);
        });

        KeyboardJS.on('right', function() {
           $scope.$apply(function () {
                $scope.nextCard();
           })            
        });

        KeyboardJS.on('left', function() {
           $scope.$apply(function () {
                $scope.prevCard();
           })            
        });


        $scope.word = '';
        $scope.annyangOn = false;
        $scope.global = Global;

        //todo store real gauge in db
        $scope.learnedGauge = {};
        $scope.learnedGauge.value = 50;

        $scope.orderedCards = new OrderedObjectArray();



        $scope.loadCards = function () {
            ArticlesByStack.query({ stackId: $routeParams.stackId }, function (articles) {
                $scope.articles = articles;    

            
                angular.forEach($scope.articles, function(value, key){
                  $scope.orderedCards.put(key,value);
                });     

                $scope.annyangInit();

                console.log($scope.orderedCards.current());
            });
        };


        $scope.nextCard = function () {
            $scope.orderedCards.next();  
            $scope.annyangInit();          
        }

        $scope.prevCard = function () {
            $scope.orderedCards.prev();
            $scope.annyangInit();
        }


        $scope.flip = function() {
            $('.card').toggleClass('flipped');
        };

        $scope.annyangInit = function () {
            
            if (annyang) {
                // define the functions our commands will run
                var article = $scope.orderedCards.current();
                console.log($scope.orderedCards.current());

                var evalAnswer = function(term) {
                    if (term == article.side2) {
                        $('.hintPhotos').html("<h3>You correctly answered: " + term + " </h3>").fadeIn();
                    } else {
                        $('.hintPhotos').html("<h3>You wrongly answered: " + term + " </h3>").fadeIn();
                    }
                };

                // define our commands.
                // * The key is what you want your users to say say.
                // * The value is the action to do.
                //   You can pass a function, a function name (as a string), or write your function as part of the commands object.
                var commands = {
                    'answer :term': evalAnswer,
                    'it is :term': evalAnswer,
                    'its :term': evalAnswer,
                    'hint *search': showFlickr
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

        $scope.guessWord = function(e) {
            $scope.word += String.fromCharCode(e.keyCode);
            if ($scope.word == $scope.orderedCards.current().value.side2) {
                console.log("youve guessed it");
            }
        }

        $scope.keyHandler = function(e) {

            var value = $scope.learnedGauge.value;

            var type;
            var regex = /[a-zA-Z]/;

            if (e.which !== 0 && e.charCode !== 0) {
                if (regex.test(String.fromCharCode(e.keyCode|e.charCode))) $scope.guessWord(e);
            }
            
            console.log(e.which);
            
            switch (e.which) {
                // "up arrow"
                case 38:
                    e = "up";
                    break;
                    // "down arrow"
                case 40:
                    e = "down";
                    break;
                    // "left arrow"
                case 37:
                    // TODO previousCard();
                    e = "next";
                    break;
                    // "right arrow"
                case 39:
                    // TODO nextCard();
                    e = "prev";
                    break;
                case 32:
                    // TODO nextCard();
                    $scope.flip();
                    break;
            }

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

            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }
        };

    }
]);
