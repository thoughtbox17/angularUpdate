//var myApp = angular.module('myApp', ['firebase', 'angular.filter']);

// define our app and dependencies (remember to include firebase!)
/*angular
.module("myApp", [
  "firebase"
])
.controller("UploadFileController", UploadFileController);
// inject $firebaseStorage into our controller
function UploadFileController($firebaseStorage) {
  // create a Storage reference for the $firebaseStorage binding
  var storageRef = firebase.storage().ref("userProfiles/files");
  var storage = $firebaseStorage(storageRef);
  //var file = // get a file from the template (see Retrieving files from template section below)
  var uploadTask = storage.$put(file);
  // of upload via a RAW, base64, or base64url string
  var stringUploadTask = storage.$putString('5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB', 'base64');
}
UploadFileController.$inject = ["$firebaseStorage"];