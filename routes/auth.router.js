const express = require('express');
const router = express.Router();
const response = require('dark-snow-response');
const helpers = require('../helpers/helpers');



const register = require('../modules/auth.module.js').register;
const login = require('../modules/auth.module.js').login;



router.post('/login', function (req, res) {
    let password = req.body.password;
    let email = req.body.email;
    login(email,password).then((data)=>{
        response.json(res,helpers.removeExtraFieldsFromUserOnLogin(data));
    }).catch((err)=>{
        response.badRequest(res,err);

    })
    
});


router.post('/register', (req, res) => {
    register(req.body).then((data) => {
        response.json(res, data);
    }).catch((err) => {
        response.badRequest(res, err);
    });
});




module.exports = router;