'use strict';

angular.module('cardsortingApp')
    .controller('SessionsCtrl', function ($scope, $log, $modal, CardSession) {

        CardSession.get(function(sessions) {
            $scope.sessions = sessions;
        }, function(err) {
            console.error('error getting card sessions', err);
        });

        $scope.activeMode = false;

        $scope.switchMode = function() {
            $scope.activeMode = !$scope.activeMode;
        };

        $scope.createCardSession = function(form) {
            if (form.$valid) {
                CardSession.create($scope.cardSession, function(newCardSession) {
                    $scope.sessions.unshift(newCardSession);
                    $scope.activeMode = false;
                }, function(err) {
                    console.error('cardSession create error', err);
                });
            }
        };

        $scope.shareSession= function(id, name) {

            var modalInstance = $modal.open({
                templateUrl: 'partials/share',
                controller: 'ShareCtrl',
                resolve: {
                    id      : function() {
                        return id;
                    },
                    name    : function() {
                        return name;
                    }
                }
            });

            modalInstance.result.then(function() {
                $log.info('Modal closed at: ' + new Date());
                // $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    });
