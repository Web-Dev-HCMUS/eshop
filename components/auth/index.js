const express = require('express');
const router = express.Router();
const authController = require('./authController')
const passport = require("../../passport");


router.get('/login', authController.formLogin);

router.post('/login',  function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
    if(err == "notActivated"){ return res.redirect('/auth/login?not-activated'); }
    if (err) { return next(err); }
    if (!user) { return res.redirect('/auth/login?wrong-password'); }

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      if(req.body.isComment !== undefined){
        const isComment = req.body.isComment;
        return res.redirect(`/${isComment}`);
      }

      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', authController.logout);

router.get('/register', authController.formRegister);

router.post('/register', authController.register);

router.get('/activate', authController.activate);


module.exports = router;