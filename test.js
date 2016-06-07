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

var unauth = app ({
  timeout: config.timeout
});

var timeout = app ({
  timeout: 1
});


// MODULE
dotest.add ('Module interface', function (test) {
  var pool = bitminter.pool;
  var users = bitminter.users;

  test ()
    .isFunction ('fail', 'exports', app)
    .isObject ('fail', 'interface', bitminter)
    .isObject ('fail', '.pool', pool)
    .isFunction ('fail', '.pool.stats', pool && pool.stats)
    .isFunction ('fail', '.pool.hashrate', pool && pool.hashrate)
    .isFunction ('fail', '.pool.workers', pool && pool.workers)
    .isFunction ('fail', '.pool.users', pool && pool.users)
    .isFunction ('fail', '.pool.round', pool && pool.round)
    .isFunction ('fail', '.pool.blocks', pool && pool.blocks)
    .isFunction ('fail', '.pool.shifts', pool && pool.shifts)
    .isFunction ('fail', '.pool.top50', pool && pool.top50)
    .isObject ('fail', '.users', users)
    .isFunction ('fail', '.users.get', users && users.get)
    .done ();
});


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


dotest.add ('users.get self', function (test) {
  bitminter.users.get (function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('users.get username', function (test) {
  bitminter.users.get (config.username, function (err, data) {
    test (err)
      .isObject ('fail', 'data', data)
      .isNotEmpty ('warn', 'data', data)
      .done ();
  });
});


dotest.add ('Timeout error', function (test) {
  timeout.pool.stats (function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.code', err && err.code, 'TIMEOUT')
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('API error', function (test) {
  unauth.users.get (config.username, function (err, data) {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'API error')
      .isNumber ('fail', 'err.statusCode', err && err.statusCode)
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


// Start the tests
dotest.run ();
