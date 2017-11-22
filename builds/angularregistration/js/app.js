var myApp = angular.module('myApp', ['ngRoute','firebase']);

myApp.run(['$rootScope','$location',function($rootScope,$location){
    $rootScope.$on('$routeChangeError', function(event, next, previous, error){
        if(error == 'AUTH_REQUIRED'){
            $rootScope.message = 'Sorry, you must log in to access that page';
            $location.path('/login');
        }
    });
}]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/search', {
      templateUrl: 'views/search.html',
      controller: 'ProjectsController'
  }).
  when('/colab/:uId/:pId', {
          templateUrl: 'views/colab.html',
          controller: 'ColabController'
    }).
    when('/workspace/:uId/:pId', {
            templateUrl: 'views/workspace.html',
            controller: 'WorkspaceController'
      }).

    when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileController'
  }).
//   when('/MyColabs/:uId/:pId/colabList', {
//     templateUrl: 'views/MyColabs.html',
//     controller: 'ColabController'
// }).
when('/MyColabs/:uId', {
  templateUrl: 'views/MyColabs.html',
  controller: 'MyColabController'
}).
when('/workspace/:uId/:pId', {
        templateUrl: 'views/workspace.html',
        controller: 'WorkspaceController'
  }).
when('/details/:itemId', {
      templateUrl: 'views/detailed.html',
      controller: 'ProjectsController'
    }).
    when('/colabDetailed/:itemId', {
          templateUrl: 'views/colabDetailed.html',
          controller: 'colabDetailedController'
        }).
    when('/projects', {
      templateUrl: 'views/projects.html',
      controller: 'ProjectsController',
      resolve: {
          currentAuth: function(Authentication){
              return Authentication.requireAuth();
          }
      }
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);
