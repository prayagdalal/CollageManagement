var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var roleModel = require('./roleSchema');

var roleSchema =  roleModel.roleModel.schema;

var signupSchema = new Schema({
	role_id: roleSchema,
	registred_id: String,
	name: String,
	email: String,
	rollno: Number,
	subject: String,
	gender: String,
	sem: String,
	div: String,
	address: String,
	password: String,
	dob: Date,
	pic: String
});

var signupModel = mongoose.model("signup", signupSchema);

exports.signupModel = signupModel;