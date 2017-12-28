const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const userModule = require('../modules/user.module.js');
const authModule = require('../modules/auth.module.js');
const config = require('../config/server.config');



router.get('/', (req, res) => {
    userModule.findAllUsers().then((data) => {
        response.accepted(res, data);
    }).catch((er) => {
        response.badRequest(res, er);
    })
});

router.put('/personal-detail', (req, res) => {
    let header = req.headers.authorization;
    let arr = header.split(' ');
    let token = arr[1];

    if (arr[0] !== config.BEARER && token == null && token == undefined) {
        response.badRequest(res, 'Not a valid request');
        return;
    }

    authModule.getInfoFromToken(token).then((data) => {
        data.personalDetail = req.body;
        userModule.updateUser(data).then((user) => {
            response.accepted(res, user);
        }).catch((err) => {
            reject(err);
        });
    }).catch((err) => {
        response.badRequest(res, err);
    });
});

router.put('/address', (req, res) => {
    let addresses = req.body;
    if (addresses == null || addresses == undefined) {
        response.badRequest(res, 'bad request');
        return;
    }

    let header = req.headers.authorization;
    let arr = header.split(' ');
    let token = arr[1];

    if (arr[0] !== config.BEARER && token == null && token == undefined) {
        response.badRequest(res, 'Not a valid request');
        return;
    }
    
    authModule.getInfoFromToken(token).then((data) => {
        data.addresses = addresses;
        userModule.updateUser(data).then((user) => {
            response.accepted(res, user);
        }).catch((err) => {
            reject(err);
        });
    }).catch((err) => {
        response.badRequest(res, err);
    });





})












module.exports = router;