const mongoose = require('mongoose');
const position = require('./position.model.js');
const businessType = require('./businessType.model.js');
const config = require('../config/server.config.js');

const businessSchema = new mongoose.Schema({


    userId: {
        type: String,
        default: null,
        required: true
    },
    pageName: {
        type: String,
        required: true
    },
    coverPicture: {
        type: String,
        default: config.defaultCoverPhoto
    },
    logo: {
        type: String,
        default: config.businessDefaultLogo
    },
    images: {
        type: [String],
        default: null
    },
    visible: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    },
    pageEmail: {
        type: String,
        required: true
    },
    position: {
        type: position.schema,
        required: true
    },
    approximation: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    businessType: {
        type: businessType.schema,
        required: true
    },
    website: {
        type: String,
    },
    instagram: {
        type: String
    },
    twitter: {
        type: String
    },
    facebook: {
        type: String
    },
    description: {
        type: String,
        default: null
    },
    workTime: {
        sunday: {
            type: Boolean,
            default: false
        },
        saturday: {
            type: Boolean,
            default: false
        },
        openTime: {
            type: String,
            default: "08:00"
        },
        closeTime: {
            type: String,
            default: "17:00"
        }

    }


});

const Business = module.exports = mongoose.model('Business', businessSchema);


module.exports.findAllBusiness = () => {
    return new Promise((resolve, reject) => {
        Business.find({ visible: true }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports.addBusiness = (business) => {
    return new Promise((resolve, reject) => {
        Business.create(business).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
}

module.exports.findBusinessByUser = (userId) => {
    return new Promise((resolve, reject) => {
        Business.find({ userId: userId }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.findBusinessById = (businessId) => {
    return new Promise((resolve, reject) => {
        Business.findById(businessId).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.updateBusiness = (business) => {
    return new Promise((resolve, reject) => {
        Business.findByIdAndUpdate({ _id: business._id }, business, { new: true }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}


