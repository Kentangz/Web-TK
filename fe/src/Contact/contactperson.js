export function fetchContactPerson() {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/contactperson`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Gagal mengambil data contact person");
      }
      return response.json();
    })
    .then(result => {
      const data = result.data;

      if (Array.isArray(data)) {
        if (data.length === 0) {
          throw new Error("Data contact person kosong");
        }
        const kontakList = data.map(item => `${item.nomor} (${item.nama})`).join(', ');
        return `<p class="contact-text">${kontakList}</p>`;
      }

      if (typeof data === 'object' && data !== null && data.nomor && data.nama) {
        return `<p class="contact-text">${data.nomor} (${data.nama})</p>`;
      }

      throw new Error("Format data contact person tidak valid");
    })
    .catch(error => {
      console.error("Kesalahan saat fetch contact person:", error);
      return `<p class="contact-text" style="color:red;">Gagal memuat contact person</p>`;
    });
}
