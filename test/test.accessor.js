/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erfcinv = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor erfcinv', function tests() {

	it( 'should export a function', function test() {
		expect( erfcinv ).to.be.a( 'function' );
	});

	it( 'should evaluate the inverse complementary error function using an accessor', function test() {
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

		actual = new Array( data.length );
		actual = erfcinv( actual, data, getValue );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-3 );
		}
		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( erfcinv( [], [], getValue ) );
		function getValue( d ) {
			return d.x;
		}
	});

});
