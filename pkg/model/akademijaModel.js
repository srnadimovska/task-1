const mongoose = require('mongoose');

const akademijaSchema = new mongoose.Schema ({
    ime: {
        type: String,
        required: [true, 'mora da ima ime'],
    },
    adresa: {
        type: String,
        required:[true, 'mora da ima adresa'],
    },
});

const Akademija = mongoose.model('Akademija', akademijaSchema);
module.exports = Akademija;