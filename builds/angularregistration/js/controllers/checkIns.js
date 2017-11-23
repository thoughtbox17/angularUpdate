

myApp.controller('CheckInsController',
['$scope','$firebaseAuth','$firebaseArray','$routeParams','$rootScope','$firebaseObject','$location',
 function($scope, $firebaseAuth, $firebaseArray,$routeParams, $rootScope,$firebaseObject,$location) {
    
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(authUser){
        if(authUser){
    
    var ref,userws,userworkspace, checkInsList,projectlist;
    
    
    $rootScope.whichproject=$routeParams.pId;
    console.log('scope which project: '+$scope.whichproject);
    $scope.whichuser=$routeParams.uId;
    

///go to userworkspace list//////////////////////////////////////////
    userws=firebase.database().ref()
    .child('users')
    .child(authUser.uid)
    .child('workspaces');
    
 
    userworkspace = $firebaseArray(userws);
    

    $scope.pn=userworkspace;

   // console.log('Project: '+$scope.whichproject);

   
///////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
projectlist=firebase.database().ref()
.child('users')
.child('projectList')
.child($scope.whichproject)
.child('name');

var name=$firebaseObject(projectlist);
name.$loaded().then(function() {
    
        
        //console.log(name.$value);
    
});






///////////////////////////////////////////////////////////////////   

     ref = firebase.database().ref()
    .child('users')
    .child('projectList')
    .child($scope.whichproject)
    .child('checkIns');

    checkInsList=$firebaseArray(ref);
    $scope.checkIns=checkInsList;
///////////////////////////////////////////////////////////////////
    $scope.addCheckin=function(){
    $firebaseArray(ref).$add({
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
        email: $scope.user.email,
        date:firebase.database.ServerValue.TIMESTAMP,
        uid:$scope.whichuser,

    }).then(function(){
        $scope.user.firstname='',
        $scope.user.lastname='',
        $scope.user.email='',

        $location.path('/checkIns/'+$scope.whichuser + '/' + $scope.whichproject + '/checkInsList');
    });

    name.$loaded().then(function() {
        
            
            //console.log(name.$value);
        
   
    userworkspace.$add({
        projectid: $scope.whichproject,
        name:name.$value

    }).then(function(){
        $scope.pn.name='',
        $scope.pn.whichproject=''
        

        
    });
});
    //console.log('working')

    //console.log('working');
}

$scope.deleteCheckin=function(id,uid){
    if(authUser.uid==uid){
    console.log('id: '+id);
    var refDel=ref.child(id);
    var record=$firebaseObject(refDel);
    record.$remove(id);
    $location.path('/#')
    }
}



}
});


     
}]);
