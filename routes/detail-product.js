const express = require('express');
const router = express.Router();

const detailControlller = require('../app/controllers/detailControlller');

router.get('/:slug', detailControlller.show);

module.exports = router;