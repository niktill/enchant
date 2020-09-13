const passport = require('passport');
const mongoose = require('mongoose');
const axios = require('axios');
const User = mongoose.model('users');

module.exports = (app) => {
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
        (req, res) => {
            res.redirect('/');
        });

    app.get('/auth/facebook',
        passport.authenticate('facebook')
    );

    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
        (req, res) => {
            res.redirect('/');
        });

    app.get('/api/current_user', (req, res) => {
        if (req.user) {
            res.send(req.user);
        } else {
            res.sendStatus(404);
        }
    });

    app.delete('/api/current_user', async (req, res) => {
        if (req.user) {
            try {
                const user = await User.findByIdAndDelete(req.user.id);
                if (user) { // user successfully deleted from database
                    if (user.accessToken) { // try to revoke app permissions from google or facebook
                        if (user.googleId) {
                            axios.post('https://oauth2.googleapis.com/revoke?token=' + req.user.accessToken);
                        } else if (user.facebookId) {
                            axios.delete('https://graph.facebook.com/' + user.facebookId + '/permissions?access_token=' + user.accessToken);
                        }
                    }
                    req.logout();
                    res.sendStatus(200);
                }
            } catch (err) {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(400);
        }
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/status', (req, res) => {
        mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2
            ? res.sendStatus(200) : res.sendStatus(500);
    })
}
