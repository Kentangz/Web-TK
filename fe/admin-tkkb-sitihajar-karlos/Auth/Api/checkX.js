import { showLoading, hideLoading } from "../authComponents/authUI.js";
import { getAuthData, clearAuthData } from "../authHandler/authData.js";
import { getTimeStatus } from "../authHandler/sessionStatus.js";
import {
	handleNoAuth,
	handleSessionWarning,
	handleSessionExpired,
} from "../authHandler/sessionHandler.js";

export const DEFAULT_CONFIG = {
	redirectUrl: "/admin-tkkb-sitihajar-karlos/login",
	warningTimeMinutes: 10,
	checkIntervalMinutes: 1,
	redirectDelayMs: 1500,
};

export function checkAuth(redirectUrl = DEFAULT_CONFIG.redirectUrl) {
	const authData = getAuthData();
	if (!authData.isValid) {
		handleNoAuth(redirectUrl);
		return false;
	}

	const timeStatus = getTimeStatus(authData.expiredDate);

	switch (timeStatus.status) {
		case "warning":
			handleSessionWarning(timeStatus.remainingMinutes);
			return true;
		case "expired":
			handleSessionExpired(authData.expiredDate, redirectUrl);
			return false;
		case "valid":
			return true;
		default:
			return false;
	}
}

export function redirectToLogin(redirectUrl = DEFAULT_CONFIG.redirectUrl) {
	showLoading();
	clearAuthData();

	setTimeout(() => {
		hideLoading();
		window.location.href = redirectUrl;
	}, DEFAULT_CONFIG.redirectDelayMs);
}

export function redirectToLoginSilent(
	redirectUrl = DEFAULT_CONFIG.redirectUrl
) {
	clearAuthData();
	window.location.href = redirectUrl;
}

export function startSessionMonitor(redirectUrl = DEFAULT_CONFIG.redirectUrl) {
	const intervalMs = DEFAULT_CONFIG.checkIntervalMinutes * 60 * 1000;

	setInterval(() => {
		const authData = getAuthData();
		if (authData.hasToken) {
			checkAuth(redirectUrl);
		}
	}, intervalMs);
}
