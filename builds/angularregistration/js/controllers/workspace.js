myApp.controller('WorkspaceController',
['$scope','$firebaseAuth','$location','$firebaseArray','$routeParams',
 function($scope, $firebaseAuth, $location, $firebaseArray,$routeParams) {

     var ref = firebase.database().ref();
     var auth = $firebaseAuth();

     // putting project info into firebase
     auth.$onAuthStateChanged(function(authUser){
         if(authUser){
               var workspacelist  = ref.child('users').child('workspace');
               var workspaceInfo = $firebaseArray(workspacelist);

               var person  = ref.child('users').child(authUser.uid);
               var personInfo = $firebaseArray(person);

             $scope.theWorkspace = workspaceInfo;
             $scope.thePerson = personInfo;
             $scope.userA = $routeParams.uId;
              $scope.userB = $routeParams.pId;



                 $scope.addPost =  function(){

                 workspaceInfo.$add({
                     message:$scope.user.myPost,
                     date: firebase.database.ServerValue.TIMESTAMP


                 }).then(function(){
                //    $location.path('/workspace/{{$scope.userA}}/{{$scope.userB}}')
                $scope.user.myPost=''

                 });
             };

             $scope.deleteMetting = function(key){
                 projectInfo.$remove(key);
             }
         }
     });// function(authUser)
}]);
