import {
	showSessionWarning,
	showSessionExpired,
} from "../authComponents/authUI.js";
import { redirectToLogin, redirectToLoginSilent } from "../Api/checkX.js";

export function handleNoAuth(redirectUrl) {
	redirectToLoginSilent(redirectUrl);
}

export function handleSessionWarning(remainingMinutes) {
	showSessionWarning(remainingMinutes);
}

export function handleSessionExpired(expiredDate, redirectUrl) {
	showSessionExpired(expiredDate, () => redirectToLogin(redirectUrl));
}
