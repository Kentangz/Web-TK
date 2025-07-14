import { DEFAULT_CONFIG } from "../Api/checkX.js";

export function getTimeStatus(expiredDate) {
	if (!expiredDate) return { status: "invalid" };

	const now = new Date();
	const timeRemaining = expiredDate - now;
	const warningThreshold = DEFAULT_CONFIG.warningTimeMinutes * 60 * 1000;

	if (timeRemaining <= 0) return { status: "expired", timeRemaining: 0 };

	if (timeRemaining <= warningThreshold) {
		return {
			status: "warning",
			timeRemaining,
			remainingMinutes: Math.ceil(timeRemaining / 60000),
		};
	}

	return { status: "valid", timeRemaining };
}

export function getTimeRemaining(expiredAt) {
	const now = new Date();
	const expired = new Date(expiredAt);
	const diff = expired - now;

	if (diff <= 0) return "Expired";

	const hours = Math.floor(diff / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

	return hours > 0 ? `${hours}j ${minutes}m` : `${minutes}m`;
}
