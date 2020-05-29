const appConfig = require("../../config/appConfig");

var nodeMailer = require('nodemailer');
var transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    tls: {rejectUnauthorized: false},
    service: 'gmail',
    auth: {
        user: 'covid.champions@gmail.com',
        pass: 'Anshiparnika@143'
    }
});

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/contact`;

    // API are used in current system

    app.post(baseUrl + '/', function (req, res) {
        if (req.body.from && req.body.html && req.body.subject) {

            let mailOptions = {
                from: req.body.from,
                to: 'covid.champions@gmail.com',
                subject: req.body.subject,
                text: '',
                html: req.body.html
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('eeeeeeeeeeerrrrrrrrrr', error);
                    res.status(500).send(error);
                } else {
                    let data = {
                        Status: "Success",
                        Message: "Send mail Successfully..!!"
                    };
                    res.status(200).send(data)
                }
            })
        } else {
            res.status(401).send({error: true, message: "Required Parameter Missing. (from, html, subject)"})
        }
    });
};
