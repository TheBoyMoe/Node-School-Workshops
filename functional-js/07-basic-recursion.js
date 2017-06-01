'use strict';

function reduce(arr, fn, initial){
	return (function reducer(i, val) {
		if(i > arr.length - 1) return val;
		return reducer(i + 1, fn(val, arr[i], i, arr));
	})(0, initial)
}

module.exports = reduce;

/*
reduce([1,2,3], function(prev, curr, index, arr) {
	return prev + curr
}, 0)
*/