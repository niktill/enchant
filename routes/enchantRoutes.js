const mongoose = require('mongoose');
const User = mongoose.model('users');
const dnd5eapi = require('../apis/dnd5eapi');

module.exports = (app, redisClient) => {
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
      const user = await User.findByIdAndUpdate(req.user.id, {
        $addToSet: { spellBookSpells: req.body.spellSlug },
      });
      if (user) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    } else {
      res.sendStatus(400);
    }
  });
  app.delete('/api/current_user/spellbookspells', async (req, res) => {
    if (req.user) {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $pull: {
          spellBookSpells: req.body.spellSlug,
          dailySpells: req.body.spellSlug,
        },
      });
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
      const user = await User.findByIdAndUpdate(req.user.id, {
        $addToSet: { dailySpells: req.body.spellSlug },
      });
      if (user) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    } else {
      res.sendStatus(400);
    }
  });
  app.delete('/api/current_user/dailyspells', async (req, res) => {
    if (req.user) {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $pull: { dailySpells: req.body.spellSlug },
      });
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

  app.post('/api/current_user/spellslots/max', async (req, res) => {
    if (req.user) {
      const spellSlotIndex = parseInt(req.body.spellLevel) - 1;
      const setString = 'spellSlots.' + spellSlotIndex.toString();
      const user = await User.findByIdAndUpdate(req.user.id, {
        $set: { [setString]: [req.body.maxSpellSlots, req.body.maxSpellSlots] },
      });
      if (user) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    } else {
      res.sendStatus(400);
    }
  });

  app.post('/api/current_user/spellslots/cast', async (req, res) => {
    if (req.user) {
      const spellSlotIndex = parseInt(req.body.spellLevel) - 1;
      const setString = 'spellSlots.' + spellSlotIndex.toString() + '.0';
      const user = await User.findOneAndUpdate(
        { _id: req.user.id, [setString]: { $gt: 0 } },
        { $inc: { [setString]: -1 } }
      );
      if (user) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    } else {
      res.sendStatus(400);
    }
  });

  app.post('/api/current_user/spellslots/refill', async (req, res) => {
    if (req.user) {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $set: {
          'spellSlots.0': req.body.spellSlots[0],
          'spellSlots.1': req.body.spellSlots[1],
          'spellSlots.2': req.body.spellSlots[2],
          'spellSlots.3': req.body.spellSlots[3],
          'spellSlots.4': req.body.spellSlots[4],
          'spellSlots.5': req.body.spellSlots[5],
          'spellSlots.6': req.body.spellSlots[6],
          'spellSlots.7': req.body.spellSlots[7],
          'spellSlots.8': req.body.spellSlots[8],
        },
      });
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
        const user = await User.findOneAndUpdate(req.user.id, {
          spellBookSpells: [],
          dailySpells: [],
          spellSlots: [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
          ],
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

  // Get request for all spell statistics
  app.get('/api/spells', async (req, res) => {
    try {
      // check if spellData is in redis cache
      redisClient.get('spellData', async (err, data) => {
        if (err) {
          throw err;
        }
        if (data !== null) {
          res.status(200).send({ spells: JSON.parse(data) });
        } else {
          // spellData is not in cache so we need to fetch from API
          const listOfNonSpellCasters = [
            'Barbarian',
            'Fighter',
            'Monk',
            'Rogue',
          ];
          let data = { spells: [], classes: [] };
          let pageNum = 1;
          const pageNumEnd = 7;
          // Fetch spell Data from API
          for (pageNum; pageNum < pageNumEnd + 1; pageNum++) {
            let response = await dnd5eapi.get(
              '/spells/?page=' + pageNum.toString()
            );
            if (response.status === 200) {
              data.spells = [...data.spells, ...response.data.results];
            }
          }
          // Fetch class data from API, do not include non spell casters
          let response = await dnd5eapi.get('/classes/');
          if (response.status === 200) {
            data.classes = response.data.results.filter(
              (classFromAPI) =>
                !listOfNonSpellCasters.includes(classFromAPI.name)
            );
          }
          // save spell data to redis cache, expires every 24 hours
          redisClient.setex('spellData', 86400, JSON.stringify(data));
          // send spell data back to client
          res.status(200).send({ spells: data });
        }
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
};
