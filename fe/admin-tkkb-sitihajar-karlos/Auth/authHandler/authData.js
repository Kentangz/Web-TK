export function getAuthData() {
	const token = localStorage.getItem("token");
	const expiredAt = localStorage.getItem("token_expired_at");

	return {
		token,
		expiredAt,
		expiredDate: expiredAt ? new Date(expiredAt) : null,
		hasToken: !!token,
		isValid: !!(token && expiredAt),
	};
}

export function clearAuthData() {
	const keysToRemove = ["token", "token_expired_at", "user_data"];
	keysToRemove.forEach((key) => localStorage.removeItem(key));
}
