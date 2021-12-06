const express = require('express');
const router = express.Router();
const authController = require('./authController')
const passport = require("../../passport");

router.get('/login', authController.login);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login?wrong-password'
}));


router.get('/logout', authController.logout);


module.exports = router;