

myApp.controller('CheckInsController',
['$scope','$firebaseAuth','$firebaseArray','$routeParams','$rootScope','$firebaseObject','$location',
 function($scope, $firebaseAuth, $firebaseArray,$routeParams, $rootScope,$firebaseObject,$location) {
    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    

    auth.$onAuthStateChanged(function(authUser){
        if(authUser){
            var workspaceRef=ref.child('users').child(authUser.uid).child('projects').child;

        }

    });



     
}]);
