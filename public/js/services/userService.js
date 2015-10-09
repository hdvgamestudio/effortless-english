angular.module('UserSer', ['effortless-app']).factory('UserService', function($http, api) {

  return {
    logIn: function(username, password) {
      return $http.post(api.base_url + '/login', {username, password});
    },
    logOut: function() {
    }
  }
})
