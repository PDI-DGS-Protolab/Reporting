
var Geckoboard = require('geckoboard-push');

var API_KEY = '180911140d66035ce434390cf0dac36f';
var PIE_KEY = '31473-8a9b8503-c75d-483a-8b9f-d1324c5d01fc';

var gecko = new Geckoboard({ api_key : API_KEY });

var items = [
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

var pie = gecko.pie(PIE_KEY);
pie.send(items, function(err, response){
    if (err) {
        console.log(err);
    } else {
        console.log(response);
    }
})
