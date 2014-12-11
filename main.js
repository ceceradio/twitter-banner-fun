var gm = require('gm');
var fs = require('fs');
var request = require('request');
var config = require('./config.js');


var iterations = 0;
var MAX_ITERATIONS = 50;
var fileNames = config.fileNames;


createBase(function() {
	if (fileNames.length > 0)
		iterate(fileNames[0]);
});

function uploadToTwitter() {
	var r = request.post(
		{
			url:"https://api.twitter.com/1.1/account/update_profile_banner.json", 
			oauth:config.twitter, 
			host: "api.twitter.com", 
			protocol: "https:"
		}, 
		function(err, res, body) {
			console.log(err);
			console.log(body);
			console.log('done!');
		}
	);
	var form = r.form();
	form.append('banner', fs.createReadStream('header.png'));
	console.log('posting');
}
function iterate(file) {
	if (iterations >= MAX_ITERATIONS) {
		uploadToTwitter();
		return;
	}
	iterateLogo(file,function() {
		pasteOntoHeader(function() {
			iterations++;
			iterate(fileNames[iterations % fileNames.length]);
		});
	});
}
function pasteOntoHeader(callback) {
	header = gm('header.png')
	.composite('rotscale.png')
	.geometry('+'+irand(-50,1500)+'+'+irand(-50,500))
	.write('header.png',function(err) {
		if(err) console.log(err);
		callback();
	});
}
function iterateLogo(file,callback) {
	gm(file).size(function(err,size) {
		if (!err)
			gm(file).resize(irand(size.width/2,size.width*4),irand(size.height/2,size.height*4),"!")
			.rotate('none',irand(0,359)+">")
			.write('rotscale.png',function(err) {
				if(err) console.log(err);
				callback();
			});
		else
			console.log(err);
	});
	
}

function createBase(callback) {
	gm(config.ORIGINAL_HEADER)
	.write('header.png',function(err) {
		if(err) console.log(err);
		callback();
	});
}
function irand(a,b) {
	return Math.floor(a + Math.random() * (b-a) );
}


