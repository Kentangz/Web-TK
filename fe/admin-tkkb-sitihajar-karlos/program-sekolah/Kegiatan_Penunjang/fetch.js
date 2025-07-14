export function getAllKegiatanPenunjang() {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kegiatanpenunjang`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data kegiatan penunjang. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(kegiatanpenunjang => ({
        id: kegiatanpenunjang.id,   
        activity: kegiatanpenunjang.kegiatan_penunjang
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllKegiatanPenunjang:", error);
      return null;
    });
}

export function getKegiatanPenunjangById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kegiatanpenunjang/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data kegiatan penunjang. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const kegiatanpenunjang = result.data;
      if (!kegiatanpenunjang) {
        throw new Error("Data kegiatan penunjang tidak ditemukan");
      }
      return {
        id: kegiatanpenunjang.id,   
        activity: kegiatanpenunjang.kegiatan_penunjang
      };
    })
    .catch(error => {
      console.error("Kesalahan getKegiatanPenunjangById:", error);
      return null;
    });
}

export function postKegiatanPenunjang({ kegiatan_penunjang }) {
  const formData = new FormData();
  formData.append('kegiatan_penunjang', kegiatan_penunjang);

  return fetch(
		`${import.meta.env.VITE_API_KEY}/programsekolah/kegiatanpenunjang`,
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
					`Gagal menambahkan data kegiatan penunjang. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const kegiatanpenunjang = result.data;
			return {
				id: kegiatanpenunjang.id,
				activity: kegiatanpenunjang.kegiatan_penunjang,
			};
		})
		.catch((error) => {
			console.error("Kesalahan postKegiatanPenunjang:", error);
			return null;
		});
}

export function updateKegiatanPenunjangById(id, { kegiatan_penunjang }) {
  const formData = new FormData();
  formData.append('kegiatan_penunjang', kegiatan_penunjang);
  formData.append('_method', 'PUT');

  return fetch(
		`${import.meta.env.VITE_API_KEY}/programsekolah/kegiatanpenunjang/${id}`,
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
					`Gagal memperbarui data kegiatan penunjang. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const kegiatanpenunjang = result.data;
			return {
				id: kegiatanpenunjang.id,
				activity: kegiatanpenunjang.kegiatan_penunjang,
			};
		})
		.catch((error) => {
			console.error("Kesalahan updateKegiatanPenunjangById:", error);
			return null;
		});
}

export function deleteKegiatanPenunjangById(id) {
  return fetch(
		`${import.meta.env.VITE_API_KEY}/programsekolah/kegiatanpenunjang/${id}`,
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
					`Gagal menghapus data kegiatan penunjang. Status: ${response.status}`
				);
			return response.json();
		})
		.catch((error) => {
			console.error("Kesalahan deleteKegiatanPenunjangById:", error);
			return null;
		});
}