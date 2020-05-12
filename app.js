const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const ids = require('short-id');
const ejs = require("ejs");
const _ = require("lodash");
const session = require('express-session');
const mongoose = require("mongoose");
const md5 = require('md5');
const httpMsgs = require('http-msgs');
const moment = require('moment-timezone');
const path = require('path');
const app = express();
var indexStudent = require('./routes_student/indexStudent');
var chatStudent = require('./routes_student/chatStudent');
var attendanceStudent = require('./routes_student/attendanceStudent');
var signupStudent = require('./routes_student/signupStudent');
var login = require('./routes_student/login');
var signupTeacher = require('./routes_teacher/signupTeacher');
var indexTeacher = require('./routes_teacher/indexTeacher');
var chatTeacher = require('./routes_teacher/chatTeacher');
var attendanceTeacher = require('./routes_teacher/attendanceTeacher');
// var signupStudent = require('./routes_student/signupStudent');

var __dirname = "../collage managment";
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views'),
    path.join(__dirname, 'views/studentView/'),
    path.join(__dirname, 'views/teacherView/')
]);

app.use(bodyParser());
app.use(express.static("public"));
app.use(session({ 'secret': '343ji43j4n3jn4jk3n' }));
mongoose.connect("mongodb://localhost:27017/collageDB", { useNewUrlParser: true });
//mongoose.connect("mongodb+srv://admin-prayag:admin123@cluster0-rqwpo.mongodb.net/collageDB", { useNewUrlParser: true });

let username = "";
let password = "";

app.use(indexStudent);
app.use(chatStudent);
app.use(attendanceStudent);
app.use(login);
app.use(signupStudent);

app.use(indexTeacher);
app.use(chatTeacher);
app.use(signupTeacher);
app.use(attendanceTeacher);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3001;

}

app.listen(port, function() {
    console.log("connected to server");
});