/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erfcinv = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset erfcinv', function tests() {

	it( 'should export a function', function test() {
		expect( erfcinv ).to.be.a( 'function' );
	});

	it( 'should compute the inverse complementary error function and deep set', function test() {
		var data, expected, i;

		data = [
			{'x':1.75},
			{'x':1.25},
			{'x':1.01},
			{'x':1e-5},
			{'x':1e-100},
			{'x':5e-324}
		];

		data = erfcinv( data, 'x' );

		// Evaluated on Wolfram Alpha:
		expected = [
			{'x':-0.8134198},
			{'x':-0.2253121},
			{'x':-0.00886250},
			{'x':3.12341327},
			{'x':15.0655747},
			{'x':27.2130740}
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x, expected[ i ].x, 1e-3 );
		}

		// Custom separator...
		data = [
			{'x':[9,1.75]},
			{'x':[9,1.25]},
			{'x':[9,1.01]},
			{'x':[9,1e-5]},
			{'x':[9,1e-100]},
			{'x':[9,5e-324]}
		];

		data = erfcinv( data, 'x/1', '/' );
		expected = [
			{'x':[9,-0.8134198]},
			{'x':[9,-0.2253121]},
			{'x':[9,-0.00886250]},
			{'x':[9,3.12341327]},
			{'x':[9,15.0655747]},
			{'x':[9,27.2130740]}
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-3, 'custom separator' );
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( erfcinv( [], 'x' ) );
		assert.isNull( erfcinv( [], 'x', '/' ) );
	});

});
