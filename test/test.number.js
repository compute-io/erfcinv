/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erfcinv = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number erfcinv', function tests() {

	it( 'should export a function', function test() {
		expect( erfcinv ).to.be.a( 'function' );
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

	it( 'should evaluate the inverse complementary error function', function test() {
		var values, expected;

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

		for ( var i = 0; i < values.length; i++ ) {
			assert.closeTo( erfcinv( values[ i ] ), expected[ i ], 1e-3 );
		}
	});

	it( 'should return NaN if provided a NaN', function test() {
		var val = erfcinv( NaN );
		assert.isNumber( val );
		assert.ok( val !== val );
	});

});
