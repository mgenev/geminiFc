app.directive("ngToggleClass", function () {
    return {
        restrict: 'A',
        compile: function (element, attr) {
            var classes = attr.ngToggleClass.split(',');
            element.bind('click', function () {
                angular.forEach(classes, function (value) {
                	console.log("hmm hmm");
                    (element.hasClass(value)) ? element.removeClass(value) : element.addClass(value);
                });
            });
        }
    }
});