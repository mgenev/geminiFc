angular.module('mean.system').controller("KeypressedController",function($scope) {
  console.log("yea it's working");
  $scope.name1 = '';
  $scope.name2 = '';
  $scope.name3 = '';
  
  $scope.changeIndex1 = function($event) {
    console.log("yea it's working");
    $scope.name1 += String.fromCharCode($event.keyCode);
  }
  
  $scope.changeIndex2 = function($event) {
    console.log("yea it's working");
    $scope.name2 += String.fromCharCode($event.keyCode);
  }
  
  $scope.changeIndex3 = function($event) {
    console.log("yea it's working");
    $scope.name3 += String.fromCharCode($event.keyCode);
  }
});
