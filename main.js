
var db = require('./db.js');
var push = require('./push.js');

var options = {
    url    : 'ec2-54-228-152-90.eu-west-1.compute.amazonaws.com',
    port   : 27017,
    dbname : 'day-10'
};

db.startClient(options);

var key = 'category';
var col = 'bundles';

var purchase = 0;
var gift = 0;
var prepaid = 0;
var def = 0;

var cats = db.getData(key, col, function(err, response) {
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

	items = [def, purchase, gift, prepaid];
	push.makePie(items,'31473-8a9b8503-c75d-483a-8b9f-d1324c5d01fc');
});
