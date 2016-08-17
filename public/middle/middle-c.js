'use strict';

angular.
  module('middle').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      $routeProvider.
        when('/', {
          templateUrl: 'info/first-page.html'
        }).
        when('/info/:pageName.html', {
          template: '<content></content>'
        }).
        when('/category/:id/:name', {
          template: '<category-list></category-list>' + 
                    '<product-list></product-list>'
        }).
        when('/product/:id/:name', {
          template: '<product></product>'
        }).
        otherwise('/');
    }
  ]);