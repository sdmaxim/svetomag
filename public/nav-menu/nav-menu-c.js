'use strict';

angular.
  module('navMenu')
  .component('navMenu', {
    templateUrl: ['$element', '$attrs', function($element, $attrs) {
      return 'nav-menu/' + $attrs.menuType + '.html';
    }],
    controller: ['$element', '$attrs', 'GetJSONFile', function ($element, $attrs, GetJSONFile) {
        var self = this;
        self.db = GetJSONFile.get({filename: $attrs.menuType}, function() {
          self.menuItems = self.db.list;
          self.category = self.db.category;
        });
      }
    ]
  });