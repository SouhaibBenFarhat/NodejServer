const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const brandModule = require('../modules/brand.module.js');




router.get('/', (req, res) => {

    let id = req.query.id;
    if (id != null && id != undefined) {
        brandModule.findBrandById(id).then((data) => {
            response.accepted(res, data);
        }).catch((err) => {
            response.badRequest(res, err);
        })
    } else {
        brandModule.findAllBrands().then((data) => {
            response.accepted(res, data);
        }).catch((err) => {
            response.badRequest(res, err);
        })
    }
});



router.get('/top-brands', (req, res) => {
    brandModule.findTopBrands().then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    })

});
router.post('/', (req, res) => {

    brandModule.addBrand(req.body).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    })

});

router.delete('/', (req, res) => {
    brandModule.deleteBrand(req.body).then((data) => {
        response.accepted(res, 'Successfully Deleted...');
    }).catch((err) => {
        response.badRequest(res, err);
    });

});

module.exports = router;

