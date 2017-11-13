myApp.controller('colabDetailedController',
['$scope','$firebaseAuth','$firebaseArray','$routeParams',
 function($scope, $firebaseAuth, $firebaseArray,$routeParams) {

     var ref = firebase.database().ref();
     var auth = $firebaseAuth();

     // putting project info into firebase
     auth.$onAuthStateChanged(function(authUser){
         if(authUser){
               var colablist  = ref.child('users').child(authUser.uid).child('colabReq');

               var colabInfo = $firebaseArray(colablist);

             $scope.theColabs = colabInfo;
             $scope.whichItems = $routeParams.itemId












         }
     });// function(authUser)
}]);
