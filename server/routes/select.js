var express = require('express');
var router = express.Router();
var HologramManager = require('../lib/HologramManager');

router.get( '/select/:name', function ( req, res ) {

    if ( req.params.name ) {

        HologramManager.select( req.params.name +'.png' );
        res.send({
            status: 'Ok'
        });

    } else {
        res.status( 400 );
        res.send({
            code: 400,
            error: 'Baddd'
        });
    }
});

module.exports = router;