angular.module('effortless-app', ['ngRoute', 'appRoutes', 'CDCtrl', 'LessionCtrl', 'SectionCtrl', 'AuthCtrl', 'TokenSer', 'ui.bootstrap', 'directives']);

angular.module('effortless-app').constant('api', {
  base_url: 'http://localhost:3000/api/v1'
})
angular.module('effortless-app').config(function ($httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptor');
});

