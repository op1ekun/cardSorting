'use strict';

var mongoose        = require('mongoose'),
    Thing           = mongoose.model('Thing'),
    // FIXME
    dummy           = require('../config/dummydata.js');

exports.dummydata = dummy.populate;

function processFind(res) {

    return function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            // only this way we can trigger error callback on $http.get()
            // return res.send(err);
            throw err;
        }
    };
}

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
    Thing.find({})
        .sort({'name' : 1})
        .exec((function() {
            return processFind(res);
        })());
};
