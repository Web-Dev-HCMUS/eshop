const express = require('express');
const router = express.Router();
const authController = require('./authController')
const passport = require("../../passport");


router.get('/login', authController.formLogin);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login?wrong-password'
}));
router.get('/logout', authController.logout);

router.get('/register', authController.formRegister);

router.post('/register', authController.register);

router.get('/activate', authController.activate);



module.exports = router;