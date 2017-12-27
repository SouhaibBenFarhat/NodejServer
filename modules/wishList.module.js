const WishList = require('../models/wishList.model.js');


module.exports.findWishListByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        WishList.findWishListByUserId(userId).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}


module.exports.addToWishList = (wishList) => {
    return new Promise((resolve, reject) => {
        WishList.addToWishList(wishList).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    });
}

module.exports.existInWishList = (wishList) => {
    return new Promise((resolve, reject) => {
        WishList.findWishListByUserId(wishList.userId).then((data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].productId === wishList.productId) {
                    resolve(true);
                    return;
                }
            }
            resolve(false);
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports.removeFromWishList = (id) => {
    return new Promise((resolve, reject) => {
        WishList.removeFromWishList(id).then((data) => {
            resolve();
        }).catch((err) => {
            reject(err);
        })
    });
}