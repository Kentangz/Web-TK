export function fetchInstagram() {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/instagram`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data Instagram. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const data = result.data;

      if (Array.isArray(data) && data.length > 0 && data[0].ig_name) {
        return `<p class="contact-text">${data[0].ig_name}</p>`;
      } else {
        throw new Error("Data Instagram tidak ditemukan atau format tidak valid");
      }
    })
    .catch(error => {
      console.error("Kesalahan fetchInstagram:", error);
      return `<p class="contact-text" style="color:red;">Gagal memuat contact person</p>`;
    });
}
