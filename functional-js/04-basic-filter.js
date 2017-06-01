'use strict';

const getShortMessages = (array) => {
	let result = [];
	array.filter((obj) => {
		if(obj.message.length < 50)
			result.push(obj.message);
	});
	return result;
};

module.exports = getShortMessages;

// Alternative solution

module.exports = function getShortMessages(messages) {
	return messages.filter(function(item) {
		return item.message.length < 50
	}).map(function(item) {
		return item.message
	})
};
