'use strict';

angular.module('cardsortingApp')
    .controller('HomeCtrl', function ($scope, $http) {
        $http.get('/api/awesomeThings').success(function(awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        });
    });
