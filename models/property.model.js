const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({

    key: String,
    value: String


});

var Property = module.exports = mongoose.model('Property', propertySchema);
