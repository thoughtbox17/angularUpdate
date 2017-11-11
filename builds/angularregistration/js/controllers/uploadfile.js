//var myApp = angular.module('myApp', ['firebase', 'angular.filter']);

// define our app and dependencies (remember to include firebase!)
angular
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









//////////////////////////////////////////////////////////////////////////

/*myApp.controller("UploadFileController",['$scope','$firebaseArray',
function($scope, $firebaseArray) {
  
  var ref = firebase.storage().ref();
  var img = ref.child('images');
  $scope.imgs = $firebaseArray(img);

  var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
  $scope.uploadFile = function() {
    var sFileName = $("#nameImg").val();
    if (sFileName.length > 0) {
      var blnValid = false;
      for (var j = 0; j < _validFileExtensions.length; j++) {
        var sCurExtension = _validFileExtensions[j];
        if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
          blnValid = true;
          var filesSelected = document.getElementById("nameImg").files;
          if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function(fileLoadedEvent) {
              var textAreaFileContents = document.getElementById(
                "textAreaFileContents"
              );


              $scope.imgs.$add({
                date: Firebase.ServerValue.TIMESTAMP,
                base64: fileLoadedEvent.target.result
              });
            };

            fileReader.readAsDataURL(fileToLoad);
          }
          break;
        }
      }

      if (!blnValid) {
        alert('File is not valid');
        return false;
      }
    }

    return true;
  }

  $scope.deleteimg = function(imgid) {
    var r = confirm("Do you want to remove this image ?");
    if (r == true) {
      $scope.imgs.forEach(function(childSnapshot) {
        if (childSnapshot.$id == imgid) {
            $scope.imgs.$remove(childSnapshot).then(function(ref) {
              ref.key() === childSnapshot.$id; // true
            });
        }
      });
    }
  }

}]);*/