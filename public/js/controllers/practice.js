angular.module('mean.articles').controller('PracticeController', ['$scope', '$routeParams', '$location', 'Global', 'ArticlesByStack', 'Stacks', 'StacksByUser', 'OrderedObjectArray',
    function($scope, $routeParams, $location, Global, ArticlesByStack, Stacks, StacksByUser, OrderedObjectArray) {
        $('body').keydown(function(e) {
            $scope.changeIndex(e);
        });

        $scope.annyangOn = false;
        $scope.global = Global;

        //todo store real gauge in db
        $scope.learnedGauge = {};
        $scope.learnedGauge.value = 50;

        $scope.orderedCards = new OrderedObjectArray();

        $scope.loadCards = function (query) {
            ArticlesByStack.query({ stackId: $routeParams.stackId }, function (articles) {
                $scope.articles = articles;    

            
                angular.forEach($scope.articles, function(value, key){
                  $scope.orderedCards.put(key,value);
                });     

                console.log($scope.orderedCards.current());
            });
        };


        $scope.nextCard = function () {
            $scope.orderedCards.next();            
        }

        $scope.prevCard = function () {
            $scope.orderedCards.prev();
        }


        $scope.flip = function() {
            $('.card').toggleClass('flipped');
        };

        $scope.annyangInit = function () {
            var article = $scope.article;
            if (annyang) {
                // define the functions our commands will run

                var evalAnswer = function(term) {
                    if (term == $scope.article.side2) {
                        $('.hintPhotos').html("<h3>You correctly answered: " + term + " </h3>").fadeIn();
                    } else {
                        $('.hintPhotos').html("<h3>You wrongly answered: " + term + " </h3>").fadeIn();
                    }
                };

                var showFlickr = function(tag) {
                    $('#flickrGallery').show();
                    $('#flickrLoader p').text('Searching for ' + tag).fadeIn('fast');
                    var url = '//api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a828a6571bb4f0ff8890f7a386d61975&sort=interestingness-desc&per_page=9&format=json&callback=jsonFlickrApi&tags=' + tag;
                    $.ajax({
                        type: 'GET',
                        url: url,
                        async: false,
                        jsonpCallback: 'jsonFlickrApi',
                        contentType: "application/json",
                        dataType: 'jsonp'
                    });
                    scrollTo("#section_image_search");
                };

                var jsonFlickrApi = function(results) {
                    $('#flickrLoader p').fadeOut('slow');
                    var photos = results.photos.photo;
                    $.each(photos, function(index, photo) {
                        $(document.createElement("img"))
                            .attr({
                                src: '//farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_s.jpg'
                            })
                            .addClass("flickrGallery")
                            .appendTo(flickrGallery);
                    });
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

        $scope.changeIndex = function(e) {
            console.log(e.which);
            var value = $scope.learnedGauge.value;
            var type;

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

            $scope.$apply();
        };

    }
]);