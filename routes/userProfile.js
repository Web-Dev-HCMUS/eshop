const express = require('express');
const router = express.Router();

const aboutControlller = require('../app/controllers/userProfileController');
router.get('/', aboutControlller.index);

module.exports = router;