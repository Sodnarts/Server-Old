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
        console.log(req.isAuthenticated());
        req.logout();
        req.logOut();
        console.log('SESSION1: ', req.session);
        req.session = null;
        console.log('SESSION2: ', req.session);
        req.session.destroy();
        console.log('SESSION3: ', req.session);
        console.log(req.isAuthenticated());
        res.redirect(keys.redirectDomain);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
