var express = require('express');
var router = express.Router();

//request validator middleware
const requestValidator = require('../middleware/requestValidator.js');


//routes files
const brandRouter = require('../routes/brand.router.js');
const productRouter = require('../routes/product.router.js');
const categoryRouter = require('../routes/category.router.js');


router.use(requestValidator);
router.use('/brand', brandRouter);
// router.use('/product', productRouter);
// router.use('/category',categoryRouter);

module.exports = router;