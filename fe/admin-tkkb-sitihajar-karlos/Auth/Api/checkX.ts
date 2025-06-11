// checkX.ts
export function checkAuth(
	redirectUrl = "/admin-tkkb-sitihajar-karlos/login"
): boolean {
	const token = localStorage.getItem("token");
	const expiredAt = localStorage.getItem("token_expired_at");

	if (!token || !expiredAt) {
		redirectToLogin(redirectUrl);
		return false;
	}

	const now = new Date();
	const expiredDate = new Date(expiredAt);

	if (now > expiredDate) {
		alert("Sesi Anda telah berakhir. Silakan login kembali.");
		redirectToLogin(redirectUrl);
		return false;
	}
	return true;
}

export function redirectToLogin(redirectUrl: string): void {
	localStorage.removeItem("token");
	localStorage.removeItem("token_expired_at");
	window.location.href = redirectUrl;
}
