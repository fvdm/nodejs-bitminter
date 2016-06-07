/*
Name:           bitminter - test.js
Source & docs:  https://github.com/fvdm/nodejs-bitminter
Feedback:       https://github.com/fvdm/nodejs-bitminter/issues
License:        Unlicense (public domain)
*/

var dotest = require ('dotest');
var app = require ('./');


// Setup
// set env BITMINTER_APIKEY and BITMINTER_USERNAME  (CI tests)
var config = {
  apikey: process.env.BITMINTER_APIKEY || null,
  username: process.env.BITMINTER_USERNAME || null,
  timeout: process.env.BITMINTER_TIMEOUT || null
};

var bitminter = app (config);


// METHODS
dotest.add ('pool.stats', function (test) {
  bitminter.pool.stats (function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('pool.hashrate', function (test) {
  bitminter.pool.hashrate (function (err, data) {
    test (err)
      .isNumber ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('pool.workers', function (test) {
  bitminter.pool.workers (function (err, data) {
    test (err)
      .isNumber ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('pool.users', function (test) {
  bitminter.pool.users (function (err, data) {
    test (err)
      .isNumber ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('pool.round', function (test) {
  bitminter.pool.round (function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('pool.blocks normal', function (test) {
  bitminter.pool.blocks (function (err, data) {
    test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('pool.blocks option', function (test) {
  bitminter.pool.blocks ({ max: 3 }, function (err, data) {
    test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .isCondition ('fail', 'data.length', data && data.length, '<=', 3)
      .done ();
  });
});


dotest.add ('pool.shifts normal', function (test) {
  bitminter.pool.shifts (function (err, data) {
    test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('pool.shifts option', function (test) {
  bitminter.pool.shifts ({ max: 3 }, function (err, data) {
    test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .isCondition ('fail', 'data.length', data && data.length, '<=', 3)
      .done ();
  });
});


dotest.add ('pool.top50', function (test) {
  bitminter.pool.top50 (function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('user.get self', function (test) {
  if (!config.apikey) {
    dotest.log ('warn', 'Skipped - BITMINTER_APIKEY not set');
    test ()
      .done ();
    return;
  }

  bitminter.users.get (function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('user.get username', function (test) {
  if (!config.apikey) {
    dotest.log ('warn', 'Skipped - BITMINTER_APIKEY not set');
    return;
  }

  if (!config.username) {
    dotest.log ('warn', 'Skipped - BITMINTER_USERNAME not set');
    return;
  }

  bitminter.users.get (config.username, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


// Start the tests
dotest.run ();
