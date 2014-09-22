'use strict';

angular.module('cardsortingApp')
    .factory('CardSession', function CardSession($resource) {

        return $resource('/api/cardSessions/:sessionId/:property', {
            sessionId: '@sessionId',
            property: '@property'
        }, {
            create: {
                method: 'POST',
                transformRequest: function(data, headerFn) {

                    // otherwise it doesn't work with nodejs' body-parser
                    return JSON.stringify({
                        name        : data.name,
                        categories  : data.categories.split(','),
                        items       : data.items.split(',')
                    });
                }
            },
            get: {
                method: 'GET',
                isArray: true
            },
            getSessionById: {
                method: 'GET',
                isArray: true,
                params: {                  
                }
            },
            getEntriesBySession: {
                method: 'GET',
                isArray: true,
                params: {
                    property: 'entries'
                }
            },
            update: {
                method: 'POST'                
            }
        });
    });