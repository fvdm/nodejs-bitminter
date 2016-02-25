var bitminter = require ('bitminter') ();

bitminter.pool.hashrate (function (err, data) {
  if (err) {
    console.log (err);
    return;
  }

  console.log ('Bitminter hashrate: ' + data + ' Ghps');
});
