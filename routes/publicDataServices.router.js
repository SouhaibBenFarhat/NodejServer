const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const categoryModule = require('../modules/category.module.js');
const businessTypeModule = require('../modules/businessType.module.js');


router.get('/category', (req, res) => {

    if (req.query.id) {
        categoryModule.findCategoryById(req.query.id).then((data) => {
            response.accepted(res, data);
        }).catch((err) => {
            response.badRequest(res, err);
        })
    }
    else {

        categoryModule.findAllCategories().then((data) => {
            response.accepted(res, data);
        }).catch((err) => {
            response.badRequest(res, err);
        })
    }

});



router.get('/business-type', (req, res) => {



    businessTypeModule.findAllBusinessType().then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    })

});
router.post('/business-type', (req, res) => {

    let businessType = req.body;
    if (businessType == null || businessType == undefined) {
        response.badRequest(res, 'invalid request');
        return;
    }

    businessTypeModule.addBusinessType(businessType).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    })

});

module.exports = router;
