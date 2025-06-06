export function getAllWaktu() {
  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/waktukegiatankb`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data waktu. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(waktu => ({
        id: waktu.id,   
        day: waktu.hari,
        hour: waktu.jam
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllWaktu:", error);
      return null;
    });
}

export function getWaktuById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/waktukegiatankb/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data waktu. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const waktu = result.data;
      if (!waktu) {
        throw new Error("Data waktu tidak ditemukan");
      }
      return {
        id: waktu.id,   
        day: waktu.hari,
        hour: waktu.jam
      };
    })
    .catch(error => {
      console.error("Kesalahan getWaktuById:", error);
      return null;
    });
}

export function postWaktu({ hari, jam }) {
  const formData = new FormData();
  formData.append('hari', hari);
  formData.append('jam', jam);

  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/waktukegiatankb`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal menambahkan data waktu. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const waktu = result.data;
      return {
        id: waktu.id,   
        day: waktu.hari,
        hour: waktu.jam
      };
    })
    .catch(error => {
      console.error("Kesalahan postWaktu:", error);
      return null;
    });
}

export function updateWaktuById(id, { hari, jam }) {
  const formData = new FormData();
  formData.append('hari', hari);
  formData.append('jam', jam);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/waktukegiatankb/${id}`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal memperbarui data waktu. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const waktu = result.data;
      return {
        id: waktu.id,   
        day: waktu.hari,
        hour: waktu.jam
      };
    })
    .catch(error => {
      console.error("Kesalahan updateWaktuById", error);
      return null;
    });
}

export function deleteWaktuById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/waktukegiatankb/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menghapus data waktu. Status: ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Kesalahan deleteWaktuById:", error);
    return null;
  });
}

export function getAllJadwal() {
  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/jadwalkelompokkb`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data jadwal. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(jadwal => ({
        id: jadwal.id,   
        icon: jadwal.icon,
        desc: jadwal.deskripsi
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllJadwal:", error);
      return null;
    });
}

export function getJadwalById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/jadwalkelompokkb/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data jadwal. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const jadwal = result.data;
      if (!jadwal) {
        throw new Error("Data jadwal tidak ditemukan");
      }
      return {
        id: jadwal.id,   
        icon: jadwal.icon,
        desc: jadwal.deskripsi
      };
    })
    .catch(error => {
      console.error("Kesalahan getJadwalById:", error);
      return null;
    });
}

export function postJadwal({ deskripsi }, imageFile) {
  const formData = new FormData();
  if (imageFile) formData.append('icon', imageFile);
  formData.append('deskripsi', deskripsi);

  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/jadwalkelompokkb`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal menambahkan data jadwal. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const jadwal = result.data;
      return {
        id: jadwal.id,   
        icon: jadwal.icon,
        desc: jadwal.deskripsi
      };
    })
    .catch(error => {
      console.error("Kesalahan postJadwal:", error);
      return null;
    });
}

export function updateJadwalById(id, { deskripsi }, imageFile) {
  const formData = new FormData();
  if (imageFile) formData.append('icon', imageFile);
  formData.append('deskripsi', deskripsi);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/jadwalkelompokkb/${id}`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal memperbarui data jadwal. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const jadwal = result.data;
      return {
        id: jadwal.id,   
        icon: jadwal.icon,
        desc: jadwal.deskripsi
      };
    })
    .catch(error => {
      console.error("Kesalahan updateJadwalById:", error);
      return null;
    });
}

export function deleteJadwalById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/jadwalkelompokkb/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menghapus data jadwal. Status: ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Kesalahan deleteJadwalById:", error);
    return null;
  });
}