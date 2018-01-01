var express = require('express');
var router = express.Router();

//request validator middleware
const requestValidator = require('../middleware/requestValidator.js');
const dataValidator = require('../middleware/dataValidator.js');


//routes files
const brandRouter = require('../routes/brand.router.js');
const productRouter = require('../routes/product.router.js');
const categoryRouter = require('../routes/category.router.js');
const wishListRouter = require('../routes/wishList.router.js');
const userRouter = require('../routes/user.router.js');
const fileRouter = require('../routes/fileUpload.router.js');


router.use(requestValidator);
router.use(dataValidator);
router.use('/brand', brandRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/wish-list', wishListRouter);
router.use('/user', userRouter);
router.use('/upload', fileRouter);



module.exports = router;