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
function colorStr (color, str) {
  var colors = {
    red: '\u001b[31m',
    green: '\u001b[32m',
    yellow: '\u001b[33m',
    blue: '\u001b[34m',
    magenta: '\u001b[35m',
    cyan: '\u001b[36m',
    gray: '\u001b[37m',
    bold: '\u001b[1m',
    plain: '\u001b[0m'
  };

  return colors [color] + str + colors.plain;
}

function log (type, str) {
  if (!str) {
    str = type;
    type = 'plain';
  }

  switch (type) {
    case 'error': console.log (colorStr ('red', colorStr ('bold', 'ERR     ')) + str + '\n'); break;
    case 'fail': console.log (colorStr ('red', 'FAIL') + '    ' + str); break;
    case 'good': console.log (colorStr ('green', 'good') + '    ' + str); break;
    case 'warn': console.log (colorStr ('yellow', 'warn') + '    ' + str); break;
    case 'info': console.log (colorStr ('cyan', 'info') + '    ' + str); break;
    case 'note': console.log (colorStr ('bold', str)); break;
    case 'plain': default: console.log (str); break;
  }
}

function typeStr (str) {
  if (typeof str === 'string') {
    str = '"' + str + '"';
  } else if (str instanceof Object) {
    str = 'Object';
  } else if (str instanceof Array) {
    str = 'Array';
  } else if (str instanceof Error) {
    str = 'Error';
  }

  return colorStr ('magenta', str);
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
    console.log ();
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

  log ('note', colorStr ('blue', '(' + (next + 1) + '/' + queue.length + ') ') + label);

  for (i = 0; i < tests.length; i++) {
    test = {
      level: tests [i] [0],
      label: tests [i] [1],
      result: tests [i] [2],
      expect: tests [i] [3]
    };

    if (test.result === test.expect) {
      log ('good', colorStr ('blue', test.label) + ': ' + typeStr (test.result) + ' is exactly ' + typeStr (test.expect));
    }

    if (test.level === 'fail' && test.result !== test.expect) {
      errors++;
      level = 'fail';
      log ('fail', colorStr ('blue', test.label) + ': ' + typeStr (test.result) + ' is not ' + typeStr (test.expect));
    }

    if (test.level === 'warn' && test.result !== test.expect) {
      warnings++;
      level = level !== 'fail' && 'warn';
      log ('warn', colorStr ('blue', test.label) + ': ' + typeStr (test.result) + ' is not ' + typeStr (test.expect));
    }

    if (test.level === 'info') {
      log ('info', colorStr ('blue', test.label) + ': ' + typeStr (test.result));
    }
  }

  doNext ();
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
      ['fail', 'type', typeof data, 'number'],
      ['info', 'value', data]
    ]);
  });
});


queue.push (function () {
  bitminter.pool.workers (function (err, data) {
    doTest (err, 'pool.workers', [
      ['fail', 'type', typeof data, 'number'],
      ['info', 'value', data]
    ]);
  });
});


queue.push (function () {
  bitminter.pool.users (function (err, data) {
    doTest (err, 'pool.users', [
      ['fail', 'type', typeof data, 'number'],
      ['info', 'value', data]
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
    doTest (null, 'user.get self', [
      ['warn', 'skipped', 'BITMINTER_APIKEY', 'set']
    ]);
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
    doTest (null, 'user.get username', [
      ['warn', 'skipped', 'BITMINTER_APIKEY', 'set']
    ]);
  } else if (!config.username) {
    doTest (null, 'user.get username', [
      ['warn', 'skipped', 'BITMINTER_USERNAME', 'set']
    ]);
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

queue [0] ();
