export function getAllGambarKegiatan() {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/gallerykegiatan`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data gambar kegiatan. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(kegiatan => ({
        id: kegiatan.id,   
        img: kegiatan.image,
        activity: kegiatan.nama_kegiatan
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllGambarKegiatan:", error);
      return null;
    });
}

export function getGambarKegiatanById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/gallerykegiatan/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data gambar kegiatan. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const kegiatan = result.data;
      if (!kegiatan) {
        throw new Error("Data gambar kegiatan tidak ditemukan");
      }
      return {
        id: kegiatan.id,   
        img: kegiatan.image,
        activity: kegiatan.nama_kegiatan
      };
    })
    .catch(error => {
      console.error("Kesalahan getGambarKegiatanById:", error);
      return null;
    });
}

export function postGambarkegiatan({ nama_kegiatan }, imageFile) {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);
  formData.append('nama_kegiatan', nama_kegiatan);

  return fetch(
		`${import.meta.env.VITE_API_KEY}/programsekolah/gallerykegiatan`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: formData,
		}
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal menambahkan data gambar kegiatan. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const kegiatan = result.data;
			return {
				id: kegiatan.id,
				img: kegiatan.image,
				activity: kegiatan.nama_kegiatan,
			};
		})
		.catch((error) => {
			console.error("Kesalahan postGambarkegiatan:", error);
			return null;
		});
}

export function updateGambarKegiatanById(id, { nama_kegiatan }, imageFile) {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);
  formData.append('nama_kegiatan', nama_kegiatan);
  formData.append('_method', 'PUT');

  return fetch(
		`${import.meta.env.VITE_API_KEY}/programsekolah/gallerykegiatan/${id}`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: formData,
		}
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal memperbarui data gambar kegiatan. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const kegiatan = result.data;
			return {
				id: kegiatan.id,
				img: kegiatan.image,
				activity: kegiatan.nama_kegiatan,
			};
		})
		.catch((error) => {
			console.error("Kesalahan updateGambarKegiatanById:", error);
			return null;
		});
}

export function deleteGambarKegiatanById(id) {
  return fetch(
		`${import.meta.env.VITE_API_KEY}/programsekolah/gallerykegiatan/${id}`,
		{
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Gagal menghapus data gambar kegiatan. Status: ${response.status}`
				);
			return response.json();
		})
		.catch((error) => {
			console.error("Kesalahan deleteGambarKegiatanById:", error);
			return null;
		});
}