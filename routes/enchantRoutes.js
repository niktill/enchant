const mongoose = require('mongoose');
const User = mongoose.model('users');
const bodyParser = require('body-parser');

module.exports = (app) => {
    // SpellBook Routes
    app.get('/api/current_user/spellbookspells', async (req, res) => {
        if (req.user) {
            const user = await User.findById(req.user.id);
            if (user) {
                res.send(user.spellBookSpells);
            } else {
                res.send(404);
            }
        } else {
            res.send(404);
        }
    });
    app.post('/api/current_user/spellbookspells', async (req, res) => {
        if (req.user) {
            const user = await User.findByIdAndUpdate(req.user.id, {spellBookSpells: req.body.spellBookSpells});
            if (user) {
                res.send(200);
            } else {
                res.send(400);
            }
        } else {
            res.send(400);
        }
    });

    app.get('/api/current_user/dailyspells', async (req, res) => {
        if (req.user) {
            const user = await User.findById(req.user.id);
            if (user) {
                res.send(user.dailySpells);
            } else {
                res.send(404);
            }
        } else {
            res.send(404);
        }
    });
    app.get('/api/current_user/spellslots', async (req, res) => {
        if (req.user) {
            const user = await User.findById(req.user.id);
            if (user) {
                res.send(user.spellSlots);
            } else {
                res.send(404);
            }
        } else {
            res.send(404);
        }
    });
}