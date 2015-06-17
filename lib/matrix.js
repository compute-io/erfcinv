'use strict';

// MODULES //

var ERFCINV = require( './number.js' );

// INVERSE COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfcinv( out, matrix )
*	Evaluates the inverse complementary error function for each matrix element.
*
* @param {Matrix} out - output matirx
* @param {Matrix} arr - input matrix
* @returns {Matrix|Null} output matrix or null
*/
function erfcinv( y, x ) {
	var len = x.length,
		i;
	if ( !len ) {
		return null;
	}
	if ( y.length !== len ) {
		throw new Error( 'erfcinv()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = ERFCINV( x.data[ i ] );
	}
	return y;
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;
