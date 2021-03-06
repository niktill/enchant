const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            // user already exists
            done(null, existingUser);
        } else {
            // new user
            const user = await new User({ googleId: profile.id, accessToken: accessToken }).save()
            done(null, user);
        }
    })
);

passport.use(new FacebookStrategy({
    clientID: keys.facebookAppID,
    clientSecret: keys.facebookAppSecret,
    callbackURL: '/auth/facebook/callback',
    proxy: true,
    profileFields: ['id']
},
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ facebookId: profile.id });
        if (existingUser) {
            // user already exists
            done(null, existingUser);
        } else {
            // new user
            const user = await new User({ facebookId: profile.id, accessToken: accessToken }).save()
            done(null, user);
        }
    })
);