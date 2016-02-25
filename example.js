var bitminter = require ('bitminter') ();

bitminter.pool.hashrate (function (err, data) {
	if (err) { return console.log (err); }

	console.log ('Bitminter hashrate: ' + data + ' Ghps');
});
