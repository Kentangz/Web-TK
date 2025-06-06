export function getAllSurat() {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/suratpendek`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data surat-surat pendek. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(surat => ({
        id: surat.id,   
        surat: surat.surat_name
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllSurat:", error);
      return null;
    });
}

export function getSuratById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/suratpendek/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data surat-surat pendek. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const surat = result.data;
      if (!surat) {
        throw new Error("Data surat-surat pendek tidak ditemukan");
      }
      return {
        id: surat.id,   
        surat: surat.surat_name
      };
    })
    .catch(error => {
      console.error("Kesalahan getSuratById:", error);
      return null;
    });
}

export function postSurat({ surat_name }) {
  const formData = new FormData();
  formData.append('surat_name', surat_name);

  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/suratpendek`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal menambahkan data surat-surat pendek. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const surat = result.data;
      return {
        id: surat.id,   
        surat: surat.surat_name
      };
    })
    .catch(error => {
      console.error("Kesalahan postSurat:", error);
      return null;
    });
}

export function updateSuratById(id, { surat_name }) {
  const formData = new FormData();
  formData.append('surat_name', surat_name);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/suratpendek/${id}`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal memperbarui data surat-surat pendek. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const surat = result.data;
      return {
        id: surat.id,   
        surat: surat.surat_name
      };
    })
    .catch(error => {
      console.error("Kesalahan updateSuratById:", error);
      return null;
    });
}

export function deleteSuratById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/suratpendek/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menghapus data surat-surat pendek. Status: ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Kesalahan deleteSuratById:", error);
    return null;
  });
}

export function getAllDoa() {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/doa`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data doa. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(doa => ({
        id: doa.id,   
        doa: doa.doa_name
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllDoa:", error);
      return null;
    });
}

export function getDoaById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/doa/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data doa. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const doa = result.data;
      if (!doa) {
        throw new Error("Data doa yang dihasilkan tidak ditemukan");
      }
      return {
        id: doa.id,   
        doa: doa.doa_name
      };
    })
    .catch(error => {
      console.error("Kesalahan getDoaById:", error);
      return null;
    });
}

export function postDoa({ doa_name }) {
  const formData = new FormData();
  formData.append('doa_name', doa_name);

  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/doa`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal menambahkan data doa. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const doa = result.data;
      return {
        id: doa.id,   
        doa: doa.doa_name
      };
    })
    .catch(error => {
      console.error("Kesalahan postDoa:", error);
      return null;
    });
}

export function updateDoaById(id, { doa_name }) {
  const formData = new FormData();
  formData.append('doa_name', doa_name);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/doa/${id}`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal memperbarui data doa. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const doa = result.data;
      return {
        id: doa.id,   
        doa: doa.doa_name
      };
    })
    .catch(error => {
      console.error("Kesalahan updateDoaById:", error);
      return null;
    });
}

export function deleteDoaById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/doa/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menghapus data doa. Status: ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Kesalahan deleteDoaById:", error);
    return null;
  });
}

export function getAllHadits() {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/hadits`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data hadits. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(hadits => ({
        id: hadits.id,   
        hadits: hadits.hadits_name
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllHadits:", error);
      return null;
    });
}

export function getHaditsById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/hadits/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data hadits. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const hadits = result.data;
      if (!hadits) {
        throw new Error("Data hadits tidak ditemukan");
      }
      return {
        id: hadits.id,   
        hadits: hadits.hadits_name
      };
    })
    .catch(error => {
      console.error("Kesalahan getHaditsById:", error);
      return null;
    });
}

export function postHadits({ hadits_name }) {
  const formData = new FormData();
  formData.append('hadits_name', hadits_name);

  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/hadits`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal menambahkan data hadits. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const hadits = result.data;
      return {
        id: hadits.id,   
        hadits: hadits.hadits_name
      };
    })
    .catch(error => {
      console.error("Kesalahan postHadits:", error);
      return null;
    });
}

export function updateHaditsById(id, { hadits_name }) {
  const formData = new FormData();
  formData.append('hadits_name', hadits_name);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/hadits/${id}`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal memperbarui data hadits. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const hadits = result.data;
      return {
        id: hadits.id,   
        hadits: hadits.hadits_name
      };
    })
    .catch(error => {
      console.error("Kesalahan updateHaditsById:", error);
      return null;
    });
}

export function deleteHaditsById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kurikulumplus/hadits/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menghapus data hadits. Status: ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Kesalahan deleteHaditsById:", error);
    return null;
  });
}