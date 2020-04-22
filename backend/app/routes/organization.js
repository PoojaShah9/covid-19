const organizationController = require("../controllers/organizationController");
const appConfig = require("../../config/appConfig");

// const middleware = require('../middlewares/auth');

const fs = require('fs');
const shortid = require('shortid');
const multer = require('multer');

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

    let baseUrl = `${appConfig.apiVersion}/organization`;

    // API are used in current system

    app.post(baseUrl + '/', [organizationController.create]);

    app.get(baseUrl + '/', [organizationController.getOrganizationByCountry]);

    app.get(baseUrl + '/getAll', [organizationController.getAll]);

};
