const Product = require('../models/product.model.js');


module.exports.findAllProducts = () => {
    return new Promise((resolve, reject) => {
        Product.findAllProducts().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports.findProductById = (id) => {
    return new Promise((resolve, reject) => {
        Product.findProductById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.findProductWithLimit = (limit) => {
    return new Promise((resolve, reject) => {
        Product.getProductWithLimit(limit).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports.findProductsByCategoryId = (categoryId,limit) => {
    return new Promise((resolve, reject) => {
        Product.findProductsByCategoryId(categoryId,limit).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports.addProduct = (product) => {
    return new Promise((resolve, reject) => {
        Product.addProduct(product).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports.deleteProduct = (product) => {
    return new Promise((resolve, reject) => {
        Product.deleteProduct(product).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}