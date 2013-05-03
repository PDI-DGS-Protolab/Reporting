
var db = require('./db.js');
var push = require('./push.js');


var filterCategories = function(response) {
    var purchase = 0;
    var gift = 0;
    var prepaid = 0;
    var def = 0;

    var key = 'category';
    console.log(response);
    response.forEach(function(c) {
        if (c[key] == "PURCHASE"){
            purchase = purchase + 1;
        } else if(c[key] == "GIFT"){
            gift = gift + 1;
        }else if (c[key] == "PREPAID"){
            prepaid = prepaid + 1;
        }else{
            def = def + 1;
        }
    });

    var items = [def, purchase, gift, prepaid];
    push.makePie(items,'31473-8a9b8503-c75d-483a-8b9f-d1324c5d01fc');
};

var createPie = function(key, col, cb) {
    db.getData(key, col, function(err, response) {
        cb(response);
    });
};

var countData = function( data ) {
    var items = {};

    for ( var d in data ) {
        var values = data[d];

        for ( var v in values ){
            items[ values[v] ] = items[ values[v] ] ? items[ values[v] ] + 1 : 1;
        }
    }
    return items;
};


// Main
var options = {
    url    : 'ec2-54-228-152-90.eu-west-1.compute.amazonaws.com',
    port   : 27017,
    dbname : 'day-10'
};

db.startClient(options);
createPie('category', 'bundles', filterCategories);