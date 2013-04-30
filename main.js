
var db = require('./db.js');

var options = {
    url    : 'ec2-54-228-152-90.eu-west-1.compute.amazonaws.com',
    port   : 27017,
    dbname : 'day-10'
};

db.startClient(options);

var key = 'category';
var col = 'bundles';

var cats = db.getData(key, col, function( err, results ) {
	console.log( results );
});
