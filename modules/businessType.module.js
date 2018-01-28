const BusinessType = require('../models/businessType.model.js');

module.exports.findAllBusinessType = (id) => {
    return new Promise((resolve, reject) => {

        BusinessType.findAllBusinessType().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });

    })
}

module.exports.findBusinessTypeById = (id) => {
    return new Promise((resolve, reject) => {

        BusinessType.findBusinessTypeById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });

    })
}

module.exports.addBusinessType = (businessType) => {
    return new Promise((resolve, reject) => {

        BusinessType.addBusinessType(businessType).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });

    })
}