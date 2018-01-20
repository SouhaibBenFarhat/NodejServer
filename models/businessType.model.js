const mongoose = require('mongoose');


const businessTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
});

const BusinessType = module.exports = mongoose.model('BusinessType', businessTypeSchema);
