import { api } from "../Axios";

export async function login(
	email,
	password
) {
	try {
		const response = await api.post("/auth/login", {
			email,
			password,
		});
		return response.data;
	} catch (error) {
		const message = error.response?.data?.message || "Login gagal";
		throw new Error(message);
	}
}
