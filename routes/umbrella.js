var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('umbrella', { title: 'Search Results Umbrella' });
});

module.exports = router;
