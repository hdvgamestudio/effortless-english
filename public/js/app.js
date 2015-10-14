angular.module('effortless-app', ['ngRoute', 'appRoutes', 'CDCtrl', 'LessionCtrl', 'SectionCtrl', 'AuthCtrl', 'HelpCtrl', 'TokenSer', 'ui.bootstrap', 'directives']);

angular.module('effortless-app').constant('api', {
  base_url: '/api/v1'
})
angular.module('effortless-app').config(function ($httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptor');
});

