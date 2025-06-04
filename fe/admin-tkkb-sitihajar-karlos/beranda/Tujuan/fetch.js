export function getAllTujuan() {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/tujuan`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data tujuan. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(tujuan => ({
        id: tujuan.id,   
        objective: tujuan.tujuan_description
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllTujuan:", error);
      return null;
    });
}

export function getTujuanById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/tujuan/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data tujuan. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const tujuan = result.data;
      if (!tujuan) {
        throw new Error("Data tujuan tidak ditemukan");
      }
      return {
        id: tujuan.id,   
        objective: tujuan.tujuan_description
      };
    })
    .catch(error => {
      console.error("Kesalahan getTujuanById:", error);
      return null;
    });
}

export function postTujuan({ tujuan_description }) {
  const formData = new FormData();
  formData.append('tujuan_description', tujuan_description);

  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/tujuan`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal menambahkan data tujuan. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const tujuan = result.data;
      return {
        id: tujuan.id,   
        objective: tujuan.tujuan_description
      };
    })
    .catch(error => {
      console.error("Kesalahan postTujuan:", error);
      return null;
    });
}

export function updateTujuanById(id, { tujuan_description }) {
  const formData = new FormData();
  formData.append('tujuan_description', tujuan_description);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/tujuan/${id}`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal memperbarui data tujuan. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const tujuan = result.data;
      return {
        id: tujuan.id,   
        objective: tujuan.tujuan_description
      };
    })
    .catch(error => {
      console.error("Kesalahan updateTujuanById", error);
      return null;
    });
}

export function deleteTujuanById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/tujuan/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menghapus data tujuan. Status: ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Kesalahan deleteTujuanById:", error);
    return null;
  });
}

export function getAllStrategi() {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/strategi`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data strategi. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(strategi => ({
        id: strategi.id,   
        strategy: strategi.strategi_description
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllStrategi:", error);
      return null;
    });
}

export function getStrategiById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/strategi/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data strategi. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const strategi = result.data;
      if (!strategi) {
        throw new Error("Data strategi tidak ditemukan");
      }
      return {
        id: strategi.id,   
        strategy: strategi.strategi_description
      };
    })
    .catch(error => {
      console.error("Kesalahan getStrategiById:", error);
      return null;
    });
}

export function postStrategi({ strategi_description }) {
  const formData = new FormData();
  formData.append('strategi_description', strategi_description);

  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/strategi`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal menambahkan data strategi. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const strategi = result.data;
      return {
        id: strategi.id,   
        strategy: strategi.strategi_description
      };
    })
    .catch(error => {
      console.error("Kesalahan postStrategi:", error);
      return null;
    });
}

export function updateStrategiById(id, { strategi_description }) {
  const formData = new FormData();
  formData.append('strategi_description', strategi_description);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/strategi/${id}`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal memperbarui data strategi. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const strategi = result.data;
      return {
        id: strategi.id,   
        strategy: strategi.strategi_description
      };
    })
    .catch(error => {
      console.error("Kesalahan updateStrategiById:", error);
      return null;
    });
}

export function deleteStrategiById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/strategi/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menghapus data strategi. Status: ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Kesalahan deleteStrategiById:", error);
    return null;
  });
}