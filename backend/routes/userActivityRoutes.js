
var express = require('express');
var router = express.Router();

//watch History + search history
router.get('/:movie/watch', userActivityController.updateWatchHistory);

module.exports = router;