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

const cron = require('node-cron');

cron.schedule('0 1 * * *', function () {
    console.log('Running Cron Job');
    sendMail("noreply@covid.com", "System generated cron job email", "<html> Testing: Mail from system cron job, just to ensure and keep running mailing service. which is generate every night at 1 am</html>")
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
});

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/contact`;

    // API are used in current system

    app.post(baseUrl + '/', function (req, res) {
        if (req.body.from && req.body.html && req.body.subject) {
            sendMail(req.body.from, req.body.subject, req.body.html)
                .then((data) => {
                    res.status(200).send(data);
                })
                .catch((err) => {
                    res.status(500).send(err);
                })
        } else {
            res.status(401).send({error: true, message: "Required Parameter Missing. (from, html, subject)"})
        }
    });
};

const sendMail = function (from, subject, html) {
    return new Promise((resolve, reject) => {

        let mailOptions = {
            from: from,
            to: 'covid.champions@gmail.com',
            subject: subject,
            text: '',
            html: html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('eeeeeeeeeeerrrrrrrrrr', error);
                let data = {
                    error: true,
                    Message: "Send mail fail..!!",
                    data: [],
                    errorMessage: error
                };
                reject(data);
            } else {
                let data = {
                    error: false,
                    Message: "Send mail Successfully..!!",
                    data: info,
                    errorMessage: []
                };
                resolve(data)
            }
        })
    });
}
