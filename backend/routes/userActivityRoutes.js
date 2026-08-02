
var express = require('express');
var router = express.Router();

//watch History + search history
router.get('/:userid/:movie/watch', userActivityController.updateWatchHistory);

module.exports = router;