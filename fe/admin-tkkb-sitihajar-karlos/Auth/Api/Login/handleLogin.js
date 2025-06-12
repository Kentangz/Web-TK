import { login } from "./Login";

export function handleLogin() {
	const loginForm = document.querySelector("#loginForm");
	const errorDiv = document.querySelector("#error");

	if (!loginForm || !errorDiv) return;

	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const emailInput = document.querySelector("#email");
		const passwordInput = document.querySelector("#password");

		const email = emailInput?.value || "";
		const password = passwordInput?.value || "";

		if (!email || !password) {
			errorDiv.innerText = "Email dan password wajib diisi.";
			return;
		}

		try {
			const data = await login(email, password);

			localStorage.setItem("token", data.token);
			localStorage.setItem("token_expired_at", data.expired_at);

			window.location.href = "/admin-tkkb-sitihajar-karlos/dashboard";
		} catch (err) {
			if (err instanceof Error) {
				errorDiv.innerText = err.message;
			}
		}
	});
}