myApp.controller('ProfileController',
['$scope','$firebaseAuth','$firebaseArray','$firebaseObject','$firebaseObject','$rootScope',
 function($scope, $firebaseAuth, $firebaseArray,$firebaseObject,$firebaseObject,$rootScope) {

     var ref = firebase.database().ref();
     var auth = $firebaseAuth();

     //var profilepic = firebase.storage().ref('folder/'+$scope.currentUser.$id);
     
     auth.$onAuthStateChanged(function(authUser){
         if(authUser){
            $scope.$apply(function () {
              var url= firebase.storage().ref('images/'+$scope.currentUser.$id);
              url.getDownloadURL().then((url) => {
                ref.child('users').child(authUser.uid).update({
                
                image:  url
               
              });
             });
              
              console.log('updated');

              var detailsRef=ref.child('users').child(authUser.uid);
              
              var im  = detailsRef.child('image');
              
              
              var imInfo = $firebaseObject(im);
              
              imInfo.$loaded().then(function() {
                  
                      
                detailsRef.update({
                  
                  image:  imInfo.$value,
                 
                });
                  
              });
              

             var myProfile  = ref.child('users').child(authUser.uid);
             var profileInfo = $firebaseObject(myProfile);

             $scope.yourProfile = profileInfo;
             //console.log("profile info:  " +$scope.currentUser.$id);
             
             var storageRef = ref.child('users').child(authUser.uid).child('image');
             //console.log("storage REF : "+storageRef);
             $scope.imageUrl=storageRef;
             /*storageRef.getDownloadURL().then((url) => {
                //Set image url
               $rootScope.imageUrl = url;
               console.log(url);
               console.log($scope.imageUrl);
             }).catch((error) => {
               console.log(error);
             });*/
             
            
            });

       }//$onAuthStateChanged
   });// function(authUser)
   
   

}]);
