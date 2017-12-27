const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


const wishListSchema = new mongoose.Schema({
    productId: {
        type: String,
        default: null,
        index: true,
        unique: true
    },
    userId: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    }
});
wishListSchema.plugin(uniqueValidator);

const WishList = module.exports = mongoose.model('WishList', wishListSchema);

module.exports.findWishListByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        WishList.find({ userId: userId }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
}

module.exports.addToWishList = (wishList) => {
    return new Promise((resolve, reject) => {
        WishList.create(wishList).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports.removeFromWishList = (id) => {
    return new Promise((resolve, reject) => {
        WishList.findByIdAndRemove(id).then((data) => {
            resolve();
        }).catch((err) => {
            reject(err);
        })
    });
}

