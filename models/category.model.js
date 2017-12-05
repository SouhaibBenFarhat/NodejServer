const mongoose = require('mongoose');
const productSchema = require('./product.model.js');

const categorySchema = new  mongoose.Schema({

    name:String,
    logo:String,
    date:String,
    nbProduct:Number,
    description:String,
    products:[productSchema]


});

var Category = module.exports = mongoose.model('Category', categorySchema);