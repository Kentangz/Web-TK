import { logout } from "./Logout.js";
import { showLoading } from "../../authComponents/authUI.js";

export class LogoutHandler {
	constructor(config = {}) {
		this.logoutAPI = new logout();
		this.redirectUrl =
			config.redirectUrl || "/admin-tkkb-sitihajar-karlos/login";
		this.redirectDelay = config.redirectDelay || 1000;
	}

	showNotification(message, type = "info") {
		const notification = document.createElement("div");
		notification.className = `notification notification-${type}`;
		notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 24px;
      border-radius: 6px;
      color: white;
      font-weight: 500;
      z-index: 9999;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      ${type === "success" ? "background-color: #10b981;" : ""}
      ${type === "error" ? "background-color: #ef4444;" : ""}
      ${type === "info" ? "background-color: #3b82f6;" : ""}
    `;
		notification.textContent = message;

		document.body.appendChild(notification);

		setTimeout(() => {
			notification.style.transform = "translateX(0)";
		}, 100);
		setTimeout(() => {
			notification.style.transform = "translateX(100%)";
			setTimeout(() => {
				if (document.body.contains(notification)) {
					document.body.removeChild(notification);
				}
			}, 300);
		}, 3000);
	}

	updateButtonState(button, isLoading) {
		if (!button) return;

		if (isLoading) {
			button.disabled = true;
			button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-spin">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="31.416" stroke-dashoffset="31.416">
            <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
            <animate attributeName="stroke-dashoffset" dur="2s" values="0;-31.416;-62.832" repeatCount="indefinite"/>
          </circle>
        </svg>
        Logging out...
      `;
		} else {
			button.disabled = false;
			button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Logout
      `;
		}
	}

	redirectToLogin() {
		setTimeout(() => {
			window.location.href = this.redirectUrl;
		}, this.redirectDelay);
	}

	async handleLogout(event) {
		if (event) {
			event.preventDefault();
		}

		const logoutBtn = document.getElementById("logoutBtn");
		try {
			this.updateButtonState(logoutBtn, true);
			await this.logoutAPI.logout();
			this.logoutAPI.clearAuthData();
			this.showNotification("Logout berhasil!", "success");
			showLoading();
			await new Promise((resolve) => setTimeout(resolve, 800));
			this.redirectToLogin();
		} catch (error) {
			console.error("Logout error:", error);
			this.updateButtonState(logoutBtn, false);
			this.showNotification(
				error.message || "Terjadi kesalahan saat logout",
				"error"
			);
		}
	}
	init() {
		const logoutBtn = document.getElementById("logoutBtn");
		if (logoutBtn) {
			logoutBtn.addEventListener("click", (event) => this.handleLogout(event));
		}
	}
}

export function createLogoutHandler(
	config = {
		redirectUrl: "/admin-tkkb-sitihajar-karlos/login",
		redirectDelay: 1000,
	}
) {
	const handler = new LogoutHandler(config);
	handler.init();
	return handler;
}
