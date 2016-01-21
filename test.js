/*
Name:           bitminter - test.js
Source & docs:  https://github.com/fvdm/nodejs-bitminter
Feedback:       https://github.com/fvdm/nodejs-bitminter/issues
License:        Unlicense (public domain)
*/

var app = require ('./');
var colorTerm = String (process.env.TERM) .match (/color$/);

var errors = 0;
var queue = [];
var next = 0;


// Setup
// set env GEOIP2WS_USERID and GEOIP2WS_LICENSE  (CI tests)
var config = {
  apikey: process.env.BITMINTER_APIKEY || null,
  username: process.env.BITMINTER_USERNAME || null,
  timeout: process.env.BITMINTER_TIMEOUT || 5000
};

var bitminter = app (config);


// Logging
function styleStr (style, str) {
  var styles = {
    bold: '\u001b[1m',
    plain: '\u001b[0m',
    boldred: '\u001b[1m\u001b[31m',
    red: '\u001b[31m',
    green: '\u001b[32m',
    yellow: '\u001b[33m',
    gray: '\u001b[90m'
  };

  return colorTerm ? styles [style] + str + styles.plain : str;
}

function log (type, str) {
  if (!str) {
    str = type;
    type = 'plain';
  }

  if (typeof str === 'object') {
    console.dir (str, {
      depth: null,
      colors: colorTerm
    });

    return;
  }

  switch (type) {
    case 'info': console.log (styleStr ('yellow', 'info') + ' - ' + str); break;
    case 'fail': console.log (styleStr ('red', 'fail') + ' - ' + str); break;
    case 'good': console.log (styleStr ('green', 'good') + ' - ' + str); break;
    case 'bold': console.log (styleStr ('bold', str)); break;
    case 'error': console.log (styleStr ('boldred', str)); break;
    case 'plain': default: console.log (str); break;
  }
}


// handle exits
process.on ('exit', function () {
  if (errors === 0) {
    log ('bold', '\nDONE, no errors.\n');
    process.exit (0);
  } else {
    log ('bold', '\nFAIL, ' + errors + ' error' + (errors > 1 ? 's' : '') + ' occurred!\n');
    process.exit (1);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function (err) {
  console.log ();
  console.log (err.stack);
  console.log ();
  errors++;
});

// Queue to prevent flooding
function doNext () {
  next++;
  if (queue[next]) {
    queue[next] ();
  }
}

// doTest (passErr, 'methods', [
//   ['feeds', typeof feeds === 'object']
// ])
function doTest (err, label, tests) {
  var testErrors = [];

  if (err instanceof Error) {
    log ('fail', label);
    console.dir (err, { depth: null, colors: colorTerm });
    console.log ();
    console.log (err.stack);
    console.log ();
    errors++;
  } else {
    tests.forEach (function (test) {
      if (test[1] !== true) {
        testErrors.push (test[0]);
        errors++;
      }
    });

    if (testErrors.length === 0) {
      log ('good', label);
    } else {
      log ('fail', label + ' (' + testErrors.join (', ') + ')');
    }
  }

  doNext ();
}


// METHODS
queue.push (function () {
  bitminter.pool.stats (function (err, data) {
    doTest (err, 'pool.stats', [
      ['type', data instanceof Object]
    ]);
  });
});


queue.push (function () {
  bitminter.pool.hashrate (function (err, data) {
    doTest (err, 'pool.hashrate', [
      ['type', typeof data === 'number']
    ]);
  });
});


queue.push (function () {
  bitminter.pool.workers (function (err, data) {
    doTest (err, 'pool.workers', [
      ['type', typeof data === 'number']
    ]);
  });
});


queue.push (function () {
  bitminter.pool.users (function (err, data) {
    doTest (err, 'pool.users', [
      ['type', typeof data === 'number']
    ]);
  });
});


queue.push (function () {
  bitminter.pool.round (function (err, data) {
    doTest (err, 'pool.round', [
      ['type', data instanceof Object]
    ]);
  });
});


queue.push (function () {
  bitminter.pool.blocks (function (err, data) {
    doTest (err, 'pool.blocks normal', [
      ['type', data instanceof Array]
    ]);
  });
});


queue.push (function () {
  bitminter.pool.blocks ({ max: 3 }, function (err, data) {
    doTest (err, 'pool.blocks option', [
      ['type', data instanceof Array],
      ['amount', data.length <= 3]
    ]);
  });
});


queue.push (function () {
  bitminter.pool.shifts (function (err, data) {
    doTest (err, 'pool.shifts normal', [
      ['type', data instanceof Array]
    ]);
  });
});


queue.push (function () {
  bitminter.pool.shifts ({ max: 3 }, function (err, data) {
    doTest (err, 'pool.shifts option', [
      ['type', data instanceof Array],
      ['amount', data.length <= 3]
    ]);
  });
});


queue.push (function () {
  bitminter.pool.top50 (function (err, data) {
    doTest (err, 'pool.top50', [
      ['type', data instanceof Object]
    ]);
  });
});


queue.push (function () {
  if (!config.apikey) {
    log ('info', 'users.get self skipped (no apikey)');
  } else {
    bitminter.users.get (function (err, data) {
      doTest (err, 'users.get self', [
        ['type', data instanceof Object]
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
        ['type', data instanceof Object]
      ]);
    });
  }
});


// Start the tests
queue[0] ();
