const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema

const User = new Schema({
    username: { type : String , required: true , unique: true},
    password: { type : String },
    email: { type : String },
    fullname: { type : String },
    address: { type : String },
    phone: { type : String },
    status: { type : Boolean }
});

User.plugin(uniqueValidator);

module.exports = mongoose.model('User', User);