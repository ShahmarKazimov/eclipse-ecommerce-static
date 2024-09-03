export const getUserData = async () => {
	const loggedInUser = localStorage.getItem('loggedInUser');

	if (loggedInUser) {
		return JSON.parse(loggedInUser);
	}
	return null;
};


