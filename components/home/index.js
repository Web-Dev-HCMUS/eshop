const express = require('express');
const router = express.Router();
const homeController = require('./homeController')

router.get('/', homeController.list);

module.exports = router;