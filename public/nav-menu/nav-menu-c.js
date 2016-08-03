'use strict';

angular.
  module('navMenu')
  .component('navMenu', {
    templateUrl: ['$element', '$attrs', function($element, $attrs) {
      return 'nav-menu/' + $attrs.menuType + '.html';
    }],
    controller: ['$element', '$attrs', 'GetData', function ($element, $attrs, GetData) {
        var self = this;
        self.db = GetData.get({filename: $attrs.menuType}, function() {
          self.menuItems = self.db.list;
          self.category = self.db.category;
        });
      }
    ]
  });