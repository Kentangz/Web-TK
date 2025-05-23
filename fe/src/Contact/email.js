export function fetchEmail() {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/email`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data email. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const data = result.data;

      if (Array.isArray(data) && data.length > 0 && data[0].email) {
        return `${data[0].email}`;
      } else {
        throw new Error("Data email tidak ditemukan atau format tidak valid");
      }
    })
    .catch(error => {
      console.error("Kesalahan fetchEmail:", error);
      return `Gagal memuat contact person`;
    });
}
