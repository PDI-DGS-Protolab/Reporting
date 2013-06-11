
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


var buildPie = function(response, dataKey, widgetKey) {
    var items = [];
    var counts = countData(response);

    for (var c in counts) {
        items.push({
            value : counts[c],
            label : c
        });
    }

    push.makePie(items, widgetKey);
};


var buildLine = function(response, dataKey, widgetKey){
	data = [];

	for (var i = 0; i < response.length; i++) {
		data.push((response[i])[dataKey]);
	}

	push.makeLine(data, widgetKey);
};


var buildRagColumns = function(response, dataKey, widgetKey) {
    var items = [];
    var counts = countData(response);

    for (var c in counts) {
        items.push({
            value : counts[c],
            text  : dataKey + ": " + c
        });
    }

    push.makeRagColumns(items, widgetKey);
};


var buildFunnel = function(response, dataKey, widgetKey) {
    var items = [];
    var counts = countData(response);

    for (var c in counts) {
        items.push({
            value : c,
            label : counts[c]
        });
    }

    push.makeFunnel(items.sort().reverse(), widgetKey);
};


var updateWidget = function(dataKey, col, widgetKey, cb) {
    db.getData(dataKey, col, function(err, response) {
        cb(response, dataKey, widgetKey);
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
        var PIE_KEY = '31473-8a9b8503-c75d-483a-8b9f-d1324c5d01fc';
        var LINE_KEY = '31473-1fac5cba-54ce-4fee-9364-db9b7cfcbc5b';
        var RAG_COLUMNS_KEY = '31473-7653d56b-a456-4512-9343-657404b55700';
        var FUNNEL_KEY = '31473-6d240b75-7c52-40d5-877c-aeee9ab1f77d';

        updateWidget('category', 'bundles', PIE_KEY, buildPie);
        updateWidget('data', 'bundles', LINE_KEY, buildLine);
        updateWidget('price', 'bundles', RAG_COLUMNS_KEY, buildRagColumns);
        updateWidget('data', 'bundles', FUNNEL_KEY, buildFunnel);
    }
});
