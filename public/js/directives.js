app.directive('ngKeydown', function () {
    return function (scope, element, attrs) {
        element.bind("keydown", function (event) {
            console.log("is this directive firing>????");
            scope.$apply(function (){
                    scope.$eval(attrs.ngKeydown);
                });

             event.preventDefault();
        });
    };
});

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