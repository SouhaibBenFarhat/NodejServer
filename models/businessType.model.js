const mongoose = require('mongoose');


const businessTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const BusinessType = module.exports = mongoose.model('BusinessType', businessTypeSchema);
