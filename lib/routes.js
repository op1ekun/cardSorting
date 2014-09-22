'use strict';

var api           = require('./controllers/api'),
    index         = require('./controllers'),
    users         = require('./controllers/users'),
    session       = require('./controllers/session'),
    cardSessions  = require('./controllers/cardSessions'),
    entries       = require('./controllers/entries'),
    middleware    = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

    // Server API Routes
    app.route('/api/awesomeThings')
        .get(api.awesomeThings);
  
    app.route('/api/users')
        .post(users.create)
        .put(users.changePassword);

    // use it to get stuff  
    app.route('/api/users/me')
        .get(users.me);

    app.route('/api/users/:id')
        .get(users.show);

    app.route('/api/cardSessions')
        .get(cardSessions.get)
        .post(cardSessions.create);

    app.route('/api/cardSessions/:id')
        .get(cardSessions.getSessionById)
        .post(cardSessions.update);

    app.route('/api/cardSessions/:id/:property')
        .get(cardSessions.getEntriesBySession);       

    app.route('/api/entries')
        .post(entries.create);

    app.route('/api/session')
        .post(session.login)
        .delete(session.logout);

    // All undefined api routes should return a 404
    app.route('/api/*')
        .get(function(req, res) {
            res.status(404)
                .sendfile('app/views/404.html');
        });

    // All other routes to use Angular routing in app/scripts/app.js
    app.route('/partials/*')
        .get(index.partials);

    app.route('/*')
        // session
        .get(middleware.setUserCookie)
        // FIXME
        .get(api.dummydata)
        .get(index.index);
};