const mongoose = require('mongoose');
const personalDetail = require('./personalDetail.model.js');
const address = require('./address.model.js');
const config = require('../config/server.config.js');



const userSchema = new mongoose.Schema({


    email: String,
    password: String,
    profilePictureUrl: {
        type: String,
        default: config.defaultProfilePictureUrl
    },
    salt: String,
    token: {
        type: String,
        default: '0'
    },
    role: {
        type: String,
        default: "user"
    },
    countryCode: {
        type: String,
        default: "--"
    },
    description: {
        type: String,
        default: config.defaultDescription
    },
    firstTime: {
        type: Boolean,
        default: true
    },
    personalDetail: {
        type: personalDetail.schema,
        default: null
    },
    addresses: {
        type: [address.schema]
    },
    confirmed: {
        type: Boolean,
        default: false

    },
    temporaryToken:{
        type:String,
        default:null
    }



});

const User = module.exports = mongoose.model('User', userSchema);


module.exports.findAllUsers = () => {
    return new Promise((resolve, rejecet) => {
        User.find({}).then((data) => {
            resolve(data);
        }).catch((err) => {
            rejecet(err);
        })
    })
}


module.exports.findUserByEmail = function (email) {
    return new Promise((resolve, reject) => {
        User.findOne({ "email": email }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })

};
module.exports.addUser = (user) => {
    return new Promise((resolve, reject) => {
        User.create(user).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};


module.exports.updateUser = (user) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(user._id, user, { new: true }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.findUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}