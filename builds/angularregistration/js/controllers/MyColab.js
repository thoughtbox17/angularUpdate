myApp.controller('MyColabController',
['$scope','$rootScope','$firebaseArray','$firebaseObject','$routeParams',
function($scope,$rootScope,$firebaseArray,$firebaseObject,$routeParams){

    var ref, colabLister;
    $scope.thisUser = $routeParams.uId;

    ref = firebase.database().ref().child('users').child($scope.thisUser).child('colabReq');

    colabLister = $firebaseArray(ref);
    $scope.colabs = colabLister;




}]);
