
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('hyvalidator').validate;
const Strings = require('hyvalidator').Strings;
const config = require('../config/server.config.js');
const mailer = require('nodemailer');
const userModule = require('./user.module.js');

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
                        User.findUserByEmail(data.email).then((user) => {
                            let payload = {
                                email: user.email,
                                password: user.password,
                                role: user.role,
                            }
                            let token = jwt.sign(payload, config.secret, { expiresIn: config.expireIn });
                            user.temporaryToken = token;
                            resolve(user);
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


module.exports.confirmUserEmail = (tToken) => {
    return new Promise((resolve, reject) => {
        let decoded = jwt.decode(tToken);
        jwt.verify(tToken, config.secret, (err, token) => {
            if (err) {
                reject('Token expired');
                console.log('token expired !!')
            } else {
                if (decoded == null || decoded == undefined) {
                    reject('User not found...');
                } else {
                    User.findUserByEmail(decoded.email).then((data) => {
                        if (data != null && data != undefined && data.confirmed === false) {
                            data.confirmed = true;
                            console.log(data);
                            userModule.updateUser(data).then((user) => {
                                resolve(user);
                            }).catch((err) => {
                                reject(err);
                                console.log(err);
                            })
                        } else {
                            reject('User already confirmed or not found...');
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                }
            }
        });
    });
}



module.exports.checkConfirmation = (token) => {
    return new Promise((resolve, reject) => {
        let decoded = jwt.decode(token);
        jwt.verify(token, config.secret, (err, token) => {
            if (err) {
                reject('Token expired');
            } else {
                if (decoded == null || decoded == undefined) {
                    reject('User not found...');
                } else {
                    User.findUserByEmail(decoded.email).then((data) => {
                        if (data.confirmed === true) {
                            reject();
                        } else {
                            resolve();
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                }
            }
        });
    })
}



module.exports.sendEmailVerification = (tToken) => {
    return new Promise((resolve, reject) => {
        let decoded = jwt.decode(tToken);
        jwt.verify(tToken, config.secret, (err, token) => {
            if (err) {
                reject('Token expired');
                console.log('token expired');
            } else {
                if (decoded == null || decoded == undefined) {
                    reject('User not found...');
                } else {
                    User.findUserByEmail(decoded.email).then((data) => {
                        if (data != null && data != undefined && data.confirmed == false) {
                            sendNativeMail(data, tToken).then((response) => {
                                resolve();
                            }).catch((err) => {
                                reject(err);
                            });
                        } else {
                            reject('User not found or email already confirmed...');
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                }
            }
        })
    });
}

sendNativeMail = (data, tToken) => {
    return new Promise((resolve, reject) => {
        var smtpTransport = mailer.createTransport({
            service: "Gmail",
            auth: {
                user: config.organisationEmail,
                pass: config.organisationEmailPassword
            }
        });
        var mail = {
            from: config.organisationName + '<' + config.organisationEmail + '>',
            to: data.email,
            subject: "Welcome To TechStamp",
            text: "",
            html: `
                <center>
                <h1><b>Wolcome To TechStamp<b></h1><br>
                <img src="https://i.imgur.com/xjaYz1D.png" height="100px" width="200"/><br><br><br>
                Hello `+ data.email + `, this is souhaib from <b>TECHSTAMP</b> and i'm testing email verefication without using any third party :D <br><br>
                // Please Click <a href="http://localhost:4200/after-registration/email-verification/`+ tToken + `">here</a> to validate your inscription.
                <h3>This link is available only for next 24h, However you can't validate your inscription and your account<br>
                 will automatically removed from our database</h3>

                </center>
            `
        }
        smtpTransport.sendMail(mail, function (error, response) {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }

            smtpTransport.close();
        });
    })
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
                        role: data.role,
                    }
                    let token = jwt.sign(payload, config.secret);
                    data.token = token;
                    let user = data;
                    user.token = token;
                    console.log(token);
                    resolve(user);
                } else {
                    reject("Invalid Email or Password");
                }
            } else {
                reject('Invalid Email or Password');
            }

        }).catch((err) => {
            reject(err);
        })
    });

}


module.exports.getInfoFromToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                reject(err.message);
            } else {
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
            }
        });

    })
}

module.exports.getInfoFromTemporaryToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                reject(err.message);
            } else {
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
            }
        });

    })
}

module.exports.generateTemporaryToken = (user) => {
    return new Promise((resolve, reject) => {
        let payload = {
            email: user.email,
            password: user.password,
            role: user.role,
        }
        let token = jwt.sign(payload, config.secret, { expiresIn: config.expireIn });
        resolve(token);
    })
}