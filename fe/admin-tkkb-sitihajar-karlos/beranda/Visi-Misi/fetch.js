export function getAllVisi() {
	return fetch(`${import.meta.env.VITE_API_KEY}/beranda/visi`)
		.then((response) => {
			if (!response.ok)
				throw new Error(`Gagal memuat data visi. Status: ${response.status}`);
			return response.json();
		})
		.then((result) => {
			return result.data.map((visi) => ({
				id: visi.id,
				vision: visi.visi_description,
			}));
		})
		.catch((error) => {
			console.error("Kesalahan getAllVisi:", error);
			return null;
		});
}

export function getVisiById(id) {
	return fetch(`${import.meta.env.VITE_API_KEY}/beranda/visi/${id}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal mengambil data visi. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const visi = result.data;
			if (!visi) {
				throw new Error("Data visi tidak ditemukan");
			}
			return {
				id: visi.id,
				vision: visi.visi_description,
			};
		})
		.catch((error) => {
			console.error("Kesalahan getVisiById:", error);
			return null;
		});
}

export function postVisi({ visi_description }) {
	const formData = new FormData();
	formData.append("visi_description", visi_description);

	return fetch(`${import.meta.env.VITE_API_KEY}/beranda/visi`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: formData,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal menambahkan data visi. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const visi = result.data;
			return {
				id: visi.id,
				vision: visi.visi_description,
			};
		})
		.catch((error) => {
			console.error("Kesalahan postVisi:", error);
			return null;
		});
}

export function updateVisiById(id, { visi_description }) {
	const formData = new FormData();
	formData.append("visi_description", visi_description);
	formData.append("_method", "PUT");

	return fetch(`${import.meta.env.VITE_API_KEY}/beranda/visi/${id}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: formData,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal memperbarui data visi. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const visi = result.data;
			return {
				id: visi.id,
				vision: visi.visi_description,
			};
		})
		.catch((error) => {
			console.error("Kesalahan updateVisiById", error);
			return null;
		});
}

export function deleteVisiById(id) {
	return fetch(`${import.meta.env.VITE_API_KEY}/beranda/visi/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Gagal menghapus data visi. Status: ${response.status}`
				);
			return response.json();
		})
		.catch((error) => {
			console.error("Kesalahan deleteVisiById:", error);
			return null;
		});
}

export function getAllMisi() {
	return fetch(`${import.meta.env.VITE_API_KEY}/beranda/misi`)
		.then((response) => {
			if (!response.ok)
				throw new Error(`Gagal memuat data misi. Status: ${response.status}`);
			return response.json();
		})
		.then((result) => {
			return result.data.map((misi) => ({
				id: misi.id,
				mission: misi.misi_description,
			}));
		})
		.catch((error) => {
			console.error("Kesalahan getAllMisi:", error);
			return null;
		});
}

export function getMisiById(id) {
	return fetch(`${import.meta.env.VITE_API_KEY}/beranda/misi/${id}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal mengambil data misi. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const misi = result.data;
			if (!misi) {
				throw new Error("Data misi tidak ditemukan");
			}
			return {
				id: misi.id,
				mission: misi.misi_description,
			};
		})
		.catch((error) => {
			console.error("Kesalahan getMisiById:", error);
			return null;
		});
}

export function postMisi({ misi_description }) {
	const formData = new FormData();
	formData.append("misi_description", misi_description);

	return fetch(`${import.meta.env.VITE_API_KEY}/beranda/misi`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: formData,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal menambahkan data misi. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const misi = result.data;
			return {
				id: misi.id,
				mission: misi.misi_description,
			};
		})
		.catch((error) => {
			console.error("Kesalahan postMisi:", error);
			return null;
		});
}

export function updateMisiById(id, { misi_description }) {
	const formData = new FormData();
	formData.append("misi_description", misi_description);
	formData.append("_method", "PUT");

	return fetch(`${import.meta.env.VITE_API_KEY}/beranda/misi/${id}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: formData,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal memperbarui data misi. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const misi = result.data;
			return {
				id: misi.id,
				mission: misi.misi_description,
			};
		})
		.catch((error) => {
			console.error("Kesalahan updateMisiById:", error);
			return null;
		});
}

export function deleteMisiById(id) {
	return fetch(`${import.meta.env.VITE_API_KEY}/beranda/misi/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Gagal menghapus data misi. Status: ${response.status}`
				);
			return response.json();
		})
		.catch((error) => {
			console.error("Kesalahan deleteMisiById:", error);
			return null;
		});
}
