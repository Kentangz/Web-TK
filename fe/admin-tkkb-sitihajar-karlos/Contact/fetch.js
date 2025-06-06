export function getAllContactPerson() {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/contactperson`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data contact person. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(contact_person => ({
        id: contact_person.id,
        phone: contact_person.nomor,
        name: contact_person.nama,
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllContactPerson:", error);
      return null;
    });
}


export function getContactPersonById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/contactperson/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data contact person. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const contact_person = result.data;
      if (!contact_person) {
        throw new Error("Contact person tidak ditemukan");
      }
      return {
        id: contact_person.id,
        phone: contact_person.nomor,
        name: contact_person.nama,
      };
    })
    .catch(error => {
      console.error("Kesalahan getContactPersonById:", error);
      return null;
    });
}

export function postContactPerson({ nomor, nama }) {
  const formData = new FormData();
  formData.append('nomor', nomor);
  formData.append('nama', nama);

  return fetch(`${import.meta.env.VITE_API_KEY}/contact/contactperson`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal menambahkan data contact person. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const contact_person = result.data;
      return {
        id: contact_person.id,
        phone: contact_person.nomor,
        name: contact_person.nama,
      };
    })
    .catch(error => {
      console.error("Kesalahan postContactPerson:", error);
      return null;
    });
}

export function updateContactPersonById(id, { nomor, nama }) {
  const formData = new FormData();
  formData.append('nomor', nomor);
  formData.append('nama', nama);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/contact/contactperson/${id}`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal memperbarui data contact person. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const contact_person = result.data;
      return {
        id: contact_person.id,
        phone: contact_person.nomor,
        name: contact_person.nama,
      };
    })
    .catch(error => {
      console.error("Kesalahan updateContactPersonById:", error);
      return null;
    });
}

export function deleteContactPersonById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/contactperson/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menghapus data contact person. Status: ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Kesalahan deleteContactPersonById:", error);
    return null;
  });
}

// email.js
export function getAllEmail() {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/email`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data email. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(email => ({
        id: email.id,
        email: email.email
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllEmail:", error);
      return null;
    });
}

export function getEmailById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/email/${id}`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal mengambil data email. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      const email = result.data;
      if (!email) throw new Error("Email tidak ditemukan");
      return {
        id: email.id,
        email: email.email
      };
    })
    .catch(error => {
      console.error("Kesalahan getEmailById:", error);
      return null;
    });
}

export function postEmail({ email }) {
  const formData = new FormData();
  formData.append('email', email);

  return fetch(`${import.meta.env.VITE_API_KEY}/contact/email`, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menambahkan email. Status: ${response.status}`);
    return response.json();
  })
  .then(result => {
    const email = result.data;
    return {
      id: email.id,
      email: email.email
    };
  })
  .catch(error => {
    console.error("Kesalahan postEmail:", error);
    return null;
  });
}

export function updateEmailById(id, { email }) {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/contact/email/${id}`, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal memperbarui email. Status: ${response.status}`);
    return response.json();
  })
  .then(result => {
    const email = result.data;
    return {
      id: email.id,
      email: email.email
    };
  })
  .catch(error => {
    console.error("Kesalahan updateEmailById:", error);
    return null;
  });
}

export function deleteEmailById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/email/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menghapus email. Status: ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Kesalahan deleteEmailById:", error);
    return null;
  });
}

// instagram.js
export function getAllInstagram() {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/instagram`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data Instagram. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(instagram => ({
        id: instagram.id,
        username: instagram.ig_name
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllInstagram:", error);
      return null;
    });
}
export function getInstagramById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/instagram/${id}`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal mengambil data Instagram. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      const instagram = result.data;
      if (!instagram) throw new Error("Instagram tidak ditemukan");
      return {
        id: instagram.id,
        username: instagram.ig_name
      };
    })
    .catch(error => {
      console.error("Kesalahan getInstagramById:", error);
      return null;
    });
}

export function postInstagram({ ig_name }) {
  const formData = new FormData();
  formData.append('ig_name', ig_name);

  return fetch(`${import.meta.env.VITE_API_KEY}/contact/instagram`, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menambahkan Instagram. Status: ${response.status}`);
    return response.json();
  })
  .then(result => {
    const instagram = result.data;
    return {
      id: instagram.id,
      username: instagram.ig_name
    };
  })
  .catch(error => {
    console.error("Kesalahan postInstagram:", error);
    return null;
  });
}

export function updateInstagramById(id, { ig_name }) {
  const formData = new FormData();
  formData.append('ig_name', ig_name);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/contact/instagram/${id}`, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal memperbarui Instagram. Status: ${response.status}`);
    return response.json();
  })
  .then(result => {
    const instagram = result.data;
    return {
      id: instagram.id,
      username: instagram.ig_name
    };
  })
  .catch(error => {
    console.error("Kesalahan updateInstagramById:", error);
    return null;
  });
}

export function deleteInstagramById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/instagram/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menghapus Instagram. Status: ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Kesalahan deleteInstagramById:", error);
    return null;
  });
}

// alamat.js
export function getAllAlamat() {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/alamat`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data alamat. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(alamat => ({
        id: alamat.id,
        alamat: alamat.alamat
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllAlamat:", error);
      return null;
    });
}

export function getAlamatById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/alamat/${id}`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal mengambil data alamat. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      const alamat = result.data;
      if (!alamat) throw new Error("Alamat tidak ditemukan");
      return {
        id: alamat.id,
        alamat: alamat.alamat
      };
    })
    .catch(error => {
      console.error("Kesalahan getAlamatById:", error);
      return null;
    });
}

export function postAlamat({ alamat }) {
  const formData = new FormData();
  formData.append('alamat', alamat);

  return fetch(`${import.meta.env.VITE_API_KEY}/contact/alamat`, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menambahkan alamat. Status: ${response.status}`);
    return response.json();
  })
  .then(result => {
    const alamat = result.data;
    return {
      id: alamat.id,
      alamat: alamat.alamat
    };
  })
  .catch(error => {
    console.error("Kesalahan postAlamat:", error);
    return null;
  });
}

export function updateAlamatById(id, { alamat }) {
  const formData = new FormData();
  formData.append('alamat', alamat);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/contact/alamat/${id}`, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal memperbarui alamat. Status: ${response.status}`);
    return response.json();
  })
  .then(result => {
    const alamat = result.data;
    return {
      id: alamat.id,
      alamat: alamat.alamat
    };
  })
  .catch(error => {
    console.error("Kesalahan updateAlamatById:", error);
    return null;
  });
}

export function deleteAlamatById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/alamat/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) throw new Error(`Gagal menghapus alamat. Status: ${response.status}`);
    return response.json();
  })
  .catch(error => {
    console.error("Kesalahan deleteAlamatById:", error);
    return null;
  });
}
