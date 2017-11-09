myApp.controller('ColabController',
['$scope','$rootScope','$location','$routeParams','$firebaseObject','$firebaseArray',
function($scope,$rootScope,$location,$routeParams,$firebaseObject,$firebaseArray){

    var ref, colabList;



     $scope.requester = $routeParams.pId;
     $scope.whichuser = $routeParams.uId;

    ref = firebase.database().ref().child('users').child($scope.whichuser).child('colabReq');

    colabList = $firebaseArray(ref);
    $scope.colab = colabList;

    $scope.addColab = function(){
        $firebaseArray(ref).$add({
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            message: $scope.user.message,
            date: firebase.database.ServerValue.TIMESTAMP

        }).then(function(){
            $location.path('/MyColabs/'+$scope.whichuser+'/'+$scope.requester+'/colabList')
        }); // add
   }

}]);
