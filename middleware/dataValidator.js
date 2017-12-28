const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const validationTools = require('./validationTools.js');





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