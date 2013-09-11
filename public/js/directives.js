app.directive('ngKeydown', function () {
    return function (scope, element, attrs) {
        element.bind("keydown", function (event) {
            console.log("is this directive firing>????");
            scope.$apply(function (){
                    scope.$eval(attrs.ngKeydown);
                });

            // event.preventDefault();
        });
    };
});