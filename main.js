
var module_db = require('db')

var options = {
    url    : 'ec2-54-228-152-90.eu-west-1.compute.amazonaws.com',
    port   : 27017,
    dbname : 'day-10'
};

var db = var module_db.startClient(options);

var keys = ['category'];
var col = 'accounts';

var cats = db.getData(keys, col);
cats.forEach(function(c) {

});
