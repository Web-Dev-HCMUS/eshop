const express = require('express');
const router = express.Router();

const aboutControlller = require('./profileController');
router.get('/', aboutControlller.show);
router.post('/:_id', aboutControlller.update);

module.exports = router;