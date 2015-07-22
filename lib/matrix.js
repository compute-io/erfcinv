'use strict';

// MODULES //

var ERFCINV = require( './number.js' );


// INVERSE COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfcinv( out, x )
*	Evaluates the inverse complementary error function for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} x - input matrix
* @returns {Matrix} output matrix
*/
function erfcinv( out, x ) {
	var len = x.length,
		i;
	if ( out.length !== len ) {
		throw new Error( 'erfcinv()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		out.data[ i ] = ERFCINV( x.data[ i ] );
	}
	return out;
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;
