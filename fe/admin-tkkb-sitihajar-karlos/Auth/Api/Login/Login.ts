export async function login(
	email: string,
	password: string
): Promise<{ token: string; expired_at: string }> {
	const res = await fetch("http://localhost:8000/api/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});

	const data = await res.json();

	if (!res.ok) throw new Error(data.message || "Login gagal");

	return data;
}
