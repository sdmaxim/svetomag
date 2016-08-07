angular.
  module('core.getJson')
  .factory('GetJSON', ['$resource',
    function($resource) {
      return $resource('json/ddd.json', {}, {
      	query: {
          method: 'GET',
          params: {filename: 'name'},
          isArray: true
        }
      });
    }
  ]);