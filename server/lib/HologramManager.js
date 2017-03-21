var Q = require('q');
var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');

var HologramManager = function () {

    this.selection = {};
};

HologramManager.prototype = {

    deselect: function ( name ) {
        if ( this.selection[ name ] ) {
            delete this.selection[ name ];
        }
    },

    fileListingAsJson: function ( files ) {

        var filesAsJson = files
            .filter( function ( name ) {
                return /png$/.test( name );
            })
            .map( function ( name ) {
                var dimensions = sizeOf( path.resolve ( __dirname, '../database/'+ name ) );

                return {
                    name: 'images/'+ name,
                    selected: this.isSelected( name ),
                    width: dimensions.width,
                    height: dimensions.height
                };
            }.bind( this ) )
            .reverse();

        return {
            'files': filesAsJson
        };
    },

    getAll: function () {
        var deferred = Q.defer();

        fs.readdir( __dirname +'/../database', function ( err, files ) {
            if ( err ) {
                deferred.reject();
            } else {
                deferred.resolve( this.fileListingAsJson( files ) );
            }
        }.bind( this ));

        return deferred.promise;
    },

    getSelection: function () {

        var selection = [];

        for ( var name in this.selection ) {
            selection.push( name );
        }

        return this.fileListingAsJson( selection );
    },

    isSelected: function ( name ) {
        return !!( this.selection[ name ] );
    },

    select: function ( name ) {
        this.selection[ name ] = true;
    }
};


module.exports = new HologramManager();