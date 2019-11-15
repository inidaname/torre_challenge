const express = require('express');
const {home, search} = require('../controller')

const router = express.Router();

function checkBrowser(req, res, next) {
    if (req.headers['check']){
        next();
    } else {
        console.log('see')
    }
}

// Sending search query
router.route('/search/:query/:connection*?').get(checkBrowser, search.search);

/* GET home page. */
router.route('/:username*?').get(home.mainPage);


module.exports = router;
