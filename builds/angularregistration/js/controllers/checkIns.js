

myApp.controller('CheckInsController',
['$scope','$firebaseAuth','$firebaseArray','$routeParams','$rootScope','$firebaseObject','$location',
 function($scope, $firebaseAuth, $firebaseArray,$routeParams, $rootScope,$firebaseObject,$location) {
    
    
    var ref, checkInsList;
    
    $scope.whichproject=$routeParams.pId;
    $scope.whichuser=$routeParams.uId;
    console.log($scope.whichproject);

     ref = firebase.database().ref()
    .child('users')
    .child('projectList')
    .child($scope.whichproject)
    .child('checkins');

    checkInsList=$firebaseArray(ref);
    $scope.checkIns=checkInsList;

    $scope.addCheckin=function(){
    $firebaseArray(ref).$add({
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
        email: $scope.user.email,
        date:firebase.database.ServerValue.TIMESTAMP

    }).then(function(){
        $location.path('/checkIns/'+$scope.whichuser + '/' + $scope.whichproject + '/checkInsList')
    });
    console.log('working');
}


     
}]);
