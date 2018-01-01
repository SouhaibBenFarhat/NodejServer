const router = require('express').Router();
const rcsres = require('dark-snow-response');
const authModule = require('../modules/auth.module.js');
const userModule = require('../modules/user.module.js');
const config = require('../config/server.config.js');
const path = require('path');


router.post('/profile_picture', function (req, res) {
    if (!req.files)
        return rcsres.badRequest(res, 'No files were uploaded.');


        
    let fileExtension = path.extname(req.files.file.name);
    if (!fileExtension && (fileExtension !== ".png" || fileExtension !== ".jpg")) {
        rcsres.badRequest(res, 'The uploaded file is not an image.');
        return;
    }




    let header = req.headers.authorization;
    let arr = header.split(' ');
    if (arr[0] !== config.BEARER) {
        rcsres.badRequest(res, 'Not a valid request');
        return;
    }
    let token = arr[1];
    authModule.getInfoFromToken(token).then((data) => {


        let prefix = Date.now();

        let file = req.files.file;
        let path = "/uploads/profile_pictures/" + data._id + '_' + prefix + ".jpg";
        file.mv("." + path, function (err) {
            if (err) {
                return rcsres.error(res);
            } else {
                data.profilePictureUrl = config.serverAddress + '/api/uploads/profile_pictures/' + data._id + '_' + prefix + '.jpg';
                userModule.updateUser(data).then((user) => {
                    rcsres.accepted(res, user);
                }).catch((err) => {
                    rcsres.badRequest(res, err);
                })
            }
        });

    }).catch((err) => {
        rcsres.badRequest(res, err);
    });
});

module.exports = router;
