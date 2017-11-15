myApp.controller('ProfileController',
['$scope','$firebaseAuth','$firebaseArray','$firebaseObject',
 function($scope, $firebaseAuth, $firebaseArray,$firebaseObject) {

     var ref = firebase.database().ref();
     var auth = $firebaseAuth();
     //var profilepic = firebase.storage().ref('folder/'+$scope.currentUser.$id);

     auth.$onAuthStateChanged(function(authUser){
         if(authUser){

             var myProfile  = ref.child('users').child(authUser.uid);
             var profileInfo = $firebaseObject(myProfile);

             $scope.yourProfile = profileInfo;
             console.log($scope.currentUser.$id);



       }//$onAuthStateChanged
   });// function(authUser)


}]);
