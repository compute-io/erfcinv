erfcinv
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Inverse complementary error function.


## Installation

``` bash
$ npm install compute-erfcinv
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var lib = require( 'compute-erfcinv' );
```


## Examples

``` javascript
var lib = require( 'compute-erfcinv' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-erfcinv.svg
[npm-url]: https://npmjs.org/package/compute-erfcinv

[travis-image]: http://img.shields.io/travis/compute-io/erfcinv/master.svg
[travis-url]: https://travis-ci.org/compute-io/erfcinv

[coveralls-image]: https://img.shields.io/coveralls/compute-io/erfcinv/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/erfcinv?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/erfcinv.svg
[dependencies-url]: https://david-dm.org/compute-io/erfcinv

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/erfcinv.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/erfcinv

[github-issues-image]: http://img.shields.io/github/issues/compute-io/erfcinv.svg
[github-issues-url]: https://github.com/compute-io/erfcinv/issues