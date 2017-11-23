

myApp.controller('CheckInsController',
['$scope','$firebaseAuth','$firebaseArray','$routeParams','$rootScope','$firebaseObject','$location',
 function($scope, $firebaseAuth, $firebaseArray,$routeParams, $rootScope,$firebaseObject,$location) {
    
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(authUser){
        if(authUser){
            var ref = firebase.database().ref();


            var detailsRef=ref.child('users').child(authUser.uid);
            var im  = detailsRef.child('image');
            
            
            var imInfo = $firebaseObject(im);
            
            imInfo.$loaded().then(function() {
                
                    
                    //console.log('user name: '+imInfo.$value);
                
            });
            

            var myProfile  = ref.child('users').child(authUser.uid);
            var profileInfo = $firebaseObject(myProfile);

            $scope.yourProfile = profileInfo;

            var userws,userworkspace, checkInsList,projectlist,workspacename,message;
        
        
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

////////////////DB REF////////////////////////////////////////
            projectlist=firebase.database().ref()
            .child('users')
            .child('projectList')
            .child($scope.whichproject)
            .child('name');


        //console.log('workspace name: '+$scope.wsname.val());


        var name=$firebaseObject(projectlist);
        name.$loaded().then(function() {
            
                
                //console.log(name.$value);
            
        });

/////////////////////////////////////////////////////////////////// 


//////////////////DB REF///////////////////////////////////////
workspacename=firebase.database().ref()
.child('users')
.child('projectList')
.child($scope.whichproject);


$scope.wsname=$firebaseArray(workspacename);
console.log('workspace name: '+$scope.wsname.name);


////////////////////DB REF///////////////////////////////////////   

    ref = firebase.database().ref()
    .child('users')
    .child('projectList')
    .child($scope.whichproject)
    .child('checkIns')
    .child('users');

    checkInsList=$firebaseArray(ref);
    $scope.checkIns=checkInsList;
///////////////////////////////////////////////////////////////////

////////////////////DB REF///////////////////////////////////////   

message = firebase.database().ref()
.child('users')
.child('projectList')
.child($scope.whichproject)
.child('checkIns')
.child('messages');

var messages=$firebaseArray(message);
$scope.messages=messages;
///////////////////////////////////////////////////////////////////


///////////////// FUNCTIONS ///////////////////////////////////////


    $scope.addCheckin=function(){
        imInfo.$loaded().then(function() {
    $firebaseArray(ref).$add({
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
        email: $scope.user.email,
        date:firebase.database.ServerValue.TIMESTAMP,
        uid:$scope.whichuser,
        userimage:imInfo.$value,

    }).then(function(){
        $scope.user.firstname='',
        $scope.user.lastname='',
        $scope.user.email='',

        $location.path('/checkIns/'+$scope.whichuser + '/' + $scope.whichproject + '/checkInsList');
    });
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
////////////////////DELETE///////////////////////////////////////

$scope.deleteCheckin=function(id,uid){
    if(authUser.uid==uid){
    console.log('id: '+id);
    var refDel=ref.child(id);
    var record=$firebaseObject(refDel);
    record.$remove(id);
    $location.path('/#')
    }
    
}
/////////////////POST//////////////////////////////////
$scope.addPost =  function(){
    
    messages.$add({
        message:$scope.user.myPost,
        date: firebase.database.ServerValue.TIMESTAMP,
        sender:$rootScope.currentUser.firstname,


    }).then(function(){
    
    $scope.user.myPost=''

    });
    };
//////////////////////////////////////////////////////////////////////////

}
});


     
}]);
