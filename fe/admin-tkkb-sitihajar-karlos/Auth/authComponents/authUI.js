import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Report } from "notiflix/build/notiflix-report-aio";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { authStyles, authTemplates, authMessages } from "./authStyles.js";

export function showSessionWarning(remainingTime) {
	Notify.warning(
		authTemplates.sessionWarning(remainingTime),
		authStyles.sessionWarning
	);
}

export function showSessionExpired(expiredDate, onLoginClick) {
	const formatTime = expiredDate.toLocaleString("id-ID", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});

	Report.failure(
		authMessages.titles.sessionExpired,
		authTemplates.sessionExpired(formatTime),
		authMessages.buttons.loginAgain,
		onLoginClick,
		authStyles.sessionExpired
	);
}

export function showLoading() {
	Loading.circle(authMessages.titles.loading, authStyles.loading);
}

export function hideLoading() {
	Loading.remove();
}
