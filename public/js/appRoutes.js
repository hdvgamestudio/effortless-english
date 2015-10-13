// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
    })
    .when('/cds', {
      templateUrl: 'views/cd.html',
      controller: 'CDController',
    })
    .when('/cds/:cd_id/lessions', {
      templateUrl: 'views/lession.html',
      controller: 'LessionController',
    })
    .when('/cds/:cd_id/lessions/:lession_id/sections', {
      templateUrl: 'views/section.html',
      controller: 'SectionController',
    })
    .otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);

}]);
