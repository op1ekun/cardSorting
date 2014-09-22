angular.module('cardsortingApp')
    .controller('ShareCtrl',

    function($scope, $modalInstance, Entry, CardSession, id, name) {
        'use strict';

        $scope.session = {
            id          : id,
            name        : name,
            newEmail    : '',
            emails      : []
        };

        $scope.addEmailOnEnter = function(ev){
            if (ev.charCode === 13) {
                $scope.addEmail();
            }
        };

        $scope.addEmail = function() {
            $scope.session.emails.push($scope.session.newEmail);
            $scope.session.newEmail = '';
        };

        $scope.share = function () {
            Entry.create($scope.session.emails, function(results) {
                console.log(results, results.length);

                CardSession.update({
                    entries: results.map(function(elem) {
                        return elem._id;
                    }),
                    sessionId: id
                });

                $modalInstance.close();
            }, function(err) {
                console.error('error creating entries', err);
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });