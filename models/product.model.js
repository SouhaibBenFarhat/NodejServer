const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: String,
    description: String,
    date: String,
    image: String
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

