
const Category = require('../models/category.model.js');


module.exports.findCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        if (Array.isArray(id)) {
            Category.findByGroupId(id).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        } else {
            Category.findCategoryById(id).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        }
    })
}


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