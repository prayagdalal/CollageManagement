var express = require('express');
var router = express.Router();
const session = require('express-session');
const mongoose = require("mongoose");
const md5 = require('md5');
const httpMsgs = require('http-msgs');



router.get("/indexTeacher", function(req, res) {
    if (req.session.name) {
        return res.render('indexTeacher', { userInfo: req.session.name = username, userId: req.session.uid });
    } else {
        return res.redirect('/login');
    }
});

module.exports = router;