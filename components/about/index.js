const express = require('express');
const router = express.Router();
const aboutControlller = require('./aboutController');

router.get('/', aboutControlller.index);

module.exports = router;