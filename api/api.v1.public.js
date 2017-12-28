var express = require('express');
var router = express.Router();


const authRouter = require('../routes/auth.router.js');
const dataValidator = require('../middleware/dataValidator.js');


router.use(dataValidator);
router.use('/auth', authRouter);






module.exports = router;