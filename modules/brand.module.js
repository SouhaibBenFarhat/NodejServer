const Brand = require('../models/brand.model.js');



module.exports.findAllBrands = () => {
    return new Promise((resolve, reject) => {
        Brand.findAllBrands().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });

    });
};

module.exports.findTopBrands = () => {
    return new Promise((resolve, reject) => {
        Brand.findTopBrands().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.addBrand = (brand) => {
    return new Promise((resolve, reject) => {
        Brand.addBrand(brand).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
};

module.exports.findBrandById = (brandId) => {
    return new Promise((resolve, reject) => {
        Brand.findBrandById(brandId).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.deleteBrand = (brand) => {
    return new Promise((resolve, reject) => {
        Brand.deleteBrand(brand).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
}
