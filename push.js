
var Geckoboard = require('geckoboard-push');

var API_KEY = '180911140d66035ce434390cf0dac36f';
var conn = new Geckoboard({ api_key : API_KEY });

var items = [
  {
    value: "100",
    label: "May",
    colour: "FFFF10AA"
  },
  {
    value: "160",
    label: "June",
    colour: "FFAA0AAA"
  },
  {
    value: "300",
    label: "July",
    colour: "FF5505AA"
  },
  {
    value: "140",
    label: "August",
    colour: "FF0000AA"
  }
];

var json = JSON.stringify(items);

var pie = foo.pie('pie_widget_key');

pie.send(json, function(err, response){
  //callback with response from geckoboard
})
