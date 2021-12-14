const authService = require('./authService');

exports.formLogin = async function(req, res, next){
    const wrongPassword = req.query['wrong-password'] !== undefined;
    res.render('login', { wrongPassword});
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