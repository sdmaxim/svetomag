angular.
  module('core.auth')
  .factory('Auth', ['$q', '$http', function($q, $http){
    return {
      login : function (username, password){
        var d = $q.defer();
        console.log("login");
        $http.post('/login', {
          "username" : username,
          "password" : password
        })
        .success(function(data, status) { d.resolve(data.auth); })
          .error(function(data, status) { d.reject(data); });
        return d.promise;
      },
      logout : function (){
        var d = $q.defer();
        console.log("logout");
        $http.get('/logout', {})
        .success(function(data, status) { d.resolve(data.auth); })
          .error(function(data, status) { d.reject(data); });
        return d.promise;
      }
    }
  }]);