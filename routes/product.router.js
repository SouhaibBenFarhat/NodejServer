const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const productModule = require('../modules/product.module.js');



router.get('/', (req, res) => {


    if (req.query.productId) {
        productModule.findProductById(req.query.productId).then((data) => {
            response.accepted(res, data);
        }).catch((err) => {
            console.log(err);
            response.badRequest(res, err);
        });
    }

    else if (req.query.categoryId) {
        productModule.findProductsByCategoryId(req.query.categoryId).then((data) => {
            response.accepted(res, data);
            return;
        }).catch((err) => {
            console.log(err);
            response.badRequest(res, err);
            return;
        });


    } else {
        productModule.findAllProducts().then((data) => {
            response.accepted(res, data);
        }).catch((err) => {
            response.badRequest(res, err);
            console.log(err);
        });
    }

});

router.get('/:limit', (req, res) => {

    let limit = req.params.limit;
    productModule.findProductWithLimit(Number(limit)).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        console.log(err);
        response.badRequest(res, err)
    });
});

router.post('/', (req, res) => {
    productModule.addProduct(req.body).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        console.log(err);
        response.badRequest(res, err);
    });

});

router.delete('/', (req, res) => {
    productModule.deleteProduct(req.body).then((data) => {
        response.accepted(res, 'Successfully deleted...');
    }).catch((err) => {
        console.log(err);
        response.badRequest(res, err);
    });

});

module.exports = router;