'use strict';
// takes a list of valid users, and returns a function that returns true if all of the submitted users exist in the original list of users (goodUsers)
function checkUsersValid(goodUsers) {
	
	return function allUsersValid(submittedUsers) {
		return submittedUsers.every((submittedUser) => { // returns true if all values match
			return goodUsers.some((goodUser) => { // returns true if one or more matches found
				return goodUser.id === submittedUser.id;
			})
		})
	};
}

module.exports = checkUsersValid;
