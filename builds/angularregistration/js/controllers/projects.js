myApp.controller('ProjectsController',
['$scope','$firebaseAuth','$firebaseArray','$routeParams',
 function($scope, $firebaseAuth, $firebaseArray,$routeParams) {

     var ref = firebase.database().ref();
     var auth = $firebaseAuth();

     // putting project info into firebase
     auth.$onAuthStateChanged(function(authUser){
         if(authUser){
               var projectlist  = ref.child('users').child('projectList');
               var projectInfo = $firebaseArray(projectlist);

             $scope.theThings = projectInfo;
             $scope.whichItem = $routeParams.itemId
             $scope.artistOrder = "name";


             if($routeParams.itemId > 0){
                 $scope.prevItem = Number($routeParams.itemId)-1;
             }else{
                 $scope.prevItem =$scope.theThings.length-1;
             }

             if($routeParams.itemId > ($scope.theThings.length-1)){
                 $scope.nextItem = Number($routeParams.itemId)+1;
             }else{
                 $scope.nextItem = 0;
             }





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
             }



             $scope.deleteMetting = function(key){
                 projectInfo.$remove(key);
             }
         }
     });// function(authUser)
}]);
