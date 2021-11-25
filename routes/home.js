const express = require('express');
const router = express.Router();

const homeControlller = require('../app/controllers/homeControlller');
router.get('/', homeControlller.index);

module.exports = router;