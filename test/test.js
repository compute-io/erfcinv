
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
	'use strict';

	it( 'should export a function', function test() {
		expect( erfcinv ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a numeric value or an array', function test() {
		var values = [
				'5',
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

	it( 'should throw an error if a data array contains non-numeric values', function test() {
		var values = [
				'5',
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
				expect( badValue( values[i] ) ).to.throw( Error );
			}

			function badValue( value ) {
				return function() {
					erfcinv( value );
				};
			}
	});

	it( 'should return positive infinity if provided 2', function test() {
		var inf = Number.POSITIVE_INFINITY,
			val = erfcinv( 2 );
		assert.strictEqual( val, inf );
	});

	it( 'should return negative infinity provided 0', function test() {
		var ninf = Number.NEGATIVE_INFINITY,
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
		var values = [
				0.2,
				0.3
			],
			val;

		for ( var i = 0; i < values.length; i++ ) {
			val = erfcinv( [ values[ i ] ] );
			assert.isArray( val );
			assert.isNumber( val[ 0 ] );
		}
	});

	it( 'should evaluate the inverse error function', function test() {
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

});