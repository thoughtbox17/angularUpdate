

myApp.controller('CheckInsController',
['$scope','$firebaseAuth','$firebaseArray','$routeParams','$rootScope','$firebaseObject','$location',
 function($scope, $firebaseAuth, $firebaseArray,$routeParams, $rootScope,$firebaseObject,$location) {
    
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(authUser){
        if(authUser){
    
    var ref,userws,userworkspace, checkInsList,projectlist;
    
    
    $scope.whichproject=$routeParams.pId;
    $scope.whichuser=$routeParams.uId;
    //console.log($scope.whichproject);

///go to userworkspace list//////////////////////////////////////////
    userws=firebase.database().ref()
    .child('users')
    .child(authUser.uid)
    .child('workspaces');
    
 
    userworkspace = $firebaseArray(userws);
    

    $scope.pn=userworkspace;

   // console.log('Project: '+$scope.whichproject);

   
///////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
projectlist=firebase.database().ref()
.child('users')
.child('projectList')
.child($scope.whichproject)
.child('name').then(function(snapshot) {
    
        var value = snapshot.val();
        console.log(value.name);
    
});



projectname = $firebaseObject(projectlist);


$scope.pn=projectname.val();


///////////////////////////////////////////////////////////////////   

    
   

     ref = firebase.database().ref()
    .child('users')
    .child('projectList')
    .child($scope.whichproject)
    .child('checkIns');

    checkInsList=$firebaseArray(ref);
    $scope.checkIns=checkInsList;

    $scope.addCheckin=function(){
    $firebaseArray(ref).$add({
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
        email: $scope.user.email,
        date:firebase.database.ServerValue.TIMESTAMP

    }).then(function(){
        $scope.user.firstname='',
        $scope.user.lastname='',
        $scope.user.email='',

        $location.path('/checkIns/'+$scope.whichuser + '/' + $scope.whichproject + '/checkInsList');
    });


    userworkspace.$add({
        projectid: $scope.whichproject,
        name:$scope.pn

    }).then(function(){
        $scope.pn.name='',
        $scope.pn.whichproject=''
        

        
    });
    //console.log('working')

    //console.log('working');
}

$scope.deleteCheckin=function(id){
    //console.log(id);
    var refDel=ref.child(id);
    var record=$firebaseObject(refDel);
    record.$remove(id);
}

}
});


     
}]);
