'use strict';

/**
* erfcinv( x )
*
* Method:
*	1. For `|x| <= 0.5`, evaluate inverse erf using the rational approximation:
*
*		`erfcinv = x(x+10)(Y+R(x))`
*
*	where `Y` is a constant and `R(x)` is optimized for a low absolute error compared to `|Y|`. Max error `~2e-18`.
*
*	2. For `0.5 > 1-|x| >= 0`, evaluate inverse erf using the rational approximation:
*
*		`erfcinv = sqrt(-2*log(1-x)) / (Y + R(1-x))`
*
*	where `Y `is a constant, and R(q) is optimised for a low absolute error compared to `Y`. Max error `~7e-17`.
*
*	3. For `1-|x| < 0.25`, we have a series of rational approximations all of the general form:
*
*		`p = sqrt(-log(1-x))`
*
*	Then the result is given by:
*
*		`erfcinv = p(Y+R(p-B))`
*
*	where `Y` is a constant, `B` is the lowest value of `p` for which the approximation is valid, and `R(x-B)` is optimized for a low absolute error compared to `Y`.
*
*	Note that almost all code will really go through the first or maybe second approximation.  After than we are dealing with very small input values.
*
*	If `p < 3`, max error `~1e-20`.
*	If `p < 6`, max error `~8e-21`.
*	If `p < 18`, max error `~1e-19`.
*	If `p < 44`, max error `~6e-20`.
*	If `p >= 44`, max error `~1e-20`.
*/

// MODULES //

var polyval = require( 'compute-polynomial' );


// CONSTANTS //

var // Coefficients for erfcinv on [0, 0.5]:
	Y1 = 8.91314744949340820313e-2,
	P1 = [
		-5.38772965071242932965e-3,
		8.22687874676915743155e-3,
		2.19878681111168899165e-2,
		-3.65637971411762664006e-2,
		-1.26926147662974029034e-2,
		3.34806625409744615033e-2,
		-8.36874819741736770379e-3,
		-5.08781949658280665617e-4
	],
	Q1 = [
		8.86216390456424707504e-4,
		-2.33393759374190016776e-3,
		7.95283687341571680018e-2,
		-5.27396382340099713954e-2,
		-7.1228902341542847553e-1,
		6.62328840472002992063e-1,
		1.56221558398423026363,
		-1.56574558234175846809,
		-9.70005043303290640362e-1,
		1
	],

	// Coefficients for erfcinv for 0.5 > 1-x >= 0:
	Y2 = 2.249481201171875,
	P2 = [
		-3.67192254707729348546,
		2.11294655448340526258e1,
		1.7445385985570866523e1,
		-4.46382324441786960818e1,
		-1.88510648058714251895e1,
		1.76447298408374015486e1,
		8.37050328343119927838,
		1.05264680699391713268e-1,
		-2.02433508355938759655e-1
	],
	Q2 = [
		1.72114765761200282724,
		2.26436933413139721736e1,
		1.08268667355460159008e1,
		4.85609213108739935468e1,
		-2.01432634680485188801e1,
		-2.86608180499800029974e1,
		3.9713437953343869095,
		6.24264124854247537712,
		1
	],

	// Coefficients for erfcinv for sqrt( -log(1-x)):
	Y3 = 8.07220458984375e-1,
	P3 = [
		-6.81149956853776992068e-10,
		2.85225331782217055858e-8,
		-6.79465575181126350155e-7,
		2.14558995388805277169e-3,
		2.90157910005329060432e-2,
		1.42869534408157156766e-1,
		3.37785538912035898924e-1,
		3.87079738972604337464e-1,
		1.17030156341995252019e-1,
		-1.63794047193317060787e-1,
		-1.31102781679951906451e-1
	],
	Q3 = [
		1.105924229346489121e-2,
		1.52264338295331783612e-1,
		8.48854343457902036425e-1,
		2.59301921623620271374,
		4.77846592945843778382,
		5.38168345707006855425,
		3.46625407242567245975,
		1
	],

	Y4 = 9.3995571136474609375e-1,
	P4 = [
		2.66339227425782031962e-12,
		-2.30404776911882601748e-10,
		4.60469890584317994083e-6,
		1.57544617424960554631e-4,
		1.87123492819559223345e-3,
		9.50804701325919603619e-3,
		1.85573306514231072324e-2,
		-2.22426529213447927281e-3,
		-3.50353787183177984712e-2
	],
	Q4 = [
		7.64675292302794483503e-5,
		2.63861676657015992959e-3,
		3.41589143670947727934e-2,
		2.20091105764131249824e-1,
		7.62059164553623404043e-1,
		1.3653349817554063097,
		1
	],

	Y5 = 9.8362827301025390625e-1,
	P5 = [
		9.9055709973310326855e-17,
		-2.81128735628831791805e-14,
        4.62596163522878599135e-9,
        4.49696789927706453732e-7,
        1.49624783758342370182e-5,
        2.09386317487588078668e-4,
        1.05628862152492910091e-3,
        -1.12951438745580278863e-3,
		-1.67431005076633737133e-2
	],
	Q5 = [
		2.82243172016108031869e-7,
		2.75335474764726041141e-5,
        9.64011807005165528527e-4,
        1.60746087093676504695e-2,
        1.38151865749083321638e-1,
        5.91429344886417493481e-1,
        1
	];


