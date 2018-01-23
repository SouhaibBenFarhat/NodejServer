const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const validationTools = require('./validationTools.js');


router.post('*/login', (req, res, next) => {
    if (validationTools.validateLoginData(req.body)) {
        next();
    } else {
        response.badRequest(res, 'Invalid login data');
    }
});

router.post('*/register', (req, res, next) => {
    if (validationTools.validateRegisterData(req.body)) {
        next();
    } else {
        response.badRequest(res, 'Invalid register data');
    }
})


router.put('*/personal-detail', (req, res, next) => {
    let valid = false;
    let data = req.body;
    if (validationTools.validatePersonalDetail(data)) {
        next();
    } else {
        response.badRequest(res, 'Invalid personal detail data');
    }
});

router.put('*/address', (req, res, next) => {
    let valid = false;
    let data = req.body;
    if (validationTools.validateAddress(data)) {
        next();
    } else {
        response.badRequest(res, 'Invalid address data');
    }
});



module.exports = router;