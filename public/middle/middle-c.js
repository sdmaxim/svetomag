'use strict';

angular.
  module('middle').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      $routeProvider.
        when('/', {
          template: '<nav-menu menu-type="middle-menu"></nav-menu>'
        }).
        when('/:pageType/:pageId.html', {
          template: '<content></content>'
        }).
        otherwise('/');
    }
  ]);