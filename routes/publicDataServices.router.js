const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const categoryModule = require('../modules/category.module.js');

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

module.exports = router;
