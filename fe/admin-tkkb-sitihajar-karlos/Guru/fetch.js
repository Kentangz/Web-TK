export function getAllGuru() {
  return fetch(`${import.meta.env.VITE_API_KEY}/guru`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data guru. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(guru => ({
        id: guru.id,
        img: guru.image,
        title: guru.jabatan,
        name: guru.nama,
        ttl: guru.ttl,
        phone: guru.nomor
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllGuru:", error);
      return null;
    });
}

export function getGuruById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/guru/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data guru. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const guru = result.data;
      if (!guru) {
        throw new Error("Data guru tidak ditemukan");
      }
      return {
        id: guru.id,       
        img: guru.image,
        title: guru.jabatan,
        name: guru.nama,
        ttl: guru.ttl,
        phone: guru.nomor
      };
    })
    .catch(error => {
      console.error("Kesalahan getGuruById:", error);
      return null;
    });
}

export function postGuru({ jabatan, nama, ttl, nomor }, imageFile) {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);
  formData.append('jabatan', jabatan);
  formData.append('nama', nama);
  formData.append('ttl', ttl);
  formData.append('nomor', nomor);

  return fetch(`${import.meta.env.VITE_API_KEY}/guru`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: formData,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal menambahkan data guru. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const guru = result.data;
			return {
				id: guru.id,
				img: guru.image,
				title: guru.jabatan,
				name: guru.nama,
				ttl: guru.ttl,
				phone: guru.nomor,
			};
		})
		.catch((error) => {
			console.error("Kesalahan postGuru:", error);
			return null;
		});
}

export function updateGuruById(id, { jabatan, nama, ttl, nomor }, imageFile) {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);
  formData.append('jabatan', jabatan);
  formData.append('nama', nama);
  formData.append('ttl', ttl);
  formData.append('nomor', nomor);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/guru/${id}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: formData,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal memperbarui data guru. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const guru = result.data;
			return {
				id: guru.id,
				img: guru.image,
				title: guru.jabatan,
				name: guru.nama,
				ttl: guru.ttl,
				phone: guru.nomor,
			};
		})
		.catch((error) => {
			console.error("Kesalahan updateGuruById:", error);
			return null;
		});
}

export function deleteGuruById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/guru/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Gagal menghapus data guru. Status: ${response.status}`
				);
			return response.json();
		})
		.catch((error) => {
			console.error("Kesalahan deleteGuruById:", error);
			return null;
		});
}