'use strict';

angular.
  module('categoryList').
  component('categoryList', {
    templateUrl: function () {
      return 'middle/category-list/category-list.html';
    },
    controller: ['$routeParams', 'Db', function ($routeParams, Db) {
        var self = this;

          self.db = Db.getCategory($routeParams.id).then(function(data) {
            self.menuItems = data;
            self.prodList = data;
          });
        }
    ]
  });