
var db = require('./db.js');
var push = require('./push.js');


var countData = function( data ) {
    var items = {};
    for ( var d in data ) {
        for ( var p in data[d] ){
            items[ data[d][p] ] = items[ data[d][p] ] ? items[ data[d][p] ] + 1 : 1;
        }
    }
    return items;
};


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


var filterLine = function(response){
	data = [];

	for (var i = 0; i < response.length; i++) {
		data.push((response[i])['data']);
	}
	push.makeLine(data,'31473-1fac5cba-54ce-4fee-9364-db9b7cfcbc5b');
};


var filterPrice = function(response) {
    var key = 'price';

    var items = [];
    var counts = countData(response);

    for (var c in counts) {
        items.push({
            value : counts[c],
            text  : "Price: " + c
        });
    }

    var RAG_COLUMNS_KEY = '31473-7653d56b-a456-4512-9343-657404b55700';
    push.makeRagColumns(items, RAG_COLUMNS_KEY);
};


var filterFunnel = function(response) {
    var items = [];
    var counts = countData(response);

    for (var c in counts) {
        items.push({
            value : c,
            label : counts[c]
        });
    }
    console.log(items);
    var FUNNEL_KEY = '31473-6d240b75-7c52-40d5-877c-aeee9ab1f77d';
    push.makeFunnel(items.sort().reverse(), FUNNEL_KEY);
};


var updatePie = function(key, col, cb) {
    db.getData(key, col, function(err, response) {
        cb(response);
    });
};


var updateLine = function(key, col, cb){
    db.getData(key, col, function(err, response){
		cb(response);
	});
};


var updateRagColumns = function(key, col, cb) {
    db.getData(key, col, function(err, response) {
        cb(response);
    });
};


var updateFunnel = function(key, col, cb) {
    db.getData(key, col, function(err, response) {
        cb(response);
    });
};


// Main
var options = {
    url    : 'ec2-54-228-152-90.eu-west-1.compute.amazonaws.com',
    port   : 27017,
    dbname : 'day-10'
};

db.startClient(options, function(err) {
    if (err) {
        console.log(err);

    } else {
        /*
        updatePie('category', 'bundles', filterCategories);
        updateLine('data', 'bundles', filterLine);
        updateRagColumns('price', 'bundles', filterPrice);
        */
        updateFunnel('data', 'bundles', filterFunnel);
    }
});

