'use strict';

angular.module('cardsortingApp')
    .controller('EntriesCtrl', function ($scope, $http, $location, CardSession) {

        var urlParts    = $location.path().split('/'),
            sessionId   = urlParts[2];

        $scope.session  = {
            name: '',
            entries: []
        };

        CardSession.getEntriesBySession({
            sessionId: sessionId
        }, function(session) {
            $scope.session.name     = session[0].name;
            $scope.session.entries  = session[0].entries;
        });

        /**
         * probably doesn't make much sense for the same reason as createEntry doesn't
         * kept only for reference and TEMP My Entries page
         * FIXME
         */
        // Entry.get(function(entries) {
        //     $scope.entries = entries;
        // }, function(err) {
        //     console.error('error getting entries', err);
        // });            

        // probably the only one that makes sense
        // for the purpose of data sync
        // $scope.update = function() {

        // }

        // Entries make sense only when they are created along with the card sorting session.
        // So there is no need to have a standalone create entry form.
        // 
        // TEMP 
        // kept only for a reference
        // to be removed later 
        // 
        // $scope.createEntry = function(form) {
            // if (form.$valid) {
            //     Entry.create($scope.Entry, function(newEntry) {
            //         $scope.entries.unshift(newEntry);
            //         $scope.activeMode = false;
            //     }, function(err) {
            //         console.error('Entry create error', err);
            //     });
            // }
        // };
    });
