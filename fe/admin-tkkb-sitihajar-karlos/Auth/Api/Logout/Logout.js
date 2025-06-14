import { api } from "../api";

export class logout {
	async logout() {
		try {
			const response = await api.post("/auth/logout");
			return response.data;
		} catch (error) {
			if (error.response) {
				const message = error.response.data?.message || "Logout failed";
				throw new Error(message);
			} else if (error.request) {
				throw new Error("Network error");
			} else {
				throw new Error(error.message || "Logout failed");
			}
		}
	}

	clearAuthData() {
		localStorage.clear();
	}
}
