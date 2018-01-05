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
        if (req.query.limit > 0) {
            productModule.findProductsByCategoryId(req.query.categoryId, Number(req.query.limit)).then((data) => {
                response.accepted(res, data);
                return;
            }).catch((err) => {
                console.log(err);
                response.badRequest(res, err);
                return;
            });
        } else {
            productModule.findProductsByCategoryId(req.query.categoryId, null).then((data) => {
                response.accepted(res, data);
                return;
            }).catch((err) => {
                console.log(err);
                response.badRequest(res, err);
                return;
            });
        }


    } else {
        productModule.findAllProducts().then((data) => {
            response.accepted(res, data);
        }).catch((err) => {
            response.badRequest(res, err);
            console.log(err);
        });
    }

});


router.get('/pagination', (req, res) => {
    let skip = req.query.skip;
    let limit = req.query.limit;
    if (skip == null || limit == null || skip == undefined || limit == undefined || skip.length == 0 || limit.length == 0) {
        response.badRequest(res, 'Invalid Request');
        return;
    }
    productModule.findProductsWishPagination(skip, limit).then((data) => {

        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    });
})


router.get('/by-brand/:brandId', (req, res) => {

    let brandId = req.params.brandId;
    if (brandId != null && brandId != undefined) {
        productModule.findProductByBrandId(brandId).then((data) => {
            response.accepted(res, data);
        }).catch((err) => {
            response.badRequest(res, err);
        })
    }
    else {
        response.badRequest('cannot get data');
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