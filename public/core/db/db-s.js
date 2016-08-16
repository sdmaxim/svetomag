angular.
  module('core.db')
  .factory('Db', ['$q', '$http', function($q, $http){
    return {
      getProd : function (prodId){
        var d = $q.defer();
        console.log("clien - id", prodId);

        $http.post('/get-prod', {
          prodId : prodId
        })
        .success(function(data, status) { d.resolve(data); })
          .error(function(data, status) { d.reject(data); });
        return d.promise;
      },
      getProdList : function (catId){
        var d = $q.defer();
        console.log("clien - id", catId);

        $http.post('/get-prod-list', {
          catId : catId
        })
        .success(function(data, status) { d.resolve(data); })
          .error(function(data, status) { d.reject(data); });
        return d.promise;
      },
      getMenu : function (menuType){
        var d = $q.defer();
        console.log("clien - id", menuType);

        $http.post('/get-menu', {
          menuType : menuType
        })
        .success(function(data, status) { d.resolve(data); })
          .error(function(data, status) { d.reject(data); });
        return d.promise;
      }
    }
  }
]); 