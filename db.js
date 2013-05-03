
var Mongodb = require( 'mongodb' );

// var URL = 'ec2-54-228-152-90.eu-west-1.compute.amazonaws.com';
// var PORT = 27017;
// var DBNAME = 'day-10';

var client;


// extraer datos de una col concreta
var listData = function( key, collection, cb ) {
    var aux = {};
    aux['_id'] = 0;
    aux[key] = 1;
    collection.find({}, aux ).toArray( cb );
};


var startClient = function(options, cb) {
    var server = new Mongodb.Server( options.url, options.port, {} );
    client = new Mongodb.Db( options.dbname, server);
    client.open(function(err) {
        cb(err);
    });
};


var getData = function( key, collName, cb ) {
    client.collection( collName, function( err, collection ) {
        if ( !err ) listData( key, collection, cb );
    });
};


exports.startClient = startClient;
exports.getData = getData;


