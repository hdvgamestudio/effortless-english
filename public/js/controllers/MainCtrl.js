angular.module('MainCtrl', ['AuthSer']).controller('MainController', ['$scope', 'AuthenticationService', function($scope, AuthenticationService) {
  $scope.currentUser = AuthenticationService.currentUser || {username: "Test"};
}])
