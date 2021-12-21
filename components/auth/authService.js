const userModel = require('../../models/User');
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");
const sgMail = require('../../service/sendGrid');


exports.findByUsername = (username) => userModel.findOne({username: username}).lean();
exports.findByEmail = (email) => userModel.findOne({email: email}).lean();

exports.isActivate = (user) => {
    return user.status;
};

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
    const activationString = randomstring.generate();
    await userModel.create({
        username: user.username,
        password: passwordHash,
        email: user.email,
        status: false,
        activationString,
    })

    const msg = {
        to: user.email, // Change to your recipient
        from: process.env.EMAIL_SEND, // Change to your verified sender
        subject: 'Eshop account activation ',
        text: 'do not reply',
        html: `<h1>Thanks for register your account with eshop.</h1></br>
        <p>Please activate your account <a href="${process.env.DOMAIN_NAME}/auth/activate?email=${user.email}&activation-string=${activationString}">Activate now!</a></p>`,
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
          console.log(msg.html);
        })
        .catch((error) => {
          console.error(error)
        });
        
}

exports.activate = async (email, activationString) => {
    const user = await userModel.findOne({
        email, activationString,
    }).lean();
    if(!user){
        return false;
    }
    await userModel.updateOne({
        email,
        activationString,
    },{
        $set:{
            status: true,
        },
    }
    )
    return true;
};
// ${process.env.DOMAIN_NAME}/users/activate?email=${user.email}&activation_string=${activationString}