export function getAllPrestasiGuru() {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/prestasiguru`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data prestasi guru. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(prestasiguru => ({
        id: prestasiguru.id,   
        teacher: prestasiguru.prestasi_guru
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllPrestasiGuru:", error);
      return null;
    });
}

export function getPrestasiGuruById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/prestasiguru/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data prestasi guru. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const prestasiguru = result.data;
      if (!prestasiguru) {
        throw new Error("Data prestasi guru tidak ditemukan");
      }
      return {
        id: prestasiguru.id,   
        teacher: prestasiguru.prestasi_guru
      };
    })
    .catch(error => {
      console.error("Kesalahan getPrestasiGuruById:", error);
      return null;
    });
}

export function postPrestasiGuru({ prestasi_guru }) {
  const formData = new FormData();
  formData.append('prestasi_guru', prestasi_guru);

  return fetch(
		`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/prestasiguru`,
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
					`Gagal menambahkan data prestasi guru. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const prestasiguru = result.data;
			return {
				id: prestasiguru.id,
				teacher: prestasiguru.prestasi_guru,
			};
		})
		.catch((error) => {
			console.error("Kesalahan postPrestasiGuru:", error);
			return null;
		});
}

export function updatePrestasiGuruById(id, { prestasi_guru }) {
  const formData = new FormData();
  formData.append('prestasi_guru', prestasi_guru);
  formData.append('_method', 'PUT');

  return fetch(
		`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/prestasiguru/${id}`,
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
					`Gagal memperbarui data prestasi guru. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const prestasiguru = result.data;
			return {
				id: prestasiguru.id,
				teacher: prestasiguru.prestasi_guru,
			};
		})
		.catch((error) => {
			console.error("Kesalahan updatePrestasiGuruById:", error);
			return null;
		});
}

export function deletePrestasiGuruById(id) {
  return fetch(
		`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/prestasiguru/${id}`,
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
					`Gagal menghapus data prestasi guru. Status: ${response.status}`
				);
			return response.json();
		})
		.catch((error) => {
			console.error("Kesalahan deletePrestasiGuruById:", error);
			return null;
		});
}

export function getAllPrestasiSiswa() {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/prestasisiswa`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data prestasi siswa. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(prestasisiswa => ({
        id: prestasisiswa.id,   
        student: prestasisiswa.prestasi_siswa
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllPrestasiSiswa:", error);
      return null;
    });
}

export function getPrestasiSiswaById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/prestasisiswa/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data prestasi siswa. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const prestasisiswa = result.data;
      if (!prestasisiswa) {
        throw new Error("Data prestasi siswa tidak ditemukan");
      }
      return {
        id: prestasisiswa.id,   
        student: prestasisiswa.prestasi_siswa
      };
    })
    .catch(error => {
      console.error("Kesalahan getPrestasiSiswaById:", error);
      return null;
    });
}

export function postPrestasiSiswa({ prestasi_siswa }) {
  const formData = new FormData();
  formData.append('prestasi_siswa', prestasi_siswa);

  return fetch(
		`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/prestasisiswa`,
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
					`Gagal menambahkan data prestasi siswa. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const prestasisiswa = result.data;
			return {
				id: prestasisiswa.id,
				student: prestasisiswa.prestasi_siswa,
			};
		})
		.catch((error) => {
			console.error("Kesalahan postPrestasiSiswa:", error);
			return null;
		});
}

export function updatePrestasiSiswaById(id, { prestasi_siswa }) {
  const formData = new FormData();
  formData.append('prestasi_siswa', prestasi_siswa);
  formData.append('_method', 'PUT');

  return fetch(
		`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/prestasisiswa/${id}`,
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
					`Gagal memperbarui data prestasi siswa. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const prestasisiswa = result.data;
			return {
				id: prestasisiswa.id,
				student: prestasisiswa.prestasi_siswa,
			};
		})
		.catch((error) => {
			console.error("Kesalahan updatePrestasiSiswaById:", error);
			return null;
		});
}

export function deletePrestasiSiswaById(id) {
  return fetch(
		`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/prestasisiswa/${id}`,
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
					`Gagal menghapus data prestasi siswa. Status: ${response.status}`
				);
			return response.json();
		})
		.catch((error) => {
			console.error("Kesalahan deletePrestasiSiswaById:", error);
			return null;
		});
}