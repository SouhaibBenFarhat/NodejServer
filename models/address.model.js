const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({

    address: String,
    indication: String,
    region: String,
    state: String,
    code: String


});

const Address = module.exports = mongoose.model('Address', addressSchema);
