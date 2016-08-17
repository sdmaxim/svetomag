'use strict';

angular.
  module('content').
  component('content', {
    templateUrl: function ($routeParams) {
      return 'info/' + $routeParams.pageName + '.html';
    }
  });