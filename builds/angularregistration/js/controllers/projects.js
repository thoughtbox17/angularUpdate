

myApp.controller('ProjectsController',
['$scope','$firebaseStorage','$firebaseAuth','$firebaseArray','$routeParams','$rootScope',
 function($scope,$firebaseStorage, $firebaseAuth, $firebaseArray,$routeParams, $rootScope) {

     
     var storageRef = firebase.storage().ref();
     var filesRef = storageRef.child('files');
     var auth = $firebaseAuth();
     var ref = firebase.database().ref();


     // putting project info into firebase
     auth.$onAuthStateChanged(function(authUser){
         if(authUser){
                var projectRef =ref.child('users').child(authUser.uid).child('projects');
               var projectlist  = ref.child('users').child('projectList');
               var projectInfo = $firebaseArray(projectlist);
               var userprojectInfo = $firebaseArray(projectRef);



             $scope.theThings = projectInfo;
             $scope.whichItem = $routeParams.itemId
             $scope.artistOrder = "name";
             $scope.theUserThings=userprojectInfo;

             userprojectInfo.$loaded().then(function(data) {
                $rootScope.howManyProjects = userprojectInfo.length;
              }); // make sure meeting data is loaded
      
              userprojectInfo.$watch(function(data) {
                $rootScope.howManyProjects = userprojectInfo.length;
              });


             if($routeParams.itemId>0){
                 $scope.prevItem = Number($routeParams.itemId)-1;
             }else{
                 $scope.prevItem =$scope.theThings.length-1;
             }

             if($routeParams.itemId < $scope.theThings.length-1){
                 $scope.nextItem = Number($routeParams.itemId)+1;
             }else{
                 $scope.nextItem = 0;
             }

            
             $scope.uploadFile = function(file) {
                console.log("Let's upload a file!");
                console.log($scope.file);
                storageRef.child(file.name).put(file);
                    storageRef.on('state_changed', function(snapshot) {
                                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                
                            }, function() {
                                //handle error
                            }, function() {
                           //url of storage file 
                                var downloadURL = storageRef.snapshot.downloadURL;
                                console.log(downloadURL)
                                //you will get url of snapshot
                            });
                     };
                
                 


              $scope.addProject = function(){
                 projectInfo.$add({
                     name: $scope.name,
                     category: $scope.category,
                     bio: $scope.bio,
                     date: firebase.database.ServerValue.TIMESTAMP,
                     userId:authUser.uid
                     
                 }).then(function(){
                     $scope.name ='',
                     $scope.category = '',
                       $scope.bio = ''
                 });

                 userprojectInfo.$add({
                    name: $scope.name,
                    category: $scope.category,
                    bio: $scope.bio,
                    date: firebase.database.ServerValue.TIMESTAMP,
                    userId:authUser.uid

                }).then(function(){
                    $scope.name ='',
                    $scope.category = '',
                      $scope.bio = ''
                });
             }



             $scope.deleteProject = function(key){
                 projectInfo.$remove(key);
                 userprojectInfo.$remove(key);
             }
         }
     });// function(authUser)
}]);
