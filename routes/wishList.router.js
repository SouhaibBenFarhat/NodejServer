const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const wishListModule = require('../modules/wishList.module.js');
const authModule = require('../modules/auth.module.js');
const config = require('../config/server.config.js');


router.get('/', (req, res) => {

    let header = req.headers.authorization;
    let arr = header.split(' ');
    let token = arr[1];

    if (arr[0] !== config.BEARER && token == null && token == undefined) {
        response.badRequest(res, 'Not a valid request');
        return;
    }

    authModule.getInfoFromToken(token).then((data) => {
        wishListModule.findWishListByUserId(data._id).then((data) => {
            response.accepted(res, data);
        }).catch((err) => {
            response.badRequest(res, err);
        });
    }).catch((err) => {
        response.badRequest(res, err);
    });
});


router.post('/', (req, res) => {
    if (!(req.body.userId && req.body.productId)) {
        response.badRequest(res, 'invalid request');
        return;
    }
    wishListModule.addToWishList(req.body).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, 'Product Already exist');
    });
})

module.exports = router;

