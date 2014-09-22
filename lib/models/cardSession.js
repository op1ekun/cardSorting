'use strict';

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

/**
 * Master Card Sorting Session
 *
 * Defines either closed of open card sorting session,
 * defines card items,
 * tracks participant entries.
 *
 * @field {String}      name        the name of the session
 * @field {Date}        timestamp   the time of creation
 * @field {Array}       categories  a list of category names for closed card sorting
 *                                  an empty list for open card sorting
 * @field {Array}       items       an array of item names
 * @field {Array}       entries     a collection of references to participant entry objects 
 * @field {ObjectId}    user        a reference to creator's user object
 *  
 */
var cardSortingSession = new Schema({
    name        : String,
    timestamp   : Date,
    categories  : Array,
    items       : Array,
    entries     : [ { type: mongoose.Schema.ObjectId, ref : 'Entry'} ],
    user        : { type : mongoose.Schema.ObjectId, ref : 'User'}
});

// FIXME add validation
mongoose.model('CardSortingSession', cardSortingSession);