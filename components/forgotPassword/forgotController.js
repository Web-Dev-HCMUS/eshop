const forgotService = require('./forgotService');
const authService = require('../auth/authService')

exports.index = async (req, res, next) => {
    const {result} = req.query;
    res.render('../components/forgotPassword/views/forgotPassword',{result});
}

exports.sendMail = async (req, res, next) => {
    let success = await forgotService.sendMail(req.query.email);
    if(success === undefined) {success = false;}
    res.render('../components/forgotPassword/views/waiting', {success});        
}

exports.checkMail = async (req, res, next) => {
    const {email} = req.query;
    const activationString = req.query['activation-string'];
    const result = await forgotService.checkMail(email, activationString);
    if(result){
        res.render('../components/forgotPassword/views/resetPassword',{result, email, activationString});
    }
    else{
        res.render('../components/forgotPassword/views/resetPassword',{result});
    }
}

exports.resetPassword = async (req, res, next) => {
    const {email} = req.query;
    const {activationString} = req.query;
    const result = await forgotService.checkMail(email, activationString);
    if(result){
        const user = await authService.findByEmail(email);
        const pass = req.body.password;
        const update = await forgotService.resetPassword(user, pass);
        if(update){
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/');
              });
        }
        else{
            res.redirect('/forgotPassword?result=fail');
            
        }

    }
}