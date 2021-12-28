const authService = require('./authService');

exports.formLogin = async function(req, res, next){
    const wrongPassword = req.query['wrong-password'] !== undefined;
    const notActivated = req.query['not-activated'] !== undefined;

    let comment = req.query['redirect'];
    const isComment = comment !== undefined;
    comment = {comment}

    if(!isComment){
        if(wrongPassword){
            res.render('login', { wrongPassword});
        }else if(notActivated) {
            res.render('login', { notActivated});
        }
        else{
            res.render('login');
        }}
    else {
        if(wrongPassword){
            res.render('login', { wrongPassword, comment});
        }else if(notActivated) {
            res.render('login', { notActivated, comment});
        }
        else{
            res.render('login', comment);
        }}
};

exports.logout = async function(req, res, next){
    req.logout();
    res.redirect('/');
};

exports.formRegister= async function(req, res, next){
    const userExist = req.query['username-exist'] !== undefined;
    res.render('register', {userExist});
};

exports.register = async (req, res, next) => {
    const success = await authService.model(req.body);
    if(success === false){
        res.redirect(`/auth/register?username-exist`);
    } else{
        res.redirect(`/auth/login`);
    }
}

exports.activate = async (req, res, next) => {
    const {email} = req.query;
    const activationString = req.query['activation-string'];
    const result = await authService.activate(email, activationString);
    if(result){
        const user = await authService.findByEmail(email);
        req.login(user, function(err){
            if(err){return next(err);}
            return res.redirect('/');
        });
    }
    else{
        return res.redirect('/');

    }
}