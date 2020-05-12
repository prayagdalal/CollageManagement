var express = require('express');
var router = express.Router();
const session = require('express-session');
const mongoose = require("mongoose");
const md5 = require('md5');
var signupModel = require('../schemas/signupSchema');
var signupCollection = signupModel.signupModel.collection;

router.get("/", function(req, res) {
    req.session.destroy();
    res.render('login');
});

router.post("/", function(req, res) {
    username = req.body.uname;
    password = req.body.pass;
    password1 = md5(password);
    signupCollection.findOne({ name: username, password: password1 }, function(err, obj) {
        var student = obj.role_id.role_name;
        if (student == "student") {
            req.session.name = username;
            req.session.uid = obj.registred_id;
            res.render("indexStudent", { userInfo: req.session.name, userId: req.session.uid });
        } else {
            var convert = obj.subject;
            var toarray = convert.split(",");
            req.session.name = username;
            req.session.uid = obj.registred_id;
            req.session.subjects = toarray;
            res.render("indexTeacher", { userInfo: req.session.name, userId: req.session.uid, subject_data: req.session.subjects })
        }

    });


});

module.exports = router;