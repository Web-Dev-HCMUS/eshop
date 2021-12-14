const userModel = require('../../models/User');
const bcrypt = require("bcrypt");

exports.findById = (id) => userModel.findOne({_id: id}).lean();

exports.updateOneFromDatabase = async (req) => {
    await userModel.updateOne({_id:req.params._id}, req.body);
}