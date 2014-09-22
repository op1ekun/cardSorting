'use strict';

angular.module('cardsortingApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
