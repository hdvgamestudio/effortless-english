marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false, // if false -> allow plain old HTML ;)
  smartLists: true,
  smartypants: false,
  highlight: function (code, lang) {
    if (lang) {
      return hljs.highlight(lang, code).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});

angular.module('SectionCtrl', ['ngSanitize']).controller('SectionController', function($scope, $http, $routeParams, api){
  var apiUrl = api.base_url + '/cds/' + $routeParams.cd_id;
  var GET_URL = CREATE_URL = apiUrl + '/lessions/' + $routeParams.lession_id + '/sections';
  // Get the cd and lession of the section
  getCD();
  getLession();
  $scope.section = {content: ''};
  $scope.isCreating = true;
  // Markdown
  $scope.$watch('section.content', function(current, original) {
    $scope.outputText = marked(current);
  });
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
  // Create a new section
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
        console.log('error create a section');
    });
  };
  // Edit a Section
  $scope.editSections = function() {
    $http({
      url: GET_URL + '/' + $scope.section._id,
      method: "PUT",
      data: JSON.stringify({
        section: {
          lession_id: $routeParams.lession_id,
          title: $scope.section.title,
          section_type: $scope.section.section_type,
          url: $scope.section.url,
          content: $scope.section.content
        }
      })
    }).success(function(data, status) {
      $scope.isEditedSuccess = true;
      $scope.isCreating = true;
      $scope.isCreatedSuccess = false;
      $scope.getSections();
    }).error(function() {
        console.log('error update a section');
    })
  }

  $scope.switchToUpdate = function(section) {
    $scope.isCreating = false;
    $scope.section = section;
  }
  // Delete a Section
  $scope.deleteSections = function(id) {
    $http({
      url: GET_URL + '/'+ id,
      method: "DELETE",
    }).success(function(data, status) {
      $scope.isEditedSuccess = false;
      $scope.isCreatedSuccess = false;
      $scope.isCreating = true;
      $scope.getSections();
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
