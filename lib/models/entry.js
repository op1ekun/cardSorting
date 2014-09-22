'use strict';

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

/**
 * Participation entry
 *
 * @field {Mixed}       participant an object containing participant data 
 *                      like first/last name, email etc.
 * @field {Date}        timestamp   the time of submit
 * @field {Mixed}       entry       paritcipant's entry object
 * @field {Date}        expires     the expiration date
 */
var participationEntry = new Schema({

    participant : {},
    timestamp   : Date,
    entry       : {},
    expires     : Date,
    active      : Boolean,
});

// FIXME add validation
mongoose.model('Entry', participationEntry);