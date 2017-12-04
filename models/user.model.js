const mongoose = require('mongoose');
const config = require('../config/server.config.js');


const userSchema = new mongoose.Schema({

    firstname: String,
    lastname: String,
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
    }



});

const User = module.exports = mongoose.model('User', userSchema);

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