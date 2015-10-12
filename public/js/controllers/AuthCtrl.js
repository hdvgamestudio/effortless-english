angular.module('AuthCtrl', ['UserSer', 'AuthSer']).controller('AuthController',['$scope', '$location', '$window', 'UserService', 'AuthenticationService',  function($scope, $location, $window,  UserService, AuthenticationService) {

  $scope.logIn = function(username, password) {
    if (username !== undefined && password !== undefined) {
      UserService.logIn(username, password).success(function(data) {
        AuthenticationService.isAuthenticated = true;
        AuthenticationService.currentUser = {username: "Admin"}
        $window.sessionStorage.token = data.token;
        $location.path('/cds');
      }).error(function(status, data) {
        console.log(data);
        console.log(status);
      })
    }
  }
  $scope.logOut = function() {
    if (AuthenticationService.isAuthenticated) {
      AuthenticationService.isAuthenticated = false;
      delete $window.sessionStorage.token;
      $location.path("/");
    }
  }
}]);
