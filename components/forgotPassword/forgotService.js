const userModel = require('../../models/User');
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");
const sgMail = require('../../service/sendGrid');

exports.sendMail = async (email) => {
    const isExistEmail = await userModel.findOne({email: email});
    if(!isExistEmail){
        return false;
    }
    console.log(isExistEmail);

    const msg = {
        to: email, // Change to your recipient
        from: process.env.EMAIL_SEND, // Change to your verified sender
        subject: 'Eshop reset password ',
        text: 'do not reply',
        html: `<h1>Forgot your password?</h1></br>
        <p>That's okay, it happens! Click on the <a href="${process.env.DOMAIN_NAME}/forgotPassword/checkMail?email=${email}&activation-string=${isExistEmail.activationString}">RESET YOUR PASSWORD</a> to reset your password.</p>`,
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
          console.log(msg.html);
          return true;
        })
        .catch((error) => {
          console.error(error)
          return false;
        });
        return true;
}
exports.checkMail = async (email, activationString) => {
  const user = await userModel.findOne({
      email, activationString,
  }).lean();
  if(!user){
      return false;
  }
  else{
    return true;
  }
};

exports.resetPassword = async (user, pass) => {
  const password = await bcrypt.hash(pass, 10);
  
  return await userModel.updateOne({email: user.email}, {password: password})
  
};