const userModel = require('../../models/User');
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");


exports.findByUsername = (username) => userModel.findOne({username: username}).lean();

exports.validPassword = (password, user) => {
    return bcrypt.compare(password,user.password);
};

exports.model = async (user) => {
    const isExistUsername = await userModel.findOne({username: user.username});
    const isExistEmail = await userModel.findOne({email: user.email});
    if(isExistUsername || isExistEmail){
        return false;
    }
    const passwordHash = await bcrypt.hash(user.password, 10);
    return userModel.create({
        username: user.username,
        password: passwordHash,
        email: user.email,
        status: false,
        activationString: randomstring.generate(),
    })
}