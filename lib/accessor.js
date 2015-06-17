'use strict';


// FUNCTIONS

var ERFCINV = require( './number.js' );

// INVERSE COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfcinv( out, arr, accessor )
*	Computes the inverse complementary error function for each array element using an accessor function.
*
* @param {Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Null} output array or null
*/
function erfcinv( y, x, clbk ) {
	var len = x.length,
		i;

	if ( !len ) {
		return null;
	}

	for ( i = 0; i < len; i++ ) {
		y[ i ] = ERFCINV(  clbk( x[ i ], i ) );
	}

	return y;
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;
