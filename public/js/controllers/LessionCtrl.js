angular.module('LessionCtrl', []).controller('LessionController', function($scope, $http, $routeParams, api) {
  var apiUrl = api.base_url + '/cds/' + $routeParams.cd_id;
  var GET_URL = CREATE_URL = apiUrl + '/lessions';
  $scope.lessionTitle = '';
  // Get the cd of the lessions
  getCD();
  $scope.lession = {};
  $scope.isCreating = true;
  // Get Lession List
  $scope.getLessions = function() {
    $http.get(GET_URL)
      .success(function(lessions) {
        $scope.lessions = lessions;
    })
      .error(function() {
        console.log('error get list');
    })
  }
  $scope.getLessions();
  // Create a new Lession
  $scope.createLessions = function() {
    $http({
      url: CREATE_URL,
      method: "POST",
      data: JSON.stringify({
        lession: {
          cd_id: $routeParams.cd_id,
          title: $scope.lession.title
        }
      })
    }).success(function(data, status, headers, config) {
      $scope.lessionTitle = $scope.lession.title;
      $scope.lession.title = '';
      $scope.isCreatedSuccess = true;
      $scope.isEditedSuccess = false;
      $scope.getLessions();
    }).error(function() {
        console.log('error create a lession');
    });
  };
  // Edit a Lession
  $scope.editLessions = function() {
    $http({
      url: apiUrl + '/lessions/' + $scope.lession.id,
      method: "PUT",
      data: JSON.stringify({
        lession: {
          cd_id: $routeParams.cd_id,
          title: $scope.lession.title
        }
      })
    }).success(function(data, status) {
      $scope.lessionTitle = $scope.lession.title;
      $scope.lession.title = '';
      $scope.isEditedSuccess = true;
      $scope.isCreating = true;
      $scope.isCreatedSuccess = false;
      $scope.getLessions();
    }).error(function() {
        console.log('error update a cd');
    })
  }

  $scope.switchToUpdate = function(lession) {
    $scope.isCreating = false;
    $scope.lession.id = lession._id;
    $scope.lession.title = lession.title;
  }
  // Delete a Lession
  $scope.deleteLessions = function(id) {
    $http({
      url: apiUrl + '/lessions/'+ id,
      method: "DELETE",
    }).success(function(data, status) {
      $scope.isEditedSuccess = false;
      $scope.isCreatedSuccess = false;
      $scope.isCreating = true;
      $scope.getLessions();
    }).error(function() {
    });
  }

  function getCD() {
    $http.get(apiUrl)
      .success(function(cd) {
        $scope.cd = cd;
    })
      .error(function() {
        console.log('error get cd');
    })
  }

});
