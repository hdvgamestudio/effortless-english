angular.module('SectionCtrl', []).controller('SectionController', function($scope, $http, $routeParams){
  var apiUrl = 'http://localhost:3000/api/v1/cds/' + $routeParams.cd_id;
  var GET_URL = CREATE_URL = apiUrl + '/lessions/' + $routeParams.lession_id + '/sections';
  // Get the cd and lession of the section
  getCD();
  getLession();
  $scope.section = {};
  $scope.isCreating = true;
  // Get Section List
  $scope.getSections = function() {
    $http.get(GET_URL)
      .success(function(sections) {
        $scope.sections = sections;
    })
      .error(function() {
        console.log('error get list');
    })
  }
  $scope.getSections();
  // Create a new Lession
  $scope.createSections = function() {
    $http({
      url: CREATE_URL,
      method: "POST",
      data: JSON.stringify({
        section: {
          lession_id: $routeParams.lession_id,
          title: $scope.section.title,
          section_type: $scope.section.section_type,
          url: $scope.section.url,
          content: $scope.section.content
        }
      })
    }).success(function(data, status, headers, config) {
      $scope.isCreatedSuccess = true;
      $scope.isEditedSuccess = false;
      $scope.getSections();
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
  function getLession() {
    $http.get(apiUrl + '/lessions/' + $routeParams.lession_id)
      .success(function(lession) {
        $scope.lession = lession;
    })
      .error(function() {
        console.log('error get lession');
    })
  }
});
