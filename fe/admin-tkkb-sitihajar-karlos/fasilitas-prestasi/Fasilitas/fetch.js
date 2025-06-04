export function getAllFasilitas() {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/fasilitas`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data fasilitas. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(fasilitas => ({
        id: fasilitas.id,   
        facility: fasilitas.fasilitas_name
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllFasilitas:", error);
      return null;
    });
}

export function getFasilitasById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/fasilitas/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data fasilitas. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const fasilitas = result.data;
      if (!fasilitas) {
        throw new Error("Data fasilitas tidak ditemukan");
      }
      return {
        id: fasilitas.id,   
        facility: fasilitas.fasilitas_name
      };
    })
    .catch(error => {
      console.error("Kesalahan getFasilitasById:", error);
      return null;
    });
}

export function postFasilitas({ fasilitas_name }) {
  const formData = new FormData();
  formData.append('fasilitas_name', fasilitas_name);

  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/fasilitas`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal menambahkan data fasilitas. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const fasilitas = result.data;
      return {
        id: fasilitas.id,   
        facility: fasilitas.fasilitas_name
      };
    })
    .catch(error => {
      console.error("Kesalahan postFasilitas:", error);
      return null;
    });
}

export function updateFasilitasById(id, { fasilitas_name }) {
  const formData = new FormData();
  formData.append('fasilitas_name', fasilitas_name);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/fasilitas/${id}`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal memperbarui data fasilitas. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const fasilitas = result.data;
      return {
        id: fasilitas.id,   
        facility: fasilitas.fasilitas_name
      };
    })
    .catch(error => {
      console.error("Kesalahan updateFasilitasById:", error);
      return null;
    });
}

export function deleteFasilitasById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/fasilitas/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menghapus data fasilitas. Status: ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Kesalahan deleteFasilitasById:", error);
    return null;
  });
}