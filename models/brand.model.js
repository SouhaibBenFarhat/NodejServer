const mongoose = require('mongoose');
const config = require('../config/server.config.js');

const brandSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: {
        type: String,
        default: Date.now
    },
    image: String,
    logo: String,
    productsNumber: {
        type: Number,
        default: 0
    }
});

var Brand = module.exports = mongoose.model('Brand', brandSchema);


module.exports.findBrandById = (id) => {
    return new Promise((resolve, reject) => {
        Brand.findById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports.findAllBrands = () => {
    return new Promise((resolve, reject) => {
        Brand.find({}).sort({ productsNumber: 'desc' }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })

    });
};


module.exports.findTopBrands = () => {
    return new Promise((resolve, reject) => {
        Brand.find({}).limit(10).sort({ productsNumber: 'desc' }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports.addBrand = (brand) => {
    return new Promise((resolve, reject) => {
        Brand.create(brand).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
};

module.exports.deleteBrand = (brand) => {
    return new Promise((resolve, reject) => {
        Brand.findByIdAndRemove({ _id: brand._id }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

