angular.module('CDCtrl', []).controller('CDController',function($scope, $http) {
  var apiUrl = 'http://localhost:3000/api/v1/'
  var GET_URL = CREATE_URL = apiUrl + 'cds';
  $scope.cd = {};
  $scope.isCreating = true;
  // Get CD List
  $scope.getCDs = function() {
    $http.get(GET_URL)
      .success(function(data) {
         $scope.cds = data;
      })
      .error(function() {
        console.log('error get list');
      })
  }
  $scope.getCDs();

  // Create a new CD
  $scope.createCDs = function() {
    $http({
      url: CREATE_URL,
      method: "POST",
      data: JSON.stringify({cd: {title: $scope.cd.title}})
    }).success(function(data, status, headers, config) {
      $scope.isCreatedSuccess = true;
      $scope.isEditedSuccess = false;
      $scope.getCDs();
    }).error(function() {
        console.log('error create a cd');
    });
  };

  // Edit a CD
  $scope.editCDs = function() {
    $http({
      url: apiUrl + 'cds/' + $scope.cd.id,
      method: "PUT",
      data: JSON.stringify({cd: {title: $scope.cd.title}})
    }).success(function(data, status) {
      $scope.cd.title = '';
      $scope.isEditedSuccess = true;
      $scope.isCreating = true;
      $scope.isCreatedSuccess = false;
      $scope.getCDs();
    }).error(function() {
        console.log('error update a cd');
    })
  }

  // Delete a CD
  $scope.deleteCDs = function(id) {
    $http({
      url: apiUrl + 'cds/' + id,
      method: "DELETE",
    }).success(function(data, status) {
      $scope.isEditedSuccess = false;
      $scope.isCreatedSuccess = false;
      $scope.isCreating = true;
      $scope.getCDs();
    }).error(function() {
    });
  }

  $scope.switchToUpdate = function(cd) {
    $scope.isCreating = false;
    $scope.cd.id = cd._id;
    $scope.cd.title = cd.title;
  }

  $scope.resetState = function() {
    $scope.isEditedSuccess = false;
    $scope.isCreatedSuccess = false;
    $scope.isCreating = true;
  }
});
