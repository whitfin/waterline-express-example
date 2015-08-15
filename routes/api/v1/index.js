var express = require('express');
var router = express.Router();

router.get(function(req, res) {
  res.status(200);
  res.json({
    message: 'Welcome to API v1!'
  });
});

module.exports = router;
