const User = require('../models/user.model.js');


module.exports.updateUser = (user) => {
    return new Promise((resolve, reject) => {
        User.updateUser(user).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.findUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findUserById(id).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.findAllUsers = () => {
    return new Promise((resolve, rejecet) => {
        User.findAllUsers({}).then((data) => {
            resolve(data);
        }).catch((err) => {
            rejecet(err);
        })
    });
}




