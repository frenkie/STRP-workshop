var Q = require('q');
var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');

function fileListingAsJson ( files ) {

    return { 'files': files
        .filter( function ( name ) {

            return /(png|jpg)$/.test( name );
        })
        .map( function ( name ) {
            var dimensions = sizeOf( path.resolve ( __dirname, '../database/'+ name ) );

            return {
                name: 'images/'+ name,
                width: dimensions.width,
                height: dimensions.height
            };
        })
        .reverse()
    };
}

var HologramManager = function () {

    this.selection = {};
};

HologramManager.prototype = {

    deselect: function ( name ) {
        if ( this.selection[ name ] ) {
            delete this.selection[ name ];
        }
    },

    getAll: function () {
        var deferred = Q.defer();

        fs.readdir( __dirname +'/../database', function ( err, files ) {
            if ( err ) {
                deferred.reject();
            } else {
                deferred.resolve( fileListingAsJson( files ) );
            }
        }.bind( this ));

        return deferred.promise;
    },

    getSelection: function () {

        var selection = [];

        for ( var name in this.selection ) {
            selection.push( name );
        }

        return fileListingAsJson( selection );
    },

    select: function ( name ) {
        this.selection[ name ] = true;
    }
};


module.exports = new HologramManager();