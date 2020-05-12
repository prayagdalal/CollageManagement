var express = require('express');
var router = express.Router();
const session = require('express-session');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");


const md5 = require('md5');
const httpMsgs = require('http-msgs');
const ids = require('short-id');
var signupModel = require('../schemas/signupSchema');
var signupModel = signupModel.signupModel;
var roleModel = require('../schemas/roleSchema');
var roleModel = roleModel.roleModel;
router.get("/teacherRegistration", function(req, res) {
    res.render('registerTeacher');
});

router.post("/teacherRegistration", function(req, res) {

    const name = req.body.namej;
    const email = req.body.emailj;
    const gender = req.body.genderj;
    const sub = req.body.checked_subject1;
    const dob = req.body.dobj;
    console.log(sub);
    var Upass = ids.generate();
    var Upass1 = md5(Upass);
    console.log(sub);
    console.log(name);
    console.log(gender);
    console.log("appjs mail:-" + email);
    signupModel.countDocuments({ email: email }, function(err, cnt) {
        console.log("total mail:-" + cnt);
        if (cnt > 0) {
            httpMsgs.sendJSON(req, res, { exist: "email already exist" });
        } else {
            httpMsgs.sendJSON(req, res, { exist: "Done" });
            roleModel.findOne({ role_name: "teacher" }, function(err, role) {
                console.log(role);
                const user = new signupModel({
                    role_id: role,
                    name: name,
                    registred_id: mongoose.Types.ObjectId(),
                    email: email,
                    subject: sub,
                    gender: gender,
                    dob: dob,
                    password: Upass1
                })
                user.save();
            });

            nodemailer.createTestAccount((err, account) => {
                if (err) {
                    console.error('Failed to create a testing account');
                    console.error(err);
                    return process.exit(1);
                }
                console.log('Credentials obtained, sending message...');
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    host: "smtp.gmail.com",
                    port: 587,
                    requireTLS: true,
                    secure: false, // true for 465, false studefor other ports
                    auth: {
                        user: 'prayagdalal11@gmail.com',
                        pass: 'prayag11'
                    },
                    logger: true,
                    debug: false // include SMTP traffic in the logs
                        ,
                    from: 'prayagdalal11@gmail.com',
                });
                let message = {
                    to: email,
                    subject: "ACCOUNT DETAILS",
                    html: "<b>USER NAME:-</b><b>'" + name + "'</b><br><b>PASSWORD:-</b><b>'" + Upass + "'</b>" // html body
                };
                transporter.sendMail(message, (error, info) => {
                    if (error) {
                        console.log('Error occurred');
                        console.log(error.message);
                        return process.exit(1);
                    }
                    console.log('Message sent successfully!');
                    console.log(nodemailer.getTestMessageUrl(info));
                });
            });
        }
    });

});
module.exports = router;