// FUNCTIONS //

/**
* FUNCTION: calc( x, v, P, Q, Y )
*	Calculates a rational approximation.
*
* @private
* @param {Number} x
* @param {Number} v
* @param {Array} P - array of polynomial coefficients
* @param {Array} Q - array of polynomial coefficients
* @param {Number} Y
* @returns {Number} rational approximation
*/
function calc( x, v, P, Q, Y ) {
	var s, r;
	s = x - v;
	r = polyval( P, s ) / polyval( Q, s );
	return Y*x + r*x;
} // end FUNCTION calc()


// ERFINV //

/**
* FUNCTION: erfcinv( x )
*	Evaluates the complementary inverse error function for an input value.
*
* @private
* @param {Number} x - input value
* @returns {Number} evaluated complementary inverse error function
*/
function erfcinv( x ) {
	var sign = false,
		val,
		q, g, r;

	// [1] Special cases...

	// NaN:
	if ( x !== x ) {
		return NaN;
	}
	// x not on the interval: [0,2]
	if ( x < 0 || x > 2 ) {
		throw new RangeError ( 'erfcinv()::invalid input argument. Value must be on the interval [0,2]. Value: `' + x + '`.' );
	}
	if ( x === 0 ) {
		return Number.POSITIVE_INFINITY;
	}
	if ( x === 2 ) {
		return Number.NEGATIVE_INFINITY;
	}
	if ( x === 1 ) {
		return 0;
	}
	// [2] Get the sign and make use of `erfc` reflection formula: `erfc(-z) = 2 - erfc(z)`...
	if ( x > 1 ) {
		q = 2 - x;
		x = 1 - q;
		sign = true;
	} else {
		q = x;
		x = 1 - x;
	}
	// [3] |x| <= 0.5
	if ( x <= 0.5 ) {
		g = x * (x+10);
		r = polyval( P1, x ) / polyval( Q1, x );
		val = g*Y1 + g*r;
		return ( sign ) ? -val : val;
	}

	// [4] 1-|x| >= 0.25
	if ( q >= 0.25 ) {
		g = Math.sqrt( -2 * Math.log( q ) );
		q = q - 0.25;
		r = polyval( P2, q ) / polyval( Q2, q );
		val = g / (Y2+r);
		return ( sign ) ? -val : val;
	}
	q = Math.sqrt( -Math.log( q ) );

	// [5] q < 3
	if ( q < 3 ) {
		return calc( q, 1.125, P3, Q3, Y3 );
	}
	// [6] q < 6
	if ( q < 6 ) {
		return calc( q, 3, P4, Q4, Y4 );
	}
	// Note that the smallest number in JavaScript is 5e-324. Math.sqrt( -Math.log( 5e-324 ) ) ~27.2844
	return calc( q, 6, P5, Q5, Y5 );

	// Note that in the boost library, they are able to go to much smaller values, as 128 bit long doubles support ~1e-5000; something which JavaScript does not natively support.
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;
