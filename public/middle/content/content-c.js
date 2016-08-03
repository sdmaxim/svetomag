'use strict';

angular.
  module('content').
  component('content', {
    templateUrl: function ($routeParams) {
      return 'data/' + $routeParams.pageType + '/' + $routeParams.pageId + '.html';
    }
  });