const express = require('express');
const router = express.Router();
const authController = require('./authController')
const passport = require("../../passport");
const userController = require('../../app/controllers/userController');


router.get('/login', authController.login);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login?wrong-password'
}));

router.post('/signup', userController.signup);

router.get('/logout', authController.logout);


module.exports = router;