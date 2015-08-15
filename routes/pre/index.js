var express = require('express');
var router = express.Router();

// render the main index page
router.get('/', function(req, res){
  res.render('index', {
    title: 'Welcome!'
  });
});

module.exports = router;
