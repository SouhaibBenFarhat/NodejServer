const mongoose = require('mongoose');


const businessTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
});

const BusinessType = module.exports = mongoose.model('BusinessType', businessTypeSchema);

module.exports.findAllBusinessType = () => {
    return new Promise((resolve, reject) => {
        BusinessType.find().then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports.findBusinessTypeById = (id) => {
    return new Promise((resolve, reject) => {
        BusinessType.findById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports.addBusinessType = (businessType) => {

    return new Promise((resolve, reject) => {
        BusinessType.create(businessType).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}