const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())

require('./routes/authRoutes')(app);
require('./routes/enchantRoutes')(app);


// production config
if (process.env.NODE_ENV === 'production') {
    // serve production assets
    app.use(express.static('client/build'));
    // serve index.html if route not recognized
    const path = require('path');
    app.get('*'), (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    }
} else { // dev config
    app.use(express.static('client/public'));
}

const PORT = process.env.PORT || 5000
app.listen(PORT)