

myApp.controller('WorkSpaceController',
['$scope','$firebaseAuth','$firebaseArray','$routeParams','$rootScope','$firebaseObject','$location',
 function($scope, $firebaseAuth, $firebaseArray,$routeParams, $rootScope,$firebaseObject,$location) {
    
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(authUser){
        if(authUser){
    
    var ref,userws,userworkspace, checkInsList,projectlist;
    
    
    
    
    

///go to user workspace list//////////////////////////////////////////
    userws=firebase.database().ref()
    .child('users')
    .child(authUser.uid)
    .child('workspaces');
    
    
 
    userworkspace = $firebaseArray(userws);
    

    $scope.whichworkspace=userworkspace;

    //console.log('Project: '+$scope.whichproject);

   




$scope.deleteWorkSpaceLink=function(id){
    console.log(id);
    var refDel=userws.child(id);
    var record=$firebaseObject(refDel);
    record.$remove(id);
}

}
});


     
}]);
