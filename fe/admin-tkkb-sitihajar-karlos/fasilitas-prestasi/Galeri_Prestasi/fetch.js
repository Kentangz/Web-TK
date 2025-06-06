export function getAllGambarPrestasi() {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/gallery`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data gambar prestasi. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(gambarprestasi => ({
        id: gambarprestasi.id,   
        img: gambarprestasi.image
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllGambarPrestasi:", error);
      return null;
    });
}

export function getGambarPrestasiById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/gallery/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data gambar prestasi. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const gambarprestasi = result.data;
      if (!gambarprestasi) {
        throw new Error("Data gambar prestasi tidak ditemukan");
      }
      return {
        id: gambarprestasi.id,   
        img: gambarprestasi.image
      };
    })
    .catch(error => {
      console.error("Kesalahan getGambarPrestasiById:", error);
      return null;
    });
}

export function postGambarPrestasi({ imageFile }) {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);

  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/gallery`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal menambahkan data gambar prestasi. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const  gambarprestasi = result.data;
      return {
        id: gambarprestasi.id,   
        img: gambarprestasi.image
      };
    })
    .catch(error => {
      console.error("Kesalahan postGambarPrestasi:", error);
      return null;
    });
}

export function updateGambarPrestasiById(id, { imageFile }) {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/gallery/${id}`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal memperbarui data gambar prestasi. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const gambarprestasi = result.data;
      return {
        id: gambarprestasi.id,   
        img: gambarprestasi.image
      };
    })
    .catch(error => {
      console.error("Kesalahan updateGambarPrestasiById:", error);
      return null;
    });
}

export function deleteGambarPrestasiById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/gallery/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menghapus data gambar prestasi. Status: ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Kesalahan deleteGambarPrestasiById:", error);
    return null;
  });
}