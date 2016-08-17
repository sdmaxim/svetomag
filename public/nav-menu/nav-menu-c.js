'use strict';

angular.
  module('navMenu')
  .component('navMenu', {
    templateUrl: ['$attrs', function($attrs) {
      return 'nav-menu/' + $attrs.menuType + '.html';
    }],
    controller: ['$attrs', '$scope', 'Db', 'GetJSON', '$routeParams', 
      function ($attrs, $scope, Db, GetJSON, $routeParams) {
        var self = this;
        var renderMenu = function() {
          self.level = $attrs.level + 1;
          self.show = 0;
          console.log(self.level + " " + $attrs.menuType);
          self.db = Db.getMenu($routeParams.id).then(function(data) {
            self.menuItems = data;
            self.prodList = data;
            //if (!data || self.level > 1) self.show = 0; else self.show = 1;
          });
        };
        switch($attrs.menuType) {
          case "top-menu" : 
            self.db = GetJSON.get({filename: $attrs.menuType}, function() {
              self.menuItems = self.db.list;
              self.category = self.db.category;
            });
          break;
          case "left-menu" : 
            renderMenu();
            $scope.$on('$routeChangeSuccess', renderMenu);
          break;
        }
      }
    ]
  });