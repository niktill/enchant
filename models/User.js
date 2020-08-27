const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    spellBookSpells: Array,
    dailySpells: Array,
    spellSlots: {
        type: Array,
        default: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
    }
})

mongoose.model('users', userSchema);