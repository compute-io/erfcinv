'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	ERFCINV = require( './number.js' );


// INVERSE COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfcinv( arr, path[, sep] )
*	Computes the inverse complementary error function for each array element and deep sets the input array.
*
* @param {Array} arr - input array
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array|Null} input array or null
*/
function erfcinv( x, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		v, i;
	if ( arguments.length > 2 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		for ( i = 0; i < len; i++ ) {
			v = dget( x[ i ] );
			if ( typeof v === 'number' ) {
				dset( x[i], ERFCINV( v ) );
			} else {
				dset( x[i], NaN );
			}
		}
	}
	return x;
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;
