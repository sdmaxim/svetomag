'use strict';

angular.
  module('navMenu')
  .component('navMenu', {
    templateUrl: ['$attrs', function($attrs) {
      return 'nav-menu/' + $attrs.menuType + '.html';
    }],
    controller: ['$attrs', 'Db', 'GetJSON', function ($attrs, Db, GetJSON) {
        var self = this;

        switch($attrs.menuType) {
          case "top-menu" : 
            self.db = GetJSON.get({filename: $attrs.menuType}, function() {
              self.menuItems = self.db.list;
              self.category = self.db.category;
            });
          break;
          case "left-menu" : 
            self.db = Db.getMenu(12)
              .then(function(data) {
              self.menuItems = data;
              self.prodList = data;
            });
          break;
        }
      }
    ]
  });