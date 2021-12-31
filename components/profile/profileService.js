const userModel = require('../../models/User');
const bcrypt = require("bcrypt");
const authService = require('../auth/authService');

exports.findById = (id) => userModel.findOne({_id: id}).lean();

exports.updateOneFromDatabase = async (req) => await userModel.updateOne({_id:req.params._id}, req.body);

exports.updatePassword = async (req) => {
    const user = await userModel.findById({_id:req.params._id});
    const isValid = await authService.validPassword(req.body.password, user);
    if(!isValid){
        return false;
    }

    const newPassword = await bcrypt.hash(req.body['new-password'], 10);

    await userModel.updateOne({_id:req.params._id}, { $set: { password: newPassword }});
    return true;
}