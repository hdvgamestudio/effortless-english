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

angular.module('HelpCtrl', ['ngSanitize']).controller('HelpController', function($scope, $http, $routeParams, api){
  var apiUrl = GET_URL = CREATE_URL = api.base_url + '/helps';
  $scope.help = {content: ''};
  $scope.isCreating = true;
  // Markdown
  $scope.$watch('help.content', function(current, original) {
    $scope.outputText = marked(current);
  });
  // Get Help List
  $scope.getHelps = function() {
    $http.get(GET_URL)
      .success(function(helps) {
        $scope.helps = helps;
    })
      .error(function() {
        console.log('error get list');
    })
  }
  $scope.getHelps();
  // Create a new help
  $scope.createHelps = function() {
    $http({
      url: CREATE_URL,
      method: "POST",
      data: JSON.stringify({
        help: {
          title: $scope.help.title,
          language: $scope.help.language,
          content: $scope.help.content
        }
      })
    }).success(function(data, status) {
      $scope.isCreatedSuccess = true;
      $scope.isEditedSuccess = false;
      $scope.getHelps();
    }).error(function() {
        console.log('error create a help');
    });
  };
  // Edit a Help
  $scope.editHelps = function() {
    $http({
      url: GET_URL + '/' + $scope.help._id,
      method: "PUT",
      data: JSON.stringify({
        help: {
          title: $scope.help.title,
          language: $scope.help.language,
          content: $scope.help.content
        }
      })
    }).success(function(data, status) {
      $scope.isEditedSuccess = true;
      $scope.isCreating = true;
      $scope.isCreatedSuccess = false;
      $scope.getHelps();
    }).error(function() {
        console.log('error update a help');
    })
  }

  $scope.switchToUpdate = function(help) {
    $scope.isCreating = false;
    $scope.help = help;
  }
  // Delete a Help
  $scope.deleteHelps = function(id) {
    $http({
      url: GET_URL + '/'+ id,
      method: "DELETE",
    }).success(function(data, status) {
      $scope.isEditedSuccess = false;
      $scope.isCreatedSuccess = false;
      $scope.isCreating = true;
      $scope.getHelps();
    }).error(function() {
    });
  }
});
