const express = require('express');
const router = express.Router();
const forgotController = require('./forgotController');

router.get('/', forgotController.index);
router.get('/sendMail', forgotController.sendMail);
router.get('/checkMail', forgotController.checkMail);
router.post('/resetPassword', forgotController.resetPassword);

module.exports = router;
