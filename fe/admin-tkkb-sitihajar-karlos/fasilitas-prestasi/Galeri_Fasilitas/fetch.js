export function getAllGambarFasilitas() {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/galleryfasilitas`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data gambar fasilitas. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(gambarfasilitas => ({
        id: gambarfasilitas.id,   
        img: gambarfasilitas.image
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllGambarFasilitas:", error);
      return null;
    });
}

export function getGambarFasilitasById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/galleryfasilitas/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data gambar fasilitas. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const gambarfasilitas = result.data;
      if (!gambarfasilitas) {
        throw new Error("Data gambar fasilitas tidak ditemukan");
      }
      return {
        id: gambarfasilitas.id,   
        img: gambarfasilitas.image
      };
    })
    .catch(error => {
      console.error("Kesalahan getGambarFasilitasById:", error);
      return null;
    });
}

export function postGambarFasilitas({ imageFile }) {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);

  return fetch(
		`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/galleryfasilitas`,
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
					`Gagal menambahkan data gambar fasilitas. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const gambarfasilitas = result.data;
			return {
				id: gambarfasilitas.id,
				img: gambarfasilitas.image,
			};
		})
		.catch((error) => {
			console.error("Kesalahan postGambarFasilitas:", error);
			return null;
		});
}

export function updateGambarFasilitasById(id, { imageFile }) {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);
  formData.append('_method', 'PUT');

  return fetch(
		`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/galleryfasilitas/${id}`,
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
					`Gagal memperbarui data gambar fasilitas. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const gambarfasilitas = result.data;
			return {
				id: gambarfasilitas.id,
				img: gambarfasilitas.image,
			};
		})
		.catch((error) => {
			console.error("Kesalahan updateGambarFasilitasById:", error);
			return null;
		});
}

export function deleteGambarFasilitasById(id) {
  return fetch(
		`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/galleryfasilitas/${id}`,
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
					`Gagal menghapus data gambar fasilitas. Status: ${response.status}`
				);
			return response.json();
		})
		.catch((error) => {
			console.error("Kesalahan deleteGambarFasilitasById:", error);
			return null;
		});
}