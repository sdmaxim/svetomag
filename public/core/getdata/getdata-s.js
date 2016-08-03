angular.
  module('core.getdata').
  factory('GetData', ['$resource',
    function($resource) {
      return $resource('data/json/:filename.json', {}, {
      	query: {
          method: 'GET',
          params: {filename: 'name'},
          isArray: true
        }
      });
    }
  ]);