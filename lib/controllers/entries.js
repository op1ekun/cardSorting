'use strict';

var mongoose    = require('mongoose'),
    Entry       = mongoose.model('Entry');
exports.get = function(req, res) {
    console.log('Entry.get')

    Entry.find()
        .sort('-timestamp')
        .exec(function(err, result) {
            if (!err) {
                return res.json(result);
            } else {
                // only this way we can trigger error callback on $http.get()
                // return res.send(err);
                throw err;
            }
        });
};

/**
 * Saves entries in the mongodb database using batch insert
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.create = function(req, res, next) {
    
    // we need native mongodb driver to use batchInsert
    var Db      = require('mongoose/node_modules/mongodb').Db,
        config  = require('../config/config'),
        emails  = req.body,
        entries = [],
        timestamp, mongo;

    for (var i = 0, l = emails.length; i < l; i++) {

        timestamp = new Date();

        entries.push({
            participant: {
                email: emails[i]
            },
            timestamp: timestamp.getTime(),
            // TODO for now the session entry expires after 7 days
            expires: timestamp.setDate(timestamp.getDate() + 7),
            active: true
        });
    }

    Db.connect(config.mongo.uri, function(err, db) {
        if (err) {
            return console.dir('error while connecting to database', err);
        }

        db.collection('entries').insert(entries, function(err, result) {

            if (err) {
                return console.dir('error while inserting entries', err);
            }

            // TODO return ids of inserted entries
            res.json(result);    
        });

    });
};