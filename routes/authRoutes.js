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

    app.get('/api/logout', async (req, res) => {
        console.log(req.isAuthenticated());
        console.log(req.user);
        req.logout();
        console.log(req.isAuthenticated());
        console.log(req.user);
        const user = await req.user.save();
        res.send(user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
