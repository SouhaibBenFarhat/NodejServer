const mongoose = require('mongoose');
const productSchema = require('./product.model.js').schema;

const categorySchema = new mongoose.Schema({

    name: String,
    logo: String,
    image:String,
    date: {
        type:Date,
        default:Date.now
    },
    productsNumber: {
        type: Number,
        default: 0
    },
    description: String,
});

var Category = module.exports = mongoose.model('Category', categorySchema);

module.exports.findAllCategories = () => {
    return new Promise((resolve, reject) => {
        Category.find({}).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });

};

module.exports.getCategoriesWithLimit = (limit) => {
    return new Promise((resolve, reject) => {
        Category.find({}).limit(limit).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports.addCategory = (category) => {
    return new Promise((resolve, reject) => {
        Category.create(category).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports.deleteCategory = (categoy) => {
    return new Promise((resolve, reject) => {
        Category.findByIdAndRemove({ _id: categoy.id }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
};