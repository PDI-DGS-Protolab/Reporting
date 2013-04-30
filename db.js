
var Mongodb = require('mongodb');

// var URL = 'ec2-54-228-152-90.eu-west-1.compute.amazonaws.com';
// var PORT = 27017;
// var DBNAME = 'day-10';

var client;


// extraer datos de una col concreta
var listData = function( key, collection, cb ) {
    collection.find( { key: 1 } ).toArray( cb );
};


var startClient = function( url, port, dbName ) {
    var server = new Mongodb.Server( url, port, {} );
    client = new Mongodb.Db( dbName, server);
};


var getData = function( key, collName, cb ) {
    client.open( function( err, pClient ) {
        client.collection( collName, function( err, collection ) {
            if ( !err ) listData( key, collection, cb );
        });
    });
};

exports.startClient = startClient;
exports.getData     = getData;
