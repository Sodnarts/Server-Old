const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
            proxy: true,
        },
        async (accesToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleID: profile.id });
            if (existingUser) {
                console.log('Existing User: - \n', existingUser);
                return done(null, existingUser);
            }
            const user = await new User({ googleID: profile.id, googleName: profile.displayName }).save();
            done(null, user);
        },
    ),
);
