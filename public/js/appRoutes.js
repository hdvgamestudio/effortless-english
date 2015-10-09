// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'AuthController',
      access: { requiredLogin: false }
    })
    .when('/cds', {
      templateUrl: 'views/cd.html',
      controller: 'CDController',
      access: { requiredLogin: true }
    })
    .when('/cds/:cd_id/lessions', {
      templateUrl: 'views/lession.html',
      controller: 'LessionController',
      access: { requiredLogin: true }
    })
    .when('/cds/:cd_id/lessions/:lession_id/sections', {
      templateUrl: 'views/section.html',
      controller: 'SectionController',
      access: { requiredLogin: true }
    })
    .otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);

}]);
