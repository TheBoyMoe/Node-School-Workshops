'use strict';

function toUpperArray(items) {
	if (!items.length) return [];            // end condition
	let head = items.shift().toUpperCase();                      // item to operate on
	// head = head.toUpperCase();                // perform action
	//let tail = items.slice(1);               // next
	return [head].concat(toUpperArray(items)); // recursive step
}

console.log(toUpperArray(['hello', 'world']));