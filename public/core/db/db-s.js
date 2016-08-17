angular.
  module('core.db')
  .factory('Db', ['$q', '$http', function($q, $http){
    return {
      getProd : function (id){
        var d = $q.defer();
        console.log("Prod - id", id);

        $http.post('/get-prod', {id : id})
        .success(function(data, status) { d.resolve(data); })
          .error(function(data, status) { d.reject(data); });
        return d.promise;
      },
      getCategory : function (id){
        var d = $q.defer();
        console.log("Category - id", id);

        $http.post('/get-category', {id : id})
        .success(function(data, status) { d.resolve(data); })
          .error(function(data, status) { d.reject(data); });
        return d.promise;
      },
      getMenu : function (id){
        var d = $q.defer();
        if (!id) id = 0;
        console.log("Menu - id", id);

        $http.post('/get-menu', {id : id})
        .success(function(data, status) { d.resolve(data); })
          .error(function(data, status) { d.reject(data); });
        return d.promise;
      }
    }
  }
]); 