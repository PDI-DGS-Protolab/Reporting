
// Imports
var Geckoboard = require('geckoboard-push');


var API_KEY = '180911140d66035ce434390cf0dac36f';
var gecko = new Geckoboard({ api_key : API_KEY });


var callback = function(err, response){
    if (err) {
        console.log(err);

    } else {
        console.log(response);
    }
};


var pie = function() {
    var PIE_KEY = '31473-8a9b8503-c75d-483a-8b9f-d1324c5d01fc';
    var pie = gecko.pie(PIE_KEY);

    var pie_items = [
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

    pie.send(pie_items, callback);
};

pie();




/*
var line = function() {
    var LINE_KEY = '31473-1fac5cba-54ce-4fee-9364-db9b7cfcbc5b';
    var line = gecko.line(LINE_KEY);

    var line_items = ["12.3", "2.3", "10", "15", "15", "13", "12.1", "9.8", "12.3", "2.3", "10", "15", "15", "13", "12.1", "9.8", "11", "16", "15", "13", "10", "7"];
    var line_settings = {
        "axisx": [
            "Jun",
            "Jul",
            "Aug"
        ],

        "axisy": [
            "Min",
            "Max"
        ],

        "colour": "ff9900"
    };

    line.send(line_items, line_settings, callback);
};


var rag_columns = function() {
    var RAG_COLUMNS_KEY = '31473-7653d56b-a456-4512-9343-657404b55700';
    var ragcol = gecko.ragColumn(RAG_COLUMNS_KEY);

    var ragcol_items = [
        {
            value: 120,
            text: "Red description"
        },
        {
            value: 75,
            text: "Amber description"
        },
        {
            value: 5,
            text: "Green description"
        }
    ];

    var ragcol_type = 'reverse';

    ragcol.send(ragcol_items, ragcol_type, callback);
};


// Main

line();
rag_columns();
*/
