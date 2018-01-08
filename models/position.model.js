const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    langitude: {
        type: Number,
        required: true
    }
});

const Position = module.exports = mongoose.model('Position', positionSchema);
