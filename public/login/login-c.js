'use strict';

angular.
  module('login')
  .component('login', {
    templateUrl: 'login/login.html',
    controller: ['Auth', function(Auth) {
    this.login = function() {
      var self =  this;
      Auth.login(self.username, self.password)
      .then(function(data) {
        self.loginStatus = data;
      });
    };
    this.logout = function() {
      var self =  this;
      Auth.logout()
      .then(function(data) {
        self.loginStatus = data;
      });
    };

  }]
});