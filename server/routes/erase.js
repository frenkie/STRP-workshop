var express = require('express');
var fs = require('fs');
var router = express.Router();
var HologramManager = require('../lib/HologramManager');

router.get( '/erase/:image', function ( req, res ) {

    var filePath;
    var fileName;

    if ( req.params.image && /^[\w\.]+$/.test( req.params.image ) ) {

        fileName = req.params.image +'.png';
        filePath = __dirname +'/../database/'+ fileName;

        fs.stat( filePath, function ( err, stats ) {

            if ( err || ! stats.isFile() ) {
                res.status( 500 );
                res.end('notok');
            } else {

                HologramManager.deselect( fileName ); // to be sure

                fs.unlinkSync( filePath );
                res.end('ok');
            }
        } );

    } else {
        res.status( 401 );
        res.end('notok');
    }
});

module.exports = router;