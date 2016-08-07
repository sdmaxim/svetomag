angular.
  module('core.getJsonFile')
  .factory('GetJSONFile', ['$resource',
    function($resource) {
      return $resource('json/:filename.json', {}, {
      	query: {
          method: 'GET',
          params: {filename: 'name'},
          isArray: true
        }
      });
    }
  ]);