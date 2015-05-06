'use strict';

var erfcinv = require( './../lib' );

var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 2;
}
console.log( erfcinv( data ) );
// returns [...]
