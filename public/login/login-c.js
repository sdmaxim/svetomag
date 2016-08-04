'use strict';

angular.
  module('auth')
  .component('auth', {
    templateUrl: 'login/login.html',
    controller: ['Auth', function($scope, Auth) {
    $scope.login = function() {
      Auth.login()
      .then(function(data) {
        $scope.loginStatus = data;
      });
    }
  }]
});