'use strict';

angular.
  module('navMenu')
  .component('navMenu', {
    templateUrl: ['$attrs', function($attrs) {
      return 'nav-menu/' + $attrs.menuType + '.html';
    }],
    controller: ['$attrs', 'GetJSON', 
      function ($attrs, GetJSON) {
        var self = this;
        switch($attrs.menuType) {
          case "top-menu" : 
            self.db = GetJSON.get({filename: $attrs.menuType}, function() {
              self.menuItems = self.db.list;
              self.category = self.db.category;
            });
          break;
        }
      }
    ]
  })
  .component('recursiveMenu', {
    templateUrl : 'nav-menu/recursive-menu.html',
    bindings: {
      'level' : '@'
    },
    controller: ['$scope', 'Db', '$routeParams', 
      function ($scope, Db, $routeParams) {
        var self = this;
        self.show = 0;
        //Нужно с сервера получать правильный json чтобы сразу его рисовать
        //А уже json рекурсивно отображать
        if (!$routeParams.id) $routeParams.id = 0;
        var renderMenu = function() {
          self.db = Db.getMenu(self.level).then(function(data) {
            self.menuItems = data;
            self.prodList = data;
             console.log($routeParams.id + " " + self.level);
            if ($routeParams.id == self.level) self.show = 1; else self.show = 0;
          });
        };
        renderMenu();
        $scope.$on('$routeChangeSuccess', renderMenu);
      }
    ]
  });