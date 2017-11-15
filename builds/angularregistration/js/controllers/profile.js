myApp.controller('ProfileController',
['$scope','$firebaseAuth','$firebaseArray','$firebaseObject','$firebaseObject',
 function($scope, $firebaseAuth, $firebaseArray,$firebaseObject,$firebaseObject) {

     var ref = firebase.database().ref();
     var auth = $firebaseAuth();
     //var profilepic = firebase.storage().ref('folder/'+$scope.currentUser.$id);
     
     auth.$onAuthStateChanged(function(authUser){
         if(authUser){

             var myProfile  = ref.child('users').child(authUser.uid);
             var profileInfo = $firebaseObject(myProfile);

             $scope.yourProfile = profileInfo;
             console.log("profile info:  " +$scope.currentUser.$id);
             
             var storageRef = firebase.storage().ref('images/'+$scope.currentUser.$id);
             console.log("storage REF : "+storageRef);
             
             storageRef.getDownloadURL().then((url) => {
                //Set image url
               $scope.imageUrl = url;
               console.log(url);
               console.log($scope.imageUrl);
             }).catch((error) => {
               console.log(error);
             });
             
            


       }//$onAuthStateChanged
   });// function(authUser)


}]);
