const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const config = require('../config/server.config.js');



module.exports = function (req, res, next) {

    let token;
    let head;
    let prefix;
    if (req.headers['authorization']) {
        head = req.headers['authorization'].split(' ');
        prefix = head[0];
        token = head[1];

        if ((token) && (prefix === config.BEARER)) {
            var decoded = jwt.decode(token, config.secret);
            if(decoded == null && decoded == undefined){
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "invalid token or key"
                });
            }
            User.findUserByEmail(decoded.email).then((data) => {
                if (data) {
                    next();
                } else {
                    res.status(500);
                    res.json({
                        "status": 500,
                        "message": "user not found"
                    });
                }
            }).catch((err) => {
                res.status(500);
                res.json({
                    "status": 500,
                    "message": "user not found"

                });
            })
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid Token or Key"
            });
            return;
        }
    } else {
        res.status(500);
        res.json({
            "status": 500,
            "message": "user not found"

        });
        return;
    }
};