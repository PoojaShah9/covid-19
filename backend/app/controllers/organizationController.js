const shortid = require('shortid');
const mongoose = require('mongoose');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');
const Promise = require('bluebird');
const fs = require('fs');

const Organization = mongoose.model('organization');

let create = (req, res) => {

    let validatingInputs = () => {
        console.log("validatingInputs");
        return new Promise((resolve, reject) => {
            if (req.body.name && req.body.country && req.body.address && req.body.description && req.body.phone && req.body.owner_name && req.body.createdDate) {
                resolve();
            } else {
                let apiResponse = response.generate(true, "Required Parameter name, country,description, address,phone ,owner_name, createdDate is missing", 400, null);
                reject(apiResponse);
            }
        });
    }; // end of validatingInputs

    let findRecord = () => {
        console.log("findRecord");
        return new Promise((resolve, reject) => {
            Organization.find({
                    name: req.body.name,
                    country: req.body.country,
                    owner_name: req.body.owner_name
                }, function (err, userDetail) {
                    if (err) {
                        logger.error("Internal Server error while fetching record", "create => findRecord()", 5);
                        let apiResponse = response.generate(true, err, 500, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(userDetail)) {
                        resolve();
                    } else {
                        console.log('user', userDetail);
                        logger.error("The Organization with same name and country name already exists", "create => findRecord()", 5);
                        let apiResponse = response.generate(true, 'The Organization with same name and country name already exists', 500, null);
                        reject(apiResponse);
                    }
                }
            )
        });
    }; // end of findRecord

    let createOrganization = () => {
        console.log("createOrganization");
        return new Promise((resolve, reject) => {
            const body = {
                organization_id: shortid.generate(),
                name: req.body.name,
                country: req.body.country,
                address: req.body.address,
                description: req.body.description,
                phone: req.body.phone,
                owner_name: req.body.owner_name,
                createdDate: req.body.createdDate,
                otherDetails: (req.body.otherDetails) ? req.body.otherDetails : {},
            };
            Organization.create(body,
                function (err, fightersDetails) {
                    if (err) {
                        console.log('err', err);
                        logger.error("Internal Server error while create Record", "create => createOrganization()", 5);
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
        .then(createOrganization)
        .then((resolve) => {
            if (req.file)
                fs.unlinkSync(req.file.path)
            let apiResponse = response.generate(false, "Create Organization Successfully!!", 200, resolve);
            res.status(200).send(apiResponse);
        })
        .catch((err) => {
            console.log(err);
            if (req.file)
                fs.unlinkSync(req.file.path)
            res.status(err.status).send(err);
        });
};

let getAll = (req, res) => {

    let getData = () => {
        console.log("getData");
        return new Promise((resolve, reject) => {
            let body = {};
            if (req.query.organization_id) {
                body['organization_id'] = req.query.organization_id
            }
            Organization.find(body)
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
            let apiResponse = response.generate(false, "Get All Organization Successfully!!", 200, resolve);
            res.status(200).send(apiResponse);
        })
        .catch((err) => {
            console.log(err);
            res.status(err.status).send(err);
        });
};

let getOrganizationByCountry = (req, res) => {

    let getData = () => {
        console.log("getData");
        return new Promise((resolve, reject) => {
            let body = {};
            if (req.query.country) {
                body['country'] = req.query.country
            }
            Organization.find(body, function (err, userDetail) {
                if (err) {
                    logger.error("Internal Server error while fetching Organization", "getOrganizationByCountry => getData()", 5);
                    let apiResponse = response.generate(true, err, 500, null);
                    reject(apiResponse);
                } else {
                    resolve(userDetail);
                }
            })
        });
    }; // end of getData

    getData()
        .then((resolve) => {
            let apiResponse = response.generate(false, "Get Organization Successfully!!", 200, resolve);
            res.status(200).send(apiResponse);
        })
        .catch((err) => {
            console.log(err);
            res.status(err.status).send(err);
        });
};

module.exports = {
    create: create,
    getAll: getAll,
    getOrganizationByCountry: getOrganizationByCountry,
}
