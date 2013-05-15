const TIMEOUT = 10000;
describe('node-rsyncer', function () {
	console.log("Timeout set at", TIMEOUT);
	this.timeout(TIMEOUT * 2)
	setTimeout(function() {
		console.log("")
		console.log("timedout")
		console.log("")
		process.exit(1); 
	}, TIMEOUT);

	var rsyncer = require('../')
		,	assert  = require('assert')
		,	fs      = require('fs')
		,	path    = require('path')
		,	config  = require('./config')


	it("Should parse a configuration object that provides an object of paths and args", function (done) {
		var syncer = rsyncer(config)
		syncer.on('sync', function () {
			var dstData = fs.readFileSync('./tmp/dst/test.data')
				,	srcData = fs.readFileSync('./tmp/src/test.data')

			assert.ok(dstData.toString() === srcData.toString());
			done();
		});
	});
});