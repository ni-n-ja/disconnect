#!/usr/bin/node

var express = require('express');
var app = express();
var iconv = require('iconv-lite');
// iconv.skipDecodeWarning = true;
var os = require('os');
const exec = require('child_process').exec;

var ip = os.networkInterfaces();

app.get('/', function (req, res) {
	res.send('Hello World!');
	// exec('netsh lan show interfaces', {
	// 		encoding: 'Shift_JIS'
	// 	},
	// 	(err, stdout, stderr) => {
	// 		if (err) {
	// 			// console.log(err);
	// 		}
	// 		let buf1 = new Buffer(stdout, 'binary');
	// 		console.log(iconv.decode(buf1, "Shift_JIS"));
	// 	});

	exec('netsh interface set interface name="net" admin=disable', {
			encoding: 'Shift_JIS'
		},
		(err, stdout, stderr) => {
			if (err) {
				// console.log(err);
			}
			let buf1 = new Buffer(stdout, 'binary');
			console.log(iconv.decode(buf1, "Shift_JIS"));
			setTimeout(() => {
				exec('netsh interface set interface name="net" admin=enabled', {
						encoding: 'Shift_JIS'
					},
					(err, stdout, stderr) => {
						if (err) {
							// console.log(err);
						}
						let buf1 = new Buffer(stdout, 'binary');
						console.log(iconv.decode(buf1, "Shift_JIS"));
					});
			}, 60000);
		});
});

var server = app.listen(3000, function () {
	console.log(server.address());
	var host = ip['net'][0].address;
	var port = server.address().port;
	console.log('listening at http://%s:%s', host, port);
});


//