/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erfcinv = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array erfcinv', function tests() {

	it( 'should export a function', function test() {
		expect( erfcinv ).to.be.a( 'function' );
	});

	it( 'should evaluate the inverse complementary error function', function test() {
		var data, actual, expected, i;

		data = new Float64Array([
			1.75,
			1.25,
			1.01,
			1e-5,
			1e-100,
			5e-324
		]);
		actual = new Float64Array( data.length );

		actual = erfcinv( actual, data );

		// Evaluated on Wolfram Alpha and Octave:
		expected = new Float64Array([
			-0.8134198,
			-0.2253121,
			-0.00886250,
			3.12341327,
			15.0655747,
			27.2130740
		]);

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-3 );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( erfcinv( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
