export function getAllGambarVisiMisi() {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/imagevisi`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data gambar visi misi. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(visimisi => ({
        id: visimisi.id,   
        img: visimisi.image
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllGambarVisiMisi:", error);
      return null;
    });
}

export function getGambarVisiMisiById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/imagevisi/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data gambar visi misi. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const visimisi = result.data;
      if (!visimisi) {
        throw new Error("Data gambar visi misi tidak ditemukan");
      }
      return {
        id: visimisi.id,   
        img: visimisi.image
      };
    })
    .catch(error => {
      console.error("Kesalahan getGambarVisiMisiById:", error);
      return null;
    });
}

export function postGambarVisiMisi({ imageFile }) {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);

  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/imagevisi`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: formData,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal menambahkan data gambar visi misi. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const visimisi = result.data;
			return {
				id: visimisi.id,
				img: visimisi.image,
			};
		})
		.catch((error) => {
			console.error("Kesalahan postGambarVisiMisi:", error);
			return null;
		});
}

export function updateGambarVisiMisiById(id, { imageFile }) {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/imagevisi/${id}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: formData,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal memperbarui data gambar visi misi. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const visimisi = result.data;
			return {
				id: visimisi.id,
				img: visimisi.image,
			};
		})
		.catch((error) => {
			console.error("Kesalahan updateGambarVisiMisiById:", error);
			return null;
		});
}

export function deleteGambarVisiMisiById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/imagevisi/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Gagal menghapus data gambar visi misi. Status: ${response.status}`
				);
			return response.json();
		})
		.catch((error) => {
			console.error("Kesalahan deleteGambarVisiMisiById:", error);
			return null;
		});
}

export function getAllGambarTujuanStrategi() {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/imagetujuan`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data gambar tujuan strategi. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(tujuanstrategi => ({
        id: tujuanstrategi.id,   
        img: tujuanstrategi.image
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllGambarTujuanStrategi:", error);
      return null;
    });
}

export function getGambarTujuanStrategiById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/imagetujuan/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data gambar tujuan strategi. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const tujuanstrategi = result.data;
      if (!tujuanstrategi) {
        throw new Error("Data gambar tujuan strategi tidak ditemukan");
      }
      return {
        id: tujuanstrategi.id,   
        img: tujuanstrategi.image
      };
    })
    .catch(error => {
      console.error("Kesalahan getGambarTujuanStrategiById:", error);
      return null;
    });
}

export function postGambarTujuanStrategi({ imageFile }) {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);

  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/imagetujuan`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: formData,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal menambahkan data gambar tujuan strategi. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const tujuanstrategi = result.data;
			return {
				id: tujuanstrategi.id,
				img: tujuanstrategi.image,
			};
		})
		.catch((error) => {
			console.error("Kesalahan postGambarTujuanStrategi:", error);
			return null;
		});
}

export function updateGambarTujuanStrategiById(id, { imageFile }) {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/imagetujuan/${id}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: formData,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal memperbarui data gambar tujuan strategi. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const tujuanstrategi = result.data;
			return {
				id: tujuanstrategi.id,
				img: tujuanstrategi.image,
			};
		})
		.catch((error) => {
			console.error("Kesalahan updateGambarTujuanStrategiById:", error);
			return null;
		});
}

export function deleteGambarTujuanStrategiById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/imagetujuan/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Gagal menghapus data gambar tujuan strategi. Status: ${response.status}`
				);
			return response.json();
		})
		.catch((error) => {
			console.error("Kesalahan deleteGambarTujuanStrategiById:", error);
			return null;
		});
}