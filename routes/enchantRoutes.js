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
                res.sendStatus(404);
            }
        } else {
            res.sendStatus(404);
        }
    });
    app.post('/api/current_user/spellbookspells', async (req, res) => {
        if (req.user) {
            const user = await User.findByIdAndUpdate(req.user.id, {spellBookSpells: req.body.spellBookSpells});
            if (user) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        } else {
            res.sendStatus(400);
        }
    });
    // Daily Spells Routes
    app.get('/api/current_user/dailyspells', async (req, res) => {
        if (req.user) {
            const user = await User.findById(req.user.id);
            if (user) {
                res.send(user.dailySpells);
            } else {
                res.sendStatus(404);
            }
        } else {
            res.sendStatus(404);
        }
    });
    app.post('/api/current_user/dailyspells', async (req, res) => {
        if (req.user) {
            const user = await User.findByIdAndUpdate(req.user.id, {dailySpells: req.body.dailySpells});
            if (user) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        } else {
            res.sendStatus(400);
        }
    });

    // Spell Slots Routes
    app.get('/api/current_user/spellslots', async (req, res) => {
        if (req.user) {
            const user = await User.findById(req.user.id);
            if (user) {
                res.send(user.spellSlots);
            } else {
                res.sendStatus(404);
            }
        } else {
            res.sendStatus(404);
        }
    });

    app.post('/api/current_user/spellslots', async (req, res) => {
        if (req.user) {
            const user = await User.findByIdAndUpdate(req.user.id, {spellSlots: req.body.spellSlots});
            if (user) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        } else {
            res.sendStatus(400);
        }
    });

    app.post('/api/current_user/reset', async (req, res) => {
        if (req.user) {
            try {
                const user = await User.findOneAndUpdate(req.user.id,
                    {
                        spellBookSpells: [],
                        dailySpells: [],
                        spellSlots: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
                    });
                if (user) {
                    res.send(200);
                }
            } catch (err) {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(400);
        }
    });
}