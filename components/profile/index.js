const express = require('express');
const router = express.Router();
const profileControlller = require('./profileController');

router.get('/', profileControlller.show);
router.post('/:_id', profileControlller.update);

router.get('/change-password', profileControlller.changePasswordPage);
router.post('/change-password/:_id', profileControlller.updateNewPassword);

module.exports = router;