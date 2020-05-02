const shortid = require('shortid');
const mongoose = require('mongoose');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');
const Promise = require('bluebird');
const fs = require('fs');

const Fighters = mongoose.model('fighters');
const FighterComments = mongoose.model('fighterComments');

let create = (req, res) => {

    let validatingInputs = () => {
        console.log("validatingInputs");
        return new Promise((resolve, reject) => {
            if (req.body.name && req.body.country && req.body.deathDate && req.body.occupation && req.body.age) {
                resolve();
            } else {
                let apiResponse = response.generate(true, "Required Parameter name, country, deathDate,occupation ,age is missing", 400, null);
                reject(apiResponse);
            }
        });
    }; // end of validatingInputs

    let findRecord = () => {
        console.log("findRecord");
        return new Promise((resolve, reject) => {
            Fighters.find({
                    name: req.body.name,
                    country: (req.body.country).toLowerCase()
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
            const body = {
                fighter_id: shortid.generate(),
                name: req.body.name,
                country: (req.body.country).toLowerCase(),
                deathDate: new Date(req.body.deathDate),
                description: (req.body.description) ? req.body.description : '',
                occupation: req.body.occupation,
                age: req.body.age,
                source: (req.body.source) ? req.body.source : '',
                link: (req.body.link) ? req.body.link : '',
            };
            // console.log('body', body);
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
};

let comment = (req, res) => {

    let validatingInputs = () => {
        console.log("validatingInputs");
        return new Promise((resolve, reject) => {
            if (req.body.fighter_id && req.body.comment) {
                resolve();
            } else {
                let apiResponse = response.generate(true, "Required Parameter fighter_id, comment is missing", 400, null);
                reject(apiResponse);
            }
        });
    }; // end of validatingInputs

    let postComment = () => {
        console.log("postComment");
        return new Promise((resolve, reject) => {
            const body = {
                fighterCommentsId: shortid.generate(),
                fighter_id: req.body.fighter_id,
                comment: req.body.comment,
            };
            FighterComments.create(body,
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
    }; // end of postComment

    validatingInputs()
        .then(postComment)
        .then((resolve) => {
            if (req.file)
                fs.unlinkSync(req.file.path)
            let apiResponse = response.generate(false, "Post Comment Successfully!!", 200, resolve);
            res.status(200).send(apiResponse);
        })
        .catch((err) => {
            console.log(err);
            if (req.file)
                fs.unlinkSync(req.file.path)
            res.status(err.status).send(err);
        });
};

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

let getbyid = (req, res) => {

    let getData = () => {
        console.log("getData");
        return new Promise((resolve, reject) => {
            let body = {};
            if (req.query.id) {
                body['fighter_id'] = (req.query.id);
            }
            Fighters.findOne(body, function (err, userDetail) {
                if (err) {
                    logger.error("Internal Server error while fetching Fighters", "getPhotosByCategory => getPhotos()", 5);
                    let apiResponse = response.generate(true, err, 500, null);
                    reject(apiResponse);
                } else {
                    resolve(userDetail);
                }
            })
        }); // end of getPhotos
    }

    let getComments = (result) => {
        console.log("getComments");
        return new Promise((resolve, reject) => {
            let body = {};
            if (req.query.id) {
                body['fighter_id'] = (req.query.id);
            }
            FighterComments.find(body, function (err, userDetail) {
                if (err) {
                    logger.error("Internal Server error while fetching Fighters", "getPhotosByCategory => getPhotos()", 5);
                    let apiResponse = response.generate(true, err, 500, null);
                    reject(apiResponse);
                } else {
                    result['comments'] = userDetail;
                    resolve(result);
                }
            })
        }); // end of getComments
    }

    getData()
        .then(getComments)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Get data Successfully!!", 200, resolve);
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
                body['country'] = (req.query.country).toLowerCase();
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
    getbyid: getbyid,
    comment: comment,
    getfightergetByCountry: getfightergetByCountry,
}
