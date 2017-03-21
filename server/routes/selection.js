var express = require('express');
var router = express.Router();
var HologramManager = require('../lib/HologramManager');

router.get( '/selection', function ( req, res ) {

    res.type('json');
    res.send( HologramManager.getSelection() );
});

module.exports = router;