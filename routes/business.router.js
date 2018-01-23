const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const businessModule = require('../modules/business.module.js');

router.get('/', (req, res) => {
    businessModule.findAllBusiness().then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    })
})

router.get('/:businessId', (req, res) => {
    let businessId = req.params.businessId;
    if (businessId == null || businessId == undefined) {
        response.badRequest(res, 'invalid request: ' + req.url);
        return;
    }

    businessModule.findBusinessById(businessId).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    });
});

router.get('/user/:userId', (req, res) => {
    let userId = req.params.userId;
    if (userId == null || userId == undefined) {
        response.badRequest(res, 'invalid request: ' + req.url);
        return;
    }

    businessModule.findBusinessByUser(userId).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    });
});

router.post('/', (req, res) => {
    let business = req.body;
    if (business == null || business == undefined) {
        response.badRequest(res, 'Invalid data');
        return;
    }

    businessModule.addBusiness(business).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    })
})








module.exports = router;