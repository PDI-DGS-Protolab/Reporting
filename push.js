
var Geckoboard = require('geckoboard-push');
var Mongodb = require('mongodb');

var API_KEY = '180911140d66035ce434390cf0dac36f';
var PIE_KEY = '31473-8a9b8503-c75d-483a-8b9f-d1324c5d01fc';


var gecko = new Geckoboard({ api_key : API_KEY });

var items = [
    {
        value: "100",
        label: "A1",
        colour: "FFFF10AA"
    },
    {
        value: "160",
        label: "A2",
        colour: "FFAA0AAA"
    },
    {
        value: "300",
        label: "A3",
        colour: "FF5505AA"
    },
    {
        value: "140",
        label: "A4",
        colour: "FF0000AA"
    }
];

// var pie = gecko.pie(PIE_KEY);
// pie.send(items, function(err, response){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(response);
//     }
// })

// var db = getDB( 'ec2-54-228-152-90.eu-west-1.compute.amazonaws.com', 27017, 'day-10' )

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
