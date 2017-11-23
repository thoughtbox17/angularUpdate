myApp.directive('fileModel',['$parse', function ($parse){
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('change', function () {
          $parse(attrs.fileModel)
          .assign(scope, element[0].files[0])
          scope.$apply();
        })
      }
    }
  }]);

myApp.controller('ProjectsController',
['$scope','$firebaseAuth','$firebaseArray','$routeParams','$rootScope','$firebaseObject','$location',
 function($scope, $firebaseAuth, $firebaseArray,$routeParams, $rootScope,$firebaseObject,$location) {

     var ref = firebase.database().ref();
     var auth = $firebaseAuth();

     // putting project info into firebase
     auth.$onAuthStateChanged(function(authUser){
         if(authUser){

            
            var detailsRef=ref.child('users').child(authUser.uid);
            var fn  = detailsRef.child('firstname');
            var ln  = detailsRef.child('lastname');
        
            var fnInfo = $firebaseObject(fn);
            var lnInfo = $firebaseObject(ln);
            fnInfo.$loaded().then(function() {
                
                    
                    console.log('user name: '+fnInfo.$value);
                
            });
           

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

             if($routeParams.itemId > $scope.theThings.length-1){
                 $scope.nextItem = Number($routeParams.itemId)+1;
             }else{
                 $scope.nextItem = 0;
             }

            



              $scope.addProject = function(){
                fnInfo.$loaded().then(function() {
                    lnInfo.$loaded().then(function() {
                        
                 projectInfo.$add({
                     name: $scope.name,
                     category: $scope.category,
                     bio: $scope.bio,
                     date: firebase.database.ServerValue.TIMESTAMP,
                     userId:authUser.uid,
                     authorFN:fnInfo.$value,
                     authorLN:lnInfo.$value,
                     
                     
                 }).then(function(){
                     $scope.name ='',
                     $scope.category = '',
                       $scope.bio = ''
                 });
                });

                 userprojectInfo.$add({
                    name: $scope.name,
                    category: $scope.category,
                    bio: $scope.bio,
                    date: firebase.database.ServerValue.TIMESTAMP,
                    userId:authUser.uid,
                    authorFN:fnInfo.$value,
                    authorLN:lnInfo.$value,
                    
                   
                }).then(function(){
                    $scope.name ='',
                    $scope.category = '',
                      $scope.bio = ''
                });
                });
            
        
             }

             $scope.uploadFile = function(file) {
                
                
                var file=$scope.file;
            
                var storageRef= firebase.storage().ref('images/'+$scope.currentUser.$id);
            
                storageRef.put(file);

                storageRef.getDownloadURL().then((url) => {
                    //Set image url
                   
                   console.log(url);
                 

                   ref.child('users').child(authUser.uid).update({
                    
                    image:  url
                   
                  });
                  //console.log('db updated');
                 });

                
            
              };

              $scope.uploadCode = function(file) {
                
                
                var file=$scope.file;
            
                var storageRef= firebase.storage().ref('code/'+$scope.currentUser.$id);
            
                storageRef.put(file);

                storageRef.getDownloadURL().then((url) => {
                    //Set image url
                   
                   console.log('URL: '+url);
                 
                    
                   ref.child('users').child(authUser.uid).update({
                    
                    code:  url
                   
                  });
                  //console.log('db updated');
                 });

                
            
              };


              



             $scope.deleteProject = function(key){
                 projectInfo.$remove(key);
                 userprojectInfo.$remove(key);
             }

             $scope.changeView = function(view){
                $location.path(view); // path not hash
            }
         }
     });// function(authUser)
}]);
