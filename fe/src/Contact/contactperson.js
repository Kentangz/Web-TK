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
        return data.map(item => `${item.nomor} (${item.nama})`).join(', ');
      }
      if (typeof data === 'object' && data !== null && data.nomor && data.nama) {
        return `${data.nomor} (${data.nama})`;
      }

      throw new Error("Format data contact person tidak valid");
    })
    .catch(error => {
      console.error("Kesalahan saat fetch contact person:", error);
      return "Gagal memuat contact person";
    });
}
