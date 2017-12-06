const mongoose = require('mongoose');
const config = require('../config/server.config.js');

const brandSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: String,
    image: String
});

var Brand = module.exports = mongoose.model('Brand', brandSchema);


module.exports.findAllBrands = () => {
    return new Promise((resolve, reject) => {
        Brand.find({}).then((data) => {
            resolve(data);
        }).catch((err) => {
            //reject(err);
        })

    });
};

module.exports.addBrand = (brand) => {
    return new Promise((resolve, reject) => {
        Brand.create(brand).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
};

module.exports.deleteBrand = (brand)=>{
    return new Promise((resolve,reject)=>{
        Brand.findByIdAndRemove({_id:brand._id}).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err);
        });
    });
}

