const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const categoryModule = require('../modules/category.module.js');

router.get('/', (req, res) => {
    categoryModule.findAllCategories().then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    })
});

router.get('/:limit', (req, res) => {
    
        let limit = req.params.limit;
        categoryModule.findCategoriesWithLimit(Number(limit)).then((data) => {
            response.accepted(res, data);
        }).catch((err) => {
            console.log(err);
            response.badRequest(res, err)
        });
    });

router.post('/', (req, res) => {
    categoryModule.addCategory(req.body).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    });
});


router.delete('/', (req, res) => {
    categoryModule.deleteCategory(req.body).then((data) => {
        response.accepted(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    })
});


module.exports = router;
