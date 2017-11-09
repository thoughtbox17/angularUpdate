myApp.controller('ProfileController',
['$scope','$firebaseAuth','$firebaseArray','$firebaseObject',
 function($scope, $firebaseAuth, $firebaseArray) {

     var ref = firebase.database().ref();
     var auth = $firebaseAuth();

     auth.$onAuthStateChanged(function(authUser){
         if(authUser){

             var myProfile  = ref.child('users').child(authUser.uid);
             var profileInfo = $firebaseObject(myProfile);

             $scope.yourProfile = profileInfo;



       }//$onAuthStateChanged
   });// function(authUser)


}]);
