const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({

    address: {
        type: String,
        required: true
    },
    indication: {
        type: String,
        required: false
    },
    region: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    default: {
        type: Boolean,
        required: true,
        default: false
    }


});

const Address = module.exports = mongoose.model('Address', addressSchema);
