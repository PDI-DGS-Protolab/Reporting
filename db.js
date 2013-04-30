// conectar

// extraer datos de una col concreta
var Mongodb = require('mongodb');
var server = new Mongodb.Server('ec2-54-228-152-90.eu-west-1.compute.amazonaws.com', 27017, {});
var client = new Mongodb.Db('day-10', server);

var listAllData = function(err, collection) {
    collection.find().toArray(function(err, results) {
        console.log(results);
    });
}

client.open( function( err, pClient ) {
    client.collection( 'accounts', listAllData );
});