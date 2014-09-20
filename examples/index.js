var erfcinv = require( './../lib' );

// Simulate some data...
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 2;
}

// Evaluate the inverse complementary error function for each datum:
console.log( erfcinv( data ) );
// returns [...]