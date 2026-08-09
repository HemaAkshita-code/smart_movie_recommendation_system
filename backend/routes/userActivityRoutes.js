
var express = require('express');
var router = express.Router();
const userActivityController = require('../controllers/userActicityController');

//watch History + search history
router.get('/:userid/:movie/watch', userActivityController.updateWatchHistory);

module.exports = router;