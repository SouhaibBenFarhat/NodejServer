const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const brandModule = require('../modules/brand.module.js');



router.get('/',(req,res)=>{
    brandModule.findAllBrands().then((data)=>{
        response.accepted(res,data);
    }).catch((err)=>{
        response.badRequest(res,err);
    })
});

router.post('/', (req,res)=>{

    brandModule.addBrand(req.body).then((data)=>{
        response.accepted(res,data);
    }).catch((err)=>{
        response.badRequest(res,err);
    })

});

router.delete('/', (req,res)=>{
    brandModule.deleteBrand(req.body).then((data)=>{
        response.accepted(res,'Successfully Deleted...');
    }).catch((err)=>{
        response.badRequest(res,err);
    });

});

module.exports = router;

