var debug = require('debug')('strp');
var express = require('express'); // Docs http://expressjs.com/
var app = express();
var server = require('http').Server( app );

// binding to 0.0.0.0 allows connections from any other computer in the network
// to your ip address
var ipAddress = process.env.IP || '0.0.0.0';
var port = process.env.PORT || 8080;

server.listen( port, ipAddress, function () {

    app.use( require('./routes/index') );
    app.use( require('./routes/images') );
    app.use( require('./routes/list') );
    app.use( require('./routes/selection') );
    app.use( require('./routes/select') );
    app.use( require('./routes/deselect') );
    app.use( require('./routes/upload') );
    app.use( require('./routes/erase') );

    debug( 'started on localhost:' + port );
} );
