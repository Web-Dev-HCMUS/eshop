const express = require('express');
const router = express.Router();

const homeControlller = require('./homeControlller');
router.get('/', homeControlller.list);

module.exports = router;