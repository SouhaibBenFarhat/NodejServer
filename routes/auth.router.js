const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const helpers = require('../helpers/helpers');
const config = require('../config/server.config.js');



const register = require('../modules/auth.module.js').register;
const login = require('../modules/auth.module.js').login;
const getInfoFromToken = require('../modules/auth.module.js').getInfoFromToken;
const emailVerification = require('../modules/auth.module.js').sendEmailVerification;
const confirmUser = require('../modules/auth.module.js').confirmUserEmail;
const generateTemporaryToken = require('../modules/auth.module.js').generateTemporaryToken;
const checkConfirmation = require('../modules/auth.module.js').checkConfirmation;

router.post('/login', function (req, res) {
    let password = req.body.password;
    let email = req.body.email;
    login(email, password).then((data) => {
        if (data.confirmed == false) {
            generateTemporaryToken(data).then((token) => {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Please confirm your account",
                    "data": token
                });
            })
        } else {
            response.json(res, helpers.removeExtraFieldsFromUserOnLogin(data));
        }

    }).catch((err) => {
        res.status(404);
        res.json({
            "status": 404,
            "message": err

        });
    })

});

router.post('/send-email-verification', (req, res) => {
    let token = req.headers.authorization;
    if (token == null || token == undefined) {
        response.badRequest(res, 'Invalid Token');
        return;
    }
    emailVerification(token).then((data) => {
        response.accepted(res, 'OK');
    }).catch((err) => {
        console.log(err);
        response.badRequest(res, err);
    })


});

router.post('/confirm-email', (req, res) => {
    let token = req.body.token;
    if (token == null || token == undefined) {
        response.badRequest(res, 'Invalid Token');
        return;
    }
    confirmUser(token).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Email Already Confirmed"
        });
    });
})


router.post('/check-confirmation', (req, res) => {
    let token = req.body.token;
    if (token == null || token == undefined) {
        res.status(401);
        res.json({
            "status": 400,
            "message": "Invalid token"
        });
        return;
    }
    checkConfirmation(token).then(() => {
        response.accepted(res, 'OK');
    }).catch(() => {
        res.status(401);
        res.json({
            "status": 400,
            "message": "Email already confirmed"
        });
    });
});


router.post('/register', (req, res) => {
    register(req.body).then((data) => {
        response.json(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    });
});

router.get('/info', (req, res) => {
    let header = req.headers.authorization;
    let arr = header.split(' ');
    if (arr[0] !== config.BEARER) {
        response.badRequest(res, 'Not a valid request');
        return;
    }
    let token = arr[1];
    getInfoFromToken(token).then((data) => {
        data.token = token;
        response.accepted(res, helpers.removeExtraFieldsFromUserOnLogin(data));

    }).catch((err) => {
        response.badRequest(res, err);
    });

});




module.exports = router;