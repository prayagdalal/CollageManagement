var express = require('express');
var router = express.Router();
const session = require('express-session');
const mongoose = require("mongoose");
const md5 = require('md5');
const httpMsgs = require('http-msgs');
var signupModel = require('../schemas/signupSchema');
var signupModel = signupModel.signupModel;
var attendanceModel = require('../schemas/attendanceSchema');
var attendanceModel = attendanceModel.attendanceModel;

router.get("/attendanceteacher", function(req, res) {
    if (req.session.name) {
        res.render('attendanceteacher', { userInfo: req.session.name = username, userId: req.session.uid, subject_data: req.session.subjects });
    } else {
        return res.redirect('/');
    }
});

router.post("/getrecord", function(req, res) {
    var div = req.body.div;
    var sem = req.body.sem;
    signupModel.find({ sem: sem, div: div }, function(err, getrecord) {
        httpMsgs.sendJSON(req, res, getrecord);
    })
});
router.post("/savestudents", async function(req, res) {
    var details = JSON.parse(req.body.attendance);
    console.log(details);

    var cnt = 0;
    for (var i = 0; i < details.length; i++) {
        var std_id = details[i].std_id;
        var std_status = details[i].std_status;
        var teacher_id = details[i].attendance_by;
        var day = details[i].attendance_on;
        var sub = details[i].sub;
        console.log(std_id);
        var student_data = await signupModel.findOne({ registred_id: std_id }).exec();
        var teacher_data = await signupModel.findOne({ registred_id: teacher_id }).exec();
        var studentattendance = new attendanceModel({
            id: mongoose.Types.ObjectId(),
            student: student_data,
            teacher: teacher_data,
            attendance: std_status,
            attendance_on: day,
            subject: sub
        })
        studentattendance.save();



    }
    httpMsgs.sendJSON(req, res, { status: "Done" });

});

module.exports = router;