
// Imports
var Geckoboard = require('geckoboard-push');
var Mongodb = require('mongodb');

var API_KEY = '180911140d66035ce434390cf0dac36f';

var gecko = new Geckoboard({ api_key : API_KEY });


var callback = function(err, response){
    if (err) {
        console.log(err);

    } else {
        console.log(response);
    }
};


var makePie = function(items, key) {
    var PIE_KEY = key;
    var pie = gecko.pie(PIE_KEY);

    var pie_items = [
        {
            value: items[0],
            label: "Default",
            colour: "FFFF10AA"
        },
        {
            value: items[1],
            label: "Purchase",
            colour: "FFAA0AAA"
        },
        {
            value: items[2],
            label: "Gift",
            colour: "FF5505AA"
        },
        {
            value: items[3],
            label: "Prepaid",
            colour: "FF0000AA"
        }
    ];
    console.log(pie_items);
    pie.send(pie_items, callback);
};


var makeLine = function(data, key) {
    var LINE_KEY = '31473-1fac5cba-54ce-4fee-9364-db9b7cfcbc5b';
    var line = gecko.line(LINE_KEY);

    var line_items = data;
    var axisX = [];

    var line_settings = {
        "axisy": [
            "Min",
            "Max"
        ],

        "colour": "ff9900"
    };

    for (var i = 0; i < data.length; i++) {
        axisX.push(i);
    }

    line_settings['axisx'] = axisX;
    line.send(line_items, line_settings, callback);
};


var makeRagColumns = function(items, KEY) {
    var ragcol = gecko.ragColumn(KEY);
    var ragcol_type = 'reverse';

    var LIMIT = 3;    // Limit of data elements
    for (var i = LIMIT, len = items.length; i < len; i++) {
        items.pop();
    }

    //console.log(items);
    ragcol.send(items, ragcol_type, callback);
};


var makeFunnel = function(items, KEY){
    var funnel = gecko.funnel(KEY);
    funnel.send(items, 'standard', 'hide', callback);
};

/*
var bullet = function(){
  var BULLET_KEY = '31473-4ebcb24a-2d97-4b89-8243-7a2cff49e7ed';
  var items = [
    {
      label: "Revenue 2011 YTD",
      sublabel: "(U.S. $ in thousands)",
      axis: {
        point: [
          0,
          200,
          400,
          600,
          800,
          1000
        ]
      },
      range:[
        { color: "red",
          start: 0,
          end: 400
        },
        {
          color: "amber",
          start: 401,
          end: 700
        },
        {
          color: "green",
          start: 701,
          end: 1000
        }
      ],
      measure: {
        current: {
          start: 0,
          end: 500
        },
        projected: {
          start: 100,
          end: 900
        }
      },
      comparative: {
        point: 600
      }
    }
  ];

  var bullet = gecko.bullet(BULLET_KEY);
  bullet.send(items, 'horizontal', callback);
};
*/

exports.makePie = makePie;
exports.makeLine = makeLine;
exports.makeRagColumns = makeRagColumns;
exports.makeFunnel = makeFunnel;

