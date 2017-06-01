//'use strict';
function someFunc() {
	var scopedVar = 1;
	function inner() {
		foo = 2;
	}
	inner();
	console.log(`INSIDE: outer ${scopedVar} inner ${foo}`);
}
someFunc();
// foo is declared on the global scope in sloppy mode, scopedVar is not visible outside someFun()
// in strict mode foo causes a ReferenceError, since it's not created on the global scope
//console.log(`OUTSIDE: outer ${scopedVar} inner ${foo}`);


function someFunc() {
	let bar = 1;
	console.log(`outer: ${bar}`);
	function inner() {
		let bar = 2;
		console.log(`inner: ${bar}`);
	}
	inner();
}
someFunc();