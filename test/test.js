/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	erfcinv = require( './../lib' ),

	// Error function:
	ERFCINV = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-erfcinv', function tests() {

	it( 'should export a function', function test() {
		expect( erfcinv ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				erfcinv( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				erfcinv( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				erfcinv( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				erfcinv( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( erfcinv( values[ i ] ) ) );
		}
	});

	it( 'should compute the inverse complementary error function when provided a number', function test() {
		assert.strictEqual( erfcinv( 0 ), Infinity );
		assert.strictEqual( erfcinv( 2 ), -Infinity );
		assert.strictEqual( erfcinv( 1 ), 0 );

		assert.isTrue( isnan( erfcinv( NaN ) ) );
	});

	it( 'should evaluate the inverse complementary error function when provided a plain array', function test() {
		var data, actual, expected, i;

		data = [
			1.75,
			1.25,
			1.01,
			1e-5,
			1e-100,
			5e-324
		];

		// Evaluated on Wolfram Alpha:
		expected = [
			-0.8134198,
			-0.2253121,
			-0.00886250,
			3.12341327,
			15.0655747,
			27.2130740
		];

		actual = erfcinv( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-3 );
		}

		// Mutate...
		actual = erfcinv( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-3 );
		}
	});

	it( 'should evaluate the inverse complementary error function when provided a typed array', function test() {
		var data, actual, expected, i;

		data = new Float64Array([
			1.75,
			1.25,
			1.01,
			1e-5,
			1e-100,
			5e-324
		]);

		expected = new Float64Array( [
			-0.8134198,
			-0.2253121,
			-0.00886250,
			3.12341327,
			15.0655747,
			27.2130740
		]);

		actual = erfcinv( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-3 );
		}

		// Mutate:
		actual = erfcinv( data, {
			'copy': false,
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-3 );
		}
	});

	it( 'should evaluate the inverse complementary error function element-wise and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [
			1.75,
			1.25,
			1.01,
			1e-5,
			1e-100,
			5e-324
		];
		expected = new Int8Array( [ 0, 0, 0, 3, 15, 27 ] );

		actual = erfcinv( data, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the inverse complementary error function element-wise using an accessor', function test() {
		var data, actual, expected, i;

		data = [
			[1,1.75],
			[2,1.25],
			[3,1.01],
			[4,1e-5],
			[5,1e-100],
			[6,5e-324]
		];

		// Evaluated on Wolfram Alpha and Octave:
		expected = [
			-0.8134198,
			-0.2253121,
			-0.00886250,
			3.12341327,
			15.0655747,
			27.2130740
		];

		actual = erfcinv( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-3 );
		}

		// Mutate:
		actual = erfcinv( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-3 );
		}
		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the inverse complementary error function element-wise and deep set', function test() {
		var data, actual, expected, i;

		data = [
			{'x':[9,1.75]},
			{'x':[9,1.25]},
			{'x':[9,1.01]},
			{'x':[9,1e-5]},
			{'x':[9,1e-100]},
			{'x':[9,5e-324]}
		];
		expected = [
			{'x':[9,-0.8134198]},
			{'x':[9,-0.2253121]},
			{'x':[9,-0.00886250]},
			{'x':[9,3.12341327]},
			{'x':[9,15.0655747]},
			{'x':[9,27.2130740]}
		];

		actual = erfcinv( data, {
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-3 );
		}

		// Specify a path with a custom separator...
		data = [
			{'x':[9,1.75]},
			{'x':[9,1.25]},
			{'x':[9,1.01]},
			{'x':[9,1e-5]},
			{'x':[9,1e-100]},
			{'x':[9,5e-324]}
		];
		actual = erfcinv( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-3 );
		}
	});

	it( 'should evaluate the inverse complementary error function element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = Math.random() * 2;
			d2[ i ] = ERFCINV( d1[ i ] );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = erfcinv( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = erfcinv( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d2 );
	});

	it( 'should evaluate the inverse complementary error function element-wise and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = Math.random() * 2;
			d2[ i ] = ERFCINV( d1[ i ] );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = erfcinv( mat, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( erfcinv( [] ), [] );
		assert.deepEqual( erfcinv( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( erfcinv( new Int8Array() ), new Float64Array() );
	});

});
