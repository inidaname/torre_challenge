const express = require('express');
const main = require('../controller')

const router = express.Router();

/* GET home page. */
router.route('/:username*?').get(main.mainPage);

module.exports = router;
