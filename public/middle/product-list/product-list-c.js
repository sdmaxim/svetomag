'use strict';

angular.
  module('productList').
  component('productList', {
    templateUrl: function ($routeParams) {
      return 'middle/product-list/product-list.html';
    }
  });