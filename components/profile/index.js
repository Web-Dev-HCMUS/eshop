const express = require('express');
const router = express.Router();

const aboutControlller = require('./userProfileController');
router.get('/', aboutControlller.index);

module.exports = router;