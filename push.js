
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


var makePie = function(items, widgetKey) {
    var pie = gecko.pie(widgetKey);
    var colours = [ "FFFF10AA", "FFAA0AAA", "FF5505AA", "FF0000AA" ];

    for (var i = 0; i < items.length; i++) {
        var c = i % colours.length;
        items[i].colour = colours[c];
    };

    pie.send(items, callback);
};


var makeLine = function(data, widgetKey) {
    var line = gecko.line(widgetKey);

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


var makeRagColumns = function(items, widgetKey) {
    var ragcol = gecko.ragColumn(widgetKey);
    var ragcol_type = 'reverse';

    var LIMIT = 3;    // Limit of data elements
    for (var i = LIMIT, len = items.length; i < len; i++) {
        items.pop();
    }

    ragcol.send(items, ragcol_type, callback);
};


var makeFunnel = function(items, widgetKey){
    var funnel = gecko.funnel(widgetKey);
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

