const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name:String,
    description:String,
    date:String,
    image:String
});

var Product = module.exports =  mongoose.model('Product', productSchema);