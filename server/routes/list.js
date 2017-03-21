var express = require('express');
var router = express.Router();
var HologramManager = require('../lib/HologramManager');

router.get( '/list', function ( req, res ) {

    HologramManager.getAll().then( function ( filesAsJson ) {

        res.type('json');
        res.send( filesAsJson );

    }, function () {
        res.status( 500 );
        res.send({
            code: 500,
            error: 'Error reading file system'
        });
    });
});

module.exports = router;