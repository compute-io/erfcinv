erfcinv
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Inverse complementary error function](https://en.wikipedia.org/wiki/Error_function#Inverse_functions).

The [inverse complementary error function](https://en.wikipedia.org/wiki/Error_function#Inverse_functions) is defined as

<div class="equation" align="center" data-raw-text="\operatorname{erfc}^{-1}(1-z) = \operatorname{erf}^{-1}(z)" data-equation="eq:inverse_complementary_error_function">
	<img src="" alt="Definition of the inverse complementary error function.">
	<br>
</div>

where `erf^{-1}(z)` is the [inverse error function](https://github.com/compute-io/erfinv).


## Installation

``` bash
$ npm install compute-erfcinv
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var erfcinv = require( 'compute-erfcinv' );
```

#### erfcinv( x[, options] )

Evaluates the [inverse complementary error function](https://en.wikipedia.org/wiki/Error_function#Inverse_function). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix). All values __must__ reside on the interval `[0,2]`.

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = erfcinv( 0.5 );
// returns ~0.4769

out = erfcinv( [ 0, 0.5, 1, 1.5, 2 ] );
// returns [ +infinity, 0.4769, 0, -0.4769, -infinity ]

data = [ 0, 1, 2 ];
out = erfcinv( data );
// returns [ +infinity, 0, -infinity ]

data = new Int8Array( data );
out = erfcinv( data );
// returns Float64Array( [ +infinity, 0, -infinity ] )

data = new Float64Array( 4 );
for ( i = 0; i < 4; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [2,2], 'float64' );
/*
	[  0  0.5
	   1  1.5 ]
*/

out = erfcinv( mat );
/*
	[  +infinity  0.477
	   0         -0.477 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 0],
	['boop', 0.5],
	['bip', 1],
	['bap', 1.5],
	['baz', 2]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = erfcinv( data, {
	'accessor': getValue
});
// returns [ +infinity, 0.4769, 0, -0.4769, -infinity ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
data = [
	{'x':[9,1.75]},
	{'x':[9,1.25]},
	{'x':[9,1.01]},
	{'x':[9,1e-5]},
	{'x':[9,1e-100]},
	{'x':[9,5e-324]}
];

var out = erfc( data, 'x|1', '|' );
/*
	 [
		{'x':[9,-0.8134198]},
		{'x':[9,-0.2253121]},
		{'x':[9,-0.00886250]},
		{'x':[9,3.12341327]},
		{'x':[9,15.0655747]},
		{'x':[9,27.2130740]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Float64Array( [ 1e-5, 1e-100, 5e-324 ] );

out = erfcinv( data, {
	'dtype': 'int32'
});
// returns Int32Array( [3,15,27] )

// Works for plain arrays, as well...
out = erfcinv( [ 1e-5, 1e-100, 5e-324 ] , {
	'dtype': 'uint8'
});
// returns Uint8Array( [3,15,27] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

data = [
	1.75,
	1.25,
	1.01,
	1e-5,
	1e-100,
	5e-324
];

var out = erfcinv( data, {
	'copy': false
});
// returns [ 0.813 0.225 -0.009 3.123 15.066 27.213 ]

bool = ( data === out );
// returns true

data = new Float64Array( 4 );
for ( i = 0; i < 4; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [2,2], 'float64' );
/*
	[  0  0.5
	   1  1.5 ]
*/

out = erfcinv( mat, {
	'copy': false
});
/*
	[  +infinity  0.477
	   0         -0.477 ]
*/

bool = ( mat === out );
// returns true
```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	erfcinv = require( 'compute-erfcinv' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*2;
}
out = erfcinv( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = erfcinv( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = erfcinv( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 2;
}
tmp = erfcinv( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = erfcinv( mat );

// Matrices (custom output data type)...
out = erfcinv( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


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
