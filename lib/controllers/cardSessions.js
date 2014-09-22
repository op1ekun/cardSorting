'use strict';

var mongoose    = require('mongoose'),
    // ObjectId    = mongoose.Types.ObjectId,
    CardSession = mongoose.model('CardSortingSession');

exports.create = function(req, res, next) {
    var cardSession         = new CardSession(req.body);
    cardSession.timestamp   = new Date();
    cardSession.user        = req.user._id;

    cardSession.save(function(err) {
        if (err) {
            return res.send(400);
        }

        res.json(cardSession);
    });
};

/**
 * Get ALL card sessions
 * 
 * FIXME
 * Get ONLY card sessions created by logged in user
 * 
 * @param  {Object}             req express request object
 * @param  {Object}             res express response object
 * @return {Object|String}          returns a parsed JSON object or an error
 */
exports.get = function(req, res) {
    CardSession.find({user : req.user._id})
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

exports.getEntriesBySession = function(req, res) {
    CardSession.find({_id : req.params.id}, {name : 1, entries : 1})
        .sort('-timestamp')
        .populate('entries')
        .exec(function(err, result) {
            if (!err) {
                return res.json(result);
            } else {
                // only this way we can trigger error callback on $http.get()
                // return res.send(err);
                throw err;
            }
        });
    // res.send(200);
};

exports.getSessionById = function(req, res) {
    console.log('getSessionById params', req.params);
    console.log('getSessionById query', req.query);

    // TODO use findOne
    res.send(200);
};

exports.update = function(req, res) {
    CardSession.findOneAndUpdate(
        {_id : req.body.sessionId}, 
        {entries : req.body.entries}, {}, 
        function(err, cardSession) {

            if (err) {
                return res.send(400);
            }

            res.json(cardSession);
        });
};