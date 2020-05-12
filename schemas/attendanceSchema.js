var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
var signupModel = require('./signupSchema');
var signupSchema = signupModel.signupModel.schema;

var attendanceSchema = {
    id: String,
    rollno: Number,
    student: signupSchema,
    teacher: signupSchema,
    attendance: String,
    attendance_on: Date,
    subject: String

}

var attendanceModel = mongoose.model("attendance", attendanceSchema);
exports.attendanceModel = attendanceModel;