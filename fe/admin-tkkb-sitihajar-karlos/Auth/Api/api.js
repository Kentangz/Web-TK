import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_KEY,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// for 404
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.clear();
			window.location.href = "/admin-tkkb-sitihajar-karlos/login";
		}
		return Promise.reject(error);
	}
);
