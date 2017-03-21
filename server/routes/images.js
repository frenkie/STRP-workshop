var express = require('express');
var router = express.Router();

router.use('/images', express.static( __dirname +'/../database' ));

module.exports = router;