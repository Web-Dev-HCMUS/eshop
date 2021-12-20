const userModel = require('../../models/User');
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");
const sgMail = require('../../service/sendGrid');


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
    await userModel.create({
        username: user.username,
        password: passwordHash,
        email: user.email,
        status: false,
        activationString: randomstring.generate(),
    })

    const msg = {
        to: user.email, // Change to your recipient
        from: process.env.EMAIL_SEND, // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
}

exports.verify_email = (user) => {
    const msg = {
        to: user.email, // Change to your recipient
        from: process.env.EMAIL_SEND, // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
}