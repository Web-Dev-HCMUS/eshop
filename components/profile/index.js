const express = require('express');
const router = express.Router();
const profileController = require('./profileController');

router.get('/', profileController.show);
router.post('/:_id', profileController.update);

router.get('/change-password', profileController.changePasswordPage);
router.post('/change-password/:_id', profileController.updateNewPassword);

module.exports = router;