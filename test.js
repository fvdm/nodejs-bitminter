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
  timeout: process.env.BITMINTER_TIMEOUT || 5000
};

var bitminter = app (config);


// METHODS
dotest.add ('pool.stats', function () {
  bitminter.pool.stats (function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('pool.hashrate', function () {
  bitminter.pool.hashrate (function (err, data) {
    dotest.test (err)
      .isNumber ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('pool.workers', function () {
  bitminter.pool.workers (function (err, data) {
    dotest.test (err)
      .isNumber ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('pool.users', function () {
  bitminter.pool.users (function (err, data) {
    dotest.test (err)
      .isNumber ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('pool.round', function () {
  bitminter.pool.round (function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('pool.blocks normal', function () {
  bitminter.pool.blocks (function (err, data) {
    dotest.test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('pool.blocks option', function () {
  bitminter.pool.blocks ({ max: 3 }, function (err, data) {
    dotest.test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .isExactly ('fail', 'data.length <= 3', data && data.length <= 3, true)
      .done ();
  });
});


dotest.add ('pool.shifts normal', function () {
  bitminter.pool.shifts (function (err, data) {
    dotest.test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('pool.shifts option', function () {
  bitminter.pool.shifts ({ max: 3 }, function (err, data) {
    dotest.test (err)
      .isArray ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .isExactly ('fail', 'data.length <= 3', data && data.length <= 3, true)
      .done ();
  });
});


dotest.add ('pool.top50', function () {
  bitminter.pool.top50 (function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('user.get self', function () {
  if (!config.apikey) {
    dotest.log ('warn', 'Skipped - BITMINTER_APIKEY not set');
    dotest.test () .done ();
    return;
  }

  bitminter.users.get (function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('user.get username', function () {
  if (!config.apikey) {
    dotest.log ('warn', 'Skipped - BITMINTER_APIKEY not set');
    return;
  }

  if (!config.username) {
    dotest.log ('warn', 'Skipped - BITMINTER_USERNAME not set');
    return;
  }

  bitminter.users.get (config.username, function (err, data) {
    dotest.test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


// Start the tests
dotest.run ();
