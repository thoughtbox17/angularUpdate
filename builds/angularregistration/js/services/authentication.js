myApp.factory('Authentication',['$rootScope','$location','$firebaseObject','$firebaseAuth',
    function($rootScope, $location, $firebaseObject, $firebaseAuth){

        var ref = firebase.database().ref();
        var auth = $firebaseAuth();
        var myObject;
        var defaultRef=firebase.storage().ref('images/default.png')

        
        
        

        auth.$onAuthStateChanged(function(authUser){
            if(authUser){

                

                var userRef = ref.child('users').child(authUser.uid);


                var userObj = $firebaseObject(userRef);

                $rootScope.currentUser = userObj;
            }else{
                $rootScope.currentUser = '';
            }
        });

        defaultRef.getDownloadURL().then((url) => {
            //Set image url
           $rootScope.imageUrl = url;
           //console.log(url);
           //console.log($scope.imageUrl);
         }).catch((error) => {
           //console.log(error);
         });
       
        //console.log("storage REF : "+defaultRef);

        myObject = {
            login: function(user){
                auth.$signInWithEmailAndPassword(
                    user.email,
                    user.password
                ).then(function(user){
                    $location.path('/profile')
                }).catch(function(error){
                    $rootScope.message = error.message;
                })
            },//login

            logout: function(){
                return auth.$signOut();
            },// logout

            requireAuth: function(){
                return auth.$requireSignIn();
            },
            register: function(user){
                auth.$createUserWithEmailAndPassword(
                    user.email,
                    user.password

                ).then(function(regUser){
                    var regRef = ref.child('users')
                    .child(regUser.uid).set({
                        date: firebase.database.ServerValue.TIMESTAMP,
                        regUser: regUser.uid,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        image: $rootScope.imageUrl,
                        code:''

                    });


                    myObject.login(user);
                }).catch(function(error){
                    $rootScope.message = error.message;
                })
            }// register
        }// return

        return myObject;
    }]);// factory
