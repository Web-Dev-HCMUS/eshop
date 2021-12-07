const userModel = require('../../app/models/User');
const bcrypt = require('bcrypt');

exports.findByUsername = (username) => userModel.findOne({username: username}).lean();

exports.validPassword = (password, user) => {
    return bcrypt.compare(password,user.password);
};