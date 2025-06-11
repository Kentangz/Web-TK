import { login } from "./Login.ts";

export function handleLogin(): void {
	const loginForm = document.querySelector<HTMLFormElement>("#loginForm");
	const errorDiv = document.querySelector<HTMLDivElement>("#error");

	if (!loginForm || !errorDiv) return;

	loginForm.addEventListener("submit", async (e: Event) => {
		e.preventDefault();

		const emailInput = document.querySelector<HTMLInputElement>("#email");
		const passwordInput = document.querySelector<HTMLInputElement>("#password");

		const email = emailInput?.value || "";
		const password = passwordInput?.value || "";

		try {
			const data = await login(email, password);

			localStorage.setItem("token", data.token);
			localStorage.setItem("token_expired_at", data.expired_at);

			window.location.href = "/admin-tkkb-sitihajar-karlos/dashboard";
		} catch (err: unknown) {
			if (err instanceof Error) {
				errorDiv.innerText = err.message;
			}
		}
	});
}
