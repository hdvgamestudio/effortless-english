angular.module('AuthCtrl', ['UserSer', 'AuthSer']).controller('AuthController',['$scope', '$location', '$window', 'UserService', 'AuthenticationService',  function($scope, $location, $window,  UserService, AuthenticationService) {

  $scope.logIn = function(username, password) {
    if (username !== undefined && password !== undefined) {
      UserService.logIn(username, password).success(function(data) {
        $scope.currentUser = username;
        AuthenticationService.isAuthenticated = true;
        $window.sessionStorage.token = data.token;
        $location.path('/cds');
      }).error(function(status, data) {
        $scope.hasError = true;
      })
    } else {
      $scope.hasError = true;
    }
  }
  $scope.logOut = function() {
    if (AuthenticationService.isAuthenticated) {
      AuthenticationService.isAuthenticated = false;
      delete $window.sessionStorage.token;
      $scope.currentUser = "";
      $scope.hasError = false;
      $location.path("/");
    }
  }
  $scope.$watch(function(){
    return AuthenticationService.isAuthenticated;
  }, function (newValue) {
    $scope.isAuthenticated = newValue;
  });
}]);
