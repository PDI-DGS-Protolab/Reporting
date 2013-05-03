
var db = require('./db.js');
var push = require('./push.js');


var filterCategories = function(response) {
    var purchase = 0;
    var gift = 0;
    var prepaid = 0;
    var def = 0;

    var key = 'category';

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


function numElements(arr) {
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a, b];
}

var countData = function( data ) {
    var items = {};
    for ( var d in data ) {
        for ( var p in data[d] ){
            items[ data[d][p] ] = items[ data[d][p] ] ? items[ data[d][p] ] + 1 : 1;
        }
    }
    return items;
};

var filterPrice = function(response) {
    var raw_items = [];
    var key = 'price';
/*
    response.forEach(function(c) {
        raw_items.push( c[key] );
    });

    var elements = numElements(raw_items);
    var times    = elements[0];
    var numbers  = elements[1];

    var filtered_items = [];

    for (var i=0, len=times.length; i < len; i++) {
        filtered_items.push({
            value : numbers[i],
            text  : JSON.stringify( times[i] )
        });
    };
*/

    var counts = countData(response);
    for (var c in counts) {
        console.log(c +" - " + counts[c]);
        con
    }
    var RAG_COLUMNS_KEY = '31473-7653d56b-a456-4512-9343-657404b55700';
    push.makeRagColumns(filtered_items, RAG_COLUMNS_KEY);
};


var createRagColumns = function(key, col, cb) {
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

db.startClient(options);

//createPie('category', 'bundles', filterCategories);
createRagColumns('price', 'bundles', filterPrice);
