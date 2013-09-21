angular.module('annyang').factory("Annyang", [function() {
    if (annyang) {
    // define the functions our commands will run.
    var hello = function(term) {
      $('.hintPhotos').html("<h1>You said: hello " + term + " </h1>").fadeIn();

    };

    var showFlickr = function(tag) {
      $('#flickrGallery').show();
      $('#flickrLoader p').text('Searching for '+tag).fadeIn('fast');
      var url = '//api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a828a6571bb4f0ff8890f7a386d61975&sort=interestingness-desc&per_page=9&format=json&callback=jsonFlickrApi&tags='+tag;
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
          .attr({ src: '//farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_s.jpg' })
          .addClass("flickrGallery")
          .appendTo(flickrGallery);
      });
    };


    // define our commands.
    // * The key is what you want your users to say say.
    // * The value is the action to do.
    //   You can pass a function, a function name (as a string), or write your function as part of the commands object.
    var commands = {
      'hello :term' : hello,
      'show me *search':      showFlickr
    };

    // OPTIONAL: activate debug mode for detailed logging in the console
    annyang.debug();

    // Initialize annyang
    annyang.init(commands);

    // OPTIONAL: Set a language for speech recognition (defaults to English)
    annyang.setLanguage('en');

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  } else {
    $(document).ready(function() {
      $('#unsupported').fadeIn('fast');
    });
  }

}]);