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


module.exports.addToWishList = (wishList) =>{
    return new Promise((resolve,reject)=>{
        WishList.addToWishList(wishList).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err)
        })
    })
}