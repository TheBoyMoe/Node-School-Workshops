'use strict';

function countWords(inputWords) {
	return inputWords.reduce((obj, word) => {
		obj[word] = ++obj[word] || 1;
		return obj;
	}, {})
}

module.exports = countWords;
