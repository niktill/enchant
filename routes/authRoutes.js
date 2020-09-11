const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/');
    });

    app.get('/auth/facebook',
        passport.authenticate('facebook')
    );

    app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
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
            const user = await User.findByIdAndDelete(req.user.id);
            if (user) {
                req.logout();
                res.send(200);
            } else {
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
