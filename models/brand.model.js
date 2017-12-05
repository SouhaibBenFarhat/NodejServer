const mongoose = require('mongoose');
const config = require('../config/server.config.js');

const brandSchema = new mongoose.Schema({
    name:String,
    description:String,
    date:String,
    image:String
});

var Brand = module.exports = mongoose.model('Brand', brandSchema);