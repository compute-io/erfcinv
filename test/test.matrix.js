/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	erfcinv = require( './../lib/matrix.js' ),

	// Error function:
	ERFCINV = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix erfcinv', function tests() {

	var out,
		mat,
		d1,
		d2,
		i;

	d1 = new Float64Array( 25 );
	d2 = new Float64Array( 25 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = Math.random()*2;
		d2[ i ] = ERFCINV( d1[ i ] );
	}

	beforeEach( function before() {
		mat = matrix( d1, [5,5], 'float64' );
		out = matrix( d2, [5,5], 'float64' );
	});

	it( 'should export a function', function test() {
		expect( erfcinv ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			erfcinv( matrix( [10,10] ), mat );
		}
	});

	it( 'should evaluate the error function for each matrix element', function test() {
		var actual;

		actual = matrix( [5,5], 'float64' );
		actual = erfcinv( actual, mat );

		assert.deepEqual( actual.data, out.data );
	});

	it( 'should return null if provided an empty matrix', function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.isNull( erfcinv( out, mat ) );

		mat = matrix( [10,0] );
		assert.isNull( erfcinv( out, mat ) );

		mat = matrix( [0,0] );
		assert.isNull( erfcinv( out, mat ) );
	});

});
