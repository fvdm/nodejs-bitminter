/*
Name:           bitminter - test.js
Source & docs:  https://github.com/fvdm/nodejs-bitminter
Feedback:       https://github.com/fvdm/nodejs-bitminter/issues
License:        Unlicense (public domain)
*/

'use strict';

var path = require ('path');
var dir = path.dirname (module.filename);

var pkg = require (path.join (dir, 'package.json'));
var app = require (path.join (dir));

var errors = 0;
var warnings = 0;
var queue = [];
var next = 0;


// Setup
// set env BITMINTER_APIKEY and BITMINTER_USERNAME  (CI tests)
var config = {
  apikey: process.env.BITMINTER_APIKEY || null,
  username: process.env.BITMINTER_USERNAME || null,
  timeout: process.env.BITMINTER_TIMEOUT || 5000
};

var bitminter = app (config);


// Color string
function log (type, str) {
  if (!str) {
    str = type;
    type = 'plain';
  }

  switch (type) {
    case 'error': console.log ('\u001b[1m\u001b[31mERR\u001b[0m  - ' + str + '\n'); break;
    case 'fail': console.log ('\u001b[31mFAIL\u001b[0m - ' + str); break;
    case 'good': console.log ('\u001b[32mgood\u001b[0m - ' + str); break;
    case 'warn': console.log ('\u001b[33mwarn\u001b[0m - ' + str); break;
    case 'info': console.log ('\u001b[36minfo\u001b[0m - ' + str); break;
    case 'note': console.log ('\u001b[1m' + str + '\u001b[0m'); break;
    case 'plain': default: console.log (str); break;
  }
}

function typeStr (str) {
  var output = '';
  var instance = null;

  switch (typeof str) {
    case 'string':
      output = '"' + str + '"';
      break;

    case 'object':
      instance = str instanceof Object && 'Object';
      instance = !instance ? str instanceof Array && 'Array' : instance;
      instance = !instance ? str instanceof Error && 'Error' : instance;
      output = '\u001b[35m' + instance + '\u001b[0m';
      break;

    case 'function':
    case 'number':
    case 'true':
    case 'false':
    case 'undefined':
    default:
      output = '\u001b[35m' + str + '\u001b[0m';
      break;
  }

  return output;
}

// handle exits
process.on ('exit', function () {
  console.log ();
  log ('info', errors + ' errors');
  log ('info', warnings + ' warnings');
  console.log ();

  if (errors) {
    process.exit (1);
  } else {
    process.exit (0);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function (err) {
  console.log (err);
  console.log ();
  console.log (err.stack);
  console.log ();
  errors++;
});

// Queue to prevent flooding
function doNext () {
  next++;
  if (queue [next]) {
    queue [next] ();
  }
}

/**
 * doTest checks for error
 * else runs specified tests
 *
 * @param {Error} err
 * @param {String} label
 * @param {Array} tests
 *
 * doTest(err, 'label text', [
 *   ['fail', 'feeds', typeof feeds, 'object'],
 *   ['warn', 'music', music instanceof Array, true],
 *   ['info', 'tracks', music.length]
 * ]);
 */

function doTest (err, label, tests) {
  var level = 'good';
  var testErrors = [];
  var testWarnings = [];
  var test;
  var i;

  if (err instanceof Error) {
    log ('error', label);
    console.dir (err, { depth: null, colors: true });
    console.log ();
    console.log (err.stack);
    console.log ();
    errors++;

    doNext ();
    return;
  }

  for (i = 0; i < tests.length; i++) {
    test = {
      level: tests [i] [0],
      label: tests [i] [1],
      result: tests [i] [2],
      expect: tests [i] [3]
    };

    if (test.level === 'fail' && test.result !== test.expect) {
      testErrors.push (test);
      errors++;
    }

    if (test.level === 'warn' && test.result !== test.expect) {
      testWarnings.push (test);
      warnings++;
    }

    if (test.level === 'info') {
      log('info', test.label + ' - ' + test.result);
    }
  }

  level = testWarnings.length ? 'warn' : level;
  level = testErrors.length ? 'fail' : level;

  log (level, label);

  if (testErrors.length) {
    testErrors.forEach (function (testpart) {
      log('fail', ' └ ' + testpart.label + ': ' + typeStr (testpart.result) + ' is not ' + typeStr (testpart.expect));
    });
  }

  if (testWarnings.length) {
    testWarnings.forEach (function (testpart) {
      log('warn', ' └ ' + testpart.label + ': ' + typeStr (testpart.result) + ' is not ' + typeStr (testpart.expect));
    });
  }

  doNext();
}


// METHODS
queue.push (function () {
  bitminter.pool.stats (function (err, data) {
    doTest (err, 'pool.stats', [
      ['fail', 'type', data instanceof Object, true]
    ]);
  });
});


queue.push (function () {
  bitminter.pool.hashrate (function (err, data) {
    doTest (err, 'pool.hashrate', [
      ['fail', 'type', typeof data, 'number']
    ]);
  });
});


queue.push (function () {
  bitminter.pool.workers (function (err, data) {
    doTest (err, 'pool.workers', [
      ['fail', 'type', typeof data, 'number']
    ]);
  });
});


queue.push (function () {
  bitminter.pool.users (function (err, data) {
    doTest (err, 'pool.users', [
      ['fail', 'type', typeof data, 'number']
    ]);
  });
});


queue.push (function () {
  bitminter.pool.round (function (err, data) {
    doTest (err, 'pool.round', [
      ['fail', 'type', data instanceof Object, true]
    ]);
  });
});


queue.push (function () {
  bitminter.pool.blocks (function (err, data) {
    doTest (err, 'pool.blocks normal', [
      ['fail', 'type', data instanceof Array, true]
    ]);
  });
});


queue.push (function () {
  bitminter.pool.blocks ({ max: 3 }, function (err, data) {
    doTest (err, 'pool.blocks option', [
      ['fail', 'type', data instanceof Array, true],
      ['fail', 'amount', data.length <= 3, true]
    ]);
  });
});


queue.push (function () {
  bitminter.pool.shifts (function (err, data) {
    doTest (err, 'pool.shifts normal', [
      ['fail', 'type', data instanceof Array, true]
    ]);
  });
});


queue.push (function () {
  bitminter.pool.shifts ({ max: 3 }, function (err, data) {
    doTest (err, 'pool.shifts option', [
      ['fail', 'type', data instanceof Array, true],
      ['fail', 'amount', data.length <= 3, true]
    ]);
  });
});


queue.push (function () {
  bitminter.pool.top50 (function (err, data) {
    doTest (err, 'pool.top50', [
      ['fail', 'type', data instanceof Object, true]
    ]);
  });
});


queue.push (function () {
  if (!config.apikey) {
    log ('info', 'users.get self skipped (no apikey)');
  } else {
    bitminter.users.get (function (err, data) {
      doTest (err, 'users.get self', [
        ['fail', 'type', data instanceof Object, true]
      ]);
    });
  }
});


queue.push (function () {
  if (!config.apikey) {
    log ('info', 'users.get username skipped (no apikey)');
  } else if (!config.username) {
    log ('info', 'users.get username skipped (no username)');
  } else {
    bitminter.users.get (config.username, function (err, data) {
      doTest (err, 'users.get username', [
        ['fail', 'type', data instanceof Object, true]
      ]);
    });
  }
});


// Start the tests
log ('note', 'Running tests...\n');
log ('note', 'Node.js:  ' + process.versions.node);
log ('note', 'Module:   ' + pkg.version);
console.log ();

queue[0] ();
