const mongoose = require('mongoose');
const Property = require('./property.model');

const productSchema = new mongoose.Schema({

    name: String,
    secondName: String,
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    image: String,
    largeImage: String,
    price: Number,
    reduction: Boolean,
    newPrice: Number,
    currency: {
        type: String,
        default: "TDN"
    },
    categoryId: String,
    properties : {
        type: [Property.schema]
    },
    images:[String],
    quantity:Number




});

var Product = module.exports = mongoose.model('Product', productSchema);

module.exports.findAllProducts = () => {
    return new Promise((resolve, reject) => {
        Product.find({}).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports.findProductById = (id) => {
    return new Promise((resolve, reject) => {
        Product.findById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
}

module.exports.findProductsByCategoryId = (categoryId,limit) => {
    return new Promise((resolve, reject) => {
        Product.find({ categoryId: categoryId }).limit(limit).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.getProductWithLimit = (limit) => {
    return new Promise((resolve, reject) => {
        Product.find({}).limit(limit).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports.addProduct = (product) => {
    return new Promise((resolve, reject) => {
        Product.create(product).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}



module.exports.deleteProduct = (product) => {
    return new Promise((resolve, reject) => {
        Product.findByIdAndRemove({ _id: product.id }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

