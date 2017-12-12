bitminter
=========

Bitminter API methods for Node.js (unofficial)

[![npm](https://img.shields.io/npm/v/bitminter.svg?maxAge=3600)](https://github.com/fvdm/nodejs-bitminter/blob/master/CHANGELOG.md)
[![Build Status](https://travis-ci.org/fvdm/nodejs-bitminter.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-bitminter)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-bitminter/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-bitminter?branch=master)
[![bitHound Dependencies](https://www.bithound.io/github/fvdm/nodejs-bitminter/badges/master/dependencies.svg)](https://www.bithound.io/github/fvdm/nodejs-bitminter/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/fvdm/nodejs-bitminter/badges/master/code.svg)](https://www.bithound.io/github/fvdm/nodejs-bitminter/master/files)
[![Greenkeeper badge](https://badges.greenkeeper.io/fvdm/nodejs-bitminter.svg)](https://greenkeeper.io/)

* [Node.js](https://www.nodejs.org)
* [Bitminter](https://bitminter.com)
* [API documentation](https://bitminter.com/api)


Example
-------

If you want to call `users` methods,
you need to set the `apikey`.
The `pool` methods work without it.

```js
var bitminter = require ('bitminter') ({
  apikey: 'abc123'
});

bitminter.users.get (function (err, user) {
  if (err) {
    return console.log (err);
  }

  console.log (user.hash_rate);
});
```


Installation
------------

`npm install bitminter`


Configuration
-------------

The module function takes a configuration _object_.


setting | type   | default | description
:-------|:-------|:--------|:---------------
apikey  | string |         | Account API key
timeout | number | 5000    | Wait time in milliseconds


```js
var config = {
  apikey: 'abc123',
  timeout: 30000
};

var bitminter = require ('bitminter') (config);
```


pool.stats
----------
**( callback )**

Pool statistics _object_

```js
bitminter.pool.stats (console.log);
```


pool.hashrate
-------------
**( callback )**

Current pool hash rate _number_

```js
bitminter.pool.hashrate (console.log);
```


pool.workers
------------
**( callback )**

Current pool workers _number_

```js
bitminter.pool.workers (console.log);
```


pool.users
----------
**( callback )**

Current pool users _number_

```js
bitminter.pool.users (console.log);
```


pool.round
----------
**( callback )**

Current pool round _object_

```js
bitminter.pool.round (console.log);
```


pool.blocks
-----------
**( [options], callback )**

Current pool blocks _array_


option    | type   | default | description
:---------|:-------|:--------|:---------------------------
max       | number | 10      | Entries to return
offset    | number | 0       | Skip this many entries
commodity | string | all     | Limit commodity, i.e. `BTC`


```js
bitminter.pool.blocks ({ max: 5 }, console.log);
```


pool.shifts
-----------
**( [options], callback )**

Current pool shifts _array_


option | type   | default | description
:------|:-------|:--------|:----------------------
max    | number | 10      | Entries to return
offset | number | 0       | Skip this many entries


```js
bitminter.pool.shifts ({ offset: 10 }, console.log);
```


pool.top50
----------
**( callback )**

Pool top 50 _object_

```js
bitminter.pool.top50 (console.log);
```


users.get
---------
**( [username], callback )**

Get stats and details _object_ about yourself or a user,
provided you have sufficient access.


argument | type     | required | default | description
:--------|:---------|:---------|:--------|:----------------------
username | string   | no       | _null_  | Username to lookup
callback | function | yes      |         | Process results


```js
// Yourself
bitminter.users.get (console.log);

// Someone else
bitminter.users.get ('SomeUser', console.log);
```


Unlicense
---------

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>


Author
------

[Franklin van de Meent](https://frankl.in)

[![Buy me a coffee](https://frankl.in/u/kofi/kofi-readme.png)](https://ko-fi.com/franklin)
