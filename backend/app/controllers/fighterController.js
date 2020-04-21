const shortid = require('shortid');
const mongoose = require('mongoose');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');
const Promise = require('bluebird');
const fs = require('fs');

const Fighters = mongoose.model('fighters');

let create = (req, res) => {

        let validatingInputs = () => {
            console.log("validatingInputs");
            return new Promise((resolve, reject) => {
                if (req.body.name && req.body.country && req.body.deathDate && req.body.description&& req.body.occupation && req.body.age && req.file) {
                    resolve();
                } else {
                    let apiResponse = response.generate(true, "Required Parameter name, country, deathDate,occupation ,age, description or file is missing", 400, null);
                    reject(apiResponse);
                }
            });
        }; // end of validatingInputs

        let findRecord = () => {
            console.log("findRecord");
            return new Promise((resolve, reject) => {
                Fighters.find({
                        name: req.body.name,
                        country: req.body.country
                    }, function (err, userDetail) {
                        if (err) {
                            logger.error("Internal Server error while fetching record", "create => findRecord()", 5);
                            let apiResponse = response.generate(true, err, 500, null);
                            reject(apiResponse);
                        } else if (check.isEmpty(userDetail)) {
                            resolve();
                        } else {
                            console.log('user', userDetail);
                            logger.error("The fighter with same name and country name already exists", "create => findRecord()", 5);
                            let apiResponse = response.generate(true, 'The fighter with same name and country name already exists', 500, null);
                            reject(apiResponse);
                        }
                    }
                )
            });
        }; // end of findRecord

        let createFighter = () => {
            console.log("createFighter");
            return new Promise((resolve, reject) => {
                const img = {
                    data: fs.readFileSync(req.file.path),
                    contentType: 'image/png'
                };
                console.log('imag', img);
                const body = {
                    fighter_id: shortid.generate(),
                    name: req.body.name,
                    country: req.body.country,
                    deathDate: req.body.deathDate,
                    description: req.body.description,
                    occupation : req.body.occupation ,
                    age: req.body.age,
                    photo: img
                };
                console.log('body', body);
                Fighters.create(body,
                    function (err, fightersDetails) {
                        if (err) {
                            console.log('err', err);
                            logger.error("Internal Server error while create Record", "create => createFighter()", 5);
                            let apiResponse = response.generate(true, err, 500, null);
                            reject(apiResponse);
                        } else {
                            resolve(fightersDetails);
                        }
                    })
            });
        }; // end of createFighter

        validatingInputs()
            .then(findRecord)
            .then(createFighter)
            .then((resolve) => {
                if (req.file)
                    fs.unlinkSync(req.file.path)
                let apiResponse = response.generate(false, "Create Fighter Successfully!!", 200, resolve);
                res.status(200).send(apiResponse);
            })
            .catch((err) => {
                console.log(err);
                if (req.file)
                    fs.unlinkSync(req.file.path)
                res.status(err.status).send(err);
            });
    }
;

let getTopTen = (req, res) => {

    let getData = () => {
        console.log("getData");
        return new Promise((resolve, reject) => {
            Fighters.find()
                .sort({created_at: -1}).limit(10)
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    let apiResponse = response.generate(false, err, 500, null);
                    reject(apiResponse);
                });
            /*, function (err, userDetail) {
            if (err) {
                logger.error("Internal Server error while fetching user", "getPhotosByCategory => getPhotos()", 5);
                let apiResponse = response.generate(true, err, 500, null);
                reject(apiResponse);
            } else {
                resolve(userDetail);
            }
        }
    )
    });*/
        }); // end of getPhotos
    }
    getData()
        .then((resolve) => {
            let apiResponse = response.generate(false, "Get top 10 data Successfully!!", 200, resolve);
            res.status(200).send(apiResponse);
        })
        .catch((err) => {
            console.log(err);
            res.status(err.status).send(err);
        });
};

let getfightergetByCountry = (req, res) => {

    let getFighter = () => {
        console.log("getFighter");
        return new Promise((resolve, reject) => {
            let body = {};
            if (req.query.country) {
                body['country'] = req.query.country
            }
            Fighters.find(body, function (err, userDetail) {
                if (err) {
                    logger.error("Internal Server error while fetching Fighters", "getPhotosByCategory => getPhotos()", 5);
                    let apiResponse = response.generate(true, err, 500, null);
                    reject(apiResponse);
                } else {
                    resolve(userDetail);
                }
            })
        });
    }; // end of getFighter

    getFighter()
        .then((resolve) => {
            let apiResponse = response.generate(false, "Get Fighter Successfully!!", 200, resolve);
            res.status(200).send(apiResponse);
        })
        .catch((err) => {
            console.log(err);
            res.status(err.status).send(err);
        });
};

module.exports = {
    create: create,
    getTopTen: getTopTen,
    getfightergetByCountry: getfightergetByCountry,
}
