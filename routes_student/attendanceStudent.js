var express = require('express');
var router = express.Router();
const session = require('express-session');
const mongoose = require("mongoose");
const md5 = require('md5');
const httpMsgs = require('http-msgs');
var attendanceModel = require('../schemas/attendanceSchema');
var attendanceModel = attendanceModel.attendanceModel;


router.get("/attendanceStudent", function(req, res) {
    if (req.session.name) {
        attendanceModel.find({ 'student.registred_id': req.session.uid }, function(err, attendance_data) {
            console.log(attendance_data);

        })

        res.render('attendanceStudent', { userInfo: req.session.name = username, userId: req.session.uid });
    } else {
        return res.render("/");
    }
});

module.exports = router;