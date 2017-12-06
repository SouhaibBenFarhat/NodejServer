const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const productModule = require('../modules/product.module.js');



router.get('/', (req, res) => {
    productModule.findAllProducts().then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
        console.log(err);
    });

});

router.post('/', (req, res) => {
    productModule.addProduct(req.body).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    });

});

router.delete('/', (req, res) => {
    productModule.deleteProduct(req.body).then((data) => {
        response.accepted(res, 'Successfully deleted...');
    }).catch((err) => {
        response.badRequest(res, err);
    });

});

module.exports = router;