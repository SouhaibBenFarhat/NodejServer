const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('hyvalidator').validate;
const Strings = require('hyvalidator').Strings;
const config = require('../config/server.config.js');


module.exports.register = (user) => {
    return new Promise((resolve, reject) => {

        let passwordToKeep = user.password;

        var rules = new Strings.Rule;
        rules.setIsEmail();
        var errors = validate(user.email, rules);
        if (errors) {
            reject('Email is badly formatted...');
        }
        else {

            User.findUserByEmail(user.email).then((data) => {
                if (data) {
                    reject('Email already taken');
                } else {
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(user.password, salt);
                    user.password = hash;
                    user.salt = salt;
                    User.addUser(user).then((data) => {
                        this.login(user.email, passwordToKeep).then((user) => {
                            if (user) {
                                resolve(user);
                            } else {
                                reject('Please signin again');
                            }
                        }).catch((err) => {
                            reject(err);
                        })
                    }).catch((err) => {
                        reject(err);
                    });
                }
            }).catch(err => {
                reject(err);
            });
        }

    });
}

module.exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        var rules = new Strings.Rule;
        rules.setIsEmail();
        var errors = validate(email, rules);
        if (errors) {
            reject('Email is badly formatted...');
        }
        User.findUserByEmail(email).then((data) => {
            if (data) {
                if (bcrypt.compareSync(password, data.password)) {
                    let payload = {
                        email: data.email,
                        password: data.password,
                        role: data.role
                    }
                    let token = jwt.sign(payload, config.secret);
                    data.token = token;
                    let user = data;
                    user.token = token;
                    resolve(user);
                } else {
                    reject("Wrong Email or Password");
                }
            } else {
                reject('User not found');
            }

        }).catch((err) => {
            reject(err);
        })
    });

}


module.exports.getInfoFromToken = (token) => {
    return new Promise((resolve, reject) => {
        let decoded = jwt.decode(token);
        if (decoded == null && decoded == undefined) {
            reject('User not found...');
        }
        User.findUserByEmail(decoded.email).then((data) => {
            if (data != null && data != undefined) {
                resolve(data);
            } else {
                reject('User not found...');
            }
        }).catch((err) => {
            reject(err);
        });
    })
}