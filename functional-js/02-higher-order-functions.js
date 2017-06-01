'use strict';

const repeat = (operation, num) => {
	for(let i = 0; i < num; i++){
		operation();
	}
};

module.exports = repeat;

// Other solution

function repeat2(operation, num) {
	if (num <= 0) return;
	operation();
	return repeat(operation, --num)
}
