/*
Name:         bitminter
Description:  Bitminter API methods for Node.js
Author:       Franklin van de Meent (https://frankl.in)
Source:       https://github.com/fvdm/nodejs-bitminter
Feedback:     https://github.com/fvdm/nodejs-bitminter/issues
License:      Unlicense (see UNLICENSE file)
*/

var httpreq = require ('httpreq');
var app = {};

var config = {
  apikey: null,
  timeout: 5000
};


/**
 * Process HTTP client error
 *
 * @callback callback
 * @param err {Error} - The error to call back
 * @param res {object} - httpreq response details
 * @param message {string} - Error message
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
 */

function processError (msg, err, res, callback) {
  var error = new Error (msg);

  error.statusCode = res && res.statusCode;
  error.data = res && res.body;
  callback (error);
}


/**
 * Process HTTP response
 *
 * @callback callback
 * @param err {Error, null} - httpreq error
 * @param res {object} - Response details
 * @param callback {function} - `function (err, data) {}`
 + @returns {void}
 */

function processResponse (err, res, callback) {
  var data = res && res.body || null;

  if (err) {
    callback (err);
    return;
  }

  if (res.statusCode >= 300) {
    processError ('API error', err, res, callback);
    return;
  }

  try {
    data = JSON.parse (data);
  } catch (e) {
    processError ('invalid response', err, res, callback);
    return;
  }

  callback (null, data);
}


/**
 * HTTP communication
 *
 * @param path {string} Request path
 * @param props {object} Query parameters
 * @param cb {function} Callback function
 * @return {void}
 */

function talk (path, props, cb) {
  var url = 'https://bitminter.com/api' + path;
  var opts = {
    headers: {
      'User-Agent': 'bitminter.js'
    }
  };

  if (typeof props === 'function') {
    cb = props;
    props = null;
  }

  if (config.apikey && path.match (/^\/users/)) {
    opts.headers.Authorization = 'key=' + config.apikey;
  }

  opts.parameters = props;
  opts.timeout = config.timeout;

  function httpResponse (err, res) {
    processResponse (err, res, cb);
  }

  httpreq.get (url, opts, httpResponse);
}


app.pool = {};

app.pool.stats = function (callback) {
  talk ('/pool/stats', callback);
};

app.pool.hashrate = function (callback) {
  talk ('/pool/hashrate', callback);
};

app.pool.workers = function (callback) {
  talk ('/pool/workers', callback);
};

app.pool.users = function (callback) {
  talk ('/pool/users', callback);
};

app.pool.round = function (callback) {
  talk ('/pool/round', callback);
};

app.pool.blocks = function (props, callback) {
  talk ('/pool/blocks', props, callback);
};

app.pool.shifts = function (props, callback) {
  if (typeof props === 'function') {
    callback = props;
    props = {};
  }

  talk ('/pool/shifts', props, callback);
};

app.pool.top50 = function (callback) {
  talk ('/pool/top50', callback);
};


app.users = {};

app.users.get = function (username, callback) {
  var path = '/users';

  if (typeof username === 'function') {
    callback = username;
  } else {
    path += '/' + username;
  }

  talk (path, callback);
};


/**
 * Module setup
 *
 * @param conf {object} Configuration parameters
 * @return {object} Module methods
 */

module.exports = function (conf) {
  config.apikey = conf && conf.apikey || null;
  config.timeout = conf && conf.timeout || config.timeout;
  return app;
};
