const express = require('express');
const router = express.Router();

const contactController = require('../app/controllers/contactController');
router.get('/', contactController.index);

module.exports = router;