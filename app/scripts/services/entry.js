'use strict';

/**
 * Handles REST api for entries
 * 
 */
angular.module('cardsortingApp')
    .factory('Entry', function Entry($resource) {

        return $resource('/api/entries', {}, {
            get: {
                method: 'GET',
                isArray: true
            },
            // can be dropped probably
            // because entries will be created/updated
            // as part of card sorting session
            // 
            // a separate constraints module
            // will tak care about keeping data 
            // between Entry and CardSorting Session in sync
            create: {
                method: 'POST',
                isArray: true
            }
        });
    });