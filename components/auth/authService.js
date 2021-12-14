const userModel = require('../../models/User');
const bcrypt = require('bcrypt');

exports.findByUsername = (username) => userModel.findOne({username: username}).lean();

exports.validPassword = (password, user) => {
    return bcrypt.compare(password,user.password);
};

exports.model = async (user) => {
    const isExist = await userModel.findOne({username: user.username});
    if(isExist){
        return false;
    }
    const passwordHash = await bcrypt.hash(user.password, 10);
    return userModel.create({
        username: user.username,
        password: passwordHash,
        email: user.email,
        status: true
    })
}