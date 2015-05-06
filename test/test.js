/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erfcinv = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-erfcinv', function tests() {

	it( 'should export a function', function test() {
		expect( erfcinv ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a numeric value or an array', function test() {
		var values = [
			'5',
			new Number( 1 ),
			true,
			undefined,
			null,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				erfcinv( value );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				erfcinv( [0,1,2], value );
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean primitive', function test() {
		var values = [
			'5',
			5,
			new Boolean( true ),
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				erfcinv( [0,1,2], {
					'copy': value
				});
			};
		}
	});

	it( 'should throw an error if provided an accessor option which is not a function', function test() {
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
				erfcinv( [0,1,2], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if an input array contains non-numeric values (if not provided an accessor)', function test() {
		var values = [
			'5',
			new Number( 1 ),
			true,
			undefined,
			null,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( [ values[i] ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				erfcinv( value );
			};
		}
	});

	it( 'should throw an error if an accessed array value is not numeric', function test() {
		var values = [
			'5',
			new Number( 1 ),
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( [ values[i] ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				var arr = [
					{'x': value}
				];
				erfcinv( arr, {
					'accessor': getValue
				});
			};
		}
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return NaN if provided a NaN', function test() {
		var val = erfcinv( NaN );
		assert.isNumber( val );
		assert.ok( val !== val );
	});

	it( 'should throw an error if provided a value not on the interval [0,2]', function test() {
		var values = [
			-1,
			3
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( RangeError );
		}
		function badValue( value ) {
			return function() {
				erfcinv( value );
			};
		}
	});

	it( 'should return negative infinity if provided 2', function test() {
		var inf = Number.NEGATIVE_INFINITY,
			val = erfcinv( 2 );
		assert.strictEqual( val, inf );
	});

	it( 'should return positive infinity provided 0', function test() {
		var ninf = Number.POSITIVE_INFINITY,
			val = erfcinv( 0 );
		assert.strictEqual( val, ninf );
	});

	it( 'should return 0 if provided 1', function test() {
		assert.strictEqual( erfcinv( 1 ), 0 );
	});

	it( 'should return a numeric value if provided a numeric value', function test() {
		assert.isNumber( erfcinv( 0.5 ) );
	});

	it( 'should return an array of numbers if provided an array', function test() {
		var values, out;

		values = [
			0.2,
			0.3
		];

		out = erfcinv( values );
		assert.isArray( out );
		for ( var i = 0; i < values.length; i++ ) {
			assert.isNumber( out[ i ] );
		}
	});

	it( 'should not mutate the input array by default', function test() {
		var values, out;

		values = [
			0.2,
			0.3
		];

		out = erfcinv( values );
		assert.ok( out !== values );
	});

	it( 'should mutate an input array if the `copy` option is `false`', function test() {
		var values, out;

		values = [
			0.2,
			0.3
		];

		out = erfcinv( values, {
			'copy': false
		});
		assert.ok( out === values );
	});

	it( 'should evaluate the inverse complementary error function', function test() {
		var values, expected, actual;

		values = [
			1.75,
			1.25,
			1.01,
			1e-5,
			1e-100,
			5e-324
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

		actual = erfcinv( values );

		for ( var i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-3 );
		}
	});

	it( 'should evaluate the inverse complementary error function using an accessor function', function test() {
		var values, expected, actual;

		values = [
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

		actual = erfcinv( values, {
			'accessor': getValue
		});

		for ( var i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-3 );
		}
		function getValue( d ) {
			return d[ 1 ];
		}
	});

});
