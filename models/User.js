const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    spellBookSpells: Array,
    dailySpells: Array,
    spellSlots: Array
})

mongoose.model('users', userSchema);