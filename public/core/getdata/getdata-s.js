angular.
  module('core.getdata')
  .factory('GetData', ['$resource',
    function($resource) {
      return $resource('data/json/:filename.json', {}, {
      	query: {
          method: 'GET',
          params: {filename: 'name'},
          isArray: true
        }
      });
    }
  ])
  .factory('Auth', function($q, $http){
    return {
      login : function (){
        var d = $q.defer();
        $http.get('/auth', {})
        .success(function(data, status) { d.resolve(data.auth); })
          .error(function(data, status) { d.reject(data); });
        return d.promise;
      }
    }
  });