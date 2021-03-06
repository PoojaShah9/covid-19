const fighter = require("../controllers/fighterController");
const appConfig = require("../../config/appConfig");

// const middleware = require('../middlewares/auth');

const fs = require('fs');
const shortid = require('shortid');
const multer = require('multer');

const cachMan = require('../middlewares/cache');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('./upload/')) {
            var mkdirp = require('mkdirp');
            mkdirp('./upload/');
        }
        cb(null, './upload/')
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + file.originalname);
    }
})

const upload = multer({storage: storage});

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/fighters`;

    // API are used in current system

    app.post(baseUrl + '/', [fighter.create]);

    app.get(baseUrl + '/gettoptenfighter', cachMan.cache, [fighter.getTopTen]);

    app.get(baseUrl + '/getfightergetByCountry', cachMan.cache, [fighter.getfightergetByCountry]);

    app.get(baseUrl + '/getfightergetByName', cachMan.cache, [fighter.getfightergetByName]);

    app.get(baseUrl + '/getbyid', cachMan.cache, [fighter.getbyid]);

    app.post(baseUrl + '/comment', [fighter.comment]);

    app.post(baseUrl + '/postlike', [fighter.postLike]);

    app.get(baseUrl + '/totalLikes', [fighter.totalLikes]);
};
