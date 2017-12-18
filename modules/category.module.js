
const Category = require('../models/category.model.js');


module.exports.findAllCategories = () => {
    return new Promise((resolve, reject) => {
        Category.findAllCategories().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });

};

module.exports.findCategoriesWithLimit = (limit) => {
    return new Promise((resolve, reject) => {
        Category.getCategoriesWithLimit(limit).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports.addCategory = (category) => {
    return new Promise((resolve, reject) => {
        Category.addCategory(category).then((data) => {
            resolve(category);
        }).catch((err) => {
            reject(err);
        })
    });
};

module.exports.deleteCategory = (category) => {
    return new Promise((resolve, reject) => {
        Category.deleteCategory(category).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}