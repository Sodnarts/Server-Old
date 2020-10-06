const passport = require('passport');
const keys = require('../config/keys');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        }),
    );

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect(keys.redirectDomain);
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.isAuthenticated());
    });

    app.get('/api/current_user', (req, res) => {
        console.log(req.user);
        res.send(req.user);
    });
};
