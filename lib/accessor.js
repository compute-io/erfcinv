'use strict';

// MODULES //

var ERFCINV = require( './number.js' );


// INVERSE COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfcinv( out, arr, accessor )
*	Computes the inverse complementary error function for each array element using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function erfcinv( out, x, clbk ) {
	var len = x.length,
		v, i;
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			out[ i ] = ERFCINV( v );
		} else {
			out[ i ] = NaN;
		}
	}
	return out;
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;
