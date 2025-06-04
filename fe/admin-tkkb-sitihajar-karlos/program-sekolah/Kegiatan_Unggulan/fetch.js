export function getAllKegiatanUnggulan() {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kegiatanunggulan`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data kegiatan unggulan. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(kegiatanunggulan => ({
        id: kegiatanunggulan.id,   
        activity: kegiatanunggulan.nama_kegiatan,
        icon: kegiatanunggulan.icon,
        desc: kegiatanunggulan.deskripsi_kegiatan
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllKegiatanUnggulan:", error);
      return null;
    });
}

export function getKegiatanUnggulanById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kegiatanunggulan/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data kegiatan unggulan. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const kegiatanunggulan = result.data;
      if (!kegiatanunggulan) {
        throw new Error("Data kegiatan unggulan tidak ditemukan");
      }
      return {
        id: kegiatanunggulan.id,   
        activity: kegiatanunggulan.nama_kegiatan,
        icon: kegiatanunggulan.icon,
        desc: kegiatanunggulan.deskripsi_kegiatan
      };
    })
    .catch(error => {
      console.error("Kesalahan getKegiatanUnggulanById:", error);
      return null;
    });
}

export function postKegiatanUnggulan({ nama_kegiatan, deskripsi_kegiatan }, imageFile) {
  const formData = new FormData();
  if (imageFile) formData.append('icon', imageFile);
  formData.append('nama_kegiatan', nama_kegiatan);
  formData.append('deskripsi_kegiatan', deskripsi_kegiatan);

  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kegiatanunggulan`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal menambahkan data kegiatan unggulan. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const kegiatanunggulan = result.data;
      return {
        id: kegiatanunggulan.id,   
        activity: kegiatanunggulan.nama_kegiatan,
        icon: kegiatanunggulan.icon,
        desc: kegiatanunggulan.deskripsi_kegiatan
      };
    })
    .catch(error => {
      console.error("Kesalahan postKegiatanUnggulan:", error);
      return null;
    });
}

export function updateKegiatanUnggulanById(id, { nama_kegiatan, deskripsi_kegiatan }, imageFile) {
  const formData = new FormData();
  if (imageFile) formData.append('icon', imageFile);
  formData.append('nama_kegiatan', nama_kegiatan);
  formData.append('deskripsi_kegiatan', deskripsi_kegiatan);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kegiatanunggulan/${id}`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal memperbarui data kegiatan unggulan. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const kegiatanunggulan = result.data;
      return {
        id: kegiatanunggulan.id,   
        activity: kegiatanunggulan.nama_kegiatan,
        icon: kegiatanunggulan.icon,
        desc: kegiatanunggulan.deskripsi_kegiatan
      };
    })
    .catch(error => {
      console.error("Kesalahan updateKegiatanUnggulanById:", error);
      return null;
    });
}

export function deleteKegiatanUnggulanById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kegiatanunggulan/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menghapus data kegiatan unggulan. Status: ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Kesalahan deleteKegiatanUnggulanById:", error);
    return null;
  });
}
