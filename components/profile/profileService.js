const userModel = require('../../models/User');
const bcrypt = require("bcrypt");
const authService = require('../auth/authService');

exports.findById = (id) => userModel.findOne({_id: id}).lean();

exports.updateOneFromDatabase = async (req) => {
    //comfirm password before change information.
    const user = await authService.findByEmail(req.user.email);
    const isValid = await authService.validPassword(req.body.oldPassword, user);

    // console.log(typeof req.body.password)
    if(req.body.password === ""){
        req.body.password = await bcrypt.hash(req.body.oldPassword, 10);
        // req.body.password = req.body.oldPassword;
    }
    else {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    if(!isValid){
        return false;            
    }
    else{
        await userModel.updateOne({_id:req.params._id}, req.body);
        return true;            
    }
